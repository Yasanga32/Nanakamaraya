"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { useCart } from "@/context/CartContext";

export const Footer: React.FC = () => {
  const { setSelectedCategory } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#1e2024] text-gray-300 border-t-4 border-red-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white text-black px-3 py-2 text-center rounded-sm font-serif font-bold">
                <span className="text-xl tracking-tighter block leading-none">MM</span>
                <span className="text-[7px] uppercase tracking-widest block text-red-700">1902</span>
              </div>
              <div>
                <span className="text-sm font-black text-white font-serif uppercase tracking-wider block">M.M. NOORBHOY & CO</span>
                <span className="text-[10px] text-gray-400 font-sans uppercase">Quality Hardware Solutions</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Established in 1902, M.M. Noorbhoy & Co is Sri Lanka&apos;s premier destination for luxury architectural hardware, bathroom fittings, acoustic wall panels, and smart home solutions.
            </p>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                <a href="tel:+94759520480" className="hover:text-white transition-colors font-bold">+94 75 952 0480</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <a href="mailto:info@noorbhoy.com" className="hover:text-white transition-colors">info@noorbhoy.com</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>124 Baseline Road, Colombo 09, Sri Lanka</span>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-gray-700 pb-2 mb-3">
              Popular Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    • {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-gray-700 pb-2 mb-3">
              Customer Support
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-red-400 transition-colors">• Architectural Project Consultation</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">• Technical Catalogs & Brochures</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">• Delivery & Installation Service</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">• Warranty & Maintenance</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">• Terms of Service & Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-gray-700 pb-2 mb-3">
              Subscribe to Newsletter
            </h3>
            <p className="text-xs text-gray-400">
              Receive updates on new hardware collections, fluted wall panels, and exclusive trade offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121315] border border-gray-700 rounded-md py-2 px-3 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Subscribe Now</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} M.M. NOORBHOY & CO. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>Bank Transfer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
