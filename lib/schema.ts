import type { Product } from "@/data/products/types";
import { siteConfig, primaryPhone, telIntl, type OfficeKey } from "@/lib/site";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

/**
 * 構造化データ（JSON-LD）を組み立てる。
 *
 * - 値はすべて lib/site.ts と各データファイルから作る（画面の表示と食い違わないようにするため）。
 * - 未確認の項目（設立・許認可・営業時間・価格など）は、値が入るまで出力しない。
 *   存在しない口コミ・星の評価・在庫・販売価格は、絶対に足さない。
 * - 会社の実体は、コーポレートサイトと同じ @id で表す（同じ会社だと分かるようにするため）。
 *     Organization               … 法人（本社の所在地）。@id はコーポレートサイトの #organization
 *     HomeAndConstructionBusiness … 戸塚オフィス（地域の事業所）。@id はコーポレートサイトの #totsuka-office
 *     WebSite                     … このサイト（給湯器専門サイト）。publisher は上の Organization
 * - FAQPage は、そのページに実際に表示している質問だけを渡すこと。
 */

type Json = Record<string, unknown>;

const BASE = SITE_URL ?? "";
/**
 * 構造化データの URL。本番 URL があるときは絶対 URL（トップは末尾のスラッシュなし）。
 * 本番 URL が無いビルド（公開前・プレビュー。全ページ noindex）では、サイトの中のパスのまま出す（トップは "/"。空の値にしない）。
 */
const url = (path = "/") => {
  const p = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (!BASE) return p;
  return p === "/" ? BASE : `${BASE}${p}`;
};
const CORP = siteConfig.corporateUrl;

export const ORG_ID = `${CORP}/#organization`;
export const OFFICE_ID = `${CORP}/#totsuka-office`;
export const WEBSITE_ID = BASE ? `${BASE}/#website` : "/#website";

/** undefined・null・空文字・空配列のキーを落とす */
function clean<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

function postalAddress(key: OfficeKey): Json {
  const o = siteConfig.offices[key];
  // 市区を「横浜市」「戸塚区深谷町…」のように分ける（addressLocality は市、streetAddress に区以下）
  const [city, ...rest] = o.city.split(/(?<=市)/);
  const ward = rest.join("");
  return {
    "@type": "PostalAddress",
    postalCode: o.postalCode,
    addressCountry: "JP",
    addressRegion: o.prefecture,
    addressLocality: city,
    streetAddress: `${ward}${o.street}`,
  };
}

export const areaServed: Json[] = [
  { "@type": "AdministrativeArea", name: "神奈川県横浜市戸塚区" },
  { "@type": "City", name: "横浜市" },
  { "@type": "AdministrativeArea", name: "神奈川県" },
  { "@type": "AdministrativeArea", name: "東京都" },
];

function sameAs(): string[] {
  // LINE（友だち追加の URL）は入れない。会社を説明するプロフィールのページではないため
  const all: string[] = [siteConfig.social.instagram];
  return all.filter(Boolean);
}

function logo(): Json {
  return { "@type": "ImageObject", url: url("/images/brand/logo-square.png"), width: 600, height: 600 };
}

function openingHours(): Json[] | undefined {
  const c = siteConfig.contact;
  if (!c.hoursConfirmed || !c.openDays.length) return undefined;
  return [{ "@type": "OpeningHoursSpecification", dayOfWeek: c.openDays, opens: c.opens, closes: c.closes }];
}

export function organizationSchema(): Json {
  const phone = primaryPhone();
  const c = siteConfig.company;
  return clean({
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.name,
    alternateName: [siteConfig.shortName, siteConfig.nickname, siteConfig.nameEn],
    url: CORP,
    logo: logo(),
    telephone: telIntl(phone),
    email: siteConfig.contact.contactEmail,
    address: postalAddress("head"),
    foundingDate: c.founded ?? undefined,
    taxID: c.corporateNumber ?? undefined,
    founder: c.representative ? { "@type": "Person", name: c.representative, jobTitle: c.representativeTitle ?? undefined } : undefined,
    contactPoint: phone
      ? clean({
          "@type": "ContactPoint",
          telephone: telIntl(phone),
          contactType: "customer service",
          areaServed: "JP",
          availableLanguage: "Japanese",
          hoursAvailable: openingHours(),
        })
      : undefined,
    sameAs: sameAs(),
    subOrganization: { "@id": OFFICE_ID },
  });
}

