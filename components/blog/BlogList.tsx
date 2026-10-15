import Link from "next/link";
import { PostCover } from "@/components/blog/PostCover";
import { PostCard } from "@/components/cards/PostCard";
import { Icon } from "@/components/ui/Icon";
import { Phrase } from "@/components/ui/Phrase";
import type { Post } from "@/lib/blog";
import type { BlogCluster } from "@/lib/blog-clusters";
import { reveal } from "@/lib/reveal";
import { formatDateDot } from "@/lib/seo";

/** カテゴリの切り替え（記事のあるカテゴリだけを並べる）。いま見ているカテゴリは塗りつぶす */
export function CategoryNav({ clusters, current }: { clusters: { cluster: BlogCluster; count: number }[]; current?: string }) {
  if (!clusters.length) return null;
  return (
    <nav aria-label="コラムのカテゴリ">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/blog" className={`chip ${current ? "" : "chip-on"}`} aria-current={current ? undefined : "page"}>
            すべて
          </Link>
        </li>
        {clusters.map(({ cluster, count }) => (
          <li key={cluster.id}>
            <Link href={`/blog/category/${cluster.id}`} className={`chip ${current === cluster.id ? "chip-on" : ""}`} aria-current={current === cluster.id ? "page" : undefined}>
              {cluster.name}
              <span className="num text-xs font-semibold opacity-70">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** 記事がまだ無いときの案内（固定ページへの入口を置く） */
function EmptyState({ cluster }: { cluster?: BlogCluster }) {
  const links = cluster
    ? [{ href: cluster.pillar.href, label: cluster.pillar.label }]
    : [
        { href: "/guide", label: "給湯器の選び方" },
        { href: "/trouble", label: "給湯器の故障・トラブル" },
        { href: "/subsidy", label: "給湯器の補助金" },
      ];
  return (
    <div className="card card-line px-5 py-9 text-center sm:px-8">
      <p className="text-[0.9688rem] leading-[1.95]">{cluster ? `「${cluster.name}」のコラムは準備中です。` : "給湯器コラムは準備中です。"}公開までのあいだは、次のページで、メーカーと国の公式情報をもとにまとめた内容をご覧いただけます。</p>
      <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-arrow">
              {l.label}
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 記事の一覧。
 * 先頭の1本だけ、絵を大きく・文章を横に置く。残りは、絵つきの白いパネルを並べる。
 * 絵は、設置の形の模式図か人物のイラスト（写真は使わない）。
 */
export function PostGrid({ posts, cluster }: { posts: Post[]; cluster?: BlogCluster }) {
  if (!posts.length) return <EmptyState cluster={cluster} />;
  const [first, ...rest] = posts;
  return (
    <>
      <article className="grid items-center gap-x-14 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Link href={`/blog/${first.slug}`} className="block overflow-hidden rounded-xl" tabIndex={-1} aria-hidden="true">
            <span className="relative block aspect-[16/9]">
              <PostCover cover={first.cover} illustWidth={220} />
            </span>
          </Link>
        </div>
        <div className="lg:col-span-6">
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-ink-mute">
            <span className="tag">新着</span>
            <time dateTime={first.publishedAt} className="num">
              {formatDateDot(first.publishedAt)}
            </time>
            <span className="tag tag-blue">{first.cluster.name}</span>
          </p>
          <h2 className="h-sub mt-3">
            <Link href={`/blog/${first.slug}`} className="underline-offset-4 hover:underline">
              <Phrase>{first.title}</Phrase>
            </Link>
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-[1.95]">{first.description}</p>
          <p className="mt-5">
            <Link href={`/blog/${first.slug}`} className="btn btn-navy btn-sm">
              この記事を読む
              <Icon name="arrowRight" className="btn-arrow size-4" />
            </Link>
          </p>
        </div>
      </article>

      {rest.length > 0 && (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {rest.map((p, i) => (
            <li key={p.slug} {...reveal((i % 3) * 80)}>
              <PostCard post={p} headingLevel="h2" />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** ページ送り。basePath は1ページ目の URL（/blog や /blog/category/xxx） */
export function Pagination({ current, total, basePath }: { current: number; total: number; basePath: string }) {
  if (total <= 1) return null;
  const href = (n: number) => (n === 1 ? basePath : `${basePath}/page/${n}`);
  const pages = Array.from({ length: total }, (_, i) => i + 1).filter((n) => n === 1 || n === total || Math.abs(n - current) <= 1);
  const box = "num grid size-11 place-items-center rounded-full border text-sm font-semibold transition-colors";
  return (
    <nav aria-label="ページ送り" className="mt-14 flex items-center justify-center gap-2">
      {current > 1 && (
        <Link href={href(current - 1)} className={`${box} border-silver-300 text-ink hover:border-navy-900`} aria-label="前のページ" rel="prev">
          <Icon name="chevronRight" className="size-4 rotate-180" />
        </Link>
      )}
      {pages.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && pages[i - 1] !== n - 1 && <span className="text-silver-400">…</span>}
          {n === current ? (
            <span className={`${box} border-navy-900 bg-navy-900 text-white`} aria-current="page">
              {n}
            </span>
          ) : (
            <Link href={href(n)} className={`${box} border-silver-300 text-ink hover:border-navy-900`}>
              {n}
            </Link>
          )}
        </span>
      ))}
      {current < total && (
        <Link href={href(current + 1)} className={`${box} border-silver-300 text-ink hover:border-navy-900`} aria-label="次のページ" rel="next">
          <Icon name="chevronRight" className="size-4" />
        </Link>
      )}
    </nav>
  );
}
