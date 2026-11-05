"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { BookingErrorCode, PainArea } from "./data";

type RazorpaySuccess = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (event: "payment.failed", cb: (res: { error?: unknown }) => void) => void };
type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

const razorpayGlobal = () => (window as unknown as { Razorpay?: RazorpayConstructor }).Razorpay;

// Loads Razorpay Checkout on first use, so visitors who only browse don't pay for it.
function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (razorpayGlobal()) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => {
      script.remove();
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export type BookingStatus = "idle" | "opening" | "confirming";

export function useCampBooking() {
  const router = useRouter();
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [error, setError] = useState<BookingErrorCode | null>(null);
  const busy = useRef(false);

  const stop = (code: BookingErrorCode | null) => {
    busy.current = false;
    setStatus("idle");
    setError(code);
  };

  const confirmPayment = async (response: RazorpaySuccess) => {
    setStatus("confirming");
    try {
      const res = await fetch("/api/camp/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });
      const data = await res.json();
      if (!res.ok || !data.verified) throw new Error("Verification failed");
      router.push(`/camp/thank-you?payment_id=${encodeURIComponent(data.paymentId)}`);
    } catch (err) {
      console.error("Camp payment verification failed:", err);
      stop("verify_failed");
    }
  };

  const book = async (lead: { name: string; phone: string; painArea: PainArea }) => {
    if (busy.current) return;
    busy.current = true;
    setError(null);
    setStatus("opening");

    try {
      const [loaded, res] = await Promise.all([
        loadRazorpay(),
        fetch("/api/camp/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, pageUrl: window.location.href }),
        }),
      ]);
      const order = await res.json();
      if (!res.ok) return stop(order.code === "not_configured" ? "not_configured" : "start_failed");

      const Razorpay = razorpayGlobal();
      if (!loaded || !Razorpay) return stop("start_failed");

      let paymentFailed = false;
      const checkout = new Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "VK Ayurveda",
        description: "Pain Relief Camp Consultation",
        prefill: order.prefill,
        // Same notes as the order, so the webhook can always identify this payment.
        notes: order.notes,
        theme: { color: "#015a36" },
        handler: confirmPayment,
        modal: { ondismiss: () => stop(paymentFailed ? "payment_failed" : null) },
      });
      // Razorpay shows the failure and offers a retry inside its own window.
      checkout.on("payment.failed", (failure) => {
        paymentFailed = true;
        console.error("Razorpay payment failed:", failure.error);
      });
      checkout.open();
    } catch (err) {
      console.error("Camp booking failed:", err);
      stop("start_failed");
    }
  };

  return { status, error, book };
}
