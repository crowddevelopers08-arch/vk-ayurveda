'use client'

import { useState, useEffect, useRef } from "react";

type Language = "en" | "ta";

const steps = [
  {
    num: "01",
    label: "Doctor Consultation",
    labelTa: "மருத்துவர் ஆலோசனை",
    image: "/doctors.png",
  },
  {
    num: "02",
    label: "Condition Assessment",
    labelTa: "உடல்நிலை பரிசோதனை",
    image: "/doctors2.png",
  },
  {
    num: "03",
    label: "Personalized Treatment Plan",
    labelTa: "தனிப்பட்ட சிகிச்சை திட்டம்",
    image: "/doctors1.png",
  },
  {
    num: "04",
    label: "Ayurvedic Therapies",
    labelTa: "ஆயுர்வேத சிகிச்சைகள்",
    image: "/doctors3.png",
  },
  {
    num: "05",
    label: "Panchakarma Care",
    labelTa: "பஞ்சகர்மா சிகிச்சை",
    image: "https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    num: "06",
    label: "Follow-up Support",
    labelTa: "தொடர்ந்து பராமரிப்பு",
    image: "/doctors4.png",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "Treatment Process",
    titlePrefix: "How",
    titleEmphasis: "We Treat",
    subtitle: "We focus on treating the root cause - not just temporary pain relief. Every step is intentional.",
    step: "Step",
    fallback: "Rooted in ancient wisdom",
    journey: "Ayurvedic Journey",
  },
  ta: {
    eyebrow: "சிகிச்சை நடைமுறை",
    titlePrefix: "எப்படி",
    titleEmphasis: "சிகிச்சை செய்கிறோம்",
    subtitle: "நாங்கள் வலியின் மூல காரணத்தை சிகிச்சை செய்கிறோம்.",
    step: "படி",
    fallback: "ஆயுர்வேத ஞானத்தில் வேரூன்றியது",
    journey: "ஆயுர்வேத பயணம்",
  },
} satisfies Record<Language, {
  eyebrow: string;
  titlePrefix: string;
  titleEmphasis: string;
  subtitle: string;
  step: string;
  fallback: string;
  journey: string;
}>;

