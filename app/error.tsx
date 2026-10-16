"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * ページを描く途中で、思いがけない誤りが起きたときの画面（Next.js の error.tsx）。
 * ヘッダー・フッター（電話・LINE の入口）は、この画面でもそのまま出る。
 * 公開のあとで古いページを開いていた、などの一時的な誤りが多いので、読み込み直しを先に案内する。
 */
export default function ErrorPage({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white">
      <div className="container-x section">
        <h1 className="h-page">ページを表示できませんでした</h1>
        <p className="lead mt-5">一時的な不具合で、このページを表示できませんでした。お手数ですが、読み込み直してください。続くときは、お電話か LINE でご相談ください。</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => window.location.reload()} className="btn btn-cta btn-lg">
            読み込み直す
          </button>
          <Link href="/" className="btn btn-white btn-lg">
            トップページへ
          </Link>
        </div>
      </div>
    </div>
  );
}
