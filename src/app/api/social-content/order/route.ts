import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await initDB();
    const body = await req.json();

    const {
      contentId,
      contactName,
      contactPhone,
      contactEmail = "",
      packageType = "Standard Content Creation",
      notes = "",
      contentSnapshot
    } = body;

    if (!contentId || !contactName || !contactPhone) {
      return NextResponse.json(
        { error: "Missing required order fields: contentId, contactName, and contactPhone are required." },
        { status: 400 }
      );
    }

    // Fetch existing content or create new custom order record
    let contentItem: any = null;
    let finalContentId = contentId;

    if (contentId && contentId !== "new-custom-order") {
      const [existingRows]: any = await pool.query("SELECT * FROM social_contents WHERE id = ?", [contentId]);
      if (existingRows && existingRows.length > 0) {
        contentItem = existingRows[0];
        await pool.query(
          `UPDATE social_contents 
           SET orderStatus = 'order_placed',
               orderContactName = ?,
               orderContactPhone = ?,
               orderContactEmail = ?,
               orderPackageType = ?,
               orderNotes = ?,
               orderDispatchedAt = CURRENT_TIMESTAMP
           WHERE id = ?`,
          [contactName, contactPhone, contactEmail, packageType, notes, contentId]
        );
      }
    }

    if (!contentItem) {
      // Create new record for direct custom orders
      finalContentId = `social-ord-${Date.now()}`;
      await pool.query(
        `INSERT INTO social_contents (id, title, format, category, status, language, tone, orderStatus, orderContactName, orderContactPhone, orderContactEmail, orderPackageType, orderNotes, orderDispatchedAt)
         VALUES (?, ?, 'post', 'other', 'draft', 'English', 'Professional', 'order_placed', ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [finalContentId, `Custom Order: ${packageType}`, contactName, contactPhone, contactEmail, packageType, notes]
      );
      contentItem = {
        id: finalContentId,
        title: `Custom Order: ${packageType}`,
        format: "post",
        category: "other",
        status: "draft",
        language: "English",
        tone: "Professional",
        caption: notes || "Direct order request placed by client."
      };
    }

    // Prepare complete order package to forward to company website
    const orderPackage = {
      orderId: `ORD-${Date.now()}`,
      placedAt: new Date().toISOString(),
      client: {
        name: contactName,
        phone: contactPhone,
        email: contactEmail
      },
      packageType,
      specialInstructions: notes,
      content: {
        id: contentId,
        title: contentItem.title,
        format: contentItem.format,
        category: contentItem.category,
        language: contentItem.language,
        tone: contentItem.tone,
        targetAudience: contentItem.targetAudience,
        callToAction: contentItem.callToAction,
        headline: contentItem.headline,
        caption: contentItem.caption,
        hashtags: contentItem.hashtags,
        visualConcept: contentItem.visualConcept,
        image: contentItem.image,
        videoScript: contentItem.videoScript,
        storyboard: typeof contentItem.storyboard === "string" ? JSON.parse(contentItem.storyboard || "[]") : contentItem.storyboard,
        details: typeof contentItem.details === "string" ? JSON.parse(contentItem.details || "{}") : contentItem.details
      }
    };

    // Check if company website domain or webhook URL is configured
    const companyDomain = process.env.COMPANY_WEBSITE_DOMAIN;
    const webhookUrl = process.env.COMPANY_WEBHOOK_URL || (companyDomain ? (companyDomain.startsWith("http") ? `${companyDomain}/api/orders` : `https://${companyDomain}/api/orders`) : null);

    let dispatched = false;
    let dispatchNotice = "";

    if (webhookUrl) {
      try {
        const dispatchRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPackage)
        });

        if (dispatchRes.ok) {
          dispatched = true;
          dispatchNotice = `Order successfully transmitted to company website (${webhookUrl}).`;
        } else {
          dispatchNotice = `Order stored locally. Webhook responded with status ${dispatchRes.status}.`;
        }
      } catch (err: any) {
        console.warn("Failed to dispatch order to company website webhook:", err.message);
        dispatchNotice = `Order securely saved in database. (Company website destination temporarily unreachable).`;
      }
    } else {
      dispatchNotice = "Order securely saved in database! (Add COMPANY_WEBSITE_DOMAIN in .env.local to automatically forward orders to your company website).";
    }

    return NextResponse.json({
      success: true,
      orderId: orderPackage.orderId,
      dispatched,
      dispatchNotice,
      orderPackage
    });
  } catch (error: any) {
    console.error("POST /api/social-content/order error:", error);
    return NextResponse.json({ error: error.message || "Failed to place content order" }, { status: 500 });
  }
}
