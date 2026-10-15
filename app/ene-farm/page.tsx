import type { Metadata } from "next";
import Link from "next/link";
import { P, PageFooterBlocks } from "@/components/content/SimplePage";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { FieldNote } from "@/components/ui/FieldNote";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import { kyutouShoene2026 as k, yokohamaYgrep2026 as y } from "@/data/subsidy/programs";
import { products, toCard } from "@/lib/products";
import { reveal } from "@/lib/reveal";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { manYen } from "@/lib/subsidy";
import { fillTokens } from "@/lib/tokens";

const PATH = "/ene-farm";
const CHECKED = "2026-10-14";

export const metadata: Metadata = buildMetadata({
  title: "エネファームからの交換｜替える先の選び方と撤去の工事（横浜市）",
  description:
    "横浜市・戸塚区で、エネファームから別の給湯器に替えるときの確かめ方。床暖房などの温水暖房、置き場所、撤去の工事、替える先（ハイブリッド給湯器・エコキュート・ガス給湯暖房熱源機・新しいエネファーム）の違いと補助金。",
  path: PATH,
  keywords: ["エネファーム 交換", "エネファームからハイブリッド給湯器", "エネファーム 撤去", "エネファーム 横浜", "エネファーム エコキュート 交換"],
});

const FAQS = [
  {
    q: "エネファームから替えると、電気代は変わりますか。",
    a: "エネファームが発電していた分の電気は、電力会社から買うことになります。替える先の種類と、電気・ガスの料金のプラン、お湯と暖房の使い方で変わるため、決まった金額はお示ししていません。お見積もりのときに、いまの使い方を伺って考え方をご説明します。",
  },
  {
    q: "床暖房はそのまま使えますか。",
    a: "温水式の床暖房なら、温水暖房に対応した給湯器に替えれば、引き続き使える場合があります。対応するのは、ハイブリッド給湯器の暖房つきのタイプと、ガスの給湯暖房用熱源機です。床暖房の端末（パネル）が新しい機器とつなげるかを、現地で確かめます。",
  },
  {
    q: "エネファームの撤去に、補助金は出ますか。",
    a: "国の給湯省エネ2026事業の撤去加算は、電気蓄熱暖房機と電気温水器が対象で、エネファームの撤去は含まれていません。補助は、新しく設置する給湯器の種類で決まります。",
  },
];

