import type { Metadata } from "next";
import Link from "next/link";
import { CompareView, type CompareItem } from "@/components/product/CompareView";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { getCategory, housingLabels } from "@/data/categories";
import type { Product } from "@/data/products/types";
import { getBrand, manufacturerPriceLabel, priceView, products, subsidyView } from "@/lib/products";
import { buildMetadata, formatDateJa, formatYen } from "@/lib/seo";

const PATH = "/compare";

/** 選んだ機種で中身が変わるページなので、検索結果には出さない（リンクはたどらせる） */
export const metadata: Metadata = buildMetadata({
  title: "給湯器の機種を比較する",
  description: "選んだ給湯器の機種（最大4機種）の号数・容量、機能、設置方式、寸法、効率、メーカー希望小売価格、補助金の対象の状況を、同じ項目で並べて比べられます。",
  path: PATH,
  noindex: true,
});

const ROWS = ["種類", "号数・容量", "機能", "設置方式", "住まい", "温水暖房", "外形寸法", "質量", "効率", "メーカー希望小売価格", "当社の価格", "国の補助金", "仕様の確認日"] as const;

function spec(p: Product, re: RegExp): string {
  const hit = p.specifications.find((s) => re.test(s.label));
  return hit ? (re.source.includes("効率") ? `${hit.label.replace(/（.*$/, "")}：${hit.value}` : hit.value) : "";
}

function toCompare(p: Product): CompareItem {
  const price = priceView(p);
  const s = subsidyView(p);
  const msrp = manufacturerPriceLabel(p);
  return {
    id: p.id,
    href: `/products/${p.brand}/${p.slug}`,
    brandName: getBrand(p.brand).name,
    modelNumber: p.modelNumber,
    name: p.name,
    rows: {
      種類: getCategory(p.category).shortName,
      "号数・容量": [p.capacity.tankLiters ? `${p.capacity.tankLiters}L` : "", p.capacity.gou ? `${p.capacity.gou}号` : ""].filter(Boolean).join("・"),
      機能: p.functions.label,
      設置方式: p.installationType.label,
      住まい: p.housing.map((h) => housingLabels[h]).join("・"),
      温水暖房: p.heating ? "対応" : "なし",
      外形寸法: spec(p, /外形寸法|外径寸法|寸法/),
      質量: spec(p, /質量/),
      効率: spec(p, /効率/),
      メーカー希望小売価格: msrp ? `${msrp}（${p.manufacturerPrice!.includes}）` : "公表なし",
      当社の価格: price.totalInTax !== null ? `${formatYen(price.totalInTax)}（工事費込み・税込）` : "お見積もり",
      国の補助金: s.badge ?? (s.eligible ? "対象" : "対象外"),
      仕様の確認日: formatDateJa(p.dataVerifiedAt),
    },
  };
}

export default function ComparePage() {
  const items = products.map(toCompare);
  return (
    <>
      <PageHero
        eyebrow="機種の比較"
        title="給湯器の機種を比較する"
        lead="商品の一覧や機種のページで「比較に追加」を押した機種を、同じ項目で並べます。4機種まで選べます。価格は、メーカーが公表している希望小売価格と、当社のお見積もりを分けて表示しています。"
        crumbs={[{ name: "機種の比較", href: PATH }]}
      />
      <section aria-label="比較の表" className="bg-white">
        <div className="container-x section-tight">
          <CompareView items={items} rowLabels={[...ROWS]} />
          <p className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
            <Link href="/products" className="link-arrow">
              商品の一覧から、機種を選ぶ
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link href="/hybrid#models" className="link-arrow">
              ハイブリッド給湯器の全機種を1つの表で比べる
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
