import type { ProductData } from "@/data/products/types";

/**
 * コロナの商品データ。2026-10-14 に、公式サイト・公式カタログで型番と仕様を確かめたもの。
 * 根拠のページは各商品の sources。調査のしかたと記録は docs/PRODUCT_DATA.md。
 * 当社の価格（salesPrice など）は、会社から金額を受け取るまで null（画面では「お見積もり」）。
 * 製品写真の記録は data/products/images.json（ここには書かない）。
 */
export const coronaProducts: ProductData[] = [
  {
    "id": "corona-chp-37az2",
    "slug": "chp-37az2",
    "brand": "corona",
    "category": "ecocute",
    "series": "ハイグレードタイプ",
    "name": "ハイグレードタイプ【一般地用 / フルオート】 貯湯量370L CHP-37AZ2",
    "modelNumber": "CHP-37AZ2",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "CTU-37AZ2"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "CHP-AZ451"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（1缶式）"
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
      "label": "フルオート"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220:2018）",
        "value": "3.5"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100％（区分E）"
      },
      {
        "label": "給湯圧力",
        "value": "高圧力（減圧弁設定圧力180kPa）"
      },
      {
        "label": "水側最高使用圧力",
        "value": "230kPa（減圧弁設定圧：180kPa）"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃～約90℃"
      },
      {
        "label": "電源",
        "value": "単相 200V 50／60Hz／最大電流 17A"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "1,860×630×730mm"
      },
      {
        "label": "貯湯ユニット 質量（製品質量／満水時質量）",
        "value": "56kg／426kg"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外形（1缶式）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "720×792［カバー部+92］×299mm"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 720 mm / 幅 884 mm / 奥行 299 mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "45kg"
      },
      {
        "label": "運転音（音響パワーレベル）中間期／冬期",
        "value": "51dB／55dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "4.5kW／0.970kW（中間期標準運転電流 6.2A）"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "4.5kW／1.500kW"
      },
      {
        "label": "冷媒名及び封入量",
        "value": "CO2 0.810kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "−10℃"
      },
      {
        "label": "基準浴槽",
        "value": "有効水量180L～220L（満水容積340L以下の浴槽）"
      }
    ],
    "remotes": [
      {
        "model": "RBP-GADW2（S）",
        "note": "無線LAN対応インターホンリモコンセット（スマートナビリモコンプラス。台所リモコン＋浴室リモコン）。エコキュート本体とリモコンは有線接続"
      },
      {
        "model": "RSP-GA2",
        "note": "別売増設リモコン。増設リモコンでは通話はできない"
      }
    ],
    "features": [
      "高圧力（減圧弁設定圧力180kPa）",
      "省エネ保温",
      "節水モード（ふろの湯量を節水する）",
      "耐震クラスS対応の設計（1缶370Lタイプ）",
      "フルオート：自動お湯はり・追いだき・省エネ保温／自動保温・自動たし湯（有／無）・ふろ自動一時停止",
      "おそうじconnect：対応するシステムバスとの連動運転で、浴槽内を自動洗浄し、閉栓からお湯はりまで行う",
      "入浴お知らせ（音声モニター付）",
      "スマートナビリモコンプラス（無線LAN対応インターホンリモコン）とコロナ快適ホームアプリで、スマートフォンから遠隔操作・見える化ができる",
      "ソーラーモードアプリ：アプリで設定すると、クラウドの天気予報と太陽光発電の状況から沸き上げ運転を自動で行う（HEMS の導入は不要）。リモコンから手動で設定するソーラーモード（2日設定・1週間設定）、HEMS と連動するソーラーモードプラスもある",
      "レジリエンス機能：「1回満タン」（停電に備えてお湯をつくって確保）と「浴槽への水はり」（断水に備えて浴槽に生活用水を確保）を、アプリや台所リモコンから設定できる",
      "停電時でもお湯が使える（SMAミキシング弁）。断水時は非常用取水栓から貯湯ユニットの水を生活用水として取り出せる",
      "貯湯ユニット内ステンレス配管・ふろ配管洗浄・汚れんコート",
      "ECHONET Lite AIF 認証、ECHONET Lite Web API、JC-STAR★1（レベル1）に対応",
      "メーカー5年保証"
    ],
    "cautions": [
      "脚カバー（CTU-FC28）は別売",
      "ふろ配管の据付制約：［高圧力タイプ］は配管高さ「階下と3階以上は不可」、貯湯ユニット底面から浴槽上端まで「上方4m以内」。配管全長は片道15m以内（機種により異なる場合があります）",
      "おそうじconnect を使うには、対応するシステムバスが必要",
      "エコキュート本体とリモコンは有線接続。アプリの利用には、インターネットに常時接続できる無線LANルーター（IEEE802.11b/g/n、2.4GHzのみ）が必要で、モバイルルーターやテザリングでは使えない",
      "ソーラーモード／ソーラーモードアプリ／ソーラーモードプラスは、電力契約設定が昼間設定の場合は使えない。必要な太陽光発電の設置容量は「370Lタイプは2.5kW以上、460Lタイプは3.0kW以上を推奨」。ソーラーモードプラスは HEMS の接続が必要。天気予報が外れた場合は昼間電力で沸き上げ、消費電力が増える場合がある",
      "停電中は、貯湯ユニットにお湯が残っていればシャワーや蛇口から使えるが、最後に使っていた給湯温度で出るので湯温を確かめる。おふろのお湯はりはできない。断水しているときは蛇口・シャワーからは使えず、非常用取水栓から取り出す（熱湯が出る場合がある。飲用は避ける）",
      "水道水以外（温泉水・井戸水）は使用不可",
      "ヒートポンプは主に深夜に運転するため、寝室や隣家に近い場所など騒音が気になる場所には据え付けない。運転音は無響室での測定値で、実際に据え付けた状態では表示数値より大きくなるのが普通"
    ],
    "manufacturerUrl": "https://www.corona.co.jp/eco/highgrade/lineup.html#37az2",
    "manufacturerPrice": {
      "amount": 1238600,
      "tax": "included",
      "includes": "ヒートポンプユニット CHP-AZ451＋貯湯ユニット CTU-37AZ2＋無線LAN対応インターホンリモコンセット RBP-GADW2（S）。脚カバー（CTU-FC28）は別売で含まない。設置工事費・部材費などは別",
      "asOf": "2026-10-14 閲覧（公式ページ）。エコキュート総合カタログ（2026年4月版・裏表紙「2026年9月版」）も同額",
      "sourceUrl": "https://www.corona.co.jp/eco/highgrade/lineup.html#37az2"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "CHP-37AZ2",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.corona.co.jp/eco/highgrade/lineup.html#37az2",
      "https://www.corona.co.jp/eco/products/index.html",
      "https://www.corona.co.jp/support/catalog_download/housing.html",
      "https://www.catalabo.org/cgi-bin/openCatalog.cgi?catalogId=0292_JV202604",
      "https://www.corona.co.jp/eco/feature/resilience.html",
      "https://www.corona.co.jp/support/faq/2203.html",
      "https://www.corona.co.jp/kodomo-ecosumai-mlit/",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=CHP-37AZ2"
    ]
  },
  {
    "id": "corona-chp-46az2",
    "slug": "chp-46az2",
    "brand": "corona",
    "category": "ecocute",
    "series": "ハイグレードタイプ",
    "name": "ハイグレードタイプ【一般地用 / フルオート】 貯湯量460L CHP-46AZ2",
    "modelNumber": "CHP-46AZ2",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "CTU-46AZ2"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "CHP-AZ601"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（1缶式）"
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
      "label": "フルオート"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220:2018）",
        "value": "3.5"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100％（区分E）"
      },
      {
        "label": "給湯圧力",
        "value": "高圧力（減圧弁設定圧力180kPa）"
      },
      {
        "label": "水側最高使用圧力",
        "value": "230kPa（減圧弁設定圧：180kPa）"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃～約90℃"
      },
      {
        "label": "電源",
        "value": "単相 200V 50／60Hz／最大電流 18A"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "1,850×700×795mm"
      },
      {
        "label": "貯湯ユニット 質量（製品質量／満水時質量）",
        "value": "65kg／525kg"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外形（1缶式）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "720×792［カバー部+92］×299mm"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 720 mm / 幅 884 mm / 奥行 299 mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "45kg"
      },
      {
        "label": "運転音（音響パワーレベル）中間期／冬期",
        "value": "55dB／57dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "6.0kW／1.360kW（中間期標準運転電流 7.2A）"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "6.0kW／2.000kW"
      },
      {
        "label": "冷媒名及び封入量",
        "value": "CO2 0.810kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "−10℃"
      },
      {
        "label": "基準浴槽",
        "value": "有効水量180L～220L（満水容積340L以下の浴槽）"
      }
    ],
    "remotes": [
      {
        "model": "RBP-GADW2（S）",
        "note": "無線LAN対応インターホンリモコンセット（スマートナビリモコンプラス。台所リモコン＋浴室リモコン）。エコキュート本体とリモコンは有線接続"
      },
      {
        "model": "RSP-GA2",
        "note": "別売増設リモコン。増設リモコンでは通話はできない"
      }
    ],
    "features": [
      "高圧力（減圧弁設定圧力180kPa）",
      "省エネ保温",
      "節水モード（ふろの湯量を節水する）",
      "耐震クラスA対応の設計（1缶460Lタイプ）",
      "フルオート：自動お湯はり・追いだき・省エネ保温／自動保温・自動たし湯（有／無）・ふろ自動一時停止",
      "おそうじconnect：対応するシステムバスとの連動運転で、浴槽内を自動洗浄し、閉栓からお湯はりまで行う",
      "入浴お知らせ（音声モニター付）",
      "スマートナビリモコンプラス（無線LAN対応インターホンリモコン）とコロナ快適ホームアプリで、スマートフォンから遠隔操作・見える化ができる",
      "ソーラーモードアプリ：アプリで設定すると、クラウドの天気予報と太陽光発電の状況から沸き上げ運転を自動で行う（HEMS の導入は不要）。リモコンから手動で設定するソーラーモード（2日設定・1週間設定）、HEMS と連動するソーラーモードプラスもある",
      "レジリエンス機能：「1回満タン」（停電に備えてお湯をつくって確保）と「浴槽への水はり」（断水に備えて浴槽に生活用水を確保）を、アプリや台所リモコンから設定できる",
      "停電時でもお湯が使える（SMAミキシング弁）。断水時は非常用取水栓から貯湯ユニットの水を生活用水として取り出せる",
      "貯湯ユニット内ステンレス配管・ふろ配管洗浄・汚れんコート",
      "ECHONET Lite AIF 認証、ECHONET Lite Web API、JC-STAR★1（レベル1）に対応",
      "メーカー5年保証"
    ],
    "cautions": [
      "脚カバー（CTU-FC29）は別売",
      "ふろ配管の据付制約：［高圧力タイプ］は配管高さ「階下と3階以上は不可」、貯湯ユニット底面から浴槽上端まで「上方4m以内」。配管全長は片道15m以内（機種により異なる場合があります）",
      "370L（幅630×奥行730mm）より貯湯ユニットの設置面が大きい（幅700×奥行795mm）。同じ 460L で幅630×奥行730mm の省スペース・スリムタイプ CHP-ES46AZ2（高さ2,200mm）が別にある",
      "おそうじconnect を使うには、対応するシステムバスが必要",
      "エコキュート本体とリモコンは有線接続。アプリの利用には、インターネットに常時接続できる無線LANルーター（IEEE802.11b/g/n、2.4GHzのみ）が必要で、モバイルルーターやテザリングでは使えない",
      "ソーラーモード／ソーラーモードアプリ／ソーラーモードプラスは、電力契約設定が昼間設定の場合は使えない。必要な太陽光発電の設置容量は「370Lタイプは2.5kW以上、460Lタイプは3.0kW以上を推奨」。ソーラーモードプラスは HEMS の接続が必要。天気予報が外れた場合は昼間電力で沸き上げ、消費電力が増える場合がある",
      "停電中は、貯湯ユニットにお湯が残っていればシャワーや蛇口から使えるが、最後に使っていた給湯温度で出るので湯温を確かめる。おふろのお湯はりはできない。断水しているときは蛇口・シャワーからは使えず、非常用取水栓から取り出す（熱湯が出る場合がある。飲用は避ける）",
      "水道水以外（温泉水・井戸水）は使用不可",
      "ヒートポンプは主に深夜に運転するため、寝室や隣家に近い場所など騒音が気になる場所には据え付けない。運転音は無響室での測定値で、実際に据え付けた状態では表示数値より大きくなるのが普通"
    ],
    "manufacturerUrl": "https://www.corona.co.jp/eco/highgrade/lineup.html#46az2",
    "manufacturerPrice": {
      "amount": 1355200,
      "tax": "included",
      "includes": "ヒートポンプユニット CHP-AZ601＋貯湯ユニット CTU-46AZ2＋無線LAN対応インターホンリモコンセット RBP-GADW2（S）。脚カバー（CTU-FC29）は別売で含まない。設置工事費・部材費などは別",
      "asOf": "2026-10-14 閲覧（公式ページ）。エコキュート総合カタログ（2026年4月版・裏表紙「2026年9月版」）も同額",
      "sourceUrl": "https://www.corona.co.jp/eco/highgrade/lineup.html#46az2"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "CHP-46AZ2",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.corona.co.jp/eco/highgrade/lineup.html#46az2",
      "https://www.corona.co.jp/eco/products/index.html",
      "https://www.corona.co.jp/support/catalog_download/housing.html",
      "https://www.catalabo.org/cgi-bin/openCatalog.cgi?catalogId=0292_JV202604",
      "https://www.corona.co.jp/eco/feature/resilience.html",
      "https://www.corona.co.jp/support/faq/2203.html",
      "https://www.corona.co.jp/kodomo-ecosumai-mlit/",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=CHP-46AZ2"
    ]
  },
  {
    "id": "corona-chp-e37az2",
    "slug": "chp-e37az2",
    "brand": "corona",
    "category": "ecocute",
    "series": "高圧力パワフル給湯・ハイグレードタイプ",
    "name": "高圧力パワフル給湯ハイグレード【一般地用 / フルオート】 貯湯量370L CHP-E37AZ2",
    "modelNumber": "CHP-E37AZ2",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "CTU-E37AZ2"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "CHP-AZ451"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（1缶式）"
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
      "label": "フルオート"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220:2018）",
        "value": "3.5"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100％（区分E）"
      },
      {
        "label": "給湯圧力",
        "value": "高圧力パワフル給湯（減圧弁設定圧力300kPa）"
      },
      {
        "label": "水側最高使用圧力",
        "value": "345kPa（減圧弁設定圧：300kPa）"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃～約90℃"
      },
      {
        "label": "電源",
        "value": "単相 200V 50／60Hz／最大電流 17A"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "1,860×630×730mm"
      },
      {
        "label": "貯湯ユニット 質量（製品質量／満水時質量）",
        "value": "58kg／428kg"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外形（1缶式）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "720×792［カバー部+92］×299mm"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 720 mm / 幅 884 mm / 奥行 299 mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "45kg"
      },
      {
        "label": "運転音（音響パワーレベル）中間期／冬期",
        "value": "51dB／55dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "4.5kW／0.970kW（中間期標準運転電流 6.2A）"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "4.5kW／1.500kW"
      },
      {
        "label": "冷媒名及び封入量",
        "value": "CO2 0.810kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "−10℃"
      },
      {
        "label": "基準浴槽",
        "value": "有効水量180L～220L（満水容積340L以下の浴槽）"
      }
    ],
    "remotes": [
      {
        "model": "RBP-GADW2（S）",
        "note": "無線LAN対応インターホンリモコンセット（スマートナビリモコンプラス。台所リモコン＋浴室リモコン）。エコキュート本体とリモコンは有線接続"
      },
      {
        "model": "RSP-GA2",
        "note": "別売増設リモコン。増設リモコンでは通話はできない"
      }
    ],
    "features": [
      "高圧力パワフル給湯（減圧弁設定圧力300kPa）。同社の高圧力タイプは180kPa",
      "省エネ保温",
      "ふろ湯量節水",
      "耐震クラスS対応の設計（1缶370Lタイプ）",
      "フルオート：自動お湯はり・追いだき・省エネ保温／自動保温・自動たし湯（有／無）・ふろ自動一時停止",
      "おそうじconnect：対応するシステムバスとの連動運転で、浴槽内を自動洗浄し、閉栓からお湯はりまで行う",
      "入浴お知らせ（音声モニター付）",
      "スマートナビリモコンプラス（無線LAN対応インターホンリモコン）とコロナ快適ホームアプリで、スマートフォンから遠隔操作・見える化ができる",
      "ソーラーモードアプリ：アプリで設定すると、クラウドの天気予報と太陽光発電の状況から沸き上げ運転を自動で行う（HEMS の導入は不要）。リモコンから手動で設定するソーラーモード（2日設定・1週間設定）、HEMS と連動するソーラーモードプラスもある",
      "レジリエンス機能：「1回満タン」（停電に備えてお湯をつくって確保）と「浴槽への水はり」（断水に備えて浴槽に生活用水を確保）を、アプリや台所リモコンから設定できる",
      "停電時でもお湯が使える（SMAミキシング弁）。断水時は非常用取水栓から貯湯ユニットの水を生活用水として取り出せる",
      "貯湯ユニット内ステンレス配管・ふろ配管洗浄・汚れんコート",
      "ECHONET Lite AIF 認証、ECHONET Lite Web API、JC-STAR★1（レベル1）に対応",
      "メーカー5年保証"
    ],
    "cautions": [
      "脚カバー（CTU-FC28）は別売",
      "ふろ配管の据付制約：［高圧力パワフル給湯タイプ］は配管高さ「階下は不可」、貯湯ユニット底面から浴槽上端まで「上方7m以内」。配管全長は片道15m以内（機種により異なる場合があります）",
      "おそうじconnect を使うには、対応するシステムバスが必要",
      "エコキュート本体とリモコンは有線接続。アプリの利用には、インターネットに常時接続できる無線LANルーター（IEEE802.11b/g/n、2.4GHzのみ）が必要で、モバイルルーターやテザリングでは使えない",
      "ソーラーモード／ソーラーモードアプリ／ソーラーモードプラスは、電力契約設定が昼間設定の場合は使えない。必要な太陽光発電の設置容量は「370Lタイプは2.5kW以上、460Lタイプは3.0kW以上を推奨」。ソーラーモードプラスは HEMS の接続が必要。天気予報が外れた場合は昼間電力で沸き上げ、消費電力が増える場合がある",
      "停電中は、貯湯ユニットにお湯が残っていればシャワーや蛇口から使えるが、最後に使っていた給湯温度で出るので湯温を確かめる。おふろのお湯はりはできない。断水しているときは蛇口・シャワーからは使えず、非常用取水栓から取り出す（熱湯が出る場合がある。飲用は避ける）",
      "水道水以外（温泉水・井戸水）は使用不可",
      "ヒートポンプは主に深夜に運転するため、寝室や隣家に近い場所など騒音が気になる場所には据え付けない。運転音は無響室での測定値で、実際に据え付けた状態では表示数値より大きくなるのが普通"
    ],
    "manufacturerUrl": "https://www.corona.co.jp/eco/highgrade/lineup.html#e37az2",
    "manufacturerPrice": {
      "amount": 1355200,
      "tax": "included",
      "includes": "ヒートポンプユニット CHP-AZ451＋貯湯ユニット CTU-E37AZ2＋無線LAN対応インターホンリモコンセット RBP-GADW2（S）。脚カバー（CTU-FC28）は別売で含まない。設置工事費・部材費などは別",
      "asOf": "2026-10-14 閲覧（公式ページ）。エコキュート総合カタログ（2026年4月版・裏表紙「2026年9月版」）も同額",
      "sourceUrl": "https://www.corona.co.jp/eco/highgrade/lineup.html#e37az2"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "CHP-E37AZ2",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.corona.co.jp/eco/highgrade/lineup.html#e37az2",
      "https://www.corona.co.jp/eco/products/index.html",
      "https://www.corona.co.jp/support/catalog_download/housing.html",
      "https://www.catalabo.org/cgi-bin/openCatalog.cgi?catalogId=0292_JV202604",
      "https://www.corona.co.jp/eco/feature/resilience.html",
      "https://www.corona.co.jp/support/faq/2203.html",
      "https://www.corona.co.jp/kodomo-ecosumai-mlit/",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=CHP-E37AZ2"
    ]
  },
  {
    "id": "corona-chp-hxe37az2",
    "slug": "chp-hxe37az2",
    "brand": "corona",
    "category": "ecocute",
    "series": "プレミアムエコキュート",
    "name": "プレミアムエコキュート【一般地用 / フルオート】 貯湯量370L CHP-HXE37AZ2",
    "modelNumber": "CHP-HXE37AZ2",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "CTU-HXE37AZ2"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "CHP-DHZ451"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（1缶式）"
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
      "label": "フルオート"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220:2018）",
        "value": "4.0"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "114％（区分E）"
      },
      {
        "label": "給湯圧力",
        "value": "高圧力パワフル給湯（減圧弁設定圧力300kPa）"
      },
      {
        "label": "水側最高使用圧力",
        "value": "345kPa（減圧弁設定圧：300kPa）"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃～約90℃"
      },
      {
        "label": "電源",
        "value": "単相 200V 50／60Hz／最大電流 16A"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "1,860×630×730mm"
      },
      {
        "label": "貯湯ユニット 質量（製品質量／満水時質量）",
        "value": "62kg／432kg"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外形（1缶式）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "690×820［カバー部+80］×300mm"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 690 mm / 幅 900 mm / 奥行 300 mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "55kg"
      },
      {
        "label": "運転音（音響パワーレベル）中間期／冬期",
        "value": "51dB／56dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "4.5kW／0.885kW（中間期標準運転電流 5.8A）"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "4.5kW／1.500kW"
      },
      {
        "label": "冷媒名及び封入量",
        "value": "CO2 0.880kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "−10℃"
      },
      {
        "label": "基準浴槽",
        "value": "有効水量180L～220L（満水容積340L以下の浴槽）"
      }
    ],
    "remotes": [
      {
        "model": "RBP-GADW2（S）",
        "note": "無線LAN対応インターホンリモコンセット（スマートナビリモコンプラス。台所リモコン＋浴室リモコン）。エコキュート本体とリモコンは有線接続"
      },
      {
        "model": "RSP-GA2",
        "note": "別売増設リモコン。増設リモコンでは通話はできない"
      }
    ],
    "features": [
      "年間給湯保温効率（JIS）4.0（省エネ基準達成率 114％）。国の給湯省エネ2026事業で性能加算要件に適合",
      "高圧力パワフル給湯（減圧弁設定圧力300kPa）",
      "節水モード（給湯とふろの湯量を節水する）",
      "省エネ保温",
      "耐震クラスS対応の設計（1缶370Lタイプ）",
      "フルオート：自動お湯はり・追いだき・省エネ保温／自動保温・自動たし湯（有／無）・ふろ自動一時停止",
      "おそうじconnect：対応するシステムバスとの連動運転で、浴槽内を自動洗浄し、閉栓からお湯はりまで行う",
      "入浴お知らせ（音声モニター付）",
      "スマートナビリモコンプラス（無線LAN対応インターホンリモコン）とコロナ快適ホームアプリで、スマートフォンから遠隔操作・見える化ができる",
      "ソーラーモードアプリ：アプリで設定すると、クラウドの天気予報と太陽光発電の状況から沸き上げ運転を自動で行う（HEMS の導入は不要）。リモコンから手動で設定するソーラーモード（2日設定・1週間設定）、HEMS と連動するソーラーモードプラスもある",
      "レジリエンス機能：「1回満タン」（停電に備えてお湯をつくって確保）と「浴槽への水はり」（断水に備えて浴槽に生活用水を確保）を、アプリや台所リモコンから設定できる",
      "停電時でもお湯が使える（SMAミキシング弁）。断水時は非常用取水栓から貯湯ユニットの水を生活用水として取り出せる",
      "貯湯ユニット内ステンレス配管・ふろ配管洗浄・汚れんコート",
      "ECHONET Lite AIF 認証、ECHONET Lite Web API、JC-STAR★1（レベル1）に対応",
      "メーカー5年保証"
    ],
    "cautions": [
      "脚カバー（CTU-FC28）は別売",
      "ふろ配管の据付制約：［高圧力パワフル給湯タイプ］は配管高さ「階下は不可」、貯湯ユニット底面から浴槽上端まで「上方7m以内」。配管全長は片道15m以内（機種により異なる場合があります）",
      "ヒートポンプユニットは CHP-DHZ451（高さ690mm・質量55kg）で、ハイグレードタイプの CHP-AZ451（高さ720mm・45kg）とは別の機種",
      "おそうじconnect を使うには、対応するシステムバスが必要",
      "エコキュート本体とリモコンは有線接続。アプリの利用には、インターネットに常時接続できる無線LANルーター（IEEE802.11b/g/n、2.4GHzのみ）が必要で、モバイルルーターやテザリングでは使えない",
      "ソーラーモード／ソーラーモードアプリ／ソーラーモードプラスは、電力契約設定が昼間設定の場合は使えない。必要な太陽光発電の設置容量は「370Lタイプは2.5kW以上、460Lタイプは3.0kW以上を推奨」。ソーラーモードプラスは HEMS の接続が必要。天気予報が外れた場合は昼間電力で沸き上げ、消費電力が増える場合がある",
      "停電中は、貯湯ユニットにお湯が残っていればシャワーや蛇口から使えるが、最後に使っていた給湯温度で出るので湯温を確かめる。おふろのお湯はりはできない。断水しているときは蛇口・シャワーからは使えず、非常用取水栓から取り出す（熱湯が出る場合がある。飲用は避ける）",
      "水道水以外（温泉水・井戸水）は使用不可",
      "ヒートポンプは主に深夜に運転するため、寝室や隣家に近い場所など騒音が気になる場所には据え付けない。運転音は無響室での測定値で、実際に据え付けた状態では表示数値より大きくなるのが普通"
    ],
    "manufacturerUrl": "https://www.corona.co.jp/eco/premium/lineup.html#hxe37az2",
    "manufacturerPrice": {
      "amount": 1439900,
      "tax": "included",
      "includes": "ヒートポンプユニット CHP-DHZ451＋貯湯ユニット CTU-HXE37AZ2＋無線LAN対応インターホンリモコンセット RBP-GADW2（S）。脚カバー（CTU-FC28）は別売で含まない。設置工事費・部材費などは別",
      "asOf": "2026-10-14 閲覧（公式ページ）。エコキュート総合カタログ（2026年4月版・裏表紙「2026年9月版」）も同額",
      "sourceUrl": "https://www.corona.co.jp/eco/premium/lineup.html#hxe37az2"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "CHP-HXE37AZ2",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.corona.co.jp/eco/premium/lineup.html#hxe37az2",
      "https://www.corona.co.jp/eco/products/index.html",
      "https://www.corona.co.jp/support/catalog_download/housing.html",
      "https://www.catalabo.org/cgi-bin/openCatalog.cgi?catalogId=0292_JV202604",
      "https://www.corona.co.jp/eco/feature/resilience.html",
      "https://www.corona.co.jp/support/faq/2203.html",
      "https://www.corona.co.jp/kodomo-ecosumai-mlit/",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=CHP-HXE37AZ2"
    ]
  },
  {
    "id": "corona-chp-e372az2",
    "slug": "chp-e372az2",
    "brand": "corona",
    "category": "ecocute",
    "series": "高圧力パワフル給湯・薄型・省スペースタイプ",
    "name": "高圧力パワフル給湯・薄型・省スペース【一般地用 / フルオート】 貯湯量370L CHP-E372AZ2",
    "modelNumber": "CHP-E372AZ2",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "CTU-E372AZ2"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "CHP-DZ452"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（薄型（2缶式））"
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
      "label": "フルオート"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220:2018）",
        "value": "3.0"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100％（区分I）"
      },
      {
        "label": "給湯圧力",
        "value": "高圧力パワフル給湯（減圧弁設定圧力300kPa）"
      },
      {
        "label": "水側最高使用圧力",
        "value": "345kPa（減圧弁設定圧：300kPa）"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃～約90℃"
      },
      {
        "label": "電源",
        "value": "単相 200V 50／60Hz／最大電流 16A"
      },
      {
        "label": "貯湯ユニット 外形寸法（高さ×幅×奥行）",
        "value": "1,890×1,090×450mm"
      },
      {
        "label": "貯湯ユニット 質量（製品質量／満水時質量）",
        "value": "76kg／446kg"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外形（2缶式）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法（高さ×幅×奥行）",
        "value": "650×820［カバー部+80］×300mm"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 650 mm / 幅 900 mm / 奥行 300 mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "48kg"
      },
      {
        "label": "運転音（音響パワーレベル）中間期／冬期",
        "value": "51dB／56dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "4.5kW／0.985kW（中間期標準運転電流 6.2A）"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "4.5kW／1.500kW"
      },
      {
        "label": "冷媒名及び封入量",
        "value": "CO2 0.675kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "−10℃"
      },
      {
        "label": "基準浴槽",
        "value": "有効水量180L～220L（満水容積340L以下の浴槽）"
      }
    ],
    "remotes": [
      {
        "model": "RBP-GADW2（S）",
        "note": "無線LAN対応インターホンリモコンセット（スマートナビリモコンプラス。台所リモコン＋浴室リモコン）。エコキュート本体とリモコンは有線接続"
      },
      {
        "model": "RSP-GA2",
        "note": "別売増設リモコン。増設リモコンでは通話はできない"
      }
    ],
    "features": [
      "貯湯ユニットの奥行き45cmの省スペース設計（貯湯槽を2つに分けた2缶式。幅は1,090mm）",
      "高圧力パワフル給湯（減圧弁設定圧力300kPa）",
      "ふろ湯量節水",
      "フルオート：自動お湯はり・追いだき・省エネ保温／自動保温・自動たし湯（有／無）・ふろ自動一時停止",
      "おそうじconnect：対応するシステムバスとの連動運転で、浴槽内を自動洗浄し、閉栓からお湯はりまで行う",
      "入浴お知らせ（音声モニター付）",
      "スマートナビリモコンプラス（無線LAN対応インターホンリモコン）とコロナ快適ホームアプリで、スマートフォンから遠隔操作・見える化ができる",
      "ソーラーモードアプリ：アプリで設定すると、クラウドの天気予報と太陽光発電の状況から沸き上げ運転を自動で行う（HEMS の導入は不要）。リモコンから手動で設定するソーラーモード（2日設定・1週間設定）、HEMS と連動するソーラーモードプラスもある",
      "レジリエンス機能：「1回満タン」（停電に備えてお湯をつくって確保）と「浴槽への水はり」（断水に備えて浴槽に生活用水を確保）を、アプリや台所リモコンから設定できる",
      "停電時でもお湯が使える（SMAミキシング弁）。断水時は非常用取水栓から貯湯ユニットの水を生活用水として取り出せる",
      "貯湯ユニット内ステンレス配管・ふろ配管洗浄・汚れんコート",
      "ECHONET Lite AIF 認証、ECHONET Lite Web API、JC-STAR★1（レベル1）に対応",
      "メーカー5年保証"
    ],
    "cautions": [
      "脚カバー（CTU-FC30）は別売",
      "ふろ配管の据付制約：［高圧力パワフル給湯タイプ］は配管高さ「階下は不可」、貯湯ユニット底面から浴槽上端まで「上方7m以内」。配管全長は片道15m以内（機種により異なる場合があります）",
      "年間給湯保温効率は 3.0（区分I）で、1缶式のハイグレードタイプ（3.5）より低い",
      "奥行きは45cmだが幅は1,090mmある（1缶式 370L は幅630×奥行730mm）",
      "おそうじconnect を使うには、対応するシステムバスが必要",
      "エコキュート本体とリモコンは有線接続。アプリの利用には、インターネットに常時接続できる無線LANルーター（IEEE802.11b/g/n、2.4GHzのみ）が必要で、モバイルルーターやテザリングでは使えない",
      "ソーラーモード／ソーラーモードアプリ／ソーラーモードプラスは、電力契約設定が昼間設定の場合は使えない。必要な太陽光発電の設置容量は「370Lタイプは2.5kW以上、460Lタイプは3.0kW以上を推奨」。ソーラーモードプラスは HEMS の接続が必要。天気予報が外れた場合は昼間電力で沸き上げ、消費電力が増える場合がある",
      "停電中は、貯湯ユニットにお湯が残っていればシャワーや蛇口から使えるが、最後に使っていた給湯温度で出るので湯温を確かめる。おふろのお湯はりはできない。断水しているときは蛇口・シャワーからは使えず、非常用取水栓から取り出す（熱湯が出る場合がある。飲用は避ける）",
      "水道水以外（温泉水・井戸水）は使用不可",
      "ヒートポンプは主に深夜に運転するため、寝室や隣家に近い場所など騒音が気になる場所には据え付けない。運転音は無響室での測定値で、実際に据え付けた状態では表示数値より大きくなるのが普通"
    ],
    "manufacturerUrl": "https://www.corona.co.jp/eco/thin/lineup.html#e372az2",
    "manufacturerPrice": {
      "amount": 1389300,
      "tax": "included",
      "includes": "ヒートポンプユニット CHP-DZ452＋貯湯ユニット CTU-E372AZ2＋無線LAN対応インターホンリモコンセット RBP-GADW2（S）。脚カバー（CTU-FC30）は別売で含まない。設置工事費・部材費などは別",
      "asOf": "2026-10-14 閲覧（公式ページ）。エコキュート総合カタログ（2026年4月版・裏表紙「2026年9月版」）も同額",
      "sourceUrl": "https://www.corona.co.jp/eco/thin/lineup.html#e372az2"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "CHP-E372AZ2",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.corona.co.jp/eco/thin/lineup.html#e372az2",
      "https://www.corona.co.jp/eco/products/index.html",
      "https://www.corona.co.jp/support/catalog_download/housing.html",
      "https://www.catalabo.org/cgi-bin/openCatalog.cgi?catalogId=0292_JV202604",
      "https://www.corona.co.jp/eco/feature/resilience.html",
      "https://www.corona.co.jp/support/faq/2203.html",
      "https://www.corona.co.jp/kodomo-ecosumai-mlit/",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=CHP-E372AZ2"
    ]
  }
];
