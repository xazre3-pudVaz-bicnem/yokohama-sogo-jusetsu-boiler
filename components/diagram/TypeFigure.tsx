import type { CategoryId, InstallationKey } from "@/data/products/types";

/**
 * 設置タイプの図（線画）。コードで描いた模式図で、特定の製品の外観ではない。
 *
 * 使う場所
 * - 商品カード・機種のページ：製品写真の掲載許諾が済むまでの間、写真の代わりに出す（「製品写真は準備中」と添える）
 * - 「設置方式から探す」「選び方」：設置方式の見分け方の説明
 *
 * 製品写真のように見せないこと（実物の写真や、実物に似せた絵にしない）。線と面だけの図にとどめる。
 * 色は、線＝濃紺、面＝白と淡い青、熱＝黄色、の3つだけ。
 */
export type FigureKind = "wall" | "floor" | "ps-door" | "ps-standard" | "ecocute" | "hybrid" | "other";

export function figureKindOf(category: CategoryId, installation: InstallationKey): FigureKind {
  if (category === "ecocute") return "ecocute";
  if (category === "hybrid") return "hybrid";
  if (installation === "wall" || installation === "floor" || installation === "ps-door" || installation === "ps-standard") return installation;
  return "other";
}

const NAVY = "#061537";
const LINE = "#a0a9b8";
const FACE = "#ffffff";
const SHADE = "#e3edff";
const HEAT = "#ffbd3d";

