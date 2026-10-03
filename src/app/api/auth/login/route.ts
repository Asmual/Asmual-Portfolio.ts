import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAdminToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

// Allowed admin usernames and emails (case-insensitive)
const ALLOWED_ADMIN_IDENTIFIERS = [
  "asmual@admin.com",
  "asmual",
  "asmual_obaidul_hoque",
  "asmual01@gmail.com",
  "asmualobaidulhoque@gmail.com",
];

const MASTER_PASSWORD = "Asmual@#772800";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    const inputIdentifier = (username || email || "").trim().toLowerCase();
    const inputPassword = (password || "").trim();

    if (!inputIdentifier || !inputPassword) {
      return NextResponse.json(
        { success: false, message: "Please provide both username/email and password." },
        { status: 400 }
      );
    }

    const envEmail = (process.env.ADMIN_EMAIL || "Asmual@admin.com").toLowerCase();
    const envPassword = (process.env.ADMIN_PASSWORD || MASTER_PASSWORD).trim();

    let isAuthenticated = false;

    // 1. Check direct password match against MASTER_PASSWORD or process.env.ADMIN_PASSWORD
    const isIdentifierAllowed =
      ALLOWED_ADMIN_IDENTIFIERS.includes(inputIdentifier) ||
      inputIdentifier === envEmail ||
      inputIdentifier.startsWith("asmual");

    const isDirectPasswordMatch =
      inputPassword === envPassword || inputPassword === MASTER_PASSWORD;

    if (isIdentifierAllowed && isDirectPasswordMatch) {
      isAuthenticated = true;
    }

    // 2. Also check MongoDB Atlas 'users' collection
    try {
      const db = await getDb();
      const usersCollection = db.collection("users");

      const dbUser = await usersCollection.findOne({
        $or: [
          { email: { $regex: new RegExp(`^${inputIdentifier}$`, "i") } },
          { username: { $regex: new RegExp(`^${inputIdentifier}$`, "i") } },
          { secondaryEmail: { $regex: new RegExp(`^${inputIdentifier}$`, "i") } },
        ],
      });

      if (dbUser && dbUser.passwordHash) {
        const isBcryptMatch = await bcrypt.compare(inputPassword, dbUser.passwordHash);
        if (isBcryptMatch && (dbUser.role === "admin" || isIdentifierAllowed)) {
          isAuthenticated = true;
        }
      }

      // If authenticated and user doesn't have an up-to-date entry in MongoDB, upsert it
      if (isAuthenticated) {
        const hash = await bcrypt.hash(MASTER_PASSWORD, 10);
        await usersCollection.updateOne(
          { email: "Asmual@admin.com" },
          {
            $set: {
              username: "Asmual",
              email: "Asmual@admin.com",
              name: "Asmual Obaidul Hoque",
              role: "admin",
              passwordHash: hash,
              lastLogin: new Date(),
            },
          },
          { upsert: true }
        );

        // Record audit log
        await db.collection("admin_logs").insertOne({
          action: "LOGIN_SUCCESS",
          identifier: inputIdentifier,
          timestamp: new Date(),
          ip: req.headers.get("x-forwarded-for") || "unknown",
          userAgent: req.headers.get("user-agent") || "unknown",
        });
      }
    } catch (dbErr) {
      console.warn("MongoDB auth check/log notice:", dbErr);
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid administrator credentials. Please check your username/email and password.",
        },
        { status: 401 }
      );
    }

    const adminPayload = {
      email: "Asmual@admin.com",
      name: "Asmual Obaidul Hoque",
      role: "admin" as const,
    };

    const token = signAdminToken(adminPayload);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful. Welcome, Administrator.",
      user: adminPayload,
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
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal authentication error" },
      { status: 500 }
    );
  }
}
