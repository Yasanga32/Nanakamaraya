import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const [rows]: any = await pool.query("SELECT * FROM products WHERE id = ?", [id]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const row = rows[0];
    const product = {
      ...row,
      inStock: Boolean(row.inStock),
      images: typeof row.images === "string" ? JSON.parse(row.images) : (row.images || [row.image]),
      specs: typeof row.specs === "string" ? JSON.parse(row.specs) : (row.specs || {})
    };

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const body = await req.json();
    const { name, category, price, originalPrice, rating, reviewsCount, image, images, description, badge, inStock, sku, specs } = body;

    await pool.query(
      "UPDATE products SET name = ?, category = ?, price = ?, originalPrice = ?, rating = ?, reviewsCount = ?, image = ?, images = ?, description = ?, badge = ?, inStock = ?, sku = ?, specs = ? WHERE id = ?",
      [
        name,
        category,
        price,
        originalPrice || null,
        rating,
        reviewsCount,
        image,
        JSON.stringify(images || [image]),
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
