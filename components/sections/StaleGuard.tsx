"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 古くなった数値を、見る人の画面で隠す。
 *
 * ページは静的に作られるので、作り直しが止まると、作った日の数値がそのまま残る。
 * 「◯月◯日時点」と日付を添えてはいるが、何週間も前の値が目立つ場所に出たままになるのを防ぐため、
 * 時点（asOf）から maxDays を超えていたら、数値の部分（children）を隠して、代わりの案内（fallback）を出す。
 * JS が動かない環境では、何も隠さない（日付つきの値がそのまま見える）。
 */
export function StaleGuard({ asOf, maxDays, children, fallback }: { asOf: string; maxDays: number; children: ReactNode; fallback: ReactNode }) {
  const fresh = useRef<HTMLDivElement>(null);
  const stale = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const age = (Date.now() - Date.parse(`${asOf}T00:00:00+09:00`)) / 86_400_000;
    if (age > maxDays + 1) {
      if (fresh.current) fresh.current.hidden = true;
      if (stale.current) stale.current.hidden = false;
    }
  }, [asOf, maxDays]);

  return (
    <>
      <div ref={fresh}>{children}</div>
      <div ref={stale} hidden>
        {fallback}
      </div>
    </>
  );
}
