import Link from "next/link";
import { PostCover } from "@/components/blog/PostCover";
import { Icon } from "@/components/ui/Icon";
import { Phrase } from "@/components/ui/Phrase";
import type { Post } from "@/lib/blog";
import { formatDateDot } from "@/lib/seo";

/** 絵なしの1行（固定ページの「関連コラム」・記事の下の関連記事など）。呼び出し側で .rows のパネルに入れる */
export function PostRow({ post, headingLevel: H = "h3" }: { post: Post; headingLevel?: "h3" | "h4" }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group grid gap-x-5 gap-y-1.5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-ink-mute">
          <time dateTime={post.publishedAt} className="num">
            {formatDateDot(post.publishedAt)}
          </time>
          <span className="tag tag-blue">{post.cluster.name}</span>
        </p>
        <H className="mt-1.5 text-[0.9688rem] font-bold leading-relaxed transition-colors group-hover:text-brand-700">
          <Phrase>{post.title}</Phrase>
        </H>
      </div>
      <span className="arrow-dot hidden sm:grid">
        <Icon name="arrowRight" className="size-4" />
      </span>
    </Link>
  );
}

/** 絵つきのパネル（コラムの一覧・トップページの新着）。絵は記事の図かイラスト（写真は使わない） */
export function PostCard({ post, headingLevel: H = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9]">
        <PostCover cover={post.cover} illustWidth={140} />
        <span className="tag absolute right-3 top-3">{post.cluster.name}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <H className="text-[1.0313rem] font-bold leading-[1.6] transition-colors group-hover:text-brand-700">
          <Phrase>{post.title}</Phrase>
        </H>
        <p className="mt-2 line-clamp-3 text-sm leading-[1.85] text-ink-body">{post.description}</p>
        <p className="mt-auto pt-4 text-xs text-ink-mute">
          <time dateTime={post.publishedAt} className="num">
            {formatDateDot(post.publishedAt)}
          </time>
          {post.updatedAt !== post.publishedAt && (
            <>
              <span className="mx-1.5">／</span>更新 <time dateTime={post.updatedAt} className="num">{formatDateDot(post.updatedAt)}</time>
            </>
          )}
        </p>
      </div>
    </Link>
  );
}
