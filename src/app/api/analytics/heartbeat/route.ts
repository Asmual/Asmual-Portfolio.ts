import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { visitorId, path = "/" } = await req.json().catch(() => ({}));
    if (!visitorId || typeof visitorId !== "string") {
      return NextResponse.json({ success: false });
    }

    const now = new Date();
    const db = await getDb();

    await db.collection("active_visitors").updateOne(
      { visitorId },
      {
        $set: {
          lastActive: now,
          path,
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
