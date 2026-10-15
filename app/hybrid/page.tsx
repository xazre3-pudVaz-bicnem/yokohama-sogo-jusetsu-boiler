import type { Metadata } from "next";
import Link from "next/link";
import { P, PageFooterBlocks } from "@/components/content/SimplePage";
import { HybridCompare, KyutouAmounts, RegisteredTable } from "@/components/content/Widgets";
import { Figure } from "@/components/diagram/Figures";
import { JsonLd } from "@/components/seo/JsonLd";
import { FieldNote } from "@/components/ui/FieldNote";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import type { BrandId, Product } from "@/data/products/types";
import { kyutouShoene2026 as k, yokohamaYgrep2026 as y } from "@/data/subsidy/programs";
import { getBrand, productsByCategory } from "@/lib/products";
import { reveal } from "@/lib/reveal";
import { itemListSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata, formatYen } from "@/lib/seo";
import { manYen } from "@/lib/subsidy";

const PATH = "/hybrid";
const CHECKED = "2026-10-14";

export const metadata: Metadata = buildMetadata({
  title: "横浜市のハイブリッド給湯器｜ECO ONE・価格・補助金・エコキュートとの比較",
  description:
    "横浜市・戸塚区のハイブリッド給湯器の交換。電気とガスを組み合わせる仕組み、リンナイ ECO ONE・ノーリツ・パロマの機種の違い、価格の考え方、給湯省エネ2026の補助額、エコキュート・エネファームとの比較、置き場所の条件。",
  path: PATH,
  keywords: [
    "横浜市 ハイブリッド給湯器",
    "戸塚区 ハイブリッド給湯器",
    "ハイブリッド給湯器 交換",
    "ハイブリッド給湯器 価格",
    "ハイブリッド給湯器 2026",
    "リンナイ エコワン 交換",
    "エコキュート ハイブリッド給湯器 比較",
  ],
});

const hybridMax = k.base.hybrid + k.performanceBonus.hybrid;
const ecocuteMax = k.base.ecocute + k.performanceBonus.ecocute;

/** メーカーごとの、システムのメーカー希望小売価格（税込）の幅。含むものはメーカーで違うので、含むものも添える */
function msrpRange(brand: BrandId, list: Product[]) {
  const items = list.filter((p) => p.brand === brand && p.manufacturerPrice);
  if (!items.length) return null;
  const amounts = items.map((p) => p.manufacturerPrice!.amount);
  return { min: Math.min(...amounts), max: Math.max(...amounts), includes: items[0].manufacturerPrice!.includes, count: items.length };
}

const SERIES: { brand: BrandId; name: string; points: string[] }[] = [
  {
    brand: "rinnai",
    name: "ECO ONE（エコワン）",
    points: [
      "タンクが160Lのモデルと、70LのX5、ヒートポンプの専用電源工事が要らないX5 PLUG-IN MODEL",
      "ダブルハイブリッドは、給湯に加えて床暖房などの温水暖房も、電気とガスで運転する",
      "X5は軽いユニットで、基礎工事が要らない",
    ],
  },
  {
    brand: "noritz",
    name: "自然冷媒ハイブリッド給湯機 HPHB R290",
    points: [
      "貯湯ユニットは145Lと70L。70Lには、屋外コンセントにつなぐプラグイン機がある",
      "ヒートポンプの冷媒に、自然冷媒のR290を使う",
      "バックアップのガス給湯器は、暖房なし（GT-C72）と暖房あり（GTH-C71／70）から選ぶ",
    ],
  },
  {
    brand: "paloma",
    name: "HYBRID PLUS（ハイブリッドプラス）",
    points: [
      "ヒートポンプと22.5Lのタンクが一体のユニットと、ガスの熱源機の2つで構成する",
      "プラグイン対応で、ヒートポンプの専用電気工事をせずに屋外コンセントから電源をとれる",
      "設置できる地域は、省エネ基準の地域区分で4地域以南",
    ],
  },
];

