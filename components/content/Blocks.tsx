import Link from "next/link";
import { Figure } from "@/components/diagram/Figures";
import { Widget } from "@/components/content/Widgets";
import { FieldNote } from "@/components/ui/FieldNote";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import type { Block } from "@/data/content-types";
import { fillTokens } from "@/lib/tokens";

/**
 * 解説のページの本文の部品（data/content-types.ts の Block）を表示する。
 * 文章の中のリンク・強調・データの値は RichText が処理する。
 */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}

function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case "p":
      return (
        <p className="text-[0.9688rem] leading-[2.05] sm:text-base sm:leading-[2.05]">
          <RichText>{b.text}</RichText>
        </p>
      );

    case "list":
      return (
        <ul className="dash-list space-y-2 text-[0.9688rem] leading-[1.95] sm:text-base sm:leading-[1.95]">
          {b.items.map((item) => (
            <li key={item}>
              <RichText>{item}</RichText>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="steps">
          {b.items.map((s) => (
            <li key={s.title}>
              <h3 className="pt-1.5 text-[1.0625rem] font-bold leading-[1.6]">{fillTokens(s.title)}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-[1.95]">
                <RichText>{s.text}</RichText>
              </p>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <figure>
          {b.caption && <figcaption className="mb-2.5 text-sm font-bold text-navy-900">{fillTokens(b.caption)}</figcaption>}
          {/* 幅が足りないときは、枠ごと横にスクロールする。キーボードでも送れるように tabIndex を付ける */}
          <div className="table-wrap border border-silver-200" tabIndex={0} role="region" aria-label={b.caption ? fillTokens(b.caption) : "表"}>
            <table className="table-spec">
              <thead>
                <tr>
                  {b.head.map((h) => (
                    <th key={h} scope="col">
                      {fillTokens(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th key={c} scope="row">
                          <RichText>{cell}</RichText>
                        </th>
                      ) : (
                        <td key={c}>
                          <RichText>{cell}</RichText>
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.note && (
            <p className="mt-2.5 text-[0.8125rem] leading-[1.9] text-ink-mute">
              <RichText>{b.note}</RichText>
            </p>
          )}
        </figure>
      );

    case "callout": {
      const tone = b.tone === "caution" ? "callout-caution" : b.tone === "plain" ? "callout-plain" : "";
      return (
        <div className={`callout ${tone}`} role={b.tone === "caution" ? "note" : undefined}>
          {b.title && <p className="font-heading font-bold text-navy-900">{fillTokens(b.title)}</p>}
          <p>
            <RichText>{b.text}</RichText>
          </p>
        </div>
      );
    }

    case "dl":
      return (
        <dl className="dl-spec card card-line px-5 sm:px-7">
          {b.items.map((it) => (
            <div key={it.term}>
              <dt>{fillTokens(it.term)}</dt>
              <dd className="text-[0.9375rem] leading-[1.95]">
                <RichText>{it.desc}</RichText>
              </dd>
            </div>
          ))}
        </dl>
      );

    case "links":
      return (
        <ul className="rows">
          {b.items.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex min-h-14 items-center justify-between gap-4 py-3">
                <span>
                  <span className="block font-heading text-[0.9688rem] font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-700">{l.label}</span>
                  {l.note && <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-ink-mute">{l.note}</span>}
                </span>
                <span className="arrow-dot">
                  <Icon name="arrowRight" className="size-3.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      );

    case "note":
      return (
        <FieldNote label={b.label} pose={b.pose}>
          <RichText>{b.text}</RichText>
        </FieldNote>
      );

    case "figure":
      return <Figure name={b.name} caption={b.caption} />;

    case "widget":
      return <Widget name={b.name} />;
  }
}
