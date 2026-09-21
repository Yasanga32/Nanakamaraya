"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { OfferProductItem } from "@/components/OfferProducts";
import { Plus, Edit2, Trash2, Check, X, Star, Sparkles } from "lucide-react";

export const OffersManager: React.FC = () => {
  const { offerProducts, addOfferProduct, updateOfferProduct, deleteOfferProduct } = useAdminData();
  const [editingItem, setEditingItem] = useState<OfferProductItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<OfferProductItem, "id">>({
    name: "",
    sku: "",
    priceLkr: "",
    numericPrice: 0,
    inStock: true,
    rating: 5,
    badge: "NEW",
    image: "",
    specs: { Material: "Carbon Steel" }
  });

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      sku: "SSR" + Math.floor(100 + Math.random() * 900),
      priceLkr: "25,000.00 LKR",
      numericPrice: 25000,
      inStock: true,
      rating: 5,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
      specs: { Material: "Heavy Duty Carbon Steel" }
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const handleOpenEdit = (item: OfferProductItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      sku: item.sku,
      priceLkr: item.priceLkr,
      numericPrice: item.numericPrice,
      inStock: item.inStock,
      rating: item.rating,
      badge: item.badge || "",
      image: item.image,
      specs: item.specs || {}
    });
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addOfferProduct(formData);
    } else if (editingItem) {
      updateOfferProduct(editingItem.id, formData);
    }
    setIsCreating(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-600" />
            Offers Products Manager
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage the horizontal scrolling promotion cards displayed right after the home hero banner.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Offer Product</span>
        </button>
      </div>

      {/* Modal Form for Create / Edit */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setIsCreating(false); setEditingItem(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-4 border-b pb-2">
              {isCreating ? "Create Offer Product Card" : `Edit Offer: ${editingItem?.name}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  placeholder="e.g. 4 Tier Heavy Duty Carbon Steel Kitchen Rack"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">SKU Number</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={e => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="SSR049"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Badge Tag (Optional)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="NEW / OFFER / HOT"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Price Display String</label>
                  <input
                    type="text"
                    required
                    value={formData.priceLkr}
                    onChange={e => setFormData({ ...formData, priceLkr: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="29,850.00 LKR"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Numeric Price (for Cart)</label>
                  <input
                    type="number"
                    required
                    value={formData.numericPrice}
                    onChange={e => setFormData({ ...formData, numericPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <span className="text-gray-800">In Stock</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingItem(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Offers Cards Grid Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offerProducts.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col justify-between space-y-3 relative group">
            <div className="flex gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border border-gray-100 shrink-0"
              />
              <div className="space-y-1">
                {item.badge && (
                  <span className="inline-block bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                    {item.badge}
                  </span>
                )}
                <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                  {item.name}
                </h4>
                <div className="text-[10px] text-gray-400 font-mono">SKU: {item.sku}</div>
                <div className="text-xs font-extrabold text-gray-900">{item.priceLkr}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {item.inStock ? "In Stock" : "Out of Stock"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteOfferProduct(item.id)}
                  className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
