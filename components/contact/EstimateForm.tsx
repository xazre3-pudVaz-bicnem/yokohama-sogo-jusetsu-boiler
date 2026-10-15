"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { submitEstimate } from "@/app/contact/actions";
import { newToken, shrinkPhoto } from "@/components/contact/photo-utils";
import { estimateLabels, estimateOptions, initialEstimateState, PHOTO_RULES, type EstimateField, type EstimateSelectField } from "@/lib/contact-fields";

/**
 * お見積もりフォーム（画面側）。
 *
 * - 送信は Server Action（app/contact/actions.ts）。JS が動かない環境でも、文字の項目は送信できる（写真は付かない）。
 * - 必須は「お名前」「電話番号」だけ。ほかは、分かる範囲で選んでもらう。
 * - 写真は、送る前に画面側で縮める（長い辺 1600px・JPEG）。大きいままだと、受け取れる上限を超えるため。
 *   縮めるときに、写真に入っている位置情報なども取り除かれる。
 *   選んだ写真はこの部品が持っておき、入力の誤りでフォームを作り直しても、消えないようにする。
 * - React 19 は、フォームの action が終わると入力欄を空に戻す。検査に落ちたときに入力が消えないよう、
 *   サーバーから返ってきた値を defaultValue に入れ、送信のたびに key を変えてフォームを作り直す。
 * - URL に ?product=（機種の型番）が付いていたら、「気になっている機種」に入れておく。
 */
type Picked = { id: string; name: string; blob: Blob; url: string };

