import { publishedAreas } from "@/data/areas";
import { categories } from "@/data/categories";
import { allFaqs } from "@/data/faq";
import { allContentPages, contentPagePath } from "@/lib/content";
import { activeBrands } from "@/lib/products";
import { fillTokens } from "@/lib/tokens";

/**
 * AI を使えないとき（API キーの設定前など）の自動応答。サイトに載せている「よくある質問」
 * （/faq の質問と、解説ページごとの質問）から、いちばん近い問いの答えを返す。
 * 新しい答えを作らない（載せている答え・ページの名前・商品データを、そのまま出す）。
 * 近い問いが無いときは、合う解説ページと相談の方法を案内する。
 *
 * 照合のしかた（日本語は単語の区切りが無いので、文字の並びで比べる）
 * - 2文字の並びと、漢字1文字を手がかりにする。ひらがなだけの並び（「ます」「すか」など語尾・助詞）、
 *   カタカナとひらがなの境目（「スと」など）、助詞との境目（「金は」「の交」など）は使わない。
 * - どの文書にも出る並びほど軽く数える（IDF）。答えの本文に出る並びは、質問に出る並びより軽く数える。
 * - 種類の名前・メーカーの名前（エコキュート・リンナイなど）だけが合っても、近い問いとはみなさない
 *   （「ハイブリッド給湯器って何？」に、ハイブリッドの補助額の答えを返さないため）。
 *   質問に種類の名前があるときは、答えの側にも同じ名前が出てくる問いだけを選ぶ。
 * - 解説ページの方がはっきり近いときは、問いの答えではなく、ページを案内する。
 */

/** 語の手がかり → 案内するページ（近い問いもページも見つからないときの案内） */
const TOPICS: { words: RegExp; label: string; href: string }[] = [
  { words: /補助|給付|省エネ2026|助成/, label: "給湯器の補助金", href: "/subsidy" },
  { words: /号数|何号|家族|人数/, label: "号数の選び方", href: "/guide/capacity" },
  { words: /費用|価格|値段|料金|いくら|相場|見積/, label: "交換費用の考え方", href: "/guide/cost" },
  { words: /写真|撮/, label: "写真でかんたん見積もり", href: "/contact/photo" },
  { words: /型番|銘板|シール/, label: "型番の調べ方", href: "/guide/model-label" },
  { words: /エコキュート|ヒートポンプ|タンク/, label: "エコキュート", href: "/ecocute" },
  { words: /ハイブリッド|エコワン|ECO ?ONE/i, label: "ハイブリッド給湯器", href: "/hybrid" },
  { words: /エコジョーズ|ドレン/, label: "エコジョーズ", href: "/eco-jozu" },
  { words: /凍結|凍っ/, label: "凍結したときの対処", href: "/trouble/freeze" },
  { words: /水漏れ|漏れて|しずく|水が出て/, label: "水漏れのとき", href: "/trouble/water-leak" },
  { words: /エラー|番号が出|コードが出|d{2,3}.{0,3}(出|表示)/, label: "エラーコードの調べ方", href: "/trouble/error-codes" },
  { words: /異音|音が|音がする|うるさい/, label: "音がするとき", href: "/trouble/noise" },
  { words: /お湯が出な|湯が出な|つかない|点火しない/, label: "お湯が出ないとき", href: "/trouble/no-hot-water" },
  { words: /ぬるい|熱くなったり|温度が安定|温度が不安定/, label: "温度が安定しないとき", href: "/trouble/unstable-temperature" },
  { words: /故障|壊れ|調子が悪/, label: "故障・トラブル", href: "/trouble" },
  { words: /エリア|地域|出張|[市区町県都](でも|まで|は|に)/, label: "対応エリア", href: "/area" },
  { words: /流れ|手順|工事の日|期間|何日|時間がかか|かかる時間/, label: "交換工事の流れ", href: "/flow" },
  { words: /比較|比べ|違い/, label: "機種を比較する", href: "/compare" },
];

/** 安全にかかわる問い：近さに関係なく、この問いの答えを出す */
const SAFETY: { words: RegExp; faq: RegExp }[] = [{ words: /ガス.{0,6}(におい|臭|匂|漏)|(におい|臭|匂).{0,6}ガス/, faq: /ガスのにおい/ }];

