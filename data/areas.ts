import type { Section, SourceRef } from "@/data/content-types";
import type { CategoryId, Housing } from "@/data/products/types";
import type { ImageKey } from "@/lib/images";

/**
 * 地域のページ（/area/<slug>）。
 *
 * 地域名だけを差し替えたページにしないため、区ごとに、公的な統計と区・市の公式資料にある事実から、
 * 給湯器の交換にかかわること（戸建てと集合住宅の割合・住宅の古さ・地形と道・大規模な団地・海との位置）を書く。
 *
 * - 数字は、出典の統計のまま（令和5年住宅・土地統計調査、横浜市の推計人口）。割合は「住宅数」に対する値。
 * - 区の地形・まちの成り立ちは、区の公式ページ・都市計画マスタープラン（区プラン）の記述にもとづく。
 * - 当社の施工事例の無い地域で、施工実績があるような書き方をしない（施工事例は data/works.ts の area から自動で出る）。
 * - 対応している工事は、全地域で同じ（ページ側で共通に出す）。区ごとの本文（sections）には、その区にしか当てはまらないことを書く。
 * - 2026-10-14 に、区の公式ページと統計で確かめた（調査の記録は docs/VERIFIED_FACTS.md の「横浜市の区の住まい」）。
 */

export type AreaStats = {
  population: number;
  households: number;
  areaKm2: number;
  /** 一戸建の割合（％。住宅数） */
  detachedPercent: number;
  /** 共同住宅の割合（％。住宅数） */
  apartmentPercent: number;
  /** 共同住宅のうち、6階建以上の割合（％） */
  sixStoryPercent: number;
  /** 1980年以前に建てられた住宅の割合（％） */
  upTo1980Percent: number;
  /** 2001年以降に建てられた住宅の割合（％） */
  from2001Percent: number;
  /** 持ち家の割合（％） */
  ownedPercent: number;
  /** 太陽光を利用した発電機器のある住宅の割合（％） */
  solarPercent: number;
};

export type Area = {
  slug: string;
  /** 正式な名前（例：横浜市戸塚区） */
  name: string;
  /** 短い名前（例：戸塚区） */
  shortName: string;
  kind: "city" | "ward";
  priority: "A" | "B";
  title: string;
  h1: string;
  description: string;
  lead: string;
  /** このページが担当する検索語 */
  keyword: string;
  secondaryKeywords: string[];
  publishedAt: string;
  updatedAt: string;
  image?: ImageKey;
  imageAlt?: string;
  stats: AreaStats;
  /** 区内の主な駅（区の資料・横浜市統計書で確かめたもの） */
  stations: string[];
  /** 戸塚区と隣り合うか（戸塚区自身は null） */
  adjacentToTotsuka: boolean | null;
  /** 海に面しているか（区の公式の記述による） */
  coastal: boolean;
  /** 区の本文（その区にしか当てはまらないこと） */
  sections: Section[];
  faqs: { q: string; a: string }[];
  /** このページ固有の出典（統計の出典は共通で足す） */
  sources: SourceRef[];
  /** 関連する機種の出し方（住まいの割合に合わせて） */
  productFocus: { housing?: Housing; categories?: CategoryId[] };
  /** 近くの区（ページのある区の slug） */
  nearby: string[];
};

/** 統計の出典（どの地域のページにも出す） */
export const AREA_STAT_SOURCES: SourceRef[] = [
  { label: "横浜市「令和5年住宅・土地統計調査」の結果（総務省統計局の調査。住宅の建て方・建築の時期・所有の関係の区別の表）", url: "https://www.city.yokohama.lg.jp/city-info/yokohamashi/tokei-chosa/portal/kekka/jutaku/r05/jutaku-setai.html" },
  { label: "横浜市統計書 第10章 住宅（第22表 省エネルギー設備等別住宅数）", url: "https://www.city.yokohama.lg.jp/city-info/yokohamashi/tokei-chosa/portal/tokeisho/10.html" },
  { label: "横浜市 推計人口（行政区別の人口・世帯数・面積。令和8年10月1日現在）", url: "https://www.city.yokohama.lg.jp/city-info/yokohamashi/tokei-chosa/portal/opendata/suikei01.html" },
];

/** 統計の時点（画面に出す） */
export const AREA_STAT_AS_OF = { housing: "令和5年（2023年）10月1日現在", population: "令和8年（2026年）10月1日現在" };

const DANCHI_LIST: SourceRef = { label: "横浜市旭区大規模団地再生ビジョン（平成30年9月）《市内大規模団地一覧》", url: "https://www.city.yokohama.lg.jp/asahi/kurashi/machizukuri_kankyo/machizukuri/danntisaiseivision.files/0002_20190130.pdf" };
const DRAIN_RULE: SourceRef = { label: "横浜市 排水設備要覧（ドレン排水の扱い）", url: "https://www.city.yokohama.lg.jp/kurashi/machizukuri-kankyo/kasen-gesuido/gesuido/setsuzoku/haisui/youran.html" };

const D = "2026-10-14";

