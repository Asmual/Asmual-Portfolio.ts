import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const db = await getDb();
    const logsCollection = db.collection("visitor_logs");
    const activeCollection = db.collection("active_visitors");

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    // Parallel queries for fast loading
    const [
      activeCount,
      todayCount,
      weekCount,
      monthCount,
      totalCount,
      uniqueVisitors,
      recentVisitors,
      countryAgg,
      deviceAgg,
      pageAgg,
    ] = await Promise.all([
      activeCollection.countDocuments({ lastActive: { $gte: fiveMinutesAgo } }),
      logsCollection.countDocuments({ timestamp: { $gte: startOfToday } }),
      logsCollection.countDocuments({ timestamp: { $gte: sevenDaysAgo } }),
      logsCollection.countDocuments({ timestamp: { $gte: thirtyDaysAgo } }),
      logsCollection.countDocuments(),
      logsCollection.distinct("visitorId"),
      logsCollection.find({}).sort({ timestamp: -1 }).limit(15).toArray(),
      logsCollection
        .aggregate([
          { $group: { _id: { country: "$country", code: "$countryCode" }, count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 8 },
        ])
        .toArray(),
      logsCollection
        .aggregate([
          { $group: { _id: "$device", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ])
        .toArray(),
      logsCollection
        .aggregate([
          { $group: { _id: "$path", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 6 },
        ])
        .toArray(),
    ]);

    const formattedCountries = countryAgg.map((item: any) => ({
      country: item._id.country || "Unknown",
      countryCode: item._id.code || "XX",
      count: item.count,
    }));

    const formattedDevices: Record<string, number> = {
      Desktop: 0,
      Mobile: 0,
      Tablet: 0,
    };
    deviceAgg.forEach((item: any) => {
      if (item._id && formattedDevices[item._id] !== undefined) {
        formattedDevices[item._id] = item.count;
      }
    });

    const formattedPages = pageAgg.map((item: any) => ({
      path: item._id || "/",
      count: item.count,
    }));

    const sanitizedRecent = recentVisitors.map((v: any) => {
      const { _id, ...rest } = v;
      return rest;
    });

    return NextResponse.json({
      success: true,
      data: {
        liveCount: Math.max(1, activeCount),
        todayCount,
        weekCount,
        monthCount,
        totalCount,
        uniqueCount: uniqueVisitors.length,
        devices: formattedDevices,
        topCountries: formattedCountries,
        topPages: formattedPages,
        recentVisitors: sanitizedRecent,
      },
    });
  } catch (error: any) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load analytics" },
      { status: 500 }
    );
  }
}
