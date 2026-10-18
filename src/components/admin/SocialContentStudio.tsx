"use client";

import React, { useState, useEffect } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { ImageUploader } from "./ImageUploader";
import {
  Sparkles,
  Share2,
  Video,
  Layers,
  Plus,
  Search,
  Copy,
  Check,
  Trash2,
  Edit3,
  Eye,
  Download,
  RotateCcw,
  Play,
  Smartphone,
  Heart,
  MessageCircle,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Calendar,
  DollarSign,
  Truck,
  Tag,
  Package,
  Award,
  AlertCircle,
  X,
  FileText,
  Sliders,
  Wand2,
  CheckCircle2,
  Clock,
  Send,
  Zap,
  HelpCircle,
  Info,
  ShoppingCart
} from "lucide-react";

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

export interface StoryboardScene {
  sceneNumber: number;
  duration: string;
  visualDescription: string;
  onScreenText: string;
  voiceover: string;
}

export interface SocialContentItem {
  id: string;
  title: string;
  format: "post" | "reel" | "story";
  category: string;
  status: "draft" | "completed";
  language: string;
  tone: string;
  targetAudience?: string;
  callToAction?: string;
  additionalInstructions?: string;
  details: Record<string, any>;
  headline?: string;
  caption?: string;
  hashtags?: string;
  visualConcept?: string;
  image?: string;
  videoScript?: string;
  storyboard?: StoryboardScene[];
  orderStatus?: "not_ordered" | "order_placed" | "in_review" | "in_production" | "completed";
  orderContactName?: string;
  orderContactPhone?: string;
  orderContactEmail?: string;
  orderNotes?: string;
  orderPackageType?: string;
  orderDispatchedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

const CATEGORY_DEFINITIONS = [
  {
    id: "product-promotion",
    name: "Product Promotion",
    icon: Package,
    description: "Spotlight specific products with specifications, benefits, and verified prices.",
    color: "text-blue-600 bg-blue-50 border-blue-200"
  },
  {
    id: "special-offers",
    name: "Special Offers and Discounts",
    icon: Tag,
    description: "Promote seasonal discounts, bundle offers, coupon codes, and flash sales.",
    color: "text-red-600 bg-red-50 border-red-200"
  },
  {
    id: "about-business",
    name: "About the Business",
    icon: Award,
    description: "Share brand heritage, craftsmanship, unique selling points, and trusted service.",
    color: "text-amber-600 bg-amber-50 border-amber-200"
  },
  {
    id: "delivery-services",
    name: "Delivery Services",
    icon: Truck,
    description: "Highlight island-wide delivery, dispatch speeds, safe handling, and free shipping terms.",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200"
  },
  {
    id: "new-arrivals",
    name: "New Arrivals",
    icon: Sparkles,
    description: "Introduce the latest arrivals in luxury fittings, smart locks, or decorative boards.",
    color: "text-purple-600 bg-purple-50 border-purple-200"
  },
  {
    id: "customer-testimonials",
    name: "Customer Testimonials",
    icon: MessageCircle,
    description: "Showcase authentic client satisfaction, contractor reviews, and project transformations.",
    color: "text-pink-600 bg-pink-50 border-pink-200"
  },
  {
    id: "events-announcements",
    name: "Events and Announcements",
    icon: Calendar,
    description: "Broadcast showroom openings, exhibition booths, holiday schedules, and news.",
    color: "text-indigo-600 bg-indigo-50 border-indigo-200"
  },
  {
    id: "other",
    name: "Other / Custom",
    icon: FileText,
    description: "General brand updates, lifestyle tips, DIY hardware guides, and creative concepts.",
    color: "text-gray-600 bg-gray-50 border-gray-200"
  }
];

export const SocialContentStudio: React.FC = () => {
  const { products, offerProducts } = useAdminData();

  // Content List State
  const [items, setItems] = useState<SocialContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "ordered" | "completed">("all");
  const [formatFilter, setFormatFilter] = useState<"all" | "post" | "reel" | "story">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Order Placement Modal State
  const [orderModalItem, setOrderModalItem] = useState<SocialContentItem | null>(null);
  const [orderContactName, setOrderContactName] = useState("");
  const [orderContactPhone, setOrderContactPhone] = useState("");
  const [orderContactEmail, setOrderContactEmail] = useState("");
  const [orderPackageType, setOrderPackageType] = useState("Custom Graphic & Copy Design");
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderSuccessModal, setOrderSuccessModal] = useState<any | null>(null);

  // Modals / Flow State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedItemForView, setSelectedItemForView] = useState<SocialContentItem | null>(null);
  const [deleteTargetItem, setDeleteTargetItem] = useState<SocialContentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // AI & Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);
  const [aiProviderNotice, setAiProviderNotice] = useState<string>("");

  // Wizard Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [contentTitle, setContentTitle] = useState("");
  const [format, setFormat] = useState<"post" | "reel" | "story">("post");
  const [category, setCategory] = useState("product-promotion");
  const [enableAI, setEnableAI] = useState(true);

  // Common Settings
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Professional");
  const [targetAudience, setTargetAudience] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  // Category Specific Details
  const [details, setDetails] = useState<Record<string, any>>({});

  // Generated Content & Editors
  const [headline, setHeadline] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [visualConcept, setVisualConcept] = useState("");
  const [image, setImage] = useState("");
  const [videoScript, setVideoScript] = useState("");
  const [storyboard, setStoryboard] = useState<StoryboardScene[]>([]);
  const [previewTab, setPreviewTab] = useState<"post" | "reel" | "story">("post");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch initial content library
  const loadContent = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/social-content");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (e) {
      console.error("Failed to load social content:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Reset wizard form
  const resetWizard = () => {
    setEditingId(null);
    setContentTitle("");
    setFormat("post");
    setCategory("product-promotion");
    setEnableAI(true);
    setLanguage("English");
    setTone("Professional");
    setTargetAudience("");
    setCallToAction("Shop now at nanakamaraya.lk or message us on WhatsApp");
    setAdditionalInstructions("");
    setDetails({});
    setHeadline("");
    setCaption("");
    setHashtags("");
    setVisualConcept("");
    setImage("");
    setVideoScript("");
    setStoryboard([]);
    setWizardStep(1);
    setPreviewTab("post");
  };

  const handleOpenCreate = () => {
    resetWizard();
    setIsWizardOpen(true);
  };

  const handleOpenEdit = (item: SocialContentItem) => {
    setEditingId(item.id);
    setContentTitle(item.title);
    setFormat(item.format);
    setCategory(item.category);
    setLanguage(item.language || "English");
    setTone(item.tone || "Professional");
    setTargetAudience(item.targetAudience || "");
    setCallToAction(item.callToAction || "");
    setAdditionalInstructions(item.additionalInstructions || "");
    setDetails(item.details || {});
    setHeadline(item.headline || "");
    setCaption(item.caption || "");
    setHashtags(item.hashtags || "");
    setVisualConcept(item.visualConcept || "");
    setImage(item.image || "");
    setVideoScript(item.videoScript || "");
    setStoryboard(item.storyboard || []);
    setPreviewTab(item.format);
    setWizardStep(3); // Start directly at details or preview
    setIsWizardOpen(true);
  };

  // Autofill helpers
  const handleAutofillProduct = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    setDetails(prev => ({
      ...prev,
      productName: prod.name,
      description: prod.description || `${prod.name} high-grade hardware`,
      price: `${prod.price.toLocaleString()} LKR`,
      features: Object.entries(prod.specs || {}).map(([k, v]) => `${k}: ${v}`).join(", ") || "Durable construction, premium finish",
    }));
    if (prod.image && !image) setImage(prod.image);
    if (!contentTitle) setContentTitle(`${prod.name} Campaign`);
    showToast(`Autofilled details from "${prod.name}"!`);
  };

