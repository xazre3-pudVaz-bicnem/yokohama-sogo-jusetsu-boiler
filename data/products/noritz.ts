import type { Product } from "@/data/products/types";

/**
 * ノーリツの商品データ。2026-10-14 に、公式サイト・公式カタログで型番と仕様を確かめたもの。
 * 根拠のページは各商品の sources。調査のしかたと記録は docs/PRODUCT_DATA.md。
 * 当社の価格（salesPrice など）は、会社から金額を受け取るまで null（画面では「お見積もり」）。
 * 製品写真は、メーカーの掲載許諾が確認できるまで載せない（imageLicenseStatus: "pending"）。
 */
export const noritzProducts: Product[] = [
  {
    "id": "noritz-gt-c2472aw-1-bl",
    "slug": "gt-c2472aw-1-bl",
    "brand": "noritz",
    "category": "eco-jozu",
    "series": "GT-C（P/V）72シリーズ",
    "name": "ガスふろ給湯器 GT-C（P/V）72シリーズ",
    "modelNumber": "GT-C2472AW-1 BL",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛形"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": null
    },
    "functions": {
      "key": "fullauto",
      "label": "スタンダード（フルオート）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外壁掛設置形・PS標準設置形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気式（押し込み）"
      },
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "質量（本体）",
        "value": "26kg（満水時：28kg）"
      },
      {
        "label": "給湯能力",
        "value": "24号～0.4号（2.4号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：44.1kW（37,900kcal／h） ／ LPG：44.1kW（3.15kg／h）"
      },
      {
        "label": "ガス消費量（ふろ）",
        "value": "都市ガス（12A・13A）：11.6kW（9,980kcal／h） ／ LPG：11.6kW（0.829kg／h）"
      },
      {
        "label": "最大ガス消費量（同時使用時）",
        "value": "都市ガス（12A・13A）：55.7kW（47,900kcal／h） ／ LPG：55.7kW（3.98kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "24L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）92.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "95.00%"
      },
      {
        "label": "熱効率（ふろ）",
        "value": "92.00%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "105W 凍結予防ヒータ：147W 待機時：1.7W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "49dB（給湯＋追いだき：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "プレシャスシルバー"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "都市ガス（12A・13A）：R3／4（20A） ／ LPG：R1／2（15A）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R3／4（20A）"
      },
      {
        "label": "オーバーフロー／ドレン排出",
        "value": "R1／2（15A）／R1／2（15A）"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101EWマルチセット",
        "note": "無線LAN対応高機能リモコン RC-K100Wシリーズ（ガス給湯機器専用）"
      },
      {
        "model": "RC-K101PEWマルチセット",
        "note": "同シリーズ・インターホン付"
      },
      {
        "model": "RC-K161PEWマルチセット",
        "note": "同シリーズ・インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-J100（各種）／RC-B001（各種）"
      }
    ],
    "features": [
      "排気の熱を再利用して水を予備加熱するエコジョーズ（潜熱回収型）。エネルギー消費効率はモード熱効率 92.5%",
      "フルオート（グレードは「スタンダード」）",
      "入浴人数・ふろ湯温・気温からふろ配管の汚れを想定して自動で洗い流す「スマート配管クリーン」（プレミアム・スタンダードに搭載）",
      "「ホッと湯上がりモード」「あったか睡眠サポートモード」に対応（スタンダード以上。RC-KWシリーズとの組合せ時のみ）",
      "無線LAN対応高機能リモコン RC-KWシリーズと組み合わせると、専用の「わかすアプリ」で外出先からお湯はり・追いだきなどを操作できる（組合せ時のみ対応）",
      "電気式浴室暖房乾燥機との連動に対応（RC-KWシリーズとの組合せ時のみ。三菱電機「MyMUアプリ」も必要）",
      "側面近接10mmに対応",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "燃焼時にドレン排出口からドレンが出るため、排水配管の設置が必要（排水口まで配管し、先端は大気開放にして水につからないようにする）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/img/pic_gt-c72.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
    "manufacturerPrice": {
      "amount": 531960,
      "tax": "included",
      "includes": "本体のみ。リモコン（別売品）・別売部材は含まない",
      "asOf": "2026-10-14 に公式サイトが表示していた価格（価格の改定日の記載はページにない）",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
      "https://www.noritz.co.jp/product/js/product_price/product_data.json",
      "https://www.n-techdocs.com/products/118142",
      "https://www.n-techdocs.com/products/118142/documents/132568/spec_csv_download",
      "https://www.noritz.co.jp/product/kyutou_bath/remocon/remocon_k001w.html",
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/"
    ]
  },
  {
    "id": "noritz-gt-c2472saw-1-bl",
    "slug": "gt-c2472saw-1-bl",
    "brand": "noritz",
    "category": "eco-jozu",
    "series": "GT-C（P/V）72シリーズ",
    "name": "ガスふろ給湯器 GT-C（P/V）72シリーズ",
    "modelNumber": "GT-C2472SAW-1 BL",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛形"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": null
    },
    "functions": {
      "key": "auto",
      "label": "シンプル（オート）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外壁掛設置形・PS標準設置形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気式（押し込み）"
      },
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "質量（本体）",
        "value": "26kg（満水時：28kg）"
      },
      {
        "label": "給湯能力",
        "value": "24号～0.4号（2.4号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：44.1kW（37,900kcal／h） ／ LPG：44.1kW（3.15kg／h）"
      },
      {
        "label": "ガス消費量（ふろ）",
        "value": "都市ガス（12A・13A）：11.6kW（9,980kcal／h） ／ LPG：11.6kW（0.829kg／h）"
      },
      {
        "label": "最大ガス消費量（同時使用時）",
        "value": "都市ガス（12A・13A）：55.7kW（47,900kcal／h） ／ LPG：55.7kW（3.98kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "24L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）92.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "95.00%"
      },
      {
        "label": "熱効率（ふろ）",
        "value": "92.00%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "105W 凍結予防ヒータ：147W 待機時：1.7W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "49dB（給湯＋追いだき：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "プレシャスシルバー"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "都市ガス（12A・13A）：R3／4（20A） ／ LPG：R1／2（15A）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R3／4（20A）"
      },
      {
        "label": "オーバーフロー／ドレン排出",
        "value": "R1／2（15A）／R1／2（15A）"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101EWマルチセット",
        "note": "無線LAN対応高機能リモコン RC-K100Wシリーズ（ガス給湯機器専用）"
      },
      {
        "model": "RC-K101PEWマルチセット",
        "note": "同シリーズ・インターホン付"
      },
      {
        "model": "RC-K161PEWマルチセット",
        "note": "同シリーズ・インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-J100（各種）／RC-B001（各種）"
      }
    ],
    "features": [
      "排気の熱を再利用して水を予備加熱するエコジョーズ（潜熱回収型）。エネルギー消費効率はモード熱効率 92.5%",
      "オート（グレードは「シンプル」）",
      "無線LAN対応高機能リモコン RC-KWシリーズと組み合わせると、専用の「わかすアプリ」で外出先からお湯はり・追いだきなどを操作できる（組合せ時のみ対応）",
      "電気式浴室暖房乾燥機との連動に対応（RC-KWシリーズとの組合せ時のみ。三菱電機「MyMUアプリ」も必要）",
      "側面近接10mmに対応",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "燃焼時にドレン排出口からドレンが出るため、排水配管の設置が必要（排水口まで配管し、先端は大気開放にして水につからないようにする）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/img/pic_gt-c72.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
    "manufacturerPrice": {
      "amount": 470140,
      "tax": "included",
      "includes": "本体のみ。リモコン（別売品）・別売部材は含まない",
      "asOf": "2026-10-14 に公式サイトが表示していた価格（価格の改定日の記載はページにない）",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
      "https://www.noritz.co.jp/product/js/product_price/product_data.json",
      "https://www.n-techdocs.com/products/118172",
      "https://www.n-techdocs.com/products/118172/documents/132575/spec_csv_download",
      "https://www.noritz.co.jp/product/kyutou_bath/remocon/remocon_k001w.html",
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/"
    ]
  },
  {
    "id": "noritz-gt-c2072saw-1-bl",
    "slug": "gt-c2072saw-1-bl",
    "brand": "noritz",
    "category": "eco-jozu",
    "series": "GT-C（P/V）72シリーズ",
    "name": "ガスふろ給湯器 GT-C（P/V）72シリーズ",
    "modelNumber": "GT-C2072SAW-1 BL",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛形"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 20,
      "tankLiters": null
    },
    "functions": {
      "key": "auto",
      "label": "シンプル（オート）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外壁掛設置形・PS標準設置形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気式（押し込み）"
      },
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "質量（本体）",
        "value": "26kg（満水時：28kg）"
      },
      {
        "label": "給湯能力",
        "value": "20号～0.4号（2.4号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：36.7kW（31,600kcal／h） ／ LPG：36.7kW（2.62kg／h）"
      },
      {
        "label": "ガス消費量（ふろ）",
        "value": "都市ガス（12A・13A）：11.6kW（9,980kcal／h） ／ LPG：11.6kW（0.829kg／h）"
      },
      {
        "label": "最大ガス消費量（同時使用時）",
        "value": "都市ガス（12A・13A）：47.8kW（41,100kcal／h） ／ LPG：47.8kW（3.41kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "20L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）92.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "95.00%"
      },
      {
        "label": "熱効率（ふろ）",
        "value": "92.00%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "90W 凍結予防ヒータ：147W 待機時：1.7W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "49dB（給湯＋追いだき：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "プレシャスシルバー"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "都市ガス（12A・13A）：R3／4（20A） ／ LPG：R1／2（15A）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R1／2（15A） ／ R3／4（20A）"
      },
      {
        "label": "オーバーフロー／ドレン排出",
        "value": "R1／2（15A）／R1／2（15A）"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101EWマルチセット",
        "note": "無線LAN対応高機能リモコン RC-K100Wシリーズ（ガス給湯機器専用）"
      },
      {
        "model": "RC-K101PEWマルチセット",
        "note": "同シリーズ・インターホン付"
      },
      {
        "model": "RC-K161PEWマルチセット",
        "note": "同シリーズ・インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-J100（各種）／RC-B001（各種）"
      }
    ],
    "features": [
      "排気の熱を再利用して水を予備加熱するエコジョーズ（潜熱回収型）。エネルギー消費効率はモード熱効率 92.5%",
      "オート（グレードは「シンプル」）",
      "無線LAN対応高機能リモコン RC-KWシリーズと組み合わせると、専用の「わかすアプリ」で外出先からお湯はり・追いだきなどを操作できる（組合せ時のみ対応）",
      "電気式浴室暖房乾燥機との連動に対応（RC-KWシリーズとの組合せ時のみ。三菱電機「MyMUアプリ」も必要）",
      "側面近接10mmに対応",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "燃焼時にドレン排出口からドレンが出るため、排水配管の設置が必要（排水口まで配管し、先端は大気開放にして水につからないようにする）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/img/pic_gt-c72.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
    "manufacturerPrice": {
      "amount": 440990,
      "tax": "included",
      "includes": "本体のみ。リモコン（別売品）・別売部材は含まない",
      "asOf": "2026-10-14 に公式サイトが表示していた価格（価格の改定日の記載はページにない）",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
      "https://www.noritz.co.jp/product/js/product_price/product_data.json",
      "https://www.n-techdocs.com/products/118117",
      "https://www.n-techdocs.com/products/118117/documents/132592/spec_csv_download",
      "https://www.noritz.co.jp/product/kyutou_bath/remocon/remocon_k001w.html",
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/"
    ]
  },
  {
    "id": "noritz-gt-c1672saw-1-bl",
    "slug": "gt-c1672saw-1-bl",
    "brand": "noritz",
    "category": "eco-jozu",
    "series": "GT-C（P/V）72シリーズ",
    "name": "ガスふろ給湯器 GT-C（P/V）72シリーズ",
    "modelNumber": "GT-C1672SAW-1 BL",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛形"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 16,
      "tankLiters": null
    },
    "functions": {
      "key": "auto",
      "label": "シンプル（オート）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外壁掛設置形・PS標準設置形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気式（押し込み）"
      },
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "質量（本体）",
        "value": "26kg（満水時：28kg）"
      },
      {
        "label": "給湯能力",
        "value": "16号～0.4号（2.4号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：29.4kW（25,300kcal／h） ／ LPG：29.4kW（2.10kg／h）"
      },
      {
        "label": "ガス消費量（ふろ）",
        "value": "都市ガス（12A・13A）：11.6kW（9,980kcal／h） ／ LPG：11.6kW（0.829kg／h）"
      },
      {
        "label": "最大ガス消費量（同時使用時）",
        "value": "都市ガス（12A・13A）：38.1kW（32,800kcal／h） ／ LPG：38.1kW（2.72kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "16L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）92.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "95.00%"
      },
      {
        "label": "熱効率（ふろ）",
        "value": "92.00%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "90W 凍結予防ヒータ：147W 待機時：1.7W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "49dB（給湯＋追いだき：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "プレシャスシルバー"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "R1／2（15A）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R1／2（15A） ／ R3／4（20A）"
      },
      {
        "label": "オーバーフロー／ドレン排出",
        "value": "R1／2（15A）／R1／2（15A）"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101EWマルチセット",
        "note": "無線LAN対応高機能リモコン RC-K100Wシリーズ（ガス給湯機器専用）"
      },
      {
        "model": "RC-K101PEWマルチセット",
        "note": "同シリーズ・インターホン付"
      },
      {
        "model": "RC-K161PEWマルチセット",
        "note": "同シリーズ・インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-J100（各種）／RC-B001（各種）"
      }
    ],
    "features": [
      "排気の熱を再利用して水を予備加熱するエコジョーズ（潜熱回収型）。エネルギー消費効率はモード熱効率 92.5%",
      "オート（グレードは「シンプル」）",
      "無線LAN対応高機能リモコン RC-KWシリーズと組み合わせると、専用の「わかすアプリ」で外出先からお湯はり・追いだきなどを操作できる（組合せ時のみ対応）",
      "電気式浴室暖房乾燥機との連動に対応（RC-KWシリーズとの組合せ時のみ。三菱電機「MyMUアプリ」も必要）",
      "側面近接10mmに対応",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "燃焼時にドレン排出口からドレンが出るため、排水配管の設置が必要（排水口まで配管し、先端は大気開放にして水につからないようにする）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/img/pic_gt-c72.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
    "manufacturerPrice": {
      "amount": 403920,
      "tax": "included",
      "includes": "本体のみ。リモコン（別売品）・別売部材は含まない",
      "asOf": "2026-10-14 に公式サイトが表示していた価格（価格の改定日の記載はページにない）",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
      "https://www.noritz.co.jp/product/js/product_price/product_data.json",
      "https://www.n-techdocs.com/products/118073",
      "https://www.n-techdocs.com/products/118073/documents/132610/spec_csv_download",
      "https://www.noritz.co.jp/product/kyutou_bath/remocon/remocon_k001w.html",
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/"
    ]
  },
  {
    "id": "noritz-gt-c2472sar-1-bl",
    "slug": "gt-c2472sar-1-bl",
    "brand": "noritz",
    "category": "eco-jozu",
    "series": "GT-C（P/V）72シリーズ",
    "name": "ガスふろ給湯器 GT-C（P/V）72シリーズ",
    "modelNumber": "GT-C2472SAR-1 BL",
    "installationType": {
      "key": "floor",
      "label": "屋外据置形"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": null
    },
    "functions": {
      "key": "auto",
      "label": "シンプル（オート）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外据置設置形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気式（押し込み）"
      },
      {
        "label": "外形寸法",
        "value": "高さ638mm×幅539mm×奥行240mm"
      },
      {
        "label": "質量（本体）",
        "value": "28.5kg（満水時：30.5kg）"
      },
      {
        "label": "給湯能力",
        "value": "24号～0.4号（2.4号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：44.1kW（37,900kcal／h） ／ LPG：44.1kW（3.15kg／h）"
      },
      {
        "label": "ガス消費量（ふろ）",
        "value": "都市ガス（12A・13A）：11.6kW（9,980kcal／h） ／ LPG：11.6kW（0.829kg／h）"
      },
      {
        "label": "最大ガス消費量（同時使用時）",
        "value": "都市ガス（12A・13A）：55.7kW（47,900kcal／h） ／ LPG：55.7kW（3.98kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "24L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）92.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "95.00%"
      },
      {
        "label": "熱効率（ふろ）",
        "value": "92.00%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "105W 凍結予防ヒータ：131W 待機時：1.7W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "49dB（給湯＋追いだき：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "プレシャスシルバー"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "都市ガス（12A・13A）：R3／4（20A） ／ LPG：R1／2（15A）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R3／4（20A）"
      },
      {
        "label": "オーバーフロー／ドレン排出",
        "value": "接続口なし／R1／2(15A)"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101EWマルチセット",
        "note": "無線LAN対応高機能リモコン RC-K100Wシリーズ（ガス給湯機器専用）"
      },
      {
        "model": "RC-K101PEWマルチセット",
        "note": "同シリーズ・インターホン付"
      },
      {
        "model": "RC-K161PEWマルチセット",
        "note": "同シリーズ・インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-J100（各種）／RC-B001（各種）"
      }
    ],
    "features": [
      "排気の熱を再利用して水を予備加熱するエコジョーズ（潜熱回収型）。エネルギー消費効率はモード熱効率 92.5%",
      "オート（グレードは「シンプル」）",
      "無線LAN対応高機能リモコン RC-KWシリーズと組み合わせると、専用の「わかすアプリ」で外出先からお湯はり・追いだきなどを操作できる（組合せ時のみ対応）",
      "電気式浴室暖房乾燥機との連動に対応（RC-KWシリーズとの組合せ時のみ。三菱電機「MyMUアプリ」も必要）",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "燃焼時にドレン排出口からドレンが出るため、排水配管の設置が必要（排水口まで配管し、先端は大気開放にして水につからないようにする）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/img/pic_gt-c72.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
    "manufacturerPrice": {
      "amount": 484770,
      "tax": "included",
      "includes": "本体のみ。リモコン（別売品）・別売部材は含まない",
      "asOf": "2026-10-14 に公式サイトが表示していた価格（価格の改定日の記載はページにない）",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
      "https://www.noritz.co.jp/product/js/product_price/product_data.json",
      "https://www.n-techdocs.com/products/118170",
      "https://www.n-techdocs.com/products/118170/documents/132581/spec_csv_download",
      "https://www.noritz.co.jp/product/kyutou_bath/remocon/remocon_k001w.html",
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/"
    ]
  },
  {
    "id": "noritz-gt-cv2072saw-t-1-bl",
    "slug": "gt-cv2072saw-t-1-bl",
    "brand": "noritz",
    "category": "eco-jozu",
    "series": "GT-C（P/V）72シリーズ",
    "name": "ガスふろ給湯器 GT-C（P/V）72シリーズ",
    "modelNumber": "GT-CV2072SAW-T-1 BL",
    "installationType": {
      "key": "ps-door",
      "label": "PS扉内設置形（集合住宅向け（取替え））"
    },
    "housing": [
      "apartment"
    ],
    "capacity": {
      "gou": 20,
      "tankLiters": null
    },
    "functions": {
      "key": "auto",
      "label": "シンプル（オート）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外壁掛設置前方排気延長形・PS標準設置前方排気延長形・PS扉内設置前方排気延長形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気式（押し込み）"
      },
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "質量（本体）",
        "value": "28kg（満水時：30kg）"
      },
      {
        "label": "給湯能力",
        "value": "20号～0.4号（2.4号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：36.7kW（31,600kcal／h） ／ LPG：36.7kW（2.62kg／h）"
      },
      {
        "label": "ガス消費量（ふろ）",
        "value": "都市ガス（12A・13A）：11.6kW（9,980kcal／h） ／ LPG：11.6kW（0.829kg／h）"
      },
      {
        "label": "最大ガス消費量（同時使用時）",
        "value": "都市ガス（12A・13A）：47.8kW（41,100kcal／h） ／ LPG：47.8kW（3.41kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "20L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）92.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "95.00%"
      },
      {
        "label": "熱効率（ふろ）",
        "value": "92.00%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "105W 凍結予防ヒータ：151W 待機時：2.1W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "49dB（給湯＋追いだき：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "プレシャスシルバー"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "都市ガス（12A・13A）：R3／4（20A） ／ LPG：R1／2（15A）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R1／2（15A） ／ R3／4（20A）"
      },
      {
        "label": "オーバーフロー／ドレン排出",
        "value": "R1／2（15A）／接続口なし"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101EWマルチセット",
        "note": "無線LAN対応高機能リモコン RC-K100Wシリーズ（ガス給湯機器専用）"
      },
      {
        "model": "RC-K101PEWマルチセット",
        "note": "同シリーズ・インターホン付"
      },
      {
        "model": "RC-K161PEWマルチセット",
        "note": "同シリーズ・インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-J100（各種）／RC-B001（各種）"
      }
    ],
    "features": [
      "排気の熱を再利用して水を予備加熱するエコジョーズ（潜熱回収型）。エネルギー消費効率はモード熱効率 92.5%",
      "オート（グレードは「シンプル」）",
      "無線LAN対応高機能リモコン RC-KWシリーズと組み合わせると、専用の「わかすアプリ」で外出先からお湯はり・追いだきなどを操作できる（組合せ時のみ対応）",
      "電気式浴室暖房乾燥機との連動に対応（RC-KWシリーズとの組合せ時のみ。三菱電機「MyMUアプリ」も必要）",
      "側面近接10mmに対応",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "集合住宅向け（取替え）の機種。既存の配管を利用し、ドレン排水を浴槽三方弁でユニットバスの排水口に流す方式で、別途必要部材がある",
      "ドレン排出の接続口はない（別売品に三方弁ユニット CVU-1 がある）",
      "排気延長する場合は、1〜4曲がりとも 7m 以内で施工（排気筒口径φ100）",
      "RCS-2 は対応していない"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/img/pic_gt-c72.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
    "manufacturerPrice": {
      "amount": 465960,
      "tax": "included",
      "includes": "本体のみ。リモコン（別売品）・別売部材は含まない",
      "asOf": "2026-10-14 に公式サイトが表示していた価格（価格の改定日の記載はページにない）",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
      "https://www.noritz.co.jp/product/js/product_price/product_data.json",
      "https://www.n-techdocs.com/products/118268",
      "https://www.n-techdocs.com/products/118268/documents/132633/spec_csv_download",
      "https://www.noritz.co.jp/product/kyutou_bath/remocon/remocon_k001w.html",
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/"
    ]
  },
  {
    "id": "noritz-gt-c2072saw-t-1-bl",
    "slug": "gt-c2072saw-t-1-bl",
    "brand": "noritz",
    "category": "eco-jozu",
    "series": "GT-C（P/V）72シリーズ",
    "name": "ガスふろ給湯器 GT-C（P/V）72シリーズ",
    "modelNumber": "GT-C2072SAW-T-1 BL",
    "installationType": {
      "key": "ps-door",
      "label": "PS扉内設置形"
    },
    "housing": [
      "apartment"
    ],
    "capacity": {
      "gou": 20,
      "tankLiters": null
    },
    "functions": {
      "key": "auto",
      "label": "シンプル（オート）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外壁掛設置前方排気延長形・PS標準設置前方排気延長形・PS扉内設置前方排気延長形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気式（押し込み）"
      },
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "質量（本体）",
        "value": "26.5kg（満水時：28.5kg）"
      },
      {
        "label": "給湯能力",
        "value": "20号～0.4号（2.4号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：36.7kW（31,600kcal／h） ／ LPG：36.7kW（2.62kg／h）"
      },
      {
        "label": "ガス消費量（ふろ）",
        "value": "都市ガス（12A・13A）：11.6kW（9,980kcal／h） ／ LPG：11.6kW（0.829kg／h）"
      },
      {
        "label": "最大ガス消費量（同時使用時）",
        "value": "都市ガス（12A・13A）：47.8kW（41,100kcal／h） ／ LPG：47.8kW（3.41kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "20L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）92.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "95.00%"
      },
      {
        "label": "熱効率（ふろ）",
        "value": "92.00%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "105W 凍結予防ヒータ：147W 待機時：1.7W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "49dB（給湯＋追いだき：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "プレシャスシルバー"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "都市ガス（12A・13A）：R3／4（20A） ／ LPG：R1／2（15A）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R1／2（15A） ／ R3／4（20A）"
      },
      {
        "label": "オーバーフロー／ドレン排出",
        "value": "R1／2（15A）／R1／2（15A）"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101EWマルチセット",
        "note": "無線LAN対応高機能リモコン RC-K100Wシリーズ（ガス給湯機器専用）"
      },
      {
        "model": "RC-K101PEWマルチセット",
        "note": "同シリーズ・インターホン付"
      },
      {
        "model": "RC-K161PEWマルチセット",
        "note": "同シリーズ・インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-J100（各種）／RC-B001（各種）"
      }
    ],
    "features": [
      "排気の熱を再利用して水を予備加熱するエコジョーズ（潜熱回収型）。エネルギー消費効率はモード熱効率 92.5%",
      "オート（グレードは「シンプル」）",
      "無線LAN対応高機能リモコン RC-KWシリーズと組み合わせると、専用の「わかすアプリ」で外出先からお湯はり・追いだきなどを操作できる（組合せ時のみ対応）",
      "電気式浴室暖房乾燥機との連動に対応（RC-KWシリーズとの組合せ時のみ。三菱電機「MyMUアプリ」も必要）",
      "側面近接10mmに対応",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "燃焼時にドレン排出口からドレンが出るため、排水配管の設置が必要（排水口まで配管し、先端は大気開放にして水につからないようにする）",
      "排気延長する場合は、1〜4曲がりとも 7m 以内で施工（排気筒口径φ100）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/img/pic_gt-c72.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
    "manufacturerPrice": {
      "amount": 451880,
      "tax": "included",
      "includes": "本体のみ。リモコン（別売品）・別売部材は含まない",
      "asOf": "2026-10-14 に公式サイトが表示していた価格（価格の改定日の記載はページにない）",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
      "https://www.noritz.co.jp/product/js/product_price/product_data.json",
      "https://www.n-techdocs.com/products/118137",
      "https://www.n-techdocs.com/products/118137/documents/132594/spec_csv_download",
      "https://www.noritz.co.jp/product/kyutou_bath/remocon/remocon_k001w.html",
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/"
    ]
  },
  {
    "id": "noritz-gt-c2072saw-l-1-bl",
    "slug": "gt-c2072saw-l-1-bl",
    "brand": "noritz",
    "category": "eco-jozu",
    "series": "GT-C（P/V）72シリーズ",
    "name": "ガスふろ給湯器 GT-C（P/V）72シリーズ",
    "modelNumber": "GT-C2072SAW-L-1 BL",
    "installationType": {
      "key": "ps-standard",
      "label": "PSアルコーブ設置形"
    },
    "housing": [
      "apartment"
    ],
    "capacity": {
      "gou": 20,
      "tankLiters": null
    },
    "functions": {
      "key": "auto",
      "label": "シンプル（オート）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外壁掛設置形・PSアルコーブ設置形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気式（押し込み）"
      },
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "質量（本体）",
        "value": "27kg（満水時：29kg）"
      },
      {
        "label": "給湯能力",
        "value": "20号～0.4号（2.4号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：36.7kW（31,600kcal／h） ／ LPG：36.7kW（2.62kg／h）"
      },
      {
        "label": "ガス消費量（ふろ）",
        "value": "都市ガス（12A・13A）：11.6kW（9,980kcal／h） ／ LPG：11.6kW（0.829kg／h）"
      },
      {
        "label": "最大ガス消費量（同時使用時）",
        "value": "都市ガス（12A・13A）：47.8kW（41,100kcal／h） ／ LPG：47.8kW（3.41kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "20L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）92.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "95.00%"
      },
      {
        "label": "熱効率（ふろ）",
        "value": "92.00%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "105W 凍結予防ヒータ：147W 待機時：1.7W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "49dB（給湯＋追いだき：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "プレシャスシルバー"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "都市ガス（12A・13A）：R3／4（20A） ／ LPG：R1／2（15A）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R1／2（15A） ／ R3／4（20A）"
      },
      {
        "label": "オーバーフロー／ドレン排出",
        "value": "R1／2（15A）／R1／2（15A）"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101EWマルチセット",
        "note": "無線LAN対応高機能リモコン RC-K100Wシリーズ（ガス給湯機器専用）"
      },
      {
        "model": "RC-K101PEWマルチセット",
        "note": "同シリーズ・インターホン付"
      },
      {
        "model": "RC-K161PEWマルチセット",
        "note": "同シリーズ・インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-J100（各種）／RC-B001（各種）"
      }
    ],
    "features": [
      "排気の熱を再利用して水を予備加熱するエコジョーズ（潜熱回収型）。エネルギー消費効率はモード熱効率 92.5%",
      "オート（グレードは「シンプル」）",
      "無線LAN対応高機能リモコン RC-KWシリーズと組み合わせると、専用の「わかすアプリ」で外出先からお湯はり・追いだきなどを操作できる（組合せ時のみ対応）",
      "電気式浴室暖房乾燥機との連動に対応（RC-KWシリーズとの組合せ時のみ。三菱電機「MyMUアプリ」も必要）",
      "側面近接10mmに対応",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "燃焼時にドレン排出口からドレンが出るため、排水配管の設置が必要（排水口まで配管し、先端は大気開放にして水につからないようにする）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/img/pic_gt-c72.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
    "manufacturerPrice": {
      "amount": 451880,
      "tax": "included",
      "includes": "本体のみ。リモコン（別売品）・別売部材は含まない",
      "asOf": "2026-10-14 に公式サイトが表示していた価格（価格の改定日の記載はページにない）",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/gasfuro_c72.html",
      "https://www.noritz.co.jp/product/js/product_price/product_data.json",
      "https://www.n-techdocs.com/products/118130",
      "https://www.n-techdocs.com/products/118130/documents/132597/spec_csv_download",
      "https://www.noritz.co.jp/product/kyutou_bath/remocon/remocon_k001w.html",
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/"
    ]
  },
  {
    "id": "noritz-gt-2070saw-1-bl",
    "slug": "gt-2070saw-1-bl",
    "brand": "noritz",
    "category": "gas",
    "series": "GT-70シリーズ（ユコアGT）",
    "name": "ガスふろ給湯器 設置フリー形 シンプル オート",
    "modelNumber": "GT-2070SAW-1 BL",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛形"
    },
    "housing": [
      "detached",
      "apartment"
    ],
    "capacity": {
      "gou": 20,
      "tankLiters": null
    },
    "functions": {
      "key": "auto",
      "label": "シンプル（オート）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外壁掛設置形・PS標準設置形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気式（押し込み）"
      },
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "質量（本体）",
        "value": "22.5kg（満水時：23.6kg）"
      },
      {
        "label": "給湯能力",
        "value": "20号～0.4号（2.1号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：42.1kW（36,200kcal／h） ／ LPG：42.1kW（3.01kg／h）"
      },
      {
        "label": "ガス消費量（ふろ）",
        "value": "都市ガス（12A・13A）：12.8kW（11,000kcal／h） ／ LPG：12.8kW（0.91kg／h）"
      },
      {
        "label": "最大ガス消費量（同時使用時）",
        "value": "都市ガス（12A・13A）：54.8kW（47,100kcal／h） ／ LPG：54.8kW（3.91kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "20L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）82.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "83.00%"
      },
      {
        "label": "熱効率（ふろ）",
        "value": "82.00%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "115W 凍結予防ヒータ：125W 待機時：1.7W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "49dB（給湯＋追いだき：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "GQホワイト（近似色：マンセルNo.9.3YR8.4／1.0）"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "都市ガス（12A・13A）：R3／4（20A） ／ LPG：R1／2（15A）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R1／2（15A） ／ R3／4（20A）"
      },
      {
        "label": "オーバーフロー／ドレン排出",
        "value": "R1／2（15A）／接続口なし"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101EWマルチセット",
        "note": "無線LAN対応高機能リモコン"
      },
      {
        "model": "RC-J101Eマルチセット",
        "note": "ベーシックリモコン"
      }
    ],
    "features": [
      "従来型（非エコジョーズ）のガスふろ給湯器。エネルギー消費効率はモード熱効率 82.5%",
      "オート（グレードは「シンプル」）",
      "RC-K101系マルチリモコンに対応",
      "側面近接10mmに対応",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "従来型のため、国の「給湯省エネ2026事業」の対象機器ではない（制度の対象はエコキュート・ハイブリッド給湯機・エネファーム）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/img/pic_gt_2470.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
    "manufacturerPrice": {
      "amount": 431860,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材は含まない",
      "asOf": "公式PDFカタログ（/product/PDF/gt-70.pdf、カタログ131ページ）。カタログの発行時期の記載は未確認",
      "sourceUrl": "https://www.noritz.co.jp/product/PDF/gt-70.pdf"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gasfuro_eco/",
      "https://www.noritz.co.jp/product/PDF/gt-70.pdf",
      "https://www.n-techdocs.com/products/118022",
      "https://www.n-techdocs.com/products/118022/documents/132700/spec_csv_download",
      "https://www.noritz.co.jp/product/kyutou_bath/remocon/remocon_k001w.html"
    ]
  },
  {
    "id": "noritz-gq-c1634ws",
    "slug": "gq-c1634ws",
    "brand": "noritz",
    "category": "eco-jozu",
    "series": "GQ-C34WSシリーズ",
    "name": "ガス給湯器 GQ-C34WSシリーズ",
    "modelNumber": "GQ-C1634WS",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛形（PS標準設置形）"
    },
    "housing": [
      "detached",
      "apartment"
    ],
    "capacity": {
      "gou": 16,
      "tankLiters": null
    },
    "functions": {
      "key": "hot-water-only",
      "label": "給湯専用（オートストップ）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外設置壁掛形・PS標準設置形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気方式"
      },
      {
        "label": "外形寸法",
        "value": "高さ520mm×幅350mm×奥行170mm"
      },
      {
        "label": "質量（本体）",
        "value": "17.0kg（満水時：18.0kg）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス：30.0kW（25,800kcal/h） ／ LPG：30.0kW（2.14kg/h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "16L/min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）90.8%"
      },
      {
        "label": "消費電力",
        "value": "30W 凍結予防ヒータ：133W 待機時消費電力：1.1W"
      },
      {
        "label": "騒音値（最大時：Aレンジ）",
        "value": "50dB以下（給湯：無響音室での測定値）"
      },
      {
        "label": "本体外装色",
        "value": "GQホワイト"
      }
    ],
    "remotes": [
      {
        "model": "RC-7607M",
        "note": "台所リモコン（オートストップありタイプ）"
      },
      {
        "model": "RC-7607S",
        "note": "浴室リモコン（オートストップありタイプ）"
      },
      {
        "model": "RC-7606M",
        "note": "台所リモコン（オートストップなしタイプ）"
      },
      {
        "model": "RC-7606S",
        "note": "浴室リモコン（オートストップなしタイプ）"
      }
    ],
    "features": [
      "給湯専用のエコジョーズ（潜熱回収型）。エネルギー消費効率はモード熱効率 90.8%",
      "設定した湯量でお湯はりを止めるオートストップに対応（オートストップありタイプのリモコンとの組合せ）",
      "設置形態は、屋外壁掛形（PS標準設置形）のほか、PS扉内設置形（GQ-C1634WS-T）などがある"
    ],
    "cautions": [
      "燃焼時に排水接続口からドレン水が出るため、排水配管が必要",
      "ソーラー接続は不可（本体操作時・オートストップなしリモコン接続時は可だが、設定温度にならない場合がある）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/common/img/product/kyutoki/gus/gus_eco/pic_gq_c2434ws.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gas_eco/gas_c34ws.html",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gas_eco/gas_c34ws.html",
    "manufacturerPrice": {
      "amount": 218020,
      "tax": "included",
      "includes": "本体のみ。リモコン（別売品）・別売部材は含まない",
      "asOf": "2026-10-14 に公式サイトが表示していた価格（価格の改定日の記載はページにない）",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gas_eco/gas_c34ws.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gas_eco/gas_c34ws.html",
      "https://www.noritz.co.jp/product/js/product_price/product_data.json",
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gas_eco/",
      "https://www.n-techdocs.com/products/18522",
      "https://www.n-techdocs.com/products/18522/documents/30785/download"
    ]
  },
  {
    "id": "noritz-gq-1679ws",
    "slug": "gq-1679ws",
    "brand": "noritz",
    "category": "gas",
    "series": "GQ-79WSシリーズ（ユコアGQ-WS）",
    "name": "ガス給湯器 給湯専用 オートストップ",
    "modelNumber": "GQ-1679WS",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛形"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 16,
      "tankLiters": null
    },
    "functions": {
      "key": "hot-water-only",
      "label": "給湯専用（オートストップ）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "設置できる形（メーカーの区分）",
        "value": "屋外壁掛設置形"
      },
      {
        "label": "給排気方式",
        "value": "強制排気方式"
      },
      {
        "label": "外形寸法",
        "value": "高さ520mm×幅350mm×奥行170mm"
      },
      {
        "label": "質量（本体）",
        "value": "14kg（満水時：15kg）"
      },
      {
        "label": "給湯能力",
        "value": "16号～2.0号（2.3号未満は間欠燃焼）"
      },
      {
        "label": "ガス消費量（給湯・最大）",
        "value": "都市ガス（12A・13A）：33.4kW（28,700kcal／h） ／ LPG：33.4kW（2.39kg／h）"
      },
      {
        "label": "出湯量（水温＋25℃）",
        "value": "16L／min"
      },
      {
        "label": "エネルギー消費効率",
        "value": "（モード）82.5%"
      },
      {
        "label": "熱効率（給湯）",
        "value": "83.0%"
      },
      {
        "label": "電源",
        "value": "AC100V（50／60Hz）電源コード長さ：約1.8m（機器外長さ）"
      },
      {
        "label": "消費電力",
        "value": "31W 凍結予防ヒータ：116W 待機時：1W"
      },
      {
        "label": "騒音値（Aレンジ）",
        "value": "50dB以下"
      },
      {
        "label": "本体外装色",
        "value": "GQホワイト（近似色：マンセルNo.9.3YR8.4／1.0）"
      },
      {
        "label": "配管接続口径（ガス）",
        "value": "R1／2（15A）（TU接続可）"
      },
      {
        "label": "配管接続口径（給水・給湯）",
        "value": "R3／4（20A） ／ R1／2（15A）"
      }
    ],
    "remotes": [
      {
        "model": "RC-7907M",
        "note": "台所リモコン（オートストップタイプ）"
      },
      {
        "model": "RC-B907S",
        "note": "浴室リモコン（オートストップタイプ）"
      },
      {
        "model": "RC-7906M",
        "note": "台所リモコン（オートストップなしタイプ）"
      },
      {
        "model": "RC-7906S",
        "note": "浴室リモコン（オートストップなしタイプ）"
      }
    ],
    "features": [
      "従来型（非エコジョーズ）の給湯専用ガス給湯器。エネルギー消費効率はモード熱効率 82.5%",
      "オートストップタイプのリモコンと組み合わせると、設定した湯量でお湯はりを止められる",
      "集合住宅向けには PS標準設置形（-PS）・PS扉内設置形（-T）などの別型番がある",
      "標準塗装が、日本冷凍空調工業会標準規格（JRA9002）の耐塩害仕様をクリア"
    ],
    "cautions": [
      "最高使用温度は60℃。リモコン未接続時は60℃固定出湯となり、オートストップ機能は作動しない",
      "リモコンの対応個数は合計2個まで（台所・浴室リモコンはそれぞれ複数接続できない）",
      "浴槽の落とし込みにオートストップを使う場合は、サーモ付混合水栓以外の水栓を使う",
      "従来型のため、国の「給湯省エネ2026事業」の対象機器ではない"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/gas/gas_eco/img/img_gq79ws.png",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gas_eco/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/gas/gas_eco/",
    "manufacturerPrice": {
      "amount": 174350,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材は含まない",
      "asOf": "公式PDFカタログ（/product/PDF/gq-79ws.pdf、カタログ149ページ）。製品データサービスでは「2026年9月発売〜」",
      "sourceUrl": "https://www.noritz.co.jp/product/PDF/gq-79ws.pdf"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "not-target",
    "subsidyProgram": null,
    "subsidyAmount": null,
    "subsidyVerifiedAt": null,
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/gas/gas_eco/",
      "https://www.noritz.co.jp/product/PDF/gq-79ws.pdf",
      "https://www.n-techdocs.com/products/131881",
      "https://www.n-techdocs.com/products/131881/documents/136743/spec_csv_download"
    ]
  },
  {
    "id": "noritz-sh-q1401-bl-hp-2233-bl-gt-c2472aw-1-bl",
    "slug": "sh-q1401-bl-hp-2233-bl-gt-c2472aw-1-bl",
    "brand": "noritz",
    "category": "hybrid",
    "series": "自然冷媒ハイブリッド給湯機 HPHB R290",
    "name": "HPHB R290 145L MODEL（ふろ・給湯タイプのシステム構成例）",
    "modelNumber": "SH-Q1401 BL + HP-2233 BL + GT-C2472AW-1 BL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HP-2233"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "SH-Q1401 BL"
      },
      {
        "label": "ガス熱源機",
        "model": "GT-C2472AW-1 BL"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（タンク・ヒートポンプ）＋ガス熱源機"
    },
    "housing": [
      "detached",
      "apartment"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": 145
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオート（ふろ給湯）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "タンク容量",
        "value": "145L"
      },
      {
        "label": "貯湯ユニットの外形寸法",
        "value": "高さ1750mm×幅500mm×奥行400mm"
      },
      {
        "label": "貯湯ユニットの質量",
        "value": "40kg（乾燥時）"
      },
      {
        "label": "配管カバー",
        "value": "同梱"
      },
      {
        "label": "ヒートポンプユニットの外形寸法",
        "value": "高さ660mm×幅700mm×奥行250mm"
      },
      {
        "label": "ヒートポンプユニットの質量",
        "value": "25kg"
      },
      {
        "label": "冷媒の種類／冷媒充填量",
        "value": "R290／225g"
      },
      {
        "label": "ヒートポンプユニットの騒音値",
        "value": "45dB"
      },
      {
        "label": "ヒートポンプユニットの電源",
        "value": "AC100V（50／60Hz）分電盤直結"
      },
      {
        "label": "給湯器（GT-C2472AW-1 BL）の外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "給湯器（GT-C2472AW-1 BL）の質量",
        "value": "26kg（満水時：28kg）"
      },
      {
        "label": "年間給湯効率",
        "value": "150.3%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "150.3%（ヒートポンプユニット HP-2233 の登録値）"
      },
      {
        "label": "設置可能な最低外気温度",
        "value": "-15℃（3地域以南。-10℃以下の地域は給湯器を JKR仕様に変更）"
      },
      {
        "label": "設置奥行寸法",
        "value": "500mm（条件あり）"
      },
      {
        "label": "構成",
        "value": "熱源分離型"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101PEWマルチセット（HB）",
        "note": "システム構成例のマルチリモコン（インターホン付）"
      },
      {
        "model": "RC-K161PEWマルチセット（HB）",
        "note": "インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-K101EWマルチセット（HB）"
      }
    ],
    "features": [
      "ヒートポンプ（電気）でお湯をつくって貯め、足りない分をガス給湯器（バックアップ熱源機）で補う貯湯式のハイブリッド給湯機",
      "ヒートポンプの冷媒に自然冷媒 R290 を使用（冷媒充填量 225g）",
      "家庭ごとの使用量を学習・予測して貯湯を制御する「スマート制御」",
      "太陽光発電の電力を使って貯湯する「消費優先モード」を搭載",
      "停電やガスの供給停止のときも、貯湯タンクのお湯を取り出せる",
      "給湯器（バックアップ熱源機）は GT-C72（-1）シリーズ（暖房機能なし）と GTH-C71／70シリーズ（暖房機能あり）から選べる"
    ],
    "cautions": [
      "塩害仕様は標準（JRA9002 の耐塩害仕様）。設置場所の条件は「海から約300m〜1km離れた場所」「建物の影になるなど、直接潮風が当たらない場所」",
      "奥行500mmでの設置（D500）には条件があり、ガスふろ給湯器エコジョーズ（GT-C）の場合は丸形排気（T）タイプを選ぶ",
      "貯湯ユニットは基礎工事が必要"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/img/img_145.jpg",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "match": "exact-model",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_145.html",
    "manufacturerPrice": {
      "amount": 988900,
      "tax": "included",
      "includes": "貯湯ユニット・ヒートポンプユニット・給湯器・マルチリモコンの希望小売価格の合計。据置台・配管セットなどの必要部材と工事費は含まない",
      "asOf": "自然冷媒ハイブリッド給湯機HPHB R290総合カタログ 2026.3（ツールNo.1160092）／2026-10-14 の公式ページ",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_145.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "HP-2233",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_145.html",
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "https://www.noritz.co.jp/product/hojokin/kyuutou-shouene2026/",
      "https://noritz.mediapress-net.com/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=NRZ50001&categoryID=&catalogID=24618810000&catalogCategoryID=&pageGroupID=&pageID=&designID=NRZD001",
      "https://www.n-techdocs.com/products/118963",
      "https://www.n-techdocs.com/products/118964",
      "https://www.n-techdocs.com/products/126761"
    ]
  },
  {
    "id": "noritz-sh-q1401-bl-hp-2233-bl-gth-c2471awd-bl",
    "slug": "sh-q1401-bl-hp-2233-bl-gth-c2471awd-bl",
    "brand": "noritz",
    "category": "hybrid",
    "series": "自然冷媒ハイブリッド給湯機 HPHB R290",
    "name": "HPHB R290 145L MODEL（暖房・ふろ・給湯タイプのシステム構成例）",
    "modelNumber": "SH-Q1401 BL + HP-2233 BL + GTH-C2471AWD BL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HP-2233"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "SH-Q1401 BL"
      },
      {
        "label": "ガス熱源機",
        "model": "GTH-C2471AWD BL"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（タンク・ヒートポンプ）＋ガス熱源機"
    },
    "housing": [
      "detached",
      "apartment"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": 145
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオート（暖房つき）"
    },
    "heating": true,
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "タンク容量",
        "value": "145L"
      },
      {
        "label": "貯湯ユニットの外形寸法",
        "value": "高さ1750mm×幅500mm×奥行400mm"
      },
      {
        "label": "貯湯ユニットの質量",
        "value": "40kg（乾燥時）"
      },
      {
        "label": "配管カバー",
        "value": "同梱"
      },
      {
        "label": "ヒートポンプユニットの外形寸法",
        "value": "高さ660mm×幅700mm×奥行250mm"
      },
      {
        "label": "ヒートポンプユニットの質量",
        "value": "25kg"
      },
      {
        "label": "冷媒の種類／冷媒充填量",
        "value": "R290／225g"
      },
      {
        "label": "ヒートポンプユニットの騒音値",
        "value": "45dB"
      },
      {
        "label": "ヒートポンプユニットの電源",
        "value": "AC100V（50／60Hz）分電盤直結"
      },
      {
        "label": "年間給湯効率",
        "value": "150.3%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "150.3%（ヒートポンプユニット HP-2233 の登録値）"
      },
      {
        "label": "設置可能な最低外気温度",
        "value": "-15℃（3地域以南。-10℃以下の地域は給湯器を JKR仕様に変更）"
      },
      {
        "label": "設置奥行寸法",
        "value": "500mm（条件あり）"
      },
      {
        "label": "構成",
        "value": "熱源分離型"
      }
    ],
    "remotes": [
      {
        "model": "RC-K102PEWマルチセット（HB）",
        "note": "システム構成例のマルチリモコン（インターホン付）"
      },
      {
        "model": "RC-K162PEWマルチセット（HB）",
        "note": "インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-K102EWマルチセット（HB）"
      }
    ],
    "features": [
      "ヒートポンプ（電気）でお湯をつくって貯め、足りない分をガス給湯器（バックアップ熱源機）で補う貯湯式のハイブリッド給湯機",
      "ヒートポンプの冷媒に自然冷媒 R290 を使用（冷媒充填量 225g）",
      "家庭ごとの使用量を学習・予測して貯湯を制御する「スマート制御」",
      "太陽光発電の電力を使って貯湯する「消費優先モード」を搭載",
      "停電やガスの供給停止のときも、貯湯タンクのお湯を取り出せる",
      "給湯器（バックアップ熱源機）は GT-C72（-1）シリーズ（暖房機能なし）と GTH-C71／70シリーズ（暖房機能あり）から選べる"
    ],
    "cautions": [
      "塩害仕様は標準（JRA9002 の耐塩害仕様）。設置場所の条件は「海から約300m〜1km離れた場所」「建物の影になるなど、直接潮風が当たらない場所」",
      "奥行500mmでの設置（D500）には条件があり、ガスふろ給湯器エコジョーズ（GT-C）の場合は丸形排気（T）タイプを選ぶ",
      "貯湯ユニットは基礎工事が必要"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/img/img_145.jpg",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "match": "exact-model",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_145.html",
    "manufacturerPrice": {
      "amount": 1110670,
      "tax": "included",
      "includes": "貯湯ユニット・ヒートポンプユニット・給湯器・マルチリモコンの希望小売価格の合計。据置台・配管セットなどの必要部材と工事費は含まない",
      "asOf": "自然冷媒ハイブリッド給湯機HPHB R290総合カタログ 2026.3（ツールNo.1160092）／2026-10-14 の公式ページ",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_145.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "HP-2233",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_145.html",
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "https://www.noritz.co.jp/product/hojokin/kyuutou-shouene2026/",
      "https://noritz.mediapress-net.com/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=NRZ50001&categoryID=&catalogID=24618810000&catalogCategoryID=&pageGroupID=&pageID=&designID=NRZD001",
      "https://www.n-techdocs.com/products/118963",
      "https://www.n-techdocs.com/products/118964",
      "https://www.n-techdocs.com/products/126761"
    ]
  },
  {
    "id": "noritz-sh-q0701-bl-hp-2233-bl-gt-c2472aw-1-bl",
    "slug": "sh-q0701-bl-hp-2233-bl-gt-c2472aw-1-bl",
    "brand": "noritz",
    "category": "hybrid",
    "series": "自然冷媒ハイブリッド給湯機 HPHB R290",
    "name": "HPHB R290 70L MODEL 標準機（ふろ・給湯タイプのシステム構成例）",
    "modelNumber": "SH-Q0701 BL + HP-2233 BL + GT-C2472AW-1 BL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HP-2233"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "SH-Q0701 BL"
      },
      {
        "label": "ガス熱源機",
        "model": "GT-C2472AW-1 BL"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（タンク・ヒートポンプ）＋ガス熱源機"
    },
    "housing": [
      "detached",
      "apartment"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": 70
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオート（ふろ給湯）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "タンク容量",
        "value": "70L"
      },
      {
        "label": "貯湯ユニットの外形寸法",
        "value": "高さ950mm×幅500mm×奥行400mm"
      },
      {
        "label": "貯湯ユニットの質量",
        "value": "26kg（満水時：98kg）"
      },
      {
        "label": "配管カバー",
        "value": "別売品"
      },
      {
        "label": "ヒートポンプユニットの外形寸法",
        "value": "高さ660mm×幅700mm×奥行250mm"
      },
      {
        "label": "ヒートポンプユニットの質量",
        "value": "25kg"
      },
      {
        "label": "冷媒の種類／冷媒充填量",
        "value": "R290／225g"
      },
      {
        "label": "ヒートポンプユニットの騒音値",
        "value": "45dB"
      },
      {
        "label": "ヒートポンプユニットの電源",
        "value": "AC100V（50／60Hz）分電盤直結"
      },
      {
        "label": "給湯器（GT-C2472AW-1 BL）の外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "給湯器（GT-C2472AW-1 BL）の質量",
        "value": "26kg（満水時：28kg）"
      },
      {
        "label": "年間給湯効率",
        "value": "134.2%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "150.3%（ヒートポンプユニット HP-2233 の登録値）"
      },
      {
        "label": "設置可能な最低外気温度",
        "value": "-15℃（3地域以南。-10℃以下の地域は給湯器を JKR仕様に変更）"
      },
      {
        "label": "設置奥行寸法",
        "value": "500mm（条件あり）"
      },
      {
        "label": "構成",
        "value": "熱源分離型"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101PEWマルチセット（HB）",
        "note": "システム構成例のマルチリモコン（インターホン付）"
      },
      {
        "model": "RC-K161PEWマルチセット（HB）",
        "note": "インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-K101EWマルチセット（HB）"
      }
    ],
    "features": [
      "ヒートポンプ（電気）でお湯をつくって貯め、足りない分をガス給湯器（バックアップ熱源機）で補う貯湯式のハイブリッド給湯機",
      "ヒートポンプの冷媒に自然冷媒 R290 を使用（冷媒充填量 225g）",
      "家庭ごとの使用量を学習・予測して貯湯を制御する「スマート制御」",
      "太陽光発電の電力を使って貯湯する「消費優先モード」を搭載",
      "停電やガスの供給停止のときも、貯湯タンクのお湯を取り出せる",
      "給湯器（バックアップ熱源機）は GT-C72（-1）シリーズ（暖房機能なし）と GTH-C71／70シリーズ（暖房機能あり）から選べる",
      "貯湯ユニットは 26kg（満水時 98kg）で、基礎工事を省略できる（省略する場合は、振れ止め金具SH01と簡易設置台70Lを選定）"
    ],
    "cautions": [
      "塩害仕様は標準（JRA9002 の耐塩害仕様）。設置場所の条件は「海から約300m〜1km離れた場所」「建物の影になるなど、直接潮風が当たらない場所」",
      "奥行500mmでの設置（D500）には条件があり、ガスふろ給湯器エコジョーズ（GT-C）の場合は丸形排気（T）タイプを選ぶ",
      "基礎工事を省略する場合は、振れ止め金具SH01と簡易設置台70Lが必要",
      "70Lモデルは、貯湯ユニットの配管カバーが別売品"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/img/img_70.jpg",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "match": "exact-model",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_70.html",
    "manufacturerPrice": {
      "amount": 939400,
      "tax": "included",
      "includes": "貯湯ユニット・ヒートポンプユニット・給湯器・マルチリモコンの希望小売価格の合計。据置台・配管セットなどの必要部材と工事費は含まない",
      "asOf": "自然冷媒ハイブリッド給湯機HPHB R290総合カタログ 2026.3（ツールNo.1160092）／2026-10-14 の公式ページ",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_70.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "HP-2233",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_70.html",
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "https://www.noritz.co.jp/product/hojokin/kyuutou-shouene2026/",
      "https://noritz.mediapress-net.com/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=NRZ50001&categoryID=&catalogID=24618810000&catalogCategoryID=&pageGroupID=&pageID=&designID=NRZD001",
      "https://www.n-techdocs.com/products/118962",
      "https://www.n-techdocs.com/products/118964"
    ]
  },
  {
    "id": "noritz-sh-q0701-bl-hp-2233-bl-gth-c2471awd-bl",
    "slug": "sh-q0701-bl-hp-2233-bl-gth-c2471awd-bl",
    "brand": "noritz",
    "category": "hybrid",
    "series": "自然冷媒ハイブリッド給湯機 HPHB R290",
    "name": "HPHB R290 70L MODEL 標準機（暖房・ふろ・給湯タイプのシステム構成例）",
    "modelNumber": "SH-Q0701 BL + HP-2233 BL + GTH-C2471AWD BL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HP-2233"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "SH-Q0701 BL"
      },
      {
        "label": "ガス熱源機",
        "model": "GTH-C2471AWD BL"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（タンク・ヒートポンプ）＋ガス熱源機"
    },
    "housing": [
      "detached",
      "apartment"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": 70
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオート（暖房つき）"
    },
    "heating": true,
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "タンク容量",
        "value": "70L"
      },
      {
        "label": "貯湯ユニットの外形寸法",
        "value": "高さ950mm×幅500mm×奥行400mm"
      },
      {
        "label": "貯湯ユニットの質量",
        "value": "26kg（満水時：98kg）"
      },
      {
        "label": "配管カバー",
        "value": "別売品"
      },
      {
        "label": "ヒートポンプユニットの外形寸法",
        "value": "高さ660mm×幅700mm×奥行250mm"
      },
      {
        "label": "ヒートポンプユニットの質量",
        "value": "25kg"
      },
      {
        "label": "冷媒の種類／冷媒充填量",
        "value": "R290／225g"
      },
      {
        "label": "ヒートポンプユニットの騒音値",
        "value": "45dB"
      },
      {
        "label": "ヒートポンプユニットの電源",
        "value": "AC100V（50／60Hz）分電盤直結"
      },
      {
        "label": "年間給湯効率",
        "value": "134.2%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "150.3%（ヒートポンプユニット HP-2233 の登録値）"
      },
      {
        "label": "設置可能な最低外気温度",
        "value": "-15℃（3地域以南。-10℃以下の地域は給湯器を JKR仕様に変更）"
      },
      {
        "label": "設置奥行寸法",
        "value": "500mm（条件あり）"
      },
      {
        "label": "構成",
        "value": "熱源分離型"
      }
    ],
    "remotes": [
      {
        "model": "RC-K102PEWマルチセット（HB）",
        "note": "システム構成例のマルチリモコン（インターホン付）"
      },
      {
        "model": "RC-K162PEWマルチセット（HB）",
        "note": "インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-K102EWマルチセット（HB）"
      }
    ],
    "features": [
      "ヒートポンプ（電気）でお湯をつくって貯め、足りない分をガス給湯器（バックアップ熱源機）で補う貯湯式のハイブリッド給湯機",
      "ヒートポンプの冷媒に自然冷媒 R290 を使用（冷媒充填量 225g）",
      "家庭ごとの使用量を学習・予測して貯湯を制御する「スマート制御」",
      "太陽光発電の電力を使って貯湯する「消費優先モード」を搭載",
      "停電やガスの供給停止のときも、貯湯タンクのお湯を取り出せる",
      "給湯器（バックアップ熱源機）は GT-C72（-1）シリーズ（暖房機能なし）と GTH-C71／70シリーズ（暖房機能あり）から選べる",
      "貯湯ユニットは 26kg（満水時 98kg）で、基礎工事を省略できる（省略する場合は、振れ止め金具SH01と簡易設置台70Lを選定）"
    ],
    "cautions": [
      "塩害仕様は標準（JRA9002 の耐塩害仕様）。設置場所の条件は「海から約300m〜1km離れた場所」「建物の影になるなど、直接潮風が当たらない場所」",
      "奥行500mmでの設置（D500）には条件があり、ガスふろ給湯器エコジョーズ（GT-C）の場合は丸形排気（T）タイプを選ぶ",
      "基礎工事を省略する場合は、振れ止め金具SH01と簡易設置台70Lが必要",
      "70Lモデルは、貯湯ユニットの配管カバーが別売品"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/img/img_70.jpg",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "match": "exact-model",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_70.html",
    "manufacturerPrice": {
      "amount": 1061170,
      "tax": "included",
      "includes": "貯湯ユニット・ヒートポンプユニット・給湯器・マルチリモコンの希望小売価格の合計。据置台・配管セットなどの必要部材と工事費は含まない",
      "asOf": "自然冷媒ハイブリッド給湯機HPHB R290総合カタログ 2026.3（ツールNo.1160092）／2026-10-14 の公式ページ",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_70.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "HP-2233",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_70.html",
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "https://www.noritz.co.jp/product/hojokin/kyuutou-shouene2026/",
      "https://noritz.mediapress-net.com/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=NRZ50001&categoryID=&catalogID=24618810000&catalogCategoryID=&pageGroupID=&pageID=&designID=NRZD001",
      "https://www.n-techdocs.com/products/118962",
      "https://www.n-techdocs.com/products/118964"
    ]
  },
  {
    "id": "noritz-sh-q0701-pl-bl-hp-2233-pl-bl-gt-c2472aw-1-bl",
    "slug": "sh-q0701-pl-bl-hp-2233-pl-bl-gt-c2472aw-1-bl",
    "brand": "noritz",
    "category": "hybrid",
    "series": "自然冷媒ハイブリッド給湯機 HPHB R290",
    "name": "HPHB R290 70L MODEL プラグイン機（ふろ・給湯タイプのシステム構成例）",
    "modelNumber": "SH-Q0701-PL BL + HP-2233-PL BL + GT-C2472AW-1 BL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HP-2233-PL"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "SH-Q0701-PL BL"
      },
      {
        "label": "ガス熱源機",
        "model": "GT-C2472AW-1 BL"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（タンク・ヒートポンプ）＋ガス熱源機"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": 70
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオート（ふろ給湯）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "タンク容量",
        "value": "70L"
      },
      {
        "label": "貯湯ユニットの外形寸法",
        "value": "高さ950mm×幅500mm×奥行400mm"
      },
      {
        "label": "貯湯ユニットの質量",
        "value": "26kg（満水時：98kg）"
      },
      {
        "label": "配管カバー",
        "value": "別売品"
      },
      {
        "label": "ヒートポンプユニットの外形寸法",
        "value": "高さ660mm×幅700mm×奥行250mm"
      },
      {
        "label": "ヒートポンプユニットの質量",
        "value": "25kg"
      },
      {
        "label": "冷媒の種類／冷媒充填量",
        "value": "R290／225g"
      },
      {
        "label": "ヒートポンプユニットの騒音値",
        "value": "45dB"
      },
      {
        "label": "ヒートポンプユニットの電源",
        "value": "AC100V（50／60Hz）コンセント"
      },
      {
        "label": "給湯器（GT-C2472AW-1 BL）の外形寸法",
        "value": "高さ600mm×幅469mm×奥行240mm"
      },
      {
        "label": "給湯器（GT-C2472AW-1 BL）の質量",
        "value": "26kg（満水時：28kg）"
      },
      {
        "label": "年間給湯効率",
        "value": "119.7%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "119.7%（ヒートポンプユニット HP-2233-PL の登録値）"
      },
      {
        "label": "設置可能な最低外気温度",
        "value": "-5℃（5地域以南）"
      },
      {
        "label": "設置奥行寸法",
        "value": "500mm（条件あり）"
      },
      {
        "label": "構成",
        "value": "熱源分離型"
      }
    ],
    "remotes": [
      {
        "model": "RC-K101PEWマルチセット（HB）",
        "note": "システム構成例のマルチリモコン（インターホン付）"
      },
      {
        "model": "RC-K161PEWマルチセット（HB）",
        "note": "インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-K101EWマルチセット（HB）"
      }
    ],
    "features": [
      "ヒートポンプ（電気）でお湯をつくって貯め、足りない分をガス給湯器（バックアップ熱源機）で補う貯湯式のハイブリッド給湯機",
      "ヒートポンプの冷媒に自然冷媒 R290 を使用（冷媒充填量 225g）",
      "家庭ごとの使用量を学習・予測して貯湯を制御する「スマート制御」",
      "太陽光発電の電力を使って貯湯する「消費優先モード」を搭載",
      "停電やガスの供給停止のときも、貯湯タンクのお湯を取り出せる",
      "給湯器（バックアップ熱源機）は GT-C72（-1）シリーズ（暖房機能なし）と GTH-C71／70シリーズ（暖房機能あり）から選べる",
      "ヒートポンプユニットの専用電源工事が不要なプラグイン機（屋外コンセントに接続）。基礎工事が不要な 70L MODEL がベース",
      "貯湯ユニットは 26kg（満水時 98kg）で、基礎工事を省略できる（省略する場合は、振れ止め金具SH01と簡易設置台70Lを選定）"
    ],
    "cautions": [
      "塩害仕様は標準（JRA9002 の耐塩害仕様）。設置場所の条件は「海から約300m〜1km離れた場所」「建物の影になるなど、直接潮風が当たらない場所」",
      "奥行500mmでの設置（D500）には条件があり、ガスふろ給湯器エコジョーズ（GT-C）の場合は丸形排気（T）タイプを選ぶ",
      "屋外防水コンセントは単相100V・20A が必要",
      "別売の端末部材をつなぐ場合は、ハイブリッド給湯機の電源をとる屋外コンセントと共用になっている電気回路の確認が必要（端末部材の電源が別回路であることが条件）",
      "基礎工事を省略する場合は、振れ止め金具SH01と簡易設置台70Lが必要",
      "70Lモデルは、貯湯ユニットの配管カバーが別売品",
      "設置可能な最低外気温度が -5℃（標準機は -15℃）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/img/img_70.jpg",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_plugin.html",
    "manufacturerPrice": {
      "amount": 939400,
      "tax": "included",
      "includes": "貯湯ユニット・ヒートポンプユニット・給湯器・マルチリモコンの希望小売価格の合計。据置台・配管セットなどの必要部材と工事費は含まない",
      "asOf": "自然冷媒ハイブリッド給湯機HPHB R290総合カタログ 2026.3（ツールNo.1160092）／2026-10-14 の公式ページ",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_plugin.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "HP-2233-PL",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_plugin.html",
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "https://www.noritz.co.jp/product/hojokin/kyuutou-shouene2026/",
      "https://noritz.mediapress-net.com/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=NRZ50001&categoryID=&catalogID=24618810000&catalogCategoryID=&pageGroupID=&pageID=&designID=NRZD001",
      "https://www.n-techdocs.com/products/120901",
      "https://www.n-techdocs.com/products/120902"
    ]
  },
  {
    "id": "noritz-sh-q0701-pl-bl-hp-2233-pl-bl-gth-c2471awd-bl",
    "slug": "sh-q0701-pl-bl-hp-2233-pl-bl-gth-c2471awd-bl",
    "brand": "noritz",
    "category": "hybrid",
    "series": "自然冷媒ハイブリッド給湯機 HPHB R290",
    "name": "HPHB R290 70L MODEL プラグイン機（暖房・ふろ・給湯タイプのシステム構成例）",
    "modelNumber": "SH-Q0701-PL BL + HP-2233-PL BL + GTH-C2471AWD BL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HP-2233-PL"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "SH-Q0701-PL BL"
      },
      {
        "label": "ガス熱源機",
        "model": "GTH-C2471AWD BL"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（タンク・ヒートポンプ）＋ガス熱源機"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": 70
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオート（暖房つき）"
    },
    "heating": true,
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "タンク容量",
        "value": "70L"
      },
      {
        "label": "貯湯ユニットの外形寸法",
        "value": "高さ950mm×幅500mm×奥行400mm"
      },
      {
        "label": "貯湯ユニットの質量",
        "value": "26kg（満水時：98kg）"
      },
      {
        "label": "配管カバー",
        "value": "別売品"
      },
      {
        "label": "ヒートポンプユニットの外形寸法",
        "value": "高さ660mm×幅700mm×奥行250mm"
      },
      {
        "label": "ヒートポンプユニットの質量",
        "value": "25kg"
      },
      {
        "label": "冷媒の種類／冷媒充填量",
        "value": "R290／225g"
      },
      {
        "label": "ヒートポンプユニットの騒音値",
        "value": "45dB"
      },
      {
        "label": "ヒートポンプユニットの電源",
        "value": "AC100V（50／60Hz）コンセント"
      },
      {
        "label": "年間給湯効率",
        "value": "119.7%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "119.7%（ヒートポンプユニット HP-2233-PL の登録値）"
      },
      {
        "label": "設置可能な最低外気温度",
        "value": "-5℃（5地域以南）"
      },
      {
        "label": "設置奥行寸法",
        "value": "500mm（条件あり）"
      },
      {
        "label": "構成",
        "value": "熱源分離型"
      }
    ],
    "remotes": [
      {
        "model": "RC-K102PEWマルチセット（HB）",
        "note": "システム構成例のマルチリモコン（インターホン付）"
      },
      {
        "model": "RC-K162PEWマルチセット（HB）",
        "note": "インターホン・温浴スイッチ付"
      },
      {
        "model": "RC-K102EWマルチセット（HB）"
      }
    ],
    "features": [
      "ヒートポンプ（電気）でお湯をつくって貯め、足りない分をガス給湯器（バックアップ熱源機）で補う貯湯式のハイブリッド給湯機",
      "ヒートポンプの冷媒に自然冷媒 R290 を使用（冷媒充填量 225g）",
      "家庭ごとの使用量を学習・予測して貯湯を制御する「スマート制御」",
      "太陽光発電の電力を使って貯湯する「消費優先モード」を搭載",
      "停電やガスの供給停止のときも、貯湯タンクのお湯を取り出せる",
      "給湯器（バックアップ熱源機）は GT-C72（-1）シリーズ（暖房機能なし）と GTH-C71／70シリーズ（暖房機能あり）から選べる",
      "ヒートポンプユニットの専用電源工事が不要なプラグイン機（屋外コンセントに接続）。基礎工事が不要な 70L MODEL がベース",
      "貯湯ユニットは 26kg（満水時 98kg）で、基礎工事を省略できる（省略する場合は、振れ止め金具SH01と簡易設置台70Lを選定）"
    ],
    "cautions": [
      "塩害仕様は標準（JRA9002 の耐塩害仕様）。設置場所の条件は「海から約300m〜1km離れた場所」「建物の影になるなど、直接潮風が当たらない場所」",
      "奥行500mmでの設置（D500）には条件があり、ガスふろ給湯器エコジョーズ（GT-C）の場合は丸形排気（T）タイプを選ぶ",
      "屋外防水コンセントは単相100V・20A が必要",
      "別売の端末部材をつなぐ場合は、ハイブリッド給湯機の電源をとる屋外コンセントと共用になっている電気回路の確認が必要（端末部材の電源が別回路であることが条件）",
      "基礎工事を省略する場合は、振れ止め金具SH01と簡易設置台70Lが必要",
      "70Lモデルは、貯湯ユニットの配管カバーが別売品",
      "設置可能な最低外気温度が -5℃（標準機は -15℃）"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/img/img_70.jpg",
      "pageUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_plugin.html",
    "manufacturerPrice": {
      "amount": 1061170,
      "tax": "included",
      "includes": "貯湯ユニット・ヒートポンプユニット・給湯器・マルチリモコンの希望小売価格の合計。据置台・配管セットなどの必要部材と工事費は含まない",
      "asOf": "自然冷媒ハイブリッド給湯機HPHB R290総合カタログ 2026.3（ツールNo.1160092）／2026-10-14 の公式ページ",
      "sourceUrl": "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_plugin.html"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "HP-2233-PL",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/lineup_plugin.html",
      "https://www.noritz.co.jp/product/kyutou_bath/hybrid/",
      "https://www.noritz.co.jp/product/hojokin/kyuutou-shouene2026/",
      "https://noritz.mediapress-net.com/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=NRZ50001&categoryID=&catalogID=24618810000&catalogCategoryID=&pageGroupID=&pageID=&designID=NRZD001",
      "https://www.n-techdocs.com/products/120901",
      "https://www.n-techdocs.com/products/120902"
    ]
  }
];
