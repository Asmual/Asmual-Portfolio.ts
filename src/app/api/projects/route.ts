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
      const { _id: _, ...rest } = p;
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

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required for update." },
        { status: 400 }
      );
    }

    const updateFields: any = {
      updatedAt: new Date().toISOString(),
    };

    if (updateData.title !== undefined) updateFields.title = updateData.title.trim();
    if (updateData.tagline !== undefined) updateFields.tagline = updateData.tagline.trim();
    if (updateData.category !== undefined) updateFields.category = updateData.category;
    if (updateData.description !== undefined) updateFields.description = updateData.description.trim();
    if (updateData.overview !== undefined) updateFields.overview = updateData.overview.trim();
    if (updateData.architecture !== undefined) updateFields.architecture = updateData.architecture.trim();
    if (updateData.tags !== undefined && Array.isArray(updateData.tags)) updateFields.tags = updateData.tags;
    if (updateData.images !== undefined && Array.isArray(updateData.images)) updateFields.images = updateData.images;
    if (updateData.liveUrl !== undefined) updateFields.liveUrl = updateData.liveUrl.trim();
    if (updateData.githubUrl !== undefined) updateFields.githubUrl = updateData.githubUrl.trim() || undefined;
    if (updateData.clientGithubUrl !== undefined) updateFields.clientGithubUrl = updateData.clientGithubUrl.trim() || undefined;
    if (updateData.serverGithubUrl !== undefined) updateFields.serverGithubUrl = updateData.serverGithubUrl.trim() || undefined;
    if (updateData.featured !== undefined) updateFields.featured = Boolean(updateData.featured);
    if (updateData.isTeamProject !== undefined) updateFields.isTeamProject = Boolean(updateData.isTeamProject);
    if (updateData.keyFeatures !== undefined && Array.isArray(updateData.keyFeatures)) updateFields.keyFeatures = updateData.keyFeatures;
    if (updateData.metrics !== undefined && Array.isArray(updateData.metrics)) updateFields.metrics = updateData.metrics;
    if (updateData.status !== undefined) updateFields.status = updateData.status;
    if (updateData.duration !== undefined) updateFields.duration = updateData.duration;
    if (updateData.role !== undefined) updateFields.role = updateData.role;

    const db = await getDb();
    const result = await db.collection("projects").updateOne({ id }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Project not found in database." }, { status: 404 });
    }

    const updatedDoc: any = await db.collection("projects").findOne({ id });
    const { _id: _, ...sanitized } = updatedDoc || {};

    return NextResponse.json({
      success: true,
      message: "Project updated successfully!",
      project: sanitized,
    });
  } catch (error: any) {
    console.error("Project update error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update project." },
      { status: 500 }
    );
  }
}

