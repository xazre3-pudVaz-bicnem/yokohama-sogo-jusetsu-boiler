import { TypeFigure } from "@/components/diagram/TypeFigure";
import { Illust } from "@/components/ui/Photo";
import type { PostCover as Cover } from "@/lib/blog";

/**
 * コラムの記事の絵（一覧のカードと、記事の冒頭）。
 * 写真は使わない（給湯器の施工写真がまだ無く、ほかの工事の写真は記事の内容と合わないため）。
 * 設置の形の模式図（components/diagram/TypeFigure.tsx。製品の外観ではない）か、人物のイラストを、淡い地の上に置く。
 * どちらも飾りなので、読み上げの対象にしない（記事の題名がすぐ近くにある）。
 */
export function PostCover({ cover, illustWidth = 160, className = "" }: { cover: Cover; illustWidth?: number; className?: string }) {
  return (
    <div className={`relative grid h-full w-full place-items-center overflow-hidden bg-mist ${className}`} aria-hidden="true">
      <span className="absolute -right-6 -top-6 size-24 rounded-full bg-white/70" />
      <span className="absolute -bottom-8 -left-4 size-20 rounded-full bg-sun-100" />
      {cover.type === "figure" ? (
        <TypeFigure kind={cover.kind} className="relative h-[78%] w-auto max-w-[86%]" />
      ) : (
        <Illust image={cover.image} width={illustWidth} className="relative h-[82%] w-auto max-w-[70%] object-contain" />
      )}
    </div>
  );
}

/** 記事の冒頭の絵に添える説明（模式図のときだけ） */
export function coverCaption(cover: Cover): string | null {
  return cover.type === "figure" ? "図は、給湯器の設置の形を表した模式図です（製品の外観ではありません）。" : null;
}
