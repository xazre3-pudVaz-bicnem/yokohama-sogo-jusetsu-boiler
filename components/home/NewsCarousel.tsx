"use client";

import { Children, useRef, type ReactNode } from "react";

/**
 * トップの「お知らせ」の横送り（バナーを横に並べ、左右のボタンで送る）。
 * 中身（バナー）はサーバーで描いて渡す。JS が動かないときも、横にスクロールすれば全部見られる。
 * 自動では送らない（読んでいる途中で動くと読みにくく、動きを減らす設定の人にも負担になるため）。
 * 送るボタンは、バナーの下に置く（左右に重ねると、スマホの幅でバナーの文字を隠すため）。
 */
export function NewsCarousel({ children, label }: { children: ReactNode; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <div role="region" aria-roledescription="カルーセル" aria-label={label}>
      <ul ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(1.25rem,calc(50%-34rem))] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* toArray は空の要素（条件で出さないバナー）を除く。map のままだと、空の枠が並ぶ */}
        {Children.toArray(children).map((child, i) => (
          <li key={i} className="w-[min(86vw,42rem)] shrink-0 snap-center">
            {child}
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="grid size-11 place-items-center rounded-full bg-navy-900/85 text-white shadow-[var(--shadow-card)] transition-colors hover:bg-navy-900"
          aria-label="前のお知らせ"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 3.5 5.5 8l4.5 4.5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="grid size-11 place-items-center rounded-full bg-navy-900/85 text-white shadow-[var(--shadow-card)] transition-colors hover:bg-navy-900"
          aria-label="次のお知らせ"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 3.5 10.5 8 6 12.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
