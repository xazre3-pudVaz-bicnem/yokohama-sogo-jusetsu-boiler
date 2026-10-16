# 公開前に確かめること・残っていること

2026-10-14 時点。上から順に、公開に影響の大きいもの。確かめたら、該当するデータを直し、この表から消す。

## A. 会社に確かめること（推測では書いていない）

| 項目 | いまの扱い | 確かめたら直す場所 |
| --- | --- | --- |
| 給湯省エネ2026事業の登録事業者か | 2026-10-14 に国の「登録事業者の検索」で見つからず。「登録済み」とは書いていない（中立の文） | `lib/site.ts` の `subsidyOperator`（registered・number・confirmedAt） |
| 当社の販売価格（本体・リモコン・標準工事・撤去処分） | すべて「お見積もり」 | 各機種の `salesPrice` など（`data/products/*.ts`） |
| 工事の保証（有無・年数） | 書いていない | 書くなら `/flow`・`/faq` と、機種のページの注記 |
| 受付の曜日 | 「8:00〜18:00（平日）」をコーポレートサイトと同じく表示。構造化データの営業時間は出していない | `lib/site.ts` の `contact`（`hoursConfirmed: true` と `openDays`） |
| 施工事例 | 給湯器の施工写真が無いため、0件（/works は準備中・noindex。メニューにも出していない） | `data/works.ts`（README「施工事例を足す」） |
| トップの写真 | CC BY 2.0 の実写（当社の現場ではない）。出典を表示 | 当社の施工写真に差し替え（`public/images/photos/`） |
| 製品写真の許諾 | 7社とも未確認。図で代用 | `docs/IMAGE_SOURCES.md` の手順 |
| Googleビジネスプロフィール | 地図の埋め込みは出していない（住所だけの埋め込みは建物名が出るため） | `lib/site.ts` の `gbp` |
| お問い合わせの受信先 | 未設定（本番ではフォームを出さず、電話・LINE を案内） | Vercel の `RESEND_API_KEY`・`CONTACT_TO_EMAIL`・`CONTACT_FROM_EMAIL` |
| 写真から型番を読み取る機能を使うか | ボタンは出していない（Vercel に `ANTHROPIC_API_KEY` が無いため）。使う場合は、プライバシーポリシーの記載（Anthropic 社への送信）を会社に確かめてから | Vercel の `ANTHROPIC_API_KEY`（README 7-2） |
| コーポレートサイトとの検索語の分担 | 提案だけ（`docs/CORPORATE_SITE_LINKS.md`）。コーポレートサイトのコードは変えていない | コーポレートサイトのリポジトリ |

## B. 公開の作業

1. GitHub に新しいリポジトリを作り、`main` に push（README「GitHub と Vercel」）。
2. Vercel に新しいプロジェクトを作る（コーポレートサイトとは別）。環境変数を入れる。
3. ドメインをつなぎ、`NEXT_PUBLIC_SITE_URL` を Production に入れて再デプロイ。→ 2026-10-16：本番ドメインは https://www.yokoju-boiler.com（`lib/site.ts` の `productionUrl` に設定。Vercel の本番デプロイでは、環境変数が無くてもこの URL を使う）。
4. 公開後、本番の URL で `NEXT_PUBLIC_SITE_URL=… npm run build && npm run site:check && npm run seo:audit` と同じ確認をする（canonical・noindex・sitemap）。
5. Search Console と Bing に登録し、sitemap.xml を送る（確認のコードは `GOOGLE_SITE_VERIFICATION`・`BING_SITE_VERIFICATION`）。
6. GitHub の Secrets に `ANTHROPIC_API_KEY` を入れ、コラムの自動投稿を手動で1回、試し書き（dry_run）で動かす。

## C. 決まった時期に見直すもの

- **補助金**：予算の割合は毎日の自動実行で取り直す。月に1回は `npm run subsidy:check` で、補助額・期限・登録の型番を公式ページと照合する。制度が変わったら `data/subsidy/programs.ts` と確認日、`docs/VERIFIED_FACTS.md` を直す。
  - 予算が 100％ に達すると、表示は自動で「受付終了」に切り替わる。そのあと `status: "closed"` と `closed` も書く。
  - 交付申請の予約の期限（2026-11-16）・交付申請の期限（2026-12-31）を過ぎると、表示は自動で切り替わる。
  - 横浜市のポイント還元（Y-GrEP）の申請期限は 2026-12-25。
- **商品**：メーカーの価格改定（例年の春・秋）と、新製品の発売のときに、型番と希望小売価格を確かめる（`docs/PRODUCT_DATA.md`）。
- **地域の統計**：住宅・土地統計調査は5年ごと（次は令和10年の調査）。推計人口は年に1回は直す。

## D. 内容について、確かさに注記があるもの

- 故障・トラブルのページのパロマのエラー番号と部品の保有期間は、取扱説明書（PH-163EWFS ほか）1冊の例。本文と表に、その旨を書いてある。
- 号数の選び方の「20号＝約14.3L」「16号＝約11.4L」は、ノーリツの式で計算した値（本文に明記）。
- 区独自の給湯器の補助は、「案内を確認できていない」と書いている（ないとは書いていない）。
