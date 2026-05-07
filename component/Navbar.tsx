"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Language = "en" | "ta";

const navCopy = {
  en: {
    links: [
      { label: "Problems", href: "#problems" },
      { label: "Conditions", href: "#conditions" },
      { label: "Treatment", href: "#treatment" },
      { label: "Programs", href: "#programs" },
    ],
    cta: "Book ₹150 Consultation",
    ctaShort: "Book Now",
  },
  ta: {
    links: [
      { label: "பிரச்சனைகள்", href: "#problems" },
      { label: "வலி நிலைகள்", href: "#conditions" },
      { label: "சிகிச்சை", href: "#treatment" },
      { label: "ஏன் VK", href: "#programs" },
    ],
    cta: "₹150 ஆலோசனை பதிவு",
    ctaShort: "பதிவு",
  },
} satisfies Record<Language, {
  links: { label: string; href: string }[];
  cta: string;
  ctaShort: string;
}>;

export default function Navbar() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = navCopy[language];

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

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("vk-language", nextLanguage);
    window.dispatchEvent(new CustomEvent("vk-language-change", { detail: nextLanguage }));
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--vk-green)]/10 bg-white/95 px-4 shadow-[0_2px_20px_rgba(1,90,54,0.08)] backdrop-blur-xl sm:px-6">
      <div className="mx-auto grid h-[90px] max-w-[1380px] grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4">
        <a href="#hero" className="flex items-center" aria-label="VK Ayurveda home">
          <Image
            src="/vk-logos.jpeg"
            alt="VK Ayurveda logo"
            width={150}
            height={52}
            priority
            className="h-[82px] w-auto object-contain"
          />
        </a>

        <div className="hidden justify-center md:flex">
          <div className="flex items-center gap-2 rounded-full border border-[var(--vk-green)]/10 bg-[var(--vk-lime-soft)] px-2 py-2">
            {copy.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-[var(--vk-green-dark)] transition hover:bg-white hover:text-[var(--vk-pink)] hover:shadow-[0_6px_18px_rgba(1,90,54,0.1)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="flex rounded-full border border-[var(--vk-green)]/10 bg-[var(--vk-lime-soft)] p-1">
            {(["en", "ta"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => chooseLanguage(item)}
                className={`rounded-full px-2.5 py-1.5 text-[11px] font-extrabold transition sm:px-3 sm:text-xs ${
                  language === item
                    ? "bg-white text-[var(--vk-pink)] shadow-[0_4px_14px_rgba(1,90,54,0.12)]"
                    : "text-[var(--vk-green-dark)] hover:bg-white/70"
                }`}
                aria-pressed={language === item}
              >
                {item === "en" ? "EN" : "TA"}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("vk-open-booking"))}
              className="rounded-full px-5 py-2.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 rv2-cta-link"
            >
              {copy.cta}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--vk-green)]/15 bg-[var(--vk-lime-soft)] text-[var(--vk-green-dark)] transition hover:bg-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-1">
              <span className={`h-0.5 w-4 rounded-full bg-current transition ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-0.5 w-4 rounded-full bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-4 rounded-full bg-current transition ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`mx-auto max-w-[1380px] overflow-hidden transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mb-4 grid gap-2 rounded-[18px] border border-[var(--vk-green)]/10 bg-[var(--vk-lime-soft)] p-2 shadow-[0_12px_28px_rgba(1,90,54,0.1)]">
          {copy.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-white px-4 py-3 text-sm font-bold text-[var(--vk-green-dark)] transition hover:text-[var(--vk-pink)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
