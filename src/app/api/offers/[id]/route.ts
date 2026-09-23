import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDB();
    const { id } = await params;
    const [rows]: any = await pool.query("SELECT * FROM offer_products WHERE id = ?", [id]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Offer product not found" }, { status: 404 });
    }

    const item = rows[0];
    const product = {
      id: item.id,
      name: item.name,
      category: "special-offers",
      price: item.numericPrice || 0,
      rating: item.rating || 5,
      reviewsCount: 48,
      image: item.image,
      images: [item.image],
      description: item.name,
      badge: item.badge || null,
      inStock: Boolean(item.inStock),
      sku: item.sku || "",
      specs: typeof item.specs === "string" ? JSON.parse(item.specs) : (item.specs || {})
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
