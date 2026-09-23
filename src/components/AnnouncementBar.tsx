"use client";

import React, { useState, useEffect } from "react";
import { 
  Truck, 
  Tag, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles,
  ShieldCheck
} from "lucide-react";

export interface AnnouncementItem {
  id: string;
  badge?: string;
  text: string;
  linkText?: string;
  linkAction?: string;
  icon: React.ReactNode;
}

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-1",
    badge: "ISLANDWIDE DELIVERY",
    text: "Free delivery across Sri Lanka for qualifying orders over LKR 25,000!",
    linkText: "Shop Now",
    linkAction: "catalog-section",
    icon: <Truck className="w-3.5 h-3.5 text-red-500 shrink-0" />
  },
  {
    id: "ann-2",
    badge: "SPECIAL OFFER",
    text: "Get up to 15% OFF on Biometric Smart Locks & Architectural Hardware",
    linkText: "View Deals",
    linkAction: "catalog-section",
    icon: <Tag className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
  },
  {
    id: "ann-3",
    badge: "GENUINE QUALITY",
    text: "Authorized Distributor of Blum, Dormakaba & Franke Fittings Since 1902",
    linkText: "Explore Brands",
    linkAction: "catalog-section",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
  },
  {
    id: "ann-4",
    badge: "HOTLINE & QUOTES",
    text: "Need project bulk pricing? Call our experts at +94 75 952 0480",
    linkText: "Call Now",
    linkAction: "tel:+94759520480",
    icon: <PhoneCall className="w-3.5 h-3.5 text-red-400 shrink-0" />
  }
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[currentIndex];

  const handleLinkClick = (action?: string) => {
    if (!action) return;
    if (action.startsWith("tel:")) {
      window.location.href = action;
      return;
    }
    const section = document.getElementById(action);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <div 
      className="w-full bg-black text-white border-b border-neutral-800 text-xs py-2 px-4 select-none relative z-30 transition-all shadow-inner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Navigation Arrow Prev */}
        <button
          onClick={handlePrev}
          className="p-1 text-gray-400 hover:text-white transition-colors rounded hover:bg-neutral-800 shrink-0"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Center Announcement Content */}
        <div className="flex-1 flex items-center justify-center text-center gap-2 overflow-hidden px-2">
          <span className="hidden sm:inline-flex items-center">
            {current.icon}
          </span>

          {current.badge && (
            <span className="bg-red-600 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs shrink-0">
              {current.badge}
            </span>
          )}

          <p className="text-[11px] sm:text-xs text-gray-200 font-medium truncate">
            {current.text}
          </p>

          {current.linkText && (
            <button
              onClick={() => handleLinkClick(current.linkAction)}
              className="hidden md:inline-flex items-center gap-1 font-bold text-white underline underline-offset-4 hover:text-red-400 transition-colors text-xs shrink-0"
            >
              <span>{current.linkText}</span>
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </button>
          )}
        </div>

        {/* Navigation Arrow Next & Dismiss */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleNext}
            className="p-1 text-gray-400 hover:text-white transition-colors rounded hover:bg-neutral-800"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-gray-400 hover:text-white transition-colors rounded hover:bg-neutral-800 ml-1"
            title="Dismiss Announcement"
            aria-label="Close announcement bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
