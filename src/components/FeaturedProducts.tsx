"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS, Product } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useAdminData } from "@/context/AdminDataContext";
import { Star, ShoppingBag, Eye, Check, Filter } from "lucide-react";

export const FeaturedProducts: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, addToCart, setQuickViewProduct } = useCart();
  const { products: adminProducts, categories: adminCategories } = useAdminData();
  const [activeTab, setActiveTab] = useState<"all" | "featured" | "sale">("all");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const productsToRender = adminProducts && adminProducts.length > 0 ? adminProducts : PRODUCTS;
  const categoriesList = adminCategories && adminCategories.length > 0 ? adminCategories : CATEGORIES;

  // Filter products based on selectedCategory, searchQuery, and activeTab
  const filteredProducts = productsToRender.filter((product) => {
    // Category filter
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesDesc = product.description.toLowerCase().includes(q);
      const matchesSku = product.sku.toLowerCase().includes(q);
      if (!matchesName && !matchesDesc && !matchesSku) return false;
    }
    // Tab filter
    if (activeTab === "featured" && !product.badge) return false;
    if (activeTab === "sale" && !product.originalPrice) return false;

    return true;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const selectedCategoryTitle =
    selectedCategory === "all"
      ? "All Collections"
      : categoriesList.find((c) => c.id === selectedCategory)?.title || "Filtered Products";

  return (
    <section id="catalog-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 rounded-xl my-6 border border-gray-200">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600"></span>
            <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
              {selectedCategoryTitle}
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Showing {filteredProducts.length} premium hardware & fitting items
          </p>
        </div>

        {/* Category Pills & Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              selectedCategory === "all"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            Show All ({productsToRender.length})
          </button>

          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "all" ? "bg-red-700 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveTab("featured")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "featured" ? "bg-red-700 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Popular & Featured
          </button>
          <button
            onClick={() => setActiveTab("sale")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "sale" ? "bg-red-700 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Special Offers
          </button>
        </div>
      </div>

      {/* Product Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Filter className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <h3 className="text-base font-bold text-gray-700">No products match your filter</h3>
          <p className="text-xs mt-1">Try resetting your search query or choosing another category.</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setActiveTab("all");
            }}
            className="mt-4 bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <Link href={`/products/${product.id}`} className="relative aspect-4/3 overflow-hidden bg-gray-100 block cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Tag */}
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-xs shadow-xs">
                    {product.badge}
                  </span>
                )}

                {/* Quick View Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuickViewProduct(product);
                  }}
                  className="absolute top-2.5 right-2.5 bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </Link>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span className="uppercase font-semibold tracking-wider">{product.sku}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Price & Action Button */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-base font-extrabold text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-3.5 py-2 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                      addedItem === product.id
                        ? "bg-green-700 text-white"
                        : "bg-[#2d2f36] hover:bg-red-700 text-white"
                    }`}
                  >
                    {addedItem === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
