import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const [rows]: any = await pool.query("SELECT * FROM banners ORDER BY createdAt ASC");
    const formatted = rows.map((row: any) => ({
      ...row,
      hotspots: typeof row.hotspots === "string" ? JSON.parse(row.hotspots) : (row.hotspots || [])
    }));
    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDB();
    const body = await req.json();
    const { id, title, highlight, subtitle, buttonText, image, hotspots } = body;
    const bannerId = id || `slide-${Date.now()}`;

    await pool.query(
      "INSERT INTO banners (id, title, highlight, subtitle, buttonText, image, hotspots) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [bannerId, title, highlight, subtitle, buttonText, image, JSON.stringify(hotspots || [])]
    );

    return NextResponse.json({ id: bannerId, title, highlight, subtitle, buttonText, image, hotspots }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
