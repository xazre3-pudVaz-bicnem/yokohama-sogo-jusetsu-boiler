/**
 * 給湯器コラムの検査（品質ゲート）と題材・事実シートが、意図どおりになっているかを確かめる。API は呼ばない。ネットにもつながない。
 *   npm run blog:selftest
 *
 * 確かめること
 *   1. カテゴリ（20のジャンル）と親ページ
 *   2. 事実シート：自動生成の部分が、いまのデータ（programs.ts・lib/site.ts・data/areas.ts・data/products）と同じか。
 *      ファイルの大きさ（60KB 未満）・節の id・いつも渡す節・機種ごとの詳細の節
 *   3. 良い原稿（scripts/fixtures/blog-good.json）が合格する
 *   4. 悪い原稿（scripts/fixtures/blog-bad.json）が、狙った理由で不合格になる
 *   5. 数値・型番の取り出し
 *   6. 重複と検索語の取り合いの判定
 *   7. 題材の定義（20ジャンルを3本以上ずつ・固定ページと検索語が重ならない・使う節と機種とページがある・
 *      書き手に渡す事実シートが題材ごとに小さい・使われない節が無い）
 *   8. 題材の選び方（同じ状態なら同じ題材・優先度・季節・重複を避ける）
 *   9. その日の公式情報の確認（live）：読み取り・古い値・失敗のときの扱い（にせのページで確かめる）
 *  10. 見直し（リライト）：理由のあるときだけ行い、日付だけの更新にならない
 *  11. API の呼び出しの設定（既定のモデル・代替モデルの使い分け・料金の目安）と、毎日の実行の設定
 * 検査の規則（lib/blog-generator/validate.ts）や事実シート・題材を変えたら、これと npm run blog:audit を実行する。
 * 毎日の自動投稿は、記事を書く前にこれを実行し、1つでも失敗すれば書かずに止まる。
 */
import fs from "node:fs";
import path from "node:path";
import { publishedAreas } from "@/data/areas";
import { getAllPosts, type Post } from "@/lib/blog";
import { blogClusters, getCluster } from "@/lib/blog-clusters";
import { linkCatalog } from "@/lib/blog-links";
import { CORE_SECTION_IDS, FACTS_MAX_BYTES, FACTS_PATH, loadFactSheet, numericTokens, scopeIds, sectionsFor, sheetText, unknownNumericTokens, withLiveSections } from "@/lib/blog-generator/facts";
import { extractGeneratedBlock, generatedFacts, productListId, productSectionId } from "@/lib/blog-generator/facts-source";
import {
  ArticleSchema,
  DEFAULT_MODEL,
  FALLBACK_MODELS,
  bodyChanged,
  dayFraction,
  decideMode,
  estimateCost,
  pickRefreshTarget,
  pickTopic,
  rankTopics,
  refreshReasons,
  scopeForPost,
  scopeForTopic,
  toDraft,
  toMarkdown,
  toRefreshedDraft,
  topicBlocker,
} from "@/lib/blog-generator/generate";
import { fixedKeywordList, fixedKeywordOwner, normalizeKeyword, sameKeyword } from "@/lib/blog-generator/keywords";
import { fetchLive, parseBudgetGraph, pageHasModel, type Fetcher } from "@/lib/blog-generator/live";
import { allowedModelTokens, modelTokens, unknownModelTokens } from "@/lib/blog-generator/model-numbers";
import { diceBigram, shingleOverlap } from "@/lib/blog-generator/similarity";
import { getTopic, topics } from "@/lib/blog-generator/topics";
import { validateArticle, type ArticleDraft } from "@/lib/blog-generator/validate";
import { productPath, products } from "@/lib/products";
import { knownPaths } from "@/lib/routes";

