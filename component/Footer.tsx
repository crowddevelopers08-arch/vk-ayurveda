"use client";

import { useEffect, useState } from "react";

type Language = "en" | "ta";

const footerCopy = {
  en: {
    badge: "NABH Certified Ayurvedic Hospital",
    tagline: "Pain Relief & Neuro Care - Naturally",
    copyright: "© 2025 VK Ayurveda. All rights reserved.",
    phone: "Call: 99966 60102",
  },
  ta: {
    badge: "NABH சான்றளிக்கப்பட்ட ஆயுர்வேத மருத்துவமனை",
    tagline: "வலி நிவாரணம் & நியூரோ பராமரிப்பு - இயற்கையாக",
    copyright: "© 2025 VK Ayurveda. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    phone: "அழைக்க: 99966 60102",
  },
} satisfies Record<Language, {
  badge: string;
  tagline: string;
  copyright: string;
  phone: string;
}>;

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
    <footer className="bg-[var(--vk-green-dark)] px-6 pb-8 pt-12 text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-[18px] py-2 text-[13px] font-medium text-white/70">
        {copy.badge}
      </div>
      <div className="mb-2 font-serif text-[28px] font-bold text-white">
        VK <span className="text-[var(--vk-lime)]">Ayurveda</span>
      </div>
      <div className="mb-6 text-sm text-white/50">{copy.tagline}</div>
      <div className="my-6 h-px bg-white/10" />
      <div className="text-[13px] text-white/35">
        {copy.copyright} &nbsp;|&nbsp; {copy.phone}
      </div>
    </footer>
  );
}
