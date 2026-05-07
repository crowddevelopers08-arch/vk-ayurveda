"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Language = "en" | "ta";
type Field = { name: string; phone: string; condition: string };

const conditions = {
  en: [
    "Back / Spine Pain",
    "Knee / Joint Pain",
    "Neck Pain",
    "Paralysis / Stroke",
    "Neurological Disorder",
    "Arthritis",
    "Other",
  ],
  ta: [
    "முதுகு / முதுகெலும்பு வலி",
    "முழங்கால் / மூட்டு வலி",
    "கழுத்து வலி",
    "பக்கவாதம் / ஸ்ட்ரோக்",
    "நரம்பியல் கோளாறு",
    "ஆர்த்ரைடிஸ்",
    "மற்றவை",
  ],
};

const copy = {
  en: {
    eyebrow: "VK Ayurveda",
    title: "Book a Consultation",
    fee: "Doctor consultation — ₹150 only",
    nameLabel: "Your Name",
    namePlaceholder: "Full name",
    phoneLabel: "Phone Number",
    phonePlaceholder: "10-digit mobile number",
    conditionLabel: "Condition / Concern",
    conditionPlaceholder: "Select your condition",
    submit: "Book My Consultation →",
    submitting: "Submitting…",
    note: "Our team will call you to confirm your appointment.",
  },
  ta: {
    eyebrow: "VK Ayurveda",
    title: "ஆலோசனை முன்பதிவு செய்யுங்கள்",
    fee: "மருத்துவர் ஆலோசனை — ₹150 மட்டுமே",
    nameLabel: "உங்கள் பெயர்",
    namePlaceholder: "முழு பெயர்",
    phoneLabel: "தொலைபேசி எண்",
    phonePlaceholder: "10 இலக்க கைபேசி எண்",
    conditionLabel: "நோய் / பிரச்சனை",
    conditionPlaceholder: "உங்கள் பிரச்சனையை தேர்வு செய்யுங்கள்",
    submit: "ஆலோசனை முன்பதிவு செய்க →",
    submitting: "சமர்ப்பிக்கிறது…",
    note: "உங்கள் சந்திப்பை உறுதிப்படுத்த எங்கள் குழு உங்களை அழைக்கும்.",
  },
};

export default function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Field>({ name: "", phone: "", condition: "" });
  const [submitting, setSubmitting] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const backdropRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = copy[language];
  const conditionList = conditions[language];

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("vk-open-booking", handler);
    return () => window.removeEventListener("vk-open-booking", handler);
  }, []);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("vk-language");
    if (savedLanguage === "en" || savedLanguage === "ta") setLanguage(savedLanguage);

    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next === "en" || next === "ta") setLanguage(next);
    };
    window.addEventListener("vk-language-change", handleLanguageChange);
    return () => window.removeEventListener("vk-language-change", handleLanguageChange);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => {
    setOpen(false);
    setFields({ name: "", phone: "", condition: "" });
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) close();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      close();
      router.push("/thank-you");
    }, 600);
  };

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-tl-[36px] rounded-br-[36px] bg-white shadow-[0_32px_80px_rgba(1,90,54,0.28)]">
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vk-lime-soft)] text-[var(--vk-green-dark)] transition hover:bg-[var(--vk-green)] hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-[var(--vk-green-dark)] px-8 py-7">
          <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--vk-lime)]">
            {t.eyebrow}
          </p>
          <h2 className="font-serif text-[1.75rem] font-black leading-tight text-white">
            {t.title}
          </h2>
          <p className="mt-1 text-sm text-white/60">{t.fee}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-8 py-7">
          <div>
            <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--vk-green)]">
              {t.nameLabel}
            </label>
            <input
              type="text"
              required
              placeholder={t.namePlaceholder}
              value={fields.name}
              onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-tl-[14px] rounded-br-[14px] border border-[var(--vk-green)]/20 bg-[var(--vk-lime-soft)] px-4 py-3 text-[15px] text-[var(--vk-green-dark)] outline-none placeholder:text-[#9ca3af] focus:border-[var(--vk-green)] focus:ring-2 focus:ring-[var(--vk-green)]/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--vk-green)]">
              {t.phoneLabel}
            </label>
            <input
              type="tel"
              required
              placeholder={t.phonePlaceholder}
              value={fields.phone}
              onChange={(e) => setFields((f) => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-tl-[14px] rounded-br-[14px] border border-[var(--vk-green)]/20 bg-[var(--vk-lime-soft)] px-4 py-3 text-[15px] text-[var(--vk-green-dark)] outline-none placeholder:text-[#9ca3af] focus:border-[var(--vk-green)] focus:ring-2 focus:ring-[var(--vk-green)]/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--vk-green)]">
              {t.conditionLabel}
            </label>
            <select
              required
              value={fields.condition}
              onChange={(e) => setFields((f) => ({ ...f, condition: e.target.value }))}
              className="w-full rounded-tl-[14px] rounded-br-[14px] border border-[var(--vk-green)]/20 bg-[var(--vk-lime-soft)] px-4 py-3 text-[15px] text-[var(--vk-green-dark)] outline-none focus:border-[var(--vk-green)] focus:ring-2 focus:ring-[var(--vk-green)]/15"
            >
              <option value="" disabled>{t.conditionPlaceholder}</option>
              {conditionList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-full bg-[var(--vk-pink)] py-3.5 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(239,33,80,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-pink-dark)] disabled:opacity-70"
          >
            {submitting ? t.submitting : t.submit}
          </button>

          <p className="text-center text-[12px] text-[#9ca3af]">
            {t.note}
          </p>
        </form>
      </div>
    </div>
  );
}
