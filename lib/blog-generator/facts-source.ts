import { AREA_STAT_AS_OF, AREA_STAT_SOURCES, publishedAreas } from "@/data/areas";
import { categories, getCategory, installationLabels } from "@/data/categories";
import type { Product } from "@/data/products/types";
import { chintaiShoene2026 as chintai, kyutouShoene2026 as k, miraiEco2026 as mirai, yokohamaYgrep2026 as y } from "@/data/subsidy/programs";
import { works } from "@/data/works";
import { unknownModelTokens } from "@/lib/blog-generator/model-numbers";
import { getBrand, productPath, products } from "@/lib/products";
import { formatDateJa, formatYen } from "@/lib/seo";
import { contactWays, officeAddressWithPostal, primaryPhone, receptionHours, siteConfig } from "@/lib/site";
import { kyutouPhase, manYen, phaseLabel } from "@/lib/subsidy";

/**
 * 事実シートのうち、データから作る節。
 *
 * generatedFacts() … ファイル（docs/VERIFIED_FACTS.md）の「自動生成」の目印のあいだに書き出す節（npm run blog:facts）
 *   会社（lib/site.ts）・補助金の要点と各制度（data/subsidy/programs.ts）・区の統計（data/areas.ts）・
 *   掲載機種の一覧（data/products。機種ごとに1行：メーカー・型番・種類・能力・機能・設置方式・補助・希望小売価格・確認日）
 *   手で書き写すと、programs.ts を直したときに食い違いが残るため、データから作る。
 *   npm run blog:selftest が、ファイルの中身が、いまのデータから作ったものと同じかを確かめる（違えば自動投稿は止まる）。
 *
 * runtimeFacts(today) … ファイルには書かず、読み込むときに作る節
 *   subsidy-phase      … その日の、給湯省エネ2026事業の状態（日付で変わるため、ファイルに書くと古くなる）
 *   product:<機種の id> … 機種ごとの仕様・特徴（寸法・質量・効率など）。題材の機種の分だけ書き手に渡す（プロンプトを小さく保つ）
 */
export const GENERATED_BEGIN = "<!-- 自動生成ここから（npm run blog:facts で作り直す。この目印のあいだは手で書き換えない） -->";
export const GENERATED_END = "<!-- 自動生成ここまで -->";

const perUnit = (n: number) => `${manYen(n)}／台`;
const date = (iso: string) => formatDateJa(iso);

function section(title: string, id: string, checkedAt: string, sources: string[], lines: string[]): string {
  return [`## ${title}`, `id: ${id}`, `確認日: ${checkedAt}`, ...[...new Set(sources)].map((u) => `出典: ${u}`), ...lines.filter(Boolean).map((l) => `- ${l}`)].join("\n");
}

/* ------------------------------------------------------------------ */
/* ファイルに書き出す節                                                */
/* ------------------------------------------------------------------ */
function company(): string {
  const s = siteConfig;
  const o = s.subsidyOperator;
  const registration =
    o.registered === true
      ? `当社は給湯省エネ2026事業の登録事業者（給湯省エネ事業者）${o.number ? `（登録事業者番号 ${o.number}）` : ""}`
      : o.registered === false
        ? "当社は給湯省エネ2026事業の登録事業者ではない。補助金を使う場合の進め方は、お見積もりの際に個別に案内する"
        : "当社が給湯省エネ2026事業の登録事業者かどうかは確認できていない。「登録事業者です」「当社が申請します」と書かない（書いてよいのは「補助金を使ったお取り替えのご相談と、申請のサポートを承っている」まで）";
  const unknown = [
    s.company.founded ? "" : "創業・設立の年",
    s.trust.licenses ? "" : "許認可",
    s.trust.qualifications ? "" : "資格",
    s.trust.warranty ? "" : "工事の保証の年数",
    "施工の件数",
  ].filter(Boolean);
  return section("会社", "company", s.contentUpdatedAt, [s.corporateUrl], [
    `${s.name}（愛称：${s.nickname}）の「${s.siteName}」。${s.offices.totsuka.label}は${officeAddressWithPostal("totsuka")}、${s.offices.head.label}は${officeAddressWithPostal("head")}`,
    `電話 ${primaryPhone()}（受付 ${receptionHours()}${s.contact.hoursConfirmed ? "" : "。土日・祝日の受付は確認中"}）。連絡の方法は${contactWays().join("・")}で、LINE では写真をそのまま送れる`,
    "受けているのは給湯器の交換工事（ガス給湯器・エコジョーズ・エコキュート・ハイブリッド給湯器への交換と、エネファームからの交換）。修理は受けていない（メーカーの修理受付を案内する）",
    "対応地域は横浜市戸塚区を中心に、横浜市と神奈川県・東京都。お見積もりと現地調査は無料。型番のシールと設置場所の写真があると、機種の候補と工事を見込みやすい",
    `補助金を使ったお取り替えのご相談と、申請のサポートを承っている。${registration}`,
    works.length ? `給湯器の施工事例は ${works.length} 件（事例のページにあることだけを書く）` : "給湯器の施工事例は、このサイトにまだ無い（当社の事例として書けることは無い）",
    products.some((p) => p.salesPrice !== null) ? "" : "当社の販売価格・工事費は載せていない（機種のページでは「お見積もり」）",
    `確認できていない（書かない）：${unknown.join("・")}。執筆は「${s.editorial.author}」`,
  ]);
}

