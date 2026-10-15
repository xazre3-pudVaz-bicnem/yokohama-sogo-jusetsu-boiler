/**
 * 画像の準備。
 *   node scripts/prepare-images.mjs   （npm run images:prepare）
 *
 * やること
 *   1. 元画像（assets/source/。Git 管理外）から、トップの冒頭の写真（PC 用・スマホ用）を作る
 *   2. SNS で共有されたときの画像（public/og-image.jpg）を作る
 *   3. public/images/ にある画像の一覧（data/images.generated.json：パスと縦横のサイズ）を作り直す
 *
 * 画像の置き場所
 *   public/images/brand/   … ロゴ・LINE の QR コード（コーポレートサイトと同じもの）
 *   public/images/illust/  … 人物のイラスト（コーポレートサイトと同じもの。必要な分だけ）
 *   public/images/area/    … 地域のページの写真（出典の表示が必要。data/credits.ts）
 *   public/images/photos/  … このスクリプトが作る写真（トップの冒頭）
 *   public/images/site/    … 当社の現場の写真
 *   public/images/works/   … 施工事例の写真（当社が施工した現場の写真だけ）
 *   public/images/products/<メーカー>/ … 製品写真（メーカーの公式の写真だけ。記録は data/products/images.json、手順は docs/IMAGE_SOURCES.md）
 *   public/images/manufacturers/ … メーカーの公式ロゴ（記録は data/brand-logos.json）
 *
 * 元画像が無い環境（assets/ は Git に入れていない）では、1 と 2 を飛ばして、3 だけを行う。
 * 写真を差し替えるときは、assets/source/ に元画像を置き、下の HERO の設定を直して実行する。
 * public/ に元画像を直接置かないこと（置いたものはすべて公開される）。
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "images");

/**
 * トップの冒頭の写真。
 * いまは、Wikimedia Commons の実写（CC BY 2.0。新築の住宅の外壁に出ている、給湯器用の給水・給湯・ガスの配管）を使っている。
 * 出典の表示が必要（data/credits.ts）。当社の施工現場の写真が用意できたら、差し替える。
 *   wide … PC・タブレット用（横長）。写真の全体を使う
 *   tall … スマホ用（縦長）。配管の写っている右側だけを切り出す
 */
const HERO = {
  source: path.join(ROOT, "assets", "source", "hero-pipes-commons.jpg"),
  wide: { region: { left: 0, top: 200, width: 3840, height: 2160 }, width: 2400 },
  tall: { region: { left: 1960, top: 0, width: 1700, height: 2560 }, width: 1080 },
  og: { region: { left: 1500, top: 600, width: 2340, height: 1228 } },
};

async function emit(key, pipeline, { quality = 82 } = {}) {
  const file = path.join(OUT, `${key}.webp`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const info = await pipeline.webp({ quality, effort: 5 }).toFile(file);
  console.log(`  ${key}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

if (fs.existsSync(HERO.source)) {
  console.log("トップの冒頭の写真");
  await emit("photos/hero-wide", sharp(HERO.source).extract(HERO.wide.region).resize({ width: HERO.wide.width }));
  await emit("photos/hero-tall", sharp(HERO.source).extract(HERO.tall.region).resize({ width: HERO.tall.width }));

  console.log("共有用の画像（og-image.jpg）");
  const base = await sharp(HERO.source).extract(HERO.og.region).resize(1200, 630, { fit: "cover" }).toBuffer();
  const mark = await sharp(path.join(OUT, "brand", "logo-mark-dark.png")).resize({ height: 120 }).toBuffer();
  const FONT = "'Yu Gothic UI','Yu Gothic','Meiryo','Hiragino Sans',sans-serif";
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#020b24" stop-opacity="0.97"/>
      <stop offset="0.6" stop-color="#061537" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#061537" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="612" width="1200" height="18" fill="#0d57e6"/>
  <text x="236" y="108" font-family="${FONT}" font-size="40" font-weight="700" letter-spacing="3" fill="#ffffff">株式会社 横浜総合住設</text>
  <text x="238" y="152" font-family="${FONT}" font-size="25" font-weight="700" letter-spacing="6" fill="#7dcbff">給湯器専門サイト</text>
  <text x="80" y="322" font-family="${FONT}" font-size="66" font-weight="700" fill="#ffffff">横浜市・戸塚区の</text>
  <text x="80" y="412" font-family="${FONT}" font-size="66" font-weight="700" fill="#ffffff">給湯器交換なら<tspan fill="#7dcbff">ヨコジュウ</tspan></text>
  <text x="82" y="490" font-family="${FONT}" font-size="27" fill="#dde1e8">ガス給湯器・エコジョーズ・エコキュート・ハイブリッド給湯器</text>
  <text x="82" y="536" font-family="${FONT}" font-size="27" fill="#dde1e8">機種の比較と、国の補助金の確認から、無料見積もりまで</text>
  <text x="1176" y="590" text-anchor="end" font-family="${FONT}" font-size="15" fill="#b8c2d3">Photo: Inomshog / CC BY 2.0</text>
</svg>`);
  await sharp(base)
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: mark, left: 76, top: 44 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(ROOT, "public", "og-image.jpg"));
  console.log("  og-image.jpg  1200x630");
} else {
  console.log("元画像（assets/source/hero-pipes-commons.jpg）が無いので、写真の作り直しは飛ばします。");
}

/* 画像の一覧（製品写真は商品データに寸法を持つので、ここには入れない） */
const manifest = {};
function walk(dir) {
  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (path.relative(OUT, full).split(path.sep)[0] === "products") continue;
      walk(full);
    } else if (/\.(webp|png|jpe?g)$/i.test(name)) {
      manifest[path.relative(OUT, full).replace(/\\/g, "/").replace(/\.[^.]+$/, "")] = full;
    }
  }
}
walk(OUT);
const out = {};
for (const [key, file] of Object.entries(manifest)) {
  const meta = await sharp(file).metadata();
  out[key] = { src: `/images/${path.relative(OUT, file).replace(/\\/g, "/")}`, width: meta.width, height: meta.height };
}
fs.writeFileSync(path.join(ROOT, "data", "images.generated.json"), `${JSON.stringify(out, null, 2)}\n`);
console.log(`画像の一覧を書き出しました（${Object.keys(out).length} 件）→ data/images.generated.json`);
