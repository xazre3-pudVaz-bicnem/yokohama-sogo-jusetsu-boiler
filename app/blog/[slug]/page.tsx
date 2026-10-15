import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { coverCaption, PostCover } from "@/components/blog/PostCover";
import { PostRow } from "@/components/cards/PostCard";
import { ProductCard } from "@/components/product/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { Phrase } from "@/components/ui/Phrase";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import { kyutouShoene2026 } from "@/data/subsidy/programs";
import { BLOG_NAME, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { pageLabel } from "@/lib/blog-links";
import { products, toCard } from "@/lib/products";
import { reveal } from "@/lib/reveal";
import { blogPostingSchema, faqSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { officeAddress, siteConfig } from "@/lib/site";
import { kyutouPhase } from "@/lib/subsidy";

/**
 * 給湯器コラムの記事ページ（content/blog/<slug>.md の1ファイルが1ページ）。
 * 役割：1つの検索意図に答える。答えたあと、固定ページ（選び方・故障・補助金・種類・地域）と機種のページへ送る。
 * 構造化データ：BlogPosting（画面に出している題名・説明・日付・執筆者・カテゴリだけ）、
 *               FAQPage（この記事に表示している質問だけ）、BreadcrumbList（パンくず）。
 * 冒頭と本文の途中に問い合わせのボタンは置かない（ページの最後にお見積もりの案内がある）。
 */
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    keywords: p.keywords,
    type: "article",
    publishedTime: p.publishedAt,
    modifiedTime: p.updatedAt,
    section: p.cluster.name,
    tags: p.keywords,
  });
}

