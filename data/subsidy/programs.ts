/**
 * 補助金・支援制度の数値（このサイトで使う唯一の置き場所）。
 *
 * - 金額・期限・条件は、ここにあるものだけを画面に出す。ページやコンポーネントに金額を直接書かないこと。
 * - 書き換えるときは、必ず公式ページを開き直して、verifiedAt（確認日）も直す。
 *   docs/VERIFIED_FACTS.md（コラムの自動生成が読む事実シート）も、同じ内容にそろえる。
 * - `npm run subsidy:check` が、公式ページを取り直して、ここの数値と食い違いが無いかを確かめる。
 * - 制度が終わったら status を "closed" にする（期限の日付を過ぎると、画面の表示は自動で「受付終了」に切り替わる。lib/subsidy.ts）。
 */

export type SourceRef = { label: string; url: string };

export const kyutouShoene2026 = {
  id: "kyutou-shoene-2026",
  name: "給湯省エネ2026事業",
  formalName: "高効率給湯器導入促進による家庭部門の省エネルギー推進事業費補助金（給湯省エネ2026事業）",
  ministry: "経済産業省",
  /** 住宅省エネ2026キャンペーン（国土交通省・経済産業省・環境省の4事業）の1つ */
  campaign: "住宅省エネ2026キャンペーン",
  /** 公式ページで内容を確認した日 */
  verifiedAt: "2026-10-14",
  /** "open"＝実施中 ／ "closed"＝終了（予算の上限に達した・期限を過ぎた・後継の制度に替わった） */
  status: "open" as "open" | "closed",
  /** 終了を確認したときに、その日と理由を書く（例：{ date: "2026-11-20", reason: "予算上限に達したため" }） */
  closed: null as { date: string; reason: string } | null,

  budget: {
    totalOkuYen: 570,
    fiscal: "令和7年度補正予算",
    /** うち、撤去の加算に充てる予算の目安 */
    removalBonusOkuYen: 36,
  },

  /** 基本額（1台あたり・円） */
  base: {
    ecocute: 70000,
    hybrid: 100000,
    enefarm: 170000,
  },
  /** 性能加算額（1台あたり・円）。エネファームに性能加算は無い */
  performanceBonus: {
    ecocute: 30000,
    hybrid: 20000,
    enefarm: 0,
  },
  /** 撤去加算額（1台あたり・円） */
  removalBonus: {
    storageHeater: { amount: 40000, limit: "2台まで" },
    electricWaterHeater: { amount: 20000, limit: "補助を受ける給湯器の台数まで" },
  },
  /** 台数の上限 */
  unitLimit: { detached: 2, apartment: 1 },

  /** 性能要件（公式ページの記載を、意味を変えずに短くしたもの） */
  requirements: {
    ecocute: [
      "省エネ法のトップランナー制度の、2025年度の目標基準値以上の性能であること",
      "インターネットにつながる機種で、翌日の天気予報や日射量の予報に合わせて、昼間に沸き上げを移す機能があること（または、おひさまエコキュートであること）",
      "一部の機種は、台所リモコンや無線LANアダプターを一緒に設置することで要件を満たす",
    ],
    ecocuteBonus: ["2025年度の目標基準値（JIS C 9220 の年間給湯保温効率、または年間給湯効率）に 0.2 を足した値以上の性能であること"],
    hybrid: [
      "電気のヒートポンプとガスの補助熱源機を併用し、貯湯タンクを持つ機器であること",
      "日本ガス石油機器工業会の規格（JGKAS A705）による年間給湯効率が 108％以上であること",
      "インターネットにつながる機種で、昼間の再生可能エネルギーの電気を積極的に自家消費する機能があること",
      "一部の機種は、台所リモコンや無線LANアダプターを一緒に設置することで要件を満たす",
    ],
    hybridBonus: ["年間給湯効率（JGKAS A705）が 116.2％以上であること"],
    enefarm: [
      "燃料電池普及促進協会（FCA）の登録機器リストに登録されている製品であること",
      "インターネットにつながる機種で、気象情報と連動して、停電が予想されるときに稼働を止めない機能があること",
    ],
  },
  /** ハイブリッド給湯機の性能要件・加算要件の境目（年間給湯効率・％） */
  hybridEfficiency: { base: 108, bonus: 116.2 },

  /** 対象になる工事の着手日（この日以降） */
  constructionFrom: "2025-11-28",
  /** 交付申請の予約の期限（遅くとも） */
  reservationDeadline: "2026-11-16",
  /** 交付申請の期限（遅くとも） */
  applicationDeadline: "2026-12-31",
  /** 受付の開始 */
  schedule: {
    operatorRegistrationFrom: "2026-03-10",
    applicationFrom: "2026-03-31",
  },
  /** 予約の有効期間 */
  reservationValidity: "提出から3か月、または2026年12月31日の、いずれか早い日まで",
  /** 補助金で取得した機器の処分が制限される期間（年） */
  dispositionLimitYears: 6,

  /** 予算に対する申請額の割合。確認した時点の公式の値（最新の値は、ページの表示時に公式ページから取り直す。lib/subsidy-budget.ts） */
  budgetSnapshot: {
    percent: 50,
    removalBonusPercent: 25,
    asOf: "2026-10-14",
    /** 月ごとの申請の累計（公式の表。2026年9月分まで） */
    cumulative: { applications: 279889, amountText: "247億7,118万円", through: "2026年9月" },
  },

  urls: {
    top: "https://kyutou-shoene2026.meti.go.jp/",
    about: "https://kyutou-shoene2026.meti.go.jp/about/",
    overview: "https://kyutou-shoene2026.meti.go.jp/overview/",
    application: "https://kyutou-shoene2026.meti.go.jp/application-1/",
    ecocute: "https://kyutou-shoene2026.meti.go.jp/materials/ecocute.html",
    hybrid: "https://kyutou-shoene2026.meti.go.jp/materials/hybrid.html",
    enefarm: "https://kyutou-shoene2026.meti.go.jp/materials/enefarm.html",
    graph: "https://kyutou-shoene2026.meti.go.jp/graph/",
    removalBonus: "https://kyutou-shoene2026.meti.go.jp/about_tekkyo_kasan/",
    removalGraph: "https://kyutou-shoene2026.meti.go.jp/graph_tekkyokasan/",
    jCredit: "https://kyutou-shoene2026.meti.go.jp/about-j-credit/",
    /** 補助対象製品の検索（メーカーと型番） */
    productSearch: "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/#section-eco",
    productSearchHybrid: "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-hb",
    productSearchEcocute: "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec",
    productSearchEnefarm: "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-en",
    /** 登録事業者の検索 */
    operatorSearch: "https://jutaku-shoene2026.mlit.go.jp/search-for-manufacturer/",
  },
} as const;

