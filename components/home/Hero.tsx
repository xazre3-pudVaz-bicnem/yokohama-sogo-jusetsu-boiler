import { getImageProps } from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { creditOf } from "@/data/credits";
import { img } from "@/lib/images";

/**
 * トップページの最初の画面。給湯器の取り付けを待つ、外壁の配管の実写を一面に敷き、文字を写真の上に載せる。
 *
 * - 文字の後ろだけ、写真を淡くぼかす膜（.hero-veil）を敷いて読めるようにする。スマホは下から、PC は左から。
 * - **ここには問い合わせのボタン・電話番号を置かない**（依頼の指定：CTA は押しつけず、ヘッダーと適切な区画に置く）。
 *   代わりに、種類のページへの入口を小さく並べる（検討の入口）。
 * - 写真は CC BY 2.0 の実写で、当社の施工現場ではない。隅に出典を出し、くわしくは運営会社のページ（#photos）に載せる。
 *   当社の現場の写真が届いたら、public/images/photos/ の hero-wide・hero-tall を差し替える（README「写真の差し替え」）。
 * - PC は横長の1枚、スマホは配管の写る範囲を切り出した縦長の1枚を、<picture> で出し分ける。読み込まれるのは片方だけ。
 */
function Wave() {
  return (
    <svg className="absolute inset-x-0 bottom-[-1px] block h-7 w-full text-white sm:h-12" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path fill="currentColor" d="M0 42c200 34 440 34 720 8s520-30 720 2v28H0z" />
    </svg>
  );
}

const TALL_MEDIA = "(max-width: 767px)";
const WIDE_MEDIA = "(min-width: 768px)";
const TALL_SIZES = "100vw";
const WIDE_SIZES = "(max-width: 1100px) 1100px, 100vw";

function HeroPhoto() {
  const wide = img("photos/hero-wide");
  const tall = img("photos/hero-tall");
  const alt = "住宅の外壁から出ている、給湯器用の給水・給湯の配管とガス管";
  const w = getImageProps({ src: wide.src, width: wide.width, height: wide.height, alt, sizes: WIDE_SIZES, quality: 60 }).props;
  const t = getImageProps({ src: tall.src, width: tall.width, height: tall.height, alt, sizes: TALL_SIZES, quality: 60 }).props;
  return (
    <>
      <link rel="preload" as="image" imageSrcSet={t.srcSet} imageSizes={TALL_SIZES} media={TALL_MEDIA} fetchPriority="high" />
      <link rel="preload" as="image" imageSrcSet={w.srcSet} imageSizes={WIDE_SIZES} media={WIDE_MEDIA} fetchPriority="high" />
      <picture>
        <source media={TALL_MEDIA} srcSet={t.srcSet} sizes={TALL_SIZES} />
        <source media={WIDE_MEDIA} srcSet={w.srcSet} sizes={WIDE_SIZES} />
        <img src={w.src} alt={alt} width={wide.width} height={wide.height} fetchPriority="high" loading="eager" decoding="async" className="absolute inset-0 size-full object-cover object-[50%_30%] md:object-[70%_50%] lg:object-[62%_50%]" />
      </picture>
    </>
  );
}

export function Hero({ productCount, brandCount }: { productCount: number; brandCount: number }) {
  const credit = creditOf("photos/hero-wide");
  return (
    <section className="relative isolate overflow-hidden bg-silver-200">
      <div className="absolute inset-0 -z-10">
        <HeroPhoto />
      </div>

      {/* 高さは画面ぴったりにしない（Lighthouse が LCP の候補から外し、NO_LCP になるため） */}
      <div className="container-x relative flex items-end pb-16 pt-56 sm:pb-24 sm:pt-72 lg:min-h-[min(40rem,calc(100svh-9rem))] lg:items-center lg:pb-24 lg:pt-16">
        <div className="relative w-full max-w-[37rem]">
          <div className="hero-veil" aria-hidden="true" />
          <p className="flex">
            <span className="pill !text-[0.8125rem] sm:!text-[0.875rem]">給湯器の交換・販売</span>
          </p>
          <h1 className="mt-5 font-heading text-[min(7vw,2.5rem)] font-black leading-[1.45] tracking-[0.02em] text-navy-900 sm:text-[2.5rem] lg:text-[2.75rem]">
            <span className="ib">横浜市・戸塚区の</span>
            <span className="ib">給湯器交換なら</span>
            <span className="ib marker">ヨコジュウ</span>
          </h1>
          <p className="mt-5 max-w-[33rem] text-[0.9375rem] font-medium leading-[2] text-ink sm:text-base">
            <span className="ib">ガス給湯器・エコジョーズ・</span>
            <span className="ib">エコキュート・ハイブリッド給湯器まで。</span>
            <span className="ib">設置環境やご予算に合わせて</span>
            <span className="ib">ご提案します。</span>
          </p>
          <nav aria-label="種類から探す" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={c.path} className="opt !bg-white/90">
                    {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-5 text-[0.8125rem] font-bold text-ink-body">
            掲載機種 <span className="num text-[0.9375rem] text-navy-900">{productCount}</span>（{brandCount}メーカー・型番と仕様は公式の資料で確認）
          </p>
        </div>
      </div>

      {credit && (
        <p className="absolute bottom-8 right-4 text-[0.6875rem] leading-none text-ink-body sm:bottom-14 sm:right-6 lg:bottom-16 lg:right-5 lg:rounded-full lg:bg-navy-950/70 lg:px-2.5 lg:py-1.5 lg:text-xs lg:leading-none lg:text-white">
          <Link href="/company#photos" className="-my-2 inline-block py-2 underline-offset-2 hover:underline">
            写真：{credit.author}（{credit.license}）・当社の施工現場ではありません
          </Link>
        </p>
      )}
      <Wave />
    </section>
  );
}
