export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { GENERIC_LP_FORM, basicAuth, bookingFeeRupees, razorpayKeys } from "@/lib/razorpay";
import { istTimestamp, postToTeleCRM, telecrmPhone } from "@/lib/telecrm";
import { branches, concerns } from "@/component/ayurveda-generic/data";

const NOT_CONFIGURED = "Online payment is not available right now. Please call us to book.";
const DEFAULT_SOURCE = "https://pain.vkayurveda.com/generic";

interface GenericLead {
  name: string;
  phone: string;
  concern: string;
  branch: string;
  source: string;
}

// Captures the lead in TeleCRM before payment, so visitors who abandon checkout can still be called back.
function pendingLeadPayload(lead: GenericLead) {
  return {
    fields: { phone: telecrmPhone(lead.phone), name: lead.name },
    actions: [
      { type: "SYSTEM_NOTE" as const, text: `Form: ${GENERIC_LP_FORM}` },
      { type: "SYSTEM_NOTE" as const, text: `Booking payment: Pending (checkout opened ${istTimestamp()})` },
      { type: "SYSTEM_NOTE" as const, text: `Condition: ${lead.concern}` },
      { type: "SYSTEM_NOTE" as const, text: `Branch: ${lead.branch}` },
      { type: "SYSTEM_NOTE" as const, text: `URL: ${lead.source}` },
    ],
  };
}

// Validates the generic LP form and creates a Razorpay order for it. There is no database,
// so the lead details travel in the order's notes; the amount always comes from the server env.
export async function POST(req: NextRequest) {
  const keys = razorpayKeys();
  const fee = bookingFeeRupees();
  if (!keys || fee === null) {
    console.error("[Generic Razorpay order] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET / RAZORPAY_SESSION_AMOUNT not set");
    return NextResponse.json({ error: NOT_CONFIGURED }, { status: 500 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    // handled by validation below
  }
  const read = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");

  const lead: GenericLead = {
    name: read("name").slice(0, 100),
    phone: read("phone").replace(/\D/g, ""),
    concern: read("concern"),
    branch: read("branch"),
    source: (read("pageUrl") || req.headers.get("referer") || DEFAULT_SOURCE).slice(0, 250),
  };

  if (!lead.name || !/^[6-9]\d{9}$/.test(lead.phone)) {
    return NextResponse.json({ error: "Please enter your name and a valid 10-digit mobile number." }, { status: 400 });
  }
  if (!concerns.includes(lead.concern) || !branches.includes(lead.branch)) {
    return NextResponse.json({ error: "Please select your concern and preferred branch." }, { status: 400 });
  }

  // Runs alongside order creation; a CRM outage must not block the booking.
  const crmSync = postToTeleCRM(pendingLeadPayload(lead)).catch((err) => {
    console.error("[Generic Razorpay order TeleCRM] Error:", err instanceof Error ? err.message : err);
  });

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: basicAuth(keys.keyId, keys.keySecret), "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(fee * 100),
        currency: "INR",
        receipt: `vkg_${Date.now()}_${lead.phone.slice(-4)}`, // Razorpay caps receipt at 40 chars
        notes: {
          product: "VK Ayurveda Consultation Booking",
          form: GENERIC_LP_FORM,
          name: lead.name,
          phone: lead.phone,
          concern: lead.concern,
          branch: lead.branch,
          source: lead.source,
        },
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
      keyId: keys.keyId, // publishable key — safe to expose to the browser
      prefill: { name: lead.name, contact: `+91${lead.phone}` },
    });
  } catch (err) {
    console.error("[Generic Razorpay order] Error:", err instanceof Error ? err.message : err);
    await crmSync;
    return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 502 });
  }
}
