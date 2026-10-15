import type { Brand } from "@/data/products/types";

/**
 * メーカー（商品カタログに載せるもの）。並びは、ガス給湯器・ハイブリッド → エコキュート の順。
 * summary は、メーカーの公式サイトで確かめられる事実だけ（「人気」「おすすめ」のような評価は書かない）。
 * imagePolicy は、公式サイトの利用条件で、製品写真の転載について確かめたこと（docs/IMAGE_SOURCES.md と同じ内容）。
 */
export const brands: Brand[] = [
  {
    id: "rinnai",
    name: "リンナイ",
    nameEn: "Rinnai",
    company: "リンナイ株式会社",
    url: "https://rinnai.jp/products/waterheater/",
    summary: "ガス給湯器（エコジョーズ・従来型）と、ハイブリッド給湯・暖房システム「ECO ONE（エコワン）」をつくっています。",
    categories: ["eco-jozu", "gas", "hybrid"],
    imagePolicy: {
      status: "pending",
      note: "公式サイトの写真は、承諾なしの複製・送信が禁止。販売店向けの会員サイト「Rinnai BiZ」に画像のダウンロードがあるが、利用は「当社商品の販売・取付工事・修理その他当社商品に関する業務」の範囲とされ、自社サイトへの掲載が含まれるかは書かれていない。製品データダウンロード（Sup-Ri-net）は、不特定多数への公開には連絡と許可が必要。リンナイに掲載の許可を確かめるまで、写真は載せない。",
      termsUrl: "https://www.rinnai.jp/site_policy/",
      checkedAt: "2026-10-14",
    },
  },
  {
    id: "noritz",
    name: "ノーリツ",
    nameEn: "NORITZ",
    company: "株式会社ノーリツ",
    url: "https://www.noritz.co.jp/product/kyutou_bath/gas/",
    summary: "ガス給湯器（エコジョーズ・従来型）と、ハイブリッド給湯システムをつくっています。",
    categories: ["eco-jozu", "gas", "hybrid"],
    imagePolicy: {
      status: "pending",
      note: "公式サイトの写真は、許諾なしの複製・営利目的の利用が禁止。会員サイト「お湯net」（ビジネスパートナー向け・無料）で製品画像をダウンロードできるが、自社サイトへの掲載の可否は公開ページでは確かめられなかった。ノーリツか、お湯net の利用条件で掲載を確かめるまで、写真は載せない。",
      termsUrl: "https://www.noritz.co.jp/policy/",
      checkedAt: "2026-10-14",
    },
  },
  {
    id: "paloma",
    name: "パロマ",
    nameEn: "Paloma",
    company: "株式会社パロマ",
    url: "https://www.paloma.co.jp/",
    summary: "ガス給湯器（エコジョーズ・従来型）と、ハイブリッドふろ給湯システムをつくっています。",
    categories: ["eco-jozu", "gas", "hybrid"],
    imagePolicy: {
      status: "pending",
      note: "製品画像は「製品仕様図 / 取扱説明書 / 工事説明書等ダウンロード」で、利用条件（販売促進目的の使用は可、複製・加工しての第三者提供は禁止）に同意して取得できる。ウェブサイトへの掲載が販売促進目的に含まれるかは明記がない。会員サイト「パロマほっとなび」にも画像ダウンロードがある（条件は非公開）。パロマに確かめるまで、写真は載せない。",
      termsUrl: "https://www.paloma.co.jp/downloads/index.html",
      checkedAt: "2026-10-14",
    },
  },
  {
    id: "mitsubishi",
    name: "三菱電機",
    nameEn: "MITSUBISHI ELECTRIC",
    company: "三菱電機株式会社",
    url: "https://www.mitsubishielectric.co.jp/home/ecocute/",
    summary: "エコキュート（家庭用ヒートポンプ給湯機）をつくっています。",
    categories: ["ecocute"],
    imagePolicy: {
      status: "pending",
      note: "公式サイトの情報は私用目的に限られ、それを越える使用は明示の許諾が必要。パートナーWeb「WIN2K」に製品画像があるが、利用規約の目的は建築設計・お客様への説明等で、自社サイトへの掲載を認める文言はない。三菱電機（または仕入先）に許諾を確かめるまで、写真は載せない。",
      termsUrl: "https://www.mitsubishielectric.co.jp/ja/terms/",
      checkedAt: "2026-10-14",
    },
  },
  {
    id: "panasonic",
    name: "パナソニック",
    nameEn: "Panasonic",
    company: "パナソニック株式会社",
    url: "https://sumai.panasonic.jp/hp/",
    summary: "エコキュート（家庭用ヒートポンプ給湯機）をつくっています。",
    categories: ["ecocute"],
    imagePolicy: {
      status: "pending",
      note: "公式サイト（sumai.panasonic.jp）の画像の転載は不可。販売店・工事店向けの「画像データ ダウンロード」の画像は、パナソニック製品を代理店等から仕入れて販売している場合に、改変しない・商品名を表示する・ロゴを使わない・自社の施工事例と誤認させない等の条件をすべて守れば、連絡なしでウェブサイトに掲載できる（許諾したものとみなす、と規約にある）。当社の仕入れの形を確かめたうえで、この仕組みの画像を条件どおりに使える。",
      termsUrl: "https://www2.panasonic.biz/jp/sumai/gazou/",
      checkedAt: "2026-10-14",
    },
  },
  {
    id: "daikin",
    name: "ダイキン",
    nameEn: "DAIKIN",
    company: "ダイキン工業株式会社",
    url: "https://www.daikinaircon.com/sumai/alldenka/ecocute/",
    summary: "エコキュート（家庭用ヒートポンプ給湯機）をつくっています。",
    categories: ["ecocute"],
    imagePolicy: {
      status: "pending",
      note: "公式サイトの情報は、文書による事前の許可がない限り使用禁止。販売店向けの「D-SEARCH」に製品画像があるが、利用目的にウェブサイトへの掲載が含まれるかは明記がない。ダイキンの販売会社に確かめるまで、写真は載せない。",
      termsUrl: "https://www.daikin.co.jp/policy",
      checkedAt: "2026-10-14",
    },
  },
  {
    id: "corona",
    name: "コロナ",
    nameEn: "CORONA",
    company: "株式会社コロナ",
    url: "https://www.corona.co.jp/eco/",
    summary: "エコキュート（家庭用ヒートポンプ給湯機）をつくっています。",
    categories: ["ecocute"],
    imagePolicy: {
      status: "pending",
      note: "公式サイトの情報は、許可なく複製・転載することが禁止。販売店向けに製品画像を配る仕組みは、公開ページでは見つからなかった。コロナの営業所に許可を取るまで、写真は載せない。",
      termsUrl: "https://www.corona.co.jp/website/index.html",
      checkedAt: "2026-10-14",
    },
  },
];
