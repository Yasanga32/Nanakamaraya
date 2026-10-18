"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAdminData } from "@/context/AdminDataContext";
import { OffersManager } from "@/components/admin/OffersManager";
import { BannerManager } from "@/components/admin/BannerManager";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { ProductCatalogManager } from "@/components/admin/ProductCatalogManager";
import { BrandManager } from "@/components/admin/BrandManager";
import { BudgetHardwareManager } from "@/components/admin/BudgetHardwareManager";
import { SocialContentStudio } from "@/components/admin/SocialContentStudio";
import {
  Sparkles,
  Image as ImageIcon,
  Grid,
  Package,
  Award,
  Tag,
  Share2,
  ExternalLink,
  RotateCcw,
  CheckCircle,
  Loader2
} from "lucide-react";

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

type TabType = "offers" | "banners" | "categories" | "catalog" | "brands" | "budget" | "social";

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get active tab from URL search parameters (defaults to 'offers')
  const activeTab = (searchParams.get("tab") as TabType) || "offers";

  const { slides, offerProducts, categories, products, brands, budgetItems, resetToDefaults } = useAdminData();
  const [showResetToast, setShowResetToast] = useState(false);
  const [socialCount, setSocialCount] = useState<number | null>(null);

  React.useEffect(() => {
    fetch("/api/social-content")
      .then(r => r.ok ? r.json() : [])
      .then(items => {
        if (Array.isArray(items)) setSocialCount(items.length);
      })
      .catch(() => {});
  }, [activeTab]);

  const handleTabChange = (tab: TabType) => {
    router.push(`/admin?tab=${tab}`, { scroll: false });
  };

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
            <img 
              src="/logo.png" 
              alt="nanakamaraya.lk" 
              className="h-9 w-auto object-contain bg-white/10 p-1 rounded" 
            />
            <div className="bg-red-700 text-white font-serif font-bold text-xs px-2.5 py-1 rounded shadow-xs">
              ADMIN
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="text-xs text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
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
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
          
          <div
            onClick={() => handleTabChange("social")}
            className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
              activeTab === "social"
                ? "bg-white border-[#1877F2] shadow-md ring-2 ring-[#1877F2]/30"
                : "bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 border-blue-300 hover:border-blue-500 shadow-sm ring-1 ring-blue-400/30"
            }`}
          >
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2] flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center p-0.5 shadow-xs">
                  <FacebookIcon className="w-3.5 h-3.5" />
                </div>
                <span>Social Studio</span>
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1877F2]"></span>
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">{socialCount !== null ? socialCount : "—"}</div>
            <span className="text-[11px] text-[#1877F2] font-semibold mt-1 block">Facebook Posts & Reels</span>
          </div>

          <div
            onClick={() => handleTabChange("offers")}
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
            onClick={() => handleTabChange("banners")}
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
            onClick={() => handleTabChange("categories")}
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
            onClick={() => handleTabChange("catalog")}
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

          <div
            onClick={() => handleTabChange("brands")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "brands" ? "bg-white border-red-600 shadow-md ring-2 ring-red-600/20" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Popular Brands</span>
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-gray-900">{brands.length}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Partner brand logos</span>
          </div>

          <div
            onClick={() => handleTabChange("budget")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "budget" ? "bg-white border-red-600 shadow-md ring-2 ring-red-600/20" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Budget Hardware</span>
              <Tag className="w-5 h-5 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{budgetItems.length}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Homepage budget items</span>
          </div>

        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-300 pb-3 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => handleTabChange("social")}
            className={`relative px-4 py-2.5 rounded-lg flex items-center gap-2.5 transition-all shrink-0 cursor-pointer ${
              activeTab === "social"
                ? "bg-gradient-to-r from-[#1877F2] to-blue-700 text-white shadow-md ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-100"
                : "bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 text-blue-900 border-2 border-blue-400 hover:border-blue-600 shadow-sm ring-2 ring-blue-400/40 animate-pulse hover:animate-none"
            }`}
            title="AI Social Content Studio (Facebook & Video)"
          >
            {/* Ping radar dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1877F2]"></span>
            </span>

            {/* Facebook icon */}
            <div className={`w-5 h-5 rounded-full flex items-center justify-center p-0.5 shadow-xs transition-transform ${
              activeTab === "social" ? "bg-white text-[#1877F2]" : "bg-[#1877F2] text-white"
            }`}>
              <FacebookIcon className="w-3.5 h-3.5" />
            </div>

            <span className="font-extrabold tracking-tight">Social Content Studio</span>

            {/* AI badge */}
            <span className={`px-1.5 py-0.5 text-[9px] font-black rounded-md uppercase tracking-wider shadow-xs ${
              activeTab === "social" ? "bg-blue-900 text-white" : "bg-[#1877F2] text-white"
            }`}>
              AI
            </span>
          </button>

          <button
            onClick={() => handleTabChange("offers")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "offers"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Offers Products</span>
          </button>

          <button
            onClick={() => handleTabChange("banners")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "banners"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Slider Banners</span>
          </button>

          <button
            onClick={() => handleTabChange("categories")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "categories"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Categories Grid</span>
          </button>

          <button
            onClick={() => handleTabChange("catalog")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "catalog"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog</span>
          </button>

          <button
            onClick={() => handleTabChange("brands")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "brands"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Popular Brands</span>
          </button>

          <button
            onClick={() => handleTabChange("budget")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "budget"
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Budget Hardware</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="pt-2">
          {activeTab === "social" && <SocialContentStudio />}
          {activeTab === "offers" && <OffersManager />}
          {activeTab === "banners" && <BannerManager />}
          {activeTab === "categories" && <CategoryManager />}
          {activeTab === "catalog" && <ProductCatalogManager />}
          {activeTab === "brands" && <BrandManager />}
          {activeTab === "budget" && <BudgetHardwareManager />}
        </div>

      </main>

    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin text-red-600" />
            <span>Loading Admin Panel...</span>
          </div>
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
