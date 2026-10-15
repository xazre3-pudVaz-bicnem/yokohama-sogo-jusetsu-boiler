import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { ManufacturerLogoGrid } from "@/components/brand/ManufacturerLogoGrid";
import { PhotoSlotFigure } from "@/components/contact/PhotoSlotFigure";
import { PageLinkRows } from "@/components/content/PageLinks";
import { KyutouAmounts } from "@/components/content/Widgets";
import { Figure } from "@/components/diagram/Figures";
import { Hero, type HeroShowcase } from "@/components/home/Hero";
import { NewsCarousel } from "@/components/home/NewsCarousel";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductImage } from "@/components/product/ProductImage";
import { BudgetMeter } from "@/components/sections/BudgetMeter";
import { CtaBand } from "@/components/sections/CtaBand";
import { CategoryIcon, type CategoryIconKind } from "@/components/ui/CategoryIcon";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { Phrase } from "@/components/ui/Phrase";
import { wardAreas } from "@/data/areas";
import { brands } from "@/data/brands";
import { categories, gouGuide, gouOptions } from "@/data/categories";
import { pickupFaqs } from "@/data/faq";
import type { BrandId, CategoryId, Product } from "@/data/products/types";
import { kyutouShoene2026 as k } from "@/data/subsidy/programs";
import { works } from "@/data/works";
import { getAllPosts } from "@/lib/blog";
import { contentPages } from "@/lib/content";
import { img } from "@/lib/images";
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
    { label: "ガス給湯器", href: "/gas-water-heater", p: pickFrom(["eco-jozu", "gas"], ["rinnai-ruf-e240esaw", "noritz-gt-c2472saw-1-bl", "paloma-fh-eh2422sawl"]) },
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
 * 写真付きで並べる「まず比べたい機種」（人気や販売の順位ではない）。
 * 交換で多い条件（ガスは24号・屋外壁掛、エコキュートは370L）と、補助金の対象を確かめた機種から、メーカーごとに1つずつ。
 */
