import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;

    const [rows]: any = await pool.query("SELECT * FROM social_contents WHERE id = ?", [id]);
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    const row = rows[0];
    const formatted = {
      ...row,
      details: typeof row.details === "string" ? JSON.parse(row.details || "{}") : (row.details || {}),
      storyboard: typeof row.storyboard === "string" ? JSON.parse(row.storyboard || "[]") : (row.storyboard || [])
    };

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error("GET /api/social-content/[id] error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const body = await req.json();

    const {
      title,
      format,
      category,
      status,
      language,
      tone,
      targetAudience,
      callToAction,
      additionalInstructions,
      details,
      headline,
      caption,
      hashtags,
      visualConcept,
      image,
      videoScript,
      storyboard
    } = body;

    await pool.query(
      `UPDATE social_contents 
       SET title = ?, format = ?, category = ?, status = ?, language = ?, tone = ?,
           targetAudience = ?, callToAction = ?, additionalInstructions = ?, details = ?,
           headline = ?, caption = ?, hashtags = ?, visualConcept = ?, image = ?,
           videoScript = ?, storyboard = ?
       WHERE id = ?`,
      [
        title,
        format,
        category,
        status || "draft",
        language || "English",
        tone || "Professional",
        targetAudience || "",
        callToAction || "",
        additionalInstructions || "",
        JSON.stringify(details || {}),
        headline || "",
        caption || "",
        hashtags || "",
        visualConcept || "",
        image || "",
        videoScript || "",
        JSON.stringify(storyboard || []),
        id
      ]
    );

    return NextResponse.json({ success: true, id, ...body });
  } catch (error: any) {
    console.error("PUT /api/social-content/[id] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update content" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;

    await pool.query("DELETE FROM social_contents WHERE id = ?", [id]);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/social-content/[id] error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete content" }, { status: 500 });
  }
}
