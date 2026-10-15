/**
 * SEO の監査（ビルドした HTML と、ページの一覧・検索語を突き合わせる）。
 *   npm run build && npm run seo:audit
 *
 * 確かめること（基本の検査は scripts/check-site.mjs。こちらは検索語とサイトの構造）
 *   - 検索語の取り合い：ページの主な検索語（meta keywords の先頭）が、ほかのページと重なっていないか
 *   - 主な検索語の語が、title か h1 に入っているか
 *   - sitemap（lib/routes.ts）と、実際に出力されたページ・noindex が食い違っていないか
 *   - 本文の量と、本文の中のサイト内リンクの数（少なすぎるページ）
 * 結果は docs/seo-audit-report.md に書き出す。誤りが1件でもあれば終了コード 1（注意だけなら 0）。
 *
 * 本番 URL を仮に入れてビルドすると、canonical と index / noindex まで確かめられる：
 *   NEXT_PUBLIC_SITE_URL=https://www.example.jp npm run build && NEXT_PUBLIC_SITE_URL=https://www.example.jp npm run seo:audit
 */
import fs from "node:fs";
import path from "node:path";
import { sitemapRoutes } from "@/lib/routes";

const ROOT = process.cwd();
const APP = path.join(ROOT, ".next", "server", "app");
const REPORT = path.join(ROOT, "docs", "seo-audit-report.md");
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");

if (!fs.existsSync(APP)) {
  console.error("ビルドの出力がありません。先に npm run build を実行してください。");
  process.exit(1);
}

type Page = { route: string; title: string; h1: string; keywords: string[]; noindex: boolean; canonical: string; text: number; links: number };

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");
const norm = (k: string) => k.replace(/[\s　]+/g, "").toLowerCase();

function collect(dir: string, base = ""): { file: string; route: string }[] {
  const out: { file: string; route: string }[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...collect(path.join(dir, e.name), rel));
    else if (e.name.endsWith(".html")) {
      const p = rel.replace(/\.html$/, "");
      out.push({ file: path.join(dir, e.name), route: p === "index" ? "/" : `/${p.replace(/\/index$/, "")}` });
    }
  }
  return out;
}

const SKIP = new Set(["/_not-found", "/_global-error"]);
const pages: Page[] = collect(APP)
  .filter((p) => !SKIP.has(p.route))
  .map(({ file, route }) => {
    const html = fs.readFileSync(file, "utf8");
    const main = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html)?.[1] ?? "";
    const body = main.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
    const links = [...body.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)].map((m) => m[1]);
    return {
      route,
      title: decode(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? ""),
      h1: decode((/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(body)?.[1] ?? "").replace(/<[^>]+>/g, "")).replace(/\s+/g, ""),
      keywords: decode(/<meta name="keywords" content="([^"]*)"/.exec(html)?.[1] ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      noindex: /<meta name="robots" content="[^"]*noindex/.test(html),
      canonical: /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1] ?? "",
      text: decode(body.replace(/<[^>]+>/g, "")).replace(/\s+/g, "").length,
      links: new Set(links).size,
    };
  });

const errors: string[] = [];
const warnings: string[] = [];
const byRoute = new Map(pages.map((p) => [p.route, p]));

/* 検索語の取り合い */
const owners = new Map<string, string[]>();
for (const p of pages) {
  if (p.noindex && SITE_URL) continue;
  const k = p.keywords[0];
  if (!k) continue;
  owners.set(norm(k), [...(owners.get(norm(k)) ?? []), p.route]);
}
for (const [k, routes] of owners) if (routes.length > 1) errors.push(`検索語の取り合い「${k}」：${routes.join("・")}`);
for (const p of pages) {
  for (const k of p.keywords.slice(1)) {
    const o = owners.get(norm(k));
    if (o && !o.includes(p.route)) warnings.push(`${p.route} … 副の検索語「${k}」が、${o.join("・")} の主な検索語と同じ`);
  }
  const k = p.keywords[0];
  if (k && !(p.noindex && SITE_URL)) {
    const missing = k.split(/[\s　]+/).filter((w) => w && !p.title.includes(w) && !p.h1.includes(w));
    if (missing.length) warnings.push(`${p.route} … 主な検索語「${k}」のうち「${missing.join("・")}」が title にも h1 にも無い`);
  }
}

/* sitemap とページの食い違い */
const inSitemap = new Set(sitemapRoutes().map((r) => r.path));
for (const route of inSitemap) {
  const p = byRoute.get(route);
  if (!p) errors.push(`sitemap にあるのに、ページが出力されていない：${route}`);
  else if (SITE_URL && p.noindex) errors.push(`sitemap にあるのに noindex：${route}`);
}
for (const p of pages) {
  if (SITE_URL && !p.noindex && !inSitemap.has(p.route)) warnings.push(`index できるのに sitemap に無い：${p.route}`);
  if (SITE_URL && !p.noindex && p.canonical && p.canonical !== `${SITE_URL}${p.route === "/" ? "" : p.route}`) errors.push(`${p.route} … canonical が自分の URL ではない（${p.canonical}）`);
}

/* 本文の量とリンク */
const UTILITY = /^\/(contact|compare|privacy|works)(\/|$)/;
for (const p of pages) {
  if (p.noindex || UTILITY.test(p.route)) continue;
  if (p.text < 600) warnings.push(`${p.route} … 本文が短い（${p.text}字）`);
  if (p.links < 3) warnings.push(`${p.route} … 本文の中のサイト内リンクが少ない（${p.links}件）`);
}

/* 報告 */
const rows = [...pages]
  .sort((a, b) => a.route.localeCompare(b.route))
  .map((p) => `| ${p.route} | ${p.keywords[0] ?? "—"} | ${p.title.replace(/\|/g, "｜")} | ${p.text} | ${p.links} | ${p.noindex ? "noindex" : ""} |`);
const report = [
  "# SEO 監査の結果",
  "",
  `- 実行：${new Date().toISOString()}（${SITE_URL ? `本番 URL ${SITE_URL} でビルド` : "本番 URL 未設定のビルド（canonical と noindex は確かめていない）"}）`,
  `- ページ数：${pages.length}（sitemap ${inSitemap.size}）`,
  `- 誤り：${errors.length}件／注意：${warnings.length}件`,
  "",
  "## 誤り",
  "",
  ...(errors.length ? errors.map((e) => `- ${e}`) : ["- なし"]),
  "",
  "## 注意",
  "",
  ...(warnings.length ? warnings.map((w) => `- ${w}`) : ["- なし"]),
  "",
  "## ページの一覧",
  "",
  "| ページ | 主な検索語 | title | 本文の字数 | 本文のリンク | |",
  "| --- | --- | --- | ---: | ---: | --- |",
  ...rows,
  "",
].join("\n");
fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log(`ページ ${pages.length}件・誤り ${errors.length}件・注意 ${warnings.length}件（docs/seo-audit-report.md）`);
for (const e of errors) console.log(`  誤り：${e}`);
for (const w of warnings.slice(0, 40)) console.log(`  注意：${w}`);
if (warnings.length > 40) console.log(`  …ほか ${warnings.length - 40}件`);
process.exitCode = errors.length ? 1 : 0;
