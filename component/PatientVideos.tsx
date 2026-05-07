"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Language = "en" | "ta";

const VIDEOS = [
  { id: 1, label: "Back Pain", labelTa: "முதுகு வலி", code: "DRNAKNhDlOB", href: "https://www.instagram.com/p/DRNAKNhDlOB/" },
  { id: 2, label: "Neck Pain", labelTa: "கழுத்து வலி", code: "DWXwd-sFJru", href: "https://www.instagram.com/p/DWXwd-sFJru/" },
  { id: 3, label: "Joint Pain", labelTa: "மூட்டு வலி", code: "DVLXW8ijrbx", href: "https://www.instagram.com/p/DVLXW8ijrbx/" },
  { id: 4, label: "Knee Pain", labelTa: "முழங்கால் வலி", code: "DRwvzaZkSPQ", href: "https://www.instagram.com/p/DRwvzaZkSPQ/" },
  { id: 5, label: "Arthritis", labelTa: "ஆர்த்ரைடிஸ்", code: "DScfsGLikIo", href: "https://www.instagram.com/p/DScfsGLikIo/" },
  { id: 6, label: "Sciatica", labelTa: "சயாட்டிகா", code: "DWKqvV6FKtb", href: "https://www.instagram.com/p/DWKqvV6FKtb/" },
];

const GAP = 20;

const sectionCopy = {
  en: {
    eyebrow: "Patient Stories",
    titleLine1: "What We",
    titleLine2: "Treat",
    subtitle: "Watch real patient recovery stories from VK Ayurveda",
    button: "Open on Instagram",
    previous: "Previous",
    next: "Next",
    slide: "Slide",
  },
  ta: {
    eyebrow: "நோயாளர் கதைகள்",
    titleLine1: "நாங்கள் சிகிச்சை",
    titleLine2: "அளிப்பவை",
    subtitle: "VK Ayurveda நோயாளிகளின் உண்மையான குணமடைந்த கதைகளை பாருங்கள்",
    button: "Instagram-ல் பார்க்க",
    previous: "முந்தையது",
    next: "அடுத்தது",
    slide: "ஸ்லைடு",
  },
} satisfies Record<Language, {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  button: string;
  previous: string;
  next: string;
  slide: string;
}>;

function getVisible() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 580) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

