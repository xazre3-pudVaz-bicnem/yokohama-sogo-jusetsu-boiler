import type { Metadata } from "next";
import Link from "next/link";
import { PageLinkRows } from "@/components/content/PageLinks";
import { KyutouAmounts, KyutouPeriod, OperatorStatus, YgrepSummary } from "@/components/content/Widgets";
import { Figure } from "@/components/diagram/Figures";
import { BudgetMeter } from "@/components/sections/BudgetMeter";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import type { ContentPage } from "@/data/content-types";
import { kyutouShoene2026 as k, subsidySources } from "@/data/subsidy/programs";
import { contentPages } from "@/lib/content";
import { reveal } from "@/lib/reveal";
import { faqSchema, itemListSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { kyutouPhase, manYen } from "@/lib/subsidy";

const PATH = "/subsidy";

export const metadata: Metadata = buildMetadata({
  title: "給湯器の補助金 2026｜対象の種類・額・横浜市の制度",
  description:
    "給湯器の交換に使える補助金を、公式情報にもとづいて整理。国の給湯省エネ2026事業の額と条件、対象になる機種、横浜市のポイント還元、申請の流れと期限を、確認日つきで載せています。",
  path: PATH,
  keywords: ["給湯器 補助金", "給湯器 補助金 2026", "給湯器交換 補助金"],
});

/** ページをテーマごとに分けて並べる（slug の順番で指定） */
const GROUPS: { title: string; lead: string; slugs: string[] }[] = [
  { title: "制度を知る", lead: "国の給湯省エネ2026事業の、額・条件・期限・手続き。", slugs: ["kyutou-shoene-2026", "schedule", "application", "eligible-models"] },
  { title: "給湯器の種類から調べる", lead: "設置する給湯器によって、使える制度と額が変わります。", slugs: ["hybrid", "eco-one", "ecocute", "ene-farm"] },
  { title: "横浜市・戸塚区で使える制度", lead: "国の制度に加えて、横浜市のポイント還元があります。", slugs: ["yokohama", "totsuka"] },
  { title: "ほかの制度との違い", lead: "エコジョーズが対象になる制度は、別にあります。", slugs: ["mirai-eco-jutaku"] },
];

export default function SubsidyIndexPage() {
  const pages = contentPages("subsidy");
  const bySlug = (slugs: string[]) => slugs.map((s) => pages.find((p) => p.slug === s)).filter((p): p is ContentPage => !!p);
  const ended = kyutouPhase() === "ended";
  const faqs = [
    {
      q: "ガス給湯器の交換に、補助金は出ますか。",
      a: `国の${k.name}の対象は、エコキュート・ハイブリッド給湯機・エネファームの3種類で、従来型のガス給湯器とエコジョーズは対象ではありません。エコジョーズは、断熱の改修と一緒に行う場合と、賃貸の集合住宅のオーナーが交換する場合に、別の制度で対象になります。`,
    },
    {
      q: "補助金は、どのように受け取りますか。",
      a: "申請は登録された事業者が行い、補助金は事業者に交付されます。お客様への還元は、契約の代金に充てる方法か、現金で受け取る方法のどちらかを、契約のときに書面で決めます。",
    },
    {
      q: "給湯器が壊れて急いでいます。補助金は使えますか。",
      a: "使えるかどうかは、対象の機種がすぐに用意できるかと、工事の前の写真を撮れるかで決まります。エコキュートやハイブリッド給湯器は、置き場所や電気工事の確認が要るため、ガス給湯器どうしの交換より準備に日数がかかります。まずは状況をお知らせください。",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="補助金"
        title="給湯器の交換に使える補助金（2026年）"
        lead={`国の${k.name}の対象は、エコキュート・ハイブリッド給湯器・エネファームです。その額と条件、横浜市のポイント還元、申請の流れを、公式ページで確かめた内容だけでまとめています（${formatDateJa(k.verifiedAt)}確認）。`}
        crumbs={[{ name: "補助金", href: PATH }]}
        illust="illust/pose-calc"
      />

      {/* いまの状態と額 */}
      <section aria-labelledby="subsidy-now" className="bg-white">
        <div className="container-x section">
          <SectionSplit
            heading={
              <SectionHeading
                id="subsidy-now"
                eyebrow={k.ministry}
                title={`${k.name}の補助額`}
                mark="補助額"
                lead={ended ? "2026年の事業は、受付を終了しました。下の額と条件は、その記録です。" : "設置する給湯器1台ごとの定額です。性能の高い機種には加算があります。"}
              />
            }
          >
            <div className="space-y-6">
              <BudgetMeter />
              <div {...reveal()}>
                <KyutouAmounts />
              </div>
              <div {...reveal()}>
                <KyutouPeriod />
              </div>
              <p className="text-right">
                <Link href="/subsidy/kyutou-shoene-2026" className="link-arrow">
                  対象になる人・住宅・工事の条件
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </p>
            </div>
          </SectionSplit>
        </div>
      </section>

      {/* 申請の流れ */}
      <section aria-labelledby="subsidy-flow" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="subsidy-flow" eyebrow="申請の流れ" title="申請は事業者が行い、補助金は事業者から還元される" align="center" className="mb-10" />
          <Figure name="subsidy-flow" />
          <div className="mx-auto mt-8 max-w-3xl">
            <OperatorStatus />
          </div>
        </div>
      </section>

      {/* テーマ別のページ */}
      <section aria-labelledby="subsidy-pages" className="cv bg-white">
        <div className="container-x section">
          <SectionHeading id="subsidy-pages" eyebrow="くわしく調べる" title="知りたいことから、ページを選ぶ" className="mb-10" />
          <div className="space-y-12">
            {GROUPS.map((g) => {
              const list = bySlug(g.slugs);
              if (!list.length) return null;
              return (
                <div key={g.title} className="grid gap-x-12 gap-y-4 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <h3 className="h-sub">{g.title}</h3>
                    <p className="mt-2 text-[0.9063rem] leading-[1.9]">{g.lead}</p>
                  </div>
                  <div className="lg:col-span-8">
                    <PageLinkRows pages={list} columns={1} headingLevel="h3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 横浜市 */}
      <section aria-labelledby="subsidy-yokohama" className="cv band band-cream deco-tr section">
        <div className="container-x">
          <SectionSplit
            heading={<SectionHeading id="subsidy-yokohama" eyebrow="横浜市" title="横浜市のポイント還元" lead="エコキュートとエネファームが対象です。国の補助と合わせて使えますが、設置の前に、ご本人の申請が必要です。" />}
          >
            <div {...reveal()}>
              <YgrepSummary />
            </div>
            <p className="mt-5 text-right">
              <Link href="/subsidy/yokohama" className="link-arrow">
                横浜市で使える制度と、申請の順番
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </SectionSplit>
        </div>
      </section>

      {/* 商品への導線 */}
      <section aria-labelledby="subsidy-products" className="cv bg-white">
        <div className="container-x section-tight">
          <div className="card card-line grid items-center gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 id="subsidy-products" className="h-sub">
                補助金の対象機種を、商品一覧で見る
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-[1.95]">
                国の「補助対象製品の検索」で登録を確かめた機種だけを、絞り込んで表示できます。基本額は、ハイブリッド給湯器が{manYen(k.base.hybrid)}、エコキュートが{manYen(k.base.ecocute)}です。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products?subsidy=1" className="btn btn-navy">
                対象機種の一覧
                <Icon name="arrowRight" className="btn-arrow size-4" />
              </Link>
              <Link href="/hybrid" className="btn btn-outline">
                ハイブリッド給湯器
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section aria-labelledby="subsidy-faq" className="cv band band-mist section-tight">
        <div className="container-narrow">
          <SectionHeading id="subsidy-faq" eyebrow="よくある質問" title="補助金についての質問" className="mb-8" />
          <FaqList faqs={faqs} />
          <aside className="mt-10 rounded-xl bg-white px-5 py-6 sm:px-7">
            <p className="text-sm font-bold text-navy-900">このページの出典</p>
            <ul className="mt-3 space-y-1.5 text-[0.8125rem] leading-[1.8]">
              {[...subsidySources.kyutouShoene, ...subsidySources.yokohama].map((s) => (
                <li key={s.url} className="flex gap-2">
                  <Icon name="external" className="mt-1 size-3.5 shrink-0 text-ink-mute" />
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-link !font-normal break-all">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CtaBand id="cta-subsidy" title="補助金を使えるかも、お見積もりで確かめます" lead="お選びの機種が国のリストに登録されているか、いまの設置場所に置けるか、申請に間に合うか。現地で確かめたうえで、内訳の分かる見積書をお出しします。" />

      <JsonLd data={faqSchema(faqs)!} />
      <JsonLd data={itemListSchema("給湯器の補助金のページ", pages.map((p) => ({ name: p.h1, href: `${PATH}/${p.slug}` })))} />
    </>
  );
}
