"use client";

import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Loader2, X, Link as LinkIcon } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = "Image"
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Something went wrong uploading file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2 text-xs font-semibold">
      <div className="flex items-center justify-between">
        <label className="block text-gray-700">{label}</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
              activeTab === "upload" 
                ? "bg-red-700 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
              activeTab === "url" 
                ? "bg-red-700 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Paste URL
          </button>
        </div>
      </div>

      {activeTab === "upload" ? (
        <div className="flex flex-col gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white rounded-md flex items-center gap-2 transition-colors cursor-pointer shadow-xs shrink-0"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Image File</span>
                </>
              )}
            </button>

            {value && (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-1.5 rounded-md max-w-full overflow-hidden">
                <img
                  src={value}
                  alt="Preview"
                  className="w-8 h-8 object-cover rounded border border-gray-300 shrink-0"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <span className="text-[10px] text-gray-600 font-mono truncate max-w-[150px]">
                  {value}
                </span>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="text-gray-400 hover:text-red-600 p-1 shrink-0"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <LinkIcon className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            required
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg or /uploads/..."
            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>
      )}

      {error && (
        <p className="text-[10px] text-red-600 font-medium">{error}</p>
      )}

      {/* Image Preview Thumbnail */}
      {value && activeTab === "url" && (
        <div className="mt-2 flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-200">
          <img
            src={value}
            alt="Preview"
            className="w-10 h-10 object-cover rounded border"
          />
          <span className="text-[10px] text-gray-500 truncate">{value}</span>
        </div>
      )}
    </div>
  );
};
