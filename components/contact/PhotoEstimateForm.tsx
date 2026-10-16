"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { readLabelPhoto, submitPhotoEstimate } from "@/app/contact/actions";
import { BotSay, OptionLabel, QuestionCard, Remaining, type Mascot } from "@/components/contact/ChatBits";
import { newToken, shrinkPhoto } from "@/components/contact/photo-utils";
import { ProductContextNote, readProductContext } from "@/components/contact/ProductContext";
import { PhotoSlotFigure } from "@/components/contact/PhotoSlotFigure";
import {
  initialPhotoEstimateState,
  PHOTO_ESTIMATE_FIELDS,
  PHOTO_ESTIMATE_RULES,
  PHOTO_SLOTS,
  photoEstimateLabels,
  photoEstimateOptions,
  type LabelReadResult,
  type PhotoEstimateField,
  type PhotoSlotId,
} from "@/lib/contact-fields";

/**
 * 写真でかんたん見積もり（画面側）。2026-10-15 の依頼で、キンライサーの見積もりのようなチャットの形にした。
 * ①質問（給湯器の状態・ガスの種類・住まい・希望の種類）→ ②写真 → ③型番 → ④ご連絡先 → ⑤確認 の順に進む。
 *
 * - キャラクター（ゆげまる）が吹き出しで聞き、大きなボタンで答える。答えた段階は上に残り、次の段階が下に出る（会話のように）。
 * - すべての段階は1つの form の中にある。まだの段階は hidden（入力は消えずに、まとめて送られる）。
 * - 写真は欄ごと（型番のシール・全体・そのほか）にこの部品が持ち、送るときに縮めたものを付ける（EstimateForm と同じ）。
 * - 「写真から型番を読み取る」は、押したときだけ、型番のシールの写真をサーバーへ送る。結果は③の欄に入れ、お客様に確かめてもらう。
 * - 送信の検査に落ちたら、最初の誤りがある段階に戻る。入力値はサーバーから返ってきた値で戻す（React 19 の対策）。
 */
type Picked = { id: string; blob: Blob; url: string };
type Slots = Record<PhotoSlotId, Picked[]>;
type ChoiceField = "condition" | "gasType" | "housing" | "desiredType";

const STEPS = ["質問", "写真", "型番", "ご連絡先", "確認"] as const;
const FIELD_STEP: Record<PhotoEstimateField | "photos", number> = {
  housing: 0,
  condition: 0,
  gasType: 0,
  desiredType: 0,
  photos: 1,
  currentModel: 2,
  currentMaker: 2,
  manufactured: 2,
  desiredProduct: 2,
  productPage: 2,
  name: 3,
  tel: 3,
  email: 3,
  area: 3,
  contactPref: 3,
  message: 3,
};

/** 最初に聞く4つ（この順に1つずつ出す） */
const QUESTIONS: { field: ChoiceField; say: string; cols: string }[] = [
  { field: "condition", say: "まずは、いまお使いの給湯器のことを教えてください。", cols: "sm:grid-cols-1" },
  { field: "gasType", say: "ガスの種類は、どちらですか。", cols: "sm:grid-cols-3" },
  { field: "housing", say: "お住まいは、どちらですか。", cols: "sm:grid-cols-2" },
  { field: "desiredType", say: "交換したい給湯器の種類に、ご希望はありますか。", cols: "sm:grid-cols-2" },
];
/** 質問の数（4つの質問＋写真・型番・ご連絡先） */
const TOTAL = QUESTIONS.length + 3;

const SLOT_TEXT: Record<PhotoSlotId, { tag: string; lead: string }> = {
  label: { tag: "必須", lead: "本体の正面か側面にある、型番や製造年月が書かれたシールです。文字が読めるように、近づいて撮ってください。" },
  whole: { tag: "できれば", lead: "1〜2m 離れて、本体の下の配管と、まわりの壁や床まで入るように。マンションの扉の中なら、扉を開けた状態で。" },
  extra: { tag: "任意", lead: "台所と浴室のリモコン、本体の下の配管、置き場所までの通り道など。3枚まで。" },
};

