import Link from "next/link";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { HeaderStuck } from "@/components/layout/HeaderStuck";
import { Logo } from "@/components/layout/Logo";
import { MegaMenuGuard } from "@/components/layout/MegaMenuGuard";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { gouGuide, gouOptions } from "@/data/categories";
import { isContactFormShown } from "@/lib/contact";
import { brandNav, categoryNav, finderNav, guideNav, installNav, mainNav, subNav } from "@/lib/nav";
import { activeBrands, productsByBrand } from "@/lib/products";
import { primaryPhone, telHref, lineUrl, receptionHours } from "@/lib/site";

/**
 * ヘッダー。
 *
 * PC（1024px 以上）は2段。
 * - 上段：ロゴ／補助メニュー（1536px 以上。それより狭いと電話・LINE・見積もりと並べたときに折り返すため）／電話番号と受付時間／LINE で相談／無料見積もり
 * - 下段：主メニュー（給湯器を探す・メーカーから探す・エコキュート・ハイブリッド給湯器・交換費用・補助金・対応エリア）
 *   ヘッダーは上段の高さ（72px と下の線 1px）ぶん上にずらして貼りつける（sticky と負の top）。スクロールすると上段が隠れ、下段だけが残る。
 *   下段の右には、上段が隠れたときだけ、電話番号と無料見積もりを出す（HeaderStuck が data-stuck を付ける）。
 * スマホ・タブレットは1段（ロゴ／電話／メニュー）。問い合わせのボタンは、メニューの中と、画面の下の固定ボタン。
 *
 * 「給湯器を探す」「メーカーから探す」は、ホバー・フォーカスで一覧が開く（CSS だけで動く）。
 * リンクを押したとき・Esc キーで閉じるのは MegaMenuGuard。
 * メニューのリンクは先読みしない（prefetch={false}）。閉じたメニューも画面内にあるとみなされ、全部のリンク先を読みにいくため。
 *
 * 横幅の配分（下段の主メニューと、右の問い合わせが1行に収まること）
 * - 1024〜1279px：主メニューの文字を少し小さく・間隔を狭くし、長い名前は短くする（NavLink の short）。
 * - 1536px 以上：ヘッダーだけ本文より広い幅（92rem）を使い、長い名前（NavLink の long）を出す。
 * - 上段が隠れたときに右に出す電話番号は、1536px 以上だけ（1280〜1535px では主メニューと並べると幅が足りず、はみ出すため）。
 * 主メニューを足したら、1024px・1280px・1536px・1920px で重なりを確かめること。
 */
