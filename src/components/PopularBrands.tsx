"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(6);

  const brandsToRender = adminBrands && adminBrands.length > 0 ? adminBrands : POPULAR_BRANDS;

  // Track responsive screen size itemsPerView (Mobile: 2, Tablet: 4, Desktop: 6)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4);
      } else {
        setItemsPerView(6);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance brand icons 1-by-1 every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused || brandsToRender.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % brandsToRender.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, brandsToRender.length]);

  const handleBrandClick = (brand: BrandItem) => {
    if (brand.catId) {
      setSelectedCategory(brand.catId);
    }
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? brandsToRender.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % brandsToRender.length);
  };

  // Duplicate brands array to ensure continuous looping slider
  const displayBrands = [...brandsToRender, ...brandsToRender];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
      
      {/* Centered Section Header */}
      <div className="mb-8 pb-3 border-b border-gray-200 text-center">
        <span className="text-[11px] font-extrabold tracking-widest text-[#E7000B] uppercase block mb-1 font-sans">
          TRUSTED PARTNERS
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900 tracking-tight">
          Popular Brands
        </h2>
      </div>

      {/* Auto-sliding Carousel Track */}
      <div
        className="relative group px-6 sm:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Arrow Navigation Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Brand"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-700 hover:text-red-700 hover:border-red-600 transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carousel Track Window */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {displayBrands.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                onClick={() => handleBrandClick(brand)}
                className="w-1/2 sm:w-1/4 lg:w-1/6 shrink-0 px-2 py-1 group/card flex flex-col items-center cursor-pointer select-none text-center"
              >
                {/* Round White Circle with Border */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gray-300/80 bg-white flex items-center justify-center p-3 shadow-2xs group-hover/card:shadow-lg group-hover/card:border-red-600 group-hover/card:scale-105 group-hover/card:ring-4 group-hover/card:ring-red-50 transition-all duration-300 overflow-hidden">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover rounded-full group-hover/card:scale-110 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  ) : (
                    <span className="font-serif font-black text-sm sm:text-base text-gray-800 tracking-tight group-hover/card:text-red-700 transition-colors uppercase">
                      {brand.name.replace("®", "")}
                    </span>
                  )}
                </div>

                {/* Brand Label Below Circle */}
                <span className="mt-3 text-xs font-bold text-gray-900 group-hover/card:text-red-700 transition-colors line-clamp-1">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Navigation Button */}
        <button
          onClick={handleNext}
          aria-label="Next Brand"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-700 hover:text-red-700 hover:border-red-600 transition-all cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
};
