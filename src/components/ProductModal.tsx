"use client";

import React, { useState } from "react";
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-gray-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-20 p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="bg-gray-100 aspect-square relative">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                SKU: {quickViewProduct.sku}
              </span>

              <h2 className="text-lg font-bold font-serif text-gray-900 mt-1 leading-snug">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">{quickViewProduct.rating}</span>
                <span className="text-xs text-gray-400">({quickViewProduct.reviewsCount} reviews)</span>
              </div>

              <div className="text-2xl font-black text-red-700 mt-3">
                ${quickViewProduct.price.toFixed(2)}
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-gray-400 font-normal line-through ml-2">
                    ${quickViewProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Specs Table */}
              <div className="mt-4 bg-gray-50 p-3 rounded-md space-y-1 text-[11px]">
                {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-gray-200/60 pb-1 last:border-none">
                    <span className="font-semibold text-gray-500">{key}:</span>
                    <span className="font-bold text-gray-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1.5 text-xs font-bold hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1.5 text-xs font-bold hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-2.5 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    added ? "bg-green-700 text-white" : "bg-[#2d2f36] hover:bg-red-700 text-white"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (${(quickViewProduct.price * qty).toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-around text-[10px] text-gray-500 pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Genuine Warranty</span>
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-blue-600" /> Islandwide Delivery</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
