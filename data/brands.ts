import logoRecords from "@/data/brand-logos.json";
import type { Brand, BrandLogo } from "@/data/products/types";

/**
 * メーカー（商品カタログに載せるもの）。並びは、ガス給湯器・ハイブリッド → エコキュート の順。
 * summary は、メーカーの公式サイトで確かめられる事実だけ（「人気」「おすすめ」のような評価は書かない）。
 * imagePolicy は、製品写真・ロゴの利用の許可について確かめたこと（docs/IMAGE_SOURCES.md と同じ内容）。
 * logo は、公式ロゴのファイル。記録は data/brand-logos.json（scripts/apply-image-manifests.ts が、取得の記録から作る）。
 */
const brandData: Omit<Brand, "logo">[] = [
  {
    id: "rinnai",
    name: "リンナイ",
    nameEn: "Rinnai",
    company: "リンナイ株式会社",
    url: "https://rinnai.jp/products/waterheater/",
    summary: "ガス給湯器（エコジョーズ・従来型）と、ハイブリッド給湯・暖房システム「ECO ONE（エコワン）」をつくっています。",
    categories: ["eco-jozu", "gas", "hybrid"],
    imagePolicy: {
      status: "permitted",
      note: "2026-10-15、横浜総合住設から「メーカーの製品写真・ロゴの使用許可を取得済み」との連絡を受けて、掲載を始めた（許可の書面と条件は会社で保管する）。使うのは、メーカーの公式サイト・公式資料の写真とロゴだけで、縮小と形式の変換のほかは加工しない。公式サイトの規約では、許可なしの転載は禁止されている（許可の範囲が変わったら、ここと docs/IMAGE_SOURCES.md を直す）。",
      termsUrl: "https://www.rinnai.jp/site_policy/",
      checkedAt: "2026-10-15",
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
      status: "permitted",
      note: "2026-10-15、横浜総合住設から「メーカーの製品写真・ロゴの使用許可を取得済み」との連絡を受けて、掲載を始めた（許可の書面と条件は会社で保管する）。使うのは、メーカーの公式サイト・公式資料の写真とロゴだけで、縮小と形式の変換のほかは加工しない。公式サイトの規約では、許可なしの転載は禁止されている（許可の範囲が変わったら、ここと docs/IMAGE_SOURCES.md を直す）。",
      termsUrl: "https://www.noritz.co.jp/policy/",
      checkedAt: "2026-10-15",
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
      status: "permitted",
      note: "2026-10-15、横浜総合住設から「メーカーの製品写真・ロゴの使用許可を取得済み」との連絡を受けて、掲載を始めた（許可の書面と条件は会社で保管する）。使うのは、メーカーの公式サイト・公式資料の写真とロゴだけで、縮小と形式の変換のほかは加工しない。公式サイトの規約では、許可なしの転載は禁止されている（許可の範囲が変わったら、ここと docs/IMAGE_SOURCES.md を直す）。",
      termsUrl: "https://www.paloma.co.jp/downloads/index.html",
      checkedAt: "2026-10-15",
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
      status: "permitted",
      note: "2026-10-15、横浜総合住設から「メーカーの製品写真・ロゴの使用許可を取得済み」との連絡を受けて、掲載を始めた（許可の書面と条件は会社で保管する）。使うのは、メーカーの公式サイト・公式資料の写真とロゴだけで、縮小と形式の変換のほかは加工しない。公式サイトの規約では、許可なしの転載は禁止されている（許可の範囲が変わったら、ここと docs/IMAGE_SOURCES.md を直す）。",
      termsUrl: "https://www.mitsubishielectric.co.jp/ja/terms/",
      checkedAt: "2026-10-15",
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
      status: "permitted",
      note: "2026-10-15、横浜総合住設から「メーカーの製品写真・ロゴの使用許可を取得済み」との連絡を受けて、掲載を始めた（許可の書面と条件は会社で保管する）。使うのは、メーカーの公式サイト・公式資料の写真とロゴだけで、縮小と形式の変換のほかは加工しない。公式サイトの規約では、許可なしの転載は禁止されている（許可の範囲が変わったら、ここと docs/IMAGE_SOURCES.md を直す）。",
      termsUrl: "https://www2.panasonic.biz/jp/sumai/gazou/",
      checkedAt: "2026-10-15",
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
      status: "permitted",
      note: "2026-10-15、横浜総合住設から「メーカーの製品写真・ロゴの使用許可を取得済み」との連絡を受けて、掲載を始めた（許可の書面と条件は会社で保管する）。使うのは、メーカーの公式サイト・公式資料の写真とロゴだけで、縮小と形式の変換のほかは加工しない。公式サイトの規約では、許可なしの転載は禁止されている（許可の範囲が変わったら、ここと docs/IMAGE_SOURCES.md を直す）。",
      termsUrl: "https://www.daikin.co.jp/policy",
      checkedAt: "2026-10-15",
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
      status: "permitted",
      note: "2026-10-15、横浜総合住設から「メーカーの製品写真・ロゴの使用許可を取得済み」との連絡を受けて、掲載を始めた（許可の書面と条件は会社で保管する）。使うのは、メーカーの公式サイト・公式資料の写真とロゴだけで、縮小と形式の変換のほかは加工しない。公式サイトの規約では、許可なしの転載は禁止されている（許可の範囲が変わったら、ここと docs/IMAGE_SOURCES.md を直す）。",
      termsUrl: "https://www.corona.co.jp/website/index.html",
      checkedAt: "2026-10-15",
    },
  },
];

const logos = logoRecords as Record<string, BrandLogo>;

export const brands: Brand[] = brandData.map((b) => ({ ...b, logo: logos[b.id] ?? null }));
