import fs from "node:fs";
import path from "node:path";
import { runtimeFacts } from "@/lib/blog-generator/facts-source";
import { stripModelTokens } from "@/lib/blog-generator/model-numbers";

/**
 * 事実シート（docs/VERIFIED_FACTS.md）の読み込みと、数値の突き合わせ。
 *
 * 記事に書いてよい数値は、事実シートとサイトのデータにあるものだけ。
 * 記事の中の「数字＋単位」を取り出し、事実シートに同じものがあるかを機械で確かめる（2段階）。
 *   1. 事実シート全体（ファイルの全節＋全機種の仕様＋その日に確かめた節）のどこにも無い数値 → 不合格（手書きの記事の点検も同じ）
 *   2. 自動生成の記事では、さらに、書き手に渡した節（いつも渡す core ＋ 題材の節）に無い数値 → 不合格
 *      事実シートのどこかにある数字なら何でも通す、という検査だけでは、別の話題の数字
 *      （補助の節の数字を修理費として書く、ある機種の寸法を別の機種の寸法として書く）を止められないため。
 *
 * 節の形
 *   ## 節の名前
 *   id: 英数字の名前        … 題材（topics.ts の facts）は、この id で節を選ぶ。変えない
 *   確認日: YYYY-MM-DD       … その節の内容を、出典で確かめた日
 *   出典: https://...         … 1行に1つ。記事の sources に入れてよい URL
 *   - 事実の箇条書き
 *
 * ファイルに書かない節（読み込むときに作る。lib/blog-generator/facts-source.ts の runtimeFacts）
 *   subsidy-phase      … その日の、給湯省エネ2026事業の状態（受付中・予約終了・終了）
 *   product:<機種の id> … 機種ごとの仕様と特徴（data/products から）。題材の機種の分だけ書き手に渡す
 * その日に公式ページを取り直した節（live-…）は、生成のときに withLiveSections で足す。
 */
export const FACTS_PATH = path.join(process.cwd(), "docs", "VERIFIED_FACTS.md");

/** ファイルの大きさの上限の目安（毎日の生成で、必要な節だけを渡すための前提。selftest が確かめる） */
export const FACTS_MAX_BYTES = 60_000;

export type FactSection = {
  id: string;
  title: string;
  /** 出典の URL（会社の資料で確認した節は空） */
  sources: string[];
  checkedAt: string;
  body: string;
  /** この節に出てくる「数字＋単位」（確認日の日付を含む） */
  tokens: Set<string>;
  /** その日に公式ページを取り直して作った節 */
  live?: boolean;
};

/** どの題材でも書き手に渡す節（会社・補助金の要点・その日の制度の状態・書かないこと・基本の知識） */
export const CORE_SECTION_IDS = ["company", "subsidy-core", "subsidy-phase", "rules", "basics"];

export type FactSheet = {
  raw: string;
  sections: FactSection[];
  /** 事実シート全体に出てくる「数字＋単位」（正規化済み） */
  tokens: Set<string>;
  /** 出典として認められている URL */
  sourceUrls: Set<string>;
  /** 出典として認められているホスト名 */
  sourceHosts: Set<string>;
};

