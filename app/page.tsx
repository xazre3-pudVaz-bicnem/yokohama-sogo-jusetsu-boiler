import type { Metadata } from "next";
import Link from "next/link";
import { PageLinkRows } from "@/components/content/PageLinks";
import { KyutouAmounts } from "@/components/content/Widgets";
import { Figure } from "@/components/diagram/Figures";
import { Hero } from "@/components/home/Hero";
import { ProductCard } from "@/components/product/ProductCard";
import { BudgetMeter } from "@/components/sections/BudgetMeter";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import { wardAreas } from "@/data/areas";
import { brands } from "@/data/brands";
import { categories, gouOptions } from "@/data/categories";
import { pickupFaqs } from "@/data/faq";
import type { BrandId, CategoryId, Product } from "@/data/products/types";
import { kyutouShoene2026 as k } from "@/data/subsidy/programs";
import { works } from "@/data/works";
import { getAllPosts } from "@/lib/blog";
import { contentPages } from "@/lib/content";
import { activeBrands, getBrand, products, productsByCategory, toCard } from "@/lib/products";
import { reveal } from "@/lib/reveal";
import { buildMetadata, formatDateDot, formatYen } from "@/lib/seo";
import { officeAddressWithPostal, primaryPhone, receptionHours, siteConfig, telHref } from "@/lib/site";
import { manYen, operatorStatement } from "@/lib/subsidy";

export const metadata: Metadata = buildMetadata({
  title: "横浜市・戸塚区の給湯器交換ならヨコジュウ｜ガス給湯器・エコキュート・ハイブリッド",
  description:
    "横浜市・戸塚区の給湯器交換は、戸塚区深谷町にオフィスのある横浜総合住設（ヨコジュウ）へ。ガス給湯器・エコジョーズ・エコキュート・ハイブリッド給湯器を型番で比べられ、給湯省エネ2026の補助金も確認日つきで案内します。",
  path: "/",
  keywords: ["横浜市 給湯器交換", "横浜市 給湯器", "給湯器交換 横浜", "給湯器 専門店 横浜"],
});

/** 号数ごとの、リンナイの目安（家族の人数と、同時にお湯を使う場所）。/guide/capacity と同じ内容 */
const GOU_GUIDE: Record<number, { people: string; places: string }> = {
  24: { people: "4人家族", places: "キッチン・洗面所・浴室など3か所程度" },
  20: { people: "2人家族", places: "2か所程度" },
  16: { people: "ひとり暮らし", places: "いずれか1か所" },
};

/**
 * 種類ごとに、比べはじめる機種を選ぶ（人気や販売の順位ではない）。
 * 交換で多い条件（エコジョーズは24号・屋外壁掛・オート／フルオート、エコキュートは370L）に合う機種を、メーカーごとに1つ。
 */
function starterPicks(): { title: string; note: string; items: Product[] }[] {
  const firstOf = (list: Product[], brand: BrandId, ok: (p: Product) => boolean) => list.find((p) => p.brand === brand && ok(p));
  const pick = (category: CategoryId, ok: (p: Product) => boolean) => {
    const list = productsByCategory(category);
    return brands.map((b) => firstOf(list, b.id, ok)).filter((p): p is Product => !!p);
  };
  return [
    { title: "エコジョーズ（24号・屋外壁掛）", note: "ガス給湯器からの交換で、まず比べたい組み合わせ", items: pick("eco-jozu", (p) => p.capacity.gou === 24 && p.installationType.key === "wall" && (p.functions.key === "auto" || p.functions.key === "fullauto")) },
    { title: "エコキュート（370L）", note: "4人家族で一般的とされる容量（日本冷凍空調工業会の説明）", items: pick("ecocute", (p) => p.capacity.tankLiters === 370) },
    { title: "ハイブリッド給湯器", note: "電気とガスを組み合わせる種類", items: pick("hybrid", () => true) },
  ].filter((g) => g.items.length > 0);
}

function msrpRange(category: CategoryId): { min: number; max: number; brands: string[] } | null {
  const list = productsByCategory(category).filter((p) => p.manufacturerPrice);
  if (!list.length) return null;
  const amounts = list.map((p) => p.manufacturerPrice!.amount);
  return { min: Math.min(...amounts), max: Math.max(...amounts), brands: [...new Set(list.map((p) => getBrand(p.brand).name))] };
}

