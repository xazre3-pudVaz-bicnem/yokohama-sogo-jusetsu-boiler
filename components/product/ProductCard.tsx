import Link from "next/link";
import type { ReactNode } from "react";
import { ProductVisual } from "@/components/product/ProductVisual";
import type { ProductCardData } from "@/lib/products";
import { ModelNumber } from "@/components/product/ModelNumber";

/**
 * 商品カード（一覧・関連する機種・トップ）。
 * 型番を主役にする（お客様は、いまの機種や見積書の型番で探すため）。
 * 価格は、当社の販売価格が入っているときは工事費込みの総額を、無ければ「お見積もり」と、参考のメーカー希望小売価格を出す。
 *
 * 画面側（絞り込みの一覧）からも使うので、サーバー専用のものを import しない。
 * action … カードの下に置く操作（「比較に追加」など。リンクの外に置く）
 */
export function ProductCard({ item, sizes = "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw", action, headingLevel = "h3" }: { item: ProductCardData; sizes?: string; action?: ReactNode; headingLevel?: "h2" | "h3" | "h4" }) {
  const Heading = headingLevel;
  return (
    <article className="card card-line flex h-full flex-col p-3 sm:p-4">
      <Link href={item.href} className="group flex flex-1 flex-col">
        <ProductVisual image={item.image} category={item.category} installKey={item.installKey} sizes={sizes} />
        <div className="flex flex-1 flex-col px-1 pt-4">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] font-bold text-ink-mute">
            {item.brandName}
            {item.subsidyBadge && <span className={`badge ${item.subsidyEligible ? "badge-sun" : "badge-mute"}`}>{item.subsidyBadge}</span>}
          </p>
          <Heading className="num mt-1.5 text-[1.25rem] font-semibold leading-[1.3] tracking-wide text-navy-900 transition-colors group-hover:text-brand-700">
            <ModelNumber value={item.modelNumber} />
          </Heading>
          <p className="mt-1.5 text-[0.8125rem] leading-[1.7]">{item.name}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            <li className="badge badge-solid">{item.categoryName}</li>
            {item.capacity && <li className="badge">{item.capacity}</li>}
            <li className="badge">{item.functionLabel}</li>
            <li className="badge !whitespace-normal">{item.installGroup}</li>
          </ul>
          {/* 価格の欄は、カードの下端にそろえる（説明の行数がカードごとに違っても、横に並んだときに位置がそろう） */}
          <div className="mt-auto pt-4">
            <dl className="space-y-1 border-t-2 border-dotted border-silver-300 pt-3 text-[0.8125rem] leading-[1.7]">
              {/* 幅が足りないときは、値を次の行の右に送る（項目名や金額を、語の途中で折り返さない） */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <dt className="whitespace-nowrap text-ink-mute">工事費込みの価格</dt>
                <dd className="ml-auto whitespace-nowrap font-heading text-[0.9375rem] font-black text-navy-900">{item.total !== null ? <span className="num text-lg font-semibold">{item.total.toLocaleString("ja-JP")}円</span> : "お見積もり"}</dd>
              </div>
              {item.msrp && (
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <dt className="whitespace-nowrap text-ink-mute">メーカー希望小売価格</dt>
                  <dd className="num ml-auto whitespace-nowrap text-ink-body">{item.msrp}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </Link>
      {action && <div className="mt-3 px-1">{action}</div>}
    </article>
  );
}
