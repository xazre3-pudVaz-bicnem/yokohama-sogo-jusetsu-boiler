import { publishedAreas } from "@/data/areas";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { allContentPages, contentPagePath } from "@/lib/content";
import { getBrand, productPath, products, productTagline } from "@/lib/products";
import { fillTokens } from "@/lib/tokens";

/**
 * サイト内のページの「名前」（コラムの記事の末尾の「あわせて確かめたいページ」と、自動生成の書き手に渡すリンクの一覧に使う）。
 * パスとページの対応は、各データ（種類・解説ページ・地域・メーカー・機種）から作る。固定のページだけここに書く。
 * サーバー側とスクリプトからだけ読む（商品データ全体を読み込むため）。
 */
const STATIC_LABELS: Record<string, string> = {
  "/": "ホーム",
  "/products": "給湯器の商品一覧（メーカー・種類・号数で探す）",
  "/compare": "機種の比較",
  "/hybrid": "ハイブリッド給湯器（仕組み・機種・補助金）",
  "/ene-farm": "エネファームからの交換",
  "/subsidy": "給湯器の補助金（制度の一覧）",
  "/guide": "給湯器の選び方",
  "/trouble": "給湯器の故障・トラブル",
  "/area": "対応エリア",
  "/flow": "交換工事の流れ",
  "/faq": "よくある質問",
  "/company": "運営会社",
  "/contact": "無料見積もり・お問い合わせ",
  "/contact/photo": "写真でかんたん見積もり（型番のシールと設置場所の写真を送る）",
  "/blog": "給湯器コラム",
};

function titleOf(title: string): string {
  return fillTokens(title).split("｜")[0];
}

let labels: Map<string, string> | null = null;

function allLabels(): Map<string, string> {
  if (labels) return labels;
  const map = new Map<string, string>(Object.entries(STATIC_LABELS));
  for (const c of categories) map.set(c.path, `${c.name}の交換`);
  for (const p of allContentPages()) map.set(contentPagePath(p), titleOf(p.title));
  for (const a of publishedAreas) map.set(`/area/${a.slug}`, `${a.name}の給湯器交換`);
  for (const b of brands) if (products.some((p) => p.brand === b.id)) map.set(`/products/${b.id}`, `${b.name}の給湯器（機種の一覧）`);
  for (const p of products) map.set(productPath(p), `${getBrand(p.brand).name} ${p.modelNumber}（${productTagline(p)}）`);
  labels = map;
  return map;
}

/** パスの名前。知らないパスは undefined */
export function pageLabel(path: string): string | undefined {
  return allLabels().get(path);
}

/**
 * 書き手に渡す「リンクできるページ」の一覧（Markdown）。
 * 機種のページは数が多いので、題材に関係する機種（productIds）だけを並べる。
 */
export function linkCatalog(productIds: string[] = []): string {
  const map = allLabels();
  const fixed = [...map.entries()].filter(([p]) => !p.startsWith("/products/") && p !== "/" && p !== "/compare");
  const group = (prefix: string) => fixed.filter(([p]) => p.startsWith(prefix));
  const rest = fixed.filter(([p]) => !["/guide/", "/trouble/", "/subsidy/", "/area/"].some((x) => p.startsWith(x)));
  const line = ([p, l]: [string, string]) => `- ${p} … ${l}`;
  const productLines = products.filter((p) => productIds.includes(p.id)).map((p) => line([productPath(p), map.get(productPath(p))!]));
  const brandLines = [...map.entries()].filter(([p]) => /^\/products\/[a-z]+$/.test(p)).map(line);
  return [
    "### 種類・案内のページ",
    ...rest.map(line),
    "### 選び方のページ",
    ...group("/guide/").map(line),
    "### 故障・トラブルのページ",
    ...group("/trouble/").map(line),
    "### 補助金のページ",
    ...group("/subsidy/").map(line),
    "### 地域のページ",
    ...group("/area/").map(line),
    "### メーカー別の機種の一覧",
    ...brandLines,
    ...(productLines.length ? ["### この題材に関係する機種のページ", ...productLines] : []),
  ].join("\n");
}
