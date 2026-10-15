import { coronaProducts } from "@/data/products/corona";
import { daikinProducts } from "@/data/products/daikin";
import { mitsubishiProducts } from "@/data/products/mitsubishi";
import { noritzProducts } from "@/data/products/noritz";
import { palomaProducts } from "@/data/products/paloma";
import { panasonicProducts } from "@/data/products/panasonic";
import { rinnaiProducts } from "@/data/products/rinnai";
import type { Product } from "@/data/products/types";

/**
 * 商品カタログの全データ（メーカーごとのファイルをまとめる）。
 * 並びは、ガス給湯器・ハイブリッドのメーカー → エコキュートのメーカー。
 * 画面に出すのは、販売の状態が「現行品」のものだけ（lib/products.ts）。
 */
export const products: Product[] = [
  ...rinnaiProducts,
  ...noritzProducts,
  ...palomaProducts,
  ...mitsubishiProducts,
  ...panasonicProducts,
  ...daikinProducts,
  ...coronaProducts,
];
