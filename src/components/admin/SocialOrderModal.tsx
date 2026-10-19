"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  X,
  Check,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Video,
  Share2,
  Smartphone,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  Info,
  Layers,
  Tag,
  Plus,
  Trash2,
  Camera,
  Megaphone,
  TrendingUp,
  Sliders,
  DollarSign,
  HelpCircle,
  CheckCircle2,
  FileText
} from "lucide-react";
import { SocialContentItem } from "./SocialContentStudio";

export interface SocialOrderModalProps {
  item: SocialContentItem | null;
  onClose: () => void;
  onSuccess: (orderData: any) => void;
}

export interface ContentBriefItem {
  id: string;
  itemNumber: number;
  format: "post" | "reel" | "story" | "carousel";
  purpose: string;
  description: string;
  referenceImage?: string;
}

export interface ReferenceUploadItem {
  id: string;
  url: string;
  category: "Product Photo" | "Business Logo" | "Reference Design" | "Style / Moodboard" | "Other";
  description: string;
}

const PRODUCTION_PACKAGES = [
  {
    id: "Custom Graphic & Copy Design",
    title: "Graphics & Copy",
    desc: "Branded post flyer + copywriting + hashtag strategy",
    tag: "Most Popular",
    defaultQty: 1,
    defaultFormat: "post" as const
  },
  {
    id: "Reels & Video Production Pack",
    title: "Reels & Video Production",
    desc: "Full video editing, animated captions & audio sync",
    tag: "High Engagement",
    defaultQty: 1,
    defaultFormat: "reel" as const
  },
  {
    id: "Weekly Social Campaign Pack",
    title: "Weekly Growth Pack",
    desc: "3 Post Graphics + 1 Reel + Story templates",
    tag: "Complete",
    defaultQty: 4,
    defaultFormat: "post" as const
  },
  {
    id: "Custom Agency Request",
    title: "Custom Agency Project",
    desc: "Bespoke branding, photo retouching or advertising",
    tag: "Flexible",
    defaultQty: 1,
    defaultFormat: "post" as const
  }
];

const BOOSTING_PACKAGES = [
  {
    id: "boost-starter",
    title: "Starter Reach Booster",
    platform: "Facebook & Instagram",
    duration: "3 Days",
    objective: "Post Engagement & Reach",
    desc: "Expand reach to potential local customers and increase post interactions."
  },
  {
    id: "boost-whatsapp",
    title: "WhatsApp Inquiries Funnel",
    platform: "Facebook & Instagram",
    duration: "7 Days",
    objective: "WhatsApp Direct Messages",
    desc: "Drive targeted messages directly to your WhatsApp business number."
  },
  {
    id: "boost-highimpact",
    title: "High-Impact Sales Campaign",
    platform: "Facebook, Instagram & TikTok",
    duration: "14 Days",
    objective: "Website Clicks & Conversions",
    desc: "Multi-platform targeted campaign optimized for conversions and catalog views."
  },
  {
    id: "boost-custom",
    title: "Custom Campaign Strategy",
    platform: "Multi-Platform",
    duration: "Custom",
    objective: "Custom Strategic Goals",
    desc: "Bespoke audience segmentation, retargeting pixels, and A/B ad creative testing."
  }
];

