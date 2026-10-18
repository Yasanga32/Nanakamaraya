import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;

    const [rows]: any = await pool.query("SELECT * FROM social_contents WHERE id = ?", [id]);
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Original content not found" }, { status: 404 });
    }

    const original = rows[0];
    const newId = `social-${Date.now()}`;
    const newTitle = `${original.title} (Copy)`;

    await pool.query(
      `INSERT INTO social_contents 
       (id, title, format, category, status, language, tone, targetAudience, callToAction, additionalInstructions, details, headline, caption, hashtags, visualConcept, image, videoScript, storyboard)
       VALUES (?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newId,
        newTitle,
        original.format,
        original.category,
        original.language,
        original.tone,
        original.targetAudience,
        original.callToAction,
        original.additionalInstructions,
        typeof original.details === "string" ? original.details : JSON.stringify(original.details || {}),
        original.headline,
        original.caption,
        original.hashtags,
        original.visualConcept,
        original.image,
        original.videoScript,
        typeof original.storyboard === "string" ? original.storyboard : JSON.stringify(original.storyboard || [])
      ]
    );

    const duplicated = {
      ...original,
      id: newId,
      title: newTitle,
      status: "draft",
      details: typeof original.details === "string" ? JSON.parse(original.details || "{}") : (original.details || {}),
      storyboard: typeof original.storyboard === "string" ? JSON.parse(original.storyboard || "[]") : (original.storyboard || []),
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(duplicated, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/social-content/[id]/duplicate error:", error);
    return NextResponse.json({ error: error.message || "Failed to duplicate content" }, { status: 500 });
  }
}
