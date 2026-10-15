/**
 * 公開済みのコラム（content/blog/*.md）を、自動生成のときと同じ検査（lib/blog-generator/validate.ts）にかける。
 *   npm run blog:audit                    … 全記事。1本でも不合格なら終了コード 1
 *   npm run blog:audit -- --strict <slug> … その記事が不合格なら終了コード 1。ほかの記事の不合格は、一覧に出すだけ
 *
 * - 手書きの記事も、自動生成の記事も、同じ基準で確かめる（自動生成の記事は、題材で決めた節の数値だけを通す）。
 * - GitHub Actions は --strict で、その回に書いた・見直した記事を確かめる（通らなければ push しない）。
 *   ほかの記事の不合格（事実シートを直したあとに、古い数値が残った記事など）で、毎日の投稿を止めないため。
 *   不合格の記事は、見直しの日に優先して直す（generate.ts の pickRefreshTarget）。
 * - 検査の規則を変えたら、まずこれを実行して、良い記事が誤って落ちないかを確かめること。
 */
import fs from "node:fs";
import { getAllPosts } from "@/lib/blog";
import { auditPost } from "@/lib/blog-generator/audit";
import { loadFactSheet } from "@/lib/blog-generator/facts";

const strictAt = process.argv.indexOf("--strict");
const strict = strictAt >= 0 ? process.argv[strictAt + 1] : undefined;
if (strictAt >= 0 && !strict) {
  console.error("--strict のあとに、記事の slug を書いてください");
  process.exit(1);
}

const sheet = loadFactSheet();
const posts = getAllPosts();
const failedSlugs: string[] = [];

console.log(`事実シート：${sheet.sections.length}節・数値 ${sheet.tokens.size}種・出典 ${sheet.sourceUrls.size}件`);
console.log(`記事：${posts.length}本${strict ? `（${strict} を必ず通す記事として確かめる）` : ""}\n`);

for (const post of posts) {
  const result = auditPost(post, posts, sheet);
  const mark = result.ok ? "合格" : "不合格";
  console.log(`${mark}  ${post.slug}（${result.length}字・${post.generated ? "自動" : "手書き"}${post.liveCheckedAt ? `・${post.liveCheckedAt}の公式情報つき` : ""}）`);
  for (const e of result.errors) console.log(`    × ${e}`);
  for (const w of result.warnings) console.log(`    △ ${w}`);
  if (!result.ok) failedSlugs.push(post.slug);
}

console.log(`\n${posts.length - failedSlugs.length}本が合格、${failedSlugs.length}本が不合格`);

function summary(lines: string[]) {
  const file = process.env.GITHUB_STEP_SUMMARY;
  if (file) fs.appendFileSync(file, `${lines.join("\n")}\n`);
}

if (strict) {
  if (!posts.some((p) => p.slug === strict)) {
    console.error(`記事 ${strict} が見つかりません（content/blog/${strict}.md）`);
    process.exit(1);
  }
  const others = failedSlugs.filter((s) => s !== strict);
  if (others.length) {
    console.log(`\n見直しが必要な記事（今回の記事とは別。見直しの日に優先して直します）：${others.join("、")}`);
    summary(["", `#### 点検で不合格の公開済みの記事（${others.length}本。今回の公開は止めません）`, ...others.map((s) => `- /blog/${s}`)]);
  }
  process.exit(failedSlugs.includes(strict) ? 1 : 0);
}
process.exit(failedSlugs.length ? 1 : 0);
