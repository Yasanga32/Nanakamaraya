"use client";

import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { HeroSlider } from "@/components/HeroSlider";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedProducts } from "@/components/FeaturedProducts";
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

      {/* Main Hero Slider Banner */}
      <HeroSlider />

      {/* 10 Category Grid Cards matching reference image */}
      <CategoryGrid />

      {/* Product Catalog & Filter Section */}
      <FeaturedProducts />

      {/* Slide-over Cart & Quick View Modals */}
      <CartDrawer />
      <ProductModal />

      {/* Footer */}
      <Footer />
    </main>
  );
}
