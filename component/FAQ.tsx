"use client";

import { useEffect, useState } from "react";

type Language = "en" | "ta";

const faqs = [
  {
    question: "Can I avoid surgery?",
    questionTa: "அறுவை சிகிச்சை தவிர்க்க முடியுமா?",
    answer: "In many cases, yes.",
    answerTa: "பல சமயங்களில் முடியும்",
  },
  {
    question: "Is Panchakarma safe?",
    questionTa: "பஞ்சகர்மா பாதுகாப்பானதா?",
    answer: "Yes, treatments are natural and safe.",
    answerTa: "ஆம்",
  },
  {
    question: "How long does treatment take?",
    questionTa: "சிகிச்சை எத்தனை நாள்?",
    answer: "Depends on your condition.",
    answerTa: "உடல்நிலைக்கு ஏற்ப மாறும்",
  },
  {
    question: "Is admission needed?",
    questionTa: "அனுமதி தேவைப்படுமா?",
    answer: "Only if recommended by doctor.",
    answerTa: "மருத்துவர் பரிந்துரைத்தால் மட்டும்",
  },
  {
    question: "Consultation fee?",
    questionTa: "ஆலோசனை கட்டணம்?",
    answer: "₹150 only.",
    answerTa: "₹150 மட்டும்",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "Patient Questions",
    heroTitle: "Clear answers before you begin.",
    title: "FAQ",
    feeLabel: "Consultation fee?",
    fee: "₹150 only.",
  },
  ta: {
    eyebrow: "",
    heroTitle: "",
    title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    feeLabel: "",
    fee: "₹150 மட்டும்",
  },
} satisfies Record<Language, {
  eyebrow: string;
  heroTitle: string;
  title: string;
  feeLabel: string;
  fee: string;
}>;

export default function FAQ() {
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
    <section className="relative overflow-hidden bg-[var(--vk-lime-soft)] px-4 py-10 sm:px-6 sm:py-16 lg:py-8">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[var(--vk-green)]/10" />
      <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[var(--vk-pink)]/10" />

      <div className="relative mx-auto grid max-w-6xl gap-7 sm:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative min-h-[260px] overflow-hidden rounded-tl-[34px] rounded-br-[34px] bg-[var(--vk-green-dark)] shadow-[0_18px_42px_rgba(0,63,42,0.18)] sm:min-h-[430px] sm:rounded-tl-[52px] sm:rounded-br-[52px] sm:shadow-[0_24px_60px_rgba(0,63,42,0.2)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/Panchakarma-Care.avif')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--vk-green-dark)]/74 via-[var(--vk-green-dark)]/18 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
            {copy.eyebrow ? (
              <p className="inline-flex w-fit rounded-full bg-[rgba(200,150,12,0.12)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--vk-green-dark)] shadow-[0_8px_24px_rgba(0,63,42,0.28)] ring-1 ring-white/15 backdrop-blur-sm sm:px-4 sm:text-[12px] sm:tracking-[0.24em]">
                {copy.eyebrow}
              </p>
            ) : null}
            <h2
              className={`mt-2 max-w-md font-serif font-black leading-[1.12] text-white ${
                language === "ta"
                  ? "text-[clamp(1.3rem,6vw,2rem)] sm:text-[clamp(1.15rem,3.3vw,2.45rem)]"
                  : "text-[clamp(1.65rem,8vw,2.4rem)] sm:text-[clamp(1.25rem,4.5vw,4rem)]"
              }`}
            >
              {copy.heroTitle}
            </h2>
          </div>
        </div>

        <div>
          <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.22em] text-[var(--vk-green)]">
           
          </p>
          <div className="mb-5 flex items-end justify-between gap-5 border-b border-[var(--vk-green)]/16 pb-4 sm:mb-8 sm:pb-6">
            <h2
              className={`font-serif font-black leading-[1.12] text-[var(--vk-pink)] ${
                language === "ta"
                  ? "text-[clamp(1.25rem,6vw,1.9rem)] sm:text-[clamp(1.15rem,3.2vw,2.4rem)]"
                  : "text-[clamp(1.65rem,8vw,2.4rem)] sm:text-[clamp(1.25rem,4.5vw,4rem)]"
              }`}
            >
              {copy.title}
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="grid grid-cols-[30px_1fr] gap-3 border-b border-[var(--vk-green)]/12 pb-3 sm:grid-cols-[42px_1fr] sm:gap-4 sm:pb-4"
              >
                <span className="pt-1 text-xs font-extrabold text-[var(--vk-pink)] sm:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[16px] font-extrabold leading-tight text-[var(--vk-green-dark)] sm:text-[19px]">
                    {language === "ta" ? faq.questionTa : faq.question}
                  </h3>
                  <p className="mt-1.5 text-[15px] font-medium leading-[1.6] text-[#4b5563] sm:mt-2 sm:text-[19px] sm:leading-[1.75]">
                    {language === "ta" ? faq.answerTa : faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("vk-open-booking"))}
            className="cursor-pointer rv2-cta-link mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full px-4 py-3 text-center text-white transition hover:-translate-y-0.5 sm:mt-8 sm:w-auto sm:gap-4 sm:px-6 sm:py-4 sm:text-left"
          >
            <span className="text-xs font-extrabold uppercase tracking-[0.08em] sm:text-sm sm:tracking-[0.14em]">
              {copy.feeLabel}
            </span>
            <span className="font-serif text-2xl font-bold leading-none sm:text-3xl">{copy.fee}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
