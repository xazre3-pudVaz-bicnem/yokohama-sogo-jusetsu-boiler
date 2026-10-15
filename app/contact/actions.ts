"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { checkPhotos, estimateSchema, isContactFormEnabled, isLabelReaderEnabled, photoEstimateSchema, sniffImage, type CheckedPhoto, type Estimate, type PhotoEstimate } from "@/lib/contact";
import {
  ESTIMATE_FIELDS,
  estimateLabels,
  PHOTO_ESTIMATE_FIELDS,
  PHOTO_ESTIMATE_RULES,
  PHOTO_RULES,
  PHOTO_SLOTS,
  photoEstimateLabels,
  type EstimateField,
  type EstimateState,
  type LabelReadResult,
  type PhotoEstimateField,
  type PhotoEstimateState,
} from "@/lib/contact-fields";
import { readLabel } from "@/lib/label-reader";
import { siteConfig, primaryPhone, lineUrl } from "@/lib/site";

/**
 * お見積もりフォームの送信処理（Server Action）。
 *
 * 環境変数（README の「お見積もりフォーム」を参照）
 *   RESEND_API_KEY     … Resend の API キー（必須）
 *   CONTACT_TO_EMAIL   … 受け取るメールアドレス。複数はカンマ区切り（必須）
 *   CONTACT_FROM_EMAIL … 差出人（任意）。未設定なら、コーポレートサイトのドメインの noreply@（下の defaultFrom）。
 *                         Resend で、そのドメインを認証しておくこと
 *   CONTACT_AUTOREPLY  … "1" にすると、メールアドレスを入力した方へ受付のお知らせを送る
 *
 * 写真は、メールの添付として会社に届くだけで、サーバーにもストレージにも保存しない。
 *
 * 迷惑送信・二重送信の対策
 *   1. 人には見えない入力欄（honeypot）… 値が入っていたら、成功の画面へ送るだけで、何もしない
 *   2. 経過時間 … ページを開いてから送信までの時間を画面側で測る。早すぎたら、もう一度押してもらう
 *      （端末の時刻とサーバーの時計は比べない。時計が進んでいる端末からの送信が、届かなくなるため）
 *   3. 送信ごとの番号（token）… 同じ番号の送信が続けて届いたら、2通目は送らずに成功の画面へ（二重送信の防止）
 *   4. 同じ接続元からの、短い時間の連続送信を止める
 * 3 と 4 は、サーバーのメモリに覚えるだけの簡易なもの（サーバーが入れ替わると忘れる）。
 *
 * 検査に落ちたときは、入力値をそのまま返す（React 19 のフォームは送信後に入力欄を空にするため）。
 */

/** ページを開いてから、これより早い送信は、人の操作ではないとみなす（ミリ秒） */
const MIN_FILL_MS = 3000;
/** 人には見えない入力欄の名前（EstimateForm.tsx と同じにする）。ブラウザの自動入力が埋める語にしない */
const TRAP_FIELD = "subject";

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const seenTokens = new Map<string, number>();
const recentByClient = new Map<string, number[]>();

function prune(now: number) {
  for (const [k, t] of seenTokens) if (now - t > DUPLICATE_WINDOW_MS) seenTokens.delete(k);
  for (const [k, list] of recentByClient) {
    const kept = list.filter((t) => now - t <= RATE_WINDOW_MS);
    if (kept.length) recentByClient.set(k, kept);
    else recentByClient.delete(k);
  }
}

