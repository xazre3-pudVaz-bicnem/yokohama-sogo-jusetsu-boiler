import Link from "next/link";
import type { ReactNode } from "react";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { ModelNumber } from "@/components/product/ModelNumber";
import { ProductImage } from "@/components/product/ProductImage";
import type { ProductCardData } from "@/lib/products";

/**
 * 機能の札（給湯・追いだき・フルオート・暖房・省エネ）。商品データの機能の区分から決める（推測で足さない）。
 *   追いだき … オート・フルオート・暖房つき（給湯専用には無い）
 *   フルオート … フルオート・暖房つき（フルオート）
 *   暖房 … 温水暖房に対応（heating）
 *   省エネ … エコジョーズ・エコキュート・ハイブリッド
 */
export function featureFlags(item: Pick<ProductCardData, "functionKey" | "heating" | "category">): { label: string; on: boolean }[] {
  const reheat = ["auto", "fullauto", "heating"].includes(item.functionKey);
  const full = ["fullauto", "heating"].includes(item.functionKey);
  return [
    { label: "給湯", on: true },
    { label: "追いだき", on: reheat },
    { label: "フルオート", on: full },
    { label: "暖房", on: item.heating },
    { label: "省エネ", on: item.category !== "gas" },
  ];
}

export function FeatureChips({ item, className = "" }: { item: Pick<ProductCardData, "functionKey" | "heating" | "category">; className?: string }) {
  return (
    <ul className={`grid grid-cols-5 gap-1 ${className}`} aria-label="機能">
      {featureFlags(item).map((f) => (
        <li
          key={f.label}
          className={`grid min-h-9 place-items-center rounded-md px-0.5 text-center text-[0.6563rem] font-bold leading-tight ${f.on ? "bg-[var(--cat-deep,#2b2b2b)] text-white" : "bg-silver-100 text-silver-600"}`}
        >
          {f.label}
          <span className="sr-only">{f.on ? "：あり" : "：なし"}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * 商品カード（商品の一覧・メーカー別・種類別・トップ・関連する機種）。2026-10-15 の依頼で、キンライサーのような作りに変えた。
 *
 * 並び：種類の色の帯（メーカーのロゴ・種類）→ 製品写真 → 機能の札 → 型番・商品名・主な仕様 → 価格 → 見積もりのボタン。
 * - 枠と帯の色は種類で変わる（ガス：緑・エコキュート：水色・ハイブリッド：紫。app/globals.css の .pcard[data-cat]）。
 * - 価格：当社の工事費込みの価格が決まっていれば、それを出す。決まっていなければ「無料お見積もり」を主に出し、
 *   メーカー希望小売価格は、小さく補足として出す（当社の販売価格と誤解されないように。割引率は出さない）。
 * - ボタンは「この商品で見積もり」（赤）と「詳細を見る」。どのカードでも、カードの下端にそろえる。
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
    <article className="pcard" data-cat={item.category}>
      <div className="pcard-head">
        <span className="inline-flex min-h-8 items-center rounded-md bg-white px-2 py-1">
          <MakerLogo logo={item.brandLogo} name={item.brandName} height={17} />
        </span>
        <span className="font-heading text-[0.8125rem] font-black tracking-wider text-white">{item.categoryName}</span>
      </div>
      <Link href={item.href} tabIndex={-1} aria-hidden="true" className="mx-3 mt-3 block">
        <ProductImage image={item.image} shared={item.imageShared} category={item.category} installKey={item.installKey} sizes={sizes} priority={priority} />
      </Link>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <FeatureChips item={item} />
        {item.subsidyBadge && (
          <p className="mt-3">
            <span className={`badge ${item.subsidyEligible ? "badge-eco" : "badge-mute"}`}>{item.subsidyBadge}</span>
          </p>
        )}
        <Heading className="mt-2">
          <Link href={item.href} className="num block text-[1.1875rem] font-bold leading-[1.3] tracking-wide text-navy-900 hover:text-cta-700">
            <ModelNumber value={item.modelNumber} />
          </Link>
        </Heading>
        {/* 商品名は、カードでは2行まで（全文は機種のページと、title で読める） */}
        <p className="mt-1 line-clamp-2 text-[0.8125rem] leading-[1.65] text-ink-mute" title={item.name}>
          {item.name}
        </p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="主な仕様">
          {item.capacity && <li className="badge">{item.capacity}</li>}
          <li className="badge !whitespace-normal">{item.installGroup}</li>
        </ul>

        {/* 価格とボタンは、カードの下端にそろえる（説明の行数がカードごとに違っても、横に並んだときに位置がそろう） */}
        <div className="mt-auto pt-4">
          <dl className="rounded-xl border-2 border-dashed border-cta-100 bg-cta-50 px-3 py-2.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <dt className="whitespace-nowrap text-xs font-bold text-ink-body">工事費込み価格</dt>
              <dd className="ml-auto whitespace-nowrap font-heading text-[1rem] font-black text-cta-700">
                {item.total !== null ? <span className="num text-xl font-bold">{item.total.toLocaleString("ja-JP")}円</span> : "無料お見積もり"}
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
            <Link href={item.href} className="inline-flex min-h-11 items-center gap-1 text-[0.8125rem] font-bold text-ink underline-offset-4 hover:text-cta-700 hover:underline">
              <svg viewBox="0 0 16 16" className="size-4 rounded-full bg-cta-700 p-0.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3.5 10.5 8 6 12.5" />
              </svg>
              詳細を見る<span className="sr-only">（{item.modelNumber}）</span>
            </Link>
            {action}
          </div>
        </div>
      </div>
    </article>
  );
}
