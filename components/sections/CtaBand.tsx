import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LineIcon } from "@/components/ui/LineIcon";
import { Phrase } from "@/components/ui/Phrase";
import { isContactFormShown } from "@/lib/contact";
import { primaryPhone, telHref, lineUrl, receptionHours } from "@/lib/site";

/**
 * ページの最後に置く、お見積もりの案内（濃紺の帯に、白いパネルで連絡の方法を並べる）。
 *
 * 問い合わせの導線は、①ヘッダー ②トップの冒頭 ③商品カード・機種のページ ④このページ末尾の案内 ⑤スマホ下部の固定ボタン。
 * 同じ案内を、本文の途中で何度も繰り返さないこと。
 * data-cta-zone は、スマホ下部の固定ボタンを隠す目印（この案内が見えているときは、固定ボタンを出さない）。
 *
 * いちばん上のボタンは「写真でかんたん見積もり」（/contact/photo）。項目を入力するフォーム（/contact）は、その下。
 * フォームが使えないあいだ（メールの設定前の本番）は、フォームへのボタンを出さず、LINE と電話を案内する。
 * query … 機種のページから来たとき、その機種をフォームに引き継ぐ（lib/products.ts の quoteHref と同じ形）
 */
export function CtaBand({
  title = "無料見積もり・ご相談",
  lead = "お見積もりは無料です。型番のシールと給湯器の全体の写真を送っていただくと、機種の候補と費用の目安をお伝えできます。現地にうかがって、配管や排気の向き、搬入の経路を確かめたうえで、内訳の分かる見積書をお出しします。",
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
  const points = ["お見積もり・現地調査は無料", "機種が決まっていなくても、写真から相談できます", "国の補助金の対象かどうかも、お調べします"];

  return (
    <section aria-labelledby={`${id}-title`} data-cta-zone className="bg-navy-900 py-14 text-white sm:py-20">
      <div className="container-x grid items-center gap-x-12 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]">
        <div>
          <p className="pill pill-white">お見積もり・現地調査は無料です</p>
          <h2 id={`${id}-title`} className="h-section mt-3 !text-white">
            <Phrase>{title}</Phrase>
          </h2>
          <p className="mt-4 max-w-[40rem] text-[0.9375rem] leading-[2] text-silver-100">{lead}</p>
          <ul className="mt-5 grid gap-2 text-[0.9063rem] font-bold">
            {points.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Icon name="check" className="mt-[0.25rem] size-4 shrink-0 text-sky-300" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white p-5 text-navy-900 shadow-[var(--shadow-pop)] sm:p-6">
          <div className="flex flex-col gap-3">
            {form && (
              <Link href={`/contact/photo${q}`} className="btn btn-cta btn-lg w-full">
                写真でかんたん見積もり
                <Icon name="arrowRight" className="btn-arrow size-4" />
              </Link>
            )}
            {form && (
              <Link href={`/contact${q}`} className="btn btn-outline w-full">
                項目を入力して見積もりを依頼
              </Link>
            )}
            {line && (
              <a href={line} target="_blank" rel="noopener noreferrer" className={`btn btn-line w-full ${form ? "" : "btn-lg"}`} data-cv="line">
                <LineIcon className="size-6" />
                {/* 狭い画面では、文節の切れ目で折り返す（「送っ／て」のように割れないように） */}
                <span className="text-balance">
                  <span className="ib">LINE で</span>
                  <span className="ib">写真を送って</span>
                  <span className="ib">相談</span>
                </span>
              </a>
            )}
            {phone && (
              <a href={telHref(phone)} className="flex min-h-14 items-center justify-center gap-3 rounded-lg border-2 border-silver-300 bg-white px-4 py-2 text-navy-900 transition-colors hover:border-navy-900" data-cv="tel">
                <Icon name="phone" className="size-5 shrink-0 text-brand-600" />
                <span className="text-left leading-none">
                  <span className="block text-xs font-bold text-ink-mute">
                    お電話でのご相談
                    {hours && (
                      <span className="ml-1 font-normal">
                        （<span className="ib">受付</span> <span className="ib">{hours}）</span>
                      </span>
                    )}
                  </span>
                  <span className="num mt-1 block text-[1.3125rem] font-semibold tracking-wider">{phone}</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
