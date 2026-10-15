import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { BLOG_NAME, getAllPosts, MIN_POSTS_TO_INDEX, pageCount } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

/** 給湯器コラム（一覧の2ページ目以降）。1ページ目は /blog（/blog/page/1 は next.config.ts で /blog へ転送） */
export function generateStaticParams() {
  const total = pageCount(getAllPosts().length);
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return buildMetadata({
    title: `${BLOG_NAME}（${page}ページ目）`,
    description: `横浜総合住設の給湯器専門サイトのコラムの一覧です（${page}ページ目）。給湯器の交換時期・故障のサイン・選び方・補助金について、公式情報をもとにまとめています。`,
    path: `/blog/page/${page}`,
    noindex: getAllPosts().length < MIN_POSTS_TO_INDEX,
  });
}

export default async function BlogPagedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 2 || n > pageCount(getAllPosts().length)) notFound();
  return <BlogIndexView page={n} />;
}
