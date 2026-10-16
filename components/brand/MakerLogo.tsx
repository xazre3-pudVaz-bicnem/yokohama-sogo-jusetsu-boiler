import Image from "next/image";
import type { BrandLogo } from "@/data/products/types";

/**
 * メーカーの公式ロゴ（public/images/manufacturers/ のファイル。取得元は data/brand-logos.json）。
 * - height は基準の高さ（px）。メーカーごとの見た目の大きさの差は、ロゴの scale で調整する（ここで個別に変えない）。
 * - ロゴが無いときは、社名の文字を出す（ロゴを描き直したり、似せた文字にしたりしない）。
 * - 社名のテキストが隣にあるときは decorative にして、読み上げが重ならないようにする。
 *
 * 画面側（絞り込みの一覧）からも使うので、サーバー専用のものを import しない。
 */
export function MakerLogo({
  logo,
  name,
  height = 24,
  decorative = false,
  priority = false,
  className = "",
}: {
  logo: BrandLogo | null;
  name: string;
  height?: number;
  decorative?: boolean;
  priority?: boolean;
  className?: string;
}) {
  if (!logo) {
    return (
      <span className={`whitespace-nowrap font-heading font-bold leading-none text-navy-900 ${className}`} style={{ fontSize: Math.max(12, Math.round(height * 0.62)) }} aria-hidden={decorative || undefined}>
        {name}
      </span>
    );
  }
  const h = Math.round(height * (logo.scale ?? 1));
  const w = Math.round((logo.width / logo.height) * h);
  return (
    <Image
      src={logo.src}
      alt={decorative ? "" : name}
      width={w}
      height={h}
      // SVG はそのまま配る（画像の最適化は、写真のような画像だけ）
      unoptimized={logo.src.endsWith(".svg")}
      {...(priority ? ({ preload: true, loading: "eager" } as const) : {})}
      className={`shrink-0 ${className}`}
      // 置き場所が狭いときは、縦横の比率を保ったまま小さくする（高さを固定すると、幅だけ縮んでロゴが潰れる）
      style={{ width: w, maxWidth: "100%", height: "auto" }}
    />
  );
}
