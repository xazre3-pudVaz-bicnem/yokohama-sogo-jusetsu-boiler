"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { CompareToggle } from "@/components/product/CompareControls";
import { pruneCompare } from "@/components/product/compare-store";
import { ProductCard } from "@/components/product/ProductCard";
import type { ProductCardData } from "@/lib/products";

/**
 * 商品一覧の絞り込み（メーカー・種類・号数・タンク容量・機能・設置方式・住まい・補助金）と並べ替え。
 *
 * - 最初の HTML には、全商品が入っている（絞り込みは画面側で行う）。JS を実行しないクローラーにも、全商品が見える。
 * - 条件は URL に書く（/products?gou=24&install=wall）。URL をそのまま共有・ブックマークできる。
 *   どの条件の URL も、canonical は /products（ページ側の metadata）。絞り込みの組み合わせごとに、別のページとして登録させない。
 * - 同じグループの中は「どれか」、グループどうしは「すべて」に当てはまる商品を出す。
 * - URL の読み取り（useSearchParams）は、何も描かない小さな部品（UrlWatcher）の中だけで行う。
 *   一覧そのものを Suspense で囲むと、静的な HTML から商品が消えてしまうため。
 */
export type FilterOption = { value: string; label: string };
export type FilterGroup = { key: string; label: string; options: FilterOption[] };

type Filters = Record<string, string[]>;
type SortKey = "default" | "msrp-asc" | "msrp-desc" | "total-asc";

const SORTS: { value: SortKey; label: string; needsTotal?: boolean }[] = [
  { value: "default", label: "標準（種類・メーカー順）" },
  { value: "total-asc", label: "工事費込みの価格が安い順", needsTotal: true },
  { value: "msrp-asc", label: "メーカー希望小売価格が安い順" },
  { value: "msrp-desc", label: "メーカー希望小売価格が高い順" },
];

function valueOf(item: ProductCardData, key: string): string[] {
  switch (key) {
    case "brand":
      return [item.brand];
    case "cat":
      return [item.category];
    case "gou":
      return item.gou ? [String(item.gou)] : [];
    case "tank":
      return item.tankLiters ? [String(item.tankLiters)] : [];
    case "func":
      return [item.functionKey];
    case "install":
      return [item.installKey];
    case "housing":
      return item.housing;
    case "subsidy":
      return item.subsidyEligible ? ["1"] : [];
    default:
      return [];
  }
}

function parse(search: string, groups: FilterGroup[]): { filters: Filters; sort: SortKey } {
  const sp = new URLSearchParams(search);
  const filters: Filters = {};
  for (const g of groups) {
    const allowed = new Set(g.options.map((o) => o.value));
    const values = (sp.get(g.key) ?? "").split(",").filter((v) => allowed.has(v));
    if (values.length) filters[g.key] = values;
  }
  const sort = SORTS.find((s) => s.value === sp.get("sort"))?.value ?? "default";
  return { filters, sort };
}

function serialize(filters: Filters, sort: SortKey, groups: FilterGroup[]): string {
  const sp = new URLSearchParams();
  for (const g of groups) if (filters[g.key]?.length) sp.set(g.key, filters[g.key].join(","));
  if (sort !== "default") sp.set("sort", sort);
  // カンマはそのまま読めるようにする
  return sp.toString().replace(/%2C/g, ",");
}

/** URL の条件が変わったら、親に知らせる（何も描かない） */
function UrlWatcher({ onChange }: { onChange: (search: string) => void }) {
  const sp = useSearchParams();
  const s = sp.toString();
  useEffect(() => onChange(s), [s, onChange]);
  return null;
}

