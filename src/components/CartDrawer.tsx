"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, subtotal } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Box */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 bg-[#2d2f36] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-serif font-bold tracking-wide">
              Your Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-400 space-y-3">
            <ShoppingBag className="w-16 h-16 text-gray-300 stroke-1" />
            <p className="text-sm font-semibold text-gray-600">Your cart is currently empty</p>
            <p className="text-xs text-gray-400">Explore our categories to add architectural hardware and fittings.</p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-2 bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-md hover:bg-red-800 transition-colors"
            >
              Browse Shop
            </button>
          </div>
        ) : (
          /* Cart Item List */
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-gray-100">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">{product.sku}</p>
                  <div className="text-xs font-extrabold text-red-700 mt-0.5">
                    ${(product.price * quantity).toFixed(2)}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1 hover:bg-gray-200 transition-colors text-gray-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-gray-800">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1 hover:bg-gray-200 transition-colors text-gray-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-gray-700">
              <span>Subtotal</span>
              <span className="text-base text-gray-900">${subtotal.toFixed(2)}</span>
            </div>

            <p className="text-[10px] text-gray-500">
              Taxes & shipping calculated at checkout. Express delivery available.
            </p>

            <button
              onClick={handleCheckout}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-md text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
