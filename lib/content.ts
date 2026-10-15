import type { Metadata } from "next";
import type { Cluster, ContentPage } from "@/data/content-types";
import { guidePages } from "@/data/guides";
import { subsidyPages } from "@/data/subsidy/pages";
import { troublePages } from "@/data/troubles";
import { kyutouShoene2026 } from "@/data/subsidy/programs";
import { buildMetadata, fitDescription } from "@/lib/seo";
import { kyutouPhase } from "@/lib/subsidy";
import { fillTokens } from "@/lib/tokens";

/**
 * 解説のページ（選び方・補助金・故障とトラブル）をまとめて引く。
 * 本文のデータは、data/guides.ts・data/subsidy/pages.ts・data/troubles.ts。
 */
const PAGES: Record<Cluster, ContentPage[]> = {
  guide: guidePages,
  subsidy: subsidyPages,
  trouble: troublePages,
};

const BASE: Record<Cluster, string> = { guide: "/guide", subsidy: "/subsidy", trouble: "/trouble" };

export function contentPages(cluster: Cluster): ContentPage[] {
  return PAGES[cluster];
}

export function allContentPages(): ContentPage[] {
  return [...guidePages, ...subsidyPages, ...troublePages];
}

export function getContentPage(cluster: Cluster, slug: string): ContentPage | undefined {
  return PAGES[cluster].find((p) => p.slug === slug);
}

export function contentPagePath(p: Pick<ContentPage, "cluster" | "slug">): string {
  return `${BASE[p.cluster]}/${p.slug}`;
}

/** 解説のページの metadata。補助金のページは、制度の受付が終わったら、題名の頭に【受付終了】を付ける */
export function contentMetadata(page: ContentPage): Metadata {
  const ended = page.cluster === "subsidy" && kyutouPhase() === "ended" && page.title.includes("2026");
  const title = fillTokens(page.title);
  return buildMetadata({
    title: ended ? `【受付終了】${title}` : title,
    description: ended ? fitDescription(`${kyutouShoene2026.name}は受付を終了しました。${fillTokens(page.description)}`) : fillTokens(page.description),
    path: contentPagePath(page),
    keywords: [page.keyword, ...(page.secondaryKeywords ?? [])],
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
  });
}
