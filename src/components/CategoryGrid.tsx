"use client";

import React from "react";
import { CATEGORIES } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useAdminData } from "@/context/AdminDataContext";

export const CategoryGrid: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useCart();
  const { categories: adminCategories } = useAdminData();

  const categoriesToRender = adminCategories && adminCategories.length > 0 ? adminCategories : CATEGORIES;

  const handleSelect = (catId: string) => {
    setSelectedCategory(catId);
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
          Shop by Category
        </h2>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">
          Explore our extensive range of architectural hardware & interior solutions
        </p>
      </div>

      {/* Round Circular Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
        {categoriesToRender.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group flex flex-col items-center cursor-pointer text-center select-none"
            >
              {/* Round Circle Image Container */}
              <div className={`relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-[#f4f4f6] border overflow-hidden transition-all duration-300 flex items-center justify-center p-1 shadow-xs group-hover:shadow-xl group-hover:-translate-y-1.5 ${
                isSelected 
                  ? "ring-4 ring-red-600 border-red-600 bg-white scale-105 shadow-md" 
                  : "border-gray-200/80 group-hover:border-red-600 group-hover:ring-4 group-hover:ring-red-100/70"
              }`}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Title & Item Count below Circle */}
              <div className="mt-3.5 flex flex-col items-center max-w-[140px]">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-2">
                  {cat.title}
                </h3>
                {cat.itemCount !== undefined && (
                  <span className="text-[10px] text-gray-400 font-semibold mt-0.5">
                    {cat.itemCount} Items
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
