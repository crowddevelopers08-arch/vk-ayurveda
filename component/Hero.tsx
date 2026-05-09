"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Language = "en" | "ta";

const conditions = [
  {
    label: "Back Pain",
    image: "/back.png",
  },
  {
    label: "Neck Pain",
    image: "/neck.png",
  },
  {
    label: "Joint Pain",
    image: "/joint.png",
  },
  {
    label: "Arthritis",
    image: "/arthr.png",
  },
];

const badges = [
  "NABH Certified Hospital",
  "4.8 ★ Google Rating",
  "40,000+ Patients Treated",
];

const heroCopy = {
  en: {
    tag: "Ayurvedic Pain Relief",
    titleLines: ["Back, Neck & Joint", "Pain Relief -"],
    titleHighlight: "Naturally.",
    subtitle: [
      "Struggling with daily pain while sitting, standing, walking, or climbing stairs?",
      "Get safe Ayurvedic treatment for long-term relief.",
    ],
    conditions: ["Back Pain", "Neck Pain", "Joint Pain", "Arthritis"],
    badges: ["NABH Certified Hospital", "4.8★ Google Rating", "40,000+ Patients Treated"],
    appointment: "Book Appointment",
    contactLabel: "WhatsApp:",
    consultation: "Consultation",
    only: "Only",
    limitedSlots: "Limited slots available daily",
    treatment: "Results in 7–14 Days",
    popupTitle: "Choose Your Language",
    popupSubtitle: "Select your preferred language to continue.",
    english: "English",
    tamil: "தமிழ்",
  },
  ta: {
    tag: "ஆயுர்வேத வலி நிவாரணம் - மும்பை",
    titleLines: ["முதுகு, கழுத்து & மூட்டு", "வலி தீர்வு -"],
    titleHighlight: "இயற்கையாக",
    subtitle: [
      "உட்கார, நிற்க, நடக்க, படிக்கட்டு ஏற கூட வலியா?",
      "நிரந்தர நிவாரணத்திற்கு ஆயுர்வேத சிகிச்சை பெறுங்கள்",
    ],
    conditions: ["முதுகு வலி", "கழுத்து வலி", "மூட்டு வலி", "ஆர்த்ரைடிஸ்"],
    badges: ["NABH மருத்துவமனை", "4.8★ மதிப்பீடு", "40,000+ நோயாளிகள்"],
    appointment: "ஆலோசனை பதிவு செய்ய",
    contactLabel: "அழைக்க / வாட்ஸ்அப்:",
    consultation: "ஆலோசனை",
    only: "மட்டும்",
    limitedSlots: "தினமும் குறைந்த இடங்கள் மட்டுமே",
    treatment: "7–14 நாளில் நிவாரணம்",
    popupTitle: "மொழியை தேர்வு செய்யுங்கள்",
    popupSubtitle: "தொடர உங்கள் விருப்பமான மொழியை தேர்வு செய்யுங்கள்.",
    english: "English",
    tamil: "தமிழ்",
  },
} satisfies Record<Language, {
  tag: string;
  titleLines: string[];
  titleHighlight: string;
  subtitle: string[];
  conditions: string[];
  badges: string[];
  appointment: string;
  contactLabel: string;
  consultation: string;
  only: string;
  limitedSlots: string;
  treatment: string;
  popupTitle: string;
  popupSubtitle: string;
  english: string;
  tamil: string;
}>;

