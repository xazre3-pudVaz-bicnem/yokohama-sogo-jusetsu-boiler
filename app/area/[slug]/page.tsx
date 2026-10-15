import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/content/Blocks";
import { ProductCard } from "@/components/product/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero, PhotoHero } from "@/components/ui/PageHero";
import { Phrase } from "@/components/ui/Phrase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AREA_STAT_AS_OF, AREA_STAT_SOURCES, getArea, publishedAreas, type Area } from "@/data/areas";
import { categories } from "@/data/categories";
import { creditLabel } from "@/data/credits";
import type { Product } from "@/data/products/types";
import { worksOfArea } from "@/data/works";
import { products, toCard } from "@/lib/products";
import { reveal } from "@/lib/reveal";
import { faqSchema, plainText, serviceSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { officeAddressWithPostal, officeMapUrl, receptionHours, siteConfig } from "@/lib/site";
import { fillTokens } from "@/lib/tokens";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.description, path: `/area/${a.slug}`, keywords: [a.keyword, ...a.secondaryKeywords] });
}

/** 地域の住まいに合う機種を、種類とメーカーが偏らないように選ぶ */
function pickProducts(a: Area, limit = 6): Product[] {
  let list = products;
  if (a.productFocus.categories?.length) list = list.filter((p) => a.productFocus.categories!.includes(p.category));
  if (a.productFocus.housing) list = list.filter((p) => p.housing.includes(a.productFocus.housing!));
  const groups = new Map<string, Product[]>();
  for (const p of list) {
    const key = `${p.category}:${p.brand}`;
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  const picked: Product[] = [];
  const queues = [...groups.values()];
  while (picked.length < limit && queues.some((q) => q.length)) {
    for (const q of queues) {
      const p = q.shift();
      if (p && picked.length < limit) picked.push(p);
    }
  }
  return picked;
}

const pct = (n: number) => `${n.toFixed(1)}%`;

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();

  const path = `/area/${a.slug}`;
  const crumbs = [
    { name: "対応エリア", href: "/area" },
    { name: a.kind === "ward" ? a.shortName : a.name, href: path },
  ];
  const faqs = a.faqs.map((f) => ({ q: fillTokens(f.q), a: plainText(fillTokens(f.a)) }));
  const picks = pickProducts(a);
  const works = worksOfArea(a.slug);
  const nearby = a.nearby.map((s) => getArea(s)).filter((x): x is Area => !!x);
  const s = a.stats;
  const statRows: [string, string][] = [
    ["一戸建て", pct(s.detachedPercent)],
    ["共同住宅", pct(s.apartmentPercent)],
    ["共同住宅のうち6階建以上", pct(s.sixStoryPercent)],
    ["1980年以前に建てられた住宅", pct(s.upTo1980Percent)],
    ["2001年以降に建てられた住宅", pct(s.from2001Percent)],
    ["持ち家", pct(s.ownedPercent)],
    ["太陽光発電のある住宅", pct(s.solarPercent)],
  ];
  const updated = (
    <p className="mt-5 text-[0.8125rem] text-ink-mute">
      <time dateTime={a.updatedAt}>{formatDateJa(a.updatedAt)}</time> 更新
    </p>
  );

  return (
    <>
      {a.image ? (
        <PhotoHero eyebrow="対応エリア" title={a.h1} lead={a.lead} crumbs={crumbs} image={a.image} imageAlt={a.imageAlt ?? ""} credit={creditLabel(a.image) || undefined} caption="写真はイメージです">
          {updated}
        </PhotoHero>
      ) : (
        <PageHero eyebrow="対応エリア" title={a.h1} lead={a.lead} crumbs={crumbs}>
          {updated}
        </PageHero>
      )}

      <section aria-labelledby="stats" className="bg-white">
        <div className="container-x section-tight">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <SectionHeading id="stats" eyebrow="数字で見る住まい" title={`${a.shortName}の住まい`} lead={`住宅の建て方と古さは、給湯器の設置の形と、交換で確かめることにかかわります。人口は${s.population.toLocaleString("ja-JP")}人、世帯数は${s.households.toLocaleString("ja-JP")}世帯、面積は${s.areaKm2}km²です。`} />
              <p className="mt-4 text-[0.8125rem] leading-[1.9] text-ink-mute">
                住宅は{AREA_STAT_AS_OF.housing}（住宅・土地統計調査）、人口・世帯数・面積は{AREA_STAT_AS_OF.population}（横浜市の推計人口）。割合は住宅数に対する値で、6階建以上は共同住宅に対する割合です。
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3" {...reveal()}>
              {statRows.map(([label, value]) => (
                <div key={label} className="card card-line px-4 py-4">
                  <dt className="text-[0.75rem] font-bold leading-snug text-ink-mute">{label}</dt>
                  <dd className="num mt-1.5 text-[1.375rem] font-semibold leading-none text-navy-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <article className="cv bg-white">
        <div className="container-narrow section-tight space-y-14 sm:space-y-16">
          {a.sections.map((sec) => (
            <section key={sec.id} id={sec.id} aria-labelledby={`${sec.id}-title`} className="scroll-mt-24">
              <h2 id={`${sec.id}-title`} className="h-section mb-6 text-balance" {...reveal()}>
                <Phrase>{fillTokens(sec.heading)}</Phrase>
              </h2>
              <Blocks blocks={sec.blocks} />
            </section>
          ))}
        </div>
      </article>

      <section aria-labelledby="services" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="services" eyebrow="承っている工事" title={`${a.shortName}で承っている給湯器の工事`} lead="給湯器の種類ごとに、設置の条件と機種をまとめています。" className="mb-8" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" {...reveal()}>
            {[...categories.map((c) => ({ href: c.path, label: c.name, note: c.summary })), { href: "/ene-farm", label: "エネファームからの交換", note: "温水暖房と置き場所を確かめて、替える先を選びます。" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="card card-line group flex h-full flex-col px-5 py-5">
                  <span className="font-heading text-[0.9688rem] font-black leading-snug text-navy-900 group-hover:text-brand-700">{l.label}</span>
                  <span className="mt-2 text-[0.8125rem] leading-[1.8] text-ink-mute">{l.note}</span>
                  <span className="mt-auto flex justify-end pt-3">
                    <span className="arrow-dot">
                      <Icon name="arrowRight" className="size-3.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {picks.length > 0 && (
        <section aria-labelledby="products" className="bg-white">
          <div className="container-x section">
            <SectionHeading
              id="products"
              eyebrow="機種"
              title={a.productFocus.housing === "apartment" ? `${a.shortName}の集合住宅に合う機種の例` : a.productFocus.housing === "detached" ? `${a.shortName}の戸建てに合う機種の例` : "掲載している機種の例"}
              lead="設置の形と号数・容量が合えば、ほかのメーカーの機種も選べます。すべての機種は、商品の一覧で絞り込めます。"
              className="mb-9"
            />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {picks.map((p) => (
                <li key={p.id}>
                  <ProductCard item={toCard(p)} />
                </li>
              ))}
            </ul>
            <p className="mt-8 text-right">
              <Link href={a.productFocus.housing ? `/products?housing=${a.productFocus.housing}` : "/products"} className="link-arrow">
                商品の一覧で絞り込む
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </div>
        </section>
      )}

      {works.length > 0 && (
        <section aria-labelledby="works" className="cv band band-paper section">
          <div className="container-x">
            <SectionHeading id="works" eyebrow="施工事例" title={`${a.shortName}の施工事例`} className="mb-8" />
            <ul className="rows rows-2">
              {works.map((w) => (
                <li key={w.slug}>
                  <Link href={`/works/${w.slug}`} className="text-link flex min-h-14 items-center py-3">
                    {w.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="office" className="cv bg-white">
        <div className="container-narrow section-tight">
          <h2 id="office" className="h-sub mb-4">
            ご相談の窓口
          </h2>
          <div className="card card-line px-5 py-5 sm:px-7">
            <p className="font-heading font-bold text-navy-900">
              {siteConfig.name} 戸塚オフィス
            </p>
            <p className="mt-1 text-[0.9375rem] leading-[1.9]">{officeAddressWithPostal("totsuka")}</p>
            {receptionHours() && <p className="text-[0.9375rem] leading-[1.9]">受付：{receptionHours()}</p>}
            <p className="mt-0.5">
              <a href={officeMapUrl("totsuka")} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 items-center">
                地図を開く（Googleマップ）
              </a>
            </p>
            <p className="mt-3 text-[0.8125rem] leading-[1.9] text-ink-mute">横浜市戸塚区を中心に、横浜市内と周辺の地域へ伺っています。対応できるかどうかは、ご住所をお知らせいただければお答えします。</p>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="area-faq" className="band band-mist section-tight">
          <div className="container-narrow">
            <SectionHeading id="area-faq" eyebrow="よくある質問" title={`${a.shortName}の給湯器交換についての質問`} className="mb-8" />
            <FaqList faqs={faqs} />
          </div>
        </section>
      )}

      <div className="bg-white">
        <div className="container-narrow section-tight grid gap-12">
          {nearby.length > 0 && (
            <nav aria-labelledby="nearby">
              <h2 id="nearby" className="h-sub mb-4">
                {a.kind === "city" ? "区ごとのページ" : "近くの地域"}
              </h2>
              <ul className="flex flex-wrap gap-2.5">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/area/${n.slug}`} className="opt">
                      {n.shortName}の給湯器交換
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <aside aria-labelledby="area-sources" className="rounded-3xl bg-paper-2 px-5 py-6 sm:px-7">
            <h2 id="area-sources" className="text-sm font-bold text-navy-900">
              このページの出典
            </h2>
            <p className="mt-1.5 text-[0.8125rem] leading-[1.9] text-ink-mute">統計の数値と、区・市の情報は、次の公式の資料で確かめたものです（{formatDateJa(a.updatedAt)}時点）。</p>
            <ul className="mt-3 space-y-1.5 text-[0.8125rem] leading-[1.8]">
              {[...AREA_STAT_SOURCES, ...a.sources].map((src) => (
                <li key={src.url} className="flex gap-2">
                  <Icon name="external" className="mt-1 size-3.5 shrink-0 text-ink-mute" />
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-link !font-normal break-all">
                    {src.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <CtaBand id={`cta-area-${a.slug}`} title={`${a.shortName}の給湯器交換のお見積もり`} />

      <JsonLd data={serviceSchema({ path, name: `${a.name}の給湯器交換`, description: a.description, areaName: a.name })} />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)!} />}
    </>
  );
}
