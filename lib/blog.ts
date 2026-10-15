import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { FigureKind } from "@/components/diagram/TypeFigure";
import { getCluster, type BlogCluster } from "@/lib/blog-clusters";
import { postFrontmatterSchema, type PostFrontmatter } from "@/lib/blog-schema";
import type { ImageKey } from "@/lib/images";

/**
 * 給湯器コラムの記事の読み込み（サーバー専用。content/blog/*.md）。
 * WordPress などの外部システムは使わず、記事はリポジトリ内の Markdown として持つ。
 * 毎日の自動投稿（scripts/generate-blog-post.ts）は、このフォルダに1ファイル足してコミットする。
 *
 * frontmatter が検査に通らない記事があると、ビルドを失敗させる（壊れた記事を公開しないため）。
 * lib/routes.ts（sitemap・内部リンクの検査）が getAllPosts・activeClusters・MIN_POSTS_TO_INDEX・pageCount を使う。
 */
export const BLOG_DIR = path.join(process.cwd(), "content", "blog");
export const POSTS_PER_PAGE = 12;
/** コラムの一覧・カテゴリ別の一覧を検索結果に出すのに必要な記事数（これ未満は noindex。sitemap にも載せない） */
export const MIN_POSTS_TO_INDEX = 3;
/** コラム全体の名前（パンくず・見出し・RSS） */
export const BLOG_NAME = "給湯器コラム";
/** コラム全体（/blog）が担当する検索語（記事・固定ページの検索語と重ねない） */
export const BLOG_HUB_KEYWORDS = ["給湯器 コラム", "給湯器 ブログ"];

/** 記事の冒頭と一覧に出す絵。写真は使わない（給湯器の施工写真がまだ無いため） */
export type PostCover = { type: "figure"; kind: FigureKind } | { type: "illust"; image: ImageKey };

export type Post = PostFrontmatter & {
  body: string;
  cluster: BlogCluster;
  cover: PostCover;
  /** 本文の文字数（空白・記号を除く目安） */
  length: number;
  headings: { level: 2 | 3; text: string; id: string }[];
};

/** 見出しの文字列から、ページ内リンク用の id を作る（components/blog/MarkdownBody.tsx と同じ作り方） */
export function headingId(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[\s　]+/g, "-")
      .replace(/[^\p{L}\p{N}-]/gu, "")
      .slice(0, 60) || "section"
  );
}

