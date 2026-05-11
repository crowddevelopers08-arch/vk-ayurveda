"use client";

import { useEffect } from "react";
import ThankYou from "@/component/thank";
import Navbar from "@/component/tknavbar";

export default function ThankYouPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-11005175836/NP50CNeMhascEJzQ1v8o",
        value: 1.0,
        currency: "INR",
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <ThankYou />
    </>
  );
}