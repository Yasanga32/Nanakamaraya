"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAdminData } from "@/context/AdminDataContext";
import { Product } from "@/data/products";

export interface OfferProductItem {
  id: string;
  name: string;
  sku: string;
  priceLkr: string;
  numericPrice: number;
  inStock: boolean;
  rating: number;
  badge?: string;
  image: string;
  specs: Record<string, string>;
}

export const OFFER_PRODUCTS: OfferProductItem[] = [
  {
    id: "offer-1",
    name: "4 Tier Heavy Duty Carbon Steel Kitchen Rack With Wooden Top Shelf – (Black / White)",
    sku: "SSR049 Off White / SSR050 Grey",
    priceLkr: "29,850.00 LKR",
    numericPrice: 29850,
    inStock: true,
    rating: 5,
    badge: "-15%",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
    specs: {
      "Material": "Carbon Steel & Wood",
      "Layers": "4 Tier",
      "Usage": "Kitchen / Storage"
    }
  },
  {
    id: "offer-2",
    name: "4-Tier Heavy-Duty Carbon Steel Storage Rack With Rotatable Wheels For Versatile",
    sku: "SSR029",
    priceLkr: "14,950.00 LKR",
    numericPrice: 14950,
    inStock: true,
    rating: 5,
    badge: "-20%",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    specs: {
      "Material": "Carbon Steel",
      "Wheels": "360° Rotatable Lockable",
      "Tiers": "4 Tier"
    }
  },
  {
    id: "offer-3",
    name: "5 Tier Steel Rack For Shops, Kitchen, Warehouse, Showrooms L120 X D40 X",
    sku: "HSR018",
    priceLkr: "38,450.00 LKR",
    numericPrice: 38450,
    inStock: true,
    rating: 5,
    badge: "-25%",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    specs: {
      "Dimensions": "L120 x D40 x H180 cm",
      "Material": "Reinforced Alloy Steel",
      "Load Rating": "150kg / tier"
    }
  },
  {
    id: "offer-4",
    name: "5 Tier Steel Rack, Storage Shelf For Shops Kitchen, Warehouse, Showrooms – L70 X",
    sku: "HSR024",
    priceLkr: "24,650.00 LKR",
    numericPrice: 24650,
    inStock: true,
    rating: 5,
    badge: "-12%",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    specs: {
      "Dimensions": "L70 x D40 x H180 cm",
      "Material": "Powder Coated Steel",
      "Finish": "White Gloss"
    }
  },
  {
    id: "offer-5",
    name: "Heavy Duty Multi-Purpose Carbon Steel Kitchen Storage Shelf with Cabinet Door",
    sku: "SSR055",
    priceLkr: "32,500.00 LKR",
    numericPrice: 32500,
    inStock: true,
    rating: 5,
    badge: "-18%",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    specs: {
      "Material": "Carbon Steel & Acrylic Door",
      "Features": "Magnetic Door Shutters"
    }
  },
  {
    id: "offer-6",
    name: "3-Tier Folding Metal Utility Storage Cart with Lockable Caster Wheels",
    sku: "FMC012",
    priceLkr: "11,800.00 LKR",
    numericPrice: 11800,
    inStock: true,
    rating: 5,
    badge: "-30%",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    specs: {
      "Material": "Heavy Duty Steel",
      "Foldable": "Yes"
    }
  }
];

export const OfferProducts: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setQuickViewProduct } = useCart();
  const { offerProducts, products: catalogProducts } = useAdminData();

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Convert catalog products with active offers (isOffer===true) to OfferProductItem structure
  const activeCatalogOffers: OfferProductItem[] = (catalogProducts || [])
    .filter(p => p.isOffer)
    .map(p => ({
      id: p.id,
      name: p.name,
      sku: p.sku || `SKU-${p.id}`,
      priceLkr: `LKR ${p.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      numericPrice: p.price,
      inStock: p.inStock,
      rating: p.rating || 5,
      badge: p.badge || "-15%",
      image: p.image,
      specs: p.specs || {}
    }));

  const baseOffers = offerProducts && offerProducts.length > 0 ? offerProducts : OFFER_PRODUCTS;

  // Unified list: Catalog items marked as offer + dedicated offer products
  const itemsToRender = Array.from(
    new Map([...activeCatalogOffers, ...baseOffers].map(item => [item.id, item])).values()
  );

  const handleProductClick = (item: OfferProductItem) => {
    // Map OfferProductItem to standard Product context type for quick view/cart
    const mappedProduct: Product = {
      id: item.id,
      name: item.name,
      category: "furniture-hardware",
      price: item.numericPrice,
      rating: item.rating,
      reviewsCount: 48,
      image: item.image,
      description: item.name,
      badge: item.badge,
      inStock: item.inStock,
      sku: item.sku,
      specs: item.specs
    };
    setQuickViewProduct(mappedProduct);
  };

  return (
    <section id="offers-section" className="w-full bg-[#f8f9fa] py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Topic Header with Arrow Icon Controls */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-red-600 uppercase block mb-1">
              LIMITED TIME PROMOTIONS
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-serif tracking-tight flex items-center gap-2">
              OFFERS PRODUCTS
            </h2>
          </div>

          {/* Right side navigation arrow buttons to scroll horizontally */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {itemsToRender.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="w-[250px] sm:w-[275px] shrink-0 bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 p-3.5 flex flex-col justify-between cursor-pointer group block"
            >
              <div>
                {/* Product Image Area */}
                <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3 border border-gray-100 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Offer Discount Badge top-left */}
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-md tracking-wider flex items-center justify-center uppercase border border-red-700/80">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Product Title */}
                <h3 className="text-xs sm:text-[13px] font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-red-700 transition-colors h-9">
                  {item.name}
                </h3>

                {/* SKU */}
                <div className="text-[10px] text-gray-400 font-mono mt-1">
                  SKU: <span className="text-gray-500">{item.sku}</span>
                </div>

                {/* Ratings & Stock Status */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(Math.min(5, Math.max(0, Math.floor(Number(item.rating) || 5))))].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  {item.inStock && (
                    <div className="text-[10px] font-bold text-gray-800 flex items-center gap-1">
                      <Check className="w-3 h-3 text-gray-900 stroke-[3]" />
                      <span>In stock</span>
                    </div>
                  )}
                </div>

                {/* Price Line */}
                <div className="text-sm sm:text-base font-extrabold text-gray-900 mt-2.5">
                  {item.priceLkr}
                </div>
              </div>

              {/* Installments Badges Footer (Matching the reference screenshot) */}
              <div className="mt-4 pt-2.5 border-t border-gray-100 text-center">
                <span className="text-[9px] text-gray-400 font-semibold block mb-1.5 uppercase tracking-wide">
                  Pay In Installment with
                </span>
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold">
                  <span className="px-1.5 py-0.5 rounded bg-[#ebd8f5] text-[#5e177d] font-black tracking-tight">
                    koko
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#d5f4eb] text-[#0d785a] font-extrabold italic tracking-tight">
                    mintpay
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#d6e5ff] text-[#1a50b8] font-black tracking-tight">
                    PayZy
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
