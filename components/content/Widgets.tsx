import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { BudgetMeter } from "@/components/sections/BudgetMeter";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { AREA_STAT_AS_OF, getArea, wardAreas } from "@/data/areas";
import type { WidgetName } from "@/data/content-types";
import type { CategoryId, Product } from "@/data/products/types";
import { chintaiShoene2026 as c, kyutouShoene2026 as k, miraiEco2026 as m, yokohamaYgrep2026 as y } from "@/data/subsidy/programs";
import { isContactFormShown } from "@/lib/contact";
import { getBrand, productPath, productsByCategory, toCard } from "@/lib/products";
import { formatDateJa } from "@/lib/seo";
import { lineUrl } from "@/lib/site";
import { manYen, operatorStatement } from "@/lib/subsidy";
import { ModelNumber } from "@/components/product/ModelNumber";

/**
 * 本文の中に入れる、データから作る部品（data/content-types.ts の WidgetName）。
 * 補助金の金額・期限・登録の状況は、ここでデータから組み立てる（本文に数字を直接書かない）。
 */
export function Widget({ name }: { name: WidgetName }) {
  switch (name) {
    case "kyutou-amounts":
      return <KyutouAmounts />;
    case "kyutou-period":
      return <KyutouPeriod />;
    case "kyutou-status":
      return <KyutouStatus />;
    case "operator-status":
      return <OperatorStatus />;
    case "program-compare":
      return <ProgramCompare />;
    case "hybrid-registered":
      return <RegisteredTable category="hybrid" />;
    case "ecocute-registered":
      return <RegisteredTable category="ecocute" />;
    case "hybrid-compare":
      return <HybridCompare />;
    case "products-gas":
      return <ProductGrid category="gas" />;
    case "products-eco-jozu":
      return <ProductGrid category="eco-jozu" />;
    case "products-ecocute":
      return <ProductGrid category="ecocute" />;
    case "products-hybrid":
      return <ProductGrid category="hybrid" />;
    case "ygrep-summary":
      return <YgrepSummary />;
    case "ward-compare":
      return <WardCompare />;
    case "contact-photo-guide":
      return <ContactPhotoGuide />;
  }
}

function TableShell({ label, children, note }: { label: string; children: React.ReactNode; note?: React.ReactNode }) {
  return (
    <figure>
      <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label={label}>
        {children}
      </div>
      {note && <figcaption className="mt-2.5 text-[0.8125rem] leading-[1.9] text-ink-mute">{note}</figcaption>}
    </figure>
  );
}

/* ── 給湯省エネ2026事業：補助額 ─────────────────────────── */
export function KyutouAmounts() {
  const rows: [string, number, number][] = [
    ["エコキュート", k.base.ecocute, k.performanceBonus.ecocute],
    ["ハイブリッド給湯機", k.base.hybrid, k.performanceBonus.hybrid],
    ["エネファーム", k.base.enefarm, k.performanceBonus.enefarm],
  ];
  return (
    <TableShell
      label={`${k.name}の補助額の表（給湯器ごと）`}
      note={
        <>
          撤去加算：電気蓄熱暖房機 {manYen(k.removalBonus.storageHeater.amount)}／台（{k.removalBonus.storageHeater.limit}）、電気温水器 {manYen(k.removalBonus.electricWaterHeater.amount)}／台（{k.removalBonus.electricWaterHeater.limit}）。{formatDateJa(k.verifiedAt)}に
          <a href={k.urls.overview} target="_blank" rel="noopener noreferrer" className="text-link !font-normal">
            公式ページ
          </a>
          で確認。
        </>
      }
    >
      <table className="table-spec">
        <thead>
          <tr>
            <th scope="col">設置する給湯器</th>
            <th scope="col">基本額（1台）</th>
            <th scope="col">性能加算（1台）</th>
            <th scope="col">合わせた額</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, base, bonus]) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              <td className="num">{manYen(base)}</td>
              <td className="num">{bonus ? `＋${manYen(bonus)}` : "なし"}</td>
              <td className="num font-bold text-navy-900">{manYen(base + bonus)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">ガス給湯器・エコジョーズ</th>
            <td colSpan={3}>対象外</td>
          </tr>
        </tbody>
      </table>
    </TableShell>
  );
}

