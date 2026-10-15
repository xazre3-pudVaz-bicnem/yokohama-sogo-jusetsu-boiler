/**
 * 給湯器コラムを1本、自動で書いて content/blog/ に保存する（新しい記事を書くか、公開済みの記事を1本見直すか、のどちらか）。
 *   npm run blog:generate          … 生成して保存（ANTHROPIC_API_KEY が必要）
 *   npm run blog:dry-run           … 生成と検査だけ（保存しない）
 *   DRY_RUN_FIXTURE=scripts/fixtures/blog-good.json npm run blog:dry-run … API を呼ばずに、検査の仕組みだけを確かめる
 *   TOPIC=<slug> npm run blog:generate … 題材を指定して、新しい記事を書く
 *   BLOG_MODE=refresh npm run blog:generate … 公開済みの記事の見直しに固定する（REFRESH=<slug> で記事を指定できる）
 *
 * 終了コード
 *   0 … 公開した／試し書きが合格した／今日は書くものが無い（今日はもう公開した・見直す理由が無い）
 *   1 … 基準を満たさなかったので公開しなかった（重複・事実シートに無い数値・型番・読み直しの指摘など）
 *       人の対応が要る（題材が尽きた・指定した題材の公式情報を確かめられない・事実シートの節が無い）
 *       設定の誤りや通信の失敗など、仕組みの問題
 * 1 で終わったときは、GitHub Actions の実行結果の画面（Summary）に、理由と試行の記録が出る。記事は push されない。
 */
import fs from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { generatePost, REVIEW_MODEL, WRITER_MODEL } from "@/lib/blog-generator/generate";

function summary(lines: string[]) {
  const text = lines.join("\n");
  console.log(`\n${text}`);
  // GitHub Actions の実行結果の画面に要約を出す
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`);
}

function output(key: string, value: string) {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value.replace(/\r?\n/g, " ")}\n`);
}

/** 試行の記録（折りたたみ）。長すぎると Summary に載らないので、後ろを切る */
function logBlock(log: string[]): string[] {
  const text = log.join("\n");
  const cut = text.length > 60000 ? `${text.slice(0, 60000)}\n…（長いため省略。全体はジョブのログにあります）` : text;
  return ["", "<details><summary>試行の記録</summary>", "", "```", cut, "```", "", "</details>"];
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN && !process.env.DRY_RUN_FIXTURE) {
    console.error("ANTHROPIC_API_KEY が設定されていません。GitHub のリポジトリの Secrets に登録してください。API を呼ばずに仕組みを確かめるときは DRY_RUN_FIXTURE を指定します。");
    process.exit(1);
  }

  const result = await generatePost();
  const cost = "cost" in result ? `約 ${result.cost.toFixed(3)} USD` : "0";
  output("status", result.status);

  if (result.status === "published" || result.status === "dry-run") {
    const what = result.mode === "refresh" ? "コラムを見直しました" : "コラムを公開しました";
    summary([
      result.status === "published" ? `### ${what}（検査に合格。このあとビルドと点検に通れば push します）` : "### 試し書き（検査に合格。保存していません）",
      `- 種類：${result.mode === "refresh" ? "公開済みの記事の見直し" : "新しい記事"}`,
      `- 題名：${result.draft.title}`,
      `- URL：/blog/${result.draft.slug}`,
      `- カテゴリ：${result.draft.category}`,
      `- 主キーワード：${result.draft.keywords[0]}`,
      ...(result.live ? [`- ${result.live}を確かめて書きました`] : []),
      `- 書き直しを含む試行：${result.attempts}回`,
      process.env.DRY_RUN_FIXTURE ? `- 原稿：確認用の原稿（${process.env.DRY_RUN_FIXTURE}。API は呼んでいません）` : `- モデル：書く ${WRITER_MODEL}／読み直す ${REVIEW_MODEL}`,
      `- API の費用の目安：${cost}`,
      ...logBlock(result.log),
    ]);
    output("published", result.status === "published" ? "true" : "false");
    output("title", result.draft.title);
    output("slug", result.draft.slug);
    // コミットの文言に使う（追加／更新）
    output("action", result.mode === "refresh" ? "更新" : "追加");
    return;
  }

  if (result.status === "skipped") {
    summary(["### 今日は書きませんでした（正常）", `- 理由：${result.reason}`]);
    output("published", "false");
    return;
  }

  if (result.status === "blocked") {
    summary(["### 記事を書けませんでした（対応が必要です）", `- 理由：${result.reason}`, ...logBlock(result.log)]);
    output("published", "false");
    process.exit(1);
  }

  summary([
    "### 基準を満たさなかったため、公開しませんでした",
    `- 種類：${result.mode === "refresh" ? "公開済みの記事の見直し" : "新しい記事"}`,
    `- 記事：${result.slug}`,
    `- 理由：${result.reason}`,
    "- 最後の試行で残った指摘：",
    ...result.problems.slice(0, 20).map((p) => `  - ${p}`),
    `- 試行：${result.attempts}回`,
    `- API の費用の目安：${cost}`,
    ...logBlock(result.log),
  ]);
  output("published", "false");
  process.exit(1);
}

main().catch((e) => {
  const lines = ["### 記事の生成が、エラーで止まりました（公開していません）"];
  if (e instanceof Anthropic.AuthenticationError) lines.push("- API キーが正しくありません（ANTHROPIC_API_KEY を確認してください）。");
  else if (e instanceof Anthropic.PermissionDeniedError) lines.push("- この API キーでは、指定したモデルを使えません（ANTHROPIC_MODEL を確認してください）。");
  else if (e instanceof Anthropic.NotFoundError) lines.push(`- モデルが見つかりません（ANTHROPIC_MODEL・ANTHROPIC_REVIEW_MODEL を確認してください）：${e.message}`);
  else if (e instanceof Anthropic.BadRequestError) lines.push(`- API に送った内容が受け付けられませんでした：${e.message}`);
  else if (e instanceof Anthropic.RateLimitError) lines.push("- API の利用上限に達しました。時間をおいて、もう一度実行してください。");
  else if (e instanceof Anthropic.APIConnectionError) lines.push("- API に接続できませんでした。");
  else if (e instanceof Anthropic.APIError) lines.push(`- API のエラー（${e.status}）：${e.message}`);
  else lines.push(`- ${e instanceof Error ? (e.stack ?? e.message) : String(e)}`);
  summary(lines);
  process.exit(1);
});
