"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { Category } from "@/data/categories";
import { Grid, Edit2, X } from "lucide-react";

export const CategoryManager: React.FC = () => {
  const { categories, updateCategory } = useAdminData();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    itemCount: 100
  });

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      title: cat.title,
      description: cat.description,
      image: cat.image,
      itemCount: cat.itemCount
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
      setEditingCategory(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Grid className="w-5 h-5 text-red-600" />
          Category Grid Manager
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Update category names, descriptions, display banners, and item counts shown on the home page grid.
        </p>
      </div>

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-lg p-6 relative">
            <button
              onClick={() => setEditingCategory(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-4 border-b pb-2">
              Edit Category: {editingCategory.title}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-700 mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Items Count</label>
                <input
                  type="number"
                  required
                  value={formData.itemCount}
                  onChange={e => setFormData({ ...formData, itemCount: parseInt(e.target.value) || 0 })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Category Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
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

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative h-32 overflow-hidden bg-gray-100">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3 text-white">
                <span className="font-serif font-bold text-sm">{cat.title}</span>
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <p className="text-xs text-gray-600 line-clamp-2">{cat.description}</p>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <span className="font-semibold text-gray-500">{cat.itemCount} Items</span>
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors flex items-center gap-1 font-bold text-[11px]"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
