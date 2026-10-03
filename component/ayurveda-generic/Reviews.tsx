"use client";

import Animate from "./Animate";

const reviews = [
  {
    name: "Ramesh P.",
    condition: "Cervical spondylosis",
    quote:
      "Three hospitals suggested surgery. The doctors here explained the cause clearly and I started a treatment plan instead.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    rating: 5,
  },
  {
    name: "Priya S.",
    condition: "Back pain & sciatica",
    quote: "After years of back pain, the Panchakarma programme helped me sit and sleep far more comfortably.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    rating: 5,
  },
  {
    name: "Sunita N.",
    condition: "Knee pain & arthritis",
    quote: "I thought knee pain was just age. The care and attention here made a real difference to my daily walking.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    rating: 5,
  },
];

const copy = {
  eyebrow: "Testimonials",
  titleStart: "Patient",
  titleHighlight: "Stories",
  subtitle: "Real experiences from patients. Individual results vary.",
  googleRating: "4.8 on Google",
  reviewCount: "2,400+ reviews",
  verified: "Verified",
  bookCta: "Book ₹150 Consultation",
};

function StarIcon({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.5" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function ReviewSection() {
  const goToForm = () => {
    const nameField = document.getElementById("hero-name");
    nameField?.scrollIntoView({ behavior: "smooth", block: "center" });
    nameField?.focus({ preventScroll: true });
  };

  return (
    <section className="bg-white px-[14px] pb-12 pt-5 min-[600px]:px-5 min-[600px]:pb-[72px] min-[600px]:pt-2.5">
      <div className="text-center">
        <Animate from="left">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--vk-green)] sm:mb-1 sm:text-[13px] sm:tracking-[0.18em]">
            {copy.eyebrow}
          </p>
        </Animate>
        <Animate from="right" delay={150}>
          <h2 className="mx-auto max-w-4xl font-[Georgia,'Playfair_Display',serif] text-[clamp(1.25rem,3.5vw,4rem)] font-black leading-[1.12] tracking-[-0.02em] text-[var(--vk-green-dark)]">
            {copy.titleStart} <span className="text-[var(--vk-pink)]">{copy.titleHighlight}</span>
          </h2>
        </Animate>
        <Animate from="up" delay={300}>
          <p className="mx-auto mb-4 mt-3 max-w-2xl text-[15px] font-medium leading-[1.6] text-[#4b5563] sm:mt-2 sm:text-[19px] sm:leading-[1.75]">
            {copy.subtitle}
          </p>
        </Animate>

        <Animate from="zoom" delay={450}>
          {/* Google rating badge */}
          <div className="flex justify-center">
            <div className="mb-[30px] inline-flex max-w-full flex-wrap items-center justify-center gap-[7px] rounded-[18px] border-[1.5px] border-[#e5e7eb] bg-white px-3 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] min-[600px]:mb-8 min-[600px]:flex-nowrap min-[600px]:justify-start min-[600px]:gap-2.5 min-[600px]:rounded-[50px] min-[600px]:py-[8px] min-[600px]:pl-[14px] min-[600px]:pr-5">
              <GoogleIcon />
              <div className="flex gap-0 min-[600px]:gap-[2px]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} filled className="h-3.5 w-3.5 shrink-0 min-[600px]:h-4 min-[600px]:w-4" />
                ))}
              </div>
              <span className="text-[12px] font-semibold text-[#374151] min-[600px]:text-[13px]">{copy.googleRating}</span>
              <div className="hidden h-4 w-px bg-[#e5e7eb] min-[600px]:block" />
              <span className="text-[12px] font-medium text-[#9ca3af]">{copy.reviewCount}</span>
            </div>
          </div>
        </Animate>
      </div>

      {/* Cards — swipe row on mobile, 2 columns on tablet, 3 on desktop */}
      <div className="mx-auto mb-8 flex max-w-full snap-x snap-mandatory gap-[14px] overflow-x-auto overflow-y-hidden px-[6px] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[600px]:mb- min-[600px]:grid min-[600px]:max-w-[760px] min-[600px]:snap-none min-[600px]:grid-cols-2 min-[600px]:gap-6 min-[600px]:overflow-visible min-[600px]:p-0 min-[901px]:max-w-[1160px] min-[901px]:grid-cols-3">
        {reviews.map((r, i) => (
          <Animate
            key={r.name}
            from={i === 0 ? "left" : i === reviews.length - 1 ? "right" : "up"}
            delay={i * 150}
            className="shrink-0 basis-[min(86vw,340px)] snap-center min-[600px]:basis-auto"
          >
            <div
              className="relative flex h-full flex-col overflow-hidden rounded-2xl border-[1.5px] border-[#f0f0f0] bg-white px-[18px] pb-5 pt-[26px] shadow-[0_4px_24px_rgba(1,90,54,0.06)] transition-[box-shadow,transform,border-color] duration-[280ms] ease-in-out before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-linear-to-r before:from-[var(--vk-green)] before:to-[var(--vk-lime)] before:content-[''] hover:-translate-y-1 hover:border-[#d1fae5] hover:shadow-[0_12px_40px_rgba(1,90,54,0.12)] min-[600px]:rounded-[20px] min-[600px]:px-7 min-[600px]:pb-[26px] min-[600px]:pt-8"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="pointer-events-none absolute right-4 top-3 select-none font-[Georgia,serif] text-[58px] font-black leading-none text-[var(--vk-lime)] opacity-[0.18] min-[600px]:right-[22px] min-[600px]:top-[18px] min-[600px]:text-[80px]">
                &ldquo;
              </div>

              <div className="mb-[14px] flex items-center justify-between min-[600px]:mb-[18px]">
                <div className="flex gap-[2px]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} filled={s <= r.rating} />
                  ))}
                </div>
                <div className="flex items-center gap-[5px] rounded-[20px] border border-[#e5e7eb] bg-[#f9fafb] px-2 py-1 text-[10px] font-semibold text-[#6b7280] min-[600px]:px-2.5 min-[600px]:text-[11px]">
                  <GoogleIcon />
                  {copy.verified}
                </div>
              </div>

              <p className="mb-[18px] flex-1 text-[14px] font-normal leading-[1.65] text-[#374151] min-[600px]:mb-6 min-[600px]:text-[15px] min-[600px]:leading-[1.75]">
                &ldquo;{r.quote}&rdquo;
              </p>

              <div className="mb-5 h-px bg-[#f3f4f6]" />

              <div className="flex items-start gap-2.5 min-[600px]:items-center min-[600px]:gap-3">
                <img
                  src={r.image}
                  alt={r.name}
                  className="h-[42px] w-[42px] shrink-0 rounded-full border-2 border-[var(--vk-lime-soft)] object-cover min-[600px]:h-12 min-[600px]:w-12"
                />
                <div>
                  <div className="mb-[2px] text-[14px] font-bold text-[var(--vk-green-dark)] min-[600px]:text-[15px]">{r.name}</div>
                  <div className="text-[11px] font-medium leading-[1.35] text-[#9ca3af] min-[600px]:text-[12px] min-[600px]:leading-normal">
                    {r.condition}
                  </div>
                </div>
                <div className="ml-auto hidden shrink-0 items-center gap-1 rounded-[20px] border border-[#bbf7d0] bg-[#f0fdf4] px-[9px] py-1 text-[10px] font-semibold text-[var(--vk-green)] min-[600px]:flex">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--vk-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {copy.verified}
                </div>
              </div>
            </div>
          </Animate>
        ))}
      </div>

      {/* CTA */}
      <Animate from="up" delay={200}>
        <div className="flex flex-wrap justify-center gap-3 text-center">
          <button
            type="button"
            onClick={goToForm}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-[7px] rounded-[50px] border-[1.5px] border-[var(--vk-pink)] bg-[var(--vk-pink)] px-[18px] py-3 text-center text-[13px] font-bold leading-[1.3] tracking-[0.02em] text-white transition-[background,color] duration-[220ms] min-[600px]:w-auto min-[600px]:gap-2 min-[600px]:px-7 min-[600px]:text-[14px] min-[600px]:leading-normal"
          >
            {copy.bookCta}
          </button>
        </div>
      </Animate>
    </section>
  );
}
