import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { ogCards, type OgTone } from "@/lib/og";
import { SITE_URL } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/**
 * ページごとの共有画像（OGP・1200×630）。URL は /og/<ページのパス>.png（トップは /og/index.png）。lib/seo.ts の ogImagePath と対応する。
 * - ビルドのときに、lib/og.ts のページの一覧から作る（一覧に無いパスは 404）。
 * - 背景はトップの冒頭と同じ泡の絵、ロゴのマークは画像のまま、キャラクターはゆげまる（どちらも AI で作った製品以外の画像）。
 *   製品の写真・メーカーのロゴは使わない。
 * - 文字は Zen Kaku Gothic New（Google Fonts・OFL）。その画像に使う文字だけを、ビルドのときに読み込む。
 *   読み込めなかったときは、前からある共通の画像（/og-image.jpg）を返す（ビルドを止めない）。
 */
export const dynamic = "force-static";
export const dynamicParams = false;

const TONE: Record<OgTone, string> = { red: "#d40f29", green: "#0a7f37", blue: "#0570a8", purple: "#6d4ad8", orange: "#c25400", navy: "#2b2b2b" };

/**
 * 折り返してよい所（「の」「・」「、」「）」の後と「（」の前）で、文をまとまりに分ける。
 * 画像では、まとまりを1つずつ並べ、まとまりの間でだけ折り返す（語の途中「給／湯器」などで折り返さないように）。
 */
const phrases = (s: string): string[] => s.split(/(?<=[の・、）])|(?=（)/).filter(Boolean);
/** 文字の幅の見積もり（em。半角の英数字は 0.6、それ以外は 1） */
const emWidth = (s: string) => [...s].reduce((w, ch) => w + (/[ -~]/.test(ch) ? 0.6 : 1), 0);
/** まとまりを、幅に収まるように行へ詰める（画像を作る仕組みが、まとまりの間での折り返しに対応しないため、こちらで決める） */
function toLines(text: string, size: number, width: number): string[] {
  const out: string[] = [];
  let cur = "";
  for (const ph of phrases(text)) {
    if (cur && emWidth(cur + ph) * size > width) {
      out.push(cur);
      cur = ph;
    } else cur += ph;
  }
  if (cur) out.push(cur);
  return out;
}
/** 見出しが2行に収まる、いちばん大きな文字の大きさ */
function fitHead(text: string, width: number): { size: number; lines: string[] } {
  for (const size of [68, 60, 54, 48, 44]) {
    const ls = toLines(text, size, width);
    if (ls.length <= 2 && ls.every((l) => emWidth(l) * size <= width)) return { size, lines: ls };
  }
  return { size: 44, lines: toLines(text, 44, width) };
}

/** ["guide", "cost.png"] → "/guide/cost"、["index.png"] → "/" */
function pagePath(parts: string[]): string | null {
  const last = parts.at(-1);
  if (!last?.endsWith(".png")) return null;
  const segs = [...parts.slice(0, -1), last.slice(0, -4)];
  return segs.length === 1 && segs[0] === "index" ? "/" : `/${segs.join("/")}`;
}

export function generateStaticParams() {
  return [...ogCards().keys()].map((p) => {
    const segs = p === "/" ? ["index"] : p.slice(1).split("/");
    segs[segs.length - 1] += ".png";
    return { path: segs };
  });
}

