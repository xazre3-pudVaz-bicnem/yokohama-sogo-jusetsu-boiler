import type { ImageKey } from "@/lib/images";

/**
 * 出典の表示が必要な写真（クリエイティブ・コモンズのライセンスで公開されている実写）。
 * 写真の隅と、運営会社のページの下部に表示する。写真を差し替えたら、ここも直す。
 *
 * - photos/hero-*  … トップの冒頭。新築の住宅の外壁に出ている、給湯器用の配管（給水・給湯・ガス）の実写。
 *                    当社の施工現場の写真ではない。当社の現場の写真が用意できたら、差し替える（docs/TODO.md）。
 * - area/*         … 地域のページ。コーポレートサイトで使っているものと同じ写真。
 */
export type PhotoCredit = {
  images: ImageKey[];
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  /** 加えた変更（ライセンスの条件として表示する） */
  changes: string;
};

export const photoCredits: PhotoCredit[] = [
  {
    images: ["photos/hero-wide", "photos/hero-tall"],
    title: "給湯器 ガス管 注意",
    author: "Inomshog",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/deed.ja",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:%E7%B5%A6%E6%B9%AF%E5%99%A8_%E3%82%AC%E3%82%B9%E7%AE%A1_%E6%B3%A8%E6%84%8F_(38469647364).jpg",
    changes: "サイズを縮小し、一部を切り出して使用",
  },
  {
    images: ["area/totsuka-aerial"],
    title: "戸塚駅周辺3",
    author: "横浜市（横浜市オープンデータポータル）",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.ja",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Totsuka_station_area.jpg",
    changes: "サイズを縮小し、一部を切り出して使用",
  },
  {
    images: ["area/yokohama-minatomirai"],
    title: "Minato Mirai In Blue",
    author: "akumach",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/deed.ja",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Minato_Mirai_In_Blue.jpg",
    changes: "サイズを縮小し、上下を切り出して使用",
  },
];

export function creditOf(image: ImageKey): PhotoCredit | undefined {
  return photoCredits.find((c) => c.images.includes(image));
}

/** 写真の隅に出す短い表記（例：Photo: Inomshog / CC BY 2.0） */
export function creditLabel(image: ImageKey): string {
  const c = creditOf(image);
  return c ? `Photo: ${c.author} / ${c.license}` : "";
}
