import type { BrandId, Product } from "@/data/products/types";
import {
  successorBrandNotes,
  successorSources,
  successorTable,
  type SuccessorRelation,
  type SuccessorRow,
  type SuccessorSource,
} from "@/data/products/successors";
import { normalizeModel } from "@/lib/model-number";
import { brands } from "@/data/brands";
import { products } from "@/lib/products";

/**
 * 古い型番 → メーカーが案内している機種（data/products/successors.ts）を、画面で使う形にする。
 * 型番の照らし合わせは、表記のゆれ（全角・半角、空白、ハイフンの種類、大文字・小文字）をそろえて行う（lib/model-number.ts）。
 */
export { normalizeModel };

export const SUCCESSOR_PATH = "/products/successor";
export const successorBrandPath = (brand: BrandId) => `${SUCCESSOR_PATH}/${brand}`;

export const RELATION_LABEL: Record<SuccessorRelation, string> = {
  successor: "後継機種",
  replacement: "取り替えの推奨",
};

/** 型番に当たる、このサイトの機種（無ければ空）。組み合わせの機種（ハイブリッド）は、ユニットの型番でも照らす */
export function productsForModel(brand: Product["brand"], model: string): Product[] {
  const key = normalizeModel(model);
  const exact = products.filter((p) => p.brand === brand && normalizeModel(p.modelNumber) === key);
  if (exact.length) return exact;
  return products.filter((p) => p.brand === brand && (p.units ?? []).some((u) => normalizeModel(u.model) === key));
}

const sourceMap = new Map(successorSources.map((s) => [s.id, s]));

export function successorSource(id: string): SuccessorSource {
  const s = sourceMap.get(id);
  if (!s) throw new Error(`後継機種の出典が見つかりません：${id}`);
  return s;
}

export type SuccessorEntry = { model: string; onSite: Product[] };
export type SuccessorView = Omit<SuccessorRow, "successors"> & {
  /** ページの中での番号（行の id に使う） */
  key: string;
  successors: SuccessorEntry[];
  source: SuccessorSource;
  /** 絞り込み用の文字列（型番をそろえて「|」でつないだもの） */
  search: string;
};

/** 後継の型番に当たる、このサイトの機種。表記の違う同じ機種（siteModels）は、後継が1つの行だけで使う */
function siteProductsFor(r: SuccessorRow, model: string): Product[] {
  const direct = productsForModel(r.brand, model);
  if (direct.length) return direct;
  if (r.siteModels && r.successors.length === 1) return r.siteModels.flatMap((m) => productsForModel(r.brand, m));
  return [];
}

function toView(r: SuccessorRow, i: number): SuccessorView {
  return {
    ...r,
    key: `${r.brand}-${i + 1}`,
    successors: r.successors.map((m) => ({ model: m, onSite: siteProductsFor(r, m) })),
    source: successorSource(r.sourceId),
    search: [...r.oldModels, ...r.successors].map(normalizeModel).join("|"),
  };
}

/** メーカーの行（データの並びのまま） */
export function successorViews(brand: BrandId): SuccessorView[] {
  return successorTable.filter((r) => r.brand === brand).map(toView);
}

export type SuccessorBrand = { id: BrandId; name: string; rows: number; oldModels: number; prefixes: string[] };

/** 対応のあるメーカー（data/brands.ts の並び） */
export function successorBrands(): SuccessorBrand[] {
  return brands
    .filter((b) => successorTable.some((r) => r.brand === b.id))
    .map((b) => {
      const rows = successorTable.filter((r) => r.brand === b.id);
      const olds = rows.flatMap((r) => r.oldModels);
      const prefixes = [...new Set(olds.map((m) => /^[A-Z]+/.exec(normalizeModel(m))?.[0]).filter((x): x is string => !!x))];
      return { id: b.id, name: b.name, rows: rows.length, oldModels: olds.length, prefixes };
    });
}

/** メーカー全体の注意（出典つき） */
export function successorNotesOf(brand: BrandId): { text: string; source: SuccessorSource }[] {
  return (successorBrandNotes[brand] ?? []).map((n) => ({ text: n.text, source: successorSource(n.sourceId) }));
}

/** メーカーの行が使っている出典（行に出てくる順） */
export function successorSourcesOf(brand: BrandId): SuccessorSource[] {
  const ids = [...new Set([...successorTable.filter((r) => r.brand === brand).map((r) => r.sourceId), ...(successorBrandNotes[brand] ?? []).map((n) => n.sourceId)])];
  return ids.map(successorSource);
}

/** この機種への取り替えを、メーカーが案内している古い型番の行 */
export function predecessorsOf(p: Product): SuccessorView[] {
  // 行の番号（key）は、メーカーのページの行の id と同じにする（メーカーの中での並び）
  return successorTable
    .filter((r) => r.brand === p.brand)
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => r.successors.some((m) => siteProductsFor(r, m).some((x) => x.id === p.id)))
    .map(({ r, i }) => toView(r, i));
}

/** 対応を確かめた日のうち、いちばん新しい日（一覧のページの更新日） */
export function successorsUpdatedAt(fallback: string, brand?: BrandId): string {
  const list = brand ? successorSourcesOf(brand) : successorSources;
  return list.reduce((d, s) => (s.verifiedAt > d ? s.verifiedAt : d), fallback);
}

/** 古い型番の数（すべて） */
export function successorOldModelCount(): number {
  return successorTable.reduce((n, r) => n + r.oldModels.length, 0);
}
