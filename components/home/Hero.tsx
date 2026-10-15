import Image from "next/image";
import Link from "next/link";
import type { CardImage } from "@/components/product/ProductImage";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Icon } from "@/components/ui/Icon";
import type { BrandLogo, CategoryId, InstallationKey } from "@/data/products/types";
import { img } from "@/lib/images";

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

/** 種類の入口の色（白い文字は、どれも 4.5:1 以上の濃さの地に載せる） */
const TONE: Record<string, { box: string; arrow: string; icon: "gas" | "ecocute" | "hybrid" }> = {
  gas: { box: "border-gas-500 bg-gas-700 shadow-[0_6px_0_var(--color-gas-800)]", arrow: "text-gas-700", icon: "gas" },
  "eco-jozu": { box: "border-gas-500 bg-gas-700 shadow-[0_6px_0_var(--color-gas-800)]", arrow: "text-gas-700", icon: "gas" },
  ecocute: { box: "border-brand-500 bg-brand-700 shadow-[0_6px_0_var(--color-brand-800)]", arrow: "text-brand-700", icon: "ecocute" },
  hybrid: { box: "border-hybrid-500 bg-hybrid-700 shadow-[0_6px_0_#5a35b8]", arrow: "text-hybrid-700", icon: "hybrid" },
};

/**
 * トップページの最初の画面（2026-10-15 の依頼で、キンライサーのような明るい作りに変えた）。
 * - 地：淡いピンクに泡（Codex で作った画像。製品は写っていない）と、色の丸の飾り。
 * - 中央：ひとこと・見出し（h1：横浜市・戸塚区の給湯器交換なら ヨコジュウ）・赤い副題。
 * - 種類の入口（ガス給湯器・エコキュート・ハイブリッド）：色の大きなボタンに、メーカーの公式の製品写真を白い窓で載せる。
 *   写真はそれぞれ別の実在の機種で、1つの製品のように合成しない（下にメーカーと型番を書く）。
 * - 左右：スタッフのイラスト（実在の社員ではない）と、キャラクター「ゆげまる」（どちらも Codex で作った絵）。PC だけ。
 * - 入口とボタンの並び（[data-hero-cta]）が画面から外れると、スマホの下部の固定ボタンが出る（MobileCtaBar）。
 */
