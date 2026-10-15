import type { ImageKey } from "@/lib/images";

/**
 * 給湯器の施工事例。
 *
 * 載せるのは、当社が実際に施工した現場だけ。架空の事例・ほかの会社の写真・イメージ写真は載せない。
 * 2026-10-14 の時点で、給湯器の施工事例として使える写真が無いため、配列は空にしてある
 * （コーポレートサイトの施工事例8件は、エアコン・浴室暖房乾燥機・カップボード・ウッドデッキ・塗装で、給湯器の交換は含まれていない）。
 * 事例が1件も無いあいだ、/works は「準備中」の案内を出し、検索結果には出さない（noindex）。
 *
 * 事例の足し方（くわしくは README の「施工事例を足す」）
 *   1. 写真を public/images/works/ に置く（お客様の了承を得たもの。表札・車のナンバー・ご近所の家が写っていないもの）
 *   2. npm run images:prepare で、画像の一覧を作り直す
 *   3. 下の works に、1件足す。分からない項目（金額・時期・型番）は書かない（空のまま。画面にも出ない）
 *      地域（area）は、確認できたものだけ、市区まで書く
 */
export type WorkPhoto = {
  image: ImageKey;
  alt: string;
  /** 施工前・施工後・工程 */
  phase: "before" | "after" | "process";
  caption?: string;
};

export type Work = {
  /** URL の末尾（/works/<slug>）。公開後は変えない */
  slug: string;
  /** 工事名（例：ガス給湯器からエコジョーズへの交換（屋外壁掛・24号）） */
  title: string;
  /** 一覧に出す短い説明 */
  summary: string;
  /** 対応エリア（確認できたものだけ。市区まで。例：横浜市戸塚区）。data/areas.ts の slug と対応させると、地域のページにも出る */
  area?: { slug?: string; label: string };
  /** 住まいの種類 */
  housing?: "戸建て" | "マンション" | "そのほか";
  /** 施工内容（何をしたか） */
  description: string[];
  /** 施工前の機器（分かるものだけ） */
  before?: { maker?: string; model?: string; note?: string };
  /** 施工後の機器。productId は、data/products の id（機種のページへのリンクになる） */
  after?: { maker?: string; model?: string; productId?: string; note?: string };
  photos: WorkPhoto[];
  /** 工事で確認した点・むずかしかった点 */
  checkpoints?: string[];
  /** 施工の時期（例：2026年9月）。分からなければ書かない */
  period?: string;
  /** 掲載した日（YYYY-MM-DD） */
  postedAt: string;
  /** 内容を直した日 */
  updatedAt?: string;
  /** 使った補助金（事実だけ） */
  subsidy?: string;
};

export const works: Work[] = [];

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

export function workUpdatedAt(w: Work): string {
  return w.updatedAt ?? w.postedAt;
}

export function worksOfArea(areaSlug: string): Work[] {
  return works.filter((w) => w.area?.slug === areaSlug);
}

export function worksOfProduct(productId: string): Work[] {
  return works.filter((w) => w.after?.productId === productId);
}
