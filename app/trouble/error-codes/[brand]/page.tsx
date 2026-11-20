import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { ListFilter } from "@/components/ui/ListFilter";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/data/brands";
import type { BrandId } from "@/data/products/types";
import { ERROR_CODES_PATH, errorCodeBrands, errorCodeSourcesOf, errorCodeViews, errorCodesBrandPath, errorCodesUpdatedAt } from "@/lib/error-codes";
import { productsByBrand } from "@/lib/products";
import { buildMetadata, fitDescription, formatDateJa } from "@/lib/seo";
import { successorBrandPath, successorBrands } from "@/lib/successors";

/**
 * メーカーごとの、給湯器・エコキュートのエラーコードの一覧（/trouble/error-codes/<メーカー>）。
 * 番号の意味と対処は、メーカーの公式の情報だけ（data/error-codes.ts）。番号ごとに見出しと、ページの中のリンク先（#code-111）を持つ。
 * 絞り込みは ListFilter が表示済みの行を隠す（JavaScript が動かなくても一覧は見える）。
 * 入口のページ /trouble/error-codes は、/trouble/[slug] が出す（このフォルダに page.tsx は置かない）。
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return errorCodeBrands().map((b) => ({ brand: b.id }));
}

type Params = { params: Promise<{ brand: string }> };

function brandOf(id: string) {
  const info = errorCodeBrands().find((x) => x.id === id);
  const b = brands.find((x) => x.id === id);
  return info && b ? { b, info } : undefined;
}

const wordOf = (ecocuteOnly: boolean) => (ecocuteOnly ? "エコキュート" : "給湯器");

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { brand: id } = await params;
  const found = brandOf(id);
  if (!found) return {};
  const { b, info } = found;
  const word = wordOf(info.ecocuteOnly);
  const sample = errorCodeViews(b.id as BrandId)
    .slice(0, 3)
    .map((v) => v.code)
    .join("・");
  return buildMetadata({
    title: `${b.name}の${word}のエラーコード一覧｜番号の意味とメーカーの案内`,
    description: fitDescription(
      `${b.name}の${word}のリモコンに出るエラーコード（${sample}など${info.count}件）の意味と、${b.name}が案内している対処を、${b.name}の公式の資料からまとめました。番号で絞り込めます。直らないときの修理と交換の考え方も。`,
    ),
    path: errorCodesBrandPath(b.id as BrandId),
    keywords: [`${b.name} エラーコード`, `${b.name} ${word} エラー`, `${b.name} エラー 一覧`, `${b.name} ${word} エラー 対処`],
  });
}

export default async function ErrorCodesBrandPage({ params }: Params) {
  const { brand: id } = await params;
  const found = brandOf(id);
  if (!found) notFound();
  const { b, info } = found;
  const brandId = b.id as BrandId;
  const views = errorCodeViews(brandId);
  // 出典は、番号ごとのページ（1〜2行だけが使う出典）なら行の中に直接リンクし、多くの行が使う一覧の資料は、番号を付けてページの下にまとめる
  const useCount = new Map<string, number>();
  for (const v of views) useCount.set(v.sourceId, (useCount.get(v.sourceId) ?? 0) + 1);
  const shared = (id: string) => (useCount.get(id) ?? 0) > 2;
  const sources = errorCodeSourcesOf(brandId).filter((s) => shared(s.id));
  const srcNo = new Map(sources.map((s, i) => [s.id, i + 1]));
  const perCodeSources = views.some((v) => !shared(v.sourceId));
  const others = errorCodeBrands().filter((x) => x.id !== brandId);
  const updated = errorCodesUpdatedAt("2026-11-20", brandId);
  const word = wordOf(info.ecocuteOnly);
  const path = errorCodesBrandPath(brandId);
  const hasSuccessor = successorBrands().some((x) => x.id === brandId);
  const hasProducts = productsByBrand(brandId).length > 0;
  const example = views[0]?.code ?? "";
  const listId = "error-code-list";

  return (
    <>
      <PageHero
        eyebrow="故障・トラブル"
        title={`${b.name}の${word}のエラーコード`}
        lead={`${b.name}の${word}のリモコンに出る番号の意味と、${b.name}が案内している対処を、${b.name}の公式の資料からまとめました。同じ番号でも、機種によって意味が違うことがあります。本体の銘板で、メーカーと型番も確かめてください。`}
        crumbs={[
          { name: "故障・トラブル", href: "/trouble" },
          { name: "エラーコードの調べ方", href: ERROR_CODES_PATH },
          { name: b.name, href: path },
        ]}
        illust="illust/pose-idea"
      >
        <p className="mt-5 text-[0.8125rem] text-ink-mute">
          <time dateTime={updated}>{formatDateJa(updated)}</time> 確認・{info.count}件の番号
        </p>
      </PageHero>

      <div className="bg-white">
        <div className="container-narrow section-tight">
          <div className="callout callout-caution mb-8">
            <p className="font-bold">番号が出たときの注意</p>
            <p>試してよい操作は、メーカーの案内に書かれたものだけにします。本体を開けたり、自分で直したりしないでください。同じ番号がくり返し出るときは、メーカーか、交換・修理の業者にご相談ください。</p>
            <p>
              最初にすることは、
              <Link href={`${ERROR_CODES_PATH}#first`} className="text-link">
                番号が出たら、最初にすること
              </Link>
              にまとめています。
            </p>
          </div>

          <ListFilter
            listId={listId}
            total={views.length}
            unit="番号"
            label="リモコンに出ている番号で絞り込む"
            hint={`番号の一部だけでも探せます（例：${example}）。全角・半角は気にしなくて大丈夫です。`}
            emptyText={`この一覧には見つかりませんでした。番号は機種によって違うことがあります。${b.name}の公式の案内を確かめるか、リモコンの表示と銘板の写真でご相談ください。`}
          />
          <p className="mt-3 text-[0.8125rem] leading-[1.85] text-ink-mute">
            載せているのは、{b.name}の公式の資料で意味を確かめられた番号です。すべての番号ではありません。
          </p>

          <ol id={listId} className="rows mt-6">
            {views.map((v) => (
              <li key={v.anchor} id={v.anchor} data-q={v.search} className="scroll-mt-24 py-5">
                <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-heading text-[1.0625rem] font-black leading-[1.6] text-navy-900">
                  <span className="num rounded-md bg-navy-900 px-2.5 py-0.5 text-white">{v.code}</span>
                  {v.title && <span>{v.title}</span>}
                </h2>
                {v.appliesTo && <p className="mt-1.5 text-xs text-ink-mute">対象：{v.appliesTo}</p>}
                <p className="mt-2 text-[0.9375rem] leading-[1.9]">{v.meaning}</p>
                {v.userAction && (
                  <p className="mt-2 text-[0.9375rem] leading-[1.9]">
                    <span className="font-bold text-navy-900">{b.name}の案内：</span>
                    {v.userAction}
                  </p>
                )}
                {v.callRepair && (
                  <p className="mt-2 text-[0.9375rem] leading-[1.9]">
                    <span className="font-bold text-navy-900">修理・点検：</span>
                    {v.callRepair}
                  </p>
                )}
                {v.safety && (
                  <p className="mt-2 flex gap-2 rounded-lg bg-paper-2 px-3 py-2.5 text-[0.875rem] leading-[1.85]">
                    <Icon name="shield" className="mt-1 size-4 shrink-0 text-cta-700" />
                    <span>{v.safety}</span>
                  </p>
                )}
                <p className="mt-2 text-xs leading-[1.8] text-ink-mute">
                  出典：
                  {shared(v.sourceId) ? (
                    <a href={`#src-${srcNo.get(v.sourceId)}`} className="text-link !font-normal">
                      ［{srcNo.get(v.sourceId)}］
                    </a>
                  ) : (
                    <a href={v.source.url} target="_blank" rel="noopener noreferrer" className="text-link !font-normal break-all">
                      {v.source.label}
                    </a>
                  )}
                  {v.url && v.url !== v.source.url && (
                    <>
                      {" "}
                      <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-link !font-normal">
                        この番号の{b.name}のページ
                      </a>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <section aria-labelledby="error-replace" className="cv band band-mist section-tight">
        <div className="container-narrow">
          <SectionHeading
            id="error-replace"
            eyebrow="直らないとき"
            title="修理か交換かを考えるとき"
            lead="番号が消えない、くり返し出る、使い始めて年数がたっている、というときは、修理と交換の両方を比べます。"
            className="mb-6"
          />
          <ul className="space-y-2">
            {[
              { href: "/trouble/repair-or-replace", label: "給湯器が故障したときの、修理と交換の考え方" },
              { href: "/guide/timing", label: "給湯器の交換時期の目安" },
              ...(hasSuccessor ? [{ href: successorBrandPath(brandId), label: `${b.name}の古い型番から、後継の機種を探す` }] : []),
              ...(hasProducts ? [{ href: `/products/${brandId}`, label: `${b.name}の機種の一覧` }] : []),
              { href: "/guide/model-label", label: "型番の調べ方（銘板の場所と読み方）" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-arrow">
                  {l.label}
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="error-sources" className="cv bg-white">
        <div className="container-narrow section-tight">
          <h2 id="error-sources" className="h-sub mb-3">
            このページの出典
          </h2>
          <p className="text-[0.8125rem] leading-[1.9] text-ink-mute">
            番号の意味と対処は、{b.name}の公式ページ・資料で確かめたものです（{formatDateJa(updated)}時点）。{perCodeSources ? "番号ごとのページは、それぞれの番号の出典にリンクしています。" : ""}
            くわしい手順は、お使いの機種の取扱説明書と、{b.name}の案内に従ってください。
          </p>
          {sources.length > 0 && (
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
          )}

          {others.length > 0 && (
            <nav aria-labelledby="error-others" className="mt-10">
              <h2 id="error-others" className="text-sm font-bold text-navy-900">
                ほかのメーカーのエラーコード
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link href={errorCodesBrandPath(o.id)} className="chip">
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <CtaBand id="cta-error-codes" title="番号と型番が分かれば、交換の機種と費用をご案内できます" />
    </>
  );
}
