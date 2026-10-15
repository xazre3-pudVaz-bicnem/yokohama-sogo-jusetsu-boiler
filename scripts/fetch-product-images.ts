/**
 * 掲載の許諾を確かめた製品写真を、取得元から取り込む。 npm run images:products
 *
 * 使い方（くわしくは docs/IMAGE_SOURCES.md）
 *   1. メーカーの許諾（またはメーカーが定める条件）を確かめる。確かめた内容を data/brands.ts の imagePolicy と、
 *      docs/IMAGE_SOURCES.md に書く。
 *   2. その機種の imageSource.url を、許諾された画像の URL（販売店向けの画像データの URL など）にし、
 *      imageLicenseStatus を "permitted" にする。
 *   3. このスクリプトを実行すると、public/images/products/<メーカー>/<slug>.webp に保存し、
 *      商品データの images に足す内容を表示する（データの書き換えは手で行う）。
 *
 * 画像は縮小と WebP への変換だけを行い、切り抜き・色の変更・文字入れなどの加工はしない（多くのメーカーが改変を禁じている）。
 * 許諾が "permitted" でない機種の画像は、取りに行かない。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { brands } from "@/data/brands";
import { products } from "@/data/products";

const OUT = path.join(process.cwd(), "public", "images", "products");
const UA = "Mozilla/5.0 (compatible; yokoju-boiler-site/1.0)";

async function main() {
  const targets = products.filter((p) => p.imageLicenseStatus === "permitted" && p.imageSource?.url && p.images.length === 0);
  if (!targets.length) {
    console.log("取り込む写真はありません（imageLicenseStatus が permitted で、images が空の機種がありません）。");
    return;
  }
  for (const p of targets) {
    const url = p.imageSource!.url;
    try {
      const res = await fetch(url, { headers: { "user-agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const dir = path.join(OUT, p.brand);
      fs.mkdirSync(dir, { recursive: true });
      const file = path.join(dir, `${p.slug}.webp`);
      const info = await sharp(buf).resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(file);
      const src = `/images/products/${p.brand}/${p.slug}.webp`;
      console.log(`${p.brand} ${p.modelNumber} → ${src}`);
      console.log(`  images: [{ src: "${src}", alt: "${brands.find((b) => b.id === p.brand)?.name ?? p.brand} ${p.modelNumber}の製品写真", width: ${info.width}, height: ${info.height} }]`);
    } catch (e) {
      console.log(`${p.brand} ${p.modelNumber} … 取得できませんでした（${(e as Error).message}）`);
      process.exitCode = 1;
    }
  }
}

main();
