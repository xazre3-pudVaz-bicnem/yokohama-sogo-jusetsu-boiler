import { StaleGuard } from "@/components/sections/StaleGuard";
import { Icon } from "@/components/ui/Icon";
import { kyutouShoene2026 as k } from "@/data/subsidy/programs";
import { formatDateJa } from "@/lib/seo";
import { BUDGET_STALE_DAYS, budgetStatus, kyutouPhase, phaseLabel } from "@/lib/subsidy";

/**
 * 給湯省エネ2026事業の、いまの受付の状態と、予算に対する申請額の割合。
 *
 * - 割合は、公式ページの値（毎日のデータ更新で取り直す。data/subsidy/budget.generated.json）。必ず「◯月◯日0時時点」を添える。
 * - 取り直せない日が続いて値が古くなったら、数値を出さず、公式ページへのリンクだけにする（古い値を、いまの値のように見せない）。
 * - 受付が終わったら（期限を過ぎた・status が closed）、割合の代わりに「受付終了」を出す。
 */
export function BudgetMeter({ compact = false }: { compact?: boolean }) {
  const phase = kyutouPhase();
  const b = budgetStatus();
  const link = (
    <a href={k.urls.graph} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1 text-[0.8125rem]">
      公式ページで最新の状況を見る
      <Icon name="external" className="size-3.5" />
    </a>
  );

  if (phase === "ended") {
    return (
      <div className="callout callout-plain">
        <p className="font-heading font-bold text-navy-900">{k.name}は、受付を終了しました</p>
        <p>
          {k.closed ? `${formatDateJa(k.closed.date)}に確認（${k.closed.reason}）。` : `交付申請の期限（${formatDateJa(k.applicationDeadline)}）を過ぎています。`}
          このページの金額と条件は、2026年の事業の内容の記録です。次の年度の制度は、国の発表でご確認ください。
        </p>
      </div>
    );
  }

  const noNumber = (
    <p className="text-[0.9063rem] leading-[1.9]">
      予算に対する申請額の割合は、公式ページで毎日更新されています。上限（100％）に達した時点で、期限の前でも受付が終わります。
      <span className="mt-1 block">{link}</span>
    </p>
  );

  return (
    <div className={`rounded-2xl border border-silver-200 bg-white ${compact ? "px-5 py-4" : "px-5 py-5 sm:px-7 sm:py-6"}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <p className="font-heading text-[0.9375rem] font-black text-navy-900">予算に対する申請額の割合</p>
        <span className="badge badge-blue !whitespace-normal">{phaseLabel(phase)}</span>
      </div>
      {b.percent === null ? (
        <div className="mt-3">{noNumber}</div>
      ) : (
        <StaleGuard asOf={b.asOf} maxDays={BUDGET_STALE_DAYS} fallback={<div className="mt-3">{noNumber}</div>}>
          <div className="mt-3 flex items-end gap-3">
            <p className="num shrink-0 whitespace-nowrap text-[2.75rem] font-semibold leading-none text-navy-900">
              {b.percent}
              <span className="ml-0.5 text-xl">％</span>
            </p>
            <p className="pb-1 text-[0.8125rem] leading-[1.6] text-ink-mute">
              {formatDateJa(b.asOf)} 0時時点（公式の概算値）
              {b.removalBonusPercent !== null && <span className="block">撤去加算の予算に対しては {b.removalBonusPercent}％</span>}
            </p>
          </div>
          <div className="meter mt-3" role="img" aria-label={`予算に対する申請額の割合は${b.percent}％`}>
            <span style={{ width: `${Math.min(100, b.percent)}%` }} />
          </div>
          <p className="mt-3 text-[0.8125rem] leading-[1.85] text-ink-mute">
            上限（100％）に達した時点で、期限の前でも受付が終わります。割合には、審査中の申請と、交付申請の予約も含まれます。
            <span className="mt-1 block">{link}</span>
          </p>
        </StaleGuard>
      )}
    </div>
  );
}
