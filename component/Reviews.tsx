"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

type Language = "en" | "ta";

const reviews = [
  {
    name: "Priya Sharma",
    condition: "Back Pain & Sciatica",
    conditionTa: "முதுகு வலி ",
    duration: "Recovered in 6 weeks",
    durationTa: "",
    quote:
      "After 3 years of chronic back pain, VK Ayurveda gave me my life back. The Panchakarma treatment was truly life-changing. I can now walk, sit, and sleep without any pain at all.",
    quoteTa:
      "3 ஆண்டுகள் நீடித்த முதுகு வலிக்குப் பிறகு, VK Ayurveda எனக்கு மீண்டும் நல்ல வாழ்க்கையை கொடுத்தது. பஞ்சகர்மா சிகிச்சைக்கு பிறகு இப்போது வலி இல்லாமல் நடக்கவும், உட்காரவும், தூங்கவும் முடிகிறது.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    rating: 5,
  },
  {
    name: "Ramesh Patel",
    condition: "Cervical Spondylosis",
    conditionTa: "செர்வைக்கல் ஸ்பாண்டிலோசிஸ்",
    duration: "Recovered in 8 weeks",
    durationTa: "8 வாரங்களில் குணமடைந்தார்",
    quote:
      "Three hospitals recommended surgery. VK Ayurveda healed me naturally in 8 weeks — no surgery, no side effects. The doctors here genuinely treat the root cause, not just the symptoms.",
    quoteTa:
      "மூன்று மருத்துவமனைகள் அறுவை சிகிச்சை பரிந்துரைத்தன. VK Ayurveda 8 வாரங்களில் இயற்கையாக குணப்படுத்தியது. அறுவை சிகிச்சை இல்லை, பக்க விளைவுகள் இல்லை.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    rating: 5,
  },
  {
    name: "Sunita Nair",
    condition: "Knee Pain & Arthritis",
    conditionTa: "முழங்கால் வலி & ஆர்த்ரைடிஸ்",
    duration: "Recovered in 10 weeks",
    durationTa: "",
    quote:
      "At 58, I thought living with knee pain was just normal aging. VK Ayurveda proved me completely wrong. My joints feel 20 years younger. The care and attention here is simply outstanding.",
    quoteTa:
      "58 வயதில் முழங்கால் வலியுடன் வாழ்வது வயதின் காரணம் என்று நினைத்தேன். VK Ayurveda அது தவறு என்பதை நிரூபித்தது. இங்குள்ள பராமரிப்பு சிறந்தது.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    rating: 5,
  },
];

const stats = [
  { value: "40,000+", label: "Patients Treated" },
  { value: "4.8 / 5", label: "Google Rating" },
  { value: "NABH", label: "Certified Hospital" },
  { value: "15+", label: "Years of Excellence" },
];

