"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CATEGORIES, Category } from "@/data/categories";
import { PRODUCTS, Product } from "@/data/products";
import { OFFER_PRODUCTS, OfferProductItem } from "@/components/OfferProducts";
import { POPULAR_BRANDS, BrandItem } from "@/components/PopularBrands";

export interface SlideHotspot {
  x: number;
  y: number;
  label: string;
  catId: string;
}

export interface Slide {
  id: string;
  title: string;
  highlight: string;
  subtitle: string;
  buttonText: string;
  image: string;
  hotspots: SlideHotspot[];
}

export const INITIAL_SLIDES: Slide[] = [
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

interface AdminDataContextType {
  slides: Slide[];
  offerProducts: OfferProductItem[];
  categories: Category[];
  products: Product[];
  brands: BrandItem[];
  isLoading: boolean;
  
  // Handlers for Slides
  addSlide: (slide: Omit<Slide, "id">) => Promise<void>;
  updateSlide: (id: string, updated: Partial<Slide>) => Promise<void>;
  deleteSlide: (id: string) => Promise<void>;

  // Handlers for Offer Products
  addOfferProduct: (item: Omit<OfferProductItem, "id">) => Promise<void>;
  updateOfferProduct: (id: string, updated: Partial<OfferProductItem>) => Promise<void>;
  deleteOfferProduct: (id: string) => Promise<void>;

  // Handlers for Categories
  updateCategory: (id: string, updated: Partial<Category>) => Promise<void>;

  // Handlers for Catalog Products
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, updated: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Handlers for Brands
  addBrand: (brand: Omit<BrandItem, "id">) => Promise<void>;
  updateBrand: (id: string, updated: Partial<BrandItem>) => Promise<void>;
  deleteBrand: (id: string) => Promise<void>;

  // Utilities
  resetToDefaults: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [slides, setSlides] = useState<Slide[]>(INITIAL_SLIDES);
  const [offerProducts, setOfferProducts] = useState<OfferProductItem[]>(OFFER_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [brands, setBrands] = useState<BrandItem[]>(POPULAR_BRANDS);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data from MySQL via API Routes
  useEffect(() => {
    async function loadAllData() {
      try {
        setIsLoading(true);
        const [resBanners, resOffers, resCats, resProds, resBrands] = await Promise.all([
          fetch("/api/banners").then(r => r.ok ? r.json() : null),
          fetch("/api/offers").then(r => r.ok ? r.json() : null),
          fetch("/api/categories").then(r => r.ok ? r.json() : null),
          fetch("/api/products").then(r => r.ok ? r.json() : null),
          fetch("/api/brands").then(r => r.ok ? r.json() : null)
        ]);

        if (Array.isArray(resBanners) && resBanners.length > 0) setSlides(resBanners);
        if (Array.isArray(resOffers) && resOffers.length > 0) setOfferProducts(resOffers);
        if (Array.isArray(resCats) && resCats.length > 0) setCategories(resCats);
        if (Array.isArray(resProds) && resProds.length > 0) setProducts(resProds);
        if (Array.isArray(resBrands) && resBrands.length > 0) setBrands(resBrands);
      } catch (err) {
        console.error("Failed to load data from API routes:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAllData();
  }, []);

  // --- Slide Handlers ---
  const addSlide = async (slide: Omit<Slide, "id">) => {
    const newSlide: Slide = { ...slide, id: `slide-${Date.now()}` };
    setSlides(prev => [newSlide, ...prev]);

    try {
      await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSlide)
      });
    } catch (e) {
      console.error("API call failed for addSlide:", e);
    }
  };

  const updateSlide = async (id: string, updated: Partial<Slide>) => {
    const existing = slides.find(s => s.id === id);
    if (!existing) return;
    const fullSlide = { ...existing, ...updated };
    setSlides(prev => prev.map(s => s.id === id ? fullSlide : s));

    try {
      await fetch(`/api/banners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullSlide)
      });
    } catch (e) {
      console.error("API call failed for updateSlide:", e);
    }
  };

  const deleteSlide = async (id: string) => {
    setSlides(prev => prev.filter(s => s.id !== id));
    try {
      await fetch(`/api/banners/${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("API call failed for deleteSlide:", e);
    }
  };

  // --- Offer Product Handlers ---
  const addOfferProduct = async (item: Omit<OfferProductItem, "id">) => {
    const newItem: OfferProductItem = { ...item, id: `offer-${Date.now()}` };
    setOfferProducts(prev => [newItem, ...prev]);

    try {
      await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.error("API call failed for addOfferProduct:", e);
    }
  };

  const updateOfferProduct = async (id: string, updated: Partial<OfferProductItem>) => {
    const existing = offerProducts.find(o => o.id === id);
    if (!existing) return;
    const fullItem = { ...existing, ...updated };
    setOfferProducts(prev => prev.map(o => o.id === id ? fullItem : o));

    try {
      await fetch(`/api/offers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullItem)
      });
    } catch (e) {
      console.error("API call failed for updateOfferProduct:", e);
    }
  };

  const deleteOfferProduct = async (id: string) => {
    setOfferProducts(prev => prev.filter(item => item.id !== id));
    try {
      await fetch(`/api/offers/${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("API call failed for deleteOfferProduct:", e);
    }
  };

  // --- Category Handlers ---
  const updateCategory = async (id: string, updated: Partial<Category>) => {
    const existing = categories.find(c => c.id === id);
    if (!existing) return;
    const fullCat = { ...existing, ...updated };
    setCategories(prev => prev.map(c => c.id === id ? fullCat : c));

    try {
      await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullCat)
      });
    } catch (e) {
      console.error("API call failed for updateCategory:", e);
    }
  };

  // --- Product Handlers ---
  const addProduct = async (product: Omit<Product, "id">) => {
    const newProduct: Product = { ...product, id: `prod-${Date.now()}` };
    setProducts(prev => [newProduct, ...prev]);

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });
    } catch (e) {
      console.error("API call failed for addProduct:", e);
    }
  };

  const updateProduct = async (id: string, updated: Partial<Product>) => {
    const existing = products.find(p => p.id === id);
    if (!existing) return;
    const fullProd = { ...existing, ...updated };
    setProducts(prev => prev.map(p => p.id === id ? fullProd : p));

    try {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullProd)
      });
    } catch (e) {
      console.error("API call failed for updateProduct:", e);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("API call failed for deleteProduct:", e);
    }
  };

  // --- Brand Handlers ---
  const addBrand = async (brand: Omit<BrandItem, "id">) => {
    const newBrand: BrandItem = { ...brand, id: `brand-${Date.now()}` };
    setBrands(prev => [newBrand, ...prev]);

    try {
      await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBrand)
      });
    } catch (e) {
      console.error("API call failed for addBrand:", e);
    }
  };

  const updateBrand = async (id: string, updated: Partial<BrandItem>) => {
    const existing = brands.find(b => b.id === id);
    if (!existing) return;
    const fullBrand = { ...existing, ...updated };
    setBrands(prev => prev.map(b => b.id === id ? fullBrand : b));

    try {
      await fetch(`/api/brands/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullBrand)
      });
    } catch (e) {
      console.error("API call failed for updateBrand:", e);
    }
  };

  const deleteBrand = async (id: string) => {
    setBrands(prev => prev.filter(b => b.id !== id));
    try {
      await fetch(`/api/brands/${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("API call failed for deleteBrand:", e);
    }
  };

  const resetToDefaults = async () => {
    setIsLoading(true);
    try {
      const [resBanners, resOffers, resCats, resProds, resBrands] = await Promise.all([
        fetch("/api/banners").then(r => r.json()),
        fetch("/api/offers").then(r => r.json()),
        fetch("/api/categories").then(r => r.json()),
        fetch("/api/products").then(r => r.json()),
        fetch("/api/brands").then(r => r.json())
      ]);

      setSlides(resBanners || INITIAL_SLIDES);
      setOfferProducts(resOffers || OFFER_PRODUCTS);
      setCategories(resCats || CATEGORIES);
      setProducts(resProds || PRODUCTS);
      setBrands(resBrands || POPULAR_BRANDS);
    } catch (e) {
      console.error("Failed to reset/reload defaults from DB:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
        slides,
        offerProducts,
        categories,
        products,
        brands,
        isLoading,
        addSlide,
        updateSlide,
        deleteSlide,
        addOfferProduct,
        updateOfferProduct,
        deleteOfferProduct,
        updateCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        addBrand,
        updateBrand,
        deleteBrand,
        resetToDefaults
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};
