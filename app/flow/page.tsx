import type { Metadata } from "next";
import Link from "next/link";
import { ContactPhotoGuide } from "@/components/content/Widgets";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { FieldNote } from "@/components/ui/FieldNote";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import { reveal } from "@/lib/reveal";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PATH = "/flow";

export const metadata: Metadata = buildMetadata({
  title: "給湯器交換の流れ｜ご相談から工事・お引き渡しまで",
  description:
    "給湯器の交換の流れを、ご相談・機種のご提案・現地調査・お見積もり・ご契約・工事・お引き渡しの順に説明します。工事の日にお湯が使えない時間、種類ごとの工事の違い、補助金を使うときの手続きの入る位置も。",
  path: PATH,
  keywords: ["給湯器交換 流れ", "給湯器 交換 工事 手順", "給湯器 取り替え 当日", "給湯器交換 現地調査"],
});

const STEPS: { title: string; body: string; you?: string }[] = [
  {
    title: "ご相談",
    body: "フォーム・LINE・お電話で、いまお使いの給湯器のことをお知らせください。型番のシールと、本体の全体が写った写真があると、設置の形と号数がこちらで分かります。",
    you: "型番のシール・本体の全体・リモコンの写真",
  },
  {
    title: "機種のご提案",
    body: "いまと同じ設置の形に収まり、号数と機能が合う機種の候補をお伝えします。エコキュートやハイブリッド給湯器をお考えの場合は、国の補助金の対象になる型番かどうかも、この段階で確かめます。",
  },
  {
    title: "現地調査（無料）",
    body: "設置場所にうかがい、配管の位置と太さ、排気の向き、リモコンの線、搬入の経路を確かめます。エコジョーズはドレン排水の流し先、エコキュートとハイブリッド給湯器は置き場所・基礎・電源も確かめます。",
    you: "マンションの場合は、管理規約と、工事の届け出の決まり",
  },
  {
    title: "お見積もり",
    body: "本体・リモコン・標準工事・いまの機器の撤去と処分を分けた見積書をお出しします。現地で分かった追加の工事があれば、理由と金額を分けて書きます。",
  },
  {
    title: "ご契約・工事日の決定",
    body: "内容と金額にご納得いただけたら、ご契約です。補助金を使う場合の手続きの進め方と、必要な書類（国の決まった様式の共同事業実施規約など）は、お見積もりの際にご案内します。機器の手配ができしだい、工事の日を決めます。",
  },
  {
    title: "工事",
    body: "水とガスを止め、いまの給湯器を外します。新しい給湯器を取り付け、給水・給湯・ガスの配管とリモコンをつなぎます。補助金の申請には、取り外す前と、取り付けたあとの写真が必要になります。",
  },
  {
    title: "試運転・お引き渡し",
    body: "お湯が出ること、おふろの機能が動くこと、水やガスの漏れが無いことを確かめます。リモコンの使い方をご説明し、取扱説明書とメーカーの保証書をお渡しします。",
  },
];

const BY_TYPE: { name: string; href: string; body: string }[] = [
  {
    name: "ガス給湯器からガス給湯器",
    href: "/gas-water-heater",
    body: "同じ設置の形どうしの入れ替えが基本です。配管をつなぎ替え、リモコンを交換します。設置の形を変える場合は、配管と排気の工事が加わります。",
  },
  {
    name: "エコジョーズへ",
    href: "/eco-jozu",
    body: "運転中に出るドレン水を流す配管が要ります。流し先が取れるかを、現地調査で確かめます。マンションでは、流し先の決まりを管理組合に確かめます。",
  },
  {
    name: "エコキュートへ",
    href: "/ecocute",
    body: "貯湯タンクとヒートポンプユニットの置き場所、タンクを載せる基礎、単相200Vの電源と専用のブレーカー、搬入の経路を確かめます。ガスの配管を外す場合は、ガス会社への連絡が要ります。",
  },
  {
    name: "ハイブリッド給湯器へ",
    href: "/hybrid",
    body: "ヒートポンプ・タンク・ガスの熱源機の置き場所と、電源を確かめます。床暖房や浴室暖房乾燥機をお使いの場合は、暖房につなげるタイプを選びます。",
  },
  {
    name: "エネファームから別の給湯器へ",
    href: "/ene-farm",
    body: "発電ユニットと貯湯ユニットの撤去に加えて、ガス・電気・配管の切り替えを行います。温水の暖房を使っているかどうかで、替える先が変わります。",
  },
];

