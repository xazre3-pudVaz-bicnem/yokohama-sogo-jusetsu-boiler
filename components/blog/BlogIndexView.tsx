import Link from "next/link";
import { CategoryNav, Pagination, PostGrid } from "@/components/blog/BlogList";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { activeClusters, BLOG_NAME, getAllPosts, getPostsByCluster, pageCount, paginate } from "@/lib/blog";
import type { BlogCluster } from "@/lib/blog-clusters";
import { itemListSchema } from "@/lib/schema";

/**
 * 給湯器コラムの一覧（全体／カテゴリ別）。1ページ目と2ページ目以降で同じ見た目を使う。
 * カテゴリ別の一覧では、そのカテゴリの親ページ（固定ページ）への入口を必ず置く。
 * 冒頭に問い合わせのボタンは置かない（ページの最後にお見積もりの案内がある）。
 */
export function BlogIndexView({ page, cluster }: { page: number; cluster?: BlogCluster }) {
  const all = cluster ? getPostsByCluster(cluster.id) : getAllPosts();
  const total = pageCount(all.length);
  const posts = paginate(all, page);
  const basePath = cluster ? `/blog/category/${cluster.id}` : "/blog";
  const crumbs = [{ name: BLOG_NAME, href: "/blog" }, ...(cluster ? [{ name: cluster.name, href: basePath }] : []), ...(page > 1 ? [{ name: `${page}ページ目`, href: `${basePath}/page/${page}` }] : [])];
  const pageNote = page > 1 ? <span className="ml-3 text-[0.55em] font-bold text-ink-mute">{page}ページ目</span> : null;

  return (
    <>
      <PageHero
        illust="illust/pose-laptop"
        eyebrow={cluster ? BLOG_NAME : undefined}
        title={
          cluster ? (
            <>
              「{cluster.name}」のコラム{pageNote}
            </>
          ) : (
            <>
              {BLOG_NAME}
              {pageNote}
            </>
          )
        }
        lead={
          cluster
            ? cluster.description
            : "給湯器の交換時期、故障のサイン、機種や号数の選び方、補助金の決まりなどを、メーカーと国・自治体の公式情報をもとに、1つの疑問ずつまとめています。"
        }
        crumbs={crumbs}
      >
        {cluster && (
          <p className="mt-6">
            <Link href={cluster.pillar.href} className="link-arrow">
              {cluster.pillar.label}
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        )}
      </PageHero>

      <section aria-label="コラムの一覧" className="section bg-white">
        <div className="container-x">
          <CategoryNav clusters={activeClusters()} current={cluster?.id} />
          <div className="mt-10 lg:mt-12">
            <PostGrid posts={posts} cluster={cluster} />
          </div>
          <Pagination current={page} total={total} basePath={basePath} />
        </div>
      </section>

      <CtaBand id={cluster ? `cta-blog-${cluster.id}` : "cta-blog"} />
      <JsonLd data={itemListSchema(cluster ? `${cluster.name}のコラム` : BLOG_NAME, posts.map((p) => ({ name: p.title, href: `/blog/${p.slug}` })))} />
    </>
  );
}
