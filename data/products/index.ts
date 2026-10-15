import { brands } from "@/data/brands";
import { coronaProducts } from "@/data/products/corona";
import { daikinProducts } from "@/data/products/daikin";
import imageRecords from "@/data/products/images.json";
import { mitsubishiProducts } from "@/data/products/mitsubishi";
import { noritzProducts } from "@/data/products/noritz";
import { palomaProducts } from "@/data/products/paloma";
import { panasonicProducts } from "@/data/products/panasonic";
import { rinnaiProducts } from "@/data/products/rinnai";
import type { Product, ProductData, ProductImage, ProductImageRecord } from "@/data/products/types";

/**
 * 商品カタログの全データ（メーカーごとのファイルをまとめ、写真の記録を足す）。
 * 並びは、ガス給湯器・ハイブリッドのメーカー → エコキュートのメーカー。
 * 画面に出すのは、販売の状態が「現行品」のものだけ（lib/products.ts）。
 *
 * 写真の記録は data/products/images.json（scripts/apply-image-manifests.ts が作る）の1か所。
 * 一覧・機種のページ・比較・トップは、どれもここで足した images を使う（写真の場所を、ほかに書かない）。
 * 写真を出すのは、メーカーの利用の許可があり（data/brands.ts の imagePolicy.status が permitted）、
 * 型番との対応を確かめた（matchType が unavailable でない）ものだけ。
 */
const records = imageRecords as Record<string, ProductImageRecord>;

/** 写真の代わりの文（alt）。メーカー・型番を中心に書く（地域名などを足さない） */
function altOf(p: ProductData, img: Omit<ProductImage, "alt">, rec: ProductImageRecord, brandName: string): string {
  if (img.role !== "main") return `${brandName} ${img.caption || p.modelNumber}の写真`;
  if (rec.matchType === "officially-shared-series") return `${brandName} ${p.series}の製品写真（${p.modelNumber}を含むシリーズの共通イメージ）`;
  return `${brandName} ${p.modelNumber}の製品写真`;
}

function withImages(p: ProductData): Product {
  const brand = brands.find((b) => b.id === p.brand);
  const rec = records[p.id] ?? null;
  const allowed = brand?.imagePolicy.status === "permitted" && rec !== null && rec.matchType !== "unavailable";
  const images: ProductImage[] = allowed ? rec.images.map((img) => ({ ...img, alt: altOf(p, img, rec, brand!.name) })) : [];
  return {
    ...p,
    images,
    imageMatchType: images.length ? rec!.matchType : "unavailable",
    imageRecord: rec,
  };
}

export const products: Product[] = [
  ...rinnaiProducts,
  ...noritzProducts,
  ...palomaProducts,
  ...mitsubishiProducts,
  ...panasonicProducts,
  ...daikinProducts,
  ...coronaProducts,
].map(withImages);
