import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading, SectionSplit } from "@/components/ui/SectionHeading";
import { brands } from "@/data/brands";
import { photoCredits } from "@/data/credits";
import { kyutouShoene2026 } from "@/data/subsidy/programs";
import { reveal } from "@/lib/reveal";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { siteConfig, primaryPhone, telHref, receptionHours, officeAddressWithPostal, officeMapUrl, corporateLink, lineUrl, type OfficeKey } from "@/lib/site";
import { operatorStatement } from "@/lib/subsidy";

const PATH = "/company";

export const metadata: Metadata = buildMetadata({
  title: "運営会社｜株式会社 横浜総合住設（ヨコジュウ）",
  description:
    "給湯器専門サイトを運営する、株式会社 横浜総合住設（ヨコジュウ）の会社概要です。横浜市戸塚区のオフィスの所在地、連絡先、このサイトに載せている製品情報・価格・補助金・写真の扱いをまとめています。",
  path: PATH,
});

export default function CompanyPage() {
  const phone = primaryPhone();
  const hours = receptionHours();
  const c = siteConfig.company;
  const t = siteConfig.trust;
  const offices: OfficeKey[] = ["head", "totsuka"];
  const operator = operatorStatement();

  const rows: [string, React.ReactNode][] = [
    ["会社名", `${siteConfig.name}（愛称：${siteConfig.nickname}）`],
    ...(c.representative ? ([["代表者", `${c.representativeTitle ?? ""} ${c.representative}`.trim()]] as [string, React.ReactNode][]) : []),
    ...offices.map(
      (key) =>
        [
          siteConfig.offices[key].label,
          <span key={key}>
            {officeAddressWithPostal(key)}
            <a href={officeMapUrl(key)} target="_blank" rel="noopener noreferrer" className="text-link ml-2 inline-flex items-center gap-1 whitespace-nowrap text-[0.8125rem]">
              地図
              <Icon name="external" className="size-3.5" />
            </a>
          </span>,
        ] as [string, React.ReactNode],
    ),
    ...(phone
      ? ([
          [
            "電話",
            <span key="tel">
              <a href={telHref(phone)} className="num text-lg font-semibold tracking-wider text-navy-900 hover:text-brand-700" data-cv="tel">
                {phone}
              </a>
              {hours && <span className="ml-2 text-[0.8125rem] text-ink-mute">受付 {hours}</span>}
            </span>,
          ],
        ] as [string, React.ReactNode][])
      : []),
    ...(lineUrl() ? ([["LINE", <a key="line" href={lineUrl()} target="_blank" rel="noopener noreferrer" className="text-link" data-cv="line">公式アカウント（{siteConfig.social.lineId}）</a>]] as [string, React.ReactNode][]) : []),
    ...(c.founded ? ([["設立", c.founded]] as [string, React.ReactNode][]) : []),
    ...(t.licenses ? ([["許認可", t.licenses]] as [string, React.ReactNode][]) : []),
    ...(t.qualifications ? ([["資格", t.qualifications]] as [string, React.ReactNode][]) : []),
    ...(t.warranty ? ([["工事の保証", t.warranty]] as [string, React.ReactNode][]) : []),
    ["このサイトで扱う工事", "ガス給湯器・エコジョーズ・エコキュート・ハイブリッド給湯器の販売と交換工事、エネファームからの給湯器交換"],
    ["対応エリア", "横浜市戸塚区を中心に、横浜市・神奈川県・東京都"],
    [
      "コーポレートサイト",
      <a key="corp" href={corporateLink("/")} target="_blank" rel="noopener" className="text-link inline-flex items-center gap-1">
        {siteConfig.corporateUrl.replace(/^https?:\/\//, "")}
        <Icon name="external" className="size-3.5" />
      </a>,
    ],
  ];

  return (
    <>
      <PageHero
        eyebrow="運営会社"
        title={`${siteConfig.name}`}
        lead={`このサイトは、横浜市戸塚区にオフィスのある${siteConfig.name}（${siteConfig.nickname}）が運営しています。給湯器のほか、エアコン・トイレ・太陽光発電・外壁塗装などの住まいの工事を行っている会社です。`}
        crumbs={[{ name: "運営会社", href: PATH }]}
      />

      <section aria-labelledby="company-outline" className="bg-white">
        <div className="container-x section">
          <SectionSplit heading={<SectionHeading id="company-outline" eyebrow="会社概要" title="会社概要と連絡先" />}>
            <dl className="dl-spec card card-line px-5 sm:px-8" {...reveal()}>
              {rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd className="text-[0.9375rem] leading-[1.95]">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[0.9063rem] leading-[1.95]">
              代表のあいさつ、給湯器以外の工事、施工事例は、
              <a href={corporateLink("/company")} target="_blank" rel="noopener" className="text-link">
                コーポレートサイトの会社案内
              </a>
              に載せています。
            </p>
          </SectionSplit>
        </div>
      </section>

      {/* このサイトの情報の扱い */}
      <section aria-labelledby="company-policy" className="cv band band-mist section">
        <div className="container-x">
          <SectionHeading id="company-policy" eyebrow="このサイトについて" title="載せている情報の、確かめ方と扱い" lead="商品の仕様や補助金の金額は、間違えるとお客様の判断を誤らせます。このサイトでは、確認できた内容だけを、出どころと確認日を添えて載せています。" className="mb-10" />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                title: "製品の情報",
                body: `型番・仕様・メーカー希望小売価格は、各メーカー（${brands.map((b) => b.name).join("・")}）の公式サイトと公式カタログで確かめたものです。機種のページに、確かめた日と、メーカーの公式ページへのリンクを載せています。生産終了やモデルチェンジで内容が変わることがあるため、ご契約の前に、最新の仕様をお見積もりで確認します。`,
              },
              {
                title: "価格",
                body: "当社の販売価格と工事費は、設置の条件によって変わるため、金額が決まっていない機種は「お見積もり」と表示しています。メーカー希望小売価格は、メーカーが公表している参考の価格で、当社の販売価格ではありません。ほかの販売店の価格を、当社の価格として載せることはしていません。",
              },
              {
                title: "補助金",
                body: `補助金の金額・条件・期限は、国と横浜市の公式ページで確かめた内容です（${kyutouShoene2026.name}は${formatDateJa(kyutouShoene2026.verifiedAt)}に確認）。機種が対象かどうかは、国の「補助対象製品の検索」で型番ごとに確かめた結果を載せています。${operator.text}`,
              },
              {
                title: "写真と図",
                body: "製品の写真は、メーカーから掲載の許諾を得たものだけを載せます。許諾の確認が済んでいない機種は、写真の代わりに、設置方式を表す図を出しています（製品の外観を表すものではありません）。施工事例には、当社が実際に施工した現場の写真だけを使います。",
              },
            ].map((item) => (
              <div key={item.title} className="card px-6 py-6 sm:px-7" {...reveal()}>
                <h3 className="h-sub">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.95]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 写真の出典 */}
      <section aria-labelledby="photos" className="cv bg-paper-2 py-10">
        <div className="container-x">
          <h2 id="photos" className="text-sm font-bold text-ink">
            このサイトの写真について
          </h2>
          <p className="mt-2 max-w-4xl text-[0.8125rem] leading-[1.95] text-ink-body">
            トップページの冒頭の写真は、住宅の外壁に出ている給湯器用の配管を写した実写で、当社の施工現場の写真ではありません。地域のページの写真とあわせて、出典は次のとおりです。
          </p>
          <ul className="mt-3 space-y-1 text-[0.8125rem] text-ink-body">
            {photoCredits.map((p) => (
              <li key={p.sourceUrl}>
                「{p.title}」{p.author}（
                <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-link !font-normal">
                  {p.license}
                </a>
                ）／{p.changes}／
                <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-link !font-normal">
                  出典
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.8125rem] leading-[1.95] text-ink-body">
            個人情報の取り扱いは、
            <Link href="/privacy" className="text-link !font-normal">
              プライバシーポリシー
            </Link>
            をご覧ください。
          </p>
        </div>
      </section>

      <CtaBand id="cta-company" />
    </>
  );
}
