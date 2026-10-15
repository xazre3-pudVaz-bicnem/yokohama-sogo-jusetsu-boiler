import type { Metadata } from "next";
import Link from "next/link";
import { ProductExplorer, type FilterGroup } from "@/components/product/ProductExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { categories, functionLabels, functionOrder, gouOptions, housingLabels, installationLabels, installationOrder } from "@/data/categories";
import { activeBrands, products, productPath, toCard } from "@/lib/products";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa } from "@/lib/seo";

const PATH = "/products";

export const metadata: Metadata = buildMetadata({
  title: "給湯器の商品一覧｜メーカー・号数・設置方式から探す",
  description:
    "ガス給湯器・エコジョーズ・エコキュート・ハイブリッド給湯器の機種を、メーカー・号数・機能・設置方式・補助金の対象かどうかで絞り込めます。型番ごとの仕様と、工事費込みの価格の考え方も機種のページで。",
  path: PATH,
  keywords: ["給湯器 商品一覧", "給湯器 機種", "給湯器 型番 一覧", "エコキュート 機種", "ハイブリッド給湯器 機種"],
});

export default function ProductsPage() {
  const items = products.map(toCard);
  const brands = activeBrands();
  const tankSizes = [...new Set(products.map((p) => p.capacity.tankLiters).filter((v): v is number => !!v))].sort((a, b) => a - b);
  const latest = products.reduce((a, p) => (p.dataVerifiedAt > a ? p.dataVerifiedAt : a), "2026-10-14");

  const groups: FilterGroup[] = [
    { key: "brand", label: "メーカー", options: brands.map((b) => ({ value: b.id, label: b.name })) },
    { key: "cat", label: "種類", options: categories.map((c) => ({ value: c.id, label: c.shortName })) },
    { key: "gou", label: "号数（ガス）", options: gouOptions.map((g) => ({ value: String(g), label: `${g}号` })) },
    ...(tankSizes.length ? [{ key: "tank", label: "タンクの容量", options: tankSizes.map((t) => ({ value: String(t), label: `${t}L` })) }] : []),
    { key: "func", label: "機能", options: functionOrder.filter((f) => products.some((p) => p.functions.key === f)).map((f) => ({ value: f, label: functionLabels[f] })) },
    { key: "install", label: "設置方式", options: installationOrder.filter((i) => products.some((p) => p.installationType.key === i)).map((i) => ({ value: i, label: installationLabels[i] })) },
    { key: "housing", label: "住まい", options: (["detached", "apartment"] as const).map((h) => ({ value: h, label: housingLabels[h] })) },
    { key: "subsidy", label: "補助金", options: [{ value: "1", label: "国の補助金の対象を確認済み" }] },
  ];

  return (
    <>
      <PageHero
        eyebrow="商品一覧"
        title="給湯器を、条件から探す"
        lead={`メーカーの公式情報で型番と仕様を確かめた ${products.length} 機種を載せています（${formatDateJa(latest)}確認）。いまお使いの給湯器と同じ設置方式・号数から探すと、交換の工事が少なく済みます。`}
        crumbs={[{ name: "商品一覧", href: PATH }]}
      >
        <nav aria-label="種類から探す" className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.id} href={c.path} className="chip">
              {c.name}
            </Link>
          ))}
          <Link href="/compare" className="chip">
            機種を比較する
          </Link>
        </nav>
      </PageHero>

      <section aria-label="商品の一覧と絞り込み" className="bg-white">
        <div className="container-x section-tight">
          <ProductExplorer items={items} groups={groups} />
        </div>
      </section>

      <section aria-labelledby="products-notes" className="cv band band-paper section-tight">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          <div>
            <h2 id="products-notes" className="h-sub">
              価格について
            </h2>
            <p className="mt-2 text-[0.9063rem] leading-[1.95]">工事費込みの価格は、設置の条件を確かめてからお見積もりでお出しします。メーカー希望小売価格は、メーカーが公表している参考の価格です。</p>
            <Link href="/guide/cost" className="link-arrow mt-2 !text-sm">
              交換費用の考え方
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
          <div>
            <h2 className="h-sub">写真について</h2>
            <p className="mt-2 text-[0.9063rem] leading-[1.95]">製品写真は、メーカーへの掲載の確認が済んだものから載せます。それまでは、設置タイプを表す図を出しています。</p>
          </div>
          <div>
            <h2 className="h-sub">載っていない機種は</h2>
            <p className="mt-2 text-[0.9063rem] leading-[1.95]">ここに載せているのは代表的な機種です。いまお使いの給湯器の型番をお知らせいただければ、同じ場所に収まる機種をお調べします。</p>
            <Link href="/guide/model-label" className="link-arrow mt-2 !text-sm">
              型番の調べ方
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand id="cta-products" />
      <JsonLd data={itemListSchema("給湯器の商品一覧", products.map((p) => ({ name: `${p.modelNumber}（${p.name}）`, href: productPath(p) })))} />
    </>
  );
}
