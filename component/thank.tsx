"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "en" | "ta";

const pageCopy = {
  en: {
    badge: "Request Received",
    heroTitle: "Thank You",
    eyebrow: "VK Ayurveda",
    heading: "Your consultation request has been submitted.",
    body: "Our team will contact you shortly to confirm your appointment and guide you with the next steps.",
    feeLabel: "Consultation Fee",
    contactLabel: "Call / WhatsApp",
    whatsapp: "Message on WhatsApp",
    backHome: "Back to Home",
  },
  ta: {
    badge: "கோரிக்கை பெறப்பட்டது",
    heroTitle: "நன்றி",
    eyebrow: "VK Ayurveda",
    heading: "உங்கள் ஆலோசனை கோரிக்கை சமர்ப்பிக்கப்பட்டது.",
    body: "உங்கள் சந்திப்பை உறுதிப்படுத்தவும் அடுத்த படிகளில் வழிகாட்டவும் எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்ளும்.",
    feeLabel: "ஆலோசனை கட்டணம்",
    contactLabel: "அழைக்க / WhatsApp",
    whatsapp: "WhatsApp-ல் தொடர்பு கொள்ள",
    backHome: "முகப்புக்கு திரும்பு",
  },
};

export default function ThankYou() {
  const [language, setLanguage] = useState<Language>("en");
  const t = pageCopy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("vk-language");
    if (savedLanguage === "en" || savedLanguage === "ta") setLanguage(savedLanguage);

    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next === "en" || next === "ta") setLanguage(next);
    };
    window.addEventListener("vk-language-change", handleLanguageChange);
    return () => window.removeEventListener("vk-language-change", handleLanguageChange);
  }, []);

  return (
    <main className=" bg-[var(--vk-lime-soft)] px-4 py-8 text-[var(--vk-green-dark)] sm:px-6 sm:py-12 mt-15">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-tl-[42px] rounded-br-[42px] bg-white shadow-[0_24px_70px_rgba(1,90,54,0.16)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[260px] bg-[var(--vk-green-dark)] sm:min-h-[360px] lg:min-h-full">
              <Image
                src="/Panchakarma-Care.avif"
                alt="VK Ayurveda care"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--vk-green-dark)]/88 via-[var(--vk-green-dark)]/35 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="mb-3 inline-flex rounded-full bg-white/12 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--vk-lime)] ring-1 ring-white/15">
                  {t.badge}
                </div>
                <h1 className="font-serif text-[clamp(2rem,8vw,4rem)] font-black leading-[1.05] text-white">
                  {t.heroTitle}
                </h1>
              </div>
            </div>

            <div className="p-6 text-center sm:p-10 lg:p-12 lg:text-left">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--vk-lime-soft)] text-[var(--vk-green)] ring-1 ring-[var(--vk-green)]/10 lg:mx-0">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--vk-pink)]">
                {t.eyebrow}
              </p>
              <h2 className="mb-4 font-serif text-[clamp(1.7rem,6vw,3.2rem)] font-black leading-[1.1] text-[var(--vk-green-dark)]">
                {t.heading}
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-[16px] font-medium leading-[1.75] text-[#4b5563] lg:mx-0">
                {t.body}
              </p>

              <div className="mb-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-tl-[18px] rounded-br-[18px] bg-[var(--vk-lime-soft)] p-4 text-left">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--vk-green)]">
                    {t.feeLabel}
                  </p>
                  <p className="mt-1 font-serif text-3xl font-black text-[var(--vk-pink)]">₹150</p>
                </div>
                <div className="rounded-tl-[18px] rounded-br-[18px] bg-[var(--vk-lime-soft)] p-4 text-left">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--vk-green)]">
                    {t.contactLabel}
                  </p>
                  <p className="mt-2 text-lg font-black text-[var(--vk-green-dark)]">99966 60102</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/919996660102"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--vk-pink)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(239,33,80,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-pink-dark)]"
                >
                  {t.whatsapp}
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[var(--vk-green)] px-6 py-3.5 text-sm font-extrabold text-[var(--vk-green)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-green)] hover:text-white"
                >
                  {t.backHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
