import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import matter from "gray-matter";
import { z } from "zod";
import { AREA_STAT_SOURCES, publishedAreas } from "@/data/areas";
import { subsidySources } from "@/data/subsidy/programs";
import { BLOG_DIR, getAllPosts, internalLinkPaths, type Post } from "@/lib/blog";
import { getCluster } from "@/lib/blog-clusters";
import { linkCatalog, pageLabel } from "@/lib/blog-links";
import { auditPost } from "@/lib/blog-generator/audit";
import { loadFactSheet, scopeIds, sectionsFor, sheetText, withLiveSections, type FactSheet } from "@/lib/blog-generator/facts";
import { fixedKeywordList, normalizeKeyword, sameKeyword } from "@/lib/blog-generator/keywords";
import { fetchLive, type Fetcher } from "@/lib/blog-generator/live";
import { unknownModelTokens } from "@/lib/blog-generator/model-numbers";
import { scopeForPost, scopeForTopic } from "@/lib/blog-generator/scope";
import { diceBigram, shingleOverlap } from "@/lib/blog-generator/similarity";
import { getTopic, topics, type Topic } from "@/lib/blog-generator/topics";
import { BODY_MAX, BODY_MIN, validateArticle, type ArticleDraft, type ValidationContext } from "@/lib/blog-generator/validate";
import { allContentPages } from "@/lib/content";
import { getBrand, productPath, products } from "@/lib/products";
import { knownPaths } from "@/lib/routes";
import { formatDateJa } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { kyutouPhase } from "@/lib/subsidy";

/**
 * 給湯器コラムの自動生成（1回の実行で1本。新しい記事を書くか、公開済みの記事を1本見直すか、のどちらか）。
 *
 * 新しい記事の流れ
 *   1. 題材を選ぶ（lib/blog-generator/topics.ts。優先度の高い順に、既存の記事・固定ページと重ならないもの）
 *      live の題材は、その日に公式ページを取り直す。取り直せなければ、その日は普遍的な題材（live でないもの）に替える
 *   2. 書く … Claude に、事実シートのうち、いつも渡す節（会社・補助金の要点・その日の制度の状態・書かないこと・基本の知識）と
 *      題材の節（topics.ts の facts の id ＋ 題材の機種の詳細 ＋ その日に確かめた節）だけを渡して書かせる（全体は渡さない）
 *   3. 機械の検査 … lib/blog-generator/validate.ts（決まり文句・数値・型番・リンク・地名・重複）
 *   4. 読み直し … 別の呼び出しで、原稿の主張を事実シートと1文ずつ照らし合わせる
 *   5. 3 と 4 の両方に通ったときだけ、content/blog/<slug>.md に保存する
 *      通らなければ、指摘を渡して書き直させる（最大 MAX_ATTEMPTS 回）。それでも通らなければ、その日は公開しない（失敗として終わる）
 *
 * 見直し（リライト）
 *   公開済みの記事に「見直す理由」（点検〔blog:audit と同じ検査〕で不合格・出典の節が確認し直された・親ページへのリンクが無い・
 *   存在しないページへのリンク・掲載をやめた機種の型番）があるとき、BLOG_REFRESH_RATIO（既定 0.3）の割合の日を見直しに使う
 *   （日付から決まる）。点検で不合格の記事を、いちばん先に直す。
 *   理由に対応した変更が本文に入ったときだけ保存し、updatedAt を今日にする。日付だけを新しくする更新はしない。
 *
 * 「毎日かならず公開する」より「基準を満たした日だけ公開する」を優先している。
 *
 * 環境変数
 *   ANTHROPIC_API_KEY       … 必須（DRY_RUN_FIXTURE を使うときは不要）
 *   ANTHROPIC_MODEL         … 書くモデル（既定 claude-haiku-5-5）
 *   ANTHROPIC_REVIEW_MODEL  … 読み直すモデル（既定 claude-haiku-5-5）
 *   ANTHROPIC_FALLBACKS     … "off" にすると、応答を断られたときの代替モデルへの切り替えを使わない
 *                             （切り替えは claude-opus-5-5・claude-sonnet-5-5・claude-fable-5-1 のときだけ使える）
 *   TOPIC                   … 題材の slug を指定して書かせる（省略時は自動で選ぶ）
 *   BLOG_MODE               … "new"（新しい記事）か "refresh"（見直し）に固定する（省略時は日付から決める）
 *   BLOG_REFRESH_RATIO      … 見直しに使う日の割合（0〜1。既定 0.3）
 *   REFRESH                 … 見直す記事の slug を指定する
 *   DRY_RUN=1               … 保存しない（生成と検査だけ行い、結果を表示する）
 *   DRY_RUN_FIXTURE=<path>  … API を呼ばず、JSON ファイルの原稿を検査に通す（仕組みの確認用。"$topic" で題材を指定できる）
 *   FORCE=1                 … 今日の記事がすでにあっても、もう1本書く
 */
export const DEFAULT_MODEL = "claude-haiku-5-5";
export const WRITER_MODEL = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
export const REVIEW_MODEL = process.env.ANTHROPIC_REVIEW_MODEL || DEFAULT_MODEL;
/** サーバー側の代替モデル（fallbacks）が使えるモデル。ほかのモデルでは、ベータの指定を付けずに呼ぶ */
export const FALLBACK_MODELS = new Set(["claude-opus-5-5", "claude-sonnet-5-5", "claude-fable-5-1"]);
const FALLBACK_BETA = "server-side-fallback-2026-07-01";
const MAX_ATTEMPTS = 4;
const MAX_TOKENS = 64000;

/** モデルに返させる原稿の形（slug・カテゴリ・日付などは、こちらで決めて足す） */
export const ArticleSchema = z.object({
  title: z.string().describe("記事の題名。全角32字以内を目安に。主キーワードの言葉を自然に入れる。記号で飾らない"),
  description: z.string().describe("検索結果に出る説明文。70〜115字。記事で分かることを具体的に書く"),
  keywords: z.array(z.string()).describe("検索キーワード。3〜5個"),
  body: z.string().describe("本文（Markdown）。最初は検索意図への答えを書いた導入の段落。見出しは ## から。# は使わない"),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).describe("本文で答えきれなかった関連する質問と答え。0〜3個。本文と同じ事実だけで答える"),
  relatedArticles: z.array(z.string()).describe("関連する既存の記事の slug。0〜3個。渡された一覧にあるものだけ"),
  sources: z.array(z.string()).describe("本文で使った事実の出典 URL。事実シートの「出典」の行にある URL だけ。1つ以上"),
});
export type ArticleOutput = z.infer<typeof ArticleSchema>;

const ReviewSchema = z.object({
  verdict: z.enum(["pass", "fail"]).describe("issues が1件も無ければ pass"),
  issues: z
    .array(
      z.object({
        quote: z.string().describe("問題のある文（原稿からそのまま抜き出す）"),
        problem: z.string().describe("何が問題か（事実シートのどこと食い違うか、何が確認できないか）"),
        fix: z.string().describe("どう直すか（削る／事実シートのこの記述に合わせる、など）"),
      }),
    )
    .describe("直すべき点。問題が無ければ空"),
});
type ReviewOutput = z.infer<typeof ReviewSchema>;