function extractHeadings(body: string): Post["headings"] {
  const out: Post["headings"] = [];
  const seen = new Map<string, number>();
  let inCode = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^```/.test(line)) inCode = !inCode;
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "");
    let id = headingId(text);
    const n = seen.get(id) ?? 0;
    seen.set(id, n + 1);
    if (n > 0) id = `${id}-${n + 1}`;
    out.push({ level: m[1].length as 2 | 3, text, id });
  }
  return out;
}

/** Markdown の記号を除いた本文の文字数 */
export function bodyLength(body: string): number {
  return body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|\-]/g, "")
    .replace(/\s+/g, "").length;
}

/** 本文の中のサイト内リンクのパス（クエリと # を除いたもの） */
export function internalLinkPaths(body: string): string[] {
  return [...body.matchAll(/(?<!!)\[[^\]]+\]\((\/[^)\s]*)\)/g)].map((m) => m[1].split(/[?#]/)[0].replace(/(.)\/$/, "$1"));
}

function coverOf(fm: PostFrontmatter, cluster: BlogCluster): PostCover {
  if (fm.figure) return { type: "figure", kind: fm.figure };
  return cluster.cover.type === "figure" ? { type: "figure", kind: cluster.cover.kind } : { type: "illust", image: cluster.cover.image };
}

/** 日本時間の今日（YYYY-MM-DD） */
function todayJst(): string {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

let cache: Post[] | null = null;

/** 公開中の記事（新しい順）。今日より先の日付の記事（予約投稿）は含めない */
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  if (!fs.existsSync(BLOG_DIR)) {
    // 本番の描き直し（ISR）でフォルダーが見つからないのは、同梱の失敗。空の一覧で描き直すと、記事が黙って消えるので、
    // 例外にして、前のページを出しつづけてもらう（next.config.ts の outputFileTracingIncludes を確かめる）
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
      throw new Error("[blog] content/blog が見つかりません（記事のファイルが同梱されていない可能性）");
    }
    return (cache = []);
  }
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  const posts: Post[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = postFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      const detail = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" / ");
      throw new Error(`[blog] ${file} の frontmatter が正しくありません → ${detail}`);
    }
    const fm = parsed.data;
    if (`${fm.slug}.md` !== file) throw new Error(`[blog] ${file}: ファイル名と slug（${fm.slug}）が一致していません`);
    if (fm.updatedAt < fm.publishedAt) throw new Error(`[blog] ${file}: updatedAt（${fm.updatedAt}）が publishedAt（${fm.publishedAt}）より前です`);
    const cluster = getCluster(fm.category);
    if (!cluster) throw new Error(`[blog] ${file}: カテゴリ ${fm.category} がありません`);
    const body = content.trim();
    posts.push({ ...fm, body, cluster, cover: coverOf(fm, cluster), length: bodyLength(body), headings: extractHeadings(body) });
  }
  // 新しい順。同じ日は slug 順で固定する
  posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
  const today = todayJst();
  cache = posts.filter((p) => p.publishedAt <= today);
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCluster(id: string): Post[] {
  return getAllPosts().filter((p) => p.category === id);
}

/** 複数のカテゴリにまたがる記事（先に挙げたカテゴリを優先） */
export function getPostsByClusters(ids: string[], limit = 4): Post[] {
  const all = getAllPosts();
  const out: Post[] = [];
  for (const id of ids) for (const p of all) if (p.category === id && !out.includes(p)) out.push(p);
  return out.slice(0, limit);
}

/**
 * 固定ページ（/guide/timing・/hybrid など）の「関連コラム」に出す記事。
 * そのページを親ページにしているカテゴリの記事 → relatedPages に挙げている記事 → 本文からリンクしている記事 の順。
 */
export function getPostsByPage(pagePath: string, limit = 4): Post[] {
  const all = getAllPosts();
  const picked: Post[] = [];
  const add = (p: Post) => {
    if (!picked.includes(p) && picked.length < limit) picked.push(p);
  };
  all.filter((p) => p.cluster.pillar.href === pagePath).forEach(add);
  all.filter((p) => p.relatedPages.includes(pagePath)).forEach(add);
  all.filter((p) => internalLinkPaths(p.body).includes(pagePath)).forEach(add);
  return picked;
}

/** 機種のページに出す記事（その機種を relatedProducts に挙げているか、本文からリンクしている記事） */
export function getPostsByProduct(product: { id: string; brand: string; slug: string }, limit = 3): Post[] {
  const href = `/products/${product.brand}/${product.slug}`;
  return getAllPosts()
    .filter((p) => p.relatedProducts.includes(product.id) || internalLinkPaths(p.body).includes(href))
    .slice(0, limit);
}

/** 地域のページに出す記事 */
export function getPostsByArea(areaSlug: string, limit = 4): Post[] {
  return getAllPosts()
    .filter((p) => p.relatedAreas.includes(areaSlug) || internalLinkPaths(p.body).includes(`/area/${areaSlug}`))
    .slice(0, limit);
}

/**
 * 記事の下に出す関連記事。指定があればそれを、足りなければ 同じカテゴリ → 同じ親ページ → 同じ固定ページ・機種を挙げた記事 の順に補う。
 */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const picked: Post[] = [];
  const add = (p?: Post) => {
    if (p && !picked.includes(p) && picked.length < limit) picked.push(p);
  };
  post.relatedArticles.forEach((slug) => add(all.find((p) => p.slug === slug)));
  all.filter((p) => p.category === post.category).forEach(add);
  all.filter((p) => p.cluster.pillar.href === post.cluster.pillar.href).forEach(add);
  all.filter((p) => p.relatedPages.some((x) => post.relatedPages.includes(x)) || p.relatedProducts.some((x) => post.relatedProducts.includes(x))).forEach(add);
  return picked;
}

export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function paginate<T>(items: T[], page: number): T[] {
  return items.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
}

/** 記事が1本以上あるカテゴリ（一覧のタブ・サイトマップ用）。記事の多い順 */
export function activeClusters(): { cluster: BlogCluster; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getAllPosts()) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([id, count]) => ({ cluster: getCluster(id)!, count }))
    .sort((a, b) => b.count - a.count || a.cluster.genre - b.cluster.genre);
}