/** いつも渡す、補助金の要点（金額と期限）。その日の状態は runtimeFacts の subsidy-phase */
function subsidyCore(): string {
  return section("補助金の要点（いつも渡す）", "subsidy-core", k.verifiedAt, [k.urls.top, k.urls.about, y.urls.city], [
    `国の${k.name}：対象はエコキュート・ハイブリッド給湯機・エネファームの3種類。従来型のガス給湯器とエコジョーズは対象外`,
    `補助額（1台ごとの定額）：エコキュート${perUnit(k.base.ecocute)}（性能加算${perUnit(k.performanceBonus.ecocute)}）、ハイブリッド給湯機${perUnit(k.base.hybrid)}（性能加算${perUnit(k.performanceBonus.hybrid)}）、エネファーム${perUnit(k.base.enefarm)}`,
    `期限：${date(k.constructionFrom)}以降に着手した工事が対象。交付申請の予約は遅くとも${date(k.reservationDeadline)}、交付申請は遅くとも${date(k.applicationDeadline)}まで。予算の上限に達した時点で、期限の前でも終わる`,
    "対象かどうかは型番で決まる（国の「補助対象製品の検索」）。申請は、国に登録された事業者（給湯省エネ事業者）が行い、お客様が自分で申請することはできない",
    `横浜市の${y.shortName}（ポイントなどの還元）は、エコキュート（太陽光発電があることが条件）とエネファームが対象。ハイブリッド給湯器・エコジョーズは対象外`,
    `エコジョーズが補助の対象になるのは、${mirai.name}（断熱の改修と一緒に替える）と、${chintai.name}（賃貸集合住宅のオーナー）だけ`,
  ]);
}

function kyutou(): string {
  const r = k.requirements;
  return section(`${k.name}（くわしい決まり）`, "kyutou", k.verifiedAt, [k.urls.overview, k.urls.ecocute, k.urls.hybrid, k.urls.enefarm, k.urls.removalBonus, k.urls.productSearch], [
    `予算：${k.budget.totalOkuYen}億円（${k.budget.fiscal}）。うち撤去加算の目安は${k.budget.removalBonusOkuYen}億円`,
    `撤去加算：電気蓄熱暖房機を撤去すると${perUnit(k.removalBonus.storageHeater.amount)}（${k.removalBonus.storageHeater.limit}）、電気温水器を撤去すると${perUnit(k.removalBonus.electricWaterHeater.amount)}（${k.removalBonus.electricWaterHeater.limit}）。エコキュート・エネファームの撤去は対象外`,
    `性能加算を含めた額：エコキュート${perUnit(k.base.ecocute + k.performanceBonus.ecocute)}、ハイブリッド給湯機${perUnit(k.base.hybrid + k.performanceBonus.hybrid)}`,
    `台数：戸建て住宅は${k.unitLimit.detached}台まで、共同住宅は${k.unitLimit.apartment}台まで`,
    `受付：事業者の登録は${date(k.schedule.operatorRegistrationFrom)}から、交付申請は${date(k.schedule.applicationFrom)}から。予約の有効期間は${k.reservationValidity}`,
    `補助を受けた給湯器は、${k.dispositionLimitYears}年のあいだ、国や事務局の承認なしに譲ったり処分したりできない`,
    `エコキュートの要件：${r.ecocute.join("。")}。性能加算：${r.ecocuteBonus.join("。")}`,
    `ハイブリッド給湯機の要件：${r.hybrid.join("。")}。性能加算：${r.hybridBonus.join("。")}`,
    `エネファームの要件：${r.enefarm.join("。")}`,
  ]);
}

