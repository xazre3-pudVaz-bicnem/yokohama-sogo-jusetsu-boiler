import type { FigureKind } from "@/components/diagram/TypeFigure";
import type { ImageKey } from "@/lib/images";

/**
 * 給湯器コラムのカテゴリ（= 記事のジャンル。依頼書の「記事ジャンル」1〜20 と1対1）。
 *
 * 記事は必ずどれか1つのカテゴリに属し、そのカテゴリの「親ページ」（固定ページ）へ本文からリンクする。
 * カテゴリの一覧ページは、親ページへの入口を必ず置く。これで
 *   固定ページ（選び方・故障・補助金・地域・種類） ⇄ コラム ⇄ 機種のページ
 * がつながる（トピッククラスター）。
 *
 * - カテゴリのページは「name ＋ コラム」を検索語として担当する。name は、固定ページの検索語と同じ語にしない。
 * - 記事の冒頭の図は、写真ではなく、コードで描いた図（設置の形の模式図）か、イラストだけを使う。
 *   給湯器の施工写真はまだ無い。ほかの工事（トイレ・キッチン・塗装など）の写真は使わない。
 * - このファイルはクライアント側からも読めるよう、fs を使わない。
 */

/** 図の種類（components/diagram/TypeFigure.tsx の FigureKind と同じ並び。frontmatter の figure で選べる） */
export const FIGURE_KINDS = ["wall", "floor", "ps-door", "ps-standard", "ecocute", "hybrid", "other"] as const satisfies readonly FigureKind[];

export type ClusterCover = { type: "figure"; kind: FigureKind } | { type: "illust"; image: ImageKey };

export type BlogCluster = {
  id: string;
  /** 依頼書の記事ジャンルの番号（1〜20） */
  genre: number;
  /** 画面に出す名前（カテゴリのチップ・パンくず） */
  name: string;
  /** カテゴリページの説明 */
  description: string;
  /** 親ページ（このカテゴリの記事が必ず本文からリンクする固定ページ） */
  pillar: { href: string; label: string };
  /** 記事の冒頭と一覧に出す絵（記事の frontmatter の figure で上書きできる） */
  cover: ClusterCover;
};

const fig = (kind: FigureKind): ClusterCover => ({ type: "figure", kind });
const ill = (image: ImageKey): ClusterCover => ({ type: "illust", image });

