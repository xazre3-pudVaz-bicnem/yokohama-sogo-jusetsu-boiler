"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Msg = { role: "user" | "assistant"; content: string };

/** よく聞かれることの候補（押すと、その文で質問する） */
const SUGGESTIONS = ["給湯器の号数は、どう選べばいい？", "交換の費用は、何で決まる？", "補助金の対象になる給湯器は？", "写真で見積もりは、どう送る？", "エコキュートとハイブリッドの違いは？"];

/** 答えの中の [名前](/パス) をリンクに、**強調** は記号を外して出す（サイトの中のパスだけをリンクにする） */
function renderAnswer(text: string, onLink: () => void): ReactNode {
  const lines = text.replace(/\*\*/g, "").split("\n");
  return lines.map((line, i) => {
    const parts: ReactNode[] = [];
    const re = /\[([^\]]{1,60})\]\((\/[A-Za-z0-9\-_/?=&#%.]*)\)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line))) {
      if (m.index > last) parts.push(line.slice(last, m.index));
      const href = m[2];
      parts.push(
        href.startsWith("//") ? (
          m[1]
        ) : (
          <Link key={`${i}-${m.index}`} href={href} onClick={onLink} className="font-bold text-brand-700 underline underline-offset-2 hover:text-cta-700">
            {m[1]}
          </Link>
        ),
      );
      last = m.index + m[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return (
      <Fragment key={i}>
        {parts}
        {i < lines.length - 1 && <br />}
      </Fragment>
    );
  });
}

/**
 * 自動応答チャットの画面（ゆげまる）。PC は右下の小さな窓、スマホは画面いっぱい。
 * - 答えは /api/chat から少しずつ届く（届いた分から表示する）。
 * - 日本語の変換中の Enter では送らない（変換を確定するための Enter のため）。
 * - 会話は、このタブを開いているあいだだけ覚える（sessionStorage。ページを移っても続きから）。
 * - 個人情報（住所・電話番号など）は書かないよう、入力欄の下で案内する。
 */
export function ChatPanel({ open, onClose, ai, mascot }: { open: boolean; onClose: () => void; ai: boolean; mascot: { src: string; width: number; height: number } }) {
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const saved = sessionStorage.getItem("yokoju-chat");
      return saved ? (JSON.parse(saved) as Msg[]).slice(-20) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem("yokoju-chat", JSON.stringify(messages.slice(-20)));
    } catch {
      /* 保存できない環境では覚えない */
    }
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    field.current?.focus({ preventScroll: true });
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // スマホ（画面いっぱい）では、背面のスクロールを止める
    const small = window.matchMedia("(max-width: 639px)").matches;
    const prev = document.body.style.overflow;
    if (small) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const send = async (text: string) => {
    const q = text.trim().slice(0, 400);
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next.slice(-10) }) });
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) setMessages([...next, { role: "assistant", content: "ごめんなさい、お答えを用意できませんでした。もう一度お試しください。" }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "通信できませんでした。電波の状態をお確かめのうえ、もう一度お試しください。お急ぎのときは、お電話か LINE でご相談ください。" }]);
    } finally {
      setBusy(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 変換中（isComposing・keyCode 229）の Enter は、変換の確定に使うので送らない
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault();
      void send(input);
    }
  };

  // スマホ（画面いっぱい）では、リンクを押したら閉じて、そのページを見せる
  const onLink = () => {
    if (window.matchMedia("(max-width: 639px)").matches) onClose();
  };

  const greeting = ai
    ? "こんにちは、ゆげまるです。給湯器の選び方・交換の費用の考え方・補助金・写真での見積もりのことなど、このサイトに載せている情報からお答えします。"
    : "こんにちは、ゆげまるです。よくいただくご質問から、近い答えをお探しします。機種のことや費用は、写真でかんたん見積もり・LINE・お電話でもご相談いただけます。";

  return (
    <div
      ref={panel}
      id="chat-panel"
      role="dialog"
      aria-modal="false"
      aria-label={ai ? "自動応答AIチャット（ゆげまる）" : "自動応答チャット（ゆげまる）"}
      className={`no-print fixed inset-0 z-[60] flex flex-col bg-white transition-[opacity,transform,visibility] duration-200 sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(41rem,calc(100dvh-2.5rem))] sm:w-[24.5rem] sm:overflow-hidden sm:rounded-[1.5rem] sm:border-4 sm:border-pop-yellow sm:shadow-[var(--shadow-pop)] ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"}`}
      inert={!open}
    >
      {/* 見出し */}
      <div className="flex items-center gap-3 bg-pop-yellow px-4 py-2.5">
        <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white bg-white">
          <Image src={mascot.src} width={mascot.width} height={mascot.height} alt="" sizes="48px" className="h-11 w-auto" />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-[0.6875rem] font-bold text-ink-body">{ai ? "自動応答AIチャット" : "自動応答チャット"}</span>
          <span className="block font-heading text-[1.125rem] font-black text-ink">教えて！ゆげまる</span>
        </span>
        <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-[0_2px_0_rgba(0,0,0,0.12)]" aria-label="チャットを閉じる">
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          </svg>
        </button>
      </div>

      {/* 会話 */}
      <div ref={log} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-mist px-3.5 py-4">
        <Bubble role="assistant" mascot={mascot}>
          {greeting}
        </Bubble>
        {messages.length === 0 && (
          <ul className="flex flex-wrap gap-2 pl-11" aria-label="よく聞かれること">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button type="button" onClick={() => void send(s)} className="min-h-10 rounded-full border-2 border-brand-500 bg-white px-3 py-1.5 text-left text-[0.8125rem] font-bold leading-snug text-brand-800 hover:bg-brand-50">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} mascot={mascot}>
            {m.role === "assistant" ? m.content ? renderAnswer(m.content, onLink) : <Typing /> : m.content}
          </Bubble>
        ))}
      </div>

      {/* 入力 */}
      <form
        className="border-t-2 border-silver-200 bg-white px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <div className="flex items-end gap-2">
          <label htmlFor="chat-input" className="sr-only">
            ゆげまるへの質問
          </label>
          <textarea
            id="chat-input"
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            maxLength={400}
            placeholder="例：24号と20号の違いは？"
            className="field min-h-[3rem] flex-1 resize-none !rounded-2xl !py-2 text-[0.9375rem]"
          />
          <button type="submit" disabled={busy || !input.trim()} className="grid size-12 shrink-0 place-items-center rounded-full bg-cta-700 text-white shadow-[0_3px_0_var(--color-cta-800)] transition-opacity disabled:opacity-40" aria-label="送る">
            <svg viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" />
            </svg>
          </button>
        </div>
        <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-ink-mute">
          {ai ? "AI が自動でお答えします。正しくないことがあります。" : "よくある質問から自動でお答えします。"}
          住所・電話番号などは書かないでください。正式なお見積もりは
          <Link href="/contact/photo" onClick={onLink} className="mx-0.5 font-bold text-brand-700 underline">
            写真でかんたん見積もり
          </Link>
          で。
        </p>
      </form>
    </div>
  );
}

function Bubble({ role, children, mascot }: { role: "user" | "assistant"; children: ReactNode; mascot: { src: string; width: number; height: number } }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand-700 px-3.5 py-2.5 text-[0.875rem] leading-relaxed text-white">{children}</p>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white bg-white">
        <Image src={mascot.src} width={mascot.width} height={mascot.height} alt="" sizes="36px" className="h-8 w-auto" />
      </span>
      <div className="max-w-[85%] rounded-2xl rounded-tl-md border-2 border-[#dcdcdc] bg-white px-3.5 py-2.5 text-[0.875rem] leading-[1.85] text-ink-body">{children}</div>
    </div>
  );
}

function Typing() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="答えを考えています">
      <span className="size-2 animate-bounce rounded-full bg-silver-400 [animation-delay:-0.2s]" />
      <span className="size-2 animate-bounce rounded-full bg-silver-400 [animation-delay:-0.1s]" />
      <span className="size-2 animate-bounce rounded-full bg-silver-400" />
    </span>
  );
}
