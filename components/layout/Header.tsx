import Link from "next/link";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { HeaderStuck } from "@/components/layout/HeaderStuck";
import { Logo } from "@/components/layout/Logo";
import { MegaMenuGuard } from "@/components/layout/MegaMenuGuard";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CategoryIcon, type CategoryIconKind } from "@/components/ui/CategoryIcon";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { gouGuide, gouOptions } from "@/data/categories";
import { isContactFormShown } from "@/lib/contact";
import { brandNav, categoryNav, finderNav, guideNav, installNav, mainNav, subNav } from "@/lib/nav";
import { activeBrands, productsByBrand } from "@/lib/products";
import { primaryPhone, telHref, lineUrl, receptionHours } from "@/lib/site";

/** 上段の種類のタブ（色つきの絵と名前）。section は、ページの印（data-section）と合わせる */
const TABS: { href: string; label: string; icon: CategoryIconKind; section: string }[] = [
  { href: "/gas-water-heater", label: "ガス給湯器", icon: "gas", section: "gas" },
  { href: "/ecocute", label: "エコキュート", icon: "ecocute", section: "ecocute" },
  { href: "/hybrid", label: "ハイブリッド", icon: "hybrid", section: "hybrid" },
  { href: "/subsidy", label: "補助金", icon: "subsidy", section: "subsidy" },
];

/**
 * ヘッダー（2026-10-15 の依頼で、キンライサーのような明るい作りに変えた）。
 *
 * PC（1024px 以上）は2段。
 * - 上段：ロゴ／種類のタブ（1280px 以上。色つきの絵）／写真で見積もり（黄色い丸いボタン）／電話番号と受付時間
 * - 下段：色の帯の主メニュー（給湯器を探す・メーカーから探す・エコキュート・ハイブリッド給湯器・交換費用・補助金・対応エリア）と、右に LINE。
 *   帯の色は、ページの種類で変わる（ガス：緑・エコキュート：水色・ハイブリッド：紫・そのほか：赤）。
 *   ページの本文に data-section="gas" などの印があると、CSS（app/globals.css の [data-site-header]）で色を切り替える（JS を使わない）。
 *   ヘッダーは上段の高さ（88px と下の線 1px）ぶん上にずらして貼りつける（sticky と負の top）。スクロールすると上段が隠れ、下段だけが残る。
 *   下段の右には、上段が隠れたときだけ、写真で見積もりと電話番号を出す（HeaderStuck が data-stuck を付ける）。
 * スマホ・タブレットは1段（ロゴ／電話／メニュー）。見積もりのボタンは、メニューの中と、画面の下の固定ボタン。
 *
 * 「給湯器を探す」「メーカーから探す」は、ホバー・フォーカスで一覧が開く（CSS だけで動く）。
 * リンクを押したとき・Esc キーで閉じるのは MegaMenuGuard。
 * メニューのリンクは先読みしない（prefetch={false}）。閉じたメニューも画面内にあるとみなされ、全部のリンク先を読みにいくため。
 * 主メニューを足したら、1024px・1280px・1536px・1920px で重なりを確かめること。
 */
