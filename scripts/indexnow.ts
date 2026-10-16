/**
 * IndexNow で、検索エンジン（Bing・Yandex・Naver など。Google は対象外）に、ページの追加や更新を知らせる。
 * Bing の検索結果は ChatGPT の検索などでも使われるので、新しいページが早く見つかるようにする。
 *
 *   npm run indexnow               … sitemap.xml に載せている全ページを送る
 *   npm run indexnow -- /blog/xxx  … 指定したパスだけを送る（コラムの記事を足したときなど）
 *
 * - 本番のデプロイが終わってから実行する（まだ無いページを知らせないため）。
 * - 鍵は public/<鍵>.txt に置いてある（公開してよい値。秘密の情報ではない）。鍵を変えるときは、ファイル名と中身と下の KEY をそろえる。
 * - 本番 URL（NEXT_PUBLIC_SITE_URL か lib/site.ts の productionUrl）が無いときは、何もしない。
 */
import { sitemapRoutes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

const KEY = "c7773c9e68af99c2e47800eba13038a9";

async function main() {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || siteConfig.productionUrl).replace(/\/+$/, "");
  if (!site) {
    console.log("本番 URL が未設定なので、送りません。");
    return;
  }
  const args = process.argv.slice(2).filter((a) => a.startsWith("/"));
  const paths = args.length ? args : sitemapRoutes().map((r) => r.path);
  const urlList = [...new Set(paths)].map((p) => (p === "/" ? site : `${site}${p}`));
  const host = new URL(site).host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList }),
  });
  // 200・202 は受け付け。403 は鍵のファイルが見えない、422 は URL がこのサイトのものではない、429 は送りすぎ
  console.log(`IndexNow：${urlList.length} 件を送りました → ${res.status} ${res.statusText}`);
  if (res.status >= 400) {
    console.log(await res.text());
    process.exitCode = 1;
  }
}

void main();
