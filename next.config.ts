import type { NextConfig } from "next";
import { siteConfig } from "./lib/site";

/**
 * 本番 URL の決め方（canonical・OGP・sitemap・robots・RSS・構造化データの基準）。
 *   1. 環境変数 NEXT_PUBLIC_SITE_URL（または SITE_URL）があれば、それを使う
 *   2. 無ければ、Vercel の本番デプロイ（VERCEL_ENV=production）のときだけ、lib/site.ts の productionUrl を使う
 *   3. それ以外（プレビューのデプロイ・手元のビルド・productionUrl が空）は空のまま
 *      → 全ページ noindex、canonical・sitemap は出さない（公開前のサイトやプレビューが検索結果に出るのを防ぐ）
 * NODE_ENV は見ない（プレビューも production ビルドのため、本番かどうかの判定には使えない）。
 * ここで決めた値を NEXT_PUBLIC_SITE_URL としてビルドに埋め込むので、サーバー側もブラウザ側も同じ値を見る。
 *
 * ドメインが決まる前は、Vercel の環境変数に NEXT_PUBLIC_SITE_URL を「Production」にだけ入れる。
 * 「Preview」に入れると、プレビューの URL が検索結果に出るおそれがある。
 */
const resolvedSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_ENV === "production" ? siteConfig.productionUrl : "")
).replace(/\/+$/, "");

/**
 * つないである本番ドメインと、公開 URL の食い違いに気づくための警告（ビルドは止めない）。
 * VERCEL_PROJECT_PRODUCTION_URL は値には使わない（www なしが返ることがあり、転送元を canonical にしてしまうため）。
 */
if (process.env.VERCEL_ENV === "production") {
  const connected = (process.env.VERCEL_PROJECT_PRODUCTION_URL || "").replace(/^www\./, "");
  if (!resolvedSiteUrl) {
    console.warn("[site-url] 本番 URL が未設定です。全ページが noindex になります（NEXT_PUBLIC_SITE_URL か lib/site.ts の productionUrl を設定してください）。");
  } else if (connected && !connected.endsWith(".vercel.app")) {
    const configured = new URL(resolvedSiteUrl).hostname.replace(/^www\./, "");
    if (configured !== connected) {
      console.warn(`[site-url] 公開 URL（${configured}）と、Vercel につないである本番ドメイン（${connected}）が違います。canonical が別のドメインを指します。`);
    }
  }
}

/**
 * 本番ドメインの「www あり／なし」を、公開 URL に書いた側へそろえる（もう一方から 301 で転送する）。
 * 同じページが2つの URL で見えると、評価が分かれるため。http → https と末尾のスラッシュは、Vercel と Next.js が自動でそろえる。
 */
function hostRedirects() {
  if (!resolvedSiteUrl) return [];
  const host = new URL(resolvedSiteUrl).hostname;
  if (host.endsWith(".vercel.app")) return [];
  const other = host.startsWith("www.") ? host.slice(4) : `www.${host}`;
  // has の value は正規表現として扱われるので、ホスト名の「.」を文字どおりの点にする
  return [{ source: "/:path*", has: [{ type: "host" as const, value: other.replace(/\./g, "\\.") }], destination: `${resolvedSiteUrl}/:path*`, permanent: true }];
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_SITE_URL: resolvedSiteUrl },
  poweredByHeader: false,
  // 親ディレクトリに別の lockfile があるため、ワークスペースのルートを明示する
  turbopack: { root: process.cwd() },
  // 記事（content/blog）を読むページを、本番で描き直す（ISR）ときに読めるよう、記事のファイルを同梱する（lib/blog.ts）
  outputFileTracingIncludes: {
    "/": ["./content/blog/**/*"],
    "/blog": ["./content/blog/**/*"],
    "/blog/[slug]": ["./content/blog/**/*"],
    "/blog/page/[page]": ["./content/blog/**/*"],
    "/blog/category/[slug]": ["./content/blog/**/*"],
    "/blog/category/[slug]/page/[page]": ["./content/blog/**/*"],
  },
  experimental: {
    // お見積もりフォームの写真（画面側で縮めたもの）を受け取るため。Vercel の上限（4.5MB）より小さくしておく
    serverActions: { bodySizeLimit: "4mb" },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // 用意する画像の幅を絞る（既定は16段階。srcset が長くなり HTML が大きくなるため）
    deviceSizes: [420, 640, 828, 1080, 1440, 1920],
    imageSizes: [64, 128, 256, 384],
    // 写真は 60（見た目の差はほぼ無く、転送量が 3〜4 割減る）。ロゴ・図は既定の 75
    qualities: [60, 75],
    // 最適化した画像を配信側で持つ期間（31日）。画像を差し替えるときは、ファイル名を変える
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      ...hostRedirects(),
      // 一覧の1ページ目は /blog（/blog/page/1 という URL は作らない）
      { source: "/blog/page/1", destination: "/blog", permanent: true },
      // 打ち間違い・別の呼び方を正規の URL へ
      { source: "/product", destination: "/products", permanent: true },
      { source: "/product/:path*", destination: "/products/:path*", permanent: true },
      { source: "/areas", destination: "/area", permanent: true },
      { source: "/estimate", destination: "/contact", permanent: true },
      { source: "/subsidies", destination: "/subsidy", permanent: true },
      { source: "/eco-one", destination: "/hybrid", permanent: true },
      { source: "/ecojozu", destination: "/eco-jozu", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Vercel の URL（*.vercel.app）は、環境変数の設定に関係なく常に noindex。
        // 本番デプロイにも *.vercel.app の別名が付くが、検索結果に出すのは本番ドメインだけにする。
        source: "/:path*",
        has: [{ type: "host", value: "(?<sub>.*)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
