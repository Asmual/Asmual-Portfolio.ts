"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getOrSetId(storage: Storage, key: string): string {
  try {
    let id = storage.getItem(key);
    if (!id) {
      id = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      storage.setItem(key, id);
    }
    return id;
  } catch {
    return "v_" + Math.random().toString(36).substring(2, 10);
  }
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track in browser
    if (typeof window === "undefined") return;

    // Do not track admin dashboard visits to avoid skewing real audience data
    if (pathname.startsWith("/dashboard")) return;

    const visitorId = getOrSetId(window.localStorage, "asmual_visitor_id");
    const sessionId = getOrSetId(window.sessionStorage, "asmual_session_id");

    const trackPageview = () => {
      try {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId,
            sessionId,
            path: pathname,
            referrer: typeof document !== "undefined" ? document.referrer : "",
          }),
          // Keepalive ensures request completes even if navigating away quickly
          keepalive: true,
        }).catch(() => {});
      } catch {
        // Ignore network errors silently
      }
    };

    // Track when pathname changes
    if (lastTrackedPath.current !== pathname) {
      lastTrackedPath.current = pathname;
      trackPageview();
    }

    // Heartbeat every 2.5 minutes while active tab stays open
    const heartbeat = setInterval(() => {
      trackPageview();
    }, 150000);

    return () => clearInterval(heartbeat);
  }, [pathname]);

  return null;
}
