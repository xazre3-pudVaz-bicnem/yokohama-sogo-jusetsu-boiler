/**
 * 補助金の公式ページを取り直して、サイトの数値と食い違いがないかを確かめる。
 *
 *   npm run subsidy:budget … 予算に対する申請額の割合だけを取り直し、data/subsidy/budget.generated.json を書き換える
 *                            （毎日の自動実行。取得や読み取りに失敗したら、書き換えずに失敗で終わる）
 *   npm run subsidy:check  … 上に加えて、補助額・期限の記載と、掲載機種が国の対象製品リストに載っているかを確かめる
 *                            （data/subsidy/programs.ts と商品データは書き換えない。違いを一覧にして、失敗で終わる）
 *
 * 予算の割合が 100％ に達したら、lib/subsidy.ts が表示を「受付終了」に切り替える。
 * 制度の内容が変わったときは、公式ページを開いて確かめてから programs.ts と確認日を直すこと（自動では直さない）。
 */
import fs from "node:fs";
import path from "node:path";
import { kyutouShoene2026 as k, yokohamaYgrep2026 as y } from "@/data/subsidy/programs";
import { products } from "@/lib/products";

const BUDGET_ONLY = process.argv.includes("--budget-only");
const UA = "Mozilla/5.0 (compatible; yokoju-boiler-site-check/1.0; +https://www.yokohama-sogo-jusetsu.com/)";
const BUDGET_FILE = path.join(process.cwd(), "data", "subsidy", "budget.generated.json");

type Finding = { level: "ok" | "warn" | "ng"; item: string; detail: string };
const findings: Finding[] = [];
const add = (level: Finding["level"], item: string, detail: string) => findings.push({ level, item, detail });

