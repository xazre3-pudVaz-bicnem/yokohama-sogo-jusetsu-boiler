import type { ProductData } from "@/data/products/types";

/**
 * 三菱電機の商品データ。2026-10-14 に、公式サイト・公式カタログで型番と仕様を確かめたもの。
 * 根拠のページは各商品の sources。調査のしかたと記録は docs/PRODUCT_DATA.md。
 * 当社の価格（salesPrice など）は、会社から金額を受け取るまで null（画面では「お見積もり」）。
 * 製品写真の記録は data/products/images.json（ここには書かない）。
 */
export const mitsubishiProducts: ProductData[] = [
  {
    "id": "mitsubishi-srt-s377",
    "slug": "srt-s377",
    "brand": "mitsubishi",
    "category": "ecocute",
    "series": "Sシリーズ（一般地向け）",
    "name": "SRT-S377（Sシリーズ（一般地向け）／角型タイプ／370L（主に3～4人用））",
    "modelNumber": "SRT-S377",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "SRT-ST377"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "SRT-MU417-S"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（角型タイプ）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 370,
      "familySize": "主に3～4人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートW追いだき"
    },
    "specifications": [
      {
        "label": "仕向地",
        "value": "一般地"
      },
      {
        "label": "タンク容量",
        "value": "370L"
      },
      {
        "label": "給湯スタイル",
        "value": "フルオートW追いだき"
      },
      {
        "label": "定格電圧（周波数）",
        "value": "単相 200V（50-60Hz共用）"
      },
      {
        "label": "最大電流",
        "value": "16A"
      },
      {
        "label": "年間給湯保温効率（JIS）",
        "value": "3.8（ふろ熱回収なし）"
      },
      {
        "label": "区分名（2025目標年度省エネ基準）",
        "value": "E"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "108%"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃〜約90℃"
      },
      {
        "label": "冬期高温沸上げ温度",
        "value": "90℃"
      },
      {
        "label": "給湯設定温度",
        "value": "水、35℃〜48℃（1℃刻み）、50℃、60℃"
      },
      {
        "label": "給湯圧力（通常使用圧力＝減圧弁圧力）",
        "value": "180kPa"
      },
      {
        "label": "水側最高使用圧力（逃し弁圧力）",
        "value": "197kPa"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外形"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ 1820mm × 幅 630mm × 奥行き 760mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "63kg（満水時 433kg）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 715mm × 幅 800（＋65※）mm × 奥行き 285（＋16）mm ※配管カバー寸法"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "39kg"
      },
      {
        "label": "ヒートポンプユニット運転音（音響パワーレベル）（中間期／冬期）",
        "value": "51dB／55dB"
      },
      {
        "label": "貯湯ユニットの運転音",
        "value": "追いだき時40dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "4.1kW／0.90kW"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "4.1kW／1.37kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "マイナス10℃"
      },
      {
        "label": "凍結防止ヒータ消費電力",
        "value": "0.036kW"
      },
      {
        "label": "冷媒名／封入量",
        "value": "CO2（R744）／0.75kg"
      }
    ],
    "remotes": [
      {
        "model": "RMCB-F7SE",
        "note": "Sシリーズ用リモコンセット（別売・必須）。無線LANアダプター搭載、インターホンタイプ。注文すると台所リモコン（RMCB-KC7）と浴室リモコン（RMCB-BD7）各1台が届く"
      }
    ],
    "features": [
      "フルオートW追いだき：湯はりから保温・たし湯まで自動。〈マイルド〉と〈急速〉の2つの追いだき",
      "キラリユキープPLUS：深紫外線LEDの光で、湯はり後のおふろのお湯の菌の増殖を抑える（実使用での試験結果ではなく、効果は使用環境等により異なる）",
      "バブルおそうじ：浴槽の栓を抜くと、マイクロバブルでふろ配管を自動で洗う（洗浄剤を使わない）",
      "お急ぎ湯はり：湯はりの時間を短くするモード（設定中は自動たし湯は動作しない）",
      "MyMU（スマホ連携）：スマホアプリから湯はり・追いだき・わき上げ休止などを操作（無線LANアダプター搭載リモコンとインターネット接続が必要）",
      "お天気リンクEZ（太陽光の余剰電力の活用）：天気予報をもとに、翌日が晴れの予報なら夜間のわき上げを減らし、日中に太陽光発電の余剰電力でわき上げる。接続できる太陽光発電システムのメーカーに制約なし",
      "停電時出湯：貯湯ユニットにお湯が残っていれば、停電時もシャワー/蛇口でお湯が使える",
      "あったかリンク（湯はりにあわせて浴室をあたためる連携）、おそうじ湯はリンク（対応するシステムバスとの連携）、MeAMOR、多様化する電力契約への対応、省エネ制御",
      "給湯圧力は高圧力型（減圧弁圧力180kPa）",
      "パカっとハンドル：脚部カバーを外さずに取水窓から非常用取水栓を操作でき、ホース不要でタンクの水（お湯）を取り出せる（断水時の生活用水用）",
      "耐震クラスS対応：角型370Lタイプは地上階（1階）でのアンカーボルト3本固定で耐震クラスS（KH=1.0）"
    ],
    "cautions": [
      "一般地向け機種。冬期の最低気温がマイナス10℃を下回らない地域で使う",
      "水源水圧が200kPa以上確保できる場所で使う。750kPaをこえる地域は、給水の一次側に減圧弁を設ける",
      "使えるのは水道水だけ（温泉水・地下水・井戸水は使えない）",
      "単相200Vで動作する。太陽熱温水器との接続はできない",
      "メンテナンススペース：貯湯ユニットの前方に600mm以上、上方に200mm以上。ヒートポンプユニットの配管取出側に300mm以上、上方に100mm以上",
      "わき上げ中は運転音が出る。寝室の近くや近所の迷惑になる場所へのヒートポンプユニットの据え付けは避け、各地区の騒音規制等に関する条例にしたがう",
      "屋外に設置する機種。屋内や2階以上に設置する場合は、エマージェンシーストップ機能付きの機種（Dタイプ）を選ぶ",
      "停電時はタンクにお湯があれば給湯できるが、温度調節はできない。わき上げ・わき増しはできない。断水時はシャワー/蛇口からは出ないため非常用取水栓を使う。飲用水としては使用できない",
      "スマホ連携（MyMU）と太陽光連携（お天気リンクEZ）には、無線LANアダプター搭載リモコンセット、インターネット接続、専用アプリ、お客様による設定が必要",
      "3年に1度の定期点検（有料）をメーカーが案内している。ヒートポンプ配管は据え付け後10年以内に更新する"
    ],
    "manufacturerUrl": "https://www.mitsubishielectric.co.jp/home/ecocute/product/s/index.html",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "SRT-S377",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/s/index.html",
      "https://dl.mitsubishielectric.co.jp/dl/ldg/wink/ssl/wink_doc/m_contents/wink/MA_SN/srt-s377_0_sn.pdf",
      "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/displayProduct.do?pid=338407&ccd=10501110",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/spec_2025model.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-price.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-lineup.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/high-power.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/ez.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/remote.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/safety.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/style.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/special/shouene_jigyo/index.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=SRT-S377"
    ]
  },
  {
    "id": "mitsubishi-srt-s467",
    "slug": "srt-s467",
    "brand": "mitsubishi",
    "category": "ecocute",
    "series": "Sシリーズ（一般地向け）",
    "name": "SRT-S467（Sシリーズ（一般地向け）／角型タイプ／460L（主に4～5人用））",
    "modelNumber": "SRT-S467",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "SRT-ST467"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "SRT-MU517-S"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（角型タイプ）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 460,
      "familySize": "主に4～5人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートW追いだき"
    },
    "specifications": [
      {
        "label": "仕向地",
        "value": "一般地"
      },
      {
        "label": "タンク容量",
        "value": "460L"
      },
      {
        "label": "給湯スタイル",
        "value": "フルオートW追いだき"
      },
      {
        "label": "定格電圧（周波数）",
        "value": "単相 200V（50-60Hz共用）"
      },
      {
        "label": "最大電流",
        "value": "17A"
      },
      {
        "label": "年間給湯保温効率（JIS）",
        "value": "3.8（ふろ熱回収なし）"
      },
      {
        "label": "区分名（2025目標年度省エネ基準）",
        "value": "E"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "108%"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃〜約90℃"
      },
      {
        "label": "冬期高温沸上げ温度",
        "value": "90℃"
      },
      {
        "label": "給湯設定温度",
        "value": "水、35℃〜48℃（1℃刻み）、50℃、60℃"
      },
      {
        "label": "給湯圧力（通常使用圧力＝減圧弁圧力）",
        "value": "180kPa"
      },
      {
        "label": "水側最高使用圧力（逃し弁圧力）",
        "value": "197kPa"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外形"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ 2160mm × 幅 630mm × 奥行き 760mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "68kg（満水時 528kg）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 715mm × 幅 800（＋65※）mm × 奥行き 285（＋16）mm ※配管カバー寸法"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "40kg"
      },
      {
        "label": "ヒートポンプユニット運転音（音響パワーレベル）（中間期／冬期）",
        "value": "55dB／57dB"
      },
      {
        "label": "貯湯ユニットの運転音",
        "value": "追いだき時40dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "5.1kW／1.10kW"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "5.1kW／1.70kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "マイナス10℃"
      },
      {
        "label": "凍結防止ヒータ消費電力",
        "value": "0.036kW"
      },
      {
        "label": "冷媒名／封入量",
        "value": "CO2（R744）／0.75kg"
      }
    ],
    "remotes": [
      {
        "model": "RMCB-F7SE",
        "note": "Sシリーズ用リモコンセット（別売・必須）。無線LANアダプター搭載、インターホンタイプ。注文すると台所リモコン（RMCB-KC7）と浴室リモコン（RMCB-BD7）各1台が届く"
      }
    ],
    "features": [
      "フルオートW追いだき：湯はりから保温・たし湯まで自動。〈マイルド〉と〈急速〉の2つの追いだき",
      "キラリユキープPLUS：深紫外線LEDの光で、湯はり後のおふろのお湯の菌の増殖を抑える（実使用での試験結果ではなく、効果は使用環境等により異なる）",
      "バブルおそうじ：浴槽の栓を抜くと、マイクロバブルでふろ配管を自動で洗う（洗浄剤を使わない）",
      "お急ぎ湯はり：湯はりの時間を短くするモード（設定中は自動たし湯は動作しない）",
      "MyMU（スマホ連携）：スマホアプリから湯はり・追いだき・わき上げ休止などを操作（無線LANアダプター搭載リモコンとインターネット接続が必要）",
      "お天気リンクEZ（太陽光の余剰電力の活用）：天気予報をもとに、翌日が晴れの予報なら夜間のわき上げを減らし、日中に太陽光発電の余剰電力でわき上げる。接続できる太陽光発電システムのメーカーに制約なし",
      "停電時出湯：貯湯ユニットにお湯が残っていれば、停電時もシャワー/蛇口でお湯が使える",
      "あったかリンク（湯はりにあわせて浴室をあたためる連携）、おそうじ湯はリンク（対応するシステムバスとの連携）、MeAMOR、多様化する電力契約への対応、省エネ制御",
      "給湯圧力は高圧力型（減圧弁圧力180kPa）",
      "パカっとハンドル：脚部カバーを外さずに取水窓から非常用取水栓を操作でき、ホース不要でタンクの水（お湯）を取り出せる（断水時の生活用水用）",
      "耐震クラスS対応：角型460Lタイプは地上階で脚固定金具を併用した固定で耐震クラスS（KH=1.0）。標準施工1（アンカーボルト3か所）では耐震クラスA"
    ],
    "cautions": [
      "一般地向け機種。冬期の最低気温がマイナス10℃を下回らない地域で使う",
      "水源水圧が200kPa以上確保できる場所で使う。750kPaをこえる地域は、給水の一次側に減圧弁を設ける",
      "使えるのは水道水だけ（温泉水・地下水・井戸水は使えない）",
      "単相200Vで動作する。太陽熱温水器との接続はできない",
      "メンテナンススペース：貯湯ユニットの前方に600mm以上、上方に200mm以上。ヒートポンプユニットの配管取出側に300mm以上、上方に100mm以上",
      "わき上げ中は運転音が出る。寝室の近くや近所の迷惑になる場所へのヒートポンプユニットの据え付けは避け、各地区の騒音規制等に関する条例にしたがう",
      "屋外に設置する機種。屋内や2階以上に設置する場合は、エマージェンシーストップ機能付きの機種（Dタイプ）を選ぶ",
      "停電時はタンクにお湯があれば給湯できるが、温度調節はできない。わき上げ・わき増しはできない。断水時はシャワー/蛇口からは出ないため非常用取水栓を使う。飲用水としては使用できない",
      "スマホ連携（MyMU）と太陽光連携（お天気リンクEZ）には、無線LANアダプター搭載リモコンセット、インターネット接続、専用アプリ、お客様による設定が必要",
      "3年に1度の定期点検（有料）をメーカーが案内している。ヒートポンプ配管は据え付け後10年以内に更新する"
    ],
    "manufacturerUrl": "https://www.mitsubishielectric.co.jp/home/ecocute/product/s/index.html",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "SRT-S467",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/s/index.html",
      "https://dl.mitsubishielectric.co.jp/dl/ldg/wink/ssl/wink_doc/m_contents/wink/MA_SN/srt-s467_0_sn.pdf",
      "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/displayProduct.do?pid=338406&ccd=10501110",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/spec_2025model.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-price.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-lineup.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/high-power.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/ez.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/remote.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/safety.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/style.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/special/shouene_jigyo/index.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=SRT-S467"
    ]
  },
  {
    "id": "mitsubishi-srt-s467u",
    "slug": "srt-s467u",
    "brand": "mitsubishi",
    "category": "ecocute",
    "series": "Sシリーズ（一般地向け）",
    "name": "SRT-S467U（Sシリーズ（一般地向け）／角型タイプ／460L（主に4～5人用）／ハイパワー給湯）",
    "modelNumber": "SRT-S467U",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "SRT-ST467U"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "SRT-MU517-S"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（角型タイプ）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 460,
      "familySize": "主に4～5人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートW追いだき"
    },
    "specifications": [
      {
        "label": "仕向地",
        "value": "一般地"
      },
      {
        "label": "タンク容量",
        "value": "460L"
      },
      {
        "label": "給湯スタイル",
        "value": "フルオートW追いだき"
      },
      {
        "label": "定格電圧（周波数）",
        "value": "単相 200V（50-60Hz共用）"
      },
      {
        "label": "最大電流",
        "value": "17A"
      },
      {
        "label": "年間給湯保温効率（JIS）",
        "value": "3.8（ふろ熱回収なし）"
      },
      {
        "label": "区分名（2025目標年度省エネ基準）",
        "value": "E"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "108%"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃〜約90℃"
      },
      {
        "label": "冬期高温沸上げ温度",
        "value": "90℃"
      },
      {
        "label": "給湯設定温度",
        "value": "水、35℃〜48℃（1℃刻み）、50℃、60℃"
      },
      {
        "label": "給湯圧力（通常使用圧力＝減圧弁圧力）",
        "value": "290kPa"
      },
      {
        "label": "水側最高使用圧力（逃し弁圧力）",
        "value": "320kPa"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外形"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ 2160mm × 幅 630mm × 奥行き 760mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "74kg（満水時 534kg）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 715mm × 幅 800（＋65※）mm × 奥行き 285（＋16）mm ※配管カバー寸法"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "40kg"
      },
      {
        "label": "ヒートポンプユニット運転音（音響パワーレベル）（中間期／冬期）",
        "value": "55dB／57dB"
      },
      {
        "label": "貯湯ユニットの運転音",
        "value": "追いだき時40dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "5.1kW／1.10kW"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "5.1kW／1.70kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "マイナス10℃"
      },
      {
        "label": "凍結防止ヒータ消費電力",
        "value": "0.036kW"
      },
      {
        "label": "冷媒名／封入量",
        "value": "CO2（R744）／0.75kg"
      }
    ],
    "remotes": [
      {
        "model": "RMCB-F7SE",
        "note": "Sシリーズ用リモコンセット（別売・必須）。無線LANアダプター搭載、インターホンタイプ。注文すると台所リモコン（RMCB-KC7）と浴室リモコン（RMCB-BD7）各1台が届く"
      }
    ],
    "features": [
      "フルオートW追いだき：湯はりから保温・たし湯まで自動。〈マイルド〉と〈急速〉の2つの追いだき",
      "キラリユキープPLUS：深紫外線LEDの光で、湯はり後のおふろのお湯の菌の増殖を抑える（実使用での試験結果ではなく、効果は使用環境等により異なる）",
      "バブルおそうじ：浴槽の栓を抜くと、マイクロバブルでふろ配管を自動で洗う（洗浄剤を使わない）",
      "お急ぎ湯はり：湯はりの時間を短くするモード（設定中は自動たし湯は動作しない）",
      "MyMU（スマホ連携）：スマホアプリから湯はり・追いだき・わき上げ休止などを操作（無線LANアダプター搭載リモコンとインターネット接続が必要）",
      "お天気リンクEZ（太陽光の余剰電力の活用）：天気予報をもとに、翌日が晴れの予報なら夜間のわき上げを減らし、日中に太陽光発電の余剰電力でわき上げる。接続できる太陽光発電システムのメーカーに制約なし",
      "停電時出湯：貯湯ユニットにお湯が残っていれば、停電時もシャワー/蛇口でお湯が使える",
      "あったかリンク（湯はりにあわせて浴室をあたためる連携）、おそうじ湯はリンク（対応するシステムバスとの連携）、MeAMOR、多様化する電力契約への対応、省エネ制御",
      "ハイパワー給湯：減圧弁圧力290kPa（高圧力型は180kPa）。2か所同時給湯や3階の蛇口・シャワーでの使用をうたう（水源水圧300kPa以上が条件）",
      "パカっとハンドル：脚部カバーを外さずに取水窓から非常用取水栓を操作でき、ホース不要でタンクの水（お湯）を取り出せる（断水時の生活用水用）",
      "耐震クラスS対応：角型460Lタイプは地上階で脚固定金具を併用した固定で耐震クラスS（KH=1.0）。標準施工1（アンカーボルト3か所）では耐震クラスA"
    ],
    "cautions": [
      "一般地向け機種。冬期の最低気温がマイナス10℃を下回らない地域で使う",
      "ハイパワー給湯タイプのため、水源水圧が300kPa以上確保できる場所で使う。750kPaをこえる地域は、給水の一次側に減圧弁を設ける",
      "使えるのは水道水だけ（温泉水・地下水・井戸水は使えない）",
      "単相200Vで動作する。太陽熱温水器との接続はできない",
      "メンテナンススペース：貯湯ユニットの前方に600mm以上、上方に200mm以上。ヒートポンプユニットの配管取出側に300mm以上、上方に100mm以上",
      "わき上げ中は運転音が出る。寝室の近くや近所の迷惑になる場所へのヒートポンプユニットの据え付けは避け、各地区の騒音規制等に関する条例にしたがう",
      "屋外に設置する機種。屋内や2階以上に設置する場合は、エマージェンシーストップ機能付きの機種（Dタイプ）を選ぶ",
      "停電時はタンクにお湯があれば給湯できるが、温度調節はできない。わき上げ・わき増しはできない。断水時はシャワー/蛇口からは出ないため非常用取水栓を使う。飲用水としては使用できない",
      "スマホ連携（MyMU）と太陽光連携（お天気リンクEZ）には、無線LANアダプター搭載リモコンセット、インターネット接続、専用アプリ、お客様による設定が必要",
      "3年に1度の定期点検（有料）をメーカーが案内している。ヒートポンプ配管は据え付け後10年以内に更新する",
      "ハイパワー給湯タイプは水源水圧300kPa以上で使う。3階への給湯（蛇口・シャワー）は可能だが、3階へのふろ自動（湯はり）には対応していない"
    ],
    "manufacturerUrl": "https://www.mitsubishielectric.co.jp/home/ecocute/product/s/index.html",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "SRT-S467U",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/s/index.html",
      "https://dl.mitsubishielectric.co.jp/dl/ldg/wink/ssl/wink_doc/m_contents/wink/MA_SN/srt-s467u_0_sn.pdf",
      "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/displayProduct.do?pid=338401&ccd=10501110",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/spec_2025model.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-price.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-lineup.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/high-power.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/ez.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/remote.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/safety.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/style.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/special/shouene_jigyo/index.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=SRT-S467U",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/area.html"
    ]
  },
  {
    "id": "mitsubishi-srt-s377uz",
    "slug": "srt-s377uz",
    "brand": "mitsubishi",
    "category": "ecocute",
    "series": "Sシリーズ（一般地向け）",
    "name": "SRT-S377UZ（Sシリーズ（一般地向け）／薄型タイプ／370L（主に3～4人用））",
    "modelNumber": "SRT-S377UZ",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "SRT-ST377UZ"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "SRT-MU417-SZ"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（薄型タイプ）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 370,
      "familySize": "主に3～4人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートW追いだき"
    },
    "specifications": [
      {
        "label": "仕向地",
        "value": "一般地"
      },
      {
        "label": "タンク容量",
        "value": "370L"
      },
      {
        "label": "給湯スタイル",
        "value": "フルオートW追いだき"
      },
      {
        "label": "定格電圧（周波数）",
        "value": "単相 200V（50-60Hz共用）"
      },
      {
        "label": "最大電流",
        "value": "16A"
      },
      {
        "label": "年間給湯保温効率（JIS）",
        "value": "3.0（ふろ熱回収なし）"
      },
      {
        "label": "区分名（2025目標年度省エネ基準）",
        "value": "I"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "100%"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃〜約90℃"
      },
      {
        "label": "冬期高温沸上げ温度",
        "value": "90℃"
      },
      {
        "label": "給湯設定温度",
        "value": "水、35℃〜48℃（1℃刻み）、50℃、60℃"
      },
      {
        "label": "給湯圧力（通常使用圧力＝減圧弁圧力）",
        "value": "290kPa"
      },
      {
        "label": "水側最高使用圧力（逃し弁圧力）",
        "value": "320kPa"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外専用"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ 1900mm × 幅 430mm × 奥行き 1120mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "77kg（満水時 447kg）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 715mm × 幅 800（＋65※）mm × 奥行き 285（＋16）mm ※配管カバー寸法"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "39kg"
      },
      {
        "label": "ヒートポンプユニット運転音（音響パワーレベル）（中間期／冬期）",
        "value": "51dB／55dB"
      },
      {
        "label": "貯湯ユニットの運転音",
        "value": "追いだき時40dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "4.1kW／0.92kW"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "4.1kW／1.37kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "マイナス10℃"
      },
      {
        "label": "凍結防止ヒータ消費電力",
        "value": "0.060kW"
      },
      {
        "label": "冷媒名／封入量",
        "value": "CO2（R744）／0.72kg"
      }
    ],
    "remotes": [
      {
        "model": "RMCB-F7SE",
        "note": "Sシリーズ用リモコンセット（別売・必須）。無線LANアダプター搭載、インターホンタイプ。注文すると台所リモコン（RMCB-KC7）と浴室リモコン（RMCB-BD7）各1台が届く"
      }
    ],
    "features": [
      "フルオートW追いだき：湯はりから保温・たし湯まで自動。〈マイルド〉と〈急速〉の2つの追いだき",
      "キラリユキープPLUS：深紫外線LEDの光で、湯はり後のおふろのお湯の菌の増殖を抑える（実使用での試験結果ではなく、効果は使用環境等により異なる）",
      "バブルおそうじ：浴槽の栓を抜くと、マイクロバブルでふろ配管を自動で洗う（洗浄剤を使わない）",
      "お急ぎ湯はり：湯はりの時間を短くするモード（設定中は自動たし湯は動作しない）",
      "MyMU（スマホ連携）：スマホアプリから湯はり・追いだき・わき上げ休止などを操作（無線LANアダプター搭載リモコンとインターネット接続が必要）",
      "お天気リンクEZ（太陽光の余剰電力の活用）：天気予報をもとに、翌日が晴れの予報なら夜間のわき上げを減らし、日中に太陽光発電の余剰電力でわき上げる。接続できる太陽光発電システムのメーカーに制約なし",
      "停電時出湯：貯湯ユニットにお湯が残っていれば、停電時もシャワー/蛇口でお湯が使える",
      "あったかリンク（湯はりにあわせて浴室をあたためる連携）、おそうじ湯はリンク（対応するシステムバスとの連携）、MeAMOR、多様化する電力契約への対応、省エネ制御",
      "ハイパワー給湯：減圧弁圧力290kPa（高圧力型は180kPa）。2か所同時給湯や3階の蛇口・シャワーでの使用をうたう（水源水圧300kPa以上が条件）",
      "薄型タイプ（多缶式）。貯湯ユニットは高さ1900mm、薄い方向が430mm、長い方向が1120mm"
    ],
    "cautions": [
      "一般地向け機種。冬期の最低気温がマイナス10℃を下回らない地域で使う",
      "ハイパワー給湯タイプのため、水源水圧が300kPa以上確保できる場所で使う。750kPaをこえる地域は、給水の一次側に減圧弁を設ける",
      "使えるのは水道水だけ（温泉水・地下水・井戸水は使えない）",
      "単相200Vで動作する。太陽熱温水器との接続はできない",
      "メンテナンススペース：貯湯ユニットの前方に600mm以上、上方に200mm以上。ヒートポンプユニットの配管取出側に300mm以上、上方に100mm以上",
      "わき上げ中は運転音が出る。寝室の近くや近所の迷惑になる場所へのヒートポンプユニットの据え付けは避け、各地区の騒音規制等に関する条例にしたがう",
      "屋外に設置する機種。屋内や2階以上に設置する場合は、エマージェンシーストップ機能付きの機種（Dタイプ）を選ぶ",
      "停電時はタンクにお湯があれば給湯できるが、温度調節はできない。わき上げ・わき増しはできない。断水時はシャワー/蛇口からは出ないため非常用取水栓を使う。飲用水としては使用できない",
      "スマホ連携（MyMU）と太陽光連携（お天気リンクEZ）には、無線LANアダプター搭載リモコンセット、インターネット接続、専用アプリ、お客様による設定が必要",
      "3年に1度の定期点検（有料）をメーカーが案内している。ヒートポンプ配管は据え付け後10年以内に更新する",
      "ハイパワー給湯タイプは水源水圧300kPa以上で使う。3階への給湯（蛇口・シャワー）は可能だが、3階へのふろ自動（湯はり）には対応していない",
      "薄型タイプは、メンテナンス時に右側面の外装ケースを取り外す場合があるため、左側面側を壁側に配置する。右側面側を壁側に配置すると、メンテナンスができない場合がある",
      "薄型の耐震クラスは A（地階及び1階並びに敷地の部分に設置時、L型座金・アンカーボルト4か所）。非常用取水栓は形状が異なり、薄型タイプはホース同梱",
      "貯湯ユニットは屋外専用",
      "年間給湯保温効率の算出条件が他機種と違う：SRT-S377UZ は、沸上げモード「おまかせ」での着霜期・冬期の給湯モード性能試験時の沸上げ温度が70℃"
    ],
    "manufacturerUrl": "https://www.mitsubishielectric.co.jp/home/ecocute/product/s/index.html",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "eligible",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 70000,
    "subsidyListedModel": "SRT-S377UZ",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/s/index.html",
      "https://dl.mitsubishielectric.co.jp/dl/ldg/wink/ssl/wink_doc/m_contents/wink/MA_SN/srt-s377uz_0_sn.pdf",
      "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/displayProduct.do?pid=338404&ccd=10501110",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/spec_2025model.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-price.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-lineup.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/high-power.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/ez.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/remote.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/safety.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/style.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/special/shouene_jigyo/index.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=SRT-S377UZ",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/area.html"
    ]
  },
  {
    "id": "mitsubishi-srt-p377ub",
    "slug": "srt-p377ub",
    "brand": "mitsubishi",
    "category": "ecocute",
    "series": "Pシリーズ（一般地向け）",
    "name": "SRT-P377UB（Pシリーズ（一般地向け）／角型タイプ／370L（主に3～4人用））",
    "modelNumber": "SRT-P377UB",
    "units": [
      {
        "label": "貯湯ユニット",
        "model": "SRT-PT377UB"
      },
      {
        "label": "ヒートポンプユニット",
        "model": "SRT-MU417-P"
      }
    ],
    "installationType": {
      "key": "ground",
      "label": "屋外据置（角型タイプ）"
    },
    "housing": [
      "detached"
    ],
    "capacity": {
      "gou": null,
      "tankLiters": 370,
      "familySize": "主に3～4人用"
    },
    "functions": {
      "key": "fullauto",
      "label": "フルオートW追いだき"
    },
    "specifications": [
      {
        "label": "仕向地",
        "value": "一般地"
      },
      {
        "label": "タンク容量",
        "value": "370L"
      },
      {
        "label": "給湯スタイル",
        "value": "フルオートW追いだき"
      },
      {
        "label": "定格電圧（周波数）",
        "value": "単相 200V（50-60Hz共用）"
      },
      {
        "label": "最大電流",
        "value": "16A"
      },
      {
        "label": "年間給湯保温効率（JIS）",
        "value": "4.2（ふろ熱回収あり）／4.0（ふろ熱回収なし）"
      },
      {
        "label": "区分名（2025目標年度省エネ基準）",
        "value": "E"
      },
      {
        "label": "省エネ基準達成率（目標年度 2025年度）",
        "value": "120%"
      },
      {
        "label": "沸上げ温度範囲",
        "value": "約65℃〜約90℃"
      },
      {
        "label": "冬期高温沸上げ温度",
        "value": "90℃"
      },
      {
        "label": "給湯設定温度",
        "value": "水、35℃〜48℃（1℃刻み）、50℃、60℃"
      },
      {
        "label": "給湯圧力（通常使用圧力＝減圧弁圧力）",
        "value": "290kPa"
      },
      {
        "label": "水側最高使用圧力（逃し弁圧力）",
        "value": "320kPa"
      },
      {
        "label": "貯湯ユニット 種類",
        "value": "屋外形"
      },
      {
        "label": "貯湯ユニット 外形寸法",
        "value": "高さ 1820mm × 幅 630mm × 奥行き 760mm"
      },
      {
        "label": "貯湯ユニット 質量",
        "value": "68kg（満水時 438kg）"
      },
      {
        "label": "ヒートポンプユニット 外形寸法",
        "value": "高さ 715mm × 幅 800（＋65※）mm × 奥行き 285（＋16）mm ※配管カバー寸法"
      },
      {
        "label": "ヒートポンプユニット 質量",
        "value": "44kg"
      },
      {
        "label": "ヒートポンプユニット運転音（音響パワーレベル）（中間期／冬期）",
        "value": "51dB／55dB"
      },
      {
        "label": "貯湯ユニットの運転音",
        "value": "追いだき時40dB"
      },
      {
        "label": "中間期標準加熱能力／消費電力",
        "value": "4.1kW／0.85kW"
      },
      {
        "label": "冬期高温加熱能力／消費電力",
        "value": "4.1kW／1.37kW"
      },
      {
        "label": "設置可能最低外気温度",
        "value": "マイナス10℃"
      },
      {
        "label": "凍結防止ヒータ消費電力",
        "value": "0.036kW"
      },
      {
        "label": "冷媒名／封入量",
        "value": "CO2（R744）／1.10kg"
      }
    ],
    "remotes": [
      {
        "model": "RMCB-H7SE",
        "note": "Pシリーズ用リモコンセット（別売・必須）。無線LANアダプター搭載、インターホンタイプ。注文すると台所リモコン（RMCB-KC7）と浴室リモコン（RMCB-BH7）各1台が届く"
      }
    ],
    "features": [
      "ホットあわー：マイクロバブルの泡入浴（Pシリーズだけの機能。専用の浴槽アダプターと空気チューブセットが必要）",
      "ホットりたーん：入浴後にボタンを押すと、残り湯の熱を回収して翌日のわき上げに活かす（Pシリーズの 370L のみ）。年間給湯保温効率 4.2 はこの機能を用いて測定した値",
      "フルオートW追いだき：湯はりから保温・たし湯まで自動。〈マイルド〉と〈急速〉の2つの追いだき",
      "キラリユキープPLUS：深紫外線LEDの光で、湯はり後のおふろのお湯の菌の増殖を抑える（実使用での試験結果ではなく、効果は使用環境等により異なる）",
      "バブルおそうじ：浴槽の栓を抜くと、マイクロバブルでふろ配管を自動で洗う（洗浄剤を使わない）",
      "お急ぎ湯はり：湯はりの時間を短くするモード（設定中は自動たし湯は動作しない）",
      "MyMU（スマホ連携）：スマホアプリから湯はり・追いだき・わき上げ休止などを操作（無線LANアダプター搭載リモコンとインターネット接続が必要）",
      "お天気リンクEZ（太陽光の余剰電力の活用）：天気予報をもとに、翌日が晴れの予報なら夜間のわき上げを減らし、日中に太陽光発電の余剰電力でわき上げる。接続できる太陽光発電システムのメーカーに制約なし",
      "停電時出湯：貯湯ユニットにお湯が残っていれば、停電時もシャワー/蛇口でお湯が使える",
      "あったかリンク（湯はりにあわせて浴室をあたためる連携）、おそうじ湯はリンク（対応するシステムバスとの連携）、MeAMOR、多様化する電力契約への対応、省エネ制御",
      "ハイパワー給湯：減圧弁圧力290kPa（高圧力型は180kPa）。2か所同時給湯や3階の蛇口・シャワーでの使用をうたう（水源水圧300kPa以上が条件）",
      "パカっとハンドル：脚部カバーを外さずに取水窓から非常用取水栓を操作でき、ホース不要でタンクの水（お湯）を取り出せる（断水時の生活用水用）",
      "耐震クラスS対応：角型370Lタイプは地上階（1階）でのアンカーボルト3本固定で耐震クラスS（KH=1.0）"
    ],
    "cautions": [
      "一般地向け機種。冬期の最低気温がマイナス10℃を下回らない地域で使う",
      "ハイパワー給湯タイプのため、水源水圧が300kPa以上確保できる場所で使う。750kPaをこえる地域は、給水の一次側に減圧弁を設ける",
      "使えるのは水道水だけ（温泉水・地下水・井戸水は使えない）",
      "単相200Vで動作する。太陽熱温水器との接続はできない",
      "メンテナンススペース：貯湯ユニットの前方に600mm以上、上方に200mm以上。ヒートポンプユニットの配管取出側に300mm以上、上方に100mm以上",
      "わき上げ中は運転音が出る。寝室の近くや近所の迷惑になる場所へのヒートポンプユニットの据え付けは避け、各地区の騒音規制等に関する条例にしたがう",
      "屋外に設置する機種。屋内や2階以上に設置する場合は、エマージェンシーストップ機能付きの機種（Dタイプ）を選ぶ",
      "停電時はタンクにお湯があれば給湯できるが、温度調節はできない。わき上げ・わき増しはできない。断水時はシャワー/蛇口からは出ないため非常用取水栓を使う。飲用水としては使用できない",
      "スマホ連携（MyMU）と太陽光連携（お天気リンクEZ）には、無線LANアダプター搭載リモコンセット、インターネット接続、専用アプリ、お客様による設定が必要",
      "3年に1度の定期点検（有料）をメーカーが案内している。ヒートポンプ配管は据え付け後10年以内に更新する",
      "ハイパワー給湯タイプは水源水圧300kPa以上で使う。3階への給湯（蛇口・シャワー）は可能だが、3階へのふろ自動（湯はり）には対応していない",
      "施工時にホットあわー用浴槽アダプターと空気チューブセットが必要。本体購入・設置前に、施工可能かどうかの現地調査が必要",
      "Pタイプ（ホットあわー機種）の貯湯ユニットは、生ゴミなど臭いがある場所、砂ぼこりが立つ場所には据え付けない",
      "ホットりたーんをしても、蛇口やシャワー、おふろで使えるお湯は増えない。当社製以外の浴槽アダプターでは働かないことがある",
      "メーカーから『「三菱 エコキュート Pシリーズ」に関するお知らせ（第2回改定）』（2026年3月4日）が出ている。対象 17 型式に SRT-P377UB を含む。内容は、住宅の省エネ計算（住宅版 WEB プログラム）に使う「エネルギー消費性能算定のためのパラメータ」の誤記（試験時の着霜期高温エネルギー消費効率 誤 3.05 → 正 2.93 など）で、新築の省エネ計算に関するもの"
    ],
    "manufacturerUrl": "https://www.mitsubishielectric.co.jp/home/ecocute/product/p/index.html",
    "manufacturerPrice": null,
    "salesPrice": null,
    "remotePrice": null,
    "installationPrice": null,
    "disposalPrice": null,
    "taxStatus": "included",
    "subsidyEligibility": "bonus",
    "subsidyProgram": "kyutou-shoene-2026",
    "subsidyAmount": 100000,
    "subsidyListedModel": "SRT-P377UB",
    "subsidyNote": "本体だけで性能要件を満たします",
    "subsidyVerifiedAt": "2026-10-14",
    "dataVerifiedAt": "2026-10-14",
    "availableStatus": "current",
    "lastUpdatedAt": "2026-10-14",
    "sources": [
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/p/index.html",
      "https://dl.mitsubishielectric.co.jp/dl/ldg/wink/ssl/wink_doc/m_contents/wink/MA_SN/srt-p377ub_0_sn.pdf",
      "https://www.mitsubishielectric.co.jp/ldg/wink/ssl/displayProduct.do?pid=338399&ccd=10501110",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/spec_2025model.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-price.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/product/pdf/ecocute-lineup.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/high-power.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/hot-return.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/ez.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/remote.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/safety.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/function/style.html",
      "https://www.mitsubishielectric.co.jp/home/ecocute/notice/pdf/webpro.pdf",
      "https://www.mitsubishielectric.co.jp/home/ecocute/special/shouene_jigyo/index.html",
      "https://jutaku-shoene2026.mlit.go.jp/manufacturer/search/product/high-efficiency-water-heater-ec/Model_number?search=SRT-P377UB"
    ]
  }
];
