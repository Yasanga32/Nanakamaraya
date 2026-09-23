import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const body = await req.json();
    const { name, category, price, originalPrice, rating, reviewsCount, image, description, badge, inStock, sku, specs } = body;

    await pool.query(
      "UPDATE products SET name = ?, category = ?, price = ?, originalPrice = ?, rating = ?, reviewsCount = ?, image = ?, description = ?, badge = ?, inStock = ?, sku = ?, specs = ? WHERE id = ?",
      [
        name,
        category,
        price,
        originalPrice || null,
        rating,
        reviewsCount,
        image,
        description,
        badge || null,
        inStock ? 1 : 0,
        sku,
        JSON.stringify(specs || {}),
        id
      ]
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

    await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
