import type { BrandId } from "@/data/products/types";

/**
 * 古い型番と、メーカーが案内している機種の対応（メーカーの公式の情報だけ）。
 * このファイルは、調査の記録（引用つき・原文と照合済み）から作ったもの。手で足すときも、下の決まりを守る。
 *
 * 守ること
 * - 書いてよいのは、メーカー自身が公式サイト・公式資料で示している対応だけ。
 *   successor   … 「後継機種」「現行品」「モデルチェンジ（従来機種）」として示しているもの
 *   replacement … カタログの取り替えの表で「取替推奨（品）」として示しているもの（設置の条件つき）
 *   従来品との比較だけの記述・シリーズ単位の記述は載せない。型番の似かたから推し量って足さない。
 * - 型番は、メーカーの表記のまま書く（全角の括弧だけ半角にした）。「～」は、その型番からの範囲（メーカーの書き方）。
 * - 出典は successorSources。接続認証のあるサイト（rkids.rinnai.jp）・自動の取得を断っているサイト（n-techdocs.com）の情報は使わない。
 * - メーカーが添えている条件（設置の形・必要な部材など）は note に書く。メーカー全体の注意は successorBrandNotes。
 *
 * 画面：一覧（/products/successor と /products/successor/<メーカー>）・機種のページ（この機種を案内している古い型番）。
 * npm run data:check が、出典のドメイン・重なり・型番の形を確かめる。
 */
export type SuccessorRelation = "successor" | "replacement";

export type SuccessorSource = {
  id: string;
  /** 資料の名前 */
  label: string;
  /** メーカーの公式ページ・資料の URL */
  url: string;
  /** 確かめた日 */
  verifiedAt: string;
};

export type SuccessorRow = {
  brand: BrandId;
  /** いまの（古い）型番。メーカーの表記のまま */
  oldModels: string[];
  /** メーカーが案内している型番（2つ以上のときは、どれか） */
  successors: string[];
  relation: SuccessorRelation;
  /** 出典（successorSources の id） */
  sourceId: string;
  /** 資料の中の場所（ページ・表の欄） */
  where?: string;
  /** メーカーが添えている条件など */
  note?: string;
  /** このサイトの機種につなぐ型番（後継の型番と表記が違い、同じ機種だと公式の情報で確かめたときだけ） */
  siteModels?: string[];
};

/** メーカー全体の注意（出典の文言のまま） */
export const successorBrandNotes: Partial<Record<BrandId, { text: string; sourceId: string }[]>> = {
  "rinnai": [
    {
      "text": "○現在設置されている機器のリモコンはご使用になれませんので、リモコンも取り替えてください。",
      "sourceId": "kse2026"
    },
    {
      "text": "（注意）パイプシャフト金枠の条件により、取替アダプタが使用できない場合がありますので、事前に最寄りのリンナイ支社・支店、営業所、出張所にご相談ください。",
      "sourceId": "kse2026"
    }
  ],
  "noritz": [
    {
      "text": "取替にあたっては、現場のガス供給能力や機器の排気バリエーション等、設置条件の確認が必要です。",
      "sourceId": "noritz-catalog-2026-3-p123"
    },
    {
      "text": "また、単純に機器の取替だけの場合と、部材が必要な場合や現場加工が必要な場合があります。",
      "sourceId": "noritz-catalog-2026-3-p123"
    },
    {
      "text": "この一覧では、複雑な現場加工が不要となるパターンでの取替推奨品を掲載しております。",
      "sourceId": "noritz-catalog-2026-3-p123"
    },
    {
      "text": "※GQ-C1634AWX-DXシリーズは別途ドレン処理工事が必要となります。",
      "sourceId": "noritz-catalog-2026-3-p123"
    }
  ],
  "panasonic": [
    {
      "text": "◆「機能」欄に記載以外の｢快適機能・省エネ機能｣の変遷は考慮しておりません",
      "sourceId": "panasonic-dotokisyu"
    }
  ],
  "daikin": [
    {
      "text": "※既設の機器との接続可否は考慮しておりません。",
      "sourceId": "daikin-dtnet-eq37h3ftv"
    }
  ]
};

export const successorSources: SuccessorSource[] = [
  {
    "id": "mitsubishi-win2k-search-srt-s37",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-S37」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-S37&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-s46",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-S46」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-S46&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-p37",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-P37」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-P37&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-p46",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-P46」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-P46&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-w37",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-W37」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-W37&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-w46",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-W46」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-W46&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-hp37wx",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-HP37WX」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-HP37WX&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-hp46wx",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-HP46WX」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-HP46WX&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-hp37wu",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-HP37WU」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-HP37WU&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-hp46wu",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-HP46WU」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-HP46WU&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-hp37w",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-HP37W」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-HP37W&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-win2k-search-srt-hp46w",
    "label": "三菱電機WIN2K 製品検索結果(形名「SRT-HP46W」、旧型品を含めて表示)",
    "url": "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/searchProductResult.do?ccd=&releaseFrom=&releaseTo=&oldProductFlg=1&contentsList=&pn=SRT-HP46W&pageNo=1&log=true&showAll=false&init=true",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "mitsubishi-successor-list",
    "label": "三菱電機 エコキュート後継機種一覧表(2025年5月現在・PDF)",
    "url": "https://www.mitsubishielectric.co.jp/home/ecocute/techinfo/pdf/successor-list.pdf",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "panasonic-dotokisyu",
    "label": "パナソニック エコキュート 新旧後継 機種一覧(PDF)",
    "url": "https://sumai.panasonic.jp/hp/topimg/dotokisyu.pdf",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37h3ftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37H3FTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37H3FTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37j2ftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37J2FTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37J2FTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37kftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37KFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37KFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37laftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37LAFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37LAFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37lfcv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37LFCV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37LFCV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37lftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37LFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37LFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37lfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37LFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37LFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37mbfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37MBFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37MBFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37mfcv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37MFCV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37MFCV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37mftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37MFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37MFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37mfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37MFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37MFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37nftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37NFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37NFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37nfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37NFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37NFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37pftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37PFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37PFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37pfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37PFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37PFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37rftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37RFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37RFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37rfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37RFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37RFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37sfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37SFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37SFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37tftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37TFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37TFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37tfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37TFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37TFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37uftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37UFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37UFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37ufv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37UFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37UFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37vftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37VFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37VFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37vfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37VFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37VFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37wftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37WFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37WFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37wfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37WFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37WFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37xftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37XFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37XFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq37xfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ37XFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ37XFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46kfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46KFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46KFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46lfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46LFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46LFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46mbfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46MBFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46MBFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46mfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46MFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46MFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46nfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46NFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46NFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46pfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46PFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46PFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46rfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46RFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46RFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46sfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46SFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46SFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46tfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46TFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46TFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46ufv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46UFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46UFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46vfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46VFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46VFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46wfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46WFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46WFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eq46xfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQ46XFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQ46XFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqa37yftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQA37YFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQA37YFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqa37yfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQA37YFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQA37YFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqa37zftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQA37ZFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQA37ZFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqa37zfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQA37ZFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQA37ZFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqa46yfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQA46YFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQA46YFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqa46zfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQA46ZFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQA46ZFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqk37mfcv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQK37MFCV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQK37MFCV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqk46kfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQK46KFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQK46KFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37lfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37LFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37LFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37mbfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37MBFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37MBFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37mfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37MFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37MFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37nfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37NFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37NFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37pfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37PFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37PFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37rfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37RFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37RFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37tfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37TFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37TFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37ufv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37UFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37UFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37vfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37VFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37VFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37wfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37WFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37WFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37xfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37XFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37XFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37yfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37YFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37YFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn37zfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN37ZFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN37ZFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46lfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46LFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46LFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46mbfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46MBFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46MBFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46mfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46MFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46MFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46nfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46NFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46NFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46pfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46PFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46PFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46rfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46RFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46RFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46tfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46TFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46TFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46ufv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46UFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46UFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46vfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46VFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46VFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46wfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46WFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46WFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46xfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46XFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46XFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46yfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46YFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46YFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqn46zfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQN46ZFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQN46ZFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqs37sftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQS37SFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQS37SFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqs37sfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQS37SFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQS37SFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqs46sfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQS46SFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQS46SFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqsn37sfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQSN37SFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQSN37SFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqsn46sfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQSN46SFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQSN46SFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37lafv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37LAFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37LAFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37lfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37LFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37LFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37uftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37UFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37UFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37vftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37VFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37VFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37wftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37WFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37WFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37wfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37WFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37WFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37xftv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37XFTV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37XFTV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37xfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37XFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37XFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37yfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37YFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37YFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx37zfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX37ZFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX37ZFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx46lafv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX46LAFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX46LAFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx46lfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX46LFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX46LFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx46wfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX46WFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX46WFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "daikin-dtnet-eqx46xfv",
    "label": "ダイキン DT-NET(取扱説明書・据付説明書の検索)：EQX46XFV",
    "url": "https://www.free.dtnet.daikin.co.jp/DT-NET/torisetu/result?type=0&conditions=EQX46XFV&tAuth=free&torisetuFlg=1&suesetuFlg=0&searchAgeFrom=ALL&searchAgeTo=ALL",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "kdse2026",
    "label": "ガス給湯暖房システム カタログ 2026 III(2026年9月 新価格)",
    "url": "https://rinnai.jp/catalog_download/pdf/Rinnai_KDSE.pdf",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "rel20170626",
    "label": "ニュースリリース 2017年06月26日「軽量&コンパクトがさらに進化 エコジョーズ給湯専用機をモデルチェンジ」",
    "url": "https://www.rinnai.co.jp/releases/2017/0626/",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "rel20180903",
    "label": "ニュースリリース 2018年09月03日「狭小地設置に適したスリムタイプエコジョーズ ガスふろ給湯器RUF-SEシリーズモデルチェンジ」",
    "url": "https://www.rinnai.co.jp/releases/2018/0903/",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "rel20170301",
    "label": "ニュースリリース 2017年03月01日「狭小地設置に適したスリムタイプをモデルチェンジ エコジョーズ給湯暖房用熱源機RUFH-SE2406シリーズ発売」",
    "url": "https://www.rinnai.co.jp/releases/2017/0301/index_1.html",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "rel20150625",
    "label": "ニュースリリース 2015年06月25日「エコジョーズ給湯暖房機RVD－Eシリーズをモデルチェンジ 業界No.1の軽量・コンパクト化を実現」",
    "url": "https://www.rinnai.co.jp/releases/2015/0625/index_2.html",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "rel20160108",
    "label": "ニュースリリース 2016年01月08日「環境に配慮し、軽量化を実現したエコジョーズ 給湯暖房用熱源機を発売！」",
    "url": "https://www.rinnai.co.jp/releases/2016/0108/index_2.html",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "rel20110121",
    "label": "ニュースリリース 2011年01月21日「エコジョーズ給湯暖房用熱源機「RUFH-E2402シリーズ」を新発売」",
    "url": "https://www.rinnai.co.jp/releases/2011/0121/",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "kse2026",
    "label": "ガス給湯器 総合カタログ2026 IV(2026年9月 新価格)",
    "url": "https://rinnai.jp/catalog_download/pdf/Rinnai_KSE.pdf",
    "verifiedAt": "2026-11-16"
  },
  {
    "id": "noritz-catalog-2026-3-p123",
    "label": "ノーリツ ガス給湯機器 総合カタログ2026.Ⅲ「クイックオート PS取替アダプター一覧(集合住宅向け)」",
    "url": "https://noritz.mediapress-net.com/iportal/CatalogDownload.do?method=downloadPdfCatalog&type=downloadPdfCatalog&volumeID=NRZ50001&categoryID=&catalogID=24516410000&catalogCategoryID=&pageGroupID=&pageID=&designID=NRZD001",
    "verifiedAt": "2026-11-16"
  }
];

