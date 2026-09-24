"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X, PhoneCall } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { useCart } from "@/context/CartContext";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { setSelectedCategory } = useCart();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "HOME", href: "#" },
    {
      label: "SHOP BY PRODUCTS",
      dropdown: CATEGORIES.map(cat => ({ label: cat.title, catId: cat.id }))
    },
    {
      label: "SHOP BY BRAND A TO F",
      dropdown: [
        { label: "Blum Hardware", catId: "furniture-hardware" },
        { label: "Dormakaba Smart Locks", catId: "smart-living" },
        { label: "Franke Kitchen Fittings", catId: "kitchen-fittings" }
      ]
    },
    {
      label: "ABOUT US",
      dropdown: [
        { label: "Our Heritage (Since 1902)", catId: "all" },
        { label: "Certifications & Quality", catId: "all" }
      ]
    },
    {
      label: "CONTACT US",
      dropdown: [
        { label: "Store Locations", catId: "all" },
        { label: "Customer Service Inquiry", catId: "all" }
      ]
    }
  ];

  return (
    <nav className="w-full bg-[#34373d] text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Desktop Navigation Links + Phone Button */}
        <div className="hidden xl:flex items-center space-x-1 text-xs font-bold tracking-wide py-1">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group py-2.5 px-3 transition-colors hover:bg-[#23252a] cursor-pointer flex items-center gap-1"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span className="py-1 uppercase text-gray-200 group-hover:text-white transition-colors">
                {item.label}
              </span>
              {item.dropdown && (
                <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-180" />
              )}

              {/* Dropdown Menu */}
              {item.dropdown && activeDropdown === item.label && (
                <div className="absolute left-0 top-full w-64 bg-white text-gray-800 shadow-xl border-t-2 border-red-600 rounded-b-md py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {item.dropdown.map((subItem, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleCategoryClick(subItem.catId)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-100 hover:text-red-700 transition-colors flex items-center justify-between"
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Phone Hotline Button (Red Background Next to Contact Us) */}
        <div className="hidden xl:flex items-center">
          <a
            href="tel:072211324"
            className="bg-[#c83232] hover:bg-[#a52424] text-white px-3.5 py-2 rounded-md text-xs font-bold tracking-wide flex items-center gap-2 transition-all shadow-xs"
            title="Call Hotline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="font-sans">072211324 / 0754232212</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="xl:hidden py-2.5 flex items-center justify-between w-full">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>Menu Navigation</span>
          </button>

          <a
            href="tel:072211324"
            className="bg-[#c83232] hover:bg-[#a52424] text-white px-2.5 py-1.5 rounded text-[11px] font-bold flex items-center gap-1.5"
          >
            <PhoneCall className="w-3 h-3 text-white shrink-0" />
            <span>072211324</span>
          </a>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#282a2e] border-t border-gray-700 px-4 py-3 space-y-2 text-xs font-semibold">
          {navItems.map((item, idx) => (
            <div key={idx} className="border-b border-gray-700/50 pb-2">
              <div className="py-1.5 text-gray-200 uppercase font-bold flex justify-between items-center">
                {item.label}
              </div>
              {item.dropdown && (
                <div className="pl-3 space-y-1.5 mt-1 border-l-2 border-red-600/60">
                  {item.dropdown.map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleCategoryClick(sub.catId)}
                      className="block text-left text-gray-400 hover:text-white text-[11px] py-1 transition-colors"
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile hotline info */}
          <div className="pt-2">
            <a
              href="tel:072211324"
              className="bg-[#c83232] text-white py-2 px-3 rounded text-xs font-bold flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>072211324 / 0754232212</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
