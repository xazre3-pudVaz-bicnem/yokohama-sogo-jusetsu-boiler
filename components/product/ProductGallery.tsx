"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { TypeFigure, figureKindOf } from "@/components/diagram/TypeFigure";
import type { CategoryId, InstallationKey } from "@/data/products/types";

export type GalleryImage = { src: string; alt: string; width: number; height: number; caption?: string };

/**
 * 機種のページの写真（大きな写真・写真の切り替え・拡大表示）。
 * - 写真は商品データの images（1枚目が代表）。ユニットやリモコンの写真があれば、下の小さな写真で切り替える。
 * - 大きな写真を押すと、拡大して表示する（<dialog>。Esc・背景・閉じるボタンで閉じる）。
 * - 写真が無い機種は、設置タイプの図を出す（製品写真のように見せない）。
 * 写真の取得元とシリーズ共通かどうかは、呼び出し側（ページ）が下に書く。
 */
export function ProductGallery({
  images,
  category,
  installKey,
  shared,
}: {
  images: GalleryImage[];
  category: CategoryId;
  installKey: InstallationKey;
  shared: boolean;
}) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  /** 拡大を開いたボタン（閉じたら、ここへフォーカスを戻す。Safari はクリックでボタンにフォーカスを移さないため、自前で戻す） */
  const trigger = useRef<HTMLButtonElement>(null);
  const current = images[index];

  if (!current) {
    return (
      <div className="product-visual product-visual-tall">
        <TypeFigure kind={figureKindOf(category, installKey)} className="h-full w-full p-8" />
        <span className="visual-note">図は設置タイプ（製品写真ではありません）</span>
      </div>
    );
  }

  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();
  const step = (d: number) => setIndex((i) => (i + d + images.length) % images.length);

  return (
    <div>
      <button ref={trigger} type="button" onClick={open} className="group relative block w-full cursor-zoom-in" aria-label={`写真を拡大する（${current.alt}）`}>
        <div className="product-visual product-visual-tall">
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 46vw, 92vw"
            quality={75}
            preload={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            className="absolute inset-0 m-auto h-full w-full object-contain p-[6%]"
            style={{ maxWidth: Math.round(current.width * 1.25), maxHeight: Math.round(current.height * 1.25) }}
          />
          {shared && index === 0 && <span className="visual-note">シリーズ共通イメージ</span>}
          <span className="absolute right-2.5 top-2.5 grid size-9 place-items-center rounded-md bg-white/90 text-navy-900 shadow-sm transition-colors group-hover:bg-white" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="size-[1.125rem]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5" />
            </svg>
          </span>
        </div>
      </button>
      {current.caption && <p className="mt-2 text-center text-[0.8125rem] font-bold text-ink-body">{current.caption}</p>}

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2" aria-label="写真の切り替え">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={`${i + 1}枚目の写真を表示（${img.caption || img.alt}）`}
                className={`block w-full overflow-hidden rounded-md border-2 transition-colors ${i === index ? "border-navy-900" : "border-transparent hover:border-silver-300"}`}
              >
                <span className="product-visual !rounded-[0.3rem]">
                  <Image src={img.src} alt="" width={img.width} height={img.height} sizes="120px" quality={60} className="absolute inset-0 h-full w-full object-contain p-1.5" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="写真の拡大表示"
        onClose={() => trigger.current?.focus({ preventScroll: true })}
        onClick={(e) => {
          // 写真の外（背景）を押したら閉じる
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="relative bg-white p-3 sm:p-5">
          <div className="relative mx-auto aspect-square max-h-[calc(100dvh-8rem)] w-full max-w-[calc(100dvh-8rem)]">
            <Image src={current.src} alt={current.alt} fill sizes="(min-width: 1024px) 64rem, 100vw" quality={75} className="object-contain" />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[0.8125rem] font-bold text-ink-body">{current.caption || current.alt}</p>
            <div className="flex shrink-0 gap-2">
              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="btn btn-outline btn-xs">
                    前の写真
                  </button>
                  <button type="button" onClick={() => step(1)} className="btn btn-outline btn-xs">
                    次の写真
                  </button>
                </>
              )}
              <button type="button" onClick={close} className="btn btn-navy btn-xs">
                閉じる
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
