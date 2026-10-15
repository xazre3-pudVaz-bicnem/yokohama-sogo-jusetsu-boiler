import { publishedAreas } from "@/data/areas";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { works, workUpdatedAt } from "@/data/works";
import { activeClusters, getAllPosts, MIN_POSTS_TO_INDEX, pageCount } from "@/lib/blog";
import { allContentPages, contentPagePath } from "@/lib/content";
import { latestProductUpdate, productPath, products } from "@/lib/products";

/**
 * サイトの URL の一覧（sitemap.xml・内部リンクの検査・コラムの自動生成のリンクの検査が使う）。
 * ページを足したら、ここにも足す。検索結果に出さないページ（/compare・/contact/thanks・準備中の /works）は sitemap に入れない。
 * サーバー側とスクリプト（tsx）からだけ読む。fs を使う lib/blog を読み込むので、クライアントコンポーネントから import しないこと。
 */

/** images … そのページの主な画像（画像の sitemap に載せる。機種のページの製品写真） */
export type RouteEntry = { path: string; lastModified: string; priority?: number; images?: string[] };

const SITE_UPDATED = "2026-10-14";

/** 固定のページ（種類・案内・会社） */
const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.9 },
  ...categories.map((c) => ({ path: c.path, priority: 0.9 })),
  { path: "/ene-farm", priority: 0.7 },
  { path: "/subsidy", priority: 0.9 },
  { path: "/guide", priority: 0.7 },
  { path: "/trouble", priority: 0.7 },
  { path: "/area", priority: 0.7 },
  { path: "/flow", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/company", priority: 0.5 },
  { path: "/contact", priority: 0.6 },
  { path: "/contact/photo", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
];

/** sitemap.xml に載せる URL（検索結果に出してよいページだけ） */
export function sitemapRoutes(): RouteEntry[] {
  const posts = getAllPosts();
  const latestPost = posts.reduce((a, p) => (p.updatedAt > a ? p.updatedAt : a), SITE_UPDATED);
  const entries: RouteEntry[] = [
    ...STATIC_PAGES.map((p) => ({ path: p.path, priority: p.priority, lastModified: p.path === "/" ? max(SITE_UPDATED, latestPost) : SITE_UPDATED })),
    ...brands.filter((b) => products.some((p) => p.brand === b.id)).map((b) => ({ path: `/products/${b.id}`, priority: 0.8, lastModified: latestProductUpdate(products.filter((p) => p.brand === b.id)) })),
    ...products.map((p) => ({ path: productPath(p), priority: 0.7, lastModified: p.lastUpdatedAt, images: p.images.map((i) => i.src) })),
    ...allContentPages().map((p) => ({ path: contentPagePath(p), priority: p.cluster === "subsidy" ? 0.8 : 0.7, lastModified: p.updatedAt })),
    ...publishedAreas.map((a) => ({ path: `/area/${a.slug}`, priority: a.priority === "A" ? 0.8 : 0.6, lastModified: a.updatedAt })),
  ];
  if (works.length) {
    entries.push({ path: "/works", priority: 0.6, lastModified: works.map(workUpdatedAt).sort().at(-1)! });
    for (const w of works) entries.push({ path: `/works/${w.slug}`, priority: 0.5, lastModified: workUpdatedAt(w) });
  }
  // コラムは、一覧が index できる本数（MIN_POSTS_TO_INDEX）になってから載せる
  if (posts.length >= MIN_POSTS_TO_INDEX) {
    entries.push({ path: "/blog", priority: 0.6, lastModified: latestPost });
    for (let page = 2; page <= pageCount(posts.length); page++) entries.push({ path: `/blog/page/${page}`, priority: 0.3, lastModified: latestPost });
    for (const { cluster } of activeClusters()) entries.push({ path: `/blog/category/${cluster.id}`, priority: 0.4, lastModified: latestPost });
  }
  for (const p of posts) entries.push({ path: `/blog/${p.slug}`, priority: 0.5, lastModified: p.updatedAt });
  return entries;
}

/** サイトに実在するパス（内部リンクの検査用。検索結果に出さないページも含む） */
export function knownPaths(): Set<string> {
  const set = new Set(sitemapRoutes().map((r) => r.path));
  for (const p of ["/compare", "/works", "/blog", "/contact/thanks", "/feed.xml"]) set.add(p);
  return set;
}

function max(a: string, b: string): string {
  return a > b ? a : b;
}