/** よくある尋ね方 → 答えにする問い（ほかに、より近い問いがあれば、そちらを出す） */
const INTENTS: { words: RegExp; faq: RegExp }[] = [
  { words: /電話|受付時間|営業時間|何時|連絡|問い?合わ?せ|LINE|ライン/i, faq: /どうやって連絡/ },
  { words: /事務所|オフィス|会社|住所|所在地|どこにあ/, faq: /会社はどこ/ },
  { words: /エリア|地域|出張|[市区町県都](でも|まで).{0,6}(大丈夫|対応|来|行|可能|頼)/, faq: /対応エリア/ },
  { words: /(無料|お金|費用|料金|有料|タダ).{0,10}(見積|調査|相談)|(見積|調査|相談).{0,10}(無料|お金|費用|料金|有料|かか|タダ)/, faq: /見積もりは無料/ },
];

/** 書き方の違いをそろえる（質問とサイトの文の両方に使う） */
const VARIANTS: [RegExp, string][] = [
  [/追い?焚き?|おいだき/g, "追いだき"],
  [/給湯機/g, "給湯器"],
  [/見積り/g, "見積もり"],
  [/わから/g, "分から"],
];

/** 種類の名前（これだけが合っても、近い問いとはみなさない） */
const SUBJECT_WORDS = ["給湯器", "ガス給湯器", "エコジョーズ", "エコキュート", "ハイブリッド", "エネファーム", "ガス", "電気"];

type FaqDoc = { q: string; a: string; href?: string; label?: string; qt: Set<string>; at: Set<string> };
type PageDoc = { label: string; href: string; tt: Set<string>; dt: Set<string> };

const HIRAGANA = /^[ぁ-ゟ]+$/;
const KATAKANA = /[゠-ヿ]/;
const HIRA = /[ぁ-ゟ]/;
/** 助詞（漢字・カタカナとの境目の並びを手がかりにしない） */
const PARTICLE = /[はがをにでとのもへやか]/;
const KANJI = /[㐀-鿿]/;

function normalize(s: string): string {
  let t = s.normalize("NFKC").toLowerCase();
  for (const [re, to] of VARIANTS) t = t.replace(re, to);
  return t.replace(/[^\p{L}\p{N}]/gu, "");
}

function tokens(s: string): Set<string> {
  const t = normalize(s);
  const out = new Set<string>();
  for (let i = 0; i < t.length; i++) {
    if (KANJI.test(t[i])) out.add(t[i]);
    if (i < t.length - 1) {
      const g = t.slice(i, i + 2);
      if (HIRAGANA.test(g)) continue;
      if ((KATAKANA.test(g[0]) && HIRA.test(g[1])) || (HIRA.test(g[0]) && KATAKANA.test(g[1]))) continue;
      if ((PARTICLE.test(g[0]) && !HIRA.test(g[1])) || (PARTICLE.test(g[1]) && !HIRA.test(g[0]))) continue;
      out.add(g);
    }
  }
  return out;
}

const short = (s: string, n = 40) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

type Index = { faqs: FaqDoc[]; pages: PageDoc[]; idf: (g: string) => number; subject: Set<string>; subjectWords: string[] };
let index: Index | null = null;

function buildIndex(): Index {
  const faqs: FaqDoc[] = allFaqs.map((f) => {
    const q = fillTokens(f.q);
    const a = fillTokens(f.a);
    return { q, a, qt: tokens(q), at: tokens(a) };
  });
  const pages: PageDoc[] = [];
  for (const p of allContentPages()) {
    const href = contentPagePath(p);
    const label = short(fillTokens(p.h1));
    for (const f of p.faqs ?? []) {
      const q = fillTokens(f.q);
      const a = fillTokens(f.a);
      faqs.push({ q, a, href, label, qt: tokens(q), at: tokens(a) });
    }
    pages.push({ label, href, tt: tokens([p.title, p.h1, p.keyword, ...(p.secondaryKeywords ?? [])].map(fillTokens).join(" ")), dt: tokens(fillTokens(p.description)) });
  }
  for (const c of categories) pages.push({ label: c.name, href: c.path, tt: tokens(`${c.name} ${c.shortName}`), dt: tokens(c.summary) });
  pages.push({ label: "エネファームからの交換", href: "/ene-farm", tt: tokens("エネファーム"), dt: new Set() });

  // 文書ごとに、並びが出るかを数える（よく出る並びほど軽く）
  const df = new Map<string, number>();
  const docs = [...faqs.map((f) => new Set([...f.qt, ...f.at])), ...pages.map((p) => new Set([...p.tt, ...p.dt]))];
  for (const d of docs) for (const g of d) df.set(g, (df.get(g) ?? 0) + 1);
  const n = docs.length;
  const idf = (g: string) => Math.log(1 + n / (1 + (df.get(g) ?? 0)));
  const subjectWords = [...SUBJECT_WORDS, ...activeBrands().map((b) => b.name)].map(normalize).sort((a, b) => b.length - a.length);
  const subject = new Set(subjectWords.flatMap((w) => [...tokens(w)]));
  return { faqs, pages, idf, subject, subjectWords };
}

