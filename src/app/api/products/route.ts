import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const [rows]: any = await pool.query("SELECT * FROM products ORDER BY createdAt DESC");
    const formatted = rows.map((row: any) => ({
      ...row,
      inStock: Boolean(row.inStock),
      isOffer: Boolean(row.isOffer),
      images: typeof row.images === "string" ? JSON.parse(row.images) : (row.images || [row.image]),
      specs: typeof row.specs === "string" ? JSON.parse(row.specs) : (row.specs || {})
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
    const { name, category, price, originalPrice, rating, reviewsCount, image, images, description, badge, isOffer, inStock, sku, specs } = body;
    const prodId = body.id || `prod-${Date.now()}`;

    await pool.query(
      "INSERT INTO products (id, name, category, price, originalPrice, rating, reviewsCount, image, images, description, badge, isOffer, inStock, sku, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        prodId,
        name,
        category,
        price,
        originalPrice || null,
        rating || 5,
        reviewsCount || 0,
        image,
        JSON.stringify(images || [image]),
        description || "",
        badge || null,
        isOffer ? 1 : 0,
        inStock ? 1 : 0,
        sku || "",
        JSON.stringify(specs || {})
      ]
    );

    return NextResponse.json({ id: prodId, ...body }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
