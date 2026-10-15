/**
 * データの検査（ビルドの前に走らせる）。 npm run data:check
 *
 * 商品データ（data/products）
 *   - id・URL（slug）の重複、メーカー・種類・設置方式・機能の値、号数とタンクの容量
 *   - 補助金：ガス給湯器とエコジョーズは対象外のまま／対象の機種は登録の型番と額が制度の額と合っている
 *   - 価格：当社の価格は、会社から受け取るまで null／メーカー希望小売価格には含むものと出典がある
 *   - 写真：掲載の許諾が確かめられていない機種に、写真を載せていない
 *   - 表示する文に、調べたときのメモ書き（「カタログの表記は」「未確認」など）や部品の価格が残っていない
 * 解説・補助金・地域のページ
 *   - {{名前}} がすべて置き換えられる／本文の中のサイト内リンクが実在する／よくある質問の答えにリンクの記号が無い
 *   - 地域の統計の割合が範囲内／近くの地域の slug が実在する
 * 1件でも誤りがあれば、終了コード 1 で終わる。
 */
import { areas, getArea } from "@/data/areas";
import { brands } from "@/data/brands";
import { categories, functionLabels, installationLabels } from "@/data/categories";
import type { Block, ContentPage } from "@/data/content-types";
import { allFaqs } from "@/data/faq";
import { products as allProducts } from "@/data/products";
import { works } from "@/data/works";
import { internalLinksIn } from "@/components/ui/RichText";
import { allContentPages } from "@/lib/content";
import { hasImage } from "@/lib/images";
import { kyutouAmountFor } from "@/lib/products";
import { knownPaths } from "@/lib/routes";
import { fillTokens } from "@/lib/tokens";

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);
const TODAY = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
const isDate = (s: unknown) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && s <= TODAY;
const isUrl = (s: unknown) => typeof s === "string" && /^https:\/\//.test(s);

/* ------------------------------------------------------------------ */
/* 商品                                                                */
/* ------------------------------------------------------------------ */
const NOTE_LEFTOVER = /カタログの表記|仕様表の|保存資料|未確認|ページ表記|とある[。」]?$|と表記|同上|[¥￥][\d,]+|税抜/;
const ids = new Set<string>();
const slugs = new Set<string>();
for (const p of allProducts) {
  const at = `${p.brand}/${p.slug}`;
  if (ids.has(p.id)) err(`${at} … id が重複しています`);
  ids.add(p.id);
  if (slugs.has(at)) err(`${at} … URL が重複しています`);
  slugs.add(at);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) err(`${at} … slug は英小文字・数字・ハイフンだけにしてください`);
  if (!brands.some((b) => b.id === p.brand)) err(`${at} … メーカー ${p.brand} が data/brands.ts にありません`);
  if (!categories.some((c) => c.id === p.category)) err(`${at} … 種類 ${p.category} が不正です`);
  if (!(p.installationType.key in installationLabels)) err(`${at} … 設置方式 ${p.installationType.key} が不正です`);
  if (!(p.functions.key in functionLabels)) err(`${at} … 機能 ${p.functions.key} が不正です`);
  if (!p.modelNumber.trim()) err(`${at} … 型番が空です`);

  if ((p.category === "gas" || p.category === "eco-jozu" || p.category === "hybrid") && !p.capacity.gou) err(`${at} … ガスの号数がありません`);
  if ((p.category === "ecocute" || p.category === "hybrid") && !p.capacity.tankLiters) err(`${at} … タンクの容量がありません`);

  if (p.category === "gas" || p.category === "eco-jozu") {
    if (p.subsidyEligibility !== "not-target" || p.subsidyAmount !== null) err(`${at} … ガス給湯器・エコジョーズは、給湯省エネ2026事業の対象外にしてください`);
  } else if (p.subsidyEligibility === "eligible" || p.subsidyEligibility === "bonus") {
    if (!p.subsidyListedModel) err(`${at} … 登録の型番（subsidyListedModel）がありません`);
    const expected = kyutouAmountFor(p.category, p.subsidyEligibility === "bonus");
    if (p.subsidyAmount !== expected) err(`${at} … 補助額 ${p.subsidyAmount} が、制度の額 ${expected} と合っていません`);
    if (!isDate(p.subsidyVerifiedAt)) err(`${at} … 補助金を確かめた日（subsidyVerifiedAt）がありません`);
  }

  for (const [k, v] of [
    ["salesPrice", p.salesPrice],
    ["remotePrice", p.remotePrice],
    ["installationPrice", p.installationPrice],
    ["disposalPrice", p.disposalPrice],
  ] as const) {
    if (v !== null && !(Number.isInteger(v) && v > 0)) err(`${at} … ${k} は null か正の整数にしてください`);
  }
  if (p.manufacturerPrice) {
    if (!(p.manufacturerPrice.amount > 0)) err(`${at} … メーカー希望小売価格が不正です`);
    if (!p.manufacturerPrice.includes) err(`${at} … メーカー希望小売価格に含むもの（includes）がありません`);
    if (!isUrl(p.manufacturerPrice.sourceUrl)) err(`${at} … メーカー希望小売価格の出典がありません`);
  }

  if (p.imageLicenseStatus === "permitted") {
    if (!p.images.length) err(`${at} … 許諾ありなのに写真がありません`);
    if (!p.imageSource) err(`${at} … 写真の取得元（imageSource）がありません`);
  } else if (p.images.length) {
    err(`${at} … 掲載の許諾を確かめていない写真が入っています（imageLicenseStatus: ${p.imageLicenseStatus}）`);
  }

  if (!isUrl(p.manufacturerUrl)) err(`${at} … メーカーのページの URL がありません`);
  if (!p.sources.length || !p.sources.every(isUrl)) err(`${at} … 根拠のページ（sources）がありません`);
  if (!isDate(p.dataVerifiedAt)) err(`${at} … 確認日（dataVerifiedAt）が不正です`);

  const texts = [p.installationType.label, ...p.features, ...(p.cautions ?? []), ...p.specifications.map((s) => `${s.label}：${s.value}`), ...p.remotes.map((r) => r.note ?? ""), p.manufacturerPrice?.includes ?? ""];
  for (const t of texts) if (NOTE_LEFTOVER.test(t)) warn(`${at} … 表示する文に、メモ書きか価格が残っています：「${t.slice(0, 60)}」`);
}

