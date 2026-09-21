"use client";

import React from "react";
import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";
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

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-black text-white px-3 py-2 text-center rounded-sm font-serif font-bold leading-none shadow-sm">
            <span className="text-2xl tracking-tighter block">MM</span>
            <span className="text-[8px] uppercase tracking-widest block text-gray-400 mt-0.5">SINCE 1902</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-gray-900 tracking-wider font-serif uppercase">M.M. NOORBHOY & CO</span>
            <span className="text-[10px] text-gray-500 font-sans tracking-widest uppercase font-semibold">Architectural & Hardware Solutions</span>
          </div>
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

        {/* Right Info & Actions */}
        <div className="flex items-center gap-5 text-gray-700">

          {/* User Account */}
          <button 
            aria-label="User Account"
            className="p-1.5 hover:text-red-600 transition-colors relative" 
            title="Account"
          >
            <User className="w-5 h-5 text-gray-800" />
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 hover:text-red-600 transition-colors flex items-center gap-1 group"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-800 group-hover:text-red-600 transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
