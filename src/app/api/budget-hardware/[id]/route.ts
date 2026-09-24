import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const [rows]: any = await pool.query("SELECT * FROM budget_items WHERE id = ?", [id]);
    if (rows.length === 0) {
      return NextResponse.json({ error: "Budget item not found" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const body = await req.json();
    const { brandName, name, price, rating, reviewsCount, badge, image, catId } = body;

    await pool.query(
      "UPDATE budget_items SET brandName = ?, name = ?, price = ?, rating = ?, reviewsCount = ?, badge = ?, image = ?, catId = ? WHERE id = ?",
      [
        brandName,
        name,
        Number(price) || 0,
        Number(rating) || 5,
        Number(reviewsCount) || 100,
        badge || null,
        image,
        catId || null,
        id
      ]
    );

    return NextResponse.json({ id, ...body });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    await pool.query("DELETE FROM budget_items WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
