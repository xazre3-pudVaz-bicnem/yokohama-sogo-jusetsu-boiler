/**
 * 事実シート（docs/VERIFIED_FACTS.md）の「自動生成」の部分を、いまのデータから作り直す。
 *   npm run blog:facts
 *
 * 作り直す節：会社（lib/site.ts）・給湯省エネ2026事業ほかの補助の制度（data/subsidy/programs.ts）・
 * 横浜市の区の住まい（data/areas.ts）・掲載機種（data/products）。
 * programs.ts や商品データを直したら、これを実行してから npm run blog:selftest を通す。
 * 手で書く節（目印より上）は変えない。
 *
 *   --check … 書き換えずに、作り直しが要るかだけを確かめる（要るなら終了コード 1）
 */
import fs from "node:fs";
import { FACTS_PATH, loadFactSheet } from "@/lib/blog-generator/facts";
import { extractGeneratedBlock, generatedFacts, replaceGeneratedBlock } from "@/lib/blog-generator/facts-source";

const raw = fs.readFileSync(FACTS_PATH, "utf8");
const next = generatedFacts();
const current = extractGeneratedBlock(raw);

if (process.argv.includes("--check")) {
  if (current === next) {
    console.log("事実シートの自動生成の部分は、いまのデータと同じです。");
    process.exit(0);
  }
  console.error("事実シートの自動生成の部分が、いまのデータと違います。npm run blog:facts を実行してください。");
  process.exit(1);
}

if (current === next) {
  console.log("事実シートの自動生成の部分は、いまのデータと同じです（書き換えません）。");
} else {
  fs.writeFileSync(FACTS_PATH, replaceGeneratedBlock(raw, next), "utf8");
  console.log("事実シートの自動生成の部分を作り直しました：docs/VERIFIED_FACTS.md");
}
const sheet = loadFactSheet();
console.log(`節 ${sheet.sections.length}・数値 ${sheet.tokens.size}種・出典 ${sheet.sourceUrls.size}件`);
