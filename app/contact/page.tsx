import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EstimateForm } from "@/components/contact/EstimateForm";
import { LineChatEstimate } from "@/components/contact/LineChatEstimate";
import { PhotoSlotFigure } from "@/components/contact/PhotoSlotFigure";
import { Figure } from "@/components/diagram/Figures";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isContactFormEnabled, isContactFormShown } from "@/lib/contact";
import { PHOTO_RULES } from "@/lib/contact-fields";
import { img } from "@/lib/images";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, primaryPhone, telHref, lineUrl, receptionHours } from "@/lib/site";

const PATH = "/contact";

export const metadata: Metadata = buildMetadata({
  title: "給湯器の無料見積もり・ご相談（横浜市・戸塚区）",
  description:
    "給湯器の交換の無料見積もりフォームです。いまお使いの給湯器の型番と写真をお送りいただくと、合う機種と費用の内訳をお出しします。お電話・LINE でもご相談いただけます。現地調査も無料です。",
  path: PATH,
  keywords: ["給湯器 見積もり 横浜", "給湯器交換 無料見積もり", "戸塚区 給湯器 見積もり"],
});

const FAQS = [
  {
    q: "見積もりだけでも、お願いできますか。",
    a: "お見積もりと現地調査は無料です。金額と内容を見てから、ご依頼いただくかどうかを決めてください。ほかの会社のお見積もりと比べていただいてもかまいません。",
  },
  {
    q: "型番が分かりません。どうすればよいですか。",
    a: "本体の正面か側面に貼ってあるシール（銘板）の写真を、そのままお送りください。シールが読めない、見つからないときは、本体の全体とリモコンの写真があれば、機種を調べられることがあります。",
  },
  {
    q: "写真は、何を撮ればよいですか。",
    a: "型番のシール、本体の全体（配管とまわりの壁・地面が入るもの）、台所と浴室のリモコンの3つです。マンションの場合は、給湯器の入っている扉を開けた状態と、閉めた状態の両方があると、設置の形を確かめられます。",
  },
  {
    q: "補助金を使いたい場合は、どう伝えればよいですか。",
    a: "フォームの「補助金のご相談」で、相談したいことをお選びください。対象になるのは、エコキュート・ハイブリッド給湯器などの、国のリストに登録された機種です。お選びの機種が対象かどうかを、お見積もりの際にお伝えします。",
  },
];

