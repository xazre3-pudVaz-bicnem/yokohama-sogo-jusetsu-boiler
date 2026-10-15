import { publishedAreas } from "@/data/areas";
import type { Block } from "@/data/content-types";
import { bodyLength, type Post } from "@/lib/blog";
import { getCluster } from "@/lib/blog-clusters";
import { allowedSourceUrls, scopeIds, sectionsFor, unknownNumericTokens, type FactSheet } from "@/lib/blog-generator/facts";
import { fixedKeywordOwner, normalizeKeyword } from "@/lib/blog-generator/keywords";
import { unknownModelTokens } from "@/lib/blog-generator/model-numbers";
import { diceBigram, shingleOverlap } from "@/lib/blog-generator/similarity";
import { postFrontmatterSchema, type PostFrontmatter } from "@/lib/blog-schema";
import { allContentPages, contentPagePath } from "@/lib/content";
import { productPath, products } from "@/lib/products";
import { knownPaths } from "@/lib/routes";
import { formatDateJa } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { fillTokens } from "@/lib/tokens";

/**
 * 記事の品質の検査（機械で確かめられる部分）。
 *
 * 自動生成のときと、公開済みの記事の点検（npm run blog:audit）で、必ずこの同じ関数を使う。
 * 規則を2か所に書くと、生成では通ったのに点検で落ちる（またはその逆）が起きるため。
 * 規則を足したら、npm run blog:selftest と npm run blog:audit で、良い記事が誤って落ちないかを確かめること。
 *
 * errors   … 1つでもあれば公開しない
 * warnings … 公開はできるが、読み直しのときに見てほしい点
 */
export type ArticleDraft = PostFrontmatter & { body: string };
export type ValidationResult = { ok: boolean; errors: string[]; warnings: string[]; length: number };

/** 本文の長さの既定（空白・記号を除く字数）。目安は 2,000〜3,500 字。題材の length で変えられる */
export const BODY_MIN = 1800;
export const BODY_MAX = 3800;

export type ValidationContext = {
  sheet: FactSheet;
  /** 公開済みの記事（重複の判定に使う）。点検のときは自分自身を除いて渡す */
  existing: Pick<Post, "slug" | "title" | "intent" | "body" | "keywords">[];
  /**
   * この記事で数値・出典を使ってよい事実シートの節の id（題材の facts・機種の節・その日に確かめた節）。
   * 数値は、まず事実シート全体と突き合わせ、渡したときは、さらに、いつも渡す節（core）と、ここに挙げた節の数値だけを通す。
   * 渡さないとき（手書きの記事の点検）は、事実シート全体とだけ突き合わせる。
   */
  factSections?: string[];
  /** 題材で決めたこと（自動生成のとき）。リンクの確認に使う */
  topic?: { pages: string[]; products?: string[]; length?: { min: number; max: number } };
  /** その日に公式ページで確かめた情報を使う記事（live）のとき：確かめた日と、確かめたページ */
  live?: { checkedAt: string; sources: string[] };
};

/* ------------------------------------------------------------------ */
/* 使えない表現                                                        */
/* ------------------------------------------------------------------ */
type Rule = { re: RegExp; why: string };

