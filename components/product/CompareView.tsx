"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MAX_COMPARE, clearCompare, pruneCompare, setCompare, toggleCompare, useCompareIds } from "@/components/product/compare-store";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { ModelNumber } from "@/components/product/ModelNumber";
import { ProductImage, type CardImage } from "@/components/product/ProductImage";
import type { BrandLogo, CategoryId, InstallationKey } from "@/data/products/types";

/** 比較の表に出す1機種ぶんの値（サーバー側で組み立てて渡す） */
export type CompareItem = {
  id: string;
  href: string;
  brandName: string;
  brandLogo: BrandLogo | null;
  modelNumber: string;
  name: string;
  image: CardImage | null;
  imageShared: boolean;
  category: CategoryId;
  installKey: InstallationKey;
  /** 「この商品で見積もり」の行き先 */
  quoteHref: string;
  rows: Record<string, string>;
};

/**
 * 選んだ機種（最大4機種）を、同じ項目で横に並べる。
 * 共有されたURL（/compare?ids=…）で開いたときは、その機種を選んだ状態にする。
 */
export function CompareView({ items, rowLabels }: { items: CompareItem[]; rowLabels: string[] }) {
  const ids = useCompareIds();

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("ids");
    if (!q) return;
    const known = new Set(items.map((i) => i.id));
    const fromUrl = q
      .split(",")
      .map((s) => decodeURIComponent(s.trim()))
      .filter((id) => known.has(id));
    if (fromUrl.length) setCompare(fromUrl);
  }, [items]);

  // もう載っていない機種が選ばれたままなら、外す（画面の下の「○機種を選択中」の数が合わなくなるため）
  useEffect(() => {
    if (ids.length) pruneCompare(new Set(items.map((i) => i.id)));
  }, [ids, items]);

  // URL の ids を、いまの選択に合わせる（共有しやすいように）。区切りのカンマは、読めるようにそのまま書く
  useEffect(() => {
    const url = new URL(window.location.href);
    if (ids.length) url.searchParams.set("ids", ids.join(","));
    else url.searchParams.delete("ids");
    window.history.replaceState(null, "", url.pathname + url.search.replace(/%2C/gi, ","));
  }, [ids]);

  const selected = ids.map((id) => items.find((i) => i.id === id)).filter((i): i is CompareItem => !!i);

  if (!selected.length) {
    return (
      <div className="card card-line px-6 py-8 text-center">
        <p className="font-heading text-[1.0625rem] font-black text-navy-900">比べる機種がまだ選ばれていません</p>
        <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-[1.9]">商品の一覧や機種のページで「比較に追加」を押すと、ここに並びます。{MAX_COMPARE}機種まで選べます。</p>
        <p className="mt-6">
          <Link href="/products" className="btn btn-navy">
            商品の一覧から選ぶ
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.9375rem]">
          <span className="num font-semibold">{selected.length}</span> 機種を比べています（{MAX_COMPARE}機種まで）
        </p>
        <button type="button" onClick={clearCompare} className="min-h-11 px-2 text-[0.8125rem] font-bold text-ink-mute underline underline-offset-4">
          すべて外す
        </button>
      </div>
      {selected.length > 1 && <p className="mb-2 text-[0.8125rem] text-ink-mute lg:hidden">表は横に動かして比べられます。</p>}
      <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="選んだ機種の比較">
        <table className="table-compare">
          <thead>
            <tr>
              <th scope="col">比べる点</th>
              {selected.map((i) => (
                // 見積もりのボタンを、列ごとに同じ高さにそろえる（セルの高さ 1px と、中の高さ 100% の組み合わせ。効かないブラウザでは、上に詰めて並ぶだけ）
                <th key={i.id} scope="col" className="h-px align-top">
                  <div className="flex h-full flex-col">
                    <Link href={i.href} tabIndex={-1} aria-hidden="true" className="mb-2.5 block max-w-[15rem]">
                      <ProductImage image={i.image} shared={i.imageShared} category={i.category} installKey={i.installKey} sizes="(min-width: 64rem) 240px, 176px" note={false} />
                    </Link>
                    <span className="block">
                      <MakerLogo logo={i.brandLogo} name={i.brandName} height={18} />
                    </span>
                    <Link href={i.href} className="num text-link mt-1.5 block text-[0.9375rem] leading-snug">
                      <ModelNumber value={i.modelNumber} />
                    </Link>
                    <span className="mt-1 block text-xs font-normal leading-relaxed text-ink-mute">{i.name}</span>
                    <span className="mt-auto block pt-3">
                      <Link href={i.quoteHref} className="btn btn-cta btn-xs w-full !whitespace-normal">
                        この商品で見積もり
                      </Link>
                      <button type="button" onClick={() => toggleCompare(i.id)} className="mt-1 min-h-9 text-xs font-bold text-ink-mute underline underline-offset-4">
                        外す<span className="sr-only">（{i.modelNumber}）</span>
                      </button>
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowLabels.map((label) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {selected.map((i) => (
                  <td key={i.id} className="!whitespace-normal">
                    {i.rows[label] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
