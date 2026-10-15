import fs from "node:fs";
import path from "node:path";
import { publishedAreas } from "@/data/areas";
import { brands } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { BLOG_HUB_KEYWORDS } from "@/lib/blog";
import { diceBigram } from "@/lib/blog-generator/similarity";
import { allContentPages, contentPagePath } from "@/lib/content";
import { getBrand, productPath, products } from "@/lib/products";

/**
 * 検索語の取り合い（カニバリゼーション）を防ぐための、固定ページが担当している検索語の一覧。
 *
 * 1つの検索語は、サイトの中で1つのページだけが担当する。コラムの題材の主キーワードは、
 * 固定ページ（選び方・故障・補助金・地域・種類・機種）が担当している語と同じにしない。
 *
 * 担当の語の集め方
 *   - 解説のページ（data/guides.ts・data/troubles.ts・data/subsidy/pages.ts）の keyword と secondaryKeywords
 *   - 地域のページ（data/areas.ts）の keyword と secondaryKeywords
 *   - メーカー別・機種のページ（app/products/ の generateMetadata と同じ作り方）
 *   - そのほかの固定ページ（app/ の page.tsx の metadata の keywords に、文字列で書かれたもの）… ファイルを読んで取り出す
 *   - コラムの一覧（/blog）の語
 * ページ側の keywords を書き換えると、ここにも自動で反映される（npm run blog:selftest が題材との重なりを確かめる）。
 */

/** 全角の英数字を半角に、大文字を小文字にし、語の並びを問わない形にそろえる */
export function normalizeKeyword(k: string): string {
  return k
    .replace(/[０-９Ａ-Ｚａ-ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .toLowerCase()
    .replace(/[\s　]+/g, " ")
    .trim()
    .split(" ")
    .sort()
    .join(" ");
}

/** 2つの検索語が「同じ語」か（語の並びを問わず一致するか、文字の並びがほぼ同じ） */
export function sameKeyword(a: string, b: string): boolean {
  return normalizeKeyword(a) === normalizeKeyword(b) || diceBigram(a, b) >= 0.85;
}

export type KeywordOwner = { keyword: string; path: string };

/** app/ の page.tsx の metadata にある keywords（文字列だけで書かれたもの）を読む */
function staticPageKeywords(): KeywordOwner[] {
  const appDir = path.join(process.cwd(), "app");
  const out: KeywordOwner[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
        continue;
      }
      if (e.name !== "page.tsx") continue;
      const rel = path.relative(appDir, path.dirname(full)).split(path.sep).join("/");
      // 動的なページ（[slug] など）は、データから作るので読まない。コラム自身も読まない
      if (rel.includes("[") || rel.startsWith("blog")) continue;
      const src = fs.readFileSync(full, "utf8");
      const m = /keywords:\s*\[([\s\S]*?)\]/.exec(src);
      if (!m) continue;
      const pagePath = rel ? `/${rel}` : "/";
      for (const s of m[1].matchAll(/"([^"]+)"/g)) out.push({ keyword: s[1], path: pagePath });
    }
  };
  walk(appDir);
  return out;
}

let cache: KeywordOwner[] | null = null;

/** 固定ページが担当している検索語の一覧 */
export function fixedKeywordList(): KeywordOwner[] {
  if (cache) return cache;
  const out: KeywordOwner[] = [];
  for (const p of allContentPages()) for (const k of [p.keyword, ...(p.secondaryKeywords ?? [])]) out.push({ keyword: k, path: contentPagePath(p) });
  for (const a of publishedAreas) for (const k of [a.keyword, ...a.secondaryKeywords]) out.push({ keyword: k, path: `/area/${a.slug}` });
  for (const b of brands) {
    if (!products.some((p) => p.brand === b.id)) continue;
    const cats = b.categories.map((c) => getCategory(c).shortName);
    for (const k of [`${b.name} 給湯器 交換`, `${b.name} ${cats[0]}`, `横浜市 ${b.name} 給湯器`]) out.push({ keyword: k, path: `/products/${b.id}` });
  }
  for (const p of products) {
    for (const k of [p.modelNumber, `${p.modelNumber} 交換`, `${getBrand(p.brand).name} ${getCategory(p.category).shortName}`]) out.push({ keyword: k, path: productPath(p) });
  }
  out.push(...staticPageKeywords());
  for (const k of BLOG_HUB_KEYWORDS) out.push({ keyword: k, path: "/blog" });
  cache = out;
  return out;
}

/** その検索語を担当している固定ページ（無ければ undefined） */
export function fixedKeywordOwner(keyword: string): KeywordOwner | undefined {
  const list = fixedKeywordList();
  const n = normalizeKeyword(keyword);
  return list.find((o) => normalizeKeyword(o.keyword) === n) ?? list.find((o) => sameKeyword(o.keyword, keyword));
}
