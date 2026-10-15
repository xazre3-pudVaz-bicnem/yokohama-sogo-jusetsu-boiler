/**
 * 写真でかんたん見積もりの、撮り方の見本の図（コードで描いた図。実際の機種の写真ではない）。
 * label … 型番のシールに近づいて撮る ／ whole … 1〜2m 離れて、配管とまわりまで入れて撮る ／ extra … リモコン・配管の下・置き場所
 */
const NAVY = "#061537";
const BLUE = "#1b6cff";
const SHADE = "#e3edff";
const HEAT = "#ffbd3d";
const line = { stroke: NAVY, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const, fill: "none" };
const thin = { stroke: NAVY, strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** カメラの枠（四隅のかぎ） */
function Frame({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const k = 12;
  return (
    <g stroke={BLUE} strokeWidth={3} strokeLinecap="round" fill="none">
      <path d={`M${x} ${y + k}V${y}h${k}M${x + w - k} ${y}h${k}v${k}M${x + w} ${y + h - k}v${k}h-${k}M${x + k} ${y + h}h-${k}v-${k}`} />
    </g>
  );
}

export function PhotoSlotFigure({ slot, className = "" }: { slot: "label" | "whole" | "extra"; className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden="true" fill="none">
      {slot === "label" && (
        <>
          <rect x={22} y={14} width={156} height={112} rx={10} fill={SHADE} />
          <rect x={44} y={30} width={112} height={80} rx={6} {...line} fill="#fff" />
          <path d="M58 46h52" {...thin} strokeWidth={3} />
          <path d="M58 60h84M58 72h70M58 84h78M58 96h48" {...thin} />
          <rect x={112} y={40} width={30} height={12} rx={3} fill={HEAT} />
          <Frame x={34} y={22} w={132} h={96} />
        </>
      )}
      {slot === "whole" && (
        <>
          <rect x={10} y={10} width={180} height={120} rx={10} fill={SHADE} />
          <path d="M10 104h180" stroke="#a0a9b8" strokeWidth={1.5} strokeDasharray="4 5" />
          <rect x={78} y={30} width={44} height={56} rx={5} {...line} fill="#fff" />
          <rect x={88} y={38} width={24} height={6} rx={3} fill={HEAT} />
          <path d="M88 86v18M96 86v18M104 86v18M112 86v18" {...thin} />
          <Frame x={48} y={18} w={104} h={100} />
          <path d="M22 122h36M142 122h36" stroke={BLUE} strokeWidth={2} strokeLinecap="round" />
          <text x={100} y={127} textAnchor="middle" fontSize={11} fontWeight={700} fill={BLUE}>
            1〜2m 離れて
          </text>
        </>
      )}
      {slot === "extra" && (
        <>
          <rect x={8} y={14} width={86} height={112} rx={10} fill={SHADE} />
          <rect x={26} y={34} width={50} height={64} rx={6} {...line} fill="#fff" />
          <rect x={34} y={44} width={34} height={18} rx={3} fill={SHADE} {...thin} />
          <circle cx={42} cy={78} r={5} {...thin} />
          <circle cx={60} cy={78} r={5} {...thin} />
          <rect x={106} y={14} width={86} height={112} rx={10} fill={SHADE} />
          <path d="M126 30v52M140 30v52M154 30v52M168 30v52" {...line} />
          <path d="M120 96h56" {...line} />
          <Frame x={114} y={22} w={70} h={86} />
        </>
      )}
    </svg>
  );
}
