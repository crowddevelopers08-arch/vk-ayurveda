"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Language = "en" | "ta";

const navCopy = {
  en: {
    cta: "Book ₹150 Consultation",
  },
  ta: {
    cta: "₹150 ஆலோசனை பதிவு",
  },
} satisfies Record<Language, { cta: string }>;

export default function Navbar() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = navCopy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("vk-language");
    if (savedLanguage === "en" || savedLanguage === "ta") {
      setLanguage(savedLanguage);
    }
  }, []);

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("vk-language", nextLanguage);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--vk-green)]/10 bg-white/95 px-4 shadow-[0_2px_20px_rgba(1,90,54,0.08)] backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex h-[90px] max-w-[1380px] items-center justify-between">

        {/* LOGO */}
        <a href="#hero" className="flex items-center">
          <Image
            src="/vk-logos.jpeg"
            alt="VK Ayurveda logo"
            width={150}
            height={52}
            priority
            className="h-[82px] w-auto object-contain"
          />
        </a>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* LANGUAGE SWITCH (optional) */}
          <div className="flex rounded-full border border-[var(--vk-green)]/10 bg-[var(--vk-lime-soft)] p-1">
            {(["en", "ta"] as const).map((item) => (
              <button
                key={item}
                onClick={() => chooseLanguage(item)}
                className={`rounded-full px-2.5 py-1.5 text-[11px] font-extrabold transition sm:px-3 sm:text-xs ${
                  language === item
                    ? "bg-white text-[var(--vk-pink)] shadow-[0_4px_14px_rgba(1,90,54,0.12)]"
                    : "text-[var(--vk-green-dark)] hover:bg-white/70"
                }`}
              >
                {item === "en" ? "EN" : "TA"}
              </button>
            ))}
          </div>

          {/* CTA BUTTON */}
          <button
  onClick={() =>
    window.dispatchEvent(new CustomEvent("vk-open-booking"))
  }
  className="rounded-full bg-[var(--vk-pink)] px-4 py-2 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(255,74,122,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-green)] sm:px-6 sm:py-2.5 sm:text-sm"
>
  {copy.cta}
</button>

        </div>
      </div>
    </nav>
  );
}