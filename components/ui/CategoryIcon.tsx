/**
 * 種類を表す小さな絵（ヘッダーのタブ・種類の入口・スマホのメニュー）。コードで描いた模式図で、製品の写真ではない。
 * 色は種類の色（ガス：緑・エコキュート：水色・ハイブリッド：紫）。飾りなので、読み上げの対象にしない。
 */
export type CategoryIconKind = "gas" | "ecocute" | "hybrid" | "subsidy" | "camera" | "phone" | "area" | "yen";

export function CategoryIcon({ kind, className = "size-8" }: { kind: CategoryIconKind; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      {kind === "gas" && (
        <>
          <rect x="8" y="3.5" width="16" height="20.5" rx="2.5" fill="#2fd068" />
          <rect x="11" y="7.5" width="10" height="2.2" rx="1.1" fill="#fff" />
          <circle cx="11.5" cy="16" r="0.9" fill="#0a7f37" />
          <circle cx="11.5" cy="19" r="0.9" fill="#0a7f37" />
          <circle cx="20.5" cy="16" r="0.9" fill="#0a7f37" />
          <circle cx="20.5" cy="19" r="0.9" fill="#0a7f37" />
          <path d="M12 24v4M16 24v4M20 24v4" stroke="#0a7f37" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {kind === "ecocute" && (
        <>
          <rect x="16" y="3" width="11" height="25" rx="2.5" fill="#2cb3ee" />
          <rect x="18.5" y="6.5" width="6" height="1.8" rx="0.9" fill="#fff" />
          <rect x="4" y="15" width="10.5" height="12" rx="2" fill="#5cc6f3" />
          <circle cx="9.25" cy="21" r="3.4" fill="#fff" />
          <path d="M9.25 18.6v4.8M6.85 21h4.8" stroke="#0a8fd0" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
      {kind === "hybrid" && (
        <>
          <rect x="18" y="5" width="9.5" height="23" rx="2.5" fill="#a98bf7" />
          <rect x="20.2" y="8.2" width="5" height="1.8" rx="0.9" fill="#fff" />
          <rect x="3.5" y="16" width="10.5" height="11.5" rx="2" fill="#8a5cf0" />
          <circle cx="8.75" cy="21.75" r="3.2" fill="#fff" />
          <path d="M15.2 9.5c1.3 1.6 1.3 3-.1 4.3" stroke="#ff8a3d" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12.5 7.5c1.6 2 1.6 3.8-.1 5.4" stroke="#ff8a3d" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {kind === "subsidy" && (
        <>
          <circle cx="16" cy="16" r="12.5" fill="#ffd21f" />
          <circle cx="16" cy="16" r="9.5" stroke="#d6a400" strokeWidth="1.4" />
          <path d="M11.8 10.2 16 15.6l4.2-5.4M16 15.6v7M12.4 17.1h7.2M12.4 20h7.2" stroke="#7a4b00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {kind === "yen" && (
        <>
          <rect x="4" y="7" width="24" height="18" rx="3" fill="#ff8a8f" />
          <path d="M12 11.2 16 16l4-4.8M16 16v6M12.8 17.2h6.4M12.8 19.8h6.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {kind === "camera" && (
        <>
          <rect x="3.5" y="9" width="25" height="17" rx="3.5" fill="#2b2b2b" />
          <path d="M11 9l1.8-3h6.4L21 9" fill="#2b2b2b" />
          <circle cx="16" cy="17.5" r="5.6" fill="#fff" />
          <circle cx="16" cy="17.5" r="3.4" fill="#2cb3ee" />
          <circle cx="24.2" cy="12.6" r="1.2" fill="#ffe14a" />
        </>
      )}
      {kind === "phone" && (
        <path
          d="M25.5 21.2v3.4a2.3 2.3 0 0 1-2.5 2.3 22.6 22.6 0 0 1-9.9-3.5 22.3 22.3 0 0 1-6.9-6.9 22.6 22.6 0 0 1-3.5-9.9A2.3 2.3 0 0 1 5 4.1h3.4a2.3 2.3 0 0 1 2.3 2 14.7 14.7 0 0 0 .8 3.2 2.3 2.3 0 0 1-.5 2.4L9.5 13.2a18.3 18.3 0 0 0 6.9 6.9l1.5-1.5a2.3 2.3 0 0 1 2.4-.5 14.7 14.7 0 0 0 3.2.8 2.3 2.3 0 0 1 2 2.3Z"
          fill="currentColor"
        />
      )}
      {kind === "area" && (
        <>
          <path d="M16 3.5a8.5 8.5 0 0 0-8.5 8.5c0 6.4 8.5 16.5 8.5 16.5s8.5-10.1 8.5-16.5A8.5 8.5 0 0 0 16 3.5Z" fill="#e0122b" />
          <circle cx="16" cy="12" r="3.4" fill="#fff" />
        </>
      )}
    </svg>
  );
}
