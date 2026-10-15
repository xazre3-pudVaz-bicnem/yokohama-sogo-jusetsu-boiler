import type { Metadata } from "next";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { BLOG_HUB_KEYWORDS, BLOG_NAME, getAllPosts, MIN_POSTS_TO_INDEX } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

/**
 * 給湯器コラム（一覧の1ページ目）
 * 役割：検索ニーズへの回答（1記事1検索意図）。記事は、選び方・故障・補助金・種類・地域の固定ページと、機種のページへリンクする。
 * 記事は content/blog/*.md。毎日の自動投稿は scripts/generate-blog-post.ts が1本ずつ足す。
 * 記事が MIN_POSTS_TO_INDEX 本に満たないあいだは、内容が薄いため検索結果に出さない（noindex。sitemap にも載せない）。
 */
export function generateMetadata(): Metadata {
  const count = getAllPosts().length;
  return buildMetadata({
    title: `${BLOG_NAME}｜交換時期・故障のサイン・選び方・補助金`,
    description:
      "横浜総合住設の給湯器専門サイトのコラムです。給湯器の交換時期、故障のサイン、号数や機能の選び方、エコジョーズ・エコキュート・ハイブリッド給湯器の違い、補助金の決まりを、メーカーと国の公式情報をもとにまとめています。",
    path: "/blog",
    keywords: BLOG_HUB_KEYWORDS,
    noindex: count < MIN_POSTS_TO_INDEX,
  });
}

export default function BlogPage() {
  return <BlogIndexView page={1} />;
}
