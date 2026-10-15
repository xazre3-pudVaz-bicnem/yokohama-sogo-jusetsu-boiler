/**
 * 商品カタログのデータの型。
 *
 * 守ること
 * - 載せるのは、メーカーの公式サイト・公式カタログで、型番と仕様を確かめた現行品だけ。架空の製品・型番を作らない。
 * - 型番（modelNumber）は、公式の表記を一字一句そのまま書く。型番の違う製品の仕様を混ぜない。
 * - 公式で確認できなかった項目は書かない（specifications に行を足さない・null のままにする）。
 * - 当社の販売価格・工事費（salesPrice など）は、会社から金額を受け取るまで null。null のあいだは、画面では「お見積もり」と出る。
 *   ほかの販売店の価格を入れないこと。
 * - 製品写真（images）は、メーカーから掲載の許諾を得たものだけ。許諾の確認が済むまでは空にし、
 *   imageLicenseStatus を "pending" のままにする（画面には、設置タイプの図が出る）。
 * - 補助金の対象かどうか（subsidy）は、国の「補助対象製品の検索」で確かめた結果と、その日付を書く。
 */

export type BrandId = "rinnai" | "noritz" | "paloma" | "mitsubishi" | "panasonic" | "daikin" | "corona";

/** 給湯器の種類。gas＝従来型のガス給湯器、eco-jozu＝エコジョーズ（潜熱回収型） */
export type CategoryId = "gas" | "eco-jozu" | "ecocute" | "hybrid";

/** 設置方式（絞り込みに使う区分）。公式の表記は installationType.label に持つ */
export type InstallationKey =
  | "wall" // 屋外壁掛
  | "floor" // 屋外据置
  | "ps-door" // PS扉内設置（マンションのパイプスペース。扉の内側）
  | "ps-standard" // PS標準設置・PSアルコーブ設置（パイプスペース。扉なし）
  | "other" // 壁貫通・屋内など
  | "ground"; // 地面・土間に据える（エコキュート・ハイブリッドのタンク）

/** 機能の区分 */
export type FunctionKey =
  | "fullauto" // フルオート
  | "auto" // オート
  | "hot-water-only" // 給湯専用
  | "high-temp" // 高温水供給式
  | "heating"; // 給湯暖房（床暖房・浴室暖房乾燥機につなぐ熱源機）

export type Housing = "detached" | "apartment";

export type SpecRow = { label: string; value: string };

/** メーカー希望小売価格（公式に載っているものだけ） */
export type ManufacturerPrice = {
  /** 金額（円） */
  amount: number;
  tax: "included" | "excluded";
  /** 何の価格か（例：本体のみ。リモコン・工事費は別） */
  includes: string;
  /** 価格の時点（公式に書かれていれば） */
  asOf?: string;
  sourceUrl: string;
};

/** 製品写真の出どころ（公式サイトのどの画像か）。掲載の許諾とは別に、型番との対応を記録する */
export type ImageSource = {
  /** 公式サイトの画像の URL */
  url: string;
  /** その画像が載っている公式ページ */
  pageUrl: string;
  /** その型番そのものの写真か、シリーズ代表の写真か */
  match: "exact-model" | "series-representative" | "unknown";
  /** 画像と型番の対応を確かめた日 */
  checkedAt: string;
  note?: string;
};

/**
 * 画像の掲載許諾の状態。
 *   pending       … 未確認（メーカーに確認中・これから確認）。写真は出さない
 *   permitted     … 許諾あり（images に入れた写真を出す）
 *   not-permitted … 許諾が得られなかった（写真は出さない）
 */
export type ImageLicenseStatus = "pending" | "permitted" | "not-permitted";

/**
 * 給湯省エネ2026事業の対象かどうか。
 *   eligible   … 国の対象製品リストに登録されている（基本額）
 *   bonus      … 登録されていて、性能加算の要件にも適合する
 *   not-target … 制度の対象機器ではない（従来型のガス給湯器・エコジョーズ）
 *   not-listed … 対象機器の種類だが、リストで登録を確認できなかった
 *   unverified … まだ確かめていない
 */
