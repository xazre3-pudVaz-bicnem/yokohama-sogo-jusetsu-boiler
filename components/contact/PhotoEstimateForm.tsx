"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { readLabelPhoto, submitPhotoEstimate } from "@/app/contact/actions";
import { newToken, shrinkPhoto } from "@/components/contact/photo-utils";
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
  type PhotoEstimateSelectField,
  type PhotoSlotId,
} from "@/lib/contact-fields";

/**
 * 写真でかんたん見積もり（画面側）。①写真 → ②いまの給湯器 → ③ご連絡先 → ④確認 の順に進む。
 *
 * - 4つの段階は1つの form の中にあり、いまの段階以外は hidden にする（入力は消えずに、まとめて送られる）。
 * - 写真は欄ごと（型番のシール・全体・そのほか）にこの部品が持ち、送るときに縮めたものを付ける（EstimateForm と同じ）。
 * - 「写真から型番を読み取る」は、押したときだけ、型番のシールの写真をサーバーへ送る。結果は②の欄に入れ、お客様に確かめてもらう。
 * - 送信の検査に落ちたら、最初の誤りがある段階に戻る。入力値はサーバーから返ってきた値で戻す（React 19 の対策）。
 */
type Picked = { id: string; blob: Blob; url: string };
type Slots = Record<PhotoSlotId, Picked[]>;

const STEPS = ["写真", "給湯器", "ご連絡先", "確認"] as const;
const FIELD_STEP: Record<PhotoEstimateField | "photos", number> = {
  name: 2,
  tel: 2,
  email: 2,
  area: 2,
  housing: 1,
  condition: 1,
  gasType: 1,
  currentModel: 1,
  currentMaker: 1,
  manufactured: 1,
  desiredType: 1,
  desiredProduct: 1,
  contactPref: 2,
  message: 2,
  photos: 0,
};

const SLOT_TEXT: Record<PhotoSlotId, { tag: string; lead: string }> = {
  label: { tag: "必須", lead: "本体の正面か側面にある、型番や製造年月が書かれたシールです。文字が読めるように、近づいて撮ってください。" },
  whole: { tag: "できれば", lead: "1〜2m 離れて、本体の下の配管と、まわりの壁や床まで入るように。マンションの扉の中なら、扉を開けた状態で。" },
  extra: { tag: "任意", lead: "台所と浴室のリモコン、本体の下の配管、置き場所までの通り道など。3枚まで。" },
};

