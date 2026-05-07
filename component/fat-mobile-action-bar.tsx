"use client";

import { useEffect, useState } from "react";

type Language = "en" | "ta";

const copy = {
  en: { call: "Call Now", book: "Book Now" },
  ta: { call: "அழைக்க", book: "பதிவு செய்க" },
} satisfies Record<Language, { call: string; book: string }>;

export default function MobileActionBar() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("vk-language");
    if (saved === "en" || saved === "ta") setLanguage(saved);

    const handler = (e: Event) => {
      const lang = (e as CustomEvent<Language>).detail;
      if (lang === "en" || lang === "ta") setLanguage(lang);
    };
    window.addEventListener("vk-language-change", handler);
    return () => window.removeEventListener("vk-language-change", handler);
  }, []);

  const t = copy[language];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-[0_-16px_38px_rgba(36,31,33,0.16)] flex md:hidden">

      {/* Call Now */}
      <a
        href="tel:+919996660102"
        className="flex-1 flex items-center justify-center gap-2 py-4 font-semibold text-white text-sm bg-[#015a36] active:scale-95 transition"
      >
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.7 0 1.2.5 1.2 1.2v3.5c0 .7-.5 1.2-1.2 1.2C10.9 21.4 2.6 13.1 2.6 3.4c0-.7.5-1.2 1.2-1.2h3.5c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.7.6 4 .1.4 0 .9-.3 1.2l-2.2 2.2Z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        {t.call}
      </a>

      {/* Book Now */}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("vk-open-booking"))}
        className="flex-1 flex items-center justify-center gap-2 py-4 font-semibold text-white text-sm bg-[#ef2150] border-l border-white/35 active:scale-95 transition"
      >
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 3v3M17 3v3M4 9h16M6 5h12c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        {t.book}
      </button>
    </div>
  );
}