export default function TreatmentProcess() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const ref = useRef<HTMLElement | null>(null);
  const copy = sectionCopy[language];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.08 }
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .tp-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--vk-lime-soft);
          position: relative;
          overflow: hidden;
        }

        .serif { font-family: 'Cormorant Garamond', serif; }

        .eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--vk-green);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        .eyebrow::before {
          content: '';
          width: 28px; height: 1px;
          background: var(--vk-pink);
          opacity: 0.7;
        }

        .main-title {
          font-family: 'Georgia', 'Playfair Display', serif;
          font-size: clamp(1.25rem, 4.5vw, 4rem);
          font-weight: 900;
          line-height: 1.12;
          color: var(--vk-green-dark);
          letter-spacing: -0.03em;
        }
        .main-title.ta {
          font-size: clamp(1.15rem, 3.4vw, 2.6rem);
        }
        .main-title em {
          font-style: italic;
          color: var(--vk-pink);
        }

        /* CARD */
        .card {
          position: relative;
          overflow: hidden;
          background: var(--vk-green-dark);
          cursor: pointer;
        }
        .card-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
          filter: sepia(30%) contrast(1.06) saturate(0.75) brightness(0.80);
        }
        .card:hover .card-img {
          transform: scale(1.07);
          filter: sepia(14%) contrast(1.04) saturate(0.88) brightness(0.86);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(28,43,30,0.35) 0%,
            rgba(28,43,30,0.05) 45%,
            rgba(28,43,30,0.75) 100%
          );
          z-index: 1;
          transition: opacity 0.5s;
        }
        .card:hover .card-overlay { opacity: 0.72; }

        .card-num {
          position: absolute;
          top: 12px; left: 18px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(56px, 6vw, 82px);
          font-weight: 300;
          line-height: 1;
          color: rgba(247,240,230,0.11);
          z-index: 2;
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
          transition: color 0.4s, transform 0.4s;
        }
        .card:hover .card-num {
          color: rgba(247,240,230,0.2);
          transform: translateY(-5px);
        }
        .card-badge {
          position: absolute;
          top: 18px; left: 20px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(247,240,230,0.5);
          z-index: 3;
          transition: color 0.3s;
        }
        .card:hover .card-badge { color: rgba(247,240,230,0.85); }

        .card-corner {
          position: absolute;
          top: 0; right: 0;
          width: 34px; height: 34px;
          border-top: 1.5px solid rgba(184,148,90,0.35);
          border-right: 1.5px solid rgba(184,148,90,0.35);
          z-index: 3;
          transition: width 0.4s, height 0.4s, border-color 0.4s;
        }
        .card:hover .card-corner {
          width: 50px; height: 50px;
          border-color: rgba(184,148,90,0.75);
        }

        .card-footer {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 32px 20px 18px;
          background: linear-gradient(to top, rgba(18,30,20,0.92) 0%, transparent 100%);
          z-index: 2;
        }
        .card-footer h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(17px, 1.9vw, 24px);
          font-weight: 400;
          color: #f7f0e6;
          line-height: 1.2;
          margin: 0;
        }
        .card-line {
          display: block;
          height: 1px;
          background: linear-gradient(to right, var(--vk-lime), transparent);
          width: 0;
          margin-top: 8px;
          transition: width 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .card:hover .card-line { width: 56px; }

        /* GRID LAYOUT */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 280px 220px 260px;
          gap: 10px;
        }
        .card-0 { grid-column:1; grid-row:1/3; border-radius:2px 52px 2px 2px; }
        .card-1 { grid-column:2; grid-row:1; border-radius:2px; }
        .card-2 { grid-column:3; grid-row:1; border-radius:2px 2px 52px 2px; }
        .card-3 { grid-column:2/4; grid-row:2; border-radius:2px 2px 2px 52px; }
        .card-4 { grid-column:1/3; grid-row:3; border-radius:2px 2px 2px 52px; }
        .card-5 { grid-column:3; grid-row:3; border-radius:52px 2px 2px 2px; }

        @media (max-width: 767px) {
          .cards-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 200px 200px 200px 200px;
          }
          .card-0 { grid-column:1/3; grid-row:1; border-radius:2px 40px 2px 2px; }
          .card-1 { grid-column:1; grid-row:2; border-radius:2px; }
          .card-2 { grid-column:2; grid-row:2; border-radius:2px; }
          .card-3 { grid-column:1/3; grid-row:3; border-radius:2px; }
          .card-4 { grid-column:1; grid-row:4; border-radius:2px 2px 2px 40px; }
          .card-5 { grid-column:2; grid-row:4; border-radius:40px 2px 2px 2px; }
        }

        /* REVEAL */
        .fade-up {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .fade-up.in { opacity:1; transform:translateY(0); }

        .grid-fade {
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s;
        }
        .grid-fade.in { opacity:1; transform:translateY(0) scale(1); }

        /* BOTTOM BAR */
        .btm-bar {
          margin-top: 12px;
          border-top: 1px solid rgba(122,92,56,0.18);
          padding-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .dot-row { display:flex; gap:6px; }
        .dot {
          width:6px; height:6px; border-radius:50%;
          background:var(--vk-pink); opacity:0.2;
          transition: opacity 0.3s, transform 0.3s;
        }
        .dot.on { opacity:0.75; transform:scale(1.5); }
        .btm-label {
          font-size:10px; font-weight:600;
          letter-spacing:0.26em; text-transform:uppercase;
          color:var(--vk-green); opacity:0.5;
        }
      `}</style>

      <section ref={ref} className="tp-root px-6 py-5 sm:px-10 lg:px-16 lg:py-8">
        <div className="relative z-10 mx-auto max-w-[1400px]">

          {/* HEADER */}
          <div className={`fade-up ${revealed ? "in" : ""} max-sm:mb-4 md:mb-8 flex flex-col items-center gap-10 text-center`}>
            <div className="mx-auto max-w-lg">
              <p className="eyebrow max-sm:mb-2 mb-6">{copy.eyebrow}</p>
              <h2 className={`main-title max-sm:mb-2 mb-6 ${language === "ta" ? "ta" : ""}`}>
                {copy.titlePrefix}<em>{copy.titleEmphasis}</em>
              </h2>
              <p style={{ fontSize:19, fontWeight:400, lineHeight:1.75, color:"#4a5a4c", maxWidth:650, margin:"0 auto" }} hidden>
                We focus on treating the root cause —
                {copy.subtitle}
              </p>
              <p style={{ fontSize:19, fontWeight:400, lineHeight:1.75, color:"#4a5a4c", maxWidth:650, margin:"0 auto" }}>
                {copy.subtitle}
              </p>
            </div>

            {/* <div style={{ display:"flex", alignItems:"flex-end", gap:32, opacity:0.85 }}>
              <svg width="110" height="84" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.2}}>
                <path d="M60 85 C60 85 60 10 60 5" stroke="var(--vk-green)" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M60 62 C60 62 32 52 18 34" stroke="var(--vk-green)" strokeWidth="1" strokeLinecap="round"/>
                <path d="M60 62 C60 62 88 52 102 34" stroke="var(--vk-green)" strokeWidth="1" strokeLinecap="round"/>
                <path d="M60 42 C60 42 40 34 28 20" stroke="var(--vk-green)" strokeWidth="1" strokeLinecap="round"/>
                <path d="M60 42 C60 42 80 34 92 20" stroke="var(--vk-green)" strokeWidth="1" strokeLinecap="round"/>
                <ellipse cx="17" cy="32" rx="11" ry="6" fill="var(--vk-green)" opacity="0.5" transform="rotate(-32 17 32)"/>
                <ellipse cx="103" cy="32" rx="11" ry="6" fill="var(--vk-green)" opacity="0.5" transform="rotate(32 103 32)"/>
                <ellipse cx="27" cy="18" rx="8" ry="4.5" fill="var(--vk-green)" opacity="0.35" transform="rotate(-46 27 18)"/>
                <ellipse cx="93" cy="18" rx="8" ry="4.5" fill="var(--vk-green)" opacity="0.35" transform="rotate(46 93 18)"/>
                <circle cx="60" cy="5" r="3.5" fill="var(--vk-pink)" opacity="0.55"/>
              </svg>
              <div style={{textAlign:"right"}}>
                <p className="serif" style={{fontSize:"clamp(48px,5vw,70px)", fontWeight:300, lineHeight:1, color:"#1c2b1e", opacity:0.1}}>06</p>
                <p style={{marginTop:4, fontSize:10, fontWeight:600, letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--vk-green)", opacity:0.6}}>Steps</p>
              </div>
            </div> */}
          </div>

          {/* CARDS GRID */}
          <div className={`grid-fade ${revealed ? "in" : ""} cards-grid`}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`card card-${i}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="card-img" style={{ backgroundImage: `url(${step.image})` }} />
                <div className="card-overlay" />
                <div className="card-num serif">{step.num}</div>
                <div className="card-badge">{copy.step} {step.num}</div>
                <div className="card-corner" />
                <div className="card-footer">
                  <h3>{language === "ta" ? step.labelTa : step.label}</h3>
                  <span className="card-line" />
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM BAR */}
          <div className={`fade-up ${revealed ? "in" : ""} btm-bar`} style={{transitionDelay:"0.5s"}}>
            <div className="dot-row">
              {steps.map((_, i) => (
                <div key={i} className={`dot ${hovered === i ? "on" : ""}`} />
              ))}
            </div>
            <p className="serif" style={{fontSize:13, fontStyle:"italic", fontWeight:300, color:"#4a5a4c", opacity:0.6}}>
              {hovered !== null ? (language === "ta" ? steps[hovered].labelTa : steps[hovered].label) : copy.fallback}
            </p>
            <p className="btm-label">{copy.journey}</p>
          </div>

        </div>
      </section>
    </>
  );
}
