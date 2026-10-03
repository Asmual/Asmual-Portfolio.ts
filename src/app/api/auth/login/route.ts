import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    const inputIdentifier = (username || email || "").trim();
    const inputPassword = (password || "").trim();

    const expectedEmail = (process.env.ADMIN_EMAIL || "Asmual@admin.com").toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || "Asmual@#772800";

    // Verify credentials
    const isIdentifierValid = inputIdentifier.toLowerCase() === expectedEmail;
    const isPasswordValid = inputPassword === expectedPassword;

    if (!isIdentifierValid || !isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid administrator credentials. Access denied." },
        { status: 401 }
      );
    }

    const adminUser = {
      email: "Asmual@admin.com",
      name: "Asmual Obaidul Hoque",
      role: "admin" as const,
    };

    // Record login activity in MongoDB
    try {
      const db = await getDb();
      await db.collection("admin_logs").insertOne({
        action: "LOGIN_SUCCESS",
        email: adminUser.email,
        timestamp: new Date(),
        ip: req.headers.get("x-forwarded-for") || "unknown",
        userAgent: req.headers.get("user-agent") || "unknown",
      });
    } catch (dbErr) {
      console.warn("Could not log admin login to MongoDB:", dbErr);
    }

    const token = signAdminToken(adminUser);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful. Welcome, Administrator.",
      user: adminUser,
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server authentication error" },
      { status: 500 }
    );
  }
}
