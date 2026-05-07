'use client'

import { useEffect, useRef, useState } from "react";

type Language = "en" | "ta";

const problems = [
  {
    label: "NABH Certified Hospital",
    labelTa: "NABH சான்றளிக்கப்பட்ட மருத்துவமனை",
    image:
      "/vk-ayurveda.png",
  },
  {
    label: "4.8★ Google Rating",
    image:
      "/Google-Rating.png",
    labelTa: "4.8★ Google மதிப்பீடு",
  },
  {
    label: "40,000+ Patients Treated",
    labelTa: "40,000+ நோயாளிகள் சிகிச்சை பெற்றுள்ளனர்",
    image:
      "/Patients-Treated.png",
  },
  {
    label: "Experienced Ayurvedic Doctors",
    labelTa: "அனுபவமுள்ள ஆயுர்வேத மருத்துவர்கள்",
    image:
      "/Ayurvedic-Doctors.png",
  },
  {
    label: "Specialized Pain Treatments",
    labelTa: "சிறப்பு வலி சிகிச்சைகள்",
    image:
      "/Specialized-Pain.png",
  },
  {
    label: "Affordable Consultation",
    labelTa: "குறைந்த கட்டண ஆலோசனை",
    image:
      "/Affordable.png",
  },
  {
    label: "Safe & Natural Treatment",
    labelTa: "பாதுகாப்பான இயற்கை சிகிச்சை",
    image:
      "/images10.jpg",
  },
];

const sectionCopy = {
  en: {
    titleLine1: "Why Patients Choose",
    titleLine2: "VK Ayurveda",
    cta: "If Yes, Pravaayu Can Help!",
  },
  ta: {
    titleLine1: "நோயாளிகள் ஏன்",
    titleLine2: "VK Ayurveda-வை தேர்வு செய்கிறார்கள்",
    cta: "ஆம் என்றால், Pravaayu உதவும்!",
  },
} satisfies Record<Language, { titleLine1: string; titleLine2: string; cta: string }>;