export const areas: Area[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "yokohama",
    name: "横浜市",
    shortName: "横浜市",
    kind: "city",
    priority: "A",
    title: "横浜市の給湯器交換｜対応エリアと区ごとの住まいの事情",
    h1: "横浜市の給湯器交換と、区ごとの住まいの事情",
    description:
      "横浜市の給湯器交換の対応エリアと、区ごとの住まいの違い（戸建てと集合住宅の割合・住宅の古さ）を、公的な統計で比べました。エコジョーズの排水の決まり、横浜市のポイント還元にも触れています。",
    lead: "横浜市は、区によって住まいの形が大きく違います。泉区では住宅の半分以上が一戸建てで、南区では3分の2近くが集合住宅です。住まいの形が違えば、給湯器の設置の形も、交換で確かめることも変わります。",
    keyword: "横浜市 給湯器 対応エリア",
    secondaryKeywords: ["横浜市 給湯器 業者", "横浜市 給湯器 マンション", "横浜市 ドレン排水 エコジョーズ"],
    publishedAt: D,
    updatedAt: D,
    image: "area/yokohama-minatomirai",
    imageAlt: "夕暮れのみなとみらいの街並み",
    stats: {
      population: 3753462,
      households: 1814279,
      areaKm2: 438.23,
      detachedPercent: 35.6,
      apartmentPercent: 62.5,
      sixStoryPercent: 43.6,
      upTo1980Percent: 16.3,
      from2001Percent: 40.5,
      ownedPercent: 58.1,
      solarPercent: 2.3,
    },
    stations: [],
    adjacentToTotsuka: null,
    coastal: true,
    sections: [
      {
        id: "wards",
        heading: "区ごとに、住まいの形はこれだけ違う",
        blocks: [
          {
            type: "p",
            text: "横浜市全体では、住宅のうち一戸建てが35.6％、共同住宅が62.5％です（令和5年住宅・土地統計調査）。ただし区ごとに見ると、一戸建ての割合は、もっとも高い泉区の56.6％から、もっとも低い西区の19.6％まで開きがあります。このサイトで地域のページを用意している10区の数字は、下の表のとおりです。",
          },
          { type: "widget", name: "ward-compare" },
        ],
      },
      {
        id: "drain",
        heading: "エコジョーズのドレン排水は、横浜市の決まりに沿って流す",
        blocks: [
          {
            type: "p",
            text: "エコジョーズは、運転中にドレン水（排気の熱を回収するときに出る水）が出ます。ドレン水は、本体の中の中和器で中和してから流しますが、どこへ流してよいかは、自治体の下水道の決まりによります。",
          },
          {
            type: "p",
            text: "横浜市の排水設備要覧では、ドレン水は汚水の系統へ流すことを原則としたうえで、日本ガス機器検査協会（JIA）の認証を受けた機器であれば、雨水の系統の排水設備へ流すことを認めています。戸建てでは雨どいや雨水ますへつなげることが多く、マンションでは流し先が限られることがあります。流し先が取れるかどうかは、現地調査で確かめます。",
          },
          { type: "links", items: [{ href: "/eco-jozu", label: "エコジョーズの仕組みと、交換のときの注意", note: "ドレン水の流し先が取れない場合の考え方" }] },
        ],
      },
      {
        id: "city-program",
        heading: "横浜市の制度は、エコキュートとエネファームが対象",
        blocks: [
          {
            type: "p",
            text: "横浜市には、エコキュートやエネファームを新しく設置した市民に、キャッシュレスポイントなどを還元する制度（横浜グリーンエネルギーパートナーシップ事業）があります。エコキュートは、太陽光発電が設置済みか、同時に設置することが条件です。横浜市で太陽光発電のある住宅は、市全体で2.3％です（横浜市統計書）。ハイブリッド給湯器とガス給湯器は、この制度の対象ではありません。",
          },
          { type: "links", items: [{ href: "/subsidy/yokohama", label: "横浜市で使える補助金・支援制度", note: "国の制度との併用と、申請の順番" }] },
        ],
      },
    ],
    faqs: [
      {
        q: "横浜市のどの区でも、交換をお願いできますか。",
        a: "横浜市戸塚区のオフィスを拠点に、横浜市のほかの区からもご相談をお受けしています。地域のページが無い区のお住まいの方も、お見積もりフォームかお電話でご相談ください。",
      },
      {
        q: "横浜市の区役所に、給湯器の補助金はありますか。",
        a: "給湯器の交換に使える制度として、当社が公式の情報で確かめているのは、国の給湯省エネ2026事業と、横浜市のポイント還元の制度です。区独自の給湯器の補助は、案内を確認できていません。最新の情報は、横浜市と各区の公式ページでご確認ください。",
      },
    ],
    sources: [DRAIN_RULE],
    productFocus: {},
    nearby: ["totsuka", "izumi", "sakae", "konan", "asahi", "seya", "hodogaya", "minami", "isogo", "kanazawa"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "totsuka",
    name: "横浜市戸塚区",
    shortName: "戸塚区",
    kind: "ward",
    priority: "A",
    title: "戸塚区の給湯器交換｜深谷町のオフィスから伺います",
    h1: "戸塚区の給湯器交換",
    description:
      "横浜市戸塚区の給湯器交換は、区内の深谷町にオフィスのある横浜総合住設へ。戸塚区の住まいの統計、谷戸と丘陵の地形と道幅、昭和40〜50年代の団地で確かめることを、公的な資料にもとづいてまとめました。",
    lead: "当社の戸塚オフィスは、戸塚区深谷町にあります。戸塚区は、住宅のおよそ4割が一戸建て、6割近くが共同住宅で、谷戸と丘陵の入り組んだ地形に住宅地が広がっています。設置の形と、搬入の経路を確かめてから、機種をご提案します。",
    keyword: "戸塚区 給湯器交換",
    secondaryKeywords: ["戸塚区 給湯器", "戸塚区 給湯器 業者", "戸塚区 エコキュート 交換", "戸塚区 給湯器修理"],
    publishedAt: D,
    updatedAt: D,
    image: "area/totsuka-aerial",
    imageAlt: "戸塚駅の周辺を上空から見た街並み",
    stats: {
      population: 280403,
      households: 125163,
      areaKm2: 35.79,
      detachedPercent: 39.6,
      apartmentPercent: 58.3,
      sixStoryPercent: 47.7,
      upTo1980Percent: 17.6,
      from2001Percent: 42.3,
      ownedPercent: 68.2,
      solarPercent: 3.2,
    },
    stations: ["戸塚駅（JR・市営地下鉄ブルーライン）", "東戸塚駅（JR）", "舞岡駅（市営地下鉄ブルーライン）"],
    adjacentToTotsuka: null,
    coastal: false,
    sections: [
      {
        id: "homes",
        heading: "戸塚区の住まいと、給湯器の形",
        blocks: [
          {
            type: "p",
            text: "戸塚区の住宅は、一戸建てが39.6％、共同住宅が58.3％です（令和5年住宅・土地統計調査）。共同住宅のうち、6階建て以上が47.7％を占め、駅の周りには中高層のマンションが多くあります。区の都市計画マスタープランによると、市街化区域の中でもっとも割合が高い用途地域は、第一種低層住居専用地域で、丘陵の住宅地には一戸建ての並ぶ地域が広がっています。",
          },
          {
            type: "list",
            items: [
              "一戸建て：屋外の壁に付ける形（壁掛）か、地面に置く形（据置）が中心。エコキュートやハイブリッド給湯器への切り替えも、置き場所しだいで考えられます",
              "マンション：玄関の横の扉の中（パイプスペース）に収まる形が多く、扉の内側の寸法と、排気の向きに合う機種を選びます",
            ],
          },
        ],
      },
      {
        id: "terrain",
        heading: "谷戸と丘陵の地形、細い道",
        blocks: [
          {
            type: "p",
            text: "戸塚区プランは、区の地形を「境川と柏尾川の周辺の低地に、いくつもの川が谷戸を刻み、周辺部は複雑な丘陵地形」と説明しています。また、幅4メートル未満の狭い道路は区内の各所で見られる、とも書かれています。",
          },
          {
            type: "p",
            text: "給湯器の交換では、車を止める場所と、機器を運ぶ経路が工事の段取りを左右します。とくにエコキュートの貯湯タンクは、背が高く大きいので、門から設置場所までの通路の幅と段差を、現地調査で確かめます。",
          },
        ],
      },
      {
        id: "danchi",
        heading: "昭和40〜50年代に開発が始まった団地",
        blocks: [
          {
            type: "p",
            text: "区プランには、昭和30年代から、丘陵地の一部などで住宅地や大規模な住宅団地が開発されたとあります。横浜市の資料（市内大規模団地一覧）には、戸塚区の団地として、ドリームハイツ（1972年・分譲と賃貸）、大正（1969年・分譲）、平戸（1973年・賃貸）、柏陽台（1979年・賃貸）が載っています（年は開発の開始の時期）。",
          },
          {
            type: "p",
            text: "建てられてから年数のたつ団地では、浴室の中にふろ釜を置く形（バランス釜）や、壁を貫いて取り付ける形の給湯器が使われていることがあります。設置の形を替えられるかどうかは、建物の構造と、管理組合の決まりで変わります。分譲の団地は管理組合に、賃貸の団地は貸主に、先にご確認ください。",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "戸塚区のどの町からでも、相談できますか。",
        a: "戸塚区内でしたら、町名を問わずご相談をお受けしています。当社の戸塚オフィスは、深谷町にあります。現地調査の日程は、お見積もりのご依頼のあとにご相談します。",
      },
      {
        q: "戸塚区で、給湯器の修理はお願いできますか。",
        a: "当社でお受けしているのは、給湯器の交換工事です。修理をご希望の場合は、メーカーの修理受付へご相談ください。修理か交換かで迷うときは、型番と症状をお知らせいただければ、交換する場合の機種とお見積もりをお出しします。",
      },
      {
        q: "戸塚区独自の、給湯器の補助金はありますか。",
        a: "戸塚区独自の給湯器の補助は、案内を確認できていません。当社が公式の情報で確かめている制度は、国の給湯省エネ2026事業と、横浜市のポイント還元の制度です。戸塚区の住まいに合わせた考え方を、補助金のページにまとめています。",
      },
    ],
    sources: [
      { label: "戸塚区「ようこそ戸塚区へ」（戸塚区の概要）", url: "https://www.city.yokohama.lg.jp/totsuka/shokai/rekishi/welcome.html" },
      { label: "横浜市都市計画マスタープラン 戸塚区プラン「戸塚のまちづくり」", url: "https://www.city.yokohama.lg.jp/totsuka/kurashi/machizukuri_kankyo/machizukuri/totsuka_machi/tosimasu.files/0005_20181018.pdf" },
      DANCHI_LIST,
    ],
    productFocus: {},
    nearby: ["izumi", "sakae", "konan", "asahi", "hodogaya", "minami"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "izumi",
    name: "横浜市泉区",
    shortName: "泉区",
    kind: "ward",
    priority: "A",
    title: "泉区の給湯器交換｜一戸建てが多い区の機種の選び方",
    h1: "泉区の給湯器交換",
    description:
      "横浜市泉区の給湯器交換。泉区は住宅の56.6％が一戸建てで、横浜市の18区でもっとも高い割合です。屋外の設置の形、エコキュート・ハイブリッド給湯器への切り替え、太陽光発電と市の制度の関係をまとめました。",
    lead: "泉区は、住宅の56.6％が一戸建てで、横浜市の18区の中でもっとも高い割合です（令和5年住宅・土地統計調査）。屋外に置く給湯器が多く、置き場所に余裕があれば、エコキュートやハイブリッド給湯器も選べます。",
    keyword: "泉区 給湯器交換",
    secondaryKeywords: ["泉区 給湯器", "泉区 エコキュート", "横浜市泉区 給湯器"],
    publishedAt: D,
    updatedAt: D,
    stats: {
      population: 149741,
      households: 64592,
      areaKm2: 23.58,
      detachedPercent: 56.6,
      apartmentPercent: 41.8,
      sixStoryPercent: 25.5,
      upTo1980Percent: 18.8,
      from2001Percent: 38.5,
      ownedPercent: 68.2,
      solarPercent: 4.1,
    },
    stations: ["緑園都市駅・弥生台駅・いずみ野駅・いずみ中央駅・ゆめが丘駅（相鉄いずみ野線）", "踊場駅・中田駅・立場駅・下飯田駅（市営地下鉄ブルーライン）"],
    adjacentToTotsuka: true,
    coastal: false,
    sections: [
      {
        id: "homes",
        heading: "一戸建てが半分を超える区",
        blocks: [
          {
            type: "p",
            text: "泉区プランによると、泉区は市街化調整区域の割合が48.7％と、18区の中でもっとも高く、第一種低層住居専用地域の割合も、市全体より高くなっています。昭和51年（1976年）に相鉄いずみ野線が開通してからは、沿線で土地区画整理による計画的なまちづくりが行われました。",
          },
          {
            type: "p",
            text: "一戸建ての給湯器は、外壁に付ける形か、地面に置く形がほとんどです。同じ形に入れ替えるなら、配管をつなぎ替える工事で済みます。敷地にタンクとヒートポンプを置ける広さがあれば、ガス給湯器からエコキュートやハイブリッド給湯器へ替えることもできます。",
          },
        ],
      },
      {
        id: "solar",
        heading: "太陽光発電のある家の割合が、比べた区の中で高い",
        blocks: [
          {
            type: "p",
            text: "泉区で太陽光発電の設備がある住宅は4.1％で、このサイトで比べている10区の中でもっとも高い割合です（横浜市統計書）。横浜市のポイント還元の制度では、エコキュートは「太陽光発電が設置済みか、同時に設置すること」が条件です。太陽光発電のある家でガス給湯器からエコキュートに替える場合は、国の補助と市の還元を合わせて使える可能性があります。",
          },
          { type: "links", items: [{ href: "/subsidy/yokohama", label: "横浜市で使える制度と、申請の順番", note: "市の制度は、設置の前にご本人が申請します" }] },
        ],
      },
      {
        id: "danchi",
        heading: "上飯田地区の団地",
        blocks: [
          {
            type: "p",
            text: "泉区プランには、昭和39年（1964年）から昭和46年（1971年）ごろの人口急増期に、上飯田地区に市営・県営の大規模な住宅団地が形成されたとあります。横浜市の資料には、上飯田（1966年）、いちょう上飯田（1970年）、グリーンハイムいずみの（1977年・分譲）が載っています（年は開発の開始の時期）。公営の賃貸住宅の給湯器は、建物の設備として管理者が取り替えるのが通常です。まず管理者にご確認ください。",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "泉区の一戸建てで、ガス給湯器からエコキュートに替えられますか。",
        a: "タンクとヒートポンプユニットの置き場所、タンクを載せる基礎、200Vの電源、搬入の経路がそろえば替えられます。現地調査で確かめてから、ガス給湯器のまま替える場合と比べられるよう、両方のお見積もりもお出しできます。",
      },
      {
        q: "泉区から、戸塚区のオフィスは近いですか。",
        a: "泉区は戸塚区と隣り合う区で、当社の戸塚オフィスは、泉区との境に近い深谷町にあります。",
      },
    ],
    sources: [
      { label: "横浜市都市計画マスタープラン 泉区プラン（1. 泉区の概要）", url: "https://www.city.yokohama.lg.jp/izumi/kurashi/machizukuri_kankyo/machizukuri/kupurann.files/0005_20260918.pdf" },
      { label: "泉区「位置・地勢」", url: "https://www.city.yokohama.lg.jp/izumi/shokai/gaiyo/chisei.html" },
      DANCHI_LIST,
    ],
    productFocus: { housing: "detached", categories: ["ecocute", "hybrid", "eco-jozu"] },
    nearby: ["totsuka", "seya", "asahi", "sakae"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "sakae",
    name: "横浜市栄区",
    shortName: "栄区",
    kind: "ward",
    priority: "A",
    title: "栄区の給湯器交換｜丘陵の住宅地と古い住宅での確認点",
    h1: "栄区の給湯器交換",
    description:
      "横浜市栄区の給湯器交換。栄区は1980年以前に建てられた住宅が26.5％と、横浜市の中でも高い区です。丘陵の戸建て住宅地、低地の細い街路、公田町などの団地で、交換の前に確かめることをまとめました。",
    lead: "栄区は、昭和30年代の後半から50年代の前半に、丘陵地で大規模な住宅地の開発が進んだ区です。1980年以前に建てられた住宅が26.5％と、横浜市の中でも高い割合です。",
    keyword: "栄区 給湯器交換",
    secondaryKeywords: ["栄区 給湯器", "横浜市栄区 給湯器", "本郷台 給湯器"],
    publishedAt: D,
    updatedAt: D,
    stats: {
      population: 118383,
      households: 53460,
      areaKm2: 18.52,
      detachedPercent: 46.0,
      apartmentPercent: 51.5,
      sixStoryPercent: 31.3,
      upTo1980Percent: 26.5,
      from2001Percent: 39.1,
      ownedPercent: 66.7,
      solarPercent: 3.3,
    },
    stations: ["本郷台駅（JR根岸線）"],
    adjacentToTotsuka: true,
    coastal: false,
    sections: [
      {
        id: "hills",
        heading: "谷戸の里山が、戸建ての住宅街に変わった区",
        blocks: [
          {
            type: "p",
            text: "栄区プランは、昭和30年代後半から50年代前半にかけて、丘陵部で大規模な宅地開発が行われ、「谷戸が連なる里山は戸建てを中心とした住宅街に大きく変貌した」と書いています。市街化区域の88.7％は住居系の用途地域で、その大半が戸建ての住宅地です。",
          },
          {
            type: "p",
            text: "開発の時期がそろっている住宅地では、同じころに建てられた家が並び、給湯器の交換の時期も重なりがちです。いまの給湯器が、建てたときから数えて何台目か、設置からどれくらいたつかを、型番のシールの製造年で確かめると、交換の計画が立てやすくなります。",
          },
          { type: "links", items: [{ href: "/guide/timing", label: "給湯器の交換時期の目安", note: "設計上の標準使用期間と、前ぶれ" }] },
        ],
      },
      {
        id: "lowland",
        heading: "低地の細い街路と、搬入の経路",
        blocks: [
          {
            type: "p",
            text: "区プランには、いたち川と柏尾川沿いの低地に、狭い区画と細い街路の入り組んだ木造住宅の密集した地域がある、とも書かれています。こうした場所では、作業車を止める位置と、機器を運び込む道筋を、工事の日の前に決めておきます。据置の給湯器やエコキュートのタンクは、通路の幅と、門・塀との間の寸法が、運び込めるかどうかの分かれ目になります。",
          },
        ],
      },
      {
        id: "danchi",
        heading: "公田町・飯島・本郷台駅前の団地",
        blocks: [
          {
            type: "p",
            text: "横浜市の資料には、栄区の団地として、公田町（1964年・賃貸）、飯島（1968年・賃貸）、本郷台駅前（1973年）が載っています（年は開発の開始の時期）。年数のたつ集合住宅では、給湯器の形が建てたときの設計に合わせて決まっていることが多く、替えられる機種が限られます。賃貸の住まいは貸主に、分譲は管理組合に、先にご確認ください。",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "築40年を超える家でも、エコジョーズに替えられますか。",
        a: "替えられることが多いですが、エコジョーズはドレン水の排水が要るので、流し先を取れるかを確かめます。配管が古い場合は、給湯器と一緒に、つなぎ部分の配管を交換することもあります。",
      },
      {
        q: "栄区で、エコキュートの補助金は使えますか。",
        a: "国の給湯省エネ2026事業は、登録された型番を、登録された事業者との契約で設置すれば対象です。横浜市のポイント還元は、太陽光発電が設置済みか、同時に設置する場合に対象になります。",
      },
    ],
    sources: [
      { label: "横浜市都市計画マスタープラン 栄区プラン「栄区まちづくり方針」第1章", url: "https://www.city.yokohama.lg.jp/sakae/kurashi/machizukuri_kankyo/machizukuri/toshikeikaku/sakae-mplan.files/plan_chapter1.pdf" },
      { label: "栄区の沿革（位置・地勢）", url: "https://www.city.yokohama.lg.jp/sakae/shokai/gaiyo/ichi_chisei/enkaku.html" },
      DANCHI_LIST,
    ],
    productFocus: { housing: "detached" },
    nearby: ["totsuka", "konan", "kanazawa", "isogo", "izumi"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "konan",
    name: "横浜市港南区",
    shortName: "港南区",
    kind: "ward",
    priority: "A",
    title: "港南区の給湯器交換｜港南台・野庭の住まいで確かめること",
    h1: "港南区の給湯器交換",
    description:
      "横浜市港南区の給湯器交換。昭和40年代以降に住宅都市として発展し、1980年以前の住宅が25.7％の港南区で、港南台や野庭の集合住宅、谷と台地の入り組んだ住宅地での交換の確認点をまとめました。",
    lead: "港南区は、昭和40年代以降の急速な市街化で、住宅都市として発展した区です。区プランは、開発から40年以上がたち、建物の老朽化が進んでいる地域がある、と書いています。古い給湯器ほど、同じ型番の後継の機種が無いことがあり、機種の選び直しが要ります。",
    keyword: "港南区 給湯器交換",
    secondaryKeywords: ["港南区 給湯器", "横浜市港南区 給湯器", "港南台 給湯器 交換"],
    publishedAt: D,
    updatedAt: D,
    stats: {
      population: 208249,
      households: 95944,
      areaKm2: 19.9,
      detachedPercent: 42.3,
      apartmentPercent: 55.8,
      sixStoryPercent: 35.0,
      upTo1980Percent: 25.7,
      from2001Percent: 32.9,
      ownedPercent: 69.2,
      solarPercent: 2.6,
    },
    stations: ["上大岡駅（京急本線・市営地下鉄ブルーライン）", "港南中央駅・上永谷駅・下永谷駅（市営地下鉄ブルーライン）", "港南台駅（JR根岸線）"],
    adjacentToTotsuka: true,
    coastal: false,
    sections: [
      {
        id: "town",
        heading: "昭和40年代からの住宅都市",
        blocks: [
          {
            type: "p",
            text: "港南区の地形は、大岡川と、柏尾川の支流の平戸永谷川の上流の、谷と台地が細かく入り組んでいます（港南区の位置・地勢）。区プランによると、JR根岸線は1973年に全線が開通し、港南台駅の周辺の集合住宅は、1974年から入居が始まりました。住宅のうち、1980年以前に建てられたものは25.7％で、横浜市の中でも高い割合です（令和5年住宅・土地統計調査）。",
          },
          {
            type: "p",
            text: "建てられてから年数のたつ住まいの給湯器は、いまの型番の後継の機種が無いことがあります。その場合でも、設置の形・号数・機能が同じ機種を選べば、ほとんどの工事は配管のつなぎ替えで済みます。型番のシールの写真をお送りいただければ、合う機種をお調べします。",
          },
        ],
      },
      {
        id: "noba",
        heading: "野庭団地・港南台の集合住宅",
        blocks: [
          {
            type: "p",
            text: "横浜市の資料によると、野庭団地は、昭和47年に市営住宅の建設が始まり、翌年10月から入居が始まりました。市営住宅は88棟・3,294戸、分譲の団地は43棟・2,869戸の規模です。また、横浜市の団地の一覧には、日野団地（1969年・賃貸）も載っています。",
          },
          {
            type: "p",
            text: "分譲の団地で給湯器を替えるときは、管理組合の規約で、機器の種類・排気の向き・工事の届け出が決められていることがあります。エコジョーズに替える場合は、ドレン水の流し先が共用部分にかかることもあるので、管理組合への確認が先になります。",
          },
          { type: "links", items: [{ href: "/guide/apartment", label: "マンションの給湯器交換で確かめること", note: "パイプスペース・管理規約・ドレン排水" }] },
        ],
      },
    ],
    faqs: [
      {
        q: "野庭団地の分譲の住戸です。給湯器の交換に、管理組合の許可は要りますか。",
        a: "団地ごとの規約によります。工事の届け出や作業の時間、使える機器が決められていることがあるため、先に管理組合にご確認ください。当社からも、工事に必要な書類の内容をご説明します。",
      },
      {
        q: "港南区から依頼すると、現地調査に来てもらえますか。",
        a: "伺います。港南区は戸塚区と隣り合う区です。お見積もりのご依頼のあと、現地調査の日程をご相談します。お見積もりと現地調査は無料です。",
      },
    ],
    sources: [
      { label: "港南区の位置・地勢", url: "https://www.city.yokohama.lg.jp/konan/shokai/gaiyo/ichi_chisei/outlnmin.html" },
      { label: "横浜市都市計画マスタープラン 港南区プラン 第2章", url: "https://www.city.yokohama.lg.jp/konan/kurashi/machizukuri_kankyo/machizukuri/kuplan.files/0036_20190820.pdf" },
      { label: "横浜市「野庭住宅・野庭団地」の資料", url: "https://www.city.yokohama.lg.jp/kurashi/sumai-kurashi/jutaku/shiryo/noba20210427.files/0032_20211228.pdf" },
      DANCHI_LIST,
    ],
    productFocus: { housing: "apartment" },
    nearby: ["totsuka", "sakae", "minami", "isogo"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "asahi",
    name: "横浜市旭区",
    shortName: "旭区",
    kind: "ward",
    priority: "B",
    title: "旭区の給湯器交換｜若葉台・左近山など大規模団地の確認点",
    h1: "旭区の給湯器交換",
    description:
      "横浜市旭区の給湯器交換。一戸建てと共同住宅がほぼ半分ずつの旭区で、若葉台・左近山・ひかりが丘などの大規模団地、起伏の多い住宅地での交換の確認点を、区の資料にもとづいてまとめました。",
    lead: "旭区は、住宅の49.7％が一戸建て、48.4％が共同住宅と、ほぼ半分ずつの区です。若葉台・左近山・ひかりが丘・西ひかりが丘の4つの大規模団地には、区の資料で合計およそ3万人が暮らしています。",
    keyword: "旭区 給湯器交換",
    secondaryKeywords: ["旭区 給湯器", "横浜市旭区 給湯器", "若葉台 給湯器 交換"],
    publishedAt: D,
    updatedAt: D,
    stats: {
      population: 239188,
      households: 108772,
      areaKm2: 32.73,
      detachedPercent: 49.7,
      apartmentPercent: 48.4,
      sixStoryPercent: 34.2,
      upTo1980Percent: 21.5,
      from2001Percent: 34.5,
      ownedPercent: 67.2,
      solarPercent: 3.4,
    },
    stations: ["鶴ヶ峰駅・二俣川駅・希望ヶ丘駅（相鉄本線）", "南万騎が原駅（相鉄いずみ野線）"],
    adjacentToTotsuka: true,
    coastal: false,
    sections: [
      {
        id: "danchi",
        heading: "4つの大規模団地",
        blocks: [
          {
            type: "table",
            caption: "旭区の大規模団地（旭区大規模団地再生ビジョンの表から）",
            head: ["団地", "分譲・賃貸（戸数）", "開発の時期（設置者）"],
            rows: [
              ["若葉台団地", "分譲・賃貸など（6,302戸）", "昭和54年〜（神奈川県住宅供給公社）"],
              ["左近山団地", "分譲・賃貸（4,797戸）", "昭和43年〜（UR）"],
              ["ひかりが丘団地", "賃貸（2,325戸）", "昭和43年〜（横浜市）"],
              ["西ひかりが丘団地", "賃貸（961戸）", "昭和45年〜（UR）"],
            ],
            note: "区の資料では、4つの団地は、いずれも最寄りの駅まで15分以上かかる場所にあります（バスでの所要時間）。",
          },
          {
            type: "p",
            text: "賃貸の住戸の給湯器は、建物の設備として、UR・市・公社が取り替えるのが通常です。まず管理する窓口にご連絡ください。分譲の住戸は、管理組合の規約に沿って、ご自身で交換を手配することになります。規約で、機器の種類や工事の届け出が決められていないかを、先に確かめてください。",
          },
        ],
      },
      {
        id: "detached",
        heading: "起伏の多い住宅地の一戸建て",
        blocks: [
          {
            type: "p",
            text: "旭区プランは、区のほとんどが帷子川の流域で、起伏の多い複雑な地形で形成されている、と書いています。坂や階段の上の住まいでは、作業車から設置場所までの距離が長くなります。据置の給湯器やエコキュートのタンクを運ぶ経路は、現地調査で、段差と通路の幅を見て決めます。",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "若葉台団地の分譲の住戸です。交換を頼めますか。",
        a: "ご相談をお受けしています。分譲の団地は、管理組合の規約で、機器の種類や工事の届け出が決められていることがあるため、規約の内容を合わせてお知らせください。賃貸の住戸は、管理する窓口へのご連絡が先になります。",
      },
      {
        q: "旭区で、マンションからエコキュートに替えられますか。",
        a: "マンションでは、タンクとヒートポンプを置く場所が取れないことが多く、管理組合の承認も要ります。置けない場合は、同じ形のガス給湯器か、エコジョーズへの交換を考えます。",
      },
    ],
    sources: [
      { label: "横浜市都市計画マスタープラン 旭区プラン 3. まちづくりの方針", url: "https://www.city.yokohama.lg.jp/asahi/kurashi/machizukuri_kankyo/machizukuri/masterplan/toshi-master.files/3houshin.pdf" },
      { label: "横浜市旭区大規模団地再生ビジョン（平成30年9月）", url: "https://www.city.yokohama.lg.jp/asahi/kurashi/machizukuri_kankyo/machizukuri/danntisaiseivision.files/0002_20190130.pdf" },
    ],
    productFocus: {},
    nearby: ["seya", "izumi", "hodogaya", "totsuka"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "seya",
    name: "横浜市瀬谷区",
    shortName: "瀬谷区",
    kind: "ward",
    priority: "B",
    title: "瀬谷区の給湯器交換｜戸建てと低層の集合住宅が多い区",
    h1: "瀬谷区の給湯器交換",
    description:
      "横浜市瀬谷区の給湯器交換。一戸建てが52.6％、共同住宅のうち6階建て以上は14.4％と、低い建物の多い瀬谷区で、戸建てと低層の集合住宅の給湯器を替えるときの確認点をまとめました。",
    lead: "瀬谷区は、住宅の52.6％が一戸建てです。共同住宅も、6階建て以上の割合は14.4％で、横浜市の18区でもっとも低く、低い建物が中心の区です（令和5年住宅・土地統計調査）。",
    keyword: "瀬谷区 給湯器交換",
    secondaryKeywords: ["瀬谷区 給湯器", "横浜市瀬谷区 給湯器", "三ツ境 給湯器"],
    publishedAt: D,
    updatedAt: D,
    stats: {
      population: 120047,
      households: 54302,
      areaKm2: 17.17,
      detachedPercent: 52.6,
      apartmentPercent: 44.4,
      sixStoryPercent: 14.4,
      upTo1980Percent: 15.5,
      from2001Percent: 36.6,
      ownedPercent: 59.1,
      solarPercent: 3.4,
    },
    stations: ["瀬谷駅・三ツ境駅（相鉄本線）"],
    adjacentToTotsuka: false,
    coastal: false,
    sections: [
      {
        id: "town",
        heading: "台地に広がる、戸建てと低層の住宅地",
        blocks: [
          {
            type: "p",
            text: "瀬谷区プランは、瀬谷区の住宅市街地化は1950年代ごろから、台地の公営住宅などの住宅団地の開発で始まり、1970年代からは駅を中心に民間の住宅開発が南北へ広がった、と書いています。近年は、既にある住宅地のすき間を埋めるように、小規模な戸建ての開発が増えているとも書かれています。",
          },
          {
            type: "p",
            text: "低層のアパートや連続した住宅（長屋建て）では、給湯器が建物の外壁に並んで付いていることが多く、隣の住戸の給湯器との間隔や、排気が当たる向きを確かめて機種を選びます。瀬谷区は、長屋建ての住宅の割合が2.9％で、ほかの区より少し高い区です。",
          },
        ],
      },
      {
        id: "rental",
        heading: "借家の割合が35.3％",
        blocks: [
          {
            type: "p",
            text: "瀬谷区の住宅のうち、借家は35.3％です。借りている住まいの給湯器は、建物の設備なので、交換の判断と費用の負担は、貸主か管理会社が行うのが通常です。調子が悪いときは、まず貸主か管理会社にご連絡ください。貸主・管理会社からのご依頼もお受けしています。",
          },
          {
            type: "p",
            text: "賃貸の集合住宅のオーナーが、従来型の給湯器をエコジョーズに替える場合は、国の賃貸集合給湯省エネ2026事業の対象になることがあります。",
          },
          { type: "links", items: [{ href: "/subsidy/mirai-eco-jutaku", label: "エコジョーズが対象になる国の制度", note: "賃貸の集合住宅のオーナー向けの制度" }] },
        ],
      },
    ],
    faqs: [
      {
        q: "瀬谷区のアパートのオーナーです。何台かまとめて交換を頼めますか。",
        a: "ご相談をお受けしています。住戸ごとの設置の形と号数を確かめて、まとめてお見積もりをお出しします。賃貸集合給湯省エネ2026事業の対象になるかも、合わせて確かめます。",
      },
      {
        q: "瀬谷区は、戸塚区から遠いですか。",
        a: "瀬谷区は戸塚区とは隣り合っていませんが、泉区・旭区をはさんだ位置にあります。瀬谷区からのご相談もお受けしています。",
      },
    ],
    sources: [
      { label: "横浜市都市計画マスタープラン 瀬谷区プラン 1. 瀬谷区の概要", url: "https://www.city.yokohama.lg.jp/seya/kurashi/machizukuri_kankyo/machizukuri/masterplan/mplan.files/0005_20181119.pdf" },
      { label: "横浜市都市計画マスタープラン 瀬谷区プラン 2. 瀬谷区の現状", url: "https://www.city.yokohama.lg.jp/seya/kurashi/machizukuri_kankyo/machizukuri/masterplan/mplan.files/0006_20181119.pdf" },
    ],
    productFocus: { housing: "detached" },
    nearby: ["izumi", "asahi"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "hodogaya",
    name: "横浜市保土ケ谷区",
    shortName: "保土ケ谷区",
    kind: "ward",
    priority: "B",
    title: "保土ケ谷区の給湯器交換｜坂の多い住宅地での搬入と設置",
    h1: "保土ケ谷区の給湯器交換",
    description:
      "横浜市保土ケ谷区の給湯器交換。低地と丘陵の標高差が30〜50メートルに達する起伏の多い区で、坂の上の一戸建てと、工場跡地の中高層マンションの給湯器を替えるときの確認点をまとめました。",
    lead: "保土ケ谷区は、帷子川と今井川に沿った低地と、それを囲む丘陵からなる、起伏の非常に多い区です。区プランによると、低地と丘陵の標高差は30〜50メートルに達します。住宅の61.9％は共同住宅です。",
    keyword: "保土ケ谷区 給湯器交換",
    secondaryKeywords: ["保土ケ谷区 給湯器", "横浜市保土ケ谷区 給湯器", "星川 給湯器"],
    publishedAt: D,
    updatedAt: D,
    stats: {
      population: 203618,
      households: 100723,
      areaKm2: 21.93,
      detachedPercent: 37.5,
      apartmentPercent: 61.9,
      sixStoryPercent: 44.3,
      upTo1980Percent: 17.1,
      from2001Percent: 34.5,
      ownedPercent: 58.0,
      solarPercent: 2.4,
    },
    stations: ["天王町駅・星川駅・和田町駅・上星川駅・西谷駅（相鉄本線）", "保土ケ谷駅（JR）"],
    adjacentToTotsuka: true,
    coastal: false,
    sections: [
      {
        id: "slope",
        heading: "坂の上の住まいでは、運び込む道筋から考える",
        blocks: [
          {
            type: "p",
            text: "保土ケ谷区の概要には、起伏に富んだ地形で山坂が多く、最も高い今井町は海抜97.0メートル、最も低い天王町は海抜0.1メートルとあります。丘陵の住宅地の開発は、横浜市の中では比較的早く、大正期に桜ケ丘の近くで始まりました（区プラン）。",
          },
          {
            type: "p",
            text: "階段や急な坂の上にある家では、給湯器を運び込む手段と人数が変わります。壁掛のガス給湯器は人の手で運べる大きさですが、エコキュートのタンクは背が高く、通路の幅と曲がり角で運べるかが決まります。坂の上の家で機種を替えるときは、現地調査で運び込む道筋を先に確かめます。",
          },
        ],
      },
      {
        id: "mansion",
        heading: "工場跡地のマンションと、古い団地",
        blocks: [
          {
            type: "p",
            text: "区プランは、工場跡地の再開発で、低地に業務ビルや中高層住宅が次々と建てられたこと、大規模団地の中には、築30年以上で今後の建て替えが見込まれるものもあることを書いています。横浜市の団地の一覧には、千丸台団地（1963年・賃貸）、くぬぎ台（1971年・賃貸）、天王町（1977年・賃貸）が載っています。",
          },
          {
            type: "p",
            text: "中高層のマンションでは、給湯器はパイプスペースに収まっていることが多く、交換できる機種は扉の内側の寸法と排気の形で決まります。いまの給湯器の型番が分かれば、同じ場所に収まる機種をお調べできます。",
          },
          { type: "links", items: [{ href: "/products?housing=apartment", label: "マンション向けの機種を見る", note: "パイプスペースに収まる形の給湯器" }] },
        ],
      },
    ],
    faqs: [
      {
        q: "階段の上の家で、車が家の前まで入れません。交換できますか。",
        a: "壁掛のガス給湯器は、人の手で運んで交換できることが多いです。作業車を止める場所と運ぶ道筋を、現地調査で確かめてから、工事の段取りをお伝えします。",
      },
      {
        q: "保土ケ谷区のマンションで、号数を上げられますか。",
        a: "パイプスペースの寸法と、ガスのメーターや配管が、大きい号数に対応しているかで決まります。管理組合の規約で機器が決められていることもあるので、合わせて確かめます。",
      },
    ],
    sources: [
      { label: "保土ケ谷区「区の地勢」", url: "https://www.city.yokohama.lg.jp/hodogaya/shokai/gaiyo/ichi_chisei/tisei.html" },
      { label: "横浜市都市計画マスタープラン 保土ケ谷区プラン「保土ケ谷区まちづくり計画」", url: "https://www.city.yokohama.lg.jp/hodogaya/kurashi/machizukuri_kankyo/machizukuri/keikaku/plan.files/0009_20190305.pdf" },
      DANCHI_LIST,
    ],
    productFocus: { housing: "apartment" },
    nearby: ["totsuka", "asahi", "minami"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "minami",
    name: "横浜市南区",
    shortName: "南区",
    kind: "ward",
    priority: "B",
    title: "南区の給湯器交換｜集合住宅が64％の区で確かめること",
    h1: "南区の給湯器交換",
    description:
      "横浜市南区の給湯器交換。南区は住宅の64.0％が共同住宅で、借家も40.2％と多い区です。マンションのパイプスペースの給湯器、賃貸の住まい、築年数の長い一戸建てで、交換の前に確かめることをまとめました。",
    lead: "南区は、住宅の64.0％が共同住宅で、共同住宅のうち6階建て以上が52.9％を占めます（令和5年住宅・土地統計調査）。区プランによると、住宅系の土地利用の割合は18区でもっとも高く、平地から丘陵まで区の全体に住宅が広がっています。",
    keyword: "南区 給湯器交換",
    secondaryKeywords: ["南区 給湯器", "横浜市南区 給湯器", "弘明寺 給湯器"],
    publishedAt: D,
    updatedAt: D,
    stats: {
      population: 198987,
      households: 110044,
      areaKm2: 12.65,
      detachedPercent: 34.9,
      apartmentPercent: 64.0,
      sixStoryPercent: 52.9,
      upTo1980Percent: 16.3,
      from2001Percent: 40.6,
      ownedPercent: 55.0,
      solarPercent: 1.5,
    },
    stations: ["黄金町駅・南太田駅・井土ヶ谷駅・弘明寺駅（京急本線）", "阪東橋駅・吉野町駅・蒔田駅・弘明寺駅（市営地下鉄ブルーライン）"],
    adjacentToTotsuka: true,
    coastal: false,
    sections: [
      {
        id: "mansion",
        heading: "マンションの給湯器は、扉の中の寸法で機種が決まる",
        blocks: [
          {
            type: "p",
            text: "南区の住まいの多くは、集合住宅です。マンションの給湯器は、玄関の横の扉の中（パイプスペース）か、廊下やベランダの壁に付いていることが多く、交換できるのは、その場所の寸法と排気の形に合う機種です。扉の内側に収める形と、扉の無いくぼみに付ける形では、同じ号数でも型番が違います。",
          },
          {
            type: "p",
            text: "エコジョーズに替える場合は、ドレン水の流し先が必要です。マンションでは流し先が限られ、管理組合の決まりがあることもあります。流し先が取れないときは、従来型のガス給湯器のまま替える、という判断もあります。",
          },
          { type: "links", items: [{ href: "/guide/apartment", label: "マンションの給湯器交換で確かめること", note: "管理規約・届け出・ドレン排水" }] },
        ],
      },
      {
        id: "rental",
        heading: "借家が40.2％。賃貸の住まいは、まず貸主へ",
        blocks: [
          {
            type: "p",
            text: "南区の住宅のうち、借家は40.2％で、このサイトで比べている10区の中でもっとも高い割合です。給湯器は建物の設備なので、借りている住まいでは、交換の判断と費用の負担は、貸主か管理会社が行うのが通常です。調子が悪いときは、まず貸主か管理会社にご連絡ください。",
          },
        ],
      },
      {
        id: "detached",
        heading: "築年数の長い一戸建て",
        blocks: [
          {
            type: "p",
            text: "区プランには、区内の戸建て住宅の平均の築年数は45年、と書かれています（平成31年の区プランの時点）。1960年ごろからの住宅団地ブームで、永田・六ツ川・大岡など区の南西部の開発が行われたことも書かれています。築年数の長い家では、給湯器と一緒に、つなぎの配管の傷みも確かめます。",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "南区の分譲マンションです。エコジョーズに替えられますか。",
        a: "ドレン水の流し先が取れれば替えられます。流し先は、マンションの構造と管理組合の決まりで変わるので、現地調査で確かめます。取れない場合は、同じ形の従来型の給湯器に替えます。",
      },
      {
        q: "賃貸に住んでいます。自分で業者を呼んでもよいですか。",
        a: "給湯器は建物の設備なので、まず貸主か管理会社にご連絡ください。貸主の承諾なく交換すると、費用の負担や原状回復で問題になることがあります。",
      },
    ],
    sources: [{ label: "横浜市都市計画マスタープラン 南区プラン 2. 南区の現状", url: "https://www.city.yokohama.lg.jp/minami/kurashi/machizukuri_kankyo/machizukuri/52kumasu.files/0052_20190121.pdf" }, DANCHI_LIST],
    productFocus: { housing: "apartment" },
    nearby: ["konan", "hodogaya", "isogo", "totsuka"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "isogo",
    name: "横浜市磯子区",
    shortName: "磯子区",
    kind: "ward",
    priority: "B",
    title: "磯子区の給湯器交換｜洋光台・汐見台など丘陵の住宅地",
    h1: "磯子区の給湯器交換",
    description:
      "横浜市磯子区の給湯器交換。1980年以前に建てられた住宅が27.2％と、横浜市の中でも高い磯子区で、洋光台・汐見台などの丘陵の住宅地や、海に近い場所に給湯器を置くときの確認点をまとめました。",
    lead: "磯子区は、埋め立てでできた臨海部と、円海山を頂点とする丘陵部、その間の平地部からなる区です。住まいの多くは丘陵部と平地部にあり、1980年以前に建てられた住宅が27.2％と、横浜市の中でも高い割合です。",
    keyword: "磯子区 給湯器交換",
    secondaryKeywords: ["磯子区 給湯器", "横浜市磯子区 給湯器", "洋光台 給湯器"],
    publishedAt: D,
    updatedAt: D,
    stats: {
      population: 163522,
      households: 79351,
      areaKm2: 19.02,
      detachedPercent: 36.3,
      apartmentPercent: 62.7,
      sixStoryPercent: 37.3,
      upTo1980Percent: 27.2,
      from2001Percent: 32.3,
      ownedPercent: 63.8,
      solarPercent: 2.1,
    },
    stations: ["根岸駅・磯子駅・新杉田駅・洋光台駅（JR根岸線）", "屏風浦駅・杉田駅（京急本線）"],
    adjacentToTotsuka: false,
    coastal: true,
    sections: [
      {
        id: "town",
        heading: "根岸線の延伸とともに広がった住宅地",
        blocks: [
          {
            type: "p",
            text: "磯子区プランによると、昭和39年（1964年）から昭和48年（1973年）にかけて国鉄（現JR）根岸線が大船まで延びると、沿線の宅地造成が加速し、区の人口は昭和35年から昭和50年で2.1倍に増えました。区の歴史年表には、汐見台団地の入居開始が昭和38年5月、洋光台団地の入居開始が昭和45年6月とあります。",
          },
          {
            type: "p",
            text: "同じ時期に建てられた住宅地では、給湯器の交換の時期も重なります。入居のときから数えて何台目の給湯器か、いまの給湯器がいつ製造されたかは、本体のシールで確かめられます。",
          },
          { type: "links", items: [{ href: "/guide/model-label", label: "型番と製造年の調べ方", note: "本体のシール（銘板）の場所" }] },
        ],
      },
      {
        id: "sea",
        heading: "海に近い場所に置く給湯器",
        blocks: [
          {
            type: "p",
            text: "磯子区は海に面していますが、区プランでは、臨海部は昭和30年代以降に埋め立てられた工業地で、住宅地の多くは丘陵部と平地部にある、と整理されています。海の近くに屋外の機器を置く場合、メーカーは、潮風によるさびに備えた「耐塩害仕様」の機種を用意しています。どの仕様が要るかは、海からの距離などの設置の条件で、メーカーごとに目安が決められています。お住まいの場所に合う仕様を、機種を選ぶときに確かめます。",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "磯子区の洋光台の一戸建てです。古い給湯器と同じ型番の機種はありますか。",
        a: "古い型番の多くは、後継の機種に替わっています。設置の形・号数・機能が同じ後継の機種を選べば、ほとんどの場合、同じ場所に取り付けられます。型番のシールの写真をお送りください。",
      },
      {
        q: "海が見える高台の家です。耐塩害仕様は要りますか。",
        a: "メーカーの目安は、海からの距離や、潮風が直接当たるかどうかで決められています。機種ごとに目安が違うので、お住まいの場所と設置の向きを伺ってから、お答えします。",
      },
    ],
    sources: [
      { label: "横浜市都市計画マスタープラン 磯子区プラン「磯子区まちづくり方針」", url: "https://www.city.yokohama.lg.jp/isogo/kurashi/machizukuri_kankyo/machizukuri/toshimasu.files/0009_20181119.pdf" },
      { label: "磯子区 歴史年表", url: "https://www.city.yokohama.lg.jp/isogo/shokai/rekishi/nenpyo2.html" },
    ],
    productFocus: {},
    nearby: ["kanazawa", "konan", "minami", "sakae"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "kanazawa",
    name: "横浜市金沢区",
    shortName: "金沢区",
    kind: "ward",
    priority: "B",
    title: "金沢区の給湯器交換｜海と丘陵の住まいで確かめること",
    h1: "金沢区の給湯器交換",
    description:
      "横浜市金沢区の給湯器交換。東京湾に面し、区の大部分が起伏の激しい丘陵地の金沢区で、勾配の急な宅地、埋立地の金沢シーサイドタウン、海に近い場所での機種の選び方をまとめました。",
    lead: "金沢区は横浜市の南端にあり、東は東京湾に面しています。区の概要では、区の大部分は起伏の激しい丘陵地で、100メートル前後の山が入り組んだ地形です。海の近くの住まいと、丘の上の住まいでは、交換で確かめることが違います。",
    keyword: "金沢区 給湯器交換",
    secondaryKeywords: ["金沢区 給湯器", "横浜市金沢区 給湯器", "金沢文庫 給湯器"],
    publishedAt: D,
    updatedAt: D,
    stats: {
      population: 191530,
      households: 91124,
      areaKm2: 30.95,
      detachedPercent: 40.8,
      apartmentPercent: 57.2,
      sixStoryPercent: 36.9,
      upTo1980Percent: 17.8,
      from2001Percent: 33.0,
      ownedPercent: 65.0,
      solarPercent: 2.4,
    },
    stations: ["京急富岡駅・能見台駅・金沢文庫駅・金沢八景駅（京急本線）", "六浦駅（京急逗子線）"],
    adjacentToTotsuka: false,
    coastal: true,
    sections: [
      {
        id: "slope",
        heading: "勾配の急な宅地と、カーブの多い道",
        blocks: [
          {
            type: "p",
            text: "金沢区プランは、富岡西・長浜・六浦三丁目・柳町などの住宅地は、山や丘を大きく削らずに造成したため、宅地の勾配が急で、道路も元の地形の等高線の面影を残してカーブしたものが多い、と書いています。",
          },
          {
            type: "p",
            text: "こうした住宅地では、作業車を止める場所が限られ、給湯器を運ぶ距離が長くなることがあります。とくにエコキュートやハイブリッド給湯器に替える場合は、タンクを運び込む道筋と、置き場所の地面が平らかどうかを、現地調査で確かめます。",
          },
        ],
      },
      {
        id: "seaside",
        heading: "金沢シーサイドタウンと、海に近い住まい",
        blocks: [
          {
            type: "p",
            text: "横浜市の資料によると、金沢シーサイドタウン（並木1〜3丁目と、富岡東2丁目の一部）は、金沢臨海部の埋立地につくられた住宅地で、1978年に入居が始まり、およそ9,000世帯が暮らしています。集合住宅の給湯器は、住戸のパイプスペースやベランダに付いていることが多く、交換できる機種は設置の場所の寸法で決まります。",
          },
          {
            type: "p",
            text: "海の近くに屋外の機器を置く場合、メーカーは、潮風によるさびに備えた「耐塩害仕様」の機種を用意しています。どの仕様が要るかは、海からの距離などの条件で、メーカーごとに目安が決められています。お住まいの場所に合う仕様を、機種を選ぶときに確かめます。",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "金沢シーサイドタウンの住戸です。給湯器を替えるとき、管理組合への届け出は要りますか。",
        a: "管理組合の規約によります。工事の届け出や作業の時間、機器の種類が決められていることがあるため、先にご確認ください。賃貸の住戸は、管理する窓口へのご連絡が先になります。",
      },
      {
        q: "金沢区にも、現地調査に来てもらえますか。",
        a: "伺います。金沢区からのご相談もお受けしています。金沢区は、戸塚区とは隣り合っていませんが、栄区をはさんだ位置にあります。",
      },
    ],
    sources: [
      { label: "金沢区「位置・地勢」", url: "https://www.city.yokohama.lg.jp/kanazawa/shokai/gaiyo/2-3.html" },
      { label: "横浜市都市計画マスタープラン 金沢区プラン「金沢区まちづくり方針」", url: "https://www.city.yokohama.lg.jp/kanazawa/kurashi/machizukuri_kankyo/machizukuri/masterplan/kaiteikuplan.files/0004_20181102.pdf" },
      { label: "かなすた（横浜市金沢区）「金沢シーサイドタウン」", url: "https://kanasuta.city.yokohama.lg.jp/living/1018/" },
    ],
    productFocus: {},
    nearby: ["isogo", "sakae"],
  },
];

/** 公開する地域のページ */
export const publishedAreas: Area[] = areas;

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

/** 区のページ（市のページを除く） */
export function wardAreas(): Area[] {
  return areas.filter((a) => a.kind === "ward");
}
