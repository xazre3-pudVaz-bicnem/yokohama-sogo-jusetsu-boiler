"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { LineIcon } from "@/components/ui/LineIcon";
import type { BrandLogo } from "@/data/products/types";

type LinkItem = { href: string; label: string; long?: string };

/**
 * スマホ・タブレット用のメニュー（1024px 未満）。
 * リンクは先読みしない（prefetch={false}）。ページを開くたびに、並んでいるリンク先を全部読み込みにいくのを避けるため。
 * ヘッダーの下から画面いっぱいに開く。開いている間は背面のスクロールを止める。
 * メニュー内のリンクを押したとき・Esc キーで・画面が 1024px 以上に広がったときに閉じる。
 */
export function MobileMenu({
  main,
  sub,
  groups,
  makers = [],
  phone,
  telHref,
  hours,
  line,
  formLabel,
}: {
  main: LinkItem[];
  sub: LinkItem[];
  groups: { name: string; links: LinkItem[] }[];
  /** メーカー別のページ（ロゴで並べる） */
  makers?: { href: string; name: string; logo: BrandLogo | null }[];
  phone: string;
  telHref: string;
  hours: string;
  line: string;
  formLabel: string;
}) {
  const [open, setOpen] = useState(false);

  // メニュー内のリンクを押したら閉じる（同じページへのリンクでも閉じるよう、クリックで判定する）
  const closeOnLink = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // 開いたまま画面が広がったら（タブレットを横にしたときなど）閉じる。
    // メニューは 1024px 以上で見えなくなるが、閉じないと背面のスクロールが止まったままになる
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        className="relative grid size-11 place-items-center rounded-full bg-cta-700 text-white shadow-[0_3px_0_var(--color-cta-800)]"
      >
        <span className="relative block h-3.5 w-5" aria-hidden="true">
          <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </span>
      </button>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-white transition-[opacity,visibility] duration-200 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        inert={!open}
        onClick={closeOnLink}
      >
        <nav aria-label="メニュー" className="container-x pb-28 pt-6">
          {/* 連絡先 */}
          <Link prefetch={false} href="/contact/photo" className="btn btn-yellow btn-lg mb-3 w-full">
            <CategoryIcon kind="camera" className="size-6" />
            写真を送ってかんたん見積もり
          </Link>
          <div className="grid grid-cols-2 gap-3">
            {phone && (
              <a href={telHref} className="btn btn-outline btn-sm flex-col !gap-0.5 !px-2 !py-2.5" data-cv="tel">
                <span className="text-xs font-semibold">電話で相談</span>
                {/* 幅 320px でも1行に収まる大きさにする（番号が2行に割れると読み違える） */}
                <span className="num whitespace-nowrap text-[1.0625rem] font-semibold tracking-wide">{phone}</span>
              </a>
            )}
            <Link prefetch={false} href="/contact" className={`btn btn-cta btn-sm ${phone ? "" : "col-span-2"}`}>
              {formLabel}
            </Link>
            {line && (
              <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-sm col-span-2" data-cv="line">
                <LineIcon className="size-5" />
                LINE で写真を送って相談する
              </a>
            )}
          </div>
          {hours && <p className="mt-2 text-center text-xs text-ink-mute">電話受付 {hours}</p>}

          {/* 種類の入口（色つきの絵） */}
          <ul className="mt-7 grid grid-cols-3 gap-2">
            {[
              { href: "/gas-water-heater", label: "ガス給湯器", icon: "gas" as const, tone: "border-gas-500 bg-gas-50" },
              { href: "/ecocute", label: "エコキュート", icon: "ecocute" as const, tone: "border-brand-500 bg-brand-50" },
              { href: "/hybrid", label: "ハイブリッド", icon: "hybrid" as const, tone: "border-hybrid-500 bg-hybrid-50" },
            ].map((c) => (
              <li key={c.href}>
                <Link prefetch={false} href={c.href} className={`flex min-h-[5.5rem] flex-col items-center justify-center gap-1 rounded-2xl border-[3px] px-1 text-center text-[0.8125rem] font-bold text-ink ${c.tone}`}>
                  <CategoryIcon kind={c.icon} className="size-9" />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* 主なページ */}
          <p className="eyebrow mt-8">メニュー</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4">
            {main.map((l) => (
              <li key={l.href} className="border-b border-silver-200">
                <Link prefetch={false} href={l.href} className="flex min-h-12 items-center py-2 text-[0.9375rem] font-bold leading-snug text-navy-900 text-balance">
                  {l.long ?? l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* メーカー（公式ロゴ） */}
          {makers.length > 0 && (
            <>
              <p className="eyebrow mt-9">メーカーから探す</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {makers.map((m) => (
                  <li key={m.href}>
                    <Link prefetch={false} href={m.href} className="logo-tile !min-h-14" aria-label={`${m.name}の給湯器`}>
                      <MakerLogo logo={m.logo} name={m.name} height={22} decorative />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* 商品 */}
          <p className="eyebrow mt-9">商品を探す</p>
          <div className="mt-3 space-y-5">
            {groups.map((g) => (
              <div key={g.name}>
                <p className="text-xs font-bold tracking-widest text-ink-mute">{g.name}</p>
                <ul className="mt-1 grid grid-cols-2 gap-x-4">
                  {g.links.map((l) => (
                    <li key={l.href} className="border-b border-silver-200">
                      <Link prefetch={false} href={l.href} className="flex min-h-12 items-center py-2 text-[0.9375rem] font-bold leading-snug text-navy-900 text-balance">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link prefetch={false} href="/compare" className="link-arrow mt-5 !text-sm">
            機種を比較する
          </Link>

          {/* そのほかのページ */}
          <p className="eyebrow mt-9">サイトの案内</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4">
            {sub.map((l) => (
              <li key={l.href} className="border-b border-silver-200">
                <Link prefetch={false} href={l.href} className="flex min-h-12 items-center py-2 text-[0.9375rem] font-bold leading-snug text-navy-900 text-balance">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
