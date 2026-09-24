"use client";

import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { HeroSlider } from "@/components/HeroSlider";
import { OfferProducts } from "@/components/OfferProducts";
import { BudgetHardwareSection } from "@/components/BudgetHardwareSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PopularBrands } from "@/components/PopularBrands";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { AboutUsSection } from "@/components/AboutUsSection";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Top Header */}
      <Header />

      {/* Main Dark Menu Navigation */}
      <Navbar />

      {/* Black Theme Announcement Ticker Bar */}
      <AnnouncementBar />

      {/* Main Hero Slider Banner */}
      <HeroSlider />

      {/* Offers Products Topic with Cards & Horizontal Arrow Navigation */}
      <OfferProducts />

      {/* Budget-Friendly Faucets & Hardware Section matching reference image */}
      <BudgetHardwareSection />

      {/* Category Grid Cards */}
      <CategoryGrid />

      {/* Product Catalog & Filter Section ("All Collections") */}
      <FeaturedProducts />

      {/* Popular Brands Row matching reference image */}
      <PopularBrands />

      {/* About Us Section matching reference image */}
      <AboutUsSection />

      {/* Slide-over Cart & Quick View Modals */}
      <CartDrawer />
      <ProductModal />

      {/* Footer */}
      <Footer />
    </main>
  );
}
