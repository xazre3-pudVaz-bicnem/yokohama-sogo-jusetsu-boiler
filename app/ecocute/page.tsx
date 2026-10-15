import type { Metadata } from "next";
import Link from "next/link";
import { P, PageFooterBlocks } from "@/components/content/SimplePage";
import { KyutouAmounts, YgrepSummary } from "@/components/content/Widgets";
import { Figure } from "@/components/diagram/Figures";
import { CategoryProducts } from "@/components/product/CategoryProducts";
import { JsonLd } from "@/components/seo/JsonLd";
import { FieldNote } from "@/components/ui/FieldNote";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import { getBrand, productsByCategory } from "@/lib/products";
import { reveal } from "@/lib/reveal";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PATH = "/ecocute";
const CHECKED = "2026-10-14";

export const metadata: Metadata = buildMetadata({
  title: "横浜市のエコキュート交換｜設置条件・容量・補助金と機種",
  description:
    "横浜市・戸塚区のエコキュートの交換と、ガス給湯器からの切り替え。タンクとヒートポンプの置き場所、基礎・200V電源・搬入の条件、容量の選び方、国と横浜市の補助、三菱電機・パナソニック・ダイキン・コロナの機種。",
  path: PATH,
  keywords: ["横浜市 エコキュート", "エコキュート 交換", "戸塚区 エコキュート", "エコキュート 設置条件", "ガス給湯器 エコキュート 切り替え"],
});

const FAQS = [
  {
    q: "ガス給湯器からエコキュートに替えられますか。",
    a: "タンクとヒートポンプユニットの置き場所、タンクを載せる基礎、単相200Vの電源、搬入の経路がそろえば替えられます。ガスの配管を撤去するときは、ガス会社への連絡が要ります。",
  },
  {
    q: "ヒートポンプユニットの下が濡れています。故障ですか。",
    a: "三菱電機の説明では、運転中は熱交換器で空気が冷やされて結露し、水が出ますが、故障ではありません。運転を止めているのに、まわりだけ乾かずに常に濡れている場合は、配管からの水漏れなどの可能性があるので、点検をご相談ください。",
  },
  {
    q: "マンションでもエコキュートは使えますか。",
    a: "タンクとヒートポンプを置く場所が取れないことが多く、管理組合の承認も要ります。マンション向けの薄型の機種もありますが、置けるかどうかは建物の条件しだいです。",
  },
];

