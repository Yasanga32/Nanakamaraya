"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useAdminData } from "@/context/AdminDataContext";

export interface BrandItem {
  id: string;
  name: string;
  logo: string;
  catId?: string;
}

export const POPULAR_BRANDS: BrandItem[] = [
  {
    id: "blum",
    name: "Blum®",
    logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=300",
    catId: "furniture-hardware"
  },
  {
    id: "delta",
    name: "Delta®",
    logo: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300",
    catId: "kitchen-fittings"
  },
  {
    id: "kohler",
    name: "KOHLER",
    logo: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=300",
    catId: "architectural-hardware"
  },
  {
    id: "pfister",
    name: "Pfister",
    logo: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=300",
    catId: "kitchen-fittings"
  },
  {
    id: "hafele",
    name: "Häfele®",
    logo: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=300",
    catId: "furniture-hardware"
  },
  {
    id: "dormakaba",
    name: "Dormakaba®",
    logo: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=300",
    catId: "smart-living"
  },
  {
    id: "grohe",
    name: "Grohe®",
    logo: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300",
    catId: "kitchen-fittings"
  },
  {
    id: "yale",
    name: "Yale®",
    logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=300",
    catId: "smart-living"
  }
];

export const PopularBrands: React.FC = () => {
  const { setSelectedCategory } = useCart();
  const { brands: adminBrands } = useAdminData();

  const brandsToRender = adminBrands && adminBrands.length > 0 ? adminBrands : POPULAR_BRANDS;

  const handleBrandClick = (brand: BrandItem) => {
    if (brand.catId) {
      setSelectedCategory(brand.catId);
    }
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
      
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
          Popular Brands
        </h2>
      </div>

      {/* Grid of Round Brand Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 justify-items-center">
        {brandsToRender.map((brand) => (
          <div
            key={brand.id}
            onClick={() => handleBrandClick(brand)}
            className="group flex flex-col items-center cursor-pointer select-none text-center"
          >
            {/* Round White Circle with Border */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gray-300/80 bg-white flex items-center justify-center p-3 shadow-2xs group-hover:shadow-lg group-hover:border-red-600 group-hover:scale-105 group-hover:ring-4 group-hover:ring-red-50 transition-all duration-300 overflow-hidden">
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              ) : (
                <span className="font-serif font-black text-sm sm:text-base text-gray-800 tracking-tight group-hover:text-red-700 transition-colors uppercase">
                  {brand.name.replace("®", "")}
                </span>
              )}
            </div>

            {/* Brand Label Below Circle */}
            <span className="mt-3 text-xs font-bold text-gray-900 group-hover:text-red-700 transition-colors">
              {brand.name}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
};
