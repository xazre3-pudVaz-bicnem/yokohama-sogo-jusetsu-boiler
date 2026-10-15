import type { Metadata } from "next";
import Link from "next/link";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { ManufacturerLogoGrid } from "@/components/brand/ManufacturerLogoGrid";
import { PhotoSlotFigure } from "@/components/contact/PhotoSlotFigure";
import { PageLinkRows } from "@/components/content/PageLinks";
import { KyutouAmounts } from "@/components/content/Widgets";
import { Figure } from "@/components/diagram/Figures";
import { Hero, type HeroShowcase } from "@/components/home/Hero";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductImage } from "@/components/product/ProductImage";
import { BudgetMeter } from "@/components/sections/BudgetMeter";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import { wardAreas } from "@/data/areas";
import { brands } from "@/data/brands";
import { categories, gouGuide, gouOptions } from "@/data/categories";
import { pickupFaqs } from "@/data/faq";
import type { BrandId, CategoryId, Product } from "@/data/products/types";
import { kyutouShoene2026 as k } from "@/data/subsidy/programs";
import { works } from "@/data/works";
import { getAllPosts } from "@/lib/blog";
import { isContactFormShown } from "@/lib/contact";
import { contentPages } from "@/lib/content";
import { activeBrands, getBrand, productPath, products, productsByCategory, subsidyView, toCard } from "@/lib/products";
import { reveal } from "@/lib/reveal";
import { buildMetadata, formatDateDot, formatYen } from "@/lib/seo";
import { lineUrl, officeAddressWithPostal, primaryPhone, receptionHours, siteConfig, telHref } from "@/lib/site";
import { manYen, operatorStatement } from "@/lib/subsidy";

export const metadata: Metadata = buildMetadata({
  title: "横浜市・戸塚区の給湯器交換ならヨコジュウ｜ガス給湯器・エコキュート・ハイブリッド",
  description:
    "横浜市・戸塚区の給湯器交換は、戸塚区深谷町にオフィスのある横浜総合住設（ヨコジュウ）へ。ガス給湯器・エコジョーズ・エコキュート・ハイブリッド給湯器を写真と型番で比べられ、給湯省エネ2026の補助金も確認日つきで案内します。",
  path: "/",
  // 地域（戸塚区）・エコキュート・ハイブリッド給湯器の検索語は、それぞれのページの担当（トップで取り合わない）
  keywords: ["横浜市 給湯器交換", "横浜市 給湯器", "給湯器交換 横浜", "給湯器 専門店 横浜"],
});

/** 写真のある機種を先に（写真の無い機種は、設置タイプの図になる） */
const photoFirst = (list: Product[]) => [...list].sort((a, b) => Number(b.images.length > 0) - Number(a.images.length > 0));

/**
 * 冒頭に並べる、種類ごとの代表の写真（ガス給湯器・エコキュート・ハイブリッド給湯器）。
 * 写真のある機種から、候補の順に1つずつ選ぶ（人気や販売の順位ではない）。
 */
function heroShowcase(): HeroShowcase[] {
  const pickFrom = (category: CategoryId[], preferred: string[]) => {
    const list = products.filter((p) => category.includes(p.category));
    return preferred.map((id) => list.find((p) => p.id === id && p.images.length)).find(Boolean) ?? photoFirst(list)[0];
  };
  const groups: { label: string; href: string; p: Product | undefined }[] = [
    { label: "ガス給湯器", href: "/eco-jozu", p: pickFrom(["eco-jozu", "gas"], ["rinnai-ruf-e240esaw", "noritz-gt-c2472saw-1-bl", "paloma-fh-eh2422sawl"]) },
    { label: "エコキュート", href: "/ecocute", p: pickFrom(["ecocute"], ["panasonic-he-j37nqs", "corona-chp-37az2", "mitsubishi-srt-s377", "daikin-ea377afv"]) },
    { label: "ハイブリッド給湯器", href: "/hybrid", p: pickFrom(["hybrid"], ["rinnai-rhbh-rc248aw2-1-rhp-r223-s-rtu-r1603", "noritz-sh-q0701-bl-hp-2233-bl-gt-c2472aw-1-bl", "paloma-hb-232tuhpl-p-fh-eh2422sawl"]) },
  ];
  return groups
    .filter((g): g is { label: string; href: string; p: Product } => !!g.p)
    .map(({ label, href, p }) => {
      const card = toCard(p);
      return {
        label,
        href,
        brandName: card.brandName,
        brandLogo: card.brandLogo,
        caption: card.imageShared ? p.series : p.modelNumber.split(" + ")[0],
        image: card.image,
        shared: card.imageShared,
        category: p.category,
        installKey: p.installationType.key,
      };
    });
}

