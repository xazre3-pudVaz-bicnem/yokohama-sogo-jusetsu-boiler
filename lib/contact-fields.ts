/**
 * お見積もりフォームの項目名・表示名・選択肢・状態の型。
 * ブラウザ側（components/contact/EstimateForm.tsx）からも読み込むので、ここには検査用のライブラリやデータを import しない。
 * 入力値の検査は lib/contact.ts（サーバー側）にある。
 *
 * 必須は「お名前」「電話番号」の2つだけ。ほかは、分かる範囲で選んでもらう（選択肢に「分からない」を用意する）。
 */
export const ESTIMATE_FIELDS = [
  "name",
  "tel",
  "email",
  "area",
  "housing",
  "currentMaker",
  "currentModel",
  "currentInstall",
  "currentGou",
  "reason",
  "desiredType",
  "desiredProduct",
  "timing",
  "subsidy",
  "message",
  "productPage",
] as const;
export type EstimateField = (typeof ESTIMATE_FIELDS)[number];

export const estimateLabels: Record<EstimateField, string> = {
  name: "お名前",
  tel: "電話番号",
  email: "メールアドレス",
  area: "ご住所（工事をご希望の場所）",
  housing: "お住まいの種類",
  currentMaker: "いまの給湯器のメーカー",
  currentModel: "いまの給湯器の型番",
  currentInstall: "いまの設置場所",
  currentGou: "いまの号数・容量",
  reason: "交換を考えている理由",
  desiredType: "ご希望の給湯器の種類",
  desiredProduct: "気になっている機種",
  timing: "工事のご希望時期",
  subsidy: "補助金のご相談",
  message: "そのほかのご相談",
  productPage: "見ていた機種のページ",
};

/** 選択式の項目の選択肢（サーバー側の検査でも同じ一覧を使う） */
export const estimateOptions = {
  housing: ["戸建て", "マンション・集合住宅", "店舗・事務所など", "そのほか"],
  currentMaker: ["リンナイ", "ノーリツ", "パロマ", "パーパス", "長府製作所", "三菱電機", "パナソニック", "ダイキン", "コロナ", "日立", "東芝", "そのほか", "分からない"],
  currentInstall: [
    "屋外の壁に付いている",
    "屋外の地面・土間に置いてある",
    "マンションの玄関横の扉の中（パイプスペース）",
    "マンションの廊下・ベランダの壁",
    "浴室の中・浴室の外の壁（浴槽のすぐ横）",
    "屋内",
    "分からない",
  ],
  currentGou: ["16号", "20号", "24号", "タンク式（エコキュート・電気温水器）", "エネファーム", "分からない"],
  reason: ["お湯が出ない・故障した", "調子が悪い（温度が安定しない・音がする・エラーが出る）", "長く使っているので、早めに替えたい", "光熱費を下げたい", "リフォーム・入居に合わせて", "エネファームをやめたい", "そのほか"],
  desiredType: ["いまと同じ種類", "エコジョーズ", "エコキュート", "ハイブリッド給湯器", "相談して決めたい"],
  timing: ["できるだけ早く", "1か月以内", "3か月以内", "時期は決めていない"],
  subsidy: ["補助金を使えるか相談したい", "補助金は使わない", "分からない"],
} as const satisfies Partial<Record<EstimateField, readonly string[]>>;

export type EstimateSelectField = keyof typeof estimateOptions;

/** 写真の決まり（画面側とサーバー側で同じ値を使う） */
export const PHOTO_RULES = {
  /** 送れる枚数 */
  maxFiles: 4,
  /** 1枚の上限（バイト）。画面側で縮めたあとの大きさ */
  maxFileBytes: 1.5 * 1024 * 1024,
  /** 合計の上限（バイト）。Vercel の受け取れる上限（4.5MB）より小さくする */
  maxTotalBytes: 3.5 * 1024 * 1024,
  /** 画面側で縮めるときの、長い辺の上限（px） */
  maxEdge: 1600,
  /**
   * 選べる形式。HEIC（iPhone の写真の形式）は入れない：入れないと、選んだときに iPhone が JPEG に変えて渡す。
   * HEIC のまま受け取ると、画面側で縮める処理が、ブラウザによっては読めない（Android・Windows・古い iOS など）
   */
  accept: "image/jpeg,image/png,image/webp",
} as const;

