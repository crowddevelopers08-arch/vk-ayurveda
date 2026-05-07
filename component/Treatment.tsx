"use client";

import { useEffect, useState } from "react";

type Language = "en" | "ta";

const stats = [
  {
    value: "",
    label: "Body Detox",
    labelTa: "உடல் சுத்திகரிப்பு",
    image:
      "/images5.avif",
    className: "md:col-start-1 md:row-start-1",
  },
  {
    value: "",
    label: "Pain Relief",
    labelTa: "வலி நிவாரணம்",
    image:
      "/images6.avif",
    className: "md:col-start-1 md:row-start-2",
  },
  {
    value: "",
    label: "Muscle Relaxation",
    labelTa: "தசை தளர்வு",
    image:
      "/images7.avif",
    className: "md:col-start-2 md:row-span-2 md:row-start-1",
    large: true,
  },
  {
    value: "",
    label: "Joint Mobility Improvement",
    labelTa: "மூட்டு இயக்க மேம்பாடு",
    image:
      "/images8.avif",
    className: "md:col-start-3 md:row-start-1",
  },
  {
    value: "",
    label: "Better Body Strength",
    labelTa: "உடல் பலம் அதிகரிப்பு",
    image:
      "/Ayurvedic-Therapies.avif",
    className: "md:col-start-3 md:row-start-2",
  },
];

const sectionCopy = {
  en: {
    titleLine1: "Panchakarma for Long-Term",
    titleLine2: "Pain Relief",
    subtitle: "Panchakarma helps improve body movement and reduce long-term pain naturally.",
    benefitLabel: "",
    duration: "7-14 days treatment",
  },
  ta: {
    titleLine1: "நிரந்தர வலி நிவாரணத்திற்கு",
    titleLine2: "பஞ்சகர்மா",
    subtitle: "பஞ்சகர்மா சிகிச்சை உடல் இயக்கத்தை மேம்படுத்தி வலியை குறைக்க உதவும்.",
    benefitLabel: "",
    duration: "👉 7–14 நாட்கள் சிகிச்சை",
  },
} satisfies Record<Language, {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  benefitLabel: string;
  duration: string;
}>;

export default function NumbersSpeak() {
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
    <section id="treatment" className="px-4 py-8 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-[1232px]">
        <div className="mb-7 text-center md:mb-10">
          <h2
            className={`font-serif font-black leading-[1.12] tracking-[-0.02em] text-[var(--vk-green-dark)] ${
              language === "ta"
                ? "text-[clamp(1.15rem,3.2vw,2.5rem)]"
                : "text-[clamp(1.25rem,3.5vw,4rem)]"
            }`}
          >
            {copy.titleLine1} <br />
            <span style={{ color: "var(--vk-pink)" }}>{copy.titleLine2}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-[15.5px] font-normal leading-[1.65] text-[#3d3d3d] sm:mt-4 sm:text-[19px] sm:leading-[1.75]">
            {copy.subtitle}
          </p>
          <p className="mt-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--vk-pink)] sm:mt-4 sm:text-[15px] sm:tracking-[0.16em]">
            {copy.benefitLabel}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-[1fr_1fr_1fr] md:grid-rows-[304px_350px] md:gap-x-5 md:gap-y-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className={`relative min-h-[180px] overflow-hidden rounded-tl-[22px] bg-cover bg-center shadow-sm sm:min-h-[240px] sm:rounded-tl-[28px] md:min-h-[300px] ${
                stat.large ? "md:min-h-0" : ""
              } ${stat.className}`}
              style={{ backgroundImage: `url(${stat.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/34 to-black/5" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-black/4" />

              <div className="relative z-10 flex min-h-[180px] flex-col justify-end p-4 text-white sm:min-h-[240px] sm:p-5 md:min-h-0 md:p-6">
                <div className="font-serif text-[clamp(1.25rem,4.5vw,4rem)] font-black leading-[1.12] tracking-[-0.03em]">
                  {stat.value}
                </div>
                <div className="mt-3 font-sans text-[16px] font-semibold leading-tight tracking-[-0.02em] sm:mt-4 sm:text-[19px]">
                  {language === "ta" ? stat.labelTa : stat.label}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 text-center sm:mt-8">
          <span className="inline-flex max-w-full rounded-full bg-[var(--vk-lime-soft)] px-4 py-2.5 text-center text-[13px] font-extrabold leading-tight text-[var(--vk-green)] ring-1 ring-[var(--vk-green)]/10 sm:px-5 sm:py-3 sm:text-[15px]">
            {copy.duration}
          </span>
        </div>
      </div>
    </section>
  );
}
