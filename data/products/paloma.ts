import type { Product } from "@/data/products/types";

/**
 * パロマの商品データ。2026-10-14 に、公式サイト・公式カタログで型番と仕様を確かめたもの。
 * 根拠のページは各商品の sources。調査のしかたと記録は docs/PRODUCT_DATA.md。
 * 当社の価格（salesPrice など）は、会社から金額を受け取るまで null（画面では「お見積もり」）。
 * 製品写真は、メーカーの掲載許諾が確認できるまで載せない（imageLicenseStatus: "pending"）。
 */
export const palomaProducts: Product[] = [
  {
    "id": "paloma-fh-eh2422fawl",
    "slug": "fh-eh2422fawl",
    "brand": "paloma",
    "category": "eco-jozu",
    "series": "BRIGHTS[ブライツ]",
    "name": "BRIGHTS[ブライツ] フルオート 24号 FH-EH2422FAシリーズ",
    "modelNumber": "FH-EH2422FAWL",
    "installationType": {
      "key": "wall",
      "label": "壁掛型"
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
      "label": "フルオート"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅470mm×奥行240mm"
      },
      {
        "label": "質量",
        "value": "27（満水：30）kg"
      },
      {
        "label": "ガス消費量（給湯）",
        "value": "都市ガス 44.2kW ／ LPガス 44.2kW"
      },
      {
        "label": "ガス消費量（追焚）",
        "value": "都市ガス 11.6kW ／ LPガス 11.6kW"
      },
      {
        "label": "給湯温度調節（リモコン接続の場合）",
        "value": "32~60℃"
      },
      {
        "label": "消費電力 50Hz/60Hz",
        "value": "125W"
      },
      {
        "label": "エネルギー消費効率（モード熱効率・JIS S 2075に基づく）",
        "value": "92.5%"
      }
    ],
    "remotes": [
      {
        "model": "MFC-E238V",
        "note": "無線LAN対応リモコン Felimo Link（ボイス）"
      },
      {
        "model": "MFC-E228D",
        "note": "無線LAN対応リモコン Felimo Link（インターホン）"
      },
      {
        "model": "MFC-HBE308D",
        "note": "Felimo Link のインターホン付マルチリモコン（ハイブリッドプラスのリモコンと同じ型番）"
      },
      {
        "model": "MFC-E236D",
        "note": "Felimo Delax（インターホン）"
      },
      {
        "model": "MFC-E226V",
        "note": "Felimo Voice（ボイス）"
      },
      {
        "model": "MFC-250V",
        "note": "ボイス"
      },
      {
        "model": "MFC-250",
        "note": "スタンダード"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "排熱を有効利用するエコジョーズ（省エネ高効率給湯器）。モード熱効率 92.5%",
      "フルオートタイプ",
      "自動運転の終了後に、おいだき配管を新しいお湯で洗い流す「配管クリーン機能」",
      "スピードお湯はり（最大30L/分）と、保温時間のカスタマイズ",
      "パロマ独自の“面”センサーによる壁面火災防止装置",
      "側方近接（1cm）設置に対応",
      "所有者登録をすると、通常2年のメーカー保証期間が5年になる",
      "ハイブリッド対応（パロマのハイブリッドプラスの熱源機として使える。24号を推奨）"
    ],
    "cautions": [
      "PS標準設置をする場合は、別売の PSFA-8 を使う",
      "側方排気カバー ATFA-8 を使うときは、給湯器本体の設定切替えが必要"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/vs-files/product/waterheater/oidaki/img/FH-E2422AWL-eco-1-1.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=275",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=275",
    "manufacturerPrice": {
      "amount": 540870,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材・取付工事費・使用済み商品の引き取り費は含まない",
      "asOf": "ガス給湯器総合カタログ 2026年9月新価格（掲載内容は2026年8月現在）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=275"
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
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=275",
      "https://www.paloma.co.jp/product/waterheater/oidaki/index.html",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4131160000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01"
    ]
  },
  {
    "id": "paloma-fh-eh2422sawl",
    "slug": "fh-eh2422sawl",
    "brand": "paloma",
    "category": "eco-jozu",
    "series": "BRIGHTS[ブライツ]",
    "name": "BRIGHTS[ブライツ] オート 24号 FH-EH2422SAシリーズ",
    "modelNumber": "FH-EH2422SAWL",
    "installationType": {
      "key": "wall",
      "label": "壁掛型"
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
      "label": "オート"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅470mm×奥行240mm"
      },
      {
        "label": "質量",
        "value": "27（満水：30）kg"
      },
      {
        "label": "ガス消費量（給湯）",
        "value": "都市ガス 44.2kW ／ LPガス 44.2kW"
      },
      {
        "label": "ガス消費量（追焚）",
        "value": "都市ガス 11.6kW ／ LPガス 11.6kW"
      },
      {
        "label": "給湯温度調節（リモコン接続の場合）",
        "value": "32-60℃"
      },
      {
        "label": "消費電力 50Hz/60Hz",
        "value": "125W"
      },
      {
        "label": "エネルギー消費効率（モード熱効率・JIS S 2075に基づく）",
        "value": "92.5%"
      }
    ],
    "remotes": [
      {
        "model": "MFC-E238V",
        "note": "無線LAN対応リモコン Felimo Link（ボイス）"
      },
      {
        "model": "MFC-E228D",
        "note": "無線LAN対応リモコン Felimo Link（インターホン）"
      },
      {
        "model": "MFC-HBE308D",
        "note": "Felimo Link のインターホン付マルチリモコン（ハイブリッドプラスのリモコンと同じ型番）"
      },
      {
        "model": "MFC-E236D",
        "note": "Felimo Delax（インターホン）"
      },
      {
        "model": "MFC-E226V",
        "note": "Felimo Voice（ボイス）"
      },
      {
        "model": "MFC-250V",
        "note": "ボイス"
      },
      {
        "model": "MFC-250",
        "note": "スタンダード"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "排熱を有効利用するエコジョーズ（省エネ高効率給湯器）。モード熱効率 92.5%",
      "オートタイプ：スイッチひとつで設定湯量・温度の湯はりから保温（おいだき）まで自動",
      "自動運転の終了後に、おいだき配管を新しいお湯で洗い流す「配管クリーン機能」",
      "スピードお湯はり（最大30L/分）と、保温時間のカスタマイズ",
      "パロマ独自の“面”センサーによる壁面火災防止装置",
      "側方近接（1cm）設置に対応",
      "所有者登録をすると、通常2年のメーカー保証期間が5年になる",
      "ハイブリッド対応（パロマのハイブリッドプラスの熱源機として使える。24号を推奨）"
    ],
    "cautions": [
      "PS標準設置をする場合は、別売の PSFA-8を使う",
      "側方排気カバー ATFA-8 を使うときは、給湯器本体の設定切替えが必要"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/vs-files/product/waterheater/oidaki/img/FH-E2422AWL-eco-1-1.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=278",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=278",
    "manufacturerPrice": {
      "amount": 477620,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材・取付工事費・使用済み商品の引き取り費は含まない",
      "asOf": "ガス給湯器総合カタログ 2026年9月新価格（掲載内容は2026年8月現在）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=278"
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
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=278",
      "https://www.paloma.co.jp/product/waterheater/oidaki/index.html",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4131160000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01"
    ]
  },
  {
    "id": "paloma-fh-eh2022sawl",
    "slug": "fh-eh2022sawl",
    "brand": "paloma",
    "category": "eco-jozu",
    "series": "BRIGHTS[ブライツ]",
    "name": "BRIGHTS[ブライツ] オート 20号 FH-EH2022SAシリーズ",
    "modelNumber": "FH-EH2022SAWL",
    "installationType": {
      "key": "wall",
      "label": "壁掛型"
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
      "label": "オート"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅470mm×奥行240mm"
      },
      {
        "label": "質量",
        "value": "27（満水：30）kg"
      },
      {
        "label": "ガス消費量（給湯）",
        "value": "都市ガス 36.7kW ／ LPガス 36.7kW"
      },
      {
        "label": "ガス消費量（追焚）",
        "value": "都市ガス 11.6kW ／ LPガス 11.6kW"
      },
      {
        "label": "給湯温度調節（リモコン接続の場合）",
        "value": "32-60℃"
      },
      {
        "label": "消費電力 50Hz/60Hz",
        "value": "115W"
      },
      {
        "label": "エネルギー消費効率（モード熱効率・JIS S 2075に基づく）",
        "value": "92.5%"
      }
    ],
    "remotes": [
      {
        "model": "MFC-E238V",
        "note": "無線LAN対応リモコン Felimo Link（ボイス）"
      },
      {
        "model": "MFC-E228D",
        "note": "無線LAN対応リモコン Felimo Link（インターホン）"
      },
      {
        "model": "MFC-HBE308D",
        "note": "Felimo Link のインターホン付マルチリモコン（ハイブリッドプラスのリモコンと同じ型番）"
      },
      {
        "model": "MFC-E236D",
        "note": "Felimo Delax（インターホン）"
      },
      {
        "model": "MFC-E226V",
        "note": "Felimo Voice（ボイス）"
      },
      {
        "model": "MFC-250V",
        "note": "ボイス"
      },
      {
        "model": "MFC-250",
        "note": "スタンダード"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "排熱を有効利用するエコジョーズ（省エネ高効率給湯器）。モード熱効率 92.5%",
      "オートタイプ：スイッチひとつで設定湯量・温度の湯はりから保温（おいだき）まで自動",
      "自動運転の終了後に、おいだき配管を新しいお湯で洗い流す「配管クリーン機能」",
      "スピードお湯はり（最大30L/分）と、保温時間のカスタマイズ",
      "パロマ独自の“面”センサーによる壁面火災防止装置",
      "側方近接（1cm）設置に対応",
      "所有者登録をすると、通常2年のメーカー保証期間が5年になる",
      "ハイブリッド対応（パロマのハイブリッドプラスの熱源機として使える。24号を推奨）"
    ],
    "cautions": [
      "PS標準設置をする場合は、別売の PSFA-8 を使う",
      "側方排気カバー ATFA-8 を使うときは、給湯器本体の設定切替えが必要"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/vs-files/product/waterheater/oidaki/img/FH-E2022AWL-eco-1-1.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=279",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=279",
    "manufacturerPrice": {
      "amount": 447040,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材・取付工事費・使用済み商品の引き取り費は含まない",
      "asOf": "ガス給湯器総合カタログ 2026年9月新価格（掲載内容は2026年8月現在）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=279"
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
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=279",
      "https://www.paloma.co.jp/product/waterheater/oidaki/index.html",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4131160000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01"
    ]
  },
  {
    "id": "paloma-fh-eh1612sawl",
    "slug": "fh-eh1612sawl",
    "brand": "paloma",
    "category": "eco-jozu",
    "series": "BRIGHTS[ブライツ]",
    "name": "BRIGHTS[ブライツ] オート 16号 FH-EH1612SAシリーズ",
    "modelNumber": "FH-EH1612SAWL",
    "installationType": {
      "key": "wall",
      "label": "壁掛型"
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
      "label": "オート"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅470mm×奥行240mm"
      },
      {
        "label": "質量",
        "value": "27（満水：30）kg"
      },
      {
        "label": "ガス消費量（給湯）",
        "value": "都市ガス 29.4kW ／ LPガス 29.4kW"
      },
      {
        "label": "ガス消費量（追焚）",
        "value": "都市ガス 11.6kW ／ LPガス 11.6kW"
      },
      {
        "label": "給湯温度調節（リモコン接続の場合）",
        "value": "32-60℃"
      },
      {
        "label": "消費電力 50Hz/60Hz",
        "value": "120W"
      },
      {
        "label": "エネルギー消費効率（モード熱効率・JIS S 2075に基づく）",
        "value": "92.5%"
      }
    ],
    "remotes": [
      {
        "model": "MFC-E238V",
        "note": "無線LAN対応リモコン Felimo Link（ボイス）"
      },
      {
        "model": "MFC-E228D",
        "note": "無線LAN対応リモコン Felimo Link（インターホン）"
      },
      {
        "model": "MFC-HBE308D",
        "note": "Felimo Link のインターホン付マルチリモコン（ハイブリッドプラスのリモコンと同じ型番）"
      },
      {
        "model": "MFC-E236D",
        "note": "Felimo Delax（インターホン）"
      },
      {
        "model": "MFC-E226V",
        "note": "Felimo Voice（ボイス）"
      },
      {
        "model": "MFC-250V",
        "note": "ボイス"
      },
      {
        "model": "MFC-250",
        "note": "スタンダード"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "排熱を有効利用するエコジョーズ（省エネ高効率給湯器）。モード熱効率 92.5%",
      "オートタイプ：スイッチひとつで設定湯量・温度の湯はりから保温（おいだき）まで自動",
      "自動運転の終了後に、おいだき配管を新しいお湯で洗い流す「配管クリーン機能」",
      "スピードお湯はり（最大30L/分）と、保温時間のカスタマイズ",
      "パロマ独自の“面”センサーによる壁面火災防止装置",
      "側方近接（1cm）設置に対応",
      "所有者登録をすると、通常2年のメーカー保証期間が5年になる",
      "ハイブリッド対応（パロマのハイブリッドプラスの熱源機として使える。24号を推奨）"
    ],
    "cautions": [
      "PS標準設置をする場合は、別売の PSFA-8 を使う",
      "ハイブリッドプラスの熱源機として使う場合、パロマは 24号を推奨",
      "側方排気カバー ATFA-8 を使うときは、給湯器本体の設定切替えが必要"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/vs-files/product/waterheater/oidaki/img/FH-E1612AWL-eco-1-1.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=281",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=281",
    "manufacturerPrice": {
      "amount": 407770,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材・取付工事費・使用済み商品の引き取り費は含まない",
      "asOf": "ガス給湯器総合カタログ 2026年9月新価格（掲載内容は2026年8月現在）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=281"
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
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=281",
      "https://www.paloma.co.jp/product/waterheater/oidaki/index.html",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4131160000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01"
    ]
  },
  {
    "id": "paloma-fh-eh2022satl",
    "slug": "fh-eh2022satl",
    "brand": "paloma",
    "category": "eco-jozu",
    "series": "BRIGHTS[ブライツ]",
    "name": "BRIGHTS[ブライツ] オート 20号 FH-EH2022SAシリーズ",
    "modelNumber": "FH-EH2022SATL",
    "installationType": {
      "key": "ps-door",
      "label": "PS扉内前方排気型・PS標準設置型"
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
      "label": "オート"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅470mm×奥行240mm"
      },
      {
        "label": "質量",
        "value": "27（満水：30）kg"
      },
      {
        "label": "ガス消費量（給湯）",
        "value": "都市ガス 36.7kW ／ LPガス 36.7kW"
      },
      {
        "label": "ガス消費量（追焚）",
        "value": "都市ガス 11.6kW ／ LPガス 11.6kW"
      },
      {
        "label": "給湯温度調節（リモコン接続の場合）",
        "value": "32-60℃"
      },
      {
        "label": "消費電力 50Hz/60Hz",
        "value": "115W"
      },
      {
        "label": "エネルギー消費効率（モード熱効率・JIS S 2075に基づく）",
        "value": "92.5%"
      }
    ],
    "remotes": [
      {
        "model": "MFC-E238V",
        "note": "無線LAN対応リモコン Felimo Link（ボイス）"
      },
      {
        "model": "MFC-E228D",
        "note": "無線LAN対応リモコン Felimo Link（インターホン）"
      },
      {
        "model": "MFC-HBE308D",
        "note": "Felimo Link のインターホン付マルチリモコン（ハイブリッドプラスのリモコンと同じ型番）"
      },
      {
        "model": "MFC-E236D",
        "note": "Felimo Delax（インターホン）"
      },
      {
        "model": "MFC-E226V",
        "note": "Felimo Voice（ボイス）"
      },
      {
        "model": "MFC-250V",
        "note": "ボイス"
      },
      {
        "model": "MFC-250",
        "note": "スタンダード"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "排熱を有効利用するエコジョーズ（省エネ高効率給湯器）。モード熱効率 92.5%",
      "オートタイプ：スイッチひとつで設定湯量・温度の湯はりから保温（おいだき）まで自動",
      "自動運転の終了後に、おいだき配管を新しいお湯で洗い流す「配管クリーン機能」",
      "スピードお湯はり（最大30L/分）と、保温時間のカスタマイズ",
      "パロマ独自の“面”センサーによる壁面火災防止装置",
      "側方近接（1cm）設置に対応",
      "所有者登録をすると、通常2年のメーカー保証期間が5年になる",
      "ハイブリッド対応（パロマのハイブリッドプラスの熱源機として使える。24号を推奨）"
    ],
    "cautions": [
      "壁掛設置の場合はブラケットが2枚必要",
      "PS扉内に設置する場合は、専用のオプション部品（PS扉内取付ボックス TBFH-2 など）が要る"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/vs-files/product/waterheater/oidaki/img/FH-E2022FATL-eco-1.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=279",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=279",
    "manufacturerPrice": {
      "amount": 462660,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材・取付工事費・使用済み商品の引き取り費は含まない",
      "asOf": "ガス給湯器総合カタログ 2026年9月新価格（掲載内容は2026年8月現在）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=279"
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
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=279",
      "https://www.paloma.co.jp/product/waterheater/oidaki/index.html",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4131160000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01"
    ]
  },
  {
    "id": "paloma-fh-eh2422sarl",
    "slug": "fh-eh2422sarl",
    "brand": "paloma",
    "category": "eco-jozu",
    "series": "BRIGHTS[ブライツ]",
    "name": "BRIGHTS[ブライツ] オート据置型 24号 FH-EH2422SARL",
    "modelNumber": "FH-EH2422SARL",
    "installationType": {
      "key": "floor",
      "label": "据置型"
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
      "label": "オート"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "高さ670mm×幅534mm×奥行240mm"
      },
      {
        "label": "質量",
        "value": "31（満水：33）kg"
      },
      {
        "label": "ガス消費量（給湯）",
        "value": "都市ガス 44.2kW ／ LPガス 44.2kW"
      },
      {
        "label": "ガス消費量（追焚）",
        "value": "都市ガス 11.6kW ／ LPガス 11.6kW"
      },
      {
        "label": "給湯温度調節（リモコン接続の場合）",
        "value": "32-60℃"
      },
      {
        "label": "消費電力 50Hz/60Hz",
        "value": "125/125W"
      },
      {
        "label": "エネルギー消費効率（モード熱効率・JIS S 2075に基づく）",
        "value": "91.5%"
      }
    ],
    "remotes": [
      {
        "model": "MFC-E238V",
        "note": "無線LAN対応リモコン Felimo Link（ボイス）"
      },
      {
        "model": "MFC-E228D",
        "note": "無線LAN対応リモコン Felimo Link（インターホン）"
      },
      {
        "model": "MFC-HBE308D",
        "note": "Felimo Link のインターホン付マルチリモコン（ハイブリッドプラスのリモコンと同じ型番）"
      },
      {
        "model": "MFC-E236D",
        "note": "Felimo Delax（インターホン）"
      },
      {
        "model": "MFC-E226V",
        "note": "Felimo Voice（ボイス）"
      },
      {
        "model": "MFC-250V",
        "note": "ボイス"
      },
      {
        "model": "MFC-250",
        "note": "スタンダード"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "排熱を有効利用するエコジョーズ（省エネ高効率給湯器）。モード熱効率 91.5%",
      "オートタイプ：スイッチひとつで設定湯量・温度の湯はりから保温（おいだき）まで自動",
      "自動運転の終了後に、おいだき配管を新しいお湯で洗い流す「配管クリーン機能」",
      "スピードお湯はり（最大30L/分）と、保温時間のカスタマイズ",
      "パロマ独自の“面”センサーによる壁面火災防止装置",
      "所有者登録をすると、通常2年のメーカー保証期間が5年になる",
      "ハイブリッド対応（パロマのハイブリッドプラスの熱源機として使える。24号を推奨）"
    ],
    "cautions": [
      "据置設置型"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/vs-files/product/waterheater/oidaki/img/FH-E2422FARL-eco-1.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=324",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=324",
    "manufacturerPrice": {
      "amount": 493130,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材・取付工事費・使用済み商品の引き取り費は含まない",
      "asOf": "ガス給湯器総合カタログ 2026年9月新価格（掲載内容は2026年8月現在）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=324"
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
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=324",
      "https://www.paloma.co.jp/product/waterheater/oidaki/index.html",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4131160000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01"
    ]
  },
  {
    "id": "paloma-fh-2023saw-1",
    "slug": "fh-2023saw-1",
    "brand": "paloma",
    "category": "gas",
    "series": "ガスふろ給湯器 オートタイプ（従来型）",
    "name": "オート 20号 FH-2023SAシリーズ",
    "modelNumber": "FH-2023SAW-1",
    "installationType": {
      "key": "wall",
      "label": "壁掛型・PS 標準設置型"
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
      "label": "オート"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "高さ600mm×幅470mm×奥行240mm"
      },
      {
        "label": "質量",
        "value": "23（満水：24）kg"
      },
      {
        "label": "ガス消費量（給湯）",
        "value": "都市ガス 42kW ／ LPガス 42kW"
      },
      {
        "label": "ガス消費量（追焚）",
        "value": "都市ガス 11.6kW ／ LPガス 11.6kW"
      },
      {
        "label": "給湯温度調節（リモコン接続の場合）",
        "value": "32-60℃"
      },
      {
        "label": "消費電力 50Hz/60Hz",
        "value": "115W"
      },
      {
        "label": "エネルギー消費効率（モード熱効率・JIS S 2075に基づく）",
        "value": "82.5%"
      }
    ],
    "remotes": [
      {
        "model": "MFC-E238V",
        "note": "無線LAN対応リモコン Felimo Link（ボイス）"
      },
      {
        "model": "MFC-E228D",
        "note": "無線LAN対応リモコン Felimo Link（インターホン）"
      },
      {
        "model": "MFC-E236D",
        "note": "Felimo Delax（インターホン）"
      },
      {
        "model": "MFC-E226V",
        "note": "Felimo Voice（ボイス）"
      },
      {
        "model": "MFC-250V",
        "note": "ボイス"
      },
      {
        "model": "MFC-250",
        "note": "スタンダード"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "従来型（非エコジョーズ）のガスふろ給湯器。モード熱効率 82.5%",
      "自動湯はり・湯はり完了前お知らせ・配管クリーン機能",
      "壁面火災防止装置、側方近接（1cm）設置に対応",
      "日本製"
    ],
    "cautions": [
      "従来型のため、国の「給湯省エネ2026事業」の対象機器ではない"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/vs-files/product/waterheater/oidaki/img/FH-2023FAWL-icon-1-1.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=305",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=305",
    "manufacturerPrice": {
      "amount": 445390,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材・取付工事費・使用済み商品の引き取り費は含まない",
      "asOf": "ガス給湯器総合カタログ 2026年9月新価格（掲載内容は2026年8月現在）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=305"
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
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=305",
      "https://www.paloma.co.jp/product/waterheater/oidaki/index.html",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4131160000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01"
    ]
  },
  {
    "id": "paloma-ph-em1616awl",
    "slug": "ph-em1616awl",
    "brand": "paloma",
    "category": "eco-jozu",
    "series": "エコジョーズ 給湯専用（コンパクトオートストップタイプ）",
    "name": "エコジョーズ オートストップ 16号 PH-EM1616Aシリーズ",
    "modelNumber": "PH-EM1616AWL",
    "installationType": {
      "key": "wall",
      "label": "壁掛型・PS標準扉内設置型"
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
        "label": "外形寸法",
        "value": "高さ520mm×幅350mm×奥行215mm"
      },
      {
        "label": "質量",
        "value": "19（満水：20）kg"
      },
      {
        "label": "ガス消費量（給湯）",
        "value": "都市ガス 31kW ／ LPガス 31kW"
      },
      {
        "label": "給湯温度調節（リモコン接続の場合）",
        "value": "38-60℃"
      },
      {
        "label": "消費電力 50Hz/60Hz",
        "value": "43/43W"
      },
      {
        "label": "エネルギー消費効率（モード熱効率・JIS S 2075に基づく）",
        "value": "90%"
      }
    ],
    "remotes": [
      {
        "model": "MC-150V",
        "note": "台所リモコン（ボイスリモコン）"
      },
      {
        "model": "FC-150V",
        "note": "浴室リモコン（ボイスリモコン）"
      },
      {
        "model": "MC-150",
        "note": "台所リモコン（スタンダードリモコン）。オートストップ機能には対応していない"
      },
      {
        "model": "FC-150",
        "note": "浴室リモコン（スタンダードリモコン）"
      }
    ],
    "features": [
      "給湯専用のエコジョーズ。モード熱効率 90%",
      "オートストップ対応（ボイスリモコンとの組合せ）",
      "壁面火災防止装置、側方近接（1cm）設置に対応",
      "日本製"
    ],
    "cautions": [
      "PS扉内に設置する場合は、別売のTPEW3-4MAが必要",
      "排気延長は不可",
      "浴槽の落とし込みにオートストップを使う場合は、サーモ付混合水栓以外の水栓を使う"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/vs-files/product/waterheater/boileronly/img/PH-EM1616AWL-eco.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=119",
      "match": "exact-model",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=119",
    "manufacturerPrice": {
      "amount": 226380,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材・取付工事費・使用済み商品の引き取り費は含まない",
      "asOf": "ガス給湯器総合カタログ 2026年9月新価格（掲載内容は2026年8月現在）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=119"
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
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=119",
      "https://www.paloma.co.jp/product/waterheater/boileronly/index.html",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4131160000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01"
    ]
  },
  {
    "id": "paloma-ph-1617aw",
    "slug": "ph-1617aw",
    "brand": "paloma",
    "category": "gas",
    "series": "給湯専用 オートストップ（コンパクトオートストップタイプ）",
    "name": "オートストップ 16号 PH-1617Aシリーズ",
    "modelNumber": "PH-1617AW",
    "installationType": {
      "key": "wall",
      "label": "壁掛型・PS標準設置型"
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
        "label": "外形寸法",
        "value": "高さ520mm×幅350mm×奥行135mm"
      },
      {
        "label": "質量",
        "value": "13.5（満水：14.5）kg"
      },
      {
        "label": "ガス消費量（給湯）",
        "value": "都市ガス 33.6kW ／ LPガス 33.6kW"
      },
      {
        "label": "給湯温度調節（リモコン接続の場合）",
        "value": "35～60℃"
      },
      {
        "label": "消費電力 50Hz/60Hz",
        "value": "40/40W"
      },
      {
        "label": "エネルギー消費効率（モード熱効率・JIS S 2075に基づく）",
        "value": "82.5%"
      }
    ],
    "remotes": [
      {
        "model": "MC-150V",
        "note": "台所リモコン（ボイスリモコン）"
      },
      {
        "model": "FC-150V",
        "note": "浴室リモコン（ボイスリモコン）"
      },
      {
        "model": "MC-150",
        "note": "台所リモコン（スタンダードリモコン）。オートストップ機能には対応していない"
      },
      {
        "model": "FC-150",
        "note": "浴室リモコン（スタンダードリモコン）"
      }
    ],
    "features": [
      "従来型（非エコジョーズ）の給湯専用ガス給湯器。モード熱効率 82.5%",
      "オートストップ対応",
      "奥行 135mm の薄型"
    ],
    "cautions": [
      "浴槽の落とし込みにオートストップを使う場合は、サーモ付混合水栓以外の水栓を使う",
      "従来型のため、国の「給湯省エネ2026事業」の対象機器ではない"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/vs-files/product/waterheater/boileronly/img/PH-1615AW-icon.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=237",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=237",
    "manufacturerPrice": {
      "amount": 190410,
      "tax": "included",
      "includes": "本体のみ。リモコン・別売部材・取付工事費・使用済み商品の引き取り費は含まない",
      "asOf": "ガス給湯器総合カタログ 2026年9月新価格（掲載内容は2026年8月現在）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=237"
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
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=237",
      "https://www.paloma.co.jp/product/waterheater/boileronly/index.html",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4131160000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01"
    ]
  },
  {
    "id": "paloma-hb-232tuhpl-p-fh-ueh2422fawl",
    "slug": "hb-232tuhpl-p-fh-ueh2422fawl",
    "brand": "paloma",
    "category": "hybrid",
    "series": "HYBRID PLUS[ハイブリッド プラス]",
    "name": "HYBRID PLUS[ハイブリッド プラス] 24号壁掛けフルオート ウルトラファインバブル",
    "modelNumber": "HB-232TUHPL-P + FH-UEH2422FAWL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HB-232TUHPL-P"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "HB-232TUHPL-P（ヒートポンプとタンクが一体）"
      },
      {
        "label": "ガス熱源機",
        "model": "FH-UEH2422FAWL"
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
      "tankLiters": 22.5
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
        "label": "ヒートポンプタンクユニット（HB-232TUHPL-P）の外形寸法",
        "value": "高さ953.9 × 幅611.3 × 奥行432.8（mm）"
      },
      {
        "label": "ヒートポンプタンクユニットの質量",
        "value": "56.8kg（満水時79.3kg）"
      },
      {
        "label": "タンク容量",
        "value": "22.5L"
      },
      {
        "label": "冷媒の種類／充填量",
        "value": "R32（フロン）／340g"
      },
      {
        "label": "ヒートポンプタンクユニットの消費電力（最大）",
        "value": "980W"
      },
      {
        "label": "設置可能地域区分／設置可能最低外気温度",
        "value": "4地域以南／−10℃"
      },
      {
        "label": "年間給湯効率",
        "value": "108.9%（JGKAS A705に基づく年間給湯効率・6地域、給湯負荷18.3GJ/年）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "108.9%（ヒートポンプユニット HB-232TUHPL-P の登録値）"
      },
      {
        "label": "熱源機（FH-UEH2422FAWL）の外形寸法",
        "value": "高さ600 × 幅470 × 奥行240（mm）"
      },
      {
        "label": "熱源機（FH-UEH2422FAWL）の質量",
        "value": "27kg（満水時30kg）"
      },
      {
        "label": "熱源機のガス消費量（13A・LPガス）",
        "value": "給湯 44.2kW／ふろ 11.6kW／同時使用 53.5kW"
      }
    ],
    "remotes": [
      {
        "model": "MFC-HBE308D",
        "note": "マルチリモコンセット（IOT対応・インターホン）。別売品"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "ヒートポンプとタンクが一体の「ヒートポンプタンクユニット」と、ガスの熱源機の2ユニット構成",
      "必要な分だけ沸かして使い切る小容量の「エコロジタンク」",
      "過去の使用湯量とパターンを学習して沸かし上げる「学習機能」",
      "太陽光発電の電力を自家消費して沸かし上げる「太陽光発電活用モード」（ソーラーパネルなどの発電システムが必要）",
      "プラグイン対応：最大消費電流が10Aを超えないため、ヒートポンプの専用電気工事をせずに屋外コンセントから電源をとれる",
      "コンクリート簡易ベースを使うと基礎工事が不要（上部に転倒防止金具が必要）",
      "奥行500mmでの設置に対応",
      "熱源機は、ウルトラファインバブル対応の BRIGHTS GRAND"
    ],
    "cautions": [
      "次世代省エネルギー基準の1地域・2地域・3地域と、外気温度が−10℃を下回る地域には設置しない",
      "屋外コンセントの個別配線ブレーカーは20Aであること。屋外コンセントと共用配線の場合は、機器の消費電流を確認して20Aを超えないようにする",
      "水道水を使う（温泉水・地下水・井戸水は使わない）。運転音や振動が出ることがあるので、隣家・寝室などに配慮して設置場所を選ぶ",
      "20号・16号の熱源機を設置した場合は水圧が弱くなる可能性があるため、24号を推奨"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus-24_240_240.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
    "manufacturerPrice": {
      "amount": 1178980,
      "tax": "included",
      "includes": "ヒートポンプタンクユニット・熱源機の希望小売価格の合計。リモコン（MFC-HBE308D）は別売で含まない",
      "asOf": "ハイブリッド給湯器カタログ 2026年9月新価格（発行 2026/8）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "HB-232TUHPL-P",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4812990000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01",
      "https://www.paloma.co.jp/special/kyutou_shoene2026/",
      "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus_shiyou_02.jpg"
    ]
  },
  {
    "id": "paloma-hb-232tuhpl-p-fh-ueh2422sawl",
    "slug": "hb-232tuhpl-p-fh-ueh2422sawl",
    "brand": "paloma",
    "category": "hybrid",
    "series": "HYBRID PLUS[ハイブリッド プラス]",
    "name": "HYBRID PLUS[ハイブリッド プラス] 24号壁掛けオート ウルトラファインバブル",
    "modelNumber": "HB-232TUHPL-P + FH-UEH2422SAWL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HB-232TUHPL-P"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "HB-232TUHPL-P（ヒートポンプとタンクが一体）"
      },
      {
        "label": "ガス熱源機",
        "model": "FH-UEH2422SAWL"
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
      "tankLiters": 22.5
    },
    "functions": {
      "key": "auto",
      "label": "オート（ふろ給湯）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "ヒートポンプタンクユニット（HB-232TUHPL-P）の外形寸法",
        "value": "高さ953.9 × 幅611.3 × 奥行432.8（mm）"
      },
      {
        "label": "ヒートポンプタンクユニットの質量",
        "value": "56.8kg（満水時79.3kg）"
      },
      {
        "label": "タンク容量",
        "value": "22.5L"
      },
      {
        "label": "冷媒の種類／充填量",
        "value": "R32（フロン）／340g"
      },
      {
        "label": "ヒートポンプタンクユニットの消費電力（最大）",
        "value": "980W"
      },
      {
        "label": "設置可能地域区分／設置可能最低外気温度",
        "value": "4地域以南／−10℃"
      },
      {
        "label": "年間給湯効率",
        "value": "108.9%（JGKAS A705に基づく年間給湯効率・6地域、給湯負荷18.3GJ/年）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "108.9%（ヒートポンプユニット HB-232TUHPL-P の登録値）"
      },
      {
        "label": "熱源機（FH-UEH2422SAWL）の外形寸法",
        "value": "高さ600 × 幅470 × 奥行240（mm）"
      },
      {
        "label": "熱源機（FH-UEH2422SAWL）の質量",
        "value": "27kg（満水時30kg）"
      },
      {
        "label": "熱源機のガス消費量（13A・LPガス）",
        "value": "給湯 44.2kW／ふろ 11.6kW／同時使用 53.5kW"
      }
    ],
    "remotes": [
      {
        "model": "MFC-HBE308D",
        "note": "マルチリモコンセット（IOT対応・インターホン）。別売品"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "ヒートポンプとタンクが一体の「ヒートポンプタンクユニット」と、ガスの熱源機の2ユニット構成",
      "必要な分だけ沸かして使い切る小容量の「エコロジタンク」",
      "過去の使用湯量とパターンを学習して沸かし上げる「学習機能」",
      "太陽光発電の電力を自家消費して沸かし上げる「太陽光発電活用モード」（ソーラーパネルなどの発電システムが必要）",
      "プラグイン対応：最大消費電流が10Aを超えないため、ヒートポンプの専用電気工事をせずに屋外コンセントから電源をとれる",
      "コンクリート簡易ベースを使うと基礎工事が不要（上部に転倒防止金具が必要）",
      "奥行500mmでの設置に対応",
      "熱源機は、ウルトラファインバブル対応の BRIGHTS GRAND"
    ],
    "cautions": [
      "次世代省エネルギー基準の1地域・2地域・3地域と、外気温度が−10℃を下回る地域には設置しない",
      "屋外コンセントの個別配線ブレーカーは20Aであること。屋外コンセントと共用配線の場合は、機器の消費電流を確認して20Aを超えないようにする",
      "水道水を使う（温泉水・地下水・井戸水は使わない）。運転音や振動が出ることがあるので、隣家・寝室などに配慮して設置場所を選ぶ",
      "20号・16号の熱源機を設置した場合は水圧が弱くなる可能性があるため、24号を推奨"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus-20_240_240.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
    "manufacturerPrice": {
      "amount": 1118370,
      "tax": "included",
      "includes": "ヒートポンプタンクユニット・熱源機の希望小売価格の合計。リモコン（MFC-HBE308D）は別売で含まない",
      "asOf": "ハイブリッド給湯器カタログ 2026年9月新価格（発行 2026/8）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "HB-232TUHPL-P",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4812990000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01",
      "https://www.paloma.co.jp/special/kyutou_shoene2026/",
      "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus_shiyou_02.jpg"
    ]
  },
  {
    "id": "paloma-hb-232tuhpl-p-fh-eh2422fawl",
    "slug": "hb-232tuhpl-p-fh-eh2422fawl",
    "brand": "paloma",
    "category": "hybrid",
    "series": "HYBRID PLUS[ハイブリッド プラス]",
    "name": "HYBRID PLUS[ハイブリッド プラス] 24号壁掛けフルオート",
    "modelNumber": "HB-232TUHPL-P + FH-EH2422FAWL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HB-232TUHPL-P"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "HB-232TUHPL-P（ヒートポンプとタンクが一体）"
      },
      {
        "label": "ガス熱源機",
        "model": "FH-EH2422FAWL"
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
      "tankLiters": 22.5
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
        "label": "ヒートポンプタンクユニット（HB-232TUHPL-P）の外形寸法",
        "value": "高さ953.9 × 幅611.3 × 奥行432.8（mm）"
      },
      {
        "label": "ヒートポンプタンクユニットの質量",
        "value": "56.8kg（満水時79.3kg）"
      },
      {
        "label": "タンク容量",
        "value": "22.5L"
      },
      {
        "label": "冷媒の種類／充填量",
        "value": "R32（フロン）／340g"
      },
      {
        "label": "ヒートポンプタンクユニットの消費電力（最大）",
        "value": "980W"
      },
      {
        "label": "設置可能地域区分／設置可能最低外気温度",
        "value": "4地域以南／−10℃"
      },
      {
        "label": "年間給湯効率",
        "value": "108.9%（JGKAS A705に基づく年間給湯効率・6地域、給湯負荷18.3GJ/年）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "108.9%（ヒートポンプユニット HB-232TUHPL-P の登録値）"
      },
      {
        "label": "熱源機（FH-EH2422FAWL）の外形寸法",
        "value": "高さ600 × 幅470 × 奥行240（mm）"
      },
      {
        "label": "熱源機（FH-EH2422FAWL）の質量",
        "value": "27kg（満水時30kg）"
      },
      {
        "label": "熱源機のガス消費量（13A・LPガス）",
        "value": "給湯 44.2kW／ふろ 11.6kW／同時使用 53.5kW"
      }
    ],
    "remotes": [
      {
        "model": "MFC-HBE308D",
        "note": "マルチリモコンセット（IOT対応・インターホン）。別売品"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "ヒートポンプとタンクが一体の「ヒートポンプタンクユニット」と、ガスの熱源機の2ユニット構成",
      "必要な分だけ沸かして使い切る小容量の「エコロジタンク」",
      "過去の使用湯量とパターンを学習して沸かし上げる「学習機能」",
      "太陽光発電の電力を自家消費して沸かし上げる「太陽光発電活用モード」（ソーラーパネルなどの発電システムが必要）",
      "プラグイン対応：最大消費電流が10Aを超えないため、ヒートポンプの専用電気工事をせずに屋外コンセントから電源をとれる",
      "コンクリート簡易ベースを使うと基礎工事が不要（上部に転倒防止金具が必要）",
      "奥行500mmでの設置に対応"
    ],
    "cautions": [
      "次世代省エネルギー基準の1地域・2地域・3地域と、外気温度が−10℃を下回る地域には設置しない",
      "屋外コンセントの個別配線ブレーカーは20Aであること。屋外コンセントと共用配線の場合は、機器の消費電流を確認して20Aを超えないようにする",
      "水道水を使う（温泉水・地下水・井戸水は使わない）。運転音や振動が出ることがあるので、隣家・寝室などに配慮して設置場所を選ぶ",
      "20号・16号の熱源機を設置した場合は水圧が弱くなる可能性があるため、24号を推奨"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus-24_240_240.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
    "manufacturerPrice": {
      "amount": 1154670,
      "tax": "included",
      "includes": "ヒートポンプタンクユニット・熱源機の希望小売価格の合計。リモコン（MFC-HBE308D）は別売で含まない",
      "asOf": "ハイブリッド給湯器カタログ 2026年9月新価格（発行 2026/8）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "HB-232TUHPL-P",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4812990000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01",
      "https://www.paloma.co.jp/special/kyutou_shoene2026/",
      "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus_shiyou_02.jpg"
    ]
  },
  {
    "id": "paloma-hb-232tuhpl-p-fh-eh2422sawl",
    "slug": "hb-232tuhpl-p-fh-eh2422sawl",
    "brand": "paloma",
    "category": "hybrid",
    "series": "HYBRID PLUS[ハイブリッド プラス]",
    "name": "HYBRID PLUS[ハイブリッド プラス] 24号壁掛けオート",
    "modelNumber": "HB-232TUHPL-P + FH-EH2422SAWL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HB-232TUHPL-P"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "HB-232TUHPL-P（ヒートポンプとタンクが一体）"
      },
      {
        "label": "ガス熱源機",
        "model": "FH-EH2422SAWL"
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
      "tankLiters": 22.5
    },
    "functions": {
      "key": "auto",
      "label": "オート（ふろ給湯）"
    },
    "gasTypes": [
      "都市ガス（12A・13A）",
      "LPガス（LPG）"
    ],
    "specifications": [
      {
        "label": "ヒートポンプタンクユニット（HB-232TUHPL-P）の外形寸法",
        "value": "高さ953.9 × 幅611.3 × 奥行432.8（mm）"
      },
      {
        "label": "ヒートポンプタンクユニットの質量",
        "value": "56.8kg（満水時79.3kg）"
      },
      {
        "label": "タンク容量",
        "value": "22.5L"
      },
      {
        "label": "冷媒の種類／充填量",
        "value": "R32（フロン）／340g"
      },
      {
        "label": "ヒートポンプタンクユニットの消費電力（最大）",
        "value": "980W"
      },
      {
        "label": "設置可能地域区分／設置可能最低外気温度",
        "value": "4地域以南／−10℃"
      },
      {
        "label": "年間給湯効率",
        "value": "108.9%（JGKAS A705に基づく年間給湯効率・6地域、給湯負荷18.3GJ/年）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "108.9%（ヒートポンプユニット HB-232TUHPL-P の登録値）"
      },
      {
        "label": "熱源機（FH-EH2422SAWL）の外形寸法",
        "value": "高さ600 × 幅470 × 奥行240（mm）"
      },
      {
        "label": "熱源機（FH-EH2422SAWL）の質量",
        "value": "27kg（満水時30kg）"
      },
      {
        "label": "熱源機のガス消費量（13A・LPガス）",
        "value": "給湯 44.2kW／ふろ 11.6kW／同時使用 53.5kW"
      }
    ],
    "remotes": [
      {
        "model": "MFC-HBE308D",
        "note": "マルチリモコンセット（IOT対応・インターホン）。別売品"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "ヒートポンプとタンクが一体の「ヒートポンプタンクユニット」と、ガスの熱源機の2ユニット構成",
      "必要な分だけ沸かして使い切る小容量の「エコロジタンク」",
      "過去の使用湯量とパターンを学習して沸かし上げる「学習機能」",
      "太陽光発電の電力を自家消費して沸かし上げる「太陽光発電活用モード」（ソーラーパネルなどの発電システムが必要）",
      "プラグイン対応：最大消費電流が10Aを超えないため、ヒートポンプの専用電気工事をせずに屋外コンセントから電源をとれる",
      "コンクリート簡易ベースを使うと基礎工事が不要（上部に転倒防止金具が必要）",
      "奥行500mmでの設置に対応"
    ],
    "cautions": [
      "次世代省エネルギー基準の1地域・2地域・3地域と、外気温度が−10℃を下回る地域には設置しない",
      "屋外コンセントの個別配線ブレーカーは20Aであること。屋外コンセントと共用配線の場合は、機器の消費電流を確認して20Aを超えないようにする",
      "水道水を使う（温泉水・地下水・井戸水は使わない）。運転音や振動が出ることがあるので、隣家・寝室などに配慮して設置場所を選ぶ",
      "20号・16号の熱源機を設置した場合は水圧が弱くなる可能性があるため、24号を推奨"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus-24_240_240.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
    "manufacturerPrice": {
      "amount": 1091420,
      "tax": "included",
      "includes": "ヒートポンプタンクユニット・熱源機の希望小売価格の合計。リモコン（MFC-HBE308D）は別売で含まない",
      "asOf": "ハイブリッド給湯器カタログ 2026年9月新価格（発行 2026/8）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "HB-232TUHPL-P",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4812990000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01",
      "https://www.paloma.co.jp/special/kyutou_shoene2026/",
      "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus_shiyou_02.jpg"
    ]
  },
  {
    "id": "paloma-hb-232tuhpl-p-fh-eh2422farl",
    "slug": "hb-232tuhpl-p-fh-eh2422farl",
    "brand": "paloma",
    "category": "hybrid",
    "series": "HYBRID PLUS[ハイブリッド プラス]",
    "name": "HYBRID PLUS[ハイブリッド プラス] 24号据え置きフルオート",
    "modelNumber": "HB-232TUHPL-P + FH-EH2422FARL",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "HB-232TUHPL-P"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "HB-232TUHPL-P（ヒートポンプとタンクが一体）"
      },
      {
        "label": "ガス熱源機",
        "model": "FH-EH2422FARL"
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
      "tankLiters": 22.5
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
        "label": "ヒートポンプタンクユニット（HB-232TUHPL-P）の外形寸法",
        "value": "高さ953.9 × 幅611.3 × 奥行432.8（mm）"
      },
      {
        "label": "ヒートポンプタンクユニットの質量",
        "value": "56.8kg（満水時79.3kg）"
      },
      {
        "label": "タンク容量",
        "value": "22.5L"
      },
      {
        "label": "冷媒の種類／充填量",
        "value": "R32（フロン）／340g"
      },
      {
        "label": "ヒートポンプタンクユニットの消費電力（最大）",
        "value": "980W"
      },
      {
        "label": "設置可能地域区分／設置可能最低外気温度",
        "value": "4地域以南／−10℃"
      },
      {
        "label": "年間給湯効率",
        "value": "108.9%（JGKAS A705に基づく年間給湯効率・6地域、給湯負荷18.3GJ/年）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "108.9%（ヒートポンプユニット HB-232TUHPL-P の登録値）"
      },
      {
        "label": "熱源機（FH-EH2422FARL）の外形寸法",
        "value": "高さ670 × 幅534 × 奥行240（mm）"
      },
      {
        "label": "熱源機（FH-EH2422FARL）の質量",
        "value": "31kg（満水時33kg）"
      },
      {
        "label": "熱源機のガス消費量（13A・LPガス）",
        "value": "給湯 44.2kW／ふろ 11.6kW／同時使用 53.5kW"
      }
    ],
    "remotes": [
      {
        "model": "MFC-HBE308D",
        "note": "マルチリモコンセット（IOT対応・インターホン）。別売品"
      },
      {
        "model": "ZC-250",
        "note": "増設リモコン"
      }
    ],
    "features": [
      "ヒートポンプとタンクが一体の「ヒートポンプタンクユニット」と、ガスの熱源機の2ユニット構成",
      "必要な分だけ沸かして使い切る小容量の「エコロジタンク」",
      "過去の使用湯量とパターンを学習して沸かし上げる「学習機能」",
      "太陽光発電の電力を自家消費して沸かし上げる「太陽光発電活用モード」（ソーラーパネルなどの発電システムが必要）",
      "プラグイン対応：最大消費電流が10Aを超えないため、ヒートポンプの専用電気工事をせずに屋外コンセントから電源をとれる",
      "コンクリート簡易ベースを使うと基礎工事が不要（上部に転倒防止金具が必要）",
      "奥行500mmでの設置に対応"
    ],
    "cautions": [
      "次世代省エネルギー基準の1地域・2地域・3地域と、外気温度が−10℃を下回る地域には設置しない",
      "屋外コンセントの個別配線ブレーカーは20Aであること。屋外コンセントと共用配線の場合は、機器の消費電流を確認して20Aを超えないようにする",
      "水道水を使う（温泉水・地下水・井戸水は使わない）。運転音や振動が出ることがあるので、隣家・寝室などに配慮して設置場所を選ぶ",
      "20号・16号の熱源機を設置した場合は水圧が弱くなる可能性があるため、24号を推奨"
    ],
    "images": [],
    "imageSource": {
      "url": "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus-24_240_240.jpg",
      "pageUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "match": "series-representative",
      "checkedAt": "2026-10-14"
    },
    "imageLicenseStatus": "pending",
    "manufacturerUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
    "manufacturerPrice": {
      "amount": 1169850,
      "tax": "included",
      "includes": "ヒートポンプタンクユニット・熱源機の希望小売価格の合計。リモコン（MFC-HBE308D）は別売で含まない",
      "asOf": "ハイブリッド給湯器カタログ 2026年9月新価格（発行 2026/8）と、2026-10-14 の公式製品ページ",
      "sourceUrl": "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "HB-232TUHPL-P",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.paloma.co.jp/cgi-bin/productDetail.cgi?rno=541",
      "https://www.paloma.co.jp/product/catalog/index.html",
      "https://paloma.icata.net/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=PLM00001&categoryID=&catalogID=4812990000&catalogCategoryID=&pageGroupID=&pageID=&designID=PLMD01",
      "https://www.paloma.co.jp/special/kyutou_shoene2026/",
      "https://www.paloma.co.jp/vc-files/paloma/product/products_hybridplus/products_hybridplus_shiyou_02.jpg"
    ]
  }
];
