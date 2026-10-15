/**
 * 見出しの文節区切り（components/ui/Phrase.tsx）が、数字や語の途中で切れていないかを確かめる。
 *   npx tsx scripts/phrase-check.ts          … おかしな区切りがあれば一覧にして、終了コード 1
 *   npx tsx scripts/phrase-check.ts --show   … 区切りの結果を並べて見る
 *
 * サイトで実際に使っている見出し（種類・解説ページ・地域・よくある質問・コラムの題名と見出し・カテゴリの名前）をすべて通し、
 * 「数字と数字の間」「英字の途中」「句読点・閉じ括弧の手前」「開き括弧の後ろ」で区切られているものがあれば表示する。
 * 見出しの文言を大きく足したとき・BudouX を更新したとき・自動投稿の記事が増えたときに実行する。
 */
import { phrases } from "@/components/ui/Phrase";
import { publishedAreas } from "@/data/areas";
import { categories } from "@/data/categories";
import { allFaqs } from "@/data/faq";
import { getAllPosts } from "@/lib/blog";
import { blogClusters } from "@/lib/blog-clusters";
import { allContentPages } from "@/lib/content";
import { fillTokens } from "@/lib/tokens";

const texts = new Set<string>();
for (const c of categories) [c.name, c.shortName].forEach((t) => texts.add(t));
for (const p of allContentPages()) [p.h1, ...p.sections.map((s) => s.heading), ...(p.faqs ?? []).map((f) => f.q)].forEach((t) => texts.add(fillTokens(t)));
for (const a of publishedAreas) [a.h1, ...a.sections.map((s) => s.heading), ...a.faqs.map((f) => f.q)].forEach((t) => texts.add(t));
for (const f of allFaqs) texts.add(f.q);
for (const c of blogClusters) [c.name, `「${c.name}」のコラム`, c.pillar.label].forEach((t) => texts.add(t));
for (const p of getAllPosts()) [p.title, ...p.headings.map((h) => h.text), ...p.faq.map((f) => f.q)].forEach((t) => texts.add(t));

let bad = 0;
for (const t of texts) {
  if (!t) continue;
  const parts = phrases(t);
  if (parts.join("") !== t) {
    bad += 1;
    console.log(`× 文字が変わっています：${t} → ${parts.join("")}`);
    continue;
  }
  for (let i = 1; i < parts.length; i++) {
    const prev = parts[i - 1];
    const cur = parts[i];
    if ((/[0-9A-Za-z]$/.test(prev) && /^[0-9A-Za-z]/.test(cur)) || /^[、。）」』？！ー]/.test(cur) || /[（「『]$/.test(prev)) {
      bad += 1;
      console.log(`× ${parts.join(" | ")}`);
      break;
    }
  }
}
console.log(`${texts.size} 件の見出しを確認。おかしな区切り：${bad} 件`);
if (process.argv.includes("--show")) for (const t of [...texts].slice(0, 400)) console.log(phrases(t).join(" | "));
process.exit(bad ? 1 : 0);
