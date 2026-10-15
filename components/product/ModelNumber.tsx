import { Fragment } from "react";

/**
 * 型番の表示。ハイブリッド給湯器のように「熱源機 + ヒートポンプ + タンク」とつないだ型番は、
 * 「+」の前後でだけ折り返し、1つの型番の途中では折り返さない（RHP-R223(S) が「R / HP-…」と割れないように）。
 * 1つの型番が枠より長いとき（狭い列の表など）だけ、その中で折り返す。
 */
export function ModelNumber({ value }: { value: string }) {
  const parts = value.split(/\s+\+\s+/);
  if (parts.length === 1) return <span className="ib break-all">{value}</span>;
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={part + i}>
          {i > 0 && " + "}
          <span className="ib break-all">{part}</span>
        </Fragment>
      ))}
    </>
  );
}
