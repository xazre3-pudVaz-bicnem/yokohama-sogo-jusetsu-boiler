# 横浜総合住設 給湯器専門サイト

株式会社 横浜総合住設（ヨコジュウ）の、給湯器の販売・交換工事に特化したサイトです。
コーポレートサイト（https://www.yokohama-sogo-jusetsu.com/ ・リポジトリ `yokohamatotalhousingsolutions`）とは別のリポジトリ・別の Vercel プロジェクトで運用します。環境変数も別に管理します。

- Next.js 16（App Router）・React 19・TypeScript・Tailwind CSS v4
- ページは静的に生成（お見積もりフォームの送信だけ Server Action）
- 商品・補助金・地域・解説の内容は `data/` のデータから作る

公開前に確かめることは `docs/TODO.md` にまとめています。

## 1. 手元で動かす

```bash
npm ci
cp .env.example .env.local   # 必要な値だけ入れる（空でも動く）
npm run dev                  # http://localhost:3000
```

`NEXT_PUBLIC_SITE_URL` が空のあいだは、全ページが noindex になり、canonical・sitemap は出ません（公開前のサイトが検索結果に出ないように）。

## 2. コマンド

| コマンド | すること |
| --- | --- |
| `npm run dev` / `build` / `start` | 開発サーバー・本番ビルド・ビルドの起動 |
| `npm run typecheck` / `lint` | 型の検査・ESLint |
| `npm run data:check` | 商品・解説・地域のデータの検査（型番の重複、補助額と制度の額、写真の記録、リンク切れ、メモ書きの残り） |
| `npm run images:check` | 製品写真とメーカーのロゴの検査（ファイルの有無・壊れていないか・大きさ・取得元が公式のドメインか・型番との対応の記録）。`-- --write` で `docs/PRODUCT_IMAGE_AUDIT.md` を作り直す |
| `npm run site:check` | ビルドした HTML の検査（title・description・h1・alt・JSON-LD・リンク切れ・noindex）。先に `build` |
| `npm run seo:audit` | 検索語の取り合い・sitemap との食い違い・本文の量。結果は `docs/seo-audit-report.md`。先に `build` |
| `npm run check` | 上の検査をまとめて実行 |
| `npm run subsidy:budget` | 補助金の予算の割合を公式ページから取り直す（毎日の自動実行で使う） |
| `npm run subsidy:check` | 補助額・期限・掲載機種の登録を、公式ページと照合する |
| `npm run images:prepare` | `public/images/` の画像の一覧（`data/images.generated.json`）とヒーロー・OGP 画像を作り直す |
| `npm run images:apply -- <フォルダ>` | 製品写真・ロゴの取得の記録（manifest-<メーカー>.json）を、`data/products/images.json`・`data/brand-logos.json` に取り込む（`docs/IMAGE_SOURCES.md`） |
| `npm run blog:*` | コラムの自動投稿（下の「コラムの自動投稿」） |

## 3. フォルダの構成

```
app/                 ページ（App Router）
  page.tsx           トップ（15の区画）
  products/          商品の一覧（絞り込み）・メーカー別・機種のページ
  gas-water-heater/ eco-jozu/ ecocute/ hybrid/ ene-farm/   種類のページ
  subsidy/           補助金（11ページ。本文は data/subsidy/pages.ts）
  guide/ trouble/    選び方・故障とトラブル（本文は data/guides.ts・data/troubles.ts）
  area/              対応エリア（本文は data/areas.ts）
  compare/           機種の比較（noindex）
  contact/           お見積もりフォームと送信後のページ
  blog/              コラム（content/blog/*.md）
components/          画面の部品（ui・layout・product・content・diagram・home・blog）
data/                商品・補助金・地域・解説・よくある質問・施工事例のデータ
lib/                 サイトの設定（site.ts）・SEO・構造化データ・補助金の状態・URL の一覧（routes.ts）
scripts/             検査・補助金の照合・画像・コラムの生成
docs/                確認事項・調査の記録・提案
content/blog/        コラムの記事（自動投稿で増える）
```

