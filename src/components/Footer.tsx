"use client";

import React from "react";
import Link from "next/link";
import { Headphones, Tag, Star, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Footer: React.FC = () => {
  const { setSelectedCategory } = useCart();

  const handleNavClick = (sectionId?: string, catId?: string) => {
    if (catId) {
      setSelectedCategory(catId);
    }
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full font-sans">

      {/* 1. Top Red Value-Props Banner */}
      <div className="w-full bg-[#b81d13] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center items-stretch divide-y md:divide-y-0 md:divide-x divide-white/20">

          {/* Service Team */}
          <div className="flex flex-col items-center justify-center px-4 space-y-2">
            <div className="p-1">
              <Headphones className="w-7 h-7 text-white stroke-[2]" />
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold tracking-wider uppercase">
              A GREAT CUSTOMER SERVICE TEAM
            </h4>
            <p className="text-xs text-white/90 max-w-xs font-normal leading-relaxed">
              Our dedicated customer service team are always happy to help with any enquiry.
            </p>
          </div>

          {/* Discount Offer */}
          <div className="flex flex-col items-center justify-center px-4 pt-6 md:pt-0 space-y-2">
            <div className="p-1">
              <Tag className="w-7 h-7 text-white stroke-[2]" />
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold tracking-wider uppercase">
              Rs.1,000 OFF ON ORDERS OVER Rs.25,000
            </h4>
            <p className="text-xs text-white/90 max-w-xs font-normal leading-relaxed">
              Spend over Rs.25,000 today and receive an automatic Rs.1,000 discount at checkout.
            </p>
          </div>

          {/* Reviews */}
          <div className="flex flex-col items-center justify-center px-4 pt-6 md:pt-0 space-y-2">
            <div className="p-1">
              <Star className="w-7 h-7 text-white fill-white" />
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold tracking-wider uppercase">
              EXCELLENT REVIEWS – &quot;GREAT QUALITY &amp; PRICE&quot;
            </h4>
            <p className="text-xs text-white/90 max-w-xs font-normal leading-relaxed">
              Happy customers and fantastic products result in excellent reviews.
            </p>
          </div>

        </div>
      </div>

      {/* 2. Main Dark Footer */}
      <div className="w-full bg-[#141414] text-gray-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand Logo & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="nanakamaraya.lk"
                className="h-10 w-auto object-contain bg-white/10 p-1 rounded"
              />
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Your trusted partner for quality construction, building materials, tools, and home improvement hardware in Sri Lanka.
            </p>

            <div className="space-y-3 text-xs text-gray-300 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                <span>Galwana Junction, Angoda, Sri Lanka</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#dc2626] shrink-0" />
                <div className="flex items-center gap-1 font-semibold">
                  <a href="tel:072211324" className="hover:text-white transition-colors">072211324</a>
                  <span className="text-gray-500">/</span>
                  <a href="tel:0754232212" className="hover:text-white transition-colors">0754232212</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#dc2626] shrink-0" />
                <a href="mailto:newliyanage@gmail.com" className="hover:text-white transition-colors">
                  newliyanage@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">
              Quick Links
            </h3>
            <div className="w-full border-b border-[#a81c1c] mb-4" />
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => handleNavClick()} className="hover:text-white transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("catalog-section")} className="hover:text-white transition-colors text-left">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("categories-section")} className="hover:text-white transition-colors text-left">
                  Categories
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-white transition-colors">
                  Customer Feedback
                </a>
              </li>
              <li>
                <a href="#complaints" className="hover:text-white transition-colors">
                  Complaints
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policy */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">
              Customer Care &amp; Policy
            </h3>
            <div className="w-full border-b border-[#a81c1c] mb-4" />
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Opening Hours & Connect */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">
              Opening Hours &amp; Connect
            </h3>
            <div className="w-full border-b border-[#a81c1c] mb-4" />

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <Clock className="w-4 h-4 text-[#dc2626] shrink-0" />
                <span>Trade Counter Hours:</span>
              </div>
              <p className="text-gray-400">Mon – Sat: 8:00 AM – 6:00 PM</p>
              <p className="text-gray-400">Sunday: 8:00 AM – 1:00 PM</p>
            </div>

            {/* Follow Us */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-white mb-3">Follow Us:</h4>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-[#262626] hover:bg-[#dc2626] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/94754232212"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-[#262626] hover:bg-[#dc2626] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-[#262626] hover:bg-[#dc2626] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="#"
                  aria-label="TikTok"
                  className="w-8 h-8 rounded-full bg-[#262626] hover:bg-[#dc2626] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.56-1.33 2.57-.01.94.39 1.89 1.1 2.51.75.64 1.78.9 2.74.77 1.25-.13 2.37-.89 2.92-2.01.33-.67.44-1.44.42-2.19.03-4.52.01-9.04.02-13.56z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p suppressHydrationWarning>© {new Date().getFullYear()} nanakamaraya.lk. All Rights Reserved.</p>
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
