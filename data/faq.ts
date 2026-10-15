import { kyutouShoene2026 as k } from "@/data/subsidy/programs";
import { isContactFormShown } from "@/lib/contact";
import { lineUrl, primaryPhone, receptionHours, siteConfig } from "@/lib/site";
import { manYen } from "@/lib/subsidy";

/**
 * よくある質問（/faq とトップページ）。
 *
 * 答えに書いてよいのは、資料で確かめられたことだけ。
 * - 会社のこと（見積もり・現地調査が無料、写真での相談、対応エリア、連絡の方法、マンションの規約の確認）は、
 *   コーポレートサイト（www.yokohama-sogo-jusetsu.com）の記載と同じ内容にする。
 * - 給湯器と補助金のことは、メーカーと国・横浜市の公式の情報にもとづく（各ページの出典を参照）。
 * - 保証の年数・工事の日数・当日の対応など、会社から聞いていないことは書かない。
 * 答えは、構造化データ（FAQPage）にもそのまま入るので、リンクや強調の記号は使わない。
 */
/** shared：ほかのページ（種類のページ・補助金のページ）にも同じ問いがあり、そちらで構造化データを出しているもの */
export type Faq = { q: string; a: string; pickup?: boolean; shared?: boolean };
export type FaqGroup = { id: string; title: string; faqs: Faq[] };

const hybridMax = manYen(k.base.hybrid + k.performanceBonus.hybrid);
const ecocuteMax = manYen(k.base.ecocute + k.performanceBonus.ecocute);

function contactAnswer(): string {
  const phone = primaryPhone();
  const hours = receptionHours();
  const ways = [`お電話${phone ? `（${phone}）` : ""}`, lineUrl() ? "LINE" : "", isContactFormShown() ? "お見積もりのフォーム" : ""].filter(Boolean);
  return `${ways.join("・")}でお受けしています。${hours ? `電話の受付時間は${hours}です。` : ""}フォームとLINEでは、給湯器の写真もお送りいただけます。`;
}

