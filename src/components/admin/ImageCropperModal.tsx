"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  X, 
  RotateCw, 
  ZoomIn, 
  Check, 
  Sliders, 
  Sun, 
  Contrast, 
  Move,
  Maximize2
} from "lucide-react";

interface ImageCropperModalProps {
  imageUrl: string;
  onClose: () => void;
  onSave: (croppedDataUrl: string) => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  imageUrl,
  onClose,
  onSave
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string>("");

  const imageRef = useRef<HTMLImageElement>(null);
  const previewBoxRef = useRef<HTMLDivElement>(null);

  // Load image safely as blob if external to prevent CORS tainted canvas
  useEffect(() => {
    let isMounted = true;
    let createdUrl: string | null = null;

    const prepareImage = async () => {
      if (!imageUrl) return;

      // If local upload path or data URL, use directly
      if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
        setLoadedSrc(imageUrl);
        return;
      }

      try {
        // Fetch external URL as blob to make same-origin blob URL
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        createdUrl = blobUrl;
        if (isMounted) setLoadedSrc(blobUrl);
      } catch (err) {
        console.warn("Could not fetch remote image as blob, using raw URL:", err);
        if (isMounted) setLoadedSrc(imageUrl);
      }
    };

    prepareImage();

    return () => {
      isMounted = false;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [imageUrl]);

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffsetX(0);
    setOffsetY(0);
    setBrightness(100);
    setContrast(100);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleSaveCrop = async () => {
    if (!imageRef.current) return;
    setIsProcessing(true);

    try {
      const img = imageRef.current;
      const previewBox = previewBoxRef.current;
      const previewSize = previewBox ? previewBox.clientWidth : 320;

      const outputSize = 800; // Output canvas resolution (800x800)
      const scaleFactor = outputSize / previewSize;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Could not get 2D canvas context");

      canvas.width = outputSize;
      canvas.height = outputSize;

      // Clean white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, outputSize, outputSize);

      ctx.save();

      // 1. Move to canvas center + scaled offsets
      ctx.translate(
        outputSize / 2 + offsetX * scaleFactor,
        outputSize / 2 + offsetY * scaleFactor
      );

      // 2. Rotate
      ctx.rotate((rotation * Math.PI) / 180);

      // 3. Zoom / Scale
      ctx.scale(zoom, zoom);

      // 4. Apply Brightness & Contrast filter
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      // 5. Calculate base fitted dimensions matching CSS object-contain
      const natW = img.naturalWidth || 800;
      const natH = img.naturalHeight || 800;
      const ratio = natW / natH;

      let drawW: number;
      let drawH: number;

      if (ratio >= 1) {
        drawW = outputSize;
        drawH = outputSize / ratio;
      } else {
        drawH = outputSize;
        drawW = outputSize * ratio;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      // Export canvas to JPEG Data URL
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

      // Convert Data URL to File Blob and upload to server
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `cropped_${Date.now()}.jpg`, { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error || "Failed to save cropped image to server");
      }

      // Return the new server image URL (/uploads/upload_..._cropped.jpg)
      onSave(uploadData.url);
    } catch (err: any) {
      console.error("Cropping & Upload Error:", err);
      alert("Error saving cropped image: " + (err.message || "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-900 text-white">
          <div className="flex items-center gap-2 font-serif font-bold text-sm">
            <Sliders className="w-4 h-4 text-red-500" />
            <span>Customize & Crop Image Preview</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Editor Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-gray-50">
          
          {/* Interactive Preview Canvas Box */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-red-600" />
              Product Card Preview (1:1 Square Output)
            </span>

            <div 
              ref={previewBoxRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 bg-white rounded-xl border-2 border-dashed border-red-500 overflow-hidden shadow-inner flex items-center justify-center"
            >
              {loadedSrc ? (
                <img
                  ref={imageRef}
                  src={loadedSrc}
                  alt="Original"
                  crossOrigin="anonymous"
                  style={{
                    transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg) scale(${zoom})`,
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    transition: "filter 0.1s ease"
                  }}
                  className="max-w-full max-h-full object-contain pointer-events-none select-none"
                />
              ) : (
                <div className="text-xs text-gray-400 font-semibold">Loading Image Preview...</div>
              )}
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-4 text-xs font-semibold">
            
            {/* Zoom Slider & Rotate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1 text-gray-700">
                  <span className="flex items-center gap-1">
                    <ZoomIn className="w-3.5 h-3.5 text-red-600" /> Zoom Level
                  </span>
                  <span className="font-mono">{zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 text-gray-700">
                  <span className="flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5 text-blue-600" /> Rotation
                  </span>
                  <span className="font-mono">{rotation}°</span>
                </div>
                <button
                  type="button"
                  onClick={handleRotate}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 px-3 rounded font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotate 90°</span>
                </button>
              </div>
            </div>

            {/* Position Pan Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <div>
                <div className="flex items-center justify-between mb-1 text-gray-700">
                  <span className="flex items-center gap-1">
                    <Move className="w-3.5 h-3.5 text-emerald-600" /> Pan Horizontal (X)
                  </span>
                  <span className="font-mono">{offsetX}px</span>
                </div>
                <input
                  type="range"
                  min="-120"
                  max="120"
                  step="2"
                  value={offsetX}
                  onChange={(e) => setOffsetX(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 text-gray-700">
                  <span className="flex items-center gap-1">
                    <Move className="w-3.5 h-3.5 text-emerald-600" /> Pan Vertical (Y)
                  </span>
                  <span className="font-mono">{offsetY}px</span>
                </div>
                <input
                  type="range"
                  min="-120"
                  max="120"
                  step="2"
                  value={offsetY}
                  onChange={(e) => setOffsetY(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Brightness & Contrast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <div>
                <div className="flex items-center justify-between mb-1 text-gray-700">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" /> Brightness
                  </span>
                  <span className="font-mono">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="5"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 text-gray-700">
                  <span className="flex items-center gap-1">
                    <Contrast className="w-3.5 h-3.5 text-purple-600" /> Contrast
                  </span>
                  <span className="font-mono">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="5"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-gray-500 hover:text-gray-800 text-xs font-bold underline underline-offset-2 cursor-pointer"
          >
            Reset Adjustments
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-bold hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleSaveCrop}
              className="px-5 py-2 bg-red-700 hover:bg-red-800 disabled:bg-gray-400 text-white rounded-md font-extrabold flex items-center gap-2 shadow-sm cursor-pointer"
            >
              {isProcessing ? (
                <span>Processing & Saving...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Apply & Save Image</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
