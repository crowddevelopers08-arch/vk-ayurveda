export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { CAMP_LP_FORM, basicAuth, campFeeRupees, razorpayKeys } from "@/lib/razorpay";
import { istTimestamp, postToTeleCRM, telecrmPhone } from "@/lib/telecrm";
import { CAMP, PAIN_AREAS, type PainArea } from "@/component/camp/data";

const DEFAULT_SOURCE = "https://pain.vkayurveda.com/camp-Mayiladuthurai";
const CAMP_BRANCH = `${CAMP.loc.en} camp (every ${CAMP.day.en})`;

interface CampLead {
  name: string;
  phone: string;
  painArea: PainArea;
  source: string;
}

// Captures the lead in TeleCRM before payment, so visitors who abandon checkout can still be called back.
function pendingLeadPayload(lead: CampLead) {
  return {
    fields: { phone: telecrmPhone(lead.phone), name: lead.name },
    actions: [
      { type: "SYSTEM_NOTE" as const, text: `Form: ${CAMP_LP_FORM}` },
      { type: "SYSTEM_NOTE" as const, text: `Booking payment: Pending (checkout opened ${istTimestamp()})` },
      { type: "SYSTEM_NOTE" as const, text: `Condition: ${lead.painArea}` },
      { type: "SYSTEM_NOTE" as const, text: `Branch: ${CAMP_BRANCH}` },
      { type: "SYSTEM_NOTE" as const, text: `URL: ${lead.source}` },
    ],
  };
}

// Validates the camp form and creates a Razorpay order. There is no database, so the lead
// details travel in the order's notes. The amount always comes from the server, never the browser.
export async function POST(req: NextRequest) {
  const keys = razorpayKeys();
  if (!keys) {
    console.error("[Camp Razorpay order] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not set");
    return NextResponse.json({ code: "not_configured" }, { status: 500 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    // handled by validation below
  }
  const read = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");

  const painArea = read("painArea") as PainArea;
  const lead: CampLead = {
    name: read("name").slice(0, 100),
    phone: read("phone").replace(/\D/g, ""),
    painArea,
    source: (read("pageUrl") || req.headers.get("referer") || DEFAULT_SOURCE).slice(0, 250),
  };

  if (!lead.name || !/^[6-9]\d{9}$/.test(lead.phone) || !PAIN_AREAS.includes(painArea)) {
    return NextResponse.json({ code: "invalid_lead" }, { status: 400 });
  }

  // Runs alongside order creation; a CRM outage must not block the booking.
  const crmSync = postToTeleCRM(pendingLeadPayload(lead)).catch((err) => {
    console.error("[Camp Razorpay order TeleCRM] Error:", err instanceof Error ? err.message : err);
  });

  try {
    const notes = {
      product: "VK Ayurveda Pain Relief Camp",
      form: CAMP_LP_FORM,
      name: lead.name,
      phone: lead.phone,
      concern: lead.painArea,
      branch: CAMP_BRANCH,
      source: lead.source,
    };

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: basicAuth(keys.keyId, keys.keySecret), "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(campFeeRupees() * 100),
        currency: "INR",
        receipt: `vkc_${Date.now()}_${lead.phone.slice(-4)}`, // Razorpay caps receipt at 40 chars
        notes,
      }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });

    const order = await res.json();
    if (!res.ok) throw new Error(order?.error?.description || `Razorpay HTTP ${res.status}`);

    await crmSync;
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keys.keyId, // publishable key: safe to expose to the browser
      prefill: { name: lead.name, contact: `+91${lead.phone}` },
      notes,
    });
  } catch (err) {
    console.error("[Camp Razorpay order] Error:", err instanceof Error ? err.message : err);
    await crmSync;
    return NextResponse.json({ code: "order_failed" }, { status: 502 });
  }
}
