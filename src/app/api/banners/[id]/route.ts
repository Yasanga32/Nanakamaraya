import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const body = await req.json();
    const { title, highlight, subtitle, buttonText, image, hotspots } = body;

    await pool.query(
      "UPDATE banners SET title = ?, highlight = ?, subtitle = ?, buttonText = ?, image = ?, hotspots = ? WHERE id = ?",
      [title, highlight, subtitle, buttonText, image, JSON.stringify(hotspots || []), id]
    );

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;

    await pool.query("DELETE FROM banners WHERE id = ?", [id]);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
