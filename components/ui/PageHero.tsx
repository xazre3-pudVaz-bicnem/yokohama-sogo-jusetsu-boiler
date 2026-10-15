import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Illust, PhotoFill } from "@/components/ui/Photo";
import { Phrase } from "@/components/ui/Phrase";
import { hasImage, img, type ImageKey } from "@/lib/images";

/**
 * 下層ページの冒頭（2026-10-15 の依頼で、キンライサーのような明るい作りに変えた）。
 * 淡い色の地に泡の丸い飾り・パンくず・ラベル（＼ ／）・太い h1・短い説明。
 *
 * <PageHero>  … 右にキャラクターかスタッフのイラストを添える（一覧・案内のページ）。
 * <PhotoHero> … 右に写真を角丸のカードで添える（サービス・地域のページ）。
 *
 * 地の色と、ヘッダーの帯の色は、ページの種類で変わる（section。指定が無いときは、パンくずの先頭のページから決める）。
 *   gas（ガス給湯器・エコジョーズ）… 緑 ／ ecocute … 水色 ／ hybrid … 紫 ／ subsidy … ピンク ／ そのほか … ピンク
 * 冒頭に置くのは「ラベル・見出し（h1）・短い説明・写真かイラスト」だけ。問い合わせのボタン・電話番号・バッジは置かない。
 * 見出しは最初の描画でそのまま見せる（登場アニメーションを付けない）。LCP を遅らせないため。
 */
export type PageSection = "gas" | "ecocute" | "hybrid" | "subsidy";

const SECTION_OF_PATH: Record<string, PageSection> = {
  "/gas-water-heater": "gas",
  "/eco-jozu": "gas",
  "/ecocute": "ecocute",
  "/hybrid": "hybrid",
  "/subsidy": "subsidy",
};

const TONE: Record<PageSection | "default", { bg: string; dots: [string, string, string] }> = {
  gas: { bg: "bg-gas-50", dots: ["#c6f2d4", "#ffe98a", "#bfe9fb"] },
  ecocute: { bg: "bg-brand-50", dots: ["#c4ecfc", "#ffe98a", "#d9f7e3"] },
  hybrid: { bg: "bg-hybrid-50", dots: ["#e2d8ff", "#ffe98a", "#c4ecfc"] },
  subsidy: { bg: "bg-pop-pink-50", dots: ["#ffd3db", "#ffe98a", "#c6f2d4"] },
  default: { bg: "bg-pop-pink-50", dots: ["#ffd3db", "#ffe98a", "#c4ecfc"] },
};

/** 以前の線画のイラストを、このサイトのキャラクター・スタッフの絵に置き換える（内容の意味が近いもの） */
const PICTURE: Record<string, ImageKey> = {
  "illust/pose-think": "ai/mascot-think",
  "illust/pose-calc": "ai/mascot-point",
  "illust/pose-idea": "ai/mascot-point",
  "illust/pose-laptop": "ai/mascot-point",
  "illust/pose-chart": "ai/mascot-point",
  "illust/pose-ok": "ai/mascot-ok",
  "illust/pose-phone": "ai/mascot-ok",
  "illust/people-staff-ok": "ai/staff-duo",
  "illust/people-staff-point": "ai/staff-duo",
};

export function sectionOf(crumbs: Crumb[], section?: PageSection): PageSection | undefined {
  if (section) return section;
  const first = crumbs[0]?.href ?? "";
  return SECTION_OF_PATH[first] ?? (first.startsWith("/subsidy") ? "subsidy" : undefined);
}

function Bubbles({ dots }: { dots: [string, string, string] }) {
  return (
    <div className="bubbles" aria-hidden="true">
      <span style={{ left: "-3rem", top: "-3rem", width: "11rem", height: "11rem", background: dots[1], opacity: 0.85 }} />
      <span style={{ right: "18%", top: "-4rem", width: "9rem", height: "9rem", background: dots[0], opacity: 0.9 }} />
      <span style={{ right: "-2.5rem", bottom: "1.5rem", width: "8rem", height: "8rem", background: dots[2], opacity: 0.9 }} />
      <span style={{ left: "38%", bottom: "-1.5rem", width: "4rem", height: "4rem", background: dots[0], opacity: 0.9 }} />
    </div>
  );
}