export async function submitEstimate(prev: EstimateState, formData: FormData): Promise<EstimateState> {
  const attempt = prev.attempt + 1;
  const raw = Object.fromEntries(ESTIMATE_FIELDS.map((k) => [k, String(formData.get(k) ?? "")])) as Record<EstimateField, string>;
  const fail = (message: string, errors?: EstimateState["errors"]): EstimateState => ({ status: "error", message, errors, values: raw, attempt });

  // 迷惑送信 1：人には見えない欄に値がある → 成功の画面へ送るだけ
  if (String(formData.get(TRAP_FIELD) ?? "").trim()) redirect("/contact/thanks");

  // 迷惑送信 2：ページを開いてから3秒未満の送信 → 送らずに、もう一度押してもらう（空のとき＝JS が動かない環境では判定しない）
  const elapsedRaw = String(formData.get("elapsed") ?? "").trim();
  const elapsed = Number(elapsedRaw);
  if (elapsedRaw !== "" && Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) {
    return fail("送信を確認できませんでした。お手数ですが、もう一度「この内容で送信する」を押してください。");
  }

  const parsed = estimateSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: NonNullable<EstimateState["errors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as EstimateField;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return fail("入力内容をご確認ください。", errors);
  }

  const photos = await checkPhotos(formData.getAll("photos").filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f));
  if (!photos.ok) return fail("写真をご確認ください。", { photos: photos.message });

  if (!isContactFormEnabled()) {
    const phone = primaryPhone();
    return {
      status: "unavailable",
      message: `ただいまフォームからの送信を準備しています。お手数ですが、${phone ? `お電話（${phone}）` : "お電話"}${lineUrl() ? "または LINE " : ""}でご連絡ください。`,
      values: raw,
      attempt,
    };
  }

  const now = Date.now();
  prune(now);

  // 二重送信：同じ番号の送信は、2通目を送らない
  const token = String(formData.get("token") ?? "").slice(0, 80);
  if (token && seenTokens.has(token)) redirect("/contact/thanks");

  // 連続送信：同じ接続元から、短い時間に何度も届いたら止める
  const client = ((await headers()).get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const recent = recentByClient.get(client) ?? [];
  if (recent.length >= RATE_MAX) {
    const phone = primaryPhone();
    return fail(`短い時間に続けて送信されたため、受け付けできませんでした。少し時間をおいてお試しいただくか、${phone ? `お電話（${phone}）` : "お電話"}でご連絡ください。`);
  }

  try {
    await sendNotification(parsed.data, photos.photos);
  } catch (e) {
    console.error("[estimate] 送信に失敗しました", e);
    const phone = primaryPhone();
    return fail(`送信できませんでした。時間をおいてもう一度お試しいただくか、${phone ? `お電話（${phone}）` : "お電話"}${lineUrl() ? "または LINE " : ""}でご連絡ください。`);
  }
  if (token) seenTokens.set(token, now);
  recentByClient.set(client, [...recent, now]);

  if (process.env.CONTACT_AUTOREPLY === "1" && parsed.data.email) {
    // 受付のお知らせは、失敗してもお見積もりの依頼自体は受け付ける
    await sendAutoReply(parsed.data, photos.photos.length).catch((e) => console.error("[estimate] 受付メールの送信に失敗しました", e));
  }
  redirect("/contact/thanks");
}

/**
 * 差出人の既定。コーポレートサイトのドメイン（Resend で認証済み）の noreply@ を使う。
 * 別のドメインから送るときは、Resend でそのドメインを認証したうえで、CONTACT_FROM_EMAIL に書く。
 */
function defaultFrom(): string {
  const host = new URL(siteConfig.corporateUrl).hostname.replace(/^www\./, "");
  return `${siteConfig.shortName} 給湯器専門サイト <noreply@${host}>`;
}

/** 送信先の API。RESEND_API_URL は、手元の試験でにせの受信サーバーへ向けるときだけ使う（本番では入れない） */
const RESEND_ENDPOINT = `${(process.env.RESEND_API_URL || "https://api.resend.com").replace(/\/+$/, "")}/emails`;

async function sendMail(payload: { to: string[]; subject: string; text: string; replyTo?: string; attachments?: { filename: string; content: string }[] }) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || defaultFrom(),
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      ...(payload.attachments?.length ? { attachments: payload.attachments } : {}),
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

/** 見ていた機種のページを、メールで開ける形にする（本番の URL が決まっていなければ、パスのまま） */
function pageUrl(path: string): string {
  if (!path) return "（なし）";
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
  return base ? `${base}${path}` : path;
}

function estimateText(d: Estimate): string {
  return ESTIMATE_FIELDS.map((k) => `■ ${estimateLabels[k]}\n${k === "productPage" ? pageUrl(d.productPage) : d[k] || "（未入力）"}`).join("\n\n");
}