export default function EneFarmPage() {
  const heatingModels = products.filter((p) => p.heating);
  return (
    <>
      <PageHero
        eyebrow="エネファームからの交換"
        title="エネファームから替えるとき"
        lead="エネファームは、ガスから取り出した水素で発電し、そのときの熱でお湯をつくる機器です。別の給湯器に替えるときは、発電をやめるだけでなく、お湯と暖房をどの機器で賄うかを決めます。先に確かめることと、替える先の違いをまとめました。"
        crumbs={[{ name: "エネファームからの交換", href: PATH }]}
      />

      <section aria-labelledby="check" className="bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="check" eyebrow="最初に確かめること" title="替える先を決める前に、3つを確かめる" />}>
            <ol className="steps" {...reveal()}>
              <li>
                <strong>温水暖房を使っているか。</strong>エネファームの温水で、床暖房や浴室暖房乾燥機を動かしていないかを確かめます。使っているなら、替える先は温水暖房に対応した機器に絞られます。
              </li>
              <li>
                <strong>いまの機器の型番と構成。</strong>本体の銘板の型番と、発電のユニット・お湯をためるユニットなどの置き場所を控えます。撤去する範囲は、機種の構成で変わります。
              </li>
              <li>
                <strong>置き場所と電源・配管。</strong>撤去したあとの場所に、新しい機器が収まるかを確かめます。エコキュートなら単相200Vの電源、ハイブリッド給湯器ならヒートポンプの電源が要ります。
              </li>
            </ol>
            <FieldNote label="写真をお送りいただくとき" pose="illust/pose-idea" className="mt-8">
              機器の全体、銘板（型番のシール）、床暖房のリモコン、浴室暖房乾燥機のスイッチの写真があると、替える先の候補をしぼれます。
            </FieldNote>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="options" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="options" eyebrow="替える先" title="エネファームから替えるときの、4つの選択肢" lead="発電を続けるかどうかと、温水暖房に対応するかどうかで比べます。" className="mb-9" />
          <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="エネファームから替えるときの選択肢の比較" {...reveal()}>
            <table className="table-spec">
              <thead>
                <tr>
                  <th scope="col">替える先</th>
                  <th scope="col">発電</th>
                  <th scope="col">温水暖房</th>
                  <th scope="col">ガスの契約</th>
                  <th scope="col">国の補助（給湯省エネ2026）</th>
                  <th scope="col">横浜市のポイント還元</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">新しいエネファーム</th>
                  <td>する</td>
                  <td>機種による</td>
                  <td>要る</td>
                  <td>{manYen(k.base.enefarm)}</td>
                  <td>{manYen(y.points.enefarm)}分</td>
                </tr>
                <tr>
                  <th scope="row">ハイブリッド給湯器</th>
                  <td>しない</td>
                  <td>暖房つきのタイプなら対応</td>
                  <td>要る</td>
                  <td>
                    {manYen(k.base.hybrid)}（性能加算で{manYen(k.base.hybrid + k.performanceBonus.hybrid)}）
                  </td>
                  <td>{y.hybridCovered ? "対象" : "対象外"}</td>
                </tr>
                <tr>
                  <th scope="row">エコキュート</th>
                  <td>しない</td>
                  <td>暖房は別の方法に替える</td>
                  <td>給湯には要らない</td>
                  <td>
                    {manYen(k.base.ecocute)}（性能加算で{manYen(k.base.ecocute + k.performanceBonus.ecocute)}）
                  </td>
                  <td>{manYen(y.points.ecocute)}分（太陽光発電が条件）</td>
                </tr>
                <tr>
                  <th scope="row">ガス給湯暖房用熱源機（エコジョーズ）</th>
                  <td>しない</td>
                  <td>対応</td>
                  <td>要る</td>
                  <td>対象外</td>
                  <td>対象外</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[0.8125rem] leading-[1.9] text-ink-mute">{fillTokens("{{bothVerifiedAt}}")}に確認。どちらも、条件を満たす機種・手続きの場合です。くわしくは、補助金のページをご覧ください。</p>
          <p className="mt-5">
            <Link href="/subsidy/ene-farm" className="link-arrow">
              エネファームから替えるときの補助金
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="removal" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="removal" eyebrow="撤去の工事" title="撤去のときに加わる工事" />}>
            <ul className="rows" {...reveal()}>
              {[
                ["機器の撤去と処分", "エネファームの機器を取り外して運び出し、処分します。撤去する範囲は、機種の構成によって変わります。"],
                ["ガスの配管", "エネファームにつながるガスの配管を、新しい機器に合わせてつなぎ直すか、使わない部分を処理します。ガスの工事は、資格を持つ者が行います。"],
                ["電気の配線", "発電した電気を家で使うための配線を処理します。エコキュートやハイブリッド給湯器に替える場合は、新しい電源の工事が加わることがあります。"],
                ["暖房の配管", "温水暖房を続ける場合は、新しい機器の暖房の配管につなぎ替えます。"],
                ["基礎・置き場所", "新しい機器の大きさと重さに合わせて、基礎や設置台を用意します。"],
              ].map(([t, d]) => (
                <li key={t} className="grid gap-x-8 gap-y-1 py-4 md:grid-cols-[11rem_1fr]">
                  <h3 className="font-heading text-[0.9688rem] font-black text-navy-900">{t}</h3>
                  <p className="text-[0.9063rem] leading-[1.9]">{d}</p>
                </li>
              ))}
            </ul>
            <P className="mt-6">ガス会社とメンテナンスの契約を結んでいる場合は、撤去の前に、契約の扱いをご確認ください。</P>
          </SectionSplit>
        </div>
      </section>

      {heatingModels.length > 0 && (
        <section aria-labelledby="heating-models" className="band band-paper section">
          <div className="container-x">
            <SectionHeading id="heating-models" eyebrow="温水暖房に対応する機種" title={`床暖房などを続けるときの候補（${heatingModels.length}機種）`} lead="温水暖房につなげる、ハイブリッド給湯器の暖房つきのタイプと、ガスの給湯暖房用熱源機です。" className="mb-9" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {heatingModels.map((p) => (
                <li key={p.id}>
                  <ProductCard item={toCard(p)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <PageFooterBlocks
        id="ene-farm"
        faqs={FAQS}
        faqTitle="エネファームからの交換についての質問"
        checkedAt={CHECKED}
        sources={[
          { label: "給湯省エネ2026事業【公式】対象機器の詳細（エネファーム）", url: k.urls.enefarm },
          { label: "給湯省エネ2026事業【公式】撤去加算について", url: k.urls.removalBonus },
          { label: "横浜市「横浜グリーンエネルギーパートナーシップ事業」", url: y.urls.city },
        ]}
        related={[
          { href: "/subsidy/ene-farm", label: "エネファームから替えるときの補助金", note: "替える先の種類で決まる額" },
          { href: "/hybrid", label: "ハイブリッド給湯器", note: "暖房つきのタイプもある" },
          { href: "/ecocute", label: "エコキュート", note: "電気だけでお湯をつくる種類" },
          { href: "/trouble/repair-or-replace", label: "修理か交換か", note: "年数と部品の保有期間" },
        ]}
        ctaTitle="エネファームからの交換のご相談"
      />
      <JsonLd data={serviceSchema({ path: PATH, name: "エネファームからの給湯器の交換（横浜市・戸塚区）", description: "エネファームから、ハイブリッド給湯器・エコキュート・ガス給湯暖房用熱源機などへの交換。温水暖房と置き場所を確かめてお見積もりします。" })} />
    </>
  );
}
