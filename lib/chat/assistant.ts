import Anthropic from "@anthropic-ai/sdk";
import { buildKnowledge, CHAT_RULES } from "@/lib/chat/knowledge";
export { isChatAIEnabled } from "@/lib/chat/config";

/**
 * 自動応答チャット（ゆげまる）の、AI で答える部分。サーバー側だけで使う（API キーを扱うため、クライアントから import しない）。
 *
 * - キーは、このサイト用の ANTHROPIC_API_KEY（Vercel の環境変数）。無いとき・CHAT_AI=off のときは AI を使わない
 *   （画面は「自動応答チャット」として、よくある質問から答える。lib/chat/fallback.ts）。
 * - モデルは CHAT_MODEL で切り替える（既定 claude-haiku-5-5。サイトの情報から短く答える作業なので、軽いモデルで足りる。
 *   より丁寧に答えさせたいときは claude-sonnet-5-5 などに変える）。
 * - サイトの情報（約1.4万字）は、毎回同じなので、キャッシュに置いて料金と時間を抑える（cache_control）。
 * - 答えは少しずつ返す（ストリーミング）。画面は、届いた文字から順に表示する。
 */
const MODEL = process.env.CHAT_MODEL || "claude-haiku-5-5";

export type ChatMessage = { role: "user" | "assistant"; content: string };

let knowledge: string | null = null;
function siteKnowledge(): string {
  knowledge ??= buildKnowledge();
  return knowledge;
}

/** 答えを少しずつ返す（UTF-8 の文字の流れ）。途中で失敗したとき・答えが空のとき（安全のための判定で答えない場合など）は、その旨を書いて終える */
export function streamAnswer(messages: ChatMessage[], signal?: AbortSignal): ReadableStream<Uint8Array> {
  const client = new Anthropic({ timeout: 30_000, maxRetries: 1 });
  const encoder = new TextEncoder();
  const stream = client.messages.stream(
    {
      model: MODEL,
      max_tokens: 1500,
      system: [
        { type: "text", text: CHAT_RULES },
        { type: "text", text: `# サイトの情報\n\n${siteKnowledge()}`, cache_control: { type: "ephemeral" } },
      ],
      messages,
      output_config: { effort: "low" },
    },
    { signal },
  );
  let cancelled = false;
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let wrote = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta" && event.delta.text) {
            controller.enqueue(encoder.encode(event.delta.text));
            wrote = true;
          }
        }
        if (!wrote) controller.enqueue(encoder.encode("ごめんなさい、このご質問には、ここではお答えできませんでした。お電話か LINE で、担当者にご相談ください。"));
      } catch (e) {
        // 利用者が画面を閉じて打ち切ったときは、何も書かずに終える
        if (cancelled || signal?.aborted) return;
        console.error("[chat] 答えの作成に失敗しました", e);
        controller.enqueue(encoder.encode("\n\nごめんなさい、いまうまくお答えできませんでした。少し時間をおいて、もう一度お試しください。お急ぎのときは、お電話か LINE でご相談ください。"));
      }
      controller.close();
    },
    cancel() {
      cancelled = true;
      stream.abort();
    },
  });
}