const FAQS = [
  {
    q: "工事の日は、お湯が使えなくなりますか。",
    a: "給湯器を外してから、新しい給湯器の試運転が終わるまでのあいだは、お湯が使えません。水を止めて作業する時間もあります。作業の時間は、設置の形と機種によって変わるので、お見積もりの際に目安をお伝えします。",
  },
  {
    q: "工事に立ち会いは必要ですか。",
    a: "屋外の作業が中心ですが、台所と浴室のリモコンの交換と、試運転の確認で、室内に入らせていただきます。当日のご在宅の時間は、工事の日を決めるときにご相談します。",
  },
  {
    q: "古い給湯器は、引き取ってもらえますか。",
    a: "取り外した給湯器の撤去と処分も、あわせてお受けします。費用は、本体や工事とは分けて、見積書に記載します。",
  },
  {
    q: "賃貸の住まいでも、交換を頼めますか。",
    a: "給湯器は建物の設備なので、交換の判断と費用の負担は、貸主か管理会社が行うのが通常です。不具合があるときは、まず貸主か管理会社にご連絡ください。貸主・管理会社からのご依頼もお受けしています。",
  },
];

export default function FlowPage() {
  return (
    <>
      <PageHero
        eyebrow="交換工事の流れ"
        title="ご相談から、工事・お引き渡しまで"
        lead="給湯器の交換は、いまの機種の型番と設置の形を確かめるところから始まります。現地を見てからお見積もりをお出しするので、あとから金額が変わることを減らせます。"
        crumbs={[{ name: "交換工事の流れ", href: PATH }]}
        illust="illust/people-staff-point"
      />

      <section aria-labelledby="flow-steps" className="bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="flow-steps" eyebrow="7つの段階" title="交換の進め方" lead="お見積もりと現地調査は無料です。金額と内容を見てから、ご依頼いただくかどうかを決めてください。" />}>
            <ol className="steps">
              {STEPS.map((s) => (
                <li key={s.title} {...reveal()}>
                  <h3 className="pt-1.5 text-[1.125rem] font-black leading-[1.5]">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.95]">{s.body}</p>
                  {s.you && (
                    <p className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.8438rem] leading-[1.8]">
                      <span className="badge badge-sun">ご用意いただくもの</span>
                      {s.you}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="flow-photo" className="cv band band-mist section-tight">
        <div className="container-x">
          <SectionSplit
            heading={<SectionHeading id="flow-photo" eyebrow="最初のご連絡" title="写真があると、最初のご提案が早くなります" lead="型番が分かれば、同じ場所に収まる機種の候補を、現地にうかがう前に絞れます。" />}
          >
            <div {...reveal()}>
              <ContactPhotoGuide />
            </div>
            <p className="mt-5 text-right">
              <Link href="/guide/model-label" className="link-arrow">
                型番の書いてある場所
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="flow-types" className="cv bg-white">
        <div className="container-x section">
          <SectionHeading id="flow-types" eyebrow="種類ごとの違い" title="替える先の種類で、確かめることが変わる" lead="ガス給湯器どうしの入れ替えと、エコキュート・ハイブリッド給湯器への切り替えでは、現地調査で見る点が違います。" className="mb-9" />
          <ul className="rows">
            {BY_TYPE.map((t) => (
              <li key={t.name} {...reveal()}>
                <Link href={t.href} className="group grid gap-x-8 gap-y-1 py-5 md:grid-cols-[15rem_1fr_auto] md:items-center">
                  <h3 className="font-heading text-[1.0313rem] font-black leading-[1.5] text-navy-900 transition-colors group-hover:text-brand-700">{t.name}</h3>
                  <p className="text-[0.9063rem] leading-[1.9]">{t.body}</p>
                  <span className="arrow-dot hidden md:grid">
                    <Icon name="arrowRight" className="size-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <FieldNote label="補助金を使うときの注意" pose="illust/pose-idea" className="mt-10">
            補助金の申請には、取り外す前の給湯器の写真が必要です。先に古い給湯器を外してしまうと、原則として対象になりません。補助金を使いたい場合は、ご相談の最初にお知らせください。
          </FieldNote>
          <p className="mt-6 text-right">
            <Link href="/subsidy/application" className="link-arrow">
              補助金の申請の流れ
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="flow-faq" className="cv band band-mist section-tight">
        <div className="container-narrow">
          <SectionHeading id="flow-faq" eyebrow="よくある質問" title="工事についての質問" className="mb-8" />
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <CtaBand id="cta-flow" />
      <JsonLd data={faqSchema(FAQS)!} />
    </>
  );
}