/** 戸塚オフィス（地域の事業所）。knowsAbout・提供サービスは、このサイトの扱う範囲（給湯器）だけを書く */
export function localBusinessSchema(): Json {
  const phone = primaryPhone();
  return clean({
    "@type": "HomeAndConstructionBusiness",
    "@id": OFFICE_ID,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, siteConfig.nickname],
    url: CORP,
    logo: logo(),
    image: url(DEFAULT_OG_IMAGE),
    telephone: telIntl(phone),
    address: postalAddress("totsuka"),
    areaServed,
    parentOrganization: { "@id": ORG_ID },
    openingHoursSpecification: openingHours(),
    hasMap: siteConfig.gbp.mapsUrl || undefined,
    sameAs: sameAs(),
    knowsAbout: ["給湯器の交換", "ガス給湯器", "エコジョーズ", "エコキュート", "ハイブリッド給湯器", "エネファームからの給湯器交換"],
  });
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.siteName,
    alternateName: [`${siteConfig.nickname}の給湯器専門サイト`],
    url: url("/"),
    description: siteConfig.description,
    inLanguage: "ja",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: url(c.href) })),
  };
}

/** 給湯器交換のサービス（地域のページ・種類のページ） */
export function serviceSchema(s: { path: string; name: string; description: string; areaName?: string }): Json {
  return clean({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url(s.path)}#service`,
    name: s.name,
    serviceType: "給湯器の交換工事",
    description: s.description,
    url: url(s.path),
    provider: { "@id": OFFICE_ID },
    areaServed: s.areaName ? [{ "@type": "AdministrativeArea", name: s.areaName }] : areaServed,
  });
}

/** そのページに表示している質問だけを渡す */
export function faqSchema(faqs: { q: string; a: string }[]): Json | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };
}

/** 本文用の簡単な記法（[文字](リンク)・**強調**）を外して、文字だけにする */
export function plainText(s: string): string {
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

/**
 * 商品（機種のページ）。
 * - 画面に出している、公式で確かめた事実だけを書く。
 * - offers（販売価格）は、当社の販売価格が入っているときだけ出す。メーカー希望小売価格を販売価格として出さない。
 * - image は、掲載の許諾を得た製品写真があるときだけ出す。
 * - 口コミ・星の評価は出さない（実在しないため）。
 */
export function productSchema(p: Product, opts: { brandName: string; brandCompany: string; categoryName: string; description: string; path: string }): Json {
  const total = p.salesPrice;
  return clean({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url(opts.path)}#product`,
    name: `${opts.brandName} ${p.modelNumber}`,
    alternateName: p.name,
    model: p.modelNumber,
    mpn: p.modelNumber,
    category: opts.categoryName,
    description: opts.description,
    url: url(opts.path),
    brand: { "@type": "Brand", name: opts.brandName },
    manufacturer: { "@type": "Organization", name: opts.brandCompany },
    image: p.imageLicenseStatus === "permitted" && p.images.length ? p.images.map((i) => url(i.src)) : undefined,
    additionalProperty: p.specifications.slice(0, 12).map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
    offers:
      total !== null
        ? {
            "@type": "Offer",
            price: total,
            priceCurrency: "JPY",
            url: url(opts.path),
            seller: { "@id": ORG_ID },
            itemCondition: "https://schema.org/NewCondition",
            areaServed,
          }
        : undefined,
  });
}

/** 解説のページ（選び方・補助金・トラブル）。会社が書いた解説として Article で表す */
export function articleSchema(a: { path: string; title: string; description: string; publishedAt: string; updatedAt: string; section: string; keywords?: string[] }): Json {
  return clean({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url(a.path)}#article`,
    mainEntityOfPage: url(a.path),
    headline: a.title,
    description: a.description,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    inLanguage: "ja",
    articleSection: a.section,
    keywords: a.keywords?.join(", "),
    image: url(DEFAULT_OG_IMAGE),
    author: { "@type": "Organization", "@id": ORG_ID, name: siteConfig.name, url: CORP },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  });
}

export function blogPostingSchema(p: {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  image?: string;
  category: string;
  keywords: string[];
}): Json {
  return clean({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url(`/blog/${p.slug}`)}#article`,
    mainEntityOfPage: url(`/blog/${p.slug}`),
    headline: p.title,
    description: p.description,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    inLanguage: "ja",
    articleSection: p.category,
    keywords: p.keywords.join(", "),
    image: url(p.image ?? DEFAULT_OG_IMAGE),
    author: { "@type": "Organization", "@id": ORG_ID, name: p.author, url: url("/company") },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  });
}

/** 施工事例の詳細ページ（会社が書いた施工の記録として Article で表す） */
export function workArticleSchema(w: { slug: string; title: string; summary: string; images: string[]; postedAt: string; updatedAt: string; areaLabel?: string }): Json {
  return clean({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url(`/works/${w.slug}`)}#article`,
    mainEntityOfPage: url(`/works/${w.slug}`),
    headline: w.title,
    description: w.summary,
    image: w.images.map((src) => url(src)),
    datePublished: w.postedAt,
    dateModified: w.updatedAt,
    inLanguage: "ja",
    articleSection: "施工事例",
    contentLocation: w.areaLabel ? { "@type": "AdministrativeArea", name: w.areaLabel } : undefined,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  });
}

export function itemListSchema(name: string, items: { name: string; href: string }[]): Json | null {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: url(it.href) })),
  };
}

/** 複数のノードを1つの @graph にまとめる */
export function graph(...nodes: (Json | null | undefined)[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
