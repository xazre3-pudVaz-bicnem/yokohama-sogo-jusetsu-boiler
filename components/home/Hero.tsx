import Image from "next/image";
import Link from "next/link";
import { MakerLogo } from "@/components/brand/MakerLogo";
import { ProductImage, type CardImage } from "@/components/product/ProductImage";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import type { BrandLogo, CategoryId, InstallationKey } from "@/data/products/types";

export type HeroShowcase = {
  /** 種類の名前（ガス給湯器・エコキュート・ハイブリッド給湯器） */
  label: string;
  /** 種類のページ */
  href: string;
  /** 写真の機種（メーカー・型番） */
  brandName: string;
  brandLogo: BrandLogo | null;
  /** 写真の機種の説明（型番の写真なら型番、シリーズ共通の写真ならシリーズ名） */
  caption: string;
  image: CardImage | null;
  shared: boolean;
  category: CategoryId;
  installKey: InstallationKey;
};

/**
 * トップページの最初の画面。
 * 最初の3秒で「何を売っているか（給湯器の交換）」「どこで（横浜市・戸塚区）」「何を扱うか（実機の写真）」「どう相談するか」を伝える。
 *
 * - 左：キャッチコピー・説明・問い合わせのボタン（無料見積もり／LINE で写真を送って相談／取り扱い商品を見る）・要点。
 * - 右：ガス給湯器・エコキュート・ハイブリッド給湯器の、メーカーの公式の製品写真を、種類ごとに1枚ずつ並べる。
 *   写真はそれぞれ別の実在の機種で、1つの製品のように合成しない（下にメーカーと型番を書く）。
 * - スマホは、見出しのすぐ下に写真を小さく並べ、その下にボタンを置く（最初の画面で写真とボタンが見える）。
 * - 問い合わせのボタンの並び（[data-hero-cta]）が画面から外れると、スマホの下部の固定ボタンが出る（MobileCtaBar）。
 */
export function Hero({
  showcase,
  productCount,
  brandCount,
  line,
  formLabel,
}: {
  showcase: HeroShowcase[];
  productCount: number;
  brandCount: number;
  line: string;
  formLabel: string;
}) {
  const points = ["お見積もり・現地調査は無料", "横浜市戸塚区深谷町にオフィス", `${brandCount}メーカー・${productCount}機種を型番で比較`, "補助金の対象を確認日つきで案内"];
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-silver-200 bg-gradient-to-b from-white to-paper-2">
      <div className="container-x grid items-center gap-x-10 gap-y-6 pb-10 pt-7 sm:pb-14 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:pb-16 lg:pt-12 xl:gap-x-14">
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-bold tracking-[0.08em] text-brand-700">ガス給湯器・エコキュート・ハイブリッド給湯器の交換</p>
          <h1 id="hero-title" className="mt-2 text-[clamp(1.75rem,1.1rem+3vw,2.875rem)] font-black leading-[1.35] tracking-[0.01em] text-navy-900">
            <span className="ib">横浜市・戸塚区の</span>
            <span className="ib">給湯器交換なら</span>
            <span className="ib marker">ヨコジュウ</span>
          </h1>

          {/* スマホ：見出しのすぐ下に、取り扱う種類の写真を小さく並べる */}
          <ShowcaseRow items={showcase} compact className="mt-5 lg:hidden" />

          <p className="mt-5 max-w-[34rem] text-[0.9688rem] leading-[1.95] text-ink-body sm:text-base">
            ガス給湯器からエコキュート、ハイブリッド給湯器まで。設置環境とご予算に合わせてご提案します。機種が決まっていなくても、いまの給湯器の写真からご相談いただけます。
          </p>

          <div data-hero-cta className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3 xl:max-w-[36rem]">
            <Link href="/contact" className="btn btn-cta btn-lg sm:col-span-2">
              {formLabel}
              <Icon name="arrowRight" className="btn-arrow size-4" />
            </Link>
            {line && (
              <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-line !px-4" data-cv="line">
                <LineIcon className="size-5" />
                {/* 2列に並ぶ幅（640〜1279px）では短くする（2行に割れないように） */}
                <span className="sm:hidden xl:inline">LINE で写真を送って相談</span>
                <span className="hidden sm:inline xl:hidden">LINE で相談</span>
              </a>
            )}
            <Link href="/products" className={`btn btn-outline ${line ? "" : "sm:col-span-2"}`}>
              取り扱い商品を見る
            </Link>
          </div>

          <ul className="mt-6 grid gap-x-5 gap-y-2 text-[0.8125rem] font-bold text-navy-900 sm:grid-cols-2">
            {points.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Icon name="check" className="mt-[0.2rem] size-4 shrink-0 text-brand-600" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* PC：右に、取り扱う種類の写真を、1枚の台に並べて大きく */}
        <ShowcasePanel items={showcase} />
      </div>
    </section>
  );
}

