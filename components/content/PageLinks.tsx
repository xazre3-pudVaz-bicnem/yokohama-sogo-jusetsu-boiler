import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Phrase } from "@/components/ui/Phrase";
import type { ContentPage } from "@/data/content-types";
import { contentPagePath } from "@/lib/content";
import { reveal } from "@/lib/reveal";
import { fillTokens } from "@/lib/tokens";

/**
 * 解説のページへのリンクの一覧（一覧ページ・トップで使う）。
 * 1枚の白いパネルの中を点線で区切る「行」の形。題名は見出し（h3）にする。
 */
export function PageLinkRows({ pages, columns = 2, headingLevel = "h3" }: { pages: ContentPage[]; columns?: 1 | 2; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className={`rows ${columns === 2 ? "rows-2" : ""}`} {...reveal()}>
      {pages.map((p) => (
        <li key={p.slug}>
          <Link href={contentPagePath(p)} className="group flex min-h-20 items-center justify-between gap-4 py-4">
            {/* 見出し（h3）を入れるので、span ではなく div にする（span の中に見出しは置けない） */}
            <div className="min-w-0">
              <Heading className="font-heading text-[1.0313rem] font-black leading-[1.5] text-navy-900 transition-colors group-hover:text-brand-700">
                <Phrase>{fillTokens(p.h1)}</Phrase>
              </Heading>
              <span className="mt-1 block text-[0.8438rem] leading-[1.8] text-ink-body">{fillTokens(p.summary)}</span>
            </div>
            <span className="arrow-dot">
              <Icon name="arrowRight" className="size-3.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