/** みらいエコ住宅2026事業（リフォーム）。給湯器だけの交換では使えない */
export const miraiEco2026 = {
  id: "mirai-eco-2026",
  name: "みらいエコ住宅2026事業",
  ministry: "国土交通省",
  verifiedAt: "2026-10-14",
  status: "open" as "open" | "closed",
  /** 高効率給湯器の補助額（1戸あたり・円） */
  waterHeater: {
    ecocuteOrHybrid: 45000,
    ecoJozuOrEcoFeel: 30000,
  },
  /** 対象製品の基準（公式ページの記載） */
  criteria: {
    ecoJozu: "給湯暖房器は給湯部の熱効率が94％以上、給湯単能器・ふろ給湯器はモード熱効率が83.7％以上",
    hybrid: "年間給湯効率（JGKAS A705）が102％以上",
    ecocute: "JIS C 9220:2018 の年間給湯保温効率、または年間給湯効率が3.0以上（寒冷地仕様は2.7以上）",
  },
  /** 補助の上限（1戸あたり・円） */
  cap: {
    before1991: { mandatory: 1000000, nextGen: 500000 },
    from1992to2016: { mandatory: 800000, nextGen: 400000 },
  },
  /** 対象の住宅 */
  targetHousing: "平成28年12月31日以前に新築された住宅（原則）",
  constructionFrom: "2025-11-28",
  reservationDeadline: "2026-11-16",
  applicationDeadline: "2026-12-31",
  urls: {
    top: "https://mirai-eco2026.mlit.go.jp/",
    reform: "https://mirai-eco2026.mlit.go.jp/reform/",
    waterHeater: "https://mirai-eco2026.mlit.go.jp/reform/point3-1.html",
  },
} as const;

/** 賃貸集合給湯省エネ2026事業（賃貸集合住宅のオーナー向け。エコジョーズ・エコフィールへの交換） */
export const chintaiShoene2026 = {
  id: "chintai-shoene-2026",
  name: "賃貸集合給湯省エネ2026事業",
  formalName: "既存賃貸集合住宅用小型省エネルギー型給湯器導入促進事業費補助金（賃貸集合給湯省エネ2026事業）",
  ministry: "経済産業省",
  verifiedAt: "2026-10-14",
  status: "open" as "open" | "closed",
  budgetOkuYen: 35,
  /** 基本額（1台あたり・円） */
  base: { withoutReheat: 50000, withReheat: 70000 },
  /** 加算額（1台あたり・円）。決められたドレン排水の工事を行った場合 */
  bonus: 30000,
  unitLimit: "1住戸につき1台まで",
  target: "賃貸集合住宅のオーナーなど（給湯器の交換工事の発注者）",
  urls: {
    top: "https://chintai-shoene2026.meti.go.jp/",
    about: "https://chintai-shoene2026.meti.go.jp/about/",
  },
} as const;

