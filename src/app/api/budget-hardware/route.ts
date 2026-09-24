import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const [rows]: any = await pool.query("SELECT * FROM budget_items ORDER BY createdAt DESC");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDB();
    const body = await req.json();
    const { brandName, name, price, rating, reviewsCount, badge, image, catId } = body;
    const itemId = body.id || `budget-${Date.now()}`;

    await pool.query(
      "INSERT INTO budget_items (id, brandName, name, price, rating, reviewsCount, badge, image, catId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        itemId,
        brandName,
        name,
        Number(price) || 0,
        Number(rating) || 5,
        Number(reviewsCount) || 100,
        badge || null,
        image,
        catId || null
      ]
    );

    const newItem = {
      id: itemId,
      brandName,
      name,
      price: Number(price) || 0,
      rating: Number(rating) || 5,
      reviewsCount: Number(reviewsCount) || 100,
      badge: badge || null,
      image,
      catId: catId || null
    };

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
