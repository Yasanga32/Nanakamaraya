"use client";

import React from "react";
import { CATEGORIES, Category } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { ArrowRight } from "lucide-react";

export const CategoryGrid: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useCart();

  const handleSelect = (catId: string) => {
    setSelectedCategory(catId);
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-800 tracking-tight">
          Shop by Category
        </h2>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">
          Explore our extensive range of architectural hardware & interior solutions
        </p>
      </div>

      {/* Grid of 10 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`group relative h-[320px] rounded-lg overflow-hidden cursor-pointer shadow-md border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                isSelected ? "ring-2 ring-red-600 border-red-600" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Dark Gradient Overlay matching image style */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all" />

              {/* Card Text Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 text-white flex flex-col justify-end space-y-1 z-10">
                <h3 className="text-base font-bold font-serif leading-tight group-hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-red-400" />
                </h3>
                
                <p className="text-[11px] text-gray-300 font-sans leading-snug line-clamp-3 opacity-90">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-[10px] text-gray-400 font-medium border-t border-white/10 mt-1">
                  <span>{cat.itemCount} Items</span>
                  <span className="text-red-400 font-semibold group-hover:underline">Explore →</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
