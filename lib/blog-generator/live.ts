import { kyutouShoene2026 as k } from "@/data/subsidy/programs";
import { modelTokens, normalizeModelText } from "@/lib/blog-generator/model-numbers";
import { getBrand, products } from "@/lib/products";
import { formatDateJa } from "@/lib/seo";
import { BUDGET_STALE_DAYS, daysBetween } from "@/lib/subsidy";

/**
 * 「最新の公式情報」を使う題材のための、その日の確認（live）。
 *
 * 補助金の予算の割合や、メーカーの現行の機種のように、日によって変わる情報は、事実シートに固定で書かない。
 * 題材に live を付けると、記事を書く日に公式ページを取り直し、取り直せたときだけ、その内容を
 * 「本日確認した公式情報」の節として事実シートに足して書かせる（確認した日を本文に必ず書かせる）。
 * 取り直せない・読み取れない・時点が古いときは、その題材はその日は書かず、普遍的な題材に替える（generate.ts）。
 *
 *   kyutou-budget … 給湯省エネ2026事業の「予算に対する補助金申請額の割合」（全体・撤去加算）
 *   maker-pages   … メーカーの公式の製品ページに、その型番が載っているか（現行品として扱ってよいか）
 */
export type LiveSpec = { kind: "kyutou-budget" } | { kind: "maker-pages"; productIds: string[]; minConfirmed?: number };

export type LiveResult = { ok: true; markdown: string; sources: string[]; summary: string } | { ok: false; reason: string };

/** その日に確かめた節の id（題材の書き手に渡す節の範囲に足す） */
export function liveSectionId(spec: LiveSpec): string {
  return `live-${spec.kind}`;
}

/** ページを取ってくる関数（試験のときは、にせの関数に差し替える） */
export type Fetcher = (url: string) => Promise<string>;

const UA = "Mozilla/5.0 (compatible; yokoju-boiler-blog/1.0; +https://www.yokohama-sogo-jusetsu.com/)";
const TIMEOUT_MS = 20000;

export const defaultFetcher: Fetcher = async (url) => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "user-agent": UA, "accept-language": "ja" }, signal: ctrl.signal, redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.trim()) throw new Error("空のページ");
    return text;
  } catch (e) {
    if ((e as Error).name === "AbortError") throw new Error(`${TIMEOUT_MS / 1000}秒たっても応答がありませんでした`);
    throw e;
  } finally {
    clearTimeout(timer);
  }
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

/**
 * 「予算に対する補助金申請額の割合」のページから、割合（％）と「◯年◯月◯日0時時点」を読む。
 * 読み方は scripts/check-subsidy.ts と同じ（ページの作りが変わったら、両方を直す）。
 */
export function parseBudgetGraph(html: string): { percent: number; asOf: string } {
  const m = /<span class="number">\s*(\d{1,3}(?:\.\d+)?)\s*<\/span>\s*<span class="symbol">\s*[%％]/.exec(html);
  const d = /(\d{4})年(\d{1,2})月(\d{1,2})日\s*0時時点/.exec(stripTags(html));
  if (!m || !d) throw new Error("割合か時点の表記が見つかりません（ページの作りが変わった可能性）");
  const percent = Number(m[1]);
  if (!(percent >= 0 && percent <= 100)) throw new Error(`割合の値が範囲外です：${m[1]}`);
  return { percent, asOf: `${d[1]}-${d[2].padStart(2, "0")}-${d[3].padStart(2, "0")}` };
}

