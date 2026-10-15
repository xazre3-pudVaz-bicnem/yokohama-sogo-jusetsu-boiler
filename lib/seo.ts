import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * 本番 URL は NEXT_PUBLIC_SITE_URL だけから決める。
 * この値は next.config.ts がビルド時に決めて埋め込む：環境変数があればそれを、無ければ Vercel の
 * 本番デプロイのときだけ lib/site.ts の productionUrl を使う。
 * 空なら canonical / OG URL / sitemap を一切出さず、robots は noindex にする（公開前・プレビュー・手元のビルド）。
 *
 * このファイルはクライアントコンポーネントからも読み込まれる。fs などサーバー専用のモジュールを import しないこと。
 */
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
export const SITE_URL: string | undefined = RAW_SITE_URL ? RAW_SITE_URL.replace(/\/+$/, "") : undefined;
export const IS_PUBLIC = Boolean(SITE_URL);

/** 絶対 URL。トップは末尾のスラッシュなし（canonical・sitemap・構造化データで表記をそろえる） */
export function absoluteUrl(path = "/"): string | undefined {
  if (!SITE_URL) return undefined;
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** タイトルの末尾。地域名や機種名はページ側のタイトルに入れる */
export const SITE_TITLE_SUFFIX = `｜${siteConfig.shortName}`;

/** 文字の幅（半角を1、全角を2と数える） */
export function textWidth(s: string): number {
  let w = 0;
  for (const ch of s) w += /[ -~｡-ﾟ]/.test(ch) ? 1 : 2;
  return w;
}

/**
 * 本体がこの幅を超えるタイトルには、末尾の「｜横浜総合住設」を付けない。
 * 検索結果のタイトルは全角30字前後で切れる。長いタイトルでは本題を優先する。
 */
export const TITLE_SUFFIX_MAX_WIDTH = 48;

export function fullTitle(title: string): string {
  if (title.includes(siteConfig.shortName) || title.includes(siteConfig.nickname)) return title;
  return textWidth(title) > TITLE_SUFFIX_MAX_WIDTH ? title : `${title}${SITE_TITLE_SUFFIX}`;
}

/**
 * meta description を、文の切れ目で max 字に収める（文の途中で切ると、検索結果に「…給湯省エ」のような半端な文が出る）。
 * 前から順に、収まるだけの文をつなぐ。最初の文だけで max を超えるときに限り、その文を切る。
 */
export function fitDescription(text: string, max = 120): string {
  if (text.length <= max) return text;
  let out = "";
  for (const sentence of text.match(/[^。]+。?/g) ?? [text]) {
    if ((out + sentence).length > max) break;
    out += sentence;
  }
  return out || text.slice(0, max);
}

/** 既定の共有画像（scripts/prepare-images.mjs が作る） */
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

type BuildMetadataInput = {
  /** 「｜横浜総合住設」を付ける前のタイトル（社名・愛称を含むとき、長いときは付かない） */
  title: string;
  description: string;
  /** 先頭スラッシュから始まるパス */
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** 検索結果に出したくないページ */
  noindex?: boolean;
  /** 共有画像（/images/... の形）。省略時は既定の画像 */
  image?: { src: string; width: number; height: number; alt?: string };
  section?: string;
  tags?: string[];
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const title = fullTitle(input.title);
  const url = absoluteUrl(input.path);
  const img = input.image ?? { src: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: siteConfig.siteName };
  const ogImage = absoluteUrl(img.src);
  const noindex = input.noindex || !IS_PUBLIC;
  const feed = absoluteUrl("/feed.xml");

  return {
    title,
    description: input.description,
    keywords: input.keywords,
    alternates: url
      ? {
          canonical: url,
          ...(feed ? { types: { "application/rss+xml": [{ url: feed, title: `${siteConfig.siteName} コラム` }] } } : {}),
        }
      : undefined,
    // 本番URL未設定（公開前・プレビュー）は noindex,nofollow。個別の noindex は noindex,follow（リンクはたどらせる）
    robots: noindex
      ? { index: false, follow: IS_PUBLIC }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      title,
      description: input.description,
      siteName: siteConfig.siteName,
      locale: "ja_JP",
      type: input.type ?? "website",
      url,
      // 値があるときだけキーを置く（images: undefined を返すと、既定の共有画像まで消える）
      ...(ogImage ? { images: [{ url: ogImage, width: img.width, height: img.height, alt: img.alt ?? input.title }] } : {}),
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime, authors: [siteConfig.editorial.author], section: input.section, tags: input.tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/** YYYY-MM-DD → 2026年10月1日 */
export function formatDateJa(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${y}年${m}月${d}日`;
}

/** YYYY-MM-DD → 2026.10.01（一覧の日付表示用） */
export function formatDateDot(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, ".");
}

/** 金額の表示（例：123456 → 123,456円） */
export function formatYen(n: number): string {
  return `${n.toLocaleString("ja-JP")}円`;
}
