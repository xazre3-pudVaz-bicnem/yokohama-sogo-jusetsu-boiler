import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { ProductCard } from "@/components/product/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/data/brands";
import { categories, getCategory } from "@/data/categories";
import type { BrandId } from "@/data/products/types";
import { productPath, productsByBrand, toCard } from "@/lib/products";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata, fitDescription, formatDateJa } from "@/lib/seo";

/**
 * メーカー別のページ（/products/<メーカー>）。そのメーカーの掲載機種を、種類ごとに並べる。
 * メーカーの説明は、公式で確かめられる事実だけ（data/brands.ts の summary）。評価や順位は書かない。
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return brands.filter((b) => productsByBrand(b.id).length > 0).map((b) => ({ brand: b.id }));
}

type Params = { params: Promise<{ brand: string }> };

function brandOf(id: string) {
  return brands.find((b) => b.id === id);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { brand: id } = await params;
  const b = brandOf(id);
  if (!b) return {};
  const cats = b.categories.map((c) => getCategory(c).shortName).join("・");
  // エコキュートは号数ではなく、タンクの容量で選ぶ
  const size = b.categories.every((c) => c === "ecocute") ? "タンク容量" : "号数";
  return buildMetadata({
    title: `${b.name}の給湯器の交換｜${cats}の機種と型番`,
    description: fitDescription(
      `${b.name}（${b.company}）の${cats}の機種を、型番・${size}・設置方式・補助金の対象かどうかで比べられます。横浜市・戸塚区の${b.name}の給湯器の交換は、無料見積もりでご相談ください。`,
    ),
    path: `/products/${b.id}`,
    keywords: [`${b.name} 給湯器 交換`, `${b.name} ${cats.split("・")[0]}`, `横浜市 ${b.name} 給湯器`],
  });
}

export default async function BrandPage({ params }: Params) {
  const { brand: id } = await params;
  const b = brandOf(id);
  if (!b) notFound();
  const list = productsByBrand(b.id as BrandId);
  if (!list.length) notFound();
  const groups = categories.map((c) => ({ c, items: list.filter((p) => p.category === c.id) })).filter((g) => g.items.length);
  const verified = list.reduce((a, p) => (p.dataVerifiedAt > a ? p.dataVerifiedAt : a), "2026-10-14");
  const others = brands.filter((x) => x.id !== b.id && productsByBrand(x.id).length);

  return (
    <>
      <PageHero
        eyebrow="メーカーから探す"
        title={`${b.name}の給湯器`}
        lead={`${b.summary}このサイトでは、${b.name}の公式サイトとカタログで型番と仕様を確かめた${list.length}機種を載せています（${formatDateJa(verified)}確認）。`}
        crumbs={[
          { name: "商品一覧", href: "/products" },
          { name: b.name, href: `/products/${b.id}` },
        ]}
        aside={
          <div className="logo-tile !min-h-[9rem] gap-3 !px-8 !py-6 shadow-[var(--shadow-card)]">
            <MakerLogo logo={b.logo} name={b.name} height={52} priority />
            <span className="text-[0.8125rem] font-bold text-ink-body">
              {b.categories.map((c) => getCategory(c).shortName).join("・")}
              <span className="num ml-1.5">{list.length}機種</span>
            </span>
          </div>
        }
      >
        <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <a href={b.url} target="_blank" rel="noopener noreferrer" className="link-arrow !text-sm">
            {b.name}の公式サイト
            <Icon name="external" className="size-4" />
          </a>
          {groups.length > 1 && (
            <span className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <a key={g.c.id} href={`#${g.c.id}`} className="chip">
                  {g.c.shortName}（{g.items.length}）
                </a>
              ))}
            </span>
          )}
        </p>
      </PageHero>

      {groups.map((g, i) => (
        <section key={g.c.id} id={g.c.id} aria-labelledby={`${g.c.id}-title`} className={`${i % 2 ? "band band-paper" : "bg-white"} scroll-mt-24`}>
          <div className="container-x section-tight">
            <SectionHeading id={`${g.c.id}-title`} eyebrow={g.c.shortName} title={`${b.name}の${g.c.name}`} lead={g.c.summary} className="mb-8" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p) => (
                <li key={p.id}>
                  <ProductCard item={toCard(p)} />
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href={g.c.path} className="link-arrow">
                {g.c.name}の選び方と、ほかのメーカーの機種
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </div>
        </section>
      ))}

      <section aria-labelledby="other-brands" className="cv bg-white">
        <div className="container-x section-tight">
          <h2 id="other-brands" className="h-sub">
            ほかのメーカーの給湯器
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {others.map((x) => (
              <li key={x.id}>
                <Link href={`/products/${x.id}`} className="logo-tile h-full gap-1.5" aria-label={`${x.name}の給湯器`}>
                  <MakerLogo logo={x.logo} name={x.name} height={24} decorative />
                  <span className="text-[0.6875rem] text-ink-mute">{productsByBrand(x.id).length}機種</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-[0.8438rem] leading-[1.9] text-ink-mute">
            メーカーの名前・製品名は、各社の商標または登録商標です。このサイトは、メーカーの公式サイトではありません。製品の仕様と保証の内容は、メーカーの公式の資料と保証書によります。
          </p>
        </div>
      </section>

      <CtaBand id={`cta-brand-${b.id}`} title={`${b.name}の給湯器のお見積もり`} />
      <JsonLd data={itemListSchema(`${b.name}の給湯器`, list.map((p) => ({ name: p.modelNumber, href: productPath(p) })))} />
    </>
  );
}
