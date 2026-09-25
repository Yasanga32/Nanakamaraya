"use client";

import React from "react";

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      {/* Centered Section Header */}
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-xs font-extrabold tracking-wider text-red-700 uppercase block mb-1">
          WHO WE ARE
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-gray-900">
          About <span className="text-red-700">Us</span>
        </h2>
      </div>

      {/* 2-Column Card Box */}
      <div className="bg-[#f9fafb] border border-gray-200/80 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Building / Showroom Image */}
        <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[400px] bg-gray-200 overflow-hidden">
          <img
            src="/about-us.jpg"
            alt="nanakamaraya.lk Showroom"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Right Column: Text Information */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4">
          
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 leading-snug">
            Experts in <span className="text-[#d97706]">Hardware</span> and <span className="text-[#d97706]">Construction Products</span>
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
            At nanakamaraya.lk, we take pride in being your trusted partner for all construction and home improvement needs. With a strong commitment to quality, reliability, and customer satisfaction, we have been serving our community with top-notch hardware products for years.
          </p>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
            Our extensive range includes cement, steel, paints, plumbing materials, electrical fittings, tools, and more — everything you need to build, renovate, or enhance your space.
          </p>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
            We believe in building strong foundations — both in construction and in relationships. Visit us today and experience quality, affordability, and exceptional service all under one roof!
          </p>

        </div>

      </div>

    </section>
  );
};
