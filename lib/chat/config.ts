/**
 * 自動応答チャットで AI を使えるか（このサイト用の ANTHROPIC_API_KEY があり、CHAT_AI=off でないとき）。
 * レイアウト（全ページ）から呼ぶので、API の部品（@anthropic-ai/sdk）はここで読み込まない。
 */
export function isChatAIEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY) && process.env.CHAT_AI !== "off";
}
