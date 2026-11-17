/**
 * 型番の照らし合わせ（表示には使わない）。全角・半角、空白、ハイフンの種類、大文字・小文字のゆれをそろえる。
 * サーバー側（lib/successors.ts）と、ブラウザの検索（components/product/SuccessorFinder.tsx）の両方で使うので、ほかを読み込まない。
 */
export function normalizeModel(s: string): string {
  return s
    .normalize("NFKC")
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[‐‑‒–—―ー−]/g, "-");
}
