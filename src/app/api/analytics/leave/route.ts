import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { visitorId, closeAll = false } = body;

    if (!visitorId || typeof visitorId !== "string") {
      return NextResponse.json({ success: false });
    }

    const db = await getDb();
    const activeDoc: any = await db.collection("active_visitors").findOne({ visitorId });

    if (activeDoc) {
      const openTabs = activeDoc.openTabs || 1;

      if (closeAll || openTabs <= 1) {
        // User closed their last tab or entire browser
        await db.collection("active_visitors").deleteOne({ visitorId });
      } else {
        // Decrement tab count for this device
        await db.collection("active_visitors").updateOne(
          { visitorId },
          { $inc: { openTabs: -1 } }
        );
      }

      // Record final duration on latest visitor log
      if (activeDoc.firstSeen) {
        const finalDuration = Math.round(
          (Date.now() - new Date(activeDoc.firstSeen).getTime()) / 1000
        );
        await db.collection("visitor_logs").updateOne(
          { visitorId },
          { $set: { durationSeconds: finalDuration } },
          { sort: { timestamp: -1 } }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message });
  }
}
