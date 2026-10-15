import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompareToggle } from "@/components/product/CompareControls";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductVisual } from "@/components/product/ProductVisual";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Phrase } from "@/components/ui/Phrase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategory, housingLabels, installationLabels } from "@/data/categories";
import { kyutouShoene2026 as k, yokohamaYgrep2026 as y } from "@/data/subsidy/programs";
import { worksOfProduct } from "@/data/works";
import { extraCostItems, productNotes } from "@/lib/product-notes";
import { capacityLabel, getBrand, getProduct, manufacturerPriceLabel, priceView, productPath, products, productTitle, relatedProducts, subsidyView, toCard } from "@/lib/products";
import { productSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa, formatYen } from "@/lib/seo";
import { kyutouPhase, manYen, operatorStatement } from "@/lib/subsidy";
import { ModelNumber } from "@/components/product/ModelNumber";

/**
 * 機種のページ（/products/<メーカー>/<型番>）。
 *
 * - 型番・仕様・特徴は、メーカーの公式の情報だけ（data/products）。確かめた日と、メーカーの公式ページへのリンクを出す。
 * - 当社の価格が入っていない項目は「お見積もり」。ほかの販売店の価格は使わない。
 * - 製品写真は、メーカーの掲載許諾が確認できたものだけ。それまでは設置タイプの図を出す。
 * - 補助金の対象かどうかは、国の対象製品リストで確かめた結果と日付を出す。補助金を引いた金額は、
 *   当社の総額が決まっていて、対象を確認できた機種だけに出す。
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ brand: p.brand, slug: p.slug }));
}

type Params = { params: Promise<{ brand: string; slug: string }> };

/**
 * 仕様表のうち、商品データの specifications から出す行。上の決まった行（型番・ユニット・タンクの容量など）と重ねない。
 * - タンクの容量と同じ値の「タンク容量」は出さない。
 * - ユニットの型番の行と同じ名前（「ヒートポンプユニット」など）の行は、「〜の仕様」として出す。
 */
function specRows(p: NonNullable<ReturnType<typeof getProduct>>): { label: string; value: string }[] {
  const unitLabels = new Set((p.units ?? []).map((u) => u.label));
  return p.specifications
    .filter((s) => !(/^タンクの?容量$/.test(s.label) && p.capacity.tankLiters && s.value === `${p.capacity.tankLiters}L`))
    .map((s) => (unitLabels.has(s.label) ? { ...s, label: `${s.label}の仕様` } : s));
}

/** 出典のリンクの名前（URL をそのまま見せず、どこの、どんな資料かを書く） */
const SOURCE_SITES: [RegExp, string][] = [
  [/(^|\.)rkids\.rinnai\.jp$/, "リンナイの技術資料"],
  [/(^|\.)rinnai\.(jp|co\.jp)$/, "リンナイ"],
  [/(^|\.)n-techdocs\.com$/, "ノーリツの技術資料"],
  [/^noritz\.mediapress-net\.com$/, "ノーリツのデジタルカタログ"],
  [/(^|\.)noritz\.co\.jp$/, "ノーリツ"],
  [/^paloma\.icata\.net$/, "パロマのデジタルカタログ"],
  [/(^|\.)paloma\.co\.jp$/, "パロマ"],
  [/(^|\.)mitsubishielectric\.co\.jp$/, "三菱電機"],
  [/^esctlg\.panasonic\.biz$/, "パナソニックのデジタルカタログ"],
  [/^www2\.panasonic\.biz$/, "パナソニックの図面・仕様書"],
  [/(^|\.)panasonic\.(jp|biz)$/, "パナソニック"],
  [/(^|\.)daikin(aircon)?\.(co\.jp|com)$/, "ダイキン"],
  [/(^|\.)corona\.co\.jp$/, "コロナ"],
  [/(^|\.)catalabo\.org$/, "デジタルカタログ（カタらぼ）"],
  [/^jutaku-shoene2026\.mlit\.go\.jp$/, "住宅省エネ2026キャンペーン（国）"],
];
/** 同じ名前が並ぶときは、番号を付けて見分けられるようにする */
function sourceLinks(urls: string[]): { url: string; label: string }[] {
  const labels = urls.map(sourceLabel);
  const seen = new Map<string, number>();
  return urls.map((url, i) => {
    const label = labels[i];
    if (labels.filter((l) => l === label).length < 2) return { url, label };
    const n = (seen.get(label) ?? 0) + 1;
    seen.set(label, n);
    return { url, label: `${label}（${n}）` };
  });
}
function sourceLabel(url: string): string {
  let host = "";
  let file = "";
  try {
    const u = new URL(url);
    host = u.hostname;
    file = decodeURIComponent(u.pathname.split("/").pop() ?? "");
  } catch {
    return url;
  }
  const owner = SOURCE_SITES.find(([re]) => re.test(host))?.[1] ?? host;
  // 「〜の技術資料」「〜のデジタルカタログ」などは、それ自体が資料の名前になっている
  const named = /資料|カタログ|仕様書|キャンペーン/.test(owner);
  if (/\.pdf$/i.test(file)) return `${named ? owner : `${owner}の資料`}（PDF・${file.length > 32 ? `${file.slice(0, 30)}…` : file}）`;
  return named ? owner : `${owner}のページ`;
}

