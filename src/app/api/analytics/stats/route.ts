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

    // 1. Fetch currently active sessions
    const activeDocs = await activeCollection
      .find({ lastActive: { $gte: activeCutoff } })
      .toArray();

    const activeMap = new Map<string, any>();
    activeDocs.forEach((doc) => {
      activeMap.set(doc.visitorId, doc);
    });

    // 2. Fetch all visitor logs for aggregation & device timeline
    const allLogs = await logsCollection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    // Group logs by visitorId to build individual DeviceProfiles
    const deviceProfilesMap = new Map<string, any>();

    for (const log of allLogs) {
      const vid = log.visitorId;
      if (!vid) continue;

      if (!deviceProfilesMap.has(vid)) {
        const activeInfo = activeMap.get(vid);
        const isOnline = !!activeInfo;

        deviceProfilesMap.set(vid, {
          visitorId: vid,
          deviceModel: log.deviceModel || log.device || "Desktop PC",
          device: log.device || "Desktop",
          browser: log.browser || "Web Browser",
          os: log.os || "Unknown",
          country: log.country || "Bangladesh",
          countryCode: log.countryCode || "BD",
          city: log.city || "Dhaka",
          firstSeen: log.timestamp,
          lastSeen: log.timestamp,
          visitCount: 0,
          totalDurationSeconds: 0,
          currentPath: activeInfo?.path || log.path || "/",
          isOnline,
          history: [],
          viewedProjects: [],
        });
      }

      const profile = deviceProfilesMap.get(vid);
      profile.visitCount += 1;

      // Calculate total duration (sum of logged durations)
      if (typeof log.durationSeconds === "number" && log.durationSeconds > 0) {
        profile.totalDurationSeconds += log.durationSeconds;
      }

      // Track project views e.g. /projects/shopnexus
      if (typeof log.path === "string") {
        if (log.path.startsWith("/projects/") && log.path.length > 10) {
          const projName = log.path.replace("/projects/", "").split("?")[0];
          if (projName && !profile.viewedProjects.includes(projName)) {
            profile.viewedProjects.push(projName);
          }
        }

        // Add to history (keep latest 30 route visits)
        if (profile.history.length < 30) {
          profile.history.push({
            path: log.path,
            timestamp: log.timestamp,
            durationSeconds: log.durationSeconds || 0,
          });
        }
      }

      // Track oldest seen
      if (new Date(log.timestamp) < new Date(profile.firstSeen)) {
        profile.firstSeen = log.timestamp;
      }
      // Track latest seen
      if (new Date(log.timestamp) > new Date(profile.lastSeen)) {
        profile.lastSeen = log.timestamp;
      }
    }

    // Ensure all active visitors are in the profile map even if no prior log
    for (const active of activeDocs) {
      const vid = active.visitorId;
      if (!deviceProfilesMap.has(vid)) {
        deviceProfilesMap.set(vid, {
          visitorId: vid,
          deviceModel: active.deviceModel || active.device || "Desktop PC",
          device: active.device || "Desktop",
          browser: active.browser || "Web Browser",
          os: active.os || "Unknown",
          country: active.country || "Bangladesh",
          countryCode: active.countryCode || "BD",
          city: active.city || "Dhaka",
          firstSeen: active.firstSeen || active.lastActive || now,
          lastSeen: active.lastActive || now,
          visitCount: 1,
          totalDurationSeconds: 0,
          currentPath: active.path || "/",
          isOnline: true,
          history: [{ path: active.path || "/", timestamp: active.lastActive || now }],
          viewedProjects: [],
        });
      } else {
        const profile = deviceProfilesMap.get(vid);
        profile.isOnline = true;
        profile.currentPath = active.path || profile.currentPath;
        profile.lastSeen = active.lastActive || profile.lastSeen;
      }
    }

    // Convert map to array and sort: Online devices first, then latest seen
    const allDevices = Array.from(deviceProfilesMap.values()).sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime();
    });

    // 3. Time-window metrics based on distinct visitorId
    const todayUnique = await logsCollection.distinct("visitorId", {
      timestamp: { $gte: startOfToday },
    });
    const weekUnique = await logsCollection.distinct("visitorId", {
      timestamp: { $gte: sevenDaysAgo },
    });
    const monthUnique = await logsCollection.distinct("visitorId", {
      timestamp: { $gte: thirtyDaysAgo },
    });
    const totalUnique = await logsCollection.distinct("visitorId");

    const todayPageviews = await logsCollection.countDocuments({
      timestamp: { $gte: startOfToday },
    });
    const totalPageviews = await logsCollection.countDocuments();

    // 4. Device and Country distributions
    const formattedDevices: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    const countryCounts: Record<string, { country: string; countryCode: string; count: number }> = {};

    allDevices.forEach((d) => {
      if (formattedDevices[d.device] !== undefined) {
        formattedDevices[d.device] += 1;
      }
      const code = d.countryCode || "BD";
      if (!countryCounts[code]) {
        countryCounts[code] = {
          country: d.country,
          countryCode: code,
          count: 0,
        };
      }
      countryCounts[code].count += 1;
    });

    const topCountries = Object.values(countryCounts).sort((a, b) => b.count - a.count).slice(0, 8);

    return NextResponse.json({
      success: true,
      data: {
        liveCount: activeDocs.length,
        todayUnique: todayUnique.length,
        weekUnique: weekUnique.length,
        monthUnique: monthUnique.length,
        totalUnique: totalUnique.length,
        todayPageviews,
        totalPageviews,
        devices: formattedDevices,
        topCountries,
        allDevices,
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
