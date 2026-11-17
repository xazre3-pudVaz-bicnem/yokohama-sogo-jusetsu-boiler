import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SuccessorFilter } from "@/components/product/SuccessorFilter";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/data/brands";
import type { BrandId } from "@/data/products/types";
import { productPath, productsByBrand } from "@/lib/products";
import { buildMetadata, fitDescription, formatDateJa } from "@/lib/seo";
import {
  RELATION_LABEL,
  SUCCESSOR_PATH,
  successorBrandPath,
  successorBrands,
  successorNotesOf,
  successorSourcesOf,
  successorViews,
  successorsUpdatedAt,
} from "@/lib/successors";

/**
 * メーカーごとの、古い型番 → メーカーが案内している機種の一覧（/products/successor/<メーカー>）。
 * 行はサーバーで出し、絞り込みは SuccessorFilter が表示済みの行を隠す（JavaScript が動かなくても一覧は見える）。
 * 出典は番号でまとめて、ページの下に載せる（行ごとに外部リンクを並べない）。
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return successorBrands().map((b) => ({ brand: b.id }));
}

type Params = { params: Promise<{ brand: string }> };

function brandOf(id: string) {
  const b = brands.find((x) => x.id === id);
  return b && successorBrands().some((x) => x.id === b.id) ? b : undefined;
}

/** エコキュートだけのメーカーは「エコキュート」、ほかは「給湯器」 */
function wordOf(b: { categories: string[] }) {
  return b.categories.every((c) => c === "ecocute") ? "エコキュート" : "給湯器";
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { brand: id } = await params;
  const b = brandOf(id);
  if (!b) return {};
  const info = successorBrands().find((x) => x.id === b.id)!;
  const word = wordOf(b);
  return buildMetadata({
    title: `${b.name}の古い型番から後継機種を探す｜${word}（メーカーの案内）`,
    description: fitDescription(
      `${b.name}の${word}の古い型番（${info.prefixes.slice(0, 4).join("・")}など${info.oldModels.toLocaleString("ja-JP")}件）から、${b.name}が後継機種・取り替えの推奨として案内している機種を探せます。対応は${b.name}の公式の資料で確かめたものだけで、出典も載せています。`,
    ),
    path: successorBrandPath(b.id),
    keywords: [`${b.name} ${word} 後継機種`, `${b.name} 型番 後継`, `${b.name} ${word} 生産終了`, `${b.name} 旧型番 取り替え`],
  });
}

