"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getDeviceVisitorId(): string {
  try {
    const key = "asmual_device_id_v2";
    let id = window.localStorage.getItem(key);
    if (!id) {
      id = "dev_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      window.localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "dev_" + Math.random().toString(36).substring(2, 10);
  }
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do not track visits inside the admin dashboard to avoid skewing real audience data
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) return;

    const visitorId = getDeviceVisitorId();

    const sendTrack = (isNewVisit: boolean = false) => {
      try {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId,
            path: pathname,
            referrer: document.referrer || "",
            isNewVisit,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        // Ignore network errors silently
      }
    };

    const sendHeartbeat = () => {
      if (document.visibilityState !== "visible") return;
      try {
        fetch("/api/analytics/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, path: pathname }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        // Ignore network errors
      }
    };

    const sendLeave = (closeAll: boolean = false) => {
      try {
        const payload = JSON.stringify({ visitorId, closeAll });
        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon("/api/analytics/leave", blob);
        } else {
          fetch("/api/analytics/leave", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        // Ignore errors on leave
      }
    };

    // Track initial page load or route transition
    if (lastTrackedPath.current !== pathname) {
      const isFirst = lastTrackedPath.current === null;
      lastTrackedPath.current = pathname;
      sendTrack(isFirst);
    }

    // Frequent heartbeat every 20 seconds while page is active
    const heartbeatInterval = setInterval(sendHeartbeat, 20000);

    // Fast leave detection: when tab/browser closes or app is minimized on mobile
    const handlePageHide = () => {
      sendLeave(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendLeave(false);
      } else if (document.visibilityState === "visible") {
        sendHeartbeat();
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}
