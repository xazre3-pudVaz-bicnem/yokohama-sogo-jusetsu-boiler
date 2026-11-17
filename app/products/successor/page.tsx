import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reveal } from "@/lib/reveal";
import { faqSchema, itemListSchema } from "@/lib/schema";
import { buildMetadata, formatDateJa } from "@/lib/seo";
import { SUCCESSOR_PATH, successorBrandPath, successorBrands, successorOldModelCount, successorsUpdatedAt } from "@/lib/successors";

/**
 * 古い型番から、メーカーが案内している機種を探すページの入口（/products/successor）。
 * 一覧そのものは、メーカーごとのページ（/products/successor/<メーカー>）に置く（型番が多いので、1ページに詰めない）。
 * 対応はメーカーの公式の情報だけ（data/products/successors.ts）。型番の似かたから推し量った対応は載せない。
 * /products/[brand] より先に、この固定のページが使われる（brands に successor という id は無い）。
 */
const TITLE = "古い型番から後継機種を探す｜給湯器・エコキュート（メーカーの案内）";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: `いまお使いの給湯器・エコキュートの型番から、メーカーが案内している後継機種・取り替えの推奨機種を探せます。リンナイ・ノーリツ・三菱電機・パナソニック・ダイキンの公式の資料で確かめた${successorOldModelCount().toLocaleString("ja-JP")}の型番を、出典とともに載せています。`,
  path: SUCCESSOR_PATH,
  keywords: ["給湯器 後継機種", "給湯器 型番 後継", "エコキュート 後継機種", "給湯器 生産終了 後継"],
});

const FAQS = [
  {
    q: "この一覧に、いまの給湯器の型番がありません。",
    a: "銘板（型番のシール）の写真をお送りください。メーカーの案内と、設置の形・号数・機能から、替えられる機種をお調べします。",
  },
  {
    q: "後継の機種なら、同じ場所にそのまま付けられますか。",
    a: "設置の形・号数・機能が同じなら、多くの場合は同じ場所に取り付けられます。ただし、配管の位置やリモコンの種類によって、使う部材や工事が変わることがあります。現地調査で確かめてから、お見積もりをお出しします。",
  },
];

export default function SuccessorHubPage() {
  const list = successorBrands();
  const total = successorOldModelCount();
  const updated = successorsUpdatedAt("2026-11-16");

  return (
    <>
      <PageHero
        eyebrow="型番から探す"
        title="古い型番から、後継の機種を探す"
        lead="給湯器やエコキュートを替えるときは、いまの機種の型番が手がかりになります。メーカーが公式に案内している後継機種・取り替えの推奨機種を、メーカーごとに型番で探せるようにまとめました。型番は、本体の正面の銘板で確かめられます。"
        crumbs={[
          { name: "商品一覧", href: "/products" },
          { name: "古い型番から探す", href: SUCCESSOR_PATH },
        ]}
        illust="illust/pose-idea"
      >
        <p className="mt-5 text-[0.8125rem] text-ink-mute">
          <time dateTime={updated}>{formatDateJa(updated)}</time> 更新・{total.toLocaleString("ja-JP")}の型番
        </p>
      </PageHero>

      <section aria-labelledby="successor-brands" className="bg-white">
        <div className="container-x section-tight">
          <SectionHeading id="successor-brands" eyebrow="メーカーを選ぶ" title="いまの給湯器のメーカーから探す" lead="メーカーの名前は、本体の正面のロゴや銘板で分かります。型番の頭の文字も、手がかりになります。" className="mb-8" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" {...reveal()}>
            {list.map((b) => (
              <li key={b.id}>
                <Link href={successorBrandPath(b.id)} className="card card-line group flex h-full flex-col px-5 py-5">
                  <span className="font-heading text-[1.0625rem] font-black text-navy-900 group-hover:text-brand-700">{b.name}</span>
                  <span className="mt-2 text-[0.8125rem] leading-[1.8] text-ink-mute">
                    古い型番 <span className="num font-semibold text-ink">{b.oldModels.toLocaleString("ja-JP")}</span>件
                  </span>
                  <span className="mt-1 text-[0.8125rem] leading-[1.8] text-ink-mute">型番の頭：{b.prefixes.slice(0, 6).join("・")}など</span>
                  <span className="mt-auto flex justify-end pt-3">
                    <span className="arrow-dot">
                      <Icon name="arrowRight" className="size-3.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/guide/model-label" className="link-arrow">
              型番の調べ方（銘板の場所と読み方）
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="successor-notes" className="cv band band-mist section-tight">
        <div className="container-narrow">
          <SectionHeading id="successor-notes" eyebrow="読み方" title="後継の機種について、知っておきたいこと" className="mb-6" />
          <ul className="rows">
            {[
              "載せているのは、メーカーが公式サイトや資料で示している対応だけです。「後継機種」は、メーカーが後継・現行品・モデルチェンジとして示している機種です。「取り替えの推奨」は、カタログの取り替えの表で、メーカーが推奨している機種です。",
              "型番が似ていることから推し量った対応や、従来品との比べ方だけの記述は載せていません。",
              "後継の機種でも、設置の形・配管の位置・リモコンの種類によって、使う部材や工事が変わることがあります。現地調査で確かめてから、お見積もりをお出しします。",
              "後継の機種がこのサイトに載っていない場合も、お見積もりでご案内します。メーカーを替える場合は、設置の形と号数が合う機種から選びます。",
            ].map((t) => (
              <li key={t} className="flex gap-3 py-3.5 text-[0.9375rem] leading-[1.85]">
                <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-700" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="successor-faq" className="cv bg-white">
        <div className="container-narrow section-tight">
          <SectionHeading id="successor-faq" eyebrow="よくある質問" title="古い型番からの交換についての質問" className="mb-6" />
          <FaqList faqs={FAQS} />
          <p className="mt-10 text-[0.8125rem] leading-[1.9] text-ink-mute">
            型番の対応の出典（メーカーの公式ページ・資料）は、メーカーごとのページの下に載せています（{formatDateJa(updated)}時点）。生産の終了やモデルチェンジで変わることがあります。
          </p>
        </div>
      </section>

      <CtaBand id="cta-successor" title="型番が分からなくても、写真でご相談いただけます" />
      <JsonLd data={faqSchema(FAQS)!} />
      <JsonLd data={itemListSchema("古い型番から後継機種を探す（メーカー別）", list.map((b) => ({ name: `${b.name}の古い型番から探す`, href: successorBrandPath(b.id) })))} />
    </>
  );
}