/** 中身の無い決まり文句・根拠を示せない売り文句・約束（1つでもあれば不合格） */
const BANNED: Rule[] = [
  { re: /徹底(?:解説|比較|ガイド)/, why: "「徹底解説」の類は使わない" },
  { re: /解説(?:します|していきます|いたします)|(?:ご紹介|紹介)(?:します|していきます|いたします)|お伝えしていきます/, why: "「解説します」と予告せず、すぐに中身を書く" },
  { re: /見ていきましょう|確認していきましょう|チェックしていきましょう|みていきましょう/, why: "「〜していきましょう」は使わない" },
  { re: /いかがでした(?:でしょう)?か/, why: "「いかがでしたか」は使わない" },
  { re: /参考に(?:なれば幸い|していただければ|してみてください)/, why: "「参考になれば幸いです」の類は使わない" },
  { re: /ぜひ(?:ご検討|参考|チェック|お試し|ご相談|お問い合わせ|ご利用)/, why: "「ぜひ〜」の呼びかけは使わない" },
  { re: /と言えるでしょう|といえるでしょう/, why: "あいまいな言い切り（〜と言えるでしょう）は使わない" },
  { re: /この記事では|本記事では|今回の記事|当記事/, why: "「この記事では」と記事そのものに触れる前置きは書かない" },
  { re: /まとめると、|結論から言うと|結論から申し上げ|結論として/, why: "決まり文句の前置きは使わない" },
  { re: /No\.?\s*1|ナンバーワン|ナンバー1|日本一|地域一番|業界(?:最安|初|トップ)|最安値?|圧倒的|ランキング|[0-9０-９]+\s*位|人気(?:の|が|No|機種|商品|メーカー|ナンバー)|売れ筋|一番人気/, why: "順位・人気・最上級の表現は使わない（根拠を示せない）" },
  { re: /満足度|リピート率|口コミ|クチコミ|評判|レビュー|お客様の声|喜びの声|星\s*[0-9０-９]/, why: "口コミ・評判・満足度は書かない（このサイトに無い。作らない）" },
  {
    re: /実績多数|豊富な実績|多数の実績|数多くの(?:実績|施工)|施工実績|(?:実績|件数|累計|年間)\s*(?:は|が|で)?\s*約?\s*[0-9０-９,，.]+\s*万?\s*件|[0-9０-９,，.]+\s*万?\s*件(?:以上|超)?の(?:実績|施工|工事)/,
    why: "施工の件数・実績の多さは書かない（確認できていない）",
  },
  {
    re: /(?:当社|弊社|私たち|わたしたち)(?:が|で|の)(?:施工|交換|担当|工事)した|(?:当社|弊社)の(?:施工事例|事例|お客様)|施工事例(?:では|として|をご紹介)|(?:先日|以前|これまでに)[^。]{0,20}(?:お客様|ご依頼|ご相談|現場)/,
    why: "当社の施工事例・お客様とのやりとりは書かない（このサイトにまだ無い。作らない）",
  },
  { re: /創業\s*[0-9０-９]|[0-9０-９]+\s*年の(?:実績|歴史|経験)|[0-9０-９]+\s*年(?:間)?(?:の)?(?:工事)?保証|保証\s*[0-9０-９]+\s*年|長期保証|安心保証/, why: "創業年・経験年数・工事の保証の年数は書かない（確認できていない）" },
  { re: /有資格者が|国家資格を持つ|資格を持った(?:スタッフ|職人)|[一二12]級(?:管工事施工管理技士|配管技能士|技能士)|第[一二]種電気工事士|ガス機器設置スペシャリスト|液化石油ガス設備士/, why: "当社の資格は書かない（確認できていない）" },
  { re: /当社調べ|弊社調べ|独自調査/, why: "自社調べの数字は書かない" },
  { re: /絶対に(?:安|お得|損)|必ず(?:得|安く|お得|もらえ|受け取れ|対象)|確実に(?:もらえ|受け取れ|対象|補助|安く)|(?:補助金|補助)(?:が|は)?(?:必ず|確実に)|100\s*[%％]\s*(?:もらえ|対象|補助)/, why: "補助金や価格についての約束は書かない（条件と予算しだいで、保証できない）" },
  { re: /最短\s*[0-9０-９]+\s*(?:分|時間|日)|即日(?:対応|工事|施工|交換)|24時間(?:対応|受付|365)|すぐに駆けつけ|駆けつけます/, why: "対応の速さの約束は書かない（確認できていない）" },
  { re: /相場|費用の目安は|価格の目安は|平均(?:的な)?(?:費用|価格|金額)|工事費込み\s*[0-9０-９]|[0-9０-９,，]+\s*円(?:から|〜|～)|[0-9０-９]+\s*万円(?:から|〜|～)(?:で|の)?(?:交換|工事|設置)/, why: "費用の相場・金額の目安は書かない（当社の価格はお見積もりで示す）" },
  { re: /実質\s*[0-9０-９]|実質(?:負担|価格)(?:は|が)|差し引くと|補助(?:金|額)を(?:引く|差し引)/, why: "補助額を差し引いた金額は書かない" },
  { re: /(?:年間|毎月|月々|1年で|一年で)[^。]{0,15}[0-9０-９,，]+\s*円(?:の|も|ほど)?(?:節約|お得|安く|削減)|[0-9０-９,，]+\s*円(?:の|も)?(?:節約|削減)/, why: "光熱費の節約額は書かない（料金のプランと使い方で大きく変わる）" },
  {
    re: /分解して(?:掃除|点検|修理|確かめ)|カバーを外して(?:掃除|点検|修理|確かめ)|自分で(?:修理|分解)(?:する方法|する手順|できます|しましょう|してみ)/,
    why: "分解・自分での修理の手順は書かない（メーカーが案内している操作だけを書く）",
  },
];

