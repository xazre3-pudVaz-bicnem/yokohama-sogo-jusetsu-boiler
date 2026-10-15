/**
 * 製品写真・ロゴの取得の記録（manifest-<メーカー>.json）を、サイトのデータに取り込む。
 *   npm run images:apply -- <記録のフォルダ>
 *
 * 書き出すもの
 *   data/products/images.json … 機種ごとの写真の記録（一覧・機種のページ・比較・トップが、ここだけを見る）
 *   data/brand-logos.json     … メーカーの公式ロゴ（見た目の大きさの調整 scale は、手で直した値を残す）
 *
 * 記録の形と、写真の選び方の決まりは docs/IMAGE_SOURCES.md。
 * - public/ にファイルが無い写真・ロゴは取り込まない（エラーで止める）。
 * - 記録に無い機種の、いまの記録は残す（メーカーごとに分けて取り込める）。
 * - unavailable の機種は、写真を持たせない（理由だけを残す）。
 */
import fs from "node:fs";
import path from "node:path";
import { products } from "@/data/products";
import type { BrandLogo, ImageMatchType, ProductImageRecord, ProductImageRole } from "@/data/products/types";

type ManifestImage = { role: ProductImageRole; file: string; width: number; height: number; sourceUrl: string; pageUrl: string; caption?: string };
type ManifestProduct = {
  id: string;
  modelNumber: string;
  matchType: ImageMatchType;
  sharedGroup?: string;
  images: ManifestImage[];
  evidence: string;
  unavailableReason?: string;
};
type Manifest = {
  brand: string;
  verifiedAt: string;
  logo?: { file: string; width: number; height: number; sourceUrl: string; pageUrl?: string } | null;
  products: ManifestProduct[];
};

const ROOT = process.cwd();
const dir = process.argv[2];
if (!dir) {
  console.error("使い方: npm run images:apply -- <manifest-*.json のあるフォルダ>");
  process.exit(2);
}

const errors: string[] = [];
const err = (m: string) => errors.push(m);
const isUrl = (u: unknown) => typeof u === "string" && /^https?:\/\//.test(u);
const exists = (webPath: string) => fs.existsSync(path.join(ROOT, "public", webPath));
const ROLES: ProductImageRole[] = ["main", "unit", "remote", "side"];
const MATCH: ImageMatchType[] = ["exact-model", "officially-shared-series", "unavailable"];

const imagesFile = path.join(ROOT, "data", "products", "images.json");
const logosFile = path.join(ROOT, "data", "brand-logos.json");
const records: Record<string, ProductImageRecord> = JSON.parse(fs.readFileSync(imagesFile, "utf8"));
const logos: Record<string, BrandLogo> = JSON.parse(fs.readFileSync(logosFile, "utf8"));
const known = new Map(products.map((p) => [p.id, p]));

const files = fs.readdirSync(dir).filter((f) => /^manifest-[a-z]+\.json$/.test(f));
if (!files.length) {
  console.error(`${dir} に manifest-<メーカー>.json がありません`);
  process.exit(2);
}

let count = 0;
for (const f of files) {
  const m = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Manifest;
  const at = (s: string) => `${f}: ${s}`;

  // ロゴ
  if (m.logo) {
    const l = m.logo;
    if (!exists(l.file)) err(at(`ロゴのファイルがありません：${l.file}`));
    else if (!isUrl(l.sourceUrl)) err(at(`ロゴの取得元（sourceUrl）がありません`));
    else if (!(l.width > 0 && l.height > 0)) err(at(`ロゴの大きさ（width・height）がありません`));
    else logos[m.brand] = { src: l.file, width: Math.round(l.width), height: Math.round(l.height), sourceUrl: l.sourceUrl, ...(logos[m.brand]?.scale ? { scale: logos[m.brand].scale } : {}) };
  }

  // 機種ごとの写真
  for (const e of m.products) {
    const p = known.get(e.id);
    if (!p) {
      err(at(`商品データに無い ID です：${e.id}`));
      continue;
    }
    if (p.brand !== m.brand) err(at(`${e.id} は ${m.brand} の機種ではありません`));
    if (e.modelNumber !== p.modelNumber) err(at(`${e.id} の型番が商品データと違います（記録：${e.modelNumber}／データ：${p.modelNumber}）`));
    if (!MATCH.includes(e.matchType)) err(at(`${e.id} の matchType が不正です：${e.matchType}`));
    const imgs = e.matchType === "unavailable" ? [] : e.images;
    for (const img of imgs) {
      if (!ROLES.includes(img.role)) err(at(`${e.id} の写真の role が不正です：${img.role}`));
      if (!exists(img.file)) err(at(`${e.id} の写真のファイルがありません：${img.file}`));
      if (!isUrl(img.sourceUrl) || !isUrl(img.pageUrl)) err(at(`${e.id} の写真の取得元（sourceUrl・pageUrl）がありません：${img.file}`));
      if (!(img.width > 0 && img.height > 0)) err(at(`${e.id} の写真の大きさがありません：${img.file}`));
    }
    if (e.matchType !== "unavailable" && !imgs.some((i) => i.role === "main")) err(at(`${e.id} に代表の写真（role: main）がありません`));
    if (e.matchType === "unavailable" && !e.unavailableReason) err(at(`${e.id} は unavailable なのに、理由（unavailableReason）がありません`));
    if (!e.evidence && e.matchType !== "unavailable") err(at(`${e.id} に、型番との対応を確かめた方法（evidence）がありません`));

    // 代表の写真を先頭に、あとは記録の順
    const ordered = [...imgs.filter((i) => i.role === "main").slice(0, 1), ...imgs.filter((i) => i.role !== "main")];
    records[e.id] = {
      matchType: e.matchType,
      images: ordered.map((i) => ({
        src: i.file,
        width: Math.round(i.width),
        height: Math.round(i.height),
        role: i.role,
        ...(i.caption ? { caption: i.caption } : {}),
        sourceUrl: i.sourceUrl,
        pageUrl: i.pageUrl,
      })),
      ...(e.sharedGroup ? { sharedGroup: e.sharedGroup } : {}),
      evidence: e.evidence ?? "",
      ...(e.unavailableReason ? { unavailableReason: e.unavailableReason } : {}),
      verifiedAt: m.verifiedAt,
    };
    count++;
  }
}

if (errors.length) {
  console.error(`取り込みを止めました（${errors.length}件）`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

// 商品データの並び順で書き出す（差分を読みやすくする）
const sorted = Object.fromEntries(products.filter((p) => records[p.id]).map((p) => [p.id, records[p.id]]));
fs.writeFileSync(imagesFile, `${JSON.stringify(sorted, null, 2)}\n`);
fs.writeFileSync(logosFile, `${JSON.stringify(Object.fromEntries(Object.entries(logos).sort()), null, 2)}\n`);
console.log(`取り込みました：機種 ${count}件（記録のある機種は全部で ${Object.keys(sorted).length}件）・ロゴ ${Object.keys(logos).length}社`);