/**
 * meta description（120字以内）。文の途中では切らない。
 * 型番の長い機種（ハイブリッド給湯器の組み合わせなど）は、収まるまで仕様の語（設置方式 → 機能 → 号数・容量）を減らし、
 * それでも長ければ、後ろの文を外す。
 */
const DESCRIPTION_MAX = 120;
function describe(p: NonNullable<ReturnType<typeof getProduct>>): string {
  const brand = getBrand(p.brand);
  const cat = getCategory(p.category);
  const sub = subsidyView(p);
  const tails = [sub.eligible && sub.amount ? `給湯省エネ2026事業の対象（${manYen(sub.amount)}）。` : "", "横浜市・戸塚区の交換工事は無料見積もりで。"].filter(Boolean);
  const head = (spec: string) => `${brand.name}の${cat.shortName}「${p.modelNumber}」${spec ? `（${spec}）` : ""}の仕様・設置の条件・価格の内訳。`;
  const specs = [
    [capacityLabel(p), p.functions.label, p.installationType.label],
    [capacityLabel(p), p.functions.label],
    [capacityLabel(p)],
    [],
  ].map((words) => words.filter(Boolean).join("・"));
  for (const spec of specs) {
    const text = head(spec) + tails.join("");
    if (text.length <= DESCRIPTION_MAX) return text;
  }
  let text = head("");
  for (const t of tails) if ((text + t).length <= DESCRIPTION_MAX) text += t;
  return text;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { brand, slug } = await params;
  const p = getProduct(brand, slug);
  if (!p) return {};
  return buildMetadata({
    title: productTitle(p),
    description: describe(p),
    path: productPath(p),
    keywords: [p.modelNumber, `${p.modelNumber} 交換`, `${getBrand(p.brand).name} ${getCategory(p.category).shortName}`],
    ...(p.imageLicenseStatus === "permitted" && p.images[0] ? { image: { src: p.images[0].src, width: p.images[0].width, height: p.images[0].height, alt: p.images[0].alt } } : {}),
  });
}