function miraiEco(): string {
  return section(`${mirai.name}（給湯器にかかわる部分）`, "mirai-eco", mirai.verifiedAt, [mirai.urls.reform, mirai.urls.waterHeater], [
    `${mirai.ministry}の事業。リフォームは、窓などの断熱の改修を含めることが条件で、給湯器だけの交換では使えない。同じ給湯器で給湯省エネ2026事業と重ねて受けられない`,
    `給湯器の補助額（1戸あたり）：エコキュート・ハイブリッド給湯機 ${manYen(mirai.waterHeater.ecocuteOrHybrid)}、エコジョーズ・エコフィール ${manYen(mirai.waterHeater.ecoJozuOrEcoFeel)}`,
    `対象製品の基準：エコジョーズは${mirai.criteria.ecoJozu}。ハイブリッド給湯機は${mirai.criteria.hybrid}。エコキュートは${mirai.criteria.ecocute}`,
    `対象の住宅：${mirai.targetHousing}。1戸あたりの上限は新築の時期で分かれる（金額は書かず、公式ページを案内する）`,
  ]);
}

function chintaiSection(): string {
  return section(chintai.name, "chintai", chintai.verifiedAt, [chintai.urls.about], [
    `対象：${chintai.target}。賃貸の集合住宅で、従来型の給湯器をエコジョーズ・エコフィールに替える工事`,
    `補助額：追いだき機能なし${perUnit(chintai.base.withoutReheat)}、追いだき機能あり${perUnit(chintai.base.withReheat)}。決められたドレン排水の工事を行うと${perUnit(chintai.bonus)}の加算。${chintai.unitLimit}。予算${chintai.budgetOkuYen}億円`,
  ]);
}

function ygrep(): string {
  return section(`横浜市の${y.name}`, "ygrep", y.verifiedAt, [y.urls.city, y.urls.site], [
    `${y.operator}の事業（${y.shortName}。${y.fiscal}）。${y.kind}`,
    `還元額：エコキュート ${manYen(y.points.ecocute)}分、エネファーム ${manYen(y.points.enefarm)}分。予算${y.budgetText}で、先着順。申請は${date(y.applicationFrom)}から${date(y.applicationDeadline)}まで`,
    `条件：${[...y.conditions.ecocute, ...y.conditions.enefarm, ...y.conditions.common].join("。")}`,
    `ハイブリッド給湯器は対象に${y.hybridCovered ? "含まれる" : "含まれない"}。国の給湯省エネ2026事業と${y.combinableWithKyutouShoene ? "併用できる" : "併用できない"}`,
    "区が独自に行う給湯器の補助は、案内を確認できていない（「区の補助がある」と書かない）",
  ]);
}

function wards(): string {
  const lines = publishedAreas.map((a) => {
    const s = a.stats;
    return `${a.shortName}：一戸建て${s.detachedPercent}%・共同住宅${s.apartmentPercent}%（6階建以上${s.sixStoryPercent}%）・1980年以前${s.upTo1980Percent}%・太陽光${s.solarPercent}%`;
  });
  return section("横浜市の区の住まい（統計）", "wards", publishedAreas.reduce((d, a) => (a.updatedAt > d ? a.updatedAt : d), "2026-10-14"), AREA_STAT_SOURCES.slice(0, 2).map((s) => s.url), [
    `令和5年住宅・土地統計調査（${AREA_STAT_AS_OF.housing}）。住宅数に対する割合。共同住宅の6階建以上は共同住宅に対する割合、1980年以前は建てられた時期、太陽光は太陽光を利用した発電機器のある住宅`,
    ...lines,
  ]);
}

const CATEGORY_IDS: Record<Product["category"], string> = { gas: "products-gas", "eco-jozu": "products-eco-jozu", ecocute: "products-ecocute", hybrid: "products-hybrid" };

/** 機種の一覧の節の id（題材の facts から参照する） */
export function productListId(category: Product["category"]): string {
  return CATEGORY_IDS[category];
}

/** 機種の仕様の節の id（読み込むときに作る節） */
export function productSectionId(p: Pick<Product, "id">): string {
  return `product:${p.id}`;
}