async function fetchText(url: string): Promise<string> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, { headers: { "user-agent": UA, "accept-language": "ja" }, signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const stripTags = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

/** 「予算に対する申請額の割合」のページから、割合（％）と「◯年◯月◯日0時時点」を読む */
function parseGraph(html: string): { percent: number; asOf: string } {
  const m = /<span class="number">\s*(\d{1,3}(?:\.\d+)?)\s*<\/span>\s*<span class="symbol">\s*[%％]/.exec(html);
  const d = /(\d{4})年(\d{1,2})月(\d{1,2})日\s*0時時点/.exec(stripTags(html));
  if (!m || !d) throw new Error("割合か時点の表記が見つかりません（ページの作りが変わった可能性）");
  const percent = Number(m[1]);
  if (!(percent >= 0 && percent <= 100)) throw new Error(`割合の値が範囲外です：${m[1]}`);
  const asOf = `${d[1]}-${d[2].padStart(2, "0")}-${d[3].padStart(2, "0")}`;
  return { percent, asOf };
}

async function updateBudget(): Promise<boolean> {
  try {
    const main = parseGraph(await fetchText(k.urls.graph));
    await sleep(1000);
    const removal = parseGraph(await fetchText(k.urls.removalGraph));
    const prev = JSON.parse(fs.readFileSync(BUDGET_FILE, "utf8")) as { asOf: string; percent: number };
    if (main.asOf < prev.asOf) {
      add("warn", "予算の割合", `公式の時点（${main.asOf}）が、保存済みの時点（${prev.asOf}）より古いため、書き換えませんでした`);
      return true;
    }
    const next = { percent: main.percent, removalBonusPercent: removal.percent, asOf: main.asOf, fetchedAt: new Date().toISOString(), source: k.urls.graph };
    fs.writeFileSync(BUDGET_FILE, `${JSON.stringify(next, null, 2)}\n`, "utf8");
    add(main.percent >= 100 ? "warn" : "ok", "予算の割合", `${main.percent}%（撤去加算 ${removal.percent}%）・${main.asOf} 0時時点${main.percent >= 100 ? "。予算の上限に達しています。サイトの表示は「受付終了」に切り替わります。programs.ts の status と closed も直してください" : ""}`);
    return true;
  } catch (e) {
    add("ng", "予算の割合", `取得できませんでした（${(e as Error).message}）。保存済みの値は書き換えていません`);
    return false;
  }
}

/** 補助額と期限が、公式ページの記載と同じか */
async function checkAmounts() {
  const man = (n: number) => `${n / 10000}万円／台`;
  try {
    const text = stripTags(await fetchText(k.urls.about));
    const expected: [string, string][] = [
      ["エコキュートの基本額", man(k.base.ecocute)],
      ["ハイブリッド給湯機の基本額", man(k.base.hybrid)],
      ["エネファームの基本額", man(k.base.enefarm)],
      ["エコキュートの性能加算", man(k.performanceBonus.ecocute)],
      ["ハイブリッド給湯機の性能加算", man(k.performanceBonus.hybrid)],
      ["電気蓄熱暖房機の撤去加算", man(k.removalBonus.storageHeater.amount)],
      ["電気温水器の撤去加算", man(k.removalBonus.electricWaterHeater.amount)],
    ];
    for (const [item, s] of expected) add(text.includes(s) ? "ok" : "ng", item, text.includes(s) ? s : `公式ページに「${s}」が見つかりません`);
    const jp = (iso: string) => {
      const [yy, mm, dd] = iso.split("-").map(Number);
      return `${yy}年${mm}月${dd}日`;
    };
    for (const [item, iso] of [
      ["交付申請の期限", k.applicationDeadline],
      ["予約の期限", k.reservationDeadline],
      ["対象の工事の着手日", k.constructionFrom],
    ] as const) {
      add(text.includes(jp(iso)) ? "ok" : "ng", item, text.includes(jp(iso)) ? jp(iso) : `公式ページに「${jp(iso)}」が見つかりません`);
    }
  } catch (e) {
    add("ng", "補助額・期限", `公式ページを取得できませんでした（${(e as Error).message}）`);
  }
}

/** 掲載機種のうち、登録を確認済みとしている型番が、いまも国の対象製品リストにあるか */
async function checkRegistrations() {
  const base = "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product";
  const listed = [...new Map(products.filter((p) => p.subsidyListedModel && (p.subsidyEligibility === "eligible" || p.subsidyEligibility === "bonus")).map((p) => [p.subsidyListedModel!, p])).values()];
  for (const p of listed) {
    const model = p.subsidyListedModel!;
    // エコキュートの検索は option=1 を付けると 0 件になるため、search だけで引く
    const url = `${base}/${p.category === "hybrid" ? "high-efficiency-water-heater-hb" : "high-efficiency-water-heater-ec"}/Model_number?search=${encodeURIComponent(model)}`;
    try {
      const text = stripTags(await fetchText(url));
      const hit = text.includes(` ${model} `) || text.includes(model);
      add(hit ? "ok" : "ng", `登録：${model}`, hit ? "国のリストにあります" : `国のリストで見つかりません（${url}）`);
    } catch (e) {
      add("warn", `登録：${model}`, `検索できませんでした（${(e as Error).message}）`);
    }
    await sleep(1500);
  }
}

/** 横浜市の制度のページが開けて、還元額の記載が変わっていないか */
async function checkYgrep() {
  try {
    const text = stripTags(await fetchText(y.urls.city));
    for (const [item, n] of [
      ["横浜市：エコキュートの還元", y.points.ecocute],
      ["横浜市：エネファームの還元", y.points.enefarm],
    ] as const) {
      // 市のページの表記は「20,000円分/件」
      const s = `${n.toLocaleString("ja-JP")}円分`;
      add(text.includes(s) ? "ok" : "warn", item, text.includes(s) ? s : `市のページに「${s}」が見つかりません（表記の変更か、制度の変更）`);
    }
  } catch (e) {
    add("warn", "横浜市の制度", `市のページを取得できませんでした（${(e as Error).message}）`);
  }
}

async function main() {
  const budgetOk = await updateBudget();
  if (!BUDGET_ONLY) {
    await checkAmounts();
    await checkYgrep();
    await checkRegistrations();
  }
  const mark = { ok: "OK", warn: "注意", ng: "要確認" } as const;
  const lines = findings.map((f) => `| ${mark[f.level]} | ${f.item} | ${f.detail.replace(/\|/g, "／")} |`);
  const report = [`### 補助金の公式情報の確認（${new Date().toISOString()}）`, "", "| 結果 | 項目 | 内容 |", "| --- | --- | --- |", ...lines, ""].join("\n");
  console.log(report);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${report}\n`);
  const failed = !budgetOk || findings.some((f) => f.level === "ng");
  // process.exit() は、fetch の接続を閉じている最中に呼ぶと Windows で異常終了するため、終了コードだけ決めて自然に終える
  process.exitCode = failed ? 1 : 0;
}

main();
