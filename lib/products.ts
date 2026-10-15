import { brands } from "@/data/brands";
import { categories, functionLabels, getCategory, housingLabels, installationLabels } from "@/data/categories";
import { products as allData } from "@/data/products";
import type { Brand, BrandId, CategoryId, Product } from "@/data/products/types";
import { kyutouShoene2026 } from "@/data/subsidy/programs";
import { formatYen } from "@/lib/seo";
import { kyutouPhase, manYen } from "@/lib/subsidy";

/**
 * 商品カタログの引き当て・表示用の文字列・価格の計算。
 * サーバー側で使う（商品データ全体を読み込むので、"use client" のコンポーネントから import しない。
 * 画面側へは、toCard() で必要な項目だけにしたものを渡す）。
 */

/** 掲載する商品（公式で現行品と確かめたものだけ。生産終了・販売の状態が分からないものは載せない） */
export const products: Product[] = allData.filter((p) => p.availableStatus === "current");

export function getBrand(id: BrandId): Brand {
  const b = brands.find((x) => x.id === id);
  if (!b) throw new Error(`メーカーが見つかりません: ${id}`);
  return b;
}

export function productPath(p: Pick<Product, "brand" | "slug">): string {
  return `/products/${p.brand}/${p.slug}`;
}

export function getProduct(brand: string, slug: string): Product | undefined {
  return products.find((p) => p.brand === brand && p.slug === slug);
}

export function productsByBrand(brand: BrandId): Product[] {
  return products.filter((p) => p.brand === brand);
}

export function productsByCategory(category: CategoryId): Product[] {
  return products.filter((p) => p.category === category);
}

/** 掲載している商品があるメーカー（並びは data/brands.ts の順） */
export function activeBrands(): Brand[] {
  return brands.filter((b) => products.some((p) => p.brand === b.id));
}

/** 号数・容量の表記（例：24号／370L／160L・24号） */
export function capacityLabel(p: Pick<Product, "capacity">): string {
  const parts: string[] = [];
  if (p.capacity.tankLiters) parts.push(`${p.capacity.tankLiters}L`);
  if (p.capacity.gou) parts.push(`${p.capacity.gou}号`);
  return parts.join("・");
}

/** 一覧やタイトルに使う、機種の短い説明（例：エコジョーズ 24号 フルオート 屋外壁掛） */
export function productTagline(p: Product): string {
  const c = getCategory(p.category);
  return [c.shortName, capacityLabel(p), p.functions.label, p.installationType.label].filter(Boolean).join(" ");
}

/** 検索結果のタイトル用（例：リンナイ RUF-E2406SAW(B)｜エコジョーズ 24号 フルオート） */
export function productTitle(p: Product): string {
  const c = getCategory(p.category);
  // ハイブリッドは型番（ユニットをつないだもの）が長いので、機能の表記は省く（ページの本文と札には出る）
  const tail = p.category === "hybrid" ? [c.shortName, capacityLabel(p)] : [c.shortName, capacityLabel(p), p.functions.label];
  return `${getBrand(p.brand).name} ${p.modelNumber}｜${tail.filter(Boolean).join(" ")}`;
}

/* ------------------------------------------------------------------ */
/* 価格                                                                */
/* ------------------------------------------------------------------ */
export type PriceLine = { label: string; value: string; known: boolean };

export type PriceView = {
  /** 当社の販売価格が1つでも入っているか */
  hasPrice: boolean;
  /** 内訳（本体・リモコン・標準工事・撤去処分） */
  lines: PriceLine[];
  /** 4つがすべて入っているときだけ、合計（税込）を出す */
  totalInTax: number | null;
  /** 税の扱いの注記 */
  taxNote: string;
};

const QUOTE = "お見積もり";

/**
 * 価格の表示。当社の金額が入っていない項目は「お見積もり」と出す（金額を作らない）。
 * 合計は、本体・リモコン・標準工事・撤去処分の4つがすべて入っているときだけ計算する。
 */
export function priceView(p: Product): PriceView {
  const items: [string, number | null][] = [
    ["本体", p.salesPrice],
    ["リモコン", p.remotePrice],
    ["標準工事", p.installationPrice],
    ["既存の機器の撤去・処分", p.disposalPrice],
  ];
  const all = items.every(([, v]) => v !== null);
  const sum = all ? items.reduce((a, [, v]) => a + (v as number), 0) : null;
  const totalInTax = sum === null ? null : p.taxStatus === "included" ? sum : Math.round(sum * 1.1);
  return {
    hasPrice: items.some(([, v]) => v !== null),
    lines: items.map(([label, v]) => ({ label, value: v === null ? QUOTE : formatYen(v), known: v !== null })),
    totalInTax,
    taxNote: p.taxStatus === "included" ? "金額は税込です。" : "内訳は税抜、合計は消費税（10％）を含めた金額です。",
  };
}

/** メーカー希望小売価格の表記（例：478,500円（税込）） */
export function manufacturerPriceLabel(p: Product): string | null {
  const m = p.manufacturerPrice;
  if (!m) return null;
  return `${formatYen(m.amount)}（${m.tax === "included" ? "税込" : "税抜"}）`;
}

/* ------------------------------------------------------------------ */
/* 補助金                                                              */
/* ------------------------------------------------------------------ */
export type SubsidyView = {
  /** 札に出す短い表記。出さないときは null */
  badge: string | null;
  tone: "sun" | "mute";
  /** 機種のページに出す説明 */
  text: string;
  /** 補助額（基本額＋性能加算）。対象を確認できた機種だけ */
  amount: number | null;
  eligible: boolean;
};

