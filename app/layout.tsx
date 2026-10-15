import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { CompareTray } from "@/components/product/CompareControls";
import { JsonLd } from "@/components/seo/JsonLd";
import { isChatAIEnabled } from "@/lib/chat/config";
import { img } from "@/lib/images";
import { graph, organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { siteConfig, primaryPhone, telHref, lineUrl } from "@/lib/site";
import { SITE_URL, IS_PUBLIC } from "@/lib/seo";

/**
 * 書体の方針（スマホの表示速度を優先。コーポレートサイトと同じ）
 * - 本文の日本語は、端末に入っている書体（ヒラギノ／游ゴシック／BIZ UDゴシックなど）をそのまま使う。
 * - 見出し用の日本語フォント（Zen Kaku Gothic New・太字）は、画面幅 1024px 以上のときだけ読み込む。
 *   日本語フォントは文字の範囲ごとに分割されていて、1ページで数十ファイル（数百 KB）を取りに行く。
 *   スマホで読むと最初の描画が大きく遅れるため、スマホは端末の太字ゴシックのままにする。
 *   PC でも、読み込みは最初の描画が終わってから（load のあと、最大の要素の描画が落ち着いてから。遅くとも4秒後）。
 *   条件つきで後から足すため、<link> ではなく小さなスクリプトで読み込む（public/fonts/zen-kaku-gothic-new.css）。
 * - 欧文・数字（型番、電話番号、金額）だけ、ロゴの書体に近い Jost を next/font で読み込む（ラテン文字のみ・自前配信）。
 */
/**
 * 全ページを、1時間ごとに描き直す（ISR）。補助金の受付の状態（受付中 → 予約の締め切り → 受付終了）・予算の割合の時点・
 * 公開日が来た記事など、「今日の日付」で変わる表示が、デプロイの止まった日にも古いまま残らないようにするため。
 * 毎日の自動実行が push して作り直すのとは別の、安全策（制度が終わって予算の割合が動かなくなっても、表示は日付で切り替わる）。
 * 値は数値のリテラルで書く（環境変数からは渡せない）。
 */
export const revalidate = 3600;

const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: {
    default: `横浜市・戸塚区の給湯器交換｜${siteConfig.siteName}`,
    template: "%s",
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "給湯器の販売・交換工事",
  robots: IS_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { siteName: siteConfig.siteName, locale: "ja_JP", type: "website" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // Search Console / Bing Webmaster Tools の所有権確認（環境変数に値があるときだけ出力する）
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

const FONT_LOADER = `(function(){if(!window.matchMedia||!matchMedia("(min-width:1024px)").matches)return;var done=false,t;function add(){if(done)return;done=true;var l=document.createElement("link");l.rel="stylesheet";l.href="/fonts/zen-kaku-gothic-new.css";document.head.appendChild(l)}function arm(){clearTimeout(t);t=setTimeout(add,350)}function start(){try{new PerformanceObserver(arm).observe({type:"largest-contentful-paint",buffered:true})}catch(e){}arm();setTimeout(add,4000)}if(document.readyState==="complete")start();else addEventListener("load",start,{once:true})})();`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020b24",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const phone = primaryPhone();
  return (
    <html lang="ja" data-scroll-behavior="smooth" className={jost.variable}>
      <body className="min-h-dvh">
        <script dangerouslySetInnerHTML={{ __html: FONT_LOADER }} />
        <noscript>
          {/* JS が無効な環境向け。通常は上のスクリプトが、描画のあとで読み込む */}
          {/* eslint-disable-next-line @next/next/no-css-tags */}
          <link rel="stylesheet" href="/fonts/zen-kaku-gothic-new.css" media="(min-width: 1024px)" />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          本文へ移動
        </a>
        <Header />
        {/*
          注意：ここで {children} を <Suspense> で囲まないこと。
          囲むと、静的生成した HTML で本文が <main> の外（<div hidden>）に回され、スクリプトで差し込む形になる。
          JS を実行しないクローラーから本文が見えなくなる。
        */}
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <CompareTray />
        <MobileCtaBar phone={phone} telHref={telHref(phone)} line={lineUrl()} />
        <ChatLauncher ai={isChatAIEnabled()} mascot={img("ai/mascot-wave")} />
        <RevealObserver />
        <JsonLd data={graph(organizationSchema(), localBusinessSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
