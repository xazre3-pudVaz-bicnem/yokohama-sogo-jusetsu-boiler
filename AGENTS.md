<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 横浜総合住設 給湯器専門サイト（Codex 向けの約束ごと）

このリポジトリの決まりは [CLAUDE.md](CLAUDE.md) にある。作業の前に必ず読み、Claude Code と同じように守る。
制作の基準は `c:\projects\AGENTS.md`。

## 画像を作るとき（imagegen・ChatGPT の画像生成）

作ってよいもの

- 製品ではない、ページの雰囲気をつくる画像。背景の質感や模様、暮らしの情景（お湯・浴室・キッチンなど）、仕組みを説明するイラスト。
- 人物は、イラストにするか、当社のスタッフ・お客様と誤解されない描き方にとどめる。

作らないもの（CLAUDE.md の「事実と推測」）

- 給湯器・エコキュート・ハイブリッド給湯器・リモコンなど、製品の画像。実在の型番に見えるものも、架空の製品も作らない。製品の写真は、メーカーの公式写真だけ（`data/products/images.json`）。
- メーカーのロゴ、ロゴに似せた図柄、他社のブランド名の入った画像。
- 施工事例・工事の現場・スタッフ・お客様・事務所・車両・口コミ・資格証・メディア掲載の写真に見える画像。当社の実際の写真の代わりに使わない（人物のイラストは、上の「作ってよいもの」のとおり）。
- 割引率・順位（「人気No.1」など）・金額の文字が入った画像。

保存と記録

- 候補は `assets/generated/` に置く（Git に入らない）。`public/` に候補を置かない（置いたものはすべて公開される）。
- 使う画像だけを WebP にして `public/images/ai/<内容が分かる英語の名前>.webp` に置く。長い辺は 1920px まで、できれば 300KB 以下にする。既存のファイルは上書きしない。
- `npm run images:prepare` で画像の一覧（`data/images.generated.json`）を作り直し、画面では `img("ai/<名前>")`（`lib/images.ts`）で使う。
- `docs/IMAGE_SOURCES.md` の「AI で作った画像」の表に、ファイル・使う場所・作った日・モデル・プロンプトを書く（節が無ければ作る）。
- 写真のように見える画像には、近くに「写真はイメージです」と添える。alt は写っている内容をそのまま書き、実在の現場や人物のように書かない。
- API キーは要らない（ChatGPT のアカウントで動く）。OPENAI_API_KEY を使う場合も、値をリポジトリやチャットに書かない。
- 画像を足したら `npm run typecheck`・`npm run lint`・`npm run build`・`npm run site:check` を通す。commit・push は、頼まれてから。