  const handleAutofillOffer = (offerId: string) => {
    const offer = offerProducts.find(o => o.id === offerId);
    if (!offer) return;
    setDetails(prev => ({
      ...prev,
      offerTitle: offer.name,
      discount: "Special Limited Discount",
      eligibleProducts: offer.sku ? `SKU: ${offer.sku}` : offer.name,
      terms: "Valid while stocks last.",
      dates: "This week only"
    }));
    if (offer.image && !image) setImage(offer.image);
    if (!contentTitle) setContentTitle(`Promo: ${offer.name}`);
    showToast(`Autofilled offer details from "${offer.name}"!`);
  };

  // AI Generation Function
  const handleGenerate = async (section: "all" | "caption" | "hashtags" | "visualConcept" | "script" | "hook" = "all") => {
    if (section === "all") {
      setIsGenerating(true);
    } else {
      setRegeneratingSection(section);
    }

    try {
      const res = await fetch("/api/social-content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format,
          category,
          language,
          tone,
          targetAudience,
          callToAction,
          additionalInstructions,
          details,
          section,
          existingContent: {
            headline,
            caption,
            hashtags,
            visualConcept,
            videoScript,
            storyboard
          }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      if (data.providerNotice) {
        setAiProviderNotice(data.providerNotice);
      }

      const gen = data.generated;
      if (section === "all") {
        setHeadline(gen.headline || "");
        setCaption(gen.caption || "");
        setHashtags(gen.hashtags || "");
        setVisualConcept(gen.visualConcept || "");
        setVideoScript(gen.videoScript || "");
        setStoryboard(gen.storyboard || []);
        setWizardStep(4);
        setPreviewTab(format);
        showToast("✨ AI Content generated successfully!");
      } else if (section === "caption") {
        setCaption(gen.caption || caption);
        showToast("Regenerated caption!");
      } else if (section === "hashtags") {
        setHashtags(gen.hashtags || hashtags);
        showToast("Regenerated hashtags!");
      } else if (section === "visualConcept") {
        setVisualConcept(gen.visualConcept || visualConcept);
        showToast("Regenerated visual concept!");
      } else if (section === "script") {
        setVideoScript(gen.videoScript || videoScript);
        setStoryboard(gen.storyboard || storyboard);
        showToast("Regenerated script & storyboard!");
      } else if (section === "hook") {
        setHeadline(gen.headline || headline);
        if (gen.storyboard && gen.storyboard.length > 0) {
          setStoryboard(gen.storyboard);
        }
        showToast("Regenerated hook!");
      }
    } catch (err: any) {
      alert(`Generation Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
      setRegeneratingSection(null);
    }
  };

  // Save content (Draft or Completed)
  const handleSave = async (status: "draft" | "completed") => {
    if (!contentTitle.trim()) {
      alert("Please provide a title for this content before saving.");
      return;
    }

    const payload = {
      id: editingId || `social-${Date.now()}`,
      title: contentTitle.trim(),
      format,
      category,
      status,
      language,
      tone,
      targetAudience,
      callToAction,
      additionalInstructions,
      details,
      headline,
      caption,
      hashtags,
      visualConcept,
      image,
      videoScript,
      storyboard
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/social-content/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Failed to update content");
        setItems(prev => prev.map(item => item.id === editingId ? { ...item, ...payload, updatedAt: new Date().toISOString() } : item));
        showToast(`Saved changes as ${status === "completed" ? "Completed" : "Draft"}!`);
      } else {
        const res = await fetch("/api/social-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Failed to create content");
        const newItem = await res.json();
        setItems(prev => [newItem, ...prev]);
        showToast(`Created new content as ${status === "completed" ? "Completed" : "Draft"}!`);
      }
      setIsWizardOpen(false);
      resetWizard();
    } catch (e: any) {
      alert(`Save Failed: ${e.message}`);
    }
  };

  // Order Placement Handlers
  const handleOpenOrderModal = (item: SocialContentItem) => {
    setOrderModalItem(item);
    setOrderContactName(item.orderContactName || "");
    setOrderContactPhone(item.orderContactPhone || "");
    setOrderContactEmail(item.orderContactEmail || "");
    setOrderPackageType(item.orderPackageType || (item.format === "reel" ? "Reels & Video Production Pack" : "Custom Graphic & Copy Design"));
    setOrderNotes(item.orderNotes || "");
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderModalItem) return;

    if (!orderContactName.trim() || !orderContactPhone.trim()) {
      alert("Please enter your name and phone / WhatsApp number.");
      return;
    }

    setIsSubmittingOrder(true);
    try {
      const res = await fetch("/api/social-content/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: orderModalItem.id,
          contactName: orderContactName.trim(),
          contactPhone: orderContactPhone.trim(),
          contactEmail: orderContactEmail.trim(),
          packageType: orderPackageType,
          notes: orderNotes.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit order");

      setItems(prev => prev.map(item => item.id === orderModalItem.id ? {
        ...item,
        orderStatus: "order_placed",
        orderContactName: orderContactName.trim(),
        orderContactPhone: orderContactPhone.trim(),
        orderContactEmail: orderContactEmail.trim(),
        orderPackageType: orderPackageType,
        orderNotes: orderNotes.trim(),
        orderDispatchedAt: new Date().toISOString()
      } : item));

      setOrderModalItem(null);
      setOrderSuccessModal(data);
      showToast(`🚀 Order placed successfully! Reference: ${data.orderId}`);
    } catch (err: any) {
      alert(`Order submission error: ${err.message}`);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // Duplicate handler
  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/social-content/${id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to duplicate content");
      const duplicated = await res.json();
      setItems(prev => [duplicated, ...prev]);
      showToast(`Duplicated "${duplicated.title}" as draft!`);
    } catch (e: any) {
      alert(`Duplicate failed: ${e.message}`);
    }
  };

  // Delete handler
  const handleDeleteConfirm = async () => {
    if (!deleteTargetItem) return;
    try {
      const res = await fetch(`/api/social-content/${deleteTargetItem.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
      setItems(prev => prev.filter(i => i.id !== deleteTargetItem.id));
      showToast(`Deleted "${deleteTargetItem.title}"`);
      setDeleteTargetItem(null);
    } catch (e: any) {
      alert(`Delete failed: ${e.message}`);
    }
  };

  // Copy to clipboard
  const handleCopyText = (text: string, label: string, idTag: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idTag);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Export / Download
  const handleDownloadText = (item: Partial<SocialContentItem>) => {
    const exportData = `
=========================================
NANAKAMARAYA SOCIAL MARKETING ASSET
=========================================
Title: ${item.title || contentTitle}
Format: ${item.format?.toUpperCase()}
Category: ${item.category}
Language: ${item.language} | Tone: ${item.tone}
Created: ${new Date().toLocaleDateString()}
-----------------------------------------
HEADLINE:
${item.headline || "N/A"}

CAPTION:
${item.caption || "N/A"}

HASHTAGS:
${item.hashtags || "N/A"}

CALL TO ACTION:
${item.callToAction || "N/A"}

VISUAL ART DIRECTION / CONCEPT:
${item.visualConcept || "N/A"}

${item.format === "reel" ? `
VIDEO SCRIPT (Voiceover):
${item.videoScript || "N/A"}

STORYBOARD SCENES:
${(item.storyboard || []).map((s: any) => `
[Scene ${s.sceneNumber} (${s.duration})]
Visual: ${s.visualDescription}
On-Screen Text: ${s.onScreenText}
Voiceover: ${s.voiceover}
`).join("\n")}
` : ""}
=========================================
`;

    const blob = new Blob([exportData.trim()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `social_${(item.title || "content").toLowerCase().replace(/[^a-z0-9]/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded content copy asset (.txt)");
  };

  // Filtered Items
  const filteredItems = items.filter(item => {
    if (statusFilter === "draft" && item.status !== "draft") return false;
    if (statusFilter === "completed" && item.status !== "completed") return false;
    if (statusFilter === "ordered" && item.orderStatus !== "order_placed") return false;
    if (formatFilter !== "all" && item.format !== formatFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchHeadline = (item.headline || "").toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      if (!matchTitle && !matchHeadline && !matchCategory) return false;
    }
    return true;
  });

  const totalCount = items.length;
  const draftsCount = items.filter(i => i.status === "draft").length;
  const orderedCount = items.filter(i => i.orderStatus === "order_placed").length;
  const completedCount = items.filter(i => i.status === "completed").length;

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-700 animate-in fade-in slide-in-from-bottom-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#1877F2] rounded-xl">
              <FacebookIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">Social Content Studio</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Create engaging social media content for your business with AI, or order custom production from our team.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleOpenOrderModal({
              id: "new-custom-order",
              title: "Custom Social Media Content Order",
              format: "post",
              category: "other",
              status: "draft",
              language: "English",
              tone: "Professional",
              details: {}
            })}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer"
            title="Place an order for professional graphic design, reels production, or campaign management"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Order from Our Team</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Content</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Content</span>
            <div className="text-3xl font-black text-gray-900 mt-1">{totalCount}</div>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Posts, Reels & Stories generated</span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">Drafts</span>
            <div className="text-3xl font-black text-amber-600 mt-1">{draftsCount}</div>
            <span className="text-[11px] text-gray-500 mt-0.5 block">In-progress concepts</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs flex items-center justify-between relative overflow-hidden">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
              <span>Orders Placed</span>
              <span className="px-1 py-0.2 bg-blue-100 text-blue-700 text-[9px] font-black rounded uppercase">Agency</span>
            </span>
            <div className="text-3xl font-black text-blue-700 mt-1">{orderedCount}</div>
            <span className="text-[11px] text-blue-600 font-medium mt-0.5 block">Ordered for company production</span>
          </div>
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">Completed Content</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">{completedCount}</div>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Ready to publish to social media</span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Content Library Toolbar & Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-lg text-xs font-bold flex-wrap">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === "all" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Content ({items.length})
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === "draft" ? "bg-white text-amber-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Drafts ({draftsCount})
            </button>
            <button
              onClick={() => setStatusFilter("ordered")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === "ordered" ? "bg-blue-600 text-white shadow-xs" : "text-blue-700 hover:text-blue-900"
              }`}
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Orders Placed ({orderedCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === "completed" ? "bg-white text-emerald-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search content by title or category..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-gray-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Format Filter Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 text-xs">
          <span className="text-gray-400 font-semibold text-[11px] uppercase tracking-wider">Format:</span>
          <button
            onClick={() => setFormatFilter("all")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
              formatFilter === "all" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Formats
          </button>
          <button
            onClick={() => setFormatFilter("post")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              formatFilter === "post" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Share2 className="w-3 h-3" />
            <span>Social Post</span>
          </button>
          <button
            onClick={() => setFormatFilter("reel")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              formatFilter === "reel" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Video className="w-3 h-3" />
            <span>Reels & Video</span>
          </button>
          <button
            onClick={() => setFormatFilter("story")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              formatFilter === "story" ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span>Story</span>
          </button>
        </div>
      </div>

      {/* Content Library Grid */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="inline-block p-4 bg-red-50 text-red-600 rounded-full animate-spin mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-gray-600">Loading Social Content Studio Library...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-gray-900">No Content Found</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-5">
            {searchQuery
              ? `No social content matching "${searchQuery}". Try a different search term or clear filters.`
              : "Start by creating your first AI-powered social media post, reel concept, or story!"}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Content</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => {
            const catDef = CATEGORY_DEFINITIONS.find(c => c.id === item.category) || CATEGORY_DEFINITIONS[0];
            const CatIcon = catDef.icon;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Thumbnail / Header Preview */}
                  <div className="relative h-44 bg-gradient-to-tr from-gray-900 to-gray-800 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-white/80">
                        <Sparkles className="w-8 h-8 text-amber-400 mb-2" />
                        <span className="text-xs font-serif font-bold line-clamp-2">{item.headline || item.title}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Format Badge Top Left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-xs flex items-center gap-1 text-white ${
                        item.format === "reel" ? "bg-purple-600/90" : item.format === "story" ? "bg-amber-600/90" : "bg-blue-600/90"
                      }`}>
                        {item.format === "reel" ? <Video className="w-3 h-3" /> : item.format === "story" ? <Smartphone className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
                        <span>{item.format === "reel" ? "Reel / Video" : item.format === "story" ? "Story" : "Social Post"}</span>
                      </span>
                    </div>

                    {/* Status Badge Top Right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {item.orderStatus === "order_placed" && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-xs flex items-center gap-1">
                          <ShoppingCart className="w-2.5 h-2.5" />
                          <span>Ordered</span>
                        </span>
                      )}
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                        item.status === "completed"
                          ? "bg-emerald-600 text-white"
                          : "bg-amber-500 text-white"
                      }`}>
                        {item.status === "completed" ? "Completed" : "Draft"}
                      </span>
                    </div>

                    {/* Card Title on bottom of thumbnail */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1">
                        <CatIcon className="w-3 h-3" />
                        {catDef.name}
                      </span>
                      <h3 className="font-serif font-bold text-sm text-white line-clamp-1 mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-4 space-y-3">
                    {item.headline && (
                      <p className="text-xs font-bold text-gray-900 line-clamp-1">
                        &ldquo;{item.headline}&rdquo;
                      </p>
                    )}

                    <p className="text-[11px] text-gray-600 line-clamp-3 leading-relaxed whitespace-pre-line">
                      {item.caption || item.visualConcept || "No caption generated yet."}
                    </p>

                    {item.hashtags && (
                      <p className="text-[10px] text-blue-600 font-mono line-clamp-1 font-medium">
                        {item.hashtags}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                      <span>{item.language} • {item.tone}</span>
                      <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Just now"}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedItemForView(item)}
                      className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                      title="View Full Content & Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopyText(`${item.caption || ""}\n\n${item.hashtags || ""}`, "Caption & Hashtags", item.id)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                      title="Copy Caption & Hashtags"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDownloadText(item)}
                      className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                      title="Download Text Copy (.txt)"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenOrderModal(item)}
                      className="px-2.5 py-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                      title="Order professional content creation from our agency team"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>{item.orderStatus === "order_placed" ? "Re-order" : "Order"}</span>
                    </button>
                    <button
                      onClick={() => handleDuplicate(item.id)}
                      className="px-2.5 py-1 text-[11px] font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-md transition-colors cursor-pointer"
                      title="Duplicate as new draft"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-2.5 py-1 text-[11px] font-bold text-white bg-gray-900 hover:bg-black rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteTargetItem(item)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      title="Delete Content"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT WIZARD MODAL */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-5xl my-auto overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-red-100 text-red-700 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-gray-900">
                    {editingId ? "Edit Social Marketing Content" : "Create Social Marketing Content with AI"}
                  </h2>
                  <p className="text-[11px] text-gray-500">
                    Step {wizardStep} of 4 • {wizardStep === 1 ? "Select Format" : wizardStep === 2 ? "Select Category" : wizardStep === 3 ? "Enter Details" : "AI Studio & Live Preview"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWizardOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 border-b border-gray-200 text-center text-xs font-bold">
              <div className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                wizardStep === 1 ? "border-red-600 text-red-600 bg-red-50/40" : wizardStep > 1 ? "border-emerald-600 text-emerald-700" : "border-transparent text-gray-400"
              }`}>
                <span>1. Format</span>
              </div>
              <div className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                wizardStep === 2 ? "border-red-600 text-red-600 bg-red-50/40" : wizardStep > 2 ? "border-emerald-600 text-emerald-700" : "border-transparent text-gray-400"
              }`}>
                <span>2. Category</span>
              </div>
              <div className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                wizardStep === 3 ? "border-red-600 text-red-600 bg-red-50/40" : wizardStep > 3 ? "border-emerald-600 text-emerald-700" : "border-transparent text-gray-400"
              }`}>
                <span>3. Details</span>
              </div>
              <div className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                wizardStep === 4 ? "border-red-600 text-red-600 bg-red-50/40" : "border-transparent text-gray-400"
              }`}>
                <span>4. AI Studio & Preview</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              
              {/* STEP 1: SELECT FORMAT */}
              {wizardStep === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Choose Your Content Format</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Select the primary media type you want to create for your marketing campaign.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Format Card: Post */}
                    <div
                      onClick={() => setFormat("post")}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        format === "post"
                          ? "border-red-600 bg-red-50/20 shadow-md ring-2 ring-red-600/20"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-3">
                        <Share2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900">Social Media Post</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        Create promotional graphics and engaging captions for Facebook, Instagram, and LinkedIn feeds.
                      </p>
                      <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-semibold text-gray-500 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                        <span>Captions, Headlines, Hashtags & Visual Concept</span>
                      </div>
                      {format === "post" && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Format Card: Reel */}
                    <div
                      onClick={() => setFormat("reel")}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        format === "reel"
                          ? "border-red-600 bg-red-50/20 shadow-md ring-2 ring-red-600/20"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-3">
                        <Video className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900">Reel / Short Video</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        Create a viral video concept, 0-3s hook, full voiceover script, and scene-by-scene storyboard.
                      </p>
                      <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-semibold text-gray-500 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-purple-600" />
                        <span>Hook, Script, Scene Storyboard & Audio</span>
                      </div>
                      {format === "reel" && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Format Card: Story */}
                    <div
                      onClick={() => setFormat("story")}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        format === "story"
                          ? "border-red-600 bg-red-50/20 shadow-md ring-2 ring-red-600/20"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-3">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900">Story</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        Create short-form 9:16 vertical content designed for 24-hour engagement, polls, and link stickers.
                      </p>
                      <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-semibold text-gray-500 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                        <span>Interactive Stickers, Quick CTAs & Visual Layout</span>
                      </div>
                      {format === "story" && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Generation Toggle Setting (Separate from format) */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 text-red-700 rounded-lg">
                        <Wand2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900">Enable AI Marketing Content Generation</h5>
                        <p className="text-[11px] text-gray-500">
                          Automatically generate professional headlines, captions, hashtags, visual concept direction, and scripts.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableAI}
                        onChange={e => setEnableAI(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-700"></div>
                    </label>
                  </div>

                  {/* Campaign Title Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      Campaign / Content Title <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contentTitle}
                      onChange={e => setContentTitle(e.target.value)}
                      placeholder="e.g. Luxury Pull-Down Tap Summer Promo, Smart Locks Feature Video..."
                      className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none font-medium"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT CATEGORY */}
              {wizardStep === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Select Content Category</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Choose what your content is about. The selected category will customize the form fields in the next step.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {CATEGORY_DEFINITIONS.map(cat => {
                      const Icon = cat.icon;
                      const isSelected = category === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => setCategory(cat.id)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                            isSelected
                              ? "border-red-600 bg-red-50/20 shadow-sm ring-2 ring-red-600/20"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${cat.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h4 className="text-xs font-bold text-gray-900">{cat.name}</h4>
                            <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                              {cat.description}
                            </p>
                          </div>

                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: DYNAMIC DETAILS FORM */}
              {wizardStep === 3 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Enter Details for &ldquo;{CATEGORY_DEFINITIONS.find(c => c.id === category)?.name}&rdquo;
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      The AI strictly adheres to these details and will never invent product prices, discounts, or specifications.
                    </p>
                  </div>

                  {/* Optional Autofill Toolbar for Product & Offer categories */}
                  {category === "product-promotion" && products.length > 0 && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-2 text-blue-900 font-bold">
                        <Package className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Quick Pick from Catalog Products:</span>
                      </div>
                      <select
                        onChange={e => {
                          if (e.target.value) handleAutofillProduct(e.target.value);
                        }}
                        defaultValue=""
                        className="p-1.5 bg-white border border-blue-300 rounded-md text-xs font-semibold focus:outline-none"
                      >
                        <option value="" disabled>Select a catalog product to autofill...</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} (Rs. {p.price.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {category === "special-offers" && offerProducts.length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-2 text-red-900 font-bold">
                        <Tag className="w-4 h-4 text-red-600 shrink-0" />
                        <span>Quick Pick from Offer Items:</span>
                      </div>
                      <select
                        onChange={e => {
                          if (e.target.value) handleAutofillOffer(e.target.value);
                        }}
                        defaultValue=""
                        className="p-1.5 bg-white border border-red-300 rounded-md text-xs font-semibold focus:outline-none"
                      >
                        <option value="" disabled>Select an offer product to autofill...</option>
                        {offerProducts.map(o => (
                          <option key={o.id} value={o.id}>
                            {o.name} ({o.priceLkr})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* DYNAMIC CATEGORY FIELDS */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 border-b pb-2">
                      Specific Content Parameters
                    </h4>

                    {/* 1. Product Promotion */}
                    {category === "product-promotion" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <label className="block text-gray-700 mb-1">Product Name <span className="text-red-600">*</span></label>
                          <input
                            type="text"
                            required
                            value={details.productName || ""}
                            onChange={e => setDetails({ ...details, productName: e.target.value })}
                            placeholder="e.g. Matte Black Pull-Down Sink Mixer"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Price (Strict Fact)</label>
                          <input
                            type="text"
                            value={details.price || ""}
                            onChange={e => setDetails({ ...details, price: e.target.value })}
                            placeholder="e.g. 24,900 LKR or Rs. 24,900"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-1">Product Description</label>
                          <textarea
                            rows={2}
                            value={details.description || ""}
                            onChange={e => setDetails({ ...details, description: e.target.value })}
                            placeholder="Briefly describe what makes this product special..."
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-1">Product Features & Benefits</label>
                          <textarea
                            rows={2}
                            value={details.features || ""}
                            onChange={e => setDetails({ ...details, features: e.target.value })}
                            placeholder="e.g. 360-degree swivel, ceramic disc cartridge, 5-year replacement guarantee"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 2. Special Offers and Discounts */}
                    {category === "special-offers" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <label className="block text-gray-700 mb-1">Offer Title <span className="text-red-600">*</span></label>
                          <input
                            type="text"
                            required
                            value={details.offerTitle || ""}
                            onChange={e => setDetails({ ...details, offerTitle: e.target.value })}
                            placeholder="e.g. Weekend Flash Sale on Luxury Showers"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Discount Amount or Percentage <span className="text-red-600">*</span></label>
                          <input
                            type="text"
                            required
                            value={details.discount || ""}
                            onChange={e => setDetails({ ...details, discount: e.target.value })}
                            placeholder="e.g. 20% OFF or Save up to Rs. 5,000"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Eligible Products or Services</label>
                          <input
                            type="text"
                            value={details.eligibleProducts || ""}
                            onChange={e => setDetails({ ...details, eligibleProducts: e.target.value })}
                            placeholder="e.g. All Kohler & Delta shower heads"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Offer Start & End Dates</label>
                          <input
                            type="text"
                            value={details.dates || ""}
                            onChange={e => setDetails({ ...details, dates: e.target.value })}
                            placeholder="e.g. This Saturday to Sunday (2 Days Only)"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-1">Terms & Conditions</label>
                          <input
                            type="text"
                            value={details.terms || ""}
                            onChange={e => setDetails({ ...details, terms: e.target.value })}
                            placeholder="e.g. While stocks last. Cannot be combined with other coupons."
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 3. About the Business */}
                    {category === "about-business" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <label className="block text-gray-700 mb-1">Business Name</label>
                          <input
                            type="text"
                            value={details.businessName || "Nanakamaraya / M.M. Noorbhoy & Co"}
                            onChange={e => setDetails({ ...details, businessName: e.target.value })}
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Main Services & Product Lines</label>
                          <input
                            type="text"
                            value={details.services || ""}
                            onChange={e => setDetails({ ...details, services: e.target.value })}
                            placeholder="e.g. Architectural locks, sanitaryware, fluted wall panels"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-1">Unique Selling Points (USPs)</label>
                          <textarea
                            rows={2}
                            value={details.usps || ""}
                            onChange={e => setDetails({ ...details, usps: e.target.value })}
                            placeholder="e.g. 50+ years of hardware excellence, islandwide delivery, authentic global brands"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 4. Delivery Services */}
                    {category === "delivery-services" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <label className="block text-gray-700 mb-1">Delivery Areas</label>
                          <input
                            type="text"
                            value={details.areas || "Islandwide across Sri Lanka"}
                            onChange={e => setDetails({ ...details, areas: e.target.value })}
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Estimated Delivery Times</label>
                          <input
                            type="text"
                            value={details.times || "2 - 3 Business Days"}
                            onChange={e => setDetails({ ...details, times: e.target.value })}
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Delivery Fees</label>
                          <input
                            type="text"
                            value={details.fees || ""}
                            onChange={e => setDetails({ ...details, fees: e.target.value })}
                            placeholder="e.g. Standard rate Rs. 500 or Free Delivery"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Free Delivery Conditions</label>
                          <input
                            type="text"
                            value={details.freeDeliveryConditions || ""}
                            onChange={e => setDetails({ ...details, freeDeliveryConditions: e.target.value })}
                            placeholder="e.g. On all orders over Rs. 15,000"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 5. New Arrivals */}
                    {category === "new-arrivals" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <label className="block text-gray-700 mb-1">New Product or Service Name <span className="text-red-600">*</span></label>
                          <input
                            type="text"
                            required
                            value={details.newProductName || ""}
                            onChange={e => setDetails({ ...details, newProductName: e.target.value })}
                            placeholder="e.g. Smart 3D Face Recognition Door Lock"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Price</label>
                          <input
                            type="text"
                            value={details.price || ""}
                            onChange={e => setDetails({ ...details, price: e.target.value })}
                            placeholder="e.g. Rs. 54,900"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-1">Main Features & Specs</label>
                          <textarea
                            rows={2}
                            value={details.mainFeatures || ""}
                            onChange={e => setDetails({ ...details, mainFeatures: e.target.value })}
                            placeholder="e.g. 3D infrared face unlock, mobile app intercom, 6-month battery"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 6. Customer Testimonials */}
                    {category === "customer-testimonials" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-1">Customer Feedback Text / Quote <span className="text-red-600">*</span></label>
                          <textarea
                            rows={3}
                            required
                            value={details.customerFeedback || ""}
                            onChange={e => setDetails({ ...details, customerFeedback: e.target.value })}
                            placeholder="e.g. 'The biometric lock from Nanakamaraya is phenomenal. The installation in Rajagiriya was smooth, and keyless access is so convenient!'"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Customer Name (Authorized only)</label>
                          <input
                            type="text"
                            value={details.customerName || ""}
                            onChange={e => setDetails({ ...details, customerName: e.target.value })}
                            placeholder="e.g. Dr. H. Perera, Colombo"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Related Product or Service</label>
                          <input
                            type="text"
                            value={details.productName || ""}
                            onChange={e => setDetails({ ...details, productName: e.target.value })}
                            placeholder="e.g. Biometric Mortise Lock"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 7. Events and Announcements */}
                    {category === "events-announcements" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <label className="block text-gray-700 mb-1">Event / Announcement Title <span className="text-red-600">*</span></label>
                          <input
                            type="text"
                            required
                            value={details.eventTitle || ""}
                            onChange={e => setDetails({ ...details, eventTitle: e.target.value })}
                            placeholder="e.g. New Experience Showroom Opening"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Date & Time</label>
                          <input
                            type="text"
                            value={details.eventDateTime || ""}
                            onChange={e => setDetails({ ...details, eventDateTime: e.target.value })}
                            placeholder="e.g. Saturday, October 25th, 10:00 AM"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={details.eventLocation || ""}
                            onChange={e => setDetails({ ...details, eventLocation: e.target.value })}
                            placeholder="e.g. M.M. Noorbhoy & Co Showroom, Colombo 03"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 8. Other */}
                    {category === "other" && (
                      <div className="text-xs font-semibold space-y-3">
                        <label className="block text-gray-700 mb-1">Description & Key Messaging <span className="text-red-600">*</span></label>
                        <textarea
                          rows={4}
                          required
                          value={details.customNotes || ""}
                          onChange={e => setDetails({ ...details, customNotes: e.target.value })}
                          placeholder="Describe the main topic, product highlights, tips, or announcement..."
                          className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Visual / Image Upload (Supported for all categories) */}
                    <div className="pt-3 border-t">
                      <ImageUploader
                        value={image}
                        onChange={setImage}
                        label="Upload Campaign Image or Select from Store"
                      />
                    </div>
                  </div>

                  {/* COMMON SETTINGS */}
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 border-b pb-2">
                      Common Tone & Audience Settings
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold">
                      <div>
                        <label className="block text-gray-700 mb-1">Content Language</label>
                        <select
                          value={language}
                          onChange={e => setLanguage(e.target.value)}
                          className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                        >
                          <option value="English">English</option>
                          <option value="Sinhala">Sinhala (සිංහල)</option>
                          <option value="Tamil">Tamil (தமிழ்)</option>
                          <option value="English and Sinhala">English and Sinhala (Bilingual)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Tone of Voice</label>
                        <select
                          value={tone}
                          onChange={e => setTone(e.target.value)}
                          className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                        >
                          <option value="Professional">Professional & Corporate</option>
                          <option value="Friendly">Friendly & Approachable</option>
                          <option value="Exciting">Exciting & High-Energy</option>
                          <option value="Educational">Educational & Informative</option>
                          <option value="Luxury">Luxury & Prestigious</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Target Audience</label>
                        <input
                          type="text"
                          value={targetAudience}
                          onChange={e => setTargetAudience(e.target.value)}
                          placeholder="e.g. Homeowners, Architects, Contractors"
                          className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-gray-700 mb-1">Preferred Call to Action (CTA)</label>
                        <input
                          type="text"
                          value={callToAction}
                          onChange={e => setCallToAction(e.target.value)}
                          placeholder="e.g. Shop now at nanakamaraya.lk or WhatsApp us at 077 123 4567"
                          className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-gray-700 mb-1">Additional Instructions (Optional)</label>
                        <input
                          type="text"
                          value={additionalInstructions}
                          onChange={e => setAdditionalInstructions(e.target.value)}
                          placeholder="e.g. Highlight warranty, focus on water-saving features, include emojis..."
                          className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Prominent Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isGenerating}
                      onClick={() => handleGenerate("all")}
                      className="w-full py-3.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 disabled:opacity-50 text-white rounded-xl text-sm font-black flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <RotateCcw className="w-5 h-5 animate-spin" />
                          <span>AI is Crafting Your Marketing Content...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-amber-300" />
                          <span>Generate Content with AI</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: AI STUDIO & LIVE PREVIEW */}
              {wizardStep === 4 && (
                <div className="space-y-6 animate-in fade-in">
                  
                  {/* AI Status Banner */}
                  <div className="p-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-semibold">{aiProviderNotice || "Marketing copy generated adhering strictly to provided facts."}</span>
                    </div>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">
                      Zero Hallucination Mode
                    </span>
                  </div>

                  {/* Dual Column Layout: Left Editor, Right Device Mockup */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* LEFT COLUMN: Editable Sections with Individual Regeneration */}
                    <div className="lg:col-span-7 space-y-4">
                      
                      {/* Section 1: Headline */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                            <span>Headline / Hook</span>
                          </label>
                          <button
                            type="button"
                            disabled={regeneratingSection === "hook"}
                            onClick={() => handleGenerate("hook")}
                            className="text-[11px] font-bold text-red-700 hover:text-red-800 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            <RotateCcw className={`w-3 h-3 ${regeneratingSection === "hook" ? "animate-spin" : ""}`} />
                            <span>Regenerate Hook</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          value={headline}
                          onChange={e => setHeadline(e.target.value)}
                          className="w-full p-2.5 text-xs font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>

                      {/* Section 2: Caption */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-900">Caption Text</label>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleCopyText(caption, "Caption", "caption-edit")}
                              className="text-[11px] font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedId === "caption-edit" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              <span>Copy Caption</span>
                            </button>
                            <button
                              type="button"
                              disabled={regeneratingSection === "caption"}
                              onClick={() => handleGenerate("caption")}
                              className="text-[11px] font-bold text-red-700 hover:text-red-800 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              <RotateCcw className={`w-3 h-3 ${regeneratingSection === "caption" ? "animate-spin" : ""}`} />
                              <span>Regenerate Caption</span>
                            </button>
                          </div>
                        </div>
                        <textarea
                          rows={6}
                          value={caption}
                          onChange={e => setCaption(e.target.value)}
                          className="w-full p-2.5 text-xs font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none leading-relaxed font-sans"
                        />
                      </div>

                      {/* Section 3: Hashtags */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-900">Hashtags</label>
                          <button
                            type="button"
                            disabled={regeneratingSection === "hashtags"}
                            onClick={() => handleGenerate("hashtags")}
                            className="text-[11px] font-bold text-red-700 hover:text-red-800 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            <RotateCcw className={`w-3 h-3 ${regeneratingSection === "hashtags" ? "animate-spin" : ""}`} />
                            <span>Regenerate Hashtags</span>
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={hashtags}
                          onChange={e => setHashtags(e.target.value)}
                          className="w-full p-2.5 text-xs font-mono text-blue-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>

                      {/* Section 4: Visual Concept Direction */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-900">Art Direction / Visual Concept</label>
                          <button
                            type="button"
                            disabled={regeneratingSection === "visualConcept"}
                            onClick={() => handleGenerate("visualConcept")}
                            className="text-[11px] font-bold text-red-700 hover:text-red-800 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            <RotateCcw className={`w-3 h-3 ${regeneratingSection === "visualConcept" ? "animate-spin" : ""}`} />
                            <span>Regenerate Visual Concept</span>
                          </button>
                        </div>
                        <textarea
                          rows={3}
                          value={visualConcept}
                          onChange={e => setVisualConcept(e.target.value)}
                          className="w-full p-2.5 text-xs text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>

                      {/* Section 5: Reel Video Script & Scene Storyboard (For Reels) */}
                      {format === "reel" && (
                        <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-xs space-y-4">
                          <div className="flex items-center justify-between border-b pb-2">
                            <label className="text-xs font-black text-purple-900 flex items-center gap-1.5 uppercase tracking-wider">
                              <Video className="w-4 h-4 text-purple-600" />
                              <span>Reel Script & Scene Storyboard</span>
                            </label>
                            <button
                              type="button"
                              disabled={regeneratingSection === "script"}
                              onClick={() => handleGenerate("script")}
                              className="text-[11px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              <RotateCcw className={`w-3 h-3 ${regeneratingSection === "script" ? "animate-spin" : ""}`} />
                              <span>Regenerate Script & Scenes</span>
                            </button>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 mb-1">Full Voiceover Script</label>
                            <textarea
                              rows={4}
                              value={videoScript}
                              onChange={e => setVideoScript(e.target.value)}
                              className="w-full p-2.5 text-xs font-mono text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                            />
                          </div>

                          {/* Storyboard Scene Cards */}
                          {storyboard.length > 0 && (
                            <div className="space-y-2">
                              <label className="block text-[11px] font-bold text-gray-700">Scene-by-Scene Timeline</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {storyboard.map((scene, idx) => (
                                  <div key={idx} className="p-3 bg-purple-50/50 rounded-lg border border-purple-100 text-[11px] space-y-1">
                                    <div className="flex items-center justify-between font-bold text-purple-900">
                                      <span>Scene {scene.sceneNumber || idx + 1}</span>
                                      <span className="text-[10px] bg-purple-200/60 px-1.5 py-0.5 rounded">{scene.duration}</span>
                                    </div>
                                    <p className="text-gray-600"><span className="font-semibold text-gray-800">Visual:</span> {scene.visualDescription}</p>
                                    <p className="text-purple-700 font-semibold"><span className="text-gray-800 font-normal">Text:</span> &ldquo;{scene.onScreenText}&rdquo;</p>
                                    <p className="text-gray-500 italic"><span className="not-italic font-semibold text-gray-800">Audio:</span> {scene.voiceover}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Image Selector / Replacement */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                        <ImageUploader
                          value={image}
                          onChange={setImage}
                          label="Campaign Graphic / Product Image"
                        />
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Realistic Live Device Mockup */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                      
                      {/* Device / Format Switcher */}
                      <div className="w-full flex items-center justify-between p-1.5 bg-gray-100 rounded-xl mb-4 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setPreviewTab("post")}
                          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            previewTab === "post" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Post Mockup</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab("reel")}
                          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            previewTab === "reel" ? "bg-white text-purple-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Reels 9:16</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab("story")}
                          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            previewTab === "story" ? "bg-white text-amber-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Story 9:16</span>
                        </button>
                      </div>

                      {/* MOCKUP 1: Social Media Post (Instagram / Facebook Style) */}
                      {previewTab === "post" && (
                        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-300 shadow-xl overflow-hidden font-sans">
                          {/* Feed Header */}
                          <div className="p-3 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-2.5">
                              <img
                                src="/logo.png"
                                alt="Profile"
                                className="w-8 h-8 rounded-full border border-gray-200 object-contain p-0.5 bg-gray-900"
                              />
                              <div>
                                <h4 className="text-xs font-bold text-gray-900">nanakamaraya.lk</h4>
                                <span className="text-[10px] text-gray-400">Sponsored • Colombo, Sri Lanka</span>
                              </div>
                            </div>
                            <span className="text-gray-400 text-xs font-bold cursor-pointer">•••</span>
                          </div>

                          {/* Post Media Area */}
                          <div className="relative aspect-square bg-gray-900 overflow-hidden flex items-center justify-center">
                            {image ? (
                              <img src={image} alt="Creative" className="w-full h-full object-cover" />
                            ) : (
                              <div className="p-6 text-center text-white space-y-2">
                                <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
                                <h5 className="font-serif font-bold text-sm">{headline || contentTitle}</h5>
                                <p className="text-[10px] text-gray-400 line-clamp-3">{visualConcept}</p>
                              </div>
                            )}

                            {/* Headline Banner Overlay */}
                            {headline && (
                              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                                <p className="text-xs font-bold font-serif leading-tight">{headline}</p>
                              </div>
                            )}
                          </div>

                          {/* Action Bar */}
                          <div className="p-3 border-b border-gray-100 flex items-center justify-between text-gray-700">
                            <div className="flex items-center gap-3">
                              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                              <MessageCircle className="w-5 h-5" />
                              <Send className="w-5 h-5" />
                            </div>
                            <Bookmark className="w-5 h-5" />
                          </div>

                          {/* Caption Preview */}
                          <div className="p-3 text-xs space-y-1.5 max-h-52 overflow-y-auto">
                            <p className="text-gray-900 whitespace-pre-line leading-relaxed">
                              <span className="font-bold mr-1.5">nanakamaraya.lk</span>
                              {caption || "Your generated caption will preview here..."}
                            </p>
                            {hashtags && (
                              <p className="text-blue-700 font-mono text-[11px]">{hashtags}</p>
                            )}
                          </div>

                          {/* CTA Button */}
                          <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-gray-700 line-clamp-1">
                              {callToAction || "Shop Now at nanakamaraya.lk"}
                            </span>
                            <span className="px-3 py-1 bg-red-700 text-white rounded text-[10px] font-bold uppercase shrink-0">
                              Order
                            </span>
                          </div>
                        </div>
                      )}

                      {/* MOCKUP 2: Reels / Video (9:16 Vertical Smartphone Frame) */}
                      {previewTab === "reel" && (
                        <div className="w-full max-w-[280px] aspect-[9/16] bg-black rounded-[36px] p-2.5 shadow-2xl border-4 border-gray-800 relative overflow-hidden flex flex-col justify-between text-white">
                          
                          {/* Phone Top Notch */}
                          <div className="absolute top-3 inset-x-0 flex justify-center z-20">
                            <div className="w-20 h-4 bg-gray-900 rounded-full" />
                          </div>

                          {/* Background Media */}
                          <div className="absolute inset-0">
                            {image ? (
                              <img src={image} alt="Reel visual" className="w-full h-full object-cover opacity-80" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-purple-950 via-gray-900 to-black flex items-center justify-center p-4 text-center">
                                <Video className="w-10 h-10 text-purple-400 mb-2 opacity-60" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
                          </div>

                          {/* Reel Top Bar */}
                          <div className="relative z-10 pt-7 px-3 flex items-center justify-between text-xs font-bold">
                            <span className="flex items-center gap-1.5 text-white/90">
                              <Video className="w-3.5 h-3.5 text-purple-400" />
                              <span>Reels</span>
                            </span>
                            <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded-full uppercase">Sponsored</span>
                          </div>

                          {/* Hook Banner in Middle */}
                          <div className="relative z-10 px-3 text-center">
                            <div className="inline-block bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-serif font-bold text-amber-300 shadow-lg">
                              ⚡ {headline || "Tap to Watch"}
                            </div>
                          </div>

                          {/* Reel Bottom Meta & Actions */}
                          <div className="relative z-10 p-3 space-y-2">
                            <div className="flex items-end justify-between">
                              <div className="space-y-1 max-w-[190px]">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 rounded-full bg-red-700 flex items-center justify-center text-[10px] font-bold">N</div>
                                  <span className="text-xs font-bold">nanakamaraya.lk</span>
                                </div>
                                <p className="text-[11px] text-white/90 line-clamp-2 leading-tight">
                                  {caption}
                                </p>
                              </div>

                              <div className="flex flex-col items-center gap-3 text-white">
                                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                                <MessageCircle className="w-5 h-5" />
                                <Send className="w-5 h-5" />
                              </div>
                            </div>

                            {/* Sound Bar */}
                            <div className="flex items-center gap-2 text-[10px] text-white/70">
                              <Play className="w-3 h-3 fill-white" />
                              <span className="truncate">Original Audio • Nanakamaraya Living</span>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* MOCKUP 3: Story 9:16 Frame */}
                      {previewTab === "story" && (
                        <div className="w-full max-w-[280px] aspect-[9/16] bg-black rounded-[36px] p-2.5 shadow-2xl border-4 border-gray-800 relative overflow-hidden flex flex-col justify-between text-white">
                          
                          {/* Background Media */}
                          <div className="absolute inset-0">
                            {image ? (
                              <img src={image} alt="Story visual" className="w-full h-full object-cover opacity-85" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-amber-950 via-gray-900 to-black flex items-center justify-center p-4 text-center">
                                <Smartphone className="w-10 h-10 text-amber-400 mb-2 opacity-60" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
                          </div>

                          {/* Progress Bars at top */}
                          <div className="relative z-10 pt-5 px-2 flex items-center gap-1">
                            <div className="flex-1 h-1 bg-white rounded-full" />
                            <div className="flex-1 h-1 bg-white/40 rounded-full" />
                            <div className="flex-1 h-1 bg-white/40 rounded-full" />
                          </div>

                          {/* Story User Info */}
                          <div className="relative z-10 px-2 pt-2 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-red-700 flex items-center justify-center text-[10px] font-bold">N</div>
                              <span className="font-bold text-xs">nanakamaraya</span>
                              <span className="text-[10px] text-white/60">2h</span>
                            </div>
                            <span className="text-white/60">•••</span>
                          </div>

                          {/* Story Center Sticker Card */}
                          <div className="relative z-10 p-3 text-center space-y-2">
                            <div className="p-3 bg-white text-gray-900 rounded-2xl shadow-2xl space-y-1">
                              <h5 className="font-serif font-black text-xs text-red-700">{headline || contentTitle}</h5>
                              <p className="text-[10px] text-gray-600 line-clamp-2 leading-tight">
                                {caption || visualConcept}
                              </p>
                            </div>

                            {/* Link Sticker Mockup */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-bold shadow-lg">
                              <span>🔗 nanakamaraya.lk</span>
                            </div>
                          </div>

                          {/* Story Bottom Reply Bar */}
                          <div className="relative z-10 p-2 flex items-center gap-2 text-xs">
                            <div className="flex-1 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white/70 text-[10px]">
                              Send message...
                            </div>
                            <Heart className="w-5 h-5 text-white/80" />
                            <Send className="w-5 h-5 text-white/80" />
                          </div>

                        </div>
                      )}

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
              <div>
                {wizardStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setWizardStep((prev) => (prev - 1) as any)}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                {wizardStep < 3 && (
                  <button
                    type="button"
                    disabled={wizardStep === 1 && !contentTitle.trim()}
                    onClick={() => setWizardStep((prev) => (prev + 1) as any)}
                    className="px-5 py-2.5 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {wizardStep === 3 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setWizardStep(4)}
                      className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Skip to Manual Editor
                    </button>
                    <button
                      type="button"
                      disabled={isGenerating}
                      onClick={() => handleGenerate("all")}
                      className="px-5 py-2.5 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{isGenerating ? "Generating..." : "Generate with AI"}</span>
                    </button>
                  </>
                )}

                {wizardStep === 4 && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDownloadText({ title: contentTitle, format, category, language, tone, headline, caption, hashtags, visualConcept, videoScript, storyboard, callToAction })}
                      className="px-3.5 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-1.5 cursor-pointer"
                      title="Download full copy as text file"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Export .txt</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave("draft")}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave("completed")}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-4 h-4" />
                      <span>Mark as Completed</span>
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const savedId = editingId || `social-${Date.now()}`;
                        const payload = {
                          id: savedId,
                          title: contentTitle.trim() || "Untitled Campaign",
                          format,
                          category,
                          status: "draft" as const,
                          language,
                          tone,
                          targetAudience,
                          callToAction,
                          additionalInstructions,
                          details,
                          headline,
                          caption,
                          hashtags,
                          visualConcept,
                          image,
                          videoScript,
                          storyboard
                        };
                        try {
                          await fetch(editingId ? `/api/social-content/${editingId}` : "/api/social-content", {
                            method: editingId ? "PUT" : "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload)
                          });
                          setIsWizardOpen(false);
                          loadContent();
                          handleOpenOrderModal(payload);
                        } catch {
                          handleOpenOrderModal(payload);
                        }
                      }}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      title="Order our creative team to produce high-end graphics and reels based on this"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Order from Us 🚀</span>
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {selectedItemForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  selectedItemForView.status === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {selectedItemForView.status}
                </span>
                <h3 className="font-bold text-sm text-gray-900">{selectedItemForView.title}</h3>
              </div>
              <button
                onClick={() => setSelectedItemForView(null)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {selectedItemForView.image && (
                <img
                  src={selectedItemForView.image}
                  alt={selectedItemForView.title}
                  className="w-full h-56 object-cover rounded-xl border"
                />
              )}

              {selectedItemForView.headline && (
                <div>
                  <span className="font-bold text-gray-400 text-[10px] uppercase">Headline</span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">&ldquo;{selectedItemForView.headline}&rdquo;</p>
                </div>
              )}

              <div>
                <span className="font-bold text-gray-400 text-[10px] uppercase">Caption</span>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 mt-1 whitespace-pre-line leading-relaxed text-gray-800">
                  {selectedItemForView.caption}
                </div>
              </div>

              {selectedItemForView.hashtags && (
                <div>
                  <span className="font-bold text-gray-400 text-[10px] uppercase">Hashtags</span>
                  <p className="font-mono text-blue-600 mt-1">{selectedItemForView.hashtags}</p>
                </div>
              )}

              {selectedItemForView.visualConcept && (
                <div>
                  <span className="font-bold text-gray-400 text-[10px] uppercase">Visual Art Concept</span>
                  <p className="text-gray-600 mt-1 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">{selectedItemForView.visualConcept}</p>
                </div>
              )}

              {selectedItemForView.videoScript && (
                <div>
                  <span className="font-bold text-gray-400 text-[10px] uppercase">Reel Voiceover Script</span>
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 mt-1 font-mono text-purple-950 whitespace-pre-line">
                    {selectedItemForView.videoScript}
                  </div>
                </div>
              )}

              {selectedItemForView.storyboard && selectedItemForView.storyboard.length > 0 && (
                <div>
                  <span className="font-bold text-gray-400 text-[10px] uppercase">Scene Storyboard</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {selectedItemForView.storyboard.map((s, idx) => (
                      <div key={idx} className="p-2.5 bg-gray-50 rounded border text-[11px] space-y-1">
                        <div className="font-bold flex justify-between">
                          <span>Scene {s.sceneNumber}</span>
                          <span className="text-gray-500">{s.duration}</span>
                        </div>
                        <p className="text-gray-600"><span className="font-semibold">Visual:</span> {s.visualDescription}</p>
                        <p className="text-purple-700 font-semibold"><span className="text-gray-700 font-normal">Text:</span> {s.onScreenText}</p>
                        <p className="text-gray-500 italic">{s.voiceover}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <button
                onClick={() => handleCopyText(`${selectedItemForView.caption}\n\n${selectedItemForView.hashtags || ""}`, "Caption & Hashtags", "modal-copy")}
                className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-1.5 cursor-pointer hover:bg-gray-100"
              >
                {copiedId === "modal-copy" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Caption</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const itm = selectedItemForView;
                    setSelectedItemForView(null);
                    handleOpenOrderModal(itm);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-blue-700 shadow-xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Order Content Creation</span>
                </button>
                <button
                  onClick={() => {
                    const itm = selectedItemForView;
                    setSelectedItemForView(null);
                    handleOpenEdit(itm);
                  }}
                  className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-black"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit in Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTargetItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-gray-900">Delete Social Content?</h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to delete &ldquo;{deleteTargetItem.title}&rdquo;? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteTargetItem(null)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Yes, Delete Content
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER PLACEMENT MODAL */}
      {orderModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-xl my-auto overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50/80 to-indigo-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-gray-900">
                    Order Professional Content Creation
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Our creative team crafts high-converting graphics, reels & campaigns for you.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOrderModalItem(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitOrder} className="p-6 overflow-y-auto space-y-5">
              
              {/* Selected Content Reference */}
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Target Content</span>
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {orderModalItem.title || "Custom Social Content Project"}
                  </p>
                  <p className="text-[11px] text-gray-500 capitalize">
                    Format: <span className="font-semibold text-gray-700">{orderModalItem.format}</span> • Tone: <span className="font-semibold text-gray-700">{orderModalItem.tone || "Professional"}</span>
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-blue-100 text-blue-700 shrink-0">
                  {orderModalItem.orderStatus === "order_placed" ? "Re-ordering" : "New Order"}
                </span>
              </div>

              {/* Package Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800">
                  Select Production Package <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: "Custom Graphic & Copy Design",
                      title: "Graphics & Copy",
                      desc: "Branded post flyer + copywriting + hashtag strategy",
                      tag: "Most Popular"
                    },
                    {
                      id: "Reels & Video Production Pack",
                      title: "Reels & Video Production",
                      desc: "Full video editing, animated captions & audio sync",
                      tag: "High Engagement"
                    },
                    {
                      id: "Weekly Social Campaign Pack",
                      title: "Weekly Growth Pack",
                      desc: "3 Post Graphics + 1 Reel + Story templates",
                      tag: "Complete"
                    },
                    {
                      id: "Custom Agency Request",
                      title: "Custom Agency Project",
                      desc: "Bespoke branding, photo retouching or advertising",
                      tag: "Flexible"
                    }
                  ].map(pkg => (
                    <div
                      key={pkg.id}
                      onClick={() => setOrderPackageType(pkg.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        orderPackageType === pkg.id
                          ? "border-blue-600 bg-blue-50/70 shadow-xs"
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

              {/* Contact Information */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Client Contact Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Your Name / Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={orderContactName}
                      onChange={e => setOrderContactName(e.target.value)}
                      placeholder="e.g. Yasanga / Nanakamaraya"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={orderContactPhone}
                      onChange={e => setOrderContactPhone(e.target.value)}
                      placeholder="e.g. +94 77 123 4567"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={orderContactEmail}
                    onChange={e => setOrderContactEmail(e.target.value)}
                    placeholder="e.g. info@nanakamaraya.lk"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Special Instructions / Notes / Deadlines
                  </label>
                  <textarea
                    rows={3}
                    value={orderNotes}
                    onChange={e => setOrderNotes(e.target.value)}
                    placeholder="Mention specific product models, logo preferences, target delivery date, or any specific visual style you want our designers to follow..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  />
                </div>
              </div>

              {/* Company Dispatch Notice */}
              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/70 text-[11px] text-blue-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold">Instant Order Dispatch:</span> When you place this order, it is stored in your database and securely transmitted to our company website intake system. Our team will contact you via WhatsApp to finalize assets.
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setOrderModalItem(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingOrder}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingOrder ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Order...</span>
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
      )}

      {/* ORDER SUCCESS CONFIRMATION MODAL */}
      {orderSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 space-y-5 text-center">
            
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-gray-900">
                Content Order Placed! 🎉
              </h3>
              <p className="text-xs text-gray-600">
                Your order has been recorded successfully.
              </p>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Order Reference:</span>
                <span className="font-mono font-bold text-blue-600">{orderSuccessModal.orderId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Package:</span>
                <span className="font-semibold text-gray-800">{orderSuccessModal.orderPackage?.packageType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Contact:</span>
                <span className="font-semibold text-gray-800">{orderSuccessModal.orderPackage?.client?.phone}</span>
              </div>
              <div className="pt-2 border-t border-gray-200/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Website Dispatch Status:</span>
                <p className="text-[11px] text-gray-700 leading-snug">
                  {orderSuccessModal.dispatchNotice}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setOrderSuccessModal(null);
                  setStatusFilter("ordered");
                }}
                className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                View in Ordered Tab
              </button>
              <button
                onClick={() => setOrderSuccessModal(null)}
                className="w-full px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
