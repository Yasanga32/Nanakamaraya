import mysql from "mysql2/promise";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";

// Create MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3308,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Shanuka32",
  database: process.env.DB_NAME || "nanakamaraya_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

const SEED_SLIDES = [
  {
    id: "slide-1",
    title: "EXPLORE OUR LATEST",
    highlight: "FLUTED PANELS & BOARDS",
    subtitle: "COLLECTION",
    buttonText: "Shop Now",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600",
    hotspots: [
      { x: 62, y: 22, label: "Carbon Crystal Wall Panel", catId: "decorative" },
      { x: 58, y: 44, label: "Fluted Wall Panel", catId: "decorative" },
      { x: 56, y: 65, label: "MFC / MDF Boards", catId: "decorative" }
    ]
  },
  {
    id: "slide-2",
    title: "NEXT-GEN BIOMETRIC & SMART",
    highlight: "ARCHITECTURAL LOCKS",
    subtitle: "FOR MODERN SECURITY",
    buttonText: "Discover Locks",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1600",
    hotspots: [
      { x: 50, y: 35, label: "Fingerprint 3D Mortise Lock", catId: "smart-living" },
      { x: 72, y: 55, label: "Silent Brass Hinges", catId: "architectural-hardware" }
    ]
  },
  {
    id: "slide-3",
    title: "LUXURY KITCHEN & SANITARY",
    highlight: "FITTINGS & HARDWARE",
    subtitle: "CRAFTED FOR ELEGANCE",
    buttonText: "Explore Fittings",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1600",
    hotspots: [
      { x: 45, y: 40, label: "Matte Black Pull-down Tap", catId: "kitchen-fittings" },
      { x: 68, y: 70, label: "Soft-Close Cabinet Drawer System", catId: "furniture-hardware" }
    ]
  }
];

const SEED_OFFERS = [
  {
    id: "offer-1",
    name: "4 Tier Heavy Duty Carbon Steel Kitchen Rack With Wooden Top Shelf – (Black / White)",
    sku: "SSR049 Off White / SSR050 Grey",
    priceLkr: "29,850.00 LKR",
    numericPrice: 29850,
    inStock: true,
    rating: 5,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
    specs: { "Material": "Carbon Steel & Wood", "Layers": "4 Tier", "Usage": "Kitchen / Storage" }
  },
  {
    id: "offer-2",
    name: "4-Tier Heavy-Duty Carbon Steel Storage Rack With Rotatable Wheels For Versatile",
    sku: "SSR029",
    priceLkr: "14,950.00 LKR",
    numericPrice: 14950,
    inStock: true,
    rating: 5,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    specs: { "Material": "Carbon Steel", "Wheels": "360° Rotatable Lockable", "Tiers": "4 Tier" }
  },
  {
    id: "offer-3",
    name: "5 Tier Steel Rack For Shops, Kitchen, Warehouse, Showrooms L120 X D40 X",
    sku: "HSR018",
    priceLkr: "38,450.00 LKR",
    numericPrice: 38450,
    inStock: true,
    rating: 5,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    specs: { "Material": "Industrial Steel", "Capacity": "150kg Per Shelf", "Tiers": "5 Tier" }
  }
];

export async function initDB() {
  try {
    const connection = await pool.getConnection();
    try {
      // 1. Create Banners table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS banners (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          highlight VARCHAR(255) NOT NULL,
          subtitle VARCHAR(255) NOT NULL,
          buttonText VARCHAR(100) NOT NULL,
          image TEXT NOT NULL,
          hotspots JSON,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // 2. Create Offer Products table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS offer_products (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          sku VARCHAR(100) NOT NULL,
          priceLkr VARCHAR(100) NOT NULL,
          numericPrice DOUBLE NOT NULL,
          inStock TINYINT(1) DEFAULT 1,
          rating DOUBLE DEFAULT 5,
          badge VARCHAR(100),
          image TEXT NOT NULL,
          specs JSON,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // 3. Create Categories table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          image TEXT NOT NULL,
          featured TINYINT(1) DEFAULT 0,
          itemCount INT DEFAULT 0,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // 4. Create Products table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          price DOUBLE NOT NULL,
          originalPrice DOUBLE,
          rating DOUBLE DEFAULT 5,
          reviewsCount INT DEFAULT 0,
          image TEXT NOT NULL,
          description TEXT,
          badge VARCHAR(100),
          inStock TINYINT(1) DEFAULT 1,
          sku VARCHAR(100),
          specs JSON,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // --- Seed initial data if tables are empty ---

      // Seed Banners
      const [bannerRows]: any = await connection.query("SELECT COUNT(*) as count FROM banners");
      if (Number(bannerRows[0]?.count) === 0) {
        for (const slide of SEED_SLIDES) {
          await connection.query(
            "INSERT INTO banners (id, title, highlight, subtitle, buttonText, image, hotspots) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [slide.id, slide.title, slide.highlight, slide.subtitle, slide.buttonText, slide.image, JSON.stringify(slide.hotspots || [])]
          );
        }
      }

      // Seed Offer Products
      const [offerRows]: any = await connection.query("SELECT COUNT(*) as count FROM offer_products");
      if (Number(offerRows[0]?.count) === 0) {
        for (const item of SEED_OFFERS) {
          await connection.query(
            "INSERT INTO offer_products (id, name, sku, priceLkr, numericPrice, inStock, rating, badge, image, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              item.id,
              item.name,
              item.sku,
              item.priceLkr,
              item.numericPrice,
              item.inStock ? 1 : 0,
              item.rating,
              null,
              item.image,
              JSON.stringify(item.specs || {})
            ]
          );
        }
      }

      // Seed Categories
      const [catRows]: any = await connection.query("SELECT COUNT(*) as count FROM categories");
      if (Number(catRows[0]?.count) === 0) {
        for (const cat of CATEGORIES) {
          await connection.query(
            "INSERT INTO categories (id, title, description, image, featured, itemCount) VALUES (?, ?, ?, ?, ?, ?)",
            [cat.id, cat.title, cat.description, cat.image, cat.featured ? 1 : 0, cat.itemCount]
          );
        }
      }

      // Seed Products
      const [prodRows]: any = await connection.query("SELECT COUNT(*) as count FROM products");
      if (Number(prodRows[0]?.count) === 0) {
        for (const prod of PRODUCTS) {
          await connection.query(
            "INSERT INTO products (id, name, category, price, originalPrice, rating, reviewsCount, image, description, badge, inStock, sku, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              prod.id,
              prod.name,
              prod.category,
              prod.price,
              prod.originalPrice || null,
              prod.rating,
              prod.reviewsCount,
              prod.image,
              prod.description,
              prod.badge || null,
              prod.inStock ? 1 : 0,
              prod.sku,
              JSON.stringify(prod.specs || {})
            ]
          );
        }
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}