/** 給湯省エネ2026事業の内容を扱う記事か（制度が終わったら、冒頭に「受付終了」を出す） */
function aboutKyutou(p: { category: string; sources: { url: string }[] }): boolean {
  return p.category === "kyutou-shoene" || p.category === "eco-one-subsidy" || p.sources.some((s) => s.url.startsWith("https://kyutou-shoene2026.meti.go.jp"));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const relatedPages = [...new Set([p.cluster.pillar.href, ...p.relatedPages, ...p.relatedAreas.map((a) => `/area/${a}`)])]
    .map((href) => ({ href, label: href === p.cluster.pillar.href ? p.cluster.pillar.label : (pageLabel(href) ?? "") }))
    .filter((l) => l.label);
  const relatedProducts = p.relatedProducts.map((id) => products.find((x) => x.id === id)).filter((x) => x !== undefined);
  const relatedPosts = getRelatedPosts(p, 3);
  const toc = p.headings.filter((h) => h.level === 2);
  const updated = p.updatedAt !== p.publishedAt;
  const ended = aboutKyutou(p) && kyutouPhase() === "ended";
  const caption = coverCaption(p.cover);

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-mist">
          <div className="container-x pb-10 pt-4 sm:pb-14 lg:pt-5">
            <Breadcrumbs
              items={[
                { name: BLOG_NAME, href: "/blog" },
                { name: p.cluster.name, href: `/blog/category/${p.category}` },
                { name: p.title, href: `/blog/${p.slug}` },
              ]}
            />
            <div className="mt-6 grid items-center gap-x-12 gap-y-8 sm:mt-9 lg:grid-cols-[1fr_20rem]">
              <div className="max-w-[50rem]">
                <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs tracking-wider text-ink-mute">
                  <Link href={`/blog/category/${p.category}`} className="chip">
                    {p.cluster.name}
                  </Link>
                  <span className="num">
                    公開 <time dateTime={p.publishedAt}>{formatDateJa(p.publishedAt)}</time>
                    {updated && (
                      <>
                        <span className="mx-2">／</span>更新 <time dateTime={p.updatedAt}>{formatDateJa(p.updatedAt)}</time>
                      </>
                    )}
                  </span>
                </p>
                <h1 className="h-page mt-4 text-balance">
                  <Phrase>{p.title}</Phrase>
                </h1>
                <p className="mt-5 max-w-3xl text-pretty text-[0.9688rem] leading-[2] sm:text-base sm:leading-[2]">{p.description}</p>
              </div>
              <figure className="mx-auto w-full max-w-xs lg:max-w-none">
                <div className="card relative aspect-[4/3] overflow-hidden">
                  <PostCover cover={p.cover} illustWidth={200} />
                </div>
                {caption && <figcaption className="mt-2.5 text-xs leading-relaxed text-ink-mute">{caption}</figcaption>}
              </figure>
            </div>
          </div>
          <svg className="block h-6 w-full text-white sm:h-10" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path fill="currentColor" d="M0 30c180 26 420 26 720 6s540-22 720 4v20H0z" />
          </svg>
        </header>

        <div className="bg-white">
          <div className="mx-auto max-w-[50rem] px-[clamp(1.25rem,4vw,2.5rem)] pb-[clamp(3rem,6vw,5rem)] pt-6">
            {ended && (
              <p className="callout callout-caution mb-8" role="note">
                <strong className="font-heading text-navy-900">{kyutouShoene2026.name}は、受付を終了しました。</strong>
                この記事の金額と条件は、公開した時点の制度の内容の記録です。次の年度の制度は、国の発表でご確認ください。
              </p>
            )}
            {p.liveCheckedAt && (
              <p className="mb-8 rounded-2xl bg-paper-2 px-5 py-3.5 text-[0.8125rem] leading-[1.9] text-ink-body">
                この記事の「◯月◯日時点」の情報は、<time dateTime={p.liveCheckedAt}>{formatDateJa(p.liveCheckedAt)}</time>に公式ページで確かめたものです。いまの状態は、出典の公式ページでご確認ください。
              </p>
            )}

            {/* 目次 */}
            {toc.length >= 3 && (
              <nav aria-label="この記事の内容" className="mb-10 rounded-3xl bg-paper-2 px-5 py-5 sm:px-7">
                <p className="font-heading text-[0.8125rem] font-bold tracking-wider text-brand-700">この記事の内容</p>
                <ol className="mt-2">
                  {toc.map((h, i) => (
                    <li key={h.id} className="border-b-2 border-dotted border-silver-300 last:border-b-0">
                      <a href={`#${h.id}`} className="group flex min-h-11 items-center gap-3.5 py-2 text-[0.9375rem] leading-relaxed text-ink hover:text-brand-700">
                        <span className="num w-4 shrink-0 text-ink-mute">{i + 1}</span>
                        <span className="underline-offset-4 group-hover:underline">{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <MarkdownBody body={p.body} />

            {/* この記事の質問（表示しているものだけを構造化データにも出す） */}
            {p.faq.length > 0 && (
              <section aria-labelledby="post-faq" className="mt-14">
                <h2 id="post-faq" className="h-sub mb-4">
                  この記事に関する質問
                </h2>
                <FaqList faqs={p.faq} />
              </section>
            )}

            {/* 出典 */}
            {p.sources.length > 0 && (
              <section aria-labelledby="post-sources" className="mt-12 rounded-3xl bg-paper-2 px-5 py-6 sm:px-7">
                <h2 id="post-sources" className="text-sm font-bold text-navy-900">
                  出典・参考にした公式情報
                </h2>
                <ul className="mt-3 space-y-1.5 text-[0.8125rem] leading-[1.8]">
                  {p.sources.map((s) => (
                    <li key={s.url} className="flex gap-2">
                      <Icon name="external" className="mt-1 size-3.5 shrink-0 text-ink-mute" />
                      <span>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-link !font-normal break-all">
                          {s.title}
                        </a>
                        <span className="ml-2 text-ink-mute">（{formatDateJa(s.checkedAt)}に確認）</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-ink-mute">制度の内容・受付の状況・製品の仕様は変わることがあります。最新の情報は、各公式ページでご確認ください。</p>
              </section>
            )}

            {/* 執筆・日付・運営会社（「監修」とは書かない。資格のある第三者の監修ではないため） */}
            <aside aria-label="この記事について" className="card card-line mt-10 px-5 py-5 sm:px-6">
              <dl className="grid gap-x-6 gap-y-1.5 text-[0.8125rem] leading-relaxed sm:grid-cols-[6.5rem_1fr]">
                <dt className="font-bold text-ink-mute">執筆</dt>
                <dd className="font-bold text-ink">{p.author}</dd>
                <dt className="font-bold text-ink-mute">公開日</dt>
                <dd>
                  <time dateTime={p.publishedAt}>{formatDateJa(p.publishedAt)}</time>
                </dd>
                <dt className="font-bold text-ink-mute">最終更新日</dt>
                <dd>
                  <time dateTime={p.updatedAt}>{formatDateJa(p.updatedAt)}</time>
                </dd>
                <dt className="font-bold text-ink-mute">運営会社</dt>
                <dd>
                  {siteConfig.name}（{siteConfig.offices.totsuka.label}：{officeAddress("totsuka")}）
                  <Link href="/company" className="text-link ml-2">
                    運営会社の情報
                  </Link>
                </dd>
              </dl>
            </aside>

            {/* あわせて確かめたいページ（親ページ・関連する固定ページ・地域） */}
            {relatedPages.length > 0 && (
              <nav aria-labelledby="post-pages" className="mt-12">
                <h2 id="post-pages" className="h-sub mb-4">
                  あわせて確かめたいページ
                </h2>
                <ul className="rows rows-2">
                  {relatedPages.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                        <span className="block font-heading text-[0.9688rem] font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-700">{l.label}</span>
                        <span className="arrow-dot">
                          <Icon name="arrowRight" className="size-3.5" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </article>

      {/* この記事に出てくる機種 */}
      {relatedProducts.length > 0 && (
        <section aria-labelledby="post-products" className="cv section band band-mist">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <SectionHeading id="post-products" title="この記事に出てくる機種" />
              <Link href="/products" className="link-arrow shrink-0" {...reveal(80)}>
                商品一覧
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </div>
            <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((x, i) => (
                <li key={x.id} {...reveal(i * 80)}>
                  <ProductCard item={toCard(x)} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 関連コラム */}
      {relatedPosts.length > 0 && (
        <section aria-labelledby="post-related" className={`cv section ${relatedProducts.length > 0 ? "bg-white" : "band band-paper"}`}>
          <div className="container-x">
            <SectionSplit heading={<SectionHeading id="post-related" title="関連するコラム" />}>
              <ul className="rows" {...reveal(60)}>
                {relatedPosts.map((r) => (
                  <li key={r.slug}>
                    <PostRow post={r} />
                  </li>
                ))}
              </ul>
              <p className="mt-7">
                <Link href={`/blog/category/${p.category}`} className="link-arrow">
                  「{p.cluster.name}」のコラム一覧
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </p>
            </SectionSplit>
          </div>
        </section>
      )}

      <CtaBand id={`cta-post-${p.slug}`} />
      <JsonLd
        data={blogPostingSchema({
          slug: p.slug,
          title: p.title,
          description: p.description,
          publishedAt: p.publishedAt,
          updatedAt: p.updatedAt,
          author: p.author,
          category: p.cluster.name,
          // 検索語は画面に出していないので、構造化データにも入れない
          keywords: [],
        })}
      />
      {p.faq.length > 0 && <JsonLd data={faqSchema(p.faq)} />}
    </>
  );
}