export function Hero({ showcase }: { showcase: HeroShowcase[] }) {
  const bg = img("ai/hero-bubbles");
  const staff = img("ai/staff-duo");
  const mascot = img("ai/mascot-wave");
  const mark = img("brand/logo-mark");
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-pop-pink">
      <Image src={bg.src} alt="" fill sizes="100vw" quality={60} preload fetchPriority="high" className="object-cover" />
      {/* 色の丸の飾り */}
      <div className="bubbles" aria-hidden="true">
        <span style={{ left: "-5rem", top: "-5rem", width: "15rem", height: "15rem", background: "#ffe14a", opacity: 0.85 }} />
        <span style={{ left: "16%", top: "5.5rem", width: "5rem", height: "5rem", background: "#7fdc93", opacity: 0.8 }} />
        <span style={{ left: "31%", top: "-3.5rem", width: "8rem", height: "8rem", background: "#8fd3f5", opacity: 0.8 }} />
        <span style={{ right: "26%", top: "-4rem", width: "10rem", height: "10rem", background: "#ffe14a", opacity: 0.85 }} />
        <span style={{ right: "6%", top: "1.5rem", width: "6rem", height: "6rem", background: "#8fd3f5", opacity: 0.8 }} />
        <span style={{ right: "-3rem", top: "9rem", width: "9rem", height: "9rem", background: "#ff9fae", opacity: 0.7 }} />
        <span style={{ left: "4%", bottom: "4rem", width: "6.5rem", height: "6.5rem", background: "#ffe14a", opacity: 0.85 }} />
        <span style={{ right: "12%", bottom: "2.5rem", width: "5rem", height: "5rem", background: "#7fdc93", opacity: 0.85 }} />
        <span style={{ left: "45%", bottom: "1.5rem", width: "1.25rem", height: "1.25rem", background: "#2cb3ee" }} />
        <span style={{ right: "38%", bottom: "4.5rem", width: "0.9rem", height: "0.9rem", background: "#e0122b" }} />
      </div>

      {/* PC：左右にスタッフのイラストとキャラクター */}
      <Image
        src={staff.src}
        width={staff.width}
        height={staff.height}
        alt=""
        sizes="(min-width: 1280px) 300px, 260px"
        quality={78}
        className="pointer-events-none absolute left-[max(1rem,calc(50%-41rem))] top-[19rem] hidden h-auto w-[14rem] lg:block xl:top-[20rem] xl:w-[16.5rem]"
      />
      <Image
        src={mascot.src}
        width={mascot.width}
        height={mascot.height}
        alt=""
        sizes="(min-width: 1280px) 220px, 180px"
        quality={80}
        className="pointer-events-none absolute right-[max(1rem,calc(50%-40rem))] top-[24rem] hidden h-auto w-[10rem] lg:block xl:top-[25rem] xl:w-[12rem]"
      />

      <div className="container-x relative pb-24 pt-8 text-center sm:pt-12 lg:pb-28 lg:pt-14">
        <p className="font-heading text-[clamp(1rem,0.82rem+0.9vw,1.5rem)] font-bold tracking-[0.3em] text-ink">お湯のこと、困ったら</p>
        <h1 id="hero-title" className="mt-3">
          <span className="block font-heading text-[clamp(1.0625rem,0.9rem+0.8vw,1.5rem)] font-black tracking-[0.1em] text-ink">横浜市・戸塚区の給湯器交換なら</span>
          <span className="mt-2 inline-flex items-center gap-[0.18em] font-heading text-[clamp(3.25rem,2.1rem+5.4vw,6rem)] font-black leading-none tracking-[0.04em] text-ink">
            <Image src={mark.src} width={mark.width} height={mark.height} alt="" sizes="96px" className="h-[0.95em] w-auto" />
            ヨコジュウ
          </span>
        </h1>
        <p className="mt-6 inline-flex flex-col items-center gap-2 font-heading text-[clamp(1.0625rem,0.86rem+1vw,1.625rem)] font-black tracking-[0.14em] text-cta-700">
          <span className="dotted-under">ガス給湯器・エコキュートの交換と</span>
          <span className="dotted-under">写真でかんたん無料見積もり</span>
        </p>

        <div data-hero-cta>
          <ul className="mx-auto mt-14 grid max-w-[54rem] gap-x-5 gap-y-14 text-left sm:mt-20 sm:grid-cols-3 sm:text-center">
            {showcase.map((s) => {
              const tone = TONE[s.category] ?? TONE.gas;
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className={`group relative flex h-full items-center gap-4 rounded-[1.75rem] border-4 py-4 pl-[7.5rem] pr-4 text-white transition-transform hover:translate-y-0.5 sm:flex-col sm:gap-1.5 sm:px-4 sm:pb-5 sm:pt-[5.25rem] ${tone.box}`}
                  >
                    {/* 公式の製品写真（白い窓に入れる。メーカーの写真は白い地のものが多いため） */}
                    <span className="absolute left-3 top-1/2 grid size-[6.25rem] -translate-y-1/2 place-items-center overflow-hidden rounded-2xl border-4 border-white bg-white sm:left-1/2 sm:top-0 sm:size-[7.5rem] sm:-translate-x-1/2 sm:-translate-y-1/2">
                      {s.image ? (
                        <Image src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} sizes="120px" quality={75} className="h-[88%] w-[88%] object-contain" />
                      ) : (
                        <CategoryIcon kind={tone.icon} className="size-16" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1 font-heading font-black leading-tight sm:flex-none">
                      <span className="block text-[1.375rem] tracking-[0.04em] sm:text-[1.5rem]">{s.label.replace("ハイブリッド給湯器", "ハイブリッド")}</span>
                      <span className="mt-0.5 block text-[1rem] tracking-[0.08em]">の交換はこちら</span>
                    </span>
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full bg-white ${tone.arrow}`} aria-hidden="true">
                      <Icon name="arrowRight" className="size-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-9">
            <Link href="/contact/photo" className="btn btn-yellow btn-lg">
              <CategoryIcon kind="camera" className="size-6" />
              写真を送ってかんたん見積もり
              <Icon name="arrowRight" className="btn-arrow size-4" />
            </Link>
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[0.6875rem] leading-relaxed text-ink-mute">
            製品の写真はメーカーの公式サイトより（{showcase.map((s) => `${s.brandName} ${s.caption}`).join("／")}）。人物とキャラクターはイラストです。
          </p>
        </div>
      </div>

      {/* 下の端の色の線（飾り） */}
      <svg className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14" viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 56V30C240 6 480 6 720 26s480 26 720 0v30Z" fill="#fff" />
        <path d="M0 30C240 6 480 6 720 26s480 26 720 0" stroke="#e0122b" strokeWidth="3" fill="none" />
        <path d="M0 37C240 13 480 13 720 33s480 26 720 0" stroke="#ffd21f" strokeWidth="3" fill="none" />
        <path d="M0 44C240 20 480 20 720 40s480 26 720 0" stroke="#2cb3ee" strokeWidth="3" fill="none" />
      </svg>
    </section>
  );
}
