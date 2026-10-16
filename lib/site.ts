/**
 * サイト全体の基本情報（運営会社・所在地・連絡先・SNS）を一元管理する。
 *
 * ここを書き換えれば、ヘッダー・フッター・各ページ・お見積もりフォーム・構造化データ（JSON-LD）の
 * すべてに反映される。ページやコンポーネントに電話番号や住所を直接書かないこと。
 *
 * 会社情報は、コーポレートサイト（https://www.yokohama-sogo-jusetsu.com/）と同じ表記にそろえる
 * （2026-10-14 に、公開中のコーポレートサイトの会社案内ページと突き合わせて確認）。
 * 会社情報が変わったときは、コーポレートサイトとこのファイルの両方を直す。
 *
 * 記入のルール
 * - 確認できた内容だけを書く。確認できていない項目は null / 空文字のままにする（画面にも構造化データにも出ない）。
 * - 未確認の項目の一覧は docs/TODO.md にある。
 */

/** 事業所（NAP の「A」）。表記はこの形にそろえる */
export type Office = {
  /** 画面に出す名称（本社／戸塚オフィス） */
  label: string;
  postalCode: string;
  prefecture: string;
  /** 市区（例：横浜市戸塚区） */
  city: string;
  /** 町名 */
  town: string;
  /** 町名から先（例：深谷町1665-159） */
  street: string;
};

