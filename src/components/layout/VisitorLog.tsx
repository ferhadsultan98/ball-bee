"use client";

import { useEffect } from "react";

/** Logs one visit per full page load to Firebase (port of the original IPRequest component). */
export function VisitorLog() {
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const res = await fetch("https://ipwho.is/");
        const ipData = await res.json();
        if (cancelled) return;
        const { getDb, push, ref, set } = await import("@/lib/firebase-client");
        await set(push(ref(getDb(), "visitorIPs")), {
          ip: ipData.ip ?? "",
          country: ipData.country ?? "",
          city: ipData.city ?? "",
          region: ipData.region ?? "",
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        });
      } catch {
        /* non-critical */
      }
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2500));
    const handle = idle(() => void run());
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof handle === "number") window.cancelIdleCallback(handle);
    };
  }, []);

  return null;
}