function brandsAnswer(question: string): string | null {
  const names = activeBrands().map((b) => b.name);
  if (!names.length) return null;
  const named = names.filter((n) => question.includes(n));
  if ((named.length >= 2 || (named.length === 1 && /メーカー/.test(question))) && /違い|比較|比べ|どっち|どちら|おすすめ|良い|いい/.test(question)) {
    return ["メーカーごとの違いは、機種の比較で、型番と仕様（号数・機能・設置の形など）を並べて確かめられます。", "", "[機種を比較する](/compare)", "[メーカーから探す](/products#makers)"].join("\n");
  }
  if (!/メーカー/.test(question) || !/扱|取り扱|どこ|どれ|何|種類|ある|選べ/.test(question)) return null;
  return [`このサイトでは、${names.join("・")}の給湯器を、型番と仕様で比べられます。`, "", "[メーカーから探す](/products#makers)", "[機種を比較する](/compare)"].join("\n");
}

type Ranked = {
  /** 安全にかかわる問い・商品データの答え（あれば、これをそのまま返す） */
  direct?: string;
  faq: { score: number; f: FaqDoc } | null;
  pages: { p: PageDoc; score: number }[];
};

/** 近い問いとページを、点数の高い順に選ぶ（answerFromFaq の中身。確かめるときにも使う） */
export function rankFaq(question: string): Ranked {
  index ??= buildIndex();
  const { faqs, pages, idf, subject, subjectWords } = index;
  const qt = tokens(question);
  // 種類・メーカーの名前は軽く数える
  const w = (g: string) => idf(g) * (subject.has(g) ? 0.35 : 1);
  const total = [...qt].reduce((s, g) => s + w(g), 0);
  const plainTotal = [...qt].filter((g) => !subject.has(g)).reduce((s, g) => s + idf(g), 0);

  // 1. 安全にかかわる問い
  const safety = SAFETY.find((s) => s.words.test(question));
  const safe = safety ? faqs.find((f) => safety.faq.test(f.q)) : undefined;
  if (safe) return { direct: ["よくある質問から、近いものをお答えします。", "", `Q. ${safe.q}`, safe.a].join("\n"), faq: null, pages: [] };

  // 2. 取り扱いメーカー（商品データから）
  const brands = brandsAnswer(question);
  if (brands) return { direct: brands, faq: null, pages: [] };

  // 質問に出てくる種類・メーカーの名前（長い名前を先に。「ガス給湯器」に合ったら「ガス」「給湯器」は数えない）
  let rest = normalize(question);
  const named: string[] = [];
  for (const sw of subjectWords) {
    if (sw === "給湯器" || !rest.includes(sw)) continue;
    named.push(sw);
    rest = rest.split(sw).join(" ");
  }

  // 3. 近い問い
  const intents = INTENTS.filter((i) => i.words.test(question));
  let best: Ranked["faq"] = null;
  if (total > 0) {
    for (const f of faqs) {
      let inQ = 0;
      let inA = 0;
      let plain = 0;
      for (const g of qt) {
        const inq = f.qt.has(g);
        const ina = !inq && f.at.has(g);
        if (inq) inQ += w(g);
        else if (ina) inA += w(g);
        if (!subject.has(g)) plain += inq ? idf(g) : ina ? idf(g) * 0.4 : 0;
      }
      let score = (inQ + inA * 0.4) / total;
      // 種類の名前のほかの語も合っていること（種類の名前だけの問いは、ページの案内にする）
      const plainOk = plainTotal > 0 && plain / plainTotal >= 0.5;
      // 質問にある種類・メーカーの名前が、問いか答えに出てくること
      const text = normalize(f.q + f.a);
      const namedOk = named.every((n) => text.includes(n));
      if (inQ / total < 0.35 || !plainOk || !namedOk) score = 0;
      if (intents.some((i) => i.faq.test(f.q))) score = Math.max(score, 0.5) + 0.3;
      if (!best || score > best.score) best = { score, f };
    }
  }

  // 4. 合う解説ページ（題名・検索語を重く、説明文を軽く）。種類のページのほかは、種類の名前のほかの語も合っていること
  const pageHits =
    total > 0
      ? pages
          .map((p) => {
            let s = 0;
            let plain = 0;
            for (const g of qt) {
              const v = p.tt.has(g) ? 1 : p.dt.has(g) ? 0.5 : 0;
              s += w(g) * v;
              if (!subject.has(g)) plain += idf(g) * v;
            }
            const kind = p.href === "/ene-farm" ? "エネファーム" : categories.find((c) => c.path === p.href)?.shortName;
            const ok = !!kind || (plainTotal > 0 && plain / plainTotal >= 0.4);
            // 種類の名前を出して尋ねているときは、その種類のページを案内する（「ハイブリッド給湯器って何？」など）
            const named = !!kind && normalize(question).includes(normalize(kind));
            return { p, score: ok ? Math.max(s / total, named ? 0.6 : 0) : 0 };
          })
          .filter((x) => x.score >= 0.45)
          .sort((a, b) => b.score - a.score)
      : [];
  return { faq: best && best.score >= 0.5 ? best : null, pages: pageHits };
}

