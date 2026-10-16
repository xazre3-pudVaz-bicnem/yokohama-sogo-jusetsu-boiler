import type { Metadata } from "next";
import Link from "next/link";
import { WardCompare } from "@/components/content/Widgets";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AREA_STAT_SOURCES, getArea, wardAreas, type Area } from "@/data/areas";
import { reveal } from "@/lib/reveal";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { officeAddressWithPostal, officeMapUrl, siteConfig } from "@/lib/site";

const PATH = "/area";

export const metadata: Metadata = buildMetadata({
  title: "対応エリア｜横浜市戸塚区を中心に、横浜市内の給湯器交換",
  description:
    "横浜総合住設の給湯器交換の対応エリア。戸塚区の戸塚オフィスを拠点に、泉区・栄区・港南区から港北区・青葉区・鶴見区まで、横浜市の18区へ伺います。区ごとの住まいの違いも統計で比べられます。",
  path: PATH,
  keywords: ["横浜市 給湯器交換 対応エリア", "横浜市 給湯器 業者", "横浜 給湯器 交換 地域"],
});

/** 駅の名前（路線名を外し、2つの路線に同じ駅があるときは1つにまとめる） */
function stationNames(a: Area): string {
  const names = a.stations.slice(0, 2).flatMap((s) => s.replace(/（.*?）/g, "").split("・"));
  return [...new Set(names)].join("・");
}

function AreaCard({ a }: { a: Area }) {
  return (
    <Link href={`/area/${a.slug}`} className="card card-line group flex h-full flex-col px-5 py-5">
      <span className="font-heading text-[1.0625rem] font-black text-navy-900 group-hover:text-brand-700">{a.shortName}</span>
      <span className="mt-2 text-[0.8125rem] leading-[1.8] text-ink-mute">
        一戸建て <span className="num font-semibold text-ink">{a.stats.detachedPercent.toFixed(1)}%</span>・共同住宅 <span className="num font-semibold text-ink">{a.stats.apartmentPercent.toFixed(1)}%</span>
      </span>
      {a.stations.length > 0 && <span className="mt-1 text-[0.8125rem] leading-[1.8] text-ink-mute">{stationNames(a)}など</span>}
      <span className="mt-auto flex justify-end pt-3">
        <span className="arrow-dot">
          <Icon name="arrowRight" className="size-3.5" />
        </span>
      </span>
    </Link>
  );
}

export default function AreaHubPage() {
  const wards = wardAreas();
  const main = wards.filter((a) => a.priority === "A");
  const more = wards.filter((a) => a.priority === "B");
  const city = getArea("yokohama");
  return (
    <>
      <PageHero
        eyebrow="対応エリア"
        title="横浜市戸塚区を中心に、横浜市内へ伺います"
        lead="横浜総合住設の戸塚オフィスは、戸塚区深谷町にあります。戸塚区と、となりの泉区・栄区・港南区を中心に、横浜市内の給湯器の交換を承っています。区ごとに住まいの形が違うので、地域のページでは、公的な統計から交換のときに確かめることをまとめました。"
        crumbs={[{ name: "対応エリア", href: PATH }]}
        illust="illust/people-staff-ok"
      />

      <section aria-labelledby="main-area" className="bg-white">
        <div className="container-x section">
          <SectionHeading id="main-area" eyebrow="中心のエリア" title="戸塚区と、となりの区" className="mb-8" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" {...reveal()}>
            {main.map((a) => (
              <li key={a.slug}>
                <AreaCard a={a} />
              </li>
            ))}
          </ul>
          <SectionHeading id="more-area" eyebrow="そのほかのエリア" title="横浜市のほかの区" className="mb-8 mt-14" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" {...reveal()}>
            {more.map((a) => (
              <li key={a.slug}>
                <AreaCard a={a} />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.9375rem] leading-[1.95]">
            横浜市の周辺の地域も、ご住所をお知らせいただければ、対応できるかどうかをお答えします。
            {city && (
              <>
                {" "}
                <Link href="/area/yokohama" className="text-link">
                  横浜市全体のページ
                </Link>
                では、エコジョーズの排水の決まりと、市の制度も紹介しています。
              </>
            )}
          </p>
        </div>
      </section>

      <section aria-labelledby="compare" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="compare" eyebrow="区ごとの違い" title="区ごとの住まいの違いを、統計で比べる" lead="一戸建てと集合住宅では、給湯器の置き場所と設置の形が変わります。区ごとの割合を、地域のページの入口にしてください。" className="mb-8" />
          <WardCompare />
          <ul className="mt-4 space-y-1 text-[0.8125rem] leading-[1.8]">
            {AREA_STAT_SOURCES.map((s) => (
              <li key={s.url} className="flex gap-2">
                <Icon name="external" className="mt-1 size-3.5 shrink-0 text-ink-mute" />
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-link !font-normal break-all">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="office" className="cv bg-white">
        <div className="container-narrow section-tight">
          <h2 id="office" className="h-sub mb-4">
            戸塚オフィス
          </h2>
          <div className="card card-line px-5 py-5 sm:px-7">
            <p className="font-heading font-bold text-navy-900">{siteConfig.name}</p>
            <p className="mt-1 text-[0.9375rem] leading-[1.9]">{officeAddressWithPostal("totsuka")}</p>
            <p className="mt-0.5">
              <a href={officeMapUrl("totsuka")} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 items-center">
                地図を開く（Googleマップ）
              </a>
            </p>
          </div>
        </div>
      </section>

      <CtaBand id="cta-area" />
      <JsonLd data={itemListSchema("対応エリア", [...(city ? [{ name: city.name, href: "/area/yokohama" }] : []), ...wards.map((a) => ({ name: a.name, href: `/area/${a.slug}` }))])} />
    </>
  );
}
