import { brands } from "@/data/brands";
import { errorCodeSources, errorCodes, type ErrorCodeRow, type ErrorCodeSource } from "@/data/error-codes";
import type { BrandId } from "@/data/products/types";
import { normalizeModel } from "@/lib/model-number";

/**
 * エラーコード（data/error-codes.ts）を、画面で使う形にする。
 * 一覧は /trouble/error-codes/<メーカー>。入口のページ（/trouble/error-codes）は data/troubles.ts。
 */
export const ERROR_CODES_PATH = "/trouble/error-codes";
export const errorCodesBrandPath = (brand: BrandId) => `${ERROR_CODES_PATH}/${brand}`;

const sourceMap = new Map(errorCodeSources.map((s) => [s.id, s]));

export function errorCodeSource(id: string): ErrorCodeSource {
  const s = sourceMap.get(id);
  if (!s) throw new Error(`エラーコードの出典が見つかりません：${id}`);
  return s;
}

export type ErrorCodeView = ErrorCodeRow & {
  /** 行の id（ページの中のリンク先。#code-111 など。同じ番号が2行あれば -2 を付ける） */
  anchor: string;
  source: ErrorCodeSource;
  /** 絞り込み用の文字列 */
  search: string;
};

/** メーカーの行（データの並びのまま） */
export function errorCodeViews(brand: BrandId): ErrorCodeView[] {
  const seen = new Map<string, number>();
  return errorCodes
    .filter((r) => r.brand === brand)
    .map((r) => {
      const base = `code-${normalizeModel(r.code).replace(/[^0-9A-Z-]/g, "") || "x"}`;
      const n = (seen.get(base) ?? 0) + 1;
      seen.set(base, n);
      return {
        ...r,
        anchor: n === 1 ? base : `${base}-${n}`,
        source: errorCodeSource(r.sourceId),
        search: [r.code, r.title ?? ""].map(normalizeModel).join("|"),
      };
    });
}

export type ErrorCodeBrand = { id: BrandId; name: string; count: number; ecocuteOnly: boolean };

/** エラーコードの一覧があるメーカー（data/brands.ts の並び） */
export function errorCodeBrands(): ErrorCodeBrand[] {
  return brands
    .filter((b) => errorCodes.some((r) => r.brand === b.id))
    .map((b) => ({ id: b.id, name: b.name, count: errorCodes.filter((r) => r.brand === b.id).length, ecocuteOnly: b.categories.every((c) => c === "ecocute") }));
}

/** メーカーの行が使っている出典（行に出てくる順） */
export function errorCodeSourcesOf(brand: BrandId): ErrorCodeSource[] {
  return [...new Set(errorCodes.filter((r) => r.brand === brand).map((r) => r.sourceId))].map(errorCodeSource);
}

/** 確かめた日のうち、いちばん新しい日 */
export function errorCodesUpdatedAt(fallback: string, brand?: BrandId): string {
  const list = brand ? errorCodeSourcesOf(brand) : errorCodeSources;
  return list.reduce((d, s) => (s.verifiedAt > d ? s.verifiedAt : d), fallback);
}
