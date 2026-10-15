import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { Phrase } from "@/components/ui/Phrase";
import { publishedAreas } from "@/data/areas";
import { brandNav, categoryNav, footerGuideNav, footerNav, subsidyNav, type NavLink } from "@/lib/nav";
import { siteConfig, primaryPhone, telHref, lineUrl, receptionHours, officeAddressWithPostal, officeMapUrl, corporateLink, type OfficeKey } from "@/lib/site";

/**
 * フッター。運営会社の名前・所在地・電話番号（NAP）は lib/site.ts から出す。表記を全ページ・コーポレートサイトとそろえるため、ここに直接書かない。
 * リンクは先読みしない（prefetch={false}）。ページを開くたびに、並んでいるリンク先を全部読み込みにいくのを避けるため。
 * スマホでは下部の固定ボタン（MobileCtaBar）に隠れないよう、最下部に余白を取っている。
 */
export function Footer() {
  const phone = primaryPhone();
  const hours = receptionHours();
  const line = lineUrl();
  const offices: OfficeKey[] = ["totsuka", "head"];
  const year = new Date().getFullYear();
  // 区の名前は短い形（「港南区」）にする。2列に並べるので、「横浜市港南区」だと PC の狭い幅で、語の途中で折り返す
  const areaLinks: NavLink[] = [{ href: "/area", label: "対応エリア" }, ...publishedAreas.map((a) => ({ href: `/area/${a.slug}`, label: a.slug === "yokohama" ? "横浜市全体" : a.shortName }))];

  return (
    <footer className="cv border-t-4 border-cta-700 bg-paper-2 text-ink-body">
      <div className="container-x grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] lg:gap-14 lg:py-20">
        {/* 運営会社 */}
        <div>
          <Logo size="lg" />
          <p className="mt-6 max-w-md text-sm leading-loose text-ink-body">
            {siteConfig.primaryArea.city}
            {siteConfig.primaryArea.ward}にオフィスのある{siteConfig.name}（{siteConfig.nickname}）が運営する、給湯器交換の専門サイトです。
          </p>

          <dl className="mt-7 space-y-4 text-sm">
            <div className="flex gap-3">
              <dt className="w-[5.5rem] shrink-0 font-bold text-ink">運営会社</dt>
              <dd>{siteConfig.name}</dd>
            </div>
            {offices.map((key) => (
              <div key={key} className="flex gap-3">
                <dt className="w-[5.5rem] shrink-0 font-bold text-ink">{siteConfig.offices[key].label}</dt>
                <dd>
                  <a href={officeMapUrl(key)} target="_blank" rel="noopener noreferrer" className="leading-relaxed underline-offset-4 hover:text-cta-700 hover:underline">
                    {officeAddressWithPostal(key)}
                  </a>
                </dd>
              </div>
            ))}
            {phone && (
              <div className="flex gap-3">
                <dt className="w-[5.5rem] shrink-0 font-bold text-ink">電話</dt>
                <dd>
                  <a href={telHref(phone)} className="num text-xl font-bold tracking-wider text-cta-700 hover:text-cta-800" data-cv="tel">
                    {phone}
                  </a>
                  {hours && <span className="block text-xs text-ink-mute sm:ml-2 sm:inline">受付 {hours}</span>}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            {line && (
              <a
                href={line}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-silver-300 bg-white px-4 text-sm font-bold text-ink transition-colors hover:border-cta-700"
                data-cv="line"
              >
                <LineIcon className="size-5" />
                LINE で相談
              </a>
            )}
            <a
              href={corporateLink("/")}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-silver-300 bg-white px-4 text-sm font-bold text-ink transition-colors hover:border-cta-700"
            >
              コーポレートサイト
              <Icon name="external" className="size-4" />
            </a>
          </div>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-ink-mute">エアコン・トイレ・太陽光発電・外壁塗装など、給湯器以外の工事は、コーポレートサイトでご案内しています。</p>
        </div>

        {/* メニュー */}
        <nav aria-label="フッターメニュー" className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
          <div className="space-y-9">
            <FooterGroup title="メーカーから探す" links={brandNav.flatMap((g) => g.links)} columns />
            <FooterGroup title="種類から探す" links={[...categoryNav, { href: "/products", label: "商品一覧" }]} />
          </div>
          <div className="space-y-9">
            <FooterGroup title="補助金" links={[{ href: "/subsidy", label: "給湯器の補助金" }, ...subsidyNav]} />
            <FooterGroup title="選び方・トラブル" links={footerGuideNav} />
          </div>
          <div className="space-y-9">
            <FooterGroup title="対応エリア" links={areaLinks} columns={areaLinks.length > 6} />
            <FooterGroup title="サイトの案内" links={footerNav} />
          </div>
        </nav>
      </div>

      <div className="border-t border-silver-200 bg-white">
        <div className="container-x flex flex-col gap-2 pb-24 pt-6 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>
            © {year} {siteConfig.name}
          </p>
          <p className="font-[family-name:var(--font-display)] uppercase tracking-[0.2em]">{siteConfig.nameEn}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links, columns = false }: { title: string; links: NavLink[]; columns?: boolean }) {
  return (
    <div>
      <p className="eyebrow border-b-2 border-dotted border-silver-300 pb-2">{title}</p>
      <ul className={`mt-3 ${columns ? "grid grid-cols-2 gap-x-4" : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <Link prefetch={false} href={l.href} className="inline-flex min-h-10 items-center gap-1 text-sm leading-snug text-ink-body underline-offset-4 hover:text-cta-700 hover:underline">
              {/* 長い名前は、文節の切れ目で折り返す（PC の狭い幅で「全体／像」のように割れないように） */}
              <span>
                <Phrase>{l.label}</Phrase>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
