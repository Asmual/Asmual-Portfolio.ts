import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { projectsData, Project } from "@/data/projects";

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection<Project>("projects");

    const count = await collection.countDocuments();
    if (count === 0) {
      // Auto-seed existing static projects so database is immediately populated
      const seedData = projectsData.map((p) => ({
        ...p,
        createdAt: new Date().toISOString(),
      }));
      await collection.insertMany(seedData as any);
      return NextResponse.json({ success: true, projects: seedData });
    }

    const projects = await collection.find({}).sort({ _id: -1 }).toArray();

    // Map _id to string if needed and strip MongoDB internal ObjectId
    const sanitized = projects.map((p: any) => {
      const { _id, ...rest } = p;
      return rest;
    });

    return NextResponse.json({ success: true, projects: sanitized });
  } catch (error: any) {
    console.warn("MongoDB fetch failed, serving fallback static projects:", error?.message);
    return NextResponse.json({ success: true, projects: projectsData });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin credentials required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      tagline,
      category,
      description,
      overview,
      architecture,
      tags,
      images,
      liveUrl,
      githubUrl,
      clientGithubUrl,
      serverGithubUrl,
      featured = false,
      isTeamProject = false,
      keyFeatures = [],
      metrics = [],
      status = "Live",
      duration,
      role,
    } = body;

    if (!title || !description || !category || !liveUrl) {
      return NextResponse.json(
        { success: false, message: "Title, category, description, and live URL are required." },
        { status: 400 }
      );
    }

    // Generate unique slug id
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const uniqueSuffix = Date.now().toString(36).slice(-4);
    const id = body.id || `${baseSlug}-${uniqueSuffix}`;

    const newProject: Project & { createdAt: string } = {
      id,
      title: title.trim(),
      tagline: tagline?.trim() || "",
      category,
      description: description.trim(),
      overview: overview?.trim() || description.trim(),
      architecture: architecture?.trim() || "",
      tags: Array.isArray(tags) ? tags : [],
      images: Array.isArray(images) && images.length > 0 ? images : ["/images/as_logo.png"],
      liveUrl: liveUrl.trim(),
      githubUrl: githubUrl?.trim() || undefined,
      clientGithubUrl: clientGithubUrl?.trim() || undefined,
      serverGithubUrl: serverGithubUrl?.trim() || undefined,
      featured: Boolean(featured),
      isTeamProject: Boolean(isTeamProject || category === "Team Projects"),
      keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
      metrics: Array.isArray(metrics) ? metrics : [],
      status: status || "Live",
      duration: duration || "Production System",
      role: role || "Full Stack Developer",
      createdAt: new Date().toISOString(),
    };

    const db = await getDb();
    const collection = db.collection("projects");
    await collection.insertOne(newProject as any);

    return NextResponse.json({
      success: true,
      message: "Project successfully added to portfolio!",
      project: newProject,
    });
  } catch (error: any) {
    console.error("Project creation error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to create project." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Project ID is required." }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("projects").deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project removed successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
  }
}
