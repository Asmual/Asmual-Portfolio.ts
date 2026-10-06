import crypto from "crypto";

export interface VisitorLog {
  visitorId: string;
  sessionId: string;
  path: string;
  country: string;
  countryCode: string;
  city: string;
  device: "Desktop" | "Mobile" | "Tablet";
  browser: string;
  os: string;
  referrer: string;
  timestamp: Date;
}

export interface ActiveVisitor {
  sessionId: string;
  visitorId: string;
  lastActive: Date;
  country: string;
  city: string;
  device: string;
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

// Parse device, browser, and OS from User-Agent string without heavy dependencies
export function parseUserAgent(uaString: string = "") {
  const ua = uaString.toLowerCase();

  // 1. Detect Device
  let device: "Desktop" | "Mobile" | "Tablet" = "Desktop";
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    device = "Tablet";
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    device = "Mobile";
  }

  // 2. Detect Browser
  let browser = "Other";
  if (ua.includes("edg/")) browser = "Edge";
  else if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("opera") || ua.includes("opr/")) browser = "Opera";
  else if (ua.includes("brave")) browser = "Brave";

  // 3. Detect Operating System
  let os = "Other";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("macintosh") || ua.includes("mac os")) os = "macOS";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("linux")) os = "Linux";

  return { device, browser, os };
}

// Create an anonymous hash of IP address for privacy
export function hashIp(ip: string = "127.0.0.1"): string {
  return crypto.createHash("sha256").update(ip + "asmual-salt").digest("hex").slice(0, 16);
}