/* ── 給湯省エネ2026事業：期間 ───────────────────────────── */
export function KyutouPeriod() {
  return (
    <dl className="dl-spec card card-line px-5 sm:px-7">
      <div>
        <dt>対象になる工事</dt>
        <dd className="text-[0.9375rem] leading-[1.95]">{formatDateJa(k.constructionFrom)}以降に着手したもの</dd>
      </div>
      <div>
        <dt>交付申請の予約</dt>
        <dd className="text-[0.9375rem] leading-[1.95]">遅くとも{formatDateJa(k.reservationDeadline)}まで（任意）</dd>
      </div>
      <div>
        <dt>交付申請</dt>
        <dd className="text-[0.9375rem] leading-[1.95]">遅くとも{formatDateJa(k.applicationDeadline)}まで（工事の完了後に申請）</dd>
      </div>
      <div>
        <dt>早く終わる場合</dt>
        <dd className="text-[0.9375rem] leading-[1.95]">申請額が予算（{k.budget.totalOkuYen}億円）の上限に達した時点で、受付終了</dd>
      </div>
    </dl>
  );
}

/* ── いまの受付の状態 ───────────────────────────────────── */
export function KyutouStatus() {
  return <BudgetMeter />;
}

/* ── 当社が申請を行えるか ───────────────────────────────── */
export function OperatorStatus() {
  const s = operatorStatement();
  return (
    <div className={`callout ${s.confirmed ? "" : "callout-plain"}`}>
      <p className="font-heading font-bold text-navy-900">補助金の申請について</p>
      <p>{s.text}</p>
    </div>
  );
}

