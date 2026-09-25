"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAdminData } from "@/context/AdminDataContext";

export const HeroSlider: React.FC = () => {
  const { slides } = useAdminData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const { setSelectedCategory } = useCart();

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const slide = slides[currentSlide] || slides[0];

  const handleHotspotClick = (catId: string) => {
    setSelectedCategory(catId);
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl bg-[#18191c] border border-gray-800 flex flex-col justify-between">
        
        {/* Background Image with Dark Textured Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center opacity-60 transition-opacity duration-700"
          />
          {/* Ribbed Fluted Overlay lines effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#121316] via-[#121316]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 z-10" />
        </div>

        {/* Content & Hotspot Overlay */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-8 sm:px-14 flex items-center justify-between w-full">
          
          {/* Left Text Block */}
          <div className="max-w-xl text-white space-y-4 animate-in fade-in duration-500 font-poppins">
            <h3 className="text-sm sm:text-base font-semibold tracking-widest text-[#f59e0b] uppercase font-poppins">
              {slide.title}
            </h3>
            
            <h1 className="text-3xl sm:text-5xl font-black font-poppins tracking-tight leading-tight text-white drop-shadow-md">
              <span className="text-[#b88e00] block">{slide.highlight}</span>
              <span className="text-gray-100 text-2xl sm:text-4xl block mt-1 font-semibold">{slide.subtitle}</span>
            </h1>

            <div className="pt-3">
              <button
                onClick={() => handleHotspotClick("decorative")}
                className="bg-[#b32727] hover:bg-[#8f1e1e] text-white px-7 py-3 rounded-md text-xs font-bold font-poppins uppercase tracking-widest transition-all transform hover:scale-105 shadow-lg active:scale-95 cursor-pointer"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>

          {/* Right Interactive Hotspots on Image */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 z-30 pointer-events-none">
            {slide.hotspots.map((spot, idx) => (
              <div
                key={idx}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                onMouseEnter={() => setActiveHotspot(spot.label)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => handleHotspotClick(spot.catId)}
              >
                {/* Pulsing Target Dot */}
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-white"></span>
                  
                  {/* Connecting Line & Tag Box matching reference image */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                    <div className="w-8 h-[1px] bg-red-500/80" />
                    <div className="bg-black/80 backdrop-blur-xs text-white border border-gray-700 px-3 py-1 rounded-md text-[11px] font-poppins font-semibold tracking-wide whitespace-nowrap shadow-md group-hover:border-red-500 group-hover:bg-red-950/80 transition-all">
                      {spot.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Carousel Navigation Controls */}
        <div className="relative z-20 pb-4 flex items-center justify-center gap-3 text-white">
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            aria-label="Previous Slide"
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-300" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-white w-4" : "bg-gray-500 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            aria-label="Next Slide"
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
