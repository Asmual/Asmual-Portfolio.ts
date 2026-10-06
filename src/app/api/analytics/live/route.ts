import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    // 75-second active window (heartbeat pings every 20s)
    const cutoff = new Date(Date.now() - 75 * 1000);

    const activeList = await db
      .collection("active_visitors")
      .distinct("visitorId", { lastActive: { $gte: cutoff } });

    const liveCount = Math.max(1, activeList.length);

    return NextResponse.json({
      success: true,
      liveCount,
    });
  } catch {
    return NextResponse.json({
      success: true,
      liveCount: 1,
    });
  }
}
