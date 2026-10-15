/**
 * 製品写真とメーカーのロゴを検査する。 npm run images:check（--write で docs/PRODUCT_IMAGE_AUDIT.md を作り直す）
 *
 * 確かめること
 * - 商品データの写真のファイルが public/ にあり、画像として読める（壊れていない）
 * - 記録の大きさ（width・height）が、ファイルの実際の大きさと同じ
 * - 写真が小さすぎない・重すぎない
 * - 取得元（sourceUrl・pageUrl）が、そのメーカーの公式のドメイン
 * - 型番との対応（matchType）と、確かめた日・方法が記録されている
 * - 代表の写真（main）が1枚目にある
 * - メーカー7社のロゴがあり、SVG にスクリプトや外部の参照が入っていない
 * 誤りがあれば、終了コード 1 で止まる（注意は止めない）。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { brands } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";
import type { BrandId } from "@/data/products/types";

const ROOT = process.cwd();
const WRITE = process.argv.includes("--write");
const errors: string[] = [];
const warns: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warns.push(m);

/** メーカーごとの、公式のドメイン（写真・ロゴの取得元として認めるもの） */
const OFFICIAL: Record<BrandId, string[]> = {
  rinnai: ["rinnai.jp", "rinnai.co.jp"],
  // techdocs-production-strg… は、ノーリツの製品資料のサイト（n-techdocs.com）が画像を配る保管場所
  noritz: ["noritz.co.jp", "n-techdocs.com", "noritz.mediapress-net.com", "techdocs-production-strg.s3.ap-northeast-1.amazonaws.com"],
  paloma: ["paloma.co.jp", "paloma.icata.net"],
  mitsubishi: ["mitsubishielectric.co.jp"],
  // panasonicjp.scene7.com は、パナソニックの公式サイト（panasonic.jp）が製品写真を配る画像サーバー
  panasonic: ["panasonic.jp", "panasonic.biz", "panasonic.com", "panasonic.co.jp", "panasonicjp.scene7.com"],
  daikin: ["daikin.co.jp", "daikinaircon.com", "daikin.com"],
  corona: ["corona.co.jp"],
};
const isOfficial = (brand: BrandId, url: string) => {
  try {
    const host = new URL(url).hostname;
    return OFFICIAL[brand].some((d) => host === d || host.endsWith(`.${d}`));
  } catch {
    return false;
  }
};

const MIN_LONG_SIDE = 240; // これより小さい写真は使わない（メーカーの公式の写真が 240px しか無い機種がある。画面では元の大きさの 1.25 倍までしか拡大しない）
const WARN_LONG_SIDE = 700;
const WARN_BYTES = 350 * 1024;

type Row = { id: string; brand: string; model: string; series: string; category: string; path: string; has: string; officialUrl: string; sourceUrl: string; usable: string; match: string; status: string };
const rows: Row[] = [];
const MATCH_LABEL = { "exact-model": "型番の写真と確認", "officially-shared-series": "シリーズ共通の公式写真と確認", unavailable: "公式の写真なし" } as const;

