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

const SEED_BRANDS = [
  { id: "brand-1", name: "Blum®", logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=300", catId: "furniture-hardware" },
  { id: "brand-2", name: "Delta®", logo: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300", catId: "kitchen-fittings" },
  { id: "brand-3", name: "KOHLER", logo: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=300", catId: "architectural-hardware" },
  { id: "brand-4", name: "Pfister", logo: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=300", catId: "kitchen-fittings" },
  { id: "brand-5", name: "Häfele®", logo: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=300", catId: "furniture-hardware" },
  { id: "brand-6", name: "Dormakaba®", logo: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=300", catId: "smart-living" },
  { id: "brand-7", name: "Grohe®", logo: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300", catId: "kitchen-fittings" },
  { id: "brand-8", name: "Yale®", logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=300", catId: "smart-living" }
];

const SEED_BUDGET_ITEMS = [
  {
    id: "budget-1",
    brandName: "Project Source",
    name: "Dover Brushed Nickel 4-in Centerset Faucet",
    price: 18500,
    rating: 5,
    reviewsCount: 1278,
    badge: "1K+ bought last week",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    catId: "kitchen-fittings"
  },
  {
    id: "budget-2",
    brandName: "Project Source",
    name: "Tucker Stainless steel Single-handle Faucet",
    price: 24900,
    rating: 5,
    reviewsCount: 1655,
    badge: "100+ bought last week",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=600",
    catId: "kitchen-fittings"
  },
  {
    id: "budget-3",
    brandName: "Delta®",
    name: "Classic Chrome 1-handle Multi-function Shower",
    price: 32500,
    rating: 4.8,
    reviewsCount: 236,
    badge: "1K+ bought last week",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600",
    catId: "kitchen-fittings"
  },
  {
    id: "budget-4",
    brandName: "allen + roth®",
    name: "Harlow Simplefit Spot Free Stainless Faucet",
    price: 29800,
    rating: 4.9,
    reviewsCount: 480,
    badge: "500+ bought last week",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600",
    catId: "kitchen-fittings"
  },
  {
    id: "budget-5",
    brandName: "Delta®",
    name: "Foundations Chrome 1-Handle Bath Faucet",
    price: 19500,
    rating: 5,
    reviewsCount: 890,
    badge: "1K+ bought last week",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
    catId: "kitchen-fittings"
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
          images JSON,
          description TEXT,
          badge VARCHAR(100),
          isOffer TINYINT(1) DEFAULT 0,
          inStock TINYINT(1) DEFAULT 1,
          sku VARCHAR(100),
          specs JSON,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // 5. Create Brands table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS brands (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          logo TEXT NOT NULL,
          catId VARCHAR(100),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // 6. Create Budget Items table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS budget_items (
          id VARCHAR(100) PRIMARY KEY,
          brandName VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          price DOUBLE NOT NULL,
          rating DOUBLE DEFAULT 5,
          reviewsCount INT DEFAULT 1200,
          badge VARCHAR(100) DEFAULT '1K+ bought last week',
          image TEXT NOT NULL,
          catId VARCHAR(100),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // Migration: Add images & isOffer columns if missing in existing database
      try {
        await connection.query("ALTER TABLE products ADD COLUMN images JSON");
      } catch (e) {}

      try {
        await connection.query("ALTER TABLE products ADD COLUMN isOffer TINYINT(1) DEFAULT 0");
      } catch (e) {}

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

      // Seed Brands
      const [brandRows]: any = await connection.query("SELECT COUNT(*) as count FROM brands");
      if (Number(brandRows[0]?.count) === 0) {
        for (const brand of SEED_BRANDS) {
          await connection.query(
            "INSERT INTO brands (id, name, logo, catId) VALUES (?, ?, ?, ?)",
            [brand.id, brand.name, brand.logo, brand.catId || null]
          );
        }
      }

      // 7. Create Social Contents table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS social_contents (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          format VARCHAR(50) NOT NULL,
          category VARCHAR(100) NOT NULL,
          status VARCHAR(50) NOT NULL DEFAULT 'draft',
          language VARCHAR(50) NOT NULL DEFAULT 'English',
          tone VARCHAR(50) NOT NULL DEFAULT 'Professional',
          targetAudience TEXT,
          callToAction TEXT,
          additionalInstructions TEXT,
          details JSON,
          headline VARCHAR(255),
          caption TEXT,
          hashtags TEXT,
          visualConcept TEXT,
          image TEXT,
          videoScript TEXT,
          storyboard JSON,
          orderStatus VARCHAR(50) DEFAULT 'not_ordered',
          orderContactName VARCHAR(150),
          orderContactPhone VARCHAR(50),
          orderContactEmail VARCHAR(150),
          orderNotes TEXT,
          orderPackageType VARCHAR(100),
          orderDetails JSON,
          orderDispatchedAt TIMESTAMP NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // Migration: Add order tracking columns to social_contents if missing
      try {
        await connection.query("ALTER TABLE social_contents ADD COLUMN orderStatus VARCHAR(50) DEFAULT 'not_ordered'");
      } catch (e) {}
      try {
        await connection.query("ALTER TABLE social_contents ADD COLUMN orderContactName VARCHAR(150)");
      } catch (e) {}
      try {
        await connection.query("ALTER TABLE social_contents ADD COLUMN orderContactPhone VARCHAR(50)");
      } catch (e) {}
      try {
        await connection.query("ALTER TABLE social_contents ADD COLUMN orderContactEmail VARCHAR(150)");
      } catch (e) {}
      try {
        await connection.query("ALTER TABLE social_contents ADD COLUMN orderNotes TEXT");
      } catch (e) {}
      try {
        await connection.query("ALTER TABLE social_contents ADD COLUMN orderPackageType VARCHAR(100)");
      } catch (e) {}
      try {
        await connection.query("ALTER TABLE social_contents ADD COLUMN orderDetails JSON");
      } catch (e) {}
      try {
        await connection.query("ALTER TABLE social_contents ADD COLUMN orderDispatchedAt TIMESTAMP NULL");
      } catch (e) {}

      // Seed Social Contents
      const [socialRows]: any = await connection.query("SELECT COUNT(*) as count FROM social_contents");
      if (Number(socialRows[0]?.count) === 0) {
        const SEED_SOCIAL = [
          {
            id: "social-seed-1",
            title: "Carbon Crystal Wall Panels Promo",
            format: "post",
            category: "product-promotion",
            status: "completed",
            language: "English",
            tone: "Luxury",
            targetAudience: "Interior designers, architects, and luxury homeowners in Sri Lanka",
            callToAction: "Shop now at nanakamaraya.lk or visit our Colombo showroom",
            additionalInstructions: "Emphasize premium acoustic insulation and termite resistance",
            details: JSON.stringify({ productName: "Carbon Crystal Wall Panels", description: "Ultra-luxury fluted interior panels with acoustic dampening", price: "Rs. 12,500 / Panel", features: "Moisture proof, termite resistant, quick click-lock installation" }),
            headline: "Redefine Elegance with Carbon Crystal Wall Panels",
            caption: "Transform any residential or commercial interior with our signature Carbon Crystal Wall Panels. Engineered for seamless beauty, acoustic clarity, and unmatched durability.\n\n✨ 100% Termite Resistant & Waterproof\n✨ Easy Click-Lock Installation\n✨ Available in matte walnut, slate grey, and marble veins\n\nExperience luxury hardware & surfaces crafted to elevate every room.",
            hashtags: "#InteriorDesignLK #WallPanels #SriLankaInteriors #LuxuryLiving #Nanakamaraya #ArchitecturalHardware #HomeRenovationLK",
            visualConcept: "Sleek editorial shot of a modern living room featuring charcoal fluted panels under warm indirect LED lighting, with gold metallic typography accents in the lower right corner.",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
            videoScript: "",
            storyboard: JSON.stringify([])
          },
          {
            id: "social-seed-2",
            title: "Why Sri Lanka is Switching to Smart Mortise Biometric Locks",
            format: "reel",
            category: "new-arrivals",
            status: "completed",
            language: "English and Sinhala",
            tone: "Exciting",
            targetAudience: "Modern homeowners and villa owners looking for keyless security",
            callToAction: "WhatsApp us at 077 123 4567 for free installation consultation",
            additionalInstructions: "Fast-paced hooks, clear on-screen visual directions",
            details: JSON.stringify({ productName: "Smart 3D Biometric Mortise Lock", price: "Rs. 48,500", features: "0.3s fingerprint, PIN, RFID card, Mobile app log, 12-month battery life" }),
            headline: "Never Worry About Lost Keys Again 🔑❌",
            caption: "Still carrying heavy key bunches? Step into the future with our Smart 3D Biometric Mortise Lock.\n\n🔓 0.3s Fingerprint Recognition\n🔢 PIN Code & Encrypted RFID Card\n📱 Mobile App Remote Unlock & Guest Access Logs\n🔋 12-Month Battery Life with Emergency USB Jumpstart\n\nUpgrade your front door today with islandwide delivery & expert installation.",
            hashtags: "#SmartHomeLK #BiometricLocks #KeylessEntry #SriLankaSmartLiving #Nanakamaraya #HomeSecurityLK #SmartLocks",
            visualConcept: "Fast-paced 9:16 vertical reel showing sleek black biometric handle glowing blue on contact, accompanied by quick cuts and satisfying lock sound effects.",
            image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
            videoScript: "Hook: Stop losing your keys in 2026! Here is why over 500 Sri Lankan homes upgraded to this biometric smart lock this month.\n\nBody: Look at this finish. Solid zinc alloy, waterproof sensor, and it unlocks in literally 0.3 seconds. Plus, if guests arrive while you're away, generate a one-time OTP right from your phone.\n\nCTA: Tap the link in our bio or DM us 'SMART' to claim free delivery across Sri Lanka!",
            storyboard: JSON.stringify([
              { sceneNumber: 1, duration: "0-3s", visualDescription: "Person fumbling with rusty heavy key ring outside door in the dark, looking frustrated.", onScreenText: "Still using old-school keys? 🤦‍♂️", voiceover: "Stop losing your house keys in 2026!" },
              { sceneNumber: 2, duration: "3-7s", visualDescription: "Thumb gently touches the glowing scanner; smooth mechanical click sound as green LED halo lights up.", onScreenText: "0.3s Instant Fingerprint Unlock ⚡", voiceover: "Unlock in 0.3 seconds with precision 3D biometric recognition." },
              { sceneNumber: 3, duration: "7-11s", visualDescription: "Close-up of sleek digital touchscreen showing visitor passcode and mobile app unlock notification.", onScreenText: "App Control & Temporary Guest Codes 📱", voiceover: "Share temporary passcodes with cleaners or guests wherever you are." },
              { sceneNumber: 4, duration: "11-15s", visualDescription: "Wide glamour shot of modern front door with website URL & WhatsApp prompt badge overlay.", onScreenText: "Islandwide Delivery 🚚 | WhatsApp Us Today!", voiceover: "Tap the link in bio or WhatsApp us for instant islandwide delivery!" }
            ])
          },
          {
            id: "social-seed-3",
            title: "Weekend Flash Discount - Kitchen Faucets",
            format: "story",
            category: "special-offers",
            status: "draft",
            language: "English",
            tone: "Friendly",
            targetAudience: "Families renovating their kitchen or pantry",
            callToAction: "Tap the Link Sticker to claim your 20% discount coupon",
            additionalInstructions: "Flash 48h urgency",
            details: JSON.stringify({ offerTitle: "Weekend Kitchen Flash Sale", discount: "20% OFF", eligibleProducts: "All Pull-Down Kitchen Faucets", dates: "Saturday - Sunday" }),
            headline: "Weekend Kitchen Upgrade Flash Sale",
            caption: "Up to 20% OFF on all Matte Black Pull-Down Kitchen Faucets this weekend only! Use promo code KITCHEN20 at checkout.\n\nLimited stock available across Colombo & online orders.",
            hashtags: "#KitchenDesign #FlashSaleLK #HomeRenovation #HardwareDeals",
            visualConcept: "Vertical 9:16 story frame with animated '20% OFF' pulsing sticker in bold gold & red, a centered product hero shot with water spray demonstration, and a bottom Link Sticker widget.",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
            videoScript: "",
            storyboard: JSON.stringify([])
          }
        ];

        for (const item of SEED_SOCIAL) {
          await connection.query(
            `INSERT INTO social_contents (id, title, format, category, status, language, tone, targetAudience, callToAction, additionalInstructions, details, headline, caption, hashtags, visualConcept, image, videoScript, storyboard)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              item.id,
              item.title,
              item.format,
              item.category,
              item.status,
              item.language,
              item.tone,
              item.targetAudience,
              item.callToAction,
              item.additionalInstructions,
              item.details,
              item.headline,
              item.caption,
              item.hashtags,
              item.visualConcept,
              item.image,
              item.videoScript,
              item.storyboard
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
