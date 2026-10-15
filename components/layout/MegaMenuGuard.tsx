"use client";

import { useEffect } from "react";

/**
 * PC の「商品を探す」の一覧（ホバー・フォーカスで開く。CSS だけで動く）を、閉じたいときに閉じる。
 *
 * - 一覧の中のリンクを押したら閉じる。ヘッダーはページを移っても作り直されないので、押したリンクにフォーカスが残り、
 *   マウスを離しても、移った先のページで一覧が開いたままになるため。
 * - Esc キーで閉じる（フォーカスは「商品を探す」に戻す）。
 * 閉じた印（data-closed）は、マウスが一覧の外に出たとき・フォーカスが一覧の外に移ったときに外す。
 * 表示の切り替えは CSS 側（app/globals.css の [data-mega]）。JS が動かなくても、一覧はホバー・フォーカスで開く。
 */
export function MegaMenuGuard() {
  useEffect(() => {
    const menus = [...document.querySelectorAll<HTMLElement>("[data-mega]")];
    const reopen = (menu: HTMLElement) => () => delete menu.dataset.closed;
    const cleanups = menus.map((menu) => {
      const onClick = (e: MouseEvent) => {
        const a = (e.target as Element | null)?.closest?.("a");
        if (!a) return;
        menu.dataset.closed = "1";
        a.blur();
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key !== "Escape" || menu.dataset.closed) return;
        menu.dataset.closed = "1";
        menu.querySelector<HTMLElement>("a")?.focus();
      };
      const onLeave = reopen(menu);
      const onFocusOut = (e: FocusEvent) => {
        if (!menu.contains(e.relatedTarget as Node | null)) delete menu.dataset.closed;
      };
      menu.addEventListener("click", onClick);
      menu.addEventListener("keydown", onKey);
      menu.addEventListener("mouseleave", onLeave);
      menu.addEventListener("focusout", onFocusOut);
      return () => {
        menu.removeEventListener("click", onClick);
        menu.removeEventListener("keydown", onKey);
        menu.removeEventListener("mouseleave", onLeave);
        menu.removeEventListener("focusout", onFocusOut);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
