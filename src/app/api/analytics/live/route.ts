import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const activeCount = await db
      .collection("active_visitors")
      .countDocuments({ lastActive: { $gte: fiveMinutesAgo } });

    // Always at least 1 when someone is actively looking at the site
    const liveCount = Math.max(1, activeCount);

    return NextResponse.json({
      success: true,
      liveCount,
    });
  } catch {
    // Graceful fallback
    return NextResponse.json({
      success: true,
      liveCount: 1,
    });
  }
}
