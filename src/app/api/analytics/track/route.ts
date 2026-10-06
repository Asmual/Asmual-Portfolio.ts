import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { parseUserAgent, hashIp, VisitorLog } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      visitorId: rawVisitorId,
      path = "/",
      referrer = "",
      isNewVisit = false,
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

    // Device, specific model, browser, and OS parsing
    const { device, deviceModel, browser, os } = parseUserAgent(uaString);

    // Ensure valid persistent visitorId
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const visitorId = (rawVisitorId && typeof rawVisitorId === "string" && rawVisitorId.length > 3)
      ? rawVisitorId
      : hashIp(clientIp);

    const now = new Date();
    const db = await getDb();

    // 1. Check existing active session to compute duration
    const existingActive: any = await db.collection("active_visitors").findOne({ visitorId });
    const firstSeen = existingActive?.firstSeen ? new Date(existingActive.firstSeen) : now;
    const durationSeconds = Math.max(0, Math.round((now.getTime() - firstSeen.getTime()) / 1000));

    // 2. Insert visitor log
    const logEntry: VisitorLog = {
      visitorId,
      path: path.slice(0, 120),
      country,
      countryCode,
      city,
      device,
      deviceModel,
      browser,
      os,
      referrer: typeof referrer === "string" ? referrer.slice(0, 200) : "",
      timestamp: now,
      durationSeconds,
    };
    await db.collection("visitor_logs").insertOne(logEntry);

    // 3. Upsert into active_visitors uniquely by visitorId (1 Device = 1 Active Record)
    await db.collection("active_visitors").updateOne(
      { visitorId },
      {
        $set: {
          visitorId,
          lastActive: now,
          country,
          countryCode,
          city,
          device,
          deviceModel,
          browser,
          os,
          path,
        },
        $setOnInsert: {
          firstSeen: now,
          openTabs: 1,
        },
      },
      { upsert: true }
    );

    // If new visit/tab, increment tab counter
    if (isNewVisit && existingActive) {
      await db.collection("active_visitors").updateOne(
        { visitorId },
        { $inc: { openTabs: 1 } }
      );
    }

    // 4. Auto-clean expired sessions (older than 75 seconds without heartbeat)
    const cutoff = new Date(Date.now() - 75 * 1000);
    db.collection("active_visitors").deleteMany({ lastActive: { $lt: cutoff } }).catch(() => {});

    return NextResponse.json({ success: true, visitorId });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 200 });
  }
}
