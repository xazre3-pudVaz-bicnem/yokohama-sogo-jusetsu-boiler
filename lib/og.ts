import { publishedAreas } from "@/data/areas";
import { brands } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { activeClusters, BLOG_NAME, getAllPosts, pageCount } from "@/lib/blog";
import { allContentPages, contentPagePath } from "@/lib/content";
import { products } from "@/lib/products";
import { kyutouPhase } from "@/lib/subsidy";
import { fillTokens } from "@/lib/tokens";

/**
 * 共有画像（OGP。LINE・SNS で共有したとき・記事の構造化データの画像）に入れる文字。
 * - 画像は app/og/[...path]/route.tsx が、ビルドのときにページごとに作る（URL は lib/seo.ts の ogImagePath）。
 * - 文字は、そのページのタイトル（<title>）をそのまま使い、「｜」の前を見出し、後ろを小見出しにする。新しい言い回しは作らない。
 *   固定のページのタイトルは、各ページの metadata と同じ文にしておく（ページのタイトルを直したら、ここも直す）。
 * - 機種のページは、メーカーの製品写真をそのまま共有画像にしている（ここでは作らない）。
 * サーバー側とビルドのときだけ使う（lib/blog が fs を使うため。クライアントコンポーネントから import しない）。
 */
export type OgTone = "red" | "green" | "blue" | "purple" | "orange" | "navy";
export type OgCard = { label: string; title: string; tone: OgTone };

/** 固定のページ（タイトルは各ページの metadata と同じ） */
const FIXED: Record<string, OgCard> = {
  "/": { label: "見積もり・現地調査は無料", title: "横浜市・戸塚区の給湯器交換ならヨコジュウ｜ガス給湯器・エコキュート・ハイブリッド", tone: "red" },
  "/products": { label: "商品を探す", title: "給湯器の商品一覧｜メーカー・号数・設置方式から探す", tone: "navy" },
  "/gas-water-heater": { label: "ガス給湯器", title: "横浜市のガス給湯器の交換｜種類・号数・機能の選び方と機種", tone: "green" },
  "/eco-jozu": { label: "エコジョーズ", title: "横浜市のエコジョーズ交換｜仕組み・ドレン排水・機種", tone: "green" },
  "/ecocute": { label: "エコキュート", title: "横浜市のエコキュート交換｜設置条件・容量・補助金と機種", tone: "blue" },
  "/hybrid": { label: "ハイブリッド給湯器", title: "横浜市のハイブリッド給湯器｜ECO ONE・価格・補助金・エコキュートとの比較", tone: "purple" },
  "/ene-farm": { label: "エネファーム", title: "エネファームからの交換｜替える先の選び方と撤去の工事（横浜市）", tone: "orange" },
  "/subsidy": { label: "補助金", title: "給湯器の補助金 2026｜対象の種類・額・横浜市の制度", tone: "red" },
  "/guide": { label: "給湯器の選び方", title: "給湯器の選び方｜費用・交換時期・号数・機能・設置タイプ", tone: "blue" },
  "/trouble": { label: "故障・トラブル", title: "給湯器の故障・トラブル｜お湯が出ない・エラー・水漏れ・凍結", tone: "orange" },
  "/area": { label: "対応エリア", title: "対応エリア｜横浜市戸塚区を中心に、横浜市内の給湯器交換", tone: "red" },
  "/flow": { label: "交換の流れ", title: "給湯器交換の流れ｜ご相談から工事・お引き渡しまで", tone: "red" },
  "/faq": { label: "よくある質問", title: "給湯器交換のよくある質問｜見積もり・機種・補助金・故障", tone: "red" },
  "/company": { label: "運営会社", title: "運営会社｜株式会社 横浜総合住設（ヨコジュウ）", tone: "navy" },
  "/contact": { label: "無料見積もり", title: "給湯器の無料見積もり・ご相談（横浜市・戸塚区）", tone: "red" },
  "/contact/photo": { label: "写真でかんたん見積もり", title: "写真でかんたん見積もり｜給湯器の交換（横浜市・戸塚区）", tone: "red" },
  "/contact/thanks": { label: "無料見積もり", title: "お見積もりのご依頼を受け付けました", tone: "red" },
  "/privacy": { label: "給湯器専門サイト", title: "プライバシーポリシー", tone: "navy" },
  "/compare": { label: "機種の比較", title: "給湯器の機種を比較する", tone: "navy" },
  "/works": { label: "施工事例", title: "給湯器の施工事例｜横浜市・戸塚区", tone: "red" },
  "/blog": { label: BLOG_NAME, title: `${BLOG_NAME}｜交換時期・故障のサイン・選び方・補助金`, tone: "blue" },
};

const CLUSTER: Record<string, { label: string; tone: OgTone }> = {
  guide: { label: "給湯器の選び方", tone: "blue" },
  subsidy: { label: "補助金", tone: "red" },
  trouble: { label: "故障・トラブル", tone: "orange" },
};

/** 共有画像を作るページの一覧（パス → 文字）。機種のページは含めない */
export function ogCards(): Map<string, OgCard> {
  const map = new Map<string, OgCard>(Object.entries(FIXED));
  const ended = kyutouPhase() === "ended";
  for (const p of allContentPages()) {
    const c = CLUSTER[p.cluster];
    const title = fillTokens(p.title);
    // 補助金のページは、受付が終わったら題名の頭に【受付終了】を付ける（lib/content.ts の contentMetadata と同じ）
    map.set(contentPagePath(p), { label: c.label, title: ended && p.cluster === "subsidy" && p.title.includes("2026") ? `【受付終了】${title}` : title, tone: c.tone });
  }
  for (const a of publishedAreas) map.set(`/area/${a.slug}`, { label: "対応エリア", title: a.title, tone: "red" });
  for (const b of brands.filter((x) => products.some((p) => p.brand === x.id))) {
    const cats = b.categories.map((c) => getCategory(c).shortName).join("・");
    map.set(`/products/${b.id}`, { label: `${b.name}の給湯器`, title: `${b.name}の給湯器の交換｜${cats}の機種と型番`, tone: "navy" });
  }
  const posts = getAllPosts();
  for (const p of posts) map.set(`/blog/${p.slug}`, { label: BLOG_NAME, title: p.title, tone: "blue" });
  for (let page = 2; page <= pageCount(posts.length); page++) map.set(`/blog/page/${page}`, { label: BLOG_NAME, title: `${BLOG_NAME}（${page}ページ目）`, tone: "blue" });
  for (const { cluster, count } of activeClusters()) {
    map.set(`/blog/category/${cluster.id}`, { label: BLOG_NAME, title: `「${cluster.name}」のコラム一覧`, tone: "blue" });
    for (let page = 2; page <= pageCount(count); page++) map.set(`/blog/category/${cluster.id}/page/${page}`, { label: BLOG_NAME, title: `「${cluster.name}」のコラム一覧（${page}ページ目）`, tone: "blue" });
  }
  return map;
}
