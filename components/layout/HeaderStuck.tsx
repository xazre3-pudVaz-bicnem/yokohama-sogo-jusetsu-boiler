"use client";

import { useEffect } from "react";

/**
 * PC のヘッダーの上段（ロゴ・電話・見積もり）がスクロールで隠れたかどうかを、ヘッダーに印（data-stuck）で付ける。
 * 印が付くと、下段の主メニューの右に、電話番号と「無料見積もり」が出る（app/globals.css の .stuck-only）。
 * JS が動かないときは、印が付かないだけ（上段はスクロールで隠れ、下段の主メニューは残る）。
 */
export function HeaderStuck() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const top = document.querySelector<HTMLElement>("[data-header-top]");
    if (!header || !top || !("IntersectionObserver" in window)) return;
    // 上段が画面の上端にぴったり接しているだけ（隠れきった状態）も「隠れた」とみなすため、判定の枠の上を 2px 狭める
    const io = new IntersectionObserver(
      ([e]) => {
        header.dataset.stuck = e.isIntersecting ? "0" : "1";
      },
      { rootMargin: "-2px 0px 0px 0px" },
    );
    io.observe(top);
    return () => io.disconnect();
  }, []);
  return null;
}
