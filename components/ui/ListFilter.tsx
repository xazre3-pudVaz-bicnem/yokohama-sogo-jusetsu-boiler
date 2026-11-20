"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { normalizeModel } from "@/lib/model-number";

/**
 * サーバーで出した一覧（行に data-q を持つ）を、入力した文字で絞り込む。型番・エラーの番号の一覧で使う。
 * - data-q は、照らし合わせる語を normalizeModel でそろえて「|」でつないだもの（全角・半角、空白、ハイフンの種類、大文字・小文字をそろえる）。
 * - データを画面に持たせず、表示済みの行の hidden を切り替える（行が多くても、送る JavaScript が増えない）。
 * - JavaScript が動かないときは、一覧がすべて見えるだけ。
 */
export function ListFilter({
  listId,
  total,
  label,
  hint,
  unit = "行",
  emptyText,
}: {
  listId: string;
  total: number;
  /** 入力欄の名前（例：いまの給湯器の型番で絞り込む） */
  label: string;
  /** 入力欄の下の説明（例：型番の一部だけでも探せます（例：RUF-160）） */
  hint: string;
  /** 一覧の1つずつの呼び方（「行」「番号」など。件数の表示に使う） */
  unit?: string;
  /** 見つからなかったときの案内（写真で見積もりへのリンクを添えて出す） */
  emptyText: string;
}) {
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
        {label}
      </label>
      <p className="mt-1 text-[0.8125rem] leading-[1.8] text-ink-mute">{hint}</p>
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
          placeholder="ここに入力"
          className="min-h-12 w-full min-w-0 bg-transparent text-base outline-none"
        />
      </div>
      <p className="mt-2 text-[0.8125rem] text-ink-mute" aria-live="polite">
        {key ? `「${q.trim()}」を含む${unit}：${shown}件` : unit === "行" ? `${total}行を載せています` : `${total}件の${unit}を載せています`}
      </p>
      {key && shown === 0 && (
        <p className="mt-3 rounded-lg bg-paper-2 px-4 py-4 text-[0.875rem] leading-[1.9]">
          {emptyText}
          <Link href="/contact/photo" className="text-link ml-1">
            写真でかんたん見積もり
          </Link>
        </p>
      )}
    </div>
  );
}