/* ------------------------------------------------------------------ */
/* 解説・補助金のページ                                                */
/* ------------------------------------------------------------------ */
const known = knownPaths();
function blockTexts(b: Block): string[] {
  switch (b.type) {
    case "p":
      return [b.text];
    case "list":
      return b.items;
    case "steps":
      return b.items.flatMap((i) => [i.title, i.text]);
    case "table":
      return [...b.head, ...b.rows.flat(), b.caption ?? "", b.note ?? ""];
    case "callout":
      return [b.title ?? "", b.text];
    case "dl":
      return b.items.flatMap((i) => [i.term, i.desc]);
    case "links":
      return [];
    case "note":
      return [b.text];
    default:
      return [];
  }
}
function checkTexts(where: string, texts: string[]) {
  for (const t of texts) {
    try {
      fillTokens(t);
    } catch (e) {
      err(`${where} … ${(e as Error).message}`);
    }
    for (const href of internalLinksIn(t)) {
      const pathOnly = href.split(/[?#]/)[0];
      if (!known.has(pathOnly)) err(`${where} … リンク先 ${href} がありません`);
    }
  }
}
const seen = new Set<string>();
for (const page of allContentPages() as ContentPage[]) {
  const where = `/${page.cluster}/${page.slug}`;
  if (seen.has(where)) err(`${where} … slug が重複しています`);
  seen.add(where);
  checkTexts(where, [page.title, page.h1, page.description, page.lead, page.summary, ...page.sections.flatMap((s) => [s.heading, ...s.blocks.flatMap(blockTexts)])]);
  for (const s of page.sections) for (const b of s.blocks) if (b.type === "links") for (const l of b.items) if (!known.has(l.href.split(/[?#]/)[0])) err(`${where} … リンク先 ${l.href} がありません`);
  for (const r of page.related ?? []) if (!known.has(r.href.split(/[?#]/)[0])) err(`${where} … 関連ページ ${r.href} がありません`);
  for (const f of page.faqs ?? []) {
    checkTexts(where, [f.q, f.a]);
    if (/\[[^\]]+\]\([^)]+\)|\*\*/.test(f.a)) warn(`${where} … よくある質問の答えにリンクか強調の記号があります（画面と構造化データでは記号を外して出します）`);
  }
  if (!isDate(page.updatedAt)) err(`${where} … 更新日が不正です`);
}

/* ------------------------------------------------------------------ */
/* 地域                                                                */
/* ------------------------------------------------------------------ */
for (const a of areas) {
  const where = `/area/${a.slug}`;
  const s = a.stats;
  for (const [k, v] of Object.entries(s)) if (k.endsWith("Percent") && !(v >= 0 && v <= 100)) err(`${where} … ${k} が範囲外（${v}）`);
  if (s.detachedPercent + s.apartmentPercent > 100.5) err(`${where} … 一戸建てと共同住宅の割合の合計が100％を超えています`);
  for (const n of a.nearby) if (!getArea(n)) err(`${where} … 近くの地域 ${n} がありません`);
  checkTexts(where, [a.title, a.h1, a.description, a.lead, ...a.sections.flatMap((sec) => [sec.heading, ...sec.blocks.flatMap(blockTexts)])]);
  if (a.image && !hasImage(a.image)) err(`${where} … 写真 ${a.image} がありません`);
}

/* ------------------------------------------------------------------ */
/* よくある質問・施工事例                                              */
/* ------------------------------------------------------------------ */
for (const f of allFaqs) if (/\[[^\]]+\]\(|\*\*|https?:\/\//.test(f.a)) err(`/faq … 答えにリンクや強調の記号は使えません：「${f.q}」`);
for (const w of works) {
  if (!w.photos.length) warn(`/works/${w.slug} … 写真がありません`);
  for (const ph of w.photos) if (!hasImage(ph.image)) err(`/works/${w.slug} … 写真 ${ph.image} がありません`);
  if (w.after?.productId && !ids.has(w.after.productId)) err(`/works/${w.slug} … 機種 ${w.after.productId} がありません`);
}

console.log(`商品 ${allProducts.length}件・解説 ${seen.size}ページ・地域 ${areas.length}ページを確かめました。誤り ${errors.length}件・注意 ${warnings.length}件`);
for (const e of errors) console.log(`  誤り：${e}`);
for (const w of warnings) console.log(`  注意：${w}`);
process.exitCode = errors.length ? 1 : 0;
