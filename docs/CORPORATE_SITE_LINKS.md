# コーポレートサイトとの SEO 連携の提案

対象：コーポレートサイト（https://www.yokohama-sogo-jusetsu.com/ ・リポジトリ `yokohamatotalhousingsolutions`）と、この給湯器専門サイト。
このファイルは提案です。**コーポレートサイトのコードは変更していません**（変更には、会社の了承が必要です）。
調べた日：2026-10-14（コーポレートサイトの `data/seo-keyword-map.ts`・`data/services/*.ts`・`content/blog/*.md` を読んで確認）

## 1. いま起きている重なり

同じ会社の2つのサイトが、同じ検索語を狙っています。検索エンジンは、同じ検索語ではどちらか一方しか上位に出さないことが多く、評価が分かれます。

| 検索語 | コーポレートサイトで担当しているページ | 給湯器専門サイトで担当しているページ |
| --- | --- | --- |
| 戸塚区 給湯器交換 | /service/water-heater（主な検索語） | /area/totsuka |
| 横浜市 給湯器交換 | /service/water-heater（地域ページからの割り当て） | /（トップ） |
| 戸塚区 エコキュート・横浜市 エコキュート | /service/ecocute | /ecocute |
| エネファーム 交換 | /service/ene-farm | /ene-farm |
| ECO ONE 設置 | /service/eco-one | /hybrid（ECO ONE の区画）・/subsidy/eco-one |
| 給湯器 号数 | /blog/water-heater-capacity-guide | /guide/capacity |
| 給湯器 交換時期 | /blog/water-heater-replacement-signs | /guide/timing |
| エコジョーズ ドレン排水（横浜市） | /blog/ecojozu-drain-water-yokohama | /eco-jozu・/guide/apartment |
| 給湯省エネ2026 | /blog/kyutou-shoene-2026-outline | /subsidy/kyutou-shoene-2026 |
| エコキュート 容量 | /blog/ecocute-tank-capacity-choice | /ecocute（容量の区画） |

## 2. 提案：給湯器の検索語は専門サイトに集め、コーポレートサイトからは紹介する

### 2-1. コーポレートサイトの給湯器のページ（/service/water-heater・/service/ecocute・/service/ene-farm・/service/eco-one）

- ページは残し、**「給湯器の機種・価格の考え方・補助金は、給湯器専門サイトで」**という案内の区画と、専門サイトの該当ページへのリンクを、本文の上の方に1つ置く。
  - /service/water-heater → 専門サイトのトップ（/）と /gas-water-heater・/eco-jozu
  - /service/ecocute → /ecocute と /subsidy/ecocute
  - /service/ene-farm → /ene-farm と /subsidy/ene-farm
  - /service/eco-one → /hybrid と /subsidy/eco-one
- 主な検索語を、会社名を含む語に変える（例：「横浜総合住設 給湯器」「ヨコジュウ エコキュート」）。title・h1 の「戸塚区 給湯器交換」などの地域＋工事の語は、専門サイトに任せる。
- 構造化データ（Service）はそのままでよい。会社（Organization・LocalBusiness）の `@id` は、専門サイトも同じもの（`https://www.yokohama-sogo-jusetsu.com/#organization`・`#totsuka-office`）を使っているので、2つのサイトが同じ会社のものだと伝わる。

### 2-2. コーポレートサイトのコラム（給湯器の6本）

どちらかを選んでいただく形を提案します。

- **A（おすすめ）**：記事は残し、冒頭か末尾に、専門サイトのくわしいページへのリンクを置く。記事の題名と主な検索語は、専門サイトの固定ページと重ならないよう、施工の実務の話に寄せる（例：「戸塚区の高低差のある家の搬入経路」は、そのままでも重ならない）。
- **B**：記事を専門サイトに移し、コーポレートサイトの URL から専門サイトの URL へ 301 で転送する。重なりは解消するが、コーポレートサイトのコラムの本数が減る。

### 2-3. ナビゲーション

- コーポレートサイトのヘッダーかフッターに「給湯器専門サイト」へのリンクを1つ置く（専門サイトのフッターには、コーポレートサイトへのリンクがすでにある）。
- 専門サイトの本番ドメインが決まってから設定する（決まる前にリンクすると、noindex のプレビューに人と検索エンジンを送ってしまう）。
- 2026-10-16：本番ドメインが https://www.yokoju-boiler.com に決まった。リンク先はこの URL にする（*.vercel.app の URL にはリンクしない）。

## 3. 専門サイトの側で済んでいること

- 会社の名前・住所・電話番号・受付時間は、コーポレートサイトと同じ内容（2026-10-14 に照合）。
- フッターと運営会社のページから、コーポレートサイトへリンクしている。
- 構造化データの会社の `@id` を、コーポレートサイトと共通にしている。
- 専門サイトの文章は、コーポレートサイトの文章を写していない（会社の事実の記述だけ、同じ内容にそろえている）。

## 4. 進め方

1. 会社に、2-1 と 2-2 の方針（A か B か）を確かめる。
2. 専門サイトの本番ドメイン（https://www.yokoju-boiler.com）を、Search Console に登録する（コーポレートサイトと両方）。
3. コーポレートサイトのリポジトリで、2-1 の案内の区画・主な検索語の変更・2-3 のリンクを入れる（コーポレートサイトの `npm run seo:audit` で、検索語の割り当て表を更新）。
4. 公開から数週間、両サイトの検索語ごとの表示回数を Search Console で見比べる。
