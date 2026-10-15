import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/ArticlePage";
import { contentMetadata, contentPages, getContentPage } from "@/lib/content";

/** 本文は data/ のデータから作る（lib/content.ts）。ここに無い slug は 404 */
export const dynamicParams = false;

export function generateStaticParams() {
  return contentPages("guide").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getContentPage("guide", slug);
  return page ? contentMetadata(page) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getContentPage("guide", slug);
  if (!page) notFound();
  return <ArticlePage page={page} />;
}