export const successorTable: SuccessorRow[] = [
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-160"
    ],
    "successors": [
      "RUX-A2406T(A)-E",
      "RUX-A2016T(A)-E",
      "RUX-A1616T(A)-E",
      "RUX-A2015T(A)-E",
      "RUX-A1615T(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ160ページ",
    "note": "扉内設置の場合。必要な別売部材：UOP-G-G1T(21-6841)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-1600"
    ],
    "successors": [
      "RUX-A2406T(A)-E",
      "RUX-A2016T(A)-E",
      "RUX-A1616T(A)-E",
      "RUX-A2015T(A)-E",
      "RUX-A1615T(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ159ページ",
    "note": "扉内設置の場合。必要な別売部材：UOP-G-G4T(R)(24-5034)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-1600シリーズ"
    ],
    "successors": [
      "RUX-A2406W(A)-E",
      "RUX-A2016W(A)-E",
      "RUX-A1616W(A)-E",
      "RUX-A2015W(A)-E",
      "RUX-A1615W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ159ページ",
    "note": "必要な別売部材：UOP-G528(21-8437)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-160シリーズ"
    ],
    "successors": [
      "RUX-A2406W(A)-E",
      "RUX-A2016W(A)-E",
      "RUX-A1616W(A)-E",
      "RUX-A2015W(A)-E",
      "RUX-A1615W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ159ページ",
    "note": "必要な別売部材：UOP-G-G1-UW(23-1016)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-161"
    ],
    "successors": [
      "RUX-SA1616T(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ160ページ",
    "note": "扉内設置の場合。必要な別売部材：UOP-5-G5T(R)(24-5068)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-1601",
      "OUR-161"
    ],
    "successors": [
      "RUX-SA1616B(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ167ページ",
    "note": "PS後方排気型（標準設置）の場合"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-16FP"
    ],
    "successors": [
      "RUX-A2406W(A)-E",
      "RUX-A2016W(A)-E",
      "RUX-A1616W(A)-E",
      "RUX-A2015W(A)-E",
      "RUX-A1615W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ160ページ",
    "note": "必要な別売部材：UOP-G-G3-UW(23-1033)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-16FP"
    ],
    "successors": [
      "RUX-A2406T(A)-E",
      "RUX-A2016T(A)-E",
      "RUX-A1616T(A)-E",
      "RUX-A2015T(A)-E",
      "RUX-A1615T(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ160ページ",
    "note": "扉内設置の場合。必要な別売部材：UOP-G-G3T(21-6860)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-16F2",
      "OUR-16FPD"
    ],
    "successors": [
      "RUX-A2406W(A)-E",
      "RUX-A2016W(A)-E",
      "RUX-A1616W(A)-E",
      "RUX-A2015W(A)-E",
      "RUX-A1615W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ160ページ",
    "note": "必要な別売部材：UOP-G-G2-UW(23-1024)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-16F2",
      "OUR-16FPD"
    ],
    "successors": [
      "RUX-A2406T(A)-E",
      "RUX-A2016T(A)-E",
      "RUX-A1616T(A)-E",
      "RUX-A2015T(A)-E",
      "RUX-A1615T(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ160ページ",
    "note": "扉内設置の場合。必要な別売部材：UOP-G-G2T(R)(23-7533)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-16PS",
      "RUX-16PS",
      "RUX-V16PS"
    ],
    "successors": [
      "RUX-A1606W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ154ページ",
    "note": "別売のPS取付アダプタ UOP-G-G1S20(R)-UW(23-1008)が必要"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-13Fシリーズ",
      "OUR-16PS"
    ],
    "successors": [
      "RUX-A2406W(A)-E",
      "RUX-A2016W(A)-E",
      "RUX-A1616W(A)-E",
      "RUX-A2015W(A)-E",
      "RUX-A1615W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ159ページ",
    "note": "必要な別売部材：機器下の無目板の有無などで UOP-G-G-UW(23-0983)／UOP-G-G13F(R)-UW(23-0992)／UOP-G-G1S20(R)-UW(23-1008)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-21FB",
      "OUR-21FBD"
    ],
    "successors": [
      "RUF-A2405AW(C)",
      "RUF-A2405SAW(C)",
      "RUF-A2005AW(C)",
      "RUF-A2005SAW(C)",
      "RUF-A1615AW(C)",
      "RUF-A1615SAW(C)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ156ページ",
    "note": "必要な別売部材：UX-A-G2S19(R)-UW(24-1785)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-21FB",
      "OUR-21FBD"
    ],
    "successors": [
      "RUF-A2405AT-L(C)",
      "RUF-A2405SAT-L(C)",
      "RUF-A2005AT(C)",
      "RUF-A2005SAT(C)",
      "RUF-A1615AT(C)",
      "RUF-A1615SAT(C)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ156ページ",
    "note": "扉内設置の場合。必要な別売部材：UX-A-G2T(R)(24-9553)(扉穴化粧板付)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OURB-1600D"
    ],
    "successors": [
      "RUF-A2405AT-L(C)",
      "RUF-A2405SAT-L(C)",
      "RUF-A2005AT(C)",
      "RUF-A2005SAT(C)",
      "RUF-A1615AT(C)",
      "RUF-A1615SAT(C)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ156ページ",
    "note": "扉内設置の場合。必要な別売部材：UX-A-G3T(R)(24-9561)(扉穴化粧板付)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OURB-1600Z",
      "OURB-1600Z2"
    ],
    "successors": [
      "RUJ-A2400T(A)",
      "RUJ-A2010T(A)",
      "RUJ-A1610T(A)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ158ページ",
    "note": "扉内設置の場合。高温水供給式。必要な別売部材：UOP-J-G7T(23-3026)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OURB-1600D",
      "OURB-160D"
    ],
    "successors": [
      "RUF-A2405AW(C)",
      "RUF-A2405SAW(C)",
      "RUF-A2005AW(C)",
      "RUF-A2005SAW(C)",
      "RUF-A1615AW(C)",
      "RUF-A1615SAW(C)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ155ページ",
    "note": "必要な別売部材：UX-A-G-UW(24-1777)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OURB-160D"
    ],
    "successors": [
      "RUF-A2405AT-L(C)",
      "RUF-A2405SAT-L(C)",
      "RUF-A2005AT(C)",
      "RUF-A2005SAT(C)",
      "RUF-A1615AT(C)",
      "RUF-A1615SAT(C)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ155ページ",
    "note": "扉内設置の場合。必要な別売部材：UX-A-GT(R)(24-5050)(扉穴化粧板付)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OURB-1601D",
      "OURB-161D"
    ],
    "successors": [
      "RUF-SA2005AW(A)",
      "RUF-SA2005SAW(A)",
      "RUF-SA1615AW(A)",
      "RUF-SA1615SAW(A)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ156ページ",
    "note": "必要な別売部材：UOP-D-G4-UW(24-1769)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OURB-1601D",
      "OURB-161D"
    ],
    "successors": [
      "RUF-SA2005AT(A)",
      "RUF-SA2005SAT(A)",
      "RUF-SA1615AT(A)",
      "RUF-SA1615SAT(A)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ156ページ",
    "note": "扉内設置の場合。必要な別売部材：UOP-D-G4TA(24-3263)(扉穴化粧板付)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OURB-1601D",
      "OURB-161D"
    ],
    "successors": [
      "RUF-SA1615AT-L(A)80",
      "RUF-SA1615SAT-L(A)80"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ156ページ",
    "note": "扉内設置（扉穴加工不要）の場合。必要な別売部材：UOP-D-G4TA(24-3263)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUF-1600APWT",
      "RUF-1600PWT",
      "RUF-1605APWT",
      "RUF-1605PWT"
    ],
    "successors": [
      "RUF-A2405AT-L(C)",
      "RUF-A2405SAT-L(C)",
      "RUF-A2005AT(C)",
      "RUF-A2005SAT(C)",
      "RUF-A1615AT(C)",
      "RUF-A1615SAT(C)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ155ページ",
    "note": "扉内設置の場合。必要な別売部材：UX-A-T(21-1977)。扉の穴の加工が必要"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUF-1600PW",
      "RUF-1605PW"
    ],
    "successors": [
      "RUF-A2405AW(C)",
      "RUF-A2405SAW(C)",
      "RUF-A2005AW(C)",
      "RUF-A2005SAW(C)",
      "RUF-A1615AW(C)",
      "RUF-A1615SAW(C)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ154ページ"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUF-1600PWB",
      "RUF-1605PWB"
    ],
    "successors": [
      "RUF-A2405AB(C)",
      "RUF-A2405SAB(C)",
      "RUF-A2005AB(C)",
      "RUF-A2005SAB(C)",
      "RUF-A1615AB(C)",
      "RUF-A1615SAB(C)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ167ページ",
    "note": "PS後方排気型（標準設置・扉内設置）の場合。扉内設置は、扉内設置用取付ボックスとセットで取り替える"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUF-160PW",
      "RUF-161PW"
    ],
    "successors": [
      "RUF-A2405AW(C)",
      "RUF-A2405SAW(C)",
      "RUF-A2005AW(C)",
      "RUF-A2005SAW(C)",
      "RUF-A1615AW(C)",
      "RUF-A1615SAW(C)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ155ページ",
    "note": "必要な別売部材：ROP-A784X428-UW(24-1751)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUF-S1610AW",
      "RUF-S1610SAW",
      "RUF-S1616AW",
      "RUF-S1616SAW"
    ],
    "successors": [
      "RUF-SA2005AW(A)",
      "RUF-SA2005SAW(A)",
      "RUF-SA1615AW(A)",
      "RUF-SA1615SAW(A)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ154ページ"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUF-SE2000AW"
    ],
    "successors": [
      "RUF-SE2005AW"
    ],
    "relation": "successor",
    "sourceId": "rel20180903"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUFH-E2402AW2-6"
    ],
    "successors": [
      "RUFH-E2406AW2-6"
    ],
    "relation": "successor",
    "sourceId": "rel20160108"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUFH-E2406AW2-6"
    ],
    "successors": [
      "RUFH-E2408AW2-6(A)"
    ],
    "relation": "successor",
    "sourceId": "kdse2026",
    "where": "カタログ78ページ"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUFH-K2402AW2-6"
    ],
    "successors": [
      "RUFH-E2402AW2-6"
    ],
    "relation": "successor",
    "sourceId": "rel20110121"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUFH-SE2403AW2-3(A)"
    ],
    "successors": [
      "RUFH-SE2406AW2-3"
    ],
    "relation": "successor",
    "sourceId": "rel20170301"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUJ-1610PST"
    ],
    "successors": [
      "RUJ-A2400T(A)",
      "RUJ-A2010T(A)",
      "RUJ-A1610T(A)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ158ページ",
    "note": "扉内設置の場合。高温水供給式。必要な別売部材：UOP-J030-16T(23-3000)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUJ-1610W",
      "RUJ-1610W(A)",
      "RUJ-2010W(A)"
    ],
    "successors": [
      "RUJ-A2400W(A)",
      "RUJ-A2010W(A)",
      "RUJ-A1610W(A)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ154ページ",
    "note": "高温水供給式。PS取付アダプタを使わなくても取り付けられる（左右に若干の隙間が生じる）"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUJ-210PSOT"
    ],
    "successors": [
      "RUJ-A2400T(A)",
      "RUJ-A2010T(A)",
      "RUJ-A1610T(A)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ158ページ",
    "note": "扉内設置の場合。高温水供給式。必要な別売部材：UOP-J030-21T(23-2984)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUJ-210WO"
    ],
    "successors": [
      "RUJ-A2400W(A)",
      "RUJ-A2010W(A)",
      "RUJ-A1610W(A)"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ158ページ",
    "note": "高温水供給式。必要な別売部材：UOP-J030-21-UW(23-1203)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUK-1610WO-E"
    ],
    "successors": [
      "RUK-V1610W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ154ページ"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUX-1000PS",
      "RUX-1600PS",
      "RUX-1600PSO",
      "RUX-1600UW",
      "RUX-1600UWOL",
      "RUX-1605PS",
      "RUX-1605PSO",
      "RUX-2100W"
    ],
    "successors": [
      "RUX-A2406W(A)-E",
      "RUX-A2016W(A)-E",
      "RUX-A1616W(A)-E",
      "RUX-A2015W(A)-E",
      "RUX-A1615W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ157ページ",
    "note": "必要な別売部材：UOP-G030-16-UW(23-0966)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUX-1000PST",
      "RUX-1600PSOT",
      "RUX-1600PST",
      "RUX-1600UPSOTL",
      "RUX-1600UPST",
      "RUX-1605PSOT",
      "RUX-1605PST",
      "RUX-2100PST"
    ],
    "successors": [
      "RUX-A2406T(A)-E",
      "RUX-A2016T(A)-E",
      "RUX-A1616T(A)-E",
      "RUX-A2015T(A)-E",
      "RUX-A1615T(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ157ページ",
    "note": "扉内設置の場合。必要な別売部材：UOP-G030-16T(21-7987)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUX-1600SPSOT",
      "RUX-1600SPST"
    ],
    "successors": [
      "RUX-SA1616T(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ154ページ"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUX-1610SB"
    ],
    "successors": [
      "RUX-SA1616B(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ167ページ",
    "note": "PS後方排気型（標準設置・扉内設置）の場合"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-1601",
      "OUR-161",
      "RUX-1610SW"
    ],
    "successors": [
      "RUX-SA1616W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ154ページ"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "OUR-13Fシリーズ",
      "RUX-16PST",
      "RUX-V16PST-S"
    ],
    "successors": [
      "RUX-A1606T-L(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ154ページ",
    "note": "扉内設置の場合"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUX-130W",
      "RUX-170W"
    ],
    "successors": [
      "RUX-A2406W(A)-E",
      "RUX-A2016W(A)-E",
      "RUX-A1616W(A)-E",
      "RUX-A2015W(A)-E",
      "RUX-A1615W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ157ページ",
    "note": "必要な別売部材：UOP-G030-17-UW(23-0958)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUX-130W",
      "RUX-170W"
    ],
    "successors": [
      "RUX-A2016W(A)-E",
      "RUX-A1616W(A)-E",
      "RUX-A2015W(A)-E",
      "RUX-A1615W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ157ページ",
    "note": "扉内設置の場合。必要な別売部材：RUX-A2016W(A)-E・A1616W(A)-EならUOP-G030-17T-20(21-1442)、RUX-A2015W(A)-E・A1615W(A)-EならUOP-G030-17T-16(21-1434)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUA-24PST",
      "RUX-1610DPST",
      "RUX-1611PSOT",
      "RUX-2010DPST",
      "RUX-2010PSOT",
      "RUXQ-1610PST"
    ],
    "successors": [
      "RUX-A2406T(A)-E",
      "RUX-A2016T(A)-E",
      "RUX-A1616T(A)-E",
      "RUX-A2015T(A)-E",
      "RUX-A1615T(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ158ページ",
    "note": "扉内設置の場合。必要な別売部材：UOP-G030A-E(23-8328)"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUA-24W",
      "RUX-1610DWシリーズ",
      "RUX-1611WOシリーズ",
      "RUX-2010DWシリーズ",
      "RUX-2010WOシリーズ",
      "RUXQ-1610W"
    ],
    "successors": [
      "RUX-A2406W(A)-E",
      "RUX-A2016W(A)-E",
      "RUX-A1616W(A)-E",
      "RUX-A2015W(A)-E",
      "RUX-A1615W(A)-E"
    ],
    "relation": "replacement",
    "sourceId": "kse2026",
    "where": "カタログ157ページ",
    "note": "必要な別売部材：UOP-G030-20-UW(23-0974)。PS取付アダプタを使わなくても取り付けられる（左右に若干の隙間が生じる）"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RUX-E2010W"
    ],
    "successors": [
      "RUX-E2016W"
    ],
    "relation": "successor",
    "sourceId": "rel20170626",
    "siteModels": [
      "RUX-E2016W(A)"
    ],
    "note": "このサイトに載せているのは RUX-E2016W(A)。型番の末尾の(A)は、メーカーが軽微な変更（マイナーチェンジ）をしたときに付ける記号（リンナイ Q&A No.4146）"
  },
  {
    "brand": "rinnai",
    "oldModels": [
      "RVD-E2401AW2-1(A)"
    ],
    "successors": [
      "RVD-E2405AW2-1"
    ],
    "relation": "successor",
    "sourceId": "rel20150625"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-1620AW"
    ],
    "successors": [
      "GQ-C1634AWX-DX",
      "GQ-1627AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-1620AW-T"
    ],
    "successors": [
      "GQ-C1634AWX-T-DX",
      "GQ-1627AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ80）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-162AW"
    ],
    "successors": [
      "GQ-1625WS"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）",
    "note": "高温差し湯式から給湯単機能になる（※注1）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-162AW-T"
    ],
    "successors": [
      "GQ-1625WS-T"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ80）",
    "note": "高温差し湯式から給湯単機能になる（※注1）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-168AW"
    ],
    "successors": [
      "GQ-1628AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-168AW-T"
    ],
    "successors": [
      "GQ-1628AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ80）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-2413AW",
      "GQ-2414AW"
    ],
    "successors": [
      "GQ-2427AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-2413AW-T",
      "GQ-2414AW-T"
    ],
    "successors": [
      "GQ-2427AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ100）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-241AW"
    ],
    "successors": [
      "GQ-2427AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "GQ-241AW-T"
    ],
    "successors": [
      "GQ-2427AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ100）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "V16R1",
      "V16R3"
    ],
    "successors": [
      "GQ-C1634AWX-DX",
      "GQ-1627AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "V16R1G"
    ],
    "successors": [
      "GQ-C1634AWX-T-DX",
      "GQ-1627AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ80）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "V16R3G"
    ],
    "successors": [
      "GQ-C1634AWX-T-DX",
      "GQ-1627AWX-T-DX",
      "GQ-1626AWX-60T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ60）",
    "note": "排気筒径が取替推奨品と異なる場合は、PS扉の排気筒穴を拡大する加工が必要（※注2）。GQ-1626AWX-60T-DX は13Aのみ"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV1604RGW/RG",
      "YV1620RG",
      "YV1627RGW/RG"
    ],
    "successors": [
      "GQ-1626AWX-60T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ60）",
    "note": "GQ-1626AWX-60T-DX は13Aのみ"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV1604RPW/RP",
      "YV1620RP",
      "YV1627RPW/RP"
    ],
    "successors": [
      "GQ-1626AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV1605RGW/RG",
      "YV1624RGW/RG"
    ],
    "successors": [
      "GQ-1628AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ60）",
    "note": "排気筒径が取替推奨品と異なる場合は、PS扉の排気筒穴を拡大する加工が必要（※注2）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV1605RPW/RP",
      "YV1624RPW/RP"
    ],
    "successors": [
      "GQ-1628AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV1621RGW/RG～YV1646RGW/RG"
    ],
    "successors": [
      "GQ-C1634AWX-T-DX",
      "GQ-1627AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ80）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV1621RPW/RP～YV1646RPW/RP"
    ],
    "successors": [
      "GQ-C1634AWX-DX",
      "GQ-1627AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV2021RG",
      "YV2022RGW/RG",
      "YV2029RG",
      "YV2037RTW/RT"
    ],
    "successors": [
      "GQ-2027AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ100）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV2021RP～YV2046RPW/RP"
    ],
    "successors": [
      "GQ-2027AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV2033RG～YV2046RGW/RG"
    ],
    "successors": [
      "GQ-2027AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ80）",
    "note": "YV2046RGW/RG は、排気筒径が取替推奨品と異なる場合に PS扉の排気筒穴を拡大する加工が必要（※注2）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV2401RGA"
    ],
    "successors": [
      "GQ-2427AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ100）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV2401RPA"
    ],
    "successors": [
      "GQ-2427AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV2421RG～YV2439RGW/RG"
    ],
    "successors": [
      "GQ-2427AWX-T-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS扉内設置・排気筒径φ100）"
  },
  {
    "brand": "noritz",
    "oldModels": [
      "YV2421RP～YV2438RPW"
    ],
    "successors": [
      "GQ-2427AWX-DX"
    ],
    "relation": "replacement",
    "sourceId": "noritz-catalog-2026-3-p123",
    "where": "カタログ123ページ（PS標準設置）"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP302WFD",
      "SRT-HP303WFD",
      "SRT-HP304WFD",
      "SRT-HP30WD1",
      "SRT-HP30WD2",
      "SRT-HP30WD3",
      "SRT-HP30WD4",
      "SRT-HP30WD5",
      "SRT-W302D",
      "SRT-W303D",
      "SRT-W304D",
      "SRT-W305D",
      "SRT-W306D",
      "SRT-W30D"
    ],
    "successors": [
      "SRT-W306D-2"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP372WF",
      "SRT-HP373WF",
      "SRT-HP374WF"
    ],
    "successors": [
      "SRT-V377"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP372WFD",
      "SRT-HP373WFD",
      "SRT-HP374WFD"
    ],
    "successors": [
      "SRT-V377D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP372WFKD",
      "SRT-HP373WFKD",
      "SRT-HP374WFKD",
      "SRT-HPK37WD1",
      "SRT-HPK37WD2",
      "SRT-HPK37WD3",
      "SRT-HPK37WD4",
      "SRT-HPK37WD5",
      "SRT-HPK37WD6",
      "SRT-HPK37WD7",
      "SRT-HPK37WD8",
      "SRT-WK372D",
      "SRT-WK373D",
      "SRT-WK374D",
      "SRT-WK375D",
      "SRT-WK376D",
      "SRT-WK37D"
    ],
    "successors": [
      "SRT-VK377D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP373",
      "SRT-HP374",
      "SRT-HP37N1",
      "SRT-HP37N2",
      "SRT-HP37N3",
      "SRT-HP37N4",
      "SRT-HP37N5",
      "SRT-HP37N6",
      "SRT-HP37N7",
      "SRT-HP37N8",
      "SRT-N37",
      "SRT-N372",
      "SRT-N373",
      "SRT-N374",
      "SRT-N375",
      "SRT-N376",
      "SRT-N376-2"
    ],
    "successors": [
      "SRT-N377"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP37W1",
      "SRT-HP37W2",
      "SRT-HP37W3",
      "SRT-HP37W4",
      "SRT-HP37W5",
      "SRT-HP37W6",
      "SRT-HP37W7",
      "SRT-HP37W8"
    ],
    "successors": [
      "SRT-V377"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp37w"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP37W3-BS",
      "SRT-HP37W4-BS",
      "SRT-HP37W5-BS",
      "SRT-HP37W6-BS",
      "SRT-HP37W7-BS",
      "SRT-HP37W8-BS"
    ],
    "successors": [
      "SRT-V377-BS"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp37w"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP37WB6"
    ],
    "successors": [
      "SRT-V377-RH",
      "SRT-W375-WB2"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp37w"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP37WD1",
      "SRT-HP37WD2",
      "SRT-HP37WD3",
      "SRT-HP37WD4",
      "SRT-HP37WD5",
      "SRT-HP37WD6",
      "SRT-HP37WD7",
      "SRT-HP37WD8"
    ],
    "successors": [
      "SRT-V377D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp37w"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP37WUX5",
      "SRT-HP37WUX6"
    ],
    "successors": [
      "SRT-S377U"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP37WUX7",
      "SRT-HP37WUX8",
      "SRT-HP37WUXP6"
    ],
    "successors": [
      "SRT-S377U"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp37wu"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP37WUXP7",
      "SRT-HP37WUXP8"
    ],
    "successors": [
      "SRT-P377UB"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp37wu"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP37WUXZ7",
      "SRT-HP37WUXZ8"
    ],
    "successors": [
      "SRT-S377UZ"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp37wu"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP37WX4",
      "SRT-HP37WX5",
      "SRT-HP37WX6",
      "SRT-HP37WX7",
      "SRT-HP37WX8"
    ],
    "successors": [
      "SRT-S377"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp37wx"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP43WUXZ7",
      "SRT-HP43WUXZ8",
      "SRT-S432UZ",
      "SRT-S433UZ",
      "SRT-S434UZ",
      "SRT-S435UZ",
      "SRT-S436UZ",
      "SRT-S43UZ"
    ],
    "successors": [
      "SRT-S437UZ"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-C46",
      "SRT-C462",
      "SRT-C463",
      "SRT-C464",
      "SRT-C465",
      "SRT-C466",
      "SRT-HP462CF",
      "SRT-HP463CF",
      "SRT-HP464CF",
      "SRT-HP46C1",
      "SRT-HP46C2",
      "SRT-HP46C3",
      "SRT-HP46C4",
      "SRT-HP46C5",
      "SRT-HP46C6",
      "SRT-HP46C7",
      "SRT-HP46C8"
    ],
    "successors": [
      "SRT-C467"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP462WF",
      "SRT-HP463WF",
      "SRT-HP464WF"
    ],
    "successors": [
      "SRT-V467"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP463",
      "SRT-HP464",
      "SRT-HP46N1",
      "SRT-HP46N2",
      "SRT-HP46N3",
      "SRT-HP46N4",
      "SRT-HP46N5",
      "SRT-HP46N6",
      "SRT-HP46N7",
      "SRT-HP46N8",
      "SRT-N46",
      "SRT-N462",
      "SRT-N463",
      "SRT-N464",
      "SRT-N465",
      "SRT-N466",
      "SRT-N466-2"
    ],
    "successors": [
      "SRT-N467"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP46W1",
      "SRT-HP46W2",
      "SRT-HP46W3",
      "SRT-HP46W4",
      "SRT-HP46W5",
      "SRT-HP46W6",
      "SRT-HP46W7",
      "SRT-HP46W8"
    ],
    "successors": [
      "SRT-V467"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp46w"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP46W3-BS",
      "SRT-HP46W4-BS",
      "SRT-HP46W5-BS",
      "SRT-HP46W6-BS",
      "SRT-HP46W7-BS",
      "SRT-HP46W8-BS"
    ],
    "successors": [
      "SRT-V467-BS"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp46w"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP46WB6"
    ],
    "successors": [
      "SRT-V467-RH",
      "SRT-W465-WB2"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp46w"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP46WUX5",
      "SRT-HP46WUX6",
      "SRT-HP46WUX7",
      "SRT-HP46WUX8",
      "SRT-HP46WUXP6"
    ],
    "successors": [
      "SRT-S467U"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp46wu"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP46WUXP7",
      "SRT-HP46WUXP8"
    ],
    "successors": [
      "SRT-P467UB"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp46wu"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP46WX4",
      "SRT-HP46WX5",
      "SRT-HP46WX6",
      "SRT-HP46WX7",
      "SRT-HP46WX8"
    ],
    "successors": [
      "SRT-S467"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-hp46wx"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-C37",
      "SRT-C372",
      "SRT-C373",
      "SRT-C374",
      "SRT-C375",
      "SRT-C376",
      "SRT-HP372CF",
      "SRT-HP373CF",
      "SRT-HP374CF",
      "SRT-HP37C1",
      "SRT-HP37C2",
      "SRT-HP37C3",
      "SRT-HP37C4",
      "SRT-HP37C5",
      "SRT-HP37C6",
      "SRT-HP37C7",
      "SRT-HP37C8",
      "SRT-HP521"
    ],
    "successors": [
      "SRT-C377"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP55WUX5",
      "SRT-HP55WUX6",
      "SRT-HP55WUX7",
      "SRT-HP55WUX8",
      "SRT-S552U",
      "SRT-S553U",
      "SRT-S554U",
      "SRT-S555U",
      "SRT-S556U",
      "SRT-S55U"
    ],
    "successors": [
      "SRT-S557U"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HP55WX4",
      "SRT-HP55WX5",
      "SRT-HP55WX6",
      "SRT-HP55WX7",
      "SRT-HP55WX8",
      "SRT-S55",
      "SRT-S552",
      "SRT-S553",
      "SRT-S554",
      "SRT-S555",
      "SRT-S556"
    ],
    "successors": [
      "SRT-S557"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HPK37ND2",
      "SRT-HPK37ND3",
      "SRT-HPK37ND4",
      "SRT-HPK37ND5",
      "SRT-HPK37ND6",
      "SRT-HPK37ND7",
      "SRT-HPK37ND8",
      "SRT-NK372D",
      "SRT-NK373D",
      "SRT-NK374D",
      "SRT-NK375D",
      "SRT-NK376D",
      "SRT-NK376D-2",
      "SRT-NK37D"
    ],
    "successors": [
      "SRT-NK377D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HPK37WDX3",
      "SRT-HPK37WDX4",
      "SRT-HPK37WDX5",
      "SRT-HPK37WDX6",
      "SRT-HPK37WDX7",
      "SRT-HPK37WDX8",
      "SRT-SK372D",
      "SRT-SK373D",
      "SRT-SK374D",
      "SRT-SK375D",
      "SRT-SK376D",
      "SRT-SK37D"
    ],
    "successors": [
      "SRT-SK377D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HPK37WUDX5",
      "SRT-HPK37WUDX6",
      "SRT-HPK37WUDX7",
      "SRT-HPK37WUDX8",
      "SRT-SK372UD",
      "SRT-SK373UD",
      "SRT-SK375UD",
      "SRT-SK376UD",
      "SRT-SK37UD"
    ],
    "successors": [
      "SRT-SK377UD"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HPK46ND2",
      "SRT-HPK46ND3",
      "SRT-HPK46ND4",
      "SRT-HPK46ND5",
      "SRT-HPK46ND6",
      "SRT-HPK46ND7",
      "SRT-HPK46ND8",
      "SRT-NK462D",
      "SRT-NK463D",
      "SRT-NK464D",
      "SRT-NK465D",
      "SRT-NK466D",
      "SRT-NK466D-2",
      "SRT-NK46D"
    ],
    "successors": [
      "SRT-NK467D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HPK46WD2",
      "SRT-HPK46WD3",
      "SRT-HPK46WD4",
      "SRT-HPK46WD5",
      "SRT-HPK46WD6",
      "SRT-HPK46WD7",
      "SRT-HPK46WD8",
      "SRT-WK462D",
      "SRT-WK463D",
      "SRT-WK464D",
      "SRT-WK465D",
      "SRT-WK466D",
      "SRT-WK46D"
    ],
    "successors": [
      "SRT-VK467D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HPK46WDX3",
      "SRT-HPK46WDX4",
      "SRT-HPK46WDX5",
      "SRT-HPK46WDX6",
      "SRT-HPK46WDX7",
      "SRT-HPK46WDX8",
      "SRT-SK462D",
      "SRT-SK463D",
      "SRT-SK464D",
      "SRT-SK465D",
      "SRT-SK466D",
      "SRT-SK46D"
    ],
    "successors": [
      "SRT-SK467D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-HPK46WUDX5",
      "SRT-HPK46WUDX6",
      "SRT-HPK46WUDX7",
      "SRT-HPK46WUDX8",
      "SRT-SK462UD",
      "SRT-SK463UD",
      "SRT-SK465UD",
      "SRT-SK466UD",
      "SRT-SK46UD"
    ],
    "successors": [
      "SRT-SK467UD"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-N182D",
      "SRT-N184D"
    ],
    "successors": [
      "SRT-N186D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-NK182D",
      "SRT-NK184D"
    ],
    "successors": [
      "SRT-NK186D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-P372B",
      "SRT-P372UB",
      "SRT-P373B",
      "SRT-P373UB",
      "SRT-P374B",
      "SRT-P374UB",
      "SRT-P375B",
      "SRT-P375UB",
      "SRT-P376B",
      "SRT-P376UB",
      "SRT-P37UB"
    ],
    "successors": [
      "SRT-P377UB"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-p37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-P462B",
      "SRT-P462UB",
      "SRT-P463B",
      "SRT-P463UB",
      "SRT-P464B",
      "SRT-P464UB",
      "SRT-P465B",
      "SRT-P465UB",
      "SRT-P466B",
      "SRT-P466UB",
      "SRT-P46UB"
    ],
    "successors": [
      "SRT-P467UB"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-p46"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-S184D"
    ],
    "successors": [
      "SRT-S186D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-S37",
      "SRT-S372",
      "SRT-S373",
      "SRT-S374",
      "SRT-S374A",
      "SRT-S375",
      "SRT-S375A",
      "SRT-S376",
      "SRT-S376A"
    ],
    "successors": [
      "SRT-S377"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-s37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-S37-BS",
      "SRT-S372-BS",
      "SRT-S372U-BS",
      "SRT-S373-BS",
      "SRT-S373U-BS",
      "SRT-S374A-BS",
      "SRT-S374UA-BS",
      "SRT-S375A-BS",
      "SRT-S375UA-BS",
      "SRT-S376A-BS",
      "SRT-S376UA-BS",
      "SRT-S37U-BS"
    ],
    "successors": [
      "SRT-S377U-BS"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-s37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-S372U",
      "SRT-S373U",
      "SRT-S374U",
      "SRT-S374UA",
      "SRT-S375U",
      "SRT-S375UA",
      "SRT-S376U",
      "SRT-S376UA",
      "SRT-S37U"
    ],
    "successors": [
      "SRT-S377U"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-s37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-S372UZ",
      "SRT-S373UZ",
      "SRT-S374UZ",
      "SRT-S375UZ",
      "SRT-S376UZ",
      "SRT-S37UZ"
    ],
    "successors": [
      "SRT-S377UZ"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-s37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-S372UZ-BS",
      "SRT-S373UZ-BS",
      "SRT-S374UZ-BS",
      "SRT-S375UZ-BS",
      "SRT-S376UZ-BS",
      "SRT-S37UZ-BS"
    ],
    "successors": [
      "SRT-S377UZ-BS"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-s37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-S46",
      "SRT-S462",
      "SRT-S463",
      "SRT-S464",
      "SRT-S464A",
      "SRT-S465",
      "SRT-S465A",
      "SRT-S466",
      "SRT-S466A"
    ],
    "successors": [
      "SRT-S467"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-s46"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-S46-BS",
      "SRT-S462-BS",
      "SRT-S462U-BS",
      "SRT-S463-BS",
      "SRT-S463U-BS",
      "SRT-S464A-BS",
      "SRT-S464UA-BS",
      "SRT-S465A-BS",
      "SRT-S465UA-BS",
      "SRT-S466A-BS",
      "SRT-S466UA-BS",
      "SRT-S46U-BS"
    ],
    "successors": [
      "SRT-S467U-BS"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-s46"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-S462U",
      "SRT-S463U",
      "SRT-S464U",
      "SRT-S464UA",
      "SRT-S465U",
      "SRT-S465UA",
      "SRT-S466U",
      "SRT-S466UA",
      "SRT-S46U"
    ],
    "successors": [
      "SRT-S467U"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-s46"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-SK184D"
    ],
    "successors": [
      "SRT-SK186D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-SK552UD",
      "SRT-SK553UD",
      "SRT-SK555UD",
      "SRT-SK556UD",
      "SRT-SK55UD"
    ],
    "successors": [
      "SRT-SK557UD"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-W304DM",
      "SRT-W305DM"
    ],
    "successors": [
      "SRT-B306DM"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-successor-list",
    "where": "1ページ"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-W37",
      "SRT-W372",
      "SRT-W373",
      "SRT-W374",
      "SRT-W375",
      "SRT-W376"
    ],
    "successors": [
      "SRT-V377"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-w37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-W37-BS",
      "SRT-W372-BS",
      "SRT-W373-BS",
      "SRT-W374-BS",
      "SRT-W375-BS",
      "SRT-W376-BS"
    ],
    "successors": [
      "SRT-V377-BS"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-w37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-W372D",
      "SRT-W373D",
      "SRT-W374D",
      "SRT-W375D",
      "SRT-W376D",
      "SRT-W37D"
    ],
    "successors": [
      "SRT-V377D"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-w37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-W372D-BS",
      "SRT-W373D-BS",
      "SRT-W374D-BS",
      "SRT-W375D-BS",
      "SRT-W376D-BS",
      "SRT-W37D-BS"
    ],
    "successors": [
      "SRT-V377D-BS"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-w37"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-W46",
      "SRT-W462",
      "SRT-W463",
      "SRT-W464",
      "SRT-W465",
      "SRT-W466"
    ],
    "successors": [
      "SRT-V467"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-w46"
  },
  {
    "brand": "mitsubishi",
    "oldModels": [
      "SRT-W46-BS",
      "SRT-W462-BS",
      "SRT-W463-BS",
      "SRT-W464-BS",
      "SRT-W465-BS",
      "SRT-W466-BS"
    ],
    "successors": [
      "SRT-V467-BS"
    ],
    "relation": "successor",
    "sourceId": "mitsubishi-win2k-search-srt-w46"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46D1QMRA(P)S",
      "HE-46D1QMRS",
      "HE-46D2QCMS",
      "HE-46D3QDMS"
    ],
    "successors": [
      "HE-D46FQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46D1QRA(P)S",
      "HE-46D1QRS",
      "HE-46D2QCS",
      "HE-46D3QDS"
    ],
    "successors": [
      "HE-D46FQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-B56EQS"
    ],
    "successors": [
      "HE-B56HQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-C30EQES",
      "HE-C30HQES",
      "HE-C30KQES",
      "HE-C30LQES"
    ],
    "successors": [
      "HE-C30NQES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-C30EQFS",
      "HE-C30HQFS",
      "HE-C30KQFS",
      "HE-C30LQFS"
    ],
    "successors": [
      "HE-C30NQFS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-C30EQMS",
      "HE-C30HQMS",
      "HE-C30KQMS",
      "HE-C30LQMS"
    ],
    "successors": [
      "HE-C30NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-C30EQS",
      "HE-C30HQS",
      "HE-C30KQS",
      "HE-C30LQS"
    ],
    "successors": [
      "HE-C30NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-F37AQE(P)S",
      "HE-F37BQES",
      "HE-F37DQES",
      "HE-F37EQES",
      "HE-F37GQES",
      "HE-F37HQES",
      "HE-F37JQES",
      "HE-F37LQES"
    ],
    "successors": [
      "HE-F37NQES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-F37LQFS"
    ],
    "successors": [
      "HE-F37NQFS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-37K2QKMKS",
      "HE-37R2QKMKS",
      "HE-F37AQM(P)S",
      "HE-F37BQMS",
      "HE-F37DQMS",
      "HE-F37EQMS",
      "HE-F37GQMS",
      "HE-F37HQMS",
      "HE-F37JQMS",
      "HE-F37KQMS",
      "HE-F37LQMS"
    ],
    "successors": [
      "HE-F37NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-37K2QKKS",
      "HE-37R2QKKS",
      "HE-F37AQ(P)S",
      "HE-F37BQS",
      "HE-F37DQS",
      "HE-F37EQS",
      "HE-F37GQS",
      "HE-F37HQS",
      "HE-F37JQS",
      "HE-F37KQS",
      "HE-F37LQS"
    ],
    "successors": [
      "HE-F37NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-F37AZM(P)S",
      "HE-F37BZMS",
      "HE-F37DZMS",
      "HE-F37EZMS",
      "HE-F37GZMS",
      "HE-F37JZMS",
      "HE-F37KZMS",
      "HE-F37LZMS"
    ],
    "successors": [
      "HE-F37NZMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-F46AQE(P)S",
      "HE-F46BQES",
      "HE-F46DQES",
      "HE-F46EQES",
      "HE-F46GQES",
      "HE-F46HQES",
      "HE-F46JQES",
      "HE-F46KQES",
      "HE-F46LQES"
    ],
    "successors": [
      "HE-F46NQES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-F46LQFS"
    ],
    "successors": [
      "HE-F46NQFS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46K2QTMTS",
      "HE-F46AQM(P)S",
      "HE-F46BQMS",
      "HE-F46DQMS",
      "HE-F46EQMS",
      "HE-F46GQMS",
      "HE-F46HQMS",
      "HE-F46JQMS",
      "HE-F46KQMS",
      "HE-F46LQMS"
    ],
    "successors": [
      "HE-F46NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46K2QTTS",
      "HE-F46AQ(P)S",
      "HE-F46BQS",
      "HE-F46DQS",
      "HE-F46EQS",
      "HE-F46GQS",
      "HE-F46HQS",
      "HE-F46JQS",
      "HE-F46KQS",
      "HE-F46LQS"
    ],
    "successors": [
      "HE-F46NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-F46AZM(P)S",
      "HE-F46BZMS",
      "HE-F46DZMS",
      "HE-F46EZMS",
      "HE-F46GZMS",
      "HE-F46JZMS",
      "HE-F46KZMS",
      "HE-F46LZMS"
    ],
    "successors": [
      "HE-F46NZMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-FPU37HQMS",
      "HE-FPU37JQMS",
      "HE-FPU37KQMS",
      "HE-FPU37LQMS"
    ],
    "successors": [
      "HE-FPU37NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-FPU37HQS",
      "HE-FPU37JQS",
      "HE-FPU37KQS",
      "HE-FPU37LQS"
    ],
    "successors": [
      "HE-FPU37NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-FPU46HQMS",
      "HE-FPU46JQMS",
      "HE-FPU46KQMS",
      "HE-FPU46LQMS"
    ],
    "successors": [
      "HE-FPU46NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-FPU46HQS",
      "HE-FPU46JQS",
      "HE-FPU46KQS",
      "HE-FPU46LQS"
    ],
    "successors": [
      "HE-FPU46NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-FU37EQMS",
      "HE-FU37GQMS",
      "HE-FU37HQMS",
      "HE-FU37JQMS",
      "HE-FU37KQMS",
      "HE-FU37LQMS"
    ],
    "successors": [
      "HE-FU37NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-FU37EQS",
      "HE-FU37GQS",
      "HE-FU37HQS",
      "HE-FU37JQS",
      "HE-FU37KQS",
      "HE-FU37LQS"
    ],
    "successors": [
      "HE-FU37NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-FU46EQMS",
      "HE-FU46GQMS",
      "HE-FU46HQMS",
      "HE-FU46JQMS",
      "HE-FU46KQMS",
      "HE-FU46LQMS"
    ],
    "successors": [
      "HE-FU46NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-FU46EQS",
      "HE-FU46GQS",
      "HE-FU46HQS",
      "HE-FU46JQS",
      "HE-FU46KQS",
      "HE-FU46LQS"
    ],
    "successors": [
      "HE-FU46NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-H37EQS",
      "HE-H37GQS",
      "HE-H37HQS",
      "HE-H37KQS"
    ],
    "successors": [
      "HE-H37LQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-H46EQS",
      "HE-H46GQS",
      "HE-H46HQS",
      "HE-H46KQS"
    ],
    "successors": [
      "HE-H46LQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-37K1SLMS",
      "HE-37K2SMSS",
      "HE-37K3SMWS",
      "HE-37R2SMFS",
      "HE-J37JSMS",
      "HE-J37KSMS",
      "HE-J37LSMS",
      "HE-K37ASM(P)S",
      "HE-K37BSMS",
      "HE-K37CSMS",
      "HE-K37DSMS",
      "HE-K37ESMS",
      "HE-K37FSMS",
      "HE-K37GSMCS",
      "HE-K37GSMS"
    ],
    "successors": [
      "HE-J37NSMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-37K1SLS",
      "HE-37K2SSS",
      "HE-37K3SWS",
      "HE-37R1SS",
      "HE-37R2SFS",
      "HE-J37HSS",
      "HE-J37JSS",
      "HE-J37KSS",
      "HE-J37LSS",
      "HE-K37AS(P)S",
      "HE-K37BSS",
      "HE-K37CSS",
      "HE-K37DSS",
      "HE-K37ESS",
      "HE-K37FSS",
      "HE-K37GSCS",
      "HE-K37GSS"
    ],
    "successors": [
      "HE-J37NSS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-37K2ZESES",
      "HE-37K3ZEWE(P)S",
      "HE-J37HZES",
      "HE-J37JZES",
      "HE-J37KZES",
      "HE-J37LZES",
      "HE-K37BZES",
      "HE-K37DZES",
      "HE-K37EZES",
      "HE-K37GZES"
    ],
    "successors": [
      "HE-J37NZES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-37K2ZMSS",
      "HE-37K3ZMWS",
      "HE-J37JZMS",
      "HE-J37KZMS",
      "HE-J37LZMS",
      "HE-K37AZM(P)S",
      "HE-K37BZMS",
      "HE-K37CZMS",
      "HE-K37DZMS",
      "HE-K37EZMS",
      "HE-K37FZMS",
      "HE-K37GZMCS",
      "HE-K37GZMS"
    ],
    "successors": [
      "HE-J37NZMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-37K2ZSS",
      "HE-37K3ZWS",
      "HE-J37HZS",
      "HE-J37JZS",
      "HE-J37KZS",
      "HE-J37LZS",
      "HE-K37AZ(P)S",
      "HE-K37BZS",
      "HE-K37CZS",
      "HE-K37DZS",
      "HE-K37EZS",
      "HE-K37FZS",
      "HE-K37GZCS",
      "HE-K37GZS"
    ],
    "successors": [
      "HE-J37NZS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46K1SMJS",
      "HE-46K2SMRS",
      "HE-46K3SMUS",
      "HE-J46JSMS",
      "HE-J46KSMS",
      "HE-J46LSMS",
      "HE-K46ASM(P)S",
      "HE-K46BSMS",
      "HE-K46CSMS",
      "HE-K46DSMS",
      "HE-K46ESMS",
      "HE-K46FSMS",
      "HE-K46GSMCS",
      "HE-K46GSMS"
    ],
    "successors": [
      "HE-J46NSMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46K1SJS",
      "HE-46K2SRS",
      "HE-46K3SUS",
      "HE-J46HSS",
      "HE-J46JSS",
      "HE-J46KSS",
      "HE-J46LSS",
      "HE-K46AS(P)S",
      "HE-K46BSS",
      "HE-K46CSS",
      "HE-K46DSS",
      "HE-K46ESS",
      "HE-K46FSS",
      "HE-K46GSCS",
      "HE-K46GSS"
    ],
    "successors": [
      "HE-J46NSS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46K3ZEUE(P)S",
      "HE-J46HZES",
      "HE-J46JZES",
      "HE-J46KZES",
      "HE-J46LZES",
      "HE-K46BZES",
      "HE-K46DZES",
      "HE-K46EZES",
      "HE-K46GZES"
    ],
    "successors": [
      "HE-J46NZES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46K2ZMRS",
      "HE-46K3ZMUS",
      "HE-J46JZMS",
      "HE-J46KZMS",
      "HE-J46LZMS",
      "HE-K46AZM(P)S",
      "HE-K46BZMS",
      "HE-K46CZMS",
      "HE-K46DZMS",
      "HE-K46EZMS",
      "HE-K46FZMS",
      "HE-K46GZMCS",
      "HE-K46GZMS"
    ],
    "successors": [
      "HE-J46NZMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46K2ZRS",
      "HE-46K3ZUS",
      "HE-J46HZS",
      "HE-J46JZS",
      "HE-J46KZS",
      "HE-J46LZS",
      "HE-K46AZ(P)S",
      "HE-K46BZS",
      "HE-K46CZS",
      "HE-K46DZS",
      "HE-K46EZS",
      "HE-K46FZS",
      "HE-K46GZCS",
      "HE-K46GZS"
    ],
    "successors": [
      "HE-J46NZS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-LS37LQMS"
    ],
    "successors": [
      "HE-LS37NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-LS37LQS"
    ],
    "successors": [
      "HE-LS37NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-LS46LQMS"
    ],
    "successors": [
      "HE-LS46NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-LS46LQS"
    ],
    "successors": [
      "HE-LS46NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-N37KQES",
      "HE-N37LQES"
    ],
    "successors": [
      "HE-N37NQES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-N37KQFS",
      "HE-N37LQFS"
    ],
    "successors": [
      "HE-N37NQFS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-N37KQMS",
      "HE-N37LQMS"
    ],
    "successors": [
      "HE-N37NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-N37JQS",
      "HE-N37KQS",
      "HE-N37LQS"
    ],
    "successors": [
      "HE-N37NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-N46KQES",
      "HE-N46LQES"
    ],
    "successors": [
      "HE-N46NQES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-N46JQS",
      "HE-N46KQS",
      "HE-N46LQS"
    ],
    "successors": [
      "HE-N46NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-NU37JQS",
      "HE-NU37KQS",
      "HE-NU37LQS"
    ],
    "successors": [
      "HE-NU37NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-NU46JQS",
      "HE-NU46KQS",
      "HE-NU46LQS"
    ],
    "successors": [
      "HE-NU46NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-S37LQES"
    ],
    "successors": [
      "HE-S37NQES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-S37LQFS"
    ],
    "successors": [
      "HE-S37NQFS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-S37LQMS"
    ],
    "successors": [
      "HE-S37NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-S37LQS"
    ],
    "successors": [
      "HE-S37NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-S46LQES"
    ],
    "successors": [
      "HE-S46NQES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-S46LQFS"
    ],
    "successors": [
      "HE-S46NQFS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-S46LQMS"
    ],
    "successors": [
      "HE-S46NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-S46LQS"
    ],
    "successors": [
      "HE-S46NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-SU37LQES"
    ],
    "successors": [
      "HE-SU37NQES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-SU37LQMS"
    ],
    "successors": [
      "HE-SU37NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-SU37LQS"
    ],
    "successors": [
      "HE-SU37NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-SU46LQES"
    ],
    "successors": [
      "HE-SU46NQES"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-SU46LQMS"
    ],
    "successors": [
      "HE-SU46NQMS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-SU46LQS"
    ],
    "successors": [
      "HE-SU46NQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-V20FQMS",
      "HE-V20HQMS"
    ],
    "successors": [
      "HE-V20HQMCS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-V20FQS",
      "HE-V20HQS"
    ],
    "successors": [
      "HE-V20HQCS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-37W1QLS",
      "HE-37W3QWA(P)S",
      "HE-37W3QWS",
      "HE-W37BQS",
      "HE-W37CQS",
      "HE-W37EQS",
      "HE-W37GQS",
      "HE-W37HQS",
      "HE-W37KQS"
    ],
    "successors": [
      "HE-W37LQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-46W3QUA(P)S",
      "HE-46W3QUS",
      "HE-W46BQS",
      "HE-W46CQS",
      "HE-W46EQS",
      "HE-W46GQS",
      "HE-W46HQS",
      "HE-W46KQS"
    ],
    "successors": [
      "HE-W46LQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-WU37BQS",
      "HE-WU37CQS",
      "HE-WU37EQS",
      "HE-WU37GQS",
      "HE-WU37HQS",
      "HE-WU37KQS"
    ],
    "successors": [
      "HE-WU37LQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-WU46BQS",
      "HE-WU46CQS",
      "HE-WU46EQS",
      "HE-WU46GQS",
      "HE-WU46HQS",
      "HE-WU46KQS"
    ],
    "successors": [
      "HE-WU46LQS"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-Y37KQV"
    ],
    "successors": [
      "HE-Y37LQV"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "panasonic",
    "oldModels": [
      "HE-Y46KQV"
    ],
    "successors": [
      "HE-Y46LQV"
    ],
    "relation": "successor",
    "sourceId": "panasonic-dotokisyu",
    "where": "1ページ"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37H3FTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37h3ftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37J2FTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37j2ftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37KFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37kftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37LAFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37laftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37LFCV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37lfcv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37LFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37lftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37LFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37lfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37MBFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37mbfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37MFCV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37mfcv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37MFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37mftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37MFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37mfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37NFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37nftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37NFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37nfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37PFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37pftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37PFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37pfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37RFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37rftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37RFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37rfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37SFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37sfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37TFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37tftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37TFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37tfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37UFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37uftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37UFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37ufv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37VFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37vftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37VFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37vfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37WFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37wftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37WFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37wfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37XFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37xftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ37XFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq37xfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46KFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46kfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46LFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46lfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46MBFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46mbfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46MFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46mfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46NFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46nfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46PFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46pfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46RFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46rfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46SFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46sfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46TFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46tfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46UFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46ufv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46VFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46vfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46WFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46wfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQ46XFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eq46xfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQA37YFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqa37yftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQA37YFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqa37yfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQA37ZFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqa37zftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQA37ZFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqa37zfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQA46YFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqa46yfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQA46ZFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqa46zfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQK37MFCV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqk37mfcv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQK46KFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqk46kfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37LFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37lfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37MBFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37mbfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37MFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37mfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37NFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37nfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37PFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37pfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37RFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37rfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37TFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37tfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37UFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37ufv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37VFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37vfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37WFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37wfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37XFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37xfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37YFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37yfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN37ZFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn37zfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46LFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46lfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46MBFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46mbfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46MFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46mfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46NFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46nfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46PFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46pfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46RFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46rfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46TFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46tfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46UFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46ufv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46VFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46vfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46WFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46wfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46XFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46xfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46YFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46yfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQN46ZFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqn46zfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQS37SFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqs37sftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQS37SFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqs37sfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQS46SFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqs46sfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQSN37SFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqsn37sfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQSN46SFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqsn46sfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37LAFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37lafv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37LFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37lfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37UFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37uftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37VFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37vftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37WFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37wftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37WFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37wfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37XFTV"
    ],
    "successors": [
      "EA377AFTV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37xftv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37XFV"
    ],
    "successors": [
      "EA377AFV",
      "EN377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37xfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37YFV"
    ],
    "successors": [
      "EX377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37yfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX37ZFV"
    ],
    "successors": [
      "EX377AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx37zfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX46LAFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx46lafv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX46LFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx46lfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX46WFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx46wfv"
  },
  {
    "brand": "daikin",
    "oldModels": [
      "EQX46XFV"
    ],
    "successors": [
      "EA467AFV",
      "EN467AFV"
    ],
    "relation": "successor",
    "sourceId": "daikin-dtnet-eqx46xfv"
  }
];