export default function HybridPage() {
  const list = productsByCategory("hybrid");
  const ecoJozu = productsByCategory("eco-jozu").filter((p) => p.manufacturerPrice);
  const ecoJozuMin = ecoJozu.length ? Math.min(...ecoJozu.map((p) => p.manufacturerPrice!.amount)) : null;
  const ecoJozuMax = ecoJozu.length ? Math.max(...ecoJozu.map((p) => p.manufacturerPrice!.amount)) : null;
  const tanks = [...new Set(list.map((p) => p.capacity.tankLiters).filter((v): v is number => !!v))].sort((a, b) => a - b);
  const ecocuteTanks = [...new Set(productsByCategory("ecocute").map((p) => p.capacity.tankLiters).filter((v): v is number => !!v))].sort((a, b) => a - b);

  const faqs = [
    {
      q: "ハイブリッド給湯器の補助金は、いくらですか。",
      a: `給湯省エネ2026事業で、1台あたり${manYen(k.base.hybrid)}です。年間給湯効率が${k.hybridEfficiency.bonus}％以上の機種は、性能加算の${manYen(k.performanceBonus.hybrid)}が加わり、${manYen(hybridMax)}になります。対象は、国の対象製品リストに登録された機種です。予算の上限に達すると、期限の前でも受付が終わります。`,
    },
    {
      q: "電気代とガス代は、どれくらい安くなりますか。",
      a: "電気とガスの料金のプラン、お湯を使う量と時間、太陽光発電の有無で大きく変わるため、このサイトでは決まった金額を示していません。お見積もりでは、いまの給湯器の種類と、電気・ガスの検針票の内容を伺ったうえで、考え方をご説明します。",
    },
    {
      q: "リンナイのECO ONE（エコワン）を、新しいECO ONEに交換できますか。",
      a: "現行の機種への交換をお見積もりします。いまお使いのタンク・ヒートポンプ・ガス熱源機それぞれの型番と、置き場所の写真をお送りいただくと、組み合わせと工事の範囲を確かめやすくなります。",
    },
    {
      q: "ガス給湯器から、ハイブリッド給湯器に替えられますか。",
      a: "タンクとヒートポンプを置く場所、ユニットを載せる基礎や設置台、ヒートポンプの電源、ガスと水の配管がそろえば替えられます。いまのガス給湯器の置き場所の近くに、追加のスペースがとれるかが最初の確認です。",
    },
    {
      q: "停電のときも、お湯は使えますか。",
      a: "機種によって違います。リンナイのECO ONEは、停電対応モードでガス熱源機にポータブル電源をつなぐと給湯でき、断水時は非常用取水栓からタンクの水を生活用水として取り出せます。ノーリツのHPHB R290は、停電やガスの供給停止のときも、貯湯タンクのお湯を取り出せるとしています。",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="ハイブリッド給湯器"
        title="横浜市のハイブリッド給湯器"
        lead="ハイブリッド給湯器は、電気のヒートポンプで沸かしたお湯をためて使い、足りないときはガスで沸かす給湯器です。エコキュートよりタンクが小さいので置き場所が小さくて済み、国の補助金の対象にもなります。仕組みと機種の違い、置けるかどうかの確かめ方をまとめました。"
        crumbs={[{ name: "ハイブリッド給湯器", href: PATH }]}
      />

      <nav aria-label="このページの内容" className="border-b border-silver-200 bg-white">
        <ul className="container-x flex flex-wrap gap-x-5 gap-y-2 py-4 text-[0.875rem]">
          {[
            ["about", "仕組み"],
            ["series", "3社の機種"],
            ["merit", "メリット・デメリット"],
            ["cost", "費用"],
            ["compare-ecocute", "エコキュートとの比較"],
            ["compare-enefarm", "エネファームとの比較"],
            ["solar", "太陽光発電"],
            ["subsidy", "補助金"],
            ["space", "置き場所"],
            ["models", "機種の比較"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-link !font-normal">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-labelledby="about" className="bg-white">
        <div className="container-x section">
          <SectionSplit
            heading={
              <SectionHeading
                id="about"
                eyebrow="仕組み"
                title="電気でためて、足りない分はガスで沸かす"
                lead="国の給湯省エネ2026事業は、ハイブリッド給湯機を、ヒートポンプ給湯機とガス温水機器を組み合わせ、2つの熱源を効率よく使って給湯する機器と説明しています。"
              />
            }
          >
            <Figure name="hybrid-mechanism" />
            <div className="mt-6 space-y-4">
              <P>ふだんは、ヒートポンプが空気の熱を使って沸かし、タンクにためたお湯を使います。来客などでお湯を多く使うときや、タンクのお湯が足りないときは、ガスの熱源機ですぐに沸かして補います。</P>
              <P>ガス給湯器だけのときと比べると、置くものが増えます。タンク（またはヒートポンプと一体のタンク）、ヒートポンプ、ガスの熱源機をつなぎ、リモコンでまとめて操作します。</P>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="series" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="series" eyebrow="3社の機種" title="リンナイ・ノーリツ・パロマの、ハイブリッド給湯器の違い" lead="このサイトでは、3社の現行の機種を、型番と仕様を公式の資料で確かめて載せています。" className="mb-9" />
          <ul className="grid gap-5 lg:grid-cols-3" {...reveal()}>
            {SERIES.map((s) => {
              const count = list.filter((p) => p.brand === s.brand).length;
              return (
                <li key={s.brand} className="card card-line flex flex-col px-6 py-6">
                  <p className="text-xs font-bold text-ink-mute">{getBrand(s.brand).name}</p>
                  <h3 className="mt-1 font-heading text-[1.0625rem] font-black leading-snug text-navy-900">{s.name}</h3>
                  <ul className="dash-list mt-4 space-y-2 text-[0.9063rem] leading-[1.9]">
                    {s.points.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-5">
                    <Link href={`/products?cat=hybrid&brand=${s.brand}`} className="link-arrow">
                      {getBrand(s.brand).name}の機種（{count}件）
                      <Icon name="arrowRight" className="size-4" />
                    </Link>
                  </p>
                </li>
              );
            })}
          </ul>
          <FieldNote label="ECO ONE（エコワン）を交換するとき" pose="illust/pose-think" className="mt-9">
            いまお使いのECO ONEの、タンク・ヒートポンプ・ガス熱源機の型番を控えてください。型番のシールの写真があれば、同じ置き場所に収まる現行の組み合わせを確かめられます。
          </FieldNote>
        </div>
      </section>

      <section aria-labelledby="merit" className="cv bg-white">
        <div className="container-x section">
          <SectionHeading id="merit" eyebrow="メリット・デメリット" title="選ぶ前に知っておきたい、良い点と気をつける点" className="mb-9" />
          <div className="grid gap-6 lg:grid-cols-2" {...reveal()}>
            <div className="card card-line px-6 py-6">
              <h3 className="font-heading text-[1.0625rem] font-black text-navy-900">良い点</h3>
              <ul className="dash-list mt-4 space-y-3 text-[0.9375rem] leading-[1.95]">
                <li>タンクのお湯が足りなくなっても、ガスで沸かして補うので、お湯切れを気にしにくい</li>
                <li>タンクが小さく（このサイトの掲載機種で{tanks.map((t) => `${t}L`).join("・")}）、エコキュート（同じく{ecocuteTanks.map((t) => `${t}L`).join("・")}）より置き場所が小さくて済む</li>
                <li>
                  国の給湯省エネ2026事業の対象で、1台{manYen(k.base.hybrid)}、性能加算の要件を満たす機種は{manYen(hybridMax)}
                </li>
                <li>太陽光発電の電気でお湯を沸かす機能を持つ機種がある</li>
              </ul>
            </div>
            <div className="card card-line px-6 py-6">
              <h3 className="font-heading text-[1.0625rem] font-black text-navy-900">気をつける点</h3>
              <ul className="dash-list mt-4 space-y-3 text-[0.9375rem] leading-[1.95]">
                <li>電気とガスの両方を使うため、ガスの契約は続きます</li>
                <li>ガス給湯器だけのときより、機器の価格と工事の範囲が大きくなります</li>
                <li>ヒートポンプとタンクの置き場所、機種によっては基礎や設置台、ヒートポンプの電源の工事が要ります</li>
                <li>ヒートポンプは夜間や早朝に運転することもあるため、運転の音が隣の家の寝室などに向かない場所を選びます</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="cost" className="cv band band-paper section">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="cost" eyebrow="費用" title="初期費用とランニングコストの考え方" lead="メーカーが公表している希望小売価格を、参考として並べます。当社の販売価格ではありません。" />}>
            <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="ハイブリッド給湯器のメーカー希望小売価格の幅" {...reveal()}>
              <table className="table-spec">
                <thead>
                  <tr>
                    <th scope="col">メーカー</th>
                    <th scope="col">希望小売価格（税込・このサイトの掲載機種）</th>
                    <th scope="col">含まれるもの</th>
                  </tr>
                </thead>
                <tbody>
                  {(["rinnai", "noritz", "paloma"] as const).map((b) => {
                    const r = msrpRange(b, list);
                    if (!r) return null;
                    return (
                      <tr key={b}>
                        <th scope="row">{getBrand(b).name}</th>
                        <td className="num">{r.min === r.max ? formatYen(r.min) : `${formatYen(r.min)}〜${formatYen(r.max)}`}</td>
                        <td className="!whitespace-normal text-[0.8125rem] leading-[1.8]">{r.includes}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4">
              {ecoJozuMin !== null && ecoJozuMax !== null && (
                <P>
                  参考までに、このサイトに載せているエコジョーズの本体の希望小売価格は{formatYen(ecoJozuMin)}〜{formatYen(ecoJozuMax)}です（リモコン・工事費は別）。ハイブリッド給湯器は、機器の数が多い分、初期費用が大きくなります。
                </P>
              )}
              <P>実際の費用は、機器の価格に、リモコン、標準の工事、いまの給湯器の撤去と処分、基礎や電源などの追加の工事を足したものです。補助金を受けられる場合は、そこから差し引いて考えます。</P>
              <P>
                ランニングコスト（毎月の電気代・ガス代）は、料金のプラン、お湯の使い方、太陽光発電の有無で変わるため、このサイトでは決まった節約額を示していません。機種の性能を比べる目安は、年間給湯効率です。このページの最後の
                <a href="#models" className="text-link">
                  機種の比較
                </a>
                に、国の対象製品リストの登録値を載せています。
              </P>
              <p>
                <Link href="/guide/cost" className="link-arrow">
                  交換費用の内訳と、金額が変わる条件
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </p>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="compare-gas" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="compare-gas" eyebrow="ガス給湯器との違い" title="ガス給湯器（エコジョーズ）と比べると" />}>
            <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="ガス給湯器とハイブリッド給湯器の比較" {...reveal()}>
              <table className="table-spec">
                <thead>
                  <tr>
                    <th scope="col">比べる点</th>
                    <th scope="col">エコジョーズ</th>
                    <th scope="col">ハイブリッド給湯器</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">お湯をつくる熱</th>
                    <td>ガス</td>
                    <td>電気（ヒートポンプ）とガス</td>
                  </tr>
                  <tr>
                    <th scope="row">置くもの</th>
                    <td>給湯器の本体だけ</td>
                    <td>タンク・ヒートポンプ・ガス熱源機（一体型のタンクもある）</td>
                  </tr>
                  <tr>
                    <th scope="row">お湯のため方</th>
                    <td>ためずに、使うときに沸かす</td>
                    <td>タンクにためて使い、足りない分をガスで沸かす</td>
                  </tr>
                  <tr>
                    <th scope="row">国の給湯省エネ2026事業</th>
                    <td>対象外</td>
                    <td>
                      対象（{manYen(k.base.hybrid)}〜{manYen(hybridMax)}）
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">工事</th>
                    <td>同じ場所での入れ替えが多い</td>
                    <td>置き場所の追加、基礎や設置台、電源の工事が加わることがある</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="compare-ecocute" className="cv band band-mist section">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="compare-ecocute" eyebrow="エコキュートとの比較" title="エコキュートとハイブリッド、どちらが合うか" lead="どちらもヒートポンプでお湯を沸かしてためる給湯機です。違いは、ガスを使うかどうかと、タンクの大きさです。" />}>
            <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="エコキュートとハイブリッド給湯器の比較" {...reveal()}>
              <table className="table-spec">
                <thead>
                  <tr>
                    <th scope="col">比べる点</th>
                    <th scope="col">エコキュート</th>
                    <th scope="col">ハイブリッド給湯器</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">熱源</th>
                    <td>電気だけ</td>
                    <td>電気とガス</td>
                  </tr>
                  <tr>
                    <th scope="row">タンクの容量（このサイトの掲載機種）</th>
                    <td className="num">{ecocuteTanks.map((t) => `${t}L`).join("・")}</td>
                    <td className="num">{tanks.map((t) => `${t}L`).join("・")}</td>
                  </tr>
                  <tr>
                    <th scope="row">タンクのお湯を使い切ったとき</th>
                    <td>沸き増しを待つ</td>
                    <td>ガスで沸かして補う</td>
                  </tr>
                  <tr>
                    <th scope="row">電源</th>
                    <td>単相200Vと専用のブレーカー</td>
                    <td>機種による（専用の電源工事が要らないプラグイン機もある）</td>
                  </tr>
                  <tr>
                    <th scope="row">ガスの契約</th>
                    <td>給湯には要らない</td>
                    <td>要る</td>
                  </tr>
                  <tr>
                    <th scope="row">国の補助額（給湯省エネ2026）</th>
                    <td>
                      {manYen(k.base.ecocute)}〜{manYen(ecocuteMax)}
                    </td>
                    <td>
                      {manYen(k.base.hybrid)}〜{manYen(hybridMax)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">横浜市のポイント還元（YGrEP）</th>
                    <td>太陽光発電と組み合わせて新たに設置する場合（エコキュートからの買い替えは対象外）</td>
                    <td>{y.hybridCovered ? "対象" : "対象外"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4">
              <P>ガスをコンロや暖房でも使い続ける家、タンクを置く場所が限られる家、お湯をまとめて使うことが多い家は、ハイブリッド給湯器が候補になります。ガスの契約をやめて電気にまとめたい家、大きなタンクを置ける家は、エコキュートが候補です。</P>
              <p>
                <Link href="/ecocute" className="link-arrow">
                  エコキュートの設置条件と機種
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </p>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="compare-enefarm" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="compare-enefarm" eyebrow="エネファームとの比較" title="エネファームとハイブリッド給湯器の違い" />}>
            <div className="space-y-4" {...reveal()}>
              <P>エネファーム（家庭用燃料電池）は、都市ガスやLPガスから水素をつくり、空気中の酸素との化学反応で発電する機器です。発電のときに出る熱を回収して、お湯をつくります（給湯省エネ2026事業の対象機器の説明）。</P>
              <P>ハイブリッド給湯器は発電をしない給湯器で、電気は使う側です。エネファームからの交換では、発電する機器を続けるか、給湯だけの機器に替えるかで、選ぶ機種と工事が変わります。</P>
              <div className="callout callout-plain">
                <p className="font-heading font-bold text-navy-900">国の補助額（給湯省エネ2026事業）</p>
                <p>
                  エネファームは1台{manYen(k.base.enefarm)}、ハイブリッド給湯器は{manYen(k.base.hybrid)}〜{manYen(hybridMax)}です。
                </p>
              </div>
              <p className="flex flex-wrap gap-x-7 gap-y-2">
                <Link href="/ene-farm" className="link-arrow">
                  エネファームからの交換
                  <Icon name="arrowRight" className="size-4" />
                </Link>
                <Link href="/subsidy/ene-farm" className="link-arrow">
                  エネファームから替えるときの補助金
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </p>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="solar" className="cv band band-cream section">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="solar" eyebrow="太陽光発電" title="太陽光発電の電気で、お湯を沸かす" lead="3社とも、太陽光発電の電気を使って沸き上げる機能を持つ機種があります。" />}>
            <ul className="rows" {...reveal()}>
              {[
                ["リンナイ ECO ONE", "太陽光発電（PV）活用モード。天気予報から発電量を予測し、昼間の余った電力で前倒しで沸き上げます。"],
                ["ノーリツ HPHB R290", "太陽光発電の電力を使って貯湯する「消費優先モード」。"],
                ["パロマ HYBRID PLUS", "太陽光発電の電力を自家消費して沸き上げる「太陽光発電活用モード」（発電システムが必要）。"],
              ].map(([t, d]) => (
                <li key={t} className="grid gap-x-8 gap-y-1 py-4 md:grid-cols-[13rem_1fr]">
                  <h3 className="font-heading text-[0.9688rem] font-black text-navy-900">{t}</h3>
                  <p className="text-[0.9063rem] leading-[1.9]">{d}</p>
                </li>
              ))}
            </ul>
            <P className="mt-6">
              国の給湯省エネ2026事業は、昼間の再生可能エネルギーの電気を自家消費する機能を、ハイブリッド給湯器の要件のひとつにしています。横浜市のポイント還元（YGrEP）は、太陽光発電と組み合わせて新たに設置するエコキュートと、エネファームが対象で、ハイブリッド給湯器は{y.hybridCovered ? "対象です" : "対象外です"}。
            </P>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="subsidy" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="subsidy" eyebrow="補助金" title="ハイブリッド給湯器の補助金の条件" lead={`年間給湯効率が${k.hybridEfficiency.base}％以上で、国の対象製品リストに登録された機種が対象です。${k.hybridEfficiency.bonus}％以上なら性能加算が加わります。`} />}>
            <div className="space-y-7" {...reveal()}>
              <KyutouAmounts />
              <RegisteredTable category="hybrid" />
              <p className="flex flex-wrap gap-x-7 gap-y-2">
                <Link href="/subsidy/hybrid" className="link-arrow">
                  ハイブリッド給湯器の補助金
                  <Icon name="arrowRight" className="size-4" />
                </Link>
                <Link href="/subsidy/eco-one" className="link-arrow">
                  ECO ONE の補助金
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </p>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="space" className="cv band band-mist section">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="space" eyebrow="置き場所" title="置けるかどうかは、奥行と幅、基礎、電源で決まる" />}>
            <ul className="rows" {...reveal()}>
              {[
                ["置き場所の大きさ", "リンナイは、ECO ONE（160L）の設置スペースの目安を奥行550mm×幅2,000mm、X5の最小の奥行を500mmとしています。ノーリツとパロマにも、奥行500mmで置ける組み合わせがあります（条件あり）。"],
                ["基礎・設置台", "タンクを載せる基礎が要る機種と、軽いユニットで基礎工事が要らない機種があります。"],
                ["電源", "ヒートポンプの電源は、専用の電源工事が要る機種と、屋外コンセントにつなぐプラグイン機があります。プラグイン機でも、コンセントの回路の条件があります。"],
                ["ガス・水・排水の配管", "ガスの熱源機と、タンク・ヒートポンプの間の配管をつなぎます。ヒートポンプの結露水とタンクの排水の流し先も要ります。"],
                ["運転の音", "ヒートポンプの運転の音が、隣の家の窓や寝室に向かない場所を選びます。"],
              ].map(([t, d]) => (
                <li key={t} className="grid gap-x-8 gap-y-1 py-4 md:grid-cols-[11rem_1fr]">
                  <h3 className="font-heading text-[0.9688rem] font-black text-navy-900">{t}</h3>
                  <p className="text-[0.9063rem] leading-[1.9]">{d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="card card-line px-5 py-5">
                <h3 className="font-heading text-[0.9688rem] font-black text-navy-900">戸建て</h3>
                <p className="mt-2 text-[0.9063rem] leading-[1.9]">いまのガス給湯器の近くに、タンクとヒートポンプを置く場所がとれるかを確かめます。</p>
              </div>
              <div className="card card-line px-5 py-5">
                <h3 className="font-heading text-[0.9688rem] font-black text-navy-900">マンション</h3>
                <p className="mt-2 text-[0.9063rem] leading-[1.9]">ベランダやパイプスペースに、タンクとヒートポンプを置く場所がとれないことが多く、管理組合の承認も要ります。まずは管理規約をご確認ください。</p>
              </div>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="decide" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="decide" eyebrow="選ぶときのポイント" title="ハイブリッド給湯器が向いているか、4つの問いで確かめる" />}>
            <ol className="steps" {...reveal()}>
              <li>
                <strong>ガスを使い続けますか。</strong>コンロや暖房でガスを使うなら、給湯もガスと電気の組み合わせにしやすくなります。
              </li>
              <li>
                <strong>置き場所はありますか。</strong>いまの給湯器のまわりに、タンクとヒートポンプの分の場所があるかを確かめます。
              </li>
              <li>
                <strong>お湯の使い方は。</strong>家族の人数が多い、お湯を使う時間が重なる、来客が多い家は、ガスで補える強みが生きます。
              </li>
              <li>
                <strong>初期費用と補助金のバランスは。</strong>機器と工事の総額から、受けられる補助金を差し引いて、ガス給湯器への交換と比べます。
              </li>
            </ol>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="models" className="cv band band-paper section">
        <div className="container-x">
          <SectionHeading id="models" eyebrow="機種の比較" title={`ハイブリッド給湯器の機種を比べる（${list.length}機種）`} lead="タンクの容量、ガスの号数、タイプ、年間給湯効率、国の補助額を、1つの表で比べられます。" className="mb-9" />
          <HybridCompare />
          {/* 機種のカードは並べない（表で全機種を比べられる。カードを18枚並べると、ページが重くなる）。カードと絞り込みは一覧のページで */}
          <p className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
            <Link href="/products?cat=hybrid" className="link-arrow">
              ハイブリッド給湯器の機種を、条件で絞り込む
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link href="/compare" className="link-arrow">
              気になる機種を並べて比べる
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <PageFooterBlocks
        id="hybrid"
        faqs={faqs}
        faqTitle="ハイブリッド給湯器についての質問"
        checkedAt={CHECKED}
        sources={[
          { label: "給湯省エネ2026事業【公式】対象機器の詳細（ハイブリッド給湯機）", url: k.urls.hybrid },
          { label: "給湯省エネ2026事業【公式】対象機器の詳細（エネファーム）", url: k.urls.enefarm },
          { label: "住宅省エネ2026キャンペーン【公式】補助対象製品の検索（ハイブリッド給湯機）", url: k.urls.productSearchHybrid },
          { label: "リンナイ「ECO ONE」", url: "https://rinnai.jp/ecoone/" },
          { label: "ノーリツ「自然冷媒ハイブリッド給湯機 HPHB R290」145L MODEL", url: "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_145.html" },
          { label: "パロマ「HYBRID PLUS」製品情報", url: "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541" },
          { label: "横浜市「横浜グリーンエネルギーパートナーシップ事業」", url: y.urls.city },
        ]}
        related={[
          { href: "/subsidy/hybrid", label: "ハイブリッド給湯器の補助金", note: "基本額と性能加算、対象の機種" },
          { href: "/subsidy/eco-one", label: "ECO ONE の補助金", note: "リンナイの機種の登録の状況" },
          { href: "/ecocute", label: "エコキュート", note: "電気だけでお湯をつくる種類" },
          { href: "/compare", label: "機種を比較する", note: "気になる機種を並べて比べる" },
        ]}
        ctaTitle="ハイブリッド給湯器のお見積もり"
      />
      <JsonLd data={serviceSchema({ path: PATH, name: "ハイブリッド給湯器の交換・新設工事（横浜市・戸塚区）", description: "ハイブリッド給湯器（リンナイ ECO ONE・ノーリツ・パロマ）の交換と、ガス給湯器からの切り替え。置き場所・基礎・電源・配管を確かめてお見積もりします。" })} />
      <JsonLd data={itemListSchema("ハイブリッド給湯器の機種", list.map((p) => ({ name: `${getBrand(p.brand).name} ${p.modelNumber}`, href: `/products/${p.brand}/${p.slug}` })))} />
    </>
  );
}
