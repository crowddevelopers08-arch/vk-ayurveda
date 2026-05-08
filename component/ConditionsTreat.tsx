"use client";

import { useEffect, useState } from "react";

type Language = "en" | "ta";

const conditionGroups = [
  {
    title: "Back Pain",
    titleTa: "முதுகு வலி",
    items: ["Slip Disc", "Sciatica", "Lumbar Spondylosis"],
    itemsTa: ["முதுகுத் தட்டு வழிதல்", "சயாட்டிகா நரம்பு வலி", "கீழ் முதுகெலும்பு தேய்மானம்"],
    image:
      "/back.avif",
  },
  {
    title: "Neck Pain",
    titleTa: "கழுத்து வலி",
    items: ["Cervical Spondylosis", "Neck Stiffness", "Disc Problems"],
    itemsTa: ["கழுத்து முதுகெலும்பு தேய்மானம்", "கழுத்து பிடிப்பு", "முதுகுத்தட்டு பிரச்சினைகள்"],
    image:
      "/neck.jpg",
  },
  {
    title: "Joint & Arthritis",
    titleTa: "மூட்டு & ஆர்த்ரைடிஸ்",
    items: ["Knee Pain", "Joint Pain", "Rheumatoid Arthritis", "Joint Swelling & Stiffness"],
    itemsTa: ["முழங்கால் வலி", "மூட்டு வலி", "மூட்டு வாதம்", "மூட்டு வீக்கம் மற்றும் பிடிப்பு"],
    image:
      "/kneee.avif",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "Conditions We Treat",
    titleLine1: "Focused Ayurvedic Care For",
    titleLine2: "Pain & Mobility",
    subtitle: "Personalized treatment plans for spine, neck, joint, and arthritis-related conditions.",
  },
  ta: {
    eyebrow: "நாங்கள் சிகிச்சை அளிக்கும் பிரச்சனைகள்",
    titleLine1: "வலி மற்றும் இயக்கத்திற்கான",
    titleLine2: "ஆயுர்வேத சிகிச்சை",
    subtitle: "முதுகு, கழுத்து, மூட்டு மற்றும் ஆர்த்ரைடிஸ் தொடர்பான பிரச்சனைகளுக்கு தனிப்பட்ட சிகிச்சை திட்டங்கள்.",
  },
} satisfies Record<Language, { eyebrow: string; titleLine1: string; titleLine2: string; subtitle: string }>;

export default function ConditionsTreat() {
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
    <section id="conditions" className="relative overflow-hidden bg-[var(--vk-lime-soft)] px-4 py-9 sm:px-6 sm:py-12 lg:py-20">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[var(--vk-green)]/10" />
      <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[var(--vk-pink)]/10" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-7 text-center sm:mb-12">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--vk-green)] sm:mb-3 sm:text-[13px] sm:tracking-[0.18em]">
            {copy.eyebrow}
          </p>
          <h2 style={{fontFamily:"Georgia,'Playfair Display',serif", fontWeight: "900", fontSize: language === "ta" ? "clamp(1.15rem,3.2vw,2.5rem)" : "clamp(1.25rem,3.5vw,4rem)", letterSpacing: "-0.02em"}} className="mx-auto max-w-4xl font-black leading-[1.12] text-[var(--vk-green-dark)]">
            {copy.titleLine1} <br />
            <span style={{ color: "var(--vk-pink)" }}>{copy.titleLine2}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] font-medium leading-[1.6] text-[#4b5563] sm:mt-4 sm:text-[19px] sm:leading-[1.75]">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6">
          {conditionGroups.map((group) => (
            <article
              key={group.title}
              className="group overflow-hidden rounded-tl-[24px] rounded-br-[24px] border border-[var(--vk-green)]/10 bg-white shadow-[0_14px_32px_rgba(1,90,54,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(1,90,54,0.16)] sm:rounded-tl-[34px] sm:rounded-br-[34px] sm:shadow-[0_18px_42px_rgba(1,90,54,0.12)]"
            >
              <div
                className="relative h-36 bg-cover bg-center sm:h-48"
                style={{ backgroundImage: `url(${group.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--vk-green-dark)]/85 via-[var(--vk-green-dark)]/15 to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 font-sans text-[21px] font-extrabold leading-tight text-white sm:bottom-5 sm:left-5 sm:right-5 sm:text-[28px]">
                  {language === "ta" ? group.titleTa : group.title}
                </h3>
              </div>

              <div className="p-4 sm:p-6">
                <ul className="space-y-2.5 sm:space-y-3">
                  {(language === "ta" ? group.itemsTa : group.items).map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 rounded-tl-[14px] rounded-br-[14px] bg-[var(--vk-lime-soft)] px-3 py-2.5 text-[14px] font-bold leading-tight text-[var(--vk-green-dark)] transition group-hover:bg-[#edf7bd] sm:gap-3 sm:rounded-tl-[16px] sm:rounded-br-[16px] sm:px-4 sm:py-3 sm:text-[16px]"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--vk-pink)] sm:h-2.5 sm:w-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
