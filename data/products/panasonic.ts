import type { ProductData } from "@/data/products/types";

/**
 * パナソニックの商品データ。2026-10-14 に、公式サイト・公式カタログで型番と仕様を確かめたもの。
 * 根拠のページは各商品の sources。調査のしかたと記録は docs/PRODUCT_DATA.md。
 * 当社の価格（salesPrice など）は、会社から金額を受け取るまで null（画面では「お見積もり」）。
 * 製品写真の記録は data/products/images.json（ここには書かない）。
 */
export const panasonicProducts: ProductData[] = [
  {
    "id": "panasonic-he-j37nqs",
    "slug": "he-j37nqs",
    "brand": "panasonic",
    "category": "ecocute",
    "series": "J シリーズ（2026年度モデル）ミドル",
    "name": "Jシリーズ 高圧フルオート370L(HE-J37NQS)",
    "modelNumber": "HE-J37NQS",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "HE-J37NQ"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "HE-PJ45N"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（角型）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 370,
      "familySize": "3～5人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "高圧フルオート"
    },
    "specifications": [
      {
        "label": "給湯タイプ",
        "value": "フルオート"
      },
      {
        "label": "タイプ",
        "value": "高圧フルオート"
      },
      {
        "label": "設置区分",
        "value": "屋外用（貯湯ユニット）／屋外専用型（ヒートポンプユニット、運転使用範囲：-10℃～43℃）"
      },
      {
        "label": "仕向地",
        "value": "一般地"
      },
      {
        "label": "一般仕様／耐塩害仕様",
        "value": "一般仕様"
      },
      {
        "label": "タンク容量",
        "value": "370L"
      },
      {
        "label": "適用電力制度",
        "value": "時間帯別電灯／季節別時間帯別電灯 通電制御型／従量電灯"
      },
      {
        "label": "電源（相数／定格電圧（定格周波数））",
        "value": "単相200V（50/60Hz）"
      },
      {
        "label": "最大電流",
        "value": "16.0A"
      },
      {
        "label": "年間給湯保温効率（JIS C 9220:2018）",
        "value": "3.7（ふろ熱回収有）／3.6（ふろ熱回収無）"
      },
      {
        "label": "区分名（2025年目標年度省エネ基準）",
        "value": "E"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "105%"
      },
      {
        "label": "沸き上げ温度範囲",
        "value": "約65～約90℃"
      },
      {
        "label": "給湯温度",
        "value": "水、32、35、38～47、50、55、60℃（混合弁内蔵）"
      },
      {
        "label": "給湯圧力（減圧弁設定圧力）",
        "value": "180kPa"
      },
      {
        "label": "最高使用圧力（逃し弁設定圧力）",
        "value": "220kPa"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "1810×600×680mm"
      },
      {
        "label": "貯湯ユニット 質量（満水時）",
        "value": "60kg（430kg）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "672×799（884）×299（332）mm（幅の内は配管カバー、奥行の内は吹出グリルを含む）"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "41kg"
      },
      {
        "label": "ヒートポンプユニット 運転音（A特性 音響パワーレベル）",
        "value": "中間期標準 50dB／冬期高温 55dB"
      },
      {
        "label": "中間期標準 加熱能力／消費電力",
        "value": "4.5kW／0.96kW"
      },
      {
        "label": "冬期高温 加熱能力／消費電力",
        "value": "4.5kW／1.50kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃"
      },
      {
        "label": "冷媒／充填量",
        "value": "R744（CO2）／0.69kg"
      },
      {
        "label": "本体カラー（外装塗装色）",
        "value": "アイボリー"
      },
      {
        "label": "図面の作成日付",
        "value": "2026年4月20日"
      }
    ],
    "remotes": [
      {
        "model": "HE-RQWNW",
        "note": "コミュニケーションリモコン（別売・リモコンは必要）。台所リモコン HE-RQWNM（無線LAN搭載）＋浴室リモコン HE-RQWNS"
      },
      {
        "model": "HE-RQVNZ",
        "note": "増設リモコン（別売）。「通話」機能はない"
      }
    ],
    "features": [
      "ウルトラファインバブル（ふろ・給湯）：目に見えないほど微細な泡を含んだお湯を、浴室・洗面・キッチンへ送る",
      "エコキュート専用アプリ「スマホでおふろ」（スマホ連携）：外出先からのお湯はり、別の部屋からの追いだき、旅行中の沸き上げ休止などをスマートフォンから操作",
      "ソーラーチャージ（太陽光の余剰電力の活用）：夜間の沸き上げ量を減らし、翌日の昼間に太陽光発電の余剰電力で沸き上げる。太陽光発電のメーカーは問わない。設定はアプリ／AiSEG3／リモコンのいずれか",
      "温浴セレクト：3つの温浴モード（湯温設定＋温浴タイマー）から選べる。ぬるくするときも水を足さずに設定温度まで下げる",
      "AIエコナビ：ひとセンサーが浴室への入室を検知して追いだきを始め、入浴していないときのふろ自動保温のムダを抑える",
      "ぬくもりチャージ：入浴後のおふろの残り湯の「熱」をタンクに戻し、夜間の沸き上げを節約する（年間給湯保温効率の高いほうの値は、この機能を使って測った値）",
      "うっかりアシスト：お湯はり時に浴そう栓を閉め忘れると、早めに知らせてお湯はりを止める",
      "おまかせ配管キレイ除菌：おふろのお湯を抜くたびに、タンクのお湯でふろ配管を自動で洗う。キレイキープコート、ステンレス配管（一部銅管）",
      "無線LAN搭載コミュニケーションリモコン（台所リモコン）。ECHONET Lite AIF認証対応／AiSEG3対応",
      "非常用取水栓を標準装備：断水時にタンク内の湯水を生活用水として取り出せる。停電時もシャワーや蛇口からお湯が使える（湯温の調節はできない）。アプリの「エマージェンシー沸き上げ」は、選んだ気象警報・注意報が出ると自動で沸き上げる",
      "4本脚 耐震設計技術・真空断熱材。角型モデル 370L の貯湯ユニットは耐震クラスS対応",
      "給湯圧力は高圧（減圧弁設定圧力 180kPa）"
    ],
    "cautions": [
      "一般地向け。寒冷地及び最低気温が-10℃を下まわる地域では、機器が正常に動作しなくなる恐れがあるので据え付けない",
      "海浜地区で潮風が直接当たる場所や温泉地帯など特殊な場所では据え付けない",
      "時間帯別電灯・季節別時間帯別電灯の契約専用のタイプ。適用できる電力の制度や通電制御の割引は電気料金のプランで異なるため、契約している電力会社に確かめる",
      "「スマホでおふろ」の利用には、スマートフォン、インターネット回線、外部接続機器（市販の無線LANルーター）、お客様による設定が必要。無線LANルーターは 2.4GHz 帯で接続する",
      "ソーラーチャージは、太陽光発電システムを設置していない家庭で設定すると電気料金が増える。余剰電力はモニタリングしておらず、実際の日射量が予報と違うと買電する場合がある",
      "停電時は、ふろ自動・追いだき、タンクの沸き上げ等はできない。集合住宅等でポンプ給水の場合はお湯が出ない。非常用取水栓の湯水の飲用は避ける。非常用取水栓だけではタンクの湯水をすべては取り出せない",
      "耐塩害仕様（HE-J37NQES）は受注生産。納期は受注後約60営業日、状況によっては約90営業日前後かかる場合がある"
    ],
    "manufacturerUrl": "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_fa_jn_370",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "HE-J37NQS",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_fa_jn_370",
      "https://sumai.panasonic.jp/hp/lineup/",
      "https://www2.panasonic.biz/scvb/a2A/zumenResult.G01?multiHinban=HE-J37NQS&SEARCH_FLG=0&SEARCH_KBN=2&KEY_SELECT=1&SRCD_GRP=SJSZ%2CSJTA%2CSJTB",
      "https://www2.panasonic.biz/ideacontout/2026/10/01/2026100100200158.PDF",
      "https://esctlg.panasonic.biz/link/cgi-bin/openCatalog.cgi?catalogId=ZBCT1B397M",
      "https://sumai.panasonic.jp/hp/lp-hojokin/",
      "https://sumai.panasonic.jp/hp/lp-hojokin/pdf/eco_hojyokin_2605.pdf",
      "https://sumai.panasonic.jp/hp/2point/index.html",
      "https://sumai.panasonic.jp/hp/feature/2_25.html",
      "https://sumai.panasonic.jp/hp/feature/app/",
      "https://sumai.panasonic.jp/hp/hijouji.html",
      "https://sumai.panasonic.jp/hp/2point/2_21.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=HE-J37NQS",
      "https://sumai.panasonic.jp/hp/lineup/product.php?id=engai_fa_jn_370"
    ]
  },
  {
    "id": "panasonic-he-j46nqs",
    "slug": "he-j46nqs",
    "brand": "panasonic",
    "category": "ecocute",
    "series": "J シリーズ（2026年度モデル）ミドル",
    "name": "Jシリーズ 高圧フルオート460L(HE-J46NQS)",
    "modelNumber": "HE-J46NQS",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "HE-J46NQ"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "HE-PJ60N"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（角型）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 460,
      "familySize": "4～7人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "高圧フルオート"
    },
    "specifications": [
      {
        "label": "給湯タイプ",
        "value": "フルオート"
      },
      {
        "label": "タイプ",
        "value": "高圧フルオート"
      },
      {
        "label": "設置区分",
        "value": "屋外用（貯湯ユニット）／屋外専用型（ヒートポンプユニット、運転使用範囲：-10℃～43℃）"
      },
      {
        "label": "仕向地",
        "value": "一般地"
      },
      {
        "label": "一般仕様／耐塩害仕様",
        "value": "一般仕様"
      },
      {
        "label": "タンク容量",
        "value": "460L"
      },
      {
        "label": "適用電力制度",
        "value": "時間帯別電灯／季節別時間帯別電灯 通電制御型／従量電灯"
      },
      {
        "label": "電源（相数／定格電圧（定格周波数））",
        "value": "単相200V（50/60Hz）"
      },
      {
        "label": "最大電流",
        "value": "16.0A"
      },
      {
        "label": "年間給湯保温効率（JIS C 9220:2018）",
        "value": "3.7（ふろ熱回収有）／3.6（ふろ熱回収無）"
      },
      {
        "label": "区分名（2025年目標年度省エネ基準）",
        "value": "E"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "105%"
      },
      {
        "label": "沸き上げ温度範囲",
        "value": "約65～約90℃"
      },
      {
        "label": "給湯温度",
        "value": "水、32、35、38～47、50、55、60℃（混合弁内蔵）"
      },
      {
        "label": "給湯圧力（減圧弁設定圧力）",
        "value": "180kPa"
      },
      {
        "label": "最高使用圧力（逃し弁設定圧力）",
        "value": "220kPa"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "2170×600×680mm"
      },
      {
        "label": "貯湯ユニット 質量（満水時）",
        "value": "68kg（528kg）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "672×799（884）×299（332）mm（幅の内は配管カバー、奥行の内は吹出グリルを含む）"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "41kg"
      },
      {
        "label": "ヒートポンプユニット 運転音（A特性 音響パワーレベル）",
        "value": "中間期標準 54dB／冬期高温 57dB"
      },
      {
        "label": "中間期標準 加熱能力／消費電力",
        "value": "6.0kW／1.33kW"
      },
      {
        "label": "冬期高温 加熱能力／消費電力",
        "value": "6.0kW／2.00kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃"
      },
      {
        "label": "冷媒／充填量",
        "value": "R744（CO2）／0.69kg"
      },
      {
        "label": "本体カラー（外装塗装色）",
        "value": "アイボリー"
      },
      {
        "label": "図面の作成日付",
        "value": "2026年4月20日"
      }
    ],
    "remotes": [
      {
        "model": "HE-RQWNW",
        "note": "コミュニケーションリモコン（別売・リモコンは必要）。台所リモコン HE-RQWNM（無線LAN搭載）＋浴室リモコン HE-RQWNS"
      },
      {
        "model": "HE-RQVNZ",
        "note": "増設リモコン（別売）。「通話」機能はない"
      }
    ],
    "features": [
      "ウルトラファインバブル（ふろ・給湯）：目に見えないほど微細な泡を含んだお湯を、浴室・洗面・キッチンへ送る",
      "エコキュート専用アプリ「スマホでおふろ」（スマホ連携）：外出先からのお湯はり、別の部屋からの追いだき、旅行中の沸き上げ休止などをスマートフォンから操作",
      "ソーラーチャージ（太陽光の余剰電力の活用）：夜間の沸き上げ量を減らし、翌日の昼間に太陽光発電の余剰電力で沸き上げる。太陽光発電のメーカーは問わない。設定はアプリ／AiSEG3／リモコンのいずれか",
      "温浴セレクト：3つの温浴モード（湯温設定＋温浴タイマー）から選べる。ぬるくするときも水を足さずに設定温度まで下げる",
      "AIエコナビ：ひとセンサーが浴室への入室を検知して追いだきを始め、入浴していないときのふろ自動保温のムダを抑える",
      "ぬくもりチャージ：入浴後のおふろの残り湯の「熱」をタンクに戻し、夜間の沸き上げを節約する（年間給湯保温効率の高いほうの値は、この機能を使って測った値）",
      "うっかりアシスト：お湯はり時に浴そう栓を閉め忘れると、早めに知らせてお湯はりを止める",
      "おまかせ配管キレイ除菌：おふろのお湯を抜くたびに、タンクのお湯でふろ配管を自動で洗う。キレイキープコート、ステンレス配管（一部銅管）",
      "無線LAN搭載コミュニケーションリモコン（台所リモコン）。ECHONET Lite AIF認証対応／AiSEG3対応",
      "非常用取水栓を標準装備：断水時にタンク内の湯水を生活用水として取り出せる。停電時もシャワーや蛇口からお湯が使える（湯温の調節はできない）。アプリの「エマージェンシー沸き上げ」は、選んだ気象警報・注意報が出ると自動で沸き上げる",
      "4本脚 耐震設計技術・真空断熱材。耐震クラスS対応は角型 370L などで、460L の貯湯ユニットは耐震クラスA",
      "給湯圧力は高圧（減圧弁設定圧力 180kPa）"
    ],
    "cautions": [
      "一般地向け。寒冷地及び最低気温が-10℃を下まわる地域では、機器が正常に動作しなくなる恐れがあるので据え付けない",
      "海浜地区で潮風が直接当たる場所や温泉地帯など特殊な場所では据え付けない",
      "時間帯別電灯・季節別時間帯別電灯の契約専用のタイプ。適用できる電力の制度や通電制御の割引は電気料金のプランで異なるため、契約している電力会社に確かめる",
      "「スマホでおふろ」の利用には、スマートフォン、インターネット回線、外部接続機器（市販の無線LANルーター）、お客様による設定が必要。無線LANルーターは 2.4GHz 帯で接続する",
      "ソーラーチャージは、太陽光発電システムを設置していない家庭で設定すると電気料金が増える。余剰電力はモニタリングしておらず、実際の日射量が予報と違うと買電する場合がある",
      "停電時は、ふろ自動・追いだき、タンクの沸き上げ等はできない。集合住宅等でポンプ給水の場合はお湯が出ない。非常用取水栓の湯水の飲用は避ける。非常用取水栓だけではタンクの湯水をすべては取り出せない",
      "耐塩害仕様（HE-J46NQES）は受注生産。納期は受注後約60営業日、状況によっては約90営業日前後かかる場合がある"
    ],
    "manufacturerUrl": "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_fa_jn_460",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "HE-J46NQS",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_fa_jn_460",
      "https://sumai.panasonic.jp/hp/lineup/",
      "https://www2.panasonic.biz/scvb/a2A/zumenResult.G01?multiHinban=HE-J46NQS&SEARCH_FLG=0&SEARCH_KBN=2&KEY_SELECT=1&SRCD_GRP=SJSZ%2CSJTA%2CSJTB",
      "https://www2.panasonic.biz/ideacontout/2026/10/01/2026100100200145.PDF",
      "https://esctlg.panasonic.biz/link/cgi-bin/openCatalog.cgi?catalogId=ZBCT1B397M",
      "https://sumai.panasonic.jp/hp/lp-hojokin/",
      "https://sumai.panasonic.jp/hp/lp-hojokin/pdf/eco_hojyokin_2605.pdf",
      "https://sumai.panasonic.jp/hp/2point/index.html",
      "https://sumai.panasonic.jp/hp/feature/2_25.html",
      "https://sumai.panasonic.jp/hp/feature/app/",
      "https://sumai.panasonic.jp/hp/hijouji.html",
      "https://sumai.panasonic.jp/hp/2point/2_21.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=HE-J46NQS",
      "https://sumai.panasonic.jp/hp/lineup/product.php?id=engai_fa_jn_460"
    ]
  },
  {
    "id": "panasonic-he-ju37nqs",
    "slug": "he-ju37nqs",
    "brand": "panasonic",
    "category": "ecocute",
    "series": "J シリーズ（2026年度モデル）ミドル",
    "name": "Jシリーズ ウルトラ高圧フルオート370L(HE-JU37NQS)",
    "modelNumber": "HE-JU37NQS",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "HE-JU37NQ"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "HE-PJU45N"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（角型）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 370,
      "familySize": "3～5人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "ウルトラ高圧フルオート"
    },
    "specifications": [
      {
        "label": "給湯タイプ",
        "value": "フルオート"
      },
      {
        "label": "タイプ",
        "value": "ウルトラ高圧フルオート"
      },
      {
        "label": "設置区分",
        "value": "屋外用（貯湯ユニット）／屋外専用型（ヒートポンプユニット、運転使用範囲：-10℃～43℃）"
      },
      {
        "label": "仕向地",
        "value": "一般地"
      },
      {
        "label": "一般仕様／耐塩害仕様",
        "value": "一般仕様"
      },
      {
        "label": "タンク容量",
        "value": "370L"
      },
      {
        "label": "適用電力制度",
        "value": "時間帯別電灯／季節別時間帯別電灯 通電制御型／従量電灯"
      },
      {
        "label": "電源（相数／定格電圧（定格周波数））",
        "value": "単相200V（50/60Hz）"
      },
      {
        "label": "最大電流",
        "value": "16.0A"
      },
      {
        "label": "年間給湯保温効率（JIS C 9220:2018）",
        "value": "3.7（ふろ熱回収有）／3.6（ふろ熱回収無）"
      },
      {
        "label": "区分名（2025年目標年度省エネ基準）",
        "value": "E"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "105%"
      },
      {
        "label": "沸き上げ温度範囲",
        "value": "約65～約90℃"
      },
      {
        "label": "給湯温度",
        "value": "水、32、35、38～47、50、55、60℃（混合弁内蔵）"
      },
      {
        "label": "給湯圧力（減圧弁設定圧力）",
        "value": "325kPa"
      },
      {
        "label": "最高使用圧力（逃し弁設定圧力）",
        "value": "370kPa"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "1810×600×680mm"
      },
      {
        "label": "貯湯ユニット 質量（満水時）",
        "value": "66kg（436kg）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "672×799（884）×299（332）mm（幅の内は配管カバー、奥行の内は吹出グリルを含む）"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "41kg"
      },
      {
        "label": "ヒートポンプユニット 運転音（A特性 音響パワーレベル）",
        "value": "中間期標準 50dB／冬期高温 55dB"
      },
      {
        "label": "中間期標準 加熱能力／消費電力",
        "value": "4.5kW／0.96kW"
      },
      {
        "label": "冬期高温 加熱能力／消費電力",
        "value": "4.5kW／1.50kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃"
      },
      {
        "label": "冷媒／充填量",
        "value": "R744（CO2）／0.69kg"
      },
      {
        "label": "本体カラー（外装塗装色）",
        "value": "ウォームシルバー"
      },
      {
        "label": "図面の作成日付",
        "value": "2026年4月20日"
      }
    ],
    "remotes": [
      {
        "model": "HE-RQWNW",
        "note": "コミュニケーションリモコン（別売・リモコンは必要）。台所リモコン HE-RQWNM（無線LAN搭載）＋浴室リモコン HE-RQWNS"
      },
      {
        "model": "HE-RQVNZ",
        "note": "増設リモコン（別売）。「通話」機能はない"
      }
    ],
    "features": [
      "ウルトラ高圧：減圧弁設定圧力 325kPa（高圧フルオートは 180kPa）。「1階はもちろん2階、3階のおふろやシャワーも快適」とメーカーが説明",
      "ウルトラファインバブル（ふろ・給湯）：目に見えないほど微細な泡を含んだお湯を、浴室・洗面・キッチンへ送る",
      "エコキュート専用アプリ「スマホでおふろ」（スマホ連携）：外出先からのお湯はり、別の部屋からの追いだき、旅行中の沸き上げ休止などをスマートフォンから操作",
      "ソーラーチャージ（太陽光の余剰電力の活用）：夜間の沸き上げ量を減らし、翌日の昼間に太陽光発電の余剰電力で沸き上げる。太陽光発電のメーカーは問わない。設定はアプリ／AiSEG3／リモコンのいずれか",
      "温浴セレクト：3つの温浴モード（湯温設定＋温浴タイマー）から選べる。ぬるくするときも水を足さずに設定温度まで下げる",
      "AIエコナビ：ひとセンサーが浴室への入室を検知して追いだきを始め、入浴していないときのふろ自動保温のムダを抑える",
      "ぬくもりチャージ：入浴後のおふろの残り湯の「熱」をタンクに戻し、夜間の沸き上げを節約する（年間給湯保温効率の高いほうの値は、この機能を使って測った値）",
      "うっかりアシスト：お湯はり時に浴そう栓を閉め忘れると、早めに知らせてお湯はりを止める",
      "おそうじ浴槽連携（ウルトラ高圧フルオートのみ）：（株）LIXIL製おそうじ浴槽と連携し、お湯はり時に浴槽栓を自動で閉める（対応するシステムバスは 2026年11月より順次発売とメーカーが案内）",
      "おまかせ配管キレイ除菌：おふろのお湯を抜くたびに、タンクのお湯でふろ配管を自動で洗う。キレイキープコート、ステンレス配管（一部銅管）",
      "無線LAN搭載コミュニケーションリモコン（台所リモコン）。ECHONET Lite AIF認証対応／AiSEG3対応",
      "非常用取水栓を標準装備：断水時にタンク内の湯水を生活用水として取り出せる。停電時もシャワーや蛇口からお湯が使える（湯温の調節はできない）。アプリの「エマージェンシー沸き上げ」は、選んだ気象警報・注意報が出ると自動で沸き上げる",
      "4本脚 耐震設計技術・真空断熱材。角型モデル 370L の貯湯ユニットは耐震クラスS対応"
    ],
    "cautions": [
      "一般地向け。寒冷地及び最低気温が-10℃を下まわる地域では、機器が正常に動作しなくなる恐れがあるので据え付けない",
      "海浜地区で潮風が直接当たる場所や温泉地帯など特殊な場所では据え付けない",
      "時間帯別電灯・季節別時間帯別電灯の契約専用のタイプ。適用できる電力の制度や通電制御の割引は電気料金のプランで異なるため、契約している電力会社に確かめる",
      "「スマホでおふろ」の利用には、スマートフォン、インターネット回線、外部接続機器（市販の無線LANルーター）、お客様による設定が必要。無線LANルーターは 2.4GHz 帯で接続する",
      "ソーラーチャージは、太陽光発電システムを設置していない家庭で設定すると電気料金が増える。余剰電力はモニタリングしておらず、実際の日射量が予報と違うと買電する場合がある",
      "停電時は、ふろ自動・追いだき、タンクの沸き上げ等はできない。集合住宅等でポンプ給水の場合はお湯が出ない。非常用取水栓の湯水の飲用は避ける。非常用取水栓だけではタンクの湯水をすべては取り出せない",
      "給水圧力が低いと十分な性能が得られないことがある。メーカーのシャワー流量の比較条件は「給水元圧：高圧・パワフル高圧300kPa／ウルトラ高圧400kPa」",
      "J シリーズのウルトラ高圧フルオートに耐塩害仕様は無い（耐塩害仕様の J シリーズは高圧フルオートと給湯専用）"
    ],
    "manufacturerUrl": "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_uk_jun_370",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "HE-JU37NQS",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_uk_jun_370",
      "https://sumai.panasonic.jp/hp/lineup/",
      "https://www2.panasonic.biz/scvb/a2A/zumenResult.G01?multiHinban=HE-JU37NQS&SEARCH_FLG=0&SEARCH_KBN=2&KEY_SELECT=1&SRCD_GRP=SJSZ%2CSJTA%2CSJTB",
      "https://www2.panasonic.biz/ideacontout/2026/10/01/2026100100200157.PDF",
      "https://esctlg.panasonic.biz/link/cgi-bin/openCatalog.cgi?catalogId=ZBCT1B397M",
      "https://sumai.panasonic.jp/hp/lp-hojokin/",
      "https://sumai.panasonic.jp/hp/lp-hojokin/pdf/eco_hojyokin_2605.pdf",
      "https://sumai.panasonic.jp/hp/2point/index.html",
      "https://sumai.panasonic.jp/hp/feature/2_25.html",
      "https://sumai.panasonic.jp/hp/feature/app/",
      "https://sumai.panasonic.jp/hp/hijouji.html",
      "https://sumai.panasonic.jp/hp/2point/2_21.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=HE-JU37NQS"
    ]
  },
  {
    "id": "panasonic-he-w37lqs",
    "slug": "he-w37lqs",
    "brand": "panasonic",
    "category": "ecocute",
    "series": "W シリーズ（2024年度モデル）ミドル 薄型",
    "name": "W シリーズ 薄型 高圧フルオート370L（HE-W37LQS）",
    "modelNumber": "HE-W37LQS",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "HE-W37LQ"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "HE-PW45L"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（薄型）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 370,
      "familySize": "3～5人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "薄型 高圧フルオート"
    },
    "specifications": [
      {
        "label": "タイプ",
        "value": "薄型 高圧フルオート"
      },
      {
        "label": "設置場所",
        "value": "屋外設置用"
      },
      {
        "label": "タンク容量",
        "value": "370L"
      },
      {
        "label": "タンクの構成",
        "value": "370（185L×2タンク）"
      },
      {
        "label": "適用電力制度",
        "value": "時間帯別電灯/季節別時間帯別電灯 通電制御型"
      },
      {
        "label": "電源（相数/定格電圧/周波数）",
        "value": "単相200V 50/60Hz"
      },
      {
        "label": "最大電流",
        "value": "16A"
      },
      {
        "label": "年間給湯保温効率（JIS）",
        "value": "3.0"
      },
      {
        "label": "区分名（2025年目標年度省エネ基準）",
        "value": "I"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100%"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65～約90℃"
      },
      {
        "label": "給湯圧力（減圧弁設定圧力）",
        "value": "180kPa"
      },
      {
        "label": "水側最高使用圧力",
        "value": "220kPa"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "1843×1078×440mm"
      },
      {
        "label": "貯湯ユニット 質量/満水時",
        "value": "80/450kg"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "672×799（867）×299（332）mm（幅の内は配管カバー、奥行の内は吹出グリルを含む）"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "41kg"
      },
      {
        "label": "ヒートポンプユニット 運転音（音響パワーレベル）中間期/冬期",
        "value": "50dB/55dB"
      },
      {
        "label": "中間期標準加熱能力/消費電力",
        "value": "4.5kW/0.960kW"
      },
      {
        "label": "冬期高温加熱能力/消費電力",
        "value": "4.5kW/1.50kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃"
      },
      {
        "label": "冷媒の種類/充填量",
        "value": "R744/0.68kg"
      },
      {
        "label": "本体カラー",
        "value": "アイボリー"
      },
      {
        "label": "図面の作成日付",
        "value": "2024年4月16日"
      }
    ],
    "remotes": [
      {
        "model": "HE-WQWLW",
        "note": "コミュニケーションリモコン（別売・リモコンは必要）。台所リモコン HE-WQWLM（無線LAN機能搭載）＋浴室リモコン HE-WQWLS"
      },
      {
        "model": "HE-RQVLZ",
        "note": "増設リモコン（別売）。接続可能台数 1。「通話」機能はない"
      }
    ],
    "features": [
      "薄型の貯湯ユニット（奥行 440mm、幅 1078mm、高さ 1843mm）",
      "エコキュート専用アプリ「スマホでおふろ」（スマホ連携）：外出先からのお湯はり、別の部屋からの追いだき、旅行中の沸き上げ休止などをスマートフォンから操作",
      "ソーラーチャージ（太陽光の余剰電力の活用）：夜間の沸き上げ量を減らし、翌日の昼間に太陽光発電の余剰電力で沸き上げる。太陽光発電のメーカーは問わない。設定はアプリ／AiSEG3／リモコンのいずれか",
      "AIエコナビ：ひとセンサーが浴室への入室を検知して追いだきを始め、入浴していないときのふろ自動保温のムダを抑える",
      "リズムeシャワープラス：シャワーの温度と流量を同時に変動させる機能（W・YW シリーズのフルオート）",
      "うっかりアシスト：お湯はり時に浴そう栓を閉め忘れると、早めに知らせてお湯はりを止める",
      "おまかせ配管キレイ除菌：おふろのお湯を抜くたびに、タンクのお湯でふろ配管を自動で洗う。キレイキープコート、ステンレス配管（一部銅管）",
      "無線LAN搭載コミュニケーションリモコン（台所リモコン）。ECHONET Lite AIF認証対応／AiSEG3対応",
      "非常用取水栓を標準装備：断水時にタンク内の湯水を生活用水として取り出せる。停電時もシャワーや蛇口からお湯が使える（湯温の調節はできない）。アプリの「エマージェンシー沸き上げ」は、選んだ気象警報・注意報が出ると自動で沸き上げる",
      "薄型モデル 370L の貯湯ユニットは耐震クラスS対応",
      "給湯圧力は高圧（減圧弁設定圧力 180kPa）。同じ薄型でパワフル高圧（280kPa）は HE-WU37LQS（別機種）"
    ],
    "cautions": [
      "一般地向け。寒冷地及び最低気温が-10℃を下まわる地域では、機器が正常に動作しなくなる恐れがあるので据え付けない",
      "海浜地区で潮風が直接当たる場所や温泉地帯など特殊な場所では据え付けない",
      "時間帯別電灯・季節別時間帯別電灯の契約専用のタイプ。適用できる電力の制度や通電制御の割引は電気料金のプランで異なるため、契約している電力会社に確かめる",
      "「スマホでおふろ」の利用には、スマートフォン、インターネット回線、外部接続機器（市販の無線LANルーター）、お客様による設定が必要。無線LANルーターは 2.4GHz 帯で接続する",
      "ソーラーチャージは、太陽光発電システムを設置していない家庭で設定すると電気料金が増える。余剰電力はモニタリングしておらず、実際の日射量が予報と違うと買電する場合がある",
      "停電時は、ふろ自動・追いだき、タンクの沸き上げ等はできない。集合住宅等でポンプ給水の場合はお湯が出ない。非常用取水栓の湯水の飲用は避ける。非常用取水栓だけではタンクの湯水をすべては取り出せない",
      "この機種の主な搭載機能の欄には、ウルトラファインバブル・温浴セレクト・ぬくもりチャージ・真空断熱材・4本脚 耐震設計技術が無い（J シリーズとの違い）",
      "リズムeシャワープラスは、流量が少ないと作動しないことがある。サーモスタットタイプの混合水栓ではゆらぎを感じにくいことがある",
      "W シリーズに耐塩害仕様は無い",
      "年間給湯保温効率は、冬期の沸き上げ温度を65℃（W・Hシリーズの370Lタイプは70℃）とした条件の値"
    ],
    "manufacturerUrl": "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_fa_wl_370",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "HE-W37LQS",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_fa_wl_370",
      "https://sumai.panasonic.jp/hp/lineup/",
      "https://www2.panasonic.biz/scvb/a2A/zumenResult.G01?multiHinban=HE-W37LQS&SEARCH_FLG=0&SEARCH_KBN=2&KEY_SELECT=1&SRCD_GRP=SJSZ%2CSJTA%2CSJTB",
      "https://www2.panasonic.biz/ideacontout/2025/09/25/2025092500200067.PDF",
      "https://esctlg.panasonic.biz/link/cgi-bin/openCatalog.cgi?catalogId=ZBCT1B397M",
      "https://sumai.panasonic.jp/hp/lp-hojokin/",
      "https://sumai.panasonic.jp/hp/lp-hojokin/pdf/eco_hojyokin_2605.pdf",
      "https://sumai.panasonic.jp/hp/feature/2_25.html",
      "https://sumai.panasonic.jp/hp/feature/app/",
      "https://sumai.panasonic.jp/hp/hijouji.html",
      "https://sumai.panasonic.jp/hp/2point/2_21.html",
      "https://sumai.panasonic.jp/hp/2point/2_12.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=HE-W37LQS"
    ]
  },
  {
    "id": "panasonic-he-jpu37nqs",
    "slug": "he-jpu37nqs",
    "brand": "panasonic",
    "category": "ecocute",
    "series": "JP シリーズ（2026年度モデル）プレミアム",
    "name": "JPシリーズ ウルトラ高圧フルオート370L(HE-JPU37NQS)",
    "modelNumber": "HE-JPU37NQS",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "HE-JPU37NQ"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "HE-PJPU45N"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（角型）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 370,
      "familySize": "3～5人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "ウルトラ高圧フルオート"
    },
    "specifications": [
      {
        "label": "給湯タイプ",
        "value": "フルオート"
      },
      {
        "label": "タイプ",
        "value": "ウルトラ高圧フルオート"
      },
      {
        "label": "設置区分",
        "value": "屋外用（貯湯ユニット）／屋外専用型（ヒートポンプユニット、運転使用範囲：-10℃～43℃）"
      },
      {
        "label": "仕向地",
        "value": "一般地"
      },
      {
        "label": "一般仕様／耐塩害仕様",
        "value": "一般仕様"
      },
      {
        "label": "タンク容量",
        "value": "370L"
      },
      {
        "label": "適用電力制度",
        "value": "時間帯別電灯／季節別時間帯別電灯 通電制御型／従量電灯"
      },
      {
        "label": "電源（相数／定格電圧（定格周波数））",
        "value": "単相200V（50/60Hz）"
      },
      {
        "label": "最大電流",
        "value": "16.0A"
      },
      {
        "label": "年間給湯保温効率（JIS C 9220:2018）",
        "value": "4.1（ふろ熱回収有）／3.9（ふろ熱回収無）"
      },
      {
        "label": "区分名（2025年目標年度省エネ基準）",
        "value": "E"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "117%"
      },
      {
        "label": "沸き上げ温度範囲",
        "value": "約65～約90℃"
      },
      {
        "label": "給湯温度",
        "value": "水、32、35、38～47、50、55、60℃（混合弁内蔵）"
      },
      {
        "label": "給湯圧力（減圧弁設定圧力）",
        "value": "325kPa"
      },
      {
        "label": "最高使用圧力（逃し弁設定圧力）",
        "value": "370kPa"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "1810×600×680mm"
      },
      {
        "label": "貯湯ユニット 質量（満水時）",
        "value": "67kg（437kg）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "672×799（884）×299（332）mm（幅の内は配管カバー、奥行の内は吹出グリルを含む）"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "49kg"
      },
      {
        "label": "ヒートポンプユニット 運転音（A特性 音響パワーレベル）",
        "value": "中間期標準 50dB／冬期高温 55dB"
      },
      {
        "label": "中間期標準 加熱能力／消費電力",
        "value": "4.5kW／0.91kW"
      },
      {
        "label": "冬期高温 加熱能力／消費電力",
        "value": "4.5kW／1.50kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃"
      },
      {
        "label": "冷媒／充填量",
        "value": "R744（CO2）／1.00kg"
      },
      {
        "label": "本体カラー（外装塗装色）",
        "value": "ウォームシルバー"
      },
      {
        "label": "図面の作成日付",
        "value": "2026年5月18日"
      }
    ],
    "remotes": [
      {
        "model": "HE-RQWNW",
        "note": "コミュニケーションリモコン（別売・リモコンは必要）。台所リモコン HE-RQWNM（無線LAN搭載）＋浴室リモコン HE-RQWNS"
      },
      {
        "model": "HE-RQVNZ",
        "note": "増設リモコン（別売）。「通話」機能はない"
      }
    ],
    "features": [
      "プレミアム［高効率・クリーン］。年間給湯保温効率 4.1（ふろ熱回収機能「ぬくもりチャージ」を使って測った値。使わない値は 3.9）",
      "ウルトラ高圧：減圧弁設定圧力 325kPa（高圧フルオートは 180kPa）。「1階はもちろん2階、3階のおふろやシャワーも快適」とメーカーが説明",
      "ウルトラファインバブル（ふろ・給湯）：目に見えないほど微細な泡を含んだお湯を、浴室・洗面・キッチンへ送る",
      "エコキュート専用アプリ「スマホでおふろ」（スマホ連携）：外出先からのお湯はり、別の部屋からの追いだき、旅行中の沸き上げ休止などをスマートフォンから操作",
      "ソーラーチャージ（太陽光の余剰電力の活用）：夜間の沸き上げ量を減らし、翌日の昼間に太陽光発電の余剰電力で沸き上げる。太陽光発電のメーカーは問わない。設定はアプリ／AiSEG3／リモコンのいずれか",
      "温浴セレクト：3つの温浴モード（湯温設定＋温浴タイマー）から選べる。ぬるくするときも水を足さずに設定温度まで下げる",
      "AIエコナビ：ひとセンサーが浴室への入室を検知して追いだきを始め、入浴していないときのふろ自動保温のムダを抑える",
      "ぬくもりチャージ：入浴後のおふろの残り湯の「熱」をタンクに戻し、夜間の沸き上げを節約する（年間給湯保温効率の高いほうの値は、この機能を使って測った値）",
      "うっかりアシスト：お湯はり時に浴そう栓を閉め忘れると、早めに知らせてお湯はりを止める",
      "おそうじ浴槽連携（ウルトラ高圧フルオートのみ）：（株）LIXIL製おそうじ浴槽と連携し、お湯はり時に浴槽栓を自動で閉める（対応するシステムバスは 2026年11月より順次発売とメーカーが案内）",
      "おまかせ配管キレイ除菌：おふろのお湯を抜くたびに、タンクのお湯でふろ配管を自動で洗う。キレイキープコート、ステンレス配管（一部銅管）",
      "無線LAN搭載コミュニケーションリモコン（台所リモコン）。ECHONET Lite AIF認証対応／AiSEG3対応",
      "非常用取水栓を標準装備：断水時にタンク内の湯水を生活用水として取り出せる。停電時もシャワーや蛇口からお湯が使える（湯温の調節はできない）。アプリの「エマージェンシー沸き上げ」は、選んだ気象警報・注意報が出ると自動で沸き上げる",
      "4本脚 耐震設計技術・真空断熱材。角型モデル 370L の貯湯ユニットは耐震クラスS対応"
    ],
    "cautions": [
      "一般地向け。寒冷地及び最低気温が-10℃を下まわる地域では、機器が正常に動作しなくなる恐れがあるので据え付けない",
      "海浜地区で潮風が直接当たる場所や温泉地帯など特殊な場所では据え付けない",
      "時間帯別電灯・季節別時間帯別電灯の契約専用のタイプ。適用できる電力の制度や通電制御の割引は電気料金のプランで異なるため、契約している電力会社に確かめる",
      "「スマホでおふろ」の利用には、スマートフォン、インターネット回線、外部接続機器（市販の無線LANルーター）、お客様による設定が必要。無線LANルーターは 2.4GHz 帯で接続する",
      "ソーラーチャージは、太陽光発電システムを設置していない家庭で設定すると電気料金が増える。余剰電力はモニタリングしておらず、実際の日射量が予報と違うと買電する場合がある",
      "停電時は、ふろ自動・追いだき、タンクの沸き上げ等はできない。集合住宅等でポンプ給水の場合はお湯が出ない。非常用取水栓の湯水の飲用は避ける。非常用取水栓だけではタンクの湯水をすべては取り出せない",
      "給水圧力が低いと十分な性能が得られないことがある。メーカーのシャワー流量の比較条件は「給水元圧：高圧・パワフル高圧300kPa／ウルトラ高圧400kPa」",
      "JP シリーズに耐塩害仕様は無い",
      "ヒートポンプユニットの質量は 49kg で、J シリーズ（41kg）より重い"
    ],
    "manufacturerUrl": "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_uk_jpn_370",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "HE-JPU37NQS",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://sumai.panasonic.jp/hp/lineup/product.php?id=ippan_uk_jpn_370",
      "https://sumai.panasonic.jp/hp/lineup/",
      "https://www2.panasonic.biz/scvb/a2A/zumenResult.G01?multiHinban=HE-JPU37NQS&SEARCH_FLG=0&SEARCH_KBN=2&KEY_SELECT=1&SRCD_GRP=SJSZ%2CSJTA%2CSJTB",
      "https://www2.panasonic.biz/ideacontout/2026/10/01/2026100100200141.PDF",
      "https://esctlg.panasonic.biz/link/cgi-bin/openCatalog.cgi?catalogId=ZBCT1B397M",
      "https://sumai.panasonic.jp/hp/lp-hojokin/",
      "https://sumai.panasonic.jp/hp/lp-hojokin/pdf/eco_hojyokin_2605.pdf",
      "https://sumai.panasonic.jp/hp/2point/index.html",
      "https://sumai.panasonic.jp/hp/feature/2_25.html",
      "https://sumai.panasonic.jp/hp/feature/app/",
      "https://sumai.panasonic.jp/hp/hijouji.html",
      "https://sumai.panasonic.jp/hp/2point/2_21.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=HE-JPU37NQS"
    ]
  }
];
