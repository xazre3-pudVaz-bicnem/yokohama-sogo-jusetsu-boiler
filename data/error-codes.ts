import type { BrandId } from "@/data/products/types";

/**
 * 給湯器・エコキュートのエラーコード（メーカーの公式の情報だけ）。scripts で調査の記録から作り直す。
 *
 * 守ること
 * - 書いてよいのは、メーカー自身が公式サイト・取扱説明書で示している番号の意味と、メーカーが使う人に案内している対処だけ。
 *   分解・部品の交換・自分での修理を勧めない。メーカーの案内に無い対処を足さない。
 * - 番号は、メーカーの表記のまま書く。同じ番号でも機種によって意味が違うときは、行を分けて appliesTo に機種を書く。
 * - 出典は errorCodeSources。接続認証のあるサイト・会員向けのサイト・自動の取得を断っているサイトの情報は使わない。
 *
 * 画面：/trouble/error-codes/<メーカー>（メーカーごとの一覧）。入口は /trouble/error-codes。
 */
export type ErrorCodeSource = {
  id: string;
  /** 資料の名前 */
  label: string;
  /** メーカーの公式ページ・資料の URL */
  url: string;
  /** 確かめた日 */
  verifiedAt: string;
};

export type ErrorCodeRow = {
  brand: BrandId;
  /** リモコンに出る番号（メーカーの表記のまま） */
  code: string;
  /** メーカーが付けている短い名前（例：点火不良） */
  title?: string;
  /** 番号の意味（メーカーの説明の要約） */
  meaning: string;
  /** メーカーが、使う人に案内している対処 */
  userAction?: string;
  /** メーカーが、修理・点検を頼むよう案内している場合 */
  callRepair?: string;
  /** メーカーの、安全についての注意 */
  safety?: string;
  /** メーカーが機種・種類を限っているとき */
  appliesTo?: string;
  /** 出典（errorCodeSources の id） */
  sourceId: string;
  /** その番号のページ（出典の中の個別のページがあるとき） */
  url?: string;
};

export const errorCodeSources: ErrorCodeSource[] = [
  {
    "id": "rinnai-rinnai-faq-4863",
    "label": "給湯器｜エラーコード「02」又は「021」 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4863?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4864",
    "label": "給湯器｜エラーコード03 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4864?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2252",
    "label": "給湯器｜エラーコード11 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2252?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2210",
    "label": "給湯器｜エラーコード「12」「121」「122」「123」 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2210?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2393",
    "label": "給湯器｜エラーコード13 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2393?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4974",
    "label": "給湯器｜エラーコード16 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4974?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2276",
    "label": "給湯器｜エラーコード「19」「190」「191」 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2276?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2388",
    "label": "給湯器｜エラーコード「25」「252」 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2388?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-3960",
    "label": "給湯器｜エラーコード29 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/3960?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4975",
    "label": "給湯器｜エラーコード31 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4975?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4977",
    "label": "給湯器｜エラーコード33 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4977?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2307",
    "label": "給湯器｜エラーコード38 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2307?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2061",
    "label": "給湯器｜エラーコード61 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2061?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4983",
    "label": "給湯器｜エラーコード62 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4983?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4914",
    "label": "給湯器｜エラーコード「63」「633」 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4914?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2002",
    "label": "給湯器｜エラーコード64 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2002?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2001",
    "label": "給湯器｜エラーコード65 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2001?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1999",
    "label": "給湯器｜エラーコード「71」又は「710」 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1999?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1855",
    "label": "給湯器｜エラーコード72 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1855?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1994",
    "label": "給湯器｜エラーコード75 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1994?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1809",
    "label": "給湯器｜エラーコード88 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1809?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1997",
    "label": "給湯器｜エラーコード90 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1997?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1996",
    "label": "給湯器｜エラーコード92 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1996?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1995",
    "label": "給湯器｜エラーコード93 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1995?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1993",
    "label": "給湯器｜エラーコード99 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1993?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-5043",
    "label": "給湯器｜エラーコード013 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/5043?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1195",
    "label": "給湯器｜エラーコード032 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1195?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-5045",
    "label": "給湯器｜エラーコード043 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/5045?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2463",
    "label": "給湯器｜エラーコード101 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2463?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4985",
    "label": "給湯器｜エラーコード102 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4985?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2895",
    "label": "給湯器｜エラーコード103 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2895?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2892",
    "label": "給湯器｜エラーコード110 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2892?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2209",
    "label": "給湯器｜エラーコード111 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2209?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2250",
    "label": "給湯器｜エラーコード112 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2250?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2251",
    "label": "給湯器｜エラーコード113 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2251?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2799",
    "label": "給湯器｜エラーコード120 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2799?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2414",
    "label": "給湯器｜エラーコード130 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2414?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2277",
    "label": "給湯器｜エラーコード140 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2277?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4939",
    "label": "給湯器｜エラーコード161 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4939?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-5006",
    "label": "給湯器｜エラーコード162 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/5006?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-5007",
    "label": "給湯器｜エラーコード163 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/5007?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-5008",
    "label": "給湯器｜エラーコード170 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/5008?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2285",
    "label": "給湯器｜エラーコード173 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2285?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4988",
    "label": "給湯器｜エラーコード260 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4988?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1990",
    "label": "給湯器｜エラーコード290 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1990?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1991",
    "label": "給湯器｜エラーコード291 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1991?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4901",
    "label": "給湯器｜エラーコード310 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4901?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4902",
    "label": "給湯器｜エラーコード312 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4902?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4904",
    "label": "給湯器｜エラーコード313 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4904?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4905",
    "label": "給湯器｜エラーコード321 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4905?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4907",
    "label": "給湯器｜エラーコード323 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4907?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4908",
    "label": "給湯器｜エラーコード331 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4908?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2306",
    "label": "給湯器｜エラーコード380 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2306?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4910",
    "label": "給湯器｜エラーコード430 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4910?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4967",
    "label": "給湯器｜エラーコード432 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4967?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4912",
    "label": "給湯器｜エラーコード433 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4912?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1184",
    "label": "給湯器｜エラーコード502 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1184?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2288",
    "label": "給湯器｜エラーコード543 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2288?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2668",
    "label": "給湯器｜エラーコード562 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2668?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1986",
    "label": "給湯器｜エラーコード610 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1986?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1985",
    "label": "給湯器｜エラーコード611 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1985?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1192",
    "label": "給湯器｜エラーコード632 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1192?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4906",
    "label": "給湯器｜エラーコード640 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4906?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2671",
    "label": "給湯器｜エラーコード642 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2671?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2358",
    "label": "給湯器｜エラーコード643 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2358?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2795",
    "label": "給湯器｜エラーコード651 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2795?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1992",
    "label": "給湯器｜エラーコード661 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1992?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-5055",
    "label": "給湯器｜エラーコード662 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/5055?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-5058",
    "label": "給湯器｜エラーコード700 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/5058?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-5061",
    "label": "給湯器｜エラーコード711 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/5061?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1846",
    "label": "給湯器｜エラーコード721 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1846?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1847",
    "label": "給湯器｜エラーコード722 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1847?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1854",
    "label": "給湯器｜エラーコード723 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1854?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2385",
    "label": "給湯器｜エラーコード760 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2385?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2474",
    "label": "給湯器｜エラーコード763 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2474?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1806",
    "label": "給湯器｜エラーコード888 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1806?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4926",
    "label": "給湯器｜エラーコード900 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4926?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2697",
    "label": "給湯器｜エラーコード901 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2697?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4924",
    "label": "給湯器｜エラーコード902 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4924?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2695",
    "label": "給湯器｜エラーコード903 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2695?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2279",
    "label": "給湯器｜エラーコード920 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2279?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-1947",
    "label": "給湯器｜エラーコード921 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/1947?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2281",
    "label": "給湯器｜エラーコード930 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2281?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2282",
    "label": "給湯器｜エラーコード931 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2282?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-4923",
    "label": "給湯器｜エラーコード990 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/4923?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "rinnai-rinnai-faq-2842",
    "label": "給湯器｜エラーコード991 が表示 | リンナイ｜Q&A(よくあるお問い合わせ）",
    "url": "https://faq.rinnai.co.jp/faq/show/2842?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-11",
    "label": "給湯機器：エラー表示【11】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9011%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe620",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-12",
    "label": "給湯機器：エラー表示【12】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9012%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574070aa2c0001b03c5ea",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-14",
    "label": "給湯機器：エラー表示【14】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9014%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe62c",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-16",
    "label": "給湯・暖房機器／浴室：エラー表示【16】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E3%83%BB%E6%9A%96%E6%88%BF%E6%A9%9F%E5%99%A8%EF%BC%8F%E6%B5%B4%E5%AE%A4%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9016%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6853a829f001b3fe681",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-25",
    "label": "給湯機器：エラー表示【25】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9025%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57402c79422001c959021",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-29",
    "label": "給湯機器：エラー表示【29】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9029%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe5ff",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-31",
    "label": "給湯機器：エラー表示【31】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9031%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574029bca4a001b904745",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-33",
    "label": "給湯機器：エラー表示【33】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9033%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574059bca4a001b90484c",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-39",
    "label": "給湯機器：エラー表示【39】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9039%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57403c79422001c9590a5",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-61",
    "label": "給湯機器：エラー表示【61】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9061%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574070aa2c0001b03c5a8",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-63",
    "label": "給湯機器/システムバス：エラー表示【63】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%2F%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%83%90%E3%82%B9%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9063%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64ed9643522c21001c924927",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-71",
    "label": "給湯機器：エラー表示【71】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9071%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574070aa2c0001b03c5c9",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-72",
    "label": "給湯機器／暖房機器：エラー表示【72】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%8F%E6%9A%96%E6%88%BF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9072%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57403c79422001c9590da",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-73",
    "label": "給湯機器／ガスファンヒーター：エラー表示【73】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%8F%E3%82%AC%E3%82%B9%E3%83%95%E3%82%A1%E3%83%B3%E3%83%92%E3%83%BC%E3%82%BF%E3%83%BC%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9073%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f5740bf8130e001b8d72d3",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-76",
    "label": "給湯機器：エラー表示【76】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9076%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe590",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-88-888",
    "label": "給湯機器：エラー表示【88】【888】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/--64e5a6833a829f001b3fe586",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-90",
    "label": "給湯機器：エラー表示【90】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9090%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57402e2b61a001ca070c6",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-92",
    "label": "給湯機器：エラー表示【92】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9092%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe662",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-93",
    "label": "給湯機器：エラー表示【93】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9093%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe5cd",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-99",
    "label": "給湯機器：エラー表示【99】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9099%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6853a829f001b3fe674",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-011",
    "label": "給湯機器：エラー表示【011】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90011%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6853a829f001b3fe684",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-012",
    "label": "給湯機器：エラー表示【012】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90012%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6853a829f001b3fe687",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-013",
    "label": "給湯機器：エラー表示【013】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90013%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6853a829f001b3fe68a",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-032",
    "label": "給湯機器：エラー表示【032】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90032%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6853a829f001b3fe699",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-043",
    "label": "給湯機器：エラー表示【043】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90043%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe66e",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-101",
    "label": "給湯機器：エラー表示【101】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90101%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57401e2b61a001ca06ff3",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-102",
    "label": "給湯機器：エラー表示【102】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90102%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57403c79422001c959096",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-103",
    "label": "給湯機器：エラー表示【103】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90103%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57403c79422001c959090",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-110",
    "label": "給湯機器：エラー表示【110】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90110%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe577",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-111",
    "label": "給湯機器：エラー表示【111】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90111%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe623",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-112",
    "label": "給湯機器：エラー表示【112】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90112%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574070aa2c0001b03c584",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-113",
    "label": "給湯機器：エラー表示【113】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90113%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe59c",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-120",
    "label": "給湯機器：エラー表示【120】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90120%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6853a829f001b3fe67b",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-121",
    "label": "給湯機器：エラー表示【121】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90121%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574070aa2c0001b03c581",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-122",
    "label": "給湯機器：エラー表示【122】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90122%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574060aa2c0001b03c515",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-123",
    "label": "給湯機器：エラー表示【123】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90123%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574060aa2c0001b03c500",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-130",
    "label": "給湯機器：エラー表示【130】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90130%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574060aa2c0001b03c4e5",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-140",
    "label": "給湯機器：エラー表示【140】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90140%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe631",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-151",
    "label": "ガス給湯器：エラー表示【151】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E3%82%AC%E3%82%B9%E7%B5%A6%E6%B9%AF%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90151%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574029bca4a001b904706",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-161",
    "label": "エラー表示【161】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90161%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574049bca4a001b9047e5",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-162",
    "label": "給湯機器：エラー表示【162】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90162%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574049bca4a001b9047d6",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-173",
    "label": "給湯機器：エラー表示【173】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90173%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6853a829f001b3fe696",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-252",
    "label": "給湯機器：エラー表示【252】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90252%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe628",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-290",
    "label": "給湯機器：エラー表示【290】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90290%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe636",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-291",
    "label": "給湯機器：エラー表示【291】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90291%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe605",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-312",
    "label": "給湯機器：エラー表示【312】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90312%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574070aa2c0001b03c57e",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-321",
    "label": "給湯機器：エラー表示【321】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90321%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57402e2b61a001ca0708a",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-331",
    "label": "給湯機器：エラー表示【331】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90331%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574049bca4a001b904807",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-370",
    "label": "給湯機器：エラー表示【370】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90370%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe639",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-380",
    "label": "エラー表示【380】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90380%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57402c79422001c958feb",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-412",
    "label": "給湯機器：エラー表示【412】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90412%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe668",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-430",
    "label": "給湯機器：エラー表示【430】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90430%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57402e2b61a001ca07090",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-432",
    "label": "給湯機器：エラー表示【432】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90432%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57402e2b61a001ca070a2",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-502-512",
    "label": "給湯機器：エラー表示【502】【512】が点滅する - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90502%E3%80%91%E3%80%90512%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85%E3%81%99%E3%82%8B-6a5745537748c3782c68d316",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-543",
    "label": "給湯機器：エラー表示【543】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90543%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57403c79422001c9590c6",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-562",
    "label": "給湯機器：エラー表示【562】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90562%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe5f0",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-610",
    "label": "給湯機器：エラー表示【610】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90610%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe5ca",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-632",
    "label": "給湯機器：エラー表示【632】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90632%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe5ab",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-640",
    "label": "給湯機器：エラー表示【640】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90640%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574070aa2c0001b03c5ce",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-641",
    "label": "給湯機器：エラー表示【641】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90641%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574070aa2c0001b03c5c3",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-642",
    "label": "給湯機器：エラー表示【642】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90642%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe63e",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-643",
    "label": "給湯機器：エラー表示【643】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90643%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe5b1",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-651",
    "label": "給湯機器：エラー表示【651】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90651%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe5ba",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-700",
    "label": "給湯機器：エラー表示【700】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90700%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574070aa2c0001b03c5f0",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-710",
    "label": "給湯機器：エラー表示【710】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90710%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe647",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-711",
    "label": "給湯機器：エラー表示【711】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90711%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57402c79422001c95902d",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-713",
    "label": "給湯機器：エラー表示【713】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90713%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57402c79422001c95902a",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-720",
    "label": "給湯機器：エラー表示【720】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90720%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f5740bf8130e001b8d72df",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-721",
    "label": "給湯機器：エラー表示【721】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90721%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f5740bf8130e001b8d72db",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-722",
    "label": "給湯機器：エラー表示【722】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90722%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe589",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-723",
    "label": "給湯機器：エラー表示【723】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90723%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f5740bf8130e001b8d72d6",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-760",
    "label": "給湯機器：エラー表示【760】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90760%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe64f",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-763",
    "label": "給湯機器：エラー表示【763】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90763%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57408032380001b9a3534",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-900",
    "label": "給湯機器：エラー表示【900】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90900%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe5b4",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-901",
    "label": "給湯機器：エラー表示【901】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90901%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57402e2b61a001ca070bd",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-902",
    "label": "給湯機器：エラー表示【902】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90902%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe654",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-903",
    "label": "給湯機器：エラー表示【903】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90903%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe65b",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-920",
    "label": "給湯機器：エラー表示【920】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90920%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6843a829f001b3fe665",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-921",
    "label": "給湯機器 ：エラー表示【921】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%20%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90921%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574060aa2c0001b03c521",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-930",
    "label": "給湯機器：エラー表示【930】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90930%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f57403044614001b15788e",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "noritz-noritz-faq-990",
    "label": "給湯機器／エコウィル／ハイブリッド：エラー表示【990】が点滅 - よくあるご質問｜株式会社ノーリツ",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%8F%E3%82%A8%E3%82%B3%E3%82%A6%E3%82%A3%E3%83%AB%EF%BC%8F%E3%83%8F%E3%82%A4%E3%83%96%E3%83%AA%E3%83%83%E3%83%89%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%90990%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64f574029bca4a001b9046f2",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-2563",
    "label": "（エラー表示）リモコンに「Ｕ００」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/2563?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-2564",
    "label": "（エラー表示）リモコンに「Ｐ０５（Ｐ５）」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/2564?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-3107",
    "label": "（エラー表示）リモコンに「Ｐ３６」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/3107?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-3111",
    "label": "（エラー表示）リモコンに「Ｐ１６」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/3111?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-3112",
    "label": "（エラー表示）リモコンに「Ｆ０８」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/3112?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-3113",
    "label": "（エラー表示）リモコンに「Ｆ０６」，「Ｆ０９」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/3113?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-3114",
    "label": "（エラー表示）リモコンに「Ｕ０９（Ｕ９）」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/3114?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-3124",
    "label": "（エラー表示）リモコンに「Ｈ１０」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/3124?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-3127",
    "label": "（エラー表示）リモコンに「Ｕ０４（Ｕ４）」，「Ｕ０５（Ｕ５）」，「タンクのお湯がなくなりました」，「 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/3127?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-3130",
    "label": "（エラー表示）リモコンに「Ｐ３５」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/3130?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-3131",
    "label": "（エラー表示）リモコンに「Ｐ３７」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/3131?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-4405",
    "label": "（エラー表示）リモコンが「Ｐ０１」，「Ｐ２０」，「Ｐ２１」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/4405?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-4416",
    "label": "（エラー表示）リモコンに「Ｕ０３」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/4416?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-5351",
    "label": "（エラー表示）リモコンに「Ｐ１３」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/5351?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-5352",
    "label": "（エラー表示）リモコンに「Ｈ０３（Ｈ３）」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/5352?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-5353",
    "label": "（エラー表示）リモコンに「Ｈ０１」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/5353?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-5354",
    "label": "（エラー表示）リモコンに「Ｅ０６」，「Ｅ０７」等の、「Ｅ＋数字」の３桁が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/5354?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6575",
    "label": "（エラー表示）リモコンに「Ｃ０１」，「Ｃ０２」，「Ｃ０４」，「Ｃ０５」，「Ｃ０６」，「Ｃ０７」，「Ｃ | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6575?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6641",
    "label": "（エラー表示）リモコンに「Ｈ１１」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6641?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6656",
    "label": "（エラー表示）リモコンに「Ｕ０７」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6656?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6669",
    "label": "（エラー表示）リモコンに「Ｐ０２」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6669?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6723",
    "label": "（エラー表示）リモコンに「Ｐ０３」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6723?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6724",
    "label": "（エラー表示）リモコンに「Ｕ１０」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6724?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6725",
    "label": "（エラー表示）リモコンに「Ｕ１１」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6725?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6726",
    "label": "（エラー表示）リモコンに「Ｕ１９」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6726?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6727",
    "label": "（エラー表示）リモコンに「Ｐ２４」，「Ｐ２５」，「Ｐ２６」，「Ｐ２７」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6727?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6728",
    "label": "（エラー表示）リモコンに「Ｐ２８」，「Ｐ２９」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6728?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-6731",
    "label": "（エラー表示）リモコンに「Ｐ１７」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/6731?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-7648",
    "label": "（エラー表示）リモコンに「Ｐ１８」,「Ｐ３０」,「Ｐ３１」,が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/7648?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-8017",
    "label": "（エラー表示）リモコンに「Ｕ３１」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/8017?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-8443",
    "label": "（エラー表示）リモコンに「Ｐ６０」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/8443?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-8709",
    "label": "（エラー表示）リモコンに「Ｃ０３」，「Ｃ２０」，「Ｃ２１」，「Ｃ３０」，「１０３」，「１２０」，「１ | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/8709?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "mitsubishi-mitsubishi-faq-9414",
    "label": "（エラー表示）リモコンに「Ｕ２９」が表示されています。 | 三菱電機 よくあるご質問 FAQ",
    "url": "https://faq01.mitsubishielectric.co.jp/faq/show/9414?site_domain=default",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "corona-corona-error-eco",
    "label": "エコキュート｜エラーサイン一覧｜サポート・お問い合わせ｜株式会社コロナ",
    "url": "https://www.corona.co.jp/support/error/eco/",
    "verifiedAt": "2026-11-20"
  },
  {
    "id": "daikin-daikin-errorcode-data",
    "label": "エラーコード検索（エコキュート）の表示データ：eq.csv（内容・予想されるエラーの詳細）と cope.csv（対処方法）。結果ページ result/?mdl=eq&ecd=… は results.js でこの2つを読み込んで表示する",
    "url": "https://www.daikincc.com/errorcode/assets/data/eq.csv",
    "verifiedAt": "2026-11-20"
  }
];

