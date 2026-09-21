export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  badge?: string;
  inStock: boolean;
  sku: string;
  specs: Record<string, string>;
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Carbon Crystal Wall Panel - Matte Dark Oak",
    category: "decorative",
    price: 45.00,
    originalPrice: 59.00,
    rating: 4.9,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    description: "High-density carbon crystal fluted wall panel. Waterproof, flame-retardant, and acoustic sound dampening finish.",
    badge: "Hot Deal",
    inStock: true,
    sku: "DP-CC-801",
    specs: {
      "Material": "Carbon Crystal Composite",
      "Dimensions": "2900mm x 160mm x 18mm",
      "Finish": "Textured Wood Grain",
      "Features": "Waterproof, Anti-scratch"
    }
  },
  {
    id: "prod-2",
    name: "Acoustic Fluted Wall Panel System",
    category: "decorative",
    price: 38.50,
    rating: 4.8,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    description: "Architectural acoustic wood slat panels for modern accent walls and feature TV backdrops.",
    badge: "Best Seller",
    inStock: true,
    sku: "DP-FWP-202",
    specs: {
      "Material": "Natural Oak Veneer on Felt",
      "Dimensions": "2400mm x 600mm x 21mm",
      "Sound Absorption": "Class A (NRC 0.85)"
    }
  },
  {
    id: "prod-3",
    name: "Biometric Smart Digital Door Lock - Obsidian Black",
    category: "smart-living",
    price: 249.99,
    originalPrice: 299.99,
    rating: 5.0,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    description: "Multi-entry keyless smart lock with fingerprint 3D scanner, passcode touchpad, RFID card & mobile app remote unlock.",
    badge: "Featured",
    inStock: true,
    sku: "SL-BIO-900",
    specs: {
      "Unlock Methods": "Fingerprint, Passcode, Card, Key, App",
      "Battery": "4x AA Lithium (12 months life)",
      "Material": "Zinc Alloy Reinforced Frame"
    }
  },
  {
    id: "prod-4",
    name: "Brushed Brass Architectural Mortise Handle Set",
    category: "architectural-hardware",
    price: 89.00,
    rating: 4.7,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    description: "Solid forged brass interior door handle set with silent latch mechanism and anti-fingerprint coating.",
    inStock: true,
    sku: "AH-BM-504",
    specs: {
      "Material": "Solid Brass",
      "Center Distance": "85mm",
      "Door Thickness": "35mm - 50mm"
    }
  },
  {
    id: "prod-5",
    name: "Thermostatic Rainfall Shower System with Body Jets",
    category: "bathroom-fittings",
    price: 320.00,
    originalPrice: 380.00,
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    description: "Luxury matte black thermostatic shower set with 12-inch overhead rainfall head, handheld wand, and brass mixer valve.",
    badge: "Premium",
    inStock: true,
    sku: "BF-TH-110",
    specs: {
      "Material": "H59 Solid Brass Valve",
      "Head Size": "300mm x 300mm",
      "Warranty": "5 Years"
    }
  },
  {
    id: "prod-6",
    name: "Heavy Duty Soft-Close Cabinet Drawer Slides (Set of 6)",
    category: "furniture-hardware",
    price: 64.99,
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    description: "Undermount synchronized soft-close full extension drawer slides with 45kg dynamic load rating.",
    inStock: true,
    sku: "FH-SD-303",
    specs: {
      "Load Capacity": "45 kg / pair",
      "Slide Length": "500mm (20 inch)",
      "Mechanism": "Hydraulic Soft Close"
    }
  },
  {
    id: "prod-7",
    name: "Matte Black Pull-Down Kitchen Faucet with Dual Spray",
    category: "kitchen-fittings",
    price: 135.00,
    rating: 4.9,
    reviewsCount: 167,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
    description: "360-degree swivel spring kitchen sink tap with magnetic docking nozzle and ceramic disc cartridge.",
    badge: "Sale",
    inStock: true,
    sku: "KF-TAP-401",
    specs: {
      "Valve Type": "Ceramic Disc Valve",
      "Water Flow": "1.8 GPM",
      "Height": "430mm"
    }
  },
  {
    id: "prod-8",
    name: "Dual Gas Spring Desk Monitor Mount Arm",
    category: "office",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    description: "Ergonomic aluminum dual monitor desk mount with cable management channels, supporting 17\"-32\" screens.",
    badge: "Popular",
    inStock: true,
    sku: "OF-MM-88",
    specs: {
      "Screen Compatibility": "17 to 32 inches",
      "Weight Capacity": "9 kg per arm",
      "VESA Standard": "75x75, 100x100mm"
    }
  }
];
