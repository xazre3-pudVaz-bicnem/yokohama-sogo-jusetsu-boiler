"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const ChatPanel = dynamic(() => import("@/components/chat/ChatPanel").then((m) => m.ChatPanel), { ssr: false });

/**
 * 右下の「自動応答チャット」の入口（雲の吹き出しと、キャラクター「ゆげまる」）。押すとチャットの画面が開く。
 * - チャットの画面の部品は、初めて開いたときに読み込む（最初の表示を軽くするため）。
 * - ai … サイトに AI の設定（ANTHROPIC_API_KEY）があるか。無いときは「自動応答チャット」として、よくある質問から答える。
 * - お問い合わせのページでは出さない（スマホでフォームの送信ボタンと重なるため）。
 * - スマホでは、下部の固定ボタンが出ているあいだ、その上に上げる（app/globals.css の .chat-launcher）。
 */
export function ChatLauncher({ ai, mascot }: { ai: boolean; mascot: { src: string; width: number; height: number } }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  if (pathname.startsWith("/contact")) return null;

  const close = () => {
    setOpen(false);
    button.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <button
        ref={button}
        type="button"
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        onPointerEnter={() => setLoaded(true)}
        aria-expanded={open}
        aria-controls={open ? "chat-panel" : undefined}
        className={`chat-launcher no-print group fixed right-3 z-40 flex items-end transition-[transform,opacity] duration-300 sm:right-5 ${open ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"}`}
      >
        {/* 雲の吹き出し */}
        <span className="relative -mr-3 mb-9 hidden sm:block">
          <svg viewBox="0 0 160 104" className="h-[6.25rem] w-[9.75rem] drop-shadow-[0_3px_0_rgba(0,0,0,0.12)]" aria-hidden="true">
            <path
              d="M38 14c9-11 30-12 40-1 9-9 29-8 36 5 15-2 28 9 27 23 12 6 15 22 6 32-3 13-17 19-29 15-7 9-21 11-31 4-10 7-25 6-33-3-14 4-29-4-31-18-12-5-15-21-6-31-2-15 9-27 21-26Z"
              fill="#fff"
              stroke="#4a3428"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M118 88l14 13-21-5" fill="#fff" stroke="#4a3428" strokeWidth="3" strokeLinejoin="round" />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center pb-1 text-center leading-tight text-[#4a3428]">
            <span className="text-[0.625rem] font-bold tracking-wider">{ai ? "自動応答AIチャット" : "自動応答チャット"}</span>
            <span className="mt-0.5 font-heading text-[0.9375rem] font-black">教えて</span>
            <span className="font-heading text-[1rem] font-black">ゆげまる</span>
            <span className="sr-only">（チャットを開く）</span>
          </span>
        </span>
        {/* スマホ：小さな札。ボタンの名前は、見えている文字（吹き出し・札）に「開く」を足したもの */}
        <span className="absolute -top-6 right-1 whitespace-nowrap rounded-full border-2 border-[#4a3428] bg-white px-2 py-0.5 text-[0.625rem] font-bold text-[#4a3428] sm:hidden">
          {ai ? "AIに質問" : "質問する"}
          <span className="sr-only">（自動応答チャットを開く）</span>
        </span>
        <Image src={mascot.src} width={mascot.width} height={mascot.height} alt="" sizes="88px" className="h-auto w-[3.75rem] transition-transform duration-300 group-hover:-translate-y-1 sm:w-[5.25rem]" />
      </button>
      {loaded && <ChatPanel open={open} onClose={close} ai={ai} mascot={mascot} />}
    </>
  );
}