async function sendNotification(d: Estimate, photos: CheckedPhoto[]) {
  const to = (process.env.CONTACT_TO_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const head = [d.area, d.currentGou, d.desiredType].filter(Boolean).join("／");
  await sendMail({
    to,
    subject: `【給湯器のお見積もり依頼】${d.name} 様${head ? `（${head}）` : ""}`,
    text: `給湯器専門サイトのお見積もりフォームから、ご依頼がありました。\n\n${estimateText(d)}\n\n■ 添付の写真\n${photos.length ? `${photos.length}枚` : "なし"}\n\n────────\n受付日時：${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
    replyTo: d.email || undefined,
    attachments: photos.map((p) => ({ filename: p.filename, content: p.contentBase64 })),
  });
}

async function sendAutoReply(d: Estimate, photoCount: number) {
  const phone = primaryPhone();
  await sendMail({
    to: [d.email],
    subject: `【${siteConfig.name}】お見積もりのご依頼を受け付けました`,
    text: `${d.name} 様\n\nこのたびは、${siteConfig.name}の給湯器専門サイトから、お見積もりをご依頼いただき、ありがとうございます。\n次の内容で受け付けました。担当者より、お電話またはメールでご連絡します。\n\n${estimateText(d)}\n\n■ 添付の写真\n${photoCount ? `${photoCount}枚` : "なし"}\n\n────────\n${siteConfig.name}${phone ? `\n電話：${phone}` : ""}\n※このメールは送信専用です。`,
  });
}

/* ------------------------------------------------------------------ */
/* 写真でかんたん見積もり（/contact/photo）                             */
/* ------------------------------------------------------------------ */

/** 接続元（x-forwarded-for の先頭）。分からなければ "unknown" */
async function clientOf(): Promise<string> {
  return ((await headers()).get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
}

/**
 * 写真でかんたん見積もりの送信。写真は欄ごとに photo-label・photo-whole・photo-extra の名前で届く。
 * 必須：お名前・電話番号・工事の場所と、型番のシールの写真（「シールが無い・読めない」を選んだときは、全体の写真）。
 */
export async function submitPhotoEstimate(prev: PhotoEstimateState, formData: FormData): Promise<PhotoEstimateState> {
  const attempt = prev.attempt + 1;
  const raw = Object.fromEntries(PHOTO_ESTIMATE_FIELDS.map((k) => [k, String(formData.get(k) ?? "")])) as Record<PhotoEstimateField, string>;
  const fail = (message: string, errors?: PhotoEstimateState["errors"]): PhotoEstimateState => ({ status: "error", message, errors, values: raw, attempt });

  if (String(formData.get(TRAP_FIELD) ?? "").trim()) redirect("/contact/thanks");
  const elapsedRaw = String(formData.get("elapsed") ?? "").trim();
  const elapsed = Number(elapsedRaw);
  if (elapsedRaw !== "" && Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) {
    return fail("送信を確認できませんでした。お手数ですが、もう一度「この内容で送信する」を押してください。");
  }

  const parsed = photoEstimateSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: NonNullable<PhotoEstimateState["errors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as PhotoEstimateField;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return fail("入力内容をご確認ください。", errors);
  }

  // 写真：欄ごとに集め、欄の上限を超えたものは受け取らない
  const files: File[] = [];
  const names: string[] = [];
  const counts: Record<string, number> = {};
  for (const slot of PHOTO_SLOTS) {
    const list = formData
      .getAll(`photo-${slot.id}`)
      .filter((x): x is File => typeof x === "object" && x !== null && "arrayBuffer" in x && (x as File).size > 0);
    if (list.length > slot.max) return fail("写真をご確認ください。", { photos: `「${slot.title}」の写真は${slot.max}枚までです。` });
    list.forEach((f, i) => {
      files.push(f);
      names.push(slot.max > 1 ? `${slot.file}-${i + 1}` : slot.file);
    });
    counts[slot.id] = list.length;
  }
  const labelMissing = String(formData.get("labelMissing") ?? "") === "1";
  if (!counts.label && !(labelMissing && counts.whole)) {
    return fail("写真をご確認ください。", {
      photos: labelMissing
        ? "シールが無い・読めないときは、給湯器の全体の写真をお送りください。"
        : "型番のシールの写真をお送りください（シールが無い・読めないときは、その旨を選んで、全体の写真を）。",
    });
  }
  const photos = await checkPhotos(files, { maxFiles: PHOTO_ESTIMATE_RULES.maxFiles, maxTotalBytes: PHOTO_ESTIMATE_RULES.maxTotalBytes, names });
  if (!photos.ok) return fail("写真をご確認ください。", { photos: photos.message });

  if (!isContactFormEnabled()) {
    const phone = primaryPhone();
    return {
      status: "unavailable",
      message: `ただいまフォームからの送信を準備しています。お手数ですが、${phone ? `お電話（${phone}）` : "お電話"}${lineUrl() ? "または LINE " : ""}でご連絡ください。LINE では、写真もそのままお送りいただけます。`,
      values: raw,
      attempt,
    };
  }

  const now = Date.now();
  prune(now);
  const token = String(formData.get("token") ?? "").slice(0, 80);
  if (token && seenTokens.has(token)) redirect("/contact/thanks");
  const client = await clientOf();
  const recent = recentByClient.get(client) ?? [];
  if (recent.length >= RATE_MAX) {
    const phone = primaryPhone();
    return fail(`短い時間に続けて送信されたため、受け付けできませんでした。少し時間をおいてお試しいただくか、${phone ? `お電話（${phone}）` : "お電話"}でご連絡ください。`);
  }

  const modelSource = String(formData.get("modelSource") ?? "");
  try {
    await sendPhotoNotification(parsed.data, photos.photos, { labelMissing, modelSource });
  } catch (e) {
    console.error("[photo-estimate] 送信に失敗しました", e);
    const phone = primaryPhone();
    return fail(`送信できませんでした。時間をおいてもう一度お試しいただくか、${phone ? `お電話（${phone}）` : "お電話"}${lineUrl() ? "または LINE " : ""}でご連絡ください。`);
  }
  if (token) seenTokens.set(token, now);
  recentByClient.set(client, [...recent, now]);
  redirect("/contact/thanks");
}

async function sendPhotoNotification(d: PhotoEstimate, photos: CheckedPhoto[], meta: { labelMissing: boolean; modelSource: string }) {
  const to = (process.env.CONTACT_TO_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const head = [d.area, d.currentMaker, d.currentModel].filter(Boolean).join("／");
  const source =
    meta.modelSource === "reader"
      ? "写真から読み取った値（お客様が確認）"
      : meta.modelSource === "reader-edited"
        ? "写真から読み取ったあと、お客様が直した値"
        : d.currentModel
          ? "お客様の入力"
          : "";
  const body = PHOTO_ESTIMATE_FIELDS.map((k) => {
    const v = k === "productPage" ? pageUrl(d.productPage) : d[k] || "（未入力）";
    return `■ ${photoEstimateLabels[k]}\n${v}${k === "currentModel" && source ? `\n（${source}）` : ""}`;
  }).join("\n\n");
  await sendMail({
    to,
    subject: `【写真でかんたん見積もり】${d.name} 様${head ? `（${head}）` : ""}`,
    text: `給湯器専門サイトの「写真でかんたん見積もり」から、ご依頼がありました。\n\n${body}\n\n■ 添付の写真\n${photos.length}枚（${photos.map((p) => p.filename).join("、")}）${meta.labelMissing ? "\n※ 型番のシールが無い・読めない、と選ばれています" : ""}\n\n────────\n受付日時：${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
    replyTo: d.email || undefined,
    attachments: photos.map((p) => ({ filename: p.filename, content: p.contentBase64 })),
  });
}

/* 型番の読み取り：同じ接続元からの回数を制限する（API の使いすぎと、いたずらを防ぐ） */
const READ_WINDOW_MS = 10 * 60 * 1000;
const READ_MAX = 8;
const readsByClient = new Map<string, number[]>();

/**
 * 型番のシールの写真から、型番・メーカー・製造年月を読み取る（お客様が「写真から型番を読み取る」を押したとき）。
 * 写真は保存しない。読み取った結果は、画面でお客様に確かめてもらう。
 */
export async function readLabelPhoto(formData: FormData): Promise<LabelReadResult> {
  if (!isLabelReaderEnabled()) return { ok: false, message: "いまは写真から型番を読み取れません。型番がお分かりなら入力し、分からなければそのままお進みください。" };
  const file = formData.get("photo");
  if (!file || typeof file !== "object" || !("arrayBuffer" in file) || (file as File).size === 0) return { ok: false, message: "写真が届きませんでした。もう一度お試しください。" };
  if ((file as File).size > PHOTO_RULES.maxFileBytes) return { ok: false, message: "写真の容量が大きすぎます。別の写真でお試しください。" };
  const buf = new Uint8Array(await (file as File).arrayBuffer());
  const kind = sniffImage(buf);
  if (!kind) return { ok: false, message: "写真は、JPEG・PNG・WebP の画像でお試しください。" };

  const now = Date.now();
  const client = await clientOf();
  const recent = (readsByClient.get(client) ?? []).filter((t) => now - t <= READ_WINDOW_MS);
  if (recent.length >= READ_MAX) return { ok: false, message: "読み取りの回数が上限に達しました。型番を入力するか、そのままお進みください。" };
  readsByClient.set(client, [...recent, now]);

  try {
    const r = await readLabel({ base64: Buffer.from(buf).toString("base64"), mediaType: kind === "jpg" ? "image/jpeg" : kind === "png" ? "image/png" : "image/webp" });
    if (!r.isNameplate) return { ok: false, message: "型番のシールを見つけられませんでした。シールの文字が読めるように近づいて撮り直すか、型番を入力してください。" };
    if (!r.modelNumber) return { ok: false, message: "型番を読み取れませんでした。そのままお進みいただくか、型番を入力してください（写真は、このまま送られます）。" };
    return { ok: true, modelNumber: r.modelNumber, maker: r.maker, manufactured: r.manufactured, confidence: r.confidence };
  } catch (e) {
    console.error("[label-reader] 読み取りに失敗しました", e);
    return { ok: false, message: "いまは読み取りができませんでした。そのままお進みいただくか、型番を入力してください。" };
  }
}
