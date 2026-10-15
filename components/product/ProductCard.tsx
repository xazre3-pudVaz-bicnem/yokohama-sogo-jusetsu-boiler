import Link from "next/link";
import type { ReactNode } from "react";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { ModelNumber } from "@/components/product/ModelNumber";
import { ProductImage } from "@/components/product/ProductImage";
import type { ProductCardData } from "@/lib/products";

/**
 * 商品カード（商品の一覧・メーカー別・種類別・トップ・関連する機種）。
 *
 * 並び：メーカーのロゴと補助金の札 → 製品写真 → 種類・型番・商品名 → 主な仕様の札 → 価格 → 見積もりのボタン。
 * - 写真がカードの主役。写真の枠は比率を固定して、カードの高さと写真の位置をそろえる。
 * - 価格：当社の工事費込みの価格が決まっていれば、それを出す。決まっていなければ「無料お見積もり」を主に出し、
 *   メーカー希望小売価格は、小さく補足として出す（当社の販売価格と誤解されないように）。
 * - ボタンは「この商品で見積もり」（問い合わせの色）と「詳細を見る」。どのカードでも、カードの下端にそろえる。
 * - 写真・型番・「詳細を見る」は同じページへのリンク。読み上げで3回続かないよう、写真のリンクは読み上げから外す。
 *
 * 画面側（絞り込みの一覧）からも使うので、サーバー専用のものを import しない。
 * action … 「比較に追加」など、カードの下に置く操作
 */
export function ProductCard({
  item,
  sizes = "(min-width: 1280px) 300px, (min-width: 640px) 45vw, 92vw",
  action,
  headingLevel = "h3",
  priority = false,
}: {
  item: ProductCardData;
  sizes?: string;
  action?: ReactNode;
  headingLevel?: "h2" | "h3" | "h4";
  priority?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <article className="pcard">
      <div className="flex min-h-12 items-center justify-between gap-2 px-4 pt-3">
        <MakerLogo logo={item.brandLogo} name={item.brandName} height={20} />
        {item.subsidyBadge && <span className={`badge ${item.subsidyEligible ? "badge-eco" : "badge-mute"}`}>{item.subsidyBadge}</span>}
      </div>
      <Link href={item.href} tabIndex={-1} aria-hidden="true" className="mx-3 mt-1 block">
        <ProductImage image={item.image} shared={item.imageShared} category={item.category} installKey={item.installKey} sizes={sizes} priority={priority} />
      </Link>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <p className="text-xs font-bold tracking-wider text-brand-700">{item.categoryName}</p>
        <Heading className="mt-1">
          <Link href={item.href} className="num block text-[1.1875rem] font-semibold leading-[1.3] tracking-wide text-navy-900 hover:text-brand-700">
            <ModelNumber value={item.modelNumber} />
          </Link>
        </Heading>
        {/* 商品名は、カードでは2行まで（全文は機種のページと、title で読める） */}
        <p className="mt-1 line-clamp-2 text-[0.8125rem] leading-[1.65] text-ink-mute" title={item.name}>
          {item.name}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="主な仕様">
          {item.capacity && <li className="badge">{item.capacity}</li>}
          <li className="badge">{item.functionLabel}</li>
          <li className="badge !whitespace-normal">{item.installGroup}</li>
        </ul>

        {/* 価格とボタンは、カードの下端にそろえる（説明の行数がカードごとに違っても、横に並んだときに位置がそろう） */}
        <div className="mt-auto pt-4">
          <dl className="rounded-lg bg-paper-2 px-3 py-2.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <dt className="whitespace-nowrap text-xs font-bold text-ink-body">工事費込み価格</dt>
              <dd className="ml-auto whitespace-nowrap font-heading text-[0.9375rem] font-bold text-navy-900">
                {item.total !== null ? <span className="num text-lg font-semibold">{item.total.toLocaleString("ja-JP")}円</span> : "無料お見積もり"}
              </dd>
            </div>
            {item.msrp && (
              <div className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3 text-[0.6875rem] leading-relaxed text-ink-mute">
                <dt className="whitespace-nowrap">メーカー希望小売価格（参考）</dt>
                <dd className="num ml-auto whitespace-nowrap">{item.msrp}</dd>
              </div>
            )}
          </dl>
          <Link href={item.quoteHref} className="btn btn-cta btn-xs mt-3 w-full">
            この商品で見積もり
          </Link>
          <div className="mt-2 flex items-center justify-between gap-2">
            <Link href={item.href} className="inline-flex min-h-11 items-center gap-1 text-[0.8125rem] font-bold text-brand-700 underline-offset-4 hover:underline">
              詳細を見る<span className="sr-only">（{item.modelNumber}）</span>
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3.5 10.5 8 6 12.5" />
              </svg>
            </Link>
            {action}
          </div>
        </div>
      </div>
    </article>
  );
}
