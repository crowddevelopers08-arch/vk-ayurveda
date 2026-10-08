"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type RazorpaySuccess = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (event: "payment.failed", cb: (res: { error?: { description?: string } }) => void) => void };
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

// Loads Razorpay Checkout on first use instead of on every page view.
function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
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

export function useConsultationBooking() {
  const router = useRouter();
  const [fields, setFields] = useState({ name: "", phone: "", concern: "", branch: "" });
  const [submitting, setSubmitting] = useState(false);
  const submissionRef = useRef(false);

  const update = (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const fail = (message: string) => {
    submissionRef.current = false;
    setSubmitting(false);
    alert(message);
  };

  const verifyPayment = async (response: RazorpaySuccess) => {
    try {
      const res = await fetch("/api/generic/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });
      const data = await res.json();
      if (!res.ok || !data.verified) throw new Error(data.error || "Verification failed");
      router.push(`/generic/thank-you?payment_id=${encodeURIComponent(data.paymentId)}`);
    } catch (err) {
      console.error("Payment verification failed:", err);
      fail("We could not verify your payment. If money was deducted, please call us at 99966 60102.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionRef.current) return;
    submissionRef.current = true;
    setSubmitting(true);

    try {
      const [loaded, res] = await Promise.all([
        loadRazorpay(),
        fetch("/api/generic/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...fields, pageUrl: window.location.href }),
        }),
      ]);
      const order = await res.json();
      if (!res.ok) return fail(order.error || "Could not start the payment. Please try again.");
      if (!loaded || !window.Razorpay) return fail("Could not load the payment window. Please check your connection and try again.");

      const checkout = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "VK Ayurveda",
        description: "Doctor Consultation Booking",
        prefill: order.prefill,
        notes: { concern: fields.concern, branch: fields.branch },
        theme: { color: "#015a36" },
        handler: verifyPayment,
        modal: { ondismiss: () => {
          submissionRef.current = false;
          setSubmitting(false);
        } },
      });
      checkout.on("payment.failed", (res) => {
        console.error("Razorpay payment failed:", res.error);
      });
      checkout.open();
    } catch (err) {
      console.error("Hero form submission failed:", err);
      fail("Sorry, we could not submit your request. Please try again.");
    }
  };


  return { fields, submitting, update, handleSubmit };
}
