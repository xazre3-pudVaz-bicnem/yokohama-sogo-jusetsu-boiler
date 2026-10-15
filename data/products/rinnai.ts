import type { ProductData } from "@/data/products/types";

/**
 * リンナイの商品データ。2026-10-14 に、公式サイト・公式カタログで型番と仕様を確かめたもの。
 * 根拠のページは各商品の sources。調査のしかたと記録は docs/PRODUCT_DATA.md。
 * 当社の価格（salesPrice など）は、会社から金額を受け取るまで null（画面では「お見積もり」）。
 * 製品写真の記録は data/products/images.json（ここには書かない）。
 */
export const rinnaiProducts: ProductData[] = [
  {
    "id": "rinnai-ruf-e240eaw",
    "slug": "ruf-e240eaw",
    "brand": "rinnai",
    "category": "eco-jozu",
    "series": "RUF-Eシリーズ",
    "name": "RUF-Eシリーズ ふろ給湯器",
    "modelNumber": "RUF-E240EAW",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛型（W）"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "高さ600×幅470×奥行240（mm）"
      },
      {
        "label": "質量",
        "value": "26.0kg"
      },
      {
        "label": "給湯ガス消費量",
        "value": "44.2kW（38,000kcal/h）"
      },
      {
        "label": "おいだきガス消費量",
        "value": "11.0kW（9,500kcal/h）"
      },
      {
        "label": "号数の範囲",
        "value": "24〜1.5号"
      },
      {
        "label": "本体色",
        "value": "シャイニーシルバー"
      }
    ],
    "remotes": [
      {
        "model": "MBC-342VC",
        "note": "浴室・台所リモコン（アプリ対応）別売"
      },
      {
        "model": "MBC-282VC",
        "note": "浴室・台所リモコン別売"
      }
    ],
    "features": [
      "排気熱を再利用して効率よくお湯を沸かす高効率ガス給湯器（エコジョーズ）",
      "停電モード：停電時もガスと水道が使えれば、ポータブル電源を熱源機に接続して給湯のみ使用できる（ポータブル電源が必要）",
      "低NOx（すべての燃焼域でNOx濃度60ppm以下）",
      "フルオート：湯はりから、おいだき・保温・たし湯まで全自動。おいだき配管自動洗浄・自動たし湯・自動沸きあげはフルオートのみの機能"
    ],
    "cautions": [
      "PS設置はできない",
      "戸建て、マンションによって設置できる型式が異なる。設置可否の詳細は現地調査が必要"
    ],
    "manufacturerUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
    "manufacturerPrice": {
      "amount": 533500,
      "tax": "included",
      "includes": "本体のみ。リモコン別売・工事費別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/"
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
      "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://www.rinnai.jp/products/waterheater/gas/feature/eco/"
    ]
  },
  {
    "id": "rinnai-ruf-e240esaw",
    "slug": "ruf-e240esaw",
    "brand": "rinnai",
    "category": "eco-jozu",
    "series": "RUF-Eシリーズ",
    "name": "RUF-Eシリーズ ふろ給湯器",
    "modelNumber": "RUF-E240ESAW",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛型（W）"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "高さ600×幅470×奥行240（mm）"
      },
      {
        "label": "質量",
        "value": "26.0kg"
      },
      {
        "label": "給湯ガス消費量",
        "value": "44.2kW（38,000kcal/h）"
      },
      {
        "label": "おいだきガス消費量",
        "value": "11.0kW（9,500kcal/h）"
      },
      {
        "label": "号数の範囲",
        "value": "24〜1.5号"
      },
      {
        "label": "本体色",
        "value": "シャイニーシルバー"
      }
    ],
    "remotes": [
      {
        "model": "MBC-342VC",
        "note": "浴室・台所リモコン（アプリ対応）別売"
      },
      {
        "model": "MBC-282VC",
        "note": "浴室・台所リモコン別売"
      }
    ],
    "features": [
      "排気熱を再利用して効率よくお湯を沸かす高効率ガス給湯器（エコジョーズ）",
      "停電モード：停電時もガスと水道が使えれば、ポータブル電源を熱源機に接続して給湯のみ使用できる（ポータブル電源が必要）",
      "低NOx（すべての燃焼域でNOx濃度60ppm以下）",
      "オート：湯はりから、おいだき・保温までが自動"
    ],
    "cautions": [
      "PS設置はできない",
      "設置可否の詳細は現地調査が必要"
    ],
    "manufacturerUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
    "manufacturerPrice": {
      "amount": 471900,
      "tax": "included",
      "includes": "本体のみ。リモコン別売・工事費別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/"
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
      "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://www.rinnai.jp/products/waterheater/gas/feature/eco/"
    ]
  },
  {
    "id": "rinnai-ruf-e200fsaw",
    "slug": "ruf-e200fsaw",
    "brand": "rinnai",
    "category": "eco-jozu",
    "series": "RUF-Eシリーズ",
    "name": "RUF-Eシリーズ ふろ給湯器",
    "modelNumber": "RUF-E200FSAW",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛型（W）"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "H600×W470×D240（mm）"
      },
      {
        "label": "質量",
        "value": "26kg（満水時28kg）"
      },
      {
        "label": "ガス消費量",
        "value": "同時47.7kW（41000kcal/h）／給湯36.7kW（31600kcal/h）／ふろ11kW（9500kcal/h）"
      },
      {
        "label": "熱効率",
        "value": "給湯96％・ふろ92％"
      },
      {
        "label": "消費電力",
        "value": "105W（待機時0.8W）"
      },
      {
        "label": "給湯能力",
        "value": "34.9〜2.6kW（20号〜1.5号）"
      },
      {
        "label": "給水・給湯接続口",
        "value": "20A（R3/4）（15A接続はRUF-E201FSAW）"
      }
    ],
    "remotes": [
      {
        "model": "MBC-342VC",
        "note": "浴室・台所リモコン（アプリ対応）別売"
      },
      {
        "model": "MBC-282VC",
        "note": "浴室・台所リモコン別売"
      }
    ],
    "features": [
      "排気熱を再利用して効率よくお湯を沸かす高効率ガス給湯器（エコジョーズ）",
      "停電モード：停電時もガスと水道が使えれば、ポータブル電源を熱源機に接続して給湯のみ使用できる（ポータブル電源が必要）",
      "低NOx（すべての燃焼域でNOx濃度60ppm以下）",
      "オート：湯はりから、おいだき・保温までが自動"
    ],
    "cautions": [
      "PS設置はできない",
      "設置可否の詳細は現地調査が必要"
    ],
    "manufacturerUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
    "manufacturerPrice": {
      "amount": 442200,
      "tax": "included",
      "includes": "本体のみ。リモコン別売・工事費別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/"
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
      "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi"
    ]
  },
  {
    "id": "rinnai-ruf-e161esaw",
    "slug": "ruf-e161esaw",
    "brand": "rinnai",
    "category": "eco-jozu",
    "series": "RUF-Eシリーズ",
    "name": "RUF-Eシリーズ ふろ給湯器",
    "modelNumber": "RUF-E161ESAW",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛型（W）"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "H600×W470×D240（mm）"
      },
      {
        "label": "質量",
        "value": "25kg（満水時27kg）"
      },
      {
        "label": "ガス消費量",
        "value": "同時39.2kW（33700kcal/h）／給湯29.4kW（25300kcal/h）／ふろ11kW（9500kcal/h）"
      },
      {
        "label": "熱効率",
        "value": "給湯95％・ふろ92％"
      },
      {
        "label": "消費電力",
        "value": "95W（待機時0.8W）"
      },
      {
        "label": "給湯能力",
        "value": "27.9〜2.6kW（16号〜1.5号）"
      },
      {
        "label": "給水・給湯接続口",
        "value": "15A（R1/2）（20A接続はRUF-E160ESAW）"
      }
    ],
    "remotes": [
      {
        "model": "MBC-342VC",
        "note": "浴室・台所リモコン（アプリ対応）別売"
      },
      {
        "model": "MBC-282VC",
        "note": "浴室・台所リモコン別売"
      }
    ],
    "features": [
      "排気熱を再利用して効率よくお湯を沸かす高効率ガス給湯器（エコジョーズ）",
      "停電モード：停電時もガスと水道が使えれば、ポータブル電源を熱源機に接続して給湯のみ使用できる（ポータブル電源が必要）",
      "低NOx（すべての燃焼域でNOx濃度60ppm以下）",
      "オート：湯はりから、おいだき・保温までが自動"
    ],
    "cautions": [
      "PS設置はできない",
      "設置可否の詳細は現地調査が必要"
    ],
    "manufacturerUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
    "manufacturerPrice": {
      "amount": 407000,
      "tax": "included",
      "includes": "本体のみ。リモコン別売・工事費別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/"
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
      "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi"
    ]
  },
  {
    "id": "rinnai-ruf-e240esag",
    "slug": "ruf-e240esag",
    "brand": "rinnai",
    "category": "eco-jozu",
    "series": "RUF-Eシリーズ",
    "name": "RUF-Eシリーズ ふろ給湯器（屋外据置型）",
    "modelNumber": "RUF-E240ESAG",
    "installationType": {
      "key": "floor",
      "label": "屋外据置型（G）"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "H600×W517×D250（mm）"
      },
      {
        "label": "質量",
        "value": "28kg（満水時30kg）"
      },
      {
        "label": "ガス消費量",
        "value": "同時54kW（46400kcal/h）／給湯44.2kW（38000kcal/h）／ふろ11kW（9500kcal/h）"
      },
      {
        "label": "熱効率",
        "value": "給湯95％・ふろ92％"
      },
      {
        "label": "消費電力",
        "value": "105W（待機時0.8W）"
      },
      {
        "label": "給湯能力",
        "value": "41.9〜2.6kW（24号〜1.5号）"
      },
      {
        "label": "本体色",
        "value": "シャイニーシルバー"
      }
    ],
    "remotes": [
      {
        "model": "MBC-342VC",
        "note": "浴室・台所リモコン（アプリ対応）別売"
      },
      {
        "model": "MBC-282VC",
        "note": "浴室・台所リモコン別売"
      }
    ],
    "features": [
      "排気熱を再利用して効率よくお湯を沸かす高効率ガス給湯器（エコジョーズ）",
      "停電モード：停電時もガスと水道が使えれば、ポータブル電源を熱源機に接続して給湯のみ使用できる（ポータブル電源が必要）",
      "低NOx（すべての燃焼域でNOx濃度60ppm以下）",
      "オート：湯はりから、おいだき・保温までが自動"
    ],
    "cautions": [],
    "manufacturerUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
    "manufacturerPrice": {
      "amount": 487300,
      "tax": "included",
      "includes": "本体のみ。リモコン別売・工事費別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf"
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
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi",
      "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/"
    ]
  },
  {
    "id": "rinnai-ruf-e240esat",
    "slug": "ruf-e240esat",
    "brand": "rinnai",
    "category": "eco-jozu",
    "series": "RUF-Eシリーズ",
    "name": "RUF-Eシリーズ ふろ給湯器（PS扉内設置型／PS前排気型）",
    "modelNumber": "RUF-E240ESAT",
    "installationType": {
      "key": "ps-door",
      "label": "PS扉内設置型／PS前排気型（T）"
    },
    "housing": [
      "apartment"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "H600×W470×D240（mm）"
      },
      {
        "label": "質量",
        "value": "26kg（満水時28kg）"
      },
      {
        "label": "ガス消費量",
        "value": "同時54kW（46400kcal/h）／給湯44.2kW（38000kcal/h）／ふろ11kW（9500kcal/h）"
      },
      {
        "label": "熱効率",
        "value": "給湯95％・ふろ92％"
      },
      {
        "label": "消費電力",
        "value": "120W（待機時0.8W）"
      },
      {
        "label": "給湯能力",
        "value": "41.9〜2.6kW（24号〜1.5号）"
      }
    ],
    "remotes": [
      {
        "model": "MBC-342VC",
        "note": "浴室・台所リモコン（アプリ対応）別売"
      },
      {
        "model": "MBC-282VC",
        "note": "浴室・台所リモコン別売"
      }
    ],
    "features": [
      "排気熱を再利用して効率よくお湯を沸かす高効率ガス給湯器（エコジョーズ）",
      "停電モード：停電時もガスと水道が使えれば、ポータブル電源を熱源機に接続して給湯のみ使用できる（ポータブル電源が必要）",
      "低NOx（すべての燃焼域でNOx濃度60ppm以下）",
      "超高層対応品（風速30m/sまで）。ただし壁掛またはPS設置の場合のみ対応（PS扉内設置は不可）",
      "排気流速アップ対応品"
    ],
    "cautions": [
      "PS扉内設置の場合は扉内設置用取付BOX UOP-P030が必要",
      "排気筒口径φ100（排気延長不可）"
    ],
    "manufacturerUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
    "manufacturerPrice": {
      "amount": 485100,
      "tax": "included",
      "includes": "本体のみ。リモコン別売・工事費別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf"
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
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi",
      "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/"
    ]
  },
  {
    "id": "rinnai-ruf-e240esaa",
    "slug": "ruf-e240esaa",
    "brand": "rinnai",
    "category": "eco-jozu",
    "series": "RUF-Eシリーズ",
    "name": "RUF-Eシリーズ ふろ給湯器（アルコーブ設置型）",
    "modelNumber": "RUF-E240ESAA",
    "installationType": {
      "key": "ps-standard",
      "label": "アルコーブ設置型（A）"
    },
    "housing": [
      "apartment"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "H600×W470×D240（mm）"
      },
      {
        "label": "質量",
        "value": "26kg（満水時28kg）"
      },
      {
        "label": "ガス消費量",
        "value": "同時54kW（46400kcal/h）／給湯44.2kW（38000kcal/h）／ふろ11kW（9500kcal/h）"
      },
      {
        "label": "熱効率",
        "value": "給湯95％・ふろ92％"
      },
      {
        "label": "消費電力",
        "value": "140W（待機時0.8W）"
      },
      {
        "label": "給湯能力",
        "value": "41.9〜2.6kW（24号〜1.5号）"
      }
    ],
    "remotes": [
      {
        "model": "MBC-342VC",
        "note": "浴室・台所リモコン（アプリ対応）別売"
      },
      {
        "model": "MBC-282VC",
        "note": "浴室・台所リモコン別売"
      }
    ],
    "features": [
      "排気熱を再利用して効率よくお湯を沸かす高効率ガス給湯器（エコジョーズ）",
      "停電モード：停電時もガスと水道が使えれば、ポータブル電源を熱源機に接続して給湯のみ使用できる（ポータブル電源が必要）",
      "低NOx（すべての燃焼域でNOx濃度60ppm以下）",
      "側方排気アダプタは付属",
      "超高層対応品（風速30m/sまで）。ただし壁掛設置でかつ側方給気アダプタを取り付けた場合のみ対応"
    ],
    "cautions": [
      "扉内設置の場合はアルコーブ扉内アダプタを使用（専用オプション UOP-TAR114）",
      "左・右共通"
    ],
    "manufacturerUrl": "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/",
    "manufacturerPrice": {
      "amount": 485100,
      "tax": "included",
      "includes": "本体のみ。リモコン別売・工事費別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf"
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
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi",
      "https://www.rinnai.jp/products/waterheater/gas/ruf/e-series/"
    ]
  },
  {
    "id": "rinnai-rux-e2016w-a",
    "slug": "rux-e2016w-a",
    "brand": "rinnai",
    "category": "eco-jozu",
    "series": "RUX-Eシリーズ",
    "name": "RUX-Eシリーズ ガス給湯器",
    "modelNumber": "RUX-E2016W(A)",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛型（W）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 20,
      "tankLiters": null
    },
    "functions": {
      "key": "hot-water-only",
      "label": "給湯専用"
    },
    "gasTypes": [
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "H530×W350×D190（mm）"
      },
      {
        "label": "質量",
        "value": "17kg（満水時18kg）"
      },
      {
        "label": "ガス消費量",
        "value": "37.5kW（32300kcal/h）"
      },
      {
        "label": "熱効率",
        "value": "93％"
      },
      {
        "label": "消費電力",
        "value": "48W（待機時0.8W）"
      },
      {
        "label": "給湯能力",
        "value": "34.9〜5.2kW（20号〜3号）"
      },
      {
        "label": "給水・給湯接続口",
        "value": "15A（R1/2）（20A接続はRUX-E2006W(A)）"
      }
    ],
    "remotes": [
      {
        "model": "BC-145V（A）",
        "note": "浴室リモコン別売"
      },
      {
        "model": "MC-145V（A）",
        "note": "台所リモコン別売"
      }
    ],
    "features": [
      "排気熱を再利用するエコジョーズの給湯専用機（おいだき機能なし）",
      "低NOx（NOx 60ppm以下）"
    ],
    "cautions": [
      "PS設置はできない",
      "設置可否の詳細は現地調査が必要"
    ],
    "manufacturerUrl": "https://www.rinnai.jp/products/waterheater/gas/rux/e-series/",
    "manufacturerPrice": {
      "amount": 228800,
      "tax": "included",
      "includes": "本体のみ。リモコン別売・工事費別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://www.rinnai.jp/products/waterheater/gas/rux/e-series/"
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
      "https://www.rinnai.jp/products/waterheater/gas/rux/e-series/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi",
      "https://www.rinnai.jp/products/waterheater/gas/feature/eco/"
    ]
  },
  {
    "id": "rinnai-rufh-e2408aw2-6-a",
    "slug": "rufh-e2408aw2-6-a",
    "brand": "rinnai",
    "category": "eco-jozu",
    "series": "RUFH-Eシリーズ",
    "name": "ふろ給湯暖房熱源機（RUFH-Eシリーズ）",
    "modelNumber": "RUFH-E2408AW2-6(A)",
    "installationType": {
      "key": "wall",
      "label": "屋外壁掛型（W）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": 24,
      "tankLiters": null
    },
    "functions": {
      "key": "heating",
      "label": "フルオート（ふろ給湯＋温水暖房）"
    },
    "heating": true,
    "gasTypes": [
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "外形寸法",
        "value": "750×480（本体474）×250（mm）"
      },
      {
        "label": "質量",
        "value": "35kg（満水時39kg）"
      },
      {
        "label": "最大ガス消費量",
        "value": "同時60.7kW（52,200kcal/h）／給湯44.2kW（38,000kcal/h）／暖房16.5kW（14,200kcal/h）"
      },
      {
        "label": "おいだき能力",
        "value": "9.9kW（8,500kcal/h）"
      },
      {
        "label": "暖房能力",
        "value": "14.0〜2.79kW（12,000〜2,400kcal/h）比例制御"
      },
      {
        "label": "熱効率",
        "value": "給湯95％、暖房87％（高温85％、低温89％）"
      },
      {
        "label": "消費電力",
        "value": "210W（待機時1.1W）"
      },
      {
        "label": "給排気方式",
        "value": "強制排気方式（排気延長不可）"
      }
    ],
    "remotes": [
      {
        "model": "MBC-342VC",
        "note": "浴室・台所リモコン（アプリ対応）別売"
      }
    ],
    "features": [
      "給湯・おいだきに加え、床暖房などの温水暖房に使える熱源機（エコジョーズ）",
      "フルオート（オートはRUFH-E2408SAW2-6(A)）",
      "停電モード（ポータブル電源が必要）"
    ],
    "cautions": [],
    "manufacturerUrl": "https://www.rinnai.jp/products/waterheater/gas/rufh-rvd/e-series/",
    "manufacturerPrice": {
      "amount": 668800,
      "tax": "included",
      "includes": "本体のみ。リモコン別売・工事費別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://www.rinnai.jp/products/waterheater/gas/rufh-rvd/e-series/"
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
      "https://www.rinnai.jp/products/waterheater/gas/rufh-rvd/e-series/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_KDSE.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi",
      "https://www.rinnai.jp/products/waterheater/gas/feature/eco/"
    ]
  },
  {
    "id": "rinnai-rhbh-rc248aw2-1-rhp-r223-s-rtu-r1603",
    "slug": "rhbh-rc248aw2-1-rhp-r223-s-rtu-r1603",
    "brand": "rinnai",
    "category": "hybrid",
    "series": "ECO ONE（160L）ダブルハイブリッド（給湯＋暖房）",
    "name": "ECO ONE 160L ダブルハイブリッド（給湯＋暖房）標準モデル",
    "modelNumber": "RHBH-RC248AW2-1 + RHP-R223(S) + RTU-R1603",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "RHP-R223(S)"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "RTU-R1603"
      },
      {
        "label": "ガス熱源機",
        "model": "RHBH-RC248AW2-1"
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
      "tankLiters": 160
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオート（暖房つき）"
    },
    "heating": true,
    "gasTypes": [
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "ヒートポンプユニット",
        "value": "RHP-R223(S)：高さ690×幅815×奥行297（mm）"
      },
      {
        "label": "タンクユニット",
        "value": "RTU-R1603：高さ1750×幅474×奥行564（mm）、49.5kg、タンク容量160L"
      },
      {
        "label": "熱源機",
        "value": "RHBH-RC248AW2-1：H750×W480×D270（mm）、40kg（満水時44kg）、暖房能力 比例制御14.0〜2.79kW"
      },
      {
        "label": "連結据置台",
        "value": "RHO-M201SS-1000"
      },
      {
        "label": "暖房能力",
        "value": "14.0kW"
      },
      {
        "label": "年間給湯効率",
        "value": "148.1%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "142.3%（ヒートポンプユニット RHP-R223(S) の登録値）"
      }
    ],
    "remotes": [
      {
        "model": "BC-332VC(A)-W／BC-332VC(A)-B",
        "note": "カラーリモコン 浴室"
      },
      {
        "model": "MC-331VC(A)-W／MC-331VC(A)-B",
        "note": "カラーリモコン 台所"
      },
      {
        "model": "MBC-341VC",
        "note": "標準リモコン インターホンリモコンセット"
      },
      {
        "model": "MBC-271VC",
        "note": "シンプルリモコン インターホンリモコンセット"
      }
    ],
    "features": [
      "電気（ヒートポンプ）で沸かしたお湯をタンクに貯め、足りないときはガス（エコジョーズ）ですぐ給湯するハイブリッド給湯器",
      "停電時：「停電対応モード」でガス熱源機にポータブル電源を接続すると給湯できる。太陽光発電の自立運転（100V）や蓄電池の電力でも給湯可（ガスが供給されている場合）",
      "ガスが止まった場合：電気が供給されていればヒートポンプのみで給湯できる",
      "断水時：タンクユニットの非常用取水栓からタンク内のお湯（水）を生活用水として取り出せる",
      "気象警報と連動してタンクに自動で沸き上げ（160Lで最大360L。浴槽への湯はり量が200Lの場合）",
      "太陽光発電（PV）活用モード：天気予報から太陽光の発電量を予測し、昼間の余剰電力で前倒し沸き上げ",
      "製品寿命お知らせ（経年劣化を台所リモコンに通知）",
      "ダブルハイブリッド：給湯に加え床暖房もガスと電気のハイブリッド運転"
    ],
    "cautions": [
      "設置スペースの目安：奥行550mm×幅2,000mm（ECO ONE 160Lの場合。商品タイプや設置方法で異なる）"
    ],
    "manufacturerUrl": "https://rinnai.jp/ecoone/lineup/double_160",
    "manufacturerPrice": {
      "amount": 1191300,
      "tax": "included",
      "includes": "システム希望小売価格（ヒートポンプユニット＋タンクユニット＋熱源機＋据置台）。工事費・リモコン別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://rinnai.jp/ecoone/lineup/double_160"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "RHP-R223(S)",
    "subsidyNote": "本体だけで性能要件を満たします。性能加算は、貯湯ユニットとの組み合わせで要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://rinnai.jp/ecoone/lineup/double_160",
      "https://rinnai.jp/ecoone/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_HB.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rinnai.jp/jutaku-shoene/kyutou-shoene/",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi"
    ]
  },
  {
    "id": "rinnai-rhbh-rc248aw2-1-rhp-r222-s-rtu-r1602",
    "slug": "rhbh-rc248aw2-1-rhp-r222-s-rtu-r1602",
    "brand": "rinnai",
    "category": "hybrid",
    "series": "ECO ONE（160L）シングルハイブリッド（給湯＋暖房）",
    "name": "ECO ONE 160L シングルハイブリッド（給湯＋暖房）標準モデル",
    "modelNumber": "RHBH-RC248AW2-1 + RHP-R222(S) + RTU-R1602",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "RHP-R222(S)"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "RTU-R1602"
      },
      {
        "label": "ガス熱源機",
        "model": "RHBH-RC248AW2-1"
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
      "tankLiters": 160
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオート（暖房つき）"
    },
    "heating": true,
    "gasTypes": [
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "ヒートポンプユニット",
        "value": "RHP-R222(S)：高さ690×幅755×奥行297（mm）、35kg、COP 中間期5.4／夏期6.6／冬期4.9、消費電力 最大時1,200W"
      },
      {
        "label": "タンクユニット",
        "value": "RTU-R1602：高さ1,750×幅474×奥行564（mm）、46.5kg（満水時206.5kg）、タンク容量160L／PV活用モード初期設定のタンク：RTU-R1602-PV(A)"
      },
      {
        "label": "熱源機",
        "value": "RHBH-RC248AW2-1：H750×W480×D270（mm）、40kg（満水時44kg）、暖房能力 比例制御14.0〜2.79kW"
      },
      {
        "label": "連結据置台",
        "value": "RHO-M201SS-1000"
      },
      {
        "label": "暖房能力",
        "value": "14.0kW"
      },
      {
        "label": "年間給湯効率",
        "value": "148.1%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "142.3%（ヒートポンプユニット RHP-R222(S) の登録値）"
      }
    ],
    "remotes": [
      {
        "model": "BC-332VC(A)-W／BC-332VC(A)-B",
        "note": "カラーリモコン 浴室"
      },
      {
        "model": "MC-331VC(A)-W／MC-331VC(A)-B",
        "note": "カラーリモコン 台所"
      },
      {
        "model": "MBC-341VC",
        "note": "標準リモコン インターホンリモコンセット"
      },
      {
        "model": "MBC-271VC",
        "note": "シンプルリモコン インターホンリモコンセット"
      }
    ],
    "features": [
      "電気（ヒートポンプ）で沸かしたお湯をタンクに貯め、足りないときはガス（エコジョーズ）ですぐ給湯するハイブリッド給湯器",
      "停電時：「停電対応モード」でガス熱源機にポータブル電源を接続すると給湯できる。太陽光発電の自立運転（100V）や蓄電池の電力でも給湯可（ガスが供給されている場合）",
      "ガスが止まった場合：電気が供給されていればヒートポンプのみで給湯できる",
      "断水時：タンクユニットの非常用取水栓からタンク内のお湯（水）を生活用水として取り出せる",
      "気象警報と連動してタンクに自動で沸き上げ（160Lで最大360L。浴槽への湯はり量が200Lの場合）",
      "太陽光発電（PV）活用モード：天気予報から太陽光の発電量を予測し、昼間の余剰電力で前倒し沸き上げ",
      "製品寿命お知らせ（経年劣化を台所リモコンに通知）",
      "シングルハイブリッド：給湯機能のみガスと電気の両方を使う（暖房はガス）"
    ],
    "cautions": [
      "設置スペースの目安：奥行550mm×幅2,000mm（ECO ONE 160Lの場合）"
    ],
    "manufacturerUrl": "https://rinnai.jp/ecoone/lineup/single_160",
    "manufacturerPrice": {
      "amount": 1062600,
      "tax": "included",
      "includes": "システム希望小売価格（ヒートポンプユニット＋タンクユニット＋熱源機＋据置台）。工事費・リモコン別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://rinnai.jp/ecoone/lineup/single_160"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "RHP-R222(S)",
    "subsidyNote": "本体だけで性能要件を満たします。性能加算は、貯湯ユニットとの組み合わせで要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://rinnai.jp/ecoone/lineup/single_160",
      "https://rinnai.jp/ecoone/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_HB.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rinnai.jp/jutaku-shoene/kyutou-shoene/",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi"
    ]
  },
  {
    "id": "rinnai-rhbf-rck246aw-rhp-r222-s-rtu-r1602",
    "slug": "rhbf-rck246aw-rhp-r222-s-rtu-r1602",
    "brand": "rinnai",
    "category": "hybrid",
    "series": "ECO ONE（160L）シングルハイブリッド（ふろ給湯）",
    "name": "ECO ONE 160L シングルハイブリッド（ふろ給湯）標準モデル",
    "modelNumber": "RHBF-RCK246AW + RHP-R222(S) + RTU-R1602",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "RHP-R222(S)"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "RTU-R1602"
      },
      {
        "label": "ガス熱源機",
        "model": "RHBF-RCK246AW"
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
      "tankLiters": 160
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオート（ふろ給湯）"
    },
    "gasTypes": [
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "ヒートポンプユニット",
        "value": "RHP-R222(S)：高さ690×幅755×奥行297（mm）、35kg、COP 中間期5.4／夏期6.6／冬期4.9、消費電力 最大時1,200W"
      },
      {
        "label": "タンクユニット",
        "value": "RTU-R1602：高さ1,750×幅474×奥行564（mm）、46.5kg（満水時206.5kg）、タンク容量160L／PV活用モード初期設定のタンク：RTU-R1602-PV(A)"
      },
      {
        "label": "熱源機",
        "value": "RHBF-RCK246AW：高さ600×幅470×奥行270（mm）、29.5kg（満水時31.5kg）"
      },
      {
        "label": "連結据置台",
        "value": "RHO-F201SS-1150"
      },
      {
        "label": "年間給湯効率",
        "value": "148.1%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "142.3%（ヒートポンプユニット RHP-R222(S) の登録値）"
      }
    ],
    "remotes": [
      {
        "model": "BC-332VC(A)-W／BC-332VC(A)-B",
        "note": "カラーリモコン 浴室"
      },
      {
        "model": "MC-331VC(A)-W／MC-331VC(A)-B",
        "note": "カラーリモコン 台所"
      },
      {
        "model": "MBC-341VC",
        "note": "標準リモコン インターホンリモコンセット"
      },
      {
        "model": "MBC-271VC",
        "note": "シンプルリモコン インターホンリモコンセット"
      }
    ],
    "features": [
      "電気（ヒートポンプ）で沸かしたお湯をタンクに貯め、足りないときはガス（エコジョーズ）ですぐ給湯するハイブリッド給湯器",
      "停電時：「停電対応モード」でガス熱源機にポータブル電源を接続すると給湯できる。太陽光発電の自立運転（100V）や蓄電池の電力でも給湯可（ガスが供給されている場合）",
      "ガスが止まった場合：電気が供給されていればヒートポンプのみで給湯できる",
      "断水時：タンクユニットの非常用取水栓からタンク内のお湯（水）を生活用水として取り出せる",
      "気象警報と連動してタンクに自動で沸き上げ（160Lで最大360L。浴槽への湯はり量が200Lの場合）",
      "太陽光発電（PV）活用モード：天気予報から太陽光の発電量を予測し、昼間の余剰電力で前倒し沸き上げ",
      "製品寿命お知らせ（経年劣化を台所リモコンに通知）"
    ],
    "cautions": [
      "設置スペースの目安：奥行550mm×幅2,000mm（ECO ONE 160Lの場合）"
    ],
    "manufacturerUrl": "https://rinnai.jp/ecoone/lineup/single_wh_160",
    "manufacturerPrice": {
      "amount": 982300,
      "tax": "included",
      "includes": "システム希望小売価格（ヒートポンプユニット＋タンクユニット＋熱源機＋据置台）。工事費・リモコン別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://rinnai.jp/ecoone/lineup/single_wh_160"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "RHP-R222(S)",
    "subsidyNote": "本体だけで性能要件を満たします。性能加算は、貯湯ユニットとの組み合わせで要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://rinnai.jp/ecoone/lineup/single_wh_160",
      "https://rinnai.jp/ecoone/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_HB.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rinnai.jp/jutaku-shoene/kyutou-shoene/",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi"
    ]
  },
  {
    "id": "rinnai-rhbh-r248aw2-1-rhp-r225-rtu-r701",
    "slug": "rhbh-r248aw2-1-rhp-r225-rtu-r701",
    "brand": "rinnai",
    "category": "hybrid",
    "series": "ECO ONE X5 シングルハイブリッド（給湯＋暖房）",
    "name": "ECO ONE X5 70L シングルハイブリッド（給湯＋暖房）標準モデル",
    "modelNumber": "RHBH-R248AW2-1 + RHP-R225 + RTU-R701",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "RHP-R225"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "RTU-R701"
      },
      {
        "label": "ガス熱源機",
        "model": "RHBH-R248AW2-1"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "ヒートポンプユニット",
        "value": "RHP-R225：高さ675×幅737×奥行250（mm）、25kg、COP 中間期5.6／夏期7.2／冬期4.9、消費電力 最大時1,200W"
      },
      {
        "label": "タンクユニット",
        "value": "RTU-R701：高さ1,255×幅365×奥行474（mm）、26kg（満水時94kg）、タンク容量68L（商品名は70L）"
      },
      {
        "label": "熱源機",
        "value": "RHBH-R248AW2-1：高さ750×幅480×奥行250（mm）、35kg（満水時39kg）"
      },
      {
        "label": "据置台",
        "value": "WOP-M201SS-500-HB"
      },
      {
        "label": "暖房能力",
        "value": "14.0kW"
      },
      {
        "label": "狭小設置タイプ",
        "value": "熱源機 RHBH-R248AW2-1＋中央排気アダプタ WOP-6606-A"
      },
      {
        "label": "年間給湯効率",
        "value": "123.7%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "123.7%（ヒートポンプユニット RHP-R225 の登録値）"
      }
    ],
    "remotes": [
      {
        "model": "BC-332VC(A)-W／BC-332VC(A)-B",
        "note": "カラーリモコン 浴室"
      },
      {
        "model": "MC-331VC(A)-W／MC-331VC(A)-B",
        "note": "カラーリモコン 台所"
      },
      {
        "model": "MBC-341VC",
        "note": "標準リモコン インターホンリモコンセット"
      },
      {
        "model": "MBC-271VC",
        "note": "シンプルリモコン インターホンリモコンセット"
      }
    ],
    "features": [
      "電気（ヒートポンプ）で沸かしたお湯をタンクに貯め、足りないときはガス（エコジョーズ）ですぐ給湯するハイブリッド給湯器",
      "停電時：「停電対応モード」でガス熱源機にポータブル電源を接続すると給湯できる。太陽光発電の自立運転（100V）や蓄電池の電力でも給湯可（ガスが供給されている場合）",
      "ガスが止まった場合：電気が供給されていればヒートポンプのみで給湯できる",
      "断水時：タンクユニットの非常用取水栓からタンク内のお湯（水）を生活用水として取り出せる",
      "気象警報と連動してタンクに自動で沸き上げ（X5の場合 最大270L。浴槽への湯はり量が200Lの場合）",
      "太陽光発電（PV）活用モード：天気予報から太陽光の発電量を予測し、昼間の余剰電力で前倒し沸き上げ",
      "製品寿命お知らせ（経年劣化を台所リモコンに通知）",
      "基礎工事不要（軽量・小型ユニット）",
      "タンクと熱源機は分離設置ができ、既存の給湯器位置に合わせられる"
    ],
    "cautions": [
      "設置可能スペースの最小寸法 奥行500mm（ECO ONE X5の場合。商品タイプや設置方法により異なる）"
    ],
    "manufacturerUrl": "https://rinnai.jp/ecoone/lineup/single_70",
    "manufacturerPrice": {
      "amount": 983400,
      "tax": "included",
      "includes": "システム希望小売価格（ヒートポンプユニット＋タンクユニット＋熱源機＋据置台）。工事費・リモコン別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://rinnai.jp/ecoone/lineup/single_70"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "RHP-R225",
    "subsidyNote": "本体だけで性能要件を満たします。性能加算は、貯湯ユニットとの組み合わせで要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://rinnai.jp/ecoone/lineup/single_70",
      "https://rinnai.jp/ecoone/x5/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_HB.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rinnai.jp/jutaku-shoene/kyutou-shoene/",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi"
    ]
  },
  {
    "id": "rinnai-rhbf-rk246aw-rhp-r225-rtu-r701",
    "slug": "rhbf-rk246aw-rhp-r225-rtu-r701",
    "brand": "rinnai",
    "category": "hybrid",
    "series": "ECO ONE X5 シングルハイブリッド（ふろ給湯）",
    "name": "ECO ONE X5 70L シングルハイブリッド（ふろ給湯）標準モデル",
    "modelNumber": "RHBF-RK246AW + RHP-R225 + RTU-R701",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "RHP-R225"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "RTU-R701"
      },
      {
        "label": "ガス熱源機",
        "model": "RHBF-RK246AW"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "ヒートポンプユニット",
        "value": "RHP-R225：高さ675×幅737×奥行250（mm）、25kg、COP 中間期5.6／夏期7.2／冬期4.9、消費電力 最大時1,200W"
      },
      {
        "label": "タンクユニット",
        "value": "RTU-R701：高さ1,255×幅365×奥行474（mm）、26kg（満水時94kg）、タンク容量68L（商品名は70L）"
      },
      {
        "label": "熱源機",
        "value": "RHBF-RK246AW：高さ600×幅470×奥行240（mm）、25.5kg（満水時27.5kg）"
      },
      {
        "label": "据置台",
        "value": "WOP-F201SS-650-HB"
      },
      {
        "label": "狭小設置タイプ",
        "value": "熱源機 RHBF-RK246AT（狭小設置用の熱源機）"
      },
      {
        "label": "年間給湯効率",
        "value": "123.7%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "123.7%（ヒートポンプユニット RHP-R225 の登録値）"
      }
    ],
    "remotes": [
      {
        "model": "BC-332VC(A)-W／BC-332VC(A)-B",
        "note": "カラーリモコン 浴室"
      },
      {
        "model": "MC-331VC(A)-W／MC-331VC(A)-B",
        "note": "カラーリモコン 台所"
      },
      {
        "model": "MBC-341VC",
        "note": "標準リモコン インターホンリモコンセット"
      },
      {
        "model": "MBC-271VC",
        "note": "シンプルリモコン インターホンリモコンセット"
      }
    ],
    "features": [
      "電気（ヒートポンプ）で沸かしたお湯をタンクに貯め、足りないときはガス（エコジョーズ）ですぐ給湯するハイブリッド給湯器",
      "停電時：「停電対応モード」でガス熱源機にポータブル電源を接続すると給湯できる。太陽光発電の自立運転（100V）や蓄電池の電力でも給湯可（ガスが供給されている場合）",
      "ガスが止まった場合：電気が供給されていればヒートポンプのみで給湯できる",
      "断水時：タンクユニットの非常用取水栓からタンク内のお湯（水）を生活用水として取り出せる",
      "気象警報と連動してタンクに自動で沸き上げ（X5の場合 最大270L。浴槽への湯はり量が200Lの場合）",
      "太陽光発電（PV）活用モード：天気予報から太陽光の発電量を予測し、昼間の余剰電力で前倒し沸き上げ",
      "製品寿命お知らせ（経年劣化を台所リモコンに通知）",
      "基礎工事不要（軽量・小型ユニット）",
      "タンクと熱源機は分離設置ができ、既存の給湯器位置に合わせられる"
    ],
    "cautions": [
      "設置可能スペースの最小寸法 奥行500mm（ECO ONE X5の場合。商品タイプや設置方法により異なる）"
    ],
    "manufacturerUrl": "https://rinnai.jp/ecoone/lineup/single_wh_70",
    "manufacturerPrice": {
      "amount": 898700,
      "tax": "included",
      "includes": "システム希望小売価格（ヒートポンプユニット＋タンクユニット＋熱源機＋据置台）。工事費・リモコン別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://rinnai.jp/ecoone/lineup/single_wh_70"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "RHP-R225",
    "subsidyNote": "本体だけで性能要件を満たします。性能加算は、貯湯ユニットとの組み合わせで要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://rinnai.jp/ecoone/lineup/single_wh_70",
      "https://rinnai.jp/ecoone/x5/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_HB.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rinnai.jp/jutaku-shoene/kyutou-shoene/",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi"
    ]
  },
  {
    "id": "rinnai-rhbh-r248aw2-1-rhp-r225-p-rtup-r701",
    "slug": "rhbh-r248aw2-1-rhp-r225-p-rtup-r701",
    "brand": "rinnai",
    "category": "hybrid",
    "series": "ECO ONE X5 PLUG-IN MODEL シングルハイブリッド（給湯＋暖房）",
    "name": "ECO ONE X5 PLUG-IN MODEL 70L（給湯＋暖房）標準モデル",
    "modelNumber": "RHBH-R248AW2-1 + RHP-R225-P + RTUP-R701",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "RHP-R225-P"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "RTUP-R701"
      },
      {
        "label": "ガス熱源機",
        "model": "RHBH-R248AW2-1"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "ヒートポンプユニット",
        "value": "RHP-R225-P：高さ675×幅737×奥行250（mm）、25kg、COP 中間期5.6／夏期7.2／冬期4.9、消費電力 最大時850W"
      },
      {
        "label": "タンクユニット",
        "value": "RTUP-R701：高さ1,255×幅365×奥行474（mm）、26kg（満水時94kg）、タンク容量68L（商品名は70L）"
      },
      {
        "label": "熱源機",
        "value": "RHBH-R248AW2-1：高さ750×幅480×奥行250（mm）、35kg（満水時39kg）"
      },
      {
        "label": "据置台",
        "value": "WOP-M201SS-500-HB"
      },
      {
        "label": "暖房能力",
        "value": "14.0kW"
      },
      {
        "label": "狭小設置タイプ",
        "value": "熱源機 RHBH-R248AW2-1＋中央排気アダプタ WOP-6606-A"
      },
      {
        "label": "年間給湯効率",
        "value": "120.8%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "120.8%（ヒートポンプユニット RHP-R225-P の登録値）"
      }
    ],
    "remotes": [
      {
        "model": "BC-332VC(A)-W／BC-332VC(A)-B",
        "note": "カラーリモコン 浴室"
      },
      {
        "model": "MC-331VC(A)-W／MC-331VC(A)-B",
        "note": "カラーリモコン 台所"
      },
      {
        "model": "MBC-341VC",
        "note": "標準リモコン インターホンリモコンセット"
      },
      {
        "model": "MBC-271VC",
        "note": "シンプルリモコン インターホンリモコンセット"
      }
    ],
    "features": [
      "電気（ヒートポンプ）で沸かしたお湯をタンクに貯め、足りないときはガス（エコジョーズ）ですぐ給湯するハイブリッド給湯器",
      "停電時：「停電対応モード」でガス熱源機にポータブル電源を接続すると給湯できる。太陽光発電の自立運転（100V）や蓄電池の電力でも給湯可（ガスが供給されている場合）",
      "ガスが止まった場合：電気が供給されていればヒートポンプのみで給湯できる",
      "断水時：タンクユニットの非常用取水栓からタンク内のお湯（水）を生活用水として取り出せる",
      "気象警報と連動してタンクに自動で沸き上げ（X5の場合 最大270L。浴槽への湯はり量が200Lの場合）",
      "太陽光発電（PV）活用モード：天気予報から太陽光の発電量を予測し、昼間の余剰電力で前倒し沸き上げ",
      "製品寿命お知らせ（経年劣化を台所リモコンに通知）",
      "ヒートポンプ専用電源工事不要（ヒートポンプの最大消費電流が10Aを超えないため屋外コンセントから給電）",
      "基礎工事不要（軽量・小型ユニット）"
    ],
    "cautions": [
      "プラグインモデルは省エネ地域区分の5地域〜8地域でのみ使用可（5〜8地域以外には設置できない）",
      "ヒートポンプは屋外コンセント（AC100V）から給電。宅内の屋外コンセントにつながる個別配線ブレーカーは20Aであること。システム全体の最大消費電流：ふろ給湯器の場合最大11A、給湯暖房機の場合最大12A、マイクロバブルを使用する場合最大15A",
      "設置可能スペースの最小寸法 奥行500mm（商品タイプや設置方法により異なる）"
    ],
    "manufacturerUrl": "https://rinnai.jp/ecoone/lineup/single_70pi",
    "manufacturerPrice": {
      "amount": 983400,
      "tax": "included",
      "includes": "システム希望小売価格（ヒートポンプユニット＋タンクユニット＋熱源機＋据置台）。工事費・リモコン別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://rinnai.jp/ecoone/lineup/single_70pi"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "RHP-R225-P",
    "subsidyNote": "本体だけで性能要件を満たします。性能加算は、貯湯ユニットとの組み合わせで要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://rinnai.jp/ecoone/lineup/single_70pi",
      "https://rinnai.jp/ecoone/x5-plugin/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_HB_PIL.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rinnai.jp/jutaku-shoene/kyutou-shoene/",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi"
    ]
  },
  {
    "id": "rinnai-rhbf-rk246aw-rhp-r225-p-rtup-r701",
    "slug": "rhbf-rk246aw-rhp-r225-p-rtup-r701",
    "brand": "rinnai",
    "category": "hybrid",
    "series": "ECO ONE X5 PLUG-IN MODEL シングルハイブリッド（ふろ給湯）",
    "name": "ECO ONE X5 PLUG-IN MODEL 70L（ふろ給湯）標準モデル",
    "modelNumber": "RHBF-RK246AW + RHP-R225-P + RTUP-R701",
    "units": [
      {
        "label": "ヒートポンプユニット",
        "model": "RHP-R225-P"
      },
      {
        "label": "貯湯ユニット（タンクユニット）",
        "model": "RTUP-R701"
      },
      {
        "label": "ガス熱源機",
        "model": "RHBF-RK246AW"
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
      "13A・12A",
      "LPG"
    ],
    "specifications": [
      {
        "label": "ヒートポンプユニット",
        "value": "RHP-R225-P：高さ675×幅737×奥行250（mm）、25kg、COP 中間期5.6／夏期7.2／冬期4.9、消費電力 最大時850W"
      },
      {
        "label": "タンクユニット",
        "value": "RTUP-R701：高さ1,255×幅365×奥行474（mm）、26kg（満水時94kg）、タンク容量68L（商品名は70L）"
      },
      {
        "label": "熱源機",
        "value": "RHBF-RK246AW：高さ600×幅470×奥行240（mm）、25.5kg（満水時27.5kg）"
      },
      {
        "label": "据置台",
        "value": "WOP-F201SS-650-HB"
      },
      {
        "label": "狭小設置タイプ",
        "value": "熱源機 RHBF-RK246AT（狭小設置用の熱源機）"
      },
      {
        "label": "年間給湯効率",
        "value": "120.8%（JGKAS A705に基づく年間給湯効率・6地域）"
      },
      {
        "label": "年間給湯効率（国の対象製品リストの登録値）",
        "value": "120.8%（ヒートポンプユニット RHP-R225-P の登録値）"
      }
    ],
    "remotes": [
      {
        "model": "BC-332VC(A)-W／BC-332VC(A)-B",
        "note": "カラーリモコン 浴室"
      },
      {
        "model": "MC-331VC(A)-W／MC-331VC(A)-B",
        "note": "カラーリモコン 台所"
      },
      {
        "model": "MBC-341VC",
        "note": "標準リモコン インターホンリモコンセット"
      },
      {
        "model": "MBC-271VC",
        "note": "シンプルリモコン インターホンリモコンセット"
      }
    ],
    "features": [
      "電気（ヒートポンプ）で沸かしたお湯をタンクに貯め、足りないときはガス（エコジョーズ）ですぐ給湯するハイブリッド給湯器",
      "停電時：「停電対応モード」でガス熱源機にポータブル電源を接続すると給湯できる。太陽光発電の自立運転（100V）や蓄電池の電力でも給湯可（ガスが供給されている場合）",
      "ガスが止まった場合：電気が供給されていればヒートポンプのみで給湯できる",
      "断水時：タンクユニットの非常用取水栓からタンク内のお湯（水）を生活用水として取り出せる",
      "気象警報と連動してタンクに自動で沸き上げ（X5の場合 最大270L。浴槽への湯はり量が200Lの場合）",
      "太陽光発電（PV）活用モード：天気予報から太陽光の発電量を予測し、昼間の余剰電力で前倒し沸き上げ",
      "製品寿命お知らせ（経年劣化を台所リモコンに通知）",
      "ヒートポンプ専用電源工事不要（ヒートポンプの最大消費電流が10Aを超えないため屋外コンセントから給電）",
      "基礎工事不要（軽量・小型ユニット）"
    ],
    "cautions": [
      "プラグインモデルは省エネ地域区分の5地域〜8地域でのみ使用可（5〜8地域以外には設置できない）",
      "ヒートポンプは屋外コンセント（AC100V）から給電。宅内の屋外コンセントにつながる個別配線ブレーカーは20Aであること。システム全体の最大消費電流：ふろ給湯器の場合最大11A、給湯暖房機の場合最大12A、マイクロバブルを使用する場合最大15A",
      "設置可能スペースの最小寸法 奥行500mm（商品タイプや設置方法により異なる）"
    ],
    "manufacturerUrl": "https://rinnai.jp/ecoone/lineup/single_wh_70pi",
    "manufacturerPrice": {
      "amount": 898700,
      "tax": "included",
      "includes": "システム希望小売価格（ヒートポンプユニット＋タンクユニット＋熱源機＋据置台）。工事費・リモコン別",
      "asOf": "2026年9月1日改定後の価格（総合カタログ『2026年9月 新価格』／2026年9月改定価格表）",
      "sourceUrl": "https://rinnai.jp/ecoone/lineup/single_wh_70pi"
    },
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 120000,
    "subsidyListedModel": "RHP-R225-P",
    "subsidyNote": "本体だけで性能要件を満たします。性能加算は、貯湯ユニットとの組み合わせで要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://rinnai.jp/ecoone/lineup/single_wh_70pi",
      "https://rinnai.jp/ecoone/x5-plugin/",
      "https://www.rinnai.jp/catalog_download/pdf/Rinnai_HB_PIL.pdf",
      "https://www.rinnai.co.jp/releases/2026/0612/images/202609price.pdf",
      "https://rinnai.jp/jutaku-shoene/kyutou-shoene/",
      "https://rkids.rinnai.jp/rin/cgi-bin/itemSearchTop.cgi"
    ]
  }
];
