import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { fillTokens } from "@/lib/tokens";

/**
 * データファイルの本文を表示する。使える記法は3つだけ。
 *   [文字](/path)        … サイト内のリンク
 *   [文字](https://...)  … 外部のリンク（別のタブで開く）
 *   **文字**             … 強調（蛍光ペン）
 *   {{名前}}             … データの値（補助金の金額・期限など。lib/tokens.ts）
 * HTML は書けない（そのまま文字として出る）。
 */
const PATTERN = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g;

export function richNodes(text: string): ReactNode[] {
  const filled = fillTokens(text);
  return filled.split(PATTERN).map((part, i) => {
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/") || href.startsWith("#")) {
        return (
          <Link key={i} href={href} className="text-link">
            {label}
          </Link>
        );
      }
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-link">
          {label}
        </a>
      );
    }
    const strong = /^\*\*([^*]+)\*\*$/.exec(part);
    if (strong) {
      return (
        <strong key={i} className="marker font-bold text-navy-900">
          {strong[1]}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function RichText({ children }: { children: string }) {
  return <>{richNodes(children)}</>;
}

/** 本文の中の、サイト内リンクの行き先を取り出す（リンク切れの点検に使う） */
export function internalLinksIn(text: string): string[] {
  return [...text.matchAll(/\[[^\]]+\]\((\/[^)\s#?]*)[^)\s]*\)/g)].map((m) => m[1]);
}
