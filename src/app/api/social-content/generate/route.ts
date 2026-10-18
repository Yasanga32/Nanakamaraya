import { NextResponse } from "next/server";

interface GenerateRequestBody {
  format: "post" | "reel" | "story";
  category: string;
  language: string;
  tone: string;
  targetAudience?: string;
  callToAction?: string;
  additionalInstructions?: string;
  details: Record<string, any>;
  existingContent?: {
    headline?: string;
    caption?: string;
    hashtags?: string;
    visualConcept?: string;
    videoScript?: string;
    storyboard?: any[];
  };
  section?: "all" | "caption" | "hashtags" | "visualConcept" | "script" | "hook";
}

// Helper to sanitize facts: extracts explicitly provided data so we NEVER hallucinate
function extractStrictFacts(details: Record<string, any>, category: string): string {
  const parts: string[] = [];
  if (details.productName) parts.push(`Product Name: "${details.productName}"`);
  if (details.description) parts.push(`Description: "${details.description}"`);
  if (details.price) parts.push(`Price: "${details.price}" (Strict: Do not alter or invent other prices)`);
  if (details.features) parts.push(`Features/Specs: "${details.features}"`);
  if (details.offerTitle) parts.push(`Offer Title: "${details.offerTitle}"`);
  if (details.discount) parts.push(`Discount: "${details.discount}" (Strict: Only use this exact discount)`);
  if (details.eligibleProducts) parts.push(`Eligible Products: "${details.eligibleProducts}"`);
  if (details.dates) parts.push(`Dates: "${details.dates}" (Strict: Do not invent different dates)`);
  if (details.terms) parts.push(`Terms: "${details.terms}"`);
  if (details.businessName) parts.push(`Business Name: "${details.businessName}"`);
  if (details.services) parts.push(`Services: "${details.services}"`);
  if (details.usps) parts.push(`USPs: "${details.usps}"`);
  if (details.areas) parts.push(`Delivery Areas: "${details.areas}"`);
  if (details.fees) parts.push(`Delivery Fees: "${details.fees}" (Strict: Only use this exact fee)`);
  if (details.times) parts.push(`Delivery Times: "${details.times}"`);
  if (details.freeDeliveryConditions) parts.push(`Free Delivery Terms: "${details.freeDeliveryConditions}"`);
  if (details.customerFeedback) parts.push(`Customer Feedback Quote: "${details.customerFeedback}"`);
  if (details.customerName) parts.push(`Customer Name: "${details.customerName}"`);
  if (details.eventTitle) parts.push(`Event Title: "${details.eventTitle}"`);
  if (details.eventDateTime) parts.push(`Event Date/Time: "${details.eventDateTime}"`);
  if (details.eventLocation) parts.push(`Event Location: "${details.eventLocation}"`);
  if (details.customNotes) parts.push(`Notes: "${details.customNotes}"`);

  return parts.length > 0 ? parts.join("\n") : "No specific parameters provided; focus purely on business brand overview.";
}

