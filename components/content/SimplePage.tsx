import type { ReactNode } from "react";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SourceRef } from "@/data/content-types";
import { faqSchema } from "@/lib/schema";
import { formatDateJa } from "@/lib/seo";

/**
 * 種類のページ（ガス給湯器・エコジョーズ・エコキュート・ハイブリッド・エネファーム）の、末尾の共通部分。
 * よくある質問・出典・関連ページ・お見積もりの案内を、同じ形で並べる（本文の区画は、ページごとに組む）。
 */
export function PageFooterBlocks({
  id,
  faqs,
  faqTitle,
  sources,
  checkedAt,
  related,
  ctaTitle,
}: {
  id: string;
  faqs: { q: string; a: string }[];
  faqTitle: string;
  sources: SourceRef[];
  checkedAt: string;
  related: { href: string; label: string; note?: string }[];
  ctaTitle?: string;
}) {
  return (
    <>
      {faqs.length > 0 && (
        <section aria-labelledby={`${id}-faq`} className="cv band band-mist section-tight">
          <div className="container-narrow">
            <SectionHeading id={`${id}-faq`} eyebrow="よくある質問" title={faqTitle} className="mb-8" />
            <FaqList faqs={faqs} />
          </div>
        </section>
      )}
      <div className="cv bg-white">
        <div className="container-narrow section-tight grid gap-10">
          {related.length > 0 && (
            <nav aria-labelledby={`${id}-related`}>
              <h2 id={`${id}-related`} className="h-sub mb-4">
                あわせて確かめたいページ
              </h2>
              <ul className="rows rows-2">
                {related.map((l) => (
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
          {sources.length > 0 && (
            <aside aria-labelledby={`${id}-sources`} className="rounded-xl bg-paper-2 px-5 py-6 sm:px-7">
              <h2 id={`${id}-sources`} className="text-sm font-bold text-navy-900">
                このページの出典
              </h2>
              <p className="mt-1.5 text-[0.8125rem] leading-[1.9] text-ink-mute">数値と制度の内容、メーカーの説明は、次の公式ページで確かめたものです（{formatDateJa(checkedAt)}時点）。</p>
              <ul className="mt-3 space-y-1.5 text-[0.8125rem] leading-[1.8]">
                {sources.map((s) => (
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
      <CtaBand id={`cta-${id}`} title={ctaTitle} />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)!} />}
    </>
  );
}

/** 本文の段落（読みやすい大きさと行間をそろえる） */
export function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[0.9688rem] leading-[2.05] sm:text-base sm:leading-[2.05] ${className}`}>{children}</p>;
}
