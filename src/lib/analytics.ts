import crypto from "crypto";

export interface VisitorLog {
  visitorId: string;
  path: string;
  country: string;
  countryCode: string;
  city: string;
  device: "Desktop" | "Mobile" | "Tablet";
  deviceModel: string;
  browser: string;
  os: string;
  referrer: string;
  timestamp: Date;
  durationSeconds: number;
}

export interface ActiveVisitor {
  visitorId: string;
  openTabs: number;
  lastActive: Date;
  firstSeen: Date;
  country: string;
  countryCode: string;
  city: string;
  device: "Desktop" | "Mobile" | "Tablet";
  deviceModel: string;
  browser: string;
  os: string;
  path: string;
}

// Convert 2-letter country code (e.g. "BD", "US") to unicode flag emoji
export function getCountryFlag(code?: string): string {
  if (!code || code.length !== 2 || code === "XX") return "🌐";
  const upper = code.toUpperCase();
  const first = upper.charCodeAt(0) - 65 + 0x1f1e6;
  const second = upper.charCodeAt(1) - 65 + 0x1f1e6;
  return String.fromCodePoint(first, second);
}

// Format seconds into human readable duration e.g. "2m 14s"
export function formatDuration(seconds: number = 0): string {
  if (!seconds || seconds < 10) return "Just arrived";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) {
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }
  const h = Math.floor(m / 60);
  const remM = m % 60;
  return `${h}h ${remM}m`;
}

// Parse device, specific model, browser, and OS from User-Agent string
export function parseUserAgent(uaString: string = "") {
  const ua = uaString.toLowerCase();

  // 1. Detect Device Category & Specific Model
  let device: "Desktop" | "Mobile" | "Tablet" = "Desktop";
  let deviceModel = "Desktop PC";

  if (/ipad/i.test(ua)) {
    device = "Tablet";
    deviceModel = "iPad";
  } else if (/tablet|(android(?!.*mobile))/i.test(ua)) {
    device = "Tablet";
    deviceModel = "Android Tablet";
  } else if (/iphone/i.test(ua)) {
    device = "Mobile";
    deviceModel = "iPhone";
  } else if (/android.*mobile/i.test(ua)) {
    device = "Mobile";
    deviceModel = "Android Phone";
  } else if (/mobile|blackberry|iemobile|opera mini/i.test(ua)) {
    device = "Mobile";
    deviceModel = "Mobile Device";
  } else if (/macintosh|mac os x/i.test(ua)) {
    device = "Desktop";
    deviceModel = "Mac / MacBook";
  } else if (/windows/i.test(ua)) {
    device = "Desktop";
    deviceModel = "Windows PC";
  } else if (/linux/i.test(ua)) {
    device = "Desktop";
    deviceModel = "Linux PC";
  }

  // 2. Detect Browser
  let browser = "Web Browser";
  if (ua.includes("edg/")) browser = "Edge";
  else if (ua.includes("brave") || (ua.includes("chrome") && ua.includes("brave"))) browser = "Brave";
  else if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("opera") || ua.includes("opr/")) browser = "Opera";

  // 3. Detect Operating System
  let os = "Other";
  if (ua.includes("windows nt 10.0")) os = "Windows 10/11";
  else if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
  else if (ua.includes("mac os") || ua.includes("macintosh")) os = "macOS";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("linux")) os = "Linux";

  return { device, deviceModel, browser, os };
}

// Create an anonymous hash of IP address for privacy
export function hashIp(ip: string = "127.0.0.1"): string {
  return crypto.createHash("sha256").update(ip + "asmual-salt-2026").digest("hex").slice(0, 16);
}