export function answerFromFaq(question: string): string {
  const r = rankFaq(question);
  if (r.direct) return r.direct;
  // はっきり合う問いがあれば、その答え。無ければ、はっきり合うページを案内する（問いもかなり近ければ、答えも添える）
  const strongPage = r.pages[0] && r.pages[0].score >= 0.7;
  const faq = r.faq && (r.faq.score >= 0.75 || !strongPage) ? r.faq.f : null;
  const alsoFaq = !faq && strongPage && r.faq && r.faq.score >= 0.7 ? r.faq.f : null;

  // リンク：問いのページ → 区のページ → 合うページ → 語の手がかり（同じ行き先は1回、3つまで）
  const links: { label: string; href: string }[] = [];
  const push = (label: string, href: string) => {
    if (links.length < 3 && !links.some((l) => l.href === href)) links.push({ label, href });
  };
  if (faq?.href && faq.label) push(faq.label, faq.href);
  for (const h of r.pages.slice(0, 2)) push(h.p.label, h.p.href);
  // 長い名前から照らし、合った名前は問いから外す（「港南区」の問いに「南区」のページを出さないため）
  let rest = question;
  for (const a of [...publishedAreas].sort((x, y) => y.shortName.length - x.shortName.length)) {
    if (!rest.includes(a.shortName)) continue;
    push(`${a.shortName}の給湯器交換`, `/area/${a.slug}`);
    rest = rest.split(a.shortName).join("　");
  }
  for (const t of TOPICS.filter((x) => x.words.test(question))) push(t.label, t.href);
  const linkLines = links.map((l) => `[${l.label}](${l.href})`);

  if (faq) {
    return ["よくある質問から、近いものをお答えします。", "", `Q. ${faq.q}`, faq.a, "", ...(linkLines.length ? linkLines : ["[よくある質問をすべて見る](/faq)"])].join("\n");
  }
  if (r.pages.length) {
    return [
      "このご質問は、次のページでくわしく説明しています。",
      ...linkLines,
      ...(alsoFaq ? ["", "よくある質問から：", `Q. ${alsoFaq.q}`, alsoFaq.a] : []),
      "",
      "機種の選び方や費用は、写真でかんたん見積もり・LINE・お電話でご相談ください（お見積もり・現地調査は無料です）。",
    ].join("\n");
  }
  return [
    "ごめんなさい、そのご質問には、いまは自動でお答えできません。",
    "機種の選び方や費用は、写真でかんたん見積もり・LINE・お電話でご相談ください（お見積もり・現地調査は無料です）。",
    "",
    ...(linkLines.length ? linkLines : ["[よくある質問](/faq)", "[写真でかんたん見積もり](/contact/photo)"]),
  ].join("\n");
}