export default function ProblemSection() {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const ref = useRef(null);
  const copy = sectionCopy[language];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&display=swap');

        .ps-root {
          font-family: 'Nunito Sans', sans-serif;
          background: var(--vk-lime-soft);
          position: relative;
          overflow: hidden;
          padding: 72px 48px 20px;
        }
        .ps-root::before {
          content: '';
          position: absolute;
          left: -96px;
          top: 64px;
          width: 288px;
          height: 288px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--vk-green) 10%, transparent);
          pointer-events: none;
        }
        .ps-root::after {
          content: '';
          position: absolute;
          right: -112px;
          bottom: 40px;
          width: 320px;
          height: 320px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--vk-pink) 10%, transparent);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .ps-root { padding: 48px 20px 0; }
        }

        /* ── Heading ── */
        .ps-heading {
          font-family: Georgia, 'Playfair Display', serif;
          font-size: clamp(1.25rem, 3.5vw, 4rem);
          font-weight: 900;
          line-height: 1.12;
          color: var(--vk-green-dark);
          letter-spacing: -0.02em;
          max-width: 720px;
          margin: 0 auto 52px;
          text-align: center;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1), transform 1.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ps-heading.ta {
          font-size: clamp(1.15rem, 3.2vw, 2.5rem);
        }
        .ps-heading.in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Cards row ── */
        .ps-cards {
          overflow: hidden;
          margin-bottom: 48px;
          padding-bottom: 4px;
        }
        .ps-track {
          display: flex;
          width: max-content;
          gap: 16px;
          animation: psSlideLeft 42s linear infinite;
          will-change: transform;
        }
        .ps-cards:hover .ps-track {
          animation-play-state: paused;
        }
        @keyframes psSlideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 8px)); }
        }
        @media (max-width: 768px) {
          .ps-cards {
            overflow-x: hidden;
            overflow-y: hidden;
            margin-left: -20px;
            margin-right: -20px;
            padding: 0 20px 18px;
            scrollbar-width: none;
          }
          .ps-cards::-webkit-scrollbar {
            display: none;
          }
          .ps-track {
            width: max-content;
            flex-wrap: nowrap;
            justify-content: flex-start;
            animation: psSlideLeft 72s linear infinite;
          }
          .ps-cards:hover .ps-track {
            animation-play-state: running;
          }
          .ps-card {
            flex-basis: min(78vw, 260px);
          }
        }

        /* ── Single card ── */
        .ps-card {
          flex: 0 0 220px;
          background: #ffffff;
          border-radius: 20px;
          padding: 24px 20px 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          cursor: default;
          opacity: 0;
          transform: translateY(60px);
          transition:
            opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1.5s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.4s ease,
            background 0.4s ease;
        }
        .ps-card.in {
          opacity: 1;
          transform: translateY(0);
        }
        .ps-card:hover {
          background: #edf7bd;
          box-shadow: 0 12px 40px rgba(1, 90, 54, 0.13);
          transform: translateY(-4px) !important;
        }

        /* ── Circle image ── */
        .ps-img-wrap {
          width: 82px;
          height: 82px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          background: #dcefa0;
          box-shadow: 0 4px 16px rgba(1, 90, 54, 0.18);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ps-card:hover .ps-img-wrap {
          transform: scale(1.06);
        }
        .ps-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.85) brightness(1.00);
          transition: filter 0.5s ease;
        }
        .ps-card:hover .ps-img-wrap img {
          filter: saturate(1) brightness(1.06);
        }

        /* ── Card text ── */
        .ps-card-label {
          font-size: 15px;
          font-weight: 600;
          color: var(--vk-green-dark);
          line-height: 1.45;
          margin: 0;
        }

        /* ── CTA bar ── */
        .ps-cta {
        background: transparent;
          border-radius: 60px;
          border: 1.5px solid var(--vk-green);
          padding: 22px 40px;
          text-align: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          margin: 0 auto;
          display: table;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          border: 1.5px solid var(--vk-green);
          border-radius: 50px;
          padding: 12px 28px;
          letter-spacing: 0.02em;
        }
        .ps-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.8s ease;
        }
        .ps-cta:hover::before { transform: translateX(100%); }
        .ps-cta:hover { background: #015a36; color: #fff; }
        .ps-cta.in {
          opacity: 1;
          transform: translateY(0);
        }
        .ps-cta span {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--vk-green);
          
        }
          .ps-cta:hover span {
            color: white;
          }
        @media (max-width: 768px) {
          .ps-cta {
            display: flex;
            width: min(100%, 340px);
            align-items: center;
            justify-content: center;
            padding: 12px 18px;
          }
                .ps-root {
        padding: 28px 20px 0;
    }
          .ps-cta span {
            font-size: 12px;
            line-height: 1.35;
            letter-spacing: 0.06em;
            text-align: center;
          }
            .ps-heading {
            margin: 0 auto 22px;
            }
            .ps-cards {
            margin-bottom: 22px;
            }
        }
      `}</style>

      <section id="programs" ref={ref} className="ps-root">
        <div className="relative z-10 max-sm:mb-4">
          {/* Heading */}
          <h2 className={`ps-heading ${language === "ta" ? "ta" : ""} ${visible ? "in" : ""}`}>
            {copy.titleLine1} <br />
            <span style={{ color: "var(--vk-pink)" }}>{copy.titleLine2}</span>
          </h2>

          {/* Cards */}
          <div className="ps-cards">
            <div className="ps-track">
              {[...problems, ...problems].map((p, i) => (
                <div
                  key={`${p.label}-${i}`}
                  className={`ps-card ${visible ? "in" : ""}`}
                  style={{ transitionDelay: visible ? `${0.2 + (i % problems.length) * 0.22}s` : "0s" }}
                  aria-hidden={i >= problems.length}
                >
                  <div className="ps-img-wrap">
                    <img src={p.image} alt={i >= problems.length ? "" : language === "ta" ? p.labelTa : p.label} />
                  </div>
                  <p className="ps-card-label">
                    {language === "ta" ? p.labelTa : p.label.startsWith("4.8") ? "4.8★ Google Rating" : p.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA bar */}
          <button onClick={() => window.dispatchEvent(new CustomEvent("vk-open-booking"))} className={`ps-cta  ${visible ? "in" : ""}`}>
            <span>{copy.cta}</span>
          </button>
        </div>
      </section>
    </>
  );
}
