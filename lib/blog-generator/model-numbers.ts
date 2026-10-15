import { products } from "@/lib/products";

/**
 * 型番の検査。記事に書いてよい型番は、このサイトの商品データ（data/products）にある機種の
 * 型番・構成ユニットの型番・対応リモコンの型番だけ。存在しない型番や、載せていない機種の型番を書かせない。
 *
 * 型番らしい文字列（英大文字と数字とハイフンの組み合わせ）を取り出して、商品データと突き合わせる。
 *   RUF-E240EAW / GT-C2472AW-1 / SRT-S377 / HE-J37NQS / EA377AFV / RHP-R223(S) など
 * 規格の名前（JIS C 9220・JGKAS A705）、ガスの種類（13A・LPG）、冷媒（R290）は型番として扱わない。
 */
const MODEL_RE = /(?<![A-Za-z0-9-])(?:[A-Z]{1,5}-[A-Z0-9]*\d[A-Z0-9]*(?:-[A-Z0-9]+)*(?:\([A-Z]\))?|[A-Z]{2,}\d{2,}[A-Z0-9]*(?:\([A-Z]\))?)(?![A-Za-z0-9])/g;

/** 全角の英数字・括弧・ハイフンを半角にする */
export function normalizeModelText(text: string): string {
  return text
    .replace(/[０-９Ａ-Ｚａ-ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/[‐－–—―ー](?=[A-Z0-9])/g, (c, i, s) => (/[A-Z0-9]/.test(s[i - 1] ?? "") ? "-" : c));
}

/** 型番ではなく、規格の番号（日本冷凍空調工業会標準規格 JRA9002 など）と、電源の表記（AC100V） */
const STANDARD_RE = /^(?:(?:JRA|JIS|JGKAS|JIA|ISO|IEC)[-\d]|[AD]C\d+V?$)/;

/** 文章から型番らしい文字列を取り出す */
export function modelTokens(text: string): string[] {
  const t = normalizeModelText(text)
    // URL とリンク先は対象にしない
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\]\([^)]*\)/g, "]");
  return [...new Set([...t.matchAll(MODEL_RE)].map((m) => m[0]).filter((tok) => !STANDARD_RE.test(tok)))];
}

/** 型番らしい文字列を、文章から取り除く（数値の検査で、型番の中の数字を数値として数えないため） */
export function stripModelTokens(text: string): string {
  return normalizeModelText(text).replace(MODEL_RE, " ");
}

let allowed: Set<string> | null = null;

/** 記事に書いてよい型番（商品データの型番・構成ユニット・リモコン・シリーズ名から取り出したもの） */
export function allowedModelTokens(): Set<string> {
  if (allowed) return allowed;
  const set = new Set<string>();
  for (const p of products) {
    const texts = [p.modelNumber, p.series, p.name, ...(p.units ?? []).map((u) => u.model), ...p.remotes.map((r) => r.model), p.subsidyListedModel ?? ""];
    for (const t of texts) for (const tok of modelTokens(t)) set.add(tok);
  }
  allowed = set;
  return set;
}

/**
 * 商品データに無い型番。末尾の記号を省いた書き方（RUX-E2016W(A) を RUX-E2016W と書く、GT-C2472AW-1 を GT-C2472AW と書く）は通す。
 */
export function unknownModelTokens(text: string, ok: Set<string> = allowedModelTokens()): string[] {
  return modelTokens(text).filter((tok) => {
    if (ok.has(tok)) return false;
    for (const a of ok) if (a.startsWith(tok) && /^[-( ]/.test(a.slice(tok.length))) return false;
    return true;
  });
}