export default function ContactPage() {
  const phone = primaryPhone();
  const hours = receptionHours();
  const line = lineUrl();
  const shown = isContactFormShown();
  const enabled = isContactFormEnabled();
  const qr = img("brand/line-qr");

  return (
    <>
      <PageHero
        eyebrow="無料見積もり"
        title="給湯器の無料見積もり・ご相談"
        lead="いまお使いの給湯器の型番と、設置されている場所の写真があると、合う機種と費用の内訳を早くお出しできます。お見積もりと現地調査は無料です。"
        crumbs={[{ name: "無料見積もり", href: PATH }]}
      />

      <div className="bg-white">
        <div className="container-x section grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          {/* フォーム */}
          <div className="min-w-0">
            {shown && (
              <Link href="/contact/photo" className="card card-line group mb-10 flex items-center gap-5 px-5 py-5 sm:px-7">
                <PhotoSlotFigure slot="label" className="hidden h-auto w-28 shrink-0 sm:block" />
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[1.0625rem] font-black text-navy-900 group-hover:text-brand-700">写真でかんたん見積もり</span>
                  <span className="mt-1 block text-[0.8438rem] leading-[1.85]">型番のシールと給湯器の全体の写真を送るだけ。入力の項目が少なく、スマートフォンならその場で撮って送れます。</span>
                </span>
                <span className="arrow-dot">
                  <Icon name="arrowRight" className="size-3.5" />
                </span>
              </Link>
            )}
            {shown ? (
              <EstimateForm note={siteConfig.contact.formNote} preview={!enabled} lineUrl={line} />
            ) : (
              // フォームから送れないあいだは、動かないフォームを出さず、チャットで答えた内容を LINE で送る形にする
              <div className="rounded-[2rem] bg-[#cfe2f2] px-3 py-4 sm:px-6 sm:py-6">
                <LineChatEstimate mascot={img("ai/mascot-point")} lineUrl={line} lineId={siteConfig.social.lineId ?? ""} phone={phone} hours={hours} qr={qr} />
              </div>
            )}
          </div>

          {/* ほかの連絡方法 */}
          <aside aria-label="お電話・LINE でのご相談" className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {phone && (
              <div className="card card-line px-5 py-5">
                <p className="font-heading text-[0.9375rem] font-black text-navy-900">お電話でのご相談</p>
                <a href={telHref(phone)} className="num mt-2 block text-[1.75rem] font-semibold leading-none tracking-wider text-navy-900 hover:text-brand-700" data-cv="tel">
                  {phone}
                </a>
                {hours && <p className="mt-2 text-[0.8125rem] text-ink-mute">受付 {hours}</p>}
                <p className="mt-3 text-[0.8125rem] leading-[1.85]">お湯が出ないなど、お急ぎのときはお電話が確実です。いまの給湯器のメーカーと、分かれば型番をお伝えください。</p>
              </div>
            )}
            {line && (
              <div className="card card-line px-5 py-5">
                <p className="flex items-center gap-2 font-heading text-[0.9375rem] font-black text-navy-900">
                  <LineIcon className="size-6" />
                  LINE で写真を送る
                </p>
                <p className="mt-2 text-[0.8125rem] leading-[1.85]">友だちに追加して、型番のシールと本体の写真をお送りください。トークでそのままご相談いただけます。</p>
                <div className="mt-4 flex items-center gap-4">
                  <Image src={qr.src} width={104} height={104} alt="LINE 公式アカウントの友だち追加の QR コード" sizes="104px" className="hidden size-[6.5rem] rounded-lg border border-silver-200 lg:block" />
                  <div>
                    <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" data-cv="line">
                      友だちに追加する
                    </a>
                    {siteConfig.social.lineId && (
                      <p className="mt-2 text-xs text-ink-mute">
                        ID 検索：<span className="num">{siteConfig.social.lineId}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="rounded-xl bg-cream px-5 py-5">
              <p className="font-heading text-[0.9375rem] font-black text-navy-900">お見積もりまでの流れ</p>
              <ol className="steps mt-4">
                <li>
                  <p className="pt-1.5 text-[0.9063rem] font-bold leading-[1.6] text-navy-900">ご連絡</p>
                  <p className="mt-1 text-[0.8125rem] leading-[1.85]">フォーム・LINE・お電話で、いまの給湯器の情報をお知らせください。</p>
                </li>
                <li>
                  <p className="pt-1.5 text-[0.9063rem] font-bold leading-[1.6] text-navy-900">機種のご提案・現地調査</p>
                  <p className="mt-1 text-[0.8125rem] leading-[1.85]">合う機種の候補をお伝えし、配管・排気の向き・搬入の経路を現地で確かめます。</p>
                </li>
                <li>
                  <p className="pt-1.5 text-[0.9063rem] font-bold leading-[1.6] text-navy-900">お見積もり</p>
                  <p className="mt-1 text-[0.8125rem] leading-[1.85]">本体・リモコン・工事・撤去処分を分けた見積書をお出しします。</p>
                </li>
              </ol>
              <Link href="/flow" className="link-arrow mt-3 !text-sm">
                交換工事の流れ
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* 写真の撮り方 */}
      <section aria-labelledby="contact-photo" className="cv band band-mist section-tight">
        <div className="container-x">
          <SectionHeading
            id="contact-photo"
            eyebrow="写真の送り方"
            title="型番のシールと、本体の全体が写った写真をお送りください"
            lead={`フォームには${PHOTO_RULES.maxFiles}枚まで添えられます（送る前に、自動で小さくします）。枚数が多いとき、動画で見せたいときは、LINE が便利です。写真は、お見積もりのためだけに使い、このサイトのサーバーには保存しません。`}
            className="mb-9"
          />
          <Figure name="label-location" />
        </div>
      </section>

      <section aria-labelledby="contact-faq" className="cv bg-white">
        <div className="container-narrow section-tight">
          <SectionHeading id="contact-faq" eyebrow="よくある質問" title="お見積もりについての質問" className="mb-8" />
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <JsonLd data={faqSchema(FAQS)!} />
    </>
  );
}