// Built-in Smart Content AI Engine
function generateWithSmartEngine(body: GenerateRequestBody) {
  const { format, category, language, tone, targetAudience, callToAction, additionalInstructions, details, section = "all" } = body;

  const prodName = details.productName || details.newProductName || details.offerTitle || details.eventTitle || "Premium Architectural Hardware & Living";
  const price = details.price ? `Rs. ${details.price}` : "";
  const discount = details.discount || "";
  const features = details.features || details.mainFeatures || details.services || details.usps || "";
  const audience = targetAudience || "Homeowners, Architects, Interior Designers, and Contractors in Sri Lanka";
  const cta = callToAction || "Shop now at nanakamaraya.lk or message us on WhatsApp";

  // Language customization
  const isSinhala = language.toLowerCase().includes("sinhala") && !language.toLowerCase().includes("english");
  const isBilingual = language.toLowerCase().includes("english") && language.toLowerCase().includes("sinhala");
  const isTamil = language.toLowerCase().includes("tamil");

  // Tone prefixes
  let toneVibe = "Professional & Sophisticated";
  if (tone === "Exciting") toneVibe = "High Energy, Urgency & Excitement";
  else if (tone === "Friendly") toneVibe = "Warm, Approachable & Welcoming";
  else if (tone === "Educational") toneVibe = "Informative, Authoritative & Helpful";
  else if (tone === "Luxury") toneVibe = "Prestigious, Opulent & Exclusive";

  // Headline generation
  let headline = "";
  if (category === "special-offers") {
    headline = discount ? `Special Offer: ${discount} on ${prodName}` : `Exclusive Limited-Time Offer on ${prodName}`;
  } else if (category === "new-arrivals") {
    headline = `Just Arrived: The All-New ${prodName}`;
  } else if (category === "delivery-services") {
    headline = `Fast & Reliable Islandwide Delivery with Nanakamaraya`;
  } else if (category === "customer-testimonials") {
    headline = `What Our Happy Clients Say About ${prodName}`;
  } else if (category === "about-business") {
    headline = `Craftsmanship, Quality & Innovation: Welcome to Nanakamaraya`;
  } else {
    headline = `Elevate Your Living Space with ${prodName}`;
  }

  // Caption generation
  let caption = "";
  if (isSinhala) {
    caption = `ඔබේ නිවසට හෝ ව්‍යාපාරික ස්ථානයට නවීන පෙනුමක් සහ උපරිම ආරක්ෂාවක් එක්කරන්න.\n\n✨ ${prodName}\n${price ? `💰 විශේෂ මිල: ${price}\n` : ""}${features ? `🔹 විශේෂාංග: ${features}\n` : ""}🚚 දිවයින පුරා ආරක්ෂිත බෙදාහැරීම.\n\n${cta}`;
  } else if (isBilingual) {
    caption = `Transform your interior with exceptional quality and modern durability.\n\n✨ ${prodName}\n${price ? `💰 Price: ${price}\n` : ""}${discount ? `🎉 Discount: ${discount}\n` : ""}${features ? `🔹 Key Highlights: ${features}\n` : ""}\nඔබගේ සිහින නිවස වඩාත් අලංකාර හා සුරක්ෂිත කරගන්න. දැන්ම අප අමතන්න!\n\n${cta}`;
  } else if (isTamil) {
    caption = `உங்கள் கனவு இல்லத்திற்கான நவீன மற்றும் தரமான உபகரணங்கள்.\n\n✨ ${prodName}\n${price ? `💰 விலை: ${price}\n` : ""}${features ? `🔹 சிறப்பம்சங்கள்: ${features}\n` : ""}🚚 நாடளாவிய துரித விநியோகம்.\n\n${cta}`;
  } else {
    caption = `Upgrade your living standard with precision-crafted solutions designed to endure.\n\n✨ ${prodName}\n${price ? `💰 Verified Price: ${price}\n` : ""}${discount ? `🏷️ Exclusive Deal: ${discount}\n` : ""}${features ? `⚡ Key Specifications: ${features}\n` : ""}🛡️ Guaranteed durability & unmatched modern aesthetics.\n\n${cta}`;
  }

  // Hashtags generation
  const tagList = [
    "#Nanakamaraya",
    "#SriLankaHome",
    "#InteriorDesignLK",
    "#ArchitecturalHardware",
    "#ColomboLiving",
    category === "special-offers" ? "#PromoLK #SpecialOffer" : "",
    category === "new-arrivals" ? "#NewArrivals #ModernHardware" : "",
    format === "reel" ? "#ReelsLK #Shorts #ViralHardware" : "",
    format === "story" ? "#DailyDeals #StoryFeature" : ""
  ].filter(Boolean).join(" ");

  // Visual concept
  let visualConcept = "";
  if (format === "story") {
    visualConcept = `Vertical 9:16 portrait design. High-contrast gradient background emphasizing ${prodName}. Top third reserved for progress indicator and bold headline '${headline}'. Center features high-resolution product photography with subtle drop-shadows. Bottom third contains interactive Poll/Link Sticker overlay with '${cta}'.`;
  } else if (format === "reel") {
    visualConcept = `High-energy 9:16 video concept. Dynamic cuts, smooth panning close-ups highlighting tactile materials and build quality of ${prodName}. Crisp on-screen text overlays matching tone (${toneVibe}), backed by upbeat modern lofi or tech-inspired audio.`;
  } else {
    visualConcept = `1:1 Square or 4:5 Portrait post. Hero angle showcasing ${prodName} in an authentic luxury architectural setting. Clean typography overlay in bottom corner with subtle branding badge and '${price || discount || "Available Now"}' badge.`;
  }

  // Video Script & Storyboard for Reels
  let videoScript = "";
  let storyboard: any[] = [];

  if (format === "reel") {
    const hook = `Wait! Stop scrolling if you're building or renovating your home in Sri Lanka!`;
    videoScript = `[0-3s HOOK]: ${hook}\n\n[3-8s PROBLEM / SPOTLIGHT]: Most people overlook quality hardware until something squeaks or breaks. Look at the craftsmanship on this ${prodName}.\n\n[8-12s VALUE / SPECS]: ${features || "Engineered with corrosion-resistant finishes, seamless soft-close mechanisms, and ergonomic handling."}${price ? ` Available right now at ${price}.` : ""}\n\n[12-15s CALL TO ACTION]: ${cta}. Tap the link or DM us today!`;

    storyboard = [
      {
        sceneNumber: 1,
        duration: "0-3s",
        visualDescription: `Fast zoom-in on an everyday interior problem followed by immediate reveal of ${prodName}.`,
        onScreenText: "Homeowners in Sri Lanka, don't miss this! 👀",
        voiceover: hook
      },
      {
        sceneNumber: 2,
        duration: "3-7s",
        visualDescription: `Crisp macro shot highlighting the premium texture, clean seams, and build quality.`,
        onScreenText: `Premium Quality: ${prodName} ✨`,
        voiceover: `Engineered for modern aesthetics and lifelong durability.`
      },
      {
        sceneNumber: 3,
        duration: "7-11s",
        visualDescription: `Demonstration of smooth operation or key feature in action.`,
        onScreenText: price ? `Value Guaranteed: ${price}` : "Tested for everyday perfection",
        voiceover: features ? `Key features: ${features}.` : "Guaranteed performance with unmatched style."
      },
      {
        sceneNumber: 4,
        duration: "11-15s",
        visualDescription: `Wide hero shot with website URL badge and WhatsApp chat prompt.`,
        onScreenText: "Islandwide Delivery 🚚 | Tap Link Below!",
        voiceover: cta
      }
    ];
  }

  return {
    headline,
    caption,
    hashtags: tagList,
    visualConcept,
    videoScript,
    storyboard
  };
}