const STRENGTHS = [
  { title: "見積もり・現地調査は無料", body: "現地に伺って設置場所と配管を確かめ、本体・リモコン・標準工事・いまの機器の撤去と処分を分けた見積書をお出しします。" },
  { title: "写真で、先に分かることをお伝えします", body: "型番のシールと、設置場所の全体が分かる写真をいただければ、必要になりそうな工事の内容をお伝えできます。" },
  { title: "戸塚区深谷町にオフィス", body: "横浜市戸塚区深谷町にオフィスを置き、横浜市を中心に、神奈川県・東京都のエリアで工事を行っています。" },
  { title: "給湯器のまわりの工事も、まとめて", body: "浴室暖房乾燥機やコンロなどの住宅設備から、リフォームまで承っています。関係する工事を、まとめてご相談いただけます。" },
  { title: "補助金の対象と、進め方をご案内", body: "お選びの機種が国の補助金の対象か、いつまでに何が必要かを、公式の情報で確かめてご案内します。" },
  { title: "機種は型番で、公式の資料から", body: "このサイトの機種は、メーカーの公式サイトとカタログで、型番と仕様を確かめたものだけを載せています。" },
];

const FLOW = [
  { title: "ご相談", body: "写真でかんたん見積もり・LINE・お電話で。型番のシールと本体の写真があると、話が早く進みます。" },
  { title: "機種のご提案", body: "いまと同じ設置の形に収まり、号数と機能が合う機種の候補をお伝えします。" },
  { title: "現地調査（無料）", body: "配管・排気の向き・リモコンの線・搬入の経路を確かめます。" },
  { title: "お見積もり・ご契約", body: "内訳を分けた見積書をお出しし、ご納得いただけたらご契約です。" },
  { title: "工事・お引き渡し", body: "取り付けと試運転のあと、リモコンの使い方をご説明します。" },
];

