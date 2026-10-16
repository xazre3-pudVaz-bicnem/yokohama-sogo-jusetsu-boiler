import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import { siteConfig } from "@/lib/site";

/**
 * ロゴ。コーポレートサイトと同じマーク（画像）＋社名（文字）に、このサイトの名前（給湯器専門サイト）を添える。
 * マークは背景ごとに画像を分けている（明るい背景：logo-mark ／ 濃い背景：logo-mark-dark）。
 * 社名を文字にしているのは、拡大しても崩れず、読み上げにも対応できるため。
 *
 * 幅 360px のスマホでも、右側のボタン（電話・メニュー）と並んで収まるように、
 * md サイズは画面幅に合わせて少し縮む（clamp）。大きさを変えるときは、幅 360px でのはみ出しを確かめること。
 * 幅 360px 未満（小さなスマホ・拡大表示）では、「株式会社」の小さな文字を省いて、右のボタンと重ならないようにする。
 * マークと社名は、ひとまとまりのロゴなので、大きさは px で決める（ブラウザの文字の大きさの設定で、ロゴだけが画面からはみ出さないように）。
 */
export function Logo({ onDark = false, size = "md", priority = false }: { onDark?: boolean; size?: "md" | "lg"; priority?: boolean }) {
  const mark = img(onDark ? "brand/logo-mark-dark" : "brand/logo-mark");
  const h = size === "lg" ? 56 : 42;
  const w = Math.round((mark.width / mark.height) * h);
  const lg = size === "lg";
  return (
    <Link href="/" className={`group inline-flex min-w-0 items-center ${lg ? "gap-2.5" : "gap-2 xs:gap-2.5"}`}>
      <Image
        src={mark.src}
        width={w}
        height={h}
        alt=""
        sizes={`${w}px`}
        quality={75}
        // ヘッダーのロゴは最初から読み込む。ただし、ほかの画像より先には取りに行かせない
        // （React は eager な img を自動で先読みするので、ページの主役の写真と取り合わないよう、優先度を下げる）
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "low" : undefined}
        className={`w-auto shrink-0 ${lg ? "h-[44px] xs:h-[56px]" : "h-[34px] xs:h-[42px]"}`}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span className={`flex items-baseline gap-1 whitespace-nowrap font-bold tracking-[0.08em] xs:gap-1.5 ${onDark ? "text-white" : "text-navy-900"}`}>
          <span className={`${lg ? "text-[10px] xs:text-[12px]" : "text-[9px] max-[22.5rem]:hidden xs:text-[10px]"} font-semibold tracking-[0.12em] opacity-80`}>株式会社</span>
          <span className={lg ? "text-[clamp(19px,5.3vw,24px)]" : "text-[clamp(17px,4.6vw,20.8px)]"}>{siteConfig.shortName}</span>
        </span>
        <span
          className={`mt-1.5 whitespace-nowrap font-bold tracking-[0.18em] ${lg ? "text-[clamp(11px,2.9vw,13px)]" : "text-[clamp(9.5px,2.5vw,11px)]"} ${onDark ? "text-sky-300" : "text-cta-700"}`}
        >
          {siteConfig.siteLabel}
        </span>
      </span>
      {/* 読み上げ用。aria-label で上書きせず、見えている社名のあとに足す（見えている文字と読み上げをそろえるため） */}
      <span className="sr-only">（ホームへ）</span>
    </Link>
  );
}