export default async function SuccessorBrandPage({ params }: Params) {
  const { brand: id } = await params;
  const b = brandOf(id);
  if (!b) notFound();
  const brandId = b.id as BrandId;
  const views = successorViews(brandId);
  const sources = successorSourcesOf(brandId);
  const srcNo = new Map(sources.map((s, i) => [s.id, i + 1]));
  const notes = successorNotesOf(brandId);
  const others = successorBrands().filter((x) => x.id !== brandId);
  const info = successorBrands().find((x) => x.id === brandId)!;
  const updated = successorsUpdatedAt("2026-11-16", brandId);
  const word = wordOf(b);
  const hasProducts = productsByBrand(brandId).length > 0;
  const relations = [...new Set(views.map((v) => v.relation))];
  const example = views[Math.floor(views.length / 2)]?.oldModels[0]?.replace(/[～~].*$/, "").slice(0, 7) ?? "";
  const path = successorBrandPath(brandId);
  const listId = "successor-list";

  return (
    <>
      <PageHero
        eyebrow="型番から探す"
        title={`${b.name}の古い型番から、後継の機種を探す`}
        lead={`${b.name}の${word}の古い型番と、${b.name}が公式の資料で案内している後継機種・取り替えの推奨機種の対応です。いまの機種の型番は、本体の正面の銘板で確かめられます。`}
        crumbs={[
          { name: "商品一覧", href: "/products" },
          { name: "古い型番から探す", href: SUCCESSOR_PATH },
          { name: b.name, href: path },
        ]}
        illust="illust/pose-idea"
      >
        <p className="mt-5 text-[0.8125rem] text-ink-mute">
          <time dateTime={updated}>{formatDateJa(updated)}</time> 更新・古い型番 {info.oldModels.toLocaleString("ja-JP")}件
        </p>
      </PageHero>

      <div className="bg-white">
        <div className="container-narrow section-tight">
          <SuccessorFilter listId={listId} total={views.length} example={example} />

          <ul className="mt-6 space-y-1.5 text-[0.8125rem] leading-[1.85] text-ink-mute">
            {relations.includes("successor") && <li>「{RELATION_LABEL.successor}」… {b.name}が、後継機種・現行品・モデルチェンジとして示している機種です。</li>}
            {relations.includes("replacement") && <li>「{RELATION_LABEL.replacement}」… {b.name}のカタログの取り替えの表で、推奨している機種です（設置の条件があります）。</li>}
            <li>機種が2つ以上あるときは、そのどれかです。下線の型番は、このサイトに載っている機種です（ページへ進めます）。</li>
            <li>「～」の付いた型番は、その型番からの範囲です（メーカーの書き方のまま）。</li>
          </ul>

          <ol id={listId} className="rows mt-6">
            {views.map((v) => (
              <li key={v.key} id={v.key} data-q={v.search} className="scroll-mt-24 py-4">
                <p className="flex flex-wrap gap-1.5">
                  {v.oldModels.map((m) => (
                    <span key={m} className="num rounded-md bg-paper-2 px-2 py-0.5 text-[0.875rem] font-semibold text-navy-900 [overflow-wrap:anywhere]">
                      {m}
                    </span>
                  ))}
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem]">
                  <Icon name="arrowRight" className="size-4 shrink-0 text-ink-mute" />
                  <span className="text-xs font-bold text-brand-700">{RELATION_LABEL[v.relation]}</span>
                  {v.successors.map((s, i) => (
                    <span key={s.model} className="num font-semibold text-navy-900 [overflow-wrap:anywhere]">
                      {i > 0 && <span className="mr-2 font-normal text-ink-mute">／</span>}
                      {s.onSite.length ? (
                        <Link href={productPath(s.onSite[0])} className="text-link">
                          {s.model}
                        </Link>
                      ) : (
                        s.model
                      )}
                    </span>
                  ))}
                </p>
                {v.note && <p className="mt-1 text-[0.8125rem] leading-[1.8] text-ink-body">{v.note}</p>}
                <p className="mt-1 text-xs text-ink-mute">
                  出典：
                  <a href={`#src-${srcNo.get(v.sourceId)}`} className="text-link !font-normal">
                    ［{srcNo.get(v.sourceId)}］
                  </a>
                  {v.where ? ` ${v.where}` : ""}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/guide/model-label" className="link-arrow">
              型番の調べ方（銘板の場所と読み方）
              <Icon name="arrowRight" className="size-4" />
            </Link>
            {hasProducts && (
              <Link href={`/products/${brandId}`} className="link-arrow">
                {b.name}の機種の一覧
                <Icon name="arrowRight" className="size-4" />
              </Link>
            )}
          </p>
        </div>
      </div>

      {notes.length > 0 && (
        <section aria-labelledby="successor-brand-notes" className="cv band band-mist section-tight">
          <div className="container-narrow">
            <SectionHeading id="successor-brand-notes" eyebrow="メーカーの注意" title={`${b.name}が資料に書いている注意`} className="mb-6" />
            <ul className="rows">
              {notes.map((n) => (
                <li key={n.text} className="py-3.5 text-[0.9375rem] leading-[1.85]">
                  <span>「{n.text}」</span>
                  <span className="ml-1 text-xs text-ink-mute">
                    （出典
                    <a href={`#src-${srcNo.get(n.source.id)}`} className="text-link !font-normal">
                      ［{srcNo.get(n.source.id)}］
                    </a>
                    ）
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.875rem] leading-[1.9] text-ink-body">当社では、現地調査で設置の形・配管・リモコンを確かめてから、取り替える機種と工事をご案内します。</p>
          </div>
        </section>
      )}

      <section aria-labelledby="successor-sources" className="cv bg-white">
        <div className="container-narrow section-tight">
          <h2 id="successor-sources" className="h-sub mb-3">
            このページの出典
          </h2>
          <p className="text-[0.8125rem] leading-[1.9] text-ink-mute">
            型番の対応は、次の{b.name}の公式ページ・資料で確かめたものです（{formatDateJa(updated)}時点）。生産の終了やモデルチェンジで変わることがあります。
          </p>
          <ol className={`mt-3 space-y-1.5 rounded-xl bg-paper-2 px-5 py-4 text-[0.8125rem] leading-[1.8] sm:px-6 ${sources.length > 8 ? "md:columns-2 md:gap-8" : ""}`}>
            {sources.map((s, i) => (
              <li key={s.id} id={`src-${i + 1}`} className="flex scroll-mt-24 gap-2 break-inside-avoid">
                <span className="num shrink-0 text-ink-mute">［{i + 1}］</span>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-link !font-normal break-all">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>

          {others.length > 0 && (
            <nav aria-labelledby="successor-others" className="mt-10">
              <h2 id="successor-others" className="text-sm font-bold text-navy-900">
                ほかのメーカーの古い型番から探す
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link href={successorBrandPath(o.id)} className="chip">
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <CtaBand id="cta-successor-brand" title="型番が分からなくても、写真でご相談いただけます" />
    </>
  );
}