function Heading({ eyebrow, title, lead }: { eyebrow?: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <>
      {eyebrow && (
        <p className="mb-3 flex">
          <span className="pill">{eyebrow}</span>
        </p>
      )}
      <h1 className="h-page text-balance">
        <Phrase>{title}</Phrase>
      </h1>
      {lead && <p className="mt-5 max-w-3xl text-pretty text-[0.9688rem] leading-[2] sm:text-base sm:leading-[2]">{lead}</p>}
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  illust,
  aside,
  section,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  /** ページ内の案内（区分へのリンクなど）。問い合わせのボタンは入れない */
  children?: ReactNode;
  /** 右に添えるイラスト（以前の線画を指定しても、このサイトのキャラクター・スタッフの絵に置き換わる） */
  illust?: ImageKey;
  /** 右に添える、そのほかの見せ物（メーカーのロゴなど）。illust と同時には使わない */
  aside?: ReactNode;
  /** ページの種類（地の色とヘッダーの帯の色）。指定が無いときは、パンくずの先頭のページから決める */
  section?: PageSection;
}) {
  const s = sectionOf(crumbs, section);
  const tone = TONE[s ?? "default"];
  const pictureKey = illust ? (PICTURE[illust] && hasImage(PICTURE[illust]) ? PICTURE[illust] : illust) : undefined;
  const portrait = pictureKey ? img(pictureKey).height > img(pictureKey).width * 1.2 : false;
  return (
    <header data-section={s} className={`relative overflow-hidden border-b-4 border-white ${tone.bg}`}>
      <Bubbles dots={tone.dots} />
      <div className="container-x relative pb-10 pt-4 sm:pb-12 lg:pt-5">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-5 sm:mt-8 ${pictureKey ? "grid items-center gap-x-12 gap-y-6 lg:grid-cols-[1fr_14rem]" : aside ? "grid items-center gap-x-12 gap-y-6 lg:grid-cols-[1fr_22rem]" : ""}`}>
          <div className="max-w-3xl">
            <Heading eyebrow={eyebrow} title={title} lead={lead} />
          </div>
          {aside && !pictureKey && <div>{aside}</div>}
          {pictureKey && (
            <div className={`mx-auto lg:mx-0 lg:w-full ${portrait ? "w-28 sm:w-36" : "w-32 sm:w-40"}`}>
              <Illust image={pictureKey} width={240} className="mx-auto h-auto w-full" />
            </div>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}

export function PhotoHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  imageAlt,
  children,
  credit,
  caption,
  imageClassName = "",
  section,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  image: ImageKey;
  imageAlt: string;
  /** 見出しの下に置く補足（対応範囲の注記など）。問い合わせのボタンは入れない */
  children?: ReactNode;
  /** 写真の出典（表示が必要な写真だけ） */
  credit?: ReactNode;
  /** 写真の説明（当社の現場の写真なら「当社施工」、イメージ写真なら「写真はイメージです」） */
  caption?: string;
  /** 写真の見せる位置（object-position のクラス） */
  imageClassName?: string;
  section?: PageSection;
}) {
  const s = sectionOf(crumbs, section);
  const tone = TONE[s ?? "default"];
  const portrait = img(image).height > img(image).width;
  return (
    <header data-section={s} className={`relative overflow-hidden border-b-4 border-white ${tone.bg}`}>
      <Bubbles dots={tone.dots} />
      <div className="container-x relative pb-10 pt-4 sm:pb-12 lg:pt-5">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-5 grid items-center gap-x-12 gap-y-9 sm:mt-8 ${portrait ? "lg:grid-cols-[1fr_22rem]" : "lg:grid-cols-[1.05fr_1fr]"}`}>
          <div>
            <Heading eyebrow={eyebrow} title={title} lead={lead} />
            {children}
          </div>
          <figure className={portrait ? "mx-auto w-full max-w-sm lg:max-w-none" : ""}>
            <div className="photo-frame photo-frame-r">
              <div className={`photo-card relative border-4 border-white ${portrait ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                <PhotoFill image={image} alt={imageAlt} sizes={portrait ? "(min-width: 1024px) 352px, 384px" : "(min-width: 1280px) 540px, (min-width: 1024px) 46vw, 100vw"} priority className={imageClassName} />
                {credit && <p className="absolute bottom-0 right-0 rounded-tl-lg bg-navy-950/70 px-2 py-1 text-[0.625rem] leading-none text-white">{credit}</p>}
              </div>
            </div>
            {caption && <figcaption className="mt-3 text-xs leading-relaxed text-ink-mute">{caption}</figcaption>}
          </figure>
        </div>
      </div>
    </header>
  );
}
