import Link from "next/link";
import { Blocks } from "@/components/content/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Crumb } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Phrase } from "@/components/ui/Phrase";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Cluster, ContentPage } from "@/data/content-types";
import { kyutouShoene2026 } from "@/data/subsidy/programs";
import { reveal } from "@/lib/reveal";
import { articleSchema, faqSchema, plainText } from "@/lib/schema";
import { formatDateJa } from "@/lib/seo";
import { kyutouPhase } from "@/lib/subsidy";
import { fillTokens } from "@/lib/tokens";

/**
 * 解説のページ（選び方・補助金・故障とトラブル）の表示。本文は data/ のデータから作る。
 *
 * 冒頭に問い合わせのボタンは置かない（ヘッダーとページの最後にある）。冒頭の下に、ページ内の目次を置く。
 * 補助金のページは、制度の受付が終わったら、冒頭に「受付終了」の帯を出す（内容は記録として残す）。
 */
export const CLUSTER_INFO: Record<Cluster, { name: string; path: string; section: string }> = {
  guide: { name: "給湯器の選び方", path: "/guide", section: "給湯器の選び方" },
  subsidy: { name: "補助金", path: "/subsidy", section: "給湯器の補助金" },
  trouble: { name: "故障・トラブル", path: "/trouble", section: "給湯器の故障・トラブル" },
};

export function contentPath(page: Pick<ContentPage, "cluster" | "slug">): string {
  return `${CLUSTER_INFO[page.cluster].path}/${page.slug}`;
}

export function ArticlePage({ page }: { page: ContentPage }) {
  const cluster = CLUSTER_INFO[page.cluster];
  const path = contentPath(page);
  const crumbs: Crumb[] = [
    { name: cluster.name, href: cluster.path },
    { name: fillTokens(page.h1), href: path },
  ];
  const ended = page.cluster === "subsidy" && kyutouPhase() === "ended";
  const faqs = (page.faqs ?? []).map((f) => ({ q: fillTokens(f.q), a: plainText(fillTokens(f.a)) }));

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={fillTokens(page.h1)} lead={<RichText>{page.lead}</RichText>} crumbs={crumbs} illust={page.illust}>
        <p className="mt-5 text-[0.8125rem] text-ink-mute">
          <time dateTime={page.updatedAt}>{formatDateJa(page.updatedAt)}</time> 更新
        </p>
      </PageHero>

      <div className="bg-white">
        <div className="container-narrow pb-4 pt-8 sm:pt-10">
          {ended && (
            <p className="callout callout-caution mb-8" role="note">
              <strong className="font-heading text-navy-900">{kyutouShoene2026.name}は、受付を終了しました。</strong>
              このページの金額と条件は、2026年の事業の内容の記録です。次の年度の制度は、国の発表でご確認ください。
            </p>
          )}
          <nav aria-label="このページの内容" className="rounded-xl bg-paper-2 px-5 py-5 sm:px-7">
            <p className="font-heading text-[0.8125rem] font-bold tracking-wider text-brand-700">このページの内容</p>
            <ol className="mt-2 grid gap-x-8 sm:grid-cols-2">
              {page.sections.map((s) => (
                <li key={s.id} className="border-b-2 border-dotted border-silver-300">
                  <a href={`#${s.id}`} className="flex min-h-11 items-center gap-2 py-2 text-[0.9063rem] font-bold leading-snug text-navy-900 hover:text-brand-700">
                    <Icon name="chevronRight" className="size-3.5 shrink-0 text-brand-500" />
                    {fillTokens(s.heading)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <article className="bg-white">
        <div className="container-narrow section-tight space-y-14 sm:space-y-16">
          {page.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
              <h2 id={`${s.id}-title`} className="h-section mb-6 text-balance" {...reveal()}>
                <Phrase>{fillTokens(s.heading)}</Phrase>
              </h2>
              <Blocks blocks={s.blocks} />
            </section>
          ))}
        </div>
      </article>

      {faqs.length > 0 && (
        <section aria-labelledby="page-faq" className="band band-mist section-tight">
          <div className="container-narrow">
            <SectionHeading id="page-faq" eyebrow="よくある質問" title={page.faqTitle ?? `${fillTokens(page.h1)}について`} className="mb-8" />
            <FaqList faqs={faqs} />
          </div>
        </section>
      )}

      <div className="bg-white">
        <div className="container-narrow section-tight grid gap-12">
          {page.related && page.related.length > 0 && (
            <nav aria-labelledby="page-related">
              <h2 id="page-related" className="h-sub mb-4">
                あわせて確かめたいページ
              </h2>
              <ul className="rows rows-2">
                {page.related.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                      <span>
                        <span className="block font-heading text-[0.9688rem] font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-700">{l.label}</span>
                        {l.note && <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-ink-mute">{l.note}</span>}
                      </span>
                      <span className="arrow-dot">
                        <Icon name="arrowRight" className="size-3.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {page.sources && page.sources.length > 0 && (
            <aside aria-labelledby="page-sources" className="rounded-xl bg-paper-2 px-5 py-6 sm:px-7">
              <h2 id="page-sources" className="text-sm font-bold text-navy-900">
                このページの出典
              </h2>
              <p className="mt-1.5 text-[0.8125rem] leading-[1.9] text-ink-mute">数値と制度の内容は、次の公式ページで確かめたものです（{formatDateJa(page.updatedAt)}時点）。制度や製品の仕様は変わることがあります。</p>
              <ul className="mt-3 space-y-1.5 text-[0.8125rem] leading-[1.8]">
                {page.sources.map((s) => (
                  <li key={s.url} className="flex gap-2">
                    <Icon name="external" className="mt-1 size-3.5 shrink-0 text-ink-mute" />
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-link !font-normal break-all">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>

      <CtaBand id={`cta-${page.cluster}-${page.slug}`} />

      <JsonLd
        data={articleSchema({
          path,
          title: fillTokens(page.h1),
          description: fillTokens(page.description),
          publishedAt: page.publishedAt,
          updatedAt: page.updatedAt,
          section: cluster.section,
          keywords: [page.keyword, ...(page.secondaryKeywords ?? [])],
        })}
      />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)!} />}
    </>
  );
}
