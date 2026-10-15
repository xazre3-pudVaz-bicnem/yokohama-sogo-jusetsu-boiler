# 横浜総合住設 給湯器専門サイト（このリポジトリの約束ごと）

ルートの `c:\projects\CLAUDE.md`（制作の基準）に加えて、このサイトでは次を守る。

## 事実と推測

- 書いてよいのは、公式の資料（メーカー・国・横浜市・統計）と、会社に確かめたことだけ。推測で埋めない。
  - 当社の販売価格・保証・施工実績・補助金の登録事業者かどうか・製品写真の権利は、確かめるまで書かない（データは null／"pending"）。
  - 架空の型番・機種・施工事例・口コミ・評価・在庫・順位（「人気No.1」など）は作らない。
  - ほかの販売店の価格や写真は使わない。AI で生成した給湯器の画像は使わない。
- 会社の情報は `lib/site.ts` の1か所。コーポレートサイトと同じ内容にする。
- 補助金の金額・期限・条件は `data/subsidy/programs.ts` の1か所。ページには数字を直書きせず `{{名前}}`（`lib/tokens.ts`）で書く。直したら確認日と `docs/VERIFIED_FACTS.md` も直す。
- ガス給湯器・エコジョーズを、給湯省エネ2026事業の対象のように見せない。「必ず受け取れる」「全機種が対象」と書かない。
- `data/subsidy/programs.ts`・`lib/site.ts`・`data/areas.ts`・商品データを直したら、`npm run blog:facts` で事実シート（`docs/VERIFIED_FACTS.md`）を作り直す（しないと、コラムの毎日の自己検査が止める）。

## 商品データ

- `data/products/<メーカー>.ts`。手順と記録は `docs/PRODUCT_DATA.md`。
- 表示する文に、調べたときのメモ書き（「カタログの表記は…」「未確認」）や部品の価格を残さない（`npm run data:check` が見つける）。
- 機種の URL（slug）は公開後に変えない。

## コーポレートサイトとの関係

- コーポレートサイト（`c:\projects\yokohamatotalhousingsolutions`）のコード・データは変更しない。連携は `docs/CORPORATE_SITE_LINKS.md` に提案として書く。
- 環境変数・API キーは、このサイトだけのものを使う。ほかのプロジェクトのキーを使わない。キーやアドレスを Git に入れない。

## 書き方

- 日本語は、です・ます。一文を短く、やさしい言葉で。絵文字・定型の売り文句は使わない。
- 冒頭（ヒーロー）に問い合わせのボタンを置かない。CTA はヘッダー・スマホの下部・ページの最後。
- よくある質問の答えは、構造化データにもそのまま入るので、リンクや強調の記号を使わない。同じ質問を2か所でマークアップしない。

## 確かめ方

- 変更のあとは `npm run typecheck`・`npm run lint`・`npm run data:check`、ページを変えたら `npm run build && npm run site:check && npm run seo:audit`。
- 補助金にかかわる変更は `npm run subsidy:check` で公式ページと照合する。
- commit・push は、頼まれてから。bot が main に push するので、push の前に `git fetch`。
