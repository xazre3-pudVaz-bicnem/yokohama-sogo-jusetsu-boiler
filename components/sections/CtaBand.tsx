import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { Phrase } from "@/components/ui/Phrase";
import { isContactFormShown } from "@/lib/contact";
import { img } from "@/lib/images";
import { primaryPhone, telHref, lineUrl, receptionHours } from "@/lib/site";

/**
 * ページの最後に置く、お見積もりの案内（赤い斜めの帯。2026-10-15 の依頼で、キンライサーのような作りに変えた）。
 *
 * 問い合わせの導線は、①ヘッダー ②トップの冒頭 ③商品カード・機種のページ ④このページ末尾の案内 ⑤スマホ下部の固定ボタン。
 * 同じ案内を、本文の途中で何度も繰り返さないこと。
 * data-cta-zone は、スマホ下部の固定ボタンを隠す目印（この案内が見えているときは、固定ボタンを出さない）。
 *
 * いちばん目立つボタンは「写真を撮ってかんたん見積もり」（黄色・/contact/photo）。項目を入力するフォーム（/contact）は、その下。
 * 写真でかんたん見積もりは、メールの設定前の本番でも「LINE で送るチャット見積もり」として動くので、いつも出す。
 * 項目を入力するフォームへのボタンは、フォームが使えるときだけ出す（設定前の本番では出さない）。
 * query … 機種のページから来たとき、その機種をフォームに引き継ぐ（lib/products.ts の quoteHref と同じ形）
 */
export function CtaBand({
  title = "無料でかんたんお見積もり",
  lead = "型番のシールと給湯器の全体の写真を送っていただくと、機種の候補と費用の目安をお伝えできます。現地にうかがって、配管や排気の向き、搬入の経路を確かめたうえで、内訳の分かる見積書をお出しします。",
  id = "contact-cta",
  query,
}: {
  title?: ReactNode;
  lead?: string;
  id?: string;
  query?: string;
}) {
  const phone = primaryPhone();
  const hours = receptionHours();
  const line = lineUrl();
  const form = isContactFormShown();
  const q = query ? `?${query}` : "";
  const staff = img("ai/staff-duo");
  const mascot = img("ai/mascot-ok");

  return (
    <section aria-labelledby={`${id}-title`} data-cta-zone className="slant slant-red overflow-hidden">
      <div className="bubbles" aria-hidden="true">
        <span style={{ left: "8%", top: "22%", width: "11rem", height: "11rem", background: "rgb(255 255 255 / 0.07)" }} />
        <span style={{ right: "10%", top: "10%", width: "8rem", height: "8rem", background: "rgb(255 255 255 / 0.08)" }} />
        <span style={{ left: "38%", bottom: "6%", width: "14rem", height: "14rem", background: "rgb(255 255 255 / 0.06)" }} />
      </div>
      <Image
        src={staff.src}
        width={staff.width}
        height={staff.height}
        alt=""
        sizes="260px"
        quality={76}
        className="pointer-events-none absolute bottom-[clamp(2rem,5vw,5rem)] right-[max(0.5rem,calc(50%-38rem))] hidden h-auto w-[14rem] xl:block"
      />
      <Image
        src={mascot.src}
        width={mascot.width}
        height={mascot.height}
        alt=""
        sizes="140px"
        quality={80}
        className="pointer-events-none absolute left-[max(0.5rem,calc(50%-36rem))] top-[clamp(4rem,8vw,7rem)] hidden h-auto w-[8.5rem] lg:block"
      />
      <div className="container-x relative text-center">
        <p className="relative mx-auto inline-block rounded-full border-2 border-white px-5 py-1.5 font-heading text-[0.9375rem] font-black tracking-[0.06em] sm:text-[1.0625rem]">
          <span className="ib">横浜市・戸塚区 ／</span> <span className="ib">見積もり・現地調査は無料</span>
        </p>
        <h2 id={`${id}-title`} className="mx-auto mt-5 max-w-3xl border-y-2 border-white/70 py-3 font-heading text-[clamp(2rem,1.3rem+3.2vw,3.75rem)] font-black leading-tight tracking-[0.06em] !text-white">
          <Phrase>{title}</Phrase>
        </h2>
        <p className="mx-auto mt-5 max-w-[40rem] text-[0.9375rem] leading-[2] text-white/95">{lead}</p>

        <div className="mx-auto mt-7 flex max-w-xl flex-col gap-3">
          <Link href={`/contact/photo${q}`} className="btn btn-yellow btn-xl w-full">
            <CategoryIcon kind="camera" className="size-7" />
            写真を撮ってかんたん見積もり
            <Icon name="arrowRight" className="btn-arrow size-4" />
          </Link>
          {line && (
            <a href={line} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-lg w-full" data-cv="line">
              <LineIcon className="size-6" />
              {/* 狭い画面では、文節の切れ目で折り返す（「送っ／て」のように割れないように） */}
              <span className="text-balance">
                <span className="ib">LINE で</span>
                <span className="ib">写真を送って</span>
                <span className="ib">相談</span>
              </span>
            </a>
          )}
          {form && (
            <Link href={`/contact${q}`} className="btn btn-white w-full">
              項目を入力して見積もりを依頼
            </Link>
          )}
        </div>

        {phone && (
          <a href={telHref(phone)} className="mx-auto mt-7 block max-w-md border-y-2 border-dotted border-white/80 py-3 text-white" data-cv="tel">
            <span className="block text-[0.875rem] font-bold">お電話での無料見積もり・ご相談</span>
            <span className="mt-1 flex items-center justify-center gap-2">
              <CategoryIcon kind="phone" className="size-7" />
              <span className="num text-[clamp(1.875rem,1.5rem+1.6vw,2.5rem)] font-bold leading-none tracking-wider">{phone}</span>
            </span>
            {hours && <span className="mt-1 block text-[0.8125rem]">受付 {hours}</span>}
          </a>
        )}
      </div>
    </section>
  );
}