function starterPicks(): { id: string; tone: "gas" | "ecocute" | "hybrid" | "subsidy"; label: string; title: string; note: string; href: string; more: string; items: Product[] }[] {
  const firstOf = (list: Product[], brand: BrandId, ok: (p: Product) => boolean) => photoFirst(list).find((p) => p.brand === brand && ok(p));
  const pick = (category: CategoryId, ok: (p: Product) => boolean) => {
    const list = productsByCategory(category);
    return brands.map((b) => firstOf(list, b.id, ok)).filter((p): p is Product => !!p);
  };
  const subsidyChecked = photoFirst(products.filter((p) => subsidyView(p).eligible));
  const subsidyPicks = brands.map((b) => subsidyChecked.find((p) => p.brand === b.id)).filter((p): p is Product => !!p);
  return [
    { id: "pick-24", tone: "gas" as const, label: "ガス給湯器", title: "24号・フルオート／オートのエコジョーズ", note: "ガス給湯器からの交換で、まず比べたい組み合わせ（屋外壁掛）", href: "/products?gou=24&install=wall&cat=eco-jozu", more: "ガス給湯器の機種をすべて見る", items: pick("eco-jozu", (p) => p.capacity.gou === 24 && p.installationType.key === "wall" && (p.functions.key === "auto" || p.functions.key === "fullauto")) },
    { id: "pick-370", tone: "ecocute" as const, label: "エコキュート", title: "370Lのエコキュート", note: "4人家族で一般的とされる容量（日本冷凍空調工業会の説明）", href: "/products?tank=370", more: "エコキュートの機種をすべて見る", items: pick("ecocute", (p) => p.capacity.tankLiters === 370) },
    { id: "pick-hybrid", tone: "hybrid" as const, label: "ハイブリッド", title: "ハイブリッド給湯器", note: "電気のヒートポンプとガスを組み合わせる種類", href: "/products?cat=hybrid", more: "ハイブリッド給湯器の機種をすべて見る", items: pick("hybrid", () => true) },
    { id: "pick-subsidy", tone: "subsidy" as const, label: "補助金", title: "補助金の対象を確認済みの機種", note: `国の${k.name}の対象製品リストで、登録を確かめた機種`, href: "/products?subsidy=1", more: "補助金の対象の機種をすべて見る", items: subsidyPicks.slice(0, 4) },
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

/** 「まず比べたい機種」の丸い札の色 */
const PICK_TONE: Record<string, { circle: string; icon: CategoryIconKind; button: string }> = {
  gas: { circle: "bg-gas-700 ring-gas-500", icon: "gas", button: "btn-gas" },
  ecocute: { circle: "bg-brand-700 ring-brand-500", icon: "ecocute", button: "btn-eco" },
  hybrid: { circle: "bg-hybrid-700 ring-hybrid-500", icon: "hybrid", button: "btn-hybrid" },
  subsidy: { circle: "bg-eco-700 ring-eco-200", icon: "subsidy", button: "btn-navy" },
};

/** 区画の見出し（中央・太字・＼ ／ のラベル）。トップだけで使う形 */
function Heading({ id, eyebrow, children, lead, onDark = false }: { id: string; eyebrow?: string; children: React.ReactNode; lead?: React.ReactNode; onDark?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl text-center" {...reveal()}>
      {eyebrow && <p className={`pill pill-center ${onDark ? "pill-white" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className={`h-section mt-2 text-balance ${onDark ? "!text-white" : ""}`}>
        {children}
      </h2>
      {lead && <p className={`lead mx-auto mt-4 text-pretty ${onDark ? "text-white/90" : ""}`}>{lead}</p>}
    </div>
  );
}

export default function HomePage() {
  const brandsWithProducts = activeBrands();
  const picks = starterPicks();
  const guides = contentPages("guide");
  const areas = wardAreas();
  const posts = getAllPosts().slice(0, 3);
  const operator = operatorStatement();
  const phone = primaryPhone();
  const hours = receptionHours();
  const line = lineUrl();
  const hybridMax = manYen(k.base.hybrid + k.performanceBonus.hybrid);
  const ecocuteMax = manYen(k.base.ecocute + k.performanceBonus.ecocute);
  const hybrids = (["rinnai", "noritz", "paloma"] as const)
    .map((b) => ({ b, list: photoFirst(productsByCategory("hybrid").filter((p) => p.brand === b)) }))
    .filter((g) => g.list.length > 0);
  const ecocutes = productsByCategory("ecocute");
  const ecocuteBrands = new Set(ecocutes.map((p) => p.brand)).size;
  const hybridCount = productsByCategory("hybrid").length;
  const ecocutePhoto = photoFirst(ecocutes).find((p) => p.id === "panasonic-he-j37nqs") ?? photoFirst(ecocutes)[0];
  const hybridPhoto = hybrids[0]?.list[0];
  const mascotPoint = img("ai/mascot-point");
  const mascotThink = img("ai/mascot-think");
  const mascotOk = img("ai/mascot-ok");
  const bannerSubsidy = img("ai/banner-subsidy");
  const bannerPhoto = img("ai/banner-photo");
  const mark = img("brand/logo-square");

  return (
    <>
      {/* 1. ファーストビュー */}
      <Hero showcase={heroShowcase()} />

      {/* 2. お知らせ（赤いリボン＋バナーの横送り） */}
      <section aria-labelledby="news" className="bg-white pb-10 pt-4 sm:pb-14">
        <div className="text-center">
          <h2 id="news" className="ribbon text-[1.125rem] sm:text-[1.375rem]">
            ヨコジュウ NEWS
          </h2>
        </div>
        <div className="mt-7">
          <NewsCarousel label="お知らせ">
            {/* 補助金 */}
            <Link href="/subsidy" className="group relative flex aspect-[16/8] min-h-[13.5rem] overflow-hidden rounded-[1.5rem] border-4 border-eco-200 bg-eco-50">
              <Image src={bannerSubsidy.src} alt="" fill sizes="(min-width: 768px) 672px, 86vw" quality={70} className="object-cover" />
              <span className="relative flex max-w-[64%] flex-col justify-center px-5 py-4 sm:px-7">
                <span className="w-fit rounded-full bg-eco-700 px-3 py-0.5 text-xs font-bold text-white">国の補助金</span>
                <span className="mt-2 font-heading text-[clamp(1.25rem,0.9rem+1.6vw,2rem)] font-black leading-tight text-ink">{k.name}</span>
                <span className="mt-2 text-[0.8125rem] font-bold leading-relaxed text-ink sm:text-[0.9375rem]">
                  エコキュート {manYen(k.base.ecocute)}（性能加算で{ecocuteMax}）
                  <br />
                  ハイブリッド {manYen(k.base.hybrid)}（性能加算で{hybridMax}）
                </span>
                <span className="mt-1.5 text-[0.6875rem] leading-relaxed text-ink-body">1台あたり。撤去加算は別。対象の機種と条件があり、予算の上限で受付が終わります。</span>
              </span>
            </Link>
            {/* 写真で見積もり */}
            <Link href="/contact/photo" className="group relative flex aspect-[16/8] min-h-[13.5rem] overflow-hidden rounded-[1.5rem] border-4 border-brand-200 bg-brand-100">
              <Image src={bannerPhoto.src} alt="" fill sizes="(min-width: 768px) 672px, 86vw" quality={70} className="object-cover" />
              <span className="relative flex max-w-[60%] flex-col justify-center px-5 py-4 sm:px-7">
                <span className="w-fit rounded-full bg-cta-700 px-3 py-0.5 text-xs font-bold text-white">見積もり無料</span>
                <span className="mt-2 font-heading text-[clamp(1.25rem,0.9rem+1.6vw,2rem)] font-black leading-tight text-ink">
                  写真を送るだけ
                  <br />
                  かんたん見積もり
                </span>
                <span className="mt-2 text-[0.8125rem] font-bold leading-relaxed text-ink sm:text-[0.9375rem]">型番のシールと、給湯器の全体の写真で、合う機種と費用の目安をお伝えします。</span>
              </span>
            </Link>
            {/* ハイブリッド */}
            {hybridPhoto && (
              <Link href="/hybrid" className="group relative flex aspect-[16/8] min-h-[13.5rem] overflow-hidden rounded-[1.5rem] border-4 border-hybrid-100 bg-gradient-to-br from-hybrid-50 to-hybrid-100">
                <span className="relative z-10 flex max-w-[58%] flex-col justify-center px-5 py-4 sm:px-7">
                  <span className="w-fit rounded-full bg-hybrid-700 px-3 py-0.5 text-xs font-bold text-white">ハイブリッド給湯器</span>
                  <span className="mt-2 font-heading text-[clamp(1.25rem,0.9rem+1.6vw,2rem)] font-black leading-tight text-ink">
                    電気でためて
                    <br />
                    足りない分はガスで
                  </span>
                  <span className="mt-2 text-[0.8125rem] font-bold leading-relaxed text-ink sm:text-[0.9375rem]">
                    リンナイ・ノーリツ・パロマの <span className="num">{hybridCount}</span> 構成を、型番で比べられます。
                  </span>
                </span>
                {hybridPhoto.images[0] && (
                  <span className="absolute inset-y-4 right-4 grid w-[38%] place-items-center rounded-2xl bg-white">
                    <Image src={hybridPhoto.images[0].src} alt={hybridPhoto.images[0].alt} width={hybridPhoto.images[0].width} height={hybridPhoto.images[0].height} sizes="240px" quality={72} className="h-[86%] w-[86%] object-contain" />
                  </span>
                )}
              </Link>
            )}
            {/* エコキュート */}
            {ecocutePhoto && (
              <Link href="/ecocute" className="group relative flex aspect-[16/8] min-h-[13.5rem] overflow-hidden rounded-[1.5rem] border-4 border-brand-200 bg-gradient-to-br from-brand-50 to-brand-100">
                <span className="relative z-10 flex max-w-[58%] flex-col justify-center px-5 py-4 sm:px-7">
                  <span className="w-fit rounded-full bg-brand-700 px-3 py-0.5 text-xs font-bold text-white">エコキュート</span>
                  <span className="mt-2 font-heading text-[clamp(1.25rem,0.9rem+1.6vw,2rem)] font-black leading-tight text-ink">
                    <span className="num">{ecocuteBrands}</span>メーカー
                    <br />
                    <span className="num">{ecocutes.length}</span>機種を掲載
                  </span>
                  <span className="mt-2 text-[0.8125rem] font-bold leading-relaxed text-ink sm:text-[0.9375rem]">タンクの容量と、置き場所の形から選べます。</span>
                </span>
                {ecocutePhoto.images[0] && (
                  <span className="absolute inset-y-4 right-4 grid w-[38%] place-items-center rounded-2xl bg-white">
                    <Image src={ecocutePhoto.images[0].src} alt={ecocutePhoto.images[0].alt} width={ecocutePhoto.images[0].width} height={ecocutePhoto.images[0].height} sizes="240px" quality={72} className="h-[86%] w-[86%] object-contain" />
                  </span>
                )}
              </Link>
            )}
          </NewsCarousel>
        </div>
        <div className="container-x mt-7">
          <Link href="/subsidy" className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border-2 border-silver-300 bg-white px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-body transition-colors hover:border-cta-700 sm:px-6 sm:text-[0.875rem]">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-silver-500 font-bold text-white" aria-hidden="true">
              !
            </span>
            <span className="flex-1">国の補助金（{k.name}）は、予算の上限に達すると、期限の前でも受付が終わります。受付の状況を見る</span>
            <Icon name="chevronRight" className="size-4 shrink-0" />
          </Link>
        </div>
      </section>

      {/* 3. 取り扱いメーカー（水玉の帯に白いパネル） */}
      <section aria-labelledby="makers" className="band band-dots py-14 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-white px-5 py-8 shadow-[var(--shadow-card)] sm:px-10 sm:py-10">
            <ManufacturerLogoGrid headingId="makers" />
          </div>
        </div>
      </section>

      {/* 4. ヨコジュウの紹介と、掲載機種の数 */}
      <section aria-labelledby="about-site" className="bg-white">
        <div className="container-x section grid items-center gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div {...reveal()}>
            <h2 id="about-site" className="font-heading text-[clamp(1.125rem,0.95rem+0.9vw,1.625rem)] font-black leading-[2.2] tracking-[0.12em] text-ink">
              <span className="dotted-under">横浜市戸塚区にオフィスを置く、</span>
              <br />
              <span className="dotted-under">住まいの設備のヨコジュウが運営する、</span>
              <br />
              <span className="dotted-under">給湯器交換の専門サイトです。</span>
            </h2>
            <p className="mt-5 text-[0.8125rem] text-ink-mute">{siteConfig.name}（{siteConfig.nickname}）。所在地：{officeAddressWithPostal("totsuka")}</p>
          </div>
          <div className="text-center lg:text-left" {...reveal()}>
            <p className="font-heading text-[1.125rem] font-black tracking-[0.1em] text-cta-700">掲載している機種</p>
            <p className="mt-1 inline-flex items-baseline gap-1 bg-cta-700 px-6 py-2 text-white">
              <span className="num text-[clamp(3rem,2.2rem+3vw,4.5rem)] font-bold leading-none">{products.length}</span>
              <span className="font-heading text-xl font-black">機種</span>
            </p>
            <p className="mt-3 text-[0.9375rem] font-bold leading-[1.8] text-ink">
              <span className="num">{brandsWithProducts.length}</span>メーカーの型番と仕様を、
              <br />
              公式の資料で確かめて載せています。
            </p>
          </div>
        </div>
      </section>

      {/* 5. ご相談から工事まで（大きな丸） */}
      <section aria-labelledby="one-window" className="bg-white pb-16 sm:pb-24">
        <div className="container-x">
          <div className="relative mx-auto flex max-w-[42rem] flex-col items-center justify-center rounded-[3rem] border-[10px] border-[#ffe795] bg-white px-6 pb-20 pt-24 text-center outline-2 outline-dashed outline-offset-[-22px] outline-[#ffe795] sm:aspect-square sm:rounded-full sm:px-20 sm:pb-16 sm:pt-16">
            <Image src={mascotPoint.src} width={mascotPoint.width} height={mascotPoint.height} alt="" sizes="140px" className="absolute -top-14 left-1/2 h-auto w-[8.5rem] -translate-x-1/2" />
            <h2 id="one-window" className="font-heading text-[clamp(1.25rem,1rem+1.2vw,1.875rem)] font-black leading-snug tracking-[0.08em] text-ink">
              機種選びから工事まで
              <span className="mt-2 block text-[clamp(2rem,1.4rem+2.8vw,3.375rem)] leading-tight text-[#e06800]">
                ひとつの窓口<span className="text-[0.55em] text-ink">で承ります</span>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-[30rem] text-[0.9375rem] leading-[2.1] text-ink-body">
              いまの給湯器の型番と設置の形から、合う機種をご提案します。現地を確かめて、本体・リモコン・標準工事・撤去と処分を分けた見積書をお出しします。取り付けのあとは、リモコンの使い方をご説明します。
            </p>
            <Image src={mascotOk.src} width={mascotOk.width} height={mascotOk.height} alt="" sizes="120px" className="absolute -bottom-10 left-1/2 h-auto w-[7rem] -translate-x-1/2" />
          </div>
        </div>
      </section>

      {/* 6. 選ばれる理由（緑のタイル）と、くわしい特徴 */}
      <section aria-labelledby="strengths" className="cv bg-white">
        <div className="container-x pb-16 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center" {...reveal()}>
            <p className="font-heading text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] font-black tracking-[0.3em] text-ink">ヨコジュウの給湯器交換が</p>
            <h2 id="strengths" className="mt-1 font-heading text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-black tracking-[0.12em] text-ink">
              選ばれる<span className="em-green em-big">理由</span>
            </h2>
          </div>
          <ul className="mx-auto mt-9 grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" {...reveal()}>
            {[
              ["現地調査も", "見積もり無料"],
              ["写真を送って", "かんたん見積もり"],
              [`${brandsWithProducts.length}メーカーを`, "型番で比較"],
              ["戸塚区深谷町に", "オフィス"],
            ].map(([small, big]) => (
              <li key={big} className="grid aspect-square place-items-center rounded-[1.75rem] border-4 border-gas-500 bg-gas-700 p-3 text-center text-white shadow-[inset_0_0_0_4px_#fff]">
                <span>
                  <span className="block text-[0.8125rem] font-bold sm:text-[0.9375rem]">{small}</span>
                  <span className="mt-1 block font-heading text-[clamp(1.1875rem,0.9rem+1.2vw,1.75rem)] font-black leading-tight tracking-[0.04em]">
                    <Phrase>{big}</Phrase>
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <ul className="scroller mx-auto mt-10 max-w-5xl gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3" tabIndex={0} aria-label="ヨコジュウの特徴（横に送れます）">
            {STRENGTHS.map((s, i) => (
              <li key={s.title} className="rounded-[1.25rem] border-2 border-[#ececec] bg-white px-5 py-5">
                <p className="flex items-center gap-2">
                  <span className="num grid size-8 shrink-0 place-items-center rounded-full bg-cta-700 text-sm font-bold text-white">{i + 1}</span>
                  <span className="font-heading text-[1rem] font-black leading-snug text-ink">{s.title}</span>
                </p>
                <p className="mt-2 text-[0.875rem] leading-[1.9]">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. まず比べたい機種（黄色い斜めの帯） */}
      <section aria-labelledby="starter" className="cv slant slant-yellow">
        <div className="bubbles" aria-hidden="true">
          <span style={{ left: "6%", top: "10%", width: "9rem", height: "9rem", background: "rgb(255 255 255 / 0.35)" }} />
          <span style={{ right: "8%", top: "6%", width: "6rem", height: "6rem", background: "rgb(255 255 255 / 0.4)" }} />
          <span style={{ right: "18%", bottom: "8%", width: "12rem", height: "12rem", background: "rgb(255 255 255 / 0.3)" }} />
        </div>
        <div className="container-x relative">
          <div className="text-center" {...reveal()}>
            <p className="font-heading text-[clamp(1.0625rem,0.9rem+0.8vw,1.5rem)] font-black tracking-[0.1em] text-ink">＼ メーカー公式の写真と型番で ／</p>
            <h2 id="starter" className="mt-2 font-heading text-[clamp(2rem,1.4rem+2.8vw,3.5rem)] font-black tracking-[0.06em] text-cta-700">
              まず比べたい機種
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[0.875rem] font-bold leading-[1.9] text-ink">交換で多い条件に合う機種を、メーカーごとに1つずつ並べました。人気や販売の順位ではありません。</p>
          </div>
          <div className="mt-16 space-y-20">
            {picks.map((g) => {
              const tone = PICK_TONE[g.tone];
              return (
                <div key={g.id} className="relative rounded-[2rem] bg-white px-4 pb-8 pt-20 shadow-[var(--shadow-pop)] sm:px-7">
                  <div className={`absolute left-1/2 top-0 grid size-[8.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center text-white ring-4 ${tone.circle}`}>
                    <span>
                      <CategoryIcon kind={tone.icon} className="mx-auto size-8 rounded-md bg-white p-0.5" />
                      <span className="mt-1 block text-[0.75rem] font-bold">{g.label}</span>
                      <span className="block font-heading text-[0.9375rem] font-black leading-tight">
                        まず比べたい
                        <br />
                        機種
                      </span>
                    </span>
                  </div>
                  <h3 id={g.id} className="text-center font-heading text-[1.125rem] font-black text-ink sm:text-[1.25rem]">
                    {g.title}
                  </h3>
                  <p className="mt-1 text-center text-[0.8125rem] text-ink-mute">{g.note}</p>
                  <ul className={`scroller mx-auto mt-6 gap-5 sm:grid sm:grid-cols-2 ${g.items.length >= 4 ? "lg:grid-cols-4" : "lg:max-w-[52rem] lg:grid-cols-3"}`} aria-labelledby={g.id}>
                    {g.items.map((p) => (
                      <li key={p.id}>
                        <ProductCard item={toCard(p)} headingLevel="h4" sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 80vw" />
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 text-center">
                    <Link href={g.href} className={`btn ${tone.button} btn-lg w-full max-w-md`}>
                      {g.more}
                      <Icon name="arrowRight" className="btn-arrow size-4" />
                    </Link>
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-12 text-center">
            <Link href="/products" className="btn btn-navy btn-lg">
              すべての機種を条件で絞り込む
              <Icon name="arrowRight" className="btn-arrow size-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* 8. 種類から探す */}
      <section aria-labelledby="by-type" className="cv bg-white">
        <div className="container-x section">
          <Heading id="by-type" eyebrow="種類から探す" lead="お湯をつくる熱の種類で、置き場所・工事・補助金が変わります。">
            ガスか、電気か、組み合わせか
          </Heading>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" {...reveal()}>
            {categories.map((c) => {
              const list = productsByCategory(c.id);
              const sample = photoFirst(list)[0];
              const card = sample ? toCard(sample) : null;
              return (
                <li key={c.id}>
                  <Link href={c.path} className="pcard group" data-cat={c.id}>
                    <div className="pcard-head justify-center">
                      <span className="font-heading text-[0.8125rem] font-black tracking-wider text-white sm:text-[0.9375rem]">{c.name.replace("ガス給湯器（従来型）", "ガス給湯器")}</span>
                    </div>
                    <div className="px-3 pt-3">
                      <ProductImage image={card?.image ?? null} shared={card?.imageShared} category={c.id} installKey={sample?.installationType.key ?? "wall"} sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 42vw" note={false} />
                    </div>
                    <div className="flex flex-1 flex-col px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
                      <span className="badge self-start">{c.energy}</span>
                      <span className="mt-2 hidden text-[0.8125rem] leading-[1.85] sm:block">{c.summary}</span>
                      <span className="mt-auto flex items-center justify-between pt-4 text-[0.8125rem] font-bold text-ink-body">
                        <span>
                          <span className="num text-lg text-ink">{list.length}</span> 機種
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
            <div className="rounded-[1.25rem] border-2 border-[#ececec] bg-white px-5 py-4">
              <p className="text-[0.8125rem] font-bold text-ink">ガス給湯器は、号数で絞り込む（リンナイの目安）</p>
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
            <Link href="/ene-farm" className="group flex items-center justify-between gap-4 rounded-[1.25rem] border-2 border-[#ececec] bg-white px-5 py-4">
              <span>
                <span className="block text-[0.875rem] font-bold text-ink group-hover:text-cta-700">エネファームからの交換</span>
                <span className="mt-1 block text-[0.8125rem] leading-[1.8] text-ink-mute">温水暖房と置き場所を確かめて、替える先を選びます。</span>
              </span>
              <span className="arrow-dot">
                <Icon name="arrowRight" className="size-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. 写真でかんたん見積もり */}
      <section aria-labelledby="photo-estimate" className="cv band band-stripes section">
        <div className="container-x grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="pill">写真でかんたん見積もり</p>
            <h2 id="photo-estimate" className="h-section mt-2">
              <Phrase>機種が分からなくても、写真を送るだけで相談できます</Phrase>
            </h2>
            <p className="lead mt-4">いまの給湯器の型番のシールと、本体の全体の写真があれば、交換できる機種の候補と、必要になりそうな工事をお伝えします。</p>
            <ol className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3" {...reveal()}>
              {(
                [
                  ["label", "型番のシール"],
                  ["whole", "給湯器の全体"],
                  ["extra", "リモコン・配管"],
                ] as const
              ).map(([slot, title], i) => (
                <li key={slot} className="rounded-2xl border-2 border-brand-200 bg-white px-2 py-2.5 text-center sm:px-3">
                  <PhotoSlotFigure slot={slot} className="h-auto w-full" />
                  <p className="mt-1.5 font-heading text-[0.8125rem] font-black text-ink sm:text-[0.875rem]">
                    <span className="num mr-1 text-cta-700">{i + 1}</span>
                    {title}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact/photo" className="btn btn-yellow btn-lg">
                <CategoryIcon kind="camera" className="size-6" />
                写真でかんたん見積もり
                <Icon name="arrowRight" className="btn-arrow size-4" />
              </Link>
              {line && (
                <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-lg" data-cv="line">
                  <LineIcon className="size-5" />
                  LINE で写真を送る
                </a>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-[var(--shadow-pop)]" {...reveal(0, "zoom")}>
            <Image src={bannerPhoto.src} width={bannerPhoto.width} height={bannerPhoto.height} alt="" sizes="(min-width: 1024px) 560px, 92vw" quality={72} className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* 10. ハイブリッド給湯器特集 */}
      <section aria-labelledby="hybrid" className="cv bg-white">
        <div className="container-x section">
          <Heading id="hybrid" eyebrow="ハイブリッド給湯器" lead={`ヒートポンプで沸かしたお湯をタンクにため、足りないときはガスで沸かします。国の補助金は1台${manYen(k.base.hybrid)}、性能加算の要件を満たす機種は${hybridMax}です。`}>
            電気でためて、<span className="em-red">足りない分はガスで</span>
          </Heading>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
            {hybrids.map(({ b, list }) => {
              const brand = getBrand(b);
              const card = toCard(list[0]);
              return (
                <li key={b}>
                  <Link href={productPath(list[0])} className="pcard group" data-cat="hybrid">
                    <div className="pcard-head">
                      <span className="inline-flex min-h-8 items-center rounded-md bg-white px-2 py-1">
                        <MakerLogo logo={brand.logo} name={brand.name} height={17} />
                      </span>
                    </div>
                    <div className="px-3 pt-3">
                      <ProductImage image={card.image} shared={card.imageShared} category="hybrid" installKey="ground" sizes="(min-width: 1024px) 300px, (min-width: 640px) 30vw, 92vw" note={false} />
                    </div>
                    <div className="px-4 pb-4 pt-3">
                      <p className="font-heading text-[1rem] font-black leading-snug text-ink group-hover:text-cta-700">{HYBRID_SERIES[b]}</p>
                      <p className="mt-1 text-[0.8125rem] text-ink-body">
                        <span className="num font-semibold">{list.length}</span> 構成を掲載
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mx-auto mt-8 max-w-5xl">
            <Figure name="hybrid-mechanism" />
          </div>
          <p className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link href="/hybrid" className="link-arrow">
              <Icon name="arrowRight" className="size-4" />
              ハイブリッド給湯器の特集を見る
            </Link>
            <Link href="/hybrid#compare-ecocute" className="link-arrow">
              <Icon name="arrowRight" className="size-4" />
              エコキュートとの比較
            </Link>
          </p>
        </div>
      </section>

      {/* 11. 給湯省エネ2026の補助金 */}
      <section aria-labelledby="subsidy" className="cv band band-pink section">
        <div className="container-x">
          <Heading id="subsidy" eyebrow="補助金" lead="国のリストに登録されたエコキュート・ハイブリッド給湯器・エネファームが対象です。ガス給湯器とエコジョーズは対象ではありません。予算の上限に達すると、期限の前でも受付が終わります。">
            {k.name}の<span className="em-red">補助金</span>
          </Heading>
          <div className="mx-auto mt-9 max-w-4xl space-y-6 rounded-[2rem] bg-white px-4 py-6 shadow-[var(--shadow-card)] sm:px-8 sm:py-8" {...reveal()}>
            <BudgetMeter compact />
            <KyutouAmounts />
            <p className="text-[0.8438rem] leading-[1.9] text-ink-body">{operator.text}</p>
            <p className="flex flex-wrap gap-x-7 gap-y-2">
              <Link href="/subsidy" className="link-arrow">
                <Icon name="arrowRight" className="size-4" />
                補助金の一覧と、申請の流れ
              </Link>
              <Link href="/products?subsidy=1" className="link-arrow">
                <Icon name="arrowRight" className="size-4" />
                補助金の対象を確認済みの機種
              </Link>
              <Link href="/subsidy/yokohama" className="link-arrow">
                <Icon name="arrowRight" className="size-4" />
                横浜市で使える制度
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 12. 給湯器の交換費用 */}
      <section aria-labelledby="cost" className="cv bg-white">
        <div className="container-x section">
          <Heading id="cost" eyebrow="交換費用" lead="当社の工事費込みの価格は、設置の条件を確かめてからのお見積もりです。参考に、メーカーの希望小売価格の幅を並べます。">
            交換の費用は、<span className="em-red">5つの内訳</span>で決まる
          </Heading>
          <div className="mx-auto mt-9 max-w-4xl">
            <Figure name="price-breakdown" />
            <div className="mt-6 table-wrap border-2 border-[#ececec]" tabIndex={0} role="region" aria-label="種類ごとのメーカー希望小売価格の幅">
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
            <p className="mt-5 text-center">
              <Link href="/guide/cost" className="link-arrow">
                <Icon name="arrowRight" className="size-4" />
                交換費用の内訳と、金額が変わる条件
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 13. 工事完了までの流れ（灰色の丸に赤い番号） */}
      <section aria-labelledby="flow" className="cv band band-dots-gray section">
        <div className="container-x">
          <div className="text-center" {...reveal()}>
            <Image src={mascotPoint.src} width={mascotPoint.width} height={mascotPoint.height} alt="" sizes="96px" className="mx-auto h-auto w-20" />
            <h2 id="flow" className="h-section mt-2">工事完了までの、かんたんな流れ</h2>
            <p className="mt-2 font-heading text-[0.9375rem] font-black tracking-[0.08em] text-cta-700">ご相談から、お引き渡しまで</p>
          </div>
          <ol className="scroller mx-auto mt-10 max-w-6xl gap-x-3 gap-y-8 sm:grid sm:grid-cols-2 lg:grid-cols-5" tabIndex={0} aria-label="工事完了までの流れ（横に送れます）">
            {FLOW.map((s, i) => (
              <li key={s.title} className="relative mx-auto flex aspect-square w-full max-w-[13.5rem] flex-col items-center justify-center rounded-full bg-[#ededed] px-5 text-center">
                <span className="num absolute left-1 top-1 grid size-12 place-items-center rounded-full bg-cta-700 text-2xl font-bold text-white">{i + 1}</span>
                <h3 className="font-heading text-[1rem] font-black text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[0.75rem] leading-[1.75] text-ink-body">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link href="/contact/photo" className="link-arrow">
              <Icon name="arrowRight" className="size-4" />
              写真でかんたん見積もり
            </Link>
            <Link href="/flow" className="link-arrow">
              <Icon name="arrowRight" className="size-4" />
              交換工事の流れをくわしく
            </Link>
          </p>
        </div>
      </section>

      {/* 14. 対応地域 */}
      <section aria-labelledby="area" className="cv bg-white">
        <div className="container-x section">
          <Heading id="area" eyebrow="対応エリア" lead="区ごとに住まいの形が違うので、地域のページでは、公的な統計から交換のときに確かめることをまとめました。">
            <span className="inline-flex items-center gap-2">
              <CategoryIcon kind="area" className="size-9" />
              戸塚区を中心に、横浜市内へ伺います
            </span>
          </Heading>
          <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5" {...reveal()}>
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
          <p className="mt-5 text-center text-[0.875rem] leading-[1.95]">ページの無い地域も、ご住所をお知らせいただければ、対応できるかどうかをお答えします。</p>
          <p className="mt-3 text-center">
            <Link href="/area" className="link-arrow">
              <Icon name="arrowRight" className="size-4" />
              対応エリアと、区ごとの住まいの違い
            </Link>
          </p>
        </div>
      </section>

      {/* 15. 施工事例（事例が届いてから出す。架空の事例は載せない） */}
      {works.length > 0 && (
        <section aria-labelledby="works" className="cv bg-white">
          <div className="container-x section">
            <Heading id="works" eyebrow="施工事例">
              給湯器の施工事例
            </Heading>
            <ul className="rows rows-2 mt-8">
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
                <Icon name="arrowRight" className="size-4" />
                施工事例の一覧
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* 16. よくある質問 */}
      <section aria-labelledby="faq" className="cv band band-mist section">
        <div className="container-narrow">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-left" {...reveal()}>
            <Image src={mascotThink.src} width={mascotThink.width} height={mascotThink.height} alt="" sizes="96px" className="h-auto w-20 shrink-0" />
            <div>
              <p className="pill">よくある質問</p>
              <h2 id="faq" className="h-section mt-1">
                <Phrase>給湯器の交換について、よくいただく質問</Phrase>
              </h2>
            </div>
          </div>
          <div className="mt-8">
            <FaqList faqs={pickupFaqs} />
          </div>
          <p className="mt-6 text-right">
            <Link href="/faq" className="link-arrow">
              <Icon name="arrowRight" className="size-4" />
              よくある質問をすべて見る
            </Link>
          </p>
        </div>
      </section>

      {/* 17. 給湯器の選び方と、新しいコラム */}
      <section aria-labelledby="guide" className="cv bg-white">
        <div className="container-x section">
          <Heading id="guide" eyebrow="給湯器の選び方">
            交換の前に、確かめておきたいこと
          </Heading>
          <div className="mx-auto mt-8 max-w-5xl">
            <PageLinkRows pages={guides} />
            <p className="mt-6 text-right">
              <Link href="/trouble" className="link-arrow">
                <Icon name="arrowRight" className="size-4" />
                故障・トラブルのときに確かめること
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
                        <span className="font-heading text-[0.9688rem] font-bold leading-snug text-ink group-hover:text-cta-700">{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-right">
                  <Link href="/blog" className="link-arrow">
                    <Icon name="arrowRight" className="size-4" />
                    コラムの一覧
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 18. ヨコジュウについて（運営会社） */}
      <section aria-labelledby="company" className="cv band band-paper section">
        <div className="container-narrow text-center">
          <h2 id="company" className="h-section">ヨコジュウについて</h2>
          <Image src={mark.src} width={mark.width} height={mark.height} alt={`${siteConfig.name}のロゴ`} sizes="200px" className="mx-auto mt-6 h-auto w-40" />
          <p className="mx-auto mt-6 max-w-2xl text-[0.9375rem] leading-[2.1] text-ink-body">
            {siteConfig.name}（{siteConfig.nickname}）は、{siteConfig.primaryArea.city}
            {siteConfig.primaryArea.ward}にオフィスを置く、住まいの設備の会社です。このサイトでは、給湯器の交換に必要な機種・費用・補助金の情報を、公式の資料で確かめてまとめています。
          </p>
          <dl className="mx-auto mt-7 grid max-w-xl gap-x-6 gap-y-2 rounded-[1.25rem] bg-white px-5 py-5 text-left text-[0.9063rem] sm:grid-cols-[auto_1fr]">
            {[
              ["運営会社", `${siteConfig.name}（${siteConfig.nickname}）`],
              ["戸塚オフィス", officeAddressWithPostal("totsuka")],
              ...(phone ? [["電話", `${phone}${hours ? `（受付 ${hours}）` : ""}`]] : []),
            ].map(([k2, v]) => (
              <div key={k2} className="contents">
                <dt className="font-bold text-ink">{k2}</dt>
                <dd className="leading-[1.85]">
                  {k2 === "電話" && phone ? (
                    <a href={telHref()} className="text-link py-2 !font-normal">
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-1">
            <Link href="/company" className="link-arrow">
              <Icon name="arrowRight" className="size-4" />
              運営会社について
            </Link>
            <a href={siteConfig.corporateUrl} className="link-arrow" target="_blank" rel="noopener">
              <Icon name="external" className="size-4" />
              コーポレートサイト
            </a>
          </p>
        </div>
      </section>

      {/* 19. 無料見積もり・問い合わせ */}
      <CtaBand id="cta-home" />

      {/* よくある質問の構造化データは /faq だけに出す（同じ質問を2か所でマークアップしない） */}
    </>
  );
}
