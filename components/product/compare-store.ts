"use client";

import { useSyncExternalStore } from "react";

/**
 * 「比較に追加」した機種の ID を、ブラウザに覚えておく（localStorage）。
 * ページを移っても選んだ機種が残り、/compare?ids=… で比べられる。最大 MAX_COMPARE 機種。
 * 保存できない環境（プライベートブラウズなど）では、そのページを開いているあいだだけ覚える。
 * 読めても書けない環境（容量がいっぱいなど）では、書けなかった時点から、memory だけを使う。
 */
export const MAX_COMPARE = 4;
const KEY = "yokoju-boiler-compare";
const EVENT = "yokoju-compare-change";

let memory: string[] = [];
let memoryOnly = false;
let cachedRaw = "";
let cached: string[] = [];

function read(): string[] {
  if (memoryOnly) return memory;
  let raw = "";
  try {
    raw = window.localStorage.getItem(KEY) ?? "";
  } catch {
    return memory;
  }
  // 同じ中身なら、同じ配列を返す（useSyncExternalStore が、毎回ちがう値だと判断して描き直しを繰り返さないように）
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const v = JSON.parse(raw || "[]");
    cached = Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, MAX_COMPARE) : [];
  } catch {
    cached = [];
  }
  return cached;
}

function write(ids: string[]) {
  memory = ids;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // 保存できない環境では、memory だけに持つ（保存の古い中身を読まないように、以後は memory を読む）
    memoryOnly = true;
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

const EMPTY: string[] = [];

/** 比較に入っている機種の ID（サーバー側の描画と、最初の描画では空） */
export function useCompareIds(): string[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

/** 追加・取り消し。上限を超える追加は false を返す */
export function toggleCompare(id: string): boolean {
  const ids = read();
  if (ids.includes(id)) {
    write(ids.filter((x) => x !== id));
    return true;
  }
  if (ids.length >= MAX_COMPARE) return false;
  write([...ids, id]);
  return true;
}

export function setCompare(ids: string[]) {
  write([...new Set(ids)].slice(0, MAX_COMPARE));
}

/** もう載っていない機種（削除した機種など）の ID を外す。knownIds は、いま載っているすべての機種 */
export function pruneCompare(knownIds: ReadonlySet<string>) {
  const ids = read();
  const kept = ids.filter((id) => knownIds.has(id));
  if (kept.length !== ids.length) write(kept);
}

export function clearCompare() {
  write([]);
}
