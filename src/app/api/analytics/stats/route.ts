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
    const activeCutoff = new Date(now.getTime() - 75 * 1000); // 75s window

    // Parallel queries
    const [
      activeVisitorsList,
      todayUniqueList,
      weekUniqueList,
      monthUniqueList,
      totalUniqueList,
      todayPageviews,
      totalPageviews,
      recentVisitorsRaw,
      countryAgg,
      deviceAgg,
    ] = await Promise.all([
      // Currently active devices
      activeCollection.find({ lastActive: { $gte: activeCutoff } }).toArray(),
      // Unique devices (distinct visitorId) for Today, Week, Month
      logsCollection.distinct("visitorId", { timestamp: { $gte: startOfToday } }),
      logsCollection.distinct("visitorId", { timestamp: { $gte: sevenDaysAgo } }),
      logsCollection.distinct("visitorId", { timestamp: { $gte: thirtyDaysAgo } }),
      logsCollection.distinct("visitorId"),
      // Raw pageviews
      logsCollection.countDocuments({ timestamp: { $gte: startOfToday } }),
      logsCollection.countDocuments(),
      // Last 20 visitor logs
      logsCollection.find({}).sort({ timestamp: -1 }).limit(20).toArray(),
      // Top Countries by unique visitors
      logsCollection
        .aggregate([
          {
            $group: {
              _id: { country: "$country", code: "$countryCode" },
              uniqueVisitors: { $addToSet: "$visitorId" },
              pageviews: { $sum: 1 },
            },
          },
          {
            $project: {
              country: "$_id.country",
              countryCode: "$_id.code",
              count: { $size: "$uniqueVisitors" },
              pageviews: 1,
            },
          },
          { $sort: { count: -1 } },
          { $limit: 8 },
        ])
        .toArray(),
      // Devices by unique visitors
      logsCollection
        .aggregate([
          {
            $group: {
              _id: "$device",
              uniqueVisitors: { $addToSet: "$visitorId" },
            },
          },
          {
            $project: {
              device: "$_id",
              count: { $size: "$uniqueVisitors" },
            },
          },
          { $sort: { count: -1 } },
        ])
        .toArray(),
    ]);

    // Format active devices list with real-time live duration
    const formattedActive = activeVisitorsList.map((v: any) => {
      const firstSeen = v.firstSeen ? new Date(v.firstSeen) : new Date(v.lastActive || now);
      const durationSeconds = Math.max(0, Math.round((now.getTime() - firstSeen.getTime()) / 1000));

      return {
        visitorId: v.visitorId,
        deviceModel: v.deviceModel || v.device || "Unknown Device",
        device: v.device || "Desktop",
        browser: v.browser || "Browser",
        os: v.os || "",
        country: v.country || "Unknown",
        countryCode: v.countryCode || "XX",
        city: v.city || "",
        path: v.path || "/",
        durationSeconds,
      };
    });

    const formattedCountries = countryAgg.map((item: any) => ({
      country: item.country || "Unknown",
      countryCode: item.countryCode || "XX",
      count: item.count,
    }));

    const formattedDevices: Record<string, number> = {
      Desktop: 0,
      Mobile: 0,
      Tablet: 0,
    };
    deviceAgg.forEach((item: any) => {
      if (item.device && formattedDevices[item.device] !== undefined) {
        formattedDevices[item.device] = item.count;
      }
    });

    const recentVisitors = recentVisitorsRaw.map((v: any) => {
      const { _id, ...rest } = v;
      return rest;
    });

    return NextResponse.json({
      success: true,
      data: {
        liveCount: Math.max(1, formattedActive.length),
        todayUnique: todayUniqueList.length,
        weekUnique: weekUniqueList.length,
        monthUnique: monthUniqueList.length,
        totalUnique: totalUniqueList.length,
        todayPageviews,
        totalPageviews,
        activeDevices: formattedActive,
        devices: formattedDevices,
        topCountries: formattedCountries,
        recentVisitors,
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
