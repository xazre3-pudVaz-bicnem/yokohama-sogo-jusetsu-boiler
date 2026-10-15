import { chintaiShoene2026, kyutouShoene2026 as k, miraiEco2026, yokohamaYgrep2026 as y } from "@/data/subsidy/programs";
import { formatDateJa } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { manYen } from "@/lib/subsidy";

/**
 * 本文の中の {{名前}} を、データの値に置き換える。
 *
 * 補助金の金額・期限は、本文に数字を直接書かず、ここにある名前で書く（例：「{{hybridBase}}が補助されます」）。
 * こうしておくと、制度が変わったときに data/subsidy/programs.ts を直すだけで、全ページの数字がそろって変わる。
 * 無い名前を書くと、ビルド時にエラーになる（書き間違いに気づけるように）。
 */
const TOKENS: Record<string, string> = {
  // 給湯省エネ2026事業：基本額・加算額
  ecocuteBase: manYen(k.base.ecocute),
  ecocuteBonus: manYen(k.performanceBonus.ecocute),
  ecocuteMax: manYen(k.base.ecocute + k.performanceBonus.ecocute),
  hybridBase: manYen(k.base.hybrid),
  hybridBonus: manYen(k.performanceBonus.hybrid),
  hybridMax: manYen(k.base.hybrid + k.performanceBonus.hybrid),
  enefarmBase: manYen(k.base.enefarm),
  removeHeater: manYen(k.removalBonus.storageHeater.amount),
  removeElectric: manYen(k.removalBonus.electricWaterHeater.amount),
  // 期限・予算
  kyutouStart: formatDateJa(k.constructionFrom),
  kyutouReserveDeadline: formatDateJa(k.reservationDeadline),
  kyutouApplyDeadline: formatDateJa(k.applicationDeadline),
  kyutouBudget: `${k.budget.totalOkuYen}億円`,
  kyutouRemovalBudget: `${k.budget.removalBonusOkuYen}億円`,
  kyutouVerifiedAt: formatDateJa(k.verifiedAt),
  hybridEffBase: `${k.hybridEfficiency.base}％`,
  hybridEffBonus: `${k.hybridEfficiency.bonus}％`,
  dispositionYears: `${k.dispositionLimitYears}年`,
  // みらいエコ住宅2026事業
  miraiHeater: manYen(miraiEco2026.waterHeater.ecocuteOrHybrid),
  miraiEcoJozu: manYen(miraiEco2026.waterHeater.ecoJozuOrEcoFeel),
  // 賃貸集合給湯省エネ2026事業
  chintaiBase: manYen(chintaiShoene2026.base.withoutReheat),
  chintaiBaseReheat: manYen(chintaiShoene2026.base.withReheat),
  chintaiBonus: manYen(chintaiShoene2026.bonus),
  // 横浜市（ポイントなどの還元）
  ygrepEcocute: `${manYen(y.points.ecocute)}分`,
  ygrepEnefarm: `${manYen(y.points.enefarm)}分`,
  ygrepFrom: formatDateJa(y.applicationFrom),
  ygrepDeadline: formatDateJa(y.applicationDeadline),
  ygrepVerifiedAt: formatDateJa(y.verifiedAt),
  // 国と横浜市の制度の確認日（同じ日なら、日付を1回だけ書く）
  bothVerifiedAt: k.verifiedAt === y.verifiedAt ? `国の制度・横浜市の制度とも${formatDateJa(k.verifiedAt)}` : `国の制度は${formatDateJa(k.verifiedAt)}、横浜市の制度は${formatDateJa(y.verifiedAt)}`,
  // 会社
  company: siteConfig.name,
  nickname: siteConfig.nickname,
  phone: siteConfig.contact.companyPhone,
};

export function fillTokens(text: string): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, name: string) => {
    const v = TOKENS[name];
    if (v === undefined) throw new Error(`本文の {{${name}}} に対応する値がありません（lib/tokens.ts）`);
    return v;
  });
}

export function tokenNames(): string[] {
  return Object.keys(TOKENS);
}
