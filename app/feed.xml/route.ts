import { BLOG_NAME, getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/**
 * 給湯器コラムの RSS（/feed.xml）。新しい順に30本。
 * - 記事が0本のときも、記事の無いチャンネルとして正しい RSS を返す。
 * - 本番 URL が決まっていないあいだは 404 を返す（記事の URL を絶対 URL で組み立てられないため。全ページ noindex の期間と同じ）。
 */
export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
/** 日本時間の朝9時として扱う（記事の日付は日本時間の日付） */
const rfc822 = (iso: string) => new Date(`${iso}T09:00:00+09:00`).toUTCString();

export function GET() {
  if (!SITE_URL) return new Response("Not Found", { status: 404 });
  const posts = getAllPosts().slice(0, 30);
  const items = posts.map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${rfc822(p.publishedAt)}</pubDate>
      <category>${esc(p.cluster.name)}</category>
      <description>${esc(p.description)}</description>
    </item>`,
  );
  const latest = posts.reduce<string | null>((a, p) => (a === null || p.updatedAt > a ? p.updatedAt : a), null);
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `  <channel>`,
    `    <title>${esc(`${siteConfig.siteName} ${BLOG_NAME}`)}</title>`,
    `    <link>${SITE_URL}/blog</link>`,
    `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    `    <description>${esc("給湯器の交換時期・故障のサイン・機種の選び方・補助金の決まりを、メーカーと国の公式情報をもとにまとめたコラムです。")}</description>`,
    `    <language>ja</language>`,
    ...(latest ? [`    <lastBuildDate>${rfc822(latest)}</lastBuildDate>`] : []),
    ...items,
    `  </channel>`,
    `</rss>`,
    ``,
  ].join("\n");
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
