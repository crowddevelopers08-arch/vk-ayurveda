"use client";

import { useEffect, useState } from "react";

type Language = "en" | "ta";

const problems = [
  {
    title: "Daily pain while sitting or standing",
    titleTa: "உட்காரும் / நிற்கும் போது வலி",
    sub: "Persistent discomfort affecting your posture",
    subTa: "உடல் நிலையை பாதிக்கும் தொடர்ச்சியான அசௌகரியம்",
    bg: "/images.png",
  },
  {
    title: "Fear of surgery",
    titleTa: "அறுவை சிகிச்சை பயம்",
    sub: "Anxiety around invasive procedures",
    subTa: "அறுவை சிகிச்சை குறித்து உள்ள கவலை",
    bg: "/images4.png",
  },
  {
    title: "Joint stiffness in the morning",
    titleTa: "காலை நேர மூட்டு பிடிப்பு",
    sub: "Waking up with rigid, aching joints",
    subTa: "காலை எழுந்தவுடன் மூட்டுகளில் பிடிப்பு மற்றும் வலி",
    bg: "/images3.png",
  },
  {
    title: "Neck pain while working or sleeping",
    titleTa: "வேலை செய்யும் போது கழுத்து வலி",
    sub: "Tension building from screen time and rest",
    subTa: "நீண்ட நேர வேலை மற்றும் ஓய்வின்போதும் ஏற்படும் வலி",
    bg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
  },
  {
    title: "Painkillers giving only temporary relief",
    titleTa: "மாத்திரை எடுத்தாலும் தற்காலிக நிவாரணம்",
    sub: "Short-term fix, long-term dependency",
    subTa: "சிறிது நேர நிவாரணம் மட்டும் தரும் நிலை",
    bg: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
  },
  {
    title: "Difficulty in walking or bending",
    titleTa: "நடக்க / குனிய சிரமம்",
    sub: "Limits your movement and independence",
    subTa: "உங்கள் இயக்கத்தையும் தினசரி செயல்களையும் கட்டுப்படுத்தும் சிரமம்",
    bg: "/images1.png",
  },
  {
    title: "Difficulty climbing stairs",
    titleTa: "படிக்கட்டு ஏற சிரமம்",
    sub: "Simple tasks becoming a challenge",
    subTa: "சாதாரண செயல்களும் சவாலாக மாறும் நிலை",
    bg: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80",
  },
  {
    title: "Long-term pain affecting daily life",
    titleTa: "நீண்ட நாள் வலி",
    sub: "Constant pain stealing your quality of life",
    subTa: "தினசரி வாழ்க்கையை பாதிக்கும் நீண்ட நாள் வலி",
    bg: "/images2.png",
  },
];

const duplicated = [...problems, ...problems];

const sectionCopy = {
  en: {
    eyebrow: "Are you experiencing",
    titleLine1: "Common Pain",
    titleLine2: "Problems",
  },
  ta: {
    eyebrow: "உங்களுக்கு இவை உள்ளதா?",
    titleLine1: "பொதுவான வலி",
    titleLine2: "பிரச்சனைகள்",
  },
} satisfies Record<Language, { eyebrow: string; titleLine1: string; titleLine2: string }>;

export default function CommonPainProblems() {
  const [language, setLanguage] = useState<Language>("en");
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="problems"
      style={{
        padding: isMobile ? "36px 0" : "56px 0",
        background: "#fff",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: isMobile ? "26px" : "40px", padding: "0 16px" }}>
        <p
          style={{
            fontSize: isMobile ? "11px" : "13px",
            letterSpacing: isMobile ? "1.4px" : "2px",
            textTransform: "uppercase",
            color: "var(--vk-green)",
            fontWeight: 700,
            marginBottom: "10px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {copy.eyebrow}
        </p>
        <div
          style={{
            width: "48px",
            height: "3px",
            background: "var(--vk-pink)",
            borderRadius: "2px",
            margin: "0 auto 12px",
          }}
        />
        <h2
          style={{
            fontSize: language === "ta" ? "clamp(1.15rem, 3.2vw, 2.5rem)" : "clamp(1.25rem, 3.5vw, 4rem)",
            fontWeight: 900,
            color: "var(--vk-green-dark)",
            margin: 0,
            fontFamily: "'Georgia','Playfair Display',serif",
            letterSpacing: "-0.02em",
            lineHeight: 1.12,
          }}
        >
          {copy.titleLine1} <span style={{ color: "var(--vk-pink)" }}>{copy.titleLine2}</span>
        </h2>
      </div>

      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: isMobile ? "34px" : "80px",
            background: "linear-gradient(to right, #fff, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: isMobile ? "34px" : "80px",
            background: "linear-gradient(to left, #fff, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: isMobile ? "14px" : "20px",
            padding: isMobile ? "6px 16px" : "8px 20px",
            width: "max-content",
            animation: "painMarquee 45s linear infinite",
          }}
        >
          {duplicated.map((item, idx) => (
            <PainCard key={`${item.title}-${idx}`} item={item} language={language} isMobile={isMobile} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes painMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .pain-card-wrap:hover .pain-card-bg {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}

type PainProblem = {
  title: string;
  titleTa: string;
  sub: string;
  subTa: string;
  bg: string;
};

function PainCard({ item, language, isMobile }: { item: PainProblem; language: Language; isMobile: boolean }) {
  const title = language === "ta" ? item.titleTa : item.title;
  const sub = language === "ta" ? item.subTa : item.sub;

  return (
    <div
      className="pain-card-wrap"
      style={{
        width: isMobile ? "230px" : "280px",
        height: isMobile ? "275px" : "330px",
        flexShrink: 0,
        borderTopLeftRadius: isMobile ? "24px" : "30px",
        borderTopRightRadius: 0,
        borderBottomRightRadius: isMobile ? "24px" : "30px",
        borderBottomLeftRadius: 0,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 14px 34px rgba(8,55,78,0.16)",
        cursor: "pointer",
      }}
    >
      <div
        className="pain-card-bg"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${item.bg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.6s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(5,5,15,0.88) 0%, rgba(5,5,15,0.3) 55%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: isMobile ? "16px" : "20px",
          zIndex: 2,
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: isMobile ? "16px" : "19px",
            fontWeight: 800,
            lineHeight: 1.18,
            margin: "0 0 8px",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: isMobile ? "13px" : "15px",
            margin: 0,
            lineHeight: 1.45,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}