export default function HomePage() {
  const brandsWithProducts = activeBrands();
  const picks = starterPicks();
  const guides = contentPages("guide");
  const areas = wardAreas();
  const posts = getAllPosts().slice(0, 3);
  const operator = operatorStatement();
  const phone = primaryPhone();
  const hybridMax = manYen(k.base.hybrid + k.performanceBonus.hybrid);

  return (
    <>
      {/* 1. ヒーロー */}
      <Hero productCount={products.length} brandCount={brandsWithProducts.length} />

      {/* 2. メーカーから探す */}
      <section aria-labelledby="by-brand" className="bg-white">
        <div className="container-x section">
          <SectionHeading id="by-brand" eyebrow="メーカーから探す" title={`${brandsWithProducts.length}つのメーカーの、現行の機種`} lead="ガス給湯器とハイブリッド給湯器はリンナイ・ノーリツ・パロマ、エコキュートは三菱電機・パナソニック・ダイキン・コロナです。" className="mb-9" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7" {...reveal()}>
            {brandsWithProducts.map((b) => {
              const list = products.filter((p) => p.brand === b.id);
              const kinds = [...new Set(list.map((p) => categories.find((c) => c.id === p.category)!.shortName))];
              return (
                <li key={b.id}>
                  <Link href={`/products/${b.id}`} className="card card-line group flex h-full flex-col px-4 py-4">
                    <span className="font-heading text-[1.0625rem] font-black text-navy-900 group-hover:text-brand-700">{b.name}</span>
                    <span className="mt-1.5 text-[0.75rem] leading-[1.7] text-ink-mute">{kinds.join("・")}</span>
                    <span className="mt-auto pt-3 text-[0.8125rem] font-bold text-ink-body">
                      <span className="num text-base text-navy-900">{list.length}</span> 機種
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3. 種類から探す */}
      <section aria-labelledby="by-type" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="by-type" eyebrow="種類から探す" title="ガスか、電気か、組み合わせか" lead="お湯をつくる熱の種類で、置き場所・工事・補助金が変わります。" className="mb-9" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" {...reveal()}>
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={c.path} className="card card-line group flex h-full flex-col px-5 py-5">
                  <span className="badge badge-blue self-start">{c.energy}</span>
                  <span className="mt-3 font-heading text-[1.0625rem] font-black leading-snug text-navy-900 group-hover:text-brand-700">{c.name}</span>
                  <span className="mt-2 text-[0.8125rem] leading-[1.85]">{c.summary}</span>
                  <span className="mt-auto flex items-center justify-between pt-4 text-[0.8125rem] font-bold text-ink-body">
                    <span>
                      <span className="num text-base text-navy-900">{productsByCategory(c.id).length}</span> 機種
                    </span>
                    <span className="arrow-dot">
                      <Icon name="arrowRight" className="size-3.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/ene-farm" className="card card-line group flex h-full flex-col px-5 py-5">
                <span className="badge badge-mute self-start">交換の相談</span>
                <span className="mt-3 font-heading text-[1.0625rem] font-black leading-snug text-navy-900 group-hover:text-brand-700">エネファームからの交換</span>
                <span className="mt-2 text-[0.8125rem] leading-[1.85]">温水暖房と置き場所を確かめて、替える先を選びます。</span>
                <span className="mt-auto flex justify-end pt-4">
                  <span className="arrow-dot">
                    <Icon name="arrowRight" className="size-3.5" />
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. 号数から選ぶ */}
      <section aria-labelledby="by-gou" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="by-gou" eyebrow="号数から選ぶ" title="ガス給湯器は、号数で絞り込む" lead="号数は、水温より25℃高いお湯を1分間に何リットル出せるかを表す数字です。下の人数と場所の数は、リンナイの目安です。" />}>
            <ul className="grid gap-4 sm:grid-cols-3" {...reveal()}>
              {[...gouOptions].reverse().map((g) => {
                const count = products.filter((p) => p.capacity.gou === g && (p.category === "gas" || p.category === "eco-jozu")).length;
                return (
                  <li key={g}>
                    <Link href={`/products?gou=${g}`} className="card card-line group flex h-full flex-col px-5 py-5">
                      <span className="num font-heading text-[2rem] font-semibold leading-none text-navy-900">
                        {g}
                        <span className="ml-0.5 text-base font-black">号</span>
                      </span>
                      <span className="mt-3 text-[0.9063rem] font-bold text-navy-900">{GOU_GUIDE[g].people}</span>
                      <span className="mt-1 text-[0.8125rem] leading-[1.8] text-ink-mute">同時に使う場所：{GOU_GUIDE[g].places}</span>
                      <span className="mt-auto pt-4 text-[0.8125rem] font-bold text-ink-body">
                        ガス給湯器 <span className="num text-base text-navy-900">{count}</span> 機種
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-right">
              <Link href="/guide/capacity" className="link-arrow">
                号数の選び方と、冬に出せるお湯の量
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </SectionSplit>
        </div>
      </section>

      {/* 5. まず比べたい機種 */}
      <section aria-labelledby="starter" className="band band-paper section">
        <div className="container-x">
          <SectionHeading id="starter" eyebrow="機種の一覧" title="まず比べたい機種" lead="交換で多い条件に合う機種を、種類ごとにメーカーから1つずつ並べました。人気や販売の順位ではありません。" className="mb-9" />
          <div className="space-y-12">
            {picks.map((g) => (
              <div key={g.title}>
                <h3 className="h-sub">{g.title}</h3>
                <p className="mt-1 text-[0.8438rem] text-ink-mute">{g.note}</p>
                <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {g.items.map((p) => (
                    <li key={p.id}>
                      <ProductCard item={toCard(p)} headingLevel="h4" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/products" className="btn btn-navy">
              すべての機種を条件で絞り込む
            </Link>
          </p>
        </div>
      </section>

      {/* 6. ハイブリッド給湯器特集 */}
      <section aria-labelledby="hybrid" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="hybrid" eyebrow="ハイブリッド給湯器" title="電気でためて、足りない分はガスで" lead={`ヒートポンプで沸かしたお湯をタンクにため、足りないときはガスで沸かします。国の補助金は1台${manYen(k.base.hybrid)}、性能加算の要件を満たす機種は${hybridMax}です。`} />}>
            <Figure name="hybrid-mechanism" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {(["rinnai", "noritz", "paloma"] as const).map((b) => {
                const n = productsByCategory("hybrid").filter((p) => p.brand === b).length;
                const series = { rinnai: "ECO ONE（エコワン）", noritz: "HPHB R290", paloma: "HYBRID PLUS" }[b];
                return (
                  <li key={b} className="card card-line px-4 py-4">
                    <p className="text-xs font-bold text-ink-mute">{getBrand(b).name}</p>
                    <p className="mt-0.5 font-heading text-[0.9688rem] font-black text-navy-900">{series}</p>
                    <p className="mt-1 text-[0.8125rem] text-ink-body">
                      <span className="num font-semibold">{n}</span> 構成を掲載
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
              <Link href="/hybrid" className="link-arrow">
                ハイブリッド給湯器の特集を見る
                <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link href="/hybrid#compare-ecocute" className="link-arrow">
                エコキュートとの比較
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </SectionSplit>
        </div>
      </section>

      {/* 7. 給湯省エネ2026の補助金 */}
      <section aria-labelledby="subsidy" className="cv band band-cream section">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="subsidy" eyebrow="補助金" color="sun" title={`${k.name}の補助金`} lead="エコキュート・ハイブリッド給湯器・エネファームが対象です。ガス給湯器とエコジョーズは対象ではありません。予算の上限に達すると、期限の前でも受付が終わります。" />}>
            <div className="space-y-6" {...reveal()}>
              <BudgetMeter compact />
              <KyutouAmounts />
              <p className="text-[0.8438rem] leading-[1.9] text-ink-body">{operator.text}</p>
              <p className="flex flex-wrap gap-x-7 gap-y-2">
                <Link href="/subsidy" className="link-arrow">
                  補助金の一覧と、申請の流れ
                  <Icon name="arrowRight" className="size-4" />
                </Link>
                <Link href="/subsidy/yokohama" className="link-arrow">
                  横浜市で使える制度
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </p>
            </div>
          </SectionSplit>
        </div>
      </section>

      {/* 8. 費用・価格の目安 */}
      <section aria-labelledby="cost" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="cost" eyebrow="費用の考え方" title="交換の費用は、5つの内訳で決まる" lead="当社の販売価格は、設置の条件を確かめてからのお見積もりです。参考に、メーカーの希望小売価格の幅を並べます。" />}>
            <Figure name="price-breakdown" />
            <div className="mt-6 table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="種類ごとのメーカー希望小売価格の幅">
              <table className="table-spec">
                <thead>
                  <tr>
                    <th scope="col">種類</th>
                    <th scope="col">希望小売価格（税込・掲載機種）</th>
                    <th scope="col">公表しているメーカー</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => {
                    const r = msrpRange(c.id);
                    return (
                      <tr key={c.id}>
                        <th scope="row">{c.shortName}</th>
                        <td className="num">{r ? `${formatYen(r.min)}〜${formatYen(r.max)}` : "—"}</td>
                        <td className="!whitespace-normal">{r ? r.brands.join("・") : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[0.8125rem] leading-[1.9] text-ink-mute">含まれるもの（本体だけか、リモコンやユニットを含むか）はメーカーで違います。機種のページで、それぞれの内訳を確かめられます。工事費・撤去処分費は含みません。</p>
            <p className="mt-5">
              <Link href="/guide/cost" className="link-arrow">
                交換費用の内訳と、金額が変わる条件
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </SectionSplit>
        </div>
      </section>

      {/* 9. 給湯器の選び方 */}
      <section aria-labelledby="guide" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="guide" eyebrow="給湯器の選び方" title="交換の前に、確かめておきたいこと" className="mb-8" />
          <PageLinkRows pages={guides} />
          <p className="mt-6 text-right">
            <Link href="/trouble" className="link-arrow">
              故障・トラブルのときに確かめること
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* 10. ヨコジュウの特徴 */}
      <section aria-labelledby="strengths" className="cv bg-white">
        <div className="container-x section">
          <SectionHeading id="strengths" eyebrow="ヨコジュウの特徴" title="横浜総合住設に、ご相談いただくと" className="mb-9" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" {...reveal()}>
            {STRENGTHS.map((s, i) => (
              <li key={s.title} className="card card-line px-6 py-6">
                <p className="num text-[0.8125rem] font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-heading text-[1.0313rem] font-black leading-snug text-navy-900">{s.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-[1.9]">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. 施工事例（事例が届いてから出す。架空の事例は載せない） */}
      {works.length > 0 && (
        <section aria-labelledby="works" className="cv band band-paper section">
          <div className="container-x">
            <SectionHeading id="works" eyebrow="施工事例" title="給湯器の施工事例" className="mb-8" />
            <ul className="rows rows-2">
              {works.slice(0, 4).map((w) => (
                <li key={w.slug}>
                  <Link href={`/works/${w.slug}`} className="text-link flex min-h-14 items-center py-3">
                    {w.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-right">
              <Link href="/works" className="link-arrow">
                施工事例の一覧
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* 12. 対応地域 */}
      <section aria-labelledby="area" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="area" eyebrow="対応エリア" title="戸塚区を中心に、横浜市内へ伺います" lead="区ごとに住まいの形が違うので、地域のページでは、公的な統計から交換のときに確かめることをまとめました。" />}>
            <ul className="flex flex-wrap gap-2.5" {...reveal()}>
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/area/${a.slug}`} className="opt">
                    {a.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/area/yokohama" className="opt">
                  横浜市全体
                </Link>
              </li>
            </ul>
            <p className="mt-5 text-[0.875rem] leading-[1.95]">ページの無い地域も、ご住所をお知らせいただければ、対応できるかどうかをお答えします。</p>
            <p className="mt-4">
              <Link href="/area" className="link-arrow">
                対応エリアと、区ごとの住まいの違い
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </SectionSplit>
        </div>
      </section>

      {/* 13. 交換工事の流れ */}
      <section aria-labelledby="flow" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="flow" eyebrow="交換工事の流れ" title="ご相談から、お引き渡しまで" className="mb-9" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" {...reveal()}>
            {FLOW.map((s, i) => (
              <li key={s.title} className="card card-line px-5 py-5">
                <p className="num text-[0.8125rem] font-semibold text-brand-600">STEP {i + 1}</p>
                <h3 className="mt-1 font-heading text-[0.9688rem] font-black text-navy-900">{s.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-[1.85]">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex flex-wrap justify-end gap-x-7 gap-y-2">
            <Link href="/contact/photo" className="link-arrow">
              写真でかんたん見積もり
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link href="/flow" className="link-arrow">
              交換工事の流れをくわしく
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* 14. よくある質問 */}
      <section aria-labelledby="faq" className="cv bg-white">
        <div className="container-narrow section">
          <SectionHeading id="faq" eyebrow="よくある質問" title="給湯器の交換について、よくいただく質問" className="mb-8" />
          <FaqList faqs={pickupFaqs} />
          <p className="mt-6 text-right">
            <Link href="/faq" className="link-arrow">
              よくある質問をすべて見る
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* 15. コラムの新着（記事が増えてから出す） */}
      {posts.length > 0 && (
        <section aria-labelledby="blog" className="cv band band-paper section">
          <div className="container-x">
            <SectionHeading id="blog" eyebrow="給湯器コラム" title="新しいコラム" className="mb-8" />
            <ul className="rows">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex min-h-16 flex-col justify-center gap-1 py-3 sm:flex-row sm:items-center sm:gap-6">
                    <time dateTime={p.publishedAt} className="num shrink-0 text-[0.8125rem] text-ink-mute">
                      {formatDateDot(p.publishedAt)}
                    </time>
                    <span className="font-heading text-[0.9688rem] font-bold leading-snug text-navy-900 group-hover:text-brand-700">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-right">
              <Link href="/blog" className="link-arrow">
                コラムの一覧
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* 16. 無料見積もり・問い合わせ */}
      <CtaBand id="cta-home" />

      {/* 17. 会社情報 */}
      <section aria-labelledby="company" className="bg-white">
        <div className="container-narrow section-tight">
          <h2 id="company" className="h-sub mb-4">
            運営会社
          </h2>
          <dl className="divide-y-2 divide-dotted divide-silver-300 border-y-2 border-dotted border-silver-300 text-[0.9375rem]">
            {[
              ["会社名", `${siteConfig.name}（${siteConfig.nickname}）`],
              ["戸塚オフィス", officeAddressWithPostal("totsuka")],
              ...(phone ? [["電話", `${phone}${receptionHours() ? `（受付 ${receptionHours()}）` : ""}`]] : []),
            ].map(([k2, v]) => (
              <div key={k2} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]">
                <dt className="font-bold text-navy-900">{k2}</dt>
                <dd className="leading-[1.9]">{k2 === "電話" && phone ? <a href={telHref()} className="text-link py-2 !font-normal">{v}</a> : v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
            <Link href="/company" className="link-arrow">
              運営会社について
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <a href={siteConfig.corporateUrl} className="link-arrow" target="_blank" rel="noopener">
              コーポレートサイト
              <Icon name="external" className="size-4" />
            </a>
          </p>
        </div>
      </section>

      {/* よくある質問の構造化データは /faq だけに出す（同じ質問を2か所でマークアップしない） */}
    </>
  );
}