/* ── 制度の比較 ─────────────────────────────────────────── */
export function ProgramCompare() {
  return (
    <TableShell label="給湯器が対象の国の制度の比較" note={`${formatDateJa(k.verifiedAt)}に、それぞれの公式ページで確認。いずれも、登録された事業者が申請し、対象は各事業のリストに登録された型番に限られます。`}>
      <table className="table-spec">
        <thead>
          <tr>
            <th scope="col">比べる点</th>
            <th scope="col">{k.name}</th>
            <th scope="col">{m.name}（リフォーム）</th>
            <th scope="col">{c.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">担当</th>
            <td>{k.ministry}</td>
            <td>{m.ministry}</td>
            <td>{c.ministry}</td>
          </tr>
          <tr>
            <th scope="row">給湯器だけの交換</th>
            <td>使える</td>
            <td>使えない（断熱の改修が条件）</td>
            <td>使える（賃貸の集合住宅だけ）</td>
          </tr>
          <tr>
            <th scope="row">対象の人</th>
            <td>住宅の所有者・賃借人など</td>
            <td>住宅の所有者・賃借人など</td>
            <td>{c.target}</td>
          </tr>
          <tr>
            <th scope="row">エコキュート</th>
            <td className="num">
              {manYen(k.base.ecocute)}〜{manYen(k.base.ecocute + k.performanceBonus.ecocute)}／台
            </td>
            <td className="num">{manYen(m.waterHeater.ecocuteOrHybrid)}／戸</td>
            <td>対象外</td>
          </tr>
          <tr>
            <th scope="row">ハイブリッド給湯機</th>
            <td className="num">
              {manYen(k.base.hybrid)}〜{manYen(k.base.hybrid + k.performanceBonus.hybrid)}／台
            </td>
            <td className="num">{manYen(m.waterHeater.ecocuteOrHybrid)}／戸</td>
            <td>対象外</td>
          </tr>
          <tr>
            <th scope="row">エネファーム</th>
            <td className="num">{manYen(k.base.enefarm)}／台</td>
            <td>対象外</td>
            <td>対象外</td>
          </tr>
          <tr>
            <th scope="row">エコジョーズ</th>
            <td>対象外</td>
            <td className="num">{manYen(m.waterHeater.ecoJozuOrEcoFeel)}／戸</td>
            <td className="num">
              {manYen(c.base.withoutReheat)}〜{manYen(c.base.withReheat)}／台
            </td>
          </tr>
          <tr>
            <th scope="row">住宅の条件</th>
            <td>新築・既存のどちらも</td>
            <td>{m.targetHousing}</td>
            <td>既存の賃貸の集合住宅</td>
          </tr>
        </tbody>
      </table>
    </TableShell>
  );
}

/* ── 国のリストでの登録の状況（このサイトの掲載機種） ───── */
const ELIGIBILITY_LABEL: Record<Product["subsidyEligibility"], string> = {
  bonus: "登録あり（性能加算の要件にも適合）",
  eligible: "登録あり",
  "not-listed": "登録を確認できず",
  "not-target": "対象外",
  unverified: "確認中",
};

export function RegisteredTable({ category }: { category: CategoryId }) {
  const list = productsByCategory(category);
  if (!list.length) return null;
  const verified = list.map((p) => p.subsidyVerifiedAt).filter((d): d is string => !!d).sort().at(-1);
  return (
    <TableShell
      label={category === "hybrid" ? "ハイブリッド給湯機の登録の状況" : "エコキュートの登録の状況"}
      note={
        <>
          {verified ? `${formatDateJa(verified)}に、` : ""}
          <a href={category === "hybrid" ? k.urls.productSearchHybrid : k.urls.productSearchEcocute} target="_blank" rel="noopener noreferrer" className="text-link !font-normal">
            国の「補助対象製品の検索」
          </a>
          で確かめた結果です。リストは更新されるので、契約の前に最新の内容をご確認ください。
        </>
      }
    >
      <table className="table-spec">
        <thead>
          <tr>
            <th scope="col">機種</th>
            <th scope="col">{category === "hybrid" ? "登録の型番（ヒートポンプユニット）" : "登録の型番"}</th>
            <th scope="col">登録の状況</th>
            <th scope="col">補助額</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id}>
              <th scope="row" className="!whitespace-normal min-w-[14rem]">
                <Link href={productPath(p)} className="text-link">
                  <span className="block text-xs font-normal text-ink-mute">{getBrand(p.brand).name}</span>
                  <span className="num">
                    <ModelNumber value={p.modelNumber} />
                  </span>
                </Link>
              </th>
              <td className="num">{p.subsidyListedModel ?? "—"}</td>
              <td>
                {ELIGIBILITY_LABEL[p.subsidyEligibility]}
                {p.subsidyNote && <span className="mt-1 block text-[0.8125rem] leading-[1.7] text-ink-mute">{p.subsidyNote}</span>}
              </td>
              <td className="num">{p.subsidyAmount ? manYen(p.subsidyAmount) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}

/* ── ハイブリッド給湯機の機種の比較 ─────────────────────── */
function specOf(p: Product, ...keys: string[]): string {
  for (const key of keys) {
    const hit = p.specifications.find((s) => s.label.includes(key));
    if (hit) return hit.value;
  }
  return "—";
}

/** 国の対象製品リストに登録された年間給湯効率（仕様の欄の「…の登録値」から、数字の部分だけ） */
export function registeredEfficiency(p: Product): string {
  const v = specOf(p, "登録値");
  return v === "—" ? v : v.split("（")[0];
}

/**
 * ハイブリッド給湯機の機種の比較。機種が多いので、1機種を1行にして縦に並べる（スマホでも読める）。
 * 年間給湯効率は、メーカーごとに試験の条件の書き方が違うため、国のリストの登録値でそろえる。
 */
export function HybridCompare() {
  const list = productsByCategory("hybrid");
  if (!list.length) return null;
  return (
    <TableShell
      label="ハイブリッド給湯機の機種の比較"
      note={
        <>
          仕様は、各メーカーの公式ページ・カタログで確かめた内容です。年間給湯効率は、国の
          <a href={k.urls.productSearchHybrid} target="_blank" rel="noopener noreferrer" className="text-link !font-normal">
            補助対象製品の検索
          </a>
          に登録された、ヒートポンプユニットの値です。
        </>
      }
    >
      <table className="table-spec">
        <thead>
          <tr>
            <th scope="col">機種</th>
            <th scope="col">タンク</th>
            <th scope="col">ガスの号数</th>
            <th scope="col">タイプ</th>
            <th scope="col">年間給湯効率</th>
            <th scope="col">国の補助額</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id}>
              <th scope="row" className="!whitespace-normal min-w-[15rem]">
                <Link href={productPath(p)} className="text-link">
                  <span className="block text-xs font-normal text-ink-mute">
                    {getBrand(p.brand).name}・{p.series}
                  </span>
                  <span className="num block text-[0.875rem] leading-snug">
                    <ModelNumber value={p.modelNumber} />
                  </span>
                </Link>
              </th>
              <td className="num">{p.capacity.tankLiters ? `${p.capacity.tankLiters}L` : "—"}</td>
              <td className="num">{p.capacity.gou ? `${p.capacity.gou}号` : "—"}</td>
              <td>{p.functions.label}</td>
              <td className="num">{registeredEfficiency(p)}</td>
              <td className="num">{p.subsidyAmount ? manYen(p.subsidyAmount) : ELIGIBILITY_LABEL[p.subsidyEligibility]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}

/* ── 区ごとの住まいの統計（地域のページのある区） ───────────── */
export function WardCompare() {
  const city = getArea("yokohama");
  const rows = [...wardAreas()].sort((a, b) => b.stats.detachedPercent - a.stats.detachedPercent);
  const pct = (n: number) => `${n.toFixed(1)}%`;
  return (
    <TableShell
      label="区ごとの住まいの統計"
      note={
        <>
          {AREA_STAT_AS_OF.housing}の住宅・土地統計調査（横浜市の公表値）。一戸建て・共同住宅・建築の時期・太陽光は「住宅数」に対する割合、6階建以上は共同住宅に対する割合です。一戸建ての割合の高い順に並べています。
        </>
      }
    >
      <table className="table-spec">
        <thead>
          <tr>
            <th scope="col">地域</th>
            <th scope="col">一戸建て</th>
            <th scope="col">共同住宅</th>
            <th scope="col">うち6階建以上</th>
            <th scope="col">1980年以前の建築</th>
            <th scope="col">太陽光発電あり</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a.slug}>
              <th scope="row">
                <Link href={`/area/${a.slug}`} className="text-link py-2">
                  {a.shortName}
                </Link>
              </th>
              <td className="num">{pct(a.stats.detachedPercent)}</td>
              <td className="num">{pct(a.stats.apartmentPercent)}</td>
              <td className="num">{pct(a.stats.sixStoryPercent)}</td>
              <td className="num">{pct(a.stats.upTo1980Percent)}</td>
              <td className="num">{pct(a.stats.solarPercent)}</td>
            </tr>
          ))}
          {city && (
            <tr>
              <th scope="row">横浜市全体</th>
              <td className="num">{pct(city.stats.detachedPercent)}</td>
              <td className="num">{pct(city.stats.apartmentPercent)}</td>
              <td className="num">{pct(city.stats.sixStoryPercent)}</td>
              <td className="num">{pct(city.stats.upTo1980Percent)}</td>
              <td className="num">{pct(city.stats.solarPercent)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </TableShell>
  );
}

/* ── 種類ごとの商品の一覧 ───────────────────────────────── */
export function ProductGrid({ category, limit }: { category: CategoryId; limit?: number }) {
  const list = productsByCategory(category).slice(0, limit);
  if (!list.length) return null;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => (
        <li key={p.id}>
          <ProductCard item={toCard(p)} />
        </li>
      ))}
    </ul>
  );
}