export const blogClusters = [
  {
    id: "replacement-timing",
    genre: 1,
    name: "交換時期",
    description: "給湯器を替える時期の考え方を、メーカーが示す標準使用期間や点検のお知らせ、暮らしの変わり目から整理します。",
    pillar: { href: "/guide/timing", label: "給湯器の交換時期の目安" },
    cover: fig("wall"),
  },
  {
    id: "symptoms",
    genre: 2,
    name: "故障のサイン",
    description: "煙・におい・お湯の出方など、給湯器のいつもと違う様子が、使い続けてよいものか、点検が要るものかを見分けます。",
    pillar: { href: "/trouble", label: "給湯器の故障・トラブル" },
    cover: ill("illust/people-woman-think"),
  },
  {
    id: "makers",
    genre: 3,
    name: "メーカー比較",
    description: "リンナイ・ノーリツ・パロマ、エコキュートの各社の違いを、機能の呼び方と、このサイトに載せている型番で比べます。",
    pillar: { href: "/products", label: "給湯器の商品一覧" },
    cover: ill("illust/people-couple-think"),
  },
  {
    id: "capacity",
    genre: 4,
    name: "号数の選び方",
    description: "家の間取りや住まい方ごとに、ガス給湯器の号数と、エコキュート・ハイブリッドの容量の考え方をまとめます。",
    pillar: { href: "/guide/capacity", label: "給湯器の号数の選び方" },
    cover: fig("wall"),
  },
  {
    id: "auto-fullauto",
    genre: 5,
    name: "ふろの機能",
    description: "給湯専用・オート・フルオート、給湯暖房など、おふろと暖房の機能の違いと、替えるときの確認点です。",
    pillar: { href: "/guide/auto-fullauto", label: "オートとフルオートの違い" },
    cover: ill("illust/people-family"),
  },
  {
    id: "eco-jozu",
    genre: 6,
    name: "エコジョーズ",
    description: "排気の熱を使うガス給湯器エコジョーズの利点と、向かない場所、カタログの数字の見方をまとめます。",
    pillar: { href: "/eco-jozu", label: "エコジョーズの交換" },
    cover: fig("wall"),
  },
  {
    id: "vs-ecocute",
    genre: 7,
    name: "エコキュートとの違い",
    description: "ガス給湯器とエコキュートの違い、タンクの容量や置き場所など、エコキュートを選ぶ前に比べておきたいことです。",
    pillar: { href: "/ecocute", label: "エコキュートの交換" },
    cover: fig("ecocute"),
  },
  {
    id: "hybrid",
    genre: 8,
    name: "ハイブリッド給湯器",
    description: "電気とガスを組み合わせるハイブリッド給湯器の働き方を、停電のとき・お湯が足りないとき・電源工事など場面ごとに見ていきます。",
    pillar: { href: "/hybrid", label: "ハイブリッド給湯器" },
    cover: fig("hybrid"),
  },
  {
    id: "kyutou-shoene",
    genre: 9,
    name: "給湯省エネ2026",
    description: "国の給湯省エネ2026事業の細かな決まり（台数・撤去加算・補助を受けたあと）を、公式情報と確認日つきで説明します。",
    pillar: { href: "/subsidy/kyutou-shoene-2026", label: "給湯省エネ2026事業の補助額・対象・条件" },
    cover: ill("illust/people-couple-clipboard"),
  },
  {
    id: "eco-one-subsidy",
    genre: 10,
    name: "ECO ONEと補助金",
    description: "リンナイのECO ONE（エコワン）を国の補助を使って入れるときの、機種ごとの扱いと段取りです。",
    pillar: { href: "/subsidy/eco-one", label: "ECO ONE（エコワン）の補助金" },
    cover: fig("hybrid"),
  },
  {
    id: "yokohama",
    genre: 11,
    name: "横浜市の住まい",
    description: "団地・坂の多い住宅地・海に近い地域など、横浜市の住まいの特徴と、給湯器の交換で確かめることです。",
    pillar: { href: "/area/yokohama", label: "横浜市の給湯器交換" },
    cover: ill("illust/people-staff-point"),
  },
  {
    id: "totsuka",
    genre: 12,
    name: "戸塚区の住まい",
    description: "谷戸と丘陵の地形、駅の周りのマンションなど、戸塚区の住まいならではの給湯器の交換の確認点です。",
    pillar: { href: "/area/totsuka", label: "戸塚区の給湯器交換" },
    cover: ill("illust/people-staff-ok"),
  },
  {
    id: "apartment",
    genre: 13,
    name: "マンションの交換",
    description: "高層階・分譲と賃貸の違いなど、マンションの給湯器を替えるときに、先に確かめておくことです。",
    pillar: { href: "/guide/apartment", label: "マンションの給湯器交換" },
    cover: fig("ps-door"),
  },
  {
    id: "ene-farm",
    genre: 14,
    name: "エネファームから",
    description: "エネファームから別の給湯器に替えるとき、床暖房や浴室暖房乾燥機をどうするかなど、替える先の選び方です。",
    pillar: { href: "/ene-farm", label: "エネファームからの交換" },
    cover: fig("other"),
  },
  {
    id: "installation",
    genre: 15,
    name: "工事の注意点",
    description: "排気の向き・ガスの種類・リモコン・基礎など、交換工事で確かめることと、その理由です。",
    pillar: { href: "/flow", label: "交換工事の流れ" },
    cover: ill("illust/people-staff-point-2"),
  },
  {
    id: "error-codes",
    genre: 16,
    name: "エラー表示",
    description: "リモコンに出る番号のうち、問い合わせの多いものを1つずつ、メーカーの説明にもとづいて説明します。",
    pillar: { href: "/trouble/error-codes", label: "給湯器のエラーコードの調べ方" },
    cover: ill("illust/pose-think"),
  },
  {
    id: "seasonal",
    genre: 17,
    name: "季節のトラブル",
    description: "冬の凍結や雪、夏の熱すぎるお湯、台風のあとなど、季節によって起きやすい給湯器のトラブルと備えです。",
    pillar: { href: "/trouble", label: "給湯器の故障・トラブル" },
    cover: ill("illust/people-couple-talk"),
  },
  {
    id: "energy-cost",
    genre: 18,
    name: "光熱費と省エネ",
    description: "効率の数字の見方や、使い方の工夫など、給湯にかかる光熱費の考え方です。節約額を決めつけず、根拠のある範囲で書きます。",
    pillar: { href: "/guide", label: "給湯器の選び方" },
    cover: ill("illust/pose-calc"),
  },
  {
    id: "model-guide",
    genre: 19,
    name: "型番から選ぶ",
    description: "このサイトに載せている機種の型番どうしの違いを、メーカーの公式情報で確かめて比べます。",
    pillar: { href: "/guide/model-label", label: "給湯器の型番の調べ方" },
    cover: ill("illust/pose-chart"),
  },
  {
    id: "maintenance",
    genre: 20,
    name: "お手入れと点検",
    description: "フィルターの掃除、配管の保温材、メーカーの点検など、給湯器を長く安全に使うための手入れです。",
    pillar: { href: "/guide/timing", label: "給湯器の交換時期の目安" },
    cover: ill("illust/pose-ok"),
  },
] as const satisfies readonly BlogCluster[];

export type BlogClusterId = (typeof blogClusters)[number]["id"];

export function getCluster(id: string): BlogCluster | undefined {
  return blogClusters.find((c) => c.id === id);
}

export const blogClusterIds = blogClusters.map((c) => c.id) as [BlogClusterId, ...BlogClusterId[]];
