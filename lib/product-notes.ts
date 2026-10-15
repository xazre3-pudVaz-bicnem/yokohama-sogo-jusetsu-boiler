import type { Product } from "@/data/products/types";

/**
 * 機種のページの「よいところ」「注意すること」「取り付けに必要な条件」を、種類・設置方式・機能から組み立てる。
 *
 * ここに書くのは、種類や設置方式に共通する、確かな一般論だけ（出典は docs/VERIFIED_FACTS.md の
 * 「エコジョーズのドレン排水」「エコキュートの設置」「設備の一般的な知識」の節）。
 * 機種に固有のよいところは、商品データの features（メーカーの公式の説明）に、固有の注意は cautions に書く。
 * 燃料費の節約の金額・割合のような数字は、ここに書かない（家庭ごとに変わり、根拠を示せないため）。
 */
export type ProductNotes = { merits: string[]; cautions: string[]; requirements: string[] };

/** 注意の話題（メーカーの説明に同じ話題があれば、ここで組み立てる一般論のほうは出さない） */
const CAUTION_TOPICS = [/ドレン/, /運転音|運転の音|騒音/, /中和器/];

export function productNotes(p: Product): ProductNotes {
  const merits: string[] = [];
  const cautions: string[] = [];
  const requirements: string[] = [];

  /* 種類 */
  switch (p.category) {
    case "eco-jozu":
      merits.push("排気の熱を二次熱交換器で回収して、お湯をつくるのに使う、効率を高めたガス給湯器です。");
      cautions.push("運転中にドレン水（酸性の水。本体の中和器で中和して流す）が出るため、排水の配管が必要です。流し先が取れない場所では、設置できないことがあります。");
      cautions.push("中和器は、使っているうちに交換が必要になる消耗品です。");
      requirements.push("ドレン水の流し先（横浜市では、汚水の系統が原則。日本ガス機器検査協会の認証を受けた機器は、雨水の系統へ流すことも認められています）");
      break;
    case "gas":
      merits.push("ドレン水の排水が要らないので、いまの給湯器と同じ場所に、配管をつなぎ替えるだけで取り替えやすい種類です。");
      cautions.push("排気の熱を回収する仕組みが無いため、エコジョーズより熱効率は低くなります。エコジョーズに替えられる場所かどうかも、あわせて確かめます。");
      break;
    case "ecocute":
      merits.push("空気の熱を集めて、電気でお湯を沸かし、タンクにためておく給湯機です。");
      cautions.push("沸かしてためたお湯を使う仕組みなので、タンクの湯量を超えてたくさん使うと、沸き上がるまでお湯が足りなくなることがあります。家族の人数と使い方に合う容量を選びます。");
      cautions.push("ヒートポンプユニットは夜間にも運転するため、運転の音が隣の家の寝室などに向かない場所に置きます。");
      requirements.push("貯湯タンクとヒートポンプユニットの両方を置ける場所");
      requirements.push("タンクを載せるしっかりした基礎（満水のときは、タンクだけで400kgを超える機種が多くあります）");
      requirements.push("単相200Vの電源と、専用のブレーカー（分電盤の容量の変更や配線の工事が必要になることがあります）");
      requirements.push("タンクの膨張水と、ヒートポンプの結露水を流す排水");
      requirements.push("タンクを運び込める経路（門・通路の幅、段差、曲がり角）");
      requirements.push("ガス給湯器から替える場合は、ガスの配管の撤去と、ガス会社への連絡");
      break;
    case "hybrid":
      merits.push("ふだんは、電気のヒートポンプで沸かしてタンクにためたお湯を使い、足りないときはガスで沸かす、2つの熱源を組み合わせた給湯器です。");
      merits.push("タンクのお湯を使い切っても、ガスで沸かせるので、お湯切れを起こしにくい組み合わせです。");
      cautions.push("ヒートポンプ・タンク・ガスの熱源機を置く場所が要ります（機種によって、ユニットの数と大きさが違います）。");
      cautions.push("国の補助金（給湯省エネ2026事業）の性能要件には、インターネットにつながることが含まれます。対象の機種でも、構成によって追加の部品が要ることがあります。");
      requirements.push("ヒートポンプユニットとタンクを置く場所と、ガスの熱源機を取り付ける場所");
      requirements.push("ヒートポンプとタンクの電源");
      requirements.push("タンクやヒートポンプからの排水の流し先");
      requirements.push("ガスの配管と、給水・給湯・ふろの配管");
      break;
  }

  /* 機能 */
  switch (p.functions.key) {
    case "fullauto":
      merits.push("お湯はり・追いだき・保温に加えて、お湯が減ったときの自動たし湯と、追いだき配管の自動洗浄を行うタイプです。");
      break;
    case "auto":
      merits.push("お湯はり・追いだき・保温を自動で行うタイプです。お湯が減ったときのたし湯は、リモコンで操作します。");
      break;
    case "hot-water-only":
      merits.push("蛇口とシャワーにお湯を送る、給湯専用のタイプです。追いだきの機能はありません。");
      cautions.push("追いだきができないので、いまの給湯器に追いだきの機能がある場合は、替える前に使い方が変わることを確かめてください。");
      break;
  }
  if (p.heating) {
    merits.push("温水の暖房（床暖房・浴室暖房乾燥機など）につなげるタイプです。");
    requirements.push("いま使っている温水の暖房の端末（床暖房・浴室暖房乾燥機）と、その配管の確認");
  }

  /* 設置方式（ガス給湯器） */
  switch (p.installationType.key) {
    case "wall":
      requirements.push("取り付ける外壁の強さと、給水・給湯・ガスの配管の位置");
      requirements.push("排気が窓や隣の家に向かないこと（排気の向きと、まわりとの距離）");
      break;
    case "floor":
      requirements.push("給湯器を据える、平らで丈夫な台か地面");
      requirements.push("排気が窓や隣の家に向かないこと");
      break;
    case "ps-door":
      requirements.push("パイプスペースの扉の内側の寸法と、扉の排気の形（機種は、扉と排気の向きに合わせて選びます）");
      break;
    case "ps-standard":
      requirements.push("パイプスペース（壁のくぼみ）の寸法と、メーターなどとの間隔");
      break;
  }

  /* 住まい */
  if (p.housing.includes("apartment")) {
    requirements.push("マンションでは、管理規約で決められている機器の種類・工事の届け出・作業できる時間");
  }

  // 機種の注意（メーカーの説明）と同じ話題の一般論は、重ねて出さない
  const own = p.cautions ?? [];
  const sameTopic = (text: string) => CAUTION_TOPICS.some((t) => t.test(text) && own.some((o) => t.test(o)));
  return { merits, cautions: [...own, ...cautions.filter((c) => !sameTopic(c))], requirements };
}

/** 種類ごとに、追加の費用が出やすい工事（価格の欄の注記） */
export function extraCostItems(p: Product): string[] {
  const common = ["設置方式を変える場合の、配管と排気の工事", "配管の延長・傷んだ配管の交換", "配管の保温材・配管カバーの取り替え"];
  switch (p.category) {
    case "eco-jozu":
      return [...common, "ドレン水の排水の配管"];
    case "gas":
      return common;
    case "ecocute":
      return ["タンクを載せる基礎", "200Vの電源と専用のブレーカーの工事", "いまの給湯器・タンクの撤去と処分", "運び込みの経路が狭い・高い所への設置", "脚部カバーなどの別売の部材"];
    case "hybrid":
      return ["ヒートポンプとタンクを載せる基礎", "電源の工事", "いまの給湯器の撤去と処分", ...(p.heating ? ["温水の暖房の配管のつなぎ替え"] : []), "運び込みの経路が狭い・高い所への設置"];
  }
}
