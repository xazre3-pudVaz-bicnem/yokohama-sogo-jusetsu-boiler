import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Icon } from "@/components/ui/Icon";
import type { CategoryId } from "@/data/products/types";
import { activeBrands, productsByCategory, toCard } from "@/lib/products";

/**
 * 種類のページに置く、掲載機種の一覧（メーカーごとにまとめる）。
 * 一覧のページの絞り込みへのリンクを添える（同じ種類で、ほかの条件でも探せるように）。
 */
export function CategoryProducts({ categories, filterHref }: { categories: CategoryId[]; filterHref: string }) {
  const list = categories.flatMap((c) => productsByCategory(c));
  const groups = activeBrands()
    .map((b) => ({ b, items: list.filter((p) => p.brand === b.id) }))
    .filter((g) => g.items.length);
  if (!groups.length) return null;
  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <div key={g.b.id}>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b-2 border-navy-900 pb-2">
            <h3 className="font-heading text-lg font-black text-navy-900">
              {g.b.name}
              <span className="num ml-2 text-sm font-medium text-ink-mute">{g.items.length}機種</span>
            </h3>
            <Link href={`/products/${g.b.id}`} className="inline-flex min-h-10 items-center gap-1 text-[0.8125rem] font-bold text-brand-700 underline-offset-4 hover:underline">
              {g.b.name}の機種をすべて見る
              <Icon name="arrowRight" className="size-3.5" />
            </Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((p) => (
              <li key={p.id}>
                <ProductCard item={toCard(p)} />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p>
        <Link href={filterHref} className="btn btn-navy">
          条件を絞り込んで探す
          <Icon name="arrowRight" className="btn-arrow size-4" />
        </Link>
      </p>
    </div>
  );
}
