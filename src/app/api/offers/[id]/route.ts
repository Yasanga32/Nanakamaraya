import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const body = await req.json();
    const { name, sku, priceLkr, numericPrice, inStock, rating, badge, image, specs } = body;

    await pool.query(
      "UPDATE offer_products SET name = ?, sku = ?, priceLkr = ?, numericPrice = ?, inStock = ?, rating = ?, badge = ?, image = ?, specs = ? WHERE id = ?",
      [
        name,
        sku,
        priceLkr,
        numericPrice,
        inStock ? 1 : 0,
        rating,
        badge || null,
        image,
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

    await pool.query("DELETE FROM offer_products WHERE id = ?", [id]);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
