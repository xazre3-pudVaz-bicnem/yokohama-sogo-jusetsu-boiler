import Link from "next/link";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { getCategory } from "@/data/categories";
import { activeBrands, productsByBrand } from "@/lib/products";

/**
 * 取り扱いメーカーの公式ロゴを並べる（トップのヒーローの直下・商品一覧の上）。
 * 押すと、このサイトのメーカー別のページ（/products/<メーカー>）へ移る（メーカーの公式サイトへは送らない）。
 * ロゴは白い札の中に置き、元の色のまま見せる。大きさの印象は、ロゴごとの scale でそろえる（data/brand-logos.json）。
 * リンクの読み上げは、ロゴの alt（社名）と下の文字のまま（aria-label で別の言い方にすると、見える文字とずれるため）。
 */
export function ManufacturerLogoGrid({ headingId, title = "取り扱いメーカー", compact = false }: { headingId: string; title?: string; compact?: boolean }) {
  const list = activeBrands();
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id={headingId} className="font-heading text-[1.0625rem] font-bold text-navy-900">
          {title}
        </h2>
        <p className="text-[0.8125rem] text-ink-mute">ロゴを押すと、メーカーごとの機種の一覧が開きます</p>
      </div>
      <ul className={`grid grid-cols-2 gap-2.5 sm:grid-cols-4 ${compact ? "lg:grid-cols-7" : "lg:grid-cols-7 lg:gap-3"}`}>
        {list.map((b) => {
          const n = productsByBrand(b.id).length;
          const kinds = b.categories.map((c) => getCategory(c).shortName).join("・");
          return (
            <li key={b.id}>
              <Link href={`/products/${b.id}`} className="logo-tile h-full gap-2 text-center">
                <span className="grid min-h-9 place-items-center">
                  <MakerLogo logo={b.logo} name={b.name} height={compact ? 24 : 28} />
                </span>
                <span className="text-[0.6875rem] leading-snug text-ink-mute">
                  {kinds}
                  <span className="num ml-1 font-bold text-ink-body">{n}機種</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