export function PhotoEstimateForm({ note, preview = false, lineUrl, readerEnabled }: { note: string; preview?: boolean; lineUrl: string; readerEnabled: boolean }) {
  const [state, action, pending] = useActionState(submitPhotoEstimate, initialPhotoEstimateState);
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [step, setStep] = useState(0);
  const [slots, setSlots] = useState<Slots>({ label: [], whole: [], extra: [] });
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
  const v = state.values ?? {};
  const err = state.errors ?? {};

  // 機種のページから来たとき：その機種を「気になっている機種」に入れる
  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product");
    const input = formRef.current?.elements.namedItem("desiredProduct") as HTMLInputElement | null;
    if (product && input && !input.value) input.value = product.slice(0, 120);
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

  const total = (s: Slots) => Object.values(s).flat().reduce((n, p) => n + p.blob.size, 0);

  const pick = async (slot: PhotoSlotId, files: FileList | null) => {
    if (!files?.length) return;
    const def = PHOTO_SLOTS.find((s) => s.id === slot)!;
    setPhotoError("");
    setStepError("");
    setBusy(slot);
    // 1枚だけの欄は、選び直したら入れ替える（新しい写真が読めたときだけ）
    const room = def.max === 1 ? 1 : def.max - slots[slot].length;
    const added: Picked[] = [];
    let failed = 0;
    for (const file of Array.from(files).slice(0, Math.max(0, room))) {
      const blob = await shrinkPhoto(file);
      if (!blob) {
        failed += 1;
        continue;
      }
      const url = URL.createObjectURL(blob);
      urlsRef.current.add(url);
      added.push({ id: `${slot}-${Date.now()}-${added.length}`, blob, url });
    }
    let message = files.length > room ? `「${def.title}」は${def.max}枚までです。` : "";
    if (added.length) {
      const nextSlots: Slots = { ...slots, [slot]: def.max === 1 ? added : [...slots[slot], ...added] };
      if (total(nextSlots) > PHOTO_ESTIMATE_RULES.maxTotalBytes) {
        added.forEach((p) => release(p.url));
        message = "写真の合計の容量が大きすぎます。「そのほか」の枚数を減らすか、LINE でお送りください。";
      } else {
        if (def.max === 1) slots[slot].forEach((p) => release(p.url));
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
    slots[slot].filter((p) => p.id === id).forEach((p) => release(p.url));
    setSlots({ ...slots, [slot]: slots[slot].filter((p) => p.id !== id) });
    if (slot === "label") setRead(null);
  };

  /** 型番のシールの写真から読み取って、②の欄に入れる */
  const readLabel = async () => {
    const photo = slots.label[0];
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
    setRead(r);
    setReading(false);
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

  const go = (to: number) => {
    setStepError("");
    setStep(to);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      headingRefs.current[to]?.focus({ preventScroll: true });
    });
  };

  const value = (name: PhotoEstimateField) => String((formRef.current?.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "").trim();

  /** 次の段階へ進む前の、その段階の確認（送信のときに、サーバーでも同じことを確かめる） */
  const next = () => {
    if (step === 0) {
      if (!slots.label.length && !(labelMissing && slots.whole.length)) {
        setStepError(labelMissing ? "シールが無い・読めないときは、給湯器の全体の写真を選んでください。" : "型番のシールの写真を選んでください。シールが無い・読めないときは、その旨を選んで、全体の写真を。");
        return;
      }
    }
    if (step === 2) {
      const missing = [!value("name") && "お名前", !/^[0-9０-９+\-－ー\s()]{10,18}$/.test(value("tel")) && "電話番号（市外局番から）", !value("area") && "工事をご希望の場所"].filter(Boolean);
      if (missing.length) {
        setStepError(`${missing.join("・")}を入力してください。`);
        return;
      }
      // 確認の画面に出す内容
      const fd = new FormData(formRef.current!);
      setSummary(
        PHOTO_ESTIMATE_FIELDS.map((k) => [photoEstimateLabels[k], String(fd.get(k) ?? "").trim()] as [string, string]).filter(([, val]) => val !== ""),
      );
    }
    go(step + 1);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step !== 3) {
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
      {required && <span className="border border-heat px-1.5 py-0.5 text-[0.6875rem] font-bold leading-none text-heat">必須</span>}
      {hint && <span className="text-xs font-normal text-ink-mute">{hint}</span>}
    </label>
  );
  const errorOf = (name: PhotoEstimateField | "photos") =>
    err[name] ? (
      <p id={`pe-${name}`} className="mt-1.5 text-sm font-bold text-heat">
        {err[name]}
      </p>
    ) : null;
  const chips = (name: PhotoEstimateSelectField) => (
    <fieldset>
      <legend className="text-[0.9375rem] font-bold text-ink">{photoEstimateLabels[name]}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {photoEstimateOptions[name].map((o) => (
          <label key={o} className="opt">
            <input type="radio" name={name} value={o} defaultChecked={v[name] === o} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
      {errorOf(name)}
    </fieldset>
  );

  const stepHead = (i: number, title: string, lead: ReactNode) => (
    <div className="border-b-2 border-dotted border-silver-300 pb-3">
      <p className="font-heading text-[0.8125rem] font-bold tracking-wider text-brand-700">
        {i + 1}／{STEPS.length}
      </p>
      <h2
        ref={(el) => {
          headingRefs.current[i] = el;
        }}
        tabIndex={-1}
        className="h-sub mt-0.5 outline-none"
      >
        {title}
      </h2>
      <p className="mt-1 text-[0.8125rem] leading-[1.8] text-ink-mute">{lead}</p>
    </div>
  );

  const nav = (back: boolean, nextLabel: string) => (
    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center">
      {back && (
        <button type="button" onClick={() => go(step - 1)} className="btn btn-outline sm:min-w-[9rem]">
          もどる
        </button>
      )}
      <button type="submit" disabled={busy !== null || reading} className="btn btn-primary sm:min-w-[16rem] disabled:cursor-wait disabled:opacity-70">
        {nextLabel}
      </button>
    </div>
  );

  return (
    <div ref={topRef} className="scroll-mt-24">
      {preview && (
        <p className="mb-6 rounded-2xl bg-paper-2 px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-mute">
          【確認用の表示】メール送信の設定（RESEND_API_KEY・CONTACT_TO_EMAIL）がまだのため、このフォームから送信しても届きません。本番では、設定が済むまで、フォームの代わりに電話と LINE の案内が表示されます。
        </p>
      )}

      {/* 段階の表示 */}
      <ol className="mb-8 grid grid-cols-4 gap-1.5" aria-label="入力の段階">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className="text-center">
            <span className={`block h-1.5 rounded-full ${i <= step ? "bg-brand-600" : "bg-silver-200"}`} />
            <span className={`mt-2 block text-[0.75rem] font-bold leading-snug ${i === step ? "text-navy-900" : "text-ink-mute"}`}>
              <span className="num">{i + 1}</span> {s}
            </span>
          </li>
        ))}
      </ol>

      {state.message && (
        <p role="alert" className="mb-6 border-l-2 border-heat py-1 pl-4 text-[0.9375rem] font-bold leading-relaxed text-heat">
          {state.message}
        </p>
      )}

      <form key={state.attempt} ref={formRef} action={action} onSubmit={onSubmit} noValidate>
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label>
            このまま空欄にしてください
            <input type="text" name="subject" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        <input type="hidden" name="elapsed" defaultValue="" />

        {/* 1. 写真 */}
        <section hidden={step !== 0} aria-label="写真" className="space-y-8">
          {stepHead(0, "給湯器の写真を選ぶ", "スマートフォンで、その場で撮っても、撮ってある写真を選んでもかまいません。写真は送る前に自動で小さくします。")}
          {PHOTO_SLOTS.map((slot) => {
            const list = slots[slot.id];
            const t = SLOT_TEXT[slot.id];
            const required = slot.id === "label" ? !labelMissing : slot.id === "whole" && labelMissing;
            return (
              <div key={slot.id} className="card card-line grid gap-5 px-4 py-5 sm:grid-cols-[10rem_1fr] sm:px-6">
                <PhotoSlotFigure slot={slot.id} className="mx-auto h-auto w-40 sm:w-full" />
                <div>
                  <p className="flex flex-wrap items-center gap-2 text-[1rem] font-bold text-navy-900">
                    {slot.title}
                    <span className={`px-1.5 py-0.5 text-[0.6875rem] font-bold leading-none ${required ? "border border-heat text-heat" : "border border-silver-300 text-ink-mute"}`}>{required ? "必須" : t.tag}</span>
                  </p>
                  <p className="mt-1.5 text-[0.8438rem] leading-[1.85]">{t.lead}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <label className={`btn btn-outline btn-sm cursor-pointer ${list.length >= slot.max && slot.max > 1 ? "pointer-events-none opacity-50" : ""}`}>
                      {busy === slot.id ? "読み込んでいます…" : list.length && slot.max === 1 ? "撮り直す・選び直す" : "撮影する・写真を選ぶ"}
                      {/* name を付けない：縮めた写真を、送るときに付ける */}
                      <input
                        type="file"
                        accept={PHOTO_ESTIMATE_RULES.accept}
                        multiple={slot.max > 1}
                        className="sr-only"
                        disabled={busy !== null || (slot.max > 1 && list.length >= slot.max)}
                        onChange={(e) => {
                          void pick(slot.id, e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    {slot.id === "label" && (
                      <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[0.8438rem]">
                        <input type="checkbox" checked={labelMissing} onChange={(e) => setLabelMissing(e.target.checked)} className="size-4 accent-[var(--color-brand-600)]" />
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
                          <button type="button" onClick={() => remove(slot.id, p.id)} className="absolute right-1 top-1 grid size-9 place-items-center rounded-full bg-navy-950/80 text-lg leading-none text-white" aria-label={`${slot.title}の写真 ${i + 1} を外す`}>
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {slot.id === "label" && readerEnabled && list.length > 0 && (
                    <div className="mt-4 rounded-2xl bg-paper-2 px-4 py-4">
                      <button type="button" onClick={() => void readLabel()} disabled={reading} className="btn btn-navy btn-sm disabled:cursor-wait disabled:opacity-70">
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
            );
          })}
          <p role="status" className="text-sm font-bold text-heat empty:hidden">
            {photoError || (step === 0 ? stepError : "")}
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
          {nav(false, "次へ（いまの給湯器のこと）")}
        </section>

        {/* 2. いまの給湯器 */}
        <section hidden={step !== 1} aria-label="いまの給湯器" className="space-y-7">
          {stepHead(1, "いまお使いの給湯器のこと", "分かる範囲でかまいません。空欄のままでも進めます。")}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              {label("currentModel", false, modelSource === "reader" ? "写真から読み取りました。シールと同じか確かめてください" : "シールの「型式」「型番」の欄")}
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
          {chips("condition")}
          {chips("gasType")}
          {chips("housing")}
          {chips("desiredType")}
          {nav(true, "次へ（ご連絡先）")}
        </section>

        {/* 3. ご連絡先 */}
        <section hidden={step !== 2} aria-label="ご連絡先" className="space-y-7">
          {stepHead(2, "ご連絡先", "お見積もりの内容を、お電話かメールでお伝えします。")}
          <div className="grid gap-6 sm:grid-cols-2">
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
          {chips("contactPref")}
          <div>
            {label("message", false, "工事の希望の時期、補助金のご相談など")}
            <textarea rows={4} {...field("message")} className="field mt-2 resize-y" />
            {errorOf("message")}
          </div>
          <p role="status" className="text-sm font-bold text-heat empty:hidden">
            {step === 2 ? stepError : ""}
          </p>
          {nav(true, "入力した内容を確かめる")}
        </section>

        {/* 4. 確認 */}
        <section hidden={step !== 3} aria-label="確認" className="space-y-7">
          {stepHead(3, "送信する内容の確認", "この内容でよければ、送信してください。直すときは「もどる」で前の画面へ。")}
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
                <dt className="font-bold text-navy-900">{k}</dt>
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
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={() => go(2)} className="btn btn-outline sm:min-w-[9rem]">
              もどる
            </button>
            <button type="submit" disabled={pending} className="btn btn-primary sm:min-w-[18rem] disabled:cursor-wait disabled:opacity-70">
              {pending ? "送信しています…" : "この内容で送信する"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
