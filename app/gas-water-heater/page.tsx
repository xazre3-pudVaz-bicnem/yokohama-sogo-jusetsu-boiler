import type { Metadata } from "next";
import Link from "next/link";
import { P, PageFooterBlocks } from "@/components/content/SimplePage";
import { Figure } from "@/components/diagram/Figures";
import { CategoryProducts } from "@/components/product/CategoryProducts";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import { productsByCategory } from "@/lib/products";
import { reveal } from "@/lib/reveal";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PATH = "/gas-water-heater";
const CHECKED = "2026-10-14";

export const metadata: Metadata = buildMetadata({
  title: "横浜市のガス給湯器の交換｜種類・号数・機能の選び方と機種",
  description:
    "横浜市・戸塚区のガス給湯器の交換。従来型とエコジョーズの違い、給湯専用・オート・フルオート、号数、設置方式の選び方と、リンナイ・ノーリツ・パロマの機種を型番で比べられます。",
  path: PATH,
  keywords: ["横浜市 ガス給湯器", "ガス給湯器 交換", "戸塚区 ガス給湯器", "ガス給湯器 選び方", "ガスふろ給湯器 交換"],
});

const FAQS = [
  {
    q: "ガス給湯器は、同じメーカーにしないといけませんか。",
    a: "設置の形と号数が合えば、メーカーを替えることもできます。リモコンは本体と同じメーカーのものに替えるので、台所と浴室のリモコンも一緒に交換します。",
  },
  {
    q: "従来型とエコジョーズ、どちらにすればよいですか。",
    a: "まず、ドレン水の流し先が取れるかどうかが分かれ目です。取れる場所では、排気の熱を回収するエコジョーズも選べます。取れない場所では、従来型を選びます。現地調査で流し先を確かめてから、両方を比べられるようにお見積もりします。",
  },
  {
    q: "給湯器だけ替えて、リモコンはそのまま使えますか。",
    a: "リモコンは、本体の機種に合わせて交換するのが基本です。本体とリモコンの組み合わせは、メーカーが機種ごとに決めています。",
  },
];

export default function GasWaterHeaterPage() {
  const gas = productsByCategory("gas").length;
  const eco = productsByCategory("eco-jozu").length;
  return (
    <>
      <PageHero
        eyebrow="ガス給湯器"
        title="横浜市のガス給湯器の交換"
        lead="ガス給湯器は、使うときにガスの炎でお湯を沸かす給湯器です。交換では、いまと同じ設置の形に収まり、号数と機能が暮らしに合う機種を選びます。型番が分かれば、候補はすぐに絞れます。"
        crumbs={[{ name: "ガス給湯器", href: PATH }]}
        illust="illust/people-staff-ok"
      />

      <section aria-labelledby="types" className="bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="types" eyebrow="2つの種類" title="従来型とエコジョーズ" lead="どちらもガスでお湯を沸かします。違いは、排気の熱を回収するかどうかです。" />}>
            <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="従来型とエコジョーズの比較" {...reveal()}>
              <table className="table-spec">
                <thead>
                  <tr>
                    <th scope="col">比べる点</th>
                    <th scope="col">従来型</th>
                    <th scope="col">エコジョーズ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">仕組み</th>
                    <td>炎で沸かし、排気はそのまま外へ</td>
                    <td>排気の熱を回収して、水を温めてから沸かす</td>
                  </tr>
                  <tr>
                    <th scope="row">ドレン水の排水</th>
                    <td>要らない</td>
                    <td>要る（流し先の配管が必要）</td>
                  </tr>
                  <tr>
                    <th scope="row">国の給湯省エネ2026事業</th>
                    <td>対象外</td>
                    <td>対象外（ほかの制度で対象になる場合あり）</td>
                  </tr>
                  <tr>
                    <th scope="row">向いている場合</th>
                    <td>ドレン水の流し先が取れない場所</td>
                    <td>ドレン水の流し先が取れる場所</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-5">
              <Link href="/eco-jozu" className="link-arrow">
                エコジョーズの仕組みと、ドレン排水の決まり
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="functions" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="functions" eyebrow="機能" title="給湯専用・オート・フルオート" lead="おふろのお湯をどこまで自動にするかで、3つに分かれます。いまの給湯器と同じ機能にするなら、浴槽の金具（循環口）もそのまま使えます。" className="mb-9" />
          <Figure name="function-types" />
          <p className="mt-6 text-right">
            <Link href="/guide/auto-fullauto" className="link-arrow">
              オートとフルオートの違い
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="gou" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="gou" eyebrow="号数" title="号数は、同時に使うお湯の量で決める" lead="号数は、水温より25℃高いお湯を、1分間に何リットル出せるかを表す数字です（リンナイの説明）。" />}>
            <Figure name="gou" />
            <p className="mt-5 text-right">
              <Link href="/guide/capacity" className="link-arrow">
                号数の選び方
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="install" className="cv band band-paper section">
        <div className="container-x">
          <SectionHeading id="install" eyebrow="設置方式" title="同じ設置の形に入れ替えるのが基本" lead="設置の形を変えると、配管と排気の工事が加わります。いまの給湯器がどの形かを、まず確かめます。" className="mb-9" />
          <Figure name="install-types" />
          <p className="mt-6 text-right">
            <Link href="/guide/installation-types" className="link-arrow">
              設置方式の見分け方
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="products" className="bg-white">
        <div className="container-x section">
          <SectionHeading id="products" eyebrow="機種" title={`ガス給湯器の機種（エコジョーズ ${eco}機種・従来型 ${gas}機種）`} lead="型番は、リンナイ・ノーリツ・パロマの公式サイトとカタログで確かめたものです。" className="mb-10" />
          <CategoryProducts categories={["eco-jozu", "gas"]} filterHref="/products?cat=eco-jozu,gas" />
          <div className="mt-12 space-y-4">
            <P>ガス給湯器から、エコキュートやハイブリッド給湯器に替えることもできます。どちらも、国のリストに登録された機種は国の補助金の対象ですが、タンクを置く場所と、電源の工事が要ります。</P>
            <p className="flex flex-wrap gap-x-7 gap-y-2">
              <Link href="/hybrid" className="link-arrow">
                ハイブリッド給湯器
                <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link href="/ecocute" className="link-arrow">
                エコキュート
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <PageFooterBlocks
        id="gas"
        faqs={FAQS}
        faqTitle="ガス給湯器の交換についての質問"
        checkedAt={CHECKED}
        sources={[
          { label: "リンナイ「号数とは」", url: "https://rinnai.jp/products/waterheater/gas/about/power/" },
          { label: "ノーリツ「エコジョーズ」", url: "https://www.noritz.co.jp/product/kyutou_bath/gas/eco_j/" },
        ]}
        related={[
          { href: "/guide/timing", label: "給湯器の交換時期の目安", note: "設計上の標準使用期間と前ぶれ" },
          { href: "/guide/cost", label: "交換費用の考え方", note: "総額の内訳と、変わる理由" },
          { href: "/trouble", label: "故障・トラブル", note: "お湯が出ない・エラーが出るとき" },
          { href: "/compare", label: "機種を比較する", note: "仕様を並べて比べる" },
        ]}
        ctaTitle="ガス給湯器の交換のお見積もり"
      />
      <JsonLd data={serviceSchema({ path: PATH, name: "ガス給湯器の交換工事（横浜市・戸塚区）", description: "ガス給湯器（従来型・エコジョーズ）の交換。設置の形・号数・機能を確かめ、同じ場所に収まる機種をご提案します。" })} />
    </>
  );
}