export const errorCodes: ErrorCodeRow[] = [
  {
    "brand": "rinnai",
    "code": "02",
    "meaning": "安全のため、60分続けて使うと自動で止まる表示です。",
    "userAction": "すべてのお湯の蛇口をいったん閉めます。本体操作部の運転スイッチを「切」にし、もう一度「入」にしてから使います。",
    "sourceId": "rinnai-rinnai-faq-4863"
  },
  {
    "brand": "rinnai",
    "code": "03",
    "meaning": "お湯はり中に停電すると、安全のため、停電から戻ったときにお湯が出ないしくみになっています。",
    "userAction": "すべてのお湯の蛇口をいったん閉めます。本体操作部の運転スイッチを「切」にし、もう一度「入」にしてから使います。",
    "sourceId": "rinnai-rinnai-faq-4864"
  },
  {
    "brand": "rinnai",
    "code": "11",
    "title": "点火不良",
    "meaning": "給湯器が点火不良を起こしたことを示す表示です。",
    "userAction": "ほかのガス機器も使えないときは、ガスの供給が止まっている可能性があります。ガスメーターが遮断されていないか確かめ、遮断されていれば復帰方法を試します。詳しくは、利用中のガス会社に相談します。",
    "callRepair": "ほかのガス機器は使えるのに表示が出るときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2252"
  },
  {
    "brand": "rinnai",
    "code": "12",
    "title": "途中失火",
    "meaning": "給湯やシャワーなどの給湯回路が、途中失火を起こしたことを示す表示です。",
    "userAction": "ほかのガス機器も使えないときは、ガスの供給が止まっている可能性があります。利用中のガス会社に相談します。",
    "callRepair": "ガスの供給に問題がないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2210"
  },
  {
    "brand": "rinnai",
    "code": "13",
    "meaning": "COセンサーが作動したときの表示です。",
    "userAction": "給湯器前面のエアフィルターを外し、表面のほこりやごみを掃除機で吸い取ります。汚れがひどいときは、エアフィルターを外して水洗いします。",
    "sourceId": "rinnai-rinnai-faq-2393"
  },
  {
    "brand": "rinnai",
    "code": "013",
    "meaning": "暖房端末機を、長い期間続けて使ったときの表示です。長く使い続けると、ガスメーターがガスを止めるおそれがあります。",
    "userAction": "暖房端末機の運転スイッチをいったん切ります。1時間以上たってから、もう一度操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-5043"
  },
  {
    "brand": "rinnai",
    "code": "16",
    "title": "給湯の出湯温度異常",
    "meaning": "給湯の出湯温度の異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4974"
  },
  {
    "brand": "rinnai",
    "code": "19",
    "meaning": "機器内の12V回路のショート、またはリモコンケーブルの地絡が起きたときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "入れ直しても直らないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2276"
  },
  {
    "brand": "rinnai",
    "code": "021",
    "meaning": "安全のため、60分続けて使うと自動で止まる表示です。",
    "userAction": "すべてのお湯の蛇口をいったん閉めます。本体操作部の運転スイッチを「切」にし、もう一度「入」にしてから使います。",
    "sourceId": "rinnai-rinnai-faq-4863"
  },
  {
    "brand": "rinnai",
    "code": "25",
    "meaning": "ふろの水流スイッチが故障したときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、ふろ水流スイッチや電装ユニットなどの故障の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2388"
  },
  {
    "brand": "rinnai",
    "code": "29",
    "title": "中和器詰まり異常",
    "meaning": "中和器の詰まりの異常が起きたときの表示です。冬は、排水管の凍結で出ることがあります。",
    "userAction": "給湯栓（シャワーなど、お湯を出すところ）をいったん閉めて、もう一度操作します。冬に排水管の凍結で出たときは、自然に解けるとエラーは出なくなります。",
    "callRepair": "直らないときは、中和器や排水管などの不具合の可能性があります。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-3960"
  },
  {
    "brand": "rinnai",
    "code": "31",
    "meaning": "給水サーミスターの異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-4975"
  },
  {
    "brand": "rinnai",
    "code": "032",
    "title": "排水栓の閉め忘れ",
    "meaning": "自動湯はりのときに、浴槽の排水栓の閉め忘れを検知した表示です。",
    "userAction": "排水栓がしっかり閉まっているか確かめます。循環口のフィルターが、ごみなどで詰まっていないかも確かめます。",
    "callRepair": "確かめても直らないときは、機器の故障や不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-1195"
  },
  {
    "brand": "rinnai",
    "code": "33",
    "meaning": "熱交換器のサーミスターの異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-4977"
  },
  {
    "brand": "rinnai",
    "code": "38",
    "meaning": "COセンサーが作動したときの表示です。",
    "sourceId": "rinnai-rinnai-faq-2307"
  },
  {
    "brand": "rinnai",
    "code": "043",
    "title": "暖房水の渇水",
    "meaning": "暖房水が足りない（渇水の）状態です。",
    "userAction": "熱源機に、不凍液か水を入れます。入れ方は、取扱説明書で確かめます。自分で入れるのが難しいときは、購入した販売店や設置工事業者に相談します。そのうえで、リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-5045"
  },
  {
    "brand": "rinnai",
    "code": "61",
    "title": "燃焼ファン異常",
    "meaning": "燃焼ファンの異常、またはファンが回っているのに回転を検知しないときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。直れば、そのまま使えます。",
    "callRepair": "直らないときは、燃焼ファンモーターや電装ユニットなどの故障の可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-2061"
  },
  {
    "brand": "rinnai",
    "code": "62",
    "meaning": "浴室暖房乾燥機の対流ファンモーターの、回転数の異常を検知したときの表示です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4983"
  },
  {
    "brand": "rinnai",
    "code": "63",
    "title": "風呂用のポンプの回転数異常",
    "meaning": "ふろ用のポンプの回転数の異常です。",
    "userAction": "循環口（または循環金具）のフィルターが詰まっている可能性があります。フィルターを掃除します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4914"
  },
  {
    "brand": "rinnai",
    "code": "64",
    "meaning": "ポンプの回転数を検知できないときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。直れば、そのまま使えます。",
    "callRepair": "直らないときは、暖房ポンプや電装ユニットなどの故障の可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-2002"
  },
  {
    "brand": "rinnai",
    "code": "65",
    "meaning": "水量サーボが異常を検知したときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。直れば、そのまま使えます。",
    "callRepair": "直らないときは、水量サーボの故障の可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-2001"
  },
  {
    "brand": "rinnai",
    "code": "71",
    "title": "電装ユニット異常",
    "meaning": "電装ユニットの異常が起きたときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。直れば、そのまま使えます。",
    "callRepair": "直らないときは、電装ユニットなどの故障の可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-1999"
  },
  {
    "brand": "rinnai",
    "code": "72",
    "title": "炎検出回路異常",
    "meaning": "炎を検出する回路の異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、機器の異常が考えられます。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-1855"
  },
  {
    "brand": "rinnai",
    "code": "75",
    "meaning": "コードレス浴室リモコンのスイッチが故障したときの表示です。",
    "sourceId": "rinnai-rinnai-faq-1994"
  },
  {
    "brand": "rinnai",
    "code": "88",
    "meaning": "使用期間が10年相当になると出る、点検時期のお知らせです。故障の表示ではありません。",
    "userAction": "そのまま使うこともできます。経年劣化による製品事故を防ぐため、あんしん点検が勧められています。点検を受けないときは、早めの取り替えが勧められています。",
    "sourceId": "rinnai-rinnai-faq-1809"
  },
  {
    "brand": "rinnai",
    "code": "90",
    "title": "給・排気閉塞異常",
    "meaning": "給気・排気がふさがる異常を検知したときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。直れば、そのまま使えます。",
    "callRepair": "直らないときは、給排気の通路がふさがっているか、熱交換器が詰まっている可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-1997"
  },
  {
    "brand": "rinnai",
    "code": "92",
    "title": "中和剤寿命予告",
    "meaning": "中和器の寿命が来ていることを知らせる、予告の表示です。次に93が出ると、給湯器が使えなくなります。",
    "userAction": "しばらく（1〜2か月）は使えます。",
    "callRepair": "早めに部品（中和器）を交換することが勧められています。",
    "sourceId": "rinnai-rinnai-faq-1996"
  },
  {
    "brand": "rinnai",
    "code": "93",
    "meaning": "中和剤の寿命で、機器が止まったことを検知した表示です。",
    "callRepair": "部品（中和器）の交換が必要です。",
    "sourceId": "rinnai-rinnai-faq-1995"
  },
  {
    "brand": "rinnai",
    "code": "99",
    "meaning": "機器が止まった状態のときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。直れば、そのまま使えます。",
    "callRepair": "直らないときは、給排気の通路がふさがっているか、熱交換器が詰まっている可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-1993"
  },
  {
    "brand": "rinnai",
    "code": "101",
    "title": "出力ダウン運転（給排気詰まり）",
    "meaning": "出力ダウン運転（給排気の詰まり）が起きたときの表示です。",
    "userAction": "給湯栓をいったん閉めてお湯の連続使用を止め、もう一度操作してみます。",
    "callRepair": "直らないときは、給排気の通路がふさがっているか、熱交換器が詰まっているなどの異常が考えられます。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2463"
  },
  {
    "brand": "rinnai",
    "code": "102",
    "meaning": "ふろ回路の出力ダウン運転（給排気の詰まり）が起きたときの表示です。",
    "userAction": "給湯栓をいったん閉めてお湯の連続使用を止め、もう一度操作してみます。",
    "callRepair": "直らないときは、給排気の通路がふさがっているか、熱交換器が詰まっているなどの異常が考えられます。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-4985"
  },
  {
    "brand": "rinnai",
    "code": "103",
    "title": "出力ダウン運転（給排気目詰まり）",
    "meaning": "出力ダウン運転（給排気の目詰まり）が起きたときの表示です。",
    "userAction": "給湯栓をいったん閉めてお湯の連続使用を止め、もう一度操作してみます。",
    "callRepair": "直らないときは、給排気の通路がふさがっているか、熱交換器が詰まっているなどの異常が考えられます。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2895"
  },
  {
    "brand": "rinnai",
    "code": "110",
    "meaning": "ガスが来ていないときや、点火不良が起きたときの表示です。",
    "userAction": "給湯栓をいったん閉め、お湯の連続使用を止めます。ガスが来ているか、ガスコンロやガスファンヒーターなどが使えるかを確かめます。コンロなども使えないときは、ガスメーターを復旧するか、ガス会社に連絡します。",
    "callRepair": "直らないときは、イグナイターやガス電磁弁、電子ユニットなどの故障が考えられます。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2892"
  },
  {
    "brand": "rinnai",
    "code": "111",
    "title": "点火不良",
    "meaning": "給湯器が点火不良を起こしたことを示す表示です。",
    "userAction": "ほかのガス機器も使えないときは、ガスの供給が止まっている可能性があります。利用中のガス会社に相談します。震度5以上の地震があると、ガスメーターでガスが止まり、家中のガス機器が使えなくなります。",
    "callRepair": "ガスの供給に問題がないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2209"
  },
  {
    "brand": "rinnai",
    "code": "112",
    "title": "点火不良",
    "meaning": "給湯器のふろ回路が点火不良を起こしたことを示す表示です。",
    "userAction": "シャワーやほかのガス機器も使えないときは、ガスの供給が止まっている可能性があります。利用中のガス会社に相談します。台風や豪雨のときは、湿気などの影響で出ることもあります。天気が落ち着いてから、もう一度操作します。",
    "callRepair": "ガスの供給に問題がないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2250"
  },
  {
    "brand": "rinnai",
    "code": "113",
    "title": "点火不良",
    "meaning": "給湯器の暖房回路が点火不良を起こしたことを示す表示です。",
    "userAction": "シャワーやほかのガス機器も使えないときは、ガスの供給が止まっている可能性があります。ガスメーターが遮断されていないか確かめ、遮断されていれば復帰方法を試します。それでも直らないときは、ガス会社に連絡します。台風や豪雨のときは、天候が落ち着いてからもう一度操作します。",
    "callRepair": "給湯はできるのに表示が出るときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2251"
  },
  {
    "brand": "rinnai",
    "code": "120",
    "title": "途中失火",
    "meaning": "給湯器が途中失火を起こしたことを示す表示です。",
    "userAction": "ほかのガス機器も使えないときは、ガスの供給が止まっている可能性があります。利用中のガス会社に相談します。震度5以上の地震があると、ガスメーターでガスが止まり、家中のガス機器が使えなくなります。",
    "callRepair": "ガスの供給に問題がないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2799"
  },
  {
    "brand": "rinnai",
    "code": "121",
    "title": "途中失火",
    "meaning": "給湯やシャワーなどの給湯回路が、途中失火を起こしたことを示す表示です。",
    "userAction": "ほかのガス機器も使えないときは、ガスの供給が止まっている可能性があります。利用中のガス会社に相談します。",
    "callRepair": "ガスの供給に問題がないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2210"
  },
  {
    "brand": "rinnai",
    "code": "122",
    "title": "途中失火",
    "meaning": "追いだき（ふろ）の回路が、途中失火を起こしたことを示す表示です。",
    "userAction": "ほかのガス機器も使えないときは、ガスの供給が止まっている可能性があります。利用中のガス会社に相談します。",
    "callRepair": "ガスの供給に問題がないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2210"
  },
  {
    "brand": "rinnai",
    "code": "123",
    "title": "途中失火",
    "meaning": "床暖房や浴室暖房などの暖房回路が、途中失火を起こしたことを示す表示です。",
    "userAction": "ほかのガス機器も使えないときは、ガスの供給が止まっている可能性があります。利用中のガス会社に相談します。",
    "callRepair": "ガスの供給に問題がないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2210"
  },
  {
    "brand": "rinnai",
    "code": "130",
    "meaning": "COセンサーが作動したときの表示です。給排気筒や内部の詰まりなどで5回続けて作動すると、インターロック（再点火防止装置）が働き、給湯器が使えなくなります。",
    "callRepair": "利用者ではエラーを解除できません。メーカーなどに点検を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2414"
  },
  {
    "brand": "rinnai",
    "code": "140",
    "meaning": "温度ヒューズや過熱防止装置が作動したときの表示です。部品の不具合で、安全装置が作動しています。",
    "sourceId": "rinnai-rinnai-faq-2277"
  },
  {
    "brand": "rinnai",
    "code": "161",
    "meaning": "出てくるお湯の温度が高いことを検知した表示です。給湯器内部の熱交換器が凍結などで詰まり、お湯が高温になっている可能性があります。",
    "userAction": "凍結していないときは、リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "safety": "冬場など、凍結の可能性があるときは使用を控えてください。",
    "sourceId": "rinnai-rinnai-faq-4939"
  },
  {
    "brand": "rinnai",
    "code": "162",
    "title": "ふろの異常過熱",
    "meaning": "ふろが異常に過熱したことを示す表示です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-5006"
  },
  {
    "brand": "rinnai",
    "code": "163",
    "title": "暖房部分凍結異常",
    "meaning": "暖房部分の凍結の異常です。暖房ポンプやバイパス通路などが、凍結している可能性があります。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-5007"
  },
  {
    "brand": "rinnai",
    "code": "170",
    "meaning": "ドレンタンクの水位電極の、水位の異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-5008"
  },
  {
    "brand": "rinnai",
    "code": "173",
    "meaning": "漏水検知機能が作動した表示です。暖房に使う循環水（不凍液）の、わずかな漏れを検知しています。機器本体や、床暖房マット・浴室暖房などの暖房配管で漏れている可能性があります。",
    "callRepair": "暖房配管などからのわずかな漏れは、設置業者の対応になる場合があります。",
    "sourceId": "rinnai-rinnai-faq-2285"
  },
  {
    "brand": "rinnai",
    "code": "190",
    "meaning": "機器内の12V回路のショート、またはリモコンケーブルの地絡が起きたときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "入れ直しても直らないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2276"
  },
  {
    "brand": "rinnai",
    "code": "191",
    "meaning": "機器内の12V回路のショート、またはリモコンケーブルの地絡が起きたときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "入れ直しても直らないときは、機器の不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2276"
  },
  {
    "brand": "rinnai",
    "code": "252",
    "meaning": "ふろの水流スイッチが故障したときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、ふろ水流スイッチや電装ユニットなどの故障の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2388"
  },
  {
    "brand": "rinnai",
    "code": "260",
    "meaning": "ドレンタンクの水位電極の検出不良です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-4988"
  },
  {
    "brand": "rinnai",
    "code": "290",
    "title": "中和器詰まり異常",
    "meaning": "中和器の詰まりの異常が起きたときの表示です。冬は、排水管の凍結で出ることがあります。",
    "userAction": "給湯栓（シャワーなど、お湯を出すところ）をいったん閉めて、もう一度操作します。冬に排水管の凍結で出たときは、自然に解けるとエラーは出なくなります。",
    "callRepair": "直らないときは、中和器や排水管などの不具合の可能性があります。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-1990"
  },
  {
    "brand": "rinnai",
    "code": "291",
    "title": "中和器詰まり異常",
    "meaning": "中和器の詰まりの異常が起きたときの表示です。冬は、凍結の可能性があります。",
    "userAction": "給湯栓（シャワーなど、お湯を出すところ）をいったん閉めて、もう一度操作します。冬に凍結したときは、自然に解けると使えるようになります。",
    "callRepair": "直らないときは、中和器や排水チューブなどの不具合の可能性があります。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-1991"
  },
  {
    "brand": "rinnai",
    "code": "310",
    "meaning": "低温を感知するサーミスターの異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4901"
  },
  {
    "brand": "rinnai",
    "code": "312",
    "meaning": "ふろの戻りサーミスターの異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4902"
  },
  {
    "brand": "rinnai",
    "code": "313",
    "meaning": "暖房回路の、高温側のサーミスターの異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4904"
  },
  {
    "brand": "rinnai",
    "code": "321",
    "meaning": "給湯サーミスターの異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4905"
  },
  {
    "brand": "rinnai",
    "code": "323",
    "meaning": "暖房回路の、低温側のサーミスターの異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4907"
  },
  {
    "brand": "rinnai",
    "code": "331",
    "meaning": "熱交換器のサーミスターの異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4908"
  },
  {
    "brand": "rinnai",
    "code": "380",
    "meaning": "COセンサーの故障、またはCOセンサーの寿命を知らせる警告の表示です。",
    "sourceId": "rinnai-rinnai-faq-2306"
  },
  {
    "brand": "rinnai",
    "code": "430",
    "meaning": "ドレンタンクの水位電極の異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4910"
  },
  {
    "brand": "rinnai",
    "code": "432",
    "meaning": "水位センサーの異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4967"
  },
  {
    "brand": "rinnai",
    "code": "433",
    "meaning": "暖房回路の、シスターンの水位電極の異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4912"
  },
  {
    "brand": "rinnai",
    "code": "502",
    "title": "湯はり不良",
    "meaning": "湯はり不良を示す表示です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。修理が終わるまでは、蛇口から浴槽にお湯をため、おいだき運転で使います。お湯は自動では止まりません。自動運転・たし湯・ぬる湯は使えませんが、給湯とおいだきは使えます。",
    "callRepair": "入れ直しても直らないときは、故障の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-1184"
  },
  {
    "brand": "rinnai",
    "code": "543",
    "meaning": "暖房用の循環水が足りず、給湯器が水を補ったのに満水にならなかったときの表示です。",
    "userAction": "給湯器の電源プラグをいったん抜き、差し直します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-2288"
  },
  {
    "brand": "rinnai",
    "code": "562",
    "title": "湯はり電磁弁異常",
    "meaning": "湯はり電磁弁の異常を検知した表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、湯はり水コン（湯はり電磁弁）や電子ユニットなどの故障の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2668"
  },
  {
    "brand": "rinnai",
    "code": "610",
    "title": "燃焼ファン異常",
    "meaning": "燃焼ファンの異常、またはファンが回っているのに回転を検知しないときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、燃焼ファンモーターや電装ユニットなどの故障の可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-1986"
  },
  {
    "brand": "rinnai",
    "code": "611",
    "title": "燃焼ファン異常",
    "meaning": "給湯側の燃焼ファンの異常、またはファンが回っているのに回転を検知しないときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、燃焼ファンモーターや電装ユニットなどの故障の可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-1985"
  },
  {
    "brand": "rinnai",
    "code": "632",
    "title": "おいだきの水流スイッチの異常",
    "meaning": "おいだきの水流スイッチの異常を検知した表示です。",
    "userAction": "浴槽のお湯（水）が、循環アダプターが十分に隠れる量あるか確かめます。循環アダプターのフィルターが汚れていないかも確かめます。",
    "callRepair": "確かめても直らないときは、機器の故障や不具合の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-1192"
  },
  {
    "brand": "rinnai",
    "code": "633",
    "title": "風呂用のポンプの回転数異常",
    "meaning": "ふろ用のポンプの回転数の異常です。",
    "userAction": "循環口（または循環金具）のフィルターが詰まっている可能性があります。フィルターを掃除します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4914"
  },
  {
    "brand": "rinnai",
    "code": "640",
    "title": "ドレン排水異常",
    "meaning": "ドレン排水の異常です。",
    "userAction": "ドレンの排水口に詰まりがないか確かめます。リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-4906"
  },
  {
    "brand": "rinnai",
    "code": "642",
    "meaning": "ふろポンプの回転を検知しないときの表示です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。修理が終わるまでは、蛇口から浴槽にお湯をためて使います。自動運転・おいだき・たし湯・ぬる湯は使えませんが、給湯は使えます。",
    "callRepair": "入れ直しても直らないときは、故障の可能性があるため、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2671"
  },
  {
    "brand": "rinnai",
    "code": "643",
    "meaning": "暖房ポンプの回転数を検知できないときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、暖房ポンプや電装ユニットなどの故障の可能性があります。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-2358"
  },
  {
    "brand": "rinnai",
    "code": "651",
    "meaning": "水量サーボが異常を検知したときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、水量サーボの故障の可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-2795"
  },
  {
    "brand": "rinnai",
    "code": "661",
    "meaning": "バイパスサーボが異常を検知したときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、バイパスサーボの故障が考えられ、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-1992"
  },
  {
    "brand": "rinnai",
    "code": "662",
    "title": "追い焚き流量制御弁異常",
    "meaning": "追いだきの流量制御弁の異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-5055"
  },
  {
    "brand": "rinnai",
    "code": "700",
    "title": "ガス比例弁回路異常",
    "meaning": "ガス比例弁の回路の異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-5058"
  },
  {
    "brand": "rinnai",
    "code": "710",
    "title": "電装ユニット異常",
    "meaning": "電装ユニットの異常が起きたときの表示です。",
    "userAction": "運転スイッチをいったん切り、入れ直してから操作します。直れば、そのまま使えます。",
    "callRepair": "直らないときは、電装ユニットなどの故障の可能性があり、修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-1999"
  },
  {
    "brand": "rinnai",
    "code": "711",
    "meaning": "ガス電磁弁を動かす回路の異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、点検修理が必要です。",
    "sourceId": "rinnai-rinnai-faq-5061"
  },
  {
    "brand": "rinnai",
    "code": "721",
    "meaning": "給湯側の炎を検出する部品の不具合が考えられます。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。直れば、そのまま使えます。",
    "callRepair": "直らないときは、電装基板やフレームロッドなどの部品の故障が考えられます。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-1846"
  },
  {
    "brand": "rinnai",
    "code": "722",
    "meaning": "ふろ側の炎を検出する部品の不具合が考えられます。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、電装基板やフレームロッドなどの部品の故障が考えられます。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-1847"
  },
  {
    "brand": "rinnai",
    "code": "723",
    "title": "暖房側の炎検出回路異常",
    "meaning": "暖房側の炎を検出する回路の異常です。",
    "userAction": "リモコンの運転スイッチをいったん切り、入れ直してから操作します。",
    "callRepair": "直らないときは、機器の異常が考えられます。修理を依頼します。",
    "sourceId": "rinnai-rinnai-faq-1854"
  },
  {
    "brand": "rinnai",
    "code": "760",
    "meaning": "機器どうしの通信の異常です。給湯器につながる部材（ドレン排水切替ユニット）と通信できていないか、正しく取り付けられていない可能性があります。",
    "callRepair": "入居して間もないときは、取付業者か管理会社に相談します。",
    "appliesTo": "コードレスリモコンを利用していない場合",
    "sourceId": "rinnai-rinnai-faq-2385"
  },
  {
    "brand": "rinnai",
    "code": "760",
    "meaning": "機器どうしの通信の異常です。コードレスリモコンの場合は、給湯器本体の通信ユニットとリモコンが通信できていない状態です。",
    "userAction": "本体の電源プラグが抜けていれば差し込み、運転スイッチを押します。停電していたときは、電気が戻ってから運転スイッチを押します。画面が出るまで、1分ほどかかることがあります。",
    "callRepair": "電源プラグが差し込まれ、停電もしていないときは、リモコンか通信ユニットの不具合の可能性があります。修理を依頼します。",
    "appliesTo": "コードレスリモコンを利用している場合",
    "sourceId": "rinnai-rinnai-faq-2385"
  },
  {
    "brand": "rinnai",
    "code": "763",
    "title": "リモコン信号線誤接続（施工不良）",
    "meaning": "リモコンの信号線の誤接続（施工不良）のときの表示です。台所リモコンで床暖房を制御しているのに、床暖房専用リモコンを付けた場合などに出ます。",
    "callRepair": "設置業者に相談します。取り付けてしばらくたってから出たときは、機器の不具合の可能性があります。",
    "sourceId": "rinnai-rinnai-faq-2474"
  },
  {
    "brand": "rinnai",
    "code": "888",
    "meaning": "使用期間が10年相当になると出る、点検時期のお知らせです。故障の表示ではありません。",
    "userAction": "そのまま使うこともできます。経年劣化による製品事故を防ぐため、あんしん点検が勧められています。点検を受けないときは、早めの取り替えが勧められています。",
    "sourceId": "rinnai-rinnai-faq-1806"
  },
  {
    "brand": "rinnai",
    "code": "900",
    "title": "給・排気閉塞異常",
    "meaning": "給気・排気がふさがる異常を検知したときの表示です。",
    "userAction": "給排気トップ（煙突）が、ブルーシートなどで覆われていないか確かめます。冬は、煙突が雪で埋まっていないかも確かめます。ふさがっていれば、原因を取り除きます。",
    "callRepair": "原因が分からないときは、修理を依頼するか、設置事業者に相談します。",
    "sourceId": "rinnai-rinnai-faq-4926"
  },
  {
    "brand": "rinnai",
    "code": "901",
    "title": "給湯側の給・排気閉塞異常",
    "meaning": "給湯側の給気・排気がふさがる異常を検知したときの表示です。",
    "userAction": "給排気トップ（煙突）が、ブルーシートなどで覆われていないか確かめます。冬は、煙突が雪で埋まっていないかも確かめます。ふさがっていれば、原因を取り除きます。",
    "callRepair": "原因が分からないときは、修理を依頼するか、設置事業者に相談します。",
    "sourceId": "rinnai-rinnai-faq-2697"
  },
  {
    "brand": "rinnai",
    "code": "902",
    "title": "風呂側の給・排気閉塞異常",
    "meaning": "ふろ側の給気・排気がふさがる異常を検知したときの表示です。",
    "userAction": "給排気トップ（煙突）が、ブルーシートなどで覆われていないか確かめます。冬は、煙突が雪で埋まっていないかも確かめます。ふさがっていれば、原因を取り除きます。",
    "callRepair": "原因が分からないときは、修理を依頼するか、設置事業者に相談します。",
    "sourceId": "rinnai-rinnai-faq-4924"
  },
  {
    "brand": "rinnai",
    "code": "903",
    "title": "給・排気閉塞異常",
    "meaning": "給気・排気がふさがる異常を検知したときの表示です。",
    "userAction": "給排気トップ（煙突）が、ブルーシートなどで覆われていないか確かめます。冬は、煙突が雪で埋まっていないかも確かめます。ふさがっていれば、原因を取り除きます。",
    "callRepair": "原因が分からないときは、修理を依頼するか、設置事業者に相談します。",
    "sourceId": "rinnai-rinnai-faq-2695"
  },
  {
    "brand": "rinnai",
    "code": "920",
    "title": "中和剤寿命予告",
    "meaning": "中和器の寿命が来ていることを知らせる、予告の表示です。次に930が出ると、給湯器が使えなくなります。",
    "userAction": "しばらく（1〜2か月）は使えます。",
    "callRepair": "早めに部品（中和器）を交換することが勧められています。",
    "sourceId": "rinnai-rinnai-faq-2279"
  },
  {
    "brand": "rinnai",
    "code": "921",
    "title": "中和剤寿命予告",
    "meaning": "中和器の寿命が来ていることを知らせる、予告の表示です。次に931が出ると、給湯器が使えなくなります。",
    "userAction": "しばらく（1〜2か月）は使えます。",
    "callRepair": "早めに部品（中和器）を交換することが勧められています。",
    "sourceId": "rinnai-rinnai-faq-1947"
  },
  {
    "brand": "rinnai",
    "code": "930",
    "meaning": "中和剤の寿命で、機器が止まったことを検知した表示です。",
    "callRepair": "部品（中和器）の交換が必要です。",
    "sourceId": "rinnai-rinnai-faq-2281"
  },
  {
    "brand": "rinnai",
    "code": "931",
    "meaning": "中和剤の寿命で、機器が止まったことを検知した表示です。",
    "callRepair": "部品（中和器）の交換が必要です。",
    "sourceId": "rinnai-rinnai-faq-2282"
  },
  {
    "brand": "rinnai",
    "code": "990",
    "meaning": "熱交換器の目詰まりなどで、燃焼を止めたときの表示です。",
    "sourceId": "rinnai-rinnai-faq-4923"
  },
  {
    "brand": "rinnai",
    "code": "991",
    "meaning": "給湯の機能が止まったときの表示です。主な原因は、給排気の通路がふさがっていることです。",
    "userAction": "給排気トップ（煙突）が、ブルーシートなどで覆われていないか確かめます。冬は、煙突が雪で埋まっていないかも確かめます。ふさがっていれば、原因を取り除きます。",
    "callRepair": "原因が分からないときは、修理を依頼するか、設置事業者に相談します。",
    "sourceId": "rinnai-rinnai-faq-2842"
  },
  {
    "brand": "noritz",
    "code": "011",
    "meaning": "60分以上続けてお湯を出したときに出る、お知らせの表示です。不具合ではありません。",
    "userAction": "お湯側の水栓を閉めます。運転スイッチを「切」にし、もう一度「入」にして、表示が消えたか確かめます。",
    "callRepair": "表示が消えなければ、修理を依頼します。給湯配管などで漏水しているときは、機器の不具合ではありません。全ての水栓を閉めても水の流れる音がする、燃焼ランプが点くといったときです。この場合は、水道業者に修理を依頼します。",
    "sourceId": "noritz-noritz-faq-011"
  },
  {
    "brand": "noritz",
    "code": "11",
    "meaning": "給湯器が点火できなかったときの表示です。",
    "userAction": "給湯器以外のガス機器が点火するか、ガスの供給状況を確かめます。ほかのガス機器も使えないときは、メーカーの「全てのガス機器が使用できない」の案内を確かめます。",
    "callRepair": "給湯器以外のガス機器が使えるときは、修理が必要です。",
    "appliesTo": "ガス給湯器",
    "sourceId": "noritz-noritz-faq-11"
  },
  {
    "brand": "noritz",
    "code": "012",
    "meaning": "ふろの追いだき中に燃焼が止まり、安全装置が働いたことを示します。90分以上続けて追いだきをしたときに、浴槽の温度に注意を促すお知らせの表示で、故障ではありません。",
    "userAction": "運転スイッチを「切」にし、もう一度「入」にします。表示が消えれば正常です。",
    "callRepair": "直らないときは、修理が必要です。",
    "safety": "浴槽の温度に注意してください。",
    "sourceId": "noritz-noritz-faq-012"
  },
  {
    "brand": "noritz",
    "code": "12",
    "meaning": "燃焼が途中で止まったときの表示です。",
    "userAction": "全てのガス機器が使えないときは、ガスの供給を確かめます。",
    "callRepair": "ガスの供給に問題がないときは、給湯初期点火系統の部品の不具合の可能性があります。修理を依頼します。",
    "appliesTo": "ガス給湯器",
    "sourceId": "noritz-noritz-faq-12"
  },
  {
    "brand": "noritz",
    "code": "013",
    "meaning": "安全のため、23日間に35分間の燃焼停止がないときに出る、警告の表示です。故障ではなく、表示が出ていても使えます。",
    "userAction": "日中の気温が上がった時間帯に行います。運転スイッチを「切」、暖房スイッチを「切」か「停止」にします。約35分、暖房を止め、ガスコンロなどほかのガス機器も使わないようにします。リモコンの「013」が消えたのを確かめてから、運転スイッチを「入」にします。",
    "callRepair": "それでも直らないときは、修理が必要です。",
    "appliesTo": "ガス暖房機能付き給湯器",
    "sourceId": "noritz-noritz-faq-013"
  },
  {
    "brand": "noritz",
    "code": "14",
    "meaning": "給湯器本体内部の、過熱防止安全装置が働いたときの表示です。",
    "callRepair": "修理が必要です。",
    "safety": "使用中は、高温のお湯が出ることがあります。やけどに注意してください。",
    "sourceId": "noritz-noritz-faq-14"
  },
  {
    "brand": "noritz",
    "code": "16",
    "meaning": "設定温度より高い温度のお湯が出ている可能性があります。",
    "userAction": "運転スイッチを「切」にし、もう一度「入」にします。",
    "callRepair": "直らなければ、修理が必要です。",
    "appliesTo": "ガス・石油給湯機器",
    "sourceId": "noritz-noritz-faq-16"
  },
  {
    "brand": "noritz",
    "code": "25",
    "meaning": "ふろ運転のときの空だき安全装置の不具合や、本体の基板の系統の不具合の可能性があります。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "appliesTo": "GST-131",
    "sourceId": "noritz-noritz-faq-25"
  },
  {
    "brand": "noritz",
    "code": "29",
    "meaning": "寒波など冷え込みが厳しい時期は、ドレン配管が凍ってドレン水を出せず、29が出ている可能性があります。",
    "userAction": "気温が上がって配管が暖まり、解けたドレン水が出れば元に戻ります。結露水（ドレン）配管の先に、ごみなどが詰まっていれば取り除きます。配管の先が水につかっているときは、機器の不具合ではないため、施工店に相談します。",
    "callRepair": "これに当てはまらないときは、機器内の中和装置の詰まりなどが考えられます。訪問して症状を確認します。",
    "appliesTo": "ＧＱ－Ｃタイプ／ＯＱＢ－Ｃタイプ",
    "sourceId": "noritz-noritz-faq-29"
  },
  {
    "brand": "noritz",
    "code": "31",
    "meaning": "温度を測る部品の不具合の可能性があります。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-31"
  },
  {
    "brand": "noritz",
    "code": "032",
    "meaning": "「ふろ自動」で、お湯が決められた量までたまらないときの表示です。",
    "userAction": "浴槽の排水栓を閉めて、ふろ自動運転をやり直します。循環アダプターのフィルターに髪の毛などが詰まっていれば、お手入れをします。冷え込みが厳しい時期は、追いだき配管の凍結が考えられるため、しばらく様子をみます。",
    "callRepair": "それでも直らないときは、現地での診断が必要です。修理を依頼します。",
    "sourceId": "noritz-noritz-faq-032"
  },
  {
    "brand": "noritz",
    "code": "33",
    "meaning": "燃焼しないときに出る表示です。水温を測る部品の不具合が考えられます。",
    "callRepair": "修理が必要です。訪問して症状を確認します。",
    "sourceId": "noritz-noritz-faq-33"
  },
  {
    "brand": "noritz",
    "code": "39",
    "meaning": "運転ができないときは、排気や燃焼の系統の部品の不具合の可能性があります。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-39"
  },
  {
    "brand": "noritz",
    "code": "043",
    "meaning": "暖房運転ができない原因として、暖房に使う暖房水（不凍液）が足りない可能性があります。よく表示が出るときは、暖房水の漏れや、暖房配管の空気抜きが不十分な可能性があります。",
    "callRepair": "販売店に、暖房水（不凍液）の補充を依頼します。メーカーのアフターサービスでも、有料で受け付けています。",
    "sourceId": "noritz-noritz-faq-043"
  },
  {
    "brand": "noritz",
    "code": "61",
    "meaning": "給湯器本体内部の、燃焼に関わる部品の不具合の可能性があります。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-61"
  },
  {
    "brand": "noritz",
    "code": "63",
    "meaning": "循環系統の不具合が考えられます。",
    "userAction": "フィルターを掃除するか、ポンプの呼び水を試します。",
    "appliesTo": "ＧＳＴタイプ",
    "sourceId": "noritz-noritz-faq-63"
  },
  {
    "brand": "noritz",
    "code": "71",
    "meaning": "給湯器本体内部の、電装基板などの部品の不具合が考えられます。",
    "callRepair": "訪問して機器を診断する必要があり、修理が必要です。",
    "sourceId": "noritz-noritz-faq-71"
  },
  {
    "brand": "noritz",
    "code": "72",
    "meaning": "炎を検出する部品の不具合が考えられます。",
    "callRepair": "修理が必要です。訪問での確認が勧められています。",
    "appliesTo": "給湯機器・暖房機器",
    "sourceId": "noritz-noritz-faq-72"
  },
  {
    "brand": "noritz",
    "code": "73",
    "meaning": "本体内部の、電装系統の部品の不具合が考えられます。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-73"
  },
  {
    "brand": "noritz",
    "code": "76",
    "meaning": "リモコンと給湯器本体の、通信の不具合のときの表示です。",
    "userAction": "すべてのリモコンの電源が入らず、すべての水栓からお湯が出ないときだけ行います。本体から出ているコードをコンセントから一度抜き、10〜20秒たってから差し込みます。一部でも使えているときに抜くと、電源が入らなくなり、使えなくなることがあります。",
    "callRepair": "一部のリモコンだけ電源が入らないときや、水栓からお湯が出るときは、本体内部の部品の不具合が考えられ、修理が必要です。",
    "sourceId": "noritz-noritz-faq-76"
  },
  {
    "brand": "noritz",
    "code": "88",
    "meaning": "故障を示す表示ではなく、点検時期を知らせる表示です。設計上の標準使用期間、またはそれに相当する使用回数を超えると出ます。そのまま使えます。",
    "userAction": "経年劣化による事故や故障を防ぎ、機器の状態を確かめるため、点検が勧められています。点検は有料です。点検料金を確かめて、検討します。",
    "sourceId": "noritz-noritz-faq-88-888",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9088%E3%80%91%E3%80%90888%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe586"
  },
  {
    "brand": "noritz",
    "code": "90",
    "meaning": "燃焼不具合のときの表示です。給気・排気の不具合や、ガスの調整がうまくいかないなどで、能力が出ていない可能性があります。",
    "userAction": "室内タイプで、フロントカバーに吸気フィルターが付いている商品は、フィルターを掃除します。",
    "callRepair": "掃除しても直らないときや、室外に設置されている商品は、修理が必要です。",
    "sourceId": "noritz-noritz-faq-90"
  },
  {
    "brand": "noritz",
    "code": "92",
    "meaning": "給湯器本体内部の中和器の寿命が近いことを知らせる表示です。中和器の交換が必要です。",
    "userAction": "お湯が出るときは、使っても問題ありません。ただし、一定時間がたつと93に変わり、給湯器が使えなくなります（お湯が出なくなります）。",
    "callRepair": "中和器の交換が必要です。",
    "sourceId": "noritz-noritz-faq-92"
  },
  {
    "brand": "noritz",
    "code": "93",
    "meaning": "機器に内蔵された中和器の寿命を知らせる表示です。",
    "callRepair": "修理が必要です。",
    "sourceId": "noritz-noritz-faq-93"
  },
  {
    "brand": "noritz",
    "code": "99",
    "meaning": "給湯機器本体内部の、燃焼系統の不具合です。給気・排気の不具合や、ガスの調整がうまくいかないなどの可能性があります。",
    "callRepair": "修理受付から依頼します。",
    "sourceId": "noritz-noritz-faq-99"
  },
  {
    "brand": "noritz",
    "code": "101",
    "meaning": "給湯機器の燃焼状態や、給排気に関わる不具合が考えられます。",
    "userAction": "燃焼はするが101が出るときは、ファンモーターやバーナーなど給排気の不具合で、燃焼が悪くなっています。安全のため、能力を下げて運転しています。使えますが、安全のため点検（修理）を受けます。",
    "callRepair": "修理が必要です。蛇口を閉めてもリモコンに燃焼中の表示が出るときも、本体内部の部品の不具合が考えられ、修理が必要です。",
    "sourceId": "noritz-noritz-faq-101"
  },
  {
    "brand": "noritz",
    "code": "102",
    "meaning": "炎の状態を見る部品が、燃焼の不具合を検知したときの表示です。",
    "callRepair": "修理の手配が必要です。",
    "appliesTo": "ガス給湯器GTS-164シリーズ",
    "sourceId": "noritz-noritz-faq-102"
  },
  {
    "brand": "noritz",
    "code": "102",
    "meaning": "長く使っている場合は、能力が下がっている可能性があります。",
    "userAction": "能力が下がった状態でも使えます。",
    "callRepair": "点検修理が必要です。",
    "appliesTo": "その他のガス給湯器",
    "sourceId": "noritz-noritz-faq-102"
  },
  {
    "brand": "noritz",
    "code": "103",
    "meaning": "暖房の燃焼の不具合が出て、表示されている可能性があります。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "appliesTo": "暖房機能付きの給湯器",
    "sourceId": "noritz-noritz-faq-103"
  },
  {
    "brand": "noritz",
    "code": "110",
    "meaning": "給湯器が点火できなかったときの表示です。",
    "userAction": "給湯器以外のガス機器（ガスコンロなど）が使えるか確かめます。使えないときは、ガスの供給状況を確かめます。詳しくは、メーカーの「全てのガス機器が使用できない」の案内を見ます。",
    "callRepair": "ほかのガス機器は使えるときは、給湯初期点火系統の部品の不具合の可能性があります。訪問での確認が勧められています。",
    "appliesTo": "ガス給湯器",
    "sourceId": "noritz-noritz-faq-110"
  },
  {
    "brand": "noritz",
    "code": "111",
    "meaning": "燃料切れ、または部品の不具合で、給湯器が点火できなかったときの表示です。",
    "userAction": "給湯器以外のガス機器（ガスコンロなど）が点火するか、ガスの供給状況を確かめます。ガスが止まっているときは、供給が戻れば点火して、お湯が出るようになります。",
    "callRepair": "ほかのガス機器が使えるときや、ガスの供給に問題がないときは、給湯器の不具合が考えられ、修理が必要です。",
    "appliesTo": "ガス給湯器",
    "sourceId": "noritz-noritz-faq-111"
  },
  {
    "brand": "noritz",
    "code": "112",
    "meaning": "燃焼が途中で止まったときの表示です。",
    "userAction": "全てのガス機器が使えないときは、ガスの供給を確かめます。",
    "callRepair": "ガスの供給に問題がないときは、給湯初期点火系統の部品の不具合の可能性があります。修理を依頼します。",
    "appliesTo": "ガス給湯器",
    "sourceId": "noritz-noritz-faq-112"
  },
  {
    "brand": "noritz",
    "code": "113",
    "meaning": "燃焼が途中で止まったときの表示です。",
    "userAction": "給湯器以外のガス機器（ガスコンロなど）が使えるか確かめます。全てのガス機器が使えないときは、その案内に沿って、ガスの供給を確かめます。",
    "callRepair": "ほかのガス機器が使えるときは、暖房かふろ追いだきの初期点火系統の部品の不具合の可能性があり、修理訪問が必要です。",
    "appliesTo": "ガス給湯器",
    "sourceId": "noritz-noritz-faq-113"
  },
  {
    "brand": "noritz",
    "code": "120",
    "meaning": "燃焼が途中で止まったときの表示です。",
    "userAction": "全てのガス機器が使えないときは、ガスの供給を確かめます。",
    "callRepair": "ガスの供給に問題がないときは、給湯初期点火系統の部品の不具合の可能性があります。訪問して、機器を診断する必要があります。",
    "appliesTo": "ガス給湯器",
    "sourceId": "noritz-noritz-faq-120"
  },
  {
    "brand": "noritz",
    "code": "121",
    "meaning": "給湯の燃焼が、途中で止まったときの表示です。",
    "userAction": "全てのガス機器が使えないときは、まずガスの供給を確かめます。",
    "callRepair": "ガスの供給に問題がなく、ほかのガス機器が使えるときは、機器の不具合のため修理が必要です。炎の検知や、安全装置の不具合の可能性があります。",
    "sourceId": "noritz-noritz-faq-121"
  },
  {
    "brand": "noritz",
    "code": "122",
    "meaning": "ふろの燃焼が、途中で止まったときの表示です。",
    "userAction": "全てのガス機器が使えないときは、まずガスの供給を確かめます。",
    "callRepair": "ガスの供給に問題がないときや、ほかのガス機器が使えるときは、機器の不具合のため修理が必要です。",
    "sourceId": "noritz-noritz-faq-122"
  },
  {
    "brand": "noritz",
    "code": "123",
    "meaning": "暖房が燃焼しないときの表示です。",
    "userAction": "全てのガス機器が使えないかなど、ガスの供給を確かめます。",
    "callRepair": "ガスの供給に問題がないときは、機器の不具合です。修理を依頼します。",
    "appliesTo": "ガス給湯器",
    "sourceId": "noritz-noritz-faq-123"
  },
  {
    "brand": "noritz",
    "code": "130",
    "meaning": "燃焼上の不具合（一酸化炭素濃度の不具合）が考えられます。",
    "userAction": "ブザーが鳴らないときは、給湯栓（お湯の蛇口）を閉めます。運転スイッチを「切」にし、もう一度「入」にします。運転スイッチの入切は、2回までにします。ブザーが鳴るときは、運転スイッチを「切」にします（ブザーが止まります）。",
    "callRepair": "この対応で直らないときは、訪問して症状を確認します。",
    "safety": "窓を開けて、十分に換気してください。",
    "appliesTo": "ガス給湯器全般（屋内設置形）",
    "sourceId": "noritz-noritz-faq-130"
  },
  {
    "brand": "noritz",
    "code": "140",
    "meaning": "給湯器本体内部で異常な高温を検知し、過熱防止安全装置が働いたときの表示です。",
    "callRepair": "修理が必要です。",
    "safety": "使用中は、高温のお湯が出ることがあります。やけどに注意してください。",
    "sourceId": "noritz-noritz-faq-140"
  },
  {
    "brand": "noritz",
    "code": "151",
    "meaning": "空だき防止装置の不具合が考えられます。",
    "callRepair": "購入や設置から間もないときは、販売店か設置業者に連絡します。これまで問題なく使えていたときは、訪問して症状を確認します。",
    "sourceId": "noritz-noritz-faq-151"
  },
  {
    "brand": "noritz",
    "code": "161",
    "meaning": "設定温度より高い温度のお湯が出るときの表示です。夏の水温が高いときに、少ない量でお湯を出すと出ることがあります。器具の特性によるものです。",
    "userAction": "お湯を出す量を多くすると、消えることがあります。給湯栓を閉め、運転スイッチをいったん「切」にしてから「入」にし、蛇口をもっと開いて使ってみます。",
    "callRepair": "直らなければ、訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-161"
  },
  {
    "brand": "noritz",
    "code": "162",
    "meaning": "おふろの自動お湯はりができないときの表示です。",
    "userAction": "浴槽の循環アダプターのフィルターに、異物や詰まりがないか確かめます。あれば取り除きます。",
    "sourceId": "noritz-noritz-faq-162"
  },
  {
    "brand": "noritz",
    "code": "173",
    "meaning": "暖房運転が止まるときは、暖房配管などからの暖房水漏れが考えられます。",
    "callRepair": "現地での診断が必要です。設置して間もない（約1か月）ときは、暖房配管に空気が残って出ることもあります。その場合は、販売店か工事店に連絡します。",
    "appliesTo": "暖房付きふろ給湯器",
    "sourceId": "noritz-noritz-faq-173"
  },
  {
    "brand": "noritz",
    "code": "252",
    "meaning": "浴槽の水が循環しているかを検知するスイッチなどの不具合が考えられます。",
    "userAction": "製品名がGTSで始まり、リモコンに「ふろ自動」スイッチがない標準タイプは、呼び水を試します。",
    "callRepair": "製品名がGTS以外か、機種が分からないときは、修理を依頼します。GTSシリーズで呼び水を試しても直らないときは、修理が必要です。",
    "sourceId": "noritz-noritz-faq-252"
  },
  {
    "brand": "noritz",
    "code": "290",
    "meaning": "給湯器本体内部の中和器の不具合や、ドレン排水の詰まりなどが考えられるときの表示です。",
    "userAction": "冬場や寒波で冷え込みが厳しい時期は、ドレン配管の凍結が考えられます。気温が上がって凍結が解けると、元に戻ります。ドレン配管の先にごみなどがあれば、取り除きます。配管の先が水に浸かっているなど、排水できない設置状況のときは、施工店に相談します。",
    "appliesTo": "ガス給湯器全般",
    "sourceId": "noritz-noritz-faq-290"
  },
  {
    "brand": "noritz",
    "code": "291",
    "meaning": "中和器の不具合や、排水の詰まりなどが考えられます。中和器は、給湯器内で出るドレン水（酸性水）を中和する部品です。",
    "userAction": "ドレン配管にごみなどが詰まっていないか確かめ、詰まりがあれば取り除きます。冷え込みが厳しい時期は、ドレン排水配管が凍っている可能性があります。気温が上がって、自然に解けるのを待ちます。解けたら運転スイッチを「切」にし、もう一度「入」にします。表示が出なければ正常です。",
    "callRepair": "これに当てはまらないときは、中和装置の詰まりなどが考えられ、修理が必要です。",
    "sourceId": "noritz-noritz-faq-291"
  },
  {
    "brand": "noritz",
    "code": "312",
    "meaning": "浴槽の循環金具に付いている、温度を測る部品の不具合が考えられます。",
    "callRepair": "設置中や、設置後に初めて使うときは、「取替ＳＥＴ」という部品が必要です。販売店か工事店に連絡します。それ以外は、修理が必要です。",
    "appliesTo": "GQ-**26/27/28AWX-Dシリーズ、GQ-C1634AWX-DX、その他の高温差し湯タイプ",
    "sourceId": "noritz-noritz-faq-312"
  },
  {
    "brand": "noritz",
    "code": "312",
    "meaning": "ふろ側の、センサー系統の部品の不具合が考えられます。",
    "callRepair": "修理受付から依頼します。",
    "appliesTo": "ガス暖房付ふろ給湯機器",
    "sourceId": "noritz-noritz-faq-312"
  },
  {
    "brand": "noritz",
    "code": "321",
    "meaning": "水の通り道の、センサー系統の部品の不具合が考えられます。",
    "callRepair": "修理が必要です。訪問して症状を確認します。",
    "sourceId": "noritz-noritz-faq-321"
  },
  {
    "brand": "noritz",
    "code": "331",
    "meaning": "缶体の水温を測る部品の不具合が考えられます。GTSシリーズでは、入る水の温度を測る部品の不具合が考えられます。",
    "callRepair": "修理が必要です。訪問して症状を確認します。",
    "sourceId": "noritz-noritz-faq-331"
  },
  {
    "brand": "noritz",
    "code": "370",
    "meaning": "本体内部の燃焼系統のセンサーの不具合か、吸排気部分や煙突が何かでふさがっている可能性があります。",
    "userAction": "ビニールや段ボールなどの飛来物や積雪で、吸排気部分や煙突がふさがっていないか確かめます。",
    "callRepair": "ふさがっていなければ、修理が必要です。",
    "sourceId": "noritz-noritz-faq-370"
  },
  {
    "brand": "noritz",
    "code": "380",
    "meaning": "「燃焼しない」「ブザーは鳴るが燃焼する」のどちらの場合も、燃焼系統の部品の不具合の可能性があります。",
    "callRepair": "修理が必要です。訪問して症状を確認します。使えていても、表示が出てから日数がたつと、お湯が使えなくなるおそれがあります。修理を頼むときは、表示が出てからおよそ何日たったかを伝えます。",
    "sourceId": "noritz-noritz-faq-380"
  },
  {
    "brand": "noritz",
    "code": "412",
    "meaning": "自動湯はりが動かないときの表示です。",
    "userAction": "追いだきは使える可能性があります。お風呂を沸かすときは、蛇口から浴槽に水をためて、追いだきをします。",
    "callRepair": "修理が必要です。",
    "sourceId": "noritz-noritz-faq-412"
  },
  {
    "brand": "noritz",
    "code": "430",
    "meaning": "ドレンタンク内の水の量を測る部品の不具合が考えられます。",
    "callRepair": "修理が必要です。訪問して症状を確認します。",
    "sourceId": "noritz-noritz-faq-430"
  },
  {
    "brand": "noritz",
    "code": "432",
    "meaning": "ふろ自動運転の途中で、運転が止まったときの表示です。",
    "userAction": "もう一度、ふろ自動スイッチを押します（表示が消えます）。次にお湯はりをするときは、浴槽に残り湯や水がない状態で、ふろ自動を行います。途中で何度か止まることがありますが、終わるまで待ちます。",
    "callRepair": "試しても直らないときは、訪問して症状を確認します。",
    "sourceId": "noritz-noritz-faq-432"
  },
  {
    "brand": "noritz",
    "code": "502",
    "meaning": "LED-UV除菌ユニットが寿命を迎えています。給湯器は使えますが、UV除菌機能は使えません。",
    "callRepair": "修理が必要です。",
    "appliesTo": "給湯機器プレミアム機能限定",
    "sourceId": "noritz-noritz-faq-502-512"
  },
  {
    "brand": "noritz",
    "code": "512",
    "meaning": "LED-UV除菌ユニットが寿命を迎えています。給湯器は使えますが、UV除菌機能は使えません。",
    "callRepair": "修理が必要です。",
    "appliesTo": "給湯機器プレミアム機能限定",
    "sourceId": "noritz-noritz-faq-502-512"
  },
  {
    "brand": "noritz",
    "code": "543",
    "meaning": "暖房運転が動かないときの表示です。暖房水漏れや、暖房配管に空気が入っている（エアがみ）などの可能性があります。",
    "callRepair": "修理が必要です。訪問して症状を確認します。設置して間もないときや、初めて使うときは、販売店か工事店に連絡します。",
    "sourceId": "noritz-noritz-faq-543"
  },
  {
    "brand": "noritz",
    "code": "562",
    "meaning": "給湯器本体内部の自動お湯はり系統の部品の不具合、または配管の凍結や断水が考えられます。",
    "userAction": "冷え込みが厳しい時期は、給水配管が凍っている可能性があります。地域の断水のときは、解除されるまで待ちます。水圧がかかっていないと、追いだきができない構造です。給湯器本体の給水栓が開いているか確かめ、給水元栓を左にいっぱいまで回します。",
    "callRepair": "配管の凍結や断水がないときは、修理が必要です。",
    "sourceId": "noritz-noritz-faq-562"
  },
  {
    "brand": "noritz",
    "code": "610",
    "meaning": "燃焼に必要な空気を取り入れたり、排気を出したりする送風機の系統の不具合が考えられます。",
    "callRepair": "修理が必要です。",
    "sourceId": "noritz-noritz-faq-610"
  },
  {
    "brand": "noritz",
    "code": "632",
    "meaning": "浴槽の水が循環しないときの表示です。",
    "userAction": "浴槽の水が、循環アダプターより5cm以上あるか確かめます。足りなければ、水かお湯を足します。循環アダプターのフィルターと、配管の凍結も確かめます。対象の機種では、「呼び水」も試します。",
    "callRepair": "それでも直らないときは、給湯器内部の故障の可能性があり、修理が必要です。",
    "sourceId": "noritz-noritz-faq-632"
  },
  {
    "brand": "noritz",
    "code": "640",
    "meaning": "給湯器本体内部の、基板などの不具合の可能性があります。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-640"
  },
  {
    "brand": "noritz",
    "code": "641",
    "meaning": "給湯のときに動くポンプ（水）が動いていないときの表示です。給湯の水や、その通り道に関わる部品の不具合の可能性があります。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-641"
  },
  {
    "brand": "noritz",
    "code": "642",
    "meaning": "本体に内蔵されたふろポンプ系統の部品の不具合で、自動湯はりや追いだきができないときの表示です。",
    "callRepair": "給湯器の修理が必要です。",
    "sourceId": "noritz-noritz-faq-642"
  },
  {
    "brand": "noritz",
    "code": "643",
    "meaning": "温水を循環させる暖房ポンプや、循環回路を開け閉めする部品の不具合が考えられます。",
    "callRepair": "修理が必要です。",
    "sourceId": "noritz-noritz-faq-643"
  },
  {
    "brand": "noritz",
    "code": "651",
    "meaning": "お湯はりの水の量を調整する部品の不具合が考えられます。",
    "callRepair": "修理が必要です。",
    "sourceId": "noritz-noritz-faq-651"
  },
  {
    "brand": "noritz",
    "code": "700",
    "meaning": "リモコンと給湯器本体の、通信の不具合のときの表示です。",
    "userAction": "すべてのリモコンの電源が入らず、すべての水栓からお湯が出ないときだけ行います。本体から出ている電源プラグをコンセントから一度抜き、10〜20秒たってから差し込みます。一部でも使えているときに抜くと、電源が入らなくなり、使えなくなることがあります。",
    "callRepair": "一部のリモコンだけ電源が入らないときや、水栓からお湯が出るときは、本体内部の部品の不具合が考えられ、修理が必要です。",
    "appliesTo": "ガス GTH/GT/GRQ",
    "sourceId": "noritz-noritz-faq-700"
  },
  {
    "brand": "noritz",
    "code": "710",
    "meaning": "給湯器内部の部品の不具合が考えられます。",
    "callRepair": "修理が必要です。",
    "sourceId": "noritz-noritz-faq-710"
  },
  {
    "brand": "noritz",
    "code": "711",
    "meaning": "給湯が点火したあとに止まるときは、燃焼に関わる部品や、制御する基板の不具合の可能性があります。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-711"
  },
  {
    "brand": "noritz",
    "code": "713",
    "meaning": "燃焼しないときは、ガスを開け閉めする部品の回路や、制御する基板などの不具合の可能性があります。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-713"
  },
  {
    "brand": "noritz",
    "code": "720",
    "meaning": "本体内部の、燃焼系統の部品の不具合が考えられます。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-720"
  },
  {
    "brand": "noritz",
    "code": "721",
    "meaning": "本体内部の、燃焼系統の部品の不具合が考えられます。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-721"
  },
  {
    "brand": "noritz",
    "code": "722",
    "meaning": "ふろの運転ができないときの表示です。ふろ側の炎を検出する部品などの不具合が考えられます。",
    "callRepair": "修理が必要です。",
    "appliesTo": "ガス給湯機器",
    "sourceId": "noritz-noritz-faq-722"
  },
  {
    "brand": "noritz",
    "code": "723",
    "meaning": "本体内部の、燃焼系統の部品の不具合が考えられます。",
    "callRepair": "訪問での症状の確認を、修理受付から申し込みます。",
    "sourceId": "noritz-noritz-faq-723"
  },
  {
    "brand": "noritz",
    "code": "760",
    "meaning": "給湯器本体の、通信の不具合のときの表示です。",
    "userAction": "すべてのリモコンの電源が入らず、すべての水栓からお湯が出ないときだけ行います。本体から出ているコードをコンセントから一度抜き、10〜20秒待ってから差し込みます。一部でも使えているときに抜くと、電源が入らなくなり、使えなくなることがあります。",
    "callRepair": "一部のリモコンだけ電源が入らないときや、水栓からお湯が出るときは、本体内部の部品の不具合が考えられ、修理が必要です。",
    "sourceId": "noritz-noritz-faq-760"
  },
  {
    "brand": "noritz",
    "code": "763",
    "meaning": "暖房運転や試運転ができないときは、暖房の通信の不具合の可能性があります。",
    "callRepair": "設置中や、施工後に初めて使うときは、設置した販売店か工事店に連絡します。施工からしばらくたっているときは、訪問して症状を確認します。",
    "sourceId": "noritz-noritz-faq-763"
  },
  {
    "brand": "noritz",
    "code": "888",
    "meaning": "故障を示す表示ではなく、点検時期を知らせる表示です。設計上の標準使用期間、またはそれに相当する使用回数を超えると出ます。そのまま使えます。",
    "userAction": "経年劣化による事故や故障を防ぎ、機器の状態を確かめるため、点検が勧められています。点検は有料です。点検料金を確かめて、検討します。",
    "sourceId": "noritz-noritz-faq-88-888",
    "url": "https://faq.noritz.co.jp/%E7%B5%A6%E6%B9%AF%E6%A9%9F%E5%99%A8%EF%BC%9A%E3%82%A8%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%80%9088%E3%80%91%E3%80%90888%E3%80%91%E3%81%8C%E7%82%B9%E6%BB%85-64e5a6833a829f001b3fe586"
  },
  {
    "brand": "noritz",
    "code": "900",
    "meaning": "給湯機器本体の、燃焼の不具合が考えられます。",
    "userAction": "運転スイッチをいったん「切」にし、もう一度「入」にします。表示が出なければ正常です。排気口や給気口がふさがっている可能性もあります。外壁工事などで、給湯機器が養生シートなどで囲われていないか確かめます。",
    "sourceId": "noritz-noritz-faq-900"
  },
  {
    "brand": "noritz",
    "code": "901",
    "meaning": "本体内部の、燃焼系統の部品の不具合です。使用年数によっては、寿命の可能性もあります。一般家庭用の給湯器の標準使用期間は10年です。",
    "callRepair": "修理が必要です。",
    "sourceId": "noritz-noritz-faq-901"
  },
  {
    "brand": "noritz",
    "code": "902",
    "meaning": "炎の状態を見る部品が、燃焼の異常を検知したときの表示です。",
    "userAction": "吸排気部分や煙突が、何かでふさがっていないか確かめます。外壁工事のビニールが排気部分を覆っていないか、段ボールなどの飛来物や積雪でふさがっていないかを見ます。",
    "callRepair": "問題がなければ、現地での診断が必要です。",
    "sourceId": "noritz-noritz-faq-902"
  },
  {
    "brand": "noritz",
    "code": "903",
    "meaning": "炎の状態を見る部品が、燃焼の異常を検知したときの表示です。吸排気部分や煙突がふさがっているときも、出ることがあります。",
    "userAction": "ビニールや段ボールなどの飛来物や積雪で、給排気部分や煙突がふさがっていないか確かめます。",
    "callRepair": "ふさがっていなければ、現地での診断が必要です。",
    "sourceId": "noritz-noritz-faq-903"
  },
  {
    "brand": "noritz",
    "code": "920",
    "meaning": "給湯器本体内部の中和器の寿命が近いことを知らせる表示です。中和器の交換が必要です。",
    "userAction": "お湯が出るときは、使っても問題ありません。ただし、しばらくすると930に変わり、給湯器が使えなくなります（お湯が出なくなります）。",
    "callRepair": "中和器の交換が必要です。",
    "sourceId": "noritz-noritz-faq-920"
  },
  {
    "brand": "noritz",
    "code": "921",
    "meaning": "燃焼の異常を検知しています。",
    "callRepair": "修理が必要です。",
    "safety": "リモコンの設定温度と違う温度のお湯が出る可能性があります。注意してください。",
    "sourceId": "noritz-noritz-faq-921"
  },
  {
    "brand": "noritz",
    "code": "930",
    "meaning": "機器に内蔵された中和器の寿命を表す表示です。",
    "callRepair": "修理が必要です。訪問して症状を確認します。",
    "sourceId": "noritz-noritz-faq-930"
  },
  {
    "brand": "noritz",
    "code": "990",
    "meaning": "機器の安全停止が考えられます。10年相当以上使ったときに出る表示です。",
    "callRepair": "訪問での確認が勧められています。取り替えも検討し、販売店かメーカーの窓口に連絡します。",
    "appliesTo": "ガス機器・ハイブリッド機器",
    "sourceId": "noritz-noritz-faq-990"
  },
  {
    "brand": "mitsubishi",
    "code": "102",
    "title": "圧力センサ異常",
    "meaning": "「圧力センサ異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "103",
    "title": "高圧異常",
    "meaning": "「高圧異常」の表示です。わき上げが正常にできない状態で、ヒートポンプ配管の水が正しく循環できていない可能性があります。",
    "userAction": "配管が凍結している場合は、凍結がとければ使えるようになるので、とけるのを待ってからエラーを解除します（エラー解除は2017年以降に製造された機種だけ）。待つのが難しいときは、販売店（据付工事店）に相談します。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8709"
  },
  {
    "brand": "mitsubishi",
    "code": "120",
    "title": "わき上げ温度高温異常",
    "meaning": "「わき上げ温度高温異常」の表示です。わき上げが正常にできない状態で、ヒートポンプ配管の水が正しく循環できていない可能性があります。",
    "userAction": "配管が凍結している場合は、凍結がとければ使えるようになるので、とけるのを待ってからエラーを解除します（エラー解除は2017年以降に製造された機種だけ）。待つのが難しいときは、販売店（据付工事店）に相談します。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8709"
  },
  {
    "brand": "mitsubishi",
    "code": "121",
    "title": "わき上げ温度低温異常",
    "meaning": "「わき上げ温度低温異常」の表示です。わき上げが正常にできない状態で、ヒートポンプ配管の水が正しく循環できていない可能性があります。",
    "userAction": "配管が凍結している場合は、凍結がとければ使えるようになるので、とけるのを待ってからエラーを解除します（エラー解除は2017年以降に製造された機種だけ）。待つのが難しいときは、販売店（据付工事店）に相談します。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8709"
  },
  {
    "brand": "mitsubishi",
    "code": "201",
    "title": "入水温度高温異常",
    "meaning": "「入水温度高温異常」の表示です。わき上げが正常にできない状態で、ヒートポンプ配管の水が正しく循環できていない可能性があります。",
    "userAction": "配管が凍結している場合は、凍結がとければ使えるようになるので、とけるのを待ってからエラーを解除します（エラー解除は2017年以降に製造された機種だけ）。待つのが難しいときは、販売店（据付工事店）に相談します。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8709"
  },
  {
    "brand": "mitsubishi",
    "code": "C01",
    "title": "冷媒ガス不足",
    "meaning": "「冷媒ガス不足」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C02",
    "title": "圧力センサ異常",
    "meaning": "「圧力センサ異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C03",
    "title": "高圧異常",
    "meaning": "「高圧異常」の表示です。わき上げが正常にできない状態で、ヒートポンプ配管の水が正しく循環できていない可能性があります。",
    "userAction": "配管が凍結している場合は、凍結がとければ使えるようになるので、とけるのを待ってからエラーを解除します（エラー解除は2017年以降に製造された機種だけ）。待つのが難しいときは、販売店（据付工事店）に相談します。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8709"
  },
  {
    "brand": "mitsubishi",
    "code": "C04",
    "title": "冷媒出口サーミスタ短絡・断線",
    "meaning": "「冷媒出口サーミスタ短絡・断線」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C05",
    "title": "入水温度サーミスタ短絡・断線",
    "meaning": "「入水温度サーミスタ短絡・断線」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C06",
    "title": "出湯温度サーミスタ短絡・断線",
    "meaning": "「出湯温度サーミスタ短絡・断線」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C07",
    "title": "霜取温度サーミスタ短絡・断線",
    "meaning": "「霜取温度サーミスタ短絡・断線」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C08",
    "title": "吸入温度サーミスター短絡・断線",
    "meaning": "「吸入温度サーミスター短絡・断線」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C09",
    "title": "外気温度サーミスタ短絡・断線",
    "meaning": "「外気温度サーミスタ短絡・断線」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C11",
    "title": "吐出温度サーミスタ短絡・断線",
    "meaning": "「吐出温度サーミスタ短絡・断線」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C12",
    "title": "インバータ制御基板 EEPROM異常",
    "meaning": "「インバータ制御基板 EEPROM異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C14",
    "title": "インバーター～コントロール基板間通信異常",
    "meaning": "「インバーター～コントロール基板間通信異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C15",
    "title": "ファンモーター異常",
    "meaning": "「ファンモーター異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C16",
    "title": "給水ポンプ異常",
    "meaning": "「給水ポンプ異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C17",
    "title": "わき上げ温度高温異常",
    "meaning": "「わき上げ温度高温異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C19",
    "title": "冷媒吐出温度異常",
    "meaning": "「冷媒吐出温度異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C20",
    "title": "わき上げ温度高温異常",
    "meaning": "「わき上げ温度高温異常」の表示です。わき上げが正常にできない状態で、ヒートポンプ配管の水が正しく循環できていない可能性があります。",
    "userAction": "配管が凍結している場合は、凍結がとければ使えるようになるので、とけるのを待ってからエラーを解除します（エラー解除は2017年以降に製造された機種だけ）。待つのが難しいときは、販売店（据付工事店）に相談します。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8709"
  },
  {
    "brand": "mitsubishi",
    "code": "C21",
    "title": "冷媒吐出温度（高温）異常",
    "meaning": "「冷媒吐出温度（高温）異常」の表示です。わき上げが正常にできない状態で、ヒートポンプ配管の水が正しく循環できていない可能性があります。",
    "userAction": "配管が凍結している場合は、凍結がとければ使えるようになるので、とけるのを待ってからエラーを解除します（エラー解除は2017年以降に製造された機種だけ）。待つのが難しいときは、販売店（据付工事店）に相談します。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8709"
  },
  {
    "brand": "mitsubishi",
    "code": "C22",
    "title": "電流検出異常",
    "meaning": "「電流検出異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C23",
    "title": "フィン温度異常",
    "meaning": "「フィン温度異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C24",
    "title": "基板温度サーミスタ異常",
    "meaning": "「基板温度サーミスタ異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C25",
    "title": "異電源投入異常",
    "meaning": "「異電源投入異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C26",
    "title": "インバータ異常 （パワー系異常）",
    "meaning": "「インバータ異常 （パワー系異常）」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C27",
    "title": "コンプレッサ･サイクル系異常（負荷急変）",
    "meaning": "「コンプレッサ･サイクル系異常（負荷急変）」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C29",
    "title": "コンプレッサ･サイクル系異常（負荷過大）",
    "meaning": "「コンプレッサ･サイクル系異常（負荷過大）」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C30",
    "title": "入水温度高温異常",
    "meaning": "「入水温度高温異常」の表示です。わき上げが正常にできない状態で、ヒートポンプ配管の水が正しく循環できていない可能性があります。",
    "userAction": "配管が凍結している場合は、凍結がとければ使えるようになるので、とけるのを待ってからエラーを解除します（エラー解除は2017年以降に製造された機種だけ）。待つのが難しいときは、販売店（据付工事店）に相談します。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8709"
  },
  {
    "brand": "mitsubishi",
    "code": "C31",
    "title": "圧力センサー短絡･断線",
    "meaning": "「圧力センサー短絡･断線」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "C32",
    "title": "除霜電磁弁異常",
    "meaning": "「除霜電磁弁異常」の表示です。わき上げが正常にできない状態で、ヒートポンプユニットの部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6575"
  },
  {
    "brand": "mitsubishi",
    "code": "E02",
    "title": "残湯（200L）サーミスター短絡・断線",
    "meaning": "「残湯（200L）サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E05",
    "title": "ふろ用温度検知サーミスター短絡・断線",
    "meaning": "「ふろ用温度検知サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E06",
    "title": "給湯温度サーミスタ短絡・断線",
    "meaning": "「給湯温度サーミスタ短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E07",
    "title": "ふろ戻り温度サーミスタ短絡・断線",
    "meaning": "「ふろ戻り温度サーミスタ短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E08",
    "title": "ふろ側熱交出口温度検知サーミスター短絡・断線",
    "meaning": "「ふろ側熱交出口温度検知サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E09",
    "title": "ふろ循環熱源入口サーミスタ短絡・断線",
    "meaning": "「ふろ循環熱源入口サーミスタ短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E10",
    "title": "ふろ循環熱源出口サーミスター短絡・断線",
    "meaning": "「ふろ循環熱源出口サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E11",
    "title": "ヒートポンプ入水温サーミスター短絡・断線",
    "meaning": "「ヒートポンプ入水温サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E12",
    "title": "凍結防止制御用サーミスター短絡・断線",
    "meaning": "「凍結防止制御用サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E13",
    "title": "残湯（0L）サーミスター短絡・断線",
    "meaning": "「残湯（0L）サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E16",
    "title": "混合弁給水水温サーミスター短絡・断線",
    "meaning": "「混合弁給水水温サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E17",
    "title": "ふろ側熱交出口／入口温度検知サーミスター ハーフデッド",
    "meaning": "「ふろ側熱交出口／入口温度検知サーミスター ハーフデッド」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E20",
    "title": "残湯（50L）サーミスター短絡・断線",
    "meaning": "「残湯（50L）サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E21",
    "title": "残湯（100L）サーミスター短絡・断線",
    "meaning": "「残湯（100L）サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E22",
    "title": "残湯（150L）サーミスター短絡・断線",
    "meaning": "「残湯（150L）サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E23",
    "title": "残湯（200L、220L、250L、300L）サーミスター短絡・断線",
    "meaning": "「残湯（200L、220L、250L、300L）サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E24",
    "title": "残湯（250L、290L、330L、400L）サーミスター短絡・断線",
    "meaning": "「残湯（250L、290L、330L、400L）サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "E26",
    "title": "中温水サーミスター短絡・断線",
    "meaning": "「中温水サーミスター短絡・断線」の表示です。貯湯ユニット内部のセンサー部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5354"
  },
  {
    "brand": "mitsubishi",
    "code": "F06",
    "title": "水位センサ 短絡／断線",
    "meaning": "湯はりのときに、おふろの水位を検知できない状態です。冬はふろ配管の凍結、浴槽の高さが設置の条件の外（例：3階）の可能性もあります。",
    "userAction": "エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3113"
  },
  {
    "brand": "mitsubishi",
    "code": "F08",
    "title": "漏水検知",
    "meaning": "貯湯ユニットの内部で水漏れを検知したときに表示されます。",
    "userAction": "台風などの大雨や積雪で水滴が貯湯ユニットの内部に入り、表示されることがあります。大雨や積雪が心配な地域では、販売店（据付工事店）に相談します。エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3112"
  },
  {
    "brand": "mitsubishi",
    "code": "F09",
    "title": "水位出力・浴槽設置階 異常",
    "meaning": "湯はりのときに、おふろの水位を検知できない状態です。冬はふろ配管の凍結、浴槽の高さが設置の条件の外（例：3階）の可能性もあります。",
    "userAction": "エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3113"
  },
  {
    "brand": "mitsubishi",
    "code": "H01",
    "title": "リモコン通信異常",
    "meaning": "貯湯ユニットとリモコンの通信が、正常にできていない状態です。",
    "userAction": "落雷などの影響の可能性があります。貯湯ユニットの電源レバーを「切」にし、1分ほど待ってから「入」に戻します。",
    "callRepair": "それで解決しない場合は、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5353"
  },
  {
    "brand": "mitsubishi",
    "code": "H03 / H3",
    "title": "異機種リモコン接続異常",
    "meaning": "貯湯ユニットと組み合わせの違うリモコンが付いている可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5352"
  },
  {
    "brand": "mitsubishi",
    "code": "H10",
    "title": "HPユニットとの通信異常",
    "meaning": "ヒートポンプユニット（室外機）と貯湯ユニットの間の通信が、正常にできていない状態です。",
    "userAction": "貯湯ユニットの電源レバーを「切」にし、1分ほど待ってから「入」に戻します。",
    "callRepair": "再び表示される場合は、配線や基板の不良が考えられます。販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3124"
  },
  {
    "brand": "mitsubishi",
    "code": "H11",
    "title": "異機種HPユニット接続異常",
    "meaning": "貯湯ユニットとヒートポンプユニットが、違う組み合わせで設置されている可能性があります。",
    "callRepair": "点検が必要です。販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6641"
  },
  {
    "brand": "mitsubishi",
    "code": "P01",
    "title": "給湯用電動混合弁異常",
    "meaning": "給湯の温度を調節する部品の不具合で、蛇口やシャワーから設定した温度のお湯が出ない状態です。給水配管専用止水栓が閉じているときや、冬に給水配管が凍結して給水されないときも、表示されることがあります。",
    "callRepair": "点検が必要です。販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-4405"
  },
  {
    "brand": "mitsubishi",
    "code": "P02",
    "title": "循環フロースイッチ異常",
    "meaning": "追いだきや保温などのふろの機能が、正常に動かない状態です。ふろの循環を検知するセンサーが、異物などの影響で一時的に誤って検知した可能性があります。",
    "userAction": "エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6669"
  },
  {
    "brand": "mitsubishi",
    "code": "P03",
    "title": "ふろ循環二方弁異常",
    "meaning": "追いだきや保温などのふろの機能が、正常に動かない状態です。貯湯ユニット内部のふろ循環の部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6723"
  },
  {
    "brand": "mitsubishi",
    "code": "P05 / P5",
    "title": "ふろ用流量センサ／ふろ給湯用電磁弁異常",
    "meaning": "おふろの湯はりに異常があるときに表示されます。",
    "userAction": "断水中は終わるまで、冬に配管が凍結しているときはとけるまで待ちます。タンクに水がないときは満水にし、給水配管専用止水栓が閉じていれば開きます（どちらも蛇口からお湯が出る場合は当てはまりません）。浴槽アダプターにゴミがつまっていれば、歯ブラシなどで取り除きます。そのあと「ふろ自動」スイッチを押すと、エラー表示が解除されます。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-2564"
  },
  {
    "brand": "mitsubishi",
    "code": "P13",
    "title": "バイパス電動弁異常",
    "meaning": "わき上げが正常にできない状態です。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-5351"
  },
  {
    "brand": "mitsubishi",
    "code": "P16",
    "title": "ヒートポンプ配管逆接続",
    "meaning": "わき上げが正常にできない状態です。ヒートポンプ配管の水が正しく循環できていない可能性があります。冬は配管の凍結、据付直後は配管の接続の誤りやエア抜き不足の可能性があります。",
    "userAction": "エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3111"
  },
  {
    "brand": "mitsubishi",
    "code": "P17",
    "title": "高温貯湯異常",
    "meaning": "わき上げのとき、貯湯ユニットの中が目標より高い温度でわき上がった可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6731"
  },
  {
    "brand": "mitsubishi",
    "code": "P18",
    "title": "ふろ用熱交換器異常",
    "meaning": "自動ふろ運転の機能が、正常にできない状態です。",
    "callRepair": "販売店か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-7648"
  },
  {
    "brand": "mitsubishi",
    "code": "P20",
    "title": "給湯用電動混合弁異常",
    "meaning": "給湯の温度を調節する部品の不具合で、蛇口やシャワーから設定した温度のお湯が出ない状態です。給水配管専用止水栓が閉じているときや、冬に給水配管が凍結して給水されないときも、表示されることがあります。",
    "callRepair": "点検が必要です。販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-4405"
  },
  {
    "brand": "mitsubishi",
    "code": "P21",
    "title": "給湯用電動混合弁異常",
    "meaning": "給湯の温度を調節する部品の不具合で、蛇口やシャワーから設定した温度のお湯が出ない状態です。給水配管専用止水栓が閉じているときや、冬に給水配管が凍結して給水されないときも、表示されることがあります。",
    "callRepair": "点検が必要です。販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-4405"
  },
  {
    "brand": "mitsubishi",
    "code": "P24",
    "title": "入水切替弁異常（原点固着）",
    "meaning": "わき上げが正常にできない状態です。わき上げのときに動く部品の不具合の可能性があります。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6727"
  },
  {
    "brand": "mitsubishi",
    "code": "P25",
    "title": "入水切替弁異常（原点以外固着）",
    "meaning": "わき上げが正常にできない状態です。わき上げのときに動く部品の不具合の可能性があります。",
    "userAction": "使い始めて1週間以内なら、台所リモコンの「日時設定スイッチ」と「給湯温度▼スイッチ」を3秒以上同時に押して、エラーを解除します（解除の方法は機種によって違います。解除できなければ販売店に相談するか、据付工事説明書で確かめます）。",
    "callRepair": "解除しても再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6727"
  },
  {
    "brand": "mitsubishi",
    "code": "P26",
    "title": "出湯切替弁異常（原点固着）",
    "meaning": "わき上げが正常にできない状態です。わき上げのときに動く部品の不具合の可能性があります。",
    "userAction": "使い始めて1週間以内なら、台所リモコンの「日時設定スイッチ」と「給湯温度▼スイッチ」を3秒以上同時に押して、エラーを解除します（解除の方法は機種によって違います。解除できなければ販売店に相談するか、据付工事説明書で確かめます）。",
    "callRepair": "解除しても再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6727"
  },
  {
    "brand": "mitsubishi",
    "code": "P27",
    "title": "出湯切替弁異常（原点以外固着）",
    "meaning": "わき上げが正常にできない状態です。わき上げのときに動く部品の不具合の可能性があります。",
    "userAction": "使い始めて1週間以内なら、台所リモコンの「日時設定スイッチ」と「給湯温度▼スイッチ」を3秒以上同時に押して、エラーを解除します（解除の方法は機種によって違います。解除できなければ販売店に相談するか、据付工事説明書で確かめます）。",
    "callRepair": "解除しても再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6727"
  },
  {
    "brand": "mitsubishi",
    "code": "P28",
    "title": "追焚切替弁原点固着異常",
    "meaning": "自動ふろ運転や追いだきなどが、正常にできない状態です。そのときに動く部品の不具合の可能性があります。",
    "userAction": "エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6728"
  },
  {
    "brand": "mitsubishi",
    "code": "P29",
    "title": "追焚切替弁原点以外固着異常",
    "meaning": "自動ふろ運転や追いだきなどが、正常にできない状態です。そのときに動く部品の不具合の可能性があります。",
    "userAction": "エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6728"
  },
  {
    "brand": "mitsubishi",
    "code": "P30",
    "title": "ふろ循環熱源ポンプロック",
    "meaning": "自動ふろ運転の機能が、正常にできない状態です。",
    "callRepair": "販売店か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-7648"
  },
  {
    "brand": "mitsubishi",
    "code": "P31",
    "title": "ふろ循環熱源流量調整弁固着",
    "meaning": "自動ふろ運転の機能が、正常にできない状態です。",
    "callRepair": "販売店か、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-7648"
  },
  {
    "brand": "mitsubishi",
    "code": "P35",
    "title": "ふろ給湯用電磁弁閉止異常",
    "meaning": "湯はりのときに動く弁が、正常に開け閉めできていない状態です。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3130"
  },
  {
    "brand": "mitsubishi",
    "code": "P36",
    "title": "熱源ポンプ異常、ＨＰ循環ポンプ異常",
    "meaning": "貯湯ユニットの熱源ポンプ（HP循環ポンプ）の動きに異常があるときに表示されます。機種によっては、おふろの保温・追いだきや、わき上げもできないことがあります。",
    "userAction": "使い始めて1週間以内なら、台所リモコンの「日時設定スイッチ」と「給湯温度▼スイッチ」を3秒以上同時に押して、エラーを解除します（解除の方法は機種によって違います。販売店に相談するか、据付工事説明書で確かめます）。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3107"
  },
  {
    "brand": "mitsubishi",
    "code": "P37",
    "title": "ふろ循環ポンプ異常",
    "meaning": "「ふろ自動」での湯はりや追いだきに異常があるときに表示されます。冬は、ふろ配管の凍結で出ることもあります。",
    "userAction": "使い始めて1週間以内なら、台所リモコンの「日時設定スイッチ」と「給湯温度▼スイッチ」を3秒以上同時に押して、エラーを解除します（解除の方法は機種によって違います。販売店に相談するか、据付工事説明書で確かめます）。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3131"
  },
  {
    "brand": "mitsubishi",
    "code": "P60",
    "title": "UV-LEDユニット異常",
    "meaning": "キラリユキープ中に、UV-LEDユニットが点灯していない状態です。",
    "userAction": "点検・修理までの間は、取扱説明書のとおりに「キラリユキープモード」を「切」にすると、この表示を出さないようにできます（キラリユキープは動きません）。",
    "callRepair": "点検が必要です。販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8443"
  },
  {
    "brand": "mitsubishi",
    "code": "U00",
    "title": "給水温度高温異常",
    "meaning": "貯湯ユニットに給水される水の温度が高い（45℃以上のお湯が給水されている）ときに表示されます。",
    "userAction": "太陽光（ソーラー）で作られたお湯が給水されている場合は、販売店（据付工事店）に相談します。夏は給水配管が太陽熱で温まり、一時的に表示されることがあります。蛇口からしばらくお湯を出すと、消えることがあります。エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-2563"
  },
  {
    "brand": "mitsubishi",
    "code": "U03",
    "title": "ふろ配管のつぶれ (浴槽栓忘れ)",
    "meaning": "「ふろ自動」運転での湯はりに不具合があるときに表示されます。",
    "userAction": "浴槽の栓が抜けていれば閉めて、もう一度「ふろ自動」スイッチを押します。貯湯ユニットのまわりでお湯が漏れていないか（水抜き栓のゆるみなど）を確かめます。浴槽アダプターやふろ配管が汚れていれば、取扱説明書の「お手入れと点検」「ふろ配管のお手入れ」のとおりに手入れします。浴槽アダプターが三菱電機の純正品か確かめます。",
    "callRepair": "それでも表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-4416"
  },
  {
    "brand": "mitsubishi",
    "code": "U04 / U4",
    "title": "湯切れ表示",
    "meaning": "貯湯ユニットの中に、給湯できるお湯がなくなった状態です（台所リモコンの残湯量表示が「残湯なし」）。",
    "userAction": "停止日数やわき上げ休止を設定していれば解除し、「満タン」を押してわき上げます。わき上げが「少なめ」や「おまかせ」の設定で、お湯を多く使ってよく表示されるときは、「多め」に変えます。いつもよりお湯を多く使ったときや、冷めた残り湯をあたため直したときも、「満タン」を押してわき上げます。正常にわき上がると、表示は自動で消えます。",
    "callRepair": "わき上げても戻らない場合は、本体や配管からの漏れや、機器の不具合の可能性があります。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3127"
  },
  {
    "brand": "mitsubishi",
    "code": "U05 / U5",
    "title": "追いだき湯切れ",
    "meaning": "貯湯ユニットの中に、給湯できるお湯がなくなった状態です（台所リモコンの残湯量表示が「残湯なし」）。",
    "userAction": "停止日数やわき上げ休止を設定していれば解除し、「満タン」を押してわき上げます。わき上げが「少なめ」や「おまかせ」の設定で、お湯を多く使ってよく表示されるときは、「多め」に変えます。いつもよりお湯を多く使ったときや、冷めた残り湯をあたため直したときも、「満タン」を押してわき上げます。正常にわき上がると、表示は自動で消えます。",
    "callRepair": "わき上げても戻らない場合は、本体や配管からの漏れや、機器の不具合の可能性があります。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3127"
  },
  {
    "brand": "mitsubishi",
    "code": "U07",
    "title": "タンク未満水検知",
    "meaning": "貯湯ユニットの中が満水になっていない状態で、電源が「入」になっています。",
    "userAction": "取扱説明書の「こんなとき」のとおりに、貯湯ユニットを満水にします。エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "それでも表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6656"
  },
  {
    "brand": "mitsubishi",
    "code": "U09 / U9",
    "title": "湯はり試運転異常",
    "meaning": "据付直後などに、はじめての「ふろ自動」での湯はり試運転が正常にできない状態です。",
    "userAction": "浴槽に残り湯があれば、栓を抜いて排水し、もう一度「ふろ自動」で湯はり試運転をします。正常に終わり、エラーが出なければ、様子を見ながら使います。エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-3114"
  },
  {
    "brand": "mitsubishi",
    "code": "U10",
    "title": "高温水遮断形浴槽アダプター動作",
    "meaning": "浴槽が空の状態で、高温さし湯をした可能性があります。",
    "userAction": "浴槽アダプターにシャワーなどで冷たい水をかけながら、「ぬるく」スイッチを押します。アダプターが冷めたら「ふろ自動」スイッチを押し、湯はりができれば解除されます。アダプターの温度が下がるまでは再び表示されるので、表示されなくなるまで数回くり返します。",
    "callRepair": "それでも改善しない場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "appliesTo": "エコオートタイプのみ（メーカーの記載）",
    "sourceId": "mitsubishi-mitsubishi-faq-6724"
  },
  {
    "brand": "mitsubishi",
    "code": "U11",
    "title": "追いだき配管エア抜き不足",
    "meaning": "貯湯ユニット内部の追いだき配管に空気（エア）があり、追いだきができない状態です。設置直後は工事のあとのエア抜き不足、また部品の不具合の可能性もあります。",
    "userAction": "エラーの解除方法は、販売店に相談するか、据付工事説明書で確かめます。",
    "callRepair": "点検が必要です。給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6725"
  },
  {
    "brand": "mitsubishi",
    "code": "U19",
    "title": "ヒートポンプ配管循環不良",
    "meaning": "貯湯ユニットとヒートポンプユニットをつなぐヒートポンプ配管の中で、循環が悪くなっている可能性があります。",
    "userAction": "貯湯ユニットやヒートポンプユニットに水が来ていない場合は、貯湯ユニットの電源を切り、すべての蛇口を閉めて機器を満水にし、満水後に電源を入れてエア抜き運転をします。水が来ていても配管に空気が残っていると循環不良の原因になるため、エア抜き運転をします。エア抜き運転とエラー解除の方法は、販売店（据付工事店）に相談するか、据付工事説明書で確かめます。",
    "callRepair": "それでも解決しない場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それ以外は、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-6726"
  },
  {
    "brand": "mitsubishi",
    "code": "U29",
    "title": "ふろ配管循環不良",
    "meaning": "据付工事のあとの試運転の湯はりが、正常に終わっていない状態です。",
    "userAction": "おふろの栓が抜けていれば閉めて、もう一度「ふろ自動」スイッチを押します。水抜き栓のゆるみや浴槽アダプターのつまりを確かめて、もう一度「ふろ自動」スイッチを押します。給水配管専用止水栓が閉じていれば開けます。浴槽アダプターが純正品か確かめます。湯はり量の設定が少ないときは、浴槽アダプターがかくれる量にし、浴槽の残り水を排水してから、もう一度「ふろ自動」スイッチを押します。処置のあとは、エラーが解除されて使えます。",
    "callRepair": "再び表示される場合は、給水配管専用止水栓を閉じて、販売店（据付工事店）に点検・修理を依頼します。それでも解決しないときは、三菱電機の修理受付窓口に依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-9414"
  },
  {
    "brand": "mitsubishi",
    "code": "U31",
    "title": "自動浴槽栓異常",
    "meaning": "浴槽栓が閉まっていることを確認できない状態です。",
    "userAction": "浴槽栓連動に対応していない場合（特定のハウスメーカーから購入していない場合）は、スマート機能の「浴槽栓連動」の設定を「切」にします。設定の方法は取扱説明書で確かめます。一時的に湯はりするときは、「浴槽栓連動」を「切」にして、手で浴槽栓を閉めてから湯はりします。",
    "callRepair": "それでも解決しない場合は、三菱電機の修理受付窓口に点検・修理を依頼します。",
    "sourceId": "mitsubishi-mitsubishi-faq-8017"
  },
  {
    "brand": "daikin",
    "code": "740",
    "meaning": "台所リモコンと貯湯ユニット間の相互通信ができていません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=740"
  },
  {
    "brand": "daikin",
    "code": "750",
    "meaning": "ふろリモコンと貯湯ユニット間の相互通信ができていません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=750"
  },
  {
    "brand": "daikin",
    "code": "A5",
    "meaning": "凝縮温度が高温を検知したため高圧制御をしています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=A5"
  },
  {
    "brand": "daikin",
    "code": "C11",
    "meaning": "出湯温度が高温を検出したため停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C11"
  },
  {
    "brand": "daikin",
    "code": "C12",
    "meaning": "凝縮温度が高温を検知したため高圧制御をしています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C12"
  },
  {
    "brand": "daikin",
    "code": "C15",
    "meaning": "お湯はりの温度が高温を検知したため、停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C15"
  },
  {
    "brand": "daikin",
    "code": "C16",
    "meaning": "台所、洗面所、シャワーへの給湯温度が高温を検知したため、停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C16"
  },
  {
    "brand": "daikin",
    "code": "C26",
    "meaning": "給湯量が給水水量より多いと検出したため、停止しています。",
    "callRepair": "お客様が対処できることはありません。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C26"
  },
  {
    "brand": "daikin",
    "code": "C30",
    "meaning": "貯湯タンクの缶体温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C30"
  },
  {
    "brand": "daikin",
    "code": "C45",
    "meaning": "沸き上げポンプの回転数が低いため、停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C45"
  },
  {
    "brand": "daikin",
    "code": "C52",
    "meaning": "追いだき運転ができないため停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。ふろアダプタの上までお湯が入っているか確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C52"
  },
  {
    "brand": "daikin",
    "code": "C55",
    "meaning": "お湯はりに時間がかかり過ぎているため、停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C55"
  },
  {
    "brand": "daikin",
    "code": "C62",
    "meaning": "貯湯ユニット間の誤配線を検知しています。連結されている貯湯ユニットのアドレス設定が出来ていません。",
    "callRepair": "お客様が対処できることはありません。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C62"
  },
  {
    "brand": "daikin",
    "code": "C63",
    "meaning": "貯湯ユニットの連結台数が減ったことを検出しています。",
    "callRepair": "お客様が対処できることはありません。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C63"
  },
  {
    "brand": "daikin",
    "code": "C64",
    "meaning": "メインプリント基板とサブプリント基板間の相互通信ができていません。",
    "callRepair": "お客様が対処できることはありません。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C64"
  },
  {
    "brand": "daikin",
    "code": "C71",
    "meaning": "湯とり回路の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C71"
  },
  {
    "brand": "daikin",
    "code": "C72",
    "meaning": "貯湯タンクの中間層からお湯を取出す三方弁系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C72"
  },
  {
    "brand": "daikin",
    "code": "C73",
    "meaning": "漏水センサー系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C73"
  },
  {
    "brand": "daikin",
    "code": "C74",
    "meaning": "貯湯タンクと、追いだき熱交換器間を循環させるポンプの回転数が低いため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C74"
  },
  {
    "brand": "daikin",
    "code": "C75",
    "meaning": "２号機（ＨＰ２系統）に異常があることを示しています。",
    "callRepair": "お客様が対処できることはありません。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C75"
  },
  {
    "brand": "daikin",
    "code": "C76",
    "meaning": "貯湯ユニットと台所または、ふろリモコン間の相互通信ができていません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C76"
  },
  {
    "brand": "daikin",
    "code": "C77",
    "meaning": "給水（水温）の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C77"
  },
  {
    "brand": "daikin",
    "code": "C78",
    "meaning": "電源周波数を検出できていません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C78"
  },
  {
    "brand": "daikin",
    "code": "C79",
    "meaning": "ふろのお湯、水を循環させるポンプの回転数が低いため停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C79"
  },
  {
    "brand": "daikin",
    "code": "C80",
    "meaning": "貯湯タンクへの入水、出湯を循環させるポンプがエアがみのため停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。断水していないか確かめます。排水栓ツマミが「通常」の位置にあるか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C80"
  },
  {
    "brand": "daikin",
    "code": "C81",
    "meaning": "ふろのお湯、水を循環させるポンプがエアがみのため停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C81"
  },
  {
    "brand": "daikin",
    "code": "C84",
    "meaning": "混合水温の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C84"
  },
  {
    "brand": "daikin",
    "code": "C87",
    "meaning": "おゆぴかＵＶ機能動作時に、ＵＶ照射していません。おゆぴかＵＶ機能が動作していない時に、ＵＶ照射しています。（ＵＶユニットに流れる電流値が正常範囲外のため異常を検出しています）",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=C87"
  },
  {
    "brand": "daikin",
    "code": "E1",
    "meaning": "プリント基板のマイコンが正常に動作していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=E1"
  },
  {
    "brand": "daikin",
    "code": "E3",
    "meaning": "運転中に高圧圧力が上昇し過ぎたため、停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=E3"
  },
  {
    "brand": "daikin",
    "code": "E6",
    "meaning": "圧縮機の過電流を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=E6"
  },
  {
    "brand": "daikin",
    "code": "E7",
    "meaning": "ファンモータが運転しないため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。プロペラファンに異物がからんでいないか確かめます。冬は、プロペラファンに雪や氷が付いていないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=E7"
  },
  {
    "brand": "daikin",
    "code": "E8",
    "meaning": "圧縮機に過電流が流れたため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=E8"
  },
  {
    "brand": "daikin",
    "code": "EA",
    "meaning": "四路切換弁系の不具合を検出したため停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=EA"
  },
  {
    "brand": "daikin",
    "code": "EC",
    "meaning": "ヒートポンプからの出湯温度が上昇し過ぎたため、停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=EC"
  },
  {
    "brand": "daikin",
    "code": "F3",
    "meaning": "圧縮機の吐出管温度が上昇し過ぎたため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=F3"
  },
  {
    "brand": "daikin",
    "code": "F17",
    "meaning": "貯湯ユニットからの水もれを検知したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=F17"
  },
  {
    "brand": "daikin",
    "code": "F38",
    "meaning": "貯湯タンク内の残湯温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=F38"
  },
  {
    "brand": "daikin",
    "code": "F47",
    "meaning": "水もれ検知センサー系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=F47"
  },
  {
    "brand": "daikin",
    "code": "F66",
    "meaning": "お湯はり電磁弁が閉まらない状態を検知しています。お湯はりが完了してもお湯が止まらない状態です。（ふろの水位が上昇しています）",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=F66"
  },
  {
    "brand": "daikin",
    "code": "F94",
    "meaning": "ふろ水位センサ系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。ふろ配管を洗浄して確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=F94"
  },
  {
    "brand": "daikin",
    "code": "FA",
    "meaning": "高圧圧力が上昇し過ぎたため、停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=FA"
  },
  {
    "brand": "daikin",
    "code": "H0",
    "meaning": "圧縮機が運転しても電流が流れないため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H0"
  },
  {
    "brand": "daikin",
    "code": "H3",
    "meaning": "高圧圧力スイッチ系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H3"
  },
  {
    "brand": "daikin",
    "code": "H6",
    "meaning": "圧縮機の過電流検出センサーが作動したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H6"
  },
  {
    "brand": "daikin",
    "code": "H8",
    "meaning": "圧縮機の入力電流が上昇しないため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H8"
  },
  {
    "brand": "daikin",
    "code": "H9",
    "meaning": "外気の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H9"
  },
  {
    "brand": "daikin",
    "code": "H25",
    "meaning": "水流スイッチ系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。ふろ配管を洗浄して確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H25"
  },
  {
    "brand": "daikin",
    "code": "H32",
    "meaning": "給水の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H32"
  },
  {
    "brand": "daikin",
    "code": "H33",
    "meaning": "ふろの温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H33"
  },
  {
    "brand": "daikin",
    "code": "H34",
    "meaning": "給湯の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H34"
  },
  {
    "brand": "daikin",
    "code": "H35",
    "meaning": "湯とりの温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H35"
  },
  {
    "brand": "daikin",
    "code": "H37",
    "meaning": "お湯はりの温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H37"
  },
  {
    "brand": "daikin",
    "code": "H39",
    "meaning": "追いだきの温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H39"
  },
  {
    "brand": "daikin",
    "code": "H40",
    "meaning": "貯湯タンクの入水温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H40"
  },
  {
    "brand": "daikin",
    "code": "H41",
    "meaning": "貯湯タンクの出湯温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H41"
  },
  {
    "brand": "daikin",
    "code": "H42",
    "meaning": "貯湯タンクの凝縮温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H42"
  },
  {
    "brand": "daikin",
    "code": "H54",
    "meaning": "給湯方向を切換える三方弁系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H54"
  },
  {
    "brand": "daikin",
    "code": "H56",
    "meaning": "お湯と、給水とを混合させる湯はり混合弁系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H56"
  },
  {
    "brand": "daikin",
    "code": "H57",
    "meaning": "膨張水を排出する三方弁系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H57"
  },
  {
    "brand": "daikin",
    "code": "H58",
    "meaning": "給湯回路と、給水回路をバイパスさせる電磁弁系の不具合を検出したため停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H58"
  },
  {
    "brand": "daikin",
    "code": "H59",
    "meaning": "お湯と、給水を混合させる給湯混合弁系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H59"
  },
  {
    "brand": "daikin",
    "code": "H60",
    "meaning": "中間温度層のお湯を混合させる、湯とり混合弁系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H60"
  },
  {
    "brand": "daikin",
    "code": "H65",
    "meaning": "沸き上げ方向を切換える沸き上げ混合弁系の不具合を検出したため停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H65"
  },
  {
    "brand": "daikin",
    "code": "H67",
    "meaning": "ポンプ入水弁系の不具合を検出したため沸き上げ運転ができません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H67"
  },
  {
    "brand": "daikin",
    "code": "H68",
    "meaning": "ヒートポンプバイパス弁系の不具合を検出したため沸き上げ運転ができません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H68"
  },
  {
    "brand": "daikin",
    "code": "H76",
    "meaning": "貯湯ユニットと台所、ふろリモコン間の相互通信ができていません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H76"
  },
  {
    "brand": "daikin",
    "code": "H82",
    "meaning": "リモコンの時刻設定ができません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。リモコンの時刻を設定して、戻るか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H82"
  },
  {
    "brand": "daikin",
    "code": "H83",
    "meaning": "ふろの水位設定ができないため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H83"
  },
  {
    "brand": "daikin",
    "code": "H91",
    "meaning": "保安器が動作したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H91"
  },
  {
    "brand": "daikin",
    "code": "H92",
    "meaning": "貯湯タンクの缶体温度が高温を検知したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H92"
  },
  {
    "brand": "daikin",
    "code": "H97",
    "meaning": "冷却運転終了後に再び冷却運転を開始したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=H97"
  },
  {
    "brand": "daikin",
    "code": "HC",
    "meaning": "出湯の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=HC"
  },
  {
    "brand": "daikin",
    "code": "HJ",
    "meaning": "ヒートポンプからの出湯温度が上昇しないため、停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=HJ"
  },
  {
    "brand": "daikin",
    "code": "J0",
    "meaning": "冷媒調整器の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=J0"
  },
  {
    "brand": "daikin",
    "code": "J3",
    "meaning": "圧縮機の吐出管温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=J3"
  },
  {
    "brand": "daikin",
    "code": "J5",
    "meaning": "圧縮機の吸入管温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=J5"
  },
  {
    "brand": "daikin",
    "code": "J6",
    "meaning": "熱交換器の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=J6"
  },
  {
    "brand": "daikin",
    "code": "J8",
    "meaning": "入水の温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=J8"
  },
  {
    "brand": "daikin",
    "code": "JA",
    "meaning": "高圧圧力センサー系の不具合を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=JA"
  },
  {
    "brand": "daikin",
    "code": "L3",
    "meaning": "圧縮機停止時に放熱フィン温度が上昇し過ぎたため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=L3"
  },
  {
    "brand": "daikin",
    "code": "L4",
    "meaning": "圧縮機運転時に放熱フィン温度が上昇し過ぎたため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=L4"
  },
  {
    "brand": "daikin",
    "code": "L5",
    "meaning": "圧縮機に過電流が流れたため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=L5"
  },
  {
    "brand": "daikin",
    "code": "P1",
    "meaning": "三相電源が不平衡または欠相を検出したため停止しています。",
    "callRepair": "お客様が対処できることはありません。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=P1"
  },
  {
    "brand": "daikin",
    "code": "P4",
    "meaning": "放熱フィンの温度を検知しているサーミスタが、正しい温度を示していません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=P4"
  },
  {
    "brand": "daikin",
    "code": "U0",
    "meaning": "ガス欠（冷媒循環量不足）を検出しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=U0"
  },
  {
    "brand": "daikin",
    "code": "U2",
    "meaning": "インバータ電源回路の不足電圧、過電圧を検出したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=U2"
  },
  {
    "brand": "daikin",
    "code": "U4",
    "meaning": "ヒートポンプユニットと貯湯ユニット間の相互通信ができていません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=U4"
  },
  {
    "brand": "daikin",
    "code": "U7",
    "meaning": "ヒートポンプユニット内部での相互通信ができていません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=U7"
  },
  {
    "brand": "daikin",
    "code": "U22",
    "meaning": "湯はり中に注湯量が減少したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=U22"
  },
  {
    "brand": "daikin",
    "code": "U51",
    "meaning": "お湯はりに時間がかかり過ぎているため、停止しています。ふろ自動運転のあとの保温中に、ふろの栓を抜くと表示されます。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。ふろの栓が外れていないか確かめます。ふろ配管を洗浄して確かめます。ふろアダプタのオリフィスに詰まりがないか確かめます。断水していないか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=U51"
  },
  {
    "brand": "daikin",
    "code": "U53",
    "meaning": "ふろの水位が安定しないため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=U53"
  },
  {
    "brand": "daikin",
    "code": "U54",
    "meaning": "ふろに残り湯があると検知したため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=U54"
  },
  {
    "brand": "daikin",
    "code": "U61",
    "meaning": "給湯の温度が低すぎるため、停止しています。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。貯湯タンクにお湯があるか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=U61"
  },
  {
    "brand": "daikin",
    "code": "UA",
    "meaning": "リモコンと貯湯ユニットとの組合せが正しくありません。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=UA"
  },
  {
    "brand": "daikin",
    "code": "UF",
    "meaning": "入水温度が出湯温度より高いため、停止しています。冬に、蛇口からお湯が出ない・出が普段より悪い場合は、凍結の可能性があります。",
    "userAction": "ダイキンのAIチャットで、対処方法を確かめます。排水栓ツマミが「通常」の位置にあるか確かめます。",
    "callRepair": "AIチャットの対処方法を試しても改善しない場合は、不具合の可能性があります。販売店か、ダイキンに点検・修理を依頼します。",
    "sourceId": "daikin-daikin-errorcode-data",
    "url": "https://www.daikincc.com/errorcode/result/?mdl=eq&ecd=UF"
  },
  {
    "brand": "corona",
    "code": "C01",
    "title": "浴槽栓抜け検知",
    "meaning": "浴槽の栓が抜けていることを検知した表示です。浴槽の排水栓を閉め忘れて湯はりしたときや、浴槽の循環口にゴミが詰まったときなどに表示されます。",
    "userAction": "排水栓を確かめ、循環口を掃除してから、もう一度湯はりをします。",
    "callRepair": "それでもエラーが出る場合は、販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "C02",
    "title": "残り湯がある状態での湯張り検知",
    "meaning": "残り湯がある状態で湯はりしようとしたことを検知した表示です。浴槽の残り湯は追いだきできません。",
    "userAction": "残り湯を排水してから、ふろ自動運転をします。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "C03",
    "title": "貯湯量不足検知",
    "meaning": "貯湯量の不足を検知した表示です。タンクのお湯の量や温度が足りません。",
    "userAction": "「強制沸増」ボタンを押してお湯の量を確保してから、もう一度操作します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "C05",
    "title": "湯張り後湯温低下検知",
    "meaning": "湯はりのあとに湯温が下がったことを検知した表示です。",
    "userAction": "おふろのお湯を少し排水してから、追い焚きボタンを押します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "C06",
    "title": "貯湯温度低下検知",
    "meaning": "貯湯温度が下がったことを検知した表示です。",
    "userAction": "自動で沸き増しをするので、表示が消えるまで待ちます。「深夜のみモード」では自動で沸き増ししないため、「強制沸増」ボタンを押します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "C07",
    "title": "循環液不足検知",
    "meaning": "床暖房用の循環液が足りないことを検知した表示です（暖房運転は続きます）。",
    "callRepair": "販売店（工事店）に点検と循環液の補充を依頼します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E01",
    "title": "缶体サーミスタ1の故障 または 風呂保温ヒータの故障",
    "meaning": "缶体サーミスタ1の故障、または風呂保温ヒータの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E02",
    "title": "缶体サーミスタ2の故障 または HP出湯温サーミスタの故障",
    "meaning": "缶体サーミスタ2の故障、またはHP出湯温サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E03",
    "title": "缶体サーミスタ3の故障 または 水位サーミスタ2の故障",
    "meaning": "缶体サーミスタ3の故障、または水位サーミスタ2の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E04",
    "title": "缶体サーミスタ4の故障 または 水位サーミスタ3の故障",
    "meaning": "缶体サーミスタ4の故障、または水位サーミスタ3の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E05",
    "title": "缶体サーミスタ5の故障 または 水位サーミスタ4の故障",
    "meaning": "缶体サーミスタ5の故障、または水位サーミスタ4の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E06",
    "title": "缶体サーミスタ6の故障 または 水位サーミスタ5の故障",
    "meaning": "缶体サーミスタ6の故障、または水位サーミスタ5の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E07",
    "title": "缶体サーミスタ7の故障 または 水位サーミスタ6の故障",
    "meaning": "缶体サーミスタ7の故障、または水位サーミスタ6の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E08",
    "title": "ふろ湯はりサーミスタの故障",
    "meaning": "ふろ湯はりサーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E09",
    "title": "給水温サーミスタの故障",
    "meaning": "給水温サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E10",
    "title": "給湯サーミスタの故障",
    "meaning": "給湯サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E11",
    "title": "追焚検知サーミスタの故障 または ふろ往きサーミスタの故障",
    "meaning": "追焚検知サーミスタの故障、またはふろ往きサーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E12",
    "title": "給湯温度高温の故障",
    "meaning": "給湯温度高温の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E13",
    "title": "湯張電磁弁(ホッパー)の故障",
    "meaning": "湯張電磁弁(ホッパー)の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E14",
    "title": "湯張電磁弁の故障 または ふろ配管の詰まり",
    "meaning": "湯張電磁弁の故障、またはふろ配管の詰まりです。断水や、寒波による配管の凍結で表示されることがあります。",
    "userAction": "取扱説明書か、メーカーのサイト（https://www.corona.co.jp/eco/support/faq/remocon/）のとおりに、エラー表示を解除します。",
    "callRepair": "再びエラーが表示される場合は、点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E15",
    "title": "ふろサーミスタの故障",
    "meaning": "ふろサーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E16",
    "title": "湯張り高温異常の検知",
    "meaning": "湯張り高温異常の検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E17",
    "title": "HP出湯サーミスタの故障 または 凍結予防ヒータの故障",
    "meaning": "HP出湯サーミスタの故障、または凍結予防ヒータの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E18",
    "title": "HP入水温サーミスタの故障",
    "meaning": "HP入水温サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E20",
    "title": "水位センサの故障",
    "meaning": "水位センサの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E21",
    "title": "過熱防止サーモの作動",
    "meaning": "過熱防止サーモの作動を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E22",
    "title": "フロースイッチの故障",
    "meaning": "フロースイッチの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E23",
    "title": "浴槽排水栓の閉め忘れ または フロースイッチの故障",
    "meaning": "浴槽排水栓の閉め忘れ、またはフロースイッチの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E24",
    "title": "給湯ミキシング弁の故障",
    "meaning": "給湯ミキシング弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E25",
    "title": "ふろミキシング弁の故障",
    "meaning": "ふろミキシング弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E26",
    "title": "二方弁の故障",
    "meaning": "二方弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E27",
    "title": "ヒートポンプ、タンク間の通信異常検知",
    "meaning": "ヒートポンプ、タンク間の通信異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E28",
    "title": "湯張り系の故障",
    "meaning": "湯張り系の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E29",
    "title": "浴室リモコンとの通信異常検知",
    "meaning": "浴室リモコンとの通信異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E30",
    "title": "台所リモコンとの通信異常検知",
    "meaning": "台所リモコンとの通信異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E31",
    "title": "沸き上げ温度 低温検知",
    "meaning": "沸き上げ温度低温検知を示す表示です。",
    "callRepair": "設置して数日で表示された場合は、配管の確認やフィルターの点検が必要な場合があります。それ以外は点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E32",
    "title": "給湯温サーミスタ または ふろ循環温サーミスタの故障",
    "meaning": "給湯温サーミスタ、またはふろ循環温サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E33",
    "title": "給湯温度 高温検知",
    "meaning": "給湯温度高温検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E34",
    "title": "ふろ出湯温度 高温検知",
    "meaning": "ふろ出湯温度高温検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E35",
    "title": "貯湯ECU異常検知",
    "meaning": "貯湯ECU異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E36",
    "title": "沸き上げ温度 高温検知",
    "meaning": "沸き上げ温度高温検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E37",
    "title": "漏水検知",
    "meaning": "漏水検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E38",
    "title": "ヒートポンプバイパス弁の故障",
    "meaning": "ヒートポンプバイパス弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E39",
    "title": "ふろ三方弁の故障",
    "meaning": "ふろ三方弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E40",
    "title": "追いだき温度 高温検知",
    "meaning": "追いだき温度高温検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E41",
    "title": "追いだき中間温度異常検知",
    "meaning": "追いだき中間温度異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E43",
    "title": "中温水サーミスタの故障",
    "meaning": "中温水サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E44",
    "title": "中温水混合弁の故障 中温水取出弁の故障",
    "meaning": "中温水混合弁の故障、中温水取出弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E45",
    "title": "機種不適合検知",
    "meaning": "機種不適合検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E46",
    "title": "機種不適合検知",
    "meaning": "機種不適合検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E47",
    "title": "機種不適合検知",
    "meaning": "機種不適合検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E48",
    "title": "通信仕様不適合検知",
    "meaning": "通信仕様不適合検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E50",
    "title": "ヒートポンプ循環ポンプの故障",
    "meaning": "ヒートポンプ循環ポンプの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E51",
    "title": "凍結防止サーミスタの故障",
    "meaning": "凍結防止サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E52",
    "title": "ふろポンプ(循環ポンプ)の故障",
    "meaning": "ふろポンプ(循環ポンプ)の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E53",
    "title": "流量調整弁の故障",
    "meaning": "流量調整弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E54",
    "title": "浴室温度サーミスタの故障",
    "meaning": "浴室温度サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E55",
    "title": "人感センサの故障",
    "meaning": "人感センサの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E56",
    "title": "無線モジュールの通信異常",
    "meaning": "無線モジュールの通信異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E60",
    "title": "マイクロバブル加圧ポンプ２故障",
    "meaning": "マイクロバブル加圧ポンプ２故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E61",
    "title": "マイクロバブル加圧ポンプ１故障",
    "meaning": "マイクロバブル加圧ポンプ１故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E62",
    "title": "マイクロバブル回路循環不良",
    "meaning": "マイクロバブル回路循環不良を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E63",
    "title": "マイクロバブル水位電極異常",
    "meaning": "マイクロバブル水位電極異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E64",
    "title": "マイクロバブル電気回路の故障",
    "meaning": "マイクロバブル電気回路の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E65",
    "title": "マイクロバブル電装ユニットの故障",
    "meaning": "マイクロバブル電装ユニットの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E66",
    "title": "二方弁の故障",
    "meaning": "二方弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E67",
    "title": "マイクロバブル電装ユニットの通信異常",
    "meaning": "マイクロバブル電装ユニットの通信異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "E68",
    "title": "通信基板の通信異常",
    "meaning": "通信基板の通信異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H01",
    "title": "冷媒漏れ検知",
    "meaning": "冷媒漏れ検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H02",
    "title": "沸き上げ温度低温異常",
    "meaning": "沸き上げ温度低温異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H03",
    "title": "冷媒圧力高圧検知",
    "meaning": "冷媒圧力高圧検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H04",
    "title": "水熱交冷媒出口サーミスタの故障",
    "meaning": "水熱交冷媒出口サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H05",
    "title": "入水(給水)サーミスタの故障",
    "meaning": "入水(給水)サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H06",
    "title": "沸き上げサーミスタの故障",
    "meaning": "沸き上げサーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H07",
    "title": "フロスト(空気熱交出口)サーミスタの故障",
    "meaning": "フロスト(空気熱交出口)サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H08",
    "title": "エバ入り口(空気熱交入口)サーミスタの故障",
    "meaning": "エバ入り口(空気熱交入口)サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H09",
    "title": "外気温サーミスタの故障",
    "meaning": "外気温サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H10",
    "title": "水中温サーミスタの故障",
    "meaning": "水中温サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H11",
    "title": "吐出温サーミスタの故障",
    "meaning": "吐出温サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H12",
    "title": "エバ入口サーミスタ2の故障",
    "meaning": "エバ入口サーミスタ2の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H14",
    "title": "インバーター～ヒートポンプ ECU間通信異常検知",
    "meaning": "インバーター～ヒートポンプ ECU間通信異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H15",
    "title": "ファンモータの故障 または 積雪や凍結によるロック",
    "meaning": "ファンモータの故障、または積雪や凍結によるロックです。寒波で雪が吹き込んだり、ドレン水が凍ったりして、ファンが動かなくなる場合があります。",
    "userAction": "取扱説明書か、メーカーのサイト（https://www.corona.co.jp/eco/support/faq/remocon/）のとおりに、エラー表示を解除します。",
    "callRepair": "再びエラーが表示される場合は、点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H16",
    "title": "給水ポンプの故障",
    "meaning": "給水ポンプの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H17",
    "title": "沸き上げ温度高温検知",
    "meaning": "沸き上げ温度高温検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H19",
    "title": "冷媒吐出温度異常検知",
    "meaning": "冷媒吐出温度異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H20",
    "title": "沸上げ温度高温異常検知",
    "meaning": "沸上げ温度高温異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H21",
    "title": "沸上げ温度低温異常検知",
    "meaning": "沸上げ温度低温異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H22",
    "title": "水系循環異常検知 または コンブレッサ制御系の故障",
    "meaning": "水系の循環の異常、またはコンプレッサの制御系の故障です。設置してすぐに表示された場合は、エア抜き試運転の不足の可能性もあります。",
    "callRepair": "設置してすぐでなければ、点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H23",
    "title": "コンプレッサ制御系の故障",
    "meaning": "コンプレッサ制御系の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H24",
    "title": "コンプレッサ制御系の故障",
    "meaning": "コンプレッサ制御系の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H25",
    "title": "コンプレッサ制御系の故障",
    "meaning": "コンプレッサ制御系の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H26",
    "title": "コンプレッサ制御系の故障",
    "meaning": "コンプレッサ制御系の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H27",
    "title": "電源電圧異常検知",
    "meaning": "電源電圧異常検知を示す表示です。",
    "callRepair": "設置してすぐに表示された場合は、工事店が200Vの電源電圧を確かめます。それ以外は点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H28",
    "title": "コンプレッサ制御系の故障",
    "meaning": "コンプレッサ制御系の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H29",
    "title": "コンプレッサ制御系の故障",
    "meaning": "コンプレッサ制御系の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H30",
    "title": "コンプレッサ制御系の故障",
    "meaning": "コンプレッサ制御系の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H31",
    "title": "圧力センサ異常検知",
    "meaning": "圧力センサ異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H32",
    "title": "除霜電磁弁の故障 または ヒートポンプAB配管逆接続検知",
    "meaning": "除霜電磁弁の故障、またはヒートポンプAB配管逆接続検知を示す表示です。",
    "callRepair": "設置して数日で表示された場合は、配管の確認やフィルターの点検が必要な場合があります。それ以外は点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H40",
    "title": "インバータの故障",
    "meaning": "インバータの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H41",
    "title": "インバータの故障",
    "meaning": "インバータの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H44",
    "title": "インバータの故障",
    "meaning": "インバータの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "H50",
    "title": "ヒートポンプ循環系の故障",
    "meaning": "ヒートポンプ循環系の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U01",
    "title": "中温水サーミスタの故障",
    "meaning": "中温水サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U02",
    "title": "中温水取出信号異常検知",
    "meaning": "中温水取出信号異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U03",
    "title": "中温水戻り信号異常検知",
    "meaning": "中温水戻り信号異常検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U04",
    "title": "暖房往きサーミスタの故障",
    "meaning": "暖房往きサーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U05",
    "title": "熱交1次入口サーミスタの故障",
    "meaning": "熱交1次入口サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U06",
    "title": "熱交1次出口サーミスタの故障",
    "meaning": "熱交1次出口サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U07",
    "title": "熱交2次出口サーミスタの故障",
    "meaning": "熱交2次出口サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U08",
    "title": "熱交2次入口サーミスタの故障",
    "meaning": "熱交2次入口サーミスタの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U09",
    "title": "暖房1次ポンプの故障",
    "meaning": "暖房1次ポンプの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U10",
    "title": "暖房2次ポンプの故障",
    "meaning": "暖房2次ポンプの故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U11",
    "title": "中温水混合弁の故障",
    "meaning": "中温水混合弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U12",
    "title": "中温水取出弁の故障",
    "meaning": "中温水取出弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U13",
    "title": "中温水戻り弁の故障",
    "meaning": "中温水戻り弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U14",
    "title": "暖房混合弁の故障",
    "meaning": "暖房混合弁の故障を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U16",
    "title": "端末制御異常の検知",
    "meaning": "端末制御異常の検知を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U19",
    "title": "暖房切換弁1異常",
    "meaning": "暖房切換弁1異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U20",
    "title": "暖房切換弁2異常",
    "meaning": "暖房切換弁2異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U21",
    "title": "暖房戻りサーミスタ1異常",
    "meaning": "暖房戻りサーミスタ1異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U22",
    "title": "暖房戻りサーミスタ2異常",
    "meaning": "暖房戻りサーミスタ2異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U23",
    "title": "暖房戻りサーミスタ3異常",
    "meaning": "暖房戻りサーミスタ3異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U24",
    "title": "暖房戻りサーミスタ4異常",
    "meaning": "暖房戻りサーミスタ4異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U51",
    "title": "床暖房リモコン系統1通信異常",
    "meaning": "床暖房リモコン系統1通信異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U52",
    "title": "床暖房リモコン系統2通信異常",
    "meaning": "床暖房リモコン系統2通信異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U53",
    "title": "床暖房リモコン系統3通信異常",
    "meaning": "床暖房リモコン系統3通信異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  },
  {
    "brand": "corona",
    "code": "U54",
    "title": "床暖房リモコン系統4通信異常",
    "meaning": "床暖房リモコン系統4通信異常を示す表示です。",
    "callRepair": "点検または修理が必要です。販売店か、コロナサービスセンターに連絡します。",
    "sourceId": "corona-corona-error-eco"
  }
];