export function PhotoEstimateForm({ note, preview = false, lineUrl, readerEnabled, mascot, phone }: { note: string; preview?: boolean; lineUrl: string; readerEnabled: boolean; mascot: Mascot; phone: string }) {
  const [state, action, pending] = useActionState(submitPhotoEstimate, initialPhotoEstimateState);
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [step, setStep] = useState(0);
  const v = state.values ?? {};
  const err = state.errors ?? {};
  const [choices, setChoices] = useState<Record<ChoiceField, string>>({ condition: v.condition ?? "", gasType: v.gasType ?? "", housing: v.housing ?? "", desiredType: v.desiredType ?? "" });
  const [slots, setSlots] = useState<Slots>({ label: [], whole: [], extra: [] });
  // 写真を縮める・読み取る処理を待つあいだに、利用者が写真を外す・選び直すことがある。待ったあとは、この最新の状態を使う
  const slotsRef = useRef(slots);
  useEffect(() => {
    slotsRef.current = slots;
  }, [slots]);
  const [busy, setBusy] = useState<PhotoSlotId | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [stepError, setStepError] = useState("");
  const [labelMissing, setLabelMissing] = useState(false);
  const [reading, setReading] = useState(false);
  const [read, setRead] = useState<LabelReadResult | null>(null);
  const [modelSource, setModelSource] = useState<"" | "reader" | "reader-edited" | "manual">("");
  const [summary, setSummary] = useState<[string, string][]>([]);
  const tokenRef = useRef("");
  const urlsRef = useRef(new Set<string>());

  // 機種のページから来たとき：その機種を「気になっている機種」に入れる
  useEffect(() => {
    const { product, page } = readProductContext();
    const input = formRef.current?.elements.namedItem("desiredProduct") as HTMLInputElement | null;
    if (product && input && !input.value) input.value = product;
    const pageInput = formRef.current?.elements.namedItem("productPage") as HTMLInputElement | null;
    if (page && pageInput && !pageInput.value) pageInput.value = page;
  }, [state.attempt]);

  // 送信の結果が返ってきたら、最初の誤りがある段階に戻る
  useEffect(() => {
    if (state.status === "idle") return;
    const keys = Object.keys(state.errors ?? {}) as (PhotoEstimateField | "photos")[];
    if (keys.length) setStep(Math.min(...keys.map((k) => FIELD_STEP[k] ?? 0)));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state.status, state.attempt, state.errors]);

  useEffect(() => {
    const urls = urlsRef.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const answered = QUESTIONS.filter((q) => choices[q.field]).length;
  const left = Math.max(0, TOTAL - answered - Math.max(0, Math.min(step, 4) - 1));
  const total = (s: Slots) => Object.values(s).flat().reduce((n, p) => n + p.blob.size, 0);

  const pick = async (slot: PhotoSlotId, files: FileList | null) => {
    if (!files?.length) return;
    // 欄を空にする（同じ写真を選び直せるように）と、ブラウザによっては FileList も空になるので、先に取り出しておく
    const chosen = Array.from(files);
    const def = PHOTO_SLOTS.find((s) => s.id === slot)!;
    setPhotoError("");
    setStepError("");
    setBusy(slot);
    // 1枚だけの欄は、選び直したら入れ替える（新しい写真が読めたときだけ）
    const room = def.max === 1 ? 1 : def.max - slotsRef.current[slot].length;
    const added: Picked[] = [];
    let failed = 0;
    for (const file of chosen.slice(0, Math.max(0, room))) {
      const blob = await shrinkPhoto(file);
      if (!blob) {
        failed += 1;
        continue;
      }
      const url = URL.createObjectURL(blob);
      urlsRef.current.add(url);
      added.push({ id: `${slot}-${Date.now()}-${added.length}`, blob, url });
    }
    let message = chosen.length > room ? `「${def.title}」は${def.max}枚までです。` : "";
    if (added.length) {
      const current = slotsRef.current;
      const nextSlots: Slots = { ...current, [slot]: def.max === 1 ? added : [...current[slot], ...added] };
      if (total(nextSlots) > PHOTO_ESTIMATE_RULES.maxTotalBytes) {
        added.forEach((p) => release(p.url));
        message = "写真の合計の容量が大きすぎます。「そのほか」の枚数を減らすか、LINE でお送りください。";
      } else {
        if (def.max === 1) current[slot].forEach((p) => release(p.url));
        slotsRef.current = nextSlots;
        setSlots(nextSlots);
        if (slot === "label") setRead(null);
      }
    }
    if (failed) message = `${failed}枚の写真を読み込めませんでした。JPEG か PNG の写真でお試しいただくか、LINE でお送りください。`;
    setPhotoError(message);
    setBusy(null);
  };

  const release = (url: string) => {
    URL.revokeObjectURL(url);
    urlsRef.current.delete(url);
  };

  const remove = (slot: PhotoSlotId, id: string) => {
    const current = slotsRef.current;
    current[slot].filter((p) => p.id === id).forEach((p) => release(p.url));
    const nextSlots: Slots = { ...current, [slot]: current[slot].filter((p) => p.id !== id) };
    slotsRef.current = nextSlots;
    setSlots(nextSlots);
    if (slot === "label") setRead(null);
  };

  /** 型番のシールの写真から読み取って、③の欄に入れる */
  const readLabel = async () => {
    const photo = slotsRef.current.label[0];
    if (!photo) return;
    setReading(true);
    setRead(null);
    const fd = new FormData();
    fd.append("photo", photo.blob, "label.jpg");
    let r: LabelReadResult;
    try {
      r = await readLabelPhoto(fd);
    } catch {
      r = { ok: false, message: "いまは読み取りができませんでした。そのままお進みいただくか、型番を入力してください。" };
    }
    setReading(false);
    // 読み取りのあいだに、シールの写真を外した・選び直したときは、古い写真の結果を入れない
    if (slotsRef.current.label[0]?.id !== photo.id) return;
    setRead(r);
    if (!r.ok) return;
    const form = formRef.current;
    if (!form) return;
    const set = (name: string, value: string | null) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
      if (el && value) el.value = value;
    };
    set("currentModel", r.modelNumber);
    set("currentMaker", r.maker);
    set("manufactured", r.manufactured);
    setModelSource("reader");
  };

  /** 次の段階を出して、そこまで送る（前の段階は、上に残す） */
  const go = (to: number) => {
    setStepError("");
    setStep(to);
    requestAnimationFrame(() => stepRefs.current[to]?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const value = (name: PhotoEstimateField) => String((formRef.current?.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "").trim();

  /** 確認の画面に出す内容（いまの入力から作る） */
  const buildSummary = (): [string, string][] => {
    const fd = new FormData(formRef.current!);
    return PHOTO_ESTIMATE_FIELDS.filter((k) => k !== "productPage")
      .map((k) => [photoEstimateLabels[k], String(fd.get(k) ?? "").trim()] as [string, string])
      .filter(([, val]) => val !== "");
  };

  /** 次の段階へ進む前の、その段階の確認（送信のときに、サーバーでも同じことを確かめる） */
  const next = () => {
    // 選択肢で Enter を押したときも、ここに来る。答えていない質問があれば、そこへ戻す
    if (step === 0) {
      const first = QUESTIONS.find((q) => !choices[q.field]);
      if (first) {
        (formRef.current?.querySelector(`input[name="${first.field}"]`) as HTMLInputElement | null)?.focus();
        return;
      }
    }
    if (step === 1) {
      if (!slots.label.length && !(labelMissing && slots.whole.length)) {
        setStepError(labelMissing ? "シールが無い・読めないときは、給湯器の全体の写真を選んでください。" : "型番のシールの写真を選んでください。シールが無い・読めないときは、その旨を選んで、全体の写真を。");
        return;
      }
    }
    if (step === 3) {
      const missing = [!value("name") && "お名前", !/^[0-9０-９+\-－ー\s()]{10,18}$/.test(value("tel")) && "電話番号（市外局番から）", !value("area") && "工事をご希望の場所"].filter(Boolean);
      if (missing.length) {
        setStepError(`${missing.join("・")}を入力してください。`);
        return;
      }
      setSummary(buildSummary());
    }
    go(step + 1);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step !== 4) {
      next();
      return;
    }
    const fd = new FormData(e.currentTarget);
    fd.set("elapsed", String(Math.round(performance.now())));
    if (!tokenRef.current) tokenRef.current = newToken();
    fd.set("token", tokenRef.current);
    fd.set("labelMissing", labelMissing ? "1" : "");
    fd.set("modelSource", modelSource);
    for (const slot of PHOTO_SLOTS) slots[slot.id].forEach((p, i) => fd.append(`photo-${slot.id}`, p.blob, `${slot.file}-${i + 1}.jpg`));
    startTransition(() => action(fd));
  };

  const field = (name: PhotoEstimateField) => ({
    id: `p-${name}`,
    name,
    defaultValue: v[name] ?? "",
    "aria-invalid": err[name] ? (true as const) : undefined,
    "aria-describedby": err[name] ? `pe-${name}` : undefined,
    className: "field mt-2",
  });
  const label = (name: PhotoEstimateField, required = false, hint?: string) => (
    <label htmlFor={`p-${name}`} className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.9375rem] font-bold text-ink">
      {photoEstimateLabels[name]}
      {required && <span className="rounded-sm bg-cta-700 px-1.5 py-0.5 text-[0.6875rem] font-bold leading-none text-white">必須</span>}
      {hint && <span className="text-xs font-normal text-ink-mute">{hint}</span>}
    </label>
  );
  const errorOf = (name: PhotoEstimateField | "photos") =>
    err[name] ? (
      <p id={`pe-${name}`} className="mt-1.5 text-sm font-bold text-heat">
        {err[name]}
      </p>
    ) : null;

  /** 段階の区切り（前の段階は残し、まだの段階は出さない） */
  // 部品（コンポーネント）にしないこと。描画のたびに作り直されて、入力した文字や選んだ写真が消えるため
  const stage = (i: number, children: ReactNode) => (
    <section
      hidden={step < i}
      aria-label={STEPS[i]}
      ref={(el) => {
        stepRefs.current[i] = el;
      }}
      className="scroll-mt-32 space-y-4"
    >
      {children}
    </section>
  );

  const nextButton = (label: string) => (
    <div className="pt-1 sm:ml-16">
      <button type="submit" disabled={busy !== null || reading} className="btn btn-cta btn-lg w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-[18rem]">
        {label}
      </button>
    </div>
  );

  return (
    <div ref={topRef} className="scroll-mt-24">
      {preview && (
        <p className="mb-4 rounded-2xl bg-white px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-mute">
          【確認用の表示】メール送信の設定（RESEND_API_KEY・CONTACT_TO_EMAIL）がまだのため、このフォームから送信しても届きません。本番では、設定が済むまで、LINE で送るチャットの見積もりと電話の案内が表示されます。
        </p>
      )}

      <Remaining left={step >= 4 ? 0 : left} total={TOTAL} />

      {state.message && (
        <p role="alert" className="mt-4 rounded-2xl border-2 border-heat bg-white px-4 py-3 text-[0.9375rem] font-bold leading-relaxed text-heat">
          {state.message}
        </p>
      )}

      <div className="mt-5">
        <ProductContextNote />
      </div>
      <form
        key={state.attempt}
        ref={formRef}
        action={action}
        onSubmit={onSubmit}
        onChange={() => {
          if (step === 4) setSummary(buildSummary());
        }}
        noValidate
        className="space-y-7"
      >
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label>
            このまま空欄にしてください
            <input type="text" name="subject" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        <input type="hidden" name="elapsed" defaultValue="" />
        {/* 見ていた機種のページ（機種のページから来たときだけ入る） */}
        <input type="hidden" name="productPage" defaultValue={v.productPage ?? ""} />

        {/* 1. 質問（1つ答えると、次の質問が出る） */}
        {stage(0, <>
          <BotSay mascot={mascot}>
            ゆげまるの「写真でかんたん見積もり」です。
            <br />
            いくつかの質問に答えて、給湯器の写真を送るだけ。お見積もりは無料です。
          </BotSay>
          {QUESTIONS.map((q, qi) => {
            const visible = qi === 0 || QUESTIONS.slice(0, qi).every((p) => choices[p.field]);
            return (
              <div key={q.field} hidden={!visible} className="space-y-3">
                <BotSay mascot={mascot}>{q.say}</BotSay>
                <QuestionCard title={photoEstimateLabels[q.field]}>
                  <div className={`grid gap-2.5 ${q.cols}`}>
                    {photoEstimateOptions[q.field].map((o) => (
                      <label key={o} className="chat-opt">
                        <input
                          type="radio"
                          name={q.field}
                          value={o}
                          checked={choices[q.field] === o}
                          onChange={() => {
                            setChoices((c) => ({ ...c, [q.field]: o }));
                            // 次の質問を見えるところへ
                            requestAnimationFrame(() => document.getElementById(`pq-${QUESTIONS[qi + 1]?.field ?? "done"}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
                          }}
                          className="sr-only"
                        />
                        <OptionLabel text={o} />
                      </label>
                    ))}
                  </div>
                  {errorOf(q.field)}
                </QuestionCard>
                {q.field === "condition" && choices.condition.startsWith("使えない") && phone && (
                  <BotSay mascot={mascot}>
                    お湯が使えないのは、お困りですね。お急ぎのときは、お電話（
                    <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="font-bold text-brand-700 underline">
                      {phone}
                    </a>
                    ）が確実です。このまま写真でのご相談も続けられます。
                  </BotSay>
                )}
                <span id={`pq-${q.field}`} />
              </div>
            );
          })}
          <span id="pq-done" />
          {answered === QUESTIONS.length && step === 0 && (
            <>
              <BotSay mascot={mascot}>ありがとうございます。次は、給湯器の写真です。</BotSay>
              {nextButton("次へ（写真を選ぶ）")}
            </>
          )}
        </>)}

        {/* 2. 写真 */}
        {stage(1, <>
          <BotSay mascot={mascot}>
            いまお使いの給湯器の<strong className="font-black">型番のシールの写真（必須）</strong>と、<strong className="font-black">給湯器の全体の写真</strong>を、撮影するか選んでください。写真は送る前に自動で小さくします。
          </BotSay>
          <div className="space-y-4 sm:ml-16">
            {PHOTO_SLOTS.map((slot) => {
              const list = slots[slot.id];
              const t = SLOT_TEXT[slot.id];
              const required = slot.id === "label" ? !labelMissing : slot.id === "whole" && labelMissing;
              return (
                <div key={slot.id} className="overflow-hidden rounded-[1.25rem] border-2 border-white bg-white shadow-[0_2px_0_rgba(0,0,0,0.06)]">
                  <p className="flex flex-wrap items-center gap-2 bg-[#dfe9f2] px-4 py-2.5 text-[1rem] font-black text-ink">
                    {slot.title}
                    <span className={`rounded-sm px-1.5 py-0.5 text-[0.6875rem] font-bold leading-none ${required ? "bg-cta-700 text-white" : "border border-silver-400 bg-white text-ink-mute"}`}>{required ? "必須" : t.tag}</span>
                  </p>
                  <div className="grid gap-4 px-4 py-4 sm:grid-cols-[9rem_1fr]">
                    <PhotoSlotFigure slot={slot.id} className="mx-auto h-auto w-36 sm:w-full" />
                    <div>
                      <p className="text-[0.8438rem] leading-[1.85]">{t.lead}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <label className={`btn btn-primary btn-sm cursor-pointer ${list.length >= slot.max && slot.max > 1 ? "pointer-events-none opacity-50" : ""}`}>
                          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M4 8h3l2-2.5h6L17 8h3v11H4z" />
                            <circle cx="12" cy="13.5" r="3.5" />
                          </svg>
                          {busy === slot.id ? "読み込んでいます…" : list.length && slot.max === 1 ? "撮り直す・選び直す" : "撮影する・写真を選ぶ"}
                          <span className="sr-only">（{slot.title}）</span>
                          {/* name を付けない：縮めた写真を、送るときに付ける */}
                          <input
                            type="file"
                            accept={PHOTO_ESTIMATE_RULES.accept}
                            multiple={slot.max > 1}
                            className="sr-only"
                            disabled={busy !== null || (slot.id === "label" && reading) || (slot.max > 1 && list.length >= slot.max)}
                            onChange={(e) => {
                              void pick(slot.id, e.target.files);
                              e.target.value = "";
                            }}
                          />
                        </label>
                        {slot.id === "label" && (
                          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[0.8438rem]">
                            <input type="checkbox" checked={labelMissing} onChange={(e) => setLabelMissing(e.target.checked)} className="size-4 accent-[var(--color-brand-700)]" />
                            シールが無い・読めない
                          </label>
                        )}
                      </div>
                      {list.length > 0 && (
                        <ul className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                          {list.map((p, i) => (
                            <li key={p.id} className="relative overflow-hidden rounded-xl border border-silver-200 bg-white">
                              {/* 送る前の確認用の小さな表示（その場で作った画像なので、next/image は使わない） */}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.url} alt={`${slot.title}の写真 ${i + 1}`} className="aspect-square w-full object-cover" />
                              <button type="button" onClick={() => remove(slot.id, p.id)} disabled={busy !== null || (slot.id === "label" && reading)} className="absolute right-1 top-1 grid size-9 place-items-center rounded-full bg-navy-950/80 text-lg leading-none text-white disabled:opacity-50" aria-label={`${slot.title}の写真 ${i + 1} を外す`}>
                                ×
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      {slot.id === "label" && readerEnabled && list.length > 0 && (
                        <div className="mt-4 rounded-2xl bg-cream px-4 py-4">
                          <button type="button" onClick={() => void readLabel()} disabled={reading} className="btn btn-yellow btn-sm disabled:cursor-wait disabled:opacity-70">
                            {reading ? "読み取っています…" : "写真から型番を読み取る"}
                          </button>
                          <p className="mt-2 text-[0.75rem] leading-[1.8] text-ink-mute">押すと、読み取りのために、この写真だけを当社のサーバー経由で Anthropic 社（米国）の AI に送ります。写真は保存しません。読み取りは任意です。</p>
                          <p role="status" className="mt-2 text-[0.875rem] font-bold leading-[1.8] empty:hidden">
                            {read?.ok
                              ? `読み取った型番：${read.modelNumber}${read.maker ? `（${read.maker}）` : ""}${read.manufactured ? `・製造 ${read.manufactured}` : ""}。次の画面で、シールと同じか確かめてください。`
                              : read
                                ? read.message
                                : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <p role="status" className="text-sm font-bold text-heat empty:hidden">
              {photoError || (step === 1 ? stepError : "")}
            </p>
            {errorOf("photos")}
            <p className="text-[0.8125rem] leading-[1.8] text-ink-mute">
              写真がうまく送れないときや、動画で見せたいときは、
              {lineUrl ? (
                <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="text-link" data-cv="line">
                  LINE
                </a>
              ) : (
                "LINE"
              )}
              でもお送りいただけます。撮り方は
              <Link href="/guide/model-label" className="text-link mx-0.5">
                型番の調べ方
              </Link>
              にもまとめています。
            </p>
          </div>
          {step === 1 && nextButton("次へ（型番を確かめる）")}
        </>)}

        {/* 3. 型番 */}
        {stage(2, <>
          <BotSay mascot={mascot}>{modelSource === "reader" ? "写真から型番を読み取りました。シールと同じか確かめてください。" : "分かる範囲で、いまの給湯器の型番を教えてください。空欄のままでも進めます。"}</BotSay>
          <div className="grid gap-5 rounded-[1.25rem] border-2 border-white bg-white px-4 py-5 shadow-[0_2px_0_rgba(0,0,0,0.06)] sm:ml-16 sm:grid-cols-2 sm:px-5">
            <div>
              {label("currentModel", false, "シールの「型式」「型番」の欄")}
              <input
                type="text"
                autoComplete="off"
                autoCapitalize="characters"
                placeholder="例：RUF-A2405SAW"
                {...field("currentModel")}
                onInput={() => setModelSource((s) => (s === "reader" ? "reader-edited" : s === "" ? "manual" : s))}
              />
              {errorOf("currentModel")}
            </div>
            <div>
              {label("currentMaker")}
              <select {...field("currentMaker")}>
                <option value="">選んでください</option>
                {photoEstimateOptions.currentMaker.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {label("manufactured", false, "シールに書いてあれば")}
              <input type="text" autoComplete="off" placeholder="例：2012年8月" {...field("manufactured")} />
              {errorOf("manufactured")}
            </div>
            <div>
              {label("desiredProduct", false, "型番やシリーズ名")}
              <input type="text" autoComplete="off" placeholder="例：ECO ONE、RUF-E240ESAW など" {...field("desiredProduct")} />
              {errorOf("desiredProduct")}
            </div>
          </div>
          {step === 2 && nextButton("次へ（ご連絡先）")}
        </>)}

        {/* 4. ご連絡先 */}
        {stage(3, <>
          <BotSay mascot={mascot}>最後に、ご連絡先を教えてください。お見積もりの内容を、お電話かメールでお伝えします。</BotSay>
          <div className="space-y-5 rounded-[1.25rem] border-2 border-white bg-white px-4 py-5 shadow-[0_2px_0_rgba(0,0,0,0.06)] sm:ml-16 sm:px-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                {label("name", true)}
                <input type="text" autoComplete="name" placeholder="例：横浜 太郎" {...field("name")} />
                {errorOf("name")}
              </div>
              <div>
                {label("tel", true)}
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="例：045-000-0000" {...field("tel")} />
                {errorOf("tel")}
              </div>
            </div>
            <div>
              {label("area", true, "市区町村・町名まで")}
              <input type="text" autoComplete="address-level2" placeholder="例：横浜市戸塚区○○町" {...field("area")} />
              {errorOf("area")}
            </div>
            <div>
              {label("email", false, "メールでの返信をご希望の方")}
              <input type="email" inputMode="email" autoComplete="email" placeholder="例：name@example.com" {...field("email")} />
              {errorOf("email")}
            </div>
            <fieldset>
              <legend className="text-[0.9375rem] font-bold text-ink">{photoEstimateLabels.contactPref}</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {photoEstimateOptions.contactPref.map((o) => (
                  <label key={o} className="chat-opt !min-h-12 !text-[0.9375rem]">
                    <input type="radio" name="contactPref" value={o} defaultChecked={v.contactPref === o} className="sr-only" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              {label("message", false, "工事の希望の時期、補助金のご相談など")}
              <textarea rows={4} {...field("message")} className="field mt-2 resize-y" />
              {errorOf("message")}
            </div>
            <p role="status" className="text-sm font-bold text-heat empty:hidden">
              {step === 3 ? stepError : ""}
            </p>
          </div>
          {step === 3 && nextButton("入力した内容を確かめる")}
        </>)}

        {/* 5. 確認 */}
        {stage(4, <>
          <BotSay mascot={mascot}>この内容で送ってよろしいですか。直すときは、上の入力欄を直してから、もう一度「入力した内容を確かめる」を押してください。</BotSay>
          <div className="space-y-5 rounded-[1.25rem] border-4 border-pop-yellow bg-white px-4 py-5 sm:ml-16 sm:px-5">
            <div>
              <p className="text-[0.9375rem] font-bold text-ink">写真</p>
              <ul className="mt-2 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                {PHOTO_SLOTS.flatMap((slot) =>
                  slots[slot.id].map((p, i) => (
                    <li key={p.id} className="overflow-hidden rounded-xl border border-silver-200 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={`${slot.title}の写真 ${i + 1}`} className="aspect-square w-full object-cover" />
                      <p className="px-2 py-1 text-[0.6875rem] leading-snug text-ink-mute">{slot.title}</p>
                    </li>
                  )),
                )}
              </ul>
              {labelMissing && <p className="mt-2 text-[0.8125rem] text-ink-mute">型番のシールは「無い・読めない」を選んでいます。</p>}
            </div>
            <dl className="divide-y-2 divide-dotted divide-silver-300 border-y-2 border-dotted border-silver-300 text-[0.9375rem]">
              {summary.map(([k, val]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr]">
                  <dt className="font-bold text-ink">{k}</dt>
                  <dd className="whitespace-pre-wrap break-words leading-[1.85]">{val}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[0.8125rem] leading-[1.9] text-ink-mute">
              ご入力いただいた内容と写真は、お見積もりとご連絡のためにのみ使用します。写真は、メールの添付として当社に届くだけで、このサイトのサーバーには保存しません。くわしくは
              <Link href="/privacy" className="text-link mx-0.5">
                プライバシーポリシー
              </Link>
              をご覧ください。{note}
            </p>
            <button type="submit" disabled={pending} className="btn btn-cta btn-xl w-full disabled:cursor-wait disabled:opacity-70">
              {pending ? "送信しています…" : "この内容で送信する"}
            </button>
          </div>
        </>)}
      </form>
    </div>
  );
}