/** 一覧の行の補助（給湯省エネ2026事業の1台あたりの額）。対象製品のリストでの型番は、機種の詳細の節に書く */
function subsidyShort(p: Product): string {
  if (p.subsidyEligibility === "not-target" || !getCategory(p.category).kyutouShoeneTarget) return "補助の対象外";
  if (p.subsidyEligibility === "eligible" || p.subsidyEligibility === "bonus") {
    return `補助${p.subsidyAmount ? ` ${manYen(p.subsidyAmount)}` : "の対象"}（${p.subsidyEligibility === "bonus" ? "性能加算あり" : "基本額"}）`;
  }
  return p.subsidyEligibility === "not-listed" ? "補助：リストで確認できず" : "補助：確認中";
}

function msrp(p: Product): string {
  const m = p.manufacturerPrice;
  return m ? `希望小売価格 ${formatYen(m.amount)}${m.tax === "included" ? "" : "（税抜）"}` : "希望小売価格なし";
}

const housingOf = (p: Product) => p.housing.map((h) => (h === "detached" ? "戸建て" : "マンション")).join("・");

type LineCommon = { date?: string; install?: string; housing?: string; subsidy?: string };

/**
 * 一覧の1行（メーカー・型番・能力・機能・設置方式・住まい・補助・希望小売価格）。
 * 節の中で同じ値（確認日・設置方式・住まい・補助）は、節の先頭に1回だけ書き、行では省く（ファイルを小さく保つため）。
 */
function productLine(p: Product, common: LineCommon = {}): string {
  const cap = [p.capacity.tankLiters ? `${p.capacity.tankLiters}L` : "", p.capacity.gou ? `${p.capacity.gou}号` : "", p.capacity.familySize ?? ""].filter(Boolean).join("・");
  const install = installationLabels[p.installationType.key];
  const fields = [cap, p.functions.label, install === common.install ? "" : install, housingOf(p) === common.housing ? "" : housingOf(p)].filter(Boolean).join("・");
  const subsidy = subsidyShort(p) === common.subsidy ? "" : `／${subsidyShort(p)}`;
  return `${getBrand(p.brand).name} ${p.modelNumber}：${fields}${subsidy}／${msrp(p)}${common.date && p.dataVerifiedAt === common.date ? "" : `／確認 ${p.dataVerifiedAt}`}`;
}

/** みな同じ値なら、その値（違えば undefined） */
function uniform(values: string[]): string | undefined {
  return values.length && values.every((v) => v === values[0]) ? values[0] : undefined;
}

function productList(categoryId: Product["category"]): string {
  const c = categories.find((x) => x.id === categoryId)!;
  const list = products.filter((p) => p.category === categoryId);
  const checked = list.reduce((d, p) => (p.dataVerifiedAt > d ? p.dataVerifiedAt : d), "2026-10-14");
  const common: LineCommon = {
    date: checked,
    install: uniform(list.map((p) => installationLabels[p.installationType.key])),
    housing: uniform(list.map(housingOf)),
    subsidy: uniform(list.map(subsidyShort)),
  };
  // 出典はメーカーの製品の案内のページ（機種ごとの公式ページは、機種の詳細の節に付く）
  const brandUrls = [...new Set(list.map((p) => getBrand(p.brand).url))];
  const shared = [common.install ? `設置方式は${common.install}` : "", common.housing ? `住まいは${common.housing}` : "", common.subsidy ? `給湯省エネ2026事業は${common.subsidy}` : ""].filter(Boolean);
  return section(`掲載機種の一覧：${c.name}`, productListId(categoryId), checked, brandUrls, [
    `${c.name}の掲載機種は${list.length}機種（メーカーの公式情報で確かめた現行品。確認日が節と違う機種だけ行に書く）。ここに無い機種・型番は書かない`,
    shared.length ? `どの機種も${shared.join("、")}` : "",
    "補助は給湯省エネ2026事業の1台あたりの額。希望小売価格は税込のメーカー希望小売価格で、工事費を含まない。「メーカー希望小売価格」と書き、交換の総額や当社の価格として書かない",
    ...list.map((p) => productLine(p, common)),
  ]);
}

/** ファイルの自動生成の部分の全体（目印は含まない） */
export function generatedFacts(): string {
  return [company(), subsidyCore(), kyutou(), miraiEco(), chintaiSection(), ygrep(), wards(), ...categories.map((c) => productList(c.id))].join("\n\n");
}

/* ------------------------------------------------------------------ */
/* 読み込むときに作る節（ファイルには書かない）                        */
/* ------------------------------------------------------------------ */
const SPEC_LABEL = /外形寸法|質量|タンク容量|年間給湯|熱効率|号数の範囲|給湯能力|給湯圧力|運転音|暖房能力|定格電圧|消費電力$/;

