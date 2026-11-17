"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { normalizeModel } from "@/lib/model-number";

/**
 * 古い型番の一覧（サーバーで出した行）を、入力した型番で絞り込む。
 * 行は data-q（型番をそろえて「|」でつないだもの）を持つ。JavaScript が動かないときは、一覧がすべて見えるだけ。
 * 行の数が多い（1,000 を超える型番）ので、データを画面に持たせず、表示済みの行の hidden を切り替える。
 */
export function SuccessorFilter({ listId, total, example }: { listId: string; total: number; example: string }) {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(total);
  const inputId = useId();

  function apply(value: string) {
    setQ(value);
    const list = document.getElementById(listId);
    if (!list) return;
    const key = normalizeModel(value);
    let n = 0;
    list.querySelectorAll<HTMLElement>("[data-q]").forEach((el) => {
      const hit = !key || (el.dataset.q ?? "").includes(key);
      el.hidden = !hit;
      if (hit) n++;
    });
    setShown(n);
  }

  const key = normalizeModel(q);
  return (
    <div className="card card-line px-5 py-5 sm:px-6">
      <label htmlFor={inputId} className="text-sm font-bold text-navy-900">
        いまの給湯器の型番で絞り込む
      </label>
      <p className="mt-1 text-[0.8125rem] leading-[1.8] text-ink-mute">型番の一部だけでも探せます（例：{example}）。全角・半角、空白の有無は気にしなくて大丈夫です。</p>
      <div className="mt-3 flex items-center gap-2 rounded-lg border-2 border-silver-300 bg-white px-3 focus-within:border-brand-700">
        <Icon name="search" className="size-4 shrink-0 text-ink-mute" />
        <input
          id={inputId}
          type="search"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          value={q}
          onChange={(e) => apply(e.target.value)}
          placeholder="型番を入力"
          className="min-h-12 w-full min-w-0 bg-transparent text-base outline-none"
        />
      </div>
      <p className="mt-2 text-[0.8125rem] text-ink-mute" aria-live="polite">
        {key ? `「${q.trim()}」を含む行：${shown}件` : `${total}行を載せています`}
      </p>
      {key && shown === 0 && (
        <p className="mt-3 rounded-lg bg-paper-2 px-4 py-4 text-[0.875rem] leading-[1.9]">
          この一覧には見つかりませんでした。「～」の付いた型番は、その型番からの範囲です。型番の前半だけで探すか、銘板（型番のシール）の写真でご相談ください。
          <Link href="/contact/photo" className="text-link ml-1">
            写真でかんたん見積もり
          </Link>
        </p>
      )}
    </div>
  );
}
