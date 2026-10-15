import type { ImageKey } from "@/lib/images";

/**
 * 解説のページ（選び方・補助金・故障とトラブル）の本文の型。
 *
 * 本文は、区画（Section）と、その中の部品（Block）で書く。文章の中では、次の記法だけ使える（components/ui/RichText.tsx）。
 *   [文字](/path)  … リンク　　**文字** … 強調　　{{名前}} … データの値（補助金の金額・期限。lib/tokens.ts）
 *
 * 守ること
 * - 補助金の金額・期限は、数字を直接書かず {{名前}} で書く。
 * - 出典のある事実（数値・制度・メーカーの説明）は、ページの sources に出典を書く。
 * - 見出しは、内容をそのまま表す言葉にする。全ページで同じ型の見出しを繰り返さない。
 * - 番号つきの手順（steps）は、順番のあるものにだけ使う。
 */

export type SourceRef = { label: string; url: string };

/** コードで描く図（components/diagram/）の名前 */
export type FigureName =
  | "gou" // 号数とお湯の量
  | "install-types" // 設置方式の見分け方
  | "function-types" // 給湯専用・オート・フルオートの違い
  | "ecojozu-mechanism" // エコジョーズの仕組み
  | "ecocute-mechanism" // エコキュートの仕組み
  | "hybrid-mechanism" // ハイブリッド給湯器の仕組み
  | "price-breakdown" // 交換費用の内訳
  | "subsidy-flow" // 補助金の申請の流れ
  | "label-location"; // 型番の書いてある場所

/** データから作る部品（components/content/Widgets.tsx）の名前 */
export type WidgetName =
  | "kyutou-amounts" // 給湯省エネ2026事業の補助額の表
  | "kyutou-period" // 対象の期間と期限
  | "kyutou-status" // いまの受付の状態・予算の割合・確認日
  | "operator-status" // 当社が申請を行えるかどうか
  | "program-compare" // 制度の比較（給湯省エネ・みらいエコ・賃貸集合・横浜市）
  | "hybrid-registered" // 国のリストに登録されているハイブリッド給湯機（このサイトの掲載機種）
  | "ecocute-registered" // 国のリストに登録されているエコキュート（このサイトの掲載機種）
  | "hybrid-compare" // ハイブリッド給湯機の機種の比較
  | "products-gas"
  | "products-eco-jozu"
  | "products-ecocute"
  | "products-hybrid"
  | "ygrep-summary" // 横浜市の制度のまとめ
  | "ward-compare" // 地域のページがある区の、住まいの統計の比較
  | "contact-photo-guide"; // 型番と設置場所の写真の送り方

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][]; note?: string }
  | { type: "callout"; tone?: "info" | "caution" | "plain"; title?: string; text: string }
  | { type: "dl"; items: { term: string; desc: string }[] }
  | { type: "links"; items: { href: string; label: string; note?: string }[] }
  /** 実務の補足を、スタッフのイラストと吹き出しで添える。label は中身を表す言葉にする */
  | { type: "note"; label: string; text: string; pose?: ImageKey }
  | { type: "figure"; name: FigureName; caption?: string }
  | { type: "widget"; name: WidgetName };

export type Section = {
  /** ページ内リンクの行き先（英小文字とハイフン） */
  id: string;
  heading: string;
  blocks: Block[];
};

export type Cluster = "guide" | "subsidy" | "trouble";

export type ContentPage = {
  cluster: Cluster;
  /** URL の末尾（/guide/<slug> など） */
  slug: string;
  /** 冒頭のラベル */
  eyebrow: string;
  /** <title>（末尾の「｜横浜総合住設」は自動で付く。長いときは付かない） */
  title: string;
  h1: string;
  /** よくある質問の見出し（h1 が文のページで使う。無ければ「h1＋について」） */
  faqTitle?: string;
  /** meta description（120字以内を目安に） */
  description: string;
  /** 冒頭の説明（h1 の下） */
  lead: string;
  /** このページが担当する検索語（1ページに1つ。ほかのページ・コラムと重ねない） */
  keyword: string;
  secondaryKeywords?: string[];
  /** 最初に公開した日 */
  publishedAt: string;
  /** 内容を最後に直した日（日付だけを新しくしない） */
  updatedAt: string;
  sections: Section[];
  /** よくある質問（このページに表示するものだけ。構造化データにも同じものが出る） */
  faqs?: { q: string; a: string }[];
  sources?: SourceRef[];
  /** 関連するページ */
  related?: { href: string; label: string; note?: string }[];
  /** 冒頭に添えるイラスト（無ければ出さない） */
  illust?: ImageKey;
  /** 一覧に出す短い説明 */
  summary: string;
};
