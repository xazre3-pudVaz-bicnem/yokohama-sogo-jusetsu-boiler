import { allFaqs } from "@/data/faq";
import { fillTokens } from "@/lib/tokens";

/**
 * AI を使えないとき（API キーの設定前など）の自動応答。サイトの「よくある質問」から、いちばん近い問いの答えを返す。
 * 新しい答えを作らない（載せている答えを、そのまま出す）。近いものが無いときは、相談の方法を案内する。
 */

/** 語の手がかり → 案内するページ */
const TOPICS: { words: RegExp; label: string; href: string }[] = [
  { words: /補助|給付|省エネ2026|助成/, label: "給湯器の補助金", href: "/subsidy" },
  { words: /号数|何号|家族|人数/, label: "号数の選び方", href: "/guide/capacity" },
  { words: /費用|価格|値段|料金|いくら|相場|見積/, label: "交換費用の考え方", href: "/guide/cost" },
  { words: /写真|撮/, label: "写真でかんたん見積もり", href: "/contact/photo" },
  { words: /型番|銘板|シール/, label: "型番の調べ方", href: "/guide/model-label" },
  { words: /エコキュート|ヒートポンプ|タンク/, label: "エコキュート", href: "/ecocute" },
  { words: /ハイブリッド|エコワン|ECO ?ONE/i, label: "ハイブリッド給湯器", href: "/hybrid" },
  { words: /エコジョーズ|ドレン/, label: "エコジョーズ", href: "/eco-jozu" },
  { words: /故障|出ない|ぬるい|エラー|異音|水漏れ|つかない/, label: "故障・トラブル", href: "/trouble" },
  { words: /エリア|地域|区|対応|来て/, label: "対応エリア", href: "/area" },
  { words: /流れ|手順|工事の日|期間/, label: "交換工事の流れ", href: "/flow" },
  { words: /比較|比べ|違い/, label: "機種を比較する", href: "/compare" },
];

function normalize(s: string): string {
  return s.normalize("NFKC").toLowerCase().replace(/[\s、。，．,.!?！？「」『』（）()・:：;；…ー〜~\-]/g, "");
}

function grams(s: string): Set<string> {
  const t = normalize(s);
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
}

export function answerFromFaq(question: string): string {
  const q = grams(question);
  let best: { score: number; q: string; a: string } | null = null;
  if (q.size) {
    for (const f of allFaqs) {
      const fq = grams(f.q);
      const fa = grams(f.a);
      let hitQ = 0;
      let hitA = 0;
      for (const g of q) {
        if (fq.has(g)) hitQ++;
        else if (fa.has(g)) hitA++;
      }
      const score = (hitQ * 1 + hitA * 0.35) / q.size;
      if (!best || score > best.score) best = { score, q: fillTokens(f.q), a: fillTokens(f.a) };
    }
  }
  const topics = TOPICS.filter((t) => t.words.test(question)).slice(0, 3);
  const links = topics.map((t) => `[${t.label}](${t.href})`).join("\n");
  if (best && best.score >= 0.34) {
    return [`よくある質問から、近いものをお答えします。`, "", `Q. ${best.q}`, best.a, ...(links ? ["", links] : ["", "[よくある質問をすべて見る](/faq)"])].join("\n");
  }
  return [
    "ごめんなさい、そのご質問には、いまは自動でお答えできません。",
    "機種の選び方や費用は、写真でかんたん見積もり・LINE・お電話でご相談ください（お見積もり・現地調査は無料です）。",
    "",
    links || "[よくある質問](/faq)\n[写真でかんたん見積もり](/contact/photo)",
  ].join("\n");
}
