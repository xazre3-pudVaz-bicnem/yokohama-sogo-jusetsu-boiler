import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqGroups, markupFaqs } from "@/data/faq";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PATH = "/faq";

export const metadata: Metadata = buildMetadata({
  title: "給湯器交換のよくある質問｜見積もり・機種・補助金・故障",
  description:
    "給湯器の交換についてよくいただく質問。お見積もりと現地調査、写真での相談、メーカーと号数の選び方、マンションでの交換、補助金の対象と申請、交換の時期の目安、対応エリアにお答えします。",
  path: PATH,
  keywords: ["給湯器交換 よくある質問", "給湯器 見積もり 無料", "給湯器 補助金 質問"],
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="よくある質問"
        title="給湯器の交換についての、よくある質問"
        lead="お見積もりの進め方から、機種の選び方、補助金、故障のときの対応まで。くわしい内容は、それぞれのページで出典とともに説明しています。"
        crumbs={[{ name: "よくある質問", href: PATH }]}
        illust="illust/pose-think"
      >
        <nav aria-label="質問の分類" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {faqGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="opt">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="bg-white">
        <div className="container-narrow section-tight space-y-14">
          {faqGroups.map((g) => (
            <section key={g.id} aria-labelledby={g.id} className="scroll-mt-24">
              <SectionHeading id={g.id} title={g.title} className="mb-6" />
              <FaqList faqs={g.faqs} />
              {/* 答えにはリンクを置けない（構造化データにそのまま入るため）ので、くわしいページは、まとまりの下に並べる */}
              {g.related?.length ? (
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1">
                  <span className="text-[0.8125rem] font-bold text-ink-mute">くわしいページ</span>
                  {g.related.map((r) => (
                    <Link key={r.href} href={r.href} className="link-arrow">
                      {r.label}
                      <Icon name="arrowRight" className="size-4" />
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <CtaBand id="cta-faq" />
      <JsonLd data={faqSchema(markupFaqs)!} />
    </>
  );
}
