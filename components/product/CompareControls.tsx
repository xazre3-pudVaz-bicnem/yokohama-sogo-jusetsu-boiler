"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MAX_COMPARE, clearCompare, toggleCompare, useCompareIds } from "@/components/product/compare-store";

/**
 * 商品カード・機種のページに置く「比較に追加」。
 * 押すたびに、追加と取り消しが切り替わる。上限（4機種）を超えるときは、その場で知らせる。
 */
export function CompareToggle({ id, model, className = "" }: { id: string; model: string; className?: string }) {
  const ids = useCompareIds();
  const [full, setFull] = useState(false);
  const on = ids.includes(id);
  return (
    <div className={className}>
      <button
        type="button"
        aria-pressed={on}
        onClick={() => setFull(!toggleCompare(id))}
        className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border-[1.5px] px-4 text-[0.8125rem] font-bold transition-colors ${
          on ? "border-navy-900 bg-navy-900 text-white" : "border-silver-300 bg-white text-navy-900 hover:border-brand-500"
        }`}
      >
        <span aria-hidden="true" className={`grid size-4 place-items-center rounded-[0.3rem] border-[1.5px] ${on ? "border-white bg-white" : "border-silver-400"}`}>
          {on && (
            <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="#061537" strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
          )}
        </span>
        <span>
          {on ? "比較に追加済み" : "比較に追加"}
          <span className="sr-only">（{model}）</span>
        </span>
      </button>
      <p role="status" className="mt-1.5 text-xs font-bold leading-relaxed text-heat empty:hidden">
        {full && !on ? `比較できるのは${MAX_COMPARE}機種までです。ほかの機種を外してから追加してください。` : ""}
      </p>
    </div>
  );
}

/**
 * 画面の下に出る、比較への入口（1機種以上を選んでいるとき）。
 * スマホでは、下部の固定ボタン（電話・LINE・無料見積もり）の上に置く。比較のページとお見積もりのページでは出さない。
 */
export function CompareTray() {
  const ids = useCompareIds();
  const pathname = usePathname();
  if (!ids.length || pathname === "/compare" || pathname.startsWith("/contact")) return null;
  return (
    <aside aria-label="機種の比較" className="no-print pointer-events-none fixed inset-x-0 bottom-[4.75rem] z-30 flex justify-center px-3 lg:bottom-5 lg:justify-end lg:px-6">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-silver-300 bg-white py-1.5 pl-4 pr-1.5 shadow-[var(--shadow-pop)]">
        <p className="text-[0.8125rem] font-bold text-navy-900">
          <span className="num text-base font-semibold">{ids.length}</span> 機種を選択中
        </p>
        <button type="button" onClick={clearCompare} className="min-h-10 px-2 text-xs font-bold text-ink-mute underline underline-offset-4">
          すべて外す
        </button>
        <Link href={`/compare?ids=${ids.map(encodeURIComponent).join(",")}`} className="btn btn-navy btn-sm !min-h-10">
          比較する
        </Link>
      </div>
    </aside>
  );
}
