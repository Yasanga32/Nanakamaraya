import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const [rows]: any = await pool.query("SELECT * FROM categories ORDER BY title ASC");
    const formatted = rows.map((row: any) => ({
      ...row,
      featured: Boolean(row.featured)
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
    const { id, title, description, image, featured, itemCount } = body;
    const catId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    await pool.query(
      "INSERT INTO categories (id, title, description, image, featured, itemCount) VALUES (?, ?, ?, ?, ?, ?)",
      [catId, title, description, image, featured ? 1 : 0, itemCount || 0]
    );

    return NextResponse.json({ id: catId, title, description, image, featured, itemCount }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
