import type { CategoryId, FunctionKey, Housing, InstallationKey } from "@/data/products/types";

/**
 * 給湯器の種類（商品の区分）と、絞り込みに使う区分の表示名。
 * 種類ごとの専用ページ（/gas-water-heater・/eco-jozu・/ecocute・/hybrid）の URL もここで決める。
 */

export type Category = {
  id: CategoryId;
  /** 画面に出す名前 */
  name: string;
  /** 一覧・札に出す短い名前 */
  shortName: string;
  /** 種類ごとの専用ページ */
  path: string;
  /** 一言の説明（カードに出す） */
  summary: string;
  /** 熱源 */
  energy: string;
  /** 給湯省エネ2026事業の対象機器の種類か */
  kyutouShoeneTarget: boolean;
};

export const categories: Category[] = [
  {
    id: "gas",
    name: "ガス給湯器（従来型）",
    shortName: "ガス給湯器",
    path: "/gas-water-heater",
    summary: "ガスの炎で、使うときに沸かす給湯器。本体が小さく、いまと同じ場所にそのまま取り替えやすい種類です。",
    energy: "ガス",
    kyutouShoeneTarget: false,
  },
  {
    id: "eco-jozu",
    name: "エコジョーズ",
    shortName: "エコジョーズ",
    path: "/eco-jozu",
    summary: "排気の熱も使ってお湯を沸かす、効率を高めたガス給湯器。運転中に出るドレン水の排水が必要です。",
    energy: "ガス",
    kyutouShoeneTarget: false,
  },
  {
    id: "ecocute",
    name: "エコキュート",
    shortName: "エコキュート",
    path: "/ecocute",
    summary: "空気の熱を使って電気でお湯を沸かし、タンクにためる給湯機。タンクとヒートポンプの置き場所が要ります。",
    energy: "電気",
    kyutouShoeneTarget: true,
  },
  {
    id: "hybrid",
    name: "ハイブリッド給湯器",
    shortName: "ハイブリッド",
    path: "/hybrid",
    summary: "電気のヒートポンプとガスを組み合わせた給湯器。ふだんは電気で沸かしたお湯を使い、足りないときはガスで沸かします。",
    energy: "電気＋ガス",
    kyutouShoeneTarget: true,
  },
];

export function getCategory(id: CategoryId): Category {
  const c = categories.find((x) => x.id === id);
  if (!c) throw new Error(`種類が見つかりません: ${id}`);
  return c;
}

/** 設置方式の表示名（絞り込み用の大きな区分） */
export const installationLabels: Record<InstallationKey, string> = {
  wall: "屋外壁掛",
  floor: "屋外据置",
  "ps-door": "PS扉内設置",
  "ps-standard": "PS標準・アルコーブ設置",
  other: "そのほかの設置",
  ground: "屋外に据え置き（タンク）",
};

export const installationOrder: InstallationKey[] = ["wall", "floor", "ps-door", "ps-standard", "ground", "other"];

/** 機能の表示名 */
export const functionLabels: Record<FunctionKey, string> = {
  fullauto: "フルオート",
  auto: "オート",
  "hot-water-only": "給湯専用",
  "high-temp": "高温水供給式",
  heating: "給湯暖房",
};

export const functionOrder: FunctionKey[] = ["fullauto", "auto", "hot-water-only", "high-temp", "heating"];

export const housingLabels: Record<Housing, string> = {
  detached: "戸建て",
  apartment: "マンション",
};

/** 号数の選択肢（ガス給湯器） */
export const gouOptions = [16, 20, 24] as const;

/** 号数ごとの目安（リンナイの目安。家族の人数と、同時にお湯を使う場所）。/guide/capacity と同じ内容 */
export const gouGuide: Record<number, { people: string; places: string }> = {
  24: { people: "4人家族", places: "キッチン・洗面所・浴室など3か所程度" },
  20: { people: "2人家族", places: "2か所程度" },
  16: { people: "ひとり暮らし", places: "いずれか1か所" },
};
