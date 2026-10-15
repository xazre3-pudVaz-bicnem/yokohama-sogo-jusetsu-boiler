"use client";

import { PHOTO_RULES } from "@/lib/contact-fields";

/**
 * 写真を、送る前に画面側で縮めて JPEG にする（長い辺 1600px）。読めない形式のときは null。
 * 大きいままだと受け取れる上限を超えるため。縮めるときに、写真に入っている位置情報なども取り除かれる。
 * お見積もりフォーム（EstimateForm）と、写真でかんたん見積もり（PhotoEstimateForm）で使う。
 */
export async function shrinkPhoto(file: File): Promise<Blob | null> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, PHOTO_RULES.maxEdge / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    for (const quality of [0.82, 0.7, 0.55]) {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
      if (blob && blob.size <= PHOTO_RULES.maxFileBytes) return blob;
    }
    return null;
  } catch {
    return null;
  }
}

/** 送信ごとの番号（二重送信の判定に使う） */
export function newToken(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
