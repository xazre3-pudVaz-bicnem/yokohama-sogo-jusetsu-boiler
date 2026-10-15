# 画像の出典と、製品写真の利用条件

最後に直した日：2026-10-15。メーカーの利用条件は変わることがあるので、写真を足す前に、もう一度確かめる。

## 1. いまサイトに載せている写真

| 画像 | 内容 | 出典・ライセンス | 備考 |
| --- | --- | --- | --- |
| photos/hero-wide・hero-tall | 住宅の外壁から出ている、給湯器用の配管とガス管 | 「給湯器 ガス管 注意」Inomshog（Wikimedia Commons・CC BY 2.0） | 当社の施工現場ではない。2026-10-15 からトップの冒頭では使わず（製品写真に替えた）、共有用の画像（og-image.jpg）にだけ使う。画像の中と運営会社のページ（#photos）に出典を表示。縮小と切り出しだけ |
| area/totsuka-aerial | 戸塚駅の周辺 | 横浜市（横浜市オープンデータポータル・CC BY 4.0） | コーポレートサイトと同じ写真 |
| area/yokohama-minatomirai | みなとみらいの街並み | data/credits.ts を参照 | コーポレートサイトと同じ写真 |
| brand/*・illust/* | ロゴ・人物のイラスト・LINE の QR コード | 当社（コーポレートサイトの素材） | コーポレートサイトの public/ からコピー |
| products/*・manufacturers/* | 製品写真・メーカーのロゴ | 各メーカーの公式サイト（下の「2.」） | 記録は data/products/images.json・data/brand-logos.json |

出典の一覧は `data/credits.ts`。新しい写真を足したら、ここと `data/credits.ts` の両方に書く。

## 2. 製品写真とメーカーのロゴ

### 利用の許可

2026-10-15、依頼者（横浜総合住設）から「メーカー各社の製品写真・ロゴの使用許可を取得済み」との連絡を受け、掲載を始めました。**許可の書面と、許可の範囲（ウェブへの掲載・ロゴの利用・加工の可否）は、会社で保管してください。** 許可の範囲が変わったら、`data/brands.ts` の `imagePolicy` とこの文書を直し、必要なら写真を外します。

各社の公式サイトの規約では、許可のない転載は禁止されています（下の表）。許可があっても、次の決まりを守ります。

- 使うのは、メーカーの公式サイト・公式資料（製品ページ・製品資料のサイト・公式の画像データ）の写真とロゴだけ。ほかの販売店・工事店のサイト、画像検索、素材サイトの写真は使わない。AI で作った画像は使わない。
- 加工しない。するのは縮小と形式の変換（WebP）だけ。切り抜き・色の変更・文字入れ・合成はしない。
  - 例外：ロゴのうち、スローガンが一体になっているもの（ノーリツ「新しい幸せを、わかすこと。」・三菱電機「Changes for the Better」・コロナ「つぎの快適をつくろう。」）は、小さく表示すると読めないため、SVG の表示範囲（viewBox）だけを変えて、マークと社名の部分を出している。図形は変えていない。
- 人物・室内の写真、文字の入った宣伝の画像は、できるだけ使わない。
- 写真と型番の対応を確かめる。外観が違う機種（壁掛・据置・PS扉内・PS標準、暖房つき、タンクの容量・形など）に、似ている写真を流用しない。
  - メーカー自身が、外観の同じ複数の型番に1枚の写真を使っている場合は、その写真を共有してよい（`officially-shared-series`。画面に「シリーズ共通イメージ」と添える）。
  - 外観の合う公式の写真が無い機種は、写真を載せず（`unavailable`）、設置タイプの図を出す。

| メーカー | 公式サイトの規約 | 主な取得元 |
| --- | --- | --- |
| リンナイ | [サイトポリシー](https://www.rinnai.jp/site_policy/)：承諾なしの複製・送信は禁止 | rinnai.jp の製品ページ・ECO ONE のページ |
| ノーリツ | [サイトのご利用について](https://www.noritz.co.jp/policy/)：許諾なしの複製・営利目的の利用は禁止 | ノーリツの製品資料のサイト（n-techdocs.com。画像は同サイトの保管場所から配信）・noritz.co.jp |
| パロマ | [ダウンロードのご利用条件](https://www.paloma.co.jp/downloads/index.html)：販売促進目的の使用は可、複製・加工しての第三者提供は禁止 | paloma.co.jp の製品ページ・HYBRID PLUS のページ |
| 三菱電機 | [ウェブサイト利用規約](https://www.mitsubishielectric.co.jp/ja/terms/)：私用目的を越える使用は明示の許諾が必要 | 三菱電機の製品ページ（WIN2K）の写真（dl.mitsubishielectric.co.jp） |
| パナソニック | [サイトのご利用にあたって](https://sumai.panasonic.jp/terms-of-use.html)・[画像データ ダウンロード](https://www2.panasonic.biz/jp/sumai/gazou/) | panasonic.jp の製品ページ（画像は同サイトの画像サーバー）・画像データ ダウンロード（ユニット・リモコン） |
| ダイキン | [サイトのご利用について](https://www.daikin.co.jp/policy)：文書による事前の許可が必要 | ac.daikin.co.jp のラインアップのページ |
| コロナ | [ウェブサイトのご利用について](https://www.corona.co.jp/website/index.html)：許可なく複製・転載は禁止 | corona.co.jp のラインアップのページ |

注意：パナソニックの「画像データ ダウンロード」の標準の条件では、商標のロゴの使用は認められていません。ロゴの使用は、依頼者が取得した許可の範囲に含まれていることを確かめてください。

### どこに何があるか

- 写真のファイル：`public/images/products/<メーカー>/<商品ID>-main.webp`（代表）と `-unit`・`-remote`・`-side`（ユニット・リモコン・別の向き）
- 写真の記録：`data/products/images.json`（取得元の画像の URL・載っている公式ページ・型番との対応・確かめた方法・日付）
- ロゴのファイル：`public/images/manufacturers/<メーカー>.svg|png`、記録：`data/brand-logos.json`（`scale` は見た目の大きさをそろえる倍率）
- 全機種の監査の一覧：`docs/PRODUCT_IMAGE_AUDIT.md`
- 自動の検査：`npm run images:check`（ファイルの有無・壊れていないか・大きさ・取得元が公式のドメインか・記録の有無。`check` の中でも動く）

## 3. 写真を足す・替えるときの手順

1. メーカーの公式ページで、その型番の写真（またはメーカーがその型番を含むシリーズに使っている写真）を探す。外観（設置方式・排気・暖房の有無・タンクの容量と形・ユニットの構成）が合うことを確かめる。
2. 元の画像を取得し、縮小と WebP への変換だけをして、`public/images/products/<メーカー>/` に置く（長い辺 1200px まで。拡大しない）。
3. 記録（manifest）に、ファイル・大きさ・取得元の URL・載っているページ・`matchType`・確かめた方法を書く。形は `scripts/apply-image-manifests.ts` の先頭を参照。
4. `npm run images:apply -- <記録のフォルダ>` で `data/products/images.json` に取り込み、`npm run images:check -- --write` で検査と監査の一覧を作り直す。
5. 画面で確かめる（一覧のカード・機種のページ・比較）。

## 4. 当社の写真を足すとき

- トップの写真は、当社が施工した給湯器の写真に差し替えるのがいちばんです。`public/images/photos/` に置き、`npm run images:prepare`。
- 施工事例の写真は、お客様の了承を得たものだけ。表札・車のナンバー・近所の家が写らないように。手順は README の「施工事例を足す」。

## 5. AI で作った画像（製品以外）

- ChatGPT（Codex の画像生成）で作った画像は、製品ではない、ページの雰囲気をつくる画像にだけ使います（背景・暮らしの情景・仕組みのイラスト）。
- 給湯器などの製品・メーカーのロゴの画像と、施工事例・実際のスタッフやお客様の写真に見える画像は作りません。人物はイラストにして、当社の社員やお客様と誤解されない使い方にします（トップの冒頭に「人物とキャラクターはイラストです」と添えています）。決まりの全文は `AGENTS.md` の「画像を作るとき」。
- 置き場所は `public/images/ai/`。写真のように見える画像には「写真はイメージです」と添えます。
- キャラクター「ゆげまる」（湯気の妖精）は、このサイトのために作ったオリジナルです。ほかの会社のキャラクターに似せていません。
- 作り方：Codex の画像生成（ChatGPT のアカウント・組み込みの image_gen）で PNG を作り、`sharp` で縮小して WebP にしています（透明の余白は詰めています）。

| ファイル | 使う場所 | 作った日 | モデル | プロンプト |
| --- | --- | --- | --- | --- |
| `public/images/ai/hero-bubbles.webp` | トップの冒頭の背景 | 2026-10-15 | Codex（ChatGPT の画像生成） | Bright, airy website hero background in soft pastel pink with many translucent iridescent soap bubbles of different sizes, gentle light, no text, no logos, no people, no products, no water heaters, landscape 16:9. |
| `public/images/ai/mascot-wave.webp` | AIチャット・見積もりの案内役（ゆげまる）・トップ | 2026-10-15 | Codex（ChatGPT の画像生成） | Create an ORIGINAL cute mascot character for a Japanese water-heater replacement company website. The character is 'Yugemaru', a small fluffy white puff of steam (a soft rounded cloud of bath steam) with a cheerful face: two small black dot eyes, rosy pink cheeks, a small smiling open mouth, two tiny stubby arms. It wears a small folded orange towel on its head like a Japanese hot-spring bather. Pose: full body, facing the viewer, waving one hand happily. Style: clean flat 2D vector-like illustration with a thin dark brown outline, soft cel shading, pastel colors, kawaii, simple shapes that stay readable at small sizes (works as a 64px chat avatar). It must NOT be a kettle, a teapot, a water heater, a box, an appliance, or resemble any existing company mascot. No text, no logo, no watermark. Transparent background (PNG with alpha), the character centered with some margin, square 1:1. |
| `public/images/ai/mascot-point.webp` | 見積もりの案内・説明の区画 | 2026-10-15 | Codex（ChatGPT の画像生成）。mascot-wave を参照画像にした | Using the attached image as the exact character reference, draw the SAME character 'Yugemaru' (same fluffy white steam-puff body, same face, same rosy cheeks, same small orange towel on its head, same thin dark brown outline and flat pastel style). New pose: pointing to the right side with one tiny arm as if explaining something, friendly confident smile. Full body, transparent background (PNG with alpha), square 1:1, no text, no logo. |
| `public/images/ai/mascot-think.webp` | よくある質問 | 2026-10-15 | Codex（ChatGPT の画像生成）。mascot-wave を参照画像にした | Using the attached image as the exact character reference, draw the SAME character 'Yugemaru' (same fluffy white steam-puff body, same face style, same rosy cheeks, same small orange towel on its head, same thin dark brown outline and flat pastel style). New pose: thinking, one tiny arm touching its chin, eyes looking up, a small question-mark-like swirl of steam above its head (not a letter, just a curl of steam). Full body, transparent background (PNG with alpha), square 1:1, no text, no logo. |
| `public/images/ai/mascot-ok.webp` | 見積もりの案内の帯・完了の画面 | 2026-10-15 | Codex（ChatGPT の画像生成）。mascot-wave を参照画像にした | Using the attached image as the exact character reference, draw the SAME character 'Yugemaru' (same fluffy white steam-puff body, same face style, same rosy cheeks, same small orange towel on its head, same thin dark brown outline and flat pastel style). New pose: very happy, both tiny arms raised making a cheerful 'OK / leave it to me' gesture, eyes closed in a big smile, two small sparkles around it. Full body, transparent background (PNG with alpha), square 1:1, no text, no logo. |
| `public/images/ai/staff-duo.webp` | トップの冒頭・見積もりの案内（スタッフのイラスト。実在の社員ではない） | 2026-10-15 | Codex（ChatGPT の画像生成） | Flat 2D illustration (clearly an illustration, not a photo) of two friendly Japanese home-equipment installers standing side by side, full body: a young woman with short dark hair and a man in his 30s, both wearing clean light-blue work uniforms with white caps, the man holding a small wrench and giving a thumbs-up, the woman waving with a bright smile. Style: modern pop vector illustration with a thin dark outline, soft cel shading, cheerful pastel accents (pink, yellow, sky blue), consistent with a cute mascot website. No company logos, no text, no water heaters or appliances, no tools other than the small wrench. Transparent background (PNG with alpha), portrait 3:4, characters centered. |
| `public/images/ai/banner-subsidy.webp` | トップのお知らせ（補助金）の背景 | 2026-10-15 | Codex（ChatGPT の画像生成） | Website banner background illustration, landscape 16:9: a fresh light mint-green and soft yellow pastel background with simple flat decorative motifs: a few gold coins with blank faces, small green leaves, a small house silhouette, soft round bokeh circles, generous empty space on the left half for overlaid text. Flat pop vector style. No text, no numbers, no logos, no people, no water heaters or appliances. |
| `public/images/ai/banner-photo.webp` | トップのお知らせ（写真で見積もり）の背景 | 2026-10-15 | Codex（ChatGPT の画像生成） | Website banner background illustration, landscape 16:9: a bright sky-blue pastel background with a flat pop vector illustration on the right side of a hand holding a smartphone, the phone screen shows only a simple camera viewfinder frame with four corner brackets and a shutter button (the frame is empty, nothing inside), small sparkles and soft round bubbles around it, generous empty space on the left half for overlaid text. No text, no logos, no people's faces, no water heaters or appliances on the screen or anywhere. |
| `public/images/ai/bath-scene.webp` | お湯のある暮らしの区画の絵 | 2026-10-15 | Codex（ChatGPT の画像生成） | Warm, inviting illustration of a clean modern Japanese bathroom with a white bathtub filled with steaming hot water, soft steam rising, a small yellow rubber duck on the tub edge, a folded towel, warm morning light. Style: soft pop flat illustration with gentle gradients, pastel pink, cream and sky blue palette, cozy and happy mood. No people, no text, no logos, no water heater, no control panels or appliances. Landscape 16:9. |