const stroke = { stroke: NAVY, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const thin = { stroke: NAVY, strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const ghost = { stroke: LINE, strokeWidth: 1.5, strokeLinecap: "round" as const };

/** 排気口（横長の穴と、すだれ状の線） */
function Vent({ x, y, w = 34 }: { x: number; y: number; w?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={11} rx={5.5} fill={SHADE} {...thin} />
      <path d={`M${x + 7} ${y + 5.5}h${w - 14}`} stroke={HEAT} strokeWidth={3} strokeLinecap="round" />
    </>
  );
}

/** 本体の箱（正面に排気口と、型番のシール） */
function Unit({ x, y, w, h, vent = true }: { x: number; y: number; w: number; h: number; vent?: boolean }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={FACE} {...stroke} />
      {vent && <Vent x={x + (w - 34) / 2} y={y + 12} />}
      <rect x={x + w - 26} y={y + h - 24} width={16} height={12} rx={1.5} fill={SHADE} {...thin} />
      <path d={`M${x + 10} ${y + h - 20}h${w - 46}M${x + 10} ${y + h - 13}h${w - 56}`} {...ghost} />
    </>
  );
}

/** 本体の下に出る配管（給水・給湯・ガス） */
function Pipes({ x, y, n = 3, len = 20, gap = 12 }: { x: number; y: number; n?: number; len?: number; gap?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${x + i * gap} ${y}v${len}`} {...thin} />
      ))}
    </>
  );
}

/** ヒートポンプユニット（横長の箱と、羽根の丸） */
function HeatPump({ x, y, w = 78, h = 56 }: { x: number; y: number; w?: number; h?: number }) {
  const cx = x + w * 0.42;
  const cy = y + h / 2;
  const r = h * 0.34;
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={5} fill={FACE} {...stroke} />
      <circle cx={cx} cy={cy} r={r} fill={SHADE} {...thin} />
      <path d={`M${cx - r * 0.7} ${cy}h${r * 1.4}M${cx} ${cy - r * 0.7}v${r * 1.4}`} {...thin} />
      <path d={`M${x + w - 14} ${y + 12}v${h - 24}M${x + w - 8} ${y + 12}v${h - 24}`} {...ghost} />
      <path d={`M${x + 8} ${y + h}v6M${x + w - 8} ${y + h}v6`} {...thin} />
    </>
  );
}

function Ground({ y }: { y: number }) {
  return <path d={`M14 ${y}h212`} {...stroke} />;
}

/** 外壁（横張りの板の線） */
function Siding() {
  return <path d="M0 40h240M0 80h240M0 120h240" stroke="#dbe5f5" strokeWidth={1.5} />;
}

export function TypeFigure({ kind, className = "", title }: { kind: FigureKind; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 240 180" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} fill="none">
      {kind === "wall" && (
        <>
          <Siding />
          <Unit x={84} y={26} w={72} h={98} />
          <Pipes x={104} y={124} len={14} gap={16} />
          <rect x={94} y={138} width={52} height={24} rx={3} fill={SHADE} {...thin} />
        </>
      )}

      {kind === "floor" && (
        <>
          <Siding />
          <Ground y={158} />
          <rect x={72} y={150} width={16} height={8} fill={SHADE} {...thin} />
          <rect x={132} y={150} width={16} height={8} fill={SHADE} {...thin} />
          <Unit x={64} y={50} w={92} h={100} />
          <path d="M156 96h26v-34M156 112h36v-50M156 128h46v-66" {...thin} />
        </>
      )}

      {kind === "ps-door" && (
        <>
          {/* 玄関横の扉（パイプスペース）。中の本体は破線、排気は扉の窓から */}
          <rect x={70} y={12} width={100} height={156} fill={FACE} {...stroke} />
          <path d="M70 168h100" {...stroke} />
          <rect x={86} y={34} width={68} height={86} rx={5} stroke={NAVY} strokeWidth={1.75} strokeDasharray="5 5" fill="none" />
          <rect x={98} y={46} width={44} height={20} rx={3} fill={SHADE} {...thin} />
          <path d="M106 52.5h28M106 59.5h28" stroke={HEAT} strokeWidth={3} strokeLinecap="round" />
          <circle cx={158} cy={96} r={3.5} fill={NAVY} />
          <path d="M92 138h56M92 148h40" {...ghost} />
        </>
      )}

      {kind === "ps-standard" && (
        <>
          {/* 廊下の壁のくぼみ（扉なし）。下にメーター */}
          <path d="M0 14h240" stroke="#dbe5f5" strokeWidth={1.5} />
          <rect x={62} y={14} width={116} height={154} fill={SHADE} {...stroke} />
          <Unit x={84} y={26} w={72} h={90} />
          <Pipes x={104} y={116} len={18} gap={16} />
          <circle cx={100} cy={148} r={10} fill={FACE} {...thin} />
          <circle cx={140} cy={148} r={10} fill={FACE} {...thin} />
          <path d="M100 148l4-5M140 148l-4-5" {...thin} />
        </>
      )}

      {kind === "ecocute" && (
        <>
          <Ground y={160} />
          {/* 貯湯タンク */}
          <rect x={44} y={18} width={62} height={136} rx={8} fill={FACE} {...stroke} />
          <path d="M44 44h62" {...thin} />
          <path d="M60 64h30M60 76h30M60 88h20" {...ghost} />
          <path d="M52 154v6M98 154v6" {...thin} />
          {/* ヒートポンプ */}
          <HeatPump x={128} y={98} />
          <path d="M106 128h22M106 138h22" {...thin} />
        </>
      )}

      {kind === "hybrid" && (
        <>
          <Ground y={160} />
          {/* ヒートポンプ */}
          <HeatPump x={18} y={98} w={70} h={56} />
          {/* タンクユニット */}
          <rect x={104} y={46} width={52} height={108} rx={7} fill={FACE} {...stroke} />
          <path d="M104 68h52" {...thin} />
          <path d="M116 86h28M116 98h28" {...ghost} />
          <path d="M112 154v6M148 154v6" {...thin} />
          {/* ガスの熱源機 */}
          <rect x={172} y={62} width={50} height={72} rx={6} fill={FACE} {...stroke} />
          <Vent x={180} y={72} w={34} />
          <path d="M184 134v20M197 134v20M210 134v20" {...thin} />
          <path d="M88 128h16M156 100h16" {...thin} />
        </>
      )}

      {kind === "other" && (
        <>
          <Siding />
          <Unit x={78} y={36} w={84} h={96} />
          <Pipes x={102} y={132} len={22} gap={18} />
        </>
      )}
    </svg>
  );
}