const sectionCopy = {
  en: {
    eyebrow: "Patient Stories",
    titleLine1: "Trusted by Thousands",
    titleLine2: "of Patients.",
    googleRating: "4.8 on Google",
    reviewCount: "2,400+ reviews",
    verified: "Verified",
    cta: "Read All Reviews on Google",
    bookCta: "Book ₹150 Consultation",
  },
  ta: {
    eyebrow: "நோயாளர் கதைகள்",
    titleLine1: "ஆயிரக்கணக்கான நோயாளிகள்",
    titleLine2: "நம்பும் சிகிச்சை.",
    googleRating: "Google-ல் 4.8 மதிப்பீடு",
    reviewCount: "2,400+ விமர்சனங்கள்",
    verified: "சரிபார்க்கப்பட்டது",
    cta: "Google விமர்சனங்களை பார்க்க",
    bookCta: "₹150 ஆலோசனை பதிவு",
  },
} satisfies Record<Language, {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  googleRating: string;
  reviewCount: string;
  verified: string;
  cta: string;
  bookCta: string;
}>;

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function ReviewSection() {
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
    <>
      <style>{`
        .rv2-section {
          background: #ffffff;
          padding: 10px 20px 72px;
          font-family: 'Georgia,'Playfair Display',serif;
        }

        /* ── Header ── */
        .rv2-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--vk-green);
          margin-bottom: 16px;
        }
        .rv2-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--vk-pink);
        }
        .rv2-title {
        
          font-size: clamp(1.25rem, 3.5vw, 4rem);
          font-weight: 900;
          line-height: 1.12;
          color: var(--vk-green-dark);
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .rv2-title.ta {
          font-size: clamp(1.15rem, 3.2vw, 2.5rem);
        }
        .rv2-title span { color: var(--vk-pink); }

        .rv2-subtitle {
          font-size: 19px;
          color: #6b7280;
          line-height: 1.65;
          max-width: 520px;
          margin: 0 auto 32px;
        }

        /* ── Google badge ── */
        .rv2-gbadge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1.5px solid #e5e7eb;
          border-radius: 50px;
          padding: 9px 20px 9px 14px;
          margin-bottom: 56px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .rv2-gbadge-stars { display: flex; gap: 2px; }
        .rv2-gbadge-text {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }
        .rv2-gbadge-divider {
          width: 1px; height: 16px;
          background: #e5e7eb;
        }
        .rv2-gbadge-count {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }

        /* ── Stats bar ── */
        .rv2-stats {
          display: flex;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
          margin-bottom: 56px;
          border: 1.5px solid #e8f5e9;
          border-radius: 16px;
          overflow: hidden;
          max-width: 860px;
          margin-left: auto;
          margin-right: auto;
          background: var(--vk-lime-soft);
        }
        .rv2-stat {
          flex: 1;
          min-width: 160px;
          padding: 22px 24px;
          text-align: center;
          border-right: 1.5px solid #d9efc3;
          position: relative;
        }
        .rv2-stat:last-child { border-right: none; }
        .rv2-stat-value {
          font-size: 28px;
          font-weight: 800;
          color: var(--vk-green);
          line-height: 1;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }
        .rv2-stat-label {
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          letter-spacing: 0.04em;
        }

        /* ── Cards grid ── */
        .rv2-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1160px;
          margin: 0 auto 48px;
        }
        @media (max-width: 900px) {
          .rv2-grid { grid-template-columns: 1fr; max-width: 520px; }
          .rv2-stat { min-width: 130px; }
        }
        @media (min-width: 600px) and (max-width: 900px) {
          .rv2-grid { grid-template-columns: 1fr 1fr; max-width: 760px; }
        }

        /* ── Single card ── */
        .rv2-card {
          background: #fff;
          border: 1.5px solid #f0f0f0;
          border-radius: 20px;
          padding: 32px 28px 26px;
          display: flex;
          flex-direction: column;
          gap: 0;
          box-shadow: 0 4px 24px rgba(1,90,54,0.06);
          transition: box-shadow 0.28s ease, transform 0.28s ease, border-color 0.28s ease;
          position: relative;
          overflow: hidden;
        }
        .rv2-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--vk-green), var(--vk-lime));
        }
        .rv2-card:hover {
          box-shadow: 0 12px 40px rgba(1,90,54,0.12);
          transform: translateY(-4px);
          border-color: #d1fae5;
        }

        /* Large quote mark */
        .rv2-quote-mark {
          position: absolute;
          top: 18px;
          right: 22px;
          font-size: 80px;
          line-height: 1;
          color: var(--vk-lime);
          opacity: 0.18;
          font-family: Georgia, serif;
          font-weight: 900;
          pointer-events: none;
          user-select: none;
        }

        .rv2-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .rv2-stars { display: flex; gap: 2px; }
        .rv2-google-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
        }

        .rv2-card-quote {
          font-size: 15px;
          font-weight: 400;
          color: #374151;
          line-height: 1.75;
          flex: 1;
          margin-bottom: 24px;
        }

        .rv2-card-divider {
          height: 1px;
          background: #f3f4f6;
          margin-bottom: 20px;
        }

        .rv2-card-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rv2-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--vk-lime-soft);
          flex-shrink: 0;
        }
        .rv2-author-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--vk-green-dark);
          margin-bottom: 2px;
        }
        .rv2-author-condition {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }
        .rv2-verified {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 600;
          color: var(--vk-green);
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 20px;
          padding: 4px 9px;
          flex-shrink: 0;
        }

        /* ── Bottom CTA link ── */
        .rv2-cta-row {
          text-align: center;
        }
        .rv2-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          color: var(--vk-green);
          text-decoration: none;
          border: 1.5px solid var(--vk-green);
          border-radius: 50px;
          padding: 12px 28px;
          transition: background 0.22s, color 0.22s;
          letter-spacing: 0.02em;
        }
        .rv2-cta-link:hover {
          background: var(--vk-green);
          color: #fff;
        }

        @media (max-width: 599px) {
          .rv2-section {
            padding: 4px 14px 48px;
          }
          .rv2-eyebrow {
            font-size: 10px;
            letter-spacing: 0.16em;
            margin-bottom: 12px;
          }
          .rv2-title {
            font-size: clamp(1.5rem, 8vw, 2.35rem);
            line-height: 1.08;
            margin-bottom: 12px;
          }
          .rv2-title.ta {
            font-size: clamp(1.3rem, 6.4vw, 1.9rem);
          }
          .rv2-gbadge {
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            gap: 7px;
            border-radius: 18px;
            padding: 10px 12px;
            margin-bottom: 30px;
          }
          .rv2-gbadge svg {
            flex-shrink: 0;
          }
          .rv2-gbadge-stars {
            gap: 0;
          }
          .rv2-gbadge-stars svg {
            width: 14px;
            height: 14px;
          }
          .rv2-gbadge-divider {
            display: none;
          }
          .rv2-gbadge-text,
          .rv2-gbadge-count {
            font-size: 12px;
          }
          .rv2-grid {
            display: flex;
            gap: 14px;
            max-width: 100%;
            margin-bottom: 32px;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            padding: 0 6px 16px;
            scrollbar-width: none;
          }
          .rv2-grid::-webkit-scrollbar {
            display: none;
          }
          .rv2-card {
            flex: 0 0 min(86vw, 340px);
            min-height: 100%;
            scroll-snap-align: center;
            border-radius: 16px;
            padding: 26px 18px 20px;
          }
          .rv2-quote-mark {
            top: 12px;
            right: 16px;
            font-size: 58px;
          }
          .rv2-card-top {
            margin-bottom: 14px;
          }
          .rv2-google-badge {
            padding: 4px 8px;
            font-size: 10px;
          }
          .rv2-card-quote {
            font-size: 14px;
            line-height: 1.65;
            margin-bottom: 18px;
          }
          .rv2-card-author {
            align-items: flex-start;
            gap: 10px;
          }
          .rv2-avatar {
            width: 42px;
            height: 42px;
          }
          .rv2-author-name {
            font-size: 14px;
          }
          .rv2-author-condition {
            font-size: 11px;
            line-height: 1.35;
          }
          .rv2-verified {
            display: none;
          }
          .rv2-cta-link {
            width: 100%;
            justify-content: center;
            gap: 7px;
            padding: 12px 18px;
            font-size: 13px;
            line-height: 1.3;
            text-align: center;
          }
        }
      `}</style>

      <section className="rv2-section">
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <p className="rv2-eyebrow">
              <span className="rv2-eyebrow-dot" />
              {copy.eyebrow}
            </p>
            <h2 className={`rv2-title ${language === "ta" ? "ta" : ""}`} style={{fontFamily:"Georgia,'Playfair Display',serif"}}>
              {copy.titleLine1} <br />
              <span>{copy.titleLine2}</span>
            </h2>

            {/* Google rating badge */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="rv2-gbadge">
                <GoogleIcon />
                <div className="rv2-gbadge-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} filled={true} />
                  ))}
                </div>
                <span className="rv2-gbadge-text">{copy.googleRating}</span>
                <div className="rv2-gbadge-divider" />
                <span className="rv2-gbadge-count">{copy.reviewCount}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="rv2-grid">
          {reviews.map((r, i) => (
            <Reveal key={r.name}>
              <div className="rv2-card" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="rv2-quote-mark">&ldquo;</div>

                <div className="rv2-card-top">
                  <div className="rv2-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} filled={s <= r.rating} />
                    ))}
                  </div>
                  <div className="rv2-google-badge">
                    <GoogleIcon />
                    {copy.verified}
                  </div>
                </div>

                <p className="rv2-card-quote">&ldquo;{language === "ta" ? r.quoteTa : r.quote}&rdquo;</p>

                <div className="rv2-card-divider" />

                <div className="rv2-card-author">
                  <img src={r.image} alt={r.name} className="rv2-avatar" />
                  <div>
                    <div className="rv2-author-name">{r.name}</div>
                    <div className="rv2-author-condition">
                      {language === "ta" ? r.conditionTa : r.condition} · {language === "ta" ? r.durationTa : r.duration}
                    </div>
                  </div>
                  <div className="rv2-verified">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--vk-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {copy.verified}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="rv2-cta-row" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("vk-open-booking"))}
              className="rv2-cta-link cursor-pointer"
              style={{ background: "var(--vk-pink)", color: "#fff", borderColor: "var(--vk-pink)" }}
            >
              {copy.bookCta}
            </button>
            {/* <a
              href="https://g.page/r/vkayurveda"
              target="_blank"
              rel="noreferrer"
              className="rv2-cta-link"
            >
              <GoogleIcon />
              {copy.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a> */}
          </div>
        </Reveal>
      </section>
    </>
  );
}