export default function EcocutePage() {
  const list = productsByCategory("ecocute");
  // タンクの容量ごとに、メーカーが示す家族の人数の目安を並べる（表記はメーカーのまま）
  const sizes = [...new Set(list.map((p) => p.capacity.tankLiters).filter((v): v is number => !!v))].sort((a, b) => a - b);
  const familyRows = sizes.map((l) => {
    const labels = [...new Set(list.filter((p) => p.capacity.tankLiters === l && p.capacity.familySize).map((p) => `${getBrand(p.brand).name}：${p.capacity.familySize}`))];
    return [`${l}L`, labels.join("／") || "—"];
  });

  return (
    <>
      <PageHero
        eyebrow="エコキュート"
        title="横浜市のエコキュート交換"
        lead="エコキュートは、空気の熱を使って電気でお湯を沸かし、タンクにためておく給湯機です。交換も新しく入れる場合も、タンクとヒートポンプの置き場所、基礎と電源、運び込む道筋が決め手になります。"
        crumbs={[{ name: "エコキュート", href: PATH }]}
      />

      <section aria-labelledby="mechanism" className="bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="mechanism" eyebrow="仕組み" title="空気の熱でお湯を沸かして、ためておく" lead="エアコンの暖房と同じ原理で、外の空気の熱をくみ上げます（日本冷凍空調工業会の説明）。" />}>
            <Figure name="ecocute-mechanism" />
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="conditions" className="cv band band-mist section">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="conditions" eyebrow="設置の条件" title="置けるかどうかは、5つの条件で決まる" />}>
            <ul className="rows" {...reveal()}>
              {[
                ["置き場所", "貯湯タンクとヒートポンプユニットの両方を置ける場所。薄型やスリム型のタンクもあります。"],
                ["基礎", "タンクは満水のとき約400kg〜600kgになるため、しっかりした基礎を作り、アンカーボルトで固定します。"],
                ["電源", "単相200Vの電源と、専用のブレーカーが要ります。分電盤の容量の変更や、配線の工事が必要になることがあります。"],
                ["排水", "タンクの排水口から出る膨張水と、ヒートポンプの結露水を流す配管が要ります。"],
                ["運転の音と、運び込む道筋", "夜間にも運転するため、音が隣の家の寝室などに向かない場所に置きます。タンクを運び込める通路の幅と段差も確かめます。"],
              ].map(([t, d]) => (
                <li key={t} className="grid gap-x-8 gap-y-1 py-4 md:grid-cols-[12rem_1fr]">
                  <h3 className="font-heading text-[0.9688rem] font-black text-navy-900">{t}</h3>
                  <p className="text-[0.9063rem] leading-[1.9]">{d}</p>
                </li>
              ))}
            </ul>
            <FieldNote label="ガス給湯器から替えるとき" pose="illust/pose-think" className="mt-8">
              ガス給湯器と配管を撤去するときは、ガス会社への事前の連絡が必要です。ガスをほかの機器（コンロ・暖房）で使い続けるかどうかで、撤去する範囲が変わります。
            </FieldNote>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="size" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="size" eyebrow="容量" title="タンクの容量は、家族の人数とお湯の使い方で選ぶ" lead="日本冷凍空調工業会の説明では、4人家族なら370Lのタンクが一般的です。各メーカーは、容量ごとに人数の目安を示しています。" />}>
            <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="タンクの容量と家族の人数の目安" {...reveal()}>
              <table className="table-spec">
                <thead>
                  <tr>
                    <th scope="col">タンクの容量</th>
                    <th scope="col">メーカーの示す人数の目安（このサイトの掲載機種）</th>
                  </tr>
                </thead>
                <tbody>
                  {familyRows.map(([l, t]) => (
                    <tr key={l}>
                      <th scope="row" className="num">
                        {l}
                      </th>
                      <td>{t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <P className="mt-5">人数の目安は、お湯の使い方で変わります。シャワーを使う時間が長い、来客が多い、二世帯で使う、といった場合は、ひとつ大きい容量を考えます。逆に、容量に余裕がありすぎると、使わないお湯まで沸かすことになります。</P>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="subsidy" className="cv band band-cream section">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="subsidy" eyebrow="補助金" title="国の補助と、横浜市のポイント還元" lead="国のリストに登録された機種は、給湯省エネ2026事業の対象です。横浜市では、太陽光発電のある家なら、市のポイント還元も合わせて使える場合があります。" />}>
            <div className="space-y-6" {...reveal()}>
              <KyutouAmounts />
              <YgrepSummary />
              <Link href="/subsidy/ecocute" className="link-arrow">
                エコキュートの補助金の条件と、対象の機種
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="products" className="bg-white">
        <div className="container-x section">
          <SectionHeading id="products" eyebrow="機種" title={`エコキュートの機種（${list.length}機種）`} lead="いずれも一般地向け（横浜市は一般地）の機種です。型番・仕様・補助金の登録の状況は、各メーカーの公式情報と、国の対象製品リストで確かめました。" className="mb-10" />
          <CategoryProducts categories={["ecocute"]} filterHref="/products?cat=ecocute" />
        </div>
      </section>

      <PageFooterBlocks
        id="ecocute"
        faqs={FAQS}
        faqTitle="エコキュートについての質問"
        checkedAt={CHECKED}
        sources={[
          { label: "日本冷凍空調工業会「ヒートポンプ給湯機とは」", url: "https://www.jraia.or.jp/product/heatpump/p_about.html" },
          { label: "日本冷凍空調工業会「設置にあたっての注意」", url: "https://www.jraia.or.jp/product/heatpump/i_attention.html" },
          { label: "日本冷凍空調工業会「機種の選び方」", url: "https://www.jraia.or.jp/product/heatpump/p_choose.html" },
          { label: "三菱電機 よくあるご質問（ヒートポンプユニットからの水）", url: "https://faq01.mitsubishielectric.co.jp/faq/show/1406?category_id=297&site_domain=default" },
          { label: "給湯省エネ2026事業【公式】対象機器の詳細（エコキュート）", url: "https://kyutou-shoene2026.meti.go.jp/materials/ecocute.html" },
          { label: "横浜市「横浜グリーンエネルギーパートナーシップ事業」", url: "https://www.city.yokohama.lg.jp/kurashi/machizukuri-kankyo/ondanka/hojo-sien/YGrEP.html" },
        ]}
        related={[
          { href: "/hybrid", label: "ハイブリッド給湯器", note: "エコキュートとの違いと、向いている家" },
          { href: "/subsidy/ecocute", label: "エコキュートの補助金", note: "目標基準値と性能加算" },
          { href: "/area/izumi", label: "泉区の給湯器交換", note: "一戸建てが多い区での考え方" },
          { href: "/compare", label: "機種を比較する", note: "容量・圧力・寸法を並べて比べる" },
        ]}
        ctaTitle="エコキュートのお見積もり"
      />
      <JsonLd data={serviceSchema({ path: PATH, name: "エコキュートの交換・新設工事（横浜市・戸塚区）", description: "エコキュートの交換と、ガス給湯器からの切り替え。置き場所・基礎・電源・搬入の経路を確かめてお見積もりします。" })} />
    </>
  );
}
