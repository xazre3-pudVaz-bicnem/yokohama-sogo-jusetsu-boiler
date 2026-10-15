import { z } from "zod";
import { estimateOptions, PHOTO_RULES, photoEstimateOptions, type EstimateSelectField, type PhotoEstimateSelectField } from "@/lib/contact-fields";

/**
 * お見積もりフォームの入力値の検査（サーバー側）。
 * 必須は お名前・電話番号 の2つ。ほかは任意（選択式の項目は、用意した選択肢か空だけを受け付ける）。
 * 項目名と表示名は lib/contact-fields.ts にある。
 */

/** 全角の数字・記号を半角にそろえる */
export function toHalfWidth(s: string): string {
  return s.replace(/[０-９Ａ-Ｚａ-ｚ＋＠．]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/[ー－−‐―]/g, "-");
}

/** 選択式の項目：空か、選択肢のどれか */
const choice = (field: EstimateSelectField) =>
  z.string().refine((v) => v === "" || (estimateOptions[field] as readonly string[]).includes(v), "選択肢から選んでください。");

export const estimateSchema = z.object({
  name: z.string().trim().min(1, "お名前を入力してください。").max(60, "お名前は60文字以内で入力してください。"),
  tel: z
    .string()
    .trim()
    .min(1, "電話番号を入力してください。")
    .transform(toHalfWidth)
    .refine((v) => /^[0-9+\-\s()]{10,18}$/.test(v) && v.replace(/[^0-9]/g, "").length >= 10, "電話番号を、市外局番から入力してください（例：045-000-0000）。"),
  email: z
    .string()
    .trim()
    .max(200, "メールアドレスが長すぎます。")
    .transform(toHalfWidth)
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), "メールアドレスの形を確認してください。"),
  area: z.string().trim().max(200, "ご住所は200文字以内で入力してください。"),
  housing: choice("housing"),
  currentMaker: choice("currentMaker"),
  currentModel: z.string().trim().max(80, "型番は80文字以内で入力してください。"),
  currentInstall: choice("currentInstall"),
  currentGou: choice("currentGou"),
  reason: choice("reason"),
  desiredType: choice("desiredType"),
  desiredProduct: z.string().trim().max(120, "機種名は120文字以内で入力してください。"),
  timing: choice("timing"),
  subsidy: choice("subsidy"),
  message: z.string().trim().max(3000, "ご相談の内容は3,000文字以内で入力してください。"),
});

export type Estimate = z.infer<typeof estimateSchema>;

/* ------------------------------------------------------------------ */
/* 写真でかんたん見積もり                                              */
/* ------------------------------------------------------------------ */

const photoChoice = (field: PhotoEstimateSelectField) =>
  z.string().refine((v) => v === "" || (photoEstimateOptions[field] as readonly string[]).includes(v), "選択肢から選んでください。");

/** 写真でかんたん見積もりの入力値の検査。必須は お名前・電話番号・工事の場所 */
export const photoEstimateSchema = z.object({
  name: estimateSchema.shape.name,
  tel: estimateSchema.shape.tel,
  email: estimateSchema.shape.email,
  area: z.string().trim().min(1, "工事をご希望の場所を、市区町村・町名まで入力してください。").max(200, "工事の場所は200文字以内で入力してください。"),
  housing: photoChoice("housing"),
  condition: photoChoice("condition"),
  gasType: photoChoice("gasType"),
  currentModel: z.string().trim().transform(toHalfWidth).pipe(z.string().max(80, "型番は80文字以内で入力してください。")),
  currentMaker: photoChoice("currentMaker"),
  manufactured: z.string().trim().max(40, "製造年月は40文字以内で入力してください。"),
  desiredType: photoChoice("desiredType"),
  desiredProduct: z.string().trim().max(120, "機種名は120文字以内で入力してください。"),
  contactPref: photoChoice("contactPref"),
  message: z.string().trim().max(1500, "ご要望は1,500文字以内で入力してください。"),
});

export type PhotoEstimate = z.infer<typeof photoEstimateSchema>;