/* ── 横浜市の制度のまとめ ───────────────────────────────── */
export function YgrepSummary() {
  return (
    <div className="card card-line px-5 py-5 sm:px-7 sm:py-6">
      <p className="font-heading text-base font-black text-navy-900">
        {y.name}（{y.fiscal}）
      </p>
      <p className="mt-1 text-[0.8125rem] text-ink-mute">{y.kind}</p>
      <dl className="dl-spec mt-2">
        <div>
          <dt>エコキュート</dt>
          <dd className="text-[0.9375rem] leading-[1.95]">
            <strong className="num text-navy-900">{manYen(y.points.ecocute)}分</strong>／件
            <ul className="dash-list mt-1.5 space-y-1 text-[0.875rem]">
              {y.conditions.ecocute.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>エネファーム</dt>
          <dd className="text-[0.9375rem] leading-[1.95]">
            <strong className="num text-navy-900">{manYen(y.points.enefarm)}分</strong>／件
          </dd>
        </div>
        <div>
          <dt>ハイブリッド給湯機</dt>
          <dd className="text-[0.9375rem] leading-[1.95]">対象の設備に含まれていません</dd>
        </div>
        <div>
          <dt>受付の期間</dt>
          <dd className="text-[0.9375rem] leading-[1.95]">
            {formatDateJa(y.applicationFrom)}〜{formatDateJa(y.applicationDeadline)}（先着順。予算 {y.budgetText}に達した時点で終了）
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-[0.8125rem] leading-[1.9] text-ink-mute">
        {formatDateJa(y.verifiedAt)}に
        <a href={y.urls.city} target="_blank" rel="noopener noreferrer" className="text-link mx-0.5 !font-normal">
          横浜市のページ
        </a>
        と
        <a href={y.urls.site} target="_blank" rel="noopener noreferrer" className="text-link mx-0.5 !font-normal">
          特設サイト
        </a>
        で確認。
      </p>
    </div>
  );
}

/* ── 型番と設置場所の写真の送り方 ───────────────────────── */
export function ContactPhotoGuide() {
  const line = lineUrl();
  const form = isContactFormShown();
  const shots = [
    { title: "型番のシール（銘板）", text: "本体の正面か側面にあります。文字が読める大きさで。" },
    { title: "本体の全体", text: "配管と、まわりの壁・地面が入るように、少し離れて。" },
    { title: "リモコン", text: "台所と浴室のリモコン。型番が分かれば、そこも。" },
  ];
  return (
    <div className="card card-line px-5 py-6 sm:px-7">
      <p className="font-heading text-base font-black text-navy-900">写真を3枚送っていただくと、機種の候補を絞れます</p>
      <ol className="mt-4 grid gap-4 sm:grid-cols-3">
        {shots.map((s, i) => (
          <li key={s.title} className="flex gap-3 sm:block">
            <span className="num grid size-8 shrink-0 place-items-center rounded-full bg-navy-900 text-sm font-semibold leading-none text-white" aria-hidden="true">
              {i + 1}
            </span>
            <span className="sm:mt-2.5 sm:block">
              <span className="block font-heading text-[0.9375rem] font-bold text-navy-900">{s.title}</span>
              <span className="mt-0.5 block text-[0.8125rem] leading-[1.8]">{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap gap-3">
        {line && (
          <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" data-cv="line">
            <LineIcon className="size-5" />
            LINE で写真を送る
          </a>
        )}
        {form && (
          <Link href="/contact" className="btn btn-outline btn-sm">
            フォームに写真を添える
            <Icon name="arrowRight" className="btn-arrow size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