export function EstimateForm({ note, preview = false, lineUrl }: { note: string; preview?: boolean; lineUrl: string }) {
  const [state, action, pending] = useActionState(submitEstimate, initialEstimateState);
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<Picked[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [busy, setBusy] = useState(false);
  /** 送信ごとの番号（二重送信の判定に使う）。最初の送信のときに1つ決めて、送り直しでも同じ番号を使う */
  const tokenRef = useRef("");
  /** 写真の一時的な URL（ページを離れるときに解放する） */
  const urlsRef = useRef(new Set<string>());
  const v = state.values ?? {};
  const err = state.errors ?? {};

  // 機種のページから来たとき：その機種を「気になっている機種」に入れる
  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product");
    const input = formRef.current?.elements.namedItem("desiredProduct") as HTMLInputElement | null;
    if (product && input && !input.value) input.value = product.slice(0, 120);
  }, [state.attempt]);

  // 結果が返ってきたら、メッセージの位置まで戻す
  useEffect(() => {
    if (state.status !== "idle") topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state.status, state.attempt]);

  // 写真の一時的な URL を、ページを離れるときに解放する
  useEffect(() => {
    const urls = urlsRef.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const release = (url: string) => {
    URL.revokeObjectURL(url);
    urlsRef.current.delete(url);
  };

  const pick = async (files: FileList | null) => {
    if (!files?.length) return;
    setPhotoError("");
    setBusy(true);
    const next = [...photos];
    let failed = 0;
    for (const file of Array.from(files)) {
      if (next.length >= PHOTO_RULES.maxFiles) {
        setPhotoError(`写真は${PHOTO_RULES.maxFiles}枚までお送りいただけます。`);
        break;
      }
      const blob = await shrinkPhoto(file);
      if (!blob) {
        failed += 1;
        continue;
      }
      const url = URL.createObjectURL(blob);
      urlsRef.current.add(url);
      next.push({ id: `${Date.now()}-${next.length}`, name: file.name, blob, url });
    }
    const total = next.reduce((n, p) => n + p.blob.size, 0);
    if (total > PHOTO_RULES.maxTotalBytes) {
      setPhotoError("写真の合計の容量が大きすぎます。枚数を減らすか、LINE でお送りください。");
      next.splice(photos.length).forEach((p) => release(p.url));
    } else if (failed) {
      setPhotoError(`${failed}枚の写真を読み込めませんでした。JPEG か PNG の写真でお試しいただくか、LINE でお送りください。`);
    }
    setPhotos(next);
    setBusy(false);
  };

  const remove = (id: string) => {
    photos.filter((p) => p.id === id).forEach((p) => release(p.url));
    setPhotos(photos.filter((p) => p.id !== id));
    setPhotoError("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // JS が動いているときは、選んだ写真（縮めたもの）を付けて、こちらから送る
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // このページを開いてから送信するまでの時間（ミリ秒）。迷惑送信の判定に使う。
    // 時刻そのものは送らない（端末の時計とサーバーの時計を比べると、時計のずれた端末からの送信が届かなくなる）
    fd.set("elapsed", String(Math.round(performance.now())));
    if (!tokenRef.current) tokenRef.current = newToken();
    fd.set("token", tokenRef.current);
    fd.delete("photos");
    photos.forEach((p, i) => fd.append("photos", p.blob, `photo-${i + 1}.jpg`));
    startTransition(() => action(fd));
  };

  const field = (name: EstimateField) => ({
    id: `f-${name}`,
    name,
    defaultValue: v[name] ?? "",
    "aria-invalid": err[name] ? (true as const) : undefined,
    "aria-describedby": err[name] ? `e-${name}` : undefined,
    className: "field mt-2",
  });

  const label = (name: EstimateField, required = false, hint?: string) => (
    <label htmlFor={`f-${name}`} className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.9375rem] font-bold text-ink">
      {estimateLabels[name]}
      {required && <span className="border border-heat px-1.5 py-0.5 text-[0.6875rem] font-bold leading-none text-heat">必須</span>}
      {hint && <span className="text-xs font-normal text-ink-mute">{hint}</span>}
    </label>
  );

  const errorOf = (name: EstimateField | "photos") =>
    err[name] ? (
      <p id={`e-${name}`} className="mt-1.5 text-sm font-bold text-heat">
        {err[name]}
      </p>
    ) : null;

  const select = (name: EstimateSelectField, hint?: string) => (
    <div>
      {label(name, false, hint)}
      <select {...field(name)}>
        <option value="">選んでください</option>
        {estimateOptions[name].map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {errorOf(name)}
    </div>
  );

  /** 選択肢の少ない項目は、押して選ぶ形にする（スマホで選びやすい） */
  const chips = (name: EstimateSelectField) => (
    <fieldset>
      <legend className="text-[0.9375rem] font-bold text-ink">{estimateLabels[name]}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {estimateOptions[name].map((o) => (
          <label key={o} className="opt">
            <input type="radio" name={name} value={o} defaultChecked={v[name] === o} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
      {errorOf(name)}
    </fieldset>
  );

  const group = (step: string, title: string, lead: string) => (
    <div className="border-b-2 border-dotted border-silver-300 pb-3">
      <p className="font-heading text-[0.8125rem] font-bold tracking-wider text-brand-700">{step}</p>
      <h2 className="h-sub mt-0.5">{title}</h2>
      <p className="mt-1 text-[0.8125rem] leading-[1.8] text-ink-mute">{lead}</p>
    </div>
  );

  return (
    <div ref={topRef} className="scroll-mt-24">
      {preview && (
        <p className="mb-6 rounded-2xl bg-paper-2 px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-mute">
          【確認用の表示】メール送信の設定（RESEND_API_KEY・CONTACT_TO_EMAIL）がまだのため、このフォームから送信しても届きません。本番では、設定が済むまで、フォームの代わりに電話と LINE の案内が表示されます。
        </p>
      )}
      {state.message && (
        <p role="alert" className="mb-6 border-l-2 border-heat py-1 pl-4 text-[0.9375rem] font-bold leading-relaxed text-heat">
          {state.message}
        </p>
      )}

      <form key={state.attempt} ref={formRef} action={action} onSubmit={onSubmit} noValidate className="space-y-12">
        {/* 迷惑送信の対策（人には見えない欄）。値が入っていたら送信しない。app/contact/actions.ts の TRAP_FIELD と同じ名前にする */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label>
            このまま空欄にしてください
            <input type="text" name="subject" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        {/* 空のまま届いたとき（JS が動かない環境）は、時間の判定をしない */}
        <input type="hidden" name="elapsed" defaultValue="" />

        {/* 1. ご連絡先 */}
        <div className="space-y-6">
          {group("1／3", "ご連絡先", "お名前と電話番号だけで送信できます。")}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              {label("name", true)}
              <input type="text" autoComplete="name" required placeholder="例：横浜 太郎" {...field("name")} />
              {errorOf("name")}
            </div>
            <div>
              {label("tel", true)}
              <input type="tel" inputMode="tel" autoComplete="tel" required placeholder="例：045-000-0000" {...field("tel")} />
              {errorOf("tel")}
            </div>
          </div>
          <div>
            {label("email", false, "メールでの返信をご希望の方")}
            <input type="email" inputMode="email" autoComplete="email" placeholder="例：name@example.com" {...field("email")} />
            {errorOf("email")}
          </div>
          <div>
            {label("area", false, "区・町名まででもかまいません")}
            <input type="text" autoComplete="street-address" placeholder="例：横浜市戸塚区○○町" {...field("area")} />
            {errorOf("area")}
          </div>
          {chips("housing")}
        </div>

        {/* 2. いまの給湯器 */}
        <div className="space-y-6">
          {group("2／3", "いまお使いの給湯器", "分かる範囲でかまいません。型番が分かると、合う機種をすぐにお調べできます。")}
          <div className="grid gap-6 sm:grid-cols-2">
            {select("currentMaker")}
            <div>
              {label("currentModel", false, "本体のシールに書いてあります")}
              <input type="text" autoComplete="off" autoCapitalize="characters" placeholder="例：RUF-A2405SAW" {...field("currentModel")} />
              {errorOf("currentModel")}
            </div>
            {select("currentInstall")}
            {select("currentGou")}
          </div>
          {select("reason")}

          {/* 写真 */}
          <div>
            <p className="text-[0.9375rem] font-bold text-ink">
              写真<span className="ml-2 text-xs font-normal text-ink-mute">型番のシール・本体の全体・リモコン（{PHOTO_RULES.maxFiles}枚まで）</span>
            </p>
            <div className="mt-2 rounded-2xl border-2 border-dashed border-silver-300 bg-paper-2 px-4 py-4">
              <label className="btn btn-outline btn-sm cursor-pointer">
                {busy ? "写真を読み込んでいます…" : "写真を選ぶ"}
                {/* name を付けない：写真は、縮めたものを onSubmit で付けて送る（縮める前の写真が、そのまま送られないように） */}
                <input type="file" accept={PHOTO_RULES.accept} multiple className="sr-only" disabled={busy || photos.length >= PHOTO_RULES.maxFiles} onChange={(e) => { void pick(e.target.files); e.target.value = ""; }} />
              </label>
              <p className="mt-2.5 text-[0.8125rem] leading-[1.8] text-ink-mute">
                写真は、送る前に自動で小さくします。うまく送れないときは、{lineUrl ? (
                  <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="text-link" data-cv="line">
                    LINE
                  </a>
                ) : (
                  "LINE"
                )}
                でもお送りいただけます。
              </p>
              {photos.length > 0 && (
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {photos.map((p, i) => (
                    <li key={p.id} className="relative overflow-hidden rounded-xl border border-silver-200 bg-white">
                      {/* 送る前の確認用の小さな表示（その場で作った画像なので、next/image は使わない） */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={`選んだ写真 ${i + 1}`} className="aspect-square w-full object-cover" />
                      <button type="button" onClick={() => remove(p.id)} className="absolute right-1 top-1 grid size-9 place-items-center rounded-full bg-navy-950/80 text-lg leading-none text-white" aria-label={`写真 ${i + 1} を外す`}>
                        ×
                      </button>
                      <p className="num px-2 py-1 text-[0.6875rem] text-ink-mute">{Math.round(p.blob.size / 1024)} KB</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p role="status" className="mt-1.5 text-sm font-bold text-heat empty:hidden">
              {photoError}
            </p>
            {errorOf("photos")}
          </div>
        </div>

        {/* 3. ご希望 */}
        <div className="space-y-6">
          {group("3／3", "ご希望", "まだ決まっていなければ、空欄のままで大丈夫です。")}
          {chips("desiredType")}
          <div>
            {label("desiredProduct", false, "型番やシリーズ名")}
            <input type="text" autoComplete="off" placeholder="例：ECO ONE、RUF-E2406SAW など" {...field("desiredProduct")} />
            {errorOf("desiredProduct")}
          </div>
          {chips("timing")}
          {chips("subsidy")}
          <div>
            {label("message")}
            <textarea rows={6} placeholder="例：15年使っている給湯器から、お湯がぬるいことがあります。床暖房も使っています。" {...field("message")} className="field mt-2 resize-y" />
            {errorOf("message")}
          </div>
        </div>

        <div>
          <p className="text-[0.8125rem] leading-[1.9] text-ink-mute">
            ご入力いただいた内容と写真は、お見積もりとご連絡のためにのみ使用します。くわしくは
            <Link href="/privacy" className="text-link mx-0.5">
              プライバシーポリシー
            </Link>
            をご覧ください。{note}
          </p>
          <button type="submit" disabled={pending || busy} className="btn btn-primary mt-5 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-[18rem]">
            {pending ? "送信しています…" : "この内容で送信する"}
          </button>
        </div>
      </form>
    </div>
  );
}