export type SubsidyEligibility = "eligible" | "bonus" | "not-target" | "not-listed" | "unverified";

export type ProductImage = { src: string; alt: string; width: number; height: number };

export type Product = {
  /** 一意の ID（brand と slug をつないだもの） */
  id: string;
  /** URL の末尾（/products/<brand>/<slug>）。型番を小文字にし、記号を - に置き換えたもの。公開後は変えない */
  slug: string;
  brand: BrandId;
  category: CategoryId;
  /** 公式のシリーズ名 */
  series: string;
  /** 公式の製品名 */
  name: string;
  /** 正式な型番 */
  modelNumber: string;
  /** システムを構成するユニットの型番（エコキュート・ハイブリッド） */
  units?: { label: string; model: string }[];
  installationType: { key: InstallationKey; label: string };
  housing: Housing[];
  capacity: {
    /** 号数（ガス給湯器・ハイブリッドの補助熱源） */
    gou: number | null;
    /** タンクの容量（L） */
    tankLiters: number | null;
    /** 家族の人数の目安（メーカーの表記） */
    familySize?: string;
  };
  functions: { key: FunctionKey; label: string };
  /** 温水暖房（床暖房・浴室暖房乾燥機）につなげる機種 */
  heating?: boolean;
  /** 対応するガスの種類（公式の表記） */
  gasTypes?: string[];
  /** 仕様（公式で確認できた項目だけ） */
  specifications: SpecRow[];
  /** 対応するリモコン（公式で確認できたもの） */
  remotes: { model: string; note?: string }[];
  /** 特徴（公式ページにある内容を、短く言い換えたもの） */
  features: string[];
  /** その機種に固有の注意点（公式にあるもの）。設置方式・種類に共通の注意点は lib/product-notes.ts が足す */
  cautions?: string[];

  /** 掲載の許諾を得た製品写真（public/images/products/<brand>/ に置いたもの）。許諾の確認が済むまでは空 */
  images: ProductImage[];
  imageSource: ImageSource | null;
  imageLicenseStatus: ImageLicenseStatus;

  /** メーカーの公式ページ（製品またはシリーズ） */
  manufacturerUrl: string;
  manufacturerPrice: ManufacturerPrice | null;

  /** 当社の販売価格（本体）。未設定は null（画面では「お見積もり」） */
  salesPrice: number | null;
  /** リモコンの価格。未設定は null */
  remotePrice: number | null;
  /** 標準工事費。未設定は null */
  installationPrice: number | null;
  /** 既存の機器の撤去・処分費。未設定は null */
  disposalPrice: number | null;
  /** 上の4つの金額が、税込か税抜か */
  taxStatus: "included" | "excluded";

  subsidyEligibility: SubsidyEligibility;
  subsidyProgram: "kyutou-shoene-2026" | null;
  /** 補助額（基本額＋性能加算。円）。対象外・未確認は null */
  subsidyAmount: number | null;
  /** 国のリストに載っている型番の文字列（カタログの型番と違うことがある） */
  subsidyListedModel?: string;
  /** 補助金についての補足（追加部品の条件など） */
  subsidyNote?: string;
  /** 国のリストで確かめた日 */
  subsidyVerifiedAt: string | null;

  /** 公式ページで型番と仕様を確かめた日 */
  dataVerifiedAt: string;
  /** 販売の状態（公式の表記にもとづく） */
  availableStatus: "current" | "discontinued" | "unknown";
  /** このデータを最後に直した日 */
  lastUpdatedAt: string;
  /** 根拠にした公式ページ・資料の URL */
  sources: string[];
};

export type Brand = {
  id: BrandId;
  /** 画面に出す名前 */
  name: string;
  /** 英字の表記 */
  nameEn: string;
  /** 正式な社名 */
  company: string;
  /** 公式サイト（給湯器のページ） */
  url: string;
  /** メーカー別ページの説明（公式で確認できる範囲の、事実だけ） */
  summary: string;
  /** 扱う種類 */
  categories: CategoryId[];
  /** 公式サイトの画像の利用条件について、確認できたこと */
  imagePolicy: { status: ImageLicenseStatus; note: string; termsUrl: string; checkedAt: string };
};
