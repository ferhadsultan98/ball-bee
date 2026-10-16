"use client";

import { useEffect, useState } from "react";
import { Eye } from "../ui/Icons";

export function ViewCounter({ postId, initial, label }: { postId: string; initial: number; label: string }) {
  const [views, setViews] = useState(initial);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let alive = true;
    (async () => {
      const { getDb, increment, onValue, ref, update } = await import("@/lib/firebase-client");
      if (!alive) return;
      const db = getDb();
      const key = `bb-viewed-${postId}`;
      let counted = false;
      try {
        counted = sessionStorage.getItem(key) === "1";
        if (!counted) sessionStorage.setItem(key, "1");
      } catch {
        /* storage unavailable */
      }
      if (!counted) void update(ref(db, `blogPosts/${postId}`), { viewCount: increment(1) }).catch(() => {});
      unsubscribe = onValue(ref(db, `blogPosts/${postId}/viewCount`), (snap) => {
        const v = snap.val();
        if (typeof v === "number") setViews(v);
      });
    })();
    return () => {
      alive = false;
      unsubscribe?.();
    };
  }, [postId]);

  return (
    <span className="inline-flex items-center gap-1.5">
      <Eye size={16} />
      <span className="tabular-nums">{views}</span> {label}
    </span>
  );
}