## 4. 会社の情報

会社名・住所・電話・LINE・受付時間は `lib/site.ts` の1か所です。コーポレートサイトと同じ内容にしてあります（2026-10-14 に照合）。変わったら、ここを直すと全ページと構造化データに反映されます。
給湯省エネ2026事業の登録事業者かどうかは、会社に確かめるまで「登録済み」と書かない設定です（`subsidyOperator`）。

## 5. 補助金の情報

- 金額・期限・条件は `data/subsidy/programs.ts` にだけ書きます。ページの文章では `{{名前}}` で参照します（`lib/tokens.ts`）。
- 予算の割合は、毎日の自動実行（`.github/workflows/daily-blog.yml`）が `npm run subsidy:budget` で取り直し、`data/subsidy/budget.generated.json` を更新します。取り直せない日が7日続くと、古い割合は画面に出さず、公式ページへのリンクだけにします。
- 予算が 100％ に達したとき、期限を過ぎたときは、表示が自動で「受付終了」に切り替わります（`lib/subsidy.ts`）。制度が終わったら `status: "closed"` も書いてください。
- 全ページを1時間ごとに描き直す設定（ISR・`app/layout.tsx` の `revalidate`）にしてあるので、デプロイが止まった日も、日付による切り替えは遅くとも1時間で反映されます。記事を読むページのために、`content/blog` を同梱しています（`next.config.ts`）。`content/blog/_README.md` は、記事が0本のときもフォルダーを残すためのものなので、消さないでください。
- 内容を直したら、確認日（`verifiedAt`）と `docs/VERIFIED_FACTS.md`（コラムの生成が読む事実シート）も直します。

## 6. 商品データ

`docs/PRODUCT_DATA.md` に、調べ方・載せなかった機種・価格と補助金の扱いをまとめています。
当社の販売価格は、会社から受け取るまで「お見積もり」です。メーカー希望小売価格は参考として、当社の価格と分けて表示します。

## 7. お見積もりフォーム

- 送信は Resend（`RESEND_API_KEY`）で、受信先は `CONTACT_TO_EMAIL`（カンマ区切りで複数可）。送信元は `CONTACT_FROM_EMAIL`（Resend で認証したドメインのアドレス）。
- 写真は、ブラウザで縮小してから（長い辺 1600px の JPEG）メールに添付します。サーバーには保存しません。
- 迷惑な送信の対策：見えない入力欄、入力にかかった時間（ブラウザで測る）、同じ内容の二重送信、送信元ごとの回数の上限。
- 本番で2つの値が無いあいだは、フォームを出さず、電話と LINE を案内します（プレビューでは表示だけされます）。
- 設定したら、本番で1回テスト送信し、受信先に届くこと・写真が添付されることを確かめてください。

## 7-2. 写真でかんたん見積もり（/contact/photo）

- チャットの形で、①給湯器の状態などの質問 → ②写真（型番のシール・本体の全体・そのほか3枚まで）→ ③型番 → ④ご連絡先 → ⑤確認、の順に送るフォームです（7-4）。ページ末尾の案内・スマホ下部の「写真で見積もり」は、ここにつながっています。商品カード・機種のページの「この商品で見積もり」は、項目を入力するフォーム（/contact）に、メーカー・型番・商品名と、見ていたページ（メールに載る）を引き継ぎます。
- **メール送信の設定（`RESEND_API_KEY`・`CONTACT_TO_EMAIL`）が無い本番では、どちらのフォームも出さず、チャットで答えた内容を LINE で送る形（QR コード・ID・電話つき）にします**（動かないフォームへ誘導しないため）。設定すると、自動でフォームに切り替わります。
- 必須は、お名前・電話番号・工事の場所と、型番のシールの写真（「シールが無い・読めない」を選んだときは、全体の写真）。
- 送信は、お見積もりフォームと同じ Resend の設定（`RESEND_API_KEY`・`CONTACT_TO_EMAIL`）で届きます。写真は欄ごとの名前（`1-kataban.jpg`・`2-zentai.jpg`・`3-sonota-1.jpg`…）で添付されます。
- **写真から型番を読み取る（任意）**：Vercel に `ANTHROPIC_API_KEY` を入れると、型番のシールの写真の下に「写真から型番を読み取る」ボタンが出ます。押したときだけ、その写真を Claude（既定 `claude-haiku-5-5`、`LABEL_READER_MODEL` で変更）に送り、型番・メーカー・製造年月を入力欄に入れます。お客様に確かめてもらう前提で、見積もりの判断には自動で使いません。写真は保存しません。回数は接続元ごとに10分で8回まで。止めるときは `LABEL_READER=off`。プライバシーポリシーの「4.」に、この送信のことを書いてあります。
- 手元での試験：にせの受信サーバーを立てて `RESEND_API_URL`（と、読み取りの試験なら `ANTHROPIC_BASE_URL`）をそこに向けると、メールの中身と添付を確かめられます。本番では、この2つは入れません。

