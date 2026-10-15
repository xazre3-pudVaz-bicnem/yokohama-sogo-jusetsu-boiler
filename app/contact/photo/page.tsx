import type { Metadata } from "next";
import Link from "next/link";
import { PhotoEstimateForm } from "@/components/contact/PhotoEstimateForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isContactFormEnabled, isContactFormShown, isLabelReaderEnabled } from "@/lib/contact";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { lineUrl, primaryPhone, receptionHours, siteConfig, telHref } from "@/lib/site";

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
  const hours = receptionHours();
  const line = lineUrl();
  const shown = isContactFormShown();
  const enabled = isContactFormEnabled();
  const reader = isLabelReaderEnabled();

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

      <div className="bg-white">
        <div className="container-x section grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div className="min-w-0">
            <noscript>
              <p className="mb-6 rounded-2xl bg-paper-2 px-4 py-3 text-[0.875rem] leading-relaxed">
                この画面は JavaScript を使います。動かないときは、<Link href="/contact" className="text-link">お見積もりフォーム</Link>か、LINE・お電話でご相談ください。
              </p>
            </noscript>
            {shown ? (
              <PhotoEstimateForm note={siteConfig.contact.formNote} preview={!enabled} lineUrl={line} readerEnabled={reader} />
            ) : (
              <div className="rounded-3xl bg-paper-2 px-6 py-8 sm:px-9">
                <h2 className="h-sub">LINE で写真をお送りください</h2>
                <p className="mt-3 text-[0.9375rem] leading-[1.95]">ただいま、フォームからの送信を準備しています。LINE では、型番のシールと給湯器の全体の写真を、そのままお送りいただけます。お電話でもご相談いただけます。</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {line && (
                    <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cv="line">
                      <LineIcon className="size-6" />
                      LINE で写真を送る
                    </a>
                  )}
                  {phone && (
                    <a href={telHref(phone)} className="btn btn-outline" data-cv="tel">
                      <Icon name="phone" className="size-5" />
                      <span className="num text-lg font-semibold tracking-wider">{phone}</span>
                    </a>
                  )}
                </div>
                {hours && <p className="mt-3 text-[0.8125rem] text-ink-mute">電話受付 {hours}</p>}
              </div>
            )}
          </div>

          <aside aria-label="撮り方と、送ったあとの流れ" className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card card-line px-5 py-5">
              <p className="font-heading text-[0.9375rem] font-black text-navy-900">撮り方のポイント</p>
              <ul className="mt-3 space-y-3">
                {TIPS.map(([t, d]) => (
                  <li key={t}>
                    <p className="text-[0.875rem] font-bold text-navy-900">{t}</p>
                    <p className="mt-0.5 text-[0.8125rem] leading-[1.85]">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-cream px-5 py-5">
              <p className="font-heading text-[0.9375rem] font-black text-navy-900">送ったあとの流れ</p>
              <ol className="steps mt-4">
                <li>
                  <p className="pt-1.5 text-[0.9063rem] font-bold leading-[1.6] text-navy-900">写真を確かめます</p>
                  <p className="mt-1 text-[0.8125rem] leading-[1.85]">型番から、いまの給湯器の種類・号数・設置の形を調べます。</p>
                </li>
                <li>
                  <p className="pt-1.5 text-[0.9063rem] font-bold leading-[1.6] text-navy-900">機種の候補と費用の目安</p>
                  <p className="mt-1 text-[0.8125rem] leading-[1.85]">合う機種の候補と、費用の目安を、お電話かメールでお伝えします。</p>
                </li>
                <li>
                  <p className="pt-1.5 text-[0.9063rem] font-bold leading-[1.6] text-navy-900">現地調査（無料）・正式なお見積もり</p>
                  <p className="mt-1 text-[0.8125rem] leading-[1.85]">配管・排気の向き・搬入の経路を確かめ、内訳の分かる見積書をお出しします。</p>
                </li>
              </ol>
            </div>
            <p className="text-[0.8125rem] leading-[1.9] text-ink-mute">
              くわしく伝えたいことがあるときは、
              <Link href="/contact" className="text-link mx-0.5">
                項目の多いお見積もりフォーム
              </Link>
              もお使いいただけます。{phone ? `お急ぎのときは、お電話（${phone}）が確実です。` : ""}
            </p>
          </aside>
        </div>
      </div>

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
