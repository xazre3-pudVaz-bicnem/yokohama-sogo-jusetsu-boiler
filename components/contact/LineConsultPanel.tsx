import Image from "next/image";
import { PhotoSlotFigure } from "@/components/contact/PhotoSlotFigure";
import { ProductContextNote } from "@/components/contact/ProductContext";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { img } from "@/lib/images";
import { lineUrl, primaryPhone, receptionHours, siteConfig, telHref } from "@/lib/site";

/**
 * フォームから送れないとき（本番で、メール送信の設定が済むまで）に、フォームの代わりに出す案内。
 * 動かないフォームへは誘導せず、いま使える LINE（写真をそのまま送れる）とお電話へ、確実につなぐ。
 * パソコンの方向けに、友だち追加の QR コードと ID も出す（QR は、コーポレートサイトと同じアカウントのもの）。
 */
export function LineConsultPanel({ title }: { title: string }) {
  const line = lineUrl();
  const phone = primaryPhone();
  const hours = receptionHours();
  const qr = img("brand/line-qr");
  // 手順ごとの絵：1 は LINE、2 は撮り方の見本（シールに近づいて・離れて全体）、3 は見積書
  const steps = [
    {
      title: "LINE で友だちに追加",
      body: "下のボタンを押すか、パソコンの方は QR コードをスマートフォンで読み取ります。",
      visual: <LineIcon className="size-12" />,
    },
    {
      title: "型番のシールと、全体の写真を送る",
      body: "本体のシールに近づいて1枚、1〜2m 離れて配管まで入れて1枚。トークにそのまま送れます。",
      visual: (
        // 枠の高さに合わせ、横幅が足りないときは図を縮める（図の比率は保つ）
        <span className="flex h-full w-full items-center justify-center gap-2 py-1.5">
          <PhotoSlotFigure slot="label" className="h-full w-auto max-w-[48%]" />
          <PhotoSlotFigure slot="whole" className="h-full w-auto max-w-[48%]" />
        </span>
      ),
    },
    {
      title: "機種の候補と費用の目安をお伝え",
      body: "写真から機種の候補と費用の目安をお伝えし、無料の現地調査のあとに正式なお見積もりをお出しします。",
      visual: <Icon name="clipboardCheck" className="size-12 text-brand-600" />,
    },
  ];
  return (
    <div className="rounded-xl border border-silver-200 bg-white px-5 py-6 sm:px-8 sm:py-8">
      <h2 className="h-sub flex items-center gap-2.5">
        <LineIcon className="size-7 shrink-0" />
        {title}
      </h2>
      <p className="mt-3 text-[0.9375rem] leading-[1.95]">お見積もりのご依頼は、LINE とお電話でお受けしています。LINE では、型番のシールや設置場所の写真を、そのままお送りいただけます。</p>
      <div className="mt-5">
        <ProductContextNote mode="line" />
      </div>
      <ol className="mt-2 grid gap-3 sm:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-lg bg-paper-2 px-4 py-4">
            <span className="flex h-20 items-center justify-center rounded-md bg-white px-2 sm:h-24" aria-hidden="true">
              {s.visual}
            </span>
            <p className="mt-2.5 font-heading text-[0.9375rem] font-bold text-navy-900">
              <span className="num mr-1.5 text-brand-600">{i + 1}</span>
              {s.title}
            </p>
            <p className="mt-1 text-[0.8125rem] leading-[1.8]">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 grid items-center gap-5 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="grid gap-3">
          {line && (
            <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-lg w-full" data-cv="line">
              <LineIcon className="size-6" />
              LINE で写真を送って相談する
            </a>
          )}
          {phone && (
            <a href={telHref(phone)} className="btn btn-outline w-full" data-cv="tel">
              <Icon name="phone" className="size-5" />
              <span className="num text-lg font-semibold tracking-wider">{phone}</span>
            </a>
          )}
          {hours && <p className="text-[0.8125rem] text-ink-mute">電話受付 {hours}</p>}
        </div>
        {line && (
          <div className="hidden text-center sm:block">
            <Image src={qr.src} width={128} height={128} alt="LINE 公式アカウントの友だち追加の QR コード" sizes="128px" className="mx-auto size-32 rounded-lg border border-silver-200" />
            {siteConfig.social.lineId && (
              <p className="mt-1.5 text-xs text-ink-mute">
                ID 検索：<span className="num">{siteConfig.social.lineId}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
