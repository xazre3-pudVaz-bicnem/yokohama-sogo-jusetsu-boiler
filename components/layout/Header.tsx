import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { MegaMenuGuard } from "@/components/layout/MegaMenuGuard";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { isContactFormShown } from "@/lib/contact";
import { brandNav, categoryNav, finderNav, mainNav, subNav } from "@/lib/nav";
import { siteConfig, primaryPhone, telHref, lineUrl, receptionHours } from "@/lib/site";

/**
 * ヘッダー。
 * - 上段（PC のみ・スクロールで隠れる）：対応エリアの一言と補助メニュー
 * - 下段（常に上部に固定）：ロゴ／主メニュー／電話番号／無料見積もり
 * 「商品を探す」はホバー・フォーカスで、メーカー・種類・条件の一覧が開く（JS なしで動く）。
 *   リンクを押したとき・Esc キーで閉じるのは MegaMenuGuard。
 * スマホのメニューは MobileMenu（クライアントコンポーネント）。メニューの中身は props で渡す。
 * メニューのリンクは先読みしない（prefetch={false}）。閉じたメニューも画面内にあるとみなされ、開いていなくても
 * 全部のリンク先を読み込みにいくため（スマホの最初の表示が遅くなる）。
 * 文字と細い線だけで組む（アイコンや色分けは使わない）。
 *
 * 横幅の配分（ロゴ・主メニュー・右側が1行に収まること。収まらないとロゴが縮められ、社名が主メニューに重なる）
 * - 1024〜1279px：主メニューの文字を少し小さく・間隔を狭くし、長い名前は短くする（NavLink の short）。
 * - 1536px 以上：電話番号が加わるので、ヘッダーだけ本文より広い幅（92rem）を使う。
 * ロゴは縮めない（shrink-0）。主メニューを足したら、1024px・1280px・1536px・1920px で重なりを確かめること。
 */
export function Header() {
  const phone = primaryPhone();
  const hours = receptionHours();
  const line = lineUrl();
  const form = isContactFormShown();

  return (
    <>
      <nav aria-label="サブメニュー" className="hidden bg-navy-950 text-white lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs tracking-wider 2xl:max-w-[92rem]">
          <p className="text-silver-200">
            {siteConfig.primaryArea.city}
            {siteConfig.primaryArea.ward}の{siteConfig.shortName}が運営する、給湯器交換の専門サイト
          </p>
          <ul className="flex items-center gap-6">
            {subNav.map((l) => (
              <li key={l.href}>
                <Link prefetch={false} href={l.href} className="inline-flex items-center whitespace-nowrap py-2 text-silver-200 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            {line && (
              <li>
                <a href={line} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 text-silver-200 transition-colors hover:text-white" data-cv="line">
                  <LineIcon onDark className="size-4" />
                  LINE
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <header className="sticky top-0 z-50 border-b border-silver-200 bg-white">
        <div className="container-x relative flex h-16 items-center justify-between gap-2 sm:gap-4 lg:h-[4.5rem] 2xl:max-w-[92rem]">
          <div className="min-w-0 lg:shrink-0">
            <Logo priority />
          </div>

          <nav aria-label="メインメニュー" className="hidden h-full lg:block">
            <ul className="flex h-full items-stretch">
              {mainNav.map((l) => {
                const isProducts = l.href === "/products";
                return (
                  <li key={l.href} className={`flex ${isProducts ? "group/mega" : ""}`} data-mega={isProducts ? "" : undefined}>
                    <Link prefetch={false}
                      href={l.href}
                      className="relative flex items-center gap-1 whitespace-nowrap px-2 text-[0.875rem] font-bold tracking-wider text-navy-900 transition-colors hover:text-brand-700 xl:px-3.5 xl:text-[0.9375rem]"
                    >
                      {l.short ? (
                        <>
                          <span className="xl:hidden">{l.short}</span>
                          <span className="hidden xl:inline">{l.label}</span>
                        </>
                      ) : (
                        l.label
                      )}
                      {isProducts && <Icon name="chevronDown" className="size-3.5 text-silver-500 transition-transform duration-300 group-hover/mega:rotate-180" />}
                    </Link>
                    {isProducts && (
                      <div data-mega-panel className="invisible absolute inset-x-0 top-full z-40 px-[clamp(1.25rem,4vw,2.5rem)] opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/mega:visible group-focus-within/mega:opacity-100 group-hover/mega:visible group-hover/mega:opacity-100">
                        <div className="card-pop mx-auto max-w-[62rem] rounded-t-none border border-t-0 border-silver-200 px-8 pb-5 pt-7">
                          <div className="grid grid-cols-[1.25fr_1.25fr_1.2fr_1.2fr] gap-x-9">
                            {brandNav.map((g) => (
                              <div key={g.id}>
                                <p className="border-b-2 border-brand-500 pb-2 font-heading text-[0.8125rem] font-bold tracking-[0.08em] text-brand-700">メーカー（{g.name}）</p>
                                <MegaList links={g.links} />
                              </div>
                            ))}
                            <div>
                              <p className="border-b-2 border-brand-500 pb-2 font-heading text-[0.8125rem] font-bold tracking-[0.08em] text-brand-700">種類から探す</p>
                              <MegaList links={categoryNav} />
                            </div>
                            <div>
                              <p className="border-b-2 border-brand-500 pb-2 font-heading text-[0.8125rem] font-bold tracking-[0.08em] text-brand-700">条件から探す</p>
                              <MegaList links={finderNav} />
                            </div>
                          </div>
                          <p className="mt-5 flex justify-end gap-7">
                            <Link prefetch={false} href="/compare" className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold tracking-wider text-navy-900 transition-colors hover:text-brand-700">
                              機種を比較する
                              <Icon name="arrowRight" className="size-3.5" />
                            </Link>
                            <Link prefetch={false} href="/products" className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold tracking-wider text-navy-900 transition-colors hover:text-brand-700">
                              商品一覧
                              <Icon name="arrowRight" className="size-3.5" />
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <MegaMenuGuard />
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {phone && (
              <a href={telHref(phone)} className="hidden whitespace-nowrap text-right leading-tight 2xl:block" data-cv="tel">
                <span className="num block text-[1.375rem] font-medium tracking-wider text-navy-900">{phone}</span>
                {hours && <span className="block text-[0.6875rem] tracking-wider text-ink-mute">受付 {hours}</span>}
              </a>
            )}
            {phone && (
              <a href={telHref(phone)} className="grid size-11 place-items-center rounded-sm border border-silver-300 text-navy-900 sm:hidden" aria-label={`電話で相談する（${phone}）`} data-cv="tel">
                <Icon name="phone" className="size-5" />
              </a>
            )}
            <Link prefetch={false} href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              {form ? "無料見積もり" : "ご相談・お見積もり"}
            </Link>
            <MobileMenu
              main={mainNav}
              sub={subNav}
              groups={[...brandNav.map((g) => ({ name: `メーカー（${g.name}）`, links: g.links })), { name: "種類から探す", links: categoryNav }]}
              phone={phone}
              telHref={telHref(phone)}
              hours={hours}
              line={line}
              formLabel={form ? "無料見積もり" : "ご相談の方法"}
            />
          </div>
        </div>
      </header>
    </>
  );
}

function MegaList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul>
      {links.map((s) => (
        <li key={s.href} className="border-b-2 border-dotted border-silver-200">
          <Link prefetch={false} href={s.href} className="block py-2.5 text-[0.9375rem] font-bold leading-snug text-navy-900 transition-colors hover:text-brand-700">
            {s.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
