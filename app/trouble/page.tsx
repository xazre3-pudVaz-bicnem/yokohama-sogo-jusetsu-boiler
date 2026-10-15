import type { Metadata } from "next";
import Link from "next/link";
import { PageLinkRows } from "@/components/content/PageLinks";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ContentPage } from "@/data/content-types";
import { contentPagePath, contentPages } from "@/lib/content";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { fillTokens } from "@/lib/tokens";

const PATH = "/trouble";

export const metadata: Metadata = buildMetadata({
  title: "給湯器の故障・トラブル｜お湯が出ない・エラー・水漏れ・凍結",
  description:
    "給湯器からお湯が出ない、温度が安定しない、異音、水漏れ、エラーコード、凍結のときに確かめることを、メーカーの公式の案内をもとにまとめました。修理と交換の考え方、横浜市での相談先も。",
  path: PATH,
  keywords: ["給湯器 故障", "給湯器 トラブル", "給湯器 不具合 症状"],
});

const GROUPS: { title: string; lead: string; slugs: string[] }[] = [
  { title: "お湯の出かた", lead: "お湯が出ない・温度が安定しないとき。", slugs: ["no-hot-water", "unstable-temperature"] },
  { title: "音・水・表示", lead: "異音、本体まわりの水、リモコンの番号。", slugs: ["noise", "water-leak", "error-codes"] },
  { title: "冬と、修理か交換か", lead: "凍結の対処と、修理と交換の判断。", slugs: ["freeze", "repair-or-replace"] },
];

export default function TroubleIndexPage() {
  const pages = contentPages("trouble");
  const bySlug = (slugs: string[]) => slugs.map((s) => pages.find((p) => p.slug === s)).filter((p): p is ContentPage => !!p);
  const grouped = new Set(GROUPS.flatMap((g) => g.slugs));
  const rest = pages.filter((p) => !grouped.has(p.slug));
  return (
    <>
      <PageHero
        eyebrow="故障・トラブル"
        title="給湯器の故障・トラブル"
        lead="お湯が出ない、エラーの番号が出た、水が漏れている。そんなときに、ご自身で確かめられることと、使うのをやめて連絡する目安を、メーカーの公式の案内をもとにまとめました。"
        crumbs={[{ name: "故障・トラブル", href: PATH }]}
        illust="illust/pose-think"
      />

      <div className="bg-white">
        <div className="container-x pt-10">
          <div className="callout callout-caution" role="note">
            <p className="font-heading font-bold text-navy-900">ガスのにおいがするときは</p>
            <p>給湯器もほかのガス機器も使わず、火を付けたり、換気扇や電灯のスイッチに触れたりしないでください。窓を開け、ガス栓を閉めて、ご契約のガス会社の緊急の窓口へ連絡してください。</p>
          </div>
        </div>
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

      <section aria-labelledby="next" className="cv band band-mist section-tight">
        <div className="container-narrow">
          <h2 id="next" className="h-sub mb-4">
            交換を考えるときは
          </h2>
          <p className="text-[0.9688rem] leading-[2.05]">10年前後使っている給湯器の故障は、修理と交換の両方を比べて考えます。型番と、本体まわりの写真をお送りいただければ、交換のお見積もりをお出しします。</p>
          <p className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
            <Link href="/guide/timing" className="link-arrow">
              交換時期の目安
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link href="/guide/model-label" className="link-arrow">
              型番の調べ方
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand id="cta-trouble" />
      <JsonLd data={itemListSchema("給湯器の故障・トラブル", pages.map((p) => ({ name: fillTokens(p.h1), href: contentPagePath(p) })))} />
    </>
  );
}
