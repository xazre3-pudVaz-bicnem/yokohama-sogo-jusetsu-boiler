import { publishedAreas } from "@/data/areas";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { kyutouShoene2026 as k } from "@/data/subsidy/programs";
import { allContentPages, contentPagePath } from "@/lib/content";
import { products } from "@/lib/products";
import { absoluteUrl, formatDateJa } from "@/lib/seo";
import { officeAddressWithPostal, primaryPhone, receptionHours, siteConfig } from "@/lib/site";
import { kyutouPhase, manYen, phaseLabel } from "@/lib/subsidy";
import { fillTokens } from "@/lib/tokens";

/**
 * /llms.txt … AI のサービス（ChatGPT・Gemini・Perplexity・Claude など）に、このサイトの概要と主なページを伝える案内（llmstxt.org の形）。
 * - 文はすべて、サイトのデータ（会社・商品・補助金・解説ページ・地域）から作る。新しい事実を書き足さない。
 * - 当社の販売価格・工事の日程・保証の年数など、サイトに載せていないことは書かない。
 * - ビルドのときに作り、1日ごとに作り直す（補助金の受付の状況が変わるため）。
 */
export const dynamic = "force-static";
export const revalidate = 86400;

const link = (label: string, path: string, note?: string) => `- [${label}](${absoluteUrl(path) ?? path})${note ? `: ${note}` : ""}`;

export function GET(): Response {
  const phone = primaryPhone();
  const hours = receptionHours();
  const makers = brands.filter((b) => products.some((p) => p.brand === b.id));
  const pages = allContentPages();
  const byCluster = (c: string) => pages.filter((p) => p.cluster === c).map((p) => link(fillTokens(p.h1), contentPagePath(p)));

  const body = [
    `# ${siteConfig.siteName}（${siteConfig.name}）`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## 会社とお見積もり",
    `- 運営：${siteConfig.name}（愛称 ${siteConfig.nickname}）。会社の紹介・給湯器以外の工事は、コーポレートサイト（${siteConfig.corporateUrl}）`,
    `- 戸塚オフィス：${officeAddressWithPostal("totsuka")}`,
    `- 本社：${officeAddressWithPostal("head")}`,
    phone ? `- 電話：${phone}${hours ? `（受付 ${hours}）` : ""}` : null,
    "- 対応エリア：横浜市戸塚区を中心に、横浜市内と周辺の地域",
    "- お見積もり・現地調査は無料。当社の工事費込みの販売価格は、機種と設置の条件を確かめてから、お見積もりでお出しする（サイトには載せていない）",
    `- 扱う給湯器：${categories.map((c) => c.name).join("・")}。メーカーは${makers.map((b) => b.name).join("・")}（${products.length}機種の型番と仕様を掲載）`,
    "",
    "## 国の補助金（給湯器）",
    `- ${k.name}（${k.ministry}）：1台あたり、エコキュート ${manYen(k.base.ecocute)}（性能加算で＋${manYen(k.performanceBonus.ecocute)}）、ハイブリッド給湯機 ${manYen(k.base.hybrid)}（性能加算で＋${manYen(k.performanceBonus.hybrid)}）、エネファーム ${manYen(k.base.enefarm)}。ガス給湯器（従来型）とエコジョーズは対象外`,
    `- いまの受付の状況：${phaseLabel(kyutouPhase())}。対象は国の対象製品リストに登録された機種だけ。予算の上限に達すると、期限の前でも受付が終わる`,
    `- ${formatDateJa(k.verifiedAt)}に公式ページ（${k.urls.top}）で確認した内容。最新の状況は公式ページで確かめること`,
    "",
    "## 給湯器の種類",
    ...categories.map((c) => link(c.name, c.path, c.summary)),
    link("エネファームからの交換", "/ene-farm"),
    "",
    "## 機種を探す",
    link("給湯器の商品一覧", "/products", "メーカー・号数・設置方式・補助金の対象で絞り込める"),
    ...makers.map((b) => link(`${b.name}の給湯器`, `/products/${b.id}`)),
    link("機種を比較する", "/compare"),
    "",
    "## 給湯器の選び方",
    ...byCluster("guide"),
    "",
    "## 補助金",
    link("給湯器の補助金（2026年）", "/subsidy"),
    ...byCluster("subsidy"),
    "",
    "## 故障・トラブル",
    ...byCluster("trouble"),
    "",
    "## 対応エリア",
    link("対応エリア", "/area"),
    ...publishedAreas.map((a) => link(`${a.shortName}の給湯器交換`, `/area/${a.slug}`)),
    "",
    "## ご相談",
    link("写真でかんたん見積もり", "/contact/photo", "型番のシールと給湯器の全体の写真を送ると、合う機種の候補と費用の目安を伝える"),
    link("無料見積もり・お問い合わせ", "/contact"),
    link("交換工事の流れ", "/flow"),
    link("よくある質問", "/faq"),
    link("運営会社", "/company"),
    "",
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  return new Response(`${body}\n`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