export default async function ProductPage({ params }: Params) {
  const { brand: brandId, slug } = await params;
  const p = getProduct(brandId, slug);
  if (!p) notFound();

  const brand = getBrand(p.brand);
  const cat = getCategory(p.category);
  const price = priceView(p);
  const msrp = manufacturerPriceLabel(p);
  const sub = subsidyView(p);
  const notes = productNotes(p);
  const related = relatedProducts(p, 4);
  const works = worksOfProduct(p.id);
  const ended = kyutouPhase() === "ended";
  const operator = operatorStatement();
  const path = productPath(p);
  const netAfterSubsidy = price.totalInTax !== null && sub.eligible && sub.amount ? price.totalInTax - sub.amount : null;
  const card = toCard(p);

  return (
    <>
      <div className="bg-mist">
        <div className="container-x pb-10 pt-4 sm:pb-14 lg:pt-5">
          <Breadcrumbs
            items={[
              { name: "商品一覧", href: "/products" },
              { name: brand.name, href: `/products/${brand.id}` },
              { name: p.modelNumber, href: path },
            ]}
          />
          <div className="mt-5 grid gap-x-12 gap-y-8 sm:mt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <figure>
              <ProductVisual image={card.image} category={p.category} installKey={p.installationType.key} sizes="(min-width: 1024px) 520px, 92vw" priority tall />
              <figcaption className="mt-3 text-xs leading-relaxed text-ink-mute">
                {card.image ? `${brand.name}の製品写真（掲載の許諾を得て使用）` : "製品写真は、メーカーへの掲載の確認が済みしだい載せます。図は設置タイプを表したもので、この機種の外観ではありません。"}
              </figcaption>
            </figure>

            <div>
              <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink-mute">
                <Link href={`/products/${brand.id}`} className="-my-2 py-2 underline-offset-4 hover:text-brand-700 hover:underline">
                  {brand.name}
                </Link>
                <span aria-hidden="true">／</span>
                <Link href={cat.path} className="-my-2 py-2 underline-offset-4 hover:text-brand-700 hover:underline">
                  {cat.name}
                </Link>
              </p>
              <h1 className="mt-2">
                <span className="num block text-[clamp(1.75rem,1.2rem+2.4vw,2.625rem)] font-semibold leading-[1.2] tracking-wide text-navy-900">
                  <ModelNumber value={p.modelNumber} />
                </span>
                <span className="mt-2 block text-[1.0625rem] font-bold leading-[1.6] text-navy-900">{p.name}</span>
              </h1>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                <li className="badge badge-solid">{cat.shortName}</li>
                {capacityLabel(p) && <li className="badge">{capacityLabel(p)}</li>}
                <li className="badge">{p.functions.label}</li>
                <li className="badge !whitespace-normal">{installationLabels[p.installationType.key]}</li>
                {p.housing.map((h) => (
                  <li key={h} className="badge badge-mute">
                    {housingLabels[h]}
                  </li>
                ))}
                {p.heating && <li className="badge badge-blue">温水暖房</li>}
              </ul>

              {/* 価格の要約 */}
              <div className="mt-6 rounded-3xl border border-silver-200 bg-white px-5 py-5 sm:px-6">
                <dl className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <dt className="text-sm font-bold text-navy-900">工事費込みの価格</dt>
                    <dd className="font-heading text-xl font-black text-navy-900">{price.totalInTax !== null ? <span className="num text-[1.75rem] font-semibold">{formatYen(price.totalInTax)}</span> : "お見積もり"}</dd>
                  </div>
                  {msrp && (
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm">
                      <dt className="text-ink-mute">メーカー希望小売価格（参考）</dt>
                      <dd className="num text-ink-body">{msrp}</dd>
                    </div>
                  )}
                  {sub.badge && (
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm">
                      <dt className="text-ink-mute">国の補助金</dt>
                      <dd>
                        <span className={`badge ${sub.eligible ? "badge-sun" : "badge-mute"}`}>{sub.badge}</span>
                      </dd>
                    </div>
                  )}
                </dl>
                <p className="mt-3 text-[0.8125rem] leading-[1.85] text-ink-mute">
                  {price.totalInTax !== null ? price.taxNote : "設置の形・配管・撤去する機器で工事の内容が変わるため、現地を確かめてから、内訳の分かる見積書をお出しします。"}
                </p>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  <Link href={`/contact/photo?product=${encodeURIComponent(p.modelNumber)}`} className="btn btn-primary">
                    この機種で見積もりを依頼
                  </Link>
                  <CompareToggle id={p.id} model={p.modelNumber} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container-narrow section-tight space-y-16">
          {/* 価格の内訳 */}
          <section aria-labelledby="price">
            <SectionHeading id="price" eyebrow="価格" title="価格の内訳" className="mb-6" />
            <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="価格の内訳">
              <table className="table-spec">
                <thead>
                  <tr>
                    <th scope="col">項目</th>
                    <th scope="col">当社の価格</th>
                  </tr>
                </thead>
                <tbody>
                  {price.lines.map((l) => (
                    <tr key={l.label}>
                      <th scope="row">{l.label}</th>
                      <td className={l.known ? "num" : ""}>{l.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">工事費込みの総額</th>
                    <td className="font-bold text-navy-900">{price.totalInTax !== null ? <span className="num">{formatYen(price.totalInTax)}（税込）</span> : "お見積もり"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.95]">
              {msrp && p.manufacturerPrice && (
                <p>
                  メーカー希望小売価格は<span className="num font-bold text-navy-900">{msrp}</span>です（{p.manufacturerPrice.includes}）。{brand.name}が公表している参考の価格で、当社の販売価格ではありません。
                  <a href={p.manufacturerPrice.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-link ml-1 inline-flex items-center gap-1 text-[0.8125rem]">
                    メーカーの価格の掲載ページ
                    <Icon name="external" className="size-3.5" />
                  </a>
                </p>
              )}
              {!msrp && p.category === "ecocute" && <p className="text-[0.875rem] text-ink-mute">{brand.name}は、この機種のメーカー希望小売価格を公表していません。</p>}
              <div>
                <p className="font-bold text-navy-900">設置の条件によって、追加の費用がかかる工事</p>
                <ul className="dash-list mt-2 space-y-1 text-[0.9063rem]">
                  {extraCostItems(p).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="mt-2 text-[0.8438rem] text-ink-mute">
                  追加の工事が要るかどうかは、現地調査で確かめて、見積書に分けて書きます。
                  <Link href="/guide/cost" className="text-link ml-1">
                    交換費用の考え方
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* 補助金 */}
          {(cat.kyutouShoeneTarget || p.category === "eco-jozu") && (
            <section aria-labelledby="subsidy">
              <SectionHeading id="subsidy" eyebrow="補助金" title="補助金の対象かどうか" className="mb-6" />
              <div className={`callout ${sub.eligible ? "callout-caution" : "callout-plain"}`}>
                <p className="font-heading font-bold text-navy-900">{k.name}</p>
                <p>{sub.text}</p>
                {sub.eligible && sub.amount && (
                  <p>
                    補助額は、1台 <strong className="num text-navy-900">{manYen(sub.amount)}</strong>
                    {p.subsidyEligibility === "bonus" ? `（基本額＋性能加算）` : "（基本額）"}です。
                    {p.subsidyListedModel && p.subsidyListedModel !== p.modelNumber && <>国のリストでは「{p.subsidyListedModel}」の型番で登録されています。</>}
                    {p.subsidyNote && <>国のリストの注記では、{p.subsidyNote}。</>}
                  </p>
                )}
                {p.subsidyVerifiedAt && (
                  <p className="text-[0.8125rem] text-ink-mute">
                    {formatDateJa(p.subsidyVerifiedAt)}に、
                    <a href={p.category === "hybrid" ? k.urls.productSearchHybrid : k.urls.productSearchEcocute} target="_blank" rel="noopener noreferrer" className="text-link !font-normal">
                      国の「補助対象製品の検索」
                    </a>
                    で確かめました。
                  </p>
                )}
              </div>
              {sub.eligible && !ended && (
                <div className="mt-5 space-y-3 text-[0.9375rem] leading-[1.95]">
                  {netAfterSubsidy !== null ? (
                    <p>
                      工事費込みの総額から補助額を引いた、参考の負担額は <strong className="num text-navy-900">{formatYen(netAfterSubsidy)}</strong> です（補助金の交付が決まった場合。予算の上限に達すると受付が終わります）。
                    </p>
                  ) : (
                    <p>補助額を引いた負担額は、工事費込みの総額が決まってから、お見積もりでお示しします（総額が決まっていないため、ここには出していません）。</p>
                  )}
                  <ul className="dash-list space-y-1 text-[0.9063rem]">
                    <li>{operator.text}</li>
                    <li>着工の前の写真が申請に必要です。先に古い給湯器を外すと、原則として対象になりません。</li>
                    <li>予算の上限に達した時点で、期限（{formatDateJa(k.applicationDeadline)}）の前でも受付が終わります。</li>
                    {p.category === "ecocute" && <li>横浜市のポイント還元（{manYen(y.points.ecocute)}分）は、太陽光発電が設置済みか同時に設置する場合が条件で、エコキュートからの買い替えは対象外です。</li>}
                  </ul>
                  <p>
                    <Link href={p.category === "hybrid" ? (p.brand === "rinnai" ? "/subsidy/eco-one" : "/subsidy/hybrid") : "/subsidy/ecocute"} className="link-arrow">
                      {p.category === "hybrid" ? (p.brand === "rinnai" ? "ECO ONE の補助金" : "ハイブリッド給湯器の補助金") : "エコキュートの補助金"}
                      <Icon name="arrowRight" className="size-4" />
                    </Link>
                  </p>
                </div>
              )}
              {p.category === "eco-jozu" && (
                <p className="mt-4 text-[0.9375rem] leading-[1.95]">
                  エコジョーズは、窓などの断熱の改修と一緒に行う場合（みらいエコ住宅2026事業）と、賃貸の集合住宅のオーナーが替える場合（賃貸集合給湯省エネ2026事業）に、国の別の制度の対象になることがあります。
                  <Link href="/subsidy/mirai-eco-jutaku" className="text-link ml-1">
                    制度の違い
                  </Link>
                </p>
              )}
            </section>
          )}

          {/* 仕様 */}
          <section aria-labelledby="spec">
            <SectionHeading id="spec" eyebrow="仕様" title={`${p.modelNumber}の仕様`} className="mb-6" />
            <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label="仕様の一覧">
              <table className="table-spec">
                <tbody>
                  <tr>
                    <th scope="row">メーカー</th>
                    <td>{brand.company}</td>
                  </tr>
                  <tr>
                    <th scope="row">シリーズ</th>
                    <td>{p.series}</td>
                  </tr>
                  <tr>
                    <th scope="row">型番</th>
                    <td className="num">
                      <ModelNumber value={p.modelNumber} />
                    </td>
                  </tr>
                  {p.units?.map((u) => (
                    <tr key={u.label}>
                      <th scope="row">{u.label}</th>
                      <td className="num">{u.model}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">種類</th>
                    <td>{cat.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">設置方式</th>
                    <td>{p.installationType.label}</td>
                  </tr>
                  {p.capacity.gou && (
                    <tr>
                      <th scope="row">号数</th>
                      <td className="num">{p.capacity.gou}号</td>
                    </tr>
                  )}
                  {p.capacity.tankLiters && (
                    <tr>
                      <th scope="row">タンクの容量</th>
                      <td className="num">{p.capacity.tankLiters}L</td>
                    </tr>
                  )}
                  {p.capacity.familySize && (
                    <tr>
                      <th scope="row">家族の人数の目安</th>
                      <td>{p.capacity.familySize}（メーカーの表記）</td>
                    </tr>
                  )}
                  <tr>
                    <th scope="row">機能</th>
                    <td>{p.functions.label}</td>
                  </tr>
                  {p.gasTypes && (
                    <tr>
                      <th scope="row">ガスの種類</th>
                      <td>{p.gasTypes.join("・")}</td>
                    </tr>
                  )}
                  {specRows(p).map((s) => (
                    <tr key={s.label}>
                      <th scope="row">{s.label}</th>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                  {p.remotes.length > 0 && (
                    <tr>
                      <th scope="row">対応するリモコン</th>
                      <td>
                        <ul className="space-y-1">
                          {p.remotes.map((r) => (
                            <li key={r.model}>
                              <span className="num font-bold text-navy-900">{r.model}</span>
                              {r.note && <span className="block text-[0.8125rem] text-ink-mute">{r.note}</span>}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[0.8125rem] leading-[1.85] text-ink-mute">
              {formatDateJa(p.dataVerifiedAt)}に、{brand.name}の公式サイト・公式カタログで確かめた内容です。仕様は予告なく変わることがあるため、ご契約の前に最新の仕様をお見積もりで確認します。
            </p>
          </section>

          {/* 特徴・よいところ・注意 */}
          <section aria-labelledby="features">
            <SectionHeading id="features" eyebrow="特徴" title="この機種の特徴と、選ぶ前の注意" className="mb-6" />
            <div className="grid gap-5 md:grid-cols-2">
              <div className="card card-line px-5 py-5 sm:px-6">
                <h3 className="h-sub">
                  <Phrase>{`特徴（${brand.name}の説明より）`}</Phrase>
                </h3>
                <ul className="dash-list mt-3 space-y-2 text-[0.9063rem] leading-[1.9]">
                  {p.features.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {/* メーカーの説明とは分けて、種類・機能に共通する説明を置く（このサイトの説明） */}
                {notes.merits.length > 0 && (
                  <>
                    <h3 className="mt-6 text-[0.9375rem] font-bold text-navy-900">
                      {cat.shortName}・{p.functions.label}とは
                    </h3>
                    <ul className="dash-list mt-2 space-y-2 text-[0.875rem] leading-[1.9] text-ink-body">
                      {notes.merits.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="card card-line px-5 py-5 sm:px-6">
                <h3 className="h-sub">注意すること</h3>
                <ul className="dash-list mt-3 space-y-2 text-[0.9063rem] leading-[1.9]">
                  {notes.cautions.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 取り付けに必要な条件 */}
          <section aria-labelledby="requirements">
            <SectionHeading id="requirements" eyebrow="設置の条件" title="取り付けに必要な条件" lead="現地調査で、次の点を確かめます。条件が合わない場合は、同じ場所に収まる別の機種をご提案します。" className="mb-6" />
            <ul className="rows">
              {notes.requirements.map((t) => (
                <li key={t} className="flex gap-3 py-3.5 text-[0.9375rem] leading-[1.85]">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-600" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* 公式の情報 */}
          <section aria-labelledby="official" className="rounded-3xl bg-paper-2 px-5 py-6 sm:px-7">
            <h2 id="official" className="text-sm font-bold text-navy-900">
              メーカーの公式情報
            </h2>
            <ul className="mt-3 space-y-1.5 text-[0.8125rem] leading-[1.8]">
              <li className="flex gap-2">
                <Icon name="external" className="mt-1 size-3.5 shrink-0 text-ink-mute" />
                <a href={p.manufacturerUrl} target="_blank" rel="noopener noreferrer" className="text-link !font-normal break-all">
                  {brand.name}の製品ページ
                </a>
              </li>
              {sourceLinks(p.sources.filter((u) => u !== p.manufacturerUrl).slice(0, 5)).map(({ url: u, label }) => (
                <li key={u} className="flex gap-2">
                  <Icon name="external" className="mt-1 size-3.5 shrink-0 text-ink-mute" />
                  <a href={u} target="_blank" rel="noopener noreferrer" className="text-link !font-normal [overflow-wrap:anywhere]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {works.length > 0 && (
            <section aria-labelledby="works">
              <SectionHeading id="works" eyebrow="施工事例" title="この機種の施工事例" className="mb-6" />
              <ul className="rows">
                {works.map((w) => (
                  <li key={w.slug}>
                    <Link href={`/works/${w.slug}`} className="text-link flex min-h-12 items-center py-2">
                      {w.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="cv band band-mist section-tight">
          <div className="container-x">
            <SectionHeading id="related" eyebrow="比べたい機種" title="同じ種類・近い条件の機種" className="mb-8" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.id}>
                  <ProductCard item={toCard(r)} sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw" />
                </li>
              ))}
            </ul>
            <p className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
              <Link href={cat.path} className="link-arrow">
                {cat.name}のページ
                <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link href="/compare" className="link-arrow">
                機種を比較する
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </p>
          </div>
        </section>
      )}

      <CtaBand id="cta-product" title={`${p.modelNumber}のお見積もり`} product={p.modelNumber} />

      <JsonLd data={productSchema(p, { brandName: brand.name, brandCompany: brand.company, categoryName: cat.name, description: describe(p), path })} />
    </>
  );
}