/**
 * 写真つきで並べる「まず比較したい機種」（人気や販売の順位ではない）。
 * 交換で多い条件（ガスは24号・屋外壁掛、エコキュートは370L）と、補助金の対象を確かめた機種から、メーカーごとに1つずつ。
 */
function starterPicks(): { id: string; title: string; note: string; href: string; items: Product[] }[] {
  const firstOf = (list: Product[], brand: BrandId, ok: (p: Product) => boolean) => photoFirst(list).find((p) => p.brand === brand && ok(p));
  const pick = (category: CategoryId, ok: (p: Product) => boolean) => {
    const list = productsByCategory(category);
    return brands.map((b) => firstOf(list, b.id, ok)).filter((p): p is Product => !!p);
  };
  const subsidyChecked = photoFirst(products.filter((p) => subsidyView(p).eligible));
  const subsidyPicks = brands.map((b) => subsidyChecked.find((p) => p.brand === b.id)).filter((p): p is Product => !!p);
  return [
    { id: "pick-24", title: "24号・フルオート／オートのエコジョーズ", note: "ガス給湯器からの交換で、まず比べたい組み合わせ（屋外壁掛）", href: "/products?gou=24&install=wall&cat=eco-jozu", items: pick("eco-jozu", (p) => p.capacity.gou === 24 && p.installationType.key === "wall" && (p.functions.key === "auto" || p.functions.key === "fullauto")) },
    { id: "pick-370", title: "370Lのエコキュート", note: "4人家族で一般的とされる容量（日本冷凍空調工業会の説明）", href: "/products?tank=370", items: pick("ecocute", (p) => p.capacity.tankLiters === 370) },
    { id: "pick-hybrid", title: "ハイブリッド給湯器", note: "電気のヒートポンプとガスを組み合わせる種類", href: "/products?cat=hybrid", items: pick("hybrid", () => true) },
    { id: "pick-subsidy", title: "補助金の対象を確認済みの機種", note: `国の${k.name}の対象製品リストで、登録を確かめた機種`, href: "/products?subsidy=1", items: subsidyPicks.slice(0, 4) },
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

/** ハイブリッド給湯器の、メーカーごとのシリーズ（公式の呼び名） */
const HYBRID_SERIES: Partial<Record<BrandId, string>> = { rinnai: "ECO ONE（エコワン）", noritz: "ハイブリッド給湯器（HPHB R290）", paloma: "HYBRID PLUS" };

export default function HomePage() {
  const brandsWithProducts = activeBrands();
  const picks = starterPicks();
  const guides = contentPages("guide");
  const areas = wardAreas();
  const posts = getAllPosts().slice(0, 3);
  const operator = operatorStatement();
  const phone = primaryPhone();
  const line = lineUrl();
  const form = isContactFormShown();
  const hybridMax = manYen(k.base.hybrid + k.performanceBonus.hybrid);
  const hybrids = (["rinnai", "noritz", "paloma"] as const)
    .map((b) => ({ b, list: photoFirst(productsByCategory("hybrid").filter((p) => p.brand === b)) }))
    .filter((g) => g.list.length > 0);

  return (
    <>
      {/* 1. ファーストビュー */}
      <Hero showcase={heroShowcase()} productCount={products.length} brandCount={brandsWithProducts.length} line={line} formLabel={form ? "無料見積もりを依頼する" : "ご相談・お見積もりの方法"} />

      {/* 2. 取り扱いメーカー（公式ロゴ） */}
      <section aria-labelledby="makers" className="bg-white">
        <div className="container-x py-8 sm:py-10">
          <ManufacturerLogoGrid headingId="makers" />
        </div>
      </section>

      {/* 3. 給湯器を種類から探す */}
      <section aria-labelledby="by-type" className="cv band band-paper section">
        <div className="container-x">
          <SectionHeading id="by-type" eyebrow="種類から探す" title="ガスか、電気か、組み合わせか" lead="お湯をつくる熱の種類で、置き場所・工事・補助金が変わります。" className="mb-9" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" {...reveal()}>
            {categories.map((c) => {
              const list = productsByCategory(c.id);
              const sample = photoFirst(list)[0];
              const card = sample ? toCard(sample) : null;
              return (
                <li key={c.id}>
                  <Link href={c.path} className="pcard group overflow-hidden">
                    <div className="px-3 pt-3">
                      <ProductImage image={card?.image ?? null} shared={card?.imageShared} category={c.id} installKey={sample?.installationType.key ?? "wall"} sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 92vw" note={false} />
                    </div>
                    <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
                      <span className="badge badge-blue self-start">{c.energy}</span>
                      <span className="mt-2.5 font-heading text-[1.0625rem] font-bold leading-snug text-navy-900 group-hover:text-brand-700">{c.name}</span>
                      <span className="mt-1.5 text-[0.8125rem] leading-[1.85]">{c.summary}</span>
                      <span className="mt-auto flex items-center justify-between pt-4 text-[0.8125rem] font-bold text-ink-body">
                        <span>
                          <span className="num text-base text-navy-900">{list.length}</span> 機種
                        </span>
                        <span className="arrow-dot">
                          <Icon name="arrowRight" className="size-3.5" />
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-xl border border-silver-200 bg-white px-5 py-4">
              <p className="text-[0.8125rem] font-bold text-navy-900">ガス給湯器は、号数で絞り込む（リンナイの目安）</p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {[...gouOptions].reverse().map((g) => (
                  <li key={g}>
                    <Link href={`/products?gou=${g}`} className="chip">
                      <span className="num font-semibold">{g}号</span>
                      <span className="font-normal text-ink-mute">{gouGuide[g].people}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/guide/capacity" className="chip">
                    号数の選び方
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="/ene-farm" className="group flex items-center justify-between gap-4 rounded-xl border border-silver-200 bg-white px-5 py-4">
              <span>
                <span className="block text-[0.8125rem] font-bold text-navy-900 group-hover:text-brand-700">エネファームからの交換</span>
                <span className="mt-1 block text-[0.8125rem] leading-[1.8] text-ink-mute">温水暖房と置き場所を確かめて、替える先を選びます。</span>
              </span>
              <span className="arrow-dot">
                <Icon name="arrowRight" className="size-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 写真付きの、まず比較したい機種 */}
      <section aria-labelledby="starter" className="cv bg-white">
        <div className="container-x section">
          <SectionHeading id="starter" eyebrow="機種を選ぶ" title="まず比較したい機種" lead="交換で多い条件に合う機種を、メーカーごとに1つずつ並べました。人気や販売の順位ではありません。" className="mb-9" />
          <div className="space-y-12">
            {picks.map((g) => (
              <div key={g.id}>
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-navy-900 pb-2.5">
                  <div>
                    <h3 id={g.id} className="h-sub">
                      {g.title}
                    </h3>
                    <p className="mt-0.5 text-[0.8438rem] text-ink-mute">{g.note}</p>
                  </div>
                  <Link href={g.href} className="inline-flex min-h-10 items-center gap-1 text-[0.8125rem] font-bold text-brand-700 underline-offset-4 hover:underline">
                    条件に合う機種をすべて見る
                    <Icon name="arrowRight" className="size-3.5" />
                  </Link>
                </div>
                <ul className="scroller mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-labelledby={g.id}>
                  {g.items.map((p) => (
                    <li key={p.id}>
                      <ProductCard item={toCard(p)} headingLevel="h4" sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 80vw" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/products" className="btn btn-navy">
              すべての機種を条件で絞り込む
              <Icon name="arrowRight" className="btn-arrow size-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* 5. 写真でかんたん見積もり */}
      <section aria-labelledby="photo-estimate" className="cv band band-mist section">
        <div className="container-x grid items-center gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHeading id="photo-estimate" eyebrow="写真でかんたん見積もり" title="機種が分からなくても、写真を送るだけで相談できます" lead="いまの給湯器の型番のシールと、本体の全体の写真があれば、交換できる機種の候補と、必要になりそうな工事をお伝えします。" />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact/photo" className="btn btn-cta">
                写真でかんたん見積もり
                <Icon name="arrowRight" className="btn-arrow size-4" />
              </Link>
              {line && (
                <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-line" data-cv="line">
                  <LineIcon className="size-5" />
                  LINE で写真を送る
                </a>
              )}
            </div>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3" {...reveal()}>
            {(
              [
                ["label", "型番のシール", "本体の正面や側面のシールに近づいて撮ります"],
                ["whole", "給湯器の全体", "1〜2m 離れて、配管とまわりまで入れて撮ります"],
                ["extra", "リモコン・配管", "わかる範囲で。無くても相談できます"],
              ] as const
            ).map(([slot, title, body], i) => (
              <li key={slot} className="card card-line px-4 py-4">
                <PhotoSlotFigure slot={slot} className="h-auto w-full" />
                <p className="mt-3 font-heading text-[0.9375rem] font-bold text-navy-900">
                  <span className="num mr-1.5 text-brand-600">{i + 1}</span>
                  {title}
                </p>
                <p className="mt-1 text-[0.8125rem] leading-[1.8]">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. ハイブリッド給湯器特集 */}
      <section aria-labelledby="hybrid" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="hybrid" eyebrow="ハイブリッド給湯器" title="電気でためて、足りない分はガスで" lead={`ヒートポンプで沸かしたお湯をタンクにため、足りないときはガスで沸かします。国の補助金は1台${manYen(k.base.hybrid)}、性能加算の要件を満たす機種は${hybridMax}です。`} />}>
            <ul className="grid gap-4 sm:grid-cols-3">
              {hybrids.map(({ b, list }) => {
                const brand = getBrand(b);
                const card = toCard(list[0]);
                return (
                  <li key={b}>
                    <Link href={productPath(list[0])} className="pcard group">
                      <div className="flex min-h-11 items-center px-3.5 pt-3">
                        <MakerLogo logo={brand.logo} name={brand.name} height={20} />
                      </div>
                      <div className="px-3 pt-2">
                        <ProductImage image={card.image} shared={card.imageShared} category="hybrid" installKey="ground" sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 92vw" note={false} />
                      </div>
                      <div className="px-3.5 pb-4 pt-3">
                        <p className="font-heading text-[0.9688rem] font-bold leading-snug text-navy-900 group-hover:text-brand-700">{HYBRID_SERIES[b]}</p>
                        <p className="mt-1 text-[0.8125rem] text-ink-body">
                          <span className="num font-semibold">{list.length}</span> 構成を掲載
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6">
              <Figure name="hybrid-mechanism" />
            </div>
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
      <section aria-labelledby="subsidy" className="cv band band-paper section">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="subsidy" eyebrow="補助金" color="sun" title={`${k.name}の補助金`} lead="国のリストに登録されたエコキュート・ハイブリッド給湯器・エネファームが対象です。ガス給湯器とエコジョーズは対象ではありません。予算の上限に達すると、期限の前でも受付が終わります。" />}>
            <div className="space-y-6" {...reveal()}>
              <BudgetMeter compact />
              <KyutouAmounts />
              <p className="text-[0.8438rem] leading-[1.9] text-ink-body">{operator.text}</p>
              <p className="flex flex-wrap gap-x-7 gap-y-2">
                <Link href="/subsidy" className="link-arrow">
                  補助金の一覧と、申請の流れ
                  <Icon name="arrowRight" className="size-4" />
                </Link>
                <Link href="/products?subsidy=1" className="link-arrow">
                  補助金の対象を確認済みの機種
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

      {/* 8. ヨコジュウの特徴 */}
      <section aria-labelledby="strengths" className="cv bg-white">
        <div className="container-x section">
          <SectionHeading id="strengths" eyebrow="ヨコジュウの特徴" title="横浜総合住設に、ご相談いただくと" className="mb-9" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" {...reveal()}>
            {STRENGTHS.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-silver-200 bg-white px-6 py-5">
                <p className="num text-[0.8125rem] font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-heading text-[1.0313rem] font-bold leading-snug text-navy-900">{s.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-[1.9]">{s.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-x-10 gap-y-4 rounded-xl bg-paper-2 px-5 py-5 sm:px-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <dl className="grid gap-x-8 gap-y-2 text-[0.9063rem] sm:grid-cols-[auto_1fr]">
              {[
                ["運営会社", `${siteConfig.name}（${siteConfig.nickname}）`],
                ["戸塚オフィス", officeAddressWithPostal("totsuka")],
                ...(phone ? [["電話", `${phone}${receptionHours() ? `（受付 ${receptionHours()}）` : ""}`]] : []),
              ].map(([k2, v]) => (
                <div key={k2} className="contents">
                  <dt className="font-bold text-navy-900">{k2}</dt>
                  <dd className="leading-[1.85]">{k2 === "電話" && phone ? <a href={telHref()} className="text-link py-2 !font-normal">{v}</a> : v}</dd>
                </div>
              ))}
            </dl>
            <p className="flex flex-wrap gap-x-6 gap-y-1">
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
        </div>
      </section>

      {/* 9. 給湯器の交換費用 */}
      <section aria-labelledby="cost" className="cv band band-paper section">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="cost" eyebrow="交換費用" title="交換の費用は、5つの内訳で決まる" lead="当社の工事費込みの価格は、設置の条件を確かめてからのお見積もりです。参考に、メーカーの希望小売価格の幅を並べます。" />}>
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
            <p className="mt-3 text-[0.8125rem] leading-[1.9] text-ink-mute">メーカー希望小売価格は、当社の販売価格ではありません。含まれるもの（本体だけか、リモコンやユニットを含むか）はメーカーで違い、工事費・撤去処分費は含みません。</p>
            <p className="mt-5">
              <Link href="/guide/cost" className="link-arrow">
                交換費用の内訳と、金額が変わる条件
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </SectionSplit>
        </div>
      </section>

      {/* 10. 対応地域 */}
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

      {/* 11. 交換工事の流れ */}
      <section aria-labelledby="flow" className="cv band band-paper section">
        <div className="container-x">
          <SectionHeading id="flow" eyebrow="交換工事の流れ" title="ご相談から、お引き渡しまで" className="mb-9" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" {...reveal()}>
            {FLOW.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-silver-200 bg-white px-5 py-5">
                <p className="num text-[0.8125rem] font-semibold text-brand-600">STEP {i + 1}</p>
                <h3 className="mt-1 font-heading text-[0.9688rem] font-bold text-navy-900">{s.title}</h3>
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

      {/* 12. 施工事例（事例が届いてから出す。架空の事例は載せない） */}
      {works.length > 0 && (
        <section aria-labelledby="works" className="cv bg-white">
          <div className="container-x section">
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

      {/* 13. よくある質問 */}
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

      {/* 14. 給湯器の選び方と、新しいコラム */}
      <section aria-labelledby="guide" className="cv band band-paper section">
        <div className="container-x">
          <SectionHeading id="guide" eyebrow="給湯器の選び方" title="交換の前に、確かめておきたいこと" className="mb-8" />
          <PageLinkRows pages={guides} />
          <p className="mt-6 text-right">
            <Link href="/trouble" className="link-arrow">
              故障・トラブルのときに確かめること
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
          {posts.length > 0 && (
            <div className="mt-12">
              <h2 id="blog" className="h-sub mb-4">
                新しい給湯器コラム
              </h2>
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
          )}
        </div>
      </section>

      {/* 15. 無料見積もり・問い合わせ */}
      <CtaBand id="cta-home" />

      {/* よくある質問の構造化データは /faq だけに出す（同じ質問を2か所でマークアップしない） */}
    </>
  );
}
