"use client";

import React, { useState } from "react";
import { useAdminData, BudgetItem } from "@/context/AdminDataContext";
import { ImageUploader } from "./ImageUploader";
import { Plus, Edit2, Trash2, Tag, X, Star } from "lucide-react";

export const BudgetHardwareManager: React.FC = () => {
  const { budgetItems, addBudgetItem, updateBudgetItem, deleteBudgetItem, categories } = useAdminData();
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Omit<BudgetItem, "id">>({
    brandName: "Project Source",
    name: "",
    price: 15000,
    rating: 5,
    reviewsCount: 1200,
    badge: "1K+ bought last week",
    image: "",
    catId: "kitchen-fittings"
  });

  const handleOpenCreate = () => {
    setFormData({
      brandName: "Project Source",
      name: "",
      price: 15000,
      rating: 5,
      reviewsCount: 1200,
      badge: "1K+ bought last week",
      image: "",
      catId: categories[0]?.id || "kitchen-fittings"
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const handleOpenEdit = (item: BudgetItem) => {
    setEditingItem(item);
    setFormData({
      brandName: item.brandName,
      name: item.name,
      price: item.price,
      rating: item.rating || 5,
      reviewsCount: item.reviewsCount || 1200,
      badge: item.badge || "1K+ bought last week",
      image: item.image,
      catId: item.catId || categories[0]?.id || "kitchen-fittings"
    });
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addBudgetItem(formData);
    } else if (editingItem) {
      updateBudgetItem(editingItem.id, formData);
    }
    setIsCreating(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-red-600" />
            Budget-Friendly Hardware Manager
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage budget-friendly faucets and hardware items displayed in the dedicated homepage carousel section.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Budget Item</span>
        </button>
      </div>

      {/* Modal / Form overlay for Adding or Editing Budget Item */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold font-serif flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-500" />
                {isCreating ? "Add Budget Hardware Item" : `Edit Item: ${editingItem?.name}`}
              </h3>
              <button
                onClick={() => { setIsCreating(false); setEditingItem(null); }}
                className="text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto text-xs font-semibold">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.brandName}
                    onChange={e => setFormData({ ...formData, brandName: e.target.value })}
                    placeholder="e.g. Project Source, Delta®"
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Price (LKR) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="e.g. 18500"
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Item Title / Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dover Brushed Nickel 4-in Centerset Faucet"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Rating (1 - 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Reviews Count</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviewsCount}
                    onChange={e => setFormData({ ...formData, reviewsCount: Number(e.target.value) })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Social Proof Badge Tag</label>
                <input
                  type="text"
                  value={formData.badge || ""}
                  onChange={e => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. 1K+ bought last week"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Target Category</label>
                <select
                  value={formData.catId}
                  onChange={e => setFormData({ ...formData, catId: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none bg-white cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Item Image Upload with Cropper */}
              <ImageUploader
                value={formData.image}
                onChange={url => setFormData({ ...formData, image: url })}
                label="Hardware Product Image *"
              />

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingItem(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md font-bold cursor-pointer shadow-xs"
                >
                  Save Item
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Budget Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {budgetItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col justify-between space-y-3 group hover:shadow-md transition-all"
          >
            <div>
              {/* Product Image Preview Box */}
              <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100 mb-3 flex items-center justify-center p-2 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>

              {/* Brand & Title */}
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-700 block">
                {item.brandName}
              </span>
              <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2 mt-0.5">
                {item.name}
              </h4>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold mt-1.5">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{item.rating || 5}</span>
                <span className="text-gray-400">({item.reviewsCount || 0})</span>
              </div>

              {/* Badge Tag */}
              {item.badge && (
                <span className="mt-2 inline-block bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Price & Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-black text-gray-900">
                LKR {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 rounded transition-colors cursor-pointer"
                  title="Edit Item"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete item "${item.name}"?`)) {
                      deleteBudgetItem(item.id);
                    }
                  }}
                  className="p-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 rounded transition-colors cursor-pointer"
                  title="Delete Item"
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
