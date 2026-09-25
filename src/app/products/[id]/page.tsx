"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Star, 
  Check, 
  ShoppingCart, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronRight, 
  Plus, 
  Minus,
  Share2,
  Heart,
  ArrowLeft
} from "lucide-react";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { useCart } from "@/context/CartContext";
import { useAdminData } from "@/context/AdminDataContext";
import { Product, PRODUCTS } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { addToCart, setIsCartOpen, setQuickViewProduct } = useCart();
  const { products: adminProducts, offerProducts, categories } = useAdminData();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "description" | "shipping">("specs");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product by ID (from catalog, offers, or API fallback)
  useEffect(() => {
    if (!productId) return;

    // Search in catalog products
    const foundCatalog = adminProducts.find(p => p.id === productId) || PRODUCTS.find(p => p.id === productId);

    // Search in offer products
    const foundOffer = offerProducts?.find(o => o.id === productId);

    if (foundCatalog) {
      setProduct(foundCatalog);
      setIsLoading(false);
    } else if (foundOffer) {
      setProduct({
        id: foundOffer.id,
        name: foundOffer.name,
        category: "special-offers",
        price: foundOffer.numericPrice || 0,
        rating: foundOffer.rating || 5,
        reviewsCount: 48,
        image: foundOffer.image,
        images: [foundOffer.image],
        description: foundOffer.name,
        badge: foundOffer.badge || undefined,
        inStock: foundOffer.inStock,
        sku: foundOffer.sku || "",
        specs: foundOffer.specs || {}
      });
      setIsLoading(false);
    } else {
      // Fetch from API directly if not found in state
      fetch(`/api/products/${productId}`)
        .then(res => res.ok ? res.json() : fetch(`/api/offers/${productId}`).then(r => r.ok ? r.json() : null))
        .then(data => {
          if (data && !data.error) setProduct(data);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, [productId, adminProducts, offerProducts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-semibold text-sm">Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">The item you are looking for may have been removed or is unavailable.</p>
          <Link
            href="/"
            className="bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-2.5 rounded-md text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Multi-image list gallery (main image + images array)
  const imageList = Array.from(
    new Set([product.image, ...(product.images || [])].filter(Boolean))
  );

  const activeImage = imageList[selectedImageIndex] || product.image;

  // Find category title
  const categoryObj = categories.find(c => c.id === product.category);
  const categoryTitle = categoryObj ? categoryObj.title : product.category;

  // Handle Buy Now button
  const handleBuyNow = () => {
    router.push(`/checkout?productId=${product.id}&qty=${quantity}`);
  };

  // Related products from same category
  const relatedProducts = adminProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 bg-gray-50/50 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back Button & Breadcrumbs Navigation Bar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4 bg-white px-4 sm:px-6 py-3 rounded-2xl border border-gray-200/90 shadow-2xs">
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  router.push("/");
                }
              }}
              className="inline-flex items-center gap-2.5 text-xs font-extrabold text-gray-800 hover:text-red-700 transition-colors group cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-red-700 text-gray-700 group-hover:text-white flex items-center justify-center transition-all shadow-2xs group-hover:shadow-md">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </span>
              <span className="uppercase tracking-wider">Back to Products</span>
            </button>

            <nav className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <Link href="/" className="hover:text-red-700 transition-colors font-medium">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <Link href="/#catalog-section" className="hover:text-red-700 transition-colors capitalize font-medium">
                {categoryTitle}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="font-bold text-gray-900 truncate max-w-[180px] sm:max-w-xs">
                {product.name}
              </span>
            </nav>
          </div>

          {/* Product Hero Block (Gallery Left + Details Right) */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">

            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Main Active Image Display */}
              <div className="relative w-full aspect-square bg-gray-50 rounded-xl border border-gray-200 overflow-hidden group flex items-center justify-center">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider border border-red-700">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails Gallery Carousel */}
              {imageList.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {imageList.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-lg border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? "border-red-600 ring-2 ring-red-600/30 scale-95"
                          : "border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Right Column: Product Purchasing & Info */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
              
              <div className="space-y-3">
                {/* Category & SKU */}
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px]">
                    {categoryTitle}
                  </span>
                  {product.sku && (
                    <span className="font-mono text-gray-400">SKU: <strong className="text-gray-600">{product.sku}</strong></span>
                  )}
                </div>

                {/* Product Title */}
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 leading-snug tracking-tight">
                  {product.name}
                </h1>

                {/* Star Ratings & In Stock */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? "fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="font-bold text-gray-900 ml-1">{product.rating || 5}.0</span>
                    <span className="text-gray-400">({product.reviewsCount || 48} reviews)</span>
                  </div>

                  <div className="h-3 w-px bg-gray-300" />

                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600 text-xs">
                      <Check className="w-4 h-4 stroke-[3]" /> In Stock
                    </span>
                  ) : (
                    <span className="font-bold text-red-600 text-xs">Out of Stock</span>
                  )}
                </div>

                {/* Price Display Block */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
                    LKR {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>

                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-sm sm:text-base text-gray-400 line-through">
                        LKR {product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                      <span className="bg-red-100 text-red-700 text-xs font-extrabold px-2 py-0.5 rounded">
                        Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector & Purchase Action Buttons */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                
                {/* Quantity Control */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="p-2.5 text-gray-600 hover:bg-gray-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 text-center text-xs font-extrabold bg-transparent focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="p-2.5 text-gray-600 hover:bg-gray-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons: BUY NOW & ADD TO CART */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="w-full bg-[#c83232] hover:bg-[#a52424] disabled:bg-gray-400 text-white font-extrabold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.98]"
                  >
                    <Zap className="w-4 h-4 text-yellow-300 fill-current" />
                    <span>BUY NOW</span>
                  </button>

                  <button
                    onClick={() => addToCart(product, quantity)}
                    disabled={!product.inStock}
                    className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-extrabold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.98]"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>
                </div>

                {/* Store Guarantee Badges */}
                <div className="grid grid-cols-2 gap-2 pt-4 text-[11px] font-semibold text-gray-600 border-t border-gray-100">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Truck className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Islandwide Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Genuine Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>7 Days Easy Return Policy</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>In-Store & Online Checkout</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Technical Specifications & Description Tabs Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 mb-12">
            
            {/* Tab Headers */}
            <div className="flex items-center gap-6 border-b border-gray-200 pb-3 mb-6 overflow-x-auto text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === "specs"
                    ? "text-red-700 font-extrabold border-b-2 border-red-700"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Specifications & Details
              </button>

              <button
                onClick={() => setActiveTab("description")}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === "description"
                    ? "text-red-700 font-extrabold border-b-2 border-red-700"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Product Description
              </button>

              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === "shipping"
                    ? "text-red-700 font-extrabold border-b-2 border-red-700"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            {/* Tab 1: Specifications Table */}
            {activeTab === "specs" && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-bold text-gray-900 font-serif">Technical Specifications</h3>
                {product.specs && Object.keys(product.specs).length > 0 ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {Object.entries(product.specs).map(([key, val], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? "bg-gray-50/70" : "bg-white"}>
                            <td className="py-3 px-4 font-extrabold text-gray-700 border-r border-gray-200 w-1/3">
                              {key}
                            </td>
                            <td className="py-3 px-4 text-gray-800 font-medium">
                              {val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">Standard architectural hardware specifications apply.</p>
                )}
              </div>
            )}

            {/* Tab 2: Full Description */}
            {activeTab === "description" && (
              <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed animate-in fade-in">
                <h3 className="text-sm font-bold text-gray-900 font-serif mb-2">About {product.name}</h3>
                <p>{product.description}</p>
                <p>
                  Established in 1902, nanakamaraya.lk supplies Sri Lanka&apos;s finest architectural hardware, bathroom fittings, acoustic wall panels, and smart living solutions. Every item is inspected for structural durability, high-traffic usage, and luxury aesthetics.
                </p>
              </div>
            )}

            {/* Tab 3: Shipping & Returns */}
            {activeTab === "shipping" && (
              <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed animate-in fade-in">
                <h3 className="text-sm font-bold text-gray-900 font-serif mb-2">Delivery & Return Policies</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Colombo Metro Area:</strong> Express dispatch within 24-48 hours.</li>
                  <li><strong>Outstation / Islandwide:</strong> Delivered via trusted courier services in 2-4 business days.</li>
                  <li><strong>Showroom Pickup:</strong> Available at Colombo 03 flagship store.</li>
                  <li><strong>Returns:</strong> 7 days return guarantee for unopened original packaging.</li>
                </ul>
              </div>
            )}

          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 font-serif border-b border-gray-200 pb-3">
                You May Also Like
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.id}`}
                    className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col justify-between hover:shadow-lg transition-all group"
                  >
                    <div>
                      <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3 border border-gray-100 flex items-center justify-center">
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-red-700 transition-colors">
                        {rel.name}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-gray-900">
                        LKR {rel.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] font-bold text-red-700 hover:underline">
                        View Product →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <CartDrawer />
      <ProductModal />
      <Footer />
    </div>
  );
}