export default function PatientVideos() {
  const [index, setIndex] = useState(0);
  const [cw, setCw]       = useState(0);
  const [vc, setVc]       = useState(3);
  const [paused, setPaused] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const wrapRef           = useRef<HTMLDivElement>(null);
  const maxIdxRef         = useRef(0);
  const copy = sectionCopy[language];

  const measure = useCallback(() => {
    const v = getVisible();
    setVc(v);
    if (wrapRef.current) {
      const w = wrapRef.current.offsetWidth;
      setCw((w - GAP * (v - 1)) / v);
    }
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

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

  const maxIdx = Math.max(0, VIDEOS.length - vc);

  useEffect(() => {
    maxIdxRef.current = maxIdx;
  }, [maxIdx]);

  const go = (i: number) => setIndex(Math.max(0, Math.min(maxIdx, i)));

  /* ── Auto-advance loop ── */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev >= maxIdxRef.current ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  const trackX = index * (cw + GAP);

  return (
    <>
      <style>{`
        .pv-root {
          background: #fff;
          padding: 20px 0 20px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Header ── */
        .pv-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: .22em;
          text-transform: uppercase; color: var(--vk-green);
          margin-bottom: 14px;
        }
        .pv-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--vk-pink); }
        .pv-title {
          font-size: clamp(1.25rem, 3.5vw, 4rem);
          font-weight: 900; font-family: 'Georgia', 'Playfair Display', serif;
          color: var(--vk-green-dark);
          margin: 0 0 14px; line-height: 1.12; letter-spacing: -0.02em;
        }
        .pv-title.ta {
          font-size: clamp(1.15rem, 3.2vw, 2.5rem);
        }
        .pv-sub { font-size: 19px; line-height: 1.75; color: #6b7280; margin: 0; }

        /* ── Card ── */
        .pv-card {
          display: flex; flex-direction: column;
          align-items: center; gap: 14px;
        }

        /* ── iframe wrapper ── */
        .pv-frame-wrap {
          width: 100%;
          /* top-left + bottom-right rounded only */
          border-radius: 24px 0 24px 0;
          overflow: hidden;
          background: #0a0a0a;
          box-shadow: 0 8px 32px rgba(1,90,54,.12);
          /* force GPU compositing layer so border-radius clips the iframe */
          isolation: isolate;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          transform: translateZ(0);
          transition: box-shadow .3s ease;
        }
        .pv-card:hover .pv-frame-wrap {
          box-shadow: 0 16px 48px rgba(1,90,54,.22);
        }
        .pv-frame-wrap iframe {
          display: block;
          /* 18px wider than container = scrollbar pushed outside */
          /* overflow:hidden on parent clips it invisibly             */
          width: calc(100% + 18px);
          border: none;
        }

        /* ── Label ── */
        .pv-label {
          font-size: 18px; font-weight: 700; font-style: italic;
          color: var(--vk-green); margin: 0; text-align: center;
          transition: color .22s;
        }
        .pv-card:hover .pv-label { color: var(--vk-green-dark); }

        /* ── Button ── */
        .pv-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--vk-green); color: #fff;
          font-size: 13px; font-weight: 600;
          padding: 10px 24px; border-radius: 50px;
          border: none; cursor: pointer; text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: .03em;
          transition: background .22s ease, transform .22s ease;
        }
        .pv-btn:hover { background: var(--vk-green-dark); transform: translateY(-2px); }

        /* ── Nav arrows ── */
        .pv-arrow {
          width: 46px; height: 46px; border-radius: 50%;
          border: 1.5px solid var(--vk-green);
          background: transparent; color: var(--vk-green);
          font-size: 18px; cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: background .22s, color .22s;
        }
        .pv-arrow:hover { background: var(--vk-green); color: #fff; }
        .pv-arrow:disabled { opacity: .25; pointer-events: none; }

        /* ── Dots ── */
        .pv-pip {
          height: 7px; border-radius: 4px;
          background: #e5e7eb; cursor: pointer;
          transition: width .35s ease, background .35s ease;
        }
        .pv-pip.on { background: var(--vk-green); }
      `}</style>

      <section
        className="pv-root"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {/* Header */}
        <div style={{ textAlign: "center", padding: "0 24px", marginBottom: 48 }}>
          <p className="pv-eyebrow">
            <span className="pv-dot" />
            {copy.eyebrow}
          </p>
          <h2 className={`pv-title ${language === "ta" ? "ta" : ""}`}>
            {copy.titleLine1} <span style={{ color: "var(--vk-pink)" }}>{copy.titleLine2}</span>
          </h2>
          <p className="pv-sub">{copy.subtitle}</p>
        </div>

        {/* Carousel */}
        <div style={{ padding: "0 24px" }}>
          <div ref={wrapRef} style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                gap: GAP,
                transform: `translateX(-${trackX}px)`,
                transition: cw > 0 ? "transform .55s cubic-bezier(.25,1,.5,1)" : "none",
                willChange: "transform",
              }}
            >
              {VIDEOS.map((v) => (
                <div
                  key={v.id}
                  className="pv-card"
                  style={{
                    flex: `0 0 ${cw > 0 ? cw : 0}px`,
                    visibility: cw > 0 ? "visible" : "hidden",
                  }}
                >
                  {/* clip top header (78px) + bottom footer (95px) via overflow:hidden */}
                  <div
                    className="pv-frame-wrap"
                    style={{ height: cw > 0 ? Math.round(cw * 1.25) : 480 }}
                  >
                    <iframe
                      src={`https://www.instagram.com/p/${v.code}/embed/`}
                      height={cw > 0 ? Math.round(cw * 1.25) + 78 + 95 : 653}
                      style={{ marginTop: -78, display: "block" }}
                      loading="lazy"
                      allowFullScreen
                      title={`${language === "ta" ? v.labelTa : v.label} - VK Ayurveda`}
                    />
                  </div>

                  {/* Condition label */}
                  <p className="pv-label">{language === "ta" ? v.labelTa : v.label}</p>

                  {/* Open on Instagram */}
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pv-btn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    {copy.button}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 36, padding: "0 24px" }}>

          <button
            className="pv-arrow"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label={copy.previous}
          >←</button>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <div
                key={i}
                className={`pv-pip${i === index ? " on" : ""}`}
                style={{ width: i === index ? 28 : 8 }}
                onClick={() => go(i)}
                role="button"
                tabIndex={0}
                aria-label={`${copy.slide} ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="pv-arrow"
            onClick={() => go(index + 1)}
            disabled={index === maxIdx}
            aria-label={copy.next}
          >→</button>

        </div>
      </section>
    </>
  );
}
