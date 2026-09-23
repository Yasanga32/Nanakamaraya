import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const [rows]: any = await pool.query("SELECT * FROM offer_products ORDER BY createdAt DESC");
    const formatted = rows.map((row: any) => ({
      ...row,
      inStock: Boolean(row.inStock),
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
    const { name, sku, priceLkr, numericPrice, inStock, rating, badge, image, specs } = body;
    const offerId = body.id || `offer-${Date.now()}`;

    await pool.query(
      "INSERT INTO offer_products (id, name, sku, priceLkr, numericPrice, inStock, rating, badge, image, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        offerId,
        name,
        sku,
        priceLkr,
        numericPrice,
        inStock ? 1 : 0,
        rating || 5,
        badge || null,
        image,
        JSON.stringify(specs || {})
      ]
    );

    return NextResponse.json({ id: offerId, ...body }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
