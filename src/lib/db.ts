import mysql from "mysql2/promise";
import { INITIAL_SLIDES } from "@/context/AdminDataContext";
import { OFFER_PRODUCTS } from "@/components/OfferProducts";
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

// Track DB initialization
let isInitialized = false;

export async function initDB() {
  if (isInitialized) return;

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
      const [bannerRows] = await connection.query<any[]>("SELECT COUNT(*) as count FROM banners");
      if (bannerRows[0].count === 0) {
        for (const slide of INITIAL_SLIDES) {
          await connection.query(
            "INSERT INTO banners (id, title, highlight, subtitle, buttonText, image, hotspots) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [slide.id, slide.title, slide.highlight, slide.subtitle, slide.buttonText, slide.image, JSON.stringify(slide.hotspots || [])]
          );
        }
      }

      // Seed Offer Products
      const [offerRows] = await connection.query<any[]>("SELECT COUNT(*) as count FROM offer_products");
      if (offerRows[0].count === 0) {
        for (const item of OFFER_PRODUCTS) {
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
              item.badge || null,
              item.image,
              JSON.stringify(item.specs || {})
            ]
          );
        }
      }

      // Seed Categories
      const [catRows] = await connection.query<any[]>("SELECT COUNT(*) as count FROM categories");
      if (catRows[0].count === 0) {
        for (const cat of CATEGORIES) {
          await connection.query(
            "INSERT INTO categories (id, title, description, image, featured, itemCount) VALUES (?, ?, ?, ?, ?, ?)",
            [cat.id, cat.title, cat.description, cat.image, cat.featured ? 1 : 0, cat.itemCount]
          );
        }
      }

      // Seed Products
      const [prodRows] = await connection.query<any[]>("SELECT COUNT(*) as count FROM products");
      if (prodRows[0].count === 0) {
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

      isInitialized = true;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}
