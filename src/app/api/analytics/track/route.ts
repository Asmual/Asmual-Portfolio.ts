import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { parseUserAgent, hashIp, VisitorLog } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      visitorId = "anon-visitor",
      sessionId = "anon-session",
      path = "/",
      referrer = "",
    } = body;

    // Ignore automated bots, health checks, or internal API calls
    const uaString = req.headers.get("user-agent") || "";
    if (/bot|crawl|spider|slurp|facebookexternalhit|whatsapp|preview/i.test(uaString)) {
      return NextResponse.json({ success: true, ignored: true });
    }

    // Geolocation from Vercel edge headers
    const rawCountry = req.headers.get("x-vercel-ip-country") || "";
    const rawCity = req.headers.get("x-vercel-ip-city") || "";
    const countryCode = rawCountry ? rawCountry.toUpperCase() : "BD";
    const city = rawCity ? decodeURIComponent(rawCity) : "Dhaka";

    // Country name helper map
    const countryNames: Record<string, string> = {
      BD: "Bangladesh",
      US: "United States",
      GB: "United Kingdom",
      CA: "Canada",
      IN: "India",
      DE: "Germany",
      FR: "France",
      AU: "Australia",
      AE: "United Arab Emirates",
      SA: "Saudi Arabia",
      SG: "Singapore",
      NL: "Netherlands",
    };
    const country = countryNames[countryCode] || countryCode || "Unknown";

    // Device, browser, and OS parsing
    const { device, browser, os } = parseUserAgent(uaString);

    // IP hash for unique daily visitor calculations
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const effectiveVisitorId = visitorId !== "anon-visitor" ? visitorId : hashIp(clientIp);

    const now = new Date();

    const logEntry: VisitorLog = {
      visitorId: effectiveVisitorId,
      sessionId,
      path: path.slice(0, 120),
      country,
      countryCode,
      city,
      device,
      browser,
      os,
      referrer: typeof referrer === "string" ? referrer.slice(0, 200) : "",
      timestamp: now,
    };

    const db = await getDb();

    // 1. Log visitor pageview
    await db.collection("visitor_logs").insertOne(logEntry);

    // 2. Update real-time active visitor session
    await db.collection("active_visitors").updateOne(
      { sessionId },
      {
        $set: {
          sessionId,
          visitorId: effectiveVisitorId,
          lastActive: now,
          country,
          countryCode,
          city,
          device,
          path,
        },
      },
      { upsert: true }
    );

    // 3. Clean up inactive sessions older than 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    db.collection("active_visitors").deleteMany({ lastActive: { $lt: tenMinutesAgo } }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // Fail silently so visitor experience is never interrupted
    return NextResponse.json({ success: false, error: err?.message }, { status: 200 });
  }
}
