"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

type Language = "en" | "ta";

const sectionCopy = {
  en: {
    titleLine1: "Start Your Recovery",
    titleLine2: "Today",
    subtitle: "Trusted by 40,000+ patients. NABH Certified. Safe & natural Ayurvedic treatment.",
    consultation: "Doctor Consultation",
    fee: "₹150 Only",
    book: "Book Consultation Now",
    whatsapp: "WhatsApp: 99966 60102",
  },
  ta: {
    titleLine1: "தினமும் வலியுடன்",
    titleLine2: "வாழ வேண்டாம்",
    subtitle: "இன்று சிகிச்சை தொடங்குங்கள்",
    consultation: "ஆலோசனை",
    fee: "₹150 மட்டும்",
    book: "அழைக்க / வாட்ஸ்அப்: 99966 60102",
    whatsapp: "WhatsApp: 99966 60102",
  },
} satisfies Record<Language, {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  consultation: string;
  fee: string;
  book: string;
  whatsapp: string;
}>;

export default function CTASection() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = sectionCopy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("vk-language");
    if (savedLanguage === "en" || savedLanguage === "ta") {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = (event: Event) => {
      const nextLanguage = (event as CustomEvent<Language>).detail;
      if (nextLanguage === "en" || nextLanguage === "ta") {
        setLanguage(nextLanguage);
      }
    };

    window.addEventListener("vk-language-change", handleLanguageChange);
    return () => window.removeEventListener("vk-language-change", handleLanguageChange);
  }, []);

  return (
    <section id="cta-strip" className="px-4 pb-12 pt-2 text-center sm:px-6 sm:pb-20 sm:pt-0">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            className={`mb-[14px] font-serif font-black leading-[1.12] tracking-[-0.02em] text-[var(--vk-green-dark)] ${
              language === "ta"
                ? "text-[clamp(1.15rem,3.2vw,2.5rem)]"
                : "text-[clamp(1.25rem,3.5vw,4rem)]"
            }`}
          >
            {copy.titleLine1} <span className="text-[var(--vk-pink)]">{copy.titleLine2}</span>
          </h2>
          <p className="mx-auto mb-6 max-w-sm text-[15px] leading-[1.6] text-black/85 sm:mb-8 sm:max-w-none sm:text-base">{copy.subtitle}</p>
          <div className="mb-6 flex flex-col items-center gap-1 font-serif text-[18px] font-semibold text-black sm:mb-8 sm:block sm:text-[22px]">
            <span>{copy.consultation} -</span> <strong className="text-3xl sm:text-4xl">{copy.fee}</strong>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("vk-open-booking"))}
              className="rv2-cta-link w-full justify-center rounded-full bg-white px-5 py-3.5 text-sm font-bold leading-tight text-[var(--vk-pink)] shadow-[0_6px_24px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:w-auto sm:px-9 sm:py-4 sm:text-base"
            >
              {copy.book}
            </button>
            <a
              href="https://wa.me/919996660102"
              className="w-full rounded-full border-2 border-black/60 px-5 py-3.5 text-sm font-semibold text-black transition hover:border-white hover:bg-white/15 sm:w-auto sm:px-8 sm:text-base"
            >
              {copy.whatsapp}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
