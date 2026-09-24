"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Star, ChevronRight, ChevronLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAdminData } from "@/context/AdminDataContext";
import { Product } from "@/data/products";

export const BudgetHardwareSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart, setSelectedCategory, setQuickViewProduct } = useCart();
  const { products: adminProducts } = useAdminData();

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Filter or select products for Budget-Friendly Faucets & Hardware
  const budgetProducts = adminProducts && adminProducts.length > 0
    ? adminProducts.slice(0, 8)
    : [];

  const handleShopAll = () => {
    setSelectedCategory("kitchen-fittings");
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
          Budget-Friendly Faucets & Hardware
        </h2>
        
        {/* Carousel Arrow Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="p-2 rounded-full border border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-900 text-gray-700 hover:text-white transition-all shadow-2xs cursor-pointer"
            aria-label="Previous Products"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="p-2 rounded-full border border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-900 text-gray-700 hover:text-white transition-all shadow-2xs cursor-pointer"
            aria-label="Next Products"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Banner + Right Product Carousel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (3 cols): Featured Banner Card matching reference image */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col">
          <div 
            onClick={handleShopAll}
            className="group relative w-full h-[380px] sm:h-[420px] rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer bg-gray-100 flex flex-col justify-between"
          >
            {/* Background Lifestyle Photo */}
            <img
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
              alt="Budget Friendly Faucets & Hardware"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Bottom White Action Bar */}
            <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-xs py-3.5 px-4 text-center border-t border-gray-200/80 group-hover:bg-white transition-colors">
              <span className="text-xs font-bold text-red-700 group-hover:underline flex items-center justify-center gap-1">
                Shop All &gt;
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (9 cols): Horizontal Product List matching reference image */}
        <div className="lg:col-span-8 xl:col-span-9 relative flex items-center">
          
          <div
            ref={scrollRef}
            className="w-full flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none py-1 px-1 scroll-smooth"
          >
            {budgetProducts.map((item, idx) => {
              const boughtTag = idx % 2 === 0 ? "1K+ bought last week" : "500+ bought last week";
              const brandName = idx % 3 === 0 ? "Project Source" : idx % 3 === 1 ? "Delta®" : "allen + roth®";

              return (
                <div
                  key={item.id}
                  className="w-48 sm:w-56 shrink-0 bg-white rounded-xl border border-gray-200/80 p-3 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Square Image Box */}
                    <div 
                      onClick={() => setQuickViewProduct(item)}
                      className="w-full aspect-square bg-[#f8f9fa] rounded-lg overflow-hidden border border-gray-100 mb-3 flex items-center justify-center p-2 cursor-pointer relative"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded"
                      />
                    </div>

                    {/* Brand & Name */}
                    <div className="space-y-1">
                      <h4 className="text-xs text-gray-800 line-clamp-2 leading-snug font-sans">
                        <strong className="font-extrabold text-gray-900">{brandName}</strong> {item.name}
                      </h4>

                      {/* Rating Stars & Count */}
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold pt-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-[11px] text-blue-600 font-semibold underline">
                          {item.reviewsCount || (1200 + idx * 85)}
                        </span>
                      </div>

                      {/* Bought Last Week Social Proof Pill */}
                      <div className="pt-2">
                        <span className="inline-block bg-[#f3f4f6] text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded-sm">
                          {boughtTag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-gray-900 font-sans">
                      LKR {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="p-1.5 bg-gray-900 hover:bg-red-700 text-white rounded-md transition-colors cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Floating Next Slide Button for Touch / Quick Navigation */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-9 h-9 rounded-full bg-white border border-gray-300 shadow-lg text-gray-800 hover:text-red-700 hover:border-red-600 flex items-center justify-center transition-all cursor-pointer z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

      </div>

    </section>
  );
};
