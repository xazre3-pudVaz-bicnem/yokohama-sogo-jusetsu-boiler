import { z } from "zod";
import { isChatAIEnabled, streamAnswer, type ChatMessage } from "@/lib/chat/assistant";
import { answerFromFaq } from "@/lib/chat/fallback";

/**
 * 自動応答チャット（ゆげまる）の窓口。POST { messages: [{ role, content }] } → 答えの文字（少しずつ返す）。
 * - AI を使えるとき（ANTHROPIC_API_KEY があるとき）は、サイトの情報から AI が答える。ヘッダー x-chat-mode: ai
 * - 使えないときは、よくある質問から近い答えを返す。ヘッダー x-chat-mode: faq
 * 使いすぎを防ぐため、1つの接続元から短い時間に送れる回数と、1回の長さ・会話の長さを制限する。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) }))
    .min(1)
    .max(30),
});

/** 接続元ごとの回数（このサーバーの中だけで数える。目安の歯止め） */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 20;
const hits = new Map<string, number[]>();

function tooMany(key: string): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > LIMIT;
}

function text(body: string, status = 200, mode = "faq"): Response {
  return new Response(body, { status, headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-chat-mode": mode } });
}

export async function POST(req: Request): Promise<Response> {
  // ほかのサイトのページから呼ばせない（ブラウザが付ける Origin が、このサイトと違えば断る）
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return text("この窓口は、サイトの中からだけ使えます。", 403);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (tooMany(ip)) return text("短い時間に、たくさんのご質問が届きました。少し時間をおいてから、もう一度お試しください。", 429);

  let parsed: z.infer<typeof Body>;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return text("ご質問を読み取れませんでした。", 400);
  }

  // 直近の10件だけを使い、最初は利用者の発言から始める。1件ごとの長さも詰める
  const recent = parsed.messages.slice(-10);
  while (recent.length && recent[0].role !== "user") recent.shift();
  const messages: ChatMessage[] = [];
  for (const m of recent) {
    const content = m.content.slice(0, m.role === "user" ? 400 : 1500).trim();
    if (!content) continue;
    const last = messages[messages.length - 1];
    if (last && last.role === m.role) last.content += `\n${content}`;
    else messages.push({ role: m.role, content });
  }
  const question = [...messages].reverse().find((m) => m.role === "user")?.content;
  if (!question) return text("ご質問を入力してください。", 400);

  if (!isChatAIEnabled()) return text(answerFromFaq(question));

  return new Response(streamAnswer(messages, req.signal), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-chat-mode": "ai" },
  });
}