export type EstimateState = {
  status: "idle" | "error" | "unavailable";
  /** 画面の上部に出すメッセージ */
  message?: string;
  errors?: Partial<Record<EstimateField | "photos", string>>;
  /** 入力し直しを防ぐため、検査に落ちたときは入力値を返す */
  values?: Partial<Record<EstimateField, string>>;
  /** 送信の回数（フォームを作り直して入力値を戻すための key に使う） */
  attempt: number;
};

export const initialEstimateState: EstimateState = { status: "idle", attempt: 0 };

/* ------------------------------------------------------------------ */
/* 写真でかんたん見積もり（/contact/photo）                             */
/* ------------------------------------------------------------------ */

/**
 * 写真でかんたん見積もりの項目。必須は「お名前」「電話番号」「工事の場所」と、型番のシールの写真（読めないときは全体の写真）。
 * 型番は、写真から読み取った値か、お客様が入れた値（どちらかは modelSource で区別する）。
 */
export const PHOTO_ESTIMATE_FIELDS = [
  "name",
  "tel",
  "email",
  "area",
  "housing",
  "condition",
  "gasType",
  "currentModel",
  "currentMaker",
  "manufactured",
  "desiredType",
  "desiredProduct",
  "contactPref",
  "message",
  "productPage",
] as const;
export type PhotoEstimateField = (typeof PHOTO_ESTIMATE_FIELDS)[number];

export const photoEstimateLabels: Record<PhotoEstimateField, string> = {
  name: "お名前",
  tel: "電話番号",
  email: "メールアドレス",
  area: "工事をご希望の場所",
  housing: "お住まいの種類",
  condition: "いまの給湯器の状態",
  gasType: "ガスの種類",
  currentModel: "いまの給湯器の型番",
  currentMaker: "いまの給湯器のメーカー",
  manufactured: "製造年月（シールの表記）",
  desiredType: "ご希望の給湯器の種類",
  desiredProduct: "気になっている機種",
  contactPref: "ご連絡の方法",
  message: "そのほかのご要望",
  productPage: "見ていた機種のページ",
};

export const photoEstimateOptions = {
  housing: estimateOptions.housing,
  condition: ["使えない（お湯が出ない・エラーで止まる）", "調子が悪い（ときどき使えない・温度が安定しない）", "使えている（早めに替えたい）"],
  gasType: ["都市ガス", "LPガス（プロパン）", "分からない"],
  currentMaker: estimateOptions.currentMaker,
  desiredType: estimateOptions.desiredType,
  contactPref: ["電話", "メール", "どちらでも"],
} as const satisfies Partial<Record<PhotoEstimateField, readonly string[]>>;

export type PhotoEstimateSelectField = keyof typeof photoEstimateOptions;

/** 写真の欄。送るときのファイル名の頭にも使う */
export const PHOTO_SLOTS = [
  { id: "label", file: "1-kataban", title: "型番のシール", max: 1 },
  { id: "whole", file: "2-zentai", title: "給湯器の全体", max: 1 },
  { id: "extra", file: "3-sonota", title: "そのほか（リモコン・配管・まわり）", max: 3 },
] as const;
export type PhotoSlotId = (typeof PHOTO_SLOTS)[number]["id"];

/** 写真でかんたん見積もりの、写真の決まり（合計の上限は、受け取れる上限 4MB より小さくする） */
export const PHOTO_ESTIMATE_RULES = {
  maxFiles: PHOTO_SLOTS.reduce((n, s) => n + s.max, 0),
  maxFileBytes: PHOTO_RULES.maxFileBytes,
  maxTotalBytes: 3.5 * 1024 * 1024,
  maxEdge: PHOTO_RULES.maxEdge,
  accept: PHOTO_RULES.accept,
} as const;

export type PhotoEstimateState = {
  status: "idle" | "error" | "unavailable";
  message?: string;
  errors?: Partial<Record<PhotoEstimateField | "photos", string>>;
  values?: Partial<Record<PhotoEstimateField, string>>;
  attempt: number;
};

export const initialPhotoEstimateState: PhotoEstimateState = { status: "idle", attempt: 0 };

/** 写真から型番を読み取った結果（画面に出して、お客様に確かめてもらう） */
export type LabelReadResult =
  | {
      ok: true;
      /** 読み取れた型番（読めなかったら null） */
      modelNumber: string | null;
      /** 選択肢（photoEstimateOptions.currentMaker）のどれか。読めなかったら null */
      maker: string | null;
      /** シールに書かれた製造年月（例：2012年8月）。読めなかったら null */
      manufactured: string | null;
      confidence: "high" | "medium" | "low";
    }
  | { ok: false; message: string };
