"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MAX_COMPARE, clearCompare, toggleCompare, useCompareIds } from "@/components/product/compare-store";

/**
 * 商品カード・機種のページに置く「比較に追加」。
 * 押すたびに、追加と取り消しが切り替わる。上限（4機種）を超えるときは、その場で知らせる。
 * variant="compact" … 商品カードの下の段に置く、小さな形（お知らせは、ボタンの下に重ねて出す）
 */
export function CompareToggle({ id, model, className = "", variant = "full" }: { id: string; model: string; className?: string; variant?: "full" | "compact" }) {
  const ids = useCompareIds();
  const [full, setFull] = useState(false);
  const on = ids.includes(id);
  const box = (
    <span aria-hidden="true" className={`grid size-4 shrink-0 place-items-center rounded-[0.25rem] border-[1.5px] ${on ? (variant === "full" ? "border-white bg-white" : "border-navy-900 bg-navy-900") : "border-silver-400 bg-white"}`}>
      {on && (
        <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke={variant === "full" ? "#061537" : "#fff"} strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      )}
    </span>
  );
  const message = full && !on ? `比較できるのは${MAX_COMPARE}機種までです。ほかの機種を外してから追加してください。` : "";

  if (variant === "compact") {
    return (
      <div className={`relative ${className}`}>
        <button type="button" aria-pressed={on} onClick={() => setFull(!toggleCompare(id))} className="inline-flex min-h-11 items-center gap-1.5 text-[0.8125rem] font-bold text-navy-900 hover:text-brand-700">
          {box}
          <span>
            {on ? "比較に追加済み" : "比較に追加"}
            <span className="sr-only">（{model}）</span>
          </span>
        </button>
        <p role="status" className="absolute right-0 top-full z-10 w-60 rounded-lg border border-silver-200 bg-white px-3 py-2 text-xs font-bold leading-relaxed text-heat shadow-[var(--shadow-pop)] empty:hidden">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        aria-pressed={on}
        onClick={() => setFull(!toggleCompare(id))}
        className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] px-4 text-[0.8125rem] font-bold transition-colors ${
          on ? "border-navy-900 bg-navy-900 text-white" : "border-silver-300 bg-white text-navy-900 hover:border-brand-500"
        }`}
      >
        {box}
        <span>
          {on ? "比較に追加済み" : "比較に追加"}
          <span className="sr-only">（{model}）</span>
        </span>
      </button>
      <p role="status" className="mt-1.5 text-xs font-bold leading-relaxed text-heat empty:hidden">
        {message}
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