export function ProductExplorer({ items, groups }: { items: ProductCardData[]; groups: FilterGroup[] }) {
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<SortKey>("default");
  const hasTotal = items.some((i) => i.total !== null);

  // この一覧には、載っているすべての機種がある。もう載っていない機種が比較に残っていたら外す
  useEffect(() => {
    pruneCompare(new Set(items.map((i) => i.id)));
  }, [items]);

  const fromUrl = useCallback(
    (search: string) => {
      const next = parse(search, groups);
      setFilters((prev) => (JSON.stringify(prev) === JSON.stringify(next.filters) ? prev : next.filters));
      setSort(next.sort);
    },
    [groups],
  );

  const apply = (nextFilters: Filters, nextSort: SortKey) => {
    setFilters(nextFilters);
    setSort(nextSort);
    const q = serialize(nextFilters, nextSort, groups);
    window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
  };

  const toggle = (key: string, value: string) => {
    const cur = filters[key] ?? [];
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    const copy = { ...filters };
    if (next.length) copy[key] = next;
    else delete copy[key];
    apply(copy, sort);
  };

  const shown = useMemo(() => {
    const active = Object.entries(filters);
    const list = items.filter((item) => active.every(([key, values]) => valueOf(item, key).some((v) => values.includes(v))));
    if (sort === "default") return list;
    const price = (i: ProductCardData) => (sort === "total-asc" ? i.total : i.msrpAmount);
    const dir = sort === "msrp-desc" ? -1 : 1;
    // 価格の無い商品は、最後にまとめる
    return [...list].sort((a, b) => {
      const pa = price(a);
      const pb = price(b);
      if (pa === null && pb === null) return 0;
      if (pa === null) return 1;
      if (pb === null) return -1;
      return (pa - pb) * dir;
    });
  }, [items, filters, sort]);

  const activeCount = Object.values(filters).reduce((n, v) => n + v.length, 0);
  const activeLabels = groups.flatMap((g) => (filters[g.key] ?? []).map((v) => ({ key: g.key, value: v, label: g.options.find((o) => o.value === v)?.label ?? v })));

  const panel = (
    <div className="space-y-6">
      {groups.map((g) => (
        <fieldset key={g.key}>
          <legend className="font-heading text-[0.8125rem] font-bold tracking-wider text-navy-900">{g.label}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {g.options.map((o) => (
              <label key={o.value} className="opt">
                <input type="checkbox" className="sr-only" checked={(filters[g.key] ?? []).includes(o.value)} onChange={() => toggle(g.key, o.value)} />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );

  return (
    <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[17rem_1fr]">
      <Suspense fallback={null}>
        <UrlWatcher onChange={fromUrl} />
      </Suspense>

      {/* 絞り込み：PC は左に並べ、スマホ・タブレットは開閉する */}
      <div>
        <details className="card card-line group px-4 lg:hidden">
          <summary className="flex min-h-14 items-center justify-between gap-3 font-heading font-bold text-navy-900">
            <span>
              条件で絞り込む
              {activeCount > 0 && <span className="num ml-2 inline-grid size-6 place-items-center rounded-full bg-brand-700 text-xs font-semibold text-white">{activeCount}</span>}
            </span>
            <span className="relative grid size-6 place-items-center rounded-full bg-cream text-navy-900" aria-hidden="true">
              <span className="absolute h-0.5 w-2.5 rounded bg-current" />
              <span className="absolute h-2.5 w-0.5 rounded bg-current transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <div className="border-t-2 border-dotted border-silver-300 py-5">{panel}</div>
        </details>
        <div className="sticky top-24 hidden max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-xl border border-silver-200 bg-white px-5 py-6 lg:block">
          <p className="mb-5 font-heading text-base font-black text-navy-900">条件で絞り込む</p>
          {panel}
        </div>
      </div>

      <div id="results" className="scroll-mt-28">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p aria-live="polite" className="text-[0.9375rem] font-bold text-navy-900">
            <span className="num text-2xl font-semibold">{shown.length}</span> 機種
            {activeCount > 0 && <span className="ml-1 text-[0.8125rem] font-normal text-ink-mute">（全 {items.length} 機種のうち）</span>}
          </p>
          <label className="flex items-center gap-2 text-[0.8125rem] font-bold text-navy-900">
            並べ替え
            <select value={sort} onChange={(e) => apply(filters, e.target.value as SortKey)} className="field !min-h-11 !w-auto !py-1.5 text-[0.875rem]">
              {SORTS.filter((s) => !s.needsTotal || hasTotal).map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {activeLabels.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeLabels.map((a) => (
              <button key={`${a.key}-${a.value}`} type="button" onClick={() => toggle(a.key, a.value)} className="badge badge-blue min-h-9 !px-3" aria-label={`条件「${a.label}」を外す`}>
                {a.label}
                <span aria-hidden="true" className="text-base leading-none">
                  ×
                </span>
              </button>
            ))}
            <button type="button" onClick={() => apply({}, sort)} className="min-h-9 px-2 text-[0.8125rem] font-bold text-brand-700 underline underline-offset-4">
              条件をすべて外す
            </button>
          </div>
        )}

        {shown.length === 0 ? (
          <div className="mt-8 rounded-xl bg-paper-2 px-6 py-10 text-center">
            <p className="font-heading text-lg font-black text-navy-900">条件に合う機種が、まだ掲載されていません</p>
            <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-[1.95]">このサイトに載せているのは、代表的な機種です。いまお使いの給湯器の型番をお知らせいただければ、設置の形と号数に合う機種をお調べします。</p>
            <button type="button" onClick={() => apply({}, sort)} className="btn btn-outline btn-sm mt-5">
              条件をすべて外す
            </button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((item, index) => (
              <li key={item.id}>
                <ProductCard item={item} headingLevel="h2" action={<CompareToggle id={item.id} model={item.modelNumber} variant="compact" />} sizes="(min-width: 1280px) 280px, (min-width: 640px) 44vw, 92vw" priority={index === 0} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