export const faqGroups: FaqGroup[] = [
  {
    id: "estimate",
    title: "ご相談・お見積もり",
    faqs: [
      {
        q: "見積もりは無料ですか。",
        a: "無料です。現地調査に伺い、設置場所や配管の状態を確かめたうえで、機器と工事の内訳が分かる見積書をお出しします。",
        pickup: true,
      },
      {
        q: "写真を送れば、おおよその内容を教えてもらえますか。",
        a: "給湯器の型番のシール（銘板）と、設置場所の全体が分かる写真をいただければ、必要になりそうな工事の内容をお伝えできます。正式なお見積もりは、現地調査のあとにお出しします。",
        pickup: true,
      },
      {
        q: "どうやって連絡すればよいですか。",
        a: contactAnswer(),
      },
      {
        q: "見積もりのあとで、金額が変わることはありますか。",
        a: "見積書は、現地調査で確かめた内容をもとにお出しします。工事を始めてから、見えなかった配管の傷みなどが見つかった場合は、内容と費用をご説明し、ご了承をいただいてから進めます。",
      },
      {
        q: "給湯器と一緒に、ほかの工事も相談できますか。",
        a: "まとめてご相談いただけます。当社は、給湯器のほか、浴室暖房乾燥機・コンロ・エアコンなどの住宅設備から、リフォームまで承っています。関係する工事をまとめて見て、順番と段取りをご提案します。",
      },
    ],
  },
  {
    id: "choose",
    title: "機種の選び方",
    faqs: [
      {
        q: "いまと同じメーカーの給湯器にしないといけませんか。",
        shared: true,
        a: "設置の形と号数が合えば、メーカーを替えることもできます。リモコンは本体と同じメーカーのものに替えるので、台所と浴室のリモコンも一緒に交換します。",
        pickup: true,
      },
      {
        q: "号数は、どう選べばよいですか。",
        a: "同時にお湯を使う場所の数と、家族の人数で選びます。号数は、水温より25℃高いお湯を、1分間に何リットル出せるかを表す数字です。いまの号数で不便がなければ、同じ号数にするのが基本です。",
      },
      {
        q: "エコジョーズにすると、何が変わりますか。",
        a: "排気の熱を回収してお湯づくりに使うため、ガスの使用量を減らせます。運転中にドレン水が出るので、その水を流す先の配管が要ります。流し先が取れない場所では、従来型を選びます。",
      },
      {
        q: "マンションでも、給湯器の交換を頼めますか。",
        a: "承っています。マンションでは、管理規約で工事の届け出や作業できる時間、機器の種類が決められていることがあります。計画の段階で、規約の内容を確かめさせてください。",
      },
    ],
  },
  {
    id: "subsidy",
    title: "補助金",
    faqs: [
      {
        q: "ガス給湯器の交換に、補助金は出ますか。",
        shared: true,
        a: `国の${k.name}の対象は、エコキュート・ハイブリッド給湯機・エネファームの3種類で、従来型のガス給湯器とエコジョーズは対象ではありません。エコジョーズは、窓などの断熱の改修と一緒に替える場合と、賃貸の集合住宅のオーナーが交換する場合に、別の制度で対象になります。`,
        pickup: true,
      },
      {
        q: "ハイブリッド給湯器とエコキュートの補助額はいくらですか。",
        a: `${k.name}で、ハイブリッド給湯器は1台${manYen(k.base.hybrid)}（性能加算の要件を満たす機種は${hybridMax}）、エコキュートは1台${manYen(k.base.ecocute)}（同じく${ecocuteMax}）です。対象は、国の対象製品リストに登録された機種です。予算の上限に達すると、期限の前でも受付が終わります。`,
      },
      {
        q: "補助金の申請は、自分でするのですか。",
        a: "制度によって違います。国の給湯省エネ2026事業は、登録された事業者が申請する仕組みです。横浜市のポイント還元の制度は、ご本人が設置の前に申請します。",
      },
    ],
  },
  {
    id: "trouble",
    title: "故障・交換の時期",
    faqs: [
      {
        q: "給湯器は、何年くらいで交換するものですか。",
        a: "ノーリツは、家庭用の給湯機器の設計上の標準使用期間を10年としています。使い方や設置の環境で変わるため、10年は寿命の約束ではありませんが、交換を考えはじめるひとつの目安になります。",
      },
      {
        q: "リモコンに「888」や「88」が出ています。故障ですか。",
        a: "リンナイ・ノーリツ・パロマとも、10年相当使った機器の点検の時期を知らせる表示で、故障ではないとしています。そのまま使えますが、各社とも点検を勧めています。",
      },
      {
        q: "ガスのにおいがするときは、どうすればよいですか。",
        a: "給湯器もほかのガス機器も使わず、火を付けたり、換気扇や電灯のスイッチに触れたりしないでください。窓を開け、ガス栓を閉めて、ご契約のガス会社の緊急の窓口へ連絡してください。",
      },
    ],
  },
  {
    id: "area",
    title: "対応エリア・会社",
    faqs: [
      {
        q: "対応エリアはどこですか。",
        a: "横浜市戸塚区を中心に、横浜市内と周辺の地域へ伺っています。神奈川県・東京都のエリアで工事を行っていますので、対応できるかどうかは、ご住所をお知らせいただければお答えします。",
        pickup: true,
      },
      {
        q: "会社はどこにありますか。",
        a: `本社は${siteConfig.offices.head.prefecture}${siteConfig.offices.head.city}、戸塚オフィスは${siteConfig.offices.totsuka.prefecture}${siteConfig.offices.totsuka.city}${siteConfig.offices.totsuka.town}にあります。`,
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);
export const pickupFaqs: Faq[] = allFaqs.filter((f) => f.pickup);
/** /faq で構造化データ（FAQPage）に入れる問い */
export const markupFaqs: Faq[] = allFaqs.filter((f) => !f.shared);