export const siteConfig = {
  /** このサイトの名前（og:site_name・WebSite.name・ヘッダーの添え書き） */
  siteName: "横浜総合住設 給湯器専門サイト",
  /** ヘッダーのロゴに添える短い表記 */
  siteLabel: "給湯器専門サイト",

  /** 運営会社の正式な社名 */
  name: "株式会社 横浜総合住設",
  /** 社名（株式会社を除いた呼び方） */
  shortName: "横浜総合住設",
  /** 愛称。看板・チラシ・Instagram で使われている */
  nickname: "ヨコジュウ",
  nameEn: "YOKOHAMA Total Housing Solutions",

  /** サイトの説明（WebSite.description・既定の meta description） */
  description:
    "横浜市戸塚区にオフィスのある株式会社 横浜総合住設（ヨコジュウ）の給湯器専門サイトです。ガス給湯器・エコジョーズ・エコキュート・ハイブリッド給湯器の機種を型番で比べ、交換の費用の考え方と国の補助金を確かめたうえで、お見積もりをご依頼いただけます。",

  /**
   * 本番ドメイン。2026-10-16 に依頼者から「https://www.yokoju-boiler.com」と連絡を受けて設定した。
   * www ありが 200 を返し、www なし・http は www ありへ 308 で転送されることを確かめた（末尾のスラッシュは付けない）。
   * canonical・OGP・sitemap.xml・robots.txt・RSS・構造化データの URL は、すべてここ（または環境変数 NEXT_PUBLIC_SITE_URL）から作る。
   * 空のあいだは、本番も全ページ noindex になり、検索結果には出ない（next.config.ts を参照）。
   * ここに書いてよいのは、会社に確かめたドメインだけ。見込みで書かないこと。
   */
  productionUrl: "https://www.yokoju-boiler.com",

  /** コーポレートサイト（会社全体の紹介・給湯器以外の工事）。相互リンクと、構造化データの会社の URL に使う */
  corporateUrl: "https://www.yokohama-sogo-jusetsu.com",

  /** 最重要エリア（Local SEO の軸。data/areas.ts と一致させる） */
  primaryArea: {
    prefecture: "神奈川県",
    city: "横浜市",
    ward: "戸塚区",
  },

  /**
   * 連絡先（コーポレートサイトと同じ番号・受付時間）。
   * 受付時間は、hoursConfirmed が false のあいだ、画面には出すが、構造化データ（営業時間）には出さない
   * （土日祝の対応が未確認のため。コーポレートサイトと同じ扱い）。
   */
  contact: {
    companyPhone: "045-392-6959",
    /** 画面に出すメールアドレス。空なら出さない */
    contactEmail: "",
    hours: "8:00〜18:00",
    hoursDays: "平日",
    hoursConfirmed: false,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as string[],
    opens: "08:00",
    closes: "18:00",
    formNote: "送信後、内容を確認のうえ、担当者よりお電話またはメールでご連絡します。",
  },

  /** 事業所 */
  offices: {
    head: {
      label: "本社",
      postalCode: "252-0335",
      prefecture: "神奈川県",
      city: "相模原市南区",
      town: "下溝",
      street: "下溝324番地10",
    } satisfies Office,
    totsuka: {
      label: "戸塚オフィス",
      postalCode: "245-0067",
      prefecture: "神奈川県",
      city: "横浜市戸塚区",
      town: "深谷町",
      street: "深谷町1665-159",
    } satisfies Office,
  },

  /** 会社概要。null の項目は、画面にも構造化データにも出ない */
  company: {
    representative: "加太 駆" as string | null,
    representativeTitle: "代表取締役" as string | null,
    founded: null as string | null,
    capital: null as string | null,
    corporateNumber: null as string | null,
  },

  /**
   * 信頼性に関わる情報。書面（許可証・保険証券・資格者証・保証書の様式など）で確認できたものだけを書く。
   * null の項目は画面にも構造化データにも出ない。推測で埋めないこと。
   *   記入例  licenses: "建設業許可 神奈川県知事（般-◯）第◯◯◯◯◯号"
   *           qualifications: "ガス機器設置スペシャリスト（GSS）◯名／第二種電気工事士 ◯名／給水装置工事主任技術者 ◯名"
   *           warranty: "工事保証◯年（施工に起因する不具合）。機器の保証はメーカーの保証書のとおり"
   */
  trust: {
    licenses: null as string | null,
    qualifications: null as string | null,
    warranty: null as string | null,
    insurance: null as string | null,
    /** 取扱メーカーとして会社が明示したもの（未確認のため空。商品カタログのメーカーとは別に管理する） */
    authorizedMakers: [] as string[],
  },

  /**
   * 国の補助金（給湯省エネ2026事業）の登録事業者かどうか。
   * 補助金は、登録された「給湯省エネ事業者」だけが申請できる。会社に確認できるまで registered は null のままにする。
   *   null  … 未確認（「登録済み」と書かない。お見積もりの際にご案内する、という書き方にする）
   *   true  … 登録済み（number に登録事業者番号、confirmedAt に確認日を入れると、補助金のページに明記される）
   *   false … 未登録（補助金を使う場合の進め方を、個別にご案内する書き方になる）
   * 2026-10-14 に、国の公式サイトの「登録事業者の検索」（公表を希望した事業者だけが載る）で
   * 「横浜総合住設」「ヨコジュウ」を神奈川県で検索し、該当なしだった。公表していないだけの場合もあるため、未確認の扱い。
   */
  subsidyOperator: {
    registered: null as boolean | null,
    number: null as string | null,
    confirmedAt: null as string | null,
  },

  social: {
    instagram: "https://www.instagram.com/yokohamatotalhousingsolutions/",
    instagramHandle: "yokohamatotalhousingsolutions",
    /** LINE 公式アカウントの「友だち追加」の URL（コーポレートサイトと同じアカウント） */
    line: "https://lin.ee/RIQLO6n",
    /** LINE の ID（ID 検索用） */
    lineId: "@326qvkdi",
  },

  /**
   * Googleビジネスプロフィール（取得後に記入）。
   * 住所の文字列だけで地図を埋め込むと、建物の名称のカードが出てしまうため、embedUrl が入るまで地図は埋め込まない。
   */
  gbp: {
    mapsUrl: "",
    embedUrl: "",
    reviewUrl: "",
  },

  /** サイトの文章を最後に見直した日（個別の更新日を持たないページの lastmod に使う） */
  contentUpdatedAt: "2026-10-14",

  /** コラムの著者表記（「監修」とは書かない。資格のある第三者の監修ではないため） */
  editorial: {
    author: "横浜総合住設 給湯器専門サイト 編集部",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type OfficeKey = keyof typeof siteConfig.offices;

/* ------------------------------------------------------------------ */
/* 連絡先                                                              */
/* ------------------------------------------------------------------ */

/** 画面に出す代表番号。空なら空文字 */
export function primaryPhone(): string {
  return siteConfig.contact.companyPhone || "";
}

/** tel: リンク用（数字のみ） */
export function telHref(display: string = primaryPhone()): string {
  return display ? `tel:${display.replace(/[^0-9+]/g, "")}` : "";
}

/** 構造化データ用（国番号つき。例：+81-45-392-6959） */
export function telIntl(display: string = primaryPhone()): string {
  return display ? `+81-${display.replace(/^0/, "")}` : "";
}

/** LINE 公式アカウントの友だち追加の URL。LINE の URL の形をしているときだけ返す（それ以外は空文字） */
export function lineUrl(): string {
  const url: string = siteConfig.social.line;
  return /^https:\/\/(?:lin\.ee|line\.me|page\.line\.me)\//.test(url) ? url : "";
}

/**
 * 連絡方法の一覧（設定があるものだけ）。文章の中で連絡方法を並べるときは、ここから作る
 * （LINE の設定を外したときに、文章だけが残らないようにするため）。
 *   contactWays().join("、") → 「お電話、LINE、お見積もりフォーム」
 */
export function contactWays({ form = true }: { form?: boolean } = {}): string[] {
  return [primaryPhone() ? "お電話" : "", lineUrl() ? "LINE" : "", form ? "お見積もりフォーム" : ""].filter(Boolean);
}

/** 受付時間の表記（例：8:00〜18:00（平日））。未設定なら空文字 */
export function receptionHours(): string {
  const c = siteConfig.contact;
  if (!c.hours) return "";
  return c.hoursDays ? `${c.hours}（${c.hoursDays}）` : c.hours;
}

/* ------------------------------------------------------------------ */
/* 所在地                                                              */
/* ------------------------------------------------------------------ */

/** 住所（例：神奈川県横浜市戸塚区深谷町1665-159） */
export function officeAddress(key: OfficeKey): string {
  const o = siteConfig.offices[key];
  return `${o.prefecture}${o.city}${o.street}`;
}

/** 郵便番号つきの住所（例：〒245-0067 神奈川県横浜市戸塚区深谷町1665-159） */
export function officeAddressWithPostal(key: OfficeKey): string {
  return `〒${siteConfig.offices[key].postalCode} ${officeAddress(key)}`;
}

/** Googleマップのリンク。ビジネスプロフィールの URL があればそれを、無ければ住所での検索 URL を返す */
export function officeMapUrl(key: OfficeKey): string {
  if (key === "totsuka" && siteConfig.gbp.mapsUrl) return siteConfig.gbp.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress(key))}`;
}

/** コーポレートサイトのページの URL（例：corporateLink("/company")） */
export function corporateLink(path = "/"): string {
  return `${siteConfig.corporateUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
