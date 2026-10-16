import Image from "next/image";
import { TypeFigure, figureKindOf } from "@/components/diagram/TypeFigure";
import type { CategoryId, InstallationKey } from "@/data/products/types";

export type CardImage = { src: string; alt: string; width: number; height: number };

/**
 * 商品の写真の枠（一覧のカード・機種のページ・比較・トップで共通）。
 * - 写真は、商品データ（data/products/images.json から足した images）の代表の写真。ここで写真の場所を決めない。
 * - メーカーが複数の型番に同じ写真を使っている場合（shared）は、「シリーズ共通イメージ」と添える。
 * - 型番に合う公式の写真が無い機種は、設置タイプの図（線画）を出し、「図は設置タイプ」と添える。
 *   図は設置方式を表す模式図で、その製品の外観ではない。製品写真のように見せないこと。
 * - 写真は枠に収める（切り抜かない）。比率を固定して、カードの高さをそろえる。
 *
 * 画面側（絞り込みの一覧）からも使うので、サーバー専用のものを import しない。
 */
export function ProductImage({
  image,
  shared = false,
  category,
  installKey,
  sizes,
  priority = false,
  tall = false,
  note = true,
  className = "",
}: {
  image: CardImage | null;
  shared?: boolean;
  category: CategoryId;
  installKey: InstallationKey | string;
  sizes: string;
  priority?: boolean;
  tall?: boolean;
  /** 隅の注記（シリーズ共通イメージ・図は設置タイプ）を出すか */
  note?: boolean;
  className?: string;
}) {
  if (image) {
    return (
      <div className={`product-visual ${tall ? "product-visual-tall" : ""} ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          quality={75}
          {...(priority ? ({ preload: true, fetchPriority: "high", loading: "eager" } as const) : {})}
          // 枠いっぱいに置いて、枠の中に収める（グリッドの中の高さ 100% は効かないことがあり、縦長の写真が枠からはみ出すため）
          className="absolute inset-0 m-auto h-full w-full object-contain p-[7%]"
          // 小さい写真を引き伸ばしすぎない（元の大きさの 1.25 倍まで。ぼやけて見えるため）
          style={{ maxWidth: Math.round(image.width * 1.25), maxHeight: Math.round(image.height * 1.25) }}
        />
        {note && shared && <span className="visual-note">シリーズ共通イメージ</span>}
      </div>
    );
  }
  return (
    <div className={`product-visual ${tall ? "product-visual-tall" : ""} ${className}`}>
      <TypeFigure kind={figureKindOf(category, installKey as InstallationKey)} className="h-full w-full p-4 sm:p-5" />
      {note && <span className="visual-note">図は設置タイプ（製品写真ではありません）</span>}
    </div>
  );
}
