import { z } from "zod";
import { FIGURE_KINDS, blogClusterIds } from "@/lib/blog-clusters";

/**
 * コラム記事の frontmatter の型（手書きの記事にも、自動生成の記事にも同じ検査をかける）。
 * サイト側（lib/blog.ts）と生成側（lib/blog-generator/）の両方がこれを使う。
 * ここで形の誤りが見つかった記事があると、ビルドが止まる（壊れた記事を公開しないため）。
 */
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD の形で書く");
/** サイト内のパス（/ から始まる。クエリ・# は付けない） */
const sitePath = z.string().regex(/^\/[a-z0-9/_-]*$/, "/ から始まるサイト内のパス（クエリと # は付けない）");

export const postFaqSchema = z.object({
  q: z.string().min(8).max(80),
  a: z.string().min(30).max(400),
});

export const postSourceSchema = z.object({
  /** 出典の名称（例：給湯省エネ2026事業【公式】） */
  title: z.string().min(2),
  url: z.string().url(),
  /** 出典を確認した日（その日に公式ページを開いて確かめた日） */
  checkedAt: isoDate,
});

export const postFrontmatterSchema = z.object({
  title: z.string().min(12).max(48),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "半角の英小文字・数字・ハイフンだけ")
    .min(6)
    .max(80),
  description: z.string().min(60).max(130),
  /** カテゴリ（lib/blog-clusters.ts の id） */
  category: z.enum(blogClusterIds),
  /** 検索キーワード。**先頭が主キーワード**（この記事が代表になる検索語。ほかの記事・固定ページと同じ語にしない） */
  keywords: z.array(z.string().min(2)).min(2).max(8),
  /** この記事が答える検索意図（1記事1意図。重複の判定に使う） */
  intent: z.string().min(6).max(60),
  /** 最初に公開した日（日本時間） */
  publishedAt: isoDate,
  /** 内容を最後に直した日（日付だけを新しくしない） */
  updatedAt: isoDate,
  author: z.string().min(2),
  /** 質問と答え。本文で答えきれなかった関連する疑問があるときだけ書く（無くてよい）。構造化データにも同じものが出る */
  faq: z.array(postFaqSchema).max(5).default([]),
  /** 関連する固定ページのパス（選び方・故障・補助金・種類・地域など）。記事の末尾に「あわせて確かめたいページ」として出す */
  relatedPages: z.array(sitePath).max(6).default([]),
  /** 関連する機種（data/products の id）。記事の末尾に機種のカードとして出す */
  relatedProducts: z.array(z.string().min(3)).max(4).default([]),
  /** 関連する地域ページのスラッグ（data/areas） */
  relatedAreas: z.array(z.string()).max(2).default([]),
  /** 関連する記事のスラッグ（無ければ空配列。表示のときに同じカテゴリから補う） */
  relatedArticles: z.array(z.string()).max(4).default([]),
  /** 事実の出典（メーカー・国・自治体の公式ページ）。確認した日つき */
  sources: z.array(postSourceSchema).max(10).default([]),
  /** 自動生成の記事かどうか（手書きは false） */
  generated: z.boolean().default(false),
  /** 記事の冒頭の図（設置の形の模式図）。省略すると、カテゴリの絵が出る */
  figure: z.enum(FIGURE_KINDS).optional(),
  /**
   * その日に公式ページを取り直して確かめた情報（予算の割合・メーカーの掲載など）を載せた記事だけ。確かめた日。
   * 記事の中の「◯月◯日時点」の情報が、この日に確かめたものであることを示す（後日の書き換えでは更新しない）。
   */
  liveCheckedAt: isoDate.optional(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type PostFaq = z.infer<typeof postFaqSchema>;
export type PostSource = z.infer<typeof postSourceSchema>;