/* ------------------------------------------------------------------ */
/* 写真                                                                */
/* ------------------------------------------------------------------ */

export type CheckedPhoto = { filename: string; contentBase64: string; bytes: number };

/** ファイルの先頭の並びから、画像の種類を見分ける（拡張子や申告された種類は信用しない） */
export function sniffImage(buf: Uint8Array): "jpg" | "png" | "webp" | null {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 && buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a) return "png";
  if (buf.length > 12 && buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return "webp";
  return null;
}

/**
 * 添付された写真を検査して、メールに付けられる形にする。
 * - 枚数・1枚の大きさ・合計の大きさを確かめる
 * - 中身が JPEG / PNG / WebP であることを、ファイルの先頭の並びで確かめる
 * - ファイル名は、こちらで付け直す（送られてきた名前は使わない）
 * 写真は、サーバーにもストレージにも保存しない。メールの添付として会社に届くだけ。
 */
export async function checkPhotos(
  files: File[],
  opts: { maxFiles?: number; maxTotalBytes?: number; names?: string[] } = {},
): Promise<{ ok: true; photos: CheckedPhoto[] } | { ok: false; message: string }> {
  const maxFiles = opts.maxFiles ?? PHOTO_RULES.maxFiles;
  const maxTotal = opts.maxTotalBytes ?? PHOTO_RULES.maxTotalBytes;
  const list = files.filter((f) => f && typeof f === "object" && f.size > 0);
  if (list.length === 0) return { ok: true, photos: [] };
  if (list.length > maxFiles) return { ok: false, message: `写真は${maxFiles}枚までお送りいただけます。` };

  let total = 0;
  const photos: CheckedPhoto[] = [];
  for (const [i, f] of list.entries()) {
    if (f.size > PHOTO_RULES.maxFileBytes) return { ok: false, message: "写真の容量が大きすぎます。枚数を減らすか、LINE でお送りください。" };
    total += f.size;
    if (total > maxTotal) return { ok: false, message: "写真の合計の容量が大きすぎます。枚数を減らすか、LINE でお送りください。" };
    const buf = new Uint8Array(await f.arrayBuffer());
    const kind = sniffImage(buf);
    if (!kind) return { ok: false, message: "写真は、JPEG・PNG・WebP の画像でお送りください。そのほかの形式の写真は、LINE でお送りいただけます。" };
    photos.push({ filename: `${opts.names?.[i] ?? `photo-${i + 1}`}.${kind}`, contentBase64: Buffer.from(buf).toString("base64"), bytes: f.size });
  }
  return { ok: true, photos };
}

/* ------------------------------------------------------------------ */
/* フォームを出すかどうか                                              */
/* ------------------------------------------------------------------ */

/**
 * フォームから送信できる状態か（メール送信の設定が済んでいるか）。
 *   RESEND_API_KEY   … Resend の API キー
 *   CONTACT_TO_EMAIL … お見積もりの依頼を受け取るメールアドレス（複数はカンマ区切り）
 */
export function isContactFormEnabled(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

/**
 * お見積もりフォームを画面に出すかどうか（サーバー側でだけ使う）。
 * - メール送信の設定が済んでいれば出す。
 * - 設定前でも、本番（VERCEL_ENV=production）以外では、確認用に出す。
 * 設定前の本番では、フォームを出さない。このとき、サイトの文章とボタンからも「フォーム」の案内を外す
 * （送れないフォームを案内しないため）。Vercel に設定を入れて公開し直せば、自動で元に戻る。
 */
export function isContactFormShown(): boolean {
  return isContactFormEnabled() || process.env.VERCEL_ENV !== "production";
}

/**
 * 写真から型番を読み取る機能を使えるか（Claude の API キーがあるか）。
 *   ANTHROPIC_API_KEY  … このサイト用のキー（Vercel の環境変数。コラムの自動投稿の GitHub のキーとは別に管理する）
 *   LABEL_READER=off   … キーがあっても、読み取りを止めたいとき
 */
export function isLabelReaderEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY) && process.env.LABEL_READER !== "off";
}
