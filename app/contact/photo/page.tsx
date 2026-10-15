import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LineChatEstimate } from "@/components/contact/LineChatEstimate";
import { PhotoEstimateForm } from "@/components/contact/PhotoEstimateForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isContactFormEnabled, isContactFormShown, isLabelReaderEnabled } from "@/lib/contact";
import { img } from "@/lib/images";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { lineUrl, primaryPhone, receptionHours, siteConfig } from "@/lib/site";

const PATH = "/contact/photo";

export const metadata: Metadata = buildMetadata({
  title: "写真でかんたん見積もり｜給湯器の交換（横浜市・戸塚区）",
  description:
    "給湯器の型番のシールと、本体の全体の写真を送るだけの、かんたん見積もり。入力は数分で終わります。写真から合う機種の候補と費用の目安をお伝えし、正式なお見積もりは無料の現地調査のあとにお出しします。",
  path: PATH,
  keywords: ["給湯器 見積もり 写真", "給湯器交換 写真 見積もり", "給湯器 型番 写真", "横浜市 給湯器 見積もり"],
});

const TIPS = [
  ["明るいうちに", "暗いと文字がつぶれます。夜は、懐中電灯でシールを横から照らすと読みやすくなります。"],
  ["シールは正面から、近づいて", "文字にピントが合うところまで近づきます。フラッシュの光がシールに反射しないように、少し斜めからでもかまいません。"],
  ["全体は、まわりまで入れて", "本体の下の配管、まわりの壁や床、近くの窓まで入ると、設置の形と工事の範囲が分かります。"],
  ["高い所は、無理をしない", "離れた所から撮れば十分です。本体のカバーは外さないでください。使った直後は、排気口のまわりが熱くなっていることがあります。"],
] as const;