export default function AyurvedaBanner() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [labelVisible, setLabelVisible] = useState(true);
  const [language, setLanguage] = useState<Language>("en");
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const copy = heroCopy[language];

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("vk-language");
    if (savedLanguage === "en" || savedLanguage === "ta") {
      setLanguage(savedLanguage);
      return;
    }
    setShowLanguagePopup(true);
  }, []);

  useEffect(() => {
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
    setShowLanguagePopup(false);
  };

  const switchTo = useCallback((getNext: number | ((current: number) => number)) => {
    setActive((cur) => {
      const next = typeof getNext === "function" ? getNext(cur) : getNext;
      if (next === cur) return cur;
      setPrev(cur);
      setLabelVisible(false);
      setTimeout(() => {
        setLabelVisible(true);
        setPrev(null);
      }, 500);
      return next;
    });
  }, []);

  const startCycle = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      switchTo((i) => (i + 1) % conditions.length);
    }, 3000);
  }, [switchTo]);

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [startCycle]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showLanguagePopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showLanguagePopup]);

  const handlePillClick = (i: number) => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    switchTo(i);
    startCycle();
  };

  const anim = (delay: number) => ({
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(20px)",
  });

  return (
    <div className="max-sm:mt-5" style={{ position: "relative", width: "100%", minHeight: isMobile ? 680 : 680, overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Cycling background images — full visible, especially at top */}
      {conditions.map((c, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(239,33,80,0.24), rgba(239,33,80,0.24)), url('${c.image}')`,
          backgroundSize: "cover",
          backgroundPosition: isMobile ? "60% top" : "center top",
          opacity: i === active ? 1 : 0,
          transition: "opacity 1.2s ease",
          zIndex: i === active ? 1 : i === prev ? 0 : -1,
        }} />
      ))}

      {/* Bottom-to-top gradient: image shows at top, dark content area at bottom */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to top, rgba(1,16,8,0.96) 0%, rgba(1,16,8,0.80) 22%, rgba(1,16,8,0.44) 42%, rgba(1,16,8,0.12) 62%, rgba(1,16,8,0.02) 80%, rgba(1,16,8,0.14) 100%)",
      }} />

      {/* Thin side vignette to frame the image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(90deg, rgba(1,10,5,0.54) 0%, rgba(1,10,5,0.28) 36%, transparent 66%), radial-gradient(ellipse at center, transparent 58%, rgba(1,10,5,0.38) 100%)" }} />

      {/* Gold top accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, zIndex: 10, background: "linear-gradient(90deg, var(--vk-pink) 0%, var(--vk-lime) 35%, rgba(232,184,75,0.5) 65%, transparent 100%)" }} />

      {/* Spacer — pushes content block to bottom */}
      <div style={{ flex: 1 }} />

      {/* ── Bottom content block ── */}
      <div style={{ position: "relative", zIndex: 5, width: "100%", padding: isMobile ? "77px 22px 44px" : "0 56px 52px" }}>

        {/* Two-column on desktop */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "flex-end", gap: isMobile ? 20 : 48, maxWidth: 1280 }}>

          {/* LEFT — tag, headline, subtitle, CTA, price */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>

            {/* Tag */}
            <div style={anim(0.08)}>
              <span style={{ display: "inline-block", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--vk-lime)", padding: "5px 12px", borderRadius: 4, border: "1px solid rgba(232,184,75,0.4)", background: "rgba(200,150,12,0.12)", marginBottom: isMobile ? 12 : 16 }}>
                {copy.tag}
              </span>
            </div>

            {/* Headline */}
            <div style={anim(0.18)}>
              <h1 style={{ fontFamily: "Georgia,'Playfair Display',serif", margin: 0, marginBottom: isMobile ? 10 : 14, fontWeight: 900, lineHeight: 1.08, color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.5)", fontSize: isMobile ? (language === "ta" ? "clamp(1.65rem,7vw,2.3rem)" : "clamp(2rem,9vw,2.9rem)") : (language === "ta" ? "clamp(1.4rem,3.2vw,2.8rem)" : "clamp(1.8rem,4vw,3.6rem)") }}>
                {copy.titleLines[0]}<br />
                {copy.titleLines[1]}{" "}
                <span style={{ color: "var(--vk-lime)" }}>{copy.titleHighlight}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div style={anim(0.26)}>
              <p style={{ fontSize: isMobile ? 14 : 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.68, margin: 0, marginBottom: isMobile ? 18 : 24, paddingLeft: isMobile ? 10 : 14, borderLeft: "2px solid rgba(232,184,75,0.5)" }}>
                {copy.subtitle[0]}<br />{copy.subtitle[1]}
              </p>
            </div>

            {/* Treatment duration badge */}
            <div style={anim(0.30)}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: isMobile ? 14 : 18, padding: "7px 14px", borderRadius: 50, background: "rgba(232,184,75,0.1)", border: "1px solid rgba(232,184,75,0.35)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--vk-lime)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--vk-lime)" }}>{copy.treatment}</span>
                <span style={{ width: 1, height: 12, background: "rgba(232,184,75,0.3)", display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>No Surgery · 100% Natural</span>
              </div>
            </div>

            {/* CTA row */}
            <div style={anim(0.34)}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: isMobile ? 10 : 14, marginBottom: isMobile ? 14 : 18 }}>
                <button onClick={() => window.dispatchEvent(new CustomEvent("vk-open-booking"))} className="rv2-cta-link"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#fff", fontWeight: 700, fontSize: isMobile ? 13 : 14, padding: isMobile ? "13px 22px" : "13px 28px", borderRadius: 50, cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase", width: isMobile ? "100%" : undefined }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {copy.appointment}
                </button>
                <a href="tel:9996660102" style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.9)", fontSize: isMobile ? 13 : 14, fontWeight: 500, textDecoration: "none", width: isMobile ? "100%" : undefined }}>
                  <span style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(232,184,75,0.4)", background: "rgba(200,150,12,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--vk-lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.5 2 2 0 0 1 3.59 1.34h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <span>{copy.contactLabel} <strong style={{ color: "var(--vk-lime)" }}>+91 99966 60102</strong></span>
                </a>
              </div>
            </div>

            {/* Price */}
            <div style={anim(0.4)}>
              <div style={{ display: isMobile ? "none" : "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, padding: "7px 16px", borderRadius: 50, background: "rgba(232,184,75,0.12)", border: "1px solid rgba(232,184,75,0.35)", color: "var(--vk-lime)" }}>
                {copy.consultation}&nbsp;<span style={{ fontSize: isMobile ? 17 : 18, fontFamily: "Georgia,serif" }}>₹150</span>
                <span style={{ fontSize: 10.5, opacity: 0.7 }}>{copy.only}</span>
                <span style={{ width: 1, height: 13, background: "rgba(232,184,75,0.3)", display: "inline-block" }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>{copy.limitedSlots}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — condition display + pills + trust badges */}
          <div style={{ flex: isMobile ? "none" : "0 0 380px" }}>

            {/* Big animated condition name */}
            <div style={anim(0.12)}>
              <div style={{ marginBottom: isMobile ? 12 : 16, padding: isMobile ? "14px 18px" : "18px 24px", borderRadius: 16, background: "rgba(1,40,18,0.55)", border: "1px solid rgba(232,184,75,0.18)", backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--vk-lime)", flexShrink: 0, animation: "blink 1.5s infinite" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,184,75,0.85)" }}>Now Treating</span>
                </div>
                <div style={{ fontSize: isMobile ? 22 : 28, fontFamily: "Georgia,'Playfair Display',serif", fontWeight: 800, color: "#fff", lineHeight: 1.15, transition: "opacity 0.4s", opacity: labelVisible ? 1 : 0 }}>
                  {copy.conditions[active]}
                </div>
              </div>
            </div>

            {/* Condition pills */}
            <div style={anim(0.2)}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: isMobile ? 14 : 18 }}>
                {conditions.map((_, i) => (
                  <span key={copy.conditions[i]} onClick={() => handlePillClick(i)} style={{
                    fontSize: 12.5, fontWeight: i === active ? 700 : 500,
                    padding: "6px 14px", borderRadius: 99, cursor: "pointer",
                    border: `1.5px solid ${i === active ? "var(--vk-lime)" : "rgba(255,255,255,0.2)"}`,
                    background: i === active ? "rgba(232,184,75,0.2)" : "rgba(255,255,255,0.06)",
                    color: i === active ? "var(--vk-lime)" : "rgba(255,255,255,0.8)",
                    transition: "all 0.3s",
                  }}>
                    {copy.conditions[i]}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div style={anim(0.28)}>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {copy.badges.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.88)", padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(232,184,75,0.18)", background: "rgba(1,40,18,0.45)", backdropFilter: "blur(8px)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--vk-lime)", flexShrink: 0 }} />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language popup */}
      {showLanguagePopup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}>
          <div style={{ width: "min(100%,420px)", borderRadius: 22, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.97)", boxShadow: "0 24px 70px rgba(0,0,0,0.32)", padding: 28, textAlign: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", margin: "0 auto 16px", background: "var(--vk-lime-soft)", color: "var(--vk-green)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20 }}>அ</div>
            <h2 style={{ margin: "0 0 8px", color: "var(--vk-green-dark)", fontFamily: "Georgia,'Playfair Display',serif", fontSize: language === "ta" ? 23 : 28, lineHeight: 1.2 }}>{copy.popupTitle}</h2>
            <p style={{ margin: "0 0 22px", color: "#5b665f", fontSize: 15, lineHeight: 1.6 }}>{copy.popupSubtitle}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button type="button" onClick={() => chooseLanguage("en")} style={{ border: "1.5px solid var(--vk-green)", borderRadius: 999, background: "#fff", color: "var(--vk-green)", cursor: "pointer", padding: "13px 18px", fontSize: 15, fontWeight: 800 }}>{copy.english}</button>
              <button type="button" onClick={() => chooseLanguage("ta")} style={{ border: "1.5px solid var(--vk-pink)", borderRadius: 999, background: "var(--vk-pink)", color: "#fff", cursor: "pointer", padding: "13px 18px", fontSize: 15, fontWeight: 800, boxShadow: "0 8px 24px rgba(239,33,80,0.28)" }}>{copy.tamil}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
