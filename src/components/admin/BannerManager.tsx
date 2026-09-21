"use client";

import React, { useState } from "react";
import { useAdminData, Slide } from "@/context/AdminDataContext";
import { Plus, Edit2, Trash2, Image as ImageIcon, X } from "lucide-react";

export const BannerManager: React.FC = () => {
  const { slides, addSlide, updateSlide, deleteSlide } = useAdminData();
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Omit<Slide, "id">>({
    title: "",
    highlight: "",
    subtitle: "",
    buttonText: "Shop Now",
    image: "",
    hotspots: []
  });

  const handleOpenCreate = () => {
    setFormData({
      title: "EXPLORE NEW HARDWARE",
      highlight: "PREMIUM SLIDING SYSTEMS",
      subtitle: "FOR MODERN HOMES",
      buttonText: "Shop Now",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600",
      hotspots: []
    });
    setIsCreating(true);
    setEditingSlide(null);
  };

  const handleOpenEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      highlight: slide.highlight,
      subtitle: slide.subtitle,
      buttonText: slide.buttonText,
      image: slide.image,
      hotspots: slide.hotspots || []
    });
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addSlide(formData);
    } else if (editingSlide) {
      updateSlide(editingSlide.id, formData);
    }
    setIsCreating(false);
    setEditingSlide(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-red-600" />
            Hero Banner Slider Manager
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Update hero slider banner images, text headlines, and button labels on the main home page.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide Banner</span>
        </button>
      </div>

      {/* Modal Form */}
      {(isCreating || editingSlide) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setIsCreating(false); setEditingSlide(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-4 border-b pb-2">
              {isCreating ? "Create New Hero Slide" : `Edit Slide`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-700 mb-1">Title Line (Top)</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  placeholder="EXPLORE OUR LATEST"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Highlight Red Text</label>
                <input
                  type="text"
                  required
                  value={formData.highlight}
                  onChange={e => setFormData({ ...formData, highlight: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  placeholder="FLUTED PANELS & BOARDS"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Subtitle Line</label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  placeholder="COLLECTION"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Button Action Text</label>
                <input
                  type="text"
                  required
                  value={formData.buttonText}
                  onChange={e => setFormData({ ...formData, buttonText: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                  placeholder="Shop Now"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Banner Background Image URL</label>
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
                  onClick={() => { setIsCreating(false); setEditingSlide(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md font-bold"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slides Cards List */}
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div key={slide.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                #{index + 1}
              </span>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-32 h-20 object-cover rounded-lg border border-gray-200 shrink-0"
              />
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{slide.title}</span>
                <h3 className="text-sm font-extrabold text-red-700">{slide.highlight}</h3>
                <span className="text-xs text-gray-600 font-medium">{slide.subtitle}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => handleOpenEdit(slide)}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-xs font-semibold flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => deleteSlide(slide.id)}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors text-xs font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
