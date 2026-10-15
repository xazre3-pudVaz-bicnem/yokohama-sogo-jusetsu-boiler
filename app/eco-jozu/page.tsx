import type { Metadata } from "next";
import Link from "next/link";
import { P, PageFooterBlocks } from "@/components/content/SimplePage";
import { Figure } from "@/components/diagram/Figures";
import { CategoryProducts } from "@/components/product/CategoryProducts";
import { JsonLd } from "@/components/seo/JsonLd";
import { FieldNote } from "@/components/ui/FieldNote";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import { chintaiShoene2026, miraiEco2026 } from "@/data/subsidy/programs";
import { productsByCategory } from "@/lib/products";
import { reveal } from "@/lib/reveal";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { manYen } from "@/lib/subsidy";

const PATH = "/eco-jozu";
const CHECKED = "2026-10-14";

export const metadata: Metadata = buildMetadata({
  title: "横浜市のエコジョーズ交換｜仕組み・ドレン排水・機種",
  description:
    "横浜市・戸塚区のエコジョーズへの交換。排気の熱を回収する仕組み、ドレン水の排水と横浜市の決まり、従来型から替えるときの確認点、補助金の扱い、リンナイ・ノーリツ・パロマの機種をまとめました。",
  path: PATH,
  keywords: ["横浜市 エコジョーズ", "エコジョーズ 交換", "エコジョーズ ドレン排水", "戸塚区 エコジョーズ", "エコジョーズ 従来型 違い"],
});

const FAQS = [
  {
    q: "いまの給湯器が従来型です。エコジョーズに替えられますか。",
    a: "ドレン水の流し先が取れれば、多くの場合は替えられます。戸建てでは雨どいや雨水ますへつなぐことが多く、マンションでは流し先が限られることがあります。現地調査で、流し先と配管の経路を確かめます。",
  },
  {
    q: "エコジョーズの中和器は、交換が必要ですか。",
    a: "中和器は、ドレン水を中和するための部品で、使っているうちに交換が必要になる消耗品です。交換の時期や知らせ方は、メーカーと機種によって違います。",
  },
  {
    q: "エコジョーズに、国の補助金は出ますか。",
    a: "給湯省エネ2026事業の対象ではありません。窓などの断熱の改修と一緒に替える場合はみらいエコ住宅2026事業で、賃貸の集合住宅のオーナーが従来型から替える場合は賃貸集合給湯省エネ2026事業で、それぞれ対象になります。",
  },
];

