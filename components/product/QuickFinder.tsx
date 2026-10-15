"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/** かんたん診断で使う、機種ごとの最小限の情報（サーバー側で作って渡す） */
export type FinderItem = { cat: string; housing: string[]; gou: number | null; tank: number | null; func: string };

type Answer = { housing: string; energy: string; people: string; reheat: string; model: string };

const Q: { key: keyof Answer; title: string; options: { value: string; label: string }[] }[] = [
  { key: "housing", title: "お住まいは", options: [{ value: "detached", label: "戸建て" }, { value: "apartment", label: "マンション" }] },
  {
    key: "energy",
    title: "いまの給湯器は",
    options: [
      { value: "gas", label: "ガス" },
      { value: "electric", label: "電気（エコキュートなど）" },
      { value: "hybrid", label: "電気とガス（ハイブリッド）" },
      { value: "unknown", label: "分からない" },
    ],
  },
  {
    key: "people",
    title: "家族の人数は",
    options: [
      { value: "1", label: "1人" },
      { value: "2", label: "2〜3人" },
      { value: "4", label: "4人" },
      { value: "5", label: "5人以上" },
    ],
  },
  { key: "reheat", title: "お風呂の追いだきは", options: [{ value: "yes", label: "使う" }, { value: "no", label: "使わない" }, { value: "unknown", label: "分からない" }] },
  { key: "model", title: "いまの給湯器の型番は", options: [{ value: "yes", label: "分かる" }, { value: "no", label: "分からない" }] },
];

/** 答えから、商品一覧の絞り込みの条件を作る（同じ条件の書き方は components/product/ProductExplorer.tsx） */
function toFilters(a: Answer): Record<string, string[]> {
  const f: Record<string, string[]> = {};
  if (a.housing) f.housing = [a.housing];
  if (a.energy === "gas") f.cat = ["eco-jozu", "gas"];
  if (a.energy === "electric") f.cat = ["ecocute"];
  if (a.energy === "hybrid") f.cat = ["hybrid"];
  // 号数（ガス）はリンナイの目安：ひとり暮らし 16号・2人家族 20号・4人家族 24号。エコキュートは掲載機種の 370L・460L から
  if (a.people && a.energy === "gas") f.gou = [a.people === "1" ? "16" : a.people === "2" ? "20" : "24"];
  if (a.people && a.energy === "electric") f.tank = [a.people === "5" ? "460" : "370"];
  if (a.reheat === "yes") f.func = ["fullauto", "auto"];
  if (a.reheat === "no") f.func = ["hot-water-only"];
  return f;
}

function matches(item: FinderItem, f: Record<string, string[]>): boolean {
  const value: Record<string, string[]> = {
    housing: item.housing,
    cat: [item.cat],
    gou: item.gou ? [String(item.gou)] : [],
    tank: item.tank ? [String(item.tank)] : [],
    func: [item.func],
  };
  return Object.entries(f).every(([k, vs]) => (value[k] ?? []).some((v) => vs.includes(v)));
}

/**
 * かんたん診断（商品一覧の上）。5つの質問に答えると、合いそうな機種の一覧（絞り込み済み）へ案内する。
 * 設置できるかどうかは、設置の形と現地の条件で決まるので、ここでは「候補」として出す（適合を保証しない）。
 * 型番が分かる方には、写真でかんたん見積もりを、いちばん確かな方法として案内する。
 */
export function QuickFinder({ items }: { items: FinderItem[] }) {
  const [a, setA] = useState<Answer>({ housing: "", energy: "", people: "", reheat: "", model: "" });
  const filters = useMemo(() => toFilters(a), [a]);
  const count = useMemo(() => items.filter((i) => matches(i, filters)).length, [items, filters]);
  const answered = Object.values(a).filter(Boolean).length;
  const qs = new URLSearchParams(Object.entries(filters).map(([k, v]) => [k, v.join(",")])).toString().replace(/%2C/g, ",");

  return (
    <div className="rounded-xl border border-silver-200 bg-white px-5 py-5 sm:px-7 sm:py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id="finder-title" className="h-sub">
          かんたん診断：合いそうな機種を探す
        </h2>
        <p className="text-[0.8125rem] text-ink-mute">分かるところだけ選んでください</p>
      </div>
      <div className="mt-4 grid gap-x-8 gap-y-4 lg:grid-cols-2">
        {Q.map((q) => (
          <fieldset key={q.key}>
            <legend className="text-[0.875rem] font-bold text-navy-900">{q.title}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((o) => (
                <label key={o.value} className="opt">
                  <input
                    type="radio"
                    name={`finder-${q.key}`}
                    value={o.value}
                    checked={a[q.key] === o.value}
                    onChange={() => setA((prev) => ({ ...prev, [q.key]: o.value }))}
                    className="sr-only"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3 border-t border-dotted border-silver-300 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.9063rem] font-bold text-navy-900" aria-live="polite">
          {answered === 0 ? (
            "選ぶと、候補の機種の数がここに出ます"
          ) : (
            <>
              候補の機種：<span className="num text-xl font-semibold">{count}</span> 機種
              <span className="ml-2 text-[0.8125rem] font-normal text-ink-mute">（設置できるかは、現地で確かめます）</span>
            </>
          )}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {a.model === "yes" && (
            <Link href="/contact/photo" className="btn btn-cta btn-sm">
              型番の写真で見積もり
            </Link>
          )}
          <Link href={qs ? `/products?${qs}#results` : "/products#results"} className={`btn btn-sm ${a.model === "yes" ? "btn-outline" : "btn-navy"}`} aria-disabled={answered === 0 || undefined}>
            候補の機種を見る
          </Link>
        </div>
      </div>
      {a.model === "no" && (
        <p className="mt-3 text-[0.8125rem] leading-[1.85] text-ink-mute">
          型番は、本体の正面か側面のシールに書かれています。
          <Link href="/guide/model-label" className="text-link ml-1">
            型番の調べ方
          </Link>
          。分からないままでも、本体の写真からご相談いただけます。
        </p>
      )}
    </div>
  );
}