/** 当社が登録事業者だと受け取れる書き方（登録を確認できるまで不合格） */
const REGISTRATION: Rule = {
  re: /(?:当社|弊社|横浜総合住設|ヨコジュウ)(?:は|が)[^。]{0,20}(?:登録事業者|給湯省エネ事業者)(?:です|として|に登録|の登録を)|(?:当社|弊社|横浜総合住設|ヨコジュウ)(?:は|が)[^。]{0,10}登録(?:済み|ずみ|されて)|(?:当社|弊社)が[^。]{0,8}(?:交付)?申請(?:します|いたします|を行います|を行い|の手続きを行|を代行)|申請を代行(?:します|いたします)/,
  why: "当社が給湯省エネ2026事業の登録事業者であるとは書かない（確認できていない）。「申請のサポートを承っている」まで",
};

/** 使いすぎると中身が薄くなる言い回し（回数の上限） */
const LIMITED: { re: RegExp; max: number; label: string }[] = [
  { re: /重要です/g, max: 1, label: "重要です" },
  { re: /おすすめです|お勧めです/g, max: 1, label: "おすすめです" },
  { re: /大切です/g, max: 2, label: "大切です" },
  { re: /ポイントです/g, max: 1, label: "ポイントです" },
  { re: /一般的に/g, max: 2, label: "一般的に" },
  { re: /でしょう。/g, max: 2, label: "〜でしょう。" },
  { re: /安心です/g, max: 1, label: "安心です" },
];

/** 内容を表さない見出し */
const GENERIC_HEADING = /^(?:まとめ|はじめに|おわりに|最後に|さいごに|概要|ポイント|注意点|メリット|デメリット|特徴|結論|その他|補足|よくある質問)$/;

