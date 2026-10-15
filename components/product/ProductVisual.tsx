import Image from "next/image";
import { TypeFigure, figureKindOf } from "@/components/diagram/TypeFigure";
import type { CategoryId, InstallationKey } from "@/data/products/types";

/**
 * 商品の見た目の枠。
 * - 掲載の許諾を得た製品写真があれば、それを出す。
 * - 無ければ、設置タイプの図（線画）を出し、「製品写真は準備中」と添える。
 *   図は設置方式を表す模式図で、その製品の外観ではない。製品写真のように見せないこと。
 *
 * このコンポーネントは、画面側（絞り込みの一覧）からも使うので、サーバー専用のものを import しない。
 */
export function ProductVisual({
  image,
  category,
  installKey,
  sizes,
  priority = false,
  tall = false,
  className = "",
}: {
  image: { src: string; alt: string; width: number; height: number } | null;
  category: CategoryId;
  installKey: InstallationKey | string;
  sizes: string;
  priority?: boolean;
  tall?: boolean;
  className?: string;
}) {
  if (image) {
    return (
      <div className={`product-visual bg-white ${tall ? "product-visual-tall" : ""} ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          quality={75}
          {...(priority ? ({ preload: true, fetchPriority: "high", loading: "eager" } as const) : {})}
          className="h-full w-full object-contain p-4"
        />
      </div>
    );
  }
  return (
    <div className={`product-visual ${tall ? "product-visual-tall" : ""} ${className}`}>
      <TypeFigure kind={figureKindOf(category, installKey as InstallationKey)} className="h-full w-full p-4 sm:p-5" />
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-bold leading-none text-ink-mute">製品写真は準備中（図は設置タイプ）</p>
    </div>
  );
}
