export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { GENERIC_LP_FORM, RazorpayPayment, hmacMatches, paiseToRupees } from "@/lib/razorpay";
import { istTimestamp, postToTeleCRM, telecrmPhone } from "@/lib/telecrm";

/**
 * Razorpay calls this server-to-server once a payment settles. It is the reliable
 * half of the flow: the browser callback is lost if the visitor closes the tab
 * mid-payment, but this still fires, so every paid booking reaches TeleCRM.
 *
 * Configure in Razorpay → Settings → Webhooks:
 *   URL     https://pain.vkayurveda.com/api/razorpay/webhook
 *   Secret  RAZORPAY_WEBHOOK_SECRET
 *   Events  payment.captured, payment.failed
 */

function crmPayload(payment: RazorpayPayment, paid: boolean) {
  const notes = payment.notes ?? {};
  const amount = `${payment.currency} ${paiseToRupees(payment.amount)}`;
  const phone = (notes.phone || payment.contact || "").replace(/\D/g, "").slice(-10);
  const status = paid ? "Paid" : "Payment Failed";

  return {
    fields: { phone: telecrmPhone(phone), name: notes.name || "Razorpay customer" },
    actions: [
      { type: "SYSTEM_NOTE" as const, text: `Booking payment: ${status} – ${amount} (${istTimestamp()})` },
      { type: "SYSTEM_NOTE" as const, text: `Razorpay Payment ID: ${payment.id}` },
      { type: "SYSTEM_NOTE" as const, text: `Razorpay Order ID: ${payment.order_id}` },
      { type: "SYSTEM_NOTE" as const, text: `Method: ${payment.method || "Not specified"}` },
      { type: "SYSTEM_NOTE" as const, text: `Form: ${GENERIC_LP_FORM}` },
      { type: "SYSTEM_NOTE" as const, text: `Condition: ${notes.concern || "Not specified"}` },
      { type: "SYSTEM_NOTE" as const, text: `Branch: ${notes.branch || "Not specified"}` },
      { type: "SYSTEM_NOTE" as const, text: `URL: ${notes.source || "Not specified"}` },
    ],
  };
}

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[Generic Razorpay webhook] RAZORPAY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("x-razorpay-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature." }, { status: 400 });

  // The signature covers the exact bytes Razorpay sent, so read raw text before parsing.
  const rawBody = await req.text();
  if (!hmacMatches(rawBody, signature, secret)) {
    console.error("[Generic Razorpay webhook] Signature mismatch — request rejected");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let body: { event?: string; payload?: { payment?: { entity?: RazorpayPayment } } };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const event = body.event || "";
  const payment = body.payload?.payment?.entity;

  // Acknowledge everything we don't act on with 200 so Razorpay stops retrying —
  // including payments from other sites sharing this Razorpay account.
  if (event !== "payment.captured" && event !== "payment.failed") {
    return NextResponse.json({ received: true, ignored: event });
  }
  if (!payment?.id || payment.notes?.form !== GENERIC_LP_FORM) {
    return NextResponse.json({ received: true, ignored: "not a generic-lp payment" });
  }

  const paid = event === "payment.captured";

  let crm: "ok" | "failed" = "ok";
  try {
    await postToTeleCRM(crmPayload(payment, paid));
  } catch (err) {
    crm = "failed";
    console.error("[Generic Razorpay webhook TeleCRM] Error:", err instanceof Error ? err.message : err);
  }

  // Always 200 on a verified event; an error would make Razorpay retry and duplicate notes.
  return NextResponse.json({ received: true, event, paymentId: payment.id, crm });
}
