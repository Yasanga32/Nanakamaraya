"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { BrandItem } from "@/components/PopularBrands";
import { ImageUploader } from "./ImageUploader";
import { Plus, Edit2, Trash2, Award, X } from "lucide-react";

export const BrandManager: React.FC = () => {
  const { brands, addBrand, updateBrand, deleteBrand, categories } = useAdminData();
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Omit<BrandItem, "id">>({
    name: "",
    logo: "",
    catId: "architectural-hardware"
  });

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      logo: "",
      catId: categories[0]?.id || "architectural-hardware"
    });
    setIsCreating(true);
    setEditingBrand(null);
  };

  const handleOpenEdit = (brand: BrandItem) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      logo: brand.logo,
      catId: brand.catId || categories[0]?.id || "architectural-hardware"
    });
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addBrand(formData);
    } else if (editingBrand) {
      updateBrand(editingBrand.id, formData);
    }
    setIsCreating(false);
    setEditingBrand(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-red-600" />
            Popular Brands Manager
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage partner logos, brand labels, and target catalog category links shown on the homepage.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Brand</span>
        </button>
      </div>

      {/* Modal / Form overlay for Adding or Editing Brand */}
      {(isCreating || editingBrand) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold font-serif flex items-center gap-2">
                <Award className="w-4 h-4 text-red-500" />
                {isCreating ? "Add Popular Brand" : `Edit Brand: ${editingBrand?.name}`}
              </h3>
              <button
                onClick={() => { setIsCreating(false); setEditingBrand(null); }}
                className="text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto text-xs font-semibold">
              
              <div>
                <label className="block text-gray-700 mb-1">Brand Name / Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Blum®, KOHLER, Delta®"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Filter Target Category</label>
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
                <span className="text-[10px] text-gray-400 font-normal mt-1 block">
                  Category shown when a buyer clicks this brand logo
                </span>
              </div>

              {/* Brand Logo Upload with Cropper */}
              <ImageUploader
                value={formData.logo}
                onChange={url => setFormData({ ...formData, logo: url })}
                label="Brand Logo / Image *"
              />

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingBrand(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md font-bold cursor-pointer shadow-xs"
                >
                  Save Brand
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Brands Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col items-center justify-between text-center space-y-3 group hover:shadow-md transition-all"
          >
            {/* Round Brand Circle */}
            <div className="w-20 h-20 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center p-2 overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span className="font-serif font-black text-xs text-gray-800 uppercase line-clamp-1">
                {brand.name.replace("®", "")}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-snug">{brand.name}</h4>
              <span className="text-[10px] text-gray-400 block font-normal capitalize">
                {categories.find(c => c.id === brand.catId)?.title || brand.catId || "General"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100 w-full justify-center">
              <button
                onClick={() => handleOpenEdit(brand)}
                className="p-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 rounded transition-colors cursor-pointer"
                title="Edit Brand"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete brand "${brand.name}"?`)) {
                    deleteBrand(brand.id);
                  }
                }}
                className="p-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 rounded transition-colors cursor-pointer"
                title="Delete Brand"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