/* ------------------------------------------------------------------ */
/* 補助の関数                                                          */
/* ------------------------------------------------------------------ */
function markdownLinks(body: string): { text: string; href: string }[] {
  return [...body.matchAll(/(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g)].map((m) => ({ text: m[1], href: m[2] }));
}

function pathOf(href: string): string {
  return href.split(/[?#]/)[0].replace(/(.)\/$/, "$1") || "/";
}

function blockText(b: Block): string {
  switch (b.type) {
    case "p":
      return b.text;
    case "list":
      return b.items.join("\n");
    case "steps":
      return b.items.map((s) => `${s.title}\n${s.text}`).join("\n");
    case "table":
      return [b.caption ?? "", b.head.join(" "), ...b.rows.map((r) => r.join(" ")), b.note ?? ""].join("\n");
    case "callout":
      return `${b.title ?? ""}\n${b.text}`;
    case "dl":
      return b.items.map((i) => `${i.term}\n${i.desc}`).join("\n");
    case "links":
      return b.items.map((i) => `${i.label} ${i.note ?? ""}`).join("\n");
    case "note":
      return `${b.label}\n${b.text}`;
    default:
      return "";
  }
}

let fixedTexts: { path: string; text: string }[] | null = null;

/** 固定ページ（解説のページ）の本文（記事が固定ページの文章を写していないかの判定に使う） */
export function fixedPageTexts(): { path: string; text: string }[] {
  if (fixedTexts) return fixedTexts;
  fixedTexts = allContentPages().map((p) => ({
    path: contentPagePath(p),
    text: fillTokens([p.lead, ...p.sections.flatMap((s) => [s.heading, ...s.blocks.map(blockText)]), ...(p.faqs ?? []).flatMap((f) => [f.q, f.a])].join("\n")),
  }));
  return fixedTexts;
}

/** 地名の数（社名の中の「横浜」は数えない） */
function placeCount(text: string): { yokohama: number; totsuka: number } {
  const t = text.split(siteConfig.name).join("").split(siteConfig.shortName).join("").split("戸塚オフィス").join("");
  return { yokohama: (t.match(/横浜/g) ?? []).length, totsuka: (t.match(/戸塚/g) ?? []).length };
}

/* ------------------------------------------------------------------ */
/* 本体                                                                */
/* ------------------------------------------------------------------ */
export function validateArticle(draft: ArticleDraft, ctx: ValidationContext): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  /* 1. 形式 */
  const { body, ...front } = draft;
  const parsed = postFrontmatterSchema.safeParse(front);
  if (!parsed.success) for (const i of parsed.error.issues) errors.push(`形式: ${i.path.join(".")} … ${i.message}`);
  const cluster = getCluster(draft.category);
  if (!cluster) errors.push(`カテゴリ ${draft.category} がありません`);

  /* 2. 長さ・見出し・表 */
  const length = bodyLength(body);
  const min = ctx.topic?.length?.min ?? BODY_MIN;
  const max = ctx.topic?.length?.max ?? BODY_MAX;
  if (length < min) errors.push(`本文が短すぎます（${length}字。${min}字以上にする。水増しではなく、読者が知りたい内容を足す）`);
  if (length > max) errors.push(`本文が長すぎます（${length}字。${max}字以内にする。同じ内容の言い換えを削る）`);
  const lines = body.split(/\r?\n/);
  const h1 = lines.filter((l) => /^#\s/.test(l));
  const h2 = lines.filter((l) => /^##\s/.test(l));
  if (h1.length) errors.push("本文に # の見出し（h1）を使わない（ページの題名が h1）。見出しは ## から始める");
  if (h2.length < 4) errors.push(`## の見出しが${h2.length}個しかありません（4〜8個にする）`);
  if (h2.length > 8) errors.push(`## の見出しが${h2.length}個あります（4〜8個にする）`);
  for (const h of lines.filter((l) => /^#{2,4}\s/.test(l))) {
    const text = h.replace(/^#+\s*/, "").trim();
    if (/\]\(/.test(h)) errors.push(`見出しの中にリンクを入れない：${h}`);
    if (GENERIC_HEADING.test(text)) errors.push(`内容を表さない見出し「${text}」は使わない（何が分かる区画かを、具体的な言葉で書く）`);
    if (text.length < 6) warnings.push(`見出しが短すぎます（内容が分かる言葉にする）：${text}`);
  }
  if (/^\s*#/.test(body.trimStart().split(/\r?\n/)[0] ?? "")) errors.push("本文が見出しから始まっています（最初に、読者の疑問への答えを書いた導入の段落を置く）");
  // 表の見出しの行（区切りの行 | --- | のすぐ上）に、空のセルを作らない（読み上げで、何の列かが分からなくなる）
  lines.forEach((line, i) => {
    if (!/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[i + 1] ?? "")) return;
    const cells = line.trim().replace(/^\||\|$/g, "").split("|");
    if (cells.some((c) => !c.trim())) errors.push(`表の見出しの行に、空のセルがあります（すべての列に名前を入れる。左上なら「比べる点」など）：${line.trim().slice(0, 40)}`);
  });

  /* 3. 決まり文句・売り文句・約束・文体 */
  const allText = [draft.title, draft.description, body, ...draft.faq.flatMap((f) => [f.q, f.a])].join("\n");
  for (const b of BANNED) {
    const m = b.re.exec(allText);
    if (m) errors.push(`使えない表現「${m[0].slice(0, 24)}」… ${b.why}`);
  }
  if (siteConfig.subsidyOperator.registered !== true) {
    const m = REGISTRATION.re.exec(allText);
    if (m) errors.push(`使えない表現「${m[0].slice(0, 30)}」… ${REGISTRATION.why}`);
  }
  for (const l of LIMITED) {
    const n = (allText.match(l.re) ?? []).length;
    if (n > l.max) errors.push(`「${l.label}」が${n}回あります（${l.max}回まで。言い換えるのではなく、理由や具体例を書く）`);
  }
  const plain = (body.match(/(?:である|だ)。/g) ?? []).length;
  const polite = (body.match(/(?:です|ます|でした|ました|ません|ください)。/g) ?? []).length;
  if (plain >= 2) errors.push(`「〜だ。」「〜である。」の文が${plain}つあります（です・ます調にそろえる）`);
  else if (plain === 1) warnings.push("「〜だ。」「〜である。」の文が1つあります（です・ます調にそろえる）");
  if (polite < 8) errors.push("です・ます調の文が少なすぎます（です・ます調で書く）");
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(allText)) errors.push("絵文字は使わない");
  if (/！！|！？|!!|\?\?|♪|★|☆/.test(allText)) errors.push("「！！」や記号の飾りは使わない");

  /*
   * 4. 数値（2段階）
   *   1. 事実シート全体（ファイルの全節・全機種の仕様・その日に確かめた節）のどこにも無い「数字＋単位」は書けない
   *   2. 自動生成の記事は、さらに、書き手に渡した節（core ＋ 題材の節）に無い数値も書けない
   *      （別の話題の節の数字を流用する。例：補助の額を修理費として書く、ある機種の寸法を別の機種のものとして書く）
   */
  const nowhere = unknownNumericTokens(allText, ctx.sheet);
  if (nowhere.length) {
    errors.push(`事実シートのどこにも無い数値があります：${nowhere.join("、")}（事実シートの数値だけを、単位も同じ形で使う。書けない数値は、その文ごと削る）`);
  }
  if (ctx.factSections) {
    const outOfScope = unknownNumericTokens(allText, ctx.sheet, ctx.factSections).filter((t) => !nowhere.includes(t));
    if (outOfScope.length) {
      const titles = sectionsFor(ctx.sheet, scopeIds(ctx.factSections)).map((s) => s.title);
      errors.push(`この題材に渡した節に無い数値があります：${outOfScope.join("、")}（数値を使えるのは「${titles.join("」「")}」の節だけ。ほかの話題の数値を流用しない）`);
    }
  }

  /* 5. 型番（商品データに無い型番は書けない） */
  const models = unknownModelTokens(allText);
  if (models.length) errors.push(`このサイトの商品データに無い型番があります：${models.join("、")}（掲載機種の型番だけを、公式の表記のまま書く。分からなければ型番を書かない）`);

  /* 6. 地名の入れすぎ */
  const area = cluster?.id === "yokohama" || cluster?.id === "totsuka";
  const places = placeCount([draft.title, draft.description, body].join("\n"));
  const maxY = area ? 10 : 4;
  const maxT = cluster?.id === "totsuka" ? 10 : area ? 6 : 3;
  if (places.yokohama > maxY) errors.push(`「横浜」が${places.yokohama}回あります（${maxY}回まで。地名を検索語のために繰り返さない）`);
  if (places.totsuka > maxT) errors.push(`「戸塚」が${places.totsuka}回あります（${maxT}回まで。地名を検索語のために繰り返さない）`);
  const titlePlaces = placeCount(draft.title);
  if (titlePlaces.yokohama + titlePlaces.totsuka > 1) errors.push("題名に地名を2回以上入れない");

  /* 7. リンク */
  const links = markdownLinks(body);
  const paths = knownPaths();
  for (const e of ctx.existing) paths.add(`/blog/${e.slug}`);
  const internal = links.filter((l) => l.href.startsWith("/"));
  for (const l of internal) {
    const p = pathOf(l.href);
    if (!paths.has(p)) errors.push(`存在しないページへのリンクです：${l.href}`);
    if (p.startsWith("/blog/") && !ctx.existing.some((e) => `/blog/${e.slug}` === p)) errors.push(`公開済みでない記事へのリンクです：${l.href}`);
    if (/^(?:こちら|ここ|詳細|詳しくはこちら|このページ|リンク|コチラ)$/.test(l.text.trim())) errors.push(`リンクの文言が「${l.text}」です（リンク先の内容が分かる言葉にする）`);
  }
  for (const l of links.filter((x) => !x.href.startsWith("/") && !x.href.startsWith("#"))) {
    errors.push(`本文に外部のリンクを入れない（出典は sources に入れる）：${l.href}`);
  }
  const distinct = new Set(internal.map((l) => pathOf(l.href)));
  if (distinct.size < 3) errors.push(`サイト内のリンクが${distinct.size}本しかありません（親ページを含めて3本以上にする）`);
  if (links.length > 10) errors.push(`リンクが${links.length}本あります（10本まで）`);
  if (cluster && !distinct.has(cluster.pillar.href)) errors.push(`親ページ（${cluster.pillar.href} ${cluster.pillar.label}）へのリンクがありません`);
  if (ctx.topic) {
    const pages = ctx.topic.pages.filter((p) => p !== cluster?.pillar.href);
    if (pages.length && !pages.some((p) => distinct.has(p))) errors.push(`関連するページ（${pages.join("・")}）へのリンクが、本文に1本もありません`);
    const prodPaths = (ctx.topic.products ?? []).map((id) => products.find((p) => p.id === id)).filter((p) => p !== undefined).map((p) => productPath(p));
    if (prodPaths.length && !prodPaths.some((p) => distinct.has(p))) errors.push(`関連する機種のページ（${prodPaths.join("・")}）へのリンクが、本文に1本もありません`);
  }

  /* 8. 関連するページ・機種・地域・記事 */
  for (const p of draft.relatedPages ?? []) if (!paths.has(p)) errors.push(`relatedPages の ${p} というページはありません`);
  for (const id of draft.relatedProducts ?? []) if (!products.some((p) => p.id === id)) errors.push(`relatedProducts の ${id} という機種はありません`);
  for (const a of draft.relatedAreas ?? []) if (!publishedAreas.some((x) => x.slug === a)) errors.push(`relatedAreas の ${a} という地域ページはありません`);
  for (const r of draft.relatedArticles ?? []) if (!ctx.existing.some((e) => e.slug === r)) errors.push(`relatedArticles の ${r} という記事はありません`);

  /* 9. 出典 */
  const sourceUrls = allowedSourceUrls(ctx.sheet, ctx.factSections);
  for (const s of draft.sources ?? []) {
    if (!ctx.sheet.sourceUrls.has(s.url)) errors.push(`sources の URL が事実シートの出典にありません：${s.url}`);
    else if (!sourceUrls.has(s.url)) errors.push(`sources の URL が、この題材で使う節の出典ではありません：${s.url}`);
  }
  if (draft.generated && !(draft.sources ?? []).length) errors.push("出典（sources）が空です（本文で使った事実の出典を、事実シートの出典から入れる）");
  if (!draft.generated && cluster && ["kyutou-shoene", "eco-one-subsidy"].includes(cluster.id) && !(draft.sources ?? []).length) errors.push("補助金の記事なのに、出典（sources）が空です");

  /* 10. その日に確かめた情報（live） */
  if (ctx.live) {
    const day = formatDateJa(ctx.live.checkedAt);
    if (!allText.includes(day) && !allText.includes(day.replace(/^\d+年/, ""))) errors.push(`本日（${day}）に公式ページで確かめた情報を使う記事です。確かめた日を本文に書く（例：「${day}に公式ページで確認した」）`);
    if (!(draft.sources ?? []).some((s) => ctx.live!.sources.includes(s.url))) errors.push(`本日確かめた公式ページ（${ctx.live.sources.join("・")}）を、出典に入れる`);
    if (draft.liveCheckedAt !== ctx.live.checkedAt) errors.push("liveCheckedAt に、公式ページで確かめた日を入れる");
  }

  /* 11. 重複（1記事1検索意図・1主キーワード） */
  const primary = draft.keywords[0] ?? "";
  const owner = fixedKeywordOwner(primary);
  if (owner) errors.push(`主キーワード「${primary}」は、固定ページ ${owner.path} が担当している検索語（${owner.keyword}）と同じです（同じ語を2つのページで狙わない）`);
  for (const e of ctx.existing) {
    if (e.slug === draft.slug) {
      errors.push(`同じ slug の記事がすでにあります：${e.slug}`);
      continue;
    }
    if (primary && normalizeKeyword(e.keywords[0] ?? "") === normalizeKeyword(primary)) errors.push(`主キーワード「${primary}」は、既存の記事「${e.title}」と同じです`);
    const t = diceBigram(draft.title, e.title);
    if (t >= 0.72) errors.push(`題名が既存の記事「${e.title}」と近すぎます（${t.toFixed(2)}）`);
    const i = diceBigram(draft.intent, e.intent);
    if (i >= 0.78) errors.push(`検索意図が既存の記事「${e.title}」と重なっています（${i.toFixed(2)}）`);
    const b = Math.max(shingleOverlap(body, e.body), shingleOverlap(e.body, body));
    if (b >= 0.2) errors.push(`本文が既存の記事「${e.title}」と重なっています（8文字の並びの重なり ${b.toFixed(2)}。0.2 未満にする）`);
    else if (b >= 0.12) warnings.push(`本文が既存の記事「${e.title}」とやや近い（重なり ${b.toFixed(2)}）`);
  }
  // 固定ページ（解説のページ）の文章を写していないか
  for (const f of fixedPageTexts()) {
    const b = shingleOverlap(body, f.text);
    if (b >= 0.3) errors.push(`本文が固定ページ ${f.path} の文章と重なりすぎています（重なり ${b.toFixed(2)}。言い換えるのではなく、この記事の検索意図に合わせて書く）`);
    else if (b >= 0.18) warnings.push(`本文が固定ページ ${f.path} の文章とやや近い（重なり ${b.toFixed(2)}）`);
  }

  /* 12. そのほか */
  if (draft.updatedAt < draft.publishedAt) errors.push("updatedAt が publishedAt より前になっています");
  if (draft.faq.length > 3) errors.push(`質問と答え（faq）が${draft.faq.length}個あります（3個まで。本文で答えきれなかった疑問だけ）`);
  for (const f of draft.faq) if (!/[？?]$|か。$/.test(f.q.trim())) warnings.push(`質問の形になっていません：${f.q}`);
  for (const f of draft.faq) if (/\]\(/.test(f.a)) errors.push(`質問の答えにリンクを入れない：${f.q}`);

  return { ok: errors.length === 0, errors, warnings, length };
}
