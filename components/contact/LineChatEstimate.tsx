"use client";

import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import { BotSay, OptionLabel, QuestionCard, Remaining, type Mascot } from "@/components/contact/ChatBits";
import { readProductContext } from "@/components/contact/ProductContext";
import { LineIcon } from "@/components/ui/LineIcon";
import { photoEstimateLabels, photoEstimateOptions } from "@/lib/contact-fields";

type ChoiceField = "condition" | "gasType" | "housing" | "desiredType";
const QUESTIONS: { field: ChoiceField; say: string; cols: string }[] = [
  { field: "condition", say: "まずは、いまお使いの給湯器のことを教えてください。", cols: "sm:grid-cols-1" },
  { field: "gasType", say: "ガスの種類は、どちらですか。", cols: "sm:grid-cols-3" },
  { field: "housing", say: "お住まいは、どちらですか。", cols: "sm:grid-cols-2" },
  { field: "desiredType", say: "交換したい給湯器の種類に、ご希望はありますか。", cols: "sm:grid-cols-2" },
];

const noop = () => () => {};

/**
 * メール送信の設定が無いあいだ（本番）の、チャットの形の見積もり。フォームの代わりに使う（動かないフォームを出さないため）。
 * 質問に答えると、その答えを書き込んだ状態で、LINE 公式アカウントのトークを開く（line.me/R/oaMessage）。
 * 写真は、開いたトークでそのまま送ってもらう。個人情報は、この画面では受け取らない（送るのは LINE の中）。
 * パソコンの方には、友だち追加の QR コードと、お電話を案内する。
 */