export function Header() {
  const phone = primaryPhone();
  const hours = receptionHours();
  const line = lineUrl();
  const form = isContactFormShown();
  const makers = activeBrands();

  return (
    <header data-site-header className="sticky top-0 z-50 bg-white lg:-top-[89px]">
      {/* PC：上段（スクロールで隠れる） */}
      <div data-header-top className="hidden border-b border-silver-200 lg:block">
        <div className="container-x flex h-[88px] items-center gap-5 2xl:max-w-[92rem]">
          <div className="shrink-0">
            <Logo priority />
          </div>
          <ul className="hidden items-stretch xl:flex" aria-label="種類から探す">
            {TABS.map((t) => (
              <li key={t.href} className="flex">
                <Link
                  prefetch={false}
                  href={t.href}
                  data-tab={t.section}
                  className="htab flex w-[5.75rem] flex-col items-center justify-center gap-1 rounded-t-xl px-1 pb-1.5 pt-2 text-[0.75rem] font-bold tracking-wider text-ink transition-colors hover:bg-cta-50"
                >
                  <CategoryIcon kind={t.icon} className="size-7" />
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-auto flex shrink-0 items-center gap-4">
            <Link prefetch={false} href="/contact/photo" className="hcta group relative flex flex-col items-center rounded-full bg-pop-yellow px-6 pb-3 pt-1.5 text-center leading-tight shadow-[0_4px_0_var(--color-pop-yellow-shadow)] transition-transform hover:translate-y-0.5">
              <span className="text-[0.6875rem] font-bold tracking-wider text-cta-800">写真を送って</span>
              <span className="font-heading text-[0.9375rem] font-black tracking-wider text-ink">かんたん見積もり</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-cta-700 px-2 py-px text-[0.625rem] font-bold tracking-wider text-white">見積もり無料</span>
            </Link>
            {phone && (
              <a href={telHref(phone)} className="block whitespace-nowrap text-center leading-tight" data-cv="tel">
                <span className="flex items-center justify-center gap-1 text-[0.6875rem] font-bold text-ink">
                  <CategoryIcon kind="phone" className="size-3.5 text-cta-700" />
                  お電話で見積もり・ご相談
                </span>
                <span className="num block text-[1.5rem] font-bold tracking-wide text-ink">{phone}</span>
                {hours && <span className="block rounded-sm border border-cta-700 px-1.5 text-[0.625rem] font-bold text-cta-700">受付 {hours}</span>}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* スマホ・タブレット：1段 */}
      <div className="border-b border-silver-200 lg:hidden">
        <div className="container-x relative flex h-16 items-center justify-between gap-2">
          <Logo priority />
          <div className="flex shrink-0 items-center gap-2">
            {phone && (
              <a href={telHref(phone)} className="grid size-11 place-items-center rounded-full border-2 border-cta-700 text-cta-700" aria-label={`電話で相談する（${phone}）`} data-cv="tel">
                <CategoryIcon kind="phone" className="size-5" />
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

      {/* PC：下段（色の帯の主メニュー。上に貼りつく） */}
      <nav aria-label="メインメニュー" className="hbar hidden lg:block">
        <div className="container-x relative flex h-12 items-stretch justify-between gap-4 2xl:max-w-[92rem]">
          <ul className="flex h-full items-stretch">
            {mainNav.map((l) => {
              const mega = l.href === "/products" ? "products" : l.href === "/products#makers" ? "makers" : null;
              return (
                <li key={l.href} className={`flex ${mega ? "group/mega" : ""}`} data-mega={mega ? "" : undefined}>
                  <Link
                    prefetch={false}
                    href={l.href}
                    className="relative flex items-center gap-1 whitespace-nowrap px-2 text-[0.875rem] font-bold tracking-wider text-white transition-colors after:absolute after:inset-x-2 after:bottom-1.5 after:h-[3px] after:scale-x-0 after:rounded-full after:bg-white after:transition-transform hover:after:scale-x-100 xl:px-2.5 xl:text-[0.9375rem] xl:after:inset-x-2.5 2xl:px-3 2xl:after:inset-x-3"
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
                    {mega && <Icon name="chevronDown" className="size-3.5 text-white/80 transition-transform duration-300 group-hover/mega:rotate-180" />}
                  </Link>
                  {mega === "products" && (
                    <div data-mega-panel className="invisible absolute inset-x-0 top-full z-40 px-[clamp(1.25rem,4vw,2.5rem)] opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/mega:visible group-focus-within/mega:opacity-100 group-hover/mega:visible group-hover/mega:opacity-100">
                      <div className="card-pop mx-auto max-w-[66rem] rounded-t-none border-x-4 border-b-4 border-t-0 border-pop-yellow px-8 pb-6 pt-6">
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
                          <Link prefetch={false} href="/products" className="link-arrow !text-[0.8125rem]">
                            すべての機種を条件で絞り込む
                            <Icon name="arrowRight" className="size-3.5" />
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                  {mega === "makers" && (
                    <div data-mega-panel className="invisible absolute inset-x-0 top-full z-40 px-[clamp(1.25rem,4vw,2.5rem)] opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/mega:visible group-focus-within/mega:opacity-100 group-hover/mega:visible group-hover/mega:opacity-100">
                      <div className="card-pop mx-auto max-w-[66rem] rounded-t-none border-x-4 border-b-4 border-t-0 border-pop-yellow px-8 pb-6 pt-6">
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

          <div className="flex shrink-0 items-center gap-3">
            {/* 上段が隠れたあとだけ出す（写真で見積もり・電話） */}
            <div className="stuck-only flex items-center gap-3">
              {phone && (
                <a href={telHref(phone)} className="hidden items-center gap-1.5 whitespace-nowrap text-white 2xl:inline-flex" data-cv="tel">
                  <CategoryIcon kind="phone" className="size-4" />
                  <span className="num text-[1.125rem] font-bold tracking-wide">{phone}</span>
                </a>
              )}
              {/*
                名前は短く（主メニュー・LINE と1本の帯に並べ、帯からはみ出さないように）。
                この組は、隠れているあいだも幅を取るので、どの幅でも「主メニュー＋この組＋LINE」が帯に収まる長さにする
                （Windows のスクロールバーの分、約17px 狭くなっても収まること。2026-10-16 に 1024〜1920px で測った）。
              */}
              <Link prefetch={false} href="/contact/photo" className="btn btn-yellow btn-xs !min-h-9 !shadow-none">
                写真で見積もり
              </Link>
            </div>
            {line && (
              <a href={line} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-bold text-ink lg:inline-flex" data-cv="line">
                <LineIcon className="size-[1.125rem]" />
                LINE で相談
              </a>
            )}
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
      <p className="mb-2 border-b-2 border-dotted border-silver-300 pb-2 text-xs font-bold tracking-wider text-cta-700">{title}</p>
      <ul className="space-y-0.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link prefetch={false} href={l.href} className="flex min-h-10 items-center gap-1.5 text-[0.875rem] font-bold text-ink hover:text-cta-700">
              <Icon name="chevronRight" className="size-3.5 text-cta-700" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