export default function PhotoEstimatePage() {
  const phone = primaryPhone();
  const line = lineUrl();
  const shown = isContactFormShown();
  const enabled = isContactFormEnabled();
  const reader = isLabelReaderEnabled();
  const hours = receptionHours();
  const mascot = img("ai/mascot-point");
  const mascotOk = img("ai/mascot-ok");
  const logo = img("brand/logo-mark");

  const faqs = [
    {
      q: "写真だけで、正式な見積もりになりますか。",
      a: "写真からは、合う機種の候補と、費用の目安をお伝えします。配管や排気の向き、搬入の経路を現地で確かめてから、内訳の分かる正式なお見積もりをお出しします。現地調査は無料です。",
    },
    {
      q: "型番のシールが見つからない・読めないときは、どうすればよいですか。",
      a: "「シールが無い・読めない」を選んで、給湯器の全体の写真をお送りください。台所や浴室のリモコンの写真があると、機種を調べられることがあります。",
    },
    ...(reader
      ? [
          {
            q: "「写真から型番を読み取る」は、何をしていますか。",
            a: "型番のシールの写真から、型番・メーカー・製造年月の文字を AI で読み取り、入力欄に入れます。読み取りのため、その写真だけを Anthropic 社（米国）の AI のサービスに送ります。写真は保存しません。読み取った内容は、シールと同じかを、お客様に確かめていただきます。",
          },
        ]
      : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="写真でかんたん見積もり"
        title="写真を送って、給湯器のかんたん見積もり"
        lead="型番のシールと、給湯器の全体の写真を送るだけ。入力は数分で終わります。写真から、合う機種の候補と費用の目安をお伝えします。正式なお見積もりは、無料の現地調査のあとにお出しします。"
        crumbs={[
          { name: "無料見積もり", href: "/contact" },
          { name: "写真でかんたん見積もり", href: PATH },
        ]}
      />

      <div className="band band-stripes">
        <div className="container-x section-tight grid gap-x-8 gap-y-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
          {/* 左：黄色い案内（PC は貼りつく） */}
          <aside aria-label="写真でかんたん見積もりの案内" className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-pop-yellow px-5 pb-5 pt-6 text-center shadow-[0_4px_0_var(--color-pop-yellow-shadow)]">
              <p className="flex items-center justify-center gap-2 font-heading text-[1.125rem] font-black text-ink">
                <Image src={logo.src} width={logo.width} height={logo.height} alt="" sizes="40px" className="h-8 w-auto" />
                ヨコジュウ
              </p>
              <p className="mt-2 font-heading text-[clamp(1.375rem,1.1rem+1.2vw,1.75rem)] font-black leading-tight tracking-[0.04em] text-ink">
                <span className="ib">写真で</span>
                <span className="ib">かんたん見積もり</span>
              </p>
              <p className="mx-auto mt-3 flex w-fit items-center gap-1.5">
                {["見", "積", "無", "料"].map((c) => (
                  <span key={c} className="grid size-11 place-items-center bg-cta-700 font-heading text-[1.5rem] font-black text-white">
                    {c}
                  </span>
                ))}
              </p>
              <p className="mt-3 text-[0.875rem] font-bold leading-relaxed text-ink">型番のシールと、給湯器の全体の写真を送るだけ。現地調査も無料です。</p>
              <div className="mt-3 flex items-end justify-center gap-2">
                <p className="pb-2 text-left font-heading text-[0.9375rem] font-black leading-snug text-cta-800">
                  わからないことは
                  <br />
                  何でも聞いてね！
                </p>
                <Image src={mascotOk.src} width={mascotOk.width} height={mascotOk.height} alt="" sizes="110px" className="h-auto w-24" />
              </div>
            </div>
            <div className="hidden rounded-[1.25rem] bg-white px-5 py-5 lg:block">
              <p className="font-heading text-[0.9375rem] font-black text-ink">撮り方のポイント</p>
              <ul className="mt-3 space-y-3">
                {TIPS.map(([t, d]) => (
                  <li key={t}>
                    <p className="text-[0.875rem] font-bold text-ink">{t}</p>
                    <p className="mt-0.5 text-[0.8125rem] leading-[1.85]">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* 右：チャット */}
          <div className="min-w-0 rounded-[2rem] bg-[#cfe2f2] px-3 py-4 sm:px-6 sm:py-6">
            <noscript>
              <p className="mb-6 rounded-2xl bg-white px-4 py-3 text-[0.875rem] leading-relaxed">
                この画面は JavaScript を使います。動かないときは、<Link href="/contact" className="text-link">お見積もりのページ</Link>か、LINE・お電話でご相談ください。
              </p>
            </noscript>
            {shown ? (
              <PhotoEstimateForm note={siteConfig.contact.formNote} preview={!enabled} lineUrl={line} readerEnabled={reader} mascot={mascot} phone={phone} />
            ) : (
              // フォームから送れないあいだは、動かないフォームを出さず、チャットで答えた内容を LINE で送る形にする
              <LineChatEstimate mascot={mascot} lineUrl={line} lineId={siteConfig.social.lineId ?? ""} phone={phone} hours={hours} qr={img("brand/line-qr")} />
            )}
          </div>
        </div>
      </div>

      <section aria-labelledby="photo-after" className="bg-white">
        <div className="container-x section-tight grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.25rem] border-2 border-[#ececec] px-5 py-5 lg:hidden">
            <p className="font-heading text-[0.9375rem] font-black text-ink">撮り方のポイント</p>
            <ul className="mt-3 space-y-3">
              {TIPS.map(([t, d]) => (
                <li key={t}>
                  <p className="text-[0.875rem] font-bold text-ink">{t}</p>
                  <p className="mt-0.5 text-[0.8125rem] leading-[1.85]">{d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.25rem] bg-cream px-5 py-5">
            <h2 id="photo-after" className="font-heading text-[0.9375rem] font-black text-ink">
              送ったあとの流れ
            </h2>
            <ol className="steps mt-4">
              <li>
                <p className="pt-1.5 text-[0.9063rem] font-bold leading-[1.6] text-ink">写真を確かめます</p>
                <p className="mt-1 text-[0.8125rem] leading-[1.85]">型番から、いまの給湯器の種類・号数・設置の形を調べます。</p>
              </li>
              <li>
                <p className="pt-1.5 text-[0.9063rem] font-bold leading-[1.6] text-ink">機種の候補と費用の目安</p>
                <p className="mt-1 text-[0.8125rem] leading-[1.85]">合う機種の候補と、費用の目安を、{shown ? "お電話かメール" : "LINE のトークかお電話"}でお伝えします。</p>
              </li>
              <li>
                <p className="pt-1.5 text-[0.9063rem] font-bold leading-[1.6] text-ink">現地調査（無料）・正式なお見積もり</p>
                <p className="mt-1 text-[0.8125rem] leading-[1.85]">配管・排気の向き・搬入の経路を確かめ、内訳の分かる見積書をお出しします。</p>
              </li>
            </ol>
          </div>
          <p className="text-[0.8125rem] leading-[1.9] text-ink-mute lg:col-span-2">
            くわしく伝えたいことがあるときは、
            <Link href="/contact" className="text-link mx-0.5">
              項目の多いお見積もりのページ
            </Link>
            もお使いいただけます。{phone ? `お急ぎのときは、お電話（${phone}）が確実です。` : ""}
          </p>
        </div>
      </section>

      <section aria-labelledby="photo-faq" className="cv band band-mist section-tight">
        <div className="container-narrow">
          <SectionHeading id="photo-faq" eyebrow="よくある質問" title="写真でかんたん見積もりについて" className="mb-8" />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <JsonLd data={faqSchema(faqs)!} />
    </>
  );
}