export function LineChatEstimate({ mascot, lineUrl, lineId, phone, hours, qr }: { mascot: Mascot; lineUrl: string; lineId: string; phone: string; hours: string; qr: { src: string; width: number; height: number } }) {
  const [choices, setChoices] = useState<Record<ChoiceField, string>>({ condition: "", gasType: "", housing: "", desiredType: "" });
  const [model, setModel] = useState("");
  // 機種のページから来たときの、機種の名前（URL はブラウザでしか読めない）
  const search = useSyncExternalStore(noop, () => window.location.search, () => "");
  const product = search ? readProductContext().product : "";
  const answered = QUESTIONS.filter((q) => choices[q.field]).length;
  const done = answered === QUESTIONS.length;

  const text = useMemo(
    () =>
      [
        "【写真でかんたん見積もり】",
        ...QUESTIONS.map((q) => `${photoEstimateLabels[q.field]}：${choices[q.field] || "（未回答）"}`),
        model.trim() ? `いまの給湯器の型番：${model.trim().slice(0, 40)}` : "",
        product ? `気になっている機種：${product}` : "",
        "このあと、型番のシールと給湯器の全体の写真を送ります。",
      ]
        .filter(Boolean)
        .join("\n"),
    [choices, model, product],
  );
  // LINE 公式アカウントのトークを、文を書き込んだ状態で開く（ID が無いときは、友だち追加の URL）
  const lineHref = lineId ? `https://line.me/R/oaMessage/${encodeURIComponent(lineId)}/?${encodeURIComponent(text)}` : lineUrl;
  const telHref = phone ? `tel:${phone.replace(/[^0-9+]/g, "")}` : "";

  return (
    <div className="space-y-7">
      <Remaining left={QUESTIONS.length + 1 - answered - (done ? 1 : 0)} total={QUESTIONS.length + 1} />
      <BotSay mascot={mascot}>
        ゆげまるの「写真でかんたん見積もり」です。
        <br />
        いくつかの質問に答えると、その内容を書き込んだ LINE のトークが開きます。写真は、そのまま LINE で送ってください。お見積もりは無料です。
      </BotSay>
      {product && (
        <BotSay mascot={mascot}>
          ご相談の機種：<strong className="font-black">{product}</strong>
        </BotSay>
      )}

      {QUESTIONS.map((q, qi) => {
        const visible = qi === 0 || QUESTIONS.slice(0, qi).every((p) => choices[p.field]);
        return (
          <div key={q.field} hidden={!visible} className="space-y-3">
            <BotSay mascot={mascot}>{q.say}</BotSay>
            <QuestionCard title={photoEstimateLabels[q.field]}>
              <div className={`grid gap-2.5 ${q.cols}`}>
                {photoEstimateOptions[q.field].map((o) => (
                  <label key={o} className="chat-opt">
                    <input type="radio" name={`line-${q.field}`} value={o} checked={choices[q.field] === o} onChange={() => setChoices((c) => ({ ...c, [q.field]: o }))} className="sr-only" />
                    <OptionLabel text={o} />
                  </label>
                ))}
              </div>
            </QuestionCard>
            {q.field === "condition" && choices.condition.startsWith("使えない") && phone && (
              <BotSay mascot={mascot}>
                お湯が使えないのは、お困りですね。お急ぎのときは、お電話（
                <a href={telHref} className="font-bold text-brand-700 underline" data-cv="tel">
                  {phone}
                </a>
                ）が確実です。
              </BotSay>
            )}
          </div>
        );
      })}

      {done && (
        <div className="space-y-4">
          <BotSay mascot={mascot}>型番が分かれば、教えてください（分からなければ、空欄のままで大丈夫です）。</BotSay>
          <div className="rounded-[1.25rem] border-2 border-white bg-white px-4 py-4 shadow-[0_2px_0_rgba(0,0,0,0.06)] sm:ml-16 sm:px-5">
            <label htmlFor="line-model" className="text-[0.9375rem] font-bold text-ink">
              いまの給湯器の型番 <span className="text-xs font-normal text-ink-mute">シールの「型式」「型番」の欄</span>
            </label>
            <input id="line-model" type="text" autoComplete="off" autoCapitalize="characters" maxLength={40} placeholder="例：RUF-A2405SAW" value={model} onChange={(e) => setModel(e.target.value)} className="field mt-2" />
          </div>

          <BotSay mascot={mascot}>
            ありがとうございます。下のボタンで LINE を開くと、ここまでの答えが入っています。そのまま送ってから、<strong className="font-black">型番のシール</strong>と<strong className="font-black">給湯器の全体</strong>の写真を送ってください。
          </BotSay>
          <div className="space-y-3 rounded-[1.25rem] border-4 border-line bg-white px-4 py-5 sm:ml-16 sm:px-6">
            {(lineId || lineUrl) && (
              <a href={lineHref} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-xl w-full" data-cv="line">
                <LineIcon className="size-7" />
                この内容を LINE で送る
              </a>
            )}
            {/* QR コードはパソコンの幅だけ。スマホでは、LINE が開かないときの ID 検索を案内する */}
            <div className="hidden items-center gap-4 sm:grid sm:grid-cols-[minmax(0,1fr)_auto]">
              <p className="text-[0.8125rem] leading-[1.85] text-ink-mute">
                パソコンの方は、右の QR コードをスマートフォンで読み取って友だちに追加し、トークで写真をお送りください{lineId ? `（ID 検索：${lineId}）` : ""}。
              </p>
              <Image src={qr.src} width={112} height={112} alt="LINE 公式アカウントの友だち追加の QR コード" sizes="112px" className="mx-auto size-28 rounded-lg border border-silver-200" />
            </div>
            {lineId && <p className="text-[0.8125rem] leading-[1.85] text-ink-mute sm:hidden">LINE が開かないときは、LINE のアプリで ID「{lineId}」を検索して、友だちに追加してください。</p>}
            {phone && (
              // 番号と受付時間は2行に分ける（1行に詰めると、スマホの幅で細かく折り返すため）
              <a href={telHref} className="btn btn-outline w-full flex-col !gap-0 leading-snug" data-cv="tel">
                <span>
                  お電話でご相談 <span className="num whitespace-nowrap">{phone}</span>
                </span>
                {hours && <span className="text-[0.75rem]">受付 {hours}</span>}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
