import type { Post } from "@/lib/blog";
import { numericTokens, withLiveSections, type FactSheet } from "@/lib/blog-generator/facts";
import { liveSectionId } from "@/lib/blog-generator/live";
import { scopeForTopic } from "@/lib/blog-generator/scope";
import { getTopic } from "@/lib/blog-generator/topics";
import { validateArticle, type ValidationResult } from "@/lib/blog-generator/validate";
import { formatDateJa } from "@/lib/seo";

/**
 * 公開済みの記事の点検（npm run blog:audit と、見直しの記事選び〔generate.ts〕で同じものを使う）。
 *
 * - 検査は、自動生成のときと同じ validateArticle。自動生成の記事は、題材で決めた節の数値だけを通す。
 * - その日に公式ページで確かめた情報（live）を載せた記事は、その節がいまの事実シートに無いため、
 *   記事の中の「確かめた日」を書いた文にある数値だけを通す節を足して確かめる（確認日が書かれていることも確かめる）。
 */
export function auditPost(post: Post, posts: Post[], baseSheet: FactSheet): ValidationResult {
  const { cluster: _cluster, cover: _cover, length: _length, headings: _headings, ...draft } = post;
  void _cluster;
  void _cover;
  void _length;
  void _headings;
  const topic = post.generated ? getTopic(post.slug) : undefined;
  let sheet = baseSheet;
  let live: { checkedAt: string; sources: string[] } | undefined;
  let liveId: string | undefined;
  if (post.liveCheckedAt) {
    const day = formatDateJa(post.liveCheckedAt);
    const sentences = post.body.split(/。|\n/).filter((s) => s.includes(day) || s.includes(day.replace(/^\d+年/, "")));
    const liveUrls = post.sources.filter((s) => s.checkedAt === post.liveCheckedAt).map((s) => s.url);
    liveId = topic?.live ? liveSectionId(topic.live) : "live-audit";
    sheet = withLiveSections(
      baseSheet,
      [
        "## 本日確認した公式情報：（公開した日に確かめた内容）",
        `id: ${liveId}`,
        `確認日: ${post.liveCheckedAt}`,
        ...liveUrls.map((u) => `出典: ${u}`),
        ...sentences.flatMap((s) => numericTokens(s)).map((t) => `- ${t}`),
      ].join("\n"),
    );
    live = { checkedAt: post.liveCheckedAt, sources: liveUrls };
  }
  const factSections = topic ? [...new Set([...scopeForTopic(topic, !!live), ...(liveId ? [liveId] : [])])] : undefined;
  return validateArticle(draft, {
    sheet,
    existing: posts.filter((p) => p.slug !== post.slug),
    factSections,
    ...(topic ? { topic: { pages: topic.pages, products: topic.products, length: topic.length } } : {}),
    ...(live ? { live } : {}),
  });
}