const dataUrl = async (rel: string, w: number, h: number, fit: "cover" | "contain", format: "jpeg" | "png") => {
  const img = sharp(path.join(process.cwd(), "public", rel)).resize(w, h, { fit, background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const buf = await (format === "jpeg" ? img.jpeg({ quality: 82 }) : img.png()).toBuffer();
  return `data:image/${format};base64,${buf.toString("base64")}`;
};
let assets: Promise<{ bg: string; mark: string; mascot: string }> | null = null;
const loadAssets = () =>
  (assets ??= Promise.all([
    dataUrl("images/ai/hero-bubbles.webp", 1200, 630, "cover", "jpeg"),
    dataUrl("images/brand/logo-mark.png", 281, 240, "contain", "png"),
    dataUrl("images/ai/mascot-point.webp", 440, 468, "contain", "png"),
  ]).then(([bg, mark, mascot]) => ({ bg, mark, mascot })));

/** その画像に使う文字だけを含む書体（Google Fonts の text 指定。TrueType で受け取る） */
async function font(text: string, weight: 700 | 900): Promise<ArrayBuffer> {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
  const url = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/)?.[1];
  if (!url) throw new Error("書体を読み込めませんでした");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`書体を読み込めませんでした（${res.status}）`);
  return res.arrayBuffer();
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const p = pagePath((await params).path);
  const card = p ? ogCards().get(p) : undefined;
  if (!card) return new Response("Not Found", { status: 404 });

  // 「見出し｜小見出し」に分ける（末尾の社名は、画像の上部に出すので省く）
  const [head, ...rest] = card.title.split("｜");
  const sub = rest.filter((s) => s !== siteConfig.name && s !== siteConfig.shortName).join("・");
  const host = SITE_URL ? new URL(SITE_URL).host : "";
  const brand = siteConfig.name;
  // 折り返さずに並べる、いちばん長いまとまりが、幅（760px）に収まる大きさにする
  const headFit = fitHead(head, 760);
  const subLines = sub ? toLines(sub, 27, 760) : [];

  try {
    const text = `${card.label}${head}${sub}${brand}${siteConfig.siteLabel}${host}`;
    const [a, bold, black] = await Promise.all([loadAssets(), font(text, 700), font(text, 900)]);
    return new ImageResponse(
      (
        <div style={{ width: 1200, height: 630, display: "flex", position: "relative", fontFamily: "Zen" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.bg} width={1200} height={630} alt="" style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 630, objectFit: "cover" }} />
          <div style={{ position: "absolute", left: 48, top: 48, width: 1104, height: 534, display: "flex", flexDirection: "column", padding: "48px 56px", borderRadius: 40, background: "rgba(255,255,255,0.93)", boxShadow: "0 8px 0 rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.mark} width={70} height={60} alt="" />
              <div style={{ display: "flex", flexDirection: "column", marginLeft: 18 }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#262626", letterSpacing: 2 }}>{brand}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#d40f29", letterSpacing: 5, marginTop: 4 }}>{siteConfig.siteLabel}</div>
              </div>
            </div>
            <div style={{ display: "flex", marginTop: 30 }}>
              <div style={{ display: "flex", fontSize: 26, fontWeight: 900, color: "#fff", background: TONE[card.tone], padding: "8px 26px", borderRadius: 999 }}>{card.label}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 18, width: 760, fontSize: headFit.size, fontWeight: 900, lineHeight: 1.25, color: "#262626" }}>
              {headFit.lines.map((l, i) => (
                <div key={i} style={{ display: "flex" }}>
                  {l}
                </div>
              ))}
            </div>
            {subLines.length ? (
              <div style={{ display: "flex", flexDirection: "column", marginTop: 12, width: 760, fontSize: 27, fontWeight: 700, lineHeight: 1.45, color: "#4a4a4a" }}>
                {subLines.map((l, i) => (
                  <div key={i} style={{ display: "flex" }}>
                    {l}
                  </div>
                ))}
              </div>
            ) : null}
            {host ? <div style={{ display: "flex", marginTop: "auto", paddingTop: 14, fontSize: 22, fontWeight: 700, color: "#616161", letterSpacing: 1 }}>{host}</div> : null}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.mascot} width={220} height={234} alt="" style={{ position: "absolute", right: 86, bottom: 70 }} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: "Zen", data: bold, weight: 700, style: "normal" },
          { name: "Zen", data: black, weight: 900, style: "normal" },
        ],
      },
    );
  } catch (e) {
    console.warn(`[og] ${p} の共有画像を作れませんでした。共通の画像を返します。`, e);
    const fallback = await fs.readFile(path.join(process.cwd(), "public", "og-image.jpg"));
    return new Response(new Uint8Array(fallback), { headers: { "content-type": "image/jpeg" } });
  }
}