## 7-3. 自動応答チャット（ゆげまる・画面の右下）

- 右下の雲の吹き出しとキャラクター「ゆげまる」を押すと開きます（お問い合わせのページでは出しません）。部品は `components/chat/`、窓口は `app/api/chat/route.ts`。
- **Vercel に `ANTHROPIC_API_KEY`（このサイト用）があると、AI で答えます**（既定 `claude-haiku-5-5`、`CHAT_MODEL` で変更）。答えに使うのは、サイトのデータ（会社・67機種・補助金・よくある質問・解説ページ）だけ（`lib/chat/knowledge.ts`）。当社の価格・工事の日程・保証の年数など、データに無いことは答えず、見積もりを案内します。
- キーが無いとき（いまの本番）・`CHAT_AI=off` のときは「自動応答チャット」として、サイトに載せている「よくある質問」（/faq と、解説ページごとの質問）から近い答えを返し、合う解説ページを案内します（`lib/chat/fallback.ts`）。答えの文はサイトの文のままで、新しく作りません。近いものが無ければ、見積もり・LINE・電話を案内します。AI とは名乗りません。
  - 照合を直したら、`lib/chat/fallback.ts` の `rankFaq`（近い問い・ページと点数を返す）で、よくある尋ね方を確かめてください。
- 会話はブラウザのタブの中にだけ残り、サーバーには保存しません。使いすぎを防ぐため、接続元ごとに10分で20回まで、1回400字まで。ほかのサイトからは呼べません。プライバシーポリシーの「4.」に書いてあります。

## 7-4. チャットの形の見積もり

- 写真でかんたん見積もり（/contact/photo）は、ゆげまるが吹き出しで聞き、大きなボタンで答える形です（①給湯器の状態・ガスの種類・住まい・希望の種類 → ②写真 → ③型番 → ④ご連絡先 → ⑤確認。上に「あと◯問」）。
- メール送信の設定が無い本番では、同じ形で4つの質問に答えると、その答えを書き込んだ状態で LINE のトークが開きます（`components/contact/LineChatEstimate.tsx`。写真は LINE で送ってもらう）。お見積もりのページ（/contact）も、設定が無いあいだは同じです。

## 8. コラムの自動投稿

