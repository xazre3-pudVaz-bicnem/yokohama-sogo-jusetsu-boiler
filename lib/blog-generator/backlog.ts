import type { BlogClusterId } from "@/lib/blog-clusters";
import type { TopicPriority } from "@/lib/blog-generator/topics";

/**
 * 給湯器コラムの題材の候補（まだ「すぐには書かない」検索意図の一覧）。自動投稿は、ここからは選ばない。
 *
 * どれも、記事にするには先に確かめることがある（needs）。確かめた事実を docs/VERIFIED_FACTS.md に出典つきで足し、
 * 書く内容（angle）と使う節（facts）を決めてから、topics.ts に「題材」として上げる。
 *
 * 決まり
 *   - 1候補 ＝ 1検索意図 ＝ 1主キーワード。固定ページ・公開済みの記事・題材・ほかの候補と同じ検索語にしない
 *   - 固定ページ（選び方・故障・補助金・地域・種類）と同じ検索意図のものは、候補にしない。そのページを直す
 */
export type Candidate = {
  cluster: BlogClusterId;
  priority: TopicPriority;
  /** 主キーワード */
  keyword: string;
  /** 答える検索意図 */
  intent: string;
  /** 記事にする前に要るもの */
  needs: string;
};

const MAKER = "メーカーの公式情報で確かめ、事実シートに足す";
const OFFICIAL = "国・自治体の公式ページで確かめ、事実シートに足す";
const COMPANY = "会社への確認（対応の可否・実際の進め方）";
const PHOTO = "当社の給湯器の施工写真と、現場の記録（掲載の了承つき）";

const c = (cluster: BlogClusterId, priority: TopicPriority, keyword: string, intent: string, needs: string): Candidate => ({ cluster, priority, keyword, intent, needs });

export const backlog: Candidate[] = [
  c("replacement-timing", "P1", "エコキュート 交換時期 目安", "エコキュートの交換を考える時期の目安を知りたい", MAKER),
  c("replacement-timing", "P2", "ハイブリッド給湯器 寿命", "ハイブリッド給湯器を何年くらい使えるのか知りたい", MAKER),
  c("symptoms", "P1", "エコキュート お湯が出ない 確認", "エコキュートでお湯が出ないときに最初に確かめることを知りたい", MAKER),
  c("symptoms", "P2", "給湯器 リモコン 時計 ずれる", "停電のあとにリモコンの表示や設定がどうなるか知りたい", MAKER),
  c("makers", "P1", "エコキュート 2027年モデル", "翌年度のエコキュートの新しい機種を知りたい", `${MAKER}（発表されてから）`),
  c("capacity", "P2", "給湯器 28号", "28号のガス給湯器が要る家を知りたい", `${MAKER}（28号の機種を掲載してから）`),
  c("auto-fullauto", "P2", "エコキュート フルオート オート 違い", "エコキュートのフルオートとオートの違いを知りたい", MAKER),
  c("eco-jozu", "P2", "エコジョーズ ドレン 雨水ます つなぎ方", "エコジョーズのドレン水を雨水ますへつなぐ工事の内容を知りたい", COMPANY),
  c("vs-ecocute", "P1", "エコキュート 電気料金プラン 夜間", "エコキュートを入れるときの電気の契約の考え方を知りたい", OFFICIAL),
  c("vs-ecocute", "P2", "エコキュート 入浴剤 使える", "エコキュートで入浴剤が使えるかを知りたい", MAKER),
  c("hybrid", "P1", "ハイブリッド給湯器 運転音", "ハイブリッド給湯器のヒートポンプの運転音と置き場所の考え方を知りたい", MAKER),
  c("hybrid", "P2", "ハイブリッド給湯器 メンテナンス", "ハイブリッド給湯器の点検や手入れを知りたい", MAKER),
  c("kyutou-shoene", "P1", "給湯省エネ 2027 来年度", "翌年度の給湯器の補助の発表を知りたい", `${OFFICIAL}（発表されてから）`),
  c("kyutou-shoene", "P2", "給湯省エネ 補助金 振込 いつ", "補助金がいつ還元されるかを知りたい", OFFICIAL),
  c("eco-one-subsidy", "P2", "ECO ONE 交換 古い機種 型番", "古いECO ONEの型番から、替える先の機種を知りたい", MAKER),
  c("yokohama", "P2", "横浜市 粗大ごみ 給湯器 処分", "古い給湯器を自分で処分する方法を知りたい", OFFICIAL),
  c("totsuka", "P1", "戸塚区 給湯器 交換 事例", "戸塚区で給湯器を交換した例を見たい", PHOTO),
  c("totsuka", "P2", "戸塚区 団地 バランス釜 交換", "戸塚区の団地でバランス釜を替えた例を知りたい", PHOTO),
  c("apartment", "P1", "マンション 給湯器 交換 時間 当日", "マンションの給湯器交換で、当日お湯が使えない時間の目安を知りたい", COMPANY),
  c("apartment", "P2", "マンション バランス釜 壁貫通 交換 費用", "バランス釜から壁貫通の給湯器に替える工事の内容を知りたい", `${COMPANY}・${MAKER}`),
  c("ene-farm", "P1", "エネファーム 発電 止まる 年数", "エネファームの発電が止まる時期をメーカーごとに知りたい", MAKER),
  c("ene-farm", "P2", "エネファーム 撤去 ガス 契約 変更", "エネファームをやめるときのガスの契約の手続きを知りたい", OFFICIAL),
  c("installation", "P1", "給湯器 交換 工事 時間", "給湯器の交換にかかる時間の目安を知りたい", COMPANY),
  c("installation", "P2", "給湯器 据置 壁掛 変更 工事", "据置の給湯器を壁掛に替える工事の内容を知りたい", COMPANY),
  c("error-codes", "P1", "エコキュート エラー H", "エコキュートのエラー表示の調べ方を知りたい", MAKER),
  c("seasonal", "P2", "給湯器 梅雨 湿気 点火しない", "梅雨どきに給湯器が点火しにくいときの対処を知りたい", MAKER),
  c("energy-cost", "P1", "エコキュート 電気代 計算", "エコキュートの電気代の考え方を知りたい", `${OFFICIAL}（料金の単価と試算の条件を出典つきで）`),
  c("model-guide", "P2", "CHP-37AZ2 CHP-E37AZ2 違い", "コロナのエコキュートの2つの機種の違いを知りたい", "メーカーの公式情報で、違いの項目を確かめる"),
  c("maintenance", "P2", "エコキュート タンク 水抜き 掃除", "エコキュートのタンクの水抜きの方法を知りたい", MAKER),
];

/** カテゴリごとの候補の数 */
export function backlogCounts(): Map<BlogClusterId, number> {
  const out = new Map<BlogClusterId, number>();
  for (const x of backlog) out.set(x.cluster, (out.get(x.cluster) ?? 0) + 1);
  return out;
}
