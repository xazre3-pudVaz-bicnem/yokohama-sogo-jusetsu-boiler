import { internalLinkPaths, type Post } from "@/lib/blog";
import { numericTokens, scopeIds, sectionsFor, type FactSheet } from "@/lib/blog-generator/facts";
import { productSectionId } from "@/lib/blog-generator/facts-source";
import { liveSectionId } from "@/lib/blog-generator/live";
import type { Topic } from "@/lib/blog-generator/topics";
import { productPath, products } from "@/lib/products";

/**
 * 書き手に渡す・数値を使ってよい事実シートの節の id を決める。
 * いつも渡す節（core：会社・補助金の要点・その日の制度の状態・書かないこと・基本の知識）は、
 * facts.ts の scopeIds が足すため、ここでは題材ごとの節だけを返す。事実シートの全体は渡さない。
 */

/** 題材の節（題材の facts ＋ 題材の機種の詳細 ＋ その日に確かめた節） */
export function scopeForTopic(t: Topic, live = false): string[] {
  const prod = (t.products ?? []).map((id) => products.find((p) => p.id === id)).filter((p) => p !== undefined);
  return [...t.facts, ...prod.map(productSectionId), ...(live && t.live ? [liveSectionId(t.live)] : [])];
}

/**
 * 題材の無い記事（手書きの記事・題材を消した記事）を見直すときに、書き手に渡す節。
 * 記事の出典を持つ節・記事の機種の節に加えて、記事にある数値のうち、まだ渡す節に無いものは、
 * その数値を含む節（機種の詳細より、ファイルの節を先に）を足す。
 */
export function scopeForPost(post: Post, sheet: FactSheet): string[] {
  const ids = new Set<string>();
  const sources = new Set(post.sources.map((s) => s.url));
  for (const s of sheet.sections) if (s.id && !s.live && s.sources.some((u) => sources.has(u))) ids.add(s.id);
  const linked = new Set(internalLinkPaths(post.body));
  for (const p of products) if (post.relatedProducts.includes(p.id) || linked.has(productPath(p))) ids.add(productSectionId(p));
  const covered = () => new Set(sectionsFor(sheet, scopeIds([...ids])).flatMap((s) => [...s.tokens]));
  const ordered = [...sheet.sections.filter((s) => s.id && !s.live && !s.id.startsWith("product:")), ...sheet.sections.filter((s) => s.id.startsWith("product:"))];
  let have = covered();
  const text = [post.title, post.description, post.body, ...post.faq.flatMap((f) => [f.q, f.a])].join("\n");
  for (const tok of numericTokens(text)) {
    if (have.has(tok)) continue;
    const sec = ordered.find((s) => s.tokens.has(tok));
    if (!sec) continue; // 事実シートのどこにも無い数値（検査で見つかる）
    ids.add(sec.id);
    have = covered();
  }
  return [...ids];
}