/** 種類から決まる、給湯省エネ2026事業の額（基本額と、性能加算を含めた額） */
export function kyutouAmountFor(category: CategoryId, withBonus: boolean): number | null {
  if (category !== "ecocute" && category !== "hybrid") return null;
  const k = kyutouShoene2026;
  return k.base[category] + (withBonus ? k.performanceBonus[category] : 0);
}

/**
 * 商品ごとの、給湯省エネ2026事業の対象の状況。
 * 制度が終わったあと（期限を過ぎた・status が closed）は、対象の札を出さず、終了したことを書く。
 */
export function subsidyView(p: Product): SubsidyView {
  const k = kyutouShoene2026;
  const ended = kyutouPhase() === "ended";
  const cat = getCategory(p.category);

  if (!cat.kyutouShoeneTarget || p.subsidyEligibility === "not-target") {
    return {
      badge: null,
      tone: "mute",
      eligible: false,
      amount: null,
      text: `${cat.name}は、${k.name}の対象機器ではありません（対象は、エコキュート・ハイブリッド給湯機・エネファームの3種類です）。`,
    };
  }
  if (ended) {
    return {
      badge: null,
      tone: "mute",
      eligible: false,
      amount: null,
      text: `${k.name}は、受付を終了しました。次の年度の制度と、この機種が対象になるかどうかは、国の発表でご確認ください。`,
    };
  }
  const eligible = p.subsidyEligibility === "eligible" || p.subsidyEligibility === "bonus";
  if (eligible) {
    const bonus = p.subsidyEligibility === "bonus";
    const amount = p.subsidyAmount ?? kyutouAmountFor(p.category, bonus);
    return {
      badge: amount ? `補助金の対象（${manYen(amount)}）` : "補助金の対象",
      tone: "sun",
      eligible: true,
      amount,
      text: `${k.name}の対象製品リストに、登録を確認しました${bonus ? "（性能加算の要件にも適合）" : ""}。`,
    };
  }
  if (p.subsidyEligibility === "not-listed") {
    return {
      badge: "補助金：登録を確認できず",
      tone: "mute",
      eligible: false,
      amount: null,
      text: `${k.name}の対象製品リストで、この型番の登録を確認できませんでした。型番の書き方が違うだけの場合もあるため、対象かどうかはお見積もりの際に確かめます。`,
    };
  }
  return {
    badge: "補助金：確認中",
    tone: "mute",
    eligible: false,
    amount: null,
    text: `${k.name}の対象かどうかは、まだ確認できていません。お見積もりの際に、国の対象製品リストで確かめてお伝えします。`,
  };
}

/* ------------------------------------------------------------------ */
/* 画面側（絞り込み・比較）へ渡す、軽い形                              */
/* ------------------------------------------------------------------ */
export type ProductCardData = {
  id: string;
  href: string;
  brand: BrandId;
  brandName: string;
  category: CategoryId;
  categoryName: string;
  modelNumber: string;
  name: string;
  series: string;
  capacity: string;
  gou: number | null;
  tankLiters: number | null;
  functionKey: string;
  functionLabel: string;
  installKey: string;
  installLabel: string;
  installGroup: string;
  housing: string[];
  heating: boolean;
  msrp: string | null;
  msrpAmount: number | null;
  /** 当社の工事費込みの総額（すべての金額が入っているときだけ） */
  total: number | null;
  subsidyBadge: string | null;
  subsidyEligible: boolean;
  image: { src: string; alt: string; width: number; height: number } | null;
};

export function toCard(p: Product): ProductCardData {
  const c = getCategory(p.category);
  const s = subsidyView(p);
  const price = priceView(p);
  return {
    id: p.id,
    href: productPath(p),
    brand: p.brand,
    brandName: getBrand(p.brand).name,
    category: p.category,
    categoryName: c.shortName,
    modelNumber: p.modelNumber,
    name: p.name,
    series: p.series,
    capacity: capacityLabel(p),
    gou: p.capacity.gou,
    tankLiters: p.capacity.tankLiters,
    functionKey: p.functions.key,
    functionLabel: p.functions.label,
    installKey: p.installationType.key,
    installLabel: p.installationType.label,
    installGroup: installationLabels[p.installationType.key],
    housing: p.housing,
    heating: !!p.heating,
    msrp: manufacturerPriceLabel(p),
    msrpAmount: p.manufacturerPrice?.amount ?? null,
    total: price.totalInTax,
    subsidyBadge: s.badge,
    subsidyEligible: s.eligible,
    image: p.imageLicenseStatus === "permitted" && p.images[0] ? p.images[0] : null,
  };
}

/** 関連する機種：同じ種類で、設置方式か号数が同じものを優先（自分は除く） */
export function relatedProducts(p: Product, limit = 4): Product[] {
  const score = (x: Product) =>
    (x.category === p.category ? 4 : 0) +
    (x.installationType.key === p.installationType.key ? 2 : 0) +
    (x.capacity.gou === p.capacity.gou && x.capacity.tankLiters === p.capacity.tankLiters ? 2 : 0) +
    (x.brand === p.brand ? 1 : 0) +
    (x.functions.key === p.functions.key ? 1 : 0);
  return products
    .filter((x) => x.id !== p.id)
    .map((x) => ({ x, s: score(x) }))
    .filter(({ s }) => s >= 4)
    .sort((a, b) => b.s - a.s || a.x.modelNumber.localeCompare(b.x.modelNumber))
    .slice(0, limit)
    .map(({ x }) => x);
}

/** 商品の更新日のうち、いちばん新しいもの（一覧ページの lastmod 用） */
export function latestProductUpdate(list: Product[] = products): string {
  return list.reduce((a, p) => (p.lastUpdatedAt > a ? p.lastUpdatedAt : a), "2026-10-14");
}

export { categories, functionLabels, housingLabels, installationLabels };
