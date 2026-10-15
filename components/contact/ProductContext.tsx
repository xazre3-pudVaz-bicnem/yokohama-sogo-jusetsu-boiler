"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

/** 見ていた機種のページの形（lib/contact.ts の PRODUCT_PAGE_PATTERN と同じ） */
const PAGE = /^\/products\/[a-z0-9-]+\/[a-z0-9-]+$/;

/** URL の ?product=（メーカー・型番・商品名）と ?page=（機種のページ）を読む */
export function readProductContext(): { product: string; page: string } {
  const sp = new URLSearchParams(window.location.search);
  const product = (sp.get("product") ?? "").slice(0, 120);
  const page = sp.get("page") ?? "";
  return { product, page: PAGE.test(page) ? page : "" };
}

/**
 * 機種のページの「この商品で見積もり」から来たとき、フォームの上に、どの機種のお見積もりかを出す。
 * フォームの「気になっている機種」と、見ていたページ（メールに載る）は、各フォームが同じ値で埋める。
 */
const noop = () => () => {};

export function ProductContextNote({ mode = "form" }: { mode?: "form" | "line" }) {
  // サーバーの描画と最初の描画では空（URL はブラウザでしか読めない）。読めたら出す
  const search = useSyncExternalStore(noop, () => window.location.search, () => "");
  if (!search) return null;
  const ctx = readProductContext();
  if (!ctx.product) return null;
  return (
    <div className="mb-6 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-[0.875rem] leading-[1.8]">
      <p className="font-bold text-navy-900">ご相談の機種：{ctx.product}</p>
      <p className="text-ink-body">
        {mode === "form" ? "この機種のお見積もりとして承ります（「気になっている機種」に入れてあります）。" : "LINE のトークやお電話で、この型番をお伝えください。"}
        {ctx.page && (
          <Link href={ctx.page} className="text-link ml-1">
            機種のページに戻る
          </Link>
        )}
      </p>
    </div>
  );
}
