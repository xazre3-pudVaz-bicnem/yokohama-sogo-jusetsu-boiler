import type { Metadata } from "next";
import Link from "next/link";
import { PageLinkRows } from "@/components/content/PageLinks";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import type { ContentPage } from "@/data/content-types";
import { contentPagePath, contentPages } from "@/lib/content";
import { reveal } from "@/lib/reveal";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { fillTokens } from "@/lib/tokens";

const PATH = "/guide";

export const metadata: Metadata = buildMetadata({
  title: "給湯器の選び方｜費用・交換時期・号数・機能・設置タイプ",
  description:
    "給湯器の交換で迷いやすい点を、メーカーと公的機関の資料をもとに整理しました。費用の内訳、交換時期の目安、号数の選び方、オートとフルオートの違い、設置タイプの見分け方、マンションでの注意、型番の調べ方。",
  path: PATH,
  keywords: ["給湯器 選び方", "給湯器 交換 ポイント", "給湯器 種類 違い"],
});

const GROUPS: { title: string; lead: string; slugs: string[] }[] = [
  { title: "交換を考えはじめたら", lead: "費用の内訳と、交換の時期の目安。", slugs: ["cost", "timing"] },
  { title: "機種を選ぶ", lead: "号数・機能・設置タイプで、候補をしぼります。", slugs: ["capacity", "auto-fullauto", "installation-types"] },
  { title: "お見積もりの前に", lead: "マンションで確かめることと、型番の調べ方。", slugs: ["apartment", "model-label"] },
];

export default function GuideIndexPage() {
  const pages = contentPages("guide");
  const bySlug = (slugs: string[]) => slugs.map((s) => pages.find((p) => p.slug === s)).filter((p): p is ContentPage => !!p);
  const grouped = new Set(GROUPS.flatMap((g) => g.slugs));
  const rest = pages.filter((p) => !grouped.has(p.slug));
  return (
    <>
      <PageHero
        eyebrow="給湯器の選び方"
        title="給湯器の選び方"
        lead="給湯器の交換は、いまの給湯器の型番と設置の形を確かめるところから始まります。費用・時期・号数・機能・設置のタイプを、順に確かめられるようにまとめました。"
        crumbs={[{ name: "給湯器の選び方", href: PATH }]}
        illust="illust/pose-idea"
      />

      <div className="bg-white">
        <div className="container-x section space-y-14">
          {GROUPS.map((g) => {
            const list = bySlug(g.slugs);
            if (!list.length) return null;
            return (
              <section key={g.title} aria-label={g.title}>
                <SectionHeading eyebrow={g.title} title={g.lead} className="mb-6" />
                <PageLinkRows pages={list} />
              </section>
            );
          })}
          {rest.length > 0 && (
            <section aria-label="そのほかのページ">
              <PageLinkRows pages={rest} />
            </section>
          )}
        </div>
      </div>

      <section aria-labelledby="types" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="types" eyebrow="種類から選ぶ" title="給湯器の種類ごとのページ" className="mb-8" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" {...reveal()}>
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={c.path} className="card card-line group flex h-full flex-col px-5 py-5">
                  <span className="font-heading text-[1rem] font-black text-navy-900 group-hover:text-brand-700">{c.name}</span>
                  <span className="mt-2 text-[0.8125rem] leading-[1.8] text-ink-mute">{c.summary}</span>
                  <span className="mt-auto flex justify-end pt-3">
                    <span className="arrow-dot">
                      <Icon name="arrowRight" className="size-3.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
            <Link href="/products" className="link-arrow">
              条件から機種を探す
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link href="/compare" className="link-arrow">
              機種を比較する
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand id="cta-guide" />
      <JsonLd data={itemListSchema("給湯器の選び方", pages.map((p) => ({ name: fillTokens(p.h1), href: contentPagePath(p) })))} />
    </>
  );
}
