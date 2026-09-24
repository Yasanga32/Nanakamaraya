import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const [rows]: any = await pool.query("SELECT * FROM brands ORDER BY createdAt DESC");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDB();
    const body = await req.json();
    const { name, logo, catId } = body;
    const brandId = body.id || `brand-${Date.now()}`;

    await pool.query(
      "INSERT INTO brands (id, name, logo, catId) VALUES (?, ?, ?, ?)",
      [brandId, name, logo, catId || null]
    );

    return NextResponse.json({ id: brandId, name, logo, catId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
