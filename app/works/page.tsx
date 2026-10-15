import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoFill } from "@/components/ui/Photo";
import { works, workUpdatedAt } from "@/data/works";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa } from "@/lib/seo";

const PATH = "/works";

/** 事例が1件も無いあいだは、検索結果に出さない（中身の無いページを登録させない） */
export const metadata: Metadata = buildMetadata({
  title: "給湯器の施工事例｜横浜市・戸塚区",
  description: "横浜総合住設が施工した、給湯器の交換の事例。設置の形、交換前と交換後の機器、工事で確かめた点を、お客様の了承を得た写真とともに紹介していきます。",
  path: PATH,
  noindex: works.length === 0,
});

export default function WorksPage() {
  const list = [...works].sort((a, b) => workUpdatedAt(b).localeCompare(workUpdatedAt(a)));
  return (
    <>
      <PageHero
        eyebrow="施工事例"
        title="給湯器の施工事例"
        lead="当社が施工した現場だけを、お客様の了承をいただいたうえで載せていきます。写真の差し替えや、ほかの会社の写真の流用はしません。"
        crumbs={[{ name: "施工事例", href: PATH }]}
      />
      <section aria-label="施工事例の一覧" className="bg-white">
        <div className="container-x section">
          {list.length === 0 ? (
            <div className="card card-line mx-auto max-w-2xl px-6 py-8 text-center">
              <p className="font-heading text-[1.0625rem] font-black text-navy-900">給湯器の施工事例は、準備中です</p>
              <p className="mt-3 text-[0.9375rem] leading-[1.95]">掲載のご了承をいただいた現場から、順に載せていきます。交換の進め方は、工事の流れのページでご覧いただけます。</p>
              <p className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-2">
                <Link href="/flow" className="link-arrow">
                  交換工事の流れ
                  <Icon name="arrowRight" className="size-4" />
                </Link>
                <Link href="/guide/cost" className="link-arrow">
                  交換費用の考え方
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((w) => {
                const cover = w.photos.find((p) => p.phase === "after") ?? w.photos[0];
                return (
                  <li key={w.slug}>
                    <Link href={`/works/${w.slug}`} className="card card-line group block overflow-hidden">
                      {cover && (
                        <div className="relative aspect-[4/3] bg-paper-2">
                          <PhotoFill image={cover.image} alt={cover.alt} sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw" />
                        </div>
                      )}
                      <div className="px-5 py-5">
                        {w.area && <p className="text-xs font-bold text-ink-mute">{w.area.label}</p>}
                        <h2 className="mt-1 font-heading text-[1rem] font-black leading-snug text-navy-900 group-hover:text-brand-700">{w.title}</h2>
                        <p className="mt-2 text-[0.8438rem] leading-[1.8]">{w.summary}</p>
                        <p className="mt-3 text-xs text-ink-mute">
                          <time dateTime={w.postedAt}>{formatDateJa(w.postedAt)}</time> 掲載
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
      <CtaBand id="cta-works" />
      {list.length > 0 && <JsonLd data={itemListSchema("給湯器の施工事例", list.map((w) => ({ name: w.title, href: `/works/${w.slug}` })))} />}
    </>
  );
}
