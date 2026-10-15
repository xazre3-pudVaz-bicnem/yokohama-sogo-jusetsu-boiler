import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { Illust } from "@/components/ui/Photo";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, primaryPhone, telHref, lineUrl, receptionHours } from "@/lib/site";

/** 送信完了の画面。検索結果には出さない（noindex）。フォームの送信後に、ここへ移る */
export const metadata: Metadata = buildMetadata({
  title: "お見積もりのご依頼を受け付けました",
  description: "お見積もりのご依頼を受け付けました。内容を確認のうえ、担当者よりご連絡します。",
  path: "/contact/thanks",
  noindex: true,
});

export default function ThanksPage() {
  const phone = primaryPhone();
  const hours = receptionHours();
  const line = lineUrl();
  return (
    <div className="bg-white">
      <div className="container-narrow section">
        <div className="card-pop border border-silver-200 px-6 py-10 sm:px-12 sm:py-12">
          <div className="flex items-start gap-5">
            <div className="flex-1">
              <p className="mb-5 flex">
                <span className="pill">送信が完了しました</span>
              </p>
              <h1 className="h-page">お見積もりのご依頼を受け付けました</h1>
              <p className="mt-5 text-[0.9688rem] leading-[2]">{siteConfig.contact.formNote}お急ぎの場合は、お電話でもご連絡ください。</p>
            </div>
            <Illust image="illust/pose-ok" width={112} className="hidden h-auto w-28 shrink-0 sm:block" />
          </div>

          <div className="mt-8 rounded-2xl bg-paper-2 px-5 py-5">
            <h2 className="font-heading text-[0.9688rem] font-black text-navy-900">このあとの流れ</h2>
            <ol className="steps mt-4">
              <li>
                <p className="pt-1.5 text-[0.9375rem] font-bold leading-[1.6] text-navy-900">担当者からご連絡します</p>
                <p className="mt-1 text-[0.875rem] leading-[1.9]">ご入力の内容と写真を確認し、お電話かメールでご連絡します。</p>
              </li>
              <li>
                <p className="pt-1.5 text-[0.9375rem] font-bold leading-[1.6] text-navy-900">機種のご提案と、現地調査の日程のご相談</p>
                <p className="mt-1 text-[0.875rem] leading-[1.9]">合う機種の候補をお伝えし、設置場所を確かめる日を決めます。</p>
              </li>
              <li>
                <p className="pt-1.5 text-[0.9375rem] font-bold leading-[1.6] text-navy-900">お見積もり</p>
                <p className="mt-1 text-[0.875rem] leading-[1.9]">本体・リモコン・工事・撤去処分を分けた見積書をお出しします。</p>
              </li>
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {line && (
              <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-outline" data-cv="line">
                <LineIcon className="size-6" />
                追加の写真を LINE で送る
              </a>
            )}
            {phone && (
              <a href={telHref(phone)} className="btn btn-outline" data-cv="tel">
                <Icon name="phone" className="size-5" />
                <span className="num text-base font-semibold tracking-wider">{phone}</span>
              </a>
            )}
          </div>
          {hours && <p className="mt-2 text-[0.8125rem] text-ink-mute">電話受付 {hours}</p>}

          <p className="mt-9 flex flex-wrap gap-x-7 gap-y-2 border-t-2 border-dotted border-silver-300 pt-6">
            <Link href="/" className="link-arrow">
              トップページへ
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link href="/subsidy" className="link-arrow">
              補助金を確かめる
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link href="/flow" className="link-arrow">
              交換工事の流れ
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
