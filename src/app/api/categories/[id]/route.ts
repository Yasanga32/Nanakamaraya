import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const body = await req.json();
    const { title, description, image, featured, itemCount } = body;

    await pool.query(
      "UPDATE categories SET title = ?, description = ?, image = ?, featured = ?, itemCount = ? WHERE id = ?",
      [title, description, image, featured ? 1 : 0, itemCount, id]
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

    await pool.query("DELETE FROM categories WHERE id = ?", [id]);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
