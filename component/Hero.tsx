"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Language = "en" | "ta";

const conditions = [
  {
    label: "Back Pain",
    image: "/ban.avif",
  },
  {
    label: "Neck Pain",
    image: "/ban1.avif",
  },
  {
    label: "Joint Pain",
    image: "/ban2.avif",
  },
  {
    label: "Arthritis",
    image: "/ban3.jpg",
  },
];

const badges = [
  "NABH Certified Hospital",
  "4.8 ★ Google Rating",
  "40,000+ Patients Treated",
];

const heroCopy = {
  en: {
    tag: "Ayurvedic Pain Relief - Mumbai",
    titleLines: ["Back, Neck & Joint", "Pain Relief -"],
    titleHighlight: "Naturally.",
    subtitle: [
      "Struggling with daily pain while sitting, standing, walking, or climbing stairs?",
      "Get safe Ayurvedic treatment for long-term relief.",
    ],
    conditions: ["Back Pain", "Neck Pain", "Joint Pain", "Arthritis"],
    badges: ["NABH Certified Hospital", "4.8★ Google Rating", "40,000+ Patients Treated"],
    appointment: "Book Appointment",
    contactLabel: "Call / WhatsApp:",
    consultation: "Consultation",
    only: "Only",
    limitedSlots: "Limited slots available daily",
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
    <div style={{ position: "relative", width: "100%", minHeight: isMobile ? 650 : 500, overflow: "hidden", display: "flex", alignItems: "center", fontFamily: "'DM Sans', sans-serif" }}>

      {/* BG crossfade layers */}
      {conditions.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url('${c.image}')`,
            backgroundSize: "cover", backgroundPosition: isMobile ? "62% center" : "center",
            filter: "none",
            opacity: i === active ? 1 : 0,
            transition: "opacity 1.2s ease",
            zIndex: i === active ? 1 : i === prev ? 0 : -1,
          }}
        />
      ))}

      {/* Dark gradient overlay — reduced opacity */}
      {/* Warm glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(110deg,rgba(8,22,12,0.48) 0%,rgba(8,22,12,0.32) 42%,rgba(8,22,12,0.12) 72%,transparent 100%)",
      }} />

      <div style={{ position: "absolute", bottom: 0, left: 0, width: "60%", height: "50%", zIndex: 2, background: "radial-gradient(ellipse at 20% 100%,rgba(180,130,60,0.07),transparent 70%)", pointerEvents: "none" }} />

      {/* Gold top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, zIndex: 3, background: "linear-gradient(90deg,var(--vk-pink),var(--vk-lime) 30%,rgba(200,150,12,0.3) 70%,transparent)" }} />

      {/* Gold left border */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 3, height: "100%", zIndex: 3, background: "linear-gradient(to bottom,transparent 0%,var(--vk-pink) 20%,var(--vk-lime) 50%,var(--vk-pink) 80%,transparent 100%)" }} />

      {/* Corner deco */}
      <div style={{ position: "absolute", top: 16, right: 28, zIndex: 2, opacity: 0.05, fontSize: 120, lineHeight: 1, color: "#fff", fontFamily: "Georgia,serif", fontWeight: 900, pointerEvents: "none", userSelect: "none" }}>✦</div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 4, padding: isMobile ? "110px 18px 76px 22px" : "95px 44px 52px 52px", maxWidth: 940, width: "100%" }}>

        {/* Tag */}
        <div style={anim(0.1)}>
          <span style={{ fontSize: isMobile ? 9 : 10, fontWeight: 600, letterSpacing: isMobile ? "0.14em" : "0.2em", textTransform: "uppercase", color: "var(--vk-lime)", padding: isMobile ? "5px 10px" : "5px 14px", borderRadius: 3, border: "1px solid rgba(232,184,75,0.35)", background: "rgba(200,150,12,0.1)", display: "inline-block", marginBottom: isMobile ? 16 : 22 }}>
            {copy.tag}
          </span>
        </div>

        {/* Headline */}
        <div style={anim(0.22)}>
          <h1 style={{ fontFamily: "Georgia,'Playfair Display',serif", fontSize: isMobile ? (language === "ta" ? "clamp(1.6rem,7.2vw,2.25rem)" : "clamp(2rem,10vw,3rem)") : language === "ta" ? "clamp(1.2rem,3.6vw,2.9rem)" : "clamp(1.25rem,4.5vw,4rem)", fontWeight: 900, lineHeight: 1.08, color: "#fff", textShadow: "0 2px 30px rgba(0,0,0,0.6)", marginBottom: isMobile ? 14 : 18 }}>
            {copy.titleLines[0]}<br />
            {copy.titleLines[1]}{" "}
            <span style={{ color: "var(--vk-lime)" }}>{copy.titleHighlight}</span>
          </h1>
        </div>

        {/* Subtext */}
        <p style={{ ...anim(0.34), fontSize: isMobile ? 15.5 : 19, color: "rgba(255, 255, 255, 0.87)", lineHeight: isMobile ? 1.58 : 1.75, marginBottom: 14, maxWidth: 600, borderLeft: "2px solid rgba(232,184,75,0.4)", paddingLeft: isMobile ? 10 : 14 }}>
          {copy.subtitle[0]}<br />
          {copy.subtitle[1]}
        </p>

        {/* Active condition label */}
        <div style={{ ...anim(0.38), display: "flex", alignItems: "center", gap: 7, marginBottom: 14, minHeight: 22 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--vk-lime)", flexShrink: 0, animation: "blink 1.5s infinite" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--vk-lime)", transition: "opacity 0.4s ease", opacity: labelVisible ? 1 : 0 }}>
            {copy.conditions[active]}
          </span>
        </div>

        {/* Condition pills — clickable */}
        <div style={{ ...anim(0.44), display: "flex", flexWrap: "wrap", gap: isMobile ? 6 : 8, marginBottom: isMobile ? 18 : 24 }}>
          {conditions.map((_, i) => (
            <span
              key={copy.conditions[i]}
              onClick={() => handlePillClick(i)}
              style={{
                fontSize: isMobile ? 12 : 14, fontWeight: i === active ? 700 : 400, padding: isMobile ? "5px 10px" : "6px 16px",
                borderRadius: 99, cursor: "pointer",
                border: `1px solid ${i === active ? "rgba(232,184,75,0.65)" : "rgba(255,255,255,0.14)"}`,
                background: i === active ? "rgba(200,150,12,0.2)" : "rgba(255,255,255,0.04)",
                color: i === active ? "var(--vk-lime)" : "rgba(255, 255, 255, 0.91)",
                transition: "all 0.4s ease",
              }}
            >
              {copy.conditions[i]}
            </span>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{ ...anim(0.52), display: "flex", flexWrap: "wrap", gap: isMobile ? 7 : 10, marginBottom: isMobile ? 22 : 28 }}>
          {copy.badges.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: isMobile ? 12 : 14, fontWeight: 500, color: "rgba(255, 255, 255, 0.86)", padding: isMobile ? "5px 9px" : "6px 12px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--vk-lime)", display: "inline-block", flexShrink: 0 }} />
              {b}
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div  style={{ ...anim(0.62), display: "flex", flexWrap: "wrap", alignItems: "center", gap: isMobile ? 12 : 16, marginBottom: isMobile ? 22 : 28 }}>
          <button onClick={() => window.dispatchEvent(new CustomEvent("vk-open-booking"))} className="rv2-cta-link" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, color: "#fff", fontWeight: 700, fontSize: isMobile ? 12.5 : 13.5, padding: isMobile ? "12px 18px" : "13px 28px", borderRadius:50, cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase", width: isMobile ? "100%" : undefined }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {copy.appointment}
          </button>
          <a href="tel:9996660102" style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255, 255, 255, 0.94)", fontSize: isMobile ? 12.5 : 13.5, fontWeight: 500, textDecoration: "none", width: isMobile ? "100%" : undefined }}>
            <span style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(232,184,75,0.4)", background: "rgba(200,150,12,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--vk-lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.5 2 2 0 0 1 3.59 1.34h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            {copy.contactLabel}<span style={{ color: "var(--vk-lime)", fontWeight: 700 }}>+91 99966 60102</span>
          </a>
        </div>

        {/* Price */}
        <div style={{ ...anim(0.72), display: "flex", alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 10 : 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: isMobile ? 12.5 : 14, fontWeight: 700, padding: isMobile ? "8px 14px" : "9px 20px", borderRadius: 50, background: "rgba(232,184,75,0.14)", border: "1px solid rgba(232,184,75,0.35)", color: "var(--vk-lime)" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--vk-lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            {copy.consultation} <span style={{ fontSize: isMobile ? 17 : 20, fontFamily: "Georgia,serif" }}>₹150</span>
            <span style={{ fontSize: 11, opacity: 0.7 }}>{copy.only}</span>
          </div>
          <span style={{ fontSize: isMobile ? 12.5 : 14, color: "rgba(255, 255, 255, 0.96)" }}>{copy.limitedSlots}</span>
        </div>
      </div>

      {showLanguagePopup && (
        <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0, 0, 0, 0.48)", backdropFilter: "blur(6px)" }}>
          <div style={{ width: "min(100%, 420px)", borderRadius: 22, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.96)", boxShadow: "0 24px 70px rgba(0,0,0,0.32)", padding: 28, textAlign: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", margin: "0 auto 16px", background: "var(--vk-lime-soft)", color: "var(--vk-green)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20 }}>
              அ
            </div>
            <h2 style={{ margin: "0 0 8px", color: "var(--vk-green-dark)", fontFamily: "Georgia,'Playfair Display',serif", fontSize: language === "ta" ? 23 : 28, lineHeight: 1.2 }}>
              {copy.popupTitle}
            </h2>
            <p style={{ margin: "0 0 22px", color: "#5b665f", fontSize: 15, lineHeight: 1.6 }}>
              {copy.popupSubtitle}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button type="button" onClick={() => chooseLanguage("en")} style={{ border: "1.5px solid var(--vk-green)", borderRadius: 999, background: "#fff", color: "var(--vk-green)", cursor: "pointer", padding: "13px 18px", fontSize: 15, fontWeight: 800 }}>
                {copy.english}
              </button>
              <button type="button" onClick={() => chooseLanguage("ta")} style={{ border: "1.5px solid var(--vk-pink)", borderRadius: 999, background: "var(--vk-pink)", color: "#fff", cursor: "pointer", padding: "13px 18px", fontSize: 15, fontWeight: 800, boxShadow: "0 8px 24px rgba(239,33,80,0.28)" }}>
                {copy.tamil}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