export default function EcoJozuPage() {
  const count = productsByCategory("eco-jozu").length;
  return (
    <>
      <PageHero
        eyebrow="エコジョーズ"
        title="横浜市のエコジョーズ交換"
        lead="エコジョーズは、これまで外へ捨てていた排気の熱を回収して、お湯づくりに使うガス給湯器です。運転中にドレン水が出るため、交換では、その水を流す先を確かめることから始めます。"
        crumbs={[{ name: "エコジョーズ", href: PATH }]}
      />

      <section aria-labelledby="mechanism" className="bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="mechanism" eyebrow="仕組み" title="排気の熱を、もう一度使う" lead="ノーリツとリンナイの説明によると、エコジョーズは二次熱交換器で排気の熱を回収し、水をあらかじめ温めてから、炎で設定の温度まで沸かします。" />}>
            <Figure name="ecojozu-mechanism" />
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="drain" className="cv band band-mist section">
        <div className="container-x">
          <SectionSplit
            heading={<SectionHeading id="drain" eyebrow="ドレン排水" title="ドレン水の流し先と、横浜市の決まり" />}
          >
            <div className="space-y-5" {...reveal()}>
              <P>ドレン水は、排気の熱を回収するときに出る、酸性の水です。本体の中の中和器を通して中和してから排水します。リンナイの説明では、ドレン水の量は機種や使い方によって、1分あたり約60cc〜最大約100ccで、水温の低い冬にもっとも多くなります。</P>
              <P>下水道法では、ドレン水は「汚水」にあたり、汚水の経路へ流すのが原則です。横浜市の排水設備要覧では、汚水の系統へ流すことを原則としたうえで、日本ガス機器検査協会（JIA）の認証を受けた機器であれば、雨水の系統の排水設備へ流すことを認めています。</P>
              <div className="callout">
                <p className="font-heading font-bold text-navy-900">流し先が取れないとき</p>
                <p>配管が難しい場合に、追いだきの配管を使って浴室へ排水できる機種もあります。それも難しい場所では、ドレン排水の要らない従来型のガス給湯器を選びます。</p>
              </div>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="switch" className="cv bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="switch" eyebrow="従来型から替える" title="従来型からエコジョーズに替えるときに確かめること" />}>
            <ul className="rows" {...reveal()}>
              {[
                ["ドレン水の流し先", "雨どい・雨水ます・汚水ますのどこへ、どの経路で配管するか。マンションでは、共用部分にかかるかどうか。"],
                ["設置の形と寸法", "いまの給湯器と同じ形（壁掛・据置・パイプスペース）に収まるか。エコジョーズは、同じ号数の従来型と寸法が違うことがあります。"],
                ["排気の向き", "排気が窓や隣の家に向かないか。パイプスペースでは、扉の排気の形に合う機種か。"],
                ["号数と機能", "いまの号数と機能（オート・フルオート・給湯専用）のままでよいか。家族の人数が変わったときは、見直しの機会です。"],
                ["マンションの決まり", "管理規約で、機器の種類やドレン排水の方法が決められていないか。"],
              ].map(([t, d]) => (
                <li key={t} className="grid gap-x-8 gap-y-1 py-4 md:grid-cols-[11rem_1fr]">
                  <h3 className="font-heading text-[0.9688rem] font-black text-navy-900">{t}</h3>
                  <p className="text-[0.9063rem] leading-[1.9]">{d}</p>
                </li>
              ))}
            </ul>
            <FieldNote label="写真で先に分かること" pose="illust/pose-idea" className="mt-8">
              本体の全体と、下に出ている配管、まわりの壁・地面が写った写真があると、ドレン水の流し先の見当がつきます。型番のシールの写真も合わせてお送りください。
            </FieldNote>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="subsidy" className="cv band band-cream section-tight">
        <div className="container-x">
          <SectionSplit heading={<SectionHeading id="subsidy" eyebrow="補助金" title="エコジョーズの補助金は、条件のある2つの制度だけ" />}>
            <div className="space-y-4" {...reveal()}>
              <P>国の給湯省エネ2026事業は、エコキュート・ハイブリッド給湯機・エネファームが対象で、エコジョーズは対象ではありません。エコジョーズが対象になるのは、次の2つの場合です。</P>
              <ul className="dash-list space-y-2 text-[0.9375rem] leading-[1.95]">
                <li>
                  窓などの断熱の改修と一緒に替える：{miraiEco2026.name}で、1戸あたり{manYen(miraiEco2026.waterHeater.ecoJozuOrEcoFeel)}
                </li>
                <li>
                  賃貸の集合住宅のオーナーが、従来型から替える：{chintaiShoene2026.name}で、1台{manYen(chintaiShoene2026.base.withoutReheat)}（追いだきありは{manYen(chintaiShoene2026.base.withReheat)}）
                </li>
              </ul>
              <Link href="/subsidy/mirai-eco-jutaku" className="link-arrow">
                制度の条件の違い
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </div>
          </SectionSplit>
        </div>
      </section>

      <section aria-labelledby="products" className="bg-white">
        <div className="container-x section">
          <SectionHeading id="products" eyebrow="機種" title={`エコジョーズの機種（${count}機種）`} lead="型番は、各メーカーの公式サイトとカタログで確かめたものです。いまの給湯器と同じ設置の形の機種から選ぶと、工事が少なく済みます。" className="mb-10" />
          <CategoryProducts categories={["eco-jozu"]} filterHref="/products?cat=eco-jozu" />
        </div>
      </section>

      <PageFooterBlocks
        id="eco-jozu"
        faqs={FAQS}
        faqTitle="エコジョーズについての質問"
        checkedAt={CHECKED}
        sources={[
          { label: "ノーリツ「エコジョーズ」", url: "https://www.noritz.co.jp/product/kyutou_bath/gas/eco_j/" },
          { label: "リンナイ よくあるご質問（エコジョーズのドレン水）", url: "https://faq.rinnai.co.jp/faq/show/2431?site_domain=default" },
          { label: "リンナイ よくあるご質問（ドレン排水の量）", url: "https://faq.rinnai.co.jp/faq/show/1179?site_domain=default" },
          { label: "横浜市 排水設備要覧", url: "https://www.city.yokohama.lg.jp/kurashi/machizukuri-kankyo/kasen-gesuido/gesuido/setsuzoku/haisui/youran.html" },
          { label: "みらいエコ住宅2026事業【公式】特定エコ住宅設備の設置", url: miraiEco2026.urls.waterHeater },
          { label: "賃貸集合給湯省エネ2026事業【公式】事業概要", url: chintaiShoene2026.urls.about },
        ]}
        related={[
          { href: "/gas-water-heater", label: "ガス給湯器（従来型）", note: "ドレン排水の要らない種類" },
          { href: "/guide/capacity", label: "号数の選び方", note: "家族の人数と、同時に使う場所" },
          { href: "/guide/apartment", label: "マンションの給湯器交換", note: "パイプスペースと管理規約" },
          { href: "/guide/cost", label: "交換費用の考え方", note: "ドレン配管など、追加の工事" },
        ]}
        ctaTitle="エコジョーズへの交換のお見積もり"
      />
      <JsonLd data={serviceSchema({ path: PATH, name: "エコジョーズへの交換工事（横浜市・戸塚区）", description: "ガス給湯器からエコジョーズへの交換。ドレン水の排水の配管、設置の形・号数・機能の確認を含めてお見積もりします。" })} />
    </>
  );
}
