"use client";

import Animate from "./Animate";

const copy = {
  titleStart: "Start with a",
  titleHighlight: "₹150 consultation",
  subtitle: "Know your condition and your options. No obligation.",
  book: "Book Consultation Now",
  phone: "+91 99966 60102",
};

export default function CTASection() {
  const goToForm = () => {
    const nameField = document.getElementById("hero-name");
    nameField?.scrollIntoView({ behavior: "smooth", block: "center" });
    nameField?.focus({ preventScroll: true });
  };

  return (
    <section
      id="cta-strip"
      className="relative overflow-hidden bg-linear-to-b from-[var(--vk-lime-soft)] to-[#e8f3c4] px-4 py-8 text-center sm:px-6 sm:py-10"
    >
      {/* Bubbles — left */}
      <div aria-hidden className="pointer-events-none absolute -left-20 top-10 h-64 w-64 animate-[bubble-float_9s_ease-in-out_infinite] rounded-full bg-[var(--vk-green)]/10 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute left-10 top-64 h-16 w-16 animate-[bubble-float_7s_ease-in-out_infinite_1s] rounded-full border-2 border-[var(--vk-green)]/20 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute left-32 top-20 h-5 w-5 animate-[bubble-float_6s_ease-in-out_infinite_0.5s] rounded-full bg-[var(--vk-lime)]/70 motion-reduce:animate-none" />

      {/* Bubbles — right */}
      <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 animate-[bubble-float_10s_ease-in-out_infinite_2s] rounded-full bg-[var(--vk-pink)]/10 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute right-16 top-12 h-20 w-20 animate-[bubble-float_8s_ease-in-out_infinite_1.5s] rounded-full border-2 border-[var(--vk-pink)]/20 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute right-40 top-36 h-4 w-4 animate-[bubble-float_6s_ease-in-out_infinite] rounded-full bg-[var(--vk-pink)]/40 motion-reduce:animate-none" />

      {/* Bubbles — bottom */}
      <div aria-hidden className="pointer-events-none absolute -bottom-28 left-1/3 h-60 w-60 animate-[bubble-float_11s_ease-in-out_infinite_1s] rounded-full bg-[var(--vk-lime)]/25 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute bottom-8 right-1/4 h-12 w-12 animate-[bubble-float_7s_ease-in-out_infinite_2.5s] rounded-full border-2 border-[var(--vk-lime)] motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute bottom-16 left-16 h-6 w-6 animate-[bubble-float_6s_ease-in-out_infinite_3s] rounded-full bg-[var(--vk-green)]/25 motion-reduce:animate-none" />

      <div className="relative mx-auto max-w-6xl">
        <Animate from="left">
          <h2 className="mb-[15px] font-serif text-[clamp(1.25rem,3.5vw,4rem)] font-black leading-[1.12] tracking-[-0.02em] text-[var(--vk-green-dark)]">
            {copy.titleStart} <span className="text-[var(--vk-pink)]">{copy.titleHighlight}</span>
          </h2>
        </Animate>
        <Animate from="right" delay={150}>
          <p className="mx-auto mb-6 max-w-sm text-[15px] leading-[1.6] text-black/85 sm:mb-8 sm:max-w-none sm:text-base">
            {copy.subtitle}
          </p>
        </Animate>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Animate from="left" delay={300} className="w-full sm:w-auto">
            <button
              type="button"
              onClick={goToForm}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-white px-5 py-3.5 text-sm font-bold leading-tight text-[var(--vk-pink)] shadow-[0_6px_24px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:w-auto sm:px-9 sm:py-4 sm:text-base"
            >
              {copy.book}
            </button>
            </Animate>
            <Animate from="right" delay={300} className="w-full sm:w-auto">
            <a
              href="tel:+919996660102"
              className="block w-full rounded-full border-2 border-black/60 px-5 py-3.5 text-sm font-semibold text-black transition hover:border-white hover:bg-white/15 sm:w-auto sm:px-8 sm:text-base"
            >
              {copy.phone}
            </a>
            </Animate>
          </div>
      </div>
    </section>
  );
}