export function Header() {
  const phone = primaryPhone();
  const hours = receptionHours();
  const line = lineUrl();
  const form = isContactFormShown();
  // フォームを出さない本番でも「無料見積もり」（行き先の /contact で、LINE・電話での無料見積もりを案内する）
  const ctaLabel = "無料見積もり";
  const makers = activeBrands();

  return (
    <header data-site-header className="sticky top-0 z-50 bg-white lg:-top-[73px]">
      {/* PC：上段（スクロールで隠れる） */}
      <div data-header-top className="hidden border-b border-silver-200 lg:block">
        <div className="container-x flex h-[4.5rem] items-center gap-6 2xl:max-w-[92rem]">
          <div className="shrink-0">
            <Logo priority />
          </div>
          <ul className="hidden items-center gap-5 text-xs font-bold text-ink-body 2xl:flex">
            {subNav.map((l) => (
              <li key={l.href}>
                <Link prefetch={false} href={l.href} className="inline-flex min-h-10 items-center whitespace-nowrap hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-auto flex shrink-0 items-center gap-3">
            {phone && (
              <a href={telHref(phone)} className="mr-1 block whitespace-nowrap text-right leading-tight" data-cv="tel">
                <span className="flex items-center justify-end gap-1.5 text-navy-900">
                  <Icon name="phone" className="size-[1.125rem] text-brand-600" />
                  <span className="num text-[1.375rem] font-semibold tracking-wide">{phone}</span>
                </span>
                {hours && <span className="block text-[0.6875rem] text-ink-mute">受付 {hours}</span>}
              </a>
            )}
            {line && (
              <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-sm" data-cv="line">
                <LineIcon className="size-5" />
                LINE で相談
              </a>
            )}
            <Link prefetch={false} href="/contact" className="btn btn-cta btn-sm">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* スマホ・タブレット：1段 */}
      <div className="border-b border-silver-200 lg:hidden">
        <div className="container-x relative flex h-16 items-center justify-between gap-2">
          <Logo priority />
          <div className="flex shrink-0 items-center gap-2">
            {phone && (
              <a href={telHref(phone)} className="grid size-11 place-items-center rounded-md border border-silver-300 text-navy-900" aria-label={`電話で相談する（${phone}）`} data-cv="tel">
                <Icon name="phone" className="size-5" />
              </a>
            )}
            <MobileMenu
              main={mainNav}
              sub={[...guideNav, ...subNav]}
              groups={[{ name: "種類から探す", links: categoryNav }, { name: "設置方式から探す", links: installNav }]}
              makers={makers.map((b) => ({ href: `/products/${b.id}`, name: b.name, logo: b.logo }))}
              phone={phone}
              telHref={telHref(phone)}
              hours={hours}
              line={line}
              formLabel={form ? "無料見積もり" : "ご相談の方法"}
            />
          </div>
        </div>
      </div>

      {/* PC：下段（主メニュー。上に貼りつく） */}
      <nav aria-label="メインメニュー" className="hidden border-b border-silver-200 bg-white lg:block">
        <div className="container-x relative flex h-12 items-stretch justify-between gap-4 2xl:max-w-[92rem]">
          <ul className="flex h-full items-stretch">
            {mainNav.map((l) => {
              const mega = l.href === "/products" ? "products" : l.href === "/products#makers" ? "makers" : null;
              return (
                <li key={l.href} className={`flex ${mega ? "group/mega" : ""}`} data-mega={mega ? "" : undefined}>
                  <Link
                    prefetch={false}
                    href={l.href}
                    className="relative flex items-center gap-1 whitespace-nowrap px-2.5 text-[0.875rem] font-bold tracking-wider text-navy-900 transition-colors after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:scale-x-0 after:rounded-full after:bg-brand-600 after:transition-transform hover:text-brand-700 hover:after:scale-x-100 xl:px-4 xl:text-[0.9375rem]"
                  >
                    {l.short ? (
                      <>
                        <span className="xl:hidden">{l.short}</span>
                        <span className="hidden xl:inline">{l.label}</span>
                      </>
                    ) : l.long ? (
                      <>
                        <span className="2xl:hidden">{l.label}</span>
                        <span className="hidden 2xl:inline">{l.long}</span>
                      </>
                    ) : (
                      l.label
                    )}
                    {mega && <Icon name="chevronDown" className="size-3.5 text-silver-500 transition-transform duration-300 group-hover/mega:rotate-180" />}
                  </Link>
                  {mega === "products" && (
                    <div data-mega-panel className="invisible absolute inset-x-0 top-full z-40 px-[clamp(1.25rem,4vw,2.5rem)] opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/mega:visible group-focus-within/mega:opacity-100 group-hover/mega:visible group-hover/mega:opacity-100">
                      <div className="card-pop mx-auto max-w-[66rem] rounded-t-none border border-t-0 border-silver-200 px-8 pb-6 pt-6">
                        <div className="grid grid-cols-4 gap-x-8">
                          <MegaColumn title="種類から探す" links={[...categoryNav]} />
                          <MegaColumn
                            title="号数から探す（ガス給湯器）"
                            links={[...gouOptions].reverse().map((g) => ({ href: `/products?gou=${g}`, label: `${g}号（${gouGuide[g].people}が目安）` }))}
                          />
                          <MegaColumn title="設置方式から探す" links={installNav} />
                          <MegaColumn title="条件から探す" links={[...finderNav.filter((f) => !/号$/.test(f.label)), { href: "/compare", label: "機種を比較する" }]} />
                        </div>
                        <p className="mt-5 flex justify-end">
                          <Link prefetch={false} href="/products" className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold tracking-wider text-navy-900 hover:text-brand-700">
                            すべての機種を条件で絞り込む
                            <Icon name="arrowRight" className="size-3.5" />
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                  {mega === "makers" && (
                    <div data-mega-panel className="invisible absolute inset-x-0 top-full z-40 px-[clamp(1.25rem,4vw,2.5rem)] opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/mega:visible group-focus-within/mega:opacity-100 group-hover/mega:visible group-hover/mega:opacity-100">
                      <div className="card-pop mx-auto max-w-[66rem] rounded-t-none border border-t-0 border-silver-200 px-8 pb-6 pt-6">
                        {brandNav.map((g) => (
                          <div key={g.id} className="mb-5 last:mb-0">
                            <p className="mb-2.5 text-xs font-bold tracking-wider text-ink-mute">{g.name}</p>
                            <ul className="grid grid-cols-4 gap-3">
                              {makers
                                .filter((b) => g.links.some((x) => x.href === `/products/${b.id}`))
                                .map((b) => (
                                  <li key={b.id}>
                                    <Link prefetch={false} href={`/products/${b.id}`} className="logo-tile !min-h-[4.25rem] gap-1.5">
                                      <MakerLogo logo={b.logo} name={b.name} height={26} decorative />
                                      <span className="text-xs font-bold text-ink-body">
                                        {b.name}（{productsByBrand(b.id).length}機種）
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <MegaMenuGuard />

          {/* 上段が隠れたあとだけ出す（電話・無料見積もり） */}
          <div className="stuck-only flex shrink-0 items-center gap-3">
            {phone && (
              <a href={telHref(phone)} className="hidden items-center gap-1.5 whitespace-nowrap text-navy-900 2xl:inline-flex" data-cv="tel">
                <Icon name="phone" className="size-4 text-brand-600" />
                <span className="num text-[1.0625rem] font-semibold tracking-wide">{phone}</span>
              </a>
            )}
            <Link prefetch={false} href="/contact" className="btn btn-cta btn-xs !min-h-9">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </nav>
      <HeaderStuck />
    </header>
  );
}

function MegaColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="border-b-2 border-brand-500 pb-2 font-heading text-[0.8125rem] font-bold tracking-[0.06em] text-brand-700">{title}</p>
      <ul>
        {links.map((s) => (
          <li key={s.href} className="border-b border-dotted border-silver-300">
            <Link prefetch={false} href={s.href} className="block py-2.5 text-[0.9063rem] font-bold leading-snug text-navy-900 transition-colors hover:text-brand-700">
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
