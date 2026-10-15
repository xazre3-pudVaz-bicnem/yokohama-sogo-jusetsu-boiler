import type { ReactNode } from "react";
import { TypeFigure, type FigureKind } from "@/components/diagram/TypeFigure";
import type { FigureName } from "@/data/content-types";
import { reveal } from "@/lib/reveal";

/**
 * 本文に入れる図（コードで描いたもの）。写真の代わりではなく、仕組み・順番・内訳を伝えるための図。
 *
 * - 図の中に細かい文字を入れない（スマホで読めなくなる）。図には番号の印だけを置き、説明は下の一覧に書く。
 * - 数値は、出典で確かめたものだけ（号数の計算は、ノーリツが案内している式による）。
 * - 色は、線＝濃紺、面＝白と淡い青、熱・お湯＝黄色、の3つ。
 */
const NAVY = "#061537";
const BLUE = "#1b6cff";
const SHADE = "#e3edff";
const HEAT = "#ffbd3d";
const LINE = "#a0a9b8";
const line = { stroke: NAVY, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const, fill: "none" };
const thin = { stroke: NAVY, strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Frame({ caption, children, label }: { caption?: string; children: ReactNode; label: string }) {
  return (
    <figure aria-label={label} className="card card-line overflow-hidden" {...reveal(0, "zoom")}>
      <div className="px-4 py-6 sm:px-8 sm:py-8">{children}</div>
      {caption && <figcaption className="border-t-2 border-dotted border-silver-300 bg-paper-2 px-4 py-3 text-[0.8125rem] leading-[1.85] text-ink-mute sm:px-8">{caption}</figcaption>}
    </figure>
  );
}

/** 図の中の番号の印 */
function Mark({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={NAVY} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#fff" fontFamily="var(--font-display), sans-serif">
        {n}
      </text>
    </g>
  );
}

/** 番号つきの説明（図の下） */
function Legend({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <li key={it.title} className="flex gap-3 text-[0.9063rem] leading-[1.85]">
          <span className="num mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-navy-900 text-xs font-semibold leading-none text-white" aria-hidden="true">
            {i + 1}
          </span>
          <span>
            <strong className="font-heading text-navy-900">{it.title}</strong>
            <span className="block text-ink-body">{it.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** 矢印（流れの向き） */
function Arrow({ d, color = NAVY, dashed = false }: { d: string; color?: string; dashed?: boolean }) {
  return <path d={d} stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" markerEnd={`url(#arrow-${color === HEAT ? "heat" : color === BLUE ? "blue" : "navy"})`} strokeDasharray={dashed ? "7 7" : undefined} />;
}

function ArrowDefs() {
  return (
    <defs>
      {[
        ["navy", NAVY],
        ["heat", HEAT],
        ["blue", BLUE],
      ].map(([id, c]) => (
        <marker key={id} id={`arrow-${id}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={c} />
        </marker>
      ))}
    </defs>
  );
}

/* ------------------------------------------------------------------ */
/* 号数とお湯の量                                                      */
/* ------------------------------------------------------------------ */
const GOU = [
  { gou: 16, household: "ひとり暮らし" },
  { gou: 20, household: "2人家族" },
  { gou: 24, household: "4人家族" },
];
/** 冬の出湯量（ノーリツの式：号数×25÷（設定温度−水温）。設定40℃・水温5℃） */
const winterLiters = (gou: number) => Math.round(((gou * 25) / (40 - 5)) * 10) / 10;

function GouFigure({ caption }: { caption?: string }) {
  return (
    <Frame label="号数とお湯の量" caption={caption ?? "家族の人数の目安はリンナイ、冬の量の計算はノーリツの案内による（設定40℃・水温5℃の場合）。配管や蛇口によって、実際に出る量は変わります。"}>
      <div className="grid gap-4 sm:grid-cols-3">
        {GOU.map((g) => (
          <div key={g.gou} className="rounded-2xl bg-mist px-5 py-5">
            <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-2">
              <span className="num shrink-0 whitespace-nowrap text-[2.5rem] font-semibold leading-none text-navy-900">{g.gou}</span>
              <span className="shrink-0 font-heading text-lg font-black text-navy-900">号</span>
              <span className="ml-auto whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-800">{g.household}の目安</span>
            </p>
            <dl className="mt-4 space-y-3 text-[0.8125rem] leading-[1.6]">
              <div>
                <dt className="font-bold text-navy-900">水温＋25℃のお湯</dt>
                <dd className="mt-1.5 flex items-center gap-2.5">
                  <span className="meter flex-1">
                    <span style={{ width: `${(g.gou / 24) * 100}%` }} />
                  </span>
                  <span className="num w-[4.25rem] shrink-0 text-right text-[0.9375rem] font-semibold text-navy-900">{g.gou}L／分</span>
                </dd>
              </div>
              <div>
                <dt className="font-bold text-navy-900">冬（水温5℃）に40℃のお湯</dt>
                <dd className="mt-1.5 flex items-center gap-2.5">
                  <span className="meter flex-1">
                    <span style={{ width: `${(winterLiters(g.gou) / 24) * 100}%`, background: HEAT }} />
                  </span>
                  <span className="num w-[4.25rem] shrink-0 text-right text-[0.9375rem] font-semibold text-navy-900">{winterLiters(g.gou)}L／分</span>
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 設置方式                                                            */
/* ------------------------------------------------------------------ */
export const INSTALL_FIGURES: { kind: FigureKind; name: string; where: string }[] = [
  { kind: "wall", name: "屋外壁掛", where: "建物の外壁に、金具で取り付けてある。" },
  { kind: "floor", name: "屋外据置", where: "地面やコンクリートの台の上に置いてある。配管は横から建物へ入る。" },
  { kind: "ps-door", name: "PS扉内設置", where: "マンションの玄関の横にある、金属の扉の中（パイプスペース）。" },
  { kind: "ps-standard", name: "PS標準設置・アルコーブ", where: "マンションの廊下の壁のくぼみに、扉なしで付いている。下にメーターがある。" },
];

function InstallTypesFigure({ caption }: { caption?: string }) {
  return (
    <Frame label="給湯器の設置方式" caption={caption ?? "図は設置方式を表した模式図です。実際の形や大きさは、機種によって違います。"}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
        {INSTALL_FIGURES.map((f) => (
          <li key={f.kind}>
            <div className="product-visual">
              <TypeFigure kind={f.kind} className="h-full w-full p-3" />
            </div>
            <p className="mt-3 font-heading text-[0.9688rem] font-black text-navy-900">{f.name}</p>
            <p className="mt-1 text-[0.8125rem] leading-[1.8]">{f.where}</p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 給湯専用・オート・フルオート                                        */
/* ------------------------------------------------------------------ */
/** true＝できる、false＝できない、"some"＝機種による（給湯専用でも、決めた量で止める機能が付いた機種がある） */
const FUNCTION_ROWS: { label: string; values: [boolean | "some", boolean, boolean] }[] = [
  { label: "蛇口・シャワーからお湯を出す", values: [true, true, true] },
  { label: "決めた量でお湯はりを止める", values: ["some", true, true] },
  { label: "追いだき・保温", values: [false, true, true] },
  { label: "お湯が減ったら自動でたし湯", values: [false, false, true] },
  { label: "追いだき配管の自動洗浄", values: [false, false, true] },
];

function FunctionTypesFigure({ caption }: { caption?: string }) {
  return (
    <Frame label="給湯専用・オート・フルオートの違い" caption={caption ?? "一般的な区分を表にしたものです。給湯専用でも、決めた量でお湯はりを止める機能（オートストップなど）が付いた機種があります。呼び方や細かな動きは、メーカーと機種によって違います。"}>
      <div className="relative overflow-x-auto" tabIndex={0} role="region" aria-label="機能の比較表">
        <table className="w-full min-w-[30rem] border-collapse text-[0.9063rem]">
          <thead>
            <tr>
              <th scope="col" className="w-[46%] px-3 py-3 text-left font-heading font-bold text-navy-900">
                自動で行うこと
              </th>
              {["給湯専用", "オート", "フルオート"].map((h) => (
                <th key={h} scope="col" className="px-3 py-3 text-center">
                  <span className="inline-block whitespace-nowrap rounded-full bg-navy-900 px-3.5 py-1 font-heading text-[0.8125rem] font-bold text-white">{h}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FUNCTION_ROWS.map((r) => (
              <tr key={r.label} className="border-t-2 border-dotted border-silver-300">
                <th scope="row" className="px-3 py-3.5 text-left font-bold leading-[1.6] text-navy-900">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className="px-3 py-3.5 text-center">
                    {v === "some" ? (
                      <span className="whitespace-nowrap text-[0.8125rem] font-bold leading-tight text-ink-mute">機種による</span>
                    ) : v ? (
                      <>
                        <span className="mx-auto grid size-7 place-items-center rounded-full bg-brand-600" aria-hidden="true">
                          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3.5 8.5l3 3 6-7" />
                          </svg>
                        </span>
                        <span className="sr-only">できる</span>
                      </>
                    ) : (
                      <>
                        <span className="mx-auto block h-0.5 w-4 rounded bg-silver-400" aria-hidden="true" />
                        <span className="sr-only">できない</span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* エコジョーズの仕組み                                                */
/* ------------------------------------------------------------------ */
function EcoJozuFigure({ caption }: { caption?: string }) {
  return (
    <Frame label="エコジョーズの仕組み" caption={caption ?? "排気の熱を回収する部分（二次熱交換器）があるのが、従来型のガス給湯器との違いです。"}>
      <svg viewBox="0 0 520 300" className="mx-auto block h-auto w-full max-w-xl" role="img" aria-label="エコジョーズの中を、水が下から上へ、二次熱交換器、一次熱交換器の順に通ってお湯になる図">
        <ArrowDefs />
        {/* 本体 */}
        <rect x={150} y={20} width={220} height={260} rx={14} {...line} fill="#fff" />
        {/* 二次熱交換器（上） */}
        <rect x={180} y={48} width={160} height={54} rx={8} fill={SHADE} {...thin} />
        <path d="M196 66h128M196 84h128" stroke={BLUE} strokeWidth={3} strokeLinecap="round" />
        {/* 一次熱交換器（中） */}
        <rect x={180} y={124} width={160} height={54} rx={8} fill="#fff0cc" {...thin} />
        <path d="M196 142h128M196 160h128" stroke={HEAT} strokeWidth={3} strokeLinecap="round" />
        {/* バーナー（下） */}
        <path d="M200 232h120" {...thin} />
        {[212, 236, 260, 284, 308].map((x) => (
          <path key={x} d={`M${x} 228c-7-9 0-13 0-22 6 6 9 13 0 22z`} fill={HEAT} stroke={NAVY} strokeWidth={1.25} />
        ))}
        {/* 水 → お湯 */}
        <Arrow d="M40 75h134" color={BLUE} />
        <Arrow d="M346 151h134" color={HEAT} />
        <path d="M340 75h18v76h-18" stroke={BLUE} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* 排気 */}
        <Arrow d="M260 44V8" color={LINE} dashed />
        {/* ドレン水 */}
        <Arrow d="M180 92h-46v150" color={BLUE} dashed />
        <rect x={110} y={246} width={48} height={26} rx={6} fill="#fff" {...thin} />
        <Arrow d="M110 259H52" color={BLUE} dashed />
        <Mark x={64} y={54} n={1} />
        <Mark x={388} y={62} n={2} />
        <Mark x={388} y={186} n={3} />
        <Mark x={292} y={12} n={4} />
        <Mark x={96} y={228} n={5} />
      </svg>
      <Legend
        items={[
          { title: "水が入る", text: "給水された水が、まず上の二次熱交換器へ向かいます。" },
          { title: "排気の熱で温める（二次熱交換器）", text: "これまで外へ出していた排気の熱を回収して、水をあらかじめ温めます。" },
          { title: "炎で沸かす（一次熱交換器）", text: "温まった水を、バーナーの炎で設定の温度まで沸かします。" },
          { title: "排気", text: "熱を回収したあとの排気を、外へ出します。" },
          { title: "ドレン水（中和器を通して排水）", text: "熱を回収するときに出る酸性の水を、本体の中和器で中和してから排水します。排水の配管が必要です。" },
        ]}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* エコキュートの仕組み                                                */
/* ------------------------------------------------------------------ */
function EcocuteFigure({ caption }: { caption?: string }) {
  return (
    <Frame label="エコキュートの仕組み" caption={caption ?? "ヒートポンプユニットと貯湯タンクの2つを置く場所が要ります。"}>
      <svg viewBox="0 0 520 260" className="mx-auto block h-auto w-full max-w-xl" role="img" aria-label="ヒートポンプユニットが空気の熱でお湯を沸かし、貯湯タンクにためて、蛇口やおふろで使う図">
        <ArrowDefs />
        <path d="M20 232h480" {...line} />
        {/* ヒートポンプ */}
        <rect x={50} y={140} width={130} height={86} rx={8} {...line} fill="#fff" />
        <circle cx={104} cy={183} r={30} fill={SHADE} {...thin} />
        <path d="M82 183h44M104 161v44" {...thin} />
        <path d="M152 156v54M164 156v54" stroke={LINE} strokeWidth={1.75} strokeLinecap="round" />
        {/* 空気の熱 */}
        <Arrow d="M14 168h30" color={HEAT} />
        <Arrow d="M14 198h30" color={HEAT} />
        {/* タンク */}
        <rect x={258} y={30} width={96} height={196} rx={12} {...line} fill="#fff" />
        <rect x={266} y={38} width={80} height={112} rx={7} fill="#fff0cc" />
        <rect x={266} y={150} width={80} height={68} rx={7} fill={SHADE} />
        <path d="M258 60h96" {...thin} />
        {/* ヒートポンプ ⇄ タンク */}
        <Arrow d="M180 168h72" color={HEAT} />
        <Arrow d="M252 204h-66" color={BLUE} />
        {/* タンク → 蛇口 */}
        <Arrow d="M354 76h64" color={HEAT} />
        <path d="M424 76h30v18" {...line} />
        <path d="M446 100c0 7 8 7 8 0 0-4-4-7-4-10-0 3-4 6-4 10z" fill={BLUE} />
        {/* 浴槽 */}
        <path d="M398 176h92v26a14 14 0 0 1-14 14h-64a14 14 0 0 1-14-14z" fill={SHADE} {...thin} />
        <Arrow d="M354 150h30v20" color={HEAT} />
        <Mark x={30} y={136} n={1} />
        <Mark x={116} y={124} n={2} />
        <Mark x={306} y={16} n={3} />
        <Mark x={446} y={54} n={4} />
      </svg>
      <Legend
        items={[
          { title: "空気の熱をくみ上げる", text: "エアコンの暖房と同じ原理で、外の空気の熱を集めます。" },
          { title: "ヒートポンプユニットでお湯を沸かす", text: "集めた熱と電気で、水を温めます。" },
          { title: "貯湯タンクにためる", text: "沸かしたお湯をタンクにためておきます。" },
          { title: "使うときにタンクから出す", text: "蛇口・シャワー・おふろへ、タンクのお湯を送ります。" },
        ]}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* ハイブリッド給湯器の仕組み                                          */
/* ------------------------------------------------------------------ */
function HybridFigure({ caption }: { caption?: string }) {
  return (
    <Frame label="ハイブリッド給湯器の仕組み" caption={caption ?? "ふだんはタンクのお湯を使い、足りないときだけガスで沸かす、という2段構えです。"}>
      <svg viewBox="0 0 520 260" className="mx-auto block h-auto w-full max-w-xl" role="img" aria-label="ヒートポンプで沸かしたお湯をタンクにため、足りないときはガスの熱源機が沸かして、蛇口や暖房へ送る図">
        <ArrowDefs />
        <path d="M20 232h480" {...line} />
        {/* ヒートポンプ */}
        <rect x={30} y={146} width={116} height={80} rx={8} {...line} fill="#fff" />
        <circle cx={78} cy={186} r={27} fill={SHADE} {...thin} />
        <path d="M58 186h40M78 166v40" {...thin} />
        <path d="M122 160v52M132 160v52" stroke={LINE} strokeWidth={1.75} strokeLinecap="round" />
        {/* タンク */}
        <rect x={204} y={70} width={84} height={156} rx={11} {...line} fill="#fff" />
        <rect x={212} y={78} width={68} height={86} rx={6} fill="#fff0cc" />
        <rect x={212} y={164} width={68} height={54} rx={6} fill={SHADE} />
        <path d="M204 98h84" {...thin} />
        {/* ガスの熱源機 */}
        <rect x={336} y={40} width={78} height={104} rx={9} {...line} fill="#fff" />
        <rect x={352} y={54} width={46} height={13} rx={6.5} fill={SHADE} {...thin} />
        {[358, 375, 392].map((x) => (
          <path key={x} d={`M${x} 124c-6-8 0-11 0-19 5 5 8 11 0 19z`} fill={HEAT} stroke={NAVY} strokeWidth={1.25} />
        ))}
        {/* つなぎ */}
        <Arrow d="M146 172h52" color={HEAT} />
        <Arrow d="M198 206h-46" color={BLUE} />
        <Arrow d="M288 116h42" color={HEAT} />
        <Arrow d="M414 92h50" color={HEAT} />
        <path d="M470 92h22v18" {...line} />
        <path d="M484 116c0 7 8 7 8 0 0-4-4-7-4-10 0 3-4 6-4 10z" fill={BLUE} />
        {/* 暖房（床） */}
        <Arrow d="M375 144v40" color={HEAT} dashed />
        <path d="M330 194h110M330 206h110" stroke={HEAT} strokeWidth={3} strokeLinecap="round" />
        <Mark x={88} y={130} n={1} />
        <Mark x={246} y={54} n={2} />
        <Mark x={375} y={24} n={3} />
        <Mark x={454} y={186} n={4} />
      </svg>
      <Legend
        items={[
          { title: "電気のヒートポンプで沸かす", text: "空気の熱を使って、効率よくお湯を沸かします。" },
          { title: "タンクにためて、ふだんはここから使う", text: "タンクはエコキュートより小さめです。お湯はまずタンクから出ます。" },
          { title: "足りないときは、ガスで沸かす", text: "たくさん使ってタンクのお湯が減っても、ガスの熱源機がすぐに沸かすので、お湯切れを起こしにくい仕組みです。" },
          { title: "暖房にも使える機種がある", text: "暖房つきの機種は、床暖房や浴室暖房乾燥機などの温水暖房にも、お湯を送れます。" },
        ]}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 交換費用の内訳                                                      */
/* ------------------------------------------------------------------ */
const PRICE_PARTS = [
  { name: "本体", text: "種類・号数・機能・設置方式で決まる" },
  { name: "リモコン", text: "台所と浴室。機能で種類が変わる" },
  { name: "標準工事", text: "取り外し・取り付け・配管とリモコンの接続・試運転" },
  { name: "撤去・処分", text: "いまの機器の引き取り" },
];
const PRICE_EXTRAS = ["設置方式を変える", "配管の延長・交換", "エコジョーズのドレン排水の配管", "据置台・配管カバー", "高い所・狭い場所での作業", "エコキュートの基礎・電気工事・搬入"];

function PriceBreakdownFigure({ caption }: { caption?: string }) {
  return (
    <Frame label="給湯器の交換費用の内訳" caption={caption ?? "お見積もりでは、それぞれの金額を分けてお出しします。"}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PRICE_PARTS.map((p, i) => (
          <div key={p.name} className="relative rounded-2xl bg-mist px-4 py-4">
            <p className="font-heading text-base font-black text-navy-900">{p.name}</p>
            <p className="mt-1 text-[0.8125rem] leading-[1.75]">{p.text}</p>
            {i < PRICE_PARTS.length - 1 && (
              <span className="absolute -bottom-3 left-1/2 z-10 grid size-6 -translate-x-1/2 place-items-center rounded-full bg-navy-900 text-sm font-bold leading-none text-white sm:hidden" aria-hidden="true">
                ＋
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border-2 border-navy-900 px-5 py-3.5">
        <p className="font-heading text-[0.9375rem] font-black text-navy-900">上の4つの合計 ＋ 消費税</p>
        <p className="font-heading text-[0.9375rem] font-black text-brand-700">＝ お支払いの総額</p>
      </div>
      <div className="mt-5">
        <p className="text-[0.8125rem] font-bold text-navy-900">条件によって加わる費用</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {PRICE_EXTRAS.map((e) => (
            <li key={e} className="badge badge-sun !whitespace-normal">
              {e}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 補助金の申請の流れ                                                  */
/* ------------------------------------------------------------------ */
const SUBSIDY_STEPS: { title: string; who: "お客様" | "事業者" | "お客様と事業者"; text: string }[] = [
  { title: "対象の機種かを確かめる", who: "お客様と事業者", text: "国の「補助対象製品の検索」に登録されている型番かどうか。" },
  { title: "契約と、共同事業実施規約", who: "お客様と事業者", text: "工事請負契約と、国の決まった様式の規約を取り交わす。" },
  { title: "工事の前の写真", who: "事業者", text: "着工の前に、いまの給湯器を撮る。撮り忘れると原則、対象外。" },
  { title: "工事・引き渡し", who: "事業者", text: "取り付けのあと、工事の後の写真を撮る。" },
  { title: "交付申請", who: "事業者", text: "登録された事業者が、国のシステムから申請する。" },
  { title: "交付決定・補助金の還元", who: "事業者", text: "事業者に交付された補助金を、代金への充当か現金で、お客様へ。" },
];

function SubsidyFlowFigure({ caption }: { caption?: string }) {
  return (
    <Frame label="補助金の申請の流れ" caption={caption ?? "給湯省エネ2026事業（リフォームの工事請負契約の場合）の流れを、公式の手続きの説明から短くまとめたものです。"}>
      <ol className="grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {SUBSIDY_STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-3.5">
            <span className="num grid size-9 shrink-0 place-items-center rounded-full bg-navy-900 text-base font-semibold leading-none text-white" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <p className="font-heading text-[0.9688rem] font-black leading-[1.5] text-navy-900">{s.title}</p>
              <p className="mt-1">
                <span className={`badge ${s.who === "事業者" ? "badge-blue" : "badge-sun"}`}>{s.who}</span>
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-[1.8]">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 型番の書いてある場所                                                */
/* ------------------------------------------------------------------ */
function LabelLocationFigure({ caption }: { caption?: string }) {
  return (
    <Frame label="型番の書いてある場所" caption={caption ?? "シール（銘板）の位置は、機種によって違います。見つからないときは、本体の全体と、シールらしきものの写真をお送りください。"}>
      <svg viewBox="0 0 520 250" className="mx-auto block h-auto w-full max-w-xl" role="img" aria-label="給湯器の本体の正面と側面のシール、リモコンに、型番が書いてあることを示す図">
        {/* 本体（正面と側面） */}
        <path d="M170 34h120v170H170z" {...line} fill="#fff" />
        <path d="M290 34l34 16v170l-34-16z" {...line} fill={SHADE} />
        <rect x={202} y={50} width={56} height={14} rx={7} fill={SHADE} {...thin} />
        {/* 正面のシール */}
        <rect x={232} y={150} width={44} height={36} rx={3} fill="#fff0cc" stroke={NAVY} strokeWidth={2.5} />
        <path d="M239 161h30M239 169h30M239 177h18" stroke={NAVY} strokeWidth={1.5} strokeLinecap="round" />
        {/* 側面のシール */}
        <path d="M298 122l18 8v34l-18-8z" fill="#fff0cc" stroke={NAVY} strokeWidth={2.5} strokeLinejoin="round" />
        {/* 配管 */}
        <path d="M200 204v26M230 204v26M260 204v26" {...thin} />
        {/* リモコン */}
        <rect x={392} y={84} width={98} height={66} rx={9} {...line} fill="#fff" />
        <rect x={404} y={96} width={50} height={26} rx={4} fill={SHADE} {...thin} />
        <circle cx={472} cy={109} r={8} fill="#fff" {...thin} />
        <path d="M404 136h36" stroke={NAVY} strokeWidth={2.5} strokeLinecap="round" />
        {/* 保証書 */}
        <rect x={30} y={78} width={78} height={100} rx={5} {...line} fill="#fff" />
        <path d="M44 100h50M44 116h50M44 132h34" stroke={LINE} strokeWidth={2} strokeLinecap="round" />
        <rect x={44} y={148} width={36} height={14} rx={3} fill="#fff0cc" {...thin} />
        <Mark x={254} y={136} n={1} />
        <Mark x={334} y={118} n={2} />
        <Mark x={441} y={68} n={3} />
        <Mark x={69} y={62} n={4} />
      </svg>
      <Legend
        items={[
          { title: "本体の正面のシール", text: "正面の下のほうに貼ってあることが多い、型番・製造年月などが書かれたシール（銘板）。" },
          { title: "本体の側面のシール", text: "正面に無いときは、左右の側面を見ます。" },
          { title: "リモコン", text: "リモコンにも型番があります（本体の型番とは別のもの）。ふたの裏や下の面に書かれています。" },
          { title: "取扱説明書・保証書", text: "表紙や保証書の欄に、本体の型番が書かれています。" },
        ]}
      />
    </Frame>
  );
}

export function Figure({ name, caption }: { name: FigureName; caption?: string }) {
  switch (name) {
    case "gou":
      return <GouFigure caption={caption} />;
    case "install-types":
      return <InstallTypesFigure caption={caption} />;
    case "function-types":
      return <FunctionTypesFigure caption={caption} />;
    case "ecojozu-mechanism":
      return <EcoJozuFigure caption={caption} />;
    case "ecocute-mechanism":
      return <EcocuteFigure caption={caption} />;
    case "hybrid-mechanism":
      return <HybridFigure caption={caption} />;
    case "price-breakdown":
      return <PriceBreakdownFigure caption={caption} />;
    case "subsidy-flow":
      return <SubsidyFlowFigure caption={caption} />;
    case "label-location":
      return <LabelLocationFigure caption={caption} />;
  }
}
