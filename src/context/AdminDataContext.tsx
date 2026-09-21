"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CATEGORIES, Category } from "@/data/categories";
import { PRODUCTS, Product } from "@/data/products";
import { OFFER_PRODUCTS, OfferProductItem } from "@/components/OfferProducts";

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
  
  // Handlers for Slides
  addSlide: (slide: Omit<Slide, "id">) => void;
  updateSlide: (id: string, updated: Partial<Slide>) => void;
  deleteSlide: (id: string) => void;

  // Handlers for Offer Products
  addOfferProduct: (item: Omit<OfferProductItem, "id">) => void;
  updateOfferProduct: (id: string, updated: Partial<OfferProductItem>) => void;
  deleteOfferProduct: (id: string) => void;

  // Handlers for Categories
  updateCategory: (id: string, updated: Partial<Category>) => void;

  // Handlers for Catalog Products
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Utilities
  resetToDefaults: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "nanakamaraya_admin_data_v1";

export const AdminDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [slides, setSlides] = useState<Slide[]>(INITIAL_SLIDES);
  const [offerProducts, setOfferProducts] = useState<OfferProductItem[]>(OFFER_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.slides) setSlides(parsed.slides);
        if (parsed.offerProducts) setOfferProducts(parsed.offerProducts);
        if (parsed.categories) setCategories(parsed.categories);
        if (parsed.products) setProducts(parsed.products);
      }
    } catch (e) {
      console.error("Failed to load admin data from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const dataToSave = { slides, offerProducts, categories, products };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error("Failed to save admin data to localStorage", e);
    }
  }, [slides, offerProducts, categories, products, isLoaded]);

  // Slide Handlers
  const addSlide = (slide: Omit<Slide, "id">) => {
    const newSlide: Slide = { ...slide, id: `slide-${Date.now()}` };
    setSlides(prev => [...prev, newSlide]);
  };

  const updateSlide = (id: string, updated: Partial<Slide>) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteSlide = (id: string) => {
    setSlides(prev => prev.filter(s => s.id !== id));
  };

  // Offer Product Handlers
  const addOfferProduct = (item: Omit<OfferProductItem, "id">) => {
    const newItem: OfferProductItem = { ...item, id: `offer-${Date.now()}` };
    setOfferProducts(prev => [newItem, ...prev]);
  };

  const updateOfferProduct = (id: string, updated: Partial<OfferProductItem>) => {
    setOfferProducts(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteOfferProduct = (id: string) => {
    setOfferProducts(prev => prev.filter(item => item.id !== id));
  };

  // Category Handlers
  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  // Product Handlers
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = { ...product, id: `prod-${Date.now()}` };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const resetToDefaults = () => {
    setSlides(INITIAL_SLIDES);
    setOfferProducts(OFFER_PRODUCTS);
    setCategories(CATEGORIES);
    setProducts(PRODUCTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AdminDataContext.Provider
      value={{
        slides,
        offerProducts,
        categories,
        products,
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