// Live Gemini API handler
async function generateWithGemini(apiKey: string, body: GenerateRequestBody) {
  const strictFacts = extractStrictFacts(body.details, body.category);
  const prompt = `
You are an elite Social Media & Digital Marketing Strategist for "Nanakamaraya / M.M. Noorbhoy & Co", Sri Lanka's leading architectural hardware, bathroom fittings, smart living solutions, and interior materials brand.

TASK:
Generate high-converting marketing content for:
- Format: ${body.format.toUpperCase()} (${body.format === "reel" ? "9:16 Short Video / Reel" : body.format === "story" ? "9:16 Vertical Story" : "Social Feed Post"})
- Category: ${body.category}
- Language: ${body.language} (If Sinhala, write natural contemporary Sinhala. If English and Sinhala, write natural bilingual copy. If English, write compelling English. If Tamil, write Tamil.)
- Tone: ${body.tone}
- Target Audience: ${body.targetAudience || "Sri Lankan Homeowners, Architects, Contractors, and Interior Enthusiasts"}
- Preferred Call to Action: ${body.callToAction || "Shop now at nanakamaraya.lk or WhatsApp us"}
- Additional Instructions: ${body.additionalInstructions || "None"}

VERIFIED PARAMETERS SUPPLIED BY ADMIN (STRICT CONSTRAINT):
${strictFacts}

CRITICAL RULES:
1. STRICT FACT ADHERENCE: You must NEVER invent, assume, or hallucinate product prices, discount percentages, delivery fees, dates, or specifications. Only mention specific numbers/fees if provided in the verified parameters above. If not provided, speak generally about great value or prompt the customer to inquire.
2. FORMAT REQUIREMENTS:
   - headline: A catchy, high-impact headline.
   - caption: Engaging, well-spaced caption with bullet points, emojis, value props, and call to action.
   - hashtags: 8 to 14 curated, relevant hashtags including brand tags and Sri Lankan market tags.
   - visualConcept: Detailed art direction for the visual asset (lighting, framing, typography overlay, color scheme, dimensions).
   - videoScript: (For Reels/Videos) Full voiceover script with timestamp markers [0-3s Hook], [3-8s Body], [8-12s Feature], [12-15s CTA]. Empty string for non-reels.
   - storyboard: (For Reels/Videos) An array of 3 to 5 scene objects: [{ "sceneNumber": 1, "duration": "0-3s", "visualDescription": "...", "onScreenText": "...", "voiceover": "..." }]. Empty array for non-reels.

OUTPUT FORMAT:
Return ONLY valid JSON matching this schema:
{
  "headline": "string",
  "caption": "string",
  "hashtags": "string",
  "visualConcept": "string",
  "videoScript": "string",
  "storyboard": [
    {
      "sceneNumber": 1,
      "duration": "string",
      "visualDescription": "string",
      "onScreenText": "string",
      "voiceover": "string"
    }
  ]
}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        response_mime_type: "application/json",
        temperature: 0.7
      }
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("No response content from Gemini API");

  return JSON.parse(rawText);
}

// Live OpenAI API handler
async function generateWithOpenAI(apiKey: string, body: GenerateRequestBody) {
  const strictFacts = extractStrictFacts(body.details, body.category);
  const systemPrompt = `You are an elite Social Media Marketing Copywriter for Nanakamaraya / M.M. Noorbhoy & Co in Sri Lanka. Always follow strict fact adherence: never hallucinate prices, dates, or specs. Output valid JSON.`;
  const userPrompt = `
Generate marketing content for:
Format: ${body.format}
Category: ${body.category}
Language: ${body.language}
Tone: ${body.tone}
Audience: ${body.targetAudience}
CTA: ${body.callToAction}
Instructions: ${body.additionalInstructions}
Details:
${strictFacts}

Respond in JSON with keys: headline, caption, hashtags, visualConcept, videoScript, storyboard (array of scenes).
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

export async function POST(req: Request) {
  try {
    const body: GenerateRequestBody = await req.json();

    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    let result: any = null;
    let provider = "smart_engine";
    let isLiveAI = false;
    let providerNotice = "Generated using built-in Smart Content Engine. Add GEMINI_API_KEY to .env.local to activate Live Gemini AI.";

    if (geminiKey) {
      try {
        result = await generateWithGemini(geminiKey, body);
        provider = "gemini";
        isLiveAI = true;
        providerNotice = "Generated with Google Gemini 1.5 Flash (Live AI)";
      } catch (err: any) {
        console.warn("Gemini generation failed, falling back to smart engine:", err.message);
      }
    } else if (openAiKey) {
      try {
        result = await generateWithOpenAI(openAiKey, body);
        provider = "openai";
        isLiveAI = true;
        providerNotice = "Generated with OpenAI GPT-4o-mini (Live AI)";
      } catch (err: any) {
        console.warn("OpenAI generation failed, falling back to smart engine:", err.message);
      }
    }

    if (!result) {
      result = generateWithSmartEngine(body);
    }

    // Handle single section regeneration if requested
    if (body.section && body.section !== "all" && body.existingContent) {
      const merged = { ...body.existingContent };
      if (body.section === "caption") merged.caption = result.caption;
      if (body.section === "hashtags") merged.hashtags = result.hashtags;
      if (body.section === "visualConcept") merged.visualConcept = result.visualConcept;
      if (body.section === "script") {
        merged.videoScript = result.videoScript;
        merged.storyboard = result.storyboard;
      }
      if (body.section === "hook") {
        merged.headline = result.headline;
        if (result.storyboard && result.storyboard[0]) {
          merged.storyboard = [
            result.storyboard[0],
            ...(merged.storyboard ? merged.storyboard.slice(1) : [])
          ];
        }
      }
      result = merged;
    }

    return NextResponse.json({
      success: true,
      provider,
      isLiveAI,
      providerNotice,
      generated: result
    });
  } catch (error: any) {
    console.error("POST /api/social-content/generate error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate content" }, { status: 500 });
  }
}
