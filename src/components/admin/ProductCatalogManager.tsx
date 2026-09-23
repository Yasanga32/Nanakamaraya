"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { Product } from "@/data/products";
import { ImageUploader } from "./ImageUploader";
import { Plus, Edit2, Trash2, Package, X } from "lucide-react";

export const ProductCatalogManager: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useAdminData();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    category: categories[0]?.id || "architectural-hardware",
    price: 0,
    originalPrice: undefined,
    rating: 5,
    reviewsCount: 10,
    image: "",
    description: "",
    badge: "",
    inStock: true,
    sku: "",
    specs: { Material: "Stainless Steel" }
  });

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      category: categories[0]?.id || "architectural-hardware",
      price: 99.00,
      originalPrice: 120.00,
      rating: 5.0,
      reviewsCount: 15,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
      description: "High quality architectural hardware solution.",
      badge: "NEW",
      inStock: true,
      sku: "PROD-" + Math.floor(100 + Math.random() * 900),
      specs: { Material: "Solid Brass" }
    });
    setIsCreating(true);
    setEditingProduct(null);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice,
      rating: prod.rating,
      reviewsCount: prod.reviewsCount,
      image: prod.image,
      description: prod.description,
      badge: prod.badge || "",
      inStock: prod.inStock,
      sku: prod.sku,
      specs: prod.specs || {}
    });
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addProduct(formData);
    } else if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    }
    setIsCreating(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-red-600" />
            Product Catalog Manager
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Add, update, or remove standard catalog items, pricing, SKUs, and categories.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Catalog Product</span>
        </button>
      </div>

      {/* Form Modal */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setIsCreating(false); setEditingProduct(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-4 border-b pb-2">
              {isCreating ? "Add Catalog Product" : `Edit Product: ${editingProduct?.name}`}
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
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={e => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Badge (Optional)</label>
                  <input
                    type="text"
                    value={formData.badge || ""}
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="Hot / Sale / Featured"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <ImageUploader
                value={formData.image}
                onChange={url => setFormData({ ...formData, image: url })}
                label="Product Image"
              />

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingProduct(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider">
                <th className="p-3">Product</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-10 h-10 object-cover rounded-md border border-gray-200 shrink-0"
                    />
                    <div>
                      <span className="font-bold text-gray-900 block leading-tight">{prod.name}</span>
                      {prod.badge && (
                        <span className="inline-block text-[9px] font-bold bg-red-100 text-red-800 px-1.5 rounded uppercase mt-0.5">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 font-mono text-gray-500">{prod.sku}</td>
                  <td className="p-3 text-gray-700 font-semibold">{prod.category}</td>
                  <td className="p-3 font-bold text-gray-900">${prod.price.toFixed(2)}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
