import budget from "@/data/subsidy/budget.generated.json";
import { kyutouShoene2026 } from "@/data/subsidy/programs";
import { siteConfig } from "@/lib/site";

/**
 * 補助金の「いまの状態」を決める（受付中か、予約が締め切られたか、終わったか）。
 *
 * - 日付はビルドした日（日本時間）で判定する。毎日の自動実行（.github/workflows/daily-blog.yml）が予算の割合を取り直して
 *   push し、サイトが作り直されるので、期限をまたぐと、翌日のビルドから表示が切り替わる。
 * - 公式の予算の割合が 100％ に達したら（古くない値のとき）、期限の前でも「受付終了」にする（公式：上限に達し次第、受付を終了）。
 * - 後継の制度に替わった場合などは、data/subsidy/programs.ts の status を "closed" にする（`npm run subsidy:check` が、公式ページの変化を知らせる）。
 * - 終わったあとは、「使えます」という書き方をやめ、「2026年の内容の記録」として見せる（各ページが phase を見て出し分ける）。
 */

export type ProgramPhase = "open" | "reservation-closed" | "ended";

/** 日本時間の YYYY-MM-DD */
export function todayJst(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(now);
}

export function programPhase(
  p: { status: "open" | "closed"; reservationDeadline?: string; applicationDeadline: string },
  now: Date = new Date(),
): ProgramPhase {
  if (p.status === "closed") return "ended";
  const today = todayJst(now);
  if (today > p.applicationDeadline) return "ended";
  if (p.reservationDeadline && today > p.reservationDeadline) return "reservation-closed";
  return "open";
}

export function kyutouPhase(now: Date = new Date()): ProgramPhase {
  const phase = programPhase(kyutouShoene2026, now);
  if (phase !== "ended" && budget.percent >= 100 && daysBetween(budget.asOf, todayJst(now)) <= BUDGET_STALE_DAYS) return "ended";
  return phase;
}

/** 画面に出す、状態の短い表記 */
export function phaseLabel(phase: ProgramPhase): string {
  if (phase === "ended") return "受付終了";
  if (phase === "reservation-closed") return "交付申請の予約は終了（交付申請は受付中）";
  return "受付中（予算の上限に達した時点で終了）";
}

/** 70000 → 「7万円」、 45000 → 「4万5,000円」、 120000 → 「12万円」 */
export function manYen(n: number): string {
  if (n % 10000 === 0) return `${n / 10000}万円`;
  const man = Math.floor(n / 10000);
  const rest = n % 10000;
  return man > 0 ? `${man}万${rest.toLocaleString("ja-JP")}円` : `${rest.toLocaleString("ja-JP")}円`;
}

/** 2つの日付（YYYY-MM-DD）の差（日数） */
export function daysBetween(fromIso: string, toIso: string): number {
  const a = Date.parse(`${fromIso.slice(0, 10)}T00:00:00Z`);
  const b = Date.parse(`${toIso.slice(0, 10)}T00:00:00Z`);
  return Math.round((b - a) / 86400000);
}

/** 予算の数値を「古い」とみなすまでの日数。これを過ぎた数値は、画面に出さない（公式ページへのリンクだけにする） */
export const BUDGET_STALE_DAYS = 7;

export type BudgetStatus = {
  /** 予算に対する申請額の割合（％）。古い・取得できていないときは null */
  percent: number | null;
  removalBonusPercent: number | null;
  /** 公式ページに書かれている「◯月◯日0時時点」の日付 */
  asOf: string;
  stale: boolean;
};

/**
 * 予算に対する申請額の割合（公式ページの値）。
 * 値は scripts/check-subsidy.ts が毎日取り直して data/subsidy/budget.generated.json に書く。
 * 取り直せない日が続いて、時点が BUDGET_STALE_DAYS より古くなった値は、返さない（古い数値を、いまの値のように見せないため）。
 */
export function budgetStatus(now: Date = new Date()): BudgetStatus {
  const stale = daysBetween(budget.asOf, todayJst(now)) > BUDGET_STALE_DAYS;
  return {
    percent: stale ? null : budget.percent,
    removalBonusPercent: stale ? null : budget.removalBonusPercent,
    asOf: budget.asOf,
    stale,
  };
}

/**
 * 当社が補助金の申請を行う登録事業者かどうか、を説明する文。
 * 会社に確認できるまでは「登録済み」と書かない（lib/site.ts の subsidyOperator）。
 */
export function operatorStatement(): { confirmed: boolean; text: string } {
  const o = siteConfig.subsidyOperator;
  if (o.registered === true) {
    return {
      confirmed: true,
      text: `${siteConfig.name}は、給湯省エネ2026事業の登録事業者（給湯省エネ事業者）です${o.number ? `（登録事業者番号 ${o.number}）` : ""}。対象の機種をお選びいただいた場合、交付申請の手続きは当社が行います。`,
    };
  }
  if (o.registered === false) {
    return {
      confirmed: true,
      text: "補助金の交付申請は、国に登録された事業者（給湯省エネ事業者）が行う決まりです。補助金を使ったお取り替えをご希望の場合は、申請の進め方をお見積もりの際にご案内します。",
    };
  }
  return {
    confirmed: false,
    text: "補助金の交付申請は、国に登録された事業者（給湯省エネ事業者）が行う決まりで、お客様がご自身で申請することはできません。当社では、補助金を使ったお取り替えのご相談と、申請のサポートを承っています。お選びの機種が対象かどうかと、申請の進め方は、お見積もりの際にご案内します。",
  };
}
