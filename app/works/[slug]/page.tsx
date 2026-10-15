import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoFill } from "@/components/ui/Photo";
import { getWork, works, workUpdatedAt } from "@/data/works";
import { img } from "@/lib/images";
import { products, productPath } from "@/lib/products";
import { workArticleSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  const cover = w.photos.find((p) => p.phase === "after") ?? w.photos[0];
  return buildMetadata({
    title: `${w.title}｜施工事例`,
    description: w.summary,
    path: `/works/${w.slug}`,
    ...(cover ? { image: { src: img(cover.image).src, width: img(cover.image).width, height: img(cover.image).height, alt: cover.alt } } : {}),
  });
}

const PHASE = { before: "施工前", after: "施工後", process: "工事の様子" } as const;

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();
  const path = `/works/${w.slug}`;
  const product = w.after?.productId ? products.find((p) => p.id === w.after!.productId) : undefined;
  const rows: [string, string][] = [
    ...(w.area ? [["地域", w.area.label] as [string, string]] : []),
    ...(w.housing ? [["住まい", w.housing] as [string, string]] : []),
    ...(w.period ? [["施工の時期", w.period] as [string, string]] : []),
    ...(w.before && (w.before.maker || w.before.model) ? [["施工前の機器", [w.before.maker, w.before.model, w.before.note].filter(Boolean).join(" ")] as [string, string]] : []),
    ...(w.after && (w.after.maker || w.after.model) ? [["施工後の機器", [w.after.maker, w.after.model, w.after.note].filter(Boolean).join(" ")] as [string, string]] : []),
    ...(w.subsidy ? [["使った補助金", w.subsidy] as [string, string]] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="施工事例"
        title={w.title}
        lead={w.summary}
        crumbs={[
          { name: "施工事例", href: "/works" },
          { name: w.title, href: path },
        ]}
      >
        <p className="mt-5 text-[0.8125rem] text-ink-mute">
          <time dateTime={w.postedAt}>{formatDateJa(w.postedAt)}</time> 掲載
        </p>
      </PageHero>
      <article className="bg-white">
        <div className="container-narrow section-tight space-y-10">
          {w.photos.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {w.photos.map((p) => (
                <figure key={p.image}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-2">
                    <PhotoFill image={p.image} alt={p.alt} sizes="(min-width: 768px) 380px, 92vw" />
                  </div>
                  <figcaption className="mt-2 text-[0.8125rem] leading-[1.8] text-ink-mute">
                    {PHASE[p.phase]}
                    {p.caption ? `：${p.caption}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          {rows.length > 0 && (
            <dl className="divide-y-2 divide-dotted divide-silver-300 border-y-2 border-dotted border-silver-300">
              {rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]">
                  <dt className="text-[0.875rem] font-bold text-navy-900">{k}</dt>
                  <dd className="text-[0.9375rem] leading-[1.9]">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <section aria-labelledby="work-detail">
            <h2 id="work-detail" className="h-sub mb-4">
              施工の内容
            </h2>
            <div className="space-y-4">
              {w.description.map((t) => (
                <p key={t} className="text-[0.9688rem] leading-[2.05]">
                  {t}
                </p>
              ))}
            </div>
          </section>
          {w.checkpoints && w.checkpoints.length > 0 && (
            <section aria-labelledby="work-check">
              <h2 id="work-check" className="h-sub mb-4">
                工事で確かめたこと
              </h2>
              <ul className="dash-list space-y-2 text-[0.9688rem] leading-[1.95]">
                {w.checkpoints.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          )}
          {product && (
            <p>
              <Link href={productPath(product)} className="text-link">
                取り付けた機種（{product.modelNumber}）のページ
              </Link>
            </p>
          )}
        </div>
      </article>
      <CtaBand id={`cta-work-${w.slug}`} />
      <JsonLd
        data={workArticleSchema({
          slug: w.slug,
          title: w.title,
          summary: w.summary,
          images: w.photos.map((p) => img(p.image).src),
          postedAt: w.postedAt,
          updatedAt: workUpdatedAt(w),
          areaLabel: w.area?.label,
        })}
      />
    </>
  );
}
