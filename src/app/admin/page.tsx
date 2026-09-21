"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminData } from "@/context/AdminDataContext";
import { OffersManager } from "@/components/admin/OffersManager";
import { BannerManager } from "@/components/admin/BannerManager";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { ProductCatalogManager } from "@/components/admin/ProductCatalogManager";
import {
  Sparkles,
  Image as ImageIcon,
  Grid,
  Package,
  ExternalLink,
  RotateCcw,
  LayoutDashboard,
  CheckCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"offers" | "banners" | "categories" | "catalog">("offers");
  const { slides, offerProducts, categories, products, resetToDefaults } = useAdminData();
  const [showResetToast, setShowResetToast] = useState(false);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all content to original defaults?")) {
      resetToDefaults();
      setShowResetToast(true);
      setTimeout(() => setShowResetToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#1e2025] text-white sticky top-0 z-50 border-b border-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="bg-red-700 text-white font-serif font-bold text-xs px-2.5 py-1 rounded shadow-xs">
              ADMIN
            </div>
            <div>
              <h1 className="text-base font-extrabold font-serif tracking-wider uppercase">
                M.M. NOORBHOY & CO
              </h1>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider block">
                STORE CONTENT MANAGER
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="text-xs text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
              title="Restore demo content defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Reset Confirmation Toast */}
      {showResetToast && (
        <div className="bg-green-700 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>All store content has been successfully reset to default settings!</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div
            onClick={() => setActiveTab("offers")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "offers" ? "bg-white border-red-600 shadow-md ring-2 ring-red-600/20" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Offer Cards</span>
              <Sparkles className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{offerProducts.length}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Promotions under banner</span>
          </div>

          <div
            onClick={() => setActiveTab("banners")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "banners" ? "bg-white border-red-600 shadow-md ring-2 ring-red-600/20" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Hero Banners</span>
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{slides.length}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Active home slider slides</span>
          </div>

          <div
            onClick={() => setActiveTab("categories")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "categories" ? "bg-white border-red-600 shadow-md ring-2 ring-red-600/20" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Categories</span>
              <Grid className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{categories.length}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Home category grid cards</span>
          </div>

          <div
            onClick={() => setActiveTab("catalog")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "catalog" ? "bg-white border-red-600 shadow-md ring-2 ring-red-600/20" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Catalog Products</span>
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{products.length}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Full store items</span>
          </div>

        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-300 pb-3 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("offers")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 ${
              activeTab === "offers"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Offers Products</span>
          </button>

          <button
            onClick={() => setActiveTab("banners")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 ${
              activeTab === "banners"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Slider Banners</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 ${
              activeTab === "categories"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Categories Grid</span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 ${
              activeTab === "catalog"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="pt-2">
          {activeTab === "offers" && <OffersManager />}
          {activeTab === "banners" && <BannerManager />}
          {activeTab === "categories" && <CategoryManager />}
          {activeTab === "catalog" && <ProductCatalogManager />}
        </div>

      </main>

    </div>
  );
}