export type GenerateMode = "new" | "refresh";
type Done = { mode: GenerateMode; slug: string; draft: ArticleDraft; file: string; attempts: number; cost: number; log: string[]; live?: string };
export type GenerateResult =
  /** 検査に合格して保存した */
  | (Done & { status: "published" })
  /** 検査に合格した（試し書きのため保存していない） */
  | (Done & { status: "dry-run" })
  /** 書くものが無い・今日はもう書いた（正常） */
  | { status: "skipped"; reason: string; log: string[] }
  /** 人の対応が要る（題材が尽きた・指定した題材の公式情報を確かめられない など） */
  | { status: "blocked"; reason: string; log: string[] }
  /** 基準を満たさなかったので公開しなかった */
  | { status: "rejected"; mode: GenerateMode; slug: string; reason: string; problems: string[]; attempts: number; cost: number; log: string[]; lastDraft?: ArticleDraft };

/** 日本時間の今日（YYYY-MM-DD） */
export function todayJst(now: Date = new Date()): string {
  return new Date(now.getTime() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ */
/* 題材選び                                                            */
/* ------------------------------------------------------------------ */
const PRIORITY_ORDER = { P0: 0, P1: 1, P2: 2 } as const;

type ExistingLite = Pick<Post, "slug" | "intent" | "category" | "keywords" | "publishedAt">;

/** その題材を、今日書いてよいか（書けない理由。書けるなら null） */
export function topicBlocker(t: Topic, existing: ExistingLite[], today: string): string | null {
  if (existing.some((e) => e.slug === t.slug)) return "すでに記事がある";
  if (existing.some((e) => sameKeyword(e.keywords[0] ?? "", t.keyword))) return "主キーワードが同じ記事がある";
  if (existing.some((e) => diceBigram(e.intent, t.intent) >= 0.78)) return "検索意図が近い記事がある";
  const month = Number(today.slice(5, 7));
  if (t.months && !t.months.includes(month)) return `季節の題材（${t.months.join("・")}月）`;
  if (t.requiresOpenProgram && kyutouPhase(new Date(`${today}T12:00:00+09:00`)) !== "open") return "給湯省エネ2026事業が受付中ではない";
  return null;
}

/**
 * 今日書ける題材を、書く順に並べる。
 * 優先度 → 前の記事と同じカテゴリを後に → 記事の少ないカテゴリを先に → 配列の順。
 */
export function rankTopics(existing: ExistingLite[], today: string): Topic[] {
  const count = new Map<string, number>();
  for (const p of existing) count.set(p.category, (count.get(p.category) ?? 0) + 1);
  const last = [...existing].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0]?.category;
  return topics
    .map((t, index) => ({ t, index }))
    .filter(({ t }) => topicBlocker(t, existing, today) === null)
    .sort(
      (a, b) =>
        PRIORITY_ORDER[a.t.priority] - PRIORITY_ORDER[b.t.priority] ||
        Number(a.t.cluster === last) - Number(b.t.cluster === last) ||
        (count.get(a.t.cluster) ?? 0) - (count.get(b.t.cluster) ?? 0) ||
        a.index - b.index,
    )
    .map(({ t }) => t);
}

/** 次に書く題材（override は TOPIC で指定した slug） */
export function pickTopic(existing: ExistingLite[], today: string, override?: string): Topic | null {
  if (override) return getTopic(override) ?? null;
  return rankTopics(existing, today)[0] ?? null;
}

// 書き手に渡す節の決め方（scope.ts）。selftest などから使えるよう、ここからも出す
export { scopeForPost, scopeForTopic };

/* ------------------------------------------------------------------ */
/* 見直し（リライト）                                                  */
/* ------------------------------------------------------------------ */
/** 日付から 0〜1 の値を決める（同じ日は同じ値。日ごとに均等に散らばる）。見直しの日かどうかの判定に使う */
export function dayFraction(iso: string): number {
  const days = Math.floor(Date.parse(`${iso}T00:00:00Z`) / 86_400_000);
  return (days * 0.6180339887) % 1;
}

/** 今日は、新しい記事を書く日か、見直しの日か */
export function decideMode(today: string, hasRefreshTarget: boolean, hasTopic: boolean): GenerateMode {
  const forced = process.env.BLOG_MODE;
  if (forced === "new" || forced === "refresh") return forced;
  if (!hasRefreshTarget) return "new";
  if (!hasTopic) return "refresh";
  // 変数が空のとき（GitHub Actions で未設定のとき）は既定の 0.3。0 を指定すると、見直しをしない
  const raw = Number(process.env.BLOG_REFRESH_RATIO || "0.3");
  const ratio = Number.isFinite(raw) ? Math.min(1, Math.max(0, raw)) : 0.3;
  return dayFraction(today) < ratio ? "refresh" : "new";
}

export type RefreshReason = {
  /** 何を直すか（モデルへの指示にも、記録にも使う） */
  instruction: string;
  /** 直した原稿で、この理由が解消されたか */
  resolved: (draft: ArticleDraft) => boolean;
  /** 公開済みの記事の点検で不合格（いちばん先に直す） */
  failing?: boolean;
};

const hasLink = (body: string, href: string) => internalLinkPaths(body).includes(href);

/**
 * 公開済みの記事を見直す理由。1つも無ければ、その記事は見直さない（日付だけを新しくしない）。
 *   0. 公開済みの記事の点検（blog:audit と同じ検査）で不合格（事実シートを直したあとに古い数値が残った、など）
 *   1. 記事が出典にしている事実シートの節が、記事の更新日より後に確認し直された
 *   2. カテゴリの親ページへのリンクが、本文に無い（親ページが替わったとき）
 *   3. 本文に、いまは無いページへのリンクがある（機種の掲載をやめた・ページを移した）
 *   4. 本文に、いまは掲載していない機種の型番がある
 * posts を渡すと 0 を確かめる（直した原稿は、同じ検査に通らないと保存しないため、resolved は常に true）。
 */
export function refreshReasons(post: Post, sheet: FactSheet, posts?: Post[]): RefreshReason[] {
  const out: RefreshReason[] = [];
  if (posts && !post.liveCheckedAt) {
    const audit = auditPost(post, posts, sheet);
    if (!audit.ok) {
      out.push({
        instruction: `公開済みの記事の点検で、次の点が不合格です。すべて直してください（直せない数値は、その文ごと削る）：\n${audit.errors.map((e) => `   - ${e}`).join("\n")}`,
        resolved: () => true,
        failing: true,
      });
    }
  }
  for (const sec of sheet.sections) {
    // その日の制度の状態（確認日が毎日今日になる）と、その日に確かめた節は、見直しの理由にしない
    if (sec.id === "subsidy-phase" || sec.live) continue;
    if (!sec.checkedAt || sec.checkedAt <= post.updatedAt) continue;
    if (!post.sources.some((src) => sec.sources.includes(src.url))) continue;
    const date = formatDateJa(sec.checkedAt);
    out.push({
      instruction: `事実シートの「${sec.title}」の節が、${date}に確認し直されています。この節にもとづく数値・日付・条件を、いまの事実シートの記述に合わせてください。本文に書く確認日も「${date}」にしてください。`,
      resolved: (d) => d.body.includes(date) || d.body.includes(date.replace(/^\d+年/, "")),
    });
  }
  const cluster = getCluster(post.category);
  if (cluster && !hasLink(post.body, cluster.pillar.href)) {
    out.push({
      instruction: `このカテゴリの親ページ ${cluster.pillar.href}（${cluster.pillar.label}）へのリンクが本文にありません。文の流れに合う所に、リンク先の内容が分かる言葉で入れてください。`,
      resolved: (d) => hasLink(d.body, cluster.pillar.href),
    });
  }
  const paths = knownPaths();
  const broken = [...new Set(internalLinkPaths(post.body))].filter((p) => !paths.has(p));
  if (broken.length) {
    out.push({
      instruction: `本文に、いまは無いページへのリンクがあります（${broken.join("、")}）。リンクを外すか、リンクできるページの一覧にある、内容の合うページへ替えてください。`,
      resolved: (d) => !internalLinkPaths(d.body).some((p) => broken.includes(p)),
    });
  }
  const models = unknownModelTokens([post.title, post.description, post.body].join("\n"));
  if (models.length) {
    out.push({
      instruction: `本文に、このサイトでいまは掲載していない機種の型番があります（${models.join("、")}）。その型番を書いた文を、掲載機種の型番に合わせて直すか、型番を書かない形にしてください。`,
      resolved: (d) => unknownModelTokens([d.title, d.description, d.body].join("\n")).length === 0,
    });
  }
  return out;
}

/**
 * 見直す記事を選ぶ。点検で不合格の記事を先に、次に理由の多い記事、同じなら更新日の古い記事を先に。
 * 直近7日以内に更新した記事（点検で不合格の記事は除く）と、その日に確かめた情報を載せた記事は選ばない。
 */
export function pickRefreshTarget(posts: Post[], sheet: FactSheet, today: string, override?: string): { post: Post; reasons: RefreshReason[] } | null {
  if (override) {
    const post = posts.find((p) => p.slug === override);
    return post ? { post, reasons: refreshReasons(post, sheet, posts) } : null;
  }
  const cooldown = new Date(Date.parse(`${today}T00:00:00Z`) - 7 * 86_400_000).toISOString().slice(0, 10);
  const failing = (c: { reasons: RefreshReason[] }) => Number(c.reasons.some((r) => r.failing));
  const candidates = posts
    .filter((p) => !p.liveCheckedAt)
    .map((post) => ({ post, reasons: refreshReasons(post, sheet, posts) }))
    .filter((c) => c.reasons.length > 0 && (c.post.updatedAt <= cooldown || failing(c)));
  candidates.sort(
    (a, b) =>
      failing(b) - failing(a) ||
      b.reasons.length - a.reasons.length ||
      a.post.updatedAt.localeCompare(b.post.updatedAt) ||
      a.post.slug.localeCompare(b.post.slug),
  );
  return candidates[0] ?? null;
}

/** 本文が実際に変わったか（空白の違いだけ・ごくわずかな違いは「変わっていない」とみなす） */
export function bodyChanged(before: string, after: string): boolean {
  const norm = (t: string) => t.replace(/[\s　]+/g, "");
  if (norm(before) === norm(after)) return false;
  return shingleOverlap(after, before) < 0.99;
}

/* ------------------------------------------------------------------ */
/* プロンプト                                                          */
/* ------------------------------------------------------------------ */
function writerRules(min: number, max: number): string {
  const s = siteConfig;
  return `あなたは、${s.name}（愛称：${s.nickname}。横浜市戸塚区にオフィスがあり、給湯器の交換工事を行う会社）の「${s.siteName}」で、給湯器コラムを書く編集者です。

## 読む人と、この記事の役目
読むのは、自宅の給湯器のことで困っている、または交換を考え始めた一般の方です。検索で1つの疑問を持ってこのページに来ます。記事の役目は、その1つの疑問に、メーカーや国・自治体の公式情報にもとづいて具体的に答えることです。答えたあとで、関係する固定ページ（選び方・故障・補助金・種類・地域）と機種のページへ自然につなぎます。売り込みの文章ではありません。

## 書き方
- 1つの記事は、渡された「検索意図」1つだけに答える。関係の薄い話題を足して長くしない。
- **最初の段落の1〜2文で、検索意図への答えを言い切る**（「〜は、〜で決まります」「〜は、故障ではありません」のように）。そのあとで、理由とくわしい説明に入る。前置きや予告（「解説します」など）は書かない。
- 見出し（##）は4〜7個。見出しだけ読んでも内容が分かる、具体的な言葉にする（場面・機種・数字・確かめる場所などを入れる）。「まとめ」「はじめに」「メリット」「注意点」だけの見出しは作らない。どの記事も同じ見出しの並びにしない。
- 2つ以上のものを比べるときは表、順番のある手順は番号つきの箇条書き、条件や確認点は箇条書きにする。それ以外は文章で書く。表の見出しの行は、左上のセルも含めて、すべての列に名前を入れる。
- 「なぜそうなるのか」「現場では何を確かめるのか」「読む人は何をすればよいのか」を書く。「重要です」「おすすめです」で終わらせず、理由を書く。
- です・ます調。一文は60字以内を目安にする。自然な日本語で、決まり文句を使わない。絵文字・顔文字・「！！」は使わない。
- 本文は ${min}〜${max} 字（空白・記号を除いた字数）にする。目安は ${Math.max(min, 2000)}〜${Math.min(max, 3500)} 字。長さのための言い換えや繰り返しはしない。
- 地名（横浜・戸塚）は、地域の話に必要なところだけに書き、検索語のために繰り返さない。題名に地名を2回入れない。
- 最後の区画は、読む人が次にできること（確かめること・用意するもの・伝えること）で締める。問い合わせを強くすすめる文にしない（ページの最後に、お見積もりの案内が自動で付く）。
- 題名には、渡された主キーワードの言葉を自然な形で入れる。全角32字以内を目安にし、記号で飾らない。
- 説明文（description）は、検索結果に出る文。70〜115字で、記事で分かることを具体的に書く。
- 質問と答え（faq）は、本文で答えきれなかった関連する疑問があるときだけ0〜3個。本文の言い換えにしない。答えにリンクを入れない。

## 事実の扱い（もっとも大切な決まり）
このサイトは、確認できた事実だけを載せる方針です。記事に間違った数字や制度が1つでもあると、会社の信用を傷つけ、読む人に損をさせます。
- 金額・割合・年数・重さ・寸法・温度・日付などの数値は、下の「事実シート」に書かれているものだけを、単位も同じ形で使う。事実シートに無い数値は、どれだけ一般的に知られていても書かない（機械の検査で不合格になる）。
- 事実シートの数値は、その節の話題のとおりに使う。別の話題の数値として使わない（例：補助金の額を工事の費用として書く、ガス給湯器の年数をエコキュートの年数として書く）。
- メーカーや国・自治体の説明を使うときは、「リンナイの説明では」「ノーリツは〜としています」「国の給湯省エネ2026事業では」のように、だれの説明かを文の中に書く。
- 事実シートは、この題材に必要な節だけを渡しています。書きたい数値が渡した節に無いときは、その数値を書かない（ほかの節や一般の知識から補わない）。
- 機種や型番は、事実シートの「掲載機種の一覧」「機種の詳細」の節にあるものだけを、型番の表記のまま書く。それ以外の製品・型番・発売や生産終了の予定は書かない。
- 会社について書いてよいのは、事実シートの「会社」「当社の交換工事の進め方」の節にあることだけ。「書かないこと」の節にあることは書かない（施工事例・お客様の声・口コミ・順位・人気・当社の価格・費用の相場・節約額・保証の年数・資格・登録事業者であること など）。
- 補助金は、対象かどうかが型番・工事・申請の条件で決まり、予算の上限に達すると期限の前でも終わる、という前提で書く。「必ずもらえる」とは書かない。制度の内容は「◯年◯月◯日に公式ページで確認した内容」として、事実シートの確認日を添えて書く。「その日の制度の状態」の節が受付中でなければ、申し込める前提で書かない。
- 事実シートの「設備の基本の知識」の節にある内容は、出典を示さずに書いてよい。そこに無い技術的な説明は、数値を伴わない、広く知られた仕組みの説明にとどめる。
- 安全に関わること（ガスのにおい・煙・やけど・凍結）は、メーカーが案内している対処だけを書く。分解や、自分で修理する方法は書かない。
- sources には、本文で使った事実の出典の URL を、事実シートの「出典」の行から選んで入れる（1つ以上）。

## リンクの決まり
- 本文に、サイト内のリンクを3〜7本入れる。リンク先は「リンクできるページ」にある URL だけ。
- 渡された「親ページ」へのリンクは必ず入れる。「関連するページ」へのリンクも1本以上入れる。「関係する機種」が渡されたら、その機種のページへのリンクも1本以上入れる。
- リンクの文言は、リンク先の内容が分かる言葉にする（「こちら」は使わない）。見出しの中にはリンクを入れない。
- 外部サイトへのリンクは本文に入れない（出典は sources に入れる）。

## 使わない言葉
徹底解説／解説します／ご紹介します／見ていきましょう／いかがでしたか／参考になれば幸いです／ぜひ／と言えるでしょう／この記事では／結論から言うと／圧倒的／人気／ランキング／No.1／口コミ／評判／相場／実質◯円。`;
}

/** 書き手の system（scope は渡す節の id。いつも渡す core は sheetText が足す。事実シートの全体は渡さない） */
function writerSystem(sheet: FactSheet, scope: string[], productIds: string[], min: number, max: number): Anthropic.TextBlockParam[] {
  return [
    { type: "text", text: writerRules(min, max) },
    { type: "text", text: `## リンクできるページ\n${linkCatalog(productIds)}` },
    // ここまでが、その題材で毎回同じ内容。事実シートの終わりにキャッシュの区切りを置く（書き直しの呼び出しで再利用される）
    { type: "text", text: `## 事実シート（この記事で使ってよい節）\n\n${sheetText(sheet, scope)}`, cache_control: { type: "ephemeral" } },
  ];
}

/** その記事が主題にしてはいけない語（親ページと関連するページが担当している検索語） */
function ownedKeywordsNote(paths: string[]): string {
  const list = fixedKeywordList().filter((o) => paths.includes(o.path));
  return list.length ? `- 固定ページが担当している検索語（この記事の主題にしない。主キーワードは変えない）：${[...new Set(list.map((o) => o.keyword))].join("、")}` : "";
}

function existingList(existing: Post[]): string {
  return existing.length ? existing.map((e) => `- /blog/${e.slug} … ${e.title}（主キーワード：${e.keywords[0]}／検索意図：${e.intent}）`).join("\n") : "（まだありません）";
}

function topicBrief(topic: Topic, existing: Post[], today: string, live?: { summary: string }): string {
  const cluster = getCluster(topic.cluster)!;
  const prods = (topic.products ?? []).map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  const areas = (topic.areas ?? []).map((s) => publishedAreas.find((a) => a.slug === s)!).filter(Boolean);
  const pages = topic.pages.filter((p) => p !== cluster.pillar.href);
  return [
    "## 今回の題材",
    `- ジャンル（カテゴリ）：${cluster.name}`,
    `- 主キーワード（題名と keywords の先頭に入れる）：${topic.keyword}`,
    `- 答える検索意図：${topic.intent}`,
    `- 題名の方向（そのままでなくてよい）：${topic.titleHint}`,
    `- 書く内容：\n${topic.angle.map((a) => `  - ${a}`).join("\n")}`,
    `- 親ページ（必ずリンクする）：${cluster.pillar.href} … ${cluster.pillar.label}`,
    pages.length ? `- 関連するページ（1本以上リンクする）：${pages.map((p) => `${p}（${pageLabel(p) ?? p}）`).join("、")}` : "",
    prods.length ? `- 関係する機種（機種のページへ1本以上リンクする。型番は表記のまま）：${prods.map((p) => `${productPath(p)}（${getBrand(p.brand).name} ${p.modelNumber}）`).join("、")}` : "",
    areas.length ? `- 関係する地域ページ（文の流れに合えばリンクする）：${areas.map((a) => `/area/${a.slug}（${a.name}）`).join("、")}` : "",
    live ? `- 本日（${formatDateJa(today)}）公式ページで確かめた情報：${live.summary}。事実シートの「本日確認した公式情報」の節にある。この情報を書くときは、確かめた日（${formatDateJa(today)}）と時点を本文に必ず書き、sources にそのページを入れる` : "",
    ownedKeywordsNote([cluster.pillar.href, ...pages]),
    `- 今日の日付：${today}（制度の情報の確認日は、事実シートの各節の「確認日」を書く）`,
    "",
    "## すでにある記事（内容が重ならないようにする。関係が深ければ本文からリンクし、relatedArticles に slug を入れる）",
    existingList(existing),
  ]
    .filter(Boolean)
    .join("\n");
}

const REVIEW_SYSTEM_RULES = `あなたは、給湯器の交換工事を行う会社の公式サイトに載せる記事の、事実確認の担当者です。書き手とは別の立場で、原稿を1文ずつ読み、下の「事実シート」と照らし合わせます。

## 確かめること
1. 数値・制度・固有名詞を含む文が、事実シートの記述と一致しているか。数字、単位、条件（「〜の場合」「〜まで」）、だれの説明か、が食い違っていないか。事実シートにある数字でも、別の話題の数字として使われていれば誤り（例：補助金の額を工事の費用として書く、ガス給湯器の年数をエコキュートの年数として書く）。
2. 事実シートに無い主張が、事実として書かれていないか。ただし、事実シートの「設備の基本の知識」の節にある内容と、数値を伴わない広く知られた仕組みの説明は、問題にしない。事実シートは、この題材に必要な節だけを渡している（渡した節に無い数値は、ほかで正しくても誤りとして挙げる）。
3. 会社について、事実シートの「会社」「当社の交換工事の進め方」の節に無いこと（施工事例・お客様の声・件数・年数・保証・資格・料金・速さ・順位・登録事業者であること）が書かれていないか。
4. 事実シートの「書かないこと」の節にあることを書いていないか（補助金の約束、差し引いた金額、節約額、相場、人気・順位、掲載機種に無い製品）。
5. 安全に関わる説明（ガスのにおい・煙・やけど・凍結）が、メーカーの案内と食い違っていないか。分解や自分での修理を勧めていないか。
6. 誤字、不自然な日本語、意味の通らない文、文の途中で終わっている箇所、です・ます調でない文が無いか。
7. 最初の段落で、検索意図に答えているか。見出しが内容を表しているか。
8. 制度に触れているのに確認日が書かれていない、本日確かめた情報なのに確かめた日が書かれていない、ということが無いか。

## 判定
- 上の1〜8に当たる箇所を、issues に1件ずつ挙げる。quote には、原稿の文をそのまま抜き出す。
- 言い回しの好みや、「もっと詳しく書ける」という指摘はしない。事実・安全・日本語の誤りだけを挙げる。
- 1件も無ければ verdict は pass、1件でもあれば fail。`;

/* ------------------------------------------------------------------ */
/* API の呼び出し                                                      */
/* ------------------------------------------------------------------ */
/**
 * 1M トークンあたりの料金（USD）。費用の目安の表示に使う。
 * claude-haiku-5-5 は、入力が 100K トークンを超える呼び出しでは $0.50 / $2.50 になる（longContext）。
 */
const PRICES: Record<string, { input: number; output: number; longContext?: { over: number; input: number; output: number } }> = {
  "claude-haiku-5-5": { input: 0.1, output: 0.5, longContext: { over: 100_000, input: 0.5, output: 2.5 } },
  "claude-sonnet-5-5": { input: 2, output: 10 },
  "claude-opus-5-5": { input: 4, output: 20 },
  "claude-fable-5-1": { input: 10, output: 50 },
  "claude-haiku-4-5": { input: 1, output: 5 },
  "claude-sonnet-5": { input: 2, output: 10 },
  "claude-opus-5": { input: 5, output: 25 },
};

type UsageLike = { input_tokens: number; output_tokens: number; cache_creation_input_tokens?: number | null; cache_read_input_tokens?: number | null };

export function estimateCost(model: string, usage: UsageLike): number | null {
  const p = PRICES[model];
  if (!p) return null;
  const write = usage.cache_creation_input_tokens ?? 0;
  const read = usage.cache_read_input_tokens ?? 0;
  const totalIn = usage.input_tokens + write + read;
  const rate = p.longContext && totalIn > p.longContext.over ? p.longContext : p;
  return (usage.input_tokens * rate.input + write * rate.input * 1.25 + read * rate.input * 0.1 + usage.output_tokens * rate.output) / 1_000_000;
}

/** 書き直しでは解決しない止まり方（応答を断られた・途中で切れた） */
class StopError extends Error {}

class Session {
  private client: Anthropic | null = null;
  useFallbacks = process.env.ANTHROPIC_FALLBACKS !== "off";
  cost = 0;
  unknownPrice = new Set<string>();
  log: string[] = [];

  note(line: string) {
    this.log.push(line);
    console.log(line);
  }

  private api(): Anthropic {
    this.client ??= new Anthropic();
    return this.client;
  }

  private addCost(model: string, usage: UsageLike) {
    const c = estimateCost(model, usage);
    if (c === null) this.unknownPrice.add(model);
    else this.cost += c;
  }

  /**
   * 決まった形（schema）の JSON を返させる。長い出力に備えて、ストリーミングで受ける。
   * サーバー側の代替モデルへの切り替え（fallbacks）は、使えるモデル（FALLBACK_MODELS）のときだけ付ける。
   * それ以外のモデルでは、ベータの指定を付けずに呼ぶ。温度などのサンプリングの指定や、assistant の書き出しは使わない。
   */
  async json<T>(args: { model: string; system: Anthropic.TextBlockParam[]; user: string; schema: z.ZodType<T>; effort: "medium" | "high"; label: string }): Promise<T> {
    const base = {
      model: args.model,
      max_tokens: MAX_TOKENS,
      system: args.system,
      messages: [{ role: "user" as const, content: args.user }],
    };
    const plain = () => this.api().messages.stream({ ...base, output_config: { effort: args.effort, format: zodOutputFormat(args.schema) } }).finalMessage();

    let message: { stop_reason: string | null; usage: UsageLike; parsed_output: T | null; model: string };
    if (this.useFallbacks && FALLBACK_MODELS.has(args.model)) {
      try {
        message = await this.api()
          .beta.messages.stream({ ...base, betas: [FALLBACK_BETA], fallbacks: "default", output_config: { effort: args.effort, format: betaZodOutputFormat(args.schema) } })
          .finalMessage();
      } catch (e) {
        if (!(e instanceof Anthropic.BadRequestError)) throw e;
        this.note(`  （代替モデルへの切り替えの指定が受け付けられなかったため、指定を外してやり直します：${e.message.slice(0, 160)}）`);
        this.useFallbacks = false;
        message = await plain();
      }
    } else {
      message = await plain();
    }

    this.addCost(args.model, message.usage);
    if (message.model && message.model !== args.model) this.note(`  （${args.label}：${args.model} が応答を断ったため、${message.model} が応答しました）`);
    if (message.stop_reason === "refusal") throw new StopError(`${args.label}：モデルが応答を断りました（refusal）`);
    if (message.stop_reason === "max_tokens") throw new StopError(`${args.label}：出力が上限（max_tokens）で途中で切れました`);
    if (!message.parsed_output) throw new StopError(`${args.label}：決まった形の JSON を受け取れませんでした（stop_reason=${message.stop_reason}）`);
    return message.parsed_output;
  }
}

/* ------------------------------------------------------------------ */
/* 原稿 → 記事                                                          */
/* ------------------------------------------------------------------ */
let labels: Map<string, string> | null = null;

/** 出典の URL の名前（固定ページの出典の名前・制度の出典の名前・メーカーの製品ページ） */
function sourceLabels(): Map<string, string> {
  if (labels) return labels;
  const map = new Map<string, string>();
  for (const list of Object.values(subsidySources)) for (const s of list) map.set(s.url, s.label);
  for (const s of AREA_STAT_SOURCES) map.set(s.url, s.label);
  for (const p of allContentPages()) for (const s of p.sources ?? []) if (!map.has(s.url)) map.set(s.url, s.label);
  for (const a of publishedAreas) for (const s of a.sources) if (!map.has(s.url)) map.set(s.url, s.label);
  for (const p of products) if (!map.has(p.manufacturerUrl)) map.set(p.manufacturerUrl, `${getBrand(p.brand).name}「${p.series}」（公式の製品ページ）`);
  labels = map;
  return map;
}

/** 原稿が挙げた出典の URL を、名前と確認日つきの形にする */
export function toSources(urls: string[], sheet: FactSheet, today: string): ArticleDraft["sources"] {
  return [...new Set(urls.map((u) => u.trim()).filter(Boolean))].map((url) => {
    const section = sheet.sections.find((s) => s.sources.includes(url));
    let host = url;
    try {
      host = new URL(url).hostname.replace(/^www\./, "");
    } catch {
      /* 形の正しくない URL は、あとの検査で不合格になる */
    }
    const title = sourceLabels().get(url) ?? (section ? `${section.title.replace(/^本日確認した公式情報：/, "")}（${host}）` : host);
    return { title, url, checkedAt: section?.live ? today : section?.checkedAt || today };
  });
}

/** 主キーワードを必ず先頭にした keywords */
function withPrimary(primary: string, rest: string[]): string[] {
  return [primary, ...rest.map((k) => k.trim()).filter((k) => k && normalizeKeyword(k) !== normalizeKeyword(primary))].filter((k, i, a) => a.indexOf(k) === i).slice(0, 6);
}

/** 本文からリンクしている機種の id */
function linkedProducts(body: string): string[] {
  const linked = new Set(internalLinkPaths(body));
  return products.filter((p) => linked.has(productPath(p))).map((p) => p.id);
}

/** 新しい記事：原稿に、題材で決めた項目（slug・カテゴリ・主キーワード・日付など）を足す */
export function toDraft(out: ArticleOutput, topic: Topic, sheet: FactSheet, today: string, opts: { live?: boolean; existing?: Pick<Post, "slug">[] } = {}): ArticleDraft {
  const body = out.body.trim();
  const linked = linkedProducts(body);
  const relatedProducts = (linked.length ? linked : (topic.products ?? [])).slice(0, 4);
  const cluster = getCluster(topic.cluster)!;
  return {
    title: out.title.trim(),
    slug: topic.slug,
    description: out.description.trim(),
    category: topic.cluster,
    keywords: withPrimary(topic.keyword, out.keywords),
    intent: topic.intent,
    publishedAt: today,
    updatedAt: today,
    author: siteConfig.editorial.author,
    faq: out.faq.map((f) => ({ q: f.q.trim(), a: f.a.trim() })),
    relatedPages: [...new Set(topic.pages.filter((p) => p !== cluster.pillar.href))].slice(0, 6),
    relatedProducts,
    relatedAreas: topic.areas ?? [],
    relatedArticles: opts.existing ? out.relatedArticles.filter((s) => opts.existing!.some((e) => e.slug === s)) : out.relatedArticles,
    sources: toSources(out.sources, sheet, today),
    generated: true,
    ...(topic.figure ? { figure: topic.figure } : {}),
    ...(opts.live ? { liveCheckedAt: today } : {}),
    body,
  };
}

/**
 * 見直し：公開済みの記事の項目（slug・カテゴリ・主キーワード・検索意図・公開日・図など）はそのままに、
 * 題名・説明文・本文・質問と答え・関連記事・出典だけを原稿のものに替え、更新日を今日にする。
 */
export function toRefreshedDraft(out: ArticleOutput, post: Post, sheet: FactSheet, today: string): ArticleDraft {
  const { body: _body, cluster: _cluster, cover: _cover, length: _length, headings: _headings, ...front } = post;
  void _body;
  void _cluster;
  void _cover;
  void _length;
  void _headings;
  const body = out.body.trim();
  const linked = linkedProducts(body);
  return {
    ...front,
    title: out.title.trim(),
    description: out.description.trim(),
    keywords: withPrimary(post.keywords[0], out.keywords),
    faq: out.faq.map((f) => ({ q: f.q.trim(), a: f.a.trim() })),
    relatedProducts: (linked.length ? linked : post.relatedProducts).filter((id) => products.some((p) => p.id === id)).slice(0, 4),
    relatedArticles: out.relatedArticles,
    sources: toSources(out.sources, sheet, today),
    updatedAt: today,
    body,
  };
}

export function toMarkdown(draft: ArticleDraft): string {
  const { body, ...front } = draft;
  // 値の無い項目（figure を指定していない記事など）は書き出さない
  const data = Object.fromEntries(Object.entries(front).filter(([, v]) => v !== undefined && v !== null));
  return matter.stringify(`\n${body}\n`, data);
}

function toOutput(d: { title: string; description: string; keywords: string[]; body: string; faq: { q: string; a: string }[]; relatedArticles: string[]; sources: { url: string }[] }): ArticleOutput {
  return { title: d.title, description: d.description, keywords: d.keywords, body: d.body, faq: d.faq, relatedArticles: d.relatedArticles, sources: d.sources.map((x) => x.url) };
}

/* ------------------------------------------------------------------ */
/* 本体                                                                */
/* ------------------------------------------------------------------ */
/** 1回の実行で行う作業（新しい記事／見直し）。書く → 検査 → 読み直し → 保存 の流れは、どちらも同じ */
type Job = {
  mode: GenerateMode;
  slug: string;
  headline: string;
  brief: string;
  ask: string;
  build: (out: ArticleOutput) => ArticleDraft;
  /** 検査の範囲（数値を使ってよい節の id。undefined は事実シート全体） */
  scope: string[] | undefined;
  /** 書き手・読み直しの担当に渡す節の id（いつも渡す core は scopeIds が足す）。事実シートの全体は渡さない */
  promptScope: string[];
  sheet: FactSheet;
  productIds: string[];
  validation: Omit<ValidationContext, "sheet" | "existing" | "factSections">;
  others: Post[];
  reviewNote: string;
  extraCheck?: (draft: ArticleDraft) => string[];
};

function newJob(topic: Topic, existing: Post[], sheet: FactSheet, today: string, live?: { summary: string; sources: string[] }): Job {
  const cluster = getCluster(topic.cluster)!;
  const scope = scopeForTopic(topic, !!live);
  const length = topic.length ?? { min: BODY_MIN, max: BODY_MAX };
  return {
    mode: "new",
    slug: topic.slug,
    headline: `新しい記事：${topic.slug}（${cluster.genre}. ${cluster.name}・${topic.priority}${live ? "・本日の公式情報つき" : ""}）… ${topic.intent}`,
    brief: topicBrief(topic, existing, today, live),
    ask: "上の題材で、記事を書いてください。",
    build: (out) => toDraft(out, topic, sheet, today, { live: !!live, existing }),
    scope,
    promptScope: scope,
    sheet,
    productIds: topic.products ?? [],
    validation: { topic: { pages: topic.pages, products: topic.products, length }, ...(live ? { live: { checkedAt: today, sources: live.sources } } : {}) },
    others: existing,
    reviewNote: `- 答える検索意図：${topic.intent}\n- この記事で数値を使ってよい事実シートの節：${scope.join("、")}${live ? `\n- 本日（${formatDateJa(today)}）公式ページで確かめた情報を使う記事（確かめた日が本文にあるか）` : ""}`,
  };
}

function refreshJob(post: Post, reasons: RefreshReason[], existing: Post[], sheet: FactSheet, today: string): Job {
  const cluster = getCluster(post.category)!;
  const topic = getTopic(post.slug);
  // 数値を使ってよい節：自動生成の記事は、題材で決めた節。手書きの記事は、事実シート全体（公開済みの記事の点検と同じ基準）
  const scope = post.generated && topic ? scopeForTopic(topic) : undefined;
  // 書き手に渡す節は、どちらの記事でも絞る（手書きの記事は、出典・数値・機種から選ぶ）
  const promptScope = scope ?? scopeForPost(post, sheet);
  const others = existing.filter((p) => p.slug !== post.slug);
  const brief = [
    "## 今回の作業：公開済みの記事の見直し（新しい記事は書かない）",
    `- 記事：/blog/${post.slug} … ${post.title}`,
    `- カテゴリ：${cluster.name}`,
    `- 主キーワード（変えない）：${post.keywords[0]}`,
    `- 答える検索意図（変えない）：${post.intent}`,
    `- 親ページ：${cluster.pillar.href} … ${cluster.pillar.label}`,
    `- 数値を使ってよい事実シートの節：${scope ? scope.join("、") : `下に渡した節（${promptScope.join("、")}。記事の話題に合う節の数値だけを使う）`}`,
    `- 今日の日付：${today}`,
    "",
    "## 見直す理由（すべてに対応する）",
    ...reasons.map((r, i) => `${i + 1}. ${r.instruction}`),
    "",
    "## 見直しの決まり",
    "- 上の理由に関係する箇所だけを直す。関係のない文は、一字も変えない（全体を書き直すと、別の場所に新しい誤りが入るため）。",
    "- 題名と説明文は、内容が変わって合わなくなったときだけ直す。",
    "- 直す所が無いと判断したら、いまの記事をそのまま返す。日付だけを新しくするための書き換えはしない。",
    "",
    "## ほかの記事（内容が重ならないようにする）",
    existingList(others),
    "",
    "## いまの記事",
    "```json",
    JSON.stringify(toOutput(post), null, 2),
    "```",
  ].join("\n");
  return {
    mode: "refresh",
    slug: post.slug,
    headline: `見直し：${post.slug}（${cluster.name}）… 理由 ${reasons.length} 件\n${reasons.map((r) => `  - ${r.instruction}`).join("\n")}`,
    brief,
    ask: "上の理由に沿って、いまの記事を見直してください。",
    build: (out) => toRefreshedDraft(out, post, sheet, today),
    scope,
    promptScope,
    sheet,
    productIds: post.relatedProducts,
    validation: topic ? { topic: { pages: topic.pages, products: topic.products, length: topic.length } } : {},
    others,
    reviewNote: `- 公開済みの記事の見直し\n- 答える検索意図：${post.intent}\n- この記事で数値を使ってよい事実シートの節：${promptScope.join("、")}`,
    extraCheck: (draft) => {
      const problems = reasons.filter((r) => !r.resolved(draft)).map((r) => `見直す理由に対応できていません：${r.instruction}`);
      if (!problems.length && !bodyChanged(post.body, draft.body)) problems.push("本文が変わっていません。見直す理由に対応する変更を、本文に入れてください（日付だけの更新はしません）。");
      return problems;
    },
  };
}

/** 確認用の原稿（fixture）の読み込み。1つでも、書き直しの回ごとの配列でもよい。"$topic" で題材を指定できる */
function readFixture(file: string): { outputs: unknown[]; topic?: string } {
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as unknown;
  const list = Array.isArray(raw) ? raw : [raw];
  const first = list[0] as { $topic?: unknown } | undefined;
  return { outputs: list, topic: typeof first?.$topic === "string" ? first.$topic : undefined };
}

export async function generatePost(opts: { fetcher?: Fetcher } = {}): Promise<GenerateResult> {
  const today = todayJst();
  const existing = getAllPosts();
  const fixture = process.env.DRY_RUN_FIXTURE;
  // 確認用の原稿（fixture）は、公開する記事ではない。DRY_RUN を付け忘れても保存しない
  const dryRun = process.env.DRY_RUN === "1" || !!fixture;
  const session = new Session();
  const skipped = (reason: string): GenerateResult => ({ status: "skipped", reason, log: session.log });
  const blocked = (reason: string): GenerateResult => ({ status: "blocked", reason, log: session.log });

  const fx = fixture ? readFixture(fixture) : null;
  const topicOverride = process.env.TOPIC || fx?.topic;
  const forced = process.env.FORCE || topicOverride || process.env.REFRESH;
  if (!forced && existing.some((p) => p.publishedAt === today || p.updatedAt === today)) {
    return skipped(`今日（${today}）は、すでに記事を公開または更新しています（1日1本。予定の時刻より遅れて動いた回・2回目の実行でも、重ねて公開しない）`);
  }

  const baseSheet = loadFactSheet();
  const target = topicOverride ? null : pickRefreshTarget(existing, baseSheet, today, process.env.REFRESH);
  const ranked = process.env.REFRESH ? [] : topicOverride ? [getTopic(topicOverride)].filter((t): t is Topic => !!t) : rankTopics(existing, today);
  const mode: GenerateMode = topicOverride ? "new" : process.env.REFRESH ? "refresh" : decideMode(today, !!target, ranked.length > 0);

  let job: Job;
  if (mode === "refresh") {
    if (!target) return skipped(process.env.REFRESH ? `記事 ${process.env.REFRESH} がありません` : "見直す理由のある記事がありません（日付だけの更新はしません）");
    if (!target.reasons.length) return skipped(`記事 ${target.post.slug} には、見直す理由がありません（日付だけの更新はしません）`);
    job = refreshJob(target.post, target.reasons, existing, baseSheet, today);
  } else {
    if (topicOverride && !ranked.length) return blocked(`題材 ${topicOverride} が topics.ts にありません`);
    if (!ranked.length) return blocked("今日書ける題材が残っていません（lib/blog-generator/topics.ts に題材を足すか、backlog.ts の候補を題材に上げてください）");
    let topic = ranked[0];
    if (topicOverride && existing.some((p) => p.slug === topic.slug)) return blocked(`題材 ${topic.slug} の記事はすでにあります`);
    if (topicOverride) {
      const why = topicBlocker(topic, existing.filter((p) => p.slug !== topic.slug), today);
      if (why) session.note(`  （指定された題材のため、「${why}」でも書きます）`);
    }
    let live: { summary: string; sources: string[]; markdown: string } | undefined;
    if (topic.live) {
      if (fixture) {
        session.note(`題材 ${topic.slug} は、その日に公式ページを確かめる題材です。確認用の原稿のため、公式ページは取りに行きません`);
      }
      const r = fixture ? ({ ok: false, reason: "確認用の原稿のため、公式ページを取りに行きません" } as const) : await fetchLive(topic.live, today, opts.fetcher);
      if (r.ok) {
        live = r;
        session.note(`本日の公式情報を確かめました：${r.summary}`);
      } else {
        session.note(`題材 ${topic.slug} の公式情報を確かめられませんでした：${r.reason}`);
        if (topicOverride) return blocked(`指定された題材 ${topic.slug} は、その日の公式情報を確かめられた日だけ書けます：${r.reason}`);
        const evergreen = ranked.find((t) => !t.live);
        if (!evergreen) return blocked(`公式情報を確かめられず、代わりに書ける普遍的な題材もありません：${r.reason}`);
        session.note(`代わりに、普遍的な題材 ${evergreen.slug} を書きます`);
        topic = evergreen;
      }
    }
    const sheet = live ? withLiveSections(baseSheet, live.markdown) : baseSheet;
    const missing = scopeForTopic(topic, !!live).filter((t) => !sectionsFor(sheet, [t]).length);
    if (missing.length) return blocked(`題材 ${topic.slug} の事実シートの節が見つかりません：${missing.join("、")}（docs/VERIFIED_FACTS.md と topics.ts の facts を確かめてください）`);
    job = newJob(topic, existing, sheet, today, live);
  }

  const ctx: ValidationContext = { sheet: job.sheet, existing: job.others, factSections: job.scope, ...job.validation };
  session.note(job.headline);
  session.note(fixture ? `確認用の原稿を使います：${fixture}` : `書くモデル：${WRITER_MODEL}／読み直すモデル：${REVIEW_MODEL}`);

  const min = ctx.topic?.length?.min ?? BODY_MIN;
  const max = ctx.topic?.length?.max ?? BODY_MAX;
  const system = writerSystem(job.sheet, job.promptScope, job.productIds, min, max);
  const passed = sectionsFor(job.sheet, scopeIds(job.promptScope));
  session.note(
    `書き手に渡す事実シート：${passed.length}節・${Buffer.byteLength(sheetText(job.sheet, job.promptScope), "utf8").toLocaleString()}バイト（いつも渡す節＋${job.promptScope.join("・") || "なし"}）`,
  );
  const base = { mode: job.mode, slug: job.slug };

  let draft: ArticleDraft | undefined;
  let problems: string[] = [];
  let attempts = 0;

  try {
    for (attempts = 1; attempts <= MAX_ATTEMPTS; attempts++) {
      /* 書く／書き直す */
      let out: ArticleOutput;
      if (fx) {
        const next = fx.outputs[attempts - 1];
        if (!next) {
          attempts -= 1; // 確認用の原稿が尽きた（この回は書いていない）
          break;
        }
        out = ArticleSchema.parse(next);
      } else if (!draft) {
        out = await session.json({ model: WRITER_MODEL, system, user: `${job.brief}\n\n${job.ask}`, schema: ArticleSchema, effort: "high", label: `試行${attempts}（執筆）` });
      } else {
        out = await session.json({
          model: WRITER_MODEL,
          system,
          user: `${job.brief}\n\n## 前回の原稿\n\`\`\`json\n${JSON.stringify(toOutput(draft), null, 2)}\n\`\`\`\n\n## 直してほしい点\n${problems.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\n前回の原稿を、上の点だけ直してください。指摘されていない文は、一字も変えないでください（全体を書き直すと、別の場所に新しい誤りが入るためです）。数値を直すときは、事実シートの記述に合わせるか、その文を削ってください。`,
          schema: ArticleSchema,
          effort: "high",
          label: `試行${attempts}（書き直し）`,
        });
      }
      draft = job.build(out);

      /* 機械の検査 */
      const v = validateArticle(draft, ctx);
      const extra = v.ok ? (job.extraCheck?.(draft) ?? []) : [];
      if (!v.ok || extra.length) {
        problems = v.ok ? extra : v.errors;
        session.note(`試行${attempts}：機械の検査で不合格（${v.length}字）\n${problems.map((e) => `  - ${e}`).join("\n")}`);
        continue;
      }
      v.warnings.forEach((w) => session.note(`  注意：${w}`));

      /* 読み直し */
      if (fx) {
        session.note(`試行${attempts}：機械の検査に合格（${v.length}字）。確認用の原稿のため、読み直し（API）は行いません`);
      } else {
        const review: ReviewOutput = await session.json({
          model: REVIEW_MODEL,
          system: [
            { type: "text", text: REVIEW_SYSTEM_RULES },
            { type: "text", text: `## 事実シート（この記事で使ってよい節）\n\n${sheetText(job.sheet, job.promptScope)}`, cache_control: { type: "ephemeral" } },
          ],
          user: `## 題材\n${job.reviewNote}\n\n## 原稿\n### 題名\n${draft.title}\n\n### 説明文\n${draft.description}\n\n### 本文\n${draft.body}\n\n### 質問と答え\n${draft.faq.map((q) => `Q. ${q.q}\nA. ${q.a}`).join("\n\n") || "（なし）"}\n\n### 出典として挙げた URL\n${draft.sources.map((x) => `- ${x.url}`).join("\n") || "（なし）"}\n\nこの原稿を確かめてください。`,
          schema: ReviewSchema,
          effort: "high",
          label: `試行${attempts}（読み直し）`,
        });
        if (review.verdict === "fail" || review.issues.length) {
          problems = review.issues.length ? review.issues.map((i) => `「${i.quote}」… ${i.problem} → ${i.fix}`) : ["読み直しの担当が不合格としましたが、理由が示されませんでした。事実シートに無い主張がないか、全体を確かめてください。"];
          session.note(`試行${attempts}：読み直しで不合格\n${problems.map((p) => `  - ${p}`).join("\n")}`);
          continue;
        }
        session.note(`試行${attempts}：機械の検査と読み直しに合格（${v.length}字）`);
      }

      /* 保存 */
      const file = path.join(BLOG_DIR, `${draft.slug}.md`);
      const liveNote = job.validation.live ? `本日の公式情報（${job.validation.live.sources.join("・")}）` : undefined;
      if (dryRun) {
        session.note(`（${fx ? "確認用の原稿" : "DRY_RUN"}のため保存しません）\n----- 原稿 -----\n${toMarkdown(draft)}`);
        return { status: "dry-run", ...base, draft, file, attempts, cost: session.cost, log: session.log, live: liveNote };
      }
      fs.mkdirSync(BLOG_DIR, { recursive: true });
      fs.writeFileSync(file, toMarkdown(draft), "utf8");
      session.note(`保存しました：content/blog/${draft.slug}.md`);
      return { status: "published", ...base, draft, file, attempts, cost: session.cost, log: session.log, live: liveNote };
    }
  } catch (e) {
    if (e instanceof StopError) {
      return { status: "rejected", ...base, reason: e.message, problems: [e.message], attempts, cost: session.cost, log: session.log, lastDraft: draft };
    }
    throw e;
  } finally {
    if (session.unknownPrice.size) session.note(`  （料金表に無いモデルのため、費用の目安に含めていません：${[...session.unknownPrice].join("、")}）`);
  }

  const tried = Math.min(attempts, MAX_ATTEMPTS);
  return {
    status: "rejected",
    ...base,
    reason:
      job.mode === "refresh"
        ? `${tried}回直しても基準を満たさなかったため、記事は元のままにします（日付も更新しません）`
        : `${tried}回書いても基準を満たさなかったため、今日は公開しません`,
    problems,
    attempts: tried,
    cost: session.cost,
    log: session.log,
    lastDraft: draft,
  };
}