/** Markdown の事実シートを節に分ける（HTML のコメント＝自動生成の目印は読まない） */
export function parseSections(raw: string, live = false): FactSection[] {
  const text = raw.replace(/<!--[\s\S]*?-->/g, "");
  const sections: FactSection[] = [];
  for (const chunk of text.split(/^## /m).slice(1)) {
    const [head, ...rest] = chunk.split(/\r?\n/);
    const lines = rest.join("\n");
    const id = /^id:\s*([a-z0-9:_-]+)\s*$/m.exec(lines)?.[1] ?? "";
    const sources = [...lines.matchAll(/^出典:\s*(https?:\/\/\S+)\s*$/gm)].map((m) => m[1]);
    const checkedAt = /^確認日:\s*(\d{4}-\d{2}-\d{2})/m.exec(lines)?.[1] ?? "";
    // 数値の突き合わせには、事実の行だけを使う（id・確認日・出典の行は数えない。確認日は日付として別に足す）
    const factLines = lines.replace(/^(?:id|確認日|出典):.*$/gm, "");
    sections.push({ id, title: head.trim(), sources, checkedAt, body: lines.trim(), tokens: new Set([...numericTokens(factLines), ...dateTokens(checkedAt)]), live });
  }
  return sections;
}

function build(raw: string, sections: FactSection[]): FactSheet {
  const sourceUrls = new Set(sections.flatMap((s) => s.sources));
  const sourceHosts = new Set([...sourceUrls].map((u) => new URL(u).hostname));
  const tokens = new Set(sections.flatMap((s) => [...s.tokens]));
  return { raw, sections, tokens, sourceUrls, sourceHosts };
}

/** 日本時間の今日（YYYY-MM-DD） */
function todayJst(): string {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

/** 事実シートを読む（ファイルの節に、その日の制度の状態と、機種ごとの仕様の節を足す） */
export function loadFactSheet(file: string = FACTS_PATH, today: string = todayJst()): FactSheet {
  const raw = fs.readFileSync(file, "utf8");
  const runtime = runtimeFacts(today);
  return build(raw, [...parseSections(raw), ...parseSections(runtime)]);
}

/** その日に公式ページで確かめた節（Markdown）を、事実シートに足した新しいシートを返す */
export function withLiveSections(sheet: FactSheet, liveMarkdown: string): FactSheet {
  const live = parseSections(liveMarkdown, true);
  return build(`${sheet.raw}\n\n${liveMarkdown}`, [...sheet.sections, ...live]);
}

/** 確認日（2026-10-06）を、記事に書く形（2026年・10月6日）にする */
function dateTokens(iso: string): string[] {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? [`${m[1]}年`, `${Number(m[2])}月${Number(m[3])}日`] : [];
}

/** 全角の英数字・記号を半角にし、数字の中のカンマを取る */
export function normalize(text: string): string {
  return text
    .replace(/[０-９Ａ-Ｚａ-ｚ．，％]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/(\d),(?=\d{3})/g, "$1")
    .replace(/〜|～/g, "〜")
    .replace(/°C|℃/g, "℃")
    .replace(/／/g, "/");
}

/**
 * 突き合わせの対象にする単位（長いものから先に並べる）。
 * 「3つ」「2回」のような、説明の中でふつうに使う数え方は対象にしない（誤検知が増えるだけなので）。
 * 金額・割合・年・重さ・量・長さ・電気・温度・号数・時間のように、事実として確かめられる数字だけを見る。
 */
const UNIT =
  "(?:億円|万円|円分|円|%|割|倍|年度|年間|年|か月|ヶ月|カ月|kWh|kW|kPa|kg|キログラム|cc|mL|ml|リットル|L|平方キロメートル|㎢|㎡|平方メートル|km|メートル|cm|mm|ppm|dB|Hz|W|V|℃|度|号|世帯|人|戸|件|区|駅|番目|階|台|時間|分|秒|日間)";
const TOKEN_RE = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(${UNIT})`, "g");

/** 数え方として扱い、突き合わせをしない組み合わせ（小さな数＋ありふれた単位） */
function isCounting(num: number, unit: string): boolean {
  if (unit === "人" || unit === "件" || unit === "戸") return num < 100;
  if (unit === "度") return num < 10; // 「一度」「2度」の類
  if (unit === "か月") return num <= 3;
  if (unit === "階") return num <= 3;
  if (unit === "台" || unit === "時間" || unit === "分" || unit === "秒" || unit === "日間") return num <= 1;
  return false;
}

function unitOf(raw: string): string {
  return raw.replace(/ヶ月|カ月/, "か月").replace("キログラム", "kg").replace("平方メートル", "㎡").replace("平方キロメートル", "㎢").replace("リットル", "L").replace("mL", "ml").replace("年間", "年");
}

/** 文章から「数字＋単位」を取り出す（正規化して返す）。型番の中の数字は数えない */
export function numericTokens(text: string): string[] {
  const t = normalize(stripModelTokens(text))
    // URL と、Markdown のリンク先は数字の対象にしない
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\]\([^)]*\)/g, "]");
  const out: string[] = [];
  for (const m of t.matchAll(TOKEN_RE)) {
    const num = Number(m[1]);
    const unit = unitOf(m[2]);
    if (isCounting(num, unit)) continue;
    out.push(`${m[1]}${unit}`);
  }
  // 日付（2026年12月31日 → 12月31日 も別に持つ）
  for (const m of t.matchAll(/(\d{1,2})月(\d{1,2})日/g)) out.push(`${Number(m[1])}月${Number(m[2])}日`);
  return out;
}

/** 書き手に渡す節の id（いつも渡す core を含める） */
export function scopeIds(scope: string[]): string[] {
  return [...new Set([...CORE_SECTION_IDS, ...scope])];
}

/** id で節を選ぶ（id の一覧の順に並べる。live- で始まる id は、その日に確かめた節だけに当たる） */
export function sectionsFor(sheet: FactSheet, ids: string[]): FactSection[] {
  const out: FactSection[] = [];
  for (const id of ids) for (const s of sheet.sections) if (s.id === id && !out.includes(s)) out.push(s);
  return out;
}

/**
 * 数値を使ってよい節の数値。
 * scope を渡さないとき（手書きの記事の点検）は、事実シート全体の数値を返す。
 */
export function allowedTokens(sheet: FactSheet, scope?: string[]): Set<string> {
  if (!scope) return sheet.tokens;
  return new Set(sectionsFor(sheet, scopeIds(scope)).flatMap((s) => [...s.tokens]));
}

/** 題材で使ってよい節の出典 URL */
export function allowedSourceUrls(sheet: FactSheet, scope?: string[]): Set<string> {
  if (!scope) return sheet.sourceUrls;
  return new Set(sectionsFor(sheet, scopeIds(scope)).flatMap((s) => s.sources));
}

/** 記事の文章の中で、事実シート（scope を渡したときは、その節）に無い「数字＋単位」を返す */
export function unknownNumericTokens(text: string, sheet: FactSheet, scope?: string[]): string[] {
  const allowed = allowedTokens(sheet, scope);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const tok of numericTokens(text)) {
    if (allowed.has(tok) || seen.has(tok)) continue;
    seen.add(tok);
    out.push(tok);
  }
  return out;
}

/** 書き手・読み直しの担当に渡す事実シート（使ってよい節だけ。scope が無ければ全体） */
export function sheetText(sheet: FactSheet, scope?: string[]): string {
  const list = scope ? sectionsFor(sheet, scopeIds(scope)) : sheet.sections;
  return list.map((s) => `## ${s.title}\n${s.body.replace(/^id:.*\n?/m, "")}`).join("\n\n");
}
