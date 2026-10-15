import type { Product } from "@/data/products/types";

/**
 * ダイキンの商品データ。2026-10-14 に、公式サイト・公式カタログで型番と仕様を確かめたもの。
 * 根拠のページは各商品の sources。調査のしかたと記録は docs/PRODUCT_DATA.md。
 * 当社の価格（salesPrice など）は、会社から金額を受け取るまで null（画面では「お見積もり」）。
 * 製品写真は、メーカーの掲載許諾が確認できるまで載せない（imageLicenseStatus: "pending"）。
 */
export const daikinProducts: Product[] = [
  {
    "id": "daikin-ea377afv",
    "slug": "ea377afv",
    "brand": "daikin",
    "category": "ecocute",
    "series": "Aシリーズ",
    "name": "フルオートタイプ Aシリーズ 一般地仕様 角型 EA377AFV 370L（3〜5人向け）",
    "modelNumber": "EA377AFV",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "TA377AFV"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "RQ457AV"
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
      "familySize": "3〜5人向け"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートタイプ"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220：2018）",
        "value": "3.5"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100%（区分 E）"
      },
      {
        "label": "給湯圧力",
        "value": "パワフル高圧給湯 330kPa（減圧弁設定）"
      },
      {
        "label": "減圧弁（設定圧力）",
        "value": "330kPa"
      },
      {
        "label": "逃し弁（設定圧力）",
        "value": "370kPa"
      },
      {
        "label": "水側最高使用圧力",
        "value": "370kPa"
      },
      {
        "label": "沸き上げ温度（範囲）",
        "value": "約65～90℃（ヒートポンプユニットの出口温度）"
      },
      {
        "label": "電源",
        "value": "単相200V／最大電流 17A／電源容量 20A"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ1,825×幅630×奥行き730mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "60kg（満水時 430kg）"
      },
      {
        "label": "貯湯ユニット 種類・設置区分",
        "value": "種類 1缶、設置区分「屋外（防雨型）／屋内設置兼用」"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ635×幅825（+74）×奥行き300mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "49kg"
      },
      {
        "label": "運転音（音響パワーレベル）",
        "value": "中間期 53dB／冬期 57dB"
      },
      {
        "label": "加熱能力",
        "value": "中間期標準 4.5kW／冬期高温 4.5kW"
      },
      {
        "label": "消費電力",
        "value": "中間期標準 0.995kW／冬期高温 1.500kW（運転電流 中間期標準 5.6A）"
      },
      {
        "label": "冷媒",
        "value": "R744（CO2） 封入量 0.88kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃（貯湯ユニット・ヒートポンプユニットとも）"
      }
    ],
    "remotes": [
      {
        "model": "BRC083K1",
        "note": "スタイリッシュリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12）。別売。無線LAN対応、JC-STAR認証対応 ★1（レベル1）取得"
      },
      {
        "model": "BRC083K1K",
        "note": "ブラックリモコン（台所リモコン BRC083K11K＋浴室リモコン BRC083K12K）。別売。スタイリッシュリモコンと同じ機能"
      },
      {
        "model": "BRC083K1WK",
        "note": "ホワイト/ブラックリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12K）。別売"
      }
    ],
    "features": [
      "パワフル高圧給湯（330kPa）：3階でのシャワーや2カ所同時給湯にも対応する流量",
      "快速お湯はり",
      "温浴タイム（お好みの温度をキープ）",
      "無線LAN対応リモコンと専用アプリ（Daikin Smart APP）で、外出先や家の中からお湯はり・追いだきなどを操作できる",
      "昼間シフト機能：夜間の沸き上げを抑え、太陽光発電の余剰電力を使って昼間に沸き上げる（開始・終了時刻はリモコンまたはアプリで手動設定）",
      "昼間シフト天気予報連動：翌日の天気予報に合わせて沸き上げのタイミングを自動で判断（Daikin Smart APP でのみ設定可。太陽光発電を設置している家が対象）",
      "気象警報緊急沸き上げ：停電や断水につながる可能性のある警報・注意報が出ると自動で沸き上げ、タンク内の湯量を確保（Daikin Smart APP でのみ設定可）",
      "非常用水取出し：断水したとき、タンク内の水を生活用水として使える（飲用は不可。非常用水コックを標準装備）",
      "停電時出湯対応：停電しても、貯湯ユニットにお湯が残っていればシャワーやじゃ口でお湯が使える（条件あり）",
      "ECHONET Lite 規格＆AIF認証対応（対応 HEMS と連携できる）、ECHONET Lite Web API 対応",
      "ツイン給湯：ふろへの注湯と台所などの給湯を同時に使える",
      "ふろ自動・自動保温／自動たし湯・高温たし湯・エコふろ保温・自動ふろ配管洗浄",
      "ウルトラファインバブル入浴（オプション機能）",
      "電力抑制設定・ピークカット設定"
    ],
    "cautions": [
      "脚部化粧カバー（KKC022E4）は別売",
      "屋内に据え付ける場合は、防水・排水の支障がない所に据え付ける",
      "3階での浴そう湯はりは、フルオートタイプでは別売の「風呂水位センサー」が必要",
      "給水圧力が低いと十分な性能が得られない場合がある（給水の元圧が低い・配管が細い場合は流量が少なくなることがある）",
      "快速お湯はりに設定した場合、自動たし湯は作動しない",
      "リモコンは別売。BRC083K1／BRC083K1K／BRC083K1WK のいずれか1つを選ぶ",
      "ウルトラファインバブル入浴には、別売のウルトラファインバブルアダプターが必要",
      "アプリの利用には、常時接続のインターネット回線・無線LAN環境と、会員サイト CLUB DAIKIN への登録が必要（JC-STAR認証対応リモコンの暗号化方式は WPA2-PSK（AES）、WPA3-Personal。WPA-PSK（AES）には接続できない）",
      "昼間シフト機能は、太陽光発電の電力を優先的に使えるものではない。天候や発電量によっては購入電力が増える場合がある",
      "停電時の出湯は、給湯後1時間以内に停電したとき、最後の給湯から停電までの間に沸き上げ運転をしたとき、給水圧力条件を満たさないときなどは使えない場合がある。お湯の温度は設定どおりにならないことがある",
      "運転音は JIS C 9220 に準拠し無響室で測定した値（音響パワーレベル）。実際に据え付けた状態では表示値より大きくなるのが普通",
      "沸き上げ温度はヒートポンプユニットの出口温度。低外気温では加熱能力が低下する場合がある"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.ac.daikin.co.jp/-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/02/images/202608/hero%20png",
      "pageUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/02",
      "match": "series-representative",
      "checkedAt": "2026-10-14",
      "note": "ページ上部のメインビジュアル。HTML 上の src は「-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/02/images/202608/hero png」（拡張子の前が空白）で、記録した URL は空白を %20 にしたもの（HTTP 200・image/png を確認）。シリーズ名・「460L EA467AFV」「370L EA377AFV」の品番・圧力のバッジな"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/02",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "EA377AFV",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/02",
      "https://ec.daikinaircon.com/ecatalog/DKCA007/index.html",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/function",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/preparation",
      "https://www.ac.daikin.co.jp/jutakushoene/2026",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=EA377AFV"
    ]
  },
  {
    "id": "daikin-ea467afv",
    "slug": "ea467afv",
    "brand": "daikin",
    "category": "ecocute",
    "series": "Aシリーズ",
    "name": "フルオートタイプ Aシリーズ 一般地仕様 角型 EA467AFV 460L（4〜7人向け）",
    "modelNumber": "EA467AFV",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "TA467AFV"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "RQ607AV"
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
      "familySize": "4〜7人向け"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートタイプ"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220：2018）",
        "value": "3.5"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100%（区分 E）"
      },
      {
        "label": "給湯圧力",
        "value": "パワフル高圧給湯 330kPa（減圧弁設定）"
      },
      {
        "label": "減圧弁（設定圧力）",
        "value": "330kPa"
      },
      {
        "label": "逃し弁（設定圧力）",
        "value": "370kPa"
      },
      {
        "label": "水側最高使用圧力",
        "value": "370kPa"
      },
      {
        "label": "沸き上げ温度（範囲）",
        "value": "約65～90℃（ヒートポンプユニットの出口温度）"
      },
      {
        "label": "電源",
        "value": "単相200V／最大電流 19A／電源容量 20A"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ2,175×幅630×奥行き730mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "69kg（満水時 529kg）"
      },
      {
        "label": "貯湯ユニット 種類・設置区分",
        "value": "種類 1缶、設置区分「屋外（防雨型）／屋内設置兼用」"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ635×幅825（+74）×奥行き300mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "50kg"
      },
      {
        "label": "運転音（音響パワーレベル）",
        "value": "中間期 55dB／冬期 58dB"
      },
      {
        "label": "加熱能力",
        "value": "中間期標準 6.0kW／冬期高温 6.0kW"
      },
      {
        "label": "消費電力",
        "value": "中間期標準 1.320kW／冬期高温 2.000kW（運転電流 中間期標準 7.5A）"
      },
      {
        "label": "冷媒",
        "value": "R744（CO2） 封入量 0.96kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃（貯湯ユニット・ヒートポンプユニットとも）"
      }
    ],
    "remotes": [
      {
        "model": "BRC083K1",
        "note": "スタイリッシュリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12）。別売。無線LAN対応、JC-STAR認証対応 ★1（レベル1）取得"
      },
      {
        "model": "BRC083K1K",
        "note": "ブラックリモコン（台所リモコン BRC083K11K＋浴室リモコン BRC083K12K）。別売。スタイリッシュリモコンと同じ機能"
      },
      {
        "model": "BRC083K1WK",
        "note": "ホワイト/ブラックリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12K）。別売"
      }
    ],
    "features": [
      "パワフル高圧給湯（330kPa）：3階でのシャワーや2カ所同時給湯にも対応する流量",
      "快速お湯はり",
      "温浴タイム（お好みの温度をキープ）",
      "無線LAN対応リモコンと専用アプリ（Daikin Smart APP）で、外出先や家の中からお湯はり・追いだきなどを操作できる",
      "昼間シフト機能：夜間の沸き上げを抑え、太陽光発電の余剰電力を使って昼間に沸き上げる（開始・終了時刻はリモコンまたはアプリで手動設定）",
      "昼間シフト天気予報連動：翌日の天気予報に合わせて沸き上げのタイミングを自動で判断（Daikin Smart APP でのみ設定可。太陽光発電を設置している家が対象）",
      "気象警報緊急沸き上げ：停電や断水につながる可能性のある警報・注意報が出ると自動で沸き上げ、タンク内の湯量を確保（Daikin Smart APP でのみ設定可）",
      "非常用水取出し：断水したとき、タンク内の水を生活用水として使える（飲用は不可。非常用水コックを標準装備）",
      "停電時出湯対応：停電しても、貯湯ユニットにお湯が残っていればシャワーやじゃ口でお湯が使える（条件あり）",
      "ECHONET Lite 規格＆AIF認証対応（対応 HEMS と連携できる）、ECHONET Lite Web API 対応",
      "ツイン給湯：ふろへの注湯と台所などの給湯を同時に使える",
      "ふろ自動・自動保温／自動たし湯・高温たし湯・エコふろ保温・自動ふろ配管洗浄",
      "ウルトラファインバブル入浴（オプション機能）",
      "電力抑制設定・ピークカット設定"
    ],
    "cautions": [
      "脚部化粧カバー（KKC022E4）は別売",
      "屋内に据え付ける場合は、防水・排水の支障がない所に据え付ける",
      "3階での浴そう湯はりは、フルオートタイプでは別売の「風呂水位センサー」が必要",
      "給水圧力が低いと十分な性能が得られない場合がある（給水の元圧が低い・配管が細い場合は流量が少なくなることがある）",
      "快速お湯はりに設定した場合、自動たし湯は作動しない",
      "リモコンは別売。BRC083K1／BRC083K1K／BRC083K1WK のいずれか1つを選ぶ",
      "ウルトラファインバブル入浴には、別売のウルトラファインバブルアダプターが必要",
      "アプリの利用には、常時接続のインターネット回線・無線LAN環境と、会員サイト CLUB DAIKIN への登録が必要（JC-STAR認証対応リモコンの暗号化方式は WPA2-PSK（AES）、WPA3-Personal。WPA-PSK（AES）には接続できない）",
      "昼間シフト機能は、太陽光発電の電力を優先的に使えるものではない。天候や発電量によっては購入電力が増える場合がある",
      "停電時の出湯は、給湯後1時間以内に停電したとき、最後の給湯から停電までの間に沸き上げ運転をしたとき、給水圧力条件を満たさないときなどは使えない場合がある。お湯の温度は設定どおりにならないことがある",
      "運転音は JIS C 9220 に準拠し無響室で測定した値（音響パワーレベル）。実際に据え付けた状態では表示値より大きくなるのが普通",
      "沸き上げ温度はヒートポンプユニットの出口温度。低外気温では加熱能力が低下する場合がある"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.ac.daikin.co.jp/-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/02/images/202608/hero%20png",
      "pageUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/02",
      "match": "series-representative",
      "checkedAt": "2026-10-14",
      "note": "ページ上部のメインビジュアル。HTML 上の src は「-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/02/images/202608/hero png」（拡張子の前が空白）で、記録した URL は空白を %20 にしたもの（HTTP 200・image/png を確認）。シリーズ名・「460L EA467AFV」「370L EA377AFV」の品番・圧力のバッジな"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/02",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "EA467AFV",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/02",
      "https://ec.daikinaircon.com/ecatalog/DKCA007/index.html",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/function",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/preparation",
      "https://www.ac.daikin.co.jp/jutakushoene/2026",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=EA467AFV"
    ]
  },
  {
    "id": "daikin-en377afv",
    "slug": "en377afv",
    "brand": "daikin",
    "category": "ecocute",
    "series": "Nシリーズ",
    "name": "フルオートタイプ Nシリーズ 一般地仕様 角型 EN377AFV 370L（3〜5人向け）",
    "modelNumber": "EN377AFV",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "TN377AFV"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "RQ457AV"
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
      "familySize": "3〜5人向け"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートタイプ"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220：2018）",
        "value": "3.5"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100%（区分 E）"
      },
      {
        "label": "給湯圧力",
        "value": "高圧給湯 210kPa（減圧弁設定）"
      },
      {
        "label": "減圧弁（設定圧力）",
        "value": "210kPa"
      },
      {
        "label": "逃し弁（設定圧力）",
        "value": "240kPa"
      },
      {
        "label": "水側最高使用圧力",
        "value": "240kPa"
      },
      {
        "label": "沸き上げ温度（範囲）",
        "value": "約65～90℃（ヒートポンプユニットの出口温度）"
      },
      {
        "label": "電源",
        "value": "単相200V／最大電流 17A／電源容量 20A"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ1,825×幅630×奥行き730mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "59kg（満水時 429kg）"
      },
      {
        "label": "貯湯ユニット 種類・設置区分",
        "value": "種類 1缶、設置区分「屋外（防雨型）／屋内設置兼用」"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ635×幅825（+74）×奥行き300mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "49kg"
      },
      {
        "label": "運転音（音響パワーレベル）",
        "value": "中間期 53dB／冬期 57dB"
      },
      {
        "label": "加熱能力",
        "value": "中間期標準 4.5kW／冬期高温 4.5kW"
      },
      {
        "label": "消費電力",
        "value": "中間期標準 0.995kW／冬期高温 1.500kW（運転電流 中間期標準 5.6A）"
      },
      {
        "label": "冷媒",
        "value": "R744（CO2） 封入量 0.88kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃（貯湯ユニット・ヒートポンプユニットとも）"
      }
    ],
    "remotes": [
      {
        "model": "BRC083K1",
        "note": "スタイリッシュリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12）。別売。無線LAN対応、JC-STAR認証対応 ★1（レベル1）取得"
      },
      {
        "model": "BRC083K1K",
        "note": "ブラックリモコン（台所リモコン BRC083K11K＋浴室リモコン BRC083K12K）。別売。スタイリッシュリモコンと同じ機能"
      },
      {
        "model": "BRC083K1WK",
        "note": "ホワイト/ブラックリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12K）。別売"
      }
    ],
    "features": [
      "高圧給湯（210kPa）：お湯はり、シャワー、2階への給湯が可能",
      "温浴タイム（お好みの温度をキープ）",
      "無線LAN対応リモコンと専用アプリ（Daikin Smart APP）で、外出先や家の中からお湯はり・追いだきなどを操作できる",
      "昼間シフト機能：夜間の沸き上げを抑え、太陽光発電の余剰電力を使って昼間に沸き上げる（開始・終了時刻はリモコンまたはアプリで手動設定）",
      "昼間シフト天気予報連動：翌日の天気予報に合わせて沸き上げのタイミングを自動で判断（Daikin Smart APP でのみ設定可。太陽光発電を設置している家が対象）",
      "気象警報緊急沸き上げ：停電や断水につながる可能性のある警報・注意報が出ると自動で沸き上げ、タンク内の湯量を確保（Daikin Smart APP でのみ設定可）",
      "非常用水取出し：断水したとき、タンク内の水を生活用水として使える（飲用は不可。非常用水コックを標準装備）",
      "停電時出湯対応：停電しても、貯湯ユニットにお湯が残っていればシャワーやじゃ口でお湯が使える（条件あり）",
      "ECHONET Lite 規格＆AIF認証対応（対応 HEMS と連携できる）、ECHONET Lite Web API 対応",
      "ツイン給湯：ふろへの注湯と台所などの給湯を同時に使える",
      "ふろ自動・自動保温／自動たし湯・高温たし湯・エコふろ保温・自動ふろ配管洗浄",
      "ウルトラファインバブル入浴（オプション機能）",
      "電力抑制設定・ピークカット設定"
    ],
    "cautions": [
      "脚部化粧カバー（KKC022E4）は別売",
      "屋内に据え付ける場合は、防水・排水の支障がない所に据え付ける",
      "「快速お湯はり」は非対応",
      "給湯圧力は 210kPa（メーカーの説明では「お湯はり、シャワー、2階への給湯が可能」）",
      "リモコンは別売。BRC083K1／BRC083K1K／BRC083K1WK のいずれか1つを選ぶ",
      "ウルトラファインバブル入浴には、別売のウルトラファインバブルアダプターが必要",
      "アプリの利用には、常時接続のインターネット回線・無線LAN環境と、会員サイト CLUB DAIKIN への登録が必要（JC-STAR認証対応リモコンの暗号化方式は WPA2-PSK（AES）、WPA3-Personal。WPA-PSK（AES）には接続できない）",
      "昼間シフト機能は、太陽光発電の電力を優先的に使えるものではない。天候や発電量によっては購入電力が増える場合がある",
      "停電時の出湯は、給湯後1時間以内に停電したとき、最後の給湯から停電までの間に沸き上げ運転をしたとき、給水圧力条件を満たさないときなどは使えない場合がある。お湯の温度は設定どおりにならないことがある",
      "運転音は JIS C 9220 に準拠し無響室で測定した値（音響パワーレベル）。実際に据え付けた状態では表示値より大きくなるのが普通",
      "沸き上げ温度はヒートポンプユニットの出口温度。低外気温では加熱能力が低下する場合がある"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.ac.daikin.co.jp/-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/05/images/202608/hero%20png",
      "pageUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/05",
      "match": "series-representative",
      "checkedAt": "2026-10-14",
      "note": "ページ上部のメインビジュアル。HTML 上の src は「-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/05/images/202608/hero png」（拡張子の前が空白）で、記録した URL は空白を %20 にしたもの（HTTP 200・image/png を確認）。シリーズ名・「460L EN467AFV」「370L EN377AFV」の品番・圧力のバッジな"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/05",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "EN377AFV",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/05",
      "https://ec.daikinaircon.com/ecatalog/DKCA007/index.html",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/function",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/preparation",
      "https://www.ac.daikin.co.jp/jutakushoene/2026",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=EN377AFV"
    ]
  },
  {
    "id": "daikin-ex377afv",
    "slug": "ex377afv",
    "brand": "daikin",
    "category": "ecocute",
    "series": "Xシリーズ",
    "name": "フルオートタイプ Xシリーズ 一般地仕様 角型 EX377AFV 370L（3〜5人向け）",
    "modelNumber": "EX377AFV",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "TX377AFV"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "RQX457AV"
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
      "familySize": "3〜5人向け"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートタイプ"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220：2018）",
        "value": "3.7"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "105%（区分 E）"
      },
      {
        "label": "給湯圧力",
        "value": "パワフル高圧給湯 330kPa（減圧弁設定）"
      },
      {
        "label": "減圧弁（設定圧力）",
        "value": "330kPa"
      },
      {
        "label": "逃し弁（設定圧力）",
        "value": "370kPa"
      },
      {
        "label": "水側最高使用圧力",
        "value": "370kPa"
      },
      {
        "label": "沸き上げ温度（範囲）",
        "value": "約65～90℃（ヒートポンプユニットの出口温度）"
      },
      {
        "label": "電源",
        "value": "単相200V／最大電流 17A／電源容量 20A"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ1,825×幅630×奥行き730mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "60kg（満水時 430kg）"
      },
      {
        "label": "貯湯ユニット 種類・設置区分",
        "value": "種類 1缶、設置区分「屋外（防雨型）／屋内設置兼用」"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ735×幅825（+74）×奥行き300mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "55kg"
      },
      {
        "label": "運転音（音響パワーレベル）",
        "value": "中間期 53dB／冬期 57dB"
      },
      {
        "label": "加熱能力",
        "value": "中間期標準 4.5kW／冬期高温 4.5kW"
      },
      {
        "label": "消費電力",
        "value": "中間期標準 0.960kW／冬期高温 1.500kW（運転電流 中間期標準 5.5A）"
      },
      {
        "label": "冷媒",
        "value": "R744（CO2） 封入量 1.07kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃（貯湯ユニット・ヒートポンプユニットとも）"
      }
    ],
    "remotes": [
      {
        "model": "BRC083K1",
        "note": "スタイリッシュリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12）。別売。無線LAN対応、JC-STAR認証対応 ★1（レベル1）取得"
      },
      {
        "model": "BRC083K1K",
        "note": "ブラックリモコン（台所リモコン BRC083K11K＋浴室リモコン BRC083K12K）。別売。スタイリッシュリモコンと同じ機能"
      },
      {
        "model": "BRC083K1WK",
        "note": "ホワイト/ブラックリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12K）。別売"
      }
    ],
    "features": [
      "年間給湯保温効率 3.7（省エネ基準達成率 105%）。国の給湯省エネ2026事業で性能加算要件に適合",
      "おゆぴかUV：貯湯ユニット内のUV除菌ユニットを通るおふろのお湯に深紫外線を照射して除菌",
      "パワフル高圧給湯（330kPa）：3階でのシャワーや2カ所同時給湯にも対応する流量",
      "快速お湯はり",
      "温浴タイム（お好みの温度をキープ）",
      "無線LAN対応リモコンと専用アプリ（Daikin Smart APP）で、外出先や家の中からお湯はり・追いだきなどを操作できる",
      "昼間シフト機能：夜間の沸き上げを抑え、太陽光発電の余剰電力を使って昼間に沸き上げる（開始・終了時刻はリモコンまたはアプリで手動設定）",
      "昼間シフト天気予報連動：翌日の天気予報に合わせて沸き上げのタイミングを自動で判断（Daikin Smart APP でのみ設定可。太陽光発電を設置している家が対象）",
      "気象警報緊急沸き上げ：停電や断水につながる可能性のある警報・注意報が出ると自動で沸き上げ、タンク内の湯量を確保（Daikin Smart APP でのみ設定可）",
      "非常用水取出し：断水したとき、タンク内の水を生活用水として使える（飲用は不可。非常用水コックを標準装備）",
      "停電時出湯対応：停電しても、貯湯ユニットにお湯が残っていればシャワーやじゃ口でお湯が使える（条件あり）",
      "ECHONET Lite 規格＆AIF認証対応（対応 HEMS と連携できる）、ECHONET Lite Web API 対応",
      "ツイン給湯：ふろへの注湯と台所などの給湯を同時に使える",
      "ふろ自動・自動保温／自動たし湯・高温たし湯・エコふろ保温・自動ふろ配管洗浄",
      "ウルトラファインバブル入浴（オプション機能）",
      "電力抑制設定・ピークカット設定"
    ],
    "cautions": [
      "脚部化粧カバー（KKC022E4）は別売",
      "屋内に据え付ける場合は、防水・排水の支障がない所に据え付ける",
      "3階での浴そう湯はりは、フルオートタイプでは別売の「風呂水位センサー」が必要",
      "給水圧力が低いと十分な性能が得られない場合がある（給水の元圧が低い・配管が細い場合は流量が少なくなることがある）",
      "快速お湯はりに設定した場合、自動たし湯は作動しない",
      "リモコンは別売。BRC083K1／BRC083K1K／BRC083K1WK のいずれか1つを選ぶ",
      "ウルトラファインバブル入浴には、別売のウルトラファインバブルアダプターが必要",
      "アプリの利用には、常時接続のインターネット回線・無線LAN環境と、会員サイト CLUB DAIKIN への登録が必要（JC-STAR認証対応リモコンの暗号化方式は WPA2-PSK（AES）、WPA3-Personal。WPA-PSK（AES）には接続できない）",
      "昼間シフト機能は、太陽光発電の電力を優先的に使えるものではない。天候や発電量によっては購入電力が増える場合がある",
      "停電時の出湯は、給湯後1時間以内に停電したとき、最後の給湯から停電までの間に沸き上げ運転をしたとき、給水圧力条件を満たさないときなどは使えない場合がある。お湯の温度は設定どおりにならないことがある",
      "運転音は JIS C 9220 に準拠し無響室で測定した値（音響パワーレベル）。実際に据え付けた状態では表示値より大きくなるのが普通",
      "沸き上げ温度はヒートポンプユニットの出口温度。低外気温では加熱能力が低下する場合がある"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.ac.daikin.co.jp/-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/01/images/202608/hero%20png",
      "pageUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/01",
      "match": "series-representative",
      "checkedAt": "2026-10-14",
      "note": "ページ上部のメインビジュアル。HTML 上の src は「-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/01/images/202608/hero png」（拡張子の前が空白）で、記録した URL は空白を %20 にしたもの（HTTP 200・image/png を確認）。シリーズ名・「460L EX467AFV」「370L EX377AFV」の品番・圧力のバッジな"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/01",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "EX377AFV",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/01",
      "https://ec.daikinaircon.com/ecatalog/DKCA007/index.html",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/function",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/preparation",
      "https://www.ac.daikin.co.jp/jutakushoene/2026",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=EX377AFV"
    ]
  },
  {
    "id": "daikin-ea377aftv",
    "slug": "ea377aftv",
    "brand": "daikin",
    "category": "ecocute",
    "series": "Aシリーズ（薄型）",
    "name": "フルオートタイプ Aシリーズ 一般地仕様 薄型 EA377AFTV 370L（3〜5人向け）",
    "modelNumber": "EA377AFTV",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "TA377AFTV"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "RQX457AV"
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
      "familySize": "3〜5人向け"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートタイプ"
    },
    "specifications": [
      {
        "label": "年間給湯保温効率（JIS C 9220：2018）",
        "value": "3.0"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100%（区分 I）"
      },
      {
        "label": "給湯圧力",
        "value": "パワフル高圧給湯 330kPa（減圧弁設定）"
      },
      {
        "label": "減圧弁（設定圧力）",
        "value": "330kPa"
      },
      {
        "label": "逃し弁（設定圧力）",
        "value": "370kPa"
      },
      {
        "label": "水側最高使用圧力",
        "value": "370kPa"
      },
      {
        "label": "沸き上げ温度（範囲）",
        "value": "約65～90℃（ヒートポンプユニットの出口温度）"
      },
      {
        "label": "電源",
        "value": "単相200V／最大電流 17A／電源容量 20A"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ1,813×幅1,075×奥行き438mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "76kg（満水時 446kg）"
      },
      {
        "label": "貯湯ユニット 種類・設置区分",
        "value": "種類 2缶、設置区分「屋外（防雨型）専用」"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ735×幅825（+74）×奥行き300mm"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "55kg"
      },
      {
        "label": "運転音（音響パワーレベル）",
        "value": "中間期 53dB／冬期 57dB"
      },
      {
        "label": "加熱能力",
        "value": "中間期標準 4.5kW／冬期高温 4.5kW"
      },
      {
        "label": "消費電力",
        "value": "中間期標準 0.960kW／冬期高温 1.500kW（運転電流 中間期標準 5.5A）"
      },
      {
        "label": "冷媒",
        "value": "R744（CO2） 封入量 1.07kg"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "-10℃（貯湯ユニット・ヒートポンプユニットとも）"
      }
    ],
    "remotes": [
      {
        "model": "BRC083K1",
        "note": "スタイリッシュリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12）。別売。無線LAN対応、JC-STAR認証対応 ★1（レベル1）取得"
      },
      {
        "model": "BRC083K1K",
        "note": "ブラックリモコン（台所リモコン BRC083K11K＋浴室リモコン BRC083K12K）。別売。スタイリッシュリモコンと同じ機能"
      },
      {
        "model": "BRC083K1WK",
        "note": "ホワイト/ブラックリモコン（台所リモコン BRC083K11＋浴室リモコン BRC083K12K）。別売"
      }
    ],
    "features": [
      "貯湯ユニットの奥行き 438mm の薄型（幅 1,075mm）",
      "パワフル高圧給湯（330kPa）",
      "快速お湯はり",
      "無線LAN対応リモコンと専用アプリ（Daikin Smart APP）で、外出先や家の中からお湯はり・追いだきなどを操作できる",
      "昼間シフト機能：夜間の沸き上げを抑え、太陽光発電の余剰電力を使って昼間に沸き上げる（開始・終了時刻はリモコンまたはアプリで手動設定）",
      "昼間シフト天気予報連動：翌日の天気予報に合わせて沸き上げのタイミングを自動で判断（Daikin Smart APP でのみ設定可。太陽光発電を設置している家が対象）",
      "気象警報緊急沸き上げ：停電や断水につながる可能性のある警報・注意報が出ると自動で沸き上げ、タンク内の湯量を確保（Daikin Smart APP でのみ設定可）",
      "非常用水取出し：断水したとき、タンク内の水を生活用水として使える（飲用は不可。非常用水コックを標準装備）",
      "停電時出湯対応：停電しても、貯湯ユニットにお湯が残っていればシャワーやじゃ口でお湯が使える（条件あり）",
      "ECHONET Lite 規格＆AIF認証対応（対応 HEMS と連携できる）、ECHONET Lite Web API 対応",
      "ツイン給湯：ふろへの注湯と台所などの給湯を同時に使える",
      "ふろ自動・自動保温／自動たし湯・高温たし湯・エコふろ保温・自動ふろ配管洗浄",
      "ウルトラファインバブル入浴（オプション機能）",
      "電力抑制設定・ピークカット設定"
    ],
    "cautions": [
      "屋外設置専用（公式の表示：「屋外設置専用 宅内には設置しないでください」）",
      "脚部化粧カバー（KKC052B4）は別売",
      "「温浴タイム」は非対応",
      "年間給湯保温効率は 3.0（区分 I）で、角型の Aシリーズ（3.5）より低い",
      "3階での浴そう湯はりは、フルオートタイプでは別売の「風呂水位センサー」が必要",
      "給水圧力が低いと十分な性能が得られない場合がある（給水の元圧が低い・配管が細い場合は流量が少なくなることがある）",
      "快速お湯はりに設定した場合、自動たし湯は作動しない",
      "リモコンは別売。BRC083K1／BRC083K1K／BRC083K1WK のいずれか1つを選ぶ",
      "ウルトラファインバブル入浴には、別売のウルトラファインバブルアダプターが必要",
      "アプリの利用には、常時接続のインターネット回線・無線LAN環境と、会員サイト CLUB DAIKIN への登録が必要（JC-STAR認証対応リモコンの暗号化方式は WPA2-PSK（AES）、WPA3-Personal。WPA-PSK（AES）には接続できない）",
      "昼間シフト機能は、太陽光発電の電力を優先的に使えるものではない。天候や発電量によっては購入電力が増える場合がある",
      "停電時の出湯は、給湯後1時間以内に停電したとき、最後の給湯から停電までの間に沸き上げ運転をしたとき、給水圧力条件を満たさないときなどは使えない場合がある。お湯の温度は設定どおりにならないことがある",
      "運転音は JIS C 9220 に準拠し無響室で測定した値（音響パワーレベル）。実際に据え付けた状態では表示値より大きくなるのが普通",
      "沸き上げ温度はヒートポンプユニットの出口温度。低外気温では加熱能力が低下する場合がある"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.ac.daikin.co.jp/-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/03/images/202608/hero%20png",
      "pageUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/03",
      "match": "series-representative",
      "checkedAt": "2026-10-14",
      "note": "ページ上部のメインビジュアル。HTML 上の src は「-/media/Project/Daikin/ac_daikin_co_jp/sumai/alldenka/ecocute/lineup/fullauto/03/images/202608/hero png」（拡張子の前が空白）で、記録した URL は空白を %20 にしたもの（HTTP 200・image/png を確認）。シリーズ名・「460L EA467AFTV」「370L EA377AFTV」の品番・圧力のバッ"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/03",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "EA377AFTV",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/lineup/fullauto/03",
      "https://ec.daikinaircon.com/ecatalog/DKCA007/index.html",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/function",
      "https://www.ac.daikin.co.jp/sumai/alldenka/ecocute/preparation",
      "https://www.ac.daikin.co.jp/jutakushoene/2026",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=EA377AFTV"
    ]
  }
];