function productDetail(p: Product): string {
  const b = getBrand(p.brand);
  const lines = [
    `${b.name}（${b.company}）の${getCategory(p.category).name}。シリーズ：${p.series}。製品名：${p.name}`,
    `型番：${p.modelNumber}${p.units?.length ? `（構成：${p.units.map((u) => `${u.label} ${u.model}`).join("、")}）` : ""}`,
    productLine(p),
    p.subsidyListedModel && p.subsidyListedModel !== p.modelNumber ? `補助の対象製品のリストに載っている型番：${p.subsidyListedModel}` : "",
    p.heating ? "床暖房などの温水暖房につなげる" : "",
    p.gasTypes?.length ? `ガスの種類：${p.gasTypes.join("、")}（同じ型番に都市ガス用とLPガス用がある）` : "",
    p.remotes.length ? `対応するリモコン：${p.remotes.map((r) => r.model).join("、")}` : "",
    // 書き手に渡す大きさを抑えるため、仕様は主なものを8つまで、特徴は3つ、注意は2つまで
    ...p.specifications.filter((s) => SPEC_LABEL.test(s.label)).slice(0, 8).map((s) => `${s.label}：${s.value}`),
    ...p.features.slice(0, 3).map((f) => `特徴：${f}`),
    ...(p.cautions ?? []).slice(0, 2).map((x) => `注意：${x}`),
    p.subsidyNote ? `補助の補足：${p.subsidyNote}` : "",
    `このサイトの機種のページ：${productPath(p)}`,
  ]
    .filter(Boolean)
    // このサイトに載せていない型番（耐塩害仕様の別型番・部材の品番など）を含む行は入れない（記事に書けない型番を見せないため）
    .filter((l) => unknownModelTokens(l).length === 0);
  return section(`機種の詳細：${b.name} ${p.modelNumber}`, productSectionId(p), p.dataVerifiedAt, [p.manufacturerUrl, ...p.sources.slice(0, 2)], lines);
}

/** 読み込むときに作る節（その日の制度の状態・機種ごとの仕様） */
export function runtimeFacts(today: string): string {
  const phase = kyutouPhase(new Date(`${today}T12:00:00+09:00`));
  const phaseText =
    phase === "open"
      ? `${date(today)}の時点で受付中（予算の上限に達した時点で終わる）`
      : phase === "reservation-closed"
        ? `${date(today)}の時点で、交付申請の予約は終了（交付申請は受付中）。新しく申し込む前提の書き方をしない`
        : `${date(today)}の時点で受付を終了。制度を「使える」と書かず、終わった制度の記録として扱う`;
  const phaseSection = section("その日の制度の状態", "subsidy-phase", today, [k.urls.top], [`${k.name}：${phaseLabel(phase)}。${phaseText}`]);
  return [phaseSection, ...products.map(productDetail)].join("\n\n");
}

/* ------------------------------------------------------------------ */
/* ファイルの目印                                                      */
/* ------------------------------------------------------------------ */
/** 目印の位置（終わりの目印は、始まりの目印より後ろを探す。説明の文の中に同じ文字列があっても取り違えないため） */
function markers(raw: string): { a: number; b: number } | null {
  const a = raw.indexOf(GENERATED_BEGIN);
  if (a < 0) return null;
  const b = raw.indexOf(GENERATED_END, a + GENERATED_BEGIN.length);
  if (b < 0) return null;
  // 目印が2組以上ある（作り直しの誤りで重なった）ときは、誤りとして扱う
  if (raw.indexOf(GENERATED_BEGIN, a + 1) >= 0) return null;
  return { a, b };
}

/** 事実シートの中の、自動生成の部分を取り出す（目印が無い・2組以上あるときは null） */
export function extractGeneratedBlock(raw: string): string | null {
  const m = markers(raw);
  if (!m) return null;
  return raw.slice(m.a + GENERATED_BEGIN.length, m.b).replace(/\r\n/g, "\n").trim();
}

/** 事実シートの自動生成の部分を、新しい内容に差し替える */
export function replaceGeneratedBlock(raw: string, block: string = generatedFacts()): string {
  const m = markers(raw);
  if (!m) throw new Error(`事実シートに、自動生成の目印が1組だけある状態になっていません（「${GENERATED_BEGIN}」と「${GENERATED_END}」を1組だけ置いてください）`);
  return `${raw.slice(0, m.a)}${GENERATED_BEGIN}\n\n${block}\n\n${GENERATED_END}${raw.slice(m.b + GENERATED_END.length)}`;
}
