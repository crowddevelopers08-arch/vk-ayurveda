"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "en" | "ta";

const footerCopy = {
  en: {
    badge: "NABH Certified Ayurvedic Hospital",
    tagline: "Pain Relief & Neuro Care - Naturally",
    copyright: "© 2025 VK Ayurveda. All rights reserved.",
    phone: "Call: 99966 60102",
    links: {
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      refund: "Cancellation & Refund",
    },
  },
  ta: {
    badge: "NABH சான்றளிக்கப்பட்ட ஆயுர்வேத மருத்துவமனை",
    tagline: "வலி நிவாரணம் & நியூரோ பராமரிப்பு - இயற்கையாக",
    copyright: "© 2025 VK Ayurveda. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    phone: "அழைக்க: 99966 60102",
    links: {
      privacy: "தனியுரிமை கொள்கை",
      terms: "விதிமுறைகள் & நிபந்தனைகள்",
      refund: "ரத்து & பணத்திருப்பம்",
    },
  },
} satisfies Record<Language, {
  badge: string;
  tagline: string;
  copyright: string;
  phone: string;
  links: Record<"privacy" | "terms" | "refund", string>;
}>;

const legalLinks = [
  { key: "privacy", href: "/generic/privacy-policy" },
  { key: "terms", href: "/generic/terms-and-conditions" },
  { key: "refund", href: "/generic/cancellation-and-refund" },
] as const;

export default function Footer() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = footerCopy[language];

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
    <footer className="bg-[var(--vk-green-dark)] px-6 pb-8 pt-12 max-sm:pt-6 text-center max-md:pb-[84px]">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-[18px] py-2 text-[13px] font-medium text-white/70">
        {copy.badge}
      </div>
      <div className="mb-2 font-serif text-[28px] font-bold text-white">
        VK <span className="text-[var(--vk-lime)]">Ayurveda</span>
      </div>
      <div className="mb-6 text-sm text-white/50">{copy.tagline}</div>
      <nav
        aria-label="Legal"
        className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-1 gap-y-2"
      >
        {legalLinks.map((link, index) => (
          <span key={link.key} className="flex items-center">
            {index > 0 && (
              <span aria-hidden className="mx-2 h-1 w-1 rounded-full bg-[var(--vk-lime)]/60" />
            )}
            <Link
              href={link.href}
              className="rounded-full px-2 py-1 text-[13px] font-medium text-white/70 transition hover:text-[var(--vk-lime)]"
            >
              {copy.links[link.key]}
            </Link>
          </span>
        ))}
      </nav>
      <div className="my-6 h-px bg-white/10" />
      <div className="text-[13px] text-white/35">
        {copy.copyright} &nbsp;|&nbsp; {copy.phone}
      </div>
    </footer>
  );
}
