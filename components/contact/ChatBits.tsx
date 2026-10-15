import Image from "next/image";
import type { ReactNode } from "react";

/**
 * チャットの形の見積もり（写真でかんたん見積もり・LINE で送る見積もり）で使う、見た目の部品。
 * 2026-10-15 の依頼で、キンライサーの見積もりのような「キャラクターが吹き出しで聞き、大きなボタンで答える」形にした。
 * 画面側（クライアントの部品）からも使うので、サーバー専用のものを import しない。
 */
export type Mascot = { src: string; width: number; height: number };

/** キャラクター（ゆげまる）のせりふ */
export function BotSay({ mascot, children }: { mascot: Mascot; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_2px_0_rgba(0,0,0,0.08)] sm:size-14">
        <Image src={mascot.src} width={mascot.width} height={mascot.height} alt="" sizes="56px" className="h-10 w-auto sm:h-12" />
      </span>
      <div className="relative max-w-[40rem] rounded-[1.25rem] rounded-tl-md bg-white px-4 py-3 text-[0.9375rem] leading-[1.85] text-ink shadow-[0_2px_0_rgba(0,0,0,0.06)]">{children}</div>
    </div>
  );
}

/** 質問の札（白い角丸の板。中に選択のボタンや入力欄） */
export function QuestionCard({ title, children, id }: { title: ReactNode; children: ReactNode; id?: string }) {
  return (
    <fieldset id={id} className="ml-0 rounded-[1.25rem] border-2 border-white bg-[#f2fff7] px-4 pb-4 pt-3 shadow-[0_2px_0_rgba(0,0,0,0.06)] sm:ml-16 sm:px-5">
      <legend className="float-left mb-3 w-full pt-1 text-[0.9375rem] font-black text-ink">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

/** 「使えない（お湯が出ない・…）」を、大きな文字と小さな補足に分けて出す */
export function OptionLabel({ text }: { text: string }) {
  const at = text.indexOf("（");
  if (at < 0) return <span>{text}</span>;
  return (
    <>
      <span>{text.slice(0, at)}</span>
      <small>{text.slice(at)}</small>
    </>
  );
}

/** 残りの質問の数と、進み具合の棒 */
export function Remaining({ left, total }: { left: number; total: number }) {
  const done = Math.max(0, Math.min(total, total - left));
  return (
    <div className="sticky top-[4.25rem] z-10 rounded-full bg-white/90 px-3 py-2 shadow-[0_2px_0_rgba(0,0,0,0.06)] backdrop-blur lg:top-[3.75rem]" role="status" aria-label={left > 0 ? `残りの質問 ${left}問` : "質問はすべて終わりました"}>
      <div className="flex items-center gap-3">
        <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-brand-100">
          <span className="absolute inset-y-0 left-0 rounded-full bg-brand-600 transition-[width] duration-500" style={{ width: `${(done / total) * 100}%` }} />
        </span>
        <span className="shrink-0 rounded-full bg-ink px-2.5 py-0.5 text-[0.75rem] font-bold text-white">{left > 0 ? `あと${left}問` : "確認"}</span>
      </div>
    </div>
  );
}