let failed = 0;
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "  ○" : "  ×"} ${name}${!ok && detail ? `\n      ${detail.slice(0, 1500)}` : ""}`);
  if (!ok) failed += 1;
}

const sheet = loadFactSheet();
const existing = getAllPosts();
const paths = knownPaths();
const TODAY = "2026-10-14";
const readFixture = (name: string) => JSON.parse(fs.readFileSync(path.join(process.cwd(), "scripts", "fixtures", name), "utf8")) as Record<string, unknown>;

/** 記事のデータ（Post）を、原稿から作る（試験用） */
function asPost(d: ArticleDraft): Post {
  const cluster = getCluster(d.category)!;
  return { ...d, cluster, cover: { type: "figure", kind: "wall" }, length: d.body.length, headings: [] };
}

async function main() {
/* ------------------------------------------------------------------ */
console.log("1. カテゴリ（ジャンル）");
{
  const genres = blogClusters.map((c) => c.genre).sort((a, b) => a - b);
  check("ジャンルは1〜20の20個で、重なりが無い", genres.length === 20 && genres.every((g, i) => g === i + 1), genres.join(","));
  const ids = new Set(blogClusters.map((c) => c.id));
  check("カテゴリの id に重なりが無い", ids.size === blogClusters.length);
  const badPillar = blogClusters.filter((c) => !paths.has(c.pillar.href)).map((c) => `${c.id} → ${c.pillar.href}`);
  check("親ページが、すべて実在するページ", badPillar.length === 0, badPillar.join(" / "));
  const nameOwned = blogClusters.filter((c) => fixedKeywordOwner(`${c.name} コラム`)).map((c) => c.name);
  check("カテゴリのページの検索語（名前＋コラム）が、固定ページと重ならない", nameOwned.length === 0, nameOwned.join(" / "));
  const catalog = [...linkCatalog(products.map((p) => p.id)).matchAll(/^- (\/\S*) … /gm)].map((m) => m[1]);
  const badCatalog = catalog.filter((p) => !paths.has(p));
  check(`書き手に渡すリンクの一覧（${catalog.length}件）が、すべて実在するページ`, badCatalog.length === 0, badCatalog.join(" / "));
}

/* ------------------------------------------------------------------ */
console.log("2. 事実シート");
{
  const raw = fs.readFileSync(FACTS_PATH, "utf8");
  const block = extractGeneratedBlock(raw);
  check("自動生成の目印が1組だけある", block !== null);
  check("自動生成の部分が、いまのデータ（programs.ts・site.ts・areas.ts・products）と同じ（違えば npm run blog:facts）", block === generatedFacts());
  const noDate = sheet.sections.filter((s) => !/^\d{4}-\d{2}-\d{2}$/.test(s.checkedAt)).map((s) => s.title);
  check(`どの節にも確認日がある（${sheet.sections.length}節）`, noDate.length === 0, noDate.join(" / "));
  const badUrl = [...sheet.sourceUrls].filter((u) => !/^https:\/\//.test(u));
  check(`出典の URL がすべて https（${sheet.sourceUrls.size}件）`, badUrl.length === 0, badUrl.join(" / "));
  const bytes = Buffer.byteLength(raw, "utf8");
  check(`ファイルが ${FACTS_MAX_BYTES.toLocaleString()} バイト未満（いまは ${bytes.toLocaleString()} バイト。機種の仕様は生成時に作る節へ）`, bytes < FACTS_MAX_BYTES);
  const titles = sheet.sections.map((s) => s.title);
  check("節の名前に重なりが無い", new Set(titles).size === titles.length, titles.filter((t, i) => titles.indexOf(t) !== i).join(" / "));
  const noId = sheet.sections.filter((s) => !s.id).map((s) => s.title);
  check("どの節にも id がある", noId.length === 0, noId.join(" / "));
  const ids = sheet.sections.map((s) => s.id);
  check("節の id に重なりが無い", new Set(ids).size === ids.length, ids.filter((t, i) => ids.indexOf(t) !== i).join(" / "));
  check(`いつも渡す節（${CORE_SECTION_IDS.join("・")}）がある`, CORE_SECTION_IDS.every((id) => sectionsFor(sheet, [id]).length === 1), CORE_SECTION_IDS.filter((id) => !sectionsFor(sheet, [id]).length).join("、"));
  check("当社の交換工事の進め方（flow）の節がある", sectionsFor(sheet, ["flow"]).length === 1);
  const company = sectionsFor(sheet, ["company"])[0]?.body ?? "";
  check("会社の節に、登録事業者かどうかの扱いが書かれている", /登録事業者/.test(company));
  const core = sectionsFor(sheet, ["subsidy-core"])[0]?.body ?? "";
  check("いつも渡す補助金の要点に、金額と期限がある", /7万円/.test(core) && /12月31日/.test(core), core.slice(0, 300));
  const baseNums = sectionsFor(sheet, ["company", "basics", "rules"]).flatMap((s) => [...s.tokens]).filter((t) => !/^\d{4}年$|月\d+日$/.test(t));
  check("会社・基本の知識・書かないことの節に、話題を選ばずに使える数値を置いていない（確認日を除く）", baseNums.length === 0, baseNums.join("、"));
  const noList = (["gas", "eco-jozu", "ecocute", "hybrid"] as const).filter((c) => !sectionsFor(sheet, [productListId(c)]).length);
  check("種類ごとの掲載機種の一覧の節がある", noList.length === 0, noList.join("、"));
  const noDetail = products.filter((p) => sectionsFor(sheet, [productSectionId(p)]).length !== 1).map((p) => p.id);
  check(`機種ごとの詳細の節（生成時に作る）が、掲載機種 ${products.length} 機種ぶんある`, noDetail.length === 0, noDetail.join("、"));
  const modelsInSheet = unknownModelTokens(sheet.raw);
  check("事実シートに、掲載機種に無い型番が書かれていない", modelsInSheet.length === 0, modelsInSheet.join("、"));
  const modelsInRuntime = unknownModelTokens(sheet.sections.filter((s) => s.id.startsWith("product:")).map((s) => s.body).join("\n"));
  check("機種の詳細の節にも、掲載機種に無い型番が無い", modelsInRuntime.length === 0, modelsInRuntime.join("、"));
}

/* ------------------------------------------------------------------ */
console.log("3. 良い原稿");
const goodRaw = readFixture("blog-good.json");
const goodTopic = getTopic(String(goodRaw.$topic))!;
const good = toDraft(ArticleSchema.parse(goodRaw), goodTopic, sheet, TODAY);
const goodCtx = { sheet, existing: [], factSections: scopeForTopic(goodTopic), topic: { pages: goodTopic.pages, products: goodTopic.products, length: goodTopic.length } };
{
  check("確認用の原稿の題材がある", !!goodTopic, String(goodRaw.$topic));
  const r = validateArticle(good, goodCtx);
  check(`合格する（${r.length}字）`, r.ok, r.errors.join(" / "));
  if (r.warnings.length) console.log(`      注意：${r.warnings.join(" / ")}`);
  const emptyHead = validateArticle({ ...good, body: `${good.body}\n\n| | 追いだきなし | 追いだきあり |\n| --- | --- | --- |\n| 配管 | 給湯だけ | ふろ配管が加わる |\n` }, goodCtx);
  check("表の見出しの空のセルを見つける", emptyHead.errors.some((e) => e.includes("表の見出しの行")), emptyHead.errors.join(" / "));
  const namedHead = validateArticle({ ...good, body: `${good.body}\n\n| 比べる点 | 追いだきなし | 追いだきあり |\n| --- | --- | --- |\n| 配管 | 給湯だけ | ふろ配管が加わる |\n` }, goodCtx);
  check("見出しに名前のある表は通す", !namedHead.errors.some((e) => e.includes("表の見出しの行")), namedHead.errors.join(" / "));
  const md = toMarkdown(good);
  check("保存の形式に、値の無い項目を書き出さない", !/: undefined|: null\n/.test(md));
  check("保存の形式に、公開日・更新日・自動生成の印がある", md.includes(`publishedAt: '${TODAY}'`) && md.includes(`updatedAt: '${TODAY}'`) && md.includes("generated: true"), md.slice(0, 600));
  check("出典に、名前と確認日が付く", good.sources.every((s) => s.title.length > 2 && s.checkedAt === "2026-10-14"), JSON.stringify(good.sources));
  // 主キーワードを固定ページの語に替えると不合格
  const owned = validateArticle({ ...good, keywords: ["給湯器 エラーコード", ...good.keywords.slice(1)] }, goodCtx);
  check("主キーワードが固定ページの検索語と同じだと不合格", owned.errors.some((e) => e.includes("固定ページ") && e.includes("/trouble/error-codes")), owned.errors.join(" / "));
  // 関連するページへのリンクを消すと不合格
  const noPages = validateArticle({ ...good, body: good.body.replace(/\]\(\/trouble\/(freeze|error-codes)\)/g, "](/trouble)").replace(/\]\(\/guide\/auto-fullauto\)/g, "](/trouble)") }, goodCtx);
  check("関連するページへのリンクが無いと不合格", noPages.errors.some((e) => e.includes("関連するページ")), noPages.errors.join(" / "));
  // 機種を挙げた題材で、機種のページへのリンクが無いと不合格
  const withProducts = validateArticle(good, { ...goodCtx, topic: { ...goodCtx.topic, products: ["rinnai-ruf-e240esaw"] } });
  check("関係する機種のページへのリンクが無いと不合格", withProducts.errors.some((e) => e.includes("機種のページ")), withProducts.errors.join(" / "));
  // 同じ本文の記事がすでにあると不合格（8文字の並びの重なり）
  const dup = validateArticle({ ...good, slug: "another-slug-for-test" }, { ...goodCtx, existing: [asPost(good)] });
  check("同じ本文の記事があると不合格", dup.errors.some((e) => e.includes("本文が既存の記事")), dup.errors.join(" / "));
  check("同じ主キーワード・近い題名も見つける", dup.errors.some((e) => e.includes("主キーワード")) && dup.errors.some((e) => e.includes("題名が既存")), dup.errors.join(" / "));
  // 地名の入れすぎ
  const stuffed = validateArticle({ ...good, body: `${good.body}\n\n横浜市の横浜で、横浜の給湯器を横浜の方へ。横浜の住まいと横浜の暮らし。` }, goodCtx);
  check("地名の入れすぎを見つける", stuffed.errors.some((e) => e.includes("「横浜」が")), stuffed.errors.join(" / "));
  check("社名の中の「横浜」は数えない", !validateArticle({ ...good, body: `${good.body}\n\n横浜総合住設では、型番の写真から機種の候補をお伝えします。横浜総合住設のお見積もりは無料です。株式会社 横浜総合住設の戸塚オフィスからうかがいます。` }, goodCtx).errors.some((e) => e.includes("「横浜」が")));
  // その日に確かめた情報（live）の記事は、確認日と出典が要る
  const liveSheet = withLiveSections(sheet, "## 本日確認した公式情報：テスト\nid: live-kyutou-budget\n確認日: 2026-10-14\n出典: https://kyutou-shoene2026.meti.go.jp/graph/\n- 予算に対する申請額の割合は50%（2026年10月13日0時時点）");
  const liveMissing = validateArticle({ ...good, liveCheckedAt: TODAY }, { ...goodCtx, sheet: liveSheet, factSections: [...scopeForTopic(goodTopic), "live-kyutou-budget"], live: { checkedAt: "2026-10-14", sources: ["https://kyutou-shoene2026.meti.go.jp/graph/"] } });
  check("その日の公式情報を使う記事で、確かめたページが出典に無いと不合格", liveMissing.errors.some((e) => e.includes("本日確かめた公式ページ")), liveMissing.errors.join(" / "));
}

/* ------------------------------------------------------------------ */
console.log("4. 悪い原稿");
{
  const badRaw = readFixture("blog-bad.json");
  const badTopic = getTopic(String(badRaw.$topic))!;
  const bad = toDraft(ArticleSchema.parse(badRaw), badTopic, sheet, TODAY);
  const r = validateArticle(bad, { sheet, existing: [], factSections: scopeForTopic(badTopic), topic: { pages: badTopic.pages, products: badTopic.products } });
  const has = (word: string) => r.errors.some((e) => e.includes(word));
  const numeric = r.errors.find((e) => e.includes("どこにも無い数値")) ?? "";
  const outOfScope = r.errors.find((e) => e.includes("この題材に渡した節に無い数値")) ?? "";
  check("不合格になる", !r.ok);
  const expect: [string, string][] = [
    ["決まり文句（徹底解説）", "徹底解説"],
    ["決まり文句（いかがでしたか）", "いかがでした"],
    ["記事そのものに触れる前置き", "この記事では"],
    ["「〜していきましょう」", "していきましょう"],
    ["順位・人気の表現（No.1）", "順位・人気"],
    ["口コミ・評判", "口コミ"],
    ["施工の件数", "件数・実績"],
    ["当社の施工事例・お客様とのやりとり", "施工事例"],
    ["創業年・保証の年数", "保証の年数"],
    ["資格の名称", "資格"],
    ["対応の速さの約束", "速さ"],
    ["費用の相場", "相場"],
    ["補助額を差し引いた金額", "差し引いた"],
    ["補助金の約束", "約束"],
    ["登録事業者だという書き方", "登録事業者であるとは書かない"],
    ["掲載機種に無い型番", "商品データに無い型番"],
    ["地名の入れすぎ", "「横浜」が"],
    ["題名の地名の重ね", "題名に地名"],
    ["です・ます調でない文", "です・ます"],
    ["h1 の見出し", "h1"],
    ["内容を表さない見出し（まとめ）", "まとめ"],
    ["存在しないページへのリンク", "存在しないページ"],
    ["「こちら」というリンクの文言", "リンクの文言"],
    ["本文の外部リンク", "外部のリンク"],
    ["親ページへのリンクが無い", "親ページ"],
    ["関連するページへのリンクが無い", "関連するページ"],
    ["出典が事実シートに無い", "sources の URL"],
    ["存在しない関連記事", "relatedArticles"],
    ["絵文字", "絵文字"],
    ["重ねた記号（！！）", "記号の飾り"],
    ["本文が短い", "短すぎます"],
    ["見出しが少ない", "見出しが"],
  ];
  for (const [label, word] of expect) check(`${label}を見つける`, has(word), r.errors.join(" / "));
  check("事実シートのどこにも無い数値を見つける", numeric !== "", r.errors.join(" / "));
  check("15万円・15年・98%・5000件 を数値として拾う", ["15万円", "15年", "98%", "5000件"].every((t) => numeric.includes(t)), numeric);
  // 「17.1L」は号数の節にある数字。故障（追いだき）の題材にはその節を渡さないので、通さない（1段目は通り、2段目で止まる）
  check("別の節の数値（17.1L）を、渡していない話題に持ち込むと見つける", outOfScope.includes("17.1L") && !numeric.includes("17.1L"), `${outOfScope} / ${numeric}`);
  const wholeErrors = validateArticle(bad, { sheet, existing: [] }).errors;
  const whole = wholeErrors.find((e) => e.includes("どこにも無い数値")) ?? "";
  check("節を絞らない検査（手書きの記事の点検）は、事実シート全体とだけ突き合わせる", !whole.includes("17.1L") && !wholeErrors.some((e) => e.includes("この題材に渡した節")), whole);
  console.log(`      （不合格の理由 ${r.errors.length} 件）`);
}

/* ------------------------------------------------------------------ */
console.log("5. 数値・型番の取り出し");
{
  const toks = numericTokens("補助額は７万円／台、割合は48％、期限は2026年12月31日。タンクは約400kg〜600kg、370L、24号、3つの理由と2回の点検。");
  check("全角の数字と単位を半角にそろえる", toks.includes("7万円") && toks.includes("48%"), toks.join(","));
  check("日付を拾う", toks.includes("2026年") && toks.includes("12月31日"), toks.join(","));
  check("範囲の両端・容量・号数を拾う", ["400kg", "600kg", "370L", "24号"].every((t) => toks.includes(t)), toks.join(","));
  check("数え方（3つ・2回）は拾わない", !toks.some((t) => /つ|回/.test(t)), toks.join(","));
  check("型番の中の数字は数値として拾わない（RUX-E2016W(A) の 2016W）", !numericTokens("RUX-E2016W(A) は20号の給湯専用").some((t) => t.startsWith("2016")));
  check("事実シートにある数値は通す", unknownNumericTokens("エコキュートは基本額7万円／台、ハイブリッド給湯機は10万円／台。", sheet).length === 0);
  check("事実シートに無い数値は通さない", unknownNumericTokens("補助額は25万円です。", sheet).join() === "25万円");
  const narrowed = unknownNumericTokens("標準使用期間は10年。冬は毎分17.1L。", sheet, ["lifespan"]);
  check("節を絞ると、その節（と、いつも渡す節）の数値だけを通す", narrowed.join() === "17.1L", narrowed.join());
  check("いつも渡す節（補助金の要点）の数値は、どの題材でも書ける", unknownNumericTokens("エコキュートは7万円／台、交付申請は2026年12月31日まで。", sheet, []).length === 0);
  check("節の確認日は、日付として書ける", unknownNumericTokens("2026年10月14日に公式ページで確認した内容です。", sheet, []).length === 0);
  check("機種の数値は、その機種の節を渡したときだけ書ける", (() => {
    const p = products.find((x) => x.modelNumber === "SRT-S377")!;
    const t = `${p.capacity.tankLiters}L`;
    return unknownNumericTokens(`タンクは${t}です。`, sheet, []).includes(t) && unknownNumericTokens(`タンクは${t}です。`, sheet, [productSectionId(p)]).length === 0;
  })());
  const mt = modelTokens("リンナイのＲＵＦ－Ｅ２４０ＥＡＷと、GT-C2472AW-1 BL、SRT-S377、EA377AFV、RHP-R223(S)。JIS C 9220・JGKAS A705・JRA9002・13A・LPG・R290・AC100V は型番ではない。");
  check("型番らしい文字列を取り出す（全角も半角にする）", ["RUF-E240EAW", "GT-C2472AW-1", "SRT-S377", "EA377AFV", "RHP-R223(S)"].every((t) => mt.includes(t)), mt.join(","));
  check("規格・ガスの種類・冷媒・電源の表記は型番として扱わない", !mt.some((t) => /JIS|JGKAS|JRA|13A|LPG|R290|AC100V/.test(t)), mt.join(","));
  check("掲載機種の型番は通す（末尾の記号を省いた書き方も）", unknownModelTokens("RUF-E240EAW と RUX-E2016W、GT-C2472AW、RHP-R223 を比べる").length === 0, unknownModelTokens("RUF-E240EAW と RUX-E2016W、GT-C2472AW、RHP-R223 を比べる").join(","));
  check("掲載機種に無い型番は通さない", unknownModelTokens("RUF-E2405SAW と GT-C2462AWX").join() === "RUF-E2405SAW,GT-C2462AWX", unknownModelTokens("RUF-E2405SAW と GT-C2462AWX").join());
  const allowed = allowedModelTokens();
  const missingModel = products.filter((p) => !modelTokens(p.modelNumber).every((t) => allowed.has(t))).map((p) => p.modelNumber);
  check(`掲載機種（${products.length}機種）の型番は、すべて書いてよい型番になっている`, missingModel.length === 0, missingModel.join(" / "));
}

/* ------------------------------------------------------------------ */
console.log("6. 重複と検索語の取り合いの判定");
{
  check("同じ本文は重なりが大きい", shingleOverlap(good.body, good.body) > 0.99);
  const other = readFixture("blog-bad.json").body as string;
  check("別の記事どうしは重なりが小さい", shingleOverlap(good.body, other) < 0.12, String(shingleOverlap(good.body, other)));
  check("近い題名を見つける", diceBigram("給湯器の交換時期はいつ？", "給湯器の交換時期の目安") > 0.6);
  check("語の並びが違っても、同じ検索語とみなす", normalizeKeyword("給湯器 フルオート オート 違い") === normalizeKeyword("給湯器 オート フルオート 違い") && sameKeyword("給湯器 交換時期", "給湯器　交換時期"));
  check("固定ページの検索語を、担当のページで見つける", fixedKeywordOwner("給湯器 交換時期")?.path === "/guide/timing" && fixedKeywordOwner("ハイブリッド給湯器 補助金")?.path === "/subsidy/hybrid", JSON.stringify([fixedKeywordOwner("給湯器 交換時期"), fixedKeywordOwner("ハイブリッド給湯器 補助金")]));
  check("ページのファイルに書かれた検索語も集めている（/eco-jozu・/flow）", fixedKeywordList().some((o) => o.path === "/eco-jozu") && fixedKeywordList().some((o) => o.path === "/flow"));
  check("機種のページの検索語（型番）も集めている", fixedKeywordOwner("RUF-E240EAW")?.path === productPath(products.find((p) => p.modelNumber === "RUF-E240EAW")!));
}

/* ------------------------------------------------------------------ */
console.log("7. 題材の定義");
{
  const problems: string[] = [];
  const slugs = new Set<string>();
  for (const t of topics) {
    if (slugs.has(t.slug)) problems.push(`slug の重複：${t.slug}`);
    slugs.add(t.slug);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.slug)) problems.push(`slug の形：${t.slug}`);
    const cluster = getCluster(t.cluster);
    if (!cluster) problems.push(`カテゴリが無い：${t.slug}`);
    const owner = fixedKeywordOwner(t.keyword);
    if (owner) problems.push(`主キーワードが固定ページ（${owner.path}「${owner.keyword}」）と同じ：${t.slug} → ${t.keyword}`);
    const taken = existing.find((e) => e.slug !== t.slug && sameKeyword(e.keywords[0], t.keyword));
    if (taken) problems.push(`主キーワードが公開済みの記事（${taken.slug}）と同じ：${t.slug} → ${t.keyword}`);
    for (const f of t.facts) if (!sectionsFor(sheet, [f]).length) problems.push(`事実シートに節が無い：${t.slug} → ${f}`);
    for (const id of t.products ?? []) if (!products.some((p) => p.id === id)) problems.push(`機種が無い：${t.slug} → ${id}`);
    for (const p of t.pages) if (!paths.has(p)) problems.push(`ページが無い：${t.slug} → ${p}`);
    if (!t.pages.filter((p) => p !== cluster?.pillar.href).length) problems.push(`親ページのほかに、関連するページが無い：${t.slug}`);
    for (const a of t.areas ?? []) if (!publishedAreas.some((x) => x.slug === a)) problems.push(`地域ページが無い：${t.slug} → ${a}`);
    if (t.live?.kind === "maker-pages") for (const id of t.live.productIds) if (!products.some((p) => p.id === id)) problems.push(`公式情報を確かめる機種が無い：${t.slug} → ${id}`);
    // 題材の指示に書いた数値が、その題材で使える節に無いと、書きようのない題材になる
    // 主キーワードは題名に入るため、その数値も確かめる
    const unwritable = unknownNumericTokens([t.keyword, t.titleHint, ...t.angle].join("\n"), sheet, scopeForTopic(t, !!t.live));
    if (unwritable.length) problems.push(`題材の指示の数値が、使える節に無い：${t.slug} → ${unwritable.join("、")}`);
    const badModels = unknownModelTokens([t.titleHint, ...t.angle, t.keyword].join("\n"));
    if (badModels.length) problems.push(`題材の指示に、掲載機種に無い型番：${t.slug} → ${badModels.join("、")}`);
    if (t.months && !t.months.every((m) => m >= 1 && m <= 12)) problems.push(`月の指定が正しくない：${t.slug}`);
    if (t.angle.length < 3) problems.push(`書く内容（angle）が少ない：${t.slug}`);
  }
  for (let i = 0; i < topics.length; i++) {
    for (let j = i + 1; j < topics.length; j++) {
      if (diceBigram(topics[i].intent, topics[j].intent) >= 0.78) problems.push(`検索意図が近い：${topics[i].slug} と ${topics[j].slug}`);
      if (sameKeyword(topics[i].keyword, topics[j].keyword)) problems.push(`主キーワードが同じ：${topics[i].slug} と ${topics[j].slug}`);
    }
  }
  check(`題材 ${topics.length} 件の定義に誤りが無い`, problems.length === 0, problems.join(" / "));
  // 書き手に渡す事実シートの大きさ（いつも渡す節＋題材の節＋題材の機種の詳細。その日に確かめた節は 1KB 前後が加わる）
  const sizes = topics.map((t) => ({ slug: t.slug, n: Buffer.byteLength(sheetText(sheet, scopeForTopic(t, !!t.live)), "utf8") })).sort((a, b) => a.n - b.n);
  const PROMPT_FACTS_MAX = 24_000;
  const big = sizes.filter((s) => s.n > PROMPT_FACTS_MAX).map((s) => `${s.slug}（${s.n}）`);
  check(`題材ごとに渡す事実シートが ${PROMPT_FACTS_MAX.toLocaleString()} バイト以下（全体を渡さない）`, big.length === 0, big.join(" / "));
  const coreBytes = Buffer.byteLength(sheetText(sheet, []), "utf8");
  console.log(
    `      渡す事実シートの大きさ：いつも渡す節 ${coreBytes.toLocaleString()}／題材ごと 最小 ${sizes[0].n.toLocaleString()}・中央 ${sizes[Math.floor(sizes.length / 2)].n.toLocaleString()}・最大 ${sizes[sizes.length - 1].n.toLocaleString()}（${sizes[sizes.length - 1].slug}）バイト`,
  );
  const usedIds = new Set([...CORE_SECTION_IDS, ...topics.flatMap((t) => t.facts)]);
  const unused = sheet.sections.filter((s) => s.id && !s.id.startsWith("product:") && !usedIds.has(s.id)).map((s) => s.id);
  check("ファイルのどの節も、いつも渡す節か、どれかの題材が使っている（使わない節を置かない）", unused.length === 0, unused.join("、"));
  check("節の id の一覧（scopeIds）は、いつも渡す節を先に並べる", scopeIds(["lifespan"]).slice(0, CORE_SECTION_IDS.length).join() === CORE_SECTION_IDS.join());
  const perGenre = blogClusters.map((c) => ({ c, n: topics.filter((t) => t.cluster === c.id).length }));
  const thin = perGenre.filter((x) => x.n < 3).map((x) => `${x.c.genre}.${x.c.name}（${x.n}件）`);
  check("20のジャンルすべてに、題材が3件以上ある", thin.length === 0, thin.join(" / "));
  console.log(`      ジャンルごとの題材の数：${perGenre.map((x) => `${x.c.genre}.${x.c.name} ${x.n}`).join("／")}`);
  const live = topics.filter((t) => t.live);
  check("最新の公式情報を確かめる題材（live）がある（予算・メーカーの掲載）", live.some((t) => t.live?.kind === "kyutou-budget") && live.some((t) => t.live?.kind === "maker-pages"));
  check("普遍的な題材（live でないもの）が十分にある（公式情報を確かめられない日の代わり）", topics.filter((t) => !t.live).length >= 40);
}

/* ------------------------------------------------------------------ */
console.log("8. 題材の選び方");
{
  const first = pickTopic(existing, TODAY);
  const second = pickTopic(existing, TODAY);
  check("同じ状態なら、同じ題材を選ぶ（ランダムにしない）", !!first && first.slug === second?.slug);
  check("すでに記事のある題材は選ばない", !!first && !existing.some((e) => e.slug === first.slug));
  const open = rankTopics(existing, TODAY);
  const best = open.some((t) => t.priority === "P0") ? "P0" : open.some((t) => t.priority === "P1") ? "P1" : "P2";
  check(`優先度の高い題材から選ぶ（いまは ${best}）`, !first || first.priority === best, first ? `${first.slug} は ${first.priority}` : "");
  if (first) {
    const fake = { slug: "dummy", intent: "まったく別の検索意図のダミーの記事", category: first.cluster, keywords: [first.keyword, "x"], publishedAt: TODAY } as const;
    const blocked = pickTopic([...existing, { ...fake, keywords: [...fake.keywords] }], TODAY);
    check("主キーワードが同じ記事があると、その題材は選ばない", blocked?.slug !== first.slug, blocked?.slug);
    const next = rankTopics([...existing, { ...fake, slug: first.slug, keywords: [...fake.keywords] }], TODAY)[0];
    check("前の記事と同じカテゴリは、同じ優先度の中で後に回す", !next || next.priority !== first.priority || next.cluster !== first.cluster || rankTopics([], TODAY).filter((t) => t.priority === first.priority).every((t) => t.cluster === first.cluster), next?.slug);
  }
  const winter = topics.find((t) => t.months && !t.months.includes(7))!;
  check("季節の題材は、決めた月の外では選ばない", topicBlocker(winter, [], "2026-07-15") !== null && topicBlocker(winter, [], `2026-${String(winter.months![0]).padStart(2, "0")}-10`) === null, winter.slug);
  const subsidyTopic = topics.find((t) => t.requiresOpenProgram)!;
  check("補助金の題材は、制度の受付が終わったら選ばない", topicBlocker(subsidyTopic, [], "2027-01-10") !== null && topicBlocker(subsidyTopic, [], "2026-10-14") === null, subsidyTopic.slug);
  const remaining = open.length;
  console.log(`      今日書ける題材：${remaining} 件／次に書く題材：${first?.slug ?? "なし"}`);
}

/* ------------------------------------------------------------------ */
console.log("9. その日の公式情報の確認（live）");
{
  const graph = (p: number, d: string) => `<html><body><p>${d}0時時点</p><div><span class="number">${p}</span><span class="symbol">%</span></div></body></html>`;
  const parsed = parseBudgetGraph(graph(50, "2026年10月13日"));
  check("予算の割合のページから、割合と時点を読む", parsed.percent === 50 && parsed.asOf === "2026-10-13", JSON.stringify(parsed));
  let threw = false;
  try {
    parseBudgetGraph("<html>作りの変わったページ</html>");
  } catch {
    threw = true;
  }
  check("読み取れないページは、失敗として扱う", threw);
  const okFetcher: Fetcher = async (url) => (url.includes("tekkyokasan") ? graph(25.5, "2026年10月13日") : graph(48.5, "2026年10月13日"));
  const ok = await fetchLive({ kind: "kyutou-budget" }, TODAY, okFetcher);
  check("取り直せたときは「本日確認した公式情報」の節を作る", ok.ok && ok.markdown.includes("48.5%") && ok.markdown.includes("確認日: 2026-10-14"), ok.ok ? ok.markdown : ok.reason);
  if (ok.ok) {
    const s2 = withLiveSections(sheet, ok.markdown);
    check("取り直した節には、題材から選べる id（live-kyutou-budget）が付く", s2.sections.some((s) => s.live && s.id === "live-kyutou-budget"));
    const inLive = unknownNumericTokens("10月13日0時時点で48.5%", s2, ["live-kyutou-budget"]);
    const notLive = unknownNumericTokens("10月13日0時時点で48.5%", s2, ["kyutou"]);
    check("その節の数値は、live の題材の範囲でだけ書ける", inLive.length === 0 && notLive.includes("48.5%"), `${inLive.join()} / ${notLive.join()}`);
  }
  const stale = await fetchLive({ kind: "kyutou-budget" }, TODAY, async () => graph(50, "2026年9月1日"));
  check("時点の古い値は使わない", !stale.ok, stale.ok ? "通ってしまった" : stale.reason);
  const down = await fetchLive({ kind: "kyutou-budget" }, TODAY, async () => {
    throw new Error("HTTP 503");
  });
  check("取り直せないときは、失敗として扱う（その日は普遍的な題材にする）", !down.ok && down.reason.includes("503"), down.ok ? "" : down.reason);
  const p = products.find((x) => x.modelNumber === "SRT-S377")!;
  check("メーカーのページに型番があるかを見る（全角・空白の違いは問わない）", pageHasModel("<p>ＳＲＴ－Ｓ３７７ 角型</p>", p.modelNumber) && !pageHasModel("<p>SRT-S467</p>", p.modelNumber));
  const maker = await fetchLive({ kind: "maker-pages", productIds: [p.id] }, TODAY, async () => `<html><body>${p.modelNumber}</body></html>`);
  check("メーカーのページで掲載を確かめられたら、その節を作る", maker.ok && maker.markdown.includes(p.modelNumber), maker.ok ? "" : maker.reason);
  const makerNg = await fetchLive({ kind: "maker-pages", productIds: [p.id] }, TODAY, async () => "<html><body>生産終了</body></html>");
  check("ページに型番が無ければ、失敗として扱う", !makerNg.ok);
}

/* ------------------------------------------------------------------ */
console.log("10. 見直し（リライト）");
{
  const fracs = Array.from({ length: 365 }, (_, i) => dayFraction(new Date(Date.UTC(2026, 0, 1 + i)).toISOString().slice(0, 10)));
  check("日付から決まる値は、同じ日なら同じ", dayFraction("2026-10-07") === dayFraction("2026-10-07"));
  const share = fracs.filter((x) => x < 0.3).length / fracs.length;
  check("1年のうち、見直しの日は約3割（0.3 のとき）", share > 0.26 && share < 0.34, String(share));
  const prevMode = process.env.BLOG_MODE;
  delete process.env.BLOG_MODE;
  check("見直す理由のある記事が無ければ、新しい記事を書く", decideMode("2026-10-07", false, true) === "new");
  check("書ける題材が無ければ、見直しをする", decideMode("2026-10-07", true, false) === "refresh");
  if (prevMode) process.env.BLOG_MODE = prevMode;

  const base = asPost({ ...good, publishedAt: "2026-09-01", updatedAt: "2026-09-01" });
  const pillar = base.cluster.pillar.href;
  check("理由の無い記事は、見直さない", refreshReasons({ ...base, updatedAt: "2099-01-01" }, sheet).length === 0, refreshReasons({ ...base, updatedAt: "2099-01-01" }, sheet).map((r) => r.instruction).join(" / "));
  const noPillar = { ...base, body: base.body.split(`](${pillar})`).join("](/faq)") };
  const r1 = refreshReasons(noPillar, sheet).filter((r) => r.instruction.includes("親ページ"));
  check("親ページへのリンクが無い記事は、見直す理由になる", r1.length === 1);
  check("リンクを入れると、その理由は解消される", r1.length === 1 && r1[0].resolved(base) && !r1[0].resolved(noPillar));
  const broken = { ...base, body: `${base.body}\n\n[終わった機種のページ](/products/rinnai/no-such-model)` };
  check("無いページへのリンクは、見直す理由になる", refreshReasons(broken, sheet).some((r) => r.instruction.includes("無いページ")));
  const oldModel = { ...base, body: `${base.body}\n\n以前の機種 RUF-E2405SAW の話。` };
  check("掲載をやめた機種の型番は、見直す理由になる", refreshReasons(oldModel, sheet).some((r) => r.instruction.includes("型番")));
  const old = { ...base, updatedAt: "2020-01-01", publishedAt: "2020-01-01" };
  check("出典の節が、記事の更新日より後に確認し直されたら、見直す理由になる", refreshReasons(old, sheet).some((r) => r.instruction.includes("確認し直されています")));
  check("同じ本文は「変わっていない」", !bodyChanged(base.body, base.body));
  check("空白だけの違いは「変わっていない」", !bodyChanged(base.body, base.body.replace(/\n\n/g, "\n\n\n")));
  check("文を足すと「変わった」", bodyChanged(base.body, `${base.body}\n\n寒い時期の前に、循環口のフィルターも一度確かめておくと、冬の朝にあわてずに済みます。`));
  const out = ArticleSchema.parse({ title: base.title, description: base.description, keywords: [...base.keywords].reverse(), body: base.body, faq: base.faq, relatedArticles: [], sources: base.sources.map((x) => x.url) });
  const refreshed = toRefreshedDraft(out, base, sheet, "2030-01-02");
  check("見直しでは、公開日・slug・検索意図を変えず、更新日だけを今日にする", refreshed.publishedAt === base.publishedAt && refreshed.slug === base.slug && refreshed.intent === base.intent && refreshed.updatedAt === "2030-01-02");
  check("見直しでも、主キーワードは先頭のまま", refreshed.keywords[0] === base.keywords[0], refreshed.keywords.join(" / "));
  check("見直しの保存形式に、値の無い項目を書き出さない", !/: undefined|: null\n/.test(toMarkdown(refreshed)));
  const target = pickRefreshTarget([noPillar, { ...base, slug: "fresh-post", updatedAt: TODAY }], sheet, TODAY);
  check("見直す記事は、理由のある記事から選ぶ（7日以内に更新した記事は選ばない）", target?.post.slug === noPillar.slug, target?.post.slug);
  check("その日の公式情報を載せた記事は、自動の見直しの対象にしない", pickRefreshTarget([{ ...noPillar, liveCheckedAt: "2026-09-01" }], sheet, TODAY) === null);
  // 点検（blog:audit と同じ検査）で不合格の記事は、7日以内に更新した記事でも、いちばん先に見直す
  const failing = { ...base, slug: "failing-post", updatedAt: TODAY, keywords: ["給湯器 追いだき 点検の試験", "x"], body: `${base.body}\n\n修理の費用は99万円です。` };
  const fr = refreshReasons(failing, sheet, [failing]);
  check("点検で不合格の記事は、その理由（不合格の内容）で見直す", fr.some((r) => r.failing && r.instruction.includes("99万円")), fr.map((r) => r.instruction).join(" / "));
  check("点検で合格する記事には、その理由を付けない", !refreshReasons(base, sheet, [base]).some((r) => r.failing), refreshReasons(base, sheet, [base]).map((r) => r.instruction).join(" / "));
  // 比べる相手は、点検には合格するが、見直す理由の多い記事（出典の節が確認し直された古い記事）。
  // 不合格の記事は、本文・主キーワード・検索意図の重ならない別の記事（悪い原稿）にする（重なると、両方が不合格になるため）
  const badFx = readFixture("blog-bad.json");
  const badPost = asPost(toDraft(ArticleSchema.parse(badFx), getTopic(String(badFx.$topic))!, sheet, TODAY));
  const failingOther = { ...badPost, slug: "failing-post", updatedAt: TODAY, keywords: ["給湯器 点検の試験の記事", "点検の試験"], intent: "点検の試験のための、まったく別の検索意図の記事" };
  const oldOk = { ...base, updatedAt: "2020-01-01", publishedAt: "2020-01-01" };
  const oldReasons = refreshReasons(oldOk, sheet, [oldOk, failingOther]);
  check("比べる相手の記事は、点検に合格し、ほかの理由が多い", !oldReasons.some((r) => r.failing) && oldReasons.length >= 2, oldReasons.map((r) => r.instruction.slice(0, 80)).join(" / "));
  const first = pickRefreshTarget([oldOk, failingOther], sheet, TODAY);
  check("点検で不合格の記事を、ほかの理由の記事より先に選ぶ（7日以内の更新でも）", first?.post.slug === "failing-post", first?.post.slug);
  // 題材の無い記事（手書き）の見直しでも、事実シートの全体は渡さない
  const handScope = scopeForPost({ ...base, generated: false }, sheet);
  const handBytes = Buffer.byteLength(sheetText(sheet, handScope), "utf8");
  const allBytes = Buffer.byteLength(sheetText(sheet), "utf8");
  check(`手書きの記事の見直しでは、出典と数値から節を選んで渡す（${handBytes.toLocaleString()}／全体 ${allBytes.toLocaleString()} バイト）`, handBytes < allBytes / 3 && unknownNumericTokens(base.body, sheet, handScope).length === 0, handScope.join("、"));
}

/* ------------------------------------------------------------------ */
console.log("11. API の呼び出しの設定と、毎日の実行の設定");
{
  check("既定のモデルは claude-haiku-5-5（書く・読み直す）", DEFAULT_MODEL === "claude-haiku-5-5");
  check("代替モデル（fallbacks）は opus-5-5・sonnet-5-5・fable-5-1 のときだけ", FALLBACK_MODELS.size === 3 && ["claude-opus-5-5", "claude-sonnet-5-5", "claude-fable-5-1"].every((m) => FALLBACK_MODELS.has(m)) && !FALLBACK_MODELS.has("claude-haiku-5-5"));
  const c = estimateCost("claude-haiku-5-5", { input_tokens: 10_000, output_tokens: 10_000 });
  check("料金の目安（Haiku 5.5：入力 $0.10・出力 $0.50 / 1M トークン）", c !== null && Math.abs(c - 0.006) < 1e-9, String(c));
  const long = estimateCost("claude-haiku-5-5", { input_tokens: 200_000, output_tokens: 0 });
  check("入力が 100K トークンを超える呼び出しは、長い文脈の料金（入力 $0.50）で見積もる", long !== null && Math.abs(long - 0.1) < 1e-9, String(long));
  check("料金表に無いモデルは、目安を出さない", estimateCost("claude-unknown", { input_tokens: 1, output_tokens: 1 }) === null);
  const src = fs.readFileSync(path.join(process.cwd(), "lib", "blog-generator", "generate.ts"), "utf8");
  check("温度などのサンプリングの指定を使っていない", !/\b(temperature|top_p|top_k)\s*:/.test(src));
  const wf = fs.readFileSync(path.join(process.cwd(), ".github", "workflows", "daily-blog.yml"), "utf8");
  const cron = /cron:\s*"(\d+)\s+(\d+)\s/.exec(wf);
  check("毎日の実行は、毎時0分を避けた時刻", !!cron && cron[1] !== "0", cron?.[0]);
  check("同時に2つ走らせない（concurrency）", /concurrency:/.test(wf) && /cancel-in-progress:\s*false/.test(wf));
  check("手動の実行で、試し書き・題材・モデルを指定できる", /workflow_dispatch:/.test(wf) && /dry_run:/.test(wf) && /topic:/.test(wf) && /model:/.test(wf));
  check("書く前に、予算の割合の取り直しを（失敗しても止めずに）行う", /npm run subsidy:budget/.test(wf) && /continue-on-error:\s*true/.test(wf));
  check("その回に書いた記事は、点検（blog:audit --strict）に通らないと push しない", /npm run blog:audit -- --strict/.test(wf));
}

}

main()
  .then(() => {
    console.log(failed ? `\n${failed} 件の確認に失敗しました` : "\nすべての確認に合格しました");
    process.exit(failed ? 1 : 0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