async function kyutouBudget(today: string, fetcher: Fetcher): Promise<LiveResult> {
  try {
    const main = parseBudgetGraph(await fetcher(k.urls.graph));
    if (fetcher === defaultFetcher) await sleep(1000);
    const removal = parseBudgetGraph(await fetcher(k.urls.removalGraph));
    for (const [label, v] of [["予算全体", main], ["撤去加算", removal]] as const) {
      const age = daysBetween(v.asOf, today);
      if (age < 0) return { ok: false, reason: `${label}の割合の時点（${v.asOf}）が、今日（${today}）より先になっています` };
      if (age > BUDGET_STALE_DAYS) return { ok: false, reason: `${label}の割合の時点（${v.asOf}）が古いため使いません（${BUDGET_STALE_DAYS}日より前）` };
    }
    if (main.percent >= 100) return { ok: false, reason: `予算に対する申請額の割合が ${main.percent}% です。受付が終わった可能性があるため、補助金の題材は書きません（programs.ts の status を確かめる）` };
    const t = formatDateJa(today);
    const markdown = [
      "## 本日確認した公式情報：給湯省エネ2026事業の予算に対する申請額の割合",
      "id: live-kyutou-budget",
      `確認日: ${today}`,
      `出典: ${k.urls.graph}`,
      `出典: ${k.urls.removalGraph}`,
      `- ${t}に公式ページで確かめた値：予算に対する補助金申請額の割合は${main.percent}%（${formatDateJa(main.asOf)}0時時点の表示）`,
      `- ${t}に公式ページで確かめた値：撤去加算の予算に対する申請額の割合は${removal.percent}%（${formatDateJa(removal.asOf)}0時時点の表示）`,
      `- この割合は毎日変わる。記事に書くときは「${formatDateJa(main.asOf)}0時時点で${main.percent}%（${t}に公式ページで確認）」のように、時点と確認した日を必ず添える`,
      "- 割合から、受付が終わる日を予想しない（「◯月には終わる」「まだ余裕がある」と書かない）。予算の上限に達した時点で受付が終わる、という事実だけを書く",
    ].join("\n");
    return { ok: true, markdown, sources: [k.urls.graph, k.urls.removalGraph], summary: `予算の割合 ${main.percent}%（${main.asOf} 0時時点）・撤去加算 ${removal.percent}%（${removal.asOf} 0時時点）` };
  } catch (e) {
    return { ok: false, reason: `給湯省エネ2026事業の予算のページを読み取れませんでした（${(e as Error).message}）` };
  }
}

/** ページの文章に、その型番が出てくるか（全角・空白・大小文字の違いは問わない） */
export function pageHasModel(html: string, modelNumber: string): boolean {
  const norm = (s: string) => normalizeModelText(s).toUpperCase().replace(/[\s　]+/g, "");
  const page = norm(stripTags(html));
  const tokens = modelTokens(modelNumber);
  if (!tokens.length) return page.includes(norm(modelNumber));
  return tokens.some((t) => page.includes(norm(t)));
}

async function makerPages(spec: Extract<LiveSpec, { kind: "maker-pages" }>, today: string, fetcher: Fetcher): Promise<LiveResult> {
  const list = spec.productIds.map((id) => products.find((p) => p.id === id));
  const missing = spec.productIds.filter((_, i) => !list[i]);
  if (missing.length) return { ok: false, reason: `商品データに無い機種です：${missing.join("、")}` };
  const pages = new Map<string, string | Error>();
  for (const p of list) {
    const url = p!.manufacturerUrl;
    if (pages.has(url)) continue;
    try {
      pages.set(url, await fetcher(url));
    } catch (e) {
      pages.set(url, e as Error);
    }
    // 公式サイトに続けて頼みすぎないよう、少し間をあける（試験のにせの関数のときは待たない）
    if (fetcher === defaultFetcher) await sleep(800);
  }
  const confirmed = list.filter((p) => {
    const html = pages.get(p!.manufacturerUrl);
    return typeof html === "string" && pageHasModel(html, p!.modelNumber);
  });
  const need = spec.minConfirmed ?? list.length;
  if (confirmed.length < need) {
    const failed = list
      .filter((p) => !confirmed.includes(p))
      .map((p) => {
        const r = pages.get(p!.manufacturerUrl);
        return `${p!.modelNumber}（${r instanceof Error ? r.message : "ページに型番が見つからない"}）`;
      });
    return { ok: false, reason: `メーカーの公式ページで、掲載を確かめられない機種があります：${failed.join("、")}` };
  }
  const t = formatDateJa(today);
  const urls = [...new Set(confirmed.map((p) => p!.manufacturerUrl))];
  const markdown = [
    "## 本日確認した公式情報：メーカーの公式ページでの掲載",
    "id: live-maker-pages",
    `確認日: ${today}`,
    ...urls.map((u) => `出典: ${u}`),
    `- ${t}に、次の機種が、メーカーの公式の製品ページに載っていることを確かめた：${confirmed.map((p) => `${getBrand(p!.brand).name} ${p!.modelNumber}`).join("、")}`,
    `- 記事に「現行の機種」と書くときは「${t}にメーカーの公式ページで掲載を確認」と添える`,
    "- 公式ページに載っていても、在庫・納期・価格・発売や生産終了の予定は分からない。記事に書かない",
  ].join("\n");
  return { ok: true, markdown, sources: urls, summary: `メーカーの公式ページで ${confirmed.length} 機種の掲載を確認` };
}

/** 題材の live を、その日に確かめる */
export async function fetchLive(spec: LiveSpec, today: string, fetcher: Fetcher = defaultFetcher): Promise<LiveResult> {
  if (spec.kind === "kyutou-budget") return kyutouBudget(today, fetcher);
  return makerPages(spec, today, fetcher);
}