/**
 * 横浜市の「横浜グリーンエネルギーパートナーシップ事業（YGrEP）」。
 * 補助金ではなく、キャッシュレスポイントなどの還元。給湯器では、エコキュートとエネファームが対象。
 */
export const yokohamaYgrep2026 = {
  id: "yokohama-ygrep-2026",
  name: "横浜グリーンエネルギーパートナーシップ事業",
  shortName: "YGrEP（ワイグレップ）",
  fiscal: "令和8年度",
  operator: "横浜市",
  verifiedAt: "2026-10-14",
  status: "open" as "open" | "closed",
  kind: "キャッシュレスポイントなどの還元（補助金ではありません）",
  /** 還元額（1件あたり・円分） */
  points: { ecocute: 20000, enefarm: 30000 },
  budgetText: "2億2,500万円",
  applicationFrom: "2026-06-15",
  applicationDeadline: "2026-12-25",
  conditions: {
    ecocute: [
      "給湯省エネ2026事業の、エコキュートの対象製品型番リストに載っている製品であること",
      "エコキュートを新たに設置し、太陽光発電設備を同時に設置するか、すでに設置していること",
      "エコキュートからエコキュートへの買い替えは対象外",
    ],
    enefarm: ["燃料電池普及促進協会（FCA）の登録機器リストに登録されている製品であること"],
    common: ["設置の前に、設備を導入するご本人が申請する（設置した後の申請はできない）", "先着順で、予算額に達した時点で終了する", "新規の導入で、未使用品であること"],
  },
  /** ハイブリッド給湯機は、この事業の対象設備に含まれていない */
  hybridCovered: false,
  /** 国の給湯省エネ2026事業と併用できる（特設サイトの「併用できる補助金」に記載） */
  combinableWithKyutouShoene: true,
  /** 併用するときの、国の申請での書き方（特設サイトの記載。2026年6月15日時点） */
  jCreditNote:
    "給湯省エネ2026事業の「クレジット制度への参加表明」の欄で、「地方公共団体又は民間団体等が管理するプログラムに入会予定・入会済」を選び、プログラム名に「横浜グリーンエネルギーパートナーシップ」と書く（特設サイトの案内。2026年6月15日時点）",
  urls: {
    city: "https://www.city.yokohama.lg.jp/kurashi/machizukuri-kankyo/ondanka/hojo-sien/YGrEP.html",
    site: "https://ygrep2026.city.yokohama.lg.jp/",
  },
} as const;

/** 出典の一覧（ページの末尾に出す） */
export const subsidySources = {
  kyutouShoene: [
    { label: "給湯省エネ2026事業【公式】事業概要", url: kyutouShoene2026.urls.about },
    { label: "給湯省エネ2026事業【公式】対象要件の詳細（購入・工事タイプ）", url: kyutouShoene2026.urls.overview },
    { label: "給湯省エネ2026事業【公式】申請手続きの詳細（工事請負契約）", url: kyutouShoene2026.urls.application },
    { label: "給湯省エネ2026事業【公式】予算に対する補助金申請額の割合", url: kyutouShoene2026.urls.graph },
  ] as SourceRef[],
  hybrid: [{ label: "給湯省エネ2026事業【公式】対象機器の詳細（ハイブリッド給湯機）", url: kyutouShoene2026.urls.hybrid }] as SourceRef[],
  ecocute: [{ label: "給湯省エネ2026事業【公式】対象機器の詳細（エコキュート）", url: kyutouShoene2026.urls.ecocute }] as SourceRef[],
  enefarm: [{ label: "給湯省エネ2026事業【公式】対象機器の詳細（エネファーム）", url: kyutouShoene2026.urls.enefarm }] as SourceRef[],
  productSearch: [{ label: "住宅省エネ2026キャンペーン【公式】補助対象製品の検索", url: kyutouShoene2026.urls.productSearch }] as SourceRef[],
  operatorSearch: [{ label: "住宅省エネ2026キャンペーン【公式】登録事業者の検索", url: kyutouShoene2026.urls.operatorSearch }] as SourceRef[],
  miraiEco: [
    { label: "みらいエコ住宅2026事業【公式】対象要件の詳細（リフォーム）", url: miraiEco2026.urls.reform },
    { label: "みらいエコ住宅2026事業【公式】特定エコ住宅設備の設置", url: miraiEco2026.urls.waterHeater },
  ] as SourceRef[],
  chintai: [{ label: "賃貸集合給湯省エネ2026事業【公式】事業概要", url: chintaiShoene2026.urls.about }] as SourceRef[],
  yokohama: [
    { label: "横浜市「横浜グリーンエネルギーパートナーシップ事業」", url: yokohamaYgrep2026.urls.city },
    { label: "令和8年度 横浜グリーンエネルギーパートナーシップ事業 特設サイト", url: yokohamaYgrep2026.urls.site },
  ] as SourceRef[],
};
