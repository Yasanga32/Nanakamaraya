"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ChevronRight, 
  Search,
  Lock,
  Printer
} from "lucide-react";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAdminData } from "@/context/AdminDataContext";
import { Product, PRODUCTS } from "@/data/products";
import { SRI_LANKA_CITIES } from "@/data/sriLankaCities";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const singleProductId = searchParams?.get("productId");
  const singleQty = parseInt(searchParams?.get("qty") || "1", 10);

  const { cart, clearCart } = useCart();
  const { products: adminProducts, offerProducts } = useAdminData();

  // Selected single item if navigated via Buy Now
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);

  // Billing Details State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Sri Lanka",
    city: "Colombo",
    streetAddress: "",
    apartment: "",
    postcode: "",
    phone: "",
    email: "",
    shipToDifferent: false,
    orderNotes: "",
    agreeTerms: false
  });

  // Shipping Address (if shipToDifferent is checked)
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    city: "Colombo",
    streetAddress: "",
    postcode: ""
  });

  // Shipping Option & Payment Option
  const [shippingMethod, setShippingMethod] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "card">("bank");

  // City Search Filter State
  const [citySearch, setCitySearch] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  // Card Payment Details State
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: ""
  });

  // Order Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load single product if singleProductId is provided
  useEffect(() => {
    if (!singleProductId) return;

    const foundCatalog = adminProducts.find(p => p.id === singleProductId) || PRODUCTS.find(p => p.id === singleProductId);
    const foundOffer = offerProducts?.find(o => o.id === singleProductId);

    if (foundCatalog) {
      setSingleProduct(foundCatalog);
    } else if (foundOffer) {
      setSingleProduct({
        id: foundOffer.id,
        name: foundOffer.name,
        category: "special-offers",
        price: foundOffer.numericPrice || 0,
        rating: 5,
        reviewsCount: 10,
        image: foundOffer.image,
        description: foundOffer.name,
        badge: foundOffer.badge || undefined,
        inStock: foundOffer.inStock,
        sku: foundOffer.sku || "",
        specs: foundOffer.specs || {}
      });
    }
  }, [singleProductId, adminProducts, offerProducts]);

  // Determine items in order
  const checkoutItems = useMemo(() => {
    if (singleProduct) {
      return [{ product: singleProduct, quantity: singleQty }];
    }
    return cart;
  }, [singleProduct, singleQty, cart]);

  // Subtotal & Shipping Math
  const itemsSubtotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [checkoutItems]);

  const shippingCost = shippingMethod === "delivery" ? 500 : 0;
  const grandTotal = itemsSubtotal + shippingCost;

  // Filtered City List based on search
  const filteredCities = useMemo(() => {
    if (!citySearch.trim()) return SRI_LANKA_CITIES.slice(0, 50);
    const q = citySearch.toLowerCase();
    return SRI_LANKA_CITIES.filter(c => c.toLowerCase().includes(q)).slice(0, 50);
  }, [citySearch]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.streetAddress || !formData.phone || !formData.email) {
      setErrorMsg("Please fill in all required billing fields marked with *");
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMsg("You must read and agree to the website terms and conditions to place an order.");
      return;
    }

    if (checkoutItems.length === 0) {
      setErrorMsg("Your order is empty. Please select products to purchase.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderRef = `NOORB-${Date.now().toString().slice(-6)}`;
      const orderData = {
        orderRef,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        items: checkoutItems,
        subtotal: itemsSubtotal,
        shippingCost,
        grandTotal,
        shippingMethod,
        paymentMethod,
        billing: formData,
        shipping: formData.shipToDifferent ? shippingData : formData
      };

      setPlacedOrder(orderData);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-gray-900 font-sans">
      <Header />
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-red-700 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="font-bold text-gray-900">Checkout</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <Lock className="w-6 h-6 text-red-700" />
              <span>Secure Order Checkout</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Complete your billing address and choose your preferred payment method below.
            </p>
          </div>

          {/* Success Receipt View if Order Placed */}
          {placedOrder ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-10 max-w-3xl mx-auto text-center space-y-6 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Thank You! Order Confirmed</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
                  Order Reference: #{placedOrder.orderRef}
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                  We have received your order. A copy of your order details has been generated below and sent to <strong className="text-gray-800">{placedOrder.billing.email}</strong>.
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-left space-y-4 text-xs">
                <div className="flex justify-between items-center border-b pb-3 font-semibold text-gray-700">
                  <span>Order Date: <strong>{placedOrder.date}</strong></span>
                  <span>Payment: <strong className="capitalize">{placedOrder.paymentMethod === "bank" ? "Bank Transfer / QR" : "Credit Card"}</strong></span>
                </div>

                {/* Items breakdown */}
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Ordered Items:</h4>
                  {placedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <div className="flex items-center gap-2 max-w-[70%]">
                        <span className="w-5 h-5 bg-gray-200 text-gray-700 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0">
                          {item.quantity}
                        </span>
                        <span className="font-semibold text-gray-800 truncate">{item.product.name}</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        LKR {(item.product.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t pt-3 space-y-1.5 font-semibold text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>LKR {placedOrder.subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping ({placedOrder.shippingMethod === "delivery" ? "Home Delivery" : "In-Store Pickup"})</span>
                    <span>LKR {placedOrder.shippingCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-red-700 pt-2 border-t">
                    <span>Total Amount</span>
                    <span>LKR {placedOrder.grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="border-t pt-3 text-[11px] text-gray-600">
                  <strong>Delivery Address:</strong> {placedOrder.billing.firstName} {placedOrder.billing.lastName}, {placedOrder.billing.streetAddress}, {placedOrder.billing.city}, {placedOrder.billing.country}. Phone: {placedOrder.billing.phone}
                </div>
              </div>

              {placedOrder.paymentMethod === "bank" && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left text-xs space-y-2 text-amber-900">
                  <h4 className="font-bold flex items-center gap-1.5 text-amber-950">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    Bank Transfer / LankaPay QR Payment Instructions:
                  </h4>
                  <p className="text-[11px] leading-relaxed">
                    Please transfer <strong>LKR {placedOrder.grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> to the following bank account or scan using LankaPay QR, quoting your order reference <strong>#{placedOrder.orderRef}</strong>.
                  </p>
                  <div className="font-mono text-[11px] bg-white p-3 rounded border border-amber-200 space-y-1">
                    <div>Bank: <strong>Commercial Bank of Ceylon PLC</strong></div>
                    <div>Account Name: <strong>M.M. NOORBHOY & CO</strong></div>
                    <div>Account Number: <strong>1000 4829 5012</strong></div>
                    <div>Branch: <strong>Colombo Main Branch (001)</strong></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <Link
                  href="/"
                  className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-md"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          ) : checkoutItems.length === 0 ? (
            /* Empty Checkout State */
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto space-y-4">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto stroke-1" />
              <h2 className="text-xl font-bold font-serif text-gray-800">Your Checkout is Empty</h2>
              <p className="text-xs text-gray-500">Select items from our catalog or special offers to proceed with checkout.</p>
              <Link
                href="/#catalog-section"
                className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Catalog</span>
              </Link>
            </div>
          ) : (
            /* Main Form + Order Summary Layout */
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (8 cols): Billing Details */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-6">
                  <h2 className="text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    Billing Details
                  </h2>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-semibold animate-in fade-in">
                      {errorMsg}
                    </div>
                  )}

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        First name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Last name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Company name <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>

                  {/* Country / Region */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Country / Region <span className="text-red-600">*</span>
                    </label>
                    <div className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg text-xs font-bold text-gray-800 flex items-center justify-between">
                      <span>🇱🇰 Sri Lanka</span>
                      <span className="text-[10px] text-gray-500 uppercase font-semibold">(Selected)</span>
                    </div>
                  </div>

                  {/* City Select with Autocomplete Search */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      City <span className="text-red-600">*</span>
                    </label>
                    <div
                      onClick={() => setIsCityDropdownOpen(prev => !prev)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 flex items-center justify-between cursor-pointer hover:border-gray-400"
                    >
                      <span>{formData.city || "Select a City..."}</span>
                      <Search className="w-3.5 h-3.5 text-gray-400" />
                    </div>

                    {/* Dropdown Menu */}
                    {isCityDropdownOpen && (
                      <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-xl max-h-60 overflow-hidden flex flex-col animate-in fade-in">
                        <div className="p-2 border-b border-gray-200 bg-gray-50">
                          <input
                            type="text"
                            placeholder="Type to search city..."
                            value={citySearch}
                            onChange={e => setCitySearch(e.target.value)}
                            className="w-full p-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                            autoFocus
                          />
                        </div>

                        <div className="overflow-y-auto max-h-48 text-xs divide-y divide-gray-100">
                          {filteredCities.map(city => (
                            <button
                              type="button"
                              key={city}
                              onClick={() => {
                                setFormData({ ...formData, city });
                                setIsCityDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 hover:bg-red-50 hover:text-red-700 transition-colors font-medium ${
                                formData.city === city ? "bg-red-100 text-red-800 font-bold" : "text-gray-700"
                              }`}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Street address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House number and street name"
                      value={formData.streetAddress}
                      onChange={e => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      value={formData.apartment}
                      onChange={e => setFormData({ ...formData, apartment: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>

                  {/* Postcode / ZIP */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Postcode / ZIP <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.postcode}
                      onChange={e => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Phone <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0771234567"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Ship to a different address toggle */}
                  <div className="pt-2 border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                      <input
                        type="checkbox"
                        checked={formData.shipToDifferent}
                        onChange={e => setFormData({ ...formData, shipToDifferent: e.target.checked })}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-600"
                      />
                      <span>Ship to a different address?</span>
                    </label>

                    {formData.shipToDifferent && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4 animate-in fade-in text-xs">
                        <h4 className="font-bold text-gray-900 uppercase">Shipping Address</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Shipping First Name"
                            value={shippingData.firstName}
                            onChange={e => setShippingData({ ...shippingData, firstName: e.target.value })}
                            className="p-2 bg-white border border-gray-300 rounded text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Shipping Last Name"
                            value={shippingData.lastName}
                            onChange={e => setShippingData({ ...shippingData, lastName: e.target.value })}
                            className="p-2 bg-white border border-gray-300 rounded text-xs"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Shipping Street Address"
                          value={shippingData.streetAddress}
                          onChange={e => setShippingData({ ...shippingData, streetAddress: e.target.value })}
                          className="w-full p-2 bg-white border border-gray-300 rounded text-xs"
                        />
                      </div>
                    )}
                  </div>

                  {/* Order Notes */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Order notes <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      value={formData.orderNotes}
                      onChange={e => setFormData({ ...formData, orderNotes: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>

                </div>

              </div>

              {/* Right Column (5 cols): Order Summary & Payment */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-6 sticky top-24">
                  
                  <h2 className="text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-3 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-red-600" />
                    Your Order
                  </h2>

                  {/* Order Items Summary Table */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200 font-bold text-gray-700 uppercase tracking-wider">
                          <th className="py-2.5 px-3">Product</th>
                          <th className="py-2.5 px-3 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {checkoutItems.map(({ product, quantity }) => (
                          <tr key={product.id} className="hover:bg-gray-50/50">
                            <td className="py-3 px-3">
                              <span className="font-bold text-gray-900 block line-clamp-2">{product.name}</span>
                              <span className="text-gray-500 text-[10px]">× {quantity}</span>
                            </td>
                            <td className="py-3 px-3 text-right font-extrabold text-gray-900 whitespace-nowrap">
                              LKR {(product.price * quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Subtotal, Shipping, and Total Breakdown */}
                  <div className="space-y-3 pt-2 text-xs font-semibold text-gray-700">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span>Subtotal</span>
                      <span className="font-extrabold text-gray-900">
                        LKR {itemsSubtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Shipping Options */}
                    <div className="space-y-2 py-2 border-b border-gray-100">
                      <span className="block text-gray-900 font-bold mb-1">Shipping</span>

                      <label className="flex items-center justify-between p-2.5 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === "delivery"}
                            onChange={() => setShippingMethod("delivery")}
                            className="w-4 h-4 text-red-600 focus:ring-red-600"
                          />
                          <span className="text-xs font-semibold text-gray-800">Home Delivery</span>
                        </div>
                        <span className="text-xs font-bold text-gray-900">LKR 500.00</span>
                      </label>

                      <label className="flex items-center justify-between p-2.5 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === "pickup"}
                            onChange={() => setShippingMethod("pickup")}
                            className="w-4 h-4 text-red-600 focus:ring-red-600"
                          />
                          <span className="text-xs font-semibold text-gray-800">In-Store Pickup</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600">Free</span>
                      </label>
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-center pt-2 text-base font-extrabold text-gray-900">
                      <span>Total</span>
                      <span className="text-xl text-red-700 font-serif">
                        LKR {grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Payment Methods Section */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Payment Method</h3>

                    {/* Payment Radio 1: Bank Transfer / QR Code */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      paymentMethod === "bank" ? "border-red-600 bg-red-50/40" : "border-gray-200"
                    }`}>
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-gray-900">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "bank"}
                          onChange={() => setPaymentMethod("bank")}
                          className="w-4 h-4 text-red-600 focus:ring-red-600"
                        />
                        <QrCode className="w-4 h-4 text-red-600 shrink-0" />
                        <span>Bank Transfer / LankaPay QR Code</span>
                      </label>

                      {paymentMethod === "bank" && (
                        <div className="mt-2.5 text-[11px] text-gray-600 bg-white p-3 rounded-lg border border-red-200 leading-relaxed animate-in fade-in">
                          Please make an online transfer or use your LankaPay QR app for the amount, quoting your order reference number. We will dispatch the goods once the payment is cleared.
                        </div>
                      )}
                    </div>

                    {/* Payment Radio 2: Card Payment */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      paymentMethod === "card" ? "border-red-600 bg-red-50/40" : "border-gray-200"
                    }`}>
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-gray-900">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-4 h-4 text-red-600 focus:ring-red-600"
                        />
                        <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Pay with Visa / MasterCard / AMEX</span>
                      </label>

                      {paymentMethod === "card" && (
                        <div className="mt-2.5 space-y-2 bg-white p-3 rounded-lg border border-blue-200 text-xs animate-in fade-in">
                          <input
                            type="text"
                            placeholder="Card Number (4000 1234 5678 9010)"
                            value={cardDetails.cardNumber}
                            onChange={e => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="MM / YY"
                              value={cardDetails.cardExpiry}
                              onChange={e => setCardDetails({ ...cardDetails, cardExpiry: e.target.value })}
                              className="p-2 border border-gray-300 rounded"
                            />
                            <input
                              type="text"
                              placeholder="CVC"
                              value={cardDetails.cardCvc}
                              onChange={e => setCardDetails({ ...cardDetails, cardCvc: e.target.value })}
                              className="p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Privacy Policy & Terms Agreement */}
                  <div className="space-y-3 pt-4 border-t border-gray-200 text-[11px] text-gray-500">
                    <p className="leading-relaxed">
                      Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link href="#" className="text-red-700 underline font-semibold">privacy policy</Link>.
                    </p>

                    <label className="flex items-start gap-2 cursor-pointer font-bold text-gray-800 text-xs">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeTerms}
                        onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
                        className="w-4 h-4 text-red-600 rounded mt-0.5"
                      />
                      <span>
                        I have read and agree to the website <Link href="#" className="text-red-700 underline">terms and conditions</Link> <span className="text-red-600">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Place Order Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#c83232] hover:bg-[#a52424] disabled:bg-gray-400 text-white font-extrabold py-4 px-6 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <span>Processing Order...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>PLACE ORDER</span>
                      </>
                    )}
                  </button>

                </div>

              </div>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