- **いつ**：GitHub Actions（`.github/workflows/daily-blog.yml`）が毎日 9:17（日本時間）に1回動きます。今日の記事がすでにあれば何もしないので、遅れて動いた回や手動の2回目でも、1日に2本は書きません。
- **何を**：`lib/blog-generator/topics.ts` の20のジャンル・75の題材から、優先度の順に1つ選びます。固定ページ（補助金・選び方・故障・地域）と同じ検索語は取りません。補助金の状況や新製品など、その日の公式情報が要る題材は、公式ページを取り直せた日だけ書き、取り直せなければ普遍的な題材に替えます。3割ほどの日は、新しい記事の代わりに、公開済みの記事を1本見直します。
- **事実**：書き手には `docs/VERIFIED_FACTS.md`（事実シート・出典つき）のうち、いつも渡す節（会社・補助金の額と期限・禁止の表現）と、題材に必要な節だけを渡します。シートは `npm run blog:facts` でデータ（`data/subsidy/programs.ts`・`lib/site.ts`・`data/areas.ts`・商品データ）から作り直します。**これらのデータを直したら、`npm run blog:facts` を実行**してください（しないと、毎日の自己検査が止めます）。
- **検査**：書く前に `blog:selftest`、書いたあとに機械の検査（長さ・見出し・です・ます・使えない表現・事実シートに無い数字・実在しない型番・地名の連呼・リンク・出典・重複）と、別の呼び出しでの読み直しを行い、通らなければ最大4回まで書き直します。通った記事も `blog:audit --strict`、ビルド、`site:check`、`seo:audit` に通ったときだけ push します。
- **モデル**：既定は書く・読み直すとも `claude-haiku-5-5`。リポジトリの変数 `ANTHROPIC_MODEL`・`ANTHROPIC_REVIEW_MODEL` か、手動の実行の入力で替えられます（検査に通らない日が続くときは、読み直しを `claude-sonnet-5-5` にすると通りやすくなります）。
- **キー**：GitHub の「Settings → Secrets and variables → Actions」に `ANTHROPIC_API_KEY` を入れるまでは、記事は書きません（失敗にはしません）。
- **予算の割合**：記事の有無に関係なく、毎日 `npm run subsidy:budget` で取り直し、変わっていれば push します（本番が毎日作り直され、補助金の期限による表示の切り替えもその日に効きます）。
- **手動の実行**：Actions の画面の「Run workflow」。`dry_run`（試し書き）・`topic`（題材）・`model`・`review_model`・`mode`（new／refresh）・`refresh`（見直す記事）を選べます。
- **止まったとき**：その実行の「Summary」に、理由と試行の記録が出ます。記事は push されず、本番は前の状態のままです。
- **手元で試す**：`DRY_RUN_FIXTURE=scripts/fixtures/blog-good.json npm run blog:dry-run`（API を呼ばずに検査の流れを確かめる。`blog-bad.json` は不合格になる見本）。
- bot が `main` に push するので、手元から push する前に `git fetch` / `git pull --rebase` してください。

## 9. GitHub と Vercel

1. GitHub に新しいリポジトリ（非公開をおすすめ）を作る。
2. このフォルダで：
   ```bash
   git branch -M main
   git remote add origin <リポジトリの URL>
   git push -u origin main
   ```
3. Vercel で「Add New → Project」から、そのリポジトリを読み込む（コーポレートサイトのプロジェクトとは別に作る）。フレームワークは Next.js、設定は既定のまま。
4. 環境変数（`.env.example` を参照）を入れる。`NEXT_PUBLIC_SITE_URL` は、ドメインが決まってから **Production だけ** に入れる。
5. ドメインをつないだら、`lib/site.ts` の `productionUrl` にも同じ URL を書き、再デプロイ。
6. プレビューの URL（*.vercel.app）は、noindex の HTTP ヘッダーも付けています（`next.config.ts`）。

## 10. 施工事例を足す

`data/works.ts` の説明のとおりです。載せるのは当社が施工した現場だけで、お客様の了承を得た写真だけを使います。分からない項目（金額・時期・型番）は書きません。1件目を足すと、/works が検索結果の対象（index）になり、sitemap と、ヘッダー・フッターのメニュー（「施工事例」）にも載ります。

## 11. 写真の差し替え

- 共有用の画像（og-image.jpg）の元の写真：`public/images/photos/hero-wide`（横長）と `hero-tall`（縦長）。差し替えたら `npm run images:prepare`。出典が要る写真なら `data/credits.ts` も。
- 製品写真・メーカーのロゴ：`docs/IMAGE_SOURCES.md` の手順。写真の記録は `data/products/images.json`（ページに写真の場所を直書きしない）。全機種の状況は `docs/PRODUCT_IMAGE_AUDIT.md`。
- トップの冒頭の写真は、商品データの写真から自動で選んでいます（`app/page.tsx` の `heroShowcase`）。