export const SocialOrderModal: React.FC<SocialOrderModalProps> = ({
  item,
  onClose,
  onSuccess
}) => {
  // Service selection (multi-select)
  const [selectedServices, setSelectedServices] = useState<string[]>(["content_creation"]);

  // Package & Content Requirements
  const [orderPackageType, setOrderPackageType] = useState(
    item?.orderPackageType || (item?.format === "reel" ? "Reels & Video Production Pack" : "Custom Graphic & Copy Design")
  );
  const [format, setFormat] = useState<"post" | "reel" | "story" | "carousel">(
    (item?.format as any) || "post"
  );
  const [purpose, setPurpose] = useState<string>(
    item?.category || "product-promotion"
  );
  const [contentDescription, setContentDescription] = useState<string>(
    item?.caption || item?.headline || ""
  );
  const [targetPlatforms, setTargetPlatforms] = useState<string[]>(["Facebook", "Instagram"]);
  const [language, setLanguage] = useState<string>(item?.language || "English");
  const [tone, setTone] = useState<string>(item?.tone || "Professional");

  // Quantity & Dynamic Briefs
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [contentBriefs, setContentBriefs] = useState<ContentBriefItem[]>([
    {
      id: "brief-1",
      itemNumber: 1,
      format: (item?.format as any) || "post",
      purpose: item?.category || "product-promotion",
      description: item?.caption || "",
      referenceImage: item?.image || ""
    }
  ]);

  // Reference Uploads
  const [referenceUploads, setReferenceUploads] = useState<ReferenceUploadItem[]>([]);
  const [isUploadingRef, setIsUploadingRef] = useState(false);
  const refFileInputRef = useRef<HTMLInputElement>(null);

  // Brief Image Uploading tracking
  const [uploadingBriefId, setUploadingBriefId] = useState<string | null>(null);
  const briefFileInputRef = useRef<HTMLInputElement>(null);
  const activeBriefUploadTargetRef = useRef<string | null>(null);

  // Post Boosting & Ad Campaigns
  const [boostingPackageId, setBoostingPackageId] = useState<string>("boost-starter");
  const [adPlatform, setAdPlatform] = useState<string>("Facebook & Instagram");
  const [adObjective, setAdObjective] = useState<string>("Post Engagement & Reach");
  const [targetAudience, setTargetAudience] = useState<string>("");
  const [targetLocation, setTargetLocation] = useState<string>("Western Province, Sri Lanka");
  const [adDurationDays, setAdDurationDays] = useState<string>("7 Days");
  const [adBudgetTier, setAdBudgetTier] = useState<string>("10,000 LKR");
  const [customAdBudget, setCustomAdBudget] = useState<string>("");

  // Onsite Shooting
  const [onsiteAddress, setOnsiteAddress] = useState<string>("");
  const [onsiteDate, setOnsiteDate] = useState<string>("");
  const [onsiteTime, setOnsiteTime] = useState<string>("Morning (9:00 AM - 12:00 PM)");
  const [onsiteShootType, setOnsiteShootType] = useState<string>("Product Photography & Showroom Video");
  const [onsiteDeliverables, setOnsiteDeliverables] = useState<string>("15 Edited Photos + 2 Vertical Reels");
  const [onsiteInstructions, setOnsiteInstructions] = useState<string>("");

  // Delivery Deadline
  const [deadlineType, setDeadlineType] = useState<"standard" | "urgent">("standard");
  const [urgentDeadlineDate, setUrgentDeadlineDate] = useState<string>("");

  // Contact Information
  const [orderContactName, setOrderContactName] = useState(item?.orderContactName || "");
  const [orderContactPhone, setOrderContactPhone] = useState(item?.orderContactPhone || "");
  const [orderContactEmail, setOrderContactEmail] = useState(item?.orderContactEmail || "");
  const [orderNotes, setOrderNotes] = useState(item?.orderNotes || "");

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync package changes with default quantity and briefs
  const handleSelectPackage = (pkgId: string) => {
    setOrderPackageType(pkgId);
    const pkg = PRODUCTION_PACKAGES.find(p => p.id === pkgId);
    if (!pkg) return;

    const newQty = pkg.defaultQty;
    setItemQuantity(newQty);
    setFormat(pkg.defaultFormat);

    // Generate new default briefs
    const newBriefs: ContentBriefItem[] = [];
    for (let i = 1; i <= newQty; i++) {
      let itemFmt: "post" | "reel" | "story" | "carousel" = pkg.defaultFormat;
      let itemPurpose = purpose;

      if (pkgId === "Weekly Social Campaign Pack") {
        if (i <= 3) {
          itemFmt = "post";
          itemPurpose = i === 1 ? "product-promotion" : i === 2 ? "special-offers" : "about-business";
        } else {
          itemFmt = "reel";
          itemPurpose = "product-promotion";
        }
      }

      newBriefs.push({
        id: `brief-${i}`,
        itemNumber: i,
        format: itemFmt,
        purpose: itemPurpose,
        description: i === 1 && contentDescription ? contentDescription : "",
        referenceImage: i === 1 && item?.image ? item.image : ""
      });
    }
    setContentBriefs(newBriefs);
  };

  // Adjust item quantity dynamically
  const handleQuantityChange = (newQty: number) => {
    const qty = Math.max(1, Math.min(10, newQty));
    setItemQuantity(qty);

    setContentBriefs(prev => {
      const updated = [...prev];
      if (qty > prev.length) {
        for (let i = prev.length + 1; i <= qty; i++) {
          updated.push({
            id: `brief-${i}-${Date.now()}`,
            itemNumber: i,
            format: format,
            purpose: purpose,
            description: "",
            referenceImage: ""
          });
        }
      } else if (qty < prev.length) {
        return updated.slice(0, qty);
      }
      return updated;
    });
  };

  // Update a single brief
  const handleUpdateBrief = (index: number, field: keyof ContentBriefItem, value: any) => {
    setContentBriefs(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], [field]: value };
      }
      return next;
    });
  };

  // Toggle services
  const handleToggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        if (prev.length === 1) {
          alert("Please select at least one service.");
          return prev;
        }
        return prev.filter(s => s !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  // Toggle target platforms
  const handleTogglePlatform = (p: string) => {
    setTargetPlatforms(prev =>
      prev.includes(p) ? (prev.length > 1 ? prev.filter(item => item !== p) : prev) : [...prev, p]
    );
  };

  // Upload general reference image
  const handleUploadReference = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingRef(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload reference");

      const newRef: ReferenceUploadItem = {
        id: `ref-${Date.now()}`,
        url: data.url,
        category: "Product Photo",
        description: ""
      };
      setReferenceUploads(prev => [...prev, newRef]);
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setIsUploadingRef(false);
      if (refFileInputRef.current) refFileInputRef.current.value = "";
    }
  };

  // Upload brief-specific reference image
  const handleUploadBriefImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetBriefId = activeBriefUploadTargetRef.current;
    if (!file || !targetBriefId) return;

    setUploadingBriefId(targetBriefId);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload brief image");

      setContentBriefs(prev =>
        prev.map(b => (b.id === targetBriefId ? { ...b, referenceImage: data.url } : b))
      );
    } catch (err: any) {
      alert(`Brief image upload error: ${err.message}`);
    } finally {
      setUploadingBriefId(null);
      activeBriefUploadTargetRef.current = null;
      if (briefFileInputRef.current) briefFileInputRef.current.value = "";
    }
  };

  // Final Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderContactName.trim() || !orderContactPhone.trim()) {
      alert("Please enter your name and phone / WhatsApp number.");
      return;
    }

    if (selectedServices.includes("onsite_shooting") && !onsiteAddress.trim()) {
      alert("Please provide the business location/address for the onsite shoot.");
      return;
    }

    if (deadlineType === "urgent" && !urgentDeadlineDate) {
      alert("Please select your requested urgent deadline date.");
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedBoostingPkg = BOOSTING_PACKAGES.find(b => b.id === boostingPackageId);
      const effectiveAdBudget = adBudgetTier === "Custom" ? customAdBudget : adBudgetTier;

      // Construct comprehensive order object
      const orderPayload = {
        contentId: item?.id || "new-custom-order",
        contactName: orderContactName.trim(),
        contactPhone: orderContactPhone.trim(),
        contactEmail: orderContactEmail.trim(),
        packageType: orderPackageType,
        notes: orderNotes.trim(),
        selectedServices,
        contentRequirements: {
          format,
          purpose,
          description: contentDescription.trim(),
          platforms: targetPlatforms,
          language,
          tone,
          quantity: itemQuantity
        },
        contentBriefs,
        referenceUploads,
        boostingDetails: (selectedServices.includes("post_boosting") || selectedServices.includes("ad_campaign")) ? {
          packageId: boostingPackageId,
          packageName: selectedBoostingPkg?.title || "Custom Boosting",
          platform: adPlatform,
          objective: adObjective,
          targetAudience: targetAudience.trim(),
          location: targetLocation.trim(),
          duration: adDurationDays,
          adSpendBudget: effectiveAdBudget,
          managementFee: "Quotation on Review",
          pricingNote: "Ad media spend is directly spent on Meta/TikTok. Agency management fee requires quotation."
        } : null,
        onsiteShooting: selectedServices.includes("onsite_shooting") ? {
          locationAddress: onsiteAddress.trim(),
          preferredDate: onsiteDate,
          preferredTime: onsiteTime,
          shootType: onsiteShootType,
          requiredDeliverables: onsiteDeliverables.trim(),
          specialInstructions: onsiteInstructions.trim(),
          pricingStatus: "Quotation Required",
          confirmationNote: "Booking date & crew arrival must be confirmed by our team."
        } : null,
        deadline: {
          type: deadlineType,
          requestedDate: deadlineType === "urgent" ? urgentDeadlineDate : null,
          note: deadlineType === "urgent"
            ? "Urgent Priority Request (Subject to studio confirmation)"
            : "Standard Delivery (Typically 48-72 hours)"
        },
        pricingSummary: {
          selectedServicesCount: selectedServices.length,
          contentItemsCount: selectedServices.includes("content_creation") ? itemQuantity : 0,
          adSpendBudget: (selectedServices.includes("post_boosting") || selectedServices.includes("ad_campaign")) ? effectiveAdBudget : null,
          hasQuoteItems: true,
          notice: "Custom quotation will be finalized upon reviewing requirements and confirmed via WhatsApp."
        }
      };

      const res = await fetch("/api/social-content/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit order");

      onSuccess(data);
    } catch (err: any) {
      alert(`Order submission error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasContentCreation = selectedServices.includes("content_creation");
  const hasBoostingOrAds = selectedServices.includes("post_boosting") || selectedServices.includes("ad_campaign");
  const hasOnsiteShooting = selectedServices.includes("onsite_shooting");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl my-auto overflow-hidden flex flex-col max-h-[94vh]">

        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={refFileInputRef}
          onChange={handleUploadReference}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={briefFileInputRef}
          onChange={handleUploadBriefImage}
          accept="image/*"
          className="hidden"
        />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                  Order Professional Content Creation & Marketing
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700">
                  Agency Intake
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Our creative designers & ad specialists handle your complete social media growth.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-6">

          {/* 1. SERVICE SELECTION */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Select Desired Service(s)</span>
                <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-gray-500">Choose one or multiple services</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                {
                  id: "content_creation",
                  title: "Content Creation",
                  desc: "Graphics, Reels, Stories & Carousels",
                  icon: Sparkles,
                  color: "text-blue-600",
                  badge: "Core Service"
                },
                {
                  id: "post_boosting",
                  title: "Post Boosting",
                  desc: "Reach expansion, likes & engagement",
                  icon: TrendingUp,
                  color: "text-emerald-600",
                  badge: "Growth"
                },
                {
                  id: "ad_campaign",
                  title: "Ad Campaigns",
                  desc: "WhatsApp leads & targeted sales",
                  icon: Megaphone,
                  color: "text-purple-600",
                  badge: "High ROI"
                },
                {
                  id: "onsite_shooting",
                  title: "Onsite Shooting",
                  desc: "Photo & video crew at your location",
                  icon: Camera,
                  color: "text-amber-600",
                  badge: "On-Location"
                }
              ].map(srv => {
                const isSelected = selectedServices.includes(srv.id);
                const Icon = srv.icon;
                return (
                  <div
                    key={srv.id}
                    onClick={() => handleToggleService(srv.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/80 shadow-xs ring-1 ring-blue-500/30"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className={`p-1.5 rounded-lg ${isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          isSelected ? "bg-blue-200 text-blue-900" : "bg-gray-100 text-gray-500"
                        }`}>
                          {srv.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-gray-900">{srv.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{srv.desc}</p>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-[10px] font-semibold text-gray-400">Status</span>
                      <span className={`text-[10px] font-bold flex items-center gap-1 ${isSelected ? "text-blue-600" : "text-gray-400"}`}>
                        {isSelected ? <Check className="w-3 h-3" /> : null}
                        {isSelected ? "Selected" : "Add Service"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. CONTENT CREATION REQUIREMENTS & PACKAGES */}
          {hasContentCreation && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-600 text-white rounded-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">
                      2. Content Creation Requirements
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Select production package, format, and creative specifications.
                    </p>
                  </div>
                </div>
              </div>

              {/* Package Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800">
                  Select Production Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {PRODUCTION_PACKAGES.map(pkg => (
                    <div
                      key={pkg.id}
                      onClick={() => handleSelectPackage(pkg.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        orderPackageType === pkg.id
                          ? "border-blue-600 bg-white shadow-xs ring-2 ring-blue-600/20"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-gray-900">{pkg.title}</span>
                        {pkg.tag && (
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                            {pkg.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug">{pkg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Format, Purpose, Platforms, Language, Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                
                {/* Format */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Primary Format
                  </label>
                  <select
                    value={format}
                    onChange={e => setFormat(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="post">Single Post (1:1 / 4:5 Graphic)</option>
                    <option value="reel">Reel / Video (9:16 Vertical)</option>
                    <option value="story">Story Template (9:16)</option>
                    <option value="carousel">Multi-Slide Carousel</option>
                  </select>
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Content Purpose
                  </label>
                  <select
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="product-promotion">Product Promotion & Specs</option>
                    <option value="special-offers">Special Offers & Discounts</option>
                    <option value="about-business">Business Awareness & Heritage</option>
                    <option value="delivery-services">Delivery Services & Shipping</option>
                    <option value="new-arrivals">New Arrivals Showcase</option>
                    <option value="customer-testimonials">Customer Testimonial</option>
                    <option value="other">Other / Custom Concept</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Sinhala + English">Sinhala + English (Bilingual)</option>
                  </select>
                </div>

                {/* Preferred Tone */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Brand Tone
                  </label>
                  <select
                    value={tone}
                    onChange={e => setTone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Professional">Professional & Trustworthy</option>
                    <option value="Friendly">Friendly & Approachable</option>
                    <option value="Urgent">Promotional & Urgency-Driven</option>
                    <option value="Luxury">Luxury & High-End Minimalist</option>
                    <option value="Informative">Technical & Educational</option>
                  </select>
                </div>

                {/* Target Platforms */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Target Platforms
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["Facebook", "Instagram", "TikTok"].map(plat => {
                      const active = targetPlatforms.includes(plat);
                      return (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => handleTogglePlatform(plat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            active
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {active && <Check className="w-3 h-3" />}
                          <span>{plat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* General Description */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Overall Campaign Objective / Key Message
                </label>
                <textarea
                  rows={2}
                  value={contentDescription}
                  onChange={e => setContentDescription(e.target.value)}
                  placeholder="Outline what product or message this campaign should spotlight (e.g. Highlight smart locks discount valid this month)..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              {/* 3. MULTIPLE CONTENT BRIEFS */}
              <div className="pt-3 border-t border-gray-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>3. Itemized Content Briefs</span>
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Configure a specific creative brief for each individual graphic or reel in this order.
                    </p>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-300 shrink-0">
                    <span className="text-[11px] font-bold text-gray-600">Total Creatives:</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(itemQuantity - 1)}
                      className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center font-bold text-xs cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-black text-blue-600">{itemQuantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(itemQuantity + 1)}
                      className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center font-bold text-xs cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Brief Cards */}
                <div className="space-y-3">
                  {contentBriefs.map((brief, idx) => (
                    <div
                      key={brief.id}
                      className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span>Creative Item #{idx + 1}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <select
                            value={brief.format}
                            onChange={e => handleUpdateBrief(idx, "format", e.target.value)}
                            className="px-2 py-1 text-[11px] font-bold border border-gray-200 rounded-md bg-gray-50 text-gray-700"
                          >
                            <option value="post">Post (Graphic)</option>
                            <option value="reel">Reel (Video)</option>
                            <option value="story">Story</option>
                            <option value="carousel">Carousel</option>
                          </select>
                          <select
                            value={brief.purpose}
                            onChange={e => handleUpdateBrief(idx, "purpose", e.target.value)}
                            className="px-2 py-1 text-[11px] font-bold border border-gray-200 rounded-md bg-gray-50 text-gray-700"
                          >
                            <option value="product-promotion">Product Promotion</option>
                            <option value="special-offers">Special Offer</option>
                            <option value="about-business">About Business</option>
                            <option value="delivery-services">Delivery Services</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                        <div className="md:col-span-2">
                          <textarea
                            rows={2}
                            value={brief.description}
                            onChange={e => handleUpdateBrief(idx, "description", e.target.value)}
                            placeholder={`Brief for Item #${idx + 1}: Required text, specifications, headline or discount code...`}
                            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none"
                          />
                        </div>

                        {/* Optional Reference Image for this item */}
                        <div className="flex items-center gap-2">
                          {brief.referenceImage ? (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0 group">
                              <img
                                src={brief.referenceImage}
                                alt={`Item ${idx + 1} reference`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleUpdateBrief(idx, "referenceImage", "")}
                                className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                title="Remove Image"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                activeBriefUploadTargetRef.current = brief.id;
                                briefFileInputRef.current?.click();
                              }}
                              disabled={uploadingBriefId === brief.id}
                              className="px-3 py-2 border border-dashed border-gray-300 hover:border-blue-500 rounded-lg text-[11px] font-semibold text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer w-full justify-center bg-gray-50/50"
                            >
                              {uploadingBriefId === brief.id ? (
                                <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Upload className="w-3.5 h-3.5" />
                              )}
                              <span>Upload Ref Photo</span>
                            </button>
                          )}
                          <span className="text-[10px] text-gray-400">
                            {brief.referenceImage ? "Photo Attached" : "Optional"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 4. REFERENCE ASSET UPLOADS (Logos, photos, moodboards) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">
                    4. Reference Uploads & Assets
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Upload your logo, product photos, style references, or competitor designs (optional).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => refFileInputRef.current?.click()}
                disabled={isUploadingRef}
                className="px-3 py-1.5 bg-white border border-gray-300 hover:border-indigo-600 hover:text-indigo-600 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
              >
                {isUploadingRef ? (
                  <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                <span>Upload Reference</span>
              </button>
            </div>

            {referenceUploads.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-gray-300 text-center bg-white/60">
                <p className="text-xs text-gray-400">
                  No reference files uploaded yet. You can attach your brand logo, raw product pictures, or sample posts.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {referenceUploads.map((ref, idx) => (
                  <div
                    key={ref.id}
                    className="p-3 bg-white rounded-xl border border-gray-200 flex items-start gap-3 shadow-xs"
                  >
                    <img
                      src={ref.url}
                      alt={`Reference ${idx + 1}`}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <select
                          value={ref.category}
                          onChange={e => {
                            const val = e.target.value as any;
                            setReferenceUploads(list =>
                              list.map(r => (r.id === ref.id ? { ...r, category: val } : r))
                            );
                          }}
                          className="px-2 py-0.5 text-[10px] font-bold border border-gray-200 rounded bg-gray-50 text-gray-800"
                        >
                          <option value="Product Photo">Product Photo</option>
                          <option value="Business Logo">Business Logo</option>
                          <option value="Reference Design">Reference Design</option>
                          <option value="Style / Moodboard">Style / Moodboard</option>
                          <option value="Other">Other Asset</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => setReferenceUploads(list => list.filter(r => r.id !== ref.id))}
                          className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={ref.description}
                        onChange={e => {
                          const val = e.target.value;
                          setReferenceUploads(list =>
                            list.map(r => (r.id === ref.id ? { ...r, description: val } : r))
                          );
                        }}
                        placeholder="Optional note: e.g. High-res logo"
                        className="w-full px-2 py-1 text-[11px] border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. POST BOOSTING & AD CAMPAIGNS */}
          {hasBoostingOrAds && (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-emerald-200/70 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-600 text-white rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950">
                      5. Post Boosting & Ad Campaign Management
                    </h3>
                    <p className="text-[11px] text-emerald-700">
                      Amplify your reach with paid targeted ads on Meta (Facebook & Instagram) and TikTok.
                    </p>
                  </div>
                </div>
              </div>

              {/* Boosting Packages */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800">
                  Select Boosting / Campaign Strategy
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BOOSTING_PACKAGES.map(pkg => (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setBoostingPackageId(pkg.id);
                        setAdPlatform(pkg.platform);
                        setAdObjective(pkg.objective);
                        setAdDurationDays(pkg.duration);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        boostingPackageId === pkg.id
                          ? "border-emerald-600 bg-white shadow-xs ring-2 ring-emerald-600/20"
                          : "border-emerald-200/70 hover:border-emerald-400 bg-white/70"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-gray-900">{pkg.title}</span>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {pkg.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-1 leading-snug">{pkg.desc}</p>
                      <div className="mt-2 text-[10px] text-emerald-800 font-semibold flex items-center gap-2">
                        <span>Platform: {pkg.platform}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Ad Platform
                  </label>
                  <select
                    value={adPlatform}
                    onChange={e => setAdPlatform(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Facebook & Instagram">Facebook & Instagram (Meta)</option>
                    <option value="Facebook Only">Facebook Only</option>
                    <option value="Instagram Only">Instagram Only</option>
                    <option value="TikTok Ads">TikTok Ads</option>
                    <option value="Facebook, Instagram & TikTok">All Platforms (Meta + TikTok)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Campaign Objective
                  </label>
                  <select
                    value={adObjective}
                    onChange={e => setAdObjective(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Post Engagement & Reach">Post Engagement & Reach</option>
                    <option value="WhatsApp Direct Messages">WhatsApp Direct Inquiries</option>
                    <option value="Website & Catalog Clicks">Website & Catalog Traffic</option>
                    <option value="Video Views">Video Views & Brand Recall</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Campaign Duration
                  </label>
                  <select
                    value={adDurationDays}
                    onChange={e => setAdDurationDays(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="3 Days">3 Days</option>
                    <option value="5 Days">5 Days</option>
                    <option value="7 Days">7 Days (Recommended)</option>
                    <option value="14 Days">14 Days</option>
                    <option value="30 Days">30 Days (Monthly Campaign)</option>
                    <option value="Custom">Custom Duration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Target Geographic Location
                  </label>
                  <input
                    type="text"
                    value={targetLocation}
                    onChange={e => setTargetLocation(e.target.value)}
                    placeholder="e.g. Western Province or All Island"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Target Audience / Customer Demographic
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={e => setTargetAudience(e.target.value)}
                    placeholder="e.g. Architects, contractors, homeowners aged 25-55 interested in modern interior fittings"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Advertising Budget Tier & Clear Fee Separation */}
              <div className="p-3.5 bg-white rounded-xl border border-emerald-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <label className="text-xs font-black text-gray-900 block">
                      Advertising Budget (Direct Ad Spend on Meta / TikTok)
                    </label>
                    <span className="text-[11px] text-gray-500">
                      Choose your media spend allocated directly to ad platforms.
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                    Direct Ad Spend
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {["5,000 LKR", "10,000 LKR", "25,000 LKR", "50,000 LKR", "Custom"].map(tier => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setAdBudgetTier(tier)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        adBudgetTier === tier
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                {adBudgetTier === "Custom" && (
                  <div>
                    <input
                      type="text"
                      value={customAdBudget}
                      onChange={e => setCustomAdBudget(e.target.value)}
                      placeholder="Enter custom ad budget (e.g. 75,000 LKR)"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                )}

                {/* Clear Pricing Separation Box */}
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>1. Direct Ad Spend Budget:</span>
                    <span className="text-emerald-700">{adBudgetTier === "Custom" ? customAdBudget || "Custom LKR" : adBudgetTier}</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    100% of this budget is paid directly to Meta/TikTok for campaign reach and clicks.
                  </p>
                  <div className="flex items-center justify-between font-bold pt-1.5 border-t border-emerald-200">
                    <span>2. Agency Management Fee:</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] uppercase font-black">
                      Requires Quotation
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    Audience targeting, pixel conversion tracking, and campaign optimization fee will be quoted by our team upon review.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* 6. ONSITE SHOOTING PACKAGE */}
          {hasOnsiteShooting && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-amber-200/70 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-600 text-white rounded-lg">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-amber-950">
                      6. Onsite Photo & Video Shooting Package
                    </h3>
                    <p className="text-[11px] text-amber-800">
                      Request our professional photography and videography team to visit your premises.
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                  Quotation Required
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Business / Showroom Location & Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={onsiteAddress}
                    onChange={e => setOnsiteAddress(e.target.value)}
                    placeholder="e.g. No. 123, Galle Road, Colombo 03 or Showroom Building"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Preferred Shooting Date
                  </label>
                  <input
                    type="date"
                    value={onsiteDate}
                    onChange={e => setOnsiteDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Preferred Time Window
                  </label>
                  <select
                    value={onsiteTime}
                    onChange={e => setOnsiteTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    <option value="Flexible / Contact to Schedule">Flexible / Contact to Schedule</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Type of Shoot
                  </label>
                  <select
                    value={onsiteShootType}
                    onChange={e => setOnsiteShootType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="Product Photography & Showroom Video">Product Photography & Showroom Video</option>
                    <option value="Full Showroom Walkthrough Tour">Full Showroom Walkthrough Tour</option>
                    <option value="Client Testimonial & Interview Video">Client Testimonial & Interview Video</option>
                    <option value="Behind the Scenes / Workshop Process">Behind the Scenes & Craftsmanship</option>
                    <option value="Architectural Installation Showcase">Architectural Installation Showcase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Required Deliverables
                  </label>
                  <input
                    type="text"
                    value={onsiteDeliverables}
                    onChange={e => setOnsiteDeliverables(e.target.value)}
                    placeholder="e.g. 15 Edited Photos + 2 Vertical Reels"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Special Instructions for Onsite Production Crew
                  </label>
                  <textarea
                    rows={2}
                    value={onsiteInstructions}
                    onChange={e => setOnsiteInstructions(e.target.value)}
                    placeholder="Mention specific lighting needs, peak customer hours, safety protocols, or specific product display racks to focus on..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                  />
                </div>
              </div>

              {/* Booking Confirmation Notice */}
              <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-300/80 text-[11px] text-amber-950 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold">Booking Confirmation Required:</span> Onsite shooting dates and final quotation depend on travel location and crew scheduling. Our team will contact you via WhatsApp to verify the date, confirm crew availability, and provide an accurate quotation.
                </div>
              </div>
            </div>
          )}

          {/* 7. DELIVERY SPEED & DEADLINE */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>7. Delivery Speed & Deadline</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setDeadlineType("standard")}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  deadlineType === "standard"
                    ? "border-blue-600 bg-white shadow-xs ring-2 ring-blue-600/20"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-900">Standard Delivery</span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    Typically 48 Hours
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                  Work begins immediately upon asset confirmation. Delivered within 48 to 72 hours.
                </p>
              </div>

              <div
                onClick={() => setDeadlineType("urgent")}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  deadlineType === "urgent"
                    ? "border-amber-600 bg-white shadow-xs ring-2 ring-amber-600/20"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-900">Urgent Priority Request</span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                    Priority Queue
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                  Expedited turnaround. Requires studio confirmation depending on queue.
                </p>
              </div>
            </div>

            {deadlineType === "urgent" && (
              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-gray-800">
                    Requested Deadline Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={urgentDeadlineDate}
                    onChange={e => setUrgentDeadlineDate(e.target.value)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <p className="text-[11px] text-amber-800 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Note: Urgent delivery feasibility will be confirmed via WhatsApp upon receiving the order.</span>
                </p>
              </div>
            )}
          </div>

          {/* 8. CLIENT CONTACT DETAILS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <span>8. Client Contact Information</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Your Name / Business Client <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={orderContactName}
                  onChange={e => setOrderContactName(e.target.value)}
                  placeholder="e.g. Yasanga / Nanakamaraya Admin"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Phone / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={orderContactPhone}
                  onChange={e => setOrderContactPhone(e.target.value)}
                  placeholder="e.g. +94 77 123 4567"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={orderContactEmail}
                  onChange={e => setOrderContactEmail(e.target.value)}
                  placeholder="e.g. info@nanakamaraya.lk"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  General Order Notes & Special Instructions
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  placeholder="Any extra instructions for our creative team..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* 9. ORDER SUMMARY & PRICING BREAKDOWN */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-950">
                  9. Order Summary & Pricing
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Pre-Submission Review
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Selected Services:</span>
                <span className="font-bold text-gray-900 capitalize">
                  {selectedServices.map(s => s.replace("_", " ")).join(", ")}
                </span>
              </div>

              {hasContentCreation && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Content Package:</span>
                    <span className="font-bold text-gray-900">{orderPackageType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Creatives Configured:</span>
                    <span className="font-bold text-gray-900">
                      {itemQuantity} Item Brief(s) ({format.toUpperCase()})
                    </span>
                  </div>
                </>
              )}

              {referenceUploads.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Attached Reference Assets:</span>
                  <span className="font-bold text-gray-900">{referenceUploads.length} File(s)</span>
                </div>
              )}

              {hasBoostingOrAds && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Ad Spend Media Budget:</span>
                    <span className="font-bold text-emerald-700">
                      {adBudgetTier === "Custom" ? customAdBudget || "Custom" : adBudgetTier} (Paid to Platform)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Ad Management Fee:</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                      Quotation Required
                    </span>
                  </div>
                </>
              )}

              {hasOnsiteShooting && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Onsite Production Shoot:</span>
                    <span className="font-bold text-gray-900">{onsiteShootType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Onsite Package Price:</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                      Quotation Required (Pending Location Confirmation)
                    </span>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-500">Delivery Schedule:</span>
                <span className="font-bold text-gray-900">
                  {deadlineType === "urgent" ? `Urgent Priority (${urgentDeadlineDate || "Requested Date"})` : "Standard (48-72h)"}
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-100/60 rounded-xl text-[11px] text-blue-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold">Next Steps:</span> Once you submit this order, it will be securely recorded in your database and dispatched to our company intake system. Our creative director will message you on WhatsApp ({orderContactPhone || "+94..."}) to confirm assets and deliver your custom quotes.
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Order...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Place Content Order 🚀</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
