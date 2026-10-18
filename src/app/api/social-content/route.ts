import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    await initDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const format = searchParams.get("format");
    const search = searchParams.get("search");

    let query = "SELECT * FROM social_contents WHERE 1=1";
    const params: any[] = [];

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }

    if (format && format !== "all") {
      query += " AND format = ?";
      params.push(format);
    }

    if (search && search.trim() !== "") {
      query += " AND (title LIKE ? OR headline LIKE ? OR category LIKE ?)";
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    query += " ORDER BY createdAt DESC";

    const [rows]: any = await pool.query(query, params);

    const formatted = rows.map((row: any) => ({
      ...row,
      details: typeof row.details === "string" ? JSON.parse(row.details || "{}") : (row.details || {}),
      storyboard: typeof row.storyboard === "string" ? JSON.parse(row.storyboard || "[]") : (row.storyboard || [])
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error("GET /api/social-content error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch social content" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDB();
    const body = await req.json();

    const id = body.id || `social-${Date.now()}`;
    const {
      title,
      format,
      category,
      status = "draft",
      language = "English",
      tone = "Professional",
      targetAudience = "",
      callToAction = "",
      additionalInstructions = "",
      details = {},
      headline = "",
      caption = "",
      hashtags = "",
      visualConcept = "",
      image = "",
      videoScript = "",
      storyboard = []
    } = body;

    if (!title || !format || !category) {
      return NextResponse.json(
        { error: "Missing required fields: title, format, and category are required." },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO social_contents 
       (id, title, format, category, status, language, tone, targetAudience, callToAction, additionalInstructions, details, headline, caption, hashtags, visualConcept, image, videoScript, storyboard)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        format,
        category,
        status,
        language,
        tone,
        targetAudience,
        callToAction,
        additionalInstructions,
        JSON.stringify(details || {}),
        headline,
        caption,
        hashtags,
        visualConcept,
        image || "",
        videoScript || "",
        JSON.stringify(storyboard || [])
      ]
    );

    const createdItem = {
      id,
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
      storyboard,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(createdItem, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/social-content error:", error);
    return NextResponse.json({ error: error.message || "Failed to save social content" }, { status: 500 });
  }
}
