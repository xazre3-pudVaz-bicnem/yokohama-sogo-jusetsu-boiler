import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `ページが見つかりません｜${siteConfig.siteName}`,
  description: "お探しのページは見つかりませんでした。",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "トップページ" },
  { href: "/products", label: "商品を探す" },
  { href: "/subsidy", label: "給湯器の補助金" },
  { href: "/guide", label: "給湯器の選び方" },
  { href: "/trouble", label: "故障・トラブル" },
  { href: "/area", label: "対応エリア" },
  { href: "/faq", label: "よくある質問" },
  { href: "/contact", label: "無料見積もり・お問い合わせ" },
];

/** 404 ページ。行き止まりにせず、主なページと、種類・メーカーへの入口を置く */
export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="container-x section">
        <p className="num text-sm font-medium tracking-[0.2em] text-ink-mute">404</p>
        <h1 className="h-page mt-2">ページが見つかりません</h1>
        <p className="lead mt-5">ページが移動したか、URL が変わった可能性があります。機種のページをお探しの場合は、商品の一覧から型番で探せます。</p>

        <nav aria-label="主なページ" className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="eyebrow">主なページ</h2>
            <ul className="rows mt-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex min-h-12 items-center justify-between gap-2 py-2 text-[0.9375rem] font-bold text-ink transition-colors hover:text-brand-700">
                    {l.label}
                    <Icon name="arrowRight" className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <h2 className="eyebrow">種類・メーカーから探す</h2>
            <dl className="card card-line mt-3 px-5 text-[0.9375rem] leading-[1.95] sm:px-7">
              <div className="grid gap-x-9 gap-y-1 border-b-2 border-dotted border-silver-300 py-3.5 md:grid-cols-[9rem_1fr]">
                <dt className="font-bold text-ink">種類</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-1">
                  {categories.map((c) => (
                    <Link key={c.id} href={c.path} className="inline-flex min-h-10 items-center text-link !font-normal">
                      {c.shortName}
                    </Link>
                  ))}
                </dd>
              </div>
              <div className="grid gap-x-9 gap-y-1 py-3.5 md:grid-cols-[9rem_1fr]">
                <dt className="font-bold text-ink">メーカー</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-1">
                  {brands.map((b) => (
                    <Link key={b.id} href={`/products/${b.id}`} className="inline-flex min-h-10 items-center text-link !font-normal">
                      {b.name}
                    </Link>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </nav>
      </div>
    </div>
  );
}
