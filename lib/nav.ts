import { categories } from "@/data/categories";
import { works } from "@/data/works";

/**
 * メニュー（ヘッダー・スマホのメニュー・フッター）の定義。ページを増やしたら、ここに足す。
 * このファイルはクライアントコンポーネントからも読み込まれるので、fs などサーバー専用のモジュールや、
 * 商品データ（data/products）を import しないこと（ブラウザ側のバンドルが大きくなる）。
 */
/** short … PC のヘッダーで、画面の幅が狭いとき（1280px 未満）に使う短い名前 */
/** short：1024〜1279px のヘッダーで使う短い名前。long：1536px 以上のヘッダーとスマホのメニューで使う長い名前 */
export type NavLink = { href: string; label: string; note?: string; short?: string; long?: string };
export type NavGroup = { id: string; name: string; links: NavLink[] };

/** 施工事例は、事例を1件以上載せてから、メニューに出す（準備中のページへ、全ページから案内しない） */
const worksNav: NavLink[] = works.length ? [{ href: "/works", label: "施工事例" }] : [];

/** メーカー別のページ（data/brands.ts の並びと合わせる） */
export const brandNav: NavGroup[] = [
  {
    id: "gas",
    name: "ガス給湯器・ハイブリッド",
    links: [
      { href: "/products/rinnai", label: "リンナイ" },
      { href: "/products/noritz", label: "ノーリツ" },
      { href: "/products/paloma", label: "パロマ" },
    ],
  },
  {
    id: "ecocute",
    name: "エコキュート",
    links: [
      { href: "/products/mitsubishi", label: "三菱電機" },
      { href: "/products/panasonic", label: "パナソニック" },
      { href: "/products/daikin", label: "ダイキン" },
      { href: "/products/corona", label: "コロナ" },
    ],
  },
];

/** 種類別のページ */
export const categoryNav: NavLink[] = [
  ...categories.map((c) => ({ href: c.path, label: c.shortName })),
  { href: "/ene-farm", label: "エネファームからの交換" },
];

/** 設置方式から探す（商品一覧の絞り込みへ） */
export const installNav: NavLink[] = [
  { href: "/products?install=wall", label: "屋外壁掛" },
  { href: "/products?install=floor", label: "屋外据置" },
  { href: "/products?install=ps-door", label: "PS扉内設置（マンション）" },
  { href: "/products?install=ps-standard", label: "PS標準設置・アルコーブ" },
  { href: "/products?install=ground", label: "タンク式（エコキュート・ハイブリッド）" },
];

/** 条件から探す（商品一覧の絞り込みへ） */
export const finderNav: NavLink[] = [
  { href: "/products?gou=24", label: "24号" },
  { href: "/products?gou=20", label: "20号" },
  { href: "/products?gou=16", label: "16号" },
  { href: "/products?housing=apartment", label: "マンション向け" },
  { href: "/products?subsidy=1", label: "補助金の対象機種" },
];

/**
 * ヘッダーの主メニュー（PC の下段・スマホのメニュー）。
 * 「給湯器を探す」「メーカーから探す」は、PC ではホバー・フォーカスで一覧が開く（components/layout/Header.tsx）。
 */
export const mainNav: NavLink[] = [
  { href: "/products", label: "給湯器を探す" },
  { href: "/products#makers", label: "メーカーから探す", short: "メーカー" },
  { href: "/ecocute", label: "エコキュート" },
  { href: "/hybrid", label: "ハイブリッド給湯器", short: "ハイブリッド" },
  { href: "/guide/cost", label: "交換費用", long: "給湯器の交換費用" },
  { href: "/subsidy", label: "補助金", long: "補助金情報" },
  { href: "/area", label: "対応エリア" },
];

/** スマホのメニューで、主メニューに続けて出すページ */
export const guideNav: NavLink[] = [
  { href: "/guide", label: "給湯器の選び方" },
  { href: "/trouble", label: "故障・トラブル" },
  { href: "/compare", label: "機種を比較する" },
];

/** ヘッダー上段の補助メニュー（PC・1280px 以上） */
export const subNav: NavLink[] = [
  { href: "/flow", label: "交換工事の流れ" },
  ...worksNav,
  { href: "/faq", label: "よくある質問" },
  { href: "/blog", label: "コラム" },
  { href: "/company", label: "運営会社" },
];

/** 補助金のページ（メニュー・フッター用。本文は data/subsidy/pages.ts） */
export const subsidyNav: NavLink[] = [
  { href: "/subsidy/kyutou-shoene-2026", label: "給湯省エネ2026事業の全体像" },
  { href: "/subsidy/hybrid", label: "ハイブリッド給湯器の補助金" },
  { href: "/subsidy/ecocute", label: "エコキュートの補助金" },
  { href: "/subsidy/eco-one", label: "ECO ONE の補助金" },
  { href: "/subsidy/yokohama", label: "横浜市で使える制度" },
  { href: "/subsidy/eligible-models", label: "対象機種の確かめ方" },
];

/** フッターの「サイトの案内」 */
export const footerNav: NavLink[] = [
  { href: "/flow", label: "交換工事の流れ" },
  ...worksNav,
  { href: "/faq", label: "よくある質問" },
  { href: "/blog", label: "給湯器コラム" },
  { href: "/company", label: "運営会社" },
  { href: "/contact/photo", label: "写真でかんたん見積もり" },
  { href: "/contact", label: "無料見積もり・お問い合わせ" },
  { href: "/privacy", label: "プライバシーポリシー" },
];

/** フッターの「選び方・トラブル」 */
export const footerGuideNav: NavLink[] = [
  { href: "/guide", label: "給湯器の選び方" },
  { href: "/guide/cost", label: "交換費用の考え方" },
  { href: "/guide/capacity", label: "号数の選び方" },
  { href: "/guide/installation-types", label: "設置方式の見分け方" },
  { href: "/trouble", label: "故障・トラブル" },
  { href: "/compare", label: "機種を比較する" },
];

/** フッターの「対応エリア」（区のページは data/areas.ts から足す） */
export const footerAreaNav: NavLink[] = [
  { href: "/area", label: "対応エリア" },
  { href: "/area/yokohama", label: "横浜市" },
  { href: "/area/totsuka", label: "横浜市戸塚区" },
];
