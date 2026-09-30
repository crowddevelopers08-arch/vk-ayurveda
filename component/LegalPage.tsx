"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type Language = "en" | "ta";

export type LegalSection = {
  title: string;
  content: string[];
};

export type LegalContent = {
  title: string;
  effectiveLabel: string;
  intro: string;
  contactIntro: string;
  sections: LegalSection[];
};

const legalLinks = [
  { href: "/privacy-policy", label: { en: "Privacy Policy", ta: "தனியுரிமை கொள்கை" } },
  { href: "/terms-and-conditions", label: { en: "Terms & Conditions", ta: "விதிமுறைகள் & நிபந்தனைகள்" } },
  { href: "/cancellation-and-refund", label: { en: "Cancellation & Refund", ta: "ரத்து & பணத்திருப்பம்" } },
];

const sharedCopy = {
  en: {
    eyebrow: "VK Ayurveda",
    contactEyebrow: "Questions or Requests",
    contactTitle: "Contact Us",
    phoneLabel: "Phone / WhatsApp",
    locationLabel: "Location",
    location: "VK Ayurveda, Tamil Nadu, India",
    relatedLabel: "Other Policies",
    backHome: "← Back to Home",
  },
  ta: {
    eyebrow: "VK Ayurveda",
    contactEyebrow: "கேள்விகள் அல்லது கோரிக்கைகள்",
    contactTitle: "எங்களை தொடர்பு கொள்ளுங்கள்",
    phoneLabel: "தொலைபேசி / WhatsApp",
    locationLabel: "இருப்பிடம்",
    location: "VK Ayurveda, தமிழ்நாடு, இந்தியா",
    relatedLabel: "பிற கொள்கைகள்",
    backHome: "← முகப்புக்கு திரும்பு",
  },
};

type LegalPageProps = {
  path: string;
  content: Record<Language, LegalContent>;
};

export default function LegalPage({ path, content }: LegalPageProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [today, setToday] = useState<Date | null>(null);
  const t = { ...sharedCopy[language], ...content[language] };

  useEffect(() => {
    setToday(new Date());

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
    <main className="bg-[var(--vk-lime-soft)] px-4 py-12 text-[var(--vk-green-dark)] sm:px-6 sm:py-16 mt-10">
      <div className="mx-auto max-w-6xl">
        {/* Header card */}
        <div className="mb-8 overflow-hidden rounded-tl-[42px] rounded-br-[42px] bg-[var(--vk-green-dark)] px-8 py-10 shadow-[0_24px_70px_rgba(1,90,54,0.22)] sm:px-12 sm:py-14">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--vk-lime)]">
            {t.eyebrow}
          </p>
          <h1 className="mb-4 font-serif text-[clamp(2rem,7vw,3.6rem)] font-black leading-[1.1] text-white">
            {t.title}
          </h1>
          <p className="text-[15px] leading-[1.75] text-white/60">
            {t.effectiveLabel}: {today?.toLocaleDateString(language === "ta" ? "ta-IN" : "en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="mt-3 text-[16px] leading-[1.75] text-white/75">
            {t.intro}
          </p>
        </div>

        {/* Policy sections */}
        <div className="grid gap-5 md:grid-cols-2">
          {t.sections.map((section, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-tl-[28px] rounded-br-[28px] bg-white px-7 py-7 shadow-[0_8px_30px_rgba(1,90,54,0.08)] sm:px-9 ${
                index === t.sections.length - 1 && t.sections.length % 2 === 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--vk-lime-soft)] font-serif text-[13px] font-black text-[var(--vk-green)]">
                  {index + 1}
                </span>
                <h2 className="font-serif text-[clamp(1.1rem,3.5vw,1.45rem)] font-black leading-tight text-[var(--vk-green-dark)]">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-3 pl-11">
                {section.content.map((para, i) => (
                  <p key={i} className="text-[15px] leading-[1.8] text-[#4b5563]">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact card */}
        <div className="mt-8 overflow-hidden rounded-tl-[28px] rounded-br-[28px] bg-[var(--vk-lime-soft)] px-7 py-7 ring-1 ring-[var(--vk-green)]/15 sm:px-9">
          <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--vk-pink)]">
            {t.contactEyebrow}
          </p>
          <h3 className="mb-3 font-serif text-[1.35rem] font-black text-[var(--vk-green-dark)]">
            {t.contactTitle}
          </h3>
          <p className="mb-5 text-[15px] leading-[1.75] text-[#4b5563]">
            {t.contactIntro}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-tl-[18px] rounded-br-[18px] bg-white p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--vk-green)]">
                {t.phoneLabel}
              </p>
              <a href="tel:+919996660102" className="mt-1 block text-lg font-black text-[var(--vk-green-dark)]">
                99966 60102
              </a>
            </div>
            <div className="rounded-tl-[18px] rounded-br-[18px] bg-white p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--vk-green)]">
                {t.locationLabel}
              </p>
              <p className="mt-1 text-[14px] font-bold leading-snug text-[var(--vk-green-dark)]">
                {t.location}
              </p>
            </div>
          </div>
        </div>

        {/* Related policies */}
        <div className="mt-8 text-center">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--vk-green)]">
            {t.relatedLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {legalLinks
              .filter((link) => link.href !== path)
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full bg-white px-5 py-2 text-[13px] font-bold text-[var(--vk-green-dark)] shadow-[0_4px_16px_rgba(1,90,54,0.08)] transition hover:-translate-y-0.5 hover:text-[var(--vk-pink)]"
                >
                  {link.label[language]}
                </Link>
              ))}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-[var(--vk-green)] px-7 py-3 text-sm font-extrabold text-[var(--vk-green)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-green)] hover:text-white"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