function ShowcaseRow({ items, compact = false, className = "" }: { items: HeroShowcase[]; compact?: boolean; className?: string }) {
  return (
    <ul className={`grid grid-cols-3 gap-2.5 sm:gap-4 ${className}`} aria-label="取り扱っている給湯器の種類">
      {items.map((s, i) => (
        <li key={s.href}>
          <Link href={s.href} className="group block rounded-xl border border-silver-200 bg-white p-1.5 transition-shadow hover:shadow-[var(--shadow-pop)] sm:p-2.5">
            <ProductImage
              image={s.image}
              shared={s.shared}
              category={s.category}
              installKey={s.installKey}
              sizes={compact ? "30vw" : "(min-width: 1280px) 200px, 17vw"}
              priority={i === 0}
              tall={!compact}
              note={false}
            />
            <span className={`block text-center font-heading font-bold leading-snug text-navy-900 group-hover:text-brand-700 ${compact ? "mt-1.5 text-[0.75rem]" : "mt-2.5 text-[0.9375rem]"}`}>{compact ? s.label.replace("ハイブリッド給湯器", "ハイブリッド") : s.label}</span>
            {!compact && (
              <span className="mt-1.5 flex flex-col items-center gap-1 text-[0.6875rem] leading-tight text-ink-mute">
                <MakerLogo logo={s.brandLogo} name={s.brandName} height={15} decorative />
                <span className="num">{s.caption}</span>
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * PC の冒頭の右側：淡いグレーの台に、種類ごとの製品写真を並べる。
 * 重点のハイブリッド給湯器を上の段に大きく、ガス給湯器とエコキュートを下の段に並べる（写真の下端をそろえ、台に立って見えるように）。
 * 写真はそれぞれ別の機種のまま（合成しない）。下に、種類・メーカーのロゴ・写真の機種を書く。
 */
function ShowcasePanel({ items }: { items: HeroShowcase[] }) {
  const hybrid = items.find((s) => s.category === "hybrid");
  const rest = items.filter((s) => s !== hybrid);
  const tile = (s: HeroShowcase, big: boolean, eager: boolean) => (
    <Link href={s.href} className="group flex h-full flex-col rounded-xl bg-white/70 px-4 pb-3 pt-4 transition-colors hover:bg-white">
      <span className={`relative block ${big ? "h-[11.5rem] xl:h-[13rem]" : "h-[9.5rem] xl:h-[10.5rem]"}`}>
        {s.image && (
          <Image
            src={s.image.src}
            alt={s.image.alt}
            fill
            sizes={big ? "(min-width: 1280px) 520px, 40vw" : "(min-width: 1280px) 250px, 20vw"}
            quality={80}
            {...(eager ? ({ preload: true, fetchPriority: "high", loading: "eager" } as const) : {})}
            className="object-contain object-bottom mix-blend-multiply transition-transform duration-500 group-hover:-translate-y-1"
          />
        )}
      </span>
      <span className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-silver-200 pt-2.5">
        <span className="font-heading text-[0.9688rem] font-bold leading-snug text-navy-900 group-hover:text-brand-700">{s.label}</span>
        <span className="flex items-center gap-2 text-[0.6875rem] leading-tight text-ink-mute">
          <MakerLogo logo={s.brandLogo} name={s.brandName} height={14} decorative />
          <span className="num">{s.caption}</span>
        </span>
      </span>
    </Link>
  );
  return (
    <div className="hidden rounded-2xl border border-silver-200 bg-[#f3f5f8] p-4 lg:block xl:p-5" aria-label="取り扱っている給湯器の種類">
      <div className="grid grid-cols-2 gap-3 xl:gap-4">
        {hybrid && <div className="col-span-2">{tile(hybrid, true, true)}</div>}
        {rest.map((s) => (
          <div key={s.href}>{tile(s, false, false)}</div>
        ))}
      </div>
      <p className="mt-3 text-right text-[0.6875rem] text-ink-mute">写真はメーカーの公式サイトより{items.some((s) => s.shared) ? "（シリーズ共通のイメージを含みます）" : ""}</p>
    </div>
  );
}