async function main() {
  for (const p of products) {
    const brand = brands.find((b) => b.id === p.brand)!;
    const rec = p.imageRecord;
    const at = `${p.id}（${p.modelNumber}）`;
    if (!rec) warn(`${at} … 写真の記録がありません（まだ調べていない）`);
    if (rec?.matchType === "unavailable" && !rec.unavailableReason) err(`${at} … 写真が無い理由が記録されていません`);
    if (rec && rec.matchType !== "unavailable" && !rec.evidence) err(`${at} … 型番との対応を確かめた方法が記録されていません`);
    if (rec && !/^\d{4}-\d{2}-\d{2}$/.test(rec.verifiedAt)) err(`${at} … 写真を確かめた日が不正です`);
    if (rec && rec.matchType !== "unavailable" && brand.imagePolicy.status === "permitted" && !p.images.length) err(`${at} … 記録があるのに、画面に出る写真がありません`);
    if (p.images.length && p.images[0].role !== "main") err(`${at} … 1枚目が代表の写真（main）ではありません`);

    for (const img of p.images) {
      const file = path.join(ROOT, "public", img.src);
      if (!fs.existsSync(file)) {
        err(`${at} … 写真のファイルがありません：${img.src}`);
        continue;
      }
      try {
        const meta = await sharp(file).metadata();
        await sharp(file).raw().toBuffer(); // 全体を読み、壊れていないことを確かめる
        if (meta.width !== img.width || meta.height !== img.height) err(`${at} … 記録の大きさ（${img.width}×${img.height}）と実際（${meta.width}×${meta.height}）が違います：${img.src}`);
        const long = Math.max(meta.width ?? 0, meta.height ?? 0);
        if (long < MIN_LONG_SIDE) err(`${at} … 写真が小さすぎます（長い辺 ${long}px）：${img.src}`);
        else if (long < WARN_LONG_SIDE && img.role === "main") warn(`${at} … 代表の写真がやや小さい（長い辺 ${long}px）：${img.src}`);
        if (meta.format !== "webp") warn(`${at} … WebP ではありません（${meta.format}）：${img.src}`);
        const bytes = fs.statSync(file).size;
        if (bytes > WARN_BYTES) warn(`${at} … 写真が重い（${Math.round(bytes / 1024)}KB）：${img.src}`);
      } catch (e) {
        err(`${at} … 写真を画像として読めません（${(e as Error).message}）：${img.src}`);
      }
      if (!isOfficial(p.brand, img.sourceUrl)) err(`${at} … 写真の取得元が ${brand.name} の公式のドメインではありません：${img.sourceUrl}`);
      if (!isOfficial(p.brand, img.pageUrl)) err(`${at} … 写真の載っているページが ${brand.name} の公式のドメインではありません：${img.pageUrl}`);
      if (img.role !== "main" && !img.caption) warn(`${at} … 代表以外の写真に説明（caption）がありません：${img.src}`);
    }

    const main = p.images[0];
    rows.push({
      id: p.id,
      brand: brand.name,
      model: p.modelNumber,
      series: p.series,
      category: getCategory(p.category).shortName,
      path: main ? main.src : "—",
      has: main ? `あり（${p.images.length}枚）` : "なし",
      officialUrl: p.manufacturerUrl,
      sourceUrl: main ? main.sourceUrl : "—",
      usable: brand.imagePolicy.status === "permitted" ? "可（使用許可あり）" : "未確認",
      match: rec ? MATCH_LABEL[rec.matchType] + (rec.sharedGroup ? `：${rec.sharedGroup}` : "") : "未調査",
      status: !rec ? "未調査" : rec.matchType === "unavailable" ? `写真なし（${rec.unavailableReason ?? "理由なし"}）` : `完了（${rec.verifiedAt}）`,
    });
  }

  // ロゴ
  for (const b of brands) {
    if (!b.logo) {
      err(`${b.name} … 公式ロゴがありません`);
      continue;
    }
    const file = path.join(ROOT, "public", b.logo.src);
    if (!fs.existsSync(file)) {
      err(`${b.name} … ロゴのファイルがありません：${b.logo.src}`);
      continue;
    }
    if (!isOfficial(b.id, b.logo.sourceUrl)) err(`${b.name} … ロゴの取得元が公式のドメインではありません：${b.logo.sourceUrl}`);
    if (file.endsWith(".svg")) {
      const svg = fs.readFileSync(file, "utf8");
      if (/<script/i.test(svg) || /\son[a-z]+\s*=/i.test(svg) || /(href|src)\s*=\s*["']\s*(https?:|\/\/|javascript:)/i.test(svg)) err(`${b.name} … ロゴの SVG に、スクリプトか外部の参照が入っています`);
    } else {
      try {
        const meta = await sharp(file).metadata();
        if (meta.width !== b.logo.width || meta.height !== b.logo.height) warn(`${b.name} … ロゴの記録の大きさと実際が違います（${meta.width}×${meta.height}）`);
      } catch (e) {
        err(`${b.name} … ロゴを画像として読めません（${(e as Error).message}）`);
      }
    }
  }

  const withPhoto = rows.filter((r) => r.path !== "—").length;
  console.log(`製品写真：${withPhoto}/${products.length} 機種・ロゴ：${brands.filter((b) => b.logo).length}/${brands.length} 社`);
  for (const w of warns) console.log(`  △ ${w}`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log(errors.length ? `誤り ${errors.length}件・注意 ${warns.length}件` : `誤りはありません（注意 ${warns.length}件）`);

  if (WRITE) {
    const esc = (s: string) => s.replace(/\|/g, "／");
    const lines = [
      "# 製品写真の監査（全機種）",
      "",
      `作成：\`npm run images:check -- --write\`（${new Date().toISOString().slice(0, 10)}）。元の記録は \`data/products/images.json\`、決まりは \`docs/IMAGE_SOURCES.md\`。`,
      "",
      `- 機種：${products.length}　写真あり：${withPhoto}　写真なし：${products.length - withPhoto}`,
      `- 「シリーズ共通の公式写真」は、メーカーが外観の同じ複数の型番に使っている1枚の写真です。画面には「シリーズ共通イメージ」と添えています。`,
      "",
      "| 商品ID | メーカー | 正式型番 | シリーズ名 | カテゴリー | 現在の画像パス | 画像の有無 | メーカー公式製品URL | 公式写真の取得先URL | 画像の利用可否 | 型番との一致確認状況 | 作業状況 |",
      "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
      ...rows.map((r) => `| ${[r.id, r.brand, r.model, r.series, r.category, r.path, r.has, r.officialUrl, r.sourceUrl, r.usable, r.match, r.status].map(esc).join(" | ")} |`),
      "",
    ];
    fs.writeFileSync(path.join(ROOT, "docs", "PRODUCT_IMAGE_AUDIT.md"), lines.join("\n"));
    console.log("docs/PRODUCT_IMAGE_AUDIT.md を作り直しました");
  }
  if (errors.length) process.exitCode = 1;
}

main();
