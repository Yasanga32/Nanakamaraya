"use client";

import React from "react";
import { Search, UserCircle, ShoppingCart, ChevronDown, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/categories";

export const Header: React.FC = () => {
  const { totalItems, setIsCartOpen, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDealsClick = () => {
    const offersSection = document.getElementById("offers-section");
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="/logo.png" 
            alt="M.M. NOORBHOY & CO" 
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Central Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full md:max-w-xl bg-gray-50 border border-gray-300 rounded-md overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-red-600 focus-within:border-transparent transition-all">
          <div className="relative border-r border-gray-300 bg-gray-100 hidden sm:block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-transparent py-2.5 pl-3 pr-8 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none"
            >
              <option value="all">All Product Types</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-3 text-xs text-gray-800 bg-transparent focus:outline-none"
          />

          <button
            type="submit"
            className="bg-[#2d2f36] hover:bg-[#1a1b1e] text-white px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        {/* Right Action Items: Deals Button, Sign In & Cart */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Deals Red Background Button */}
          <button
            onClick={handleDealsClick}
            className="bg-[#E7000B] hover:bg-[#c60009] text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-xs hover:shadow-md cursor-pointer shrink-0"
            title="View Offers & Deals"
          >
            <Tag className="w-4 h-4 stroke-[2.5]" />
            <span>Deals</span>
          </button>

          {/* Sign In Action */}
          <button 
            aria-label="Sign In"
            className="flex flex-col items-center justify-center group cursor-pointer text-gray-900 hover:text-red-700 transition-colors"
            title="Sign In"
          >
            <UserCircle className="w-7 h-7 stroke-[1.8] group-hover:text-red-700 transition-colors" />
            <span className="text-xs font-medium text-gray-900 group-hover:text-red-700 mt-0.5 tracking-tight">
              Sign In
            </span>
          </button>

          {/* Shopping Cart Action */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center justify-center group cursor-pointer text-gray-900 hover:text-red-700 transition-colors relative"
            title="Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7 stroke-[1.8] group-hover:text-red-700 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-gray-900 group-hover:text-red-700 mt-0.5 tracking-tight">
              Cart
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
