"use client";

import Link from "next/link";
import Animate from "./Animate";

const steps = [
  { title: "We call you", description: "Our team will call you to confirm your request." },
  { title: "Confirm your slot", description: "Choose a convenient time at your preferred branch." },
  { title: "Meet the doctor", description: "One-to-one ₹150 consultation and a clear plan." },
];

export default function ThankYou({ paymentId }: { paymentId?: string }) {
  return (
    <main className="relative flex min-h-svh items-center overflow-hidden bg-linear-to-b from-[#fbfdf4] to-[var(--vk-lime-soft)] px-4 pb-5 pt-[100px] sm:pb-6 sm:pt-[106px] text-[var(--vk-green-dark)] sm:px-6">
      {/* Bubbles */}
      <div aria-hidden className="pointer-events-none absolute -left-20 top-24 h-64 w-64 animate-[bubble-float_9s_ease-in-out_infinite] rounded-full bg-[var(--vk-green)]/10 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 animate-[bubble-float_10s_ease-in-out_infinite_2s] rounded-full bg-[var(--vk-pink)]/10 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 left-1/3 h-60 w-60 animate-[bubble-float_11s_ease-in-out_infinite_1s] rounded-full bg-[var(--vk-lime)]/25 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute right-16 top-32 h-16 w-16 animate-[bubble-float_8s_ease-in-out_infinite_1.5s] rounded-full border-2 border-[var(--vk-pink)]/20 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute bottom-16 left-12 h-12 w-12 animate-[bubble-float_7s_ease-in-out_infinite_2.5s] rounded-full border-2 border-[var(--vk-green)]/20 motion-reduce:animate-none" />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        {/* Success mark */}
        <Animate from="zoom">
          <div className="relative mx-auto mb-[2vh] flex h-[clamp(3.25rem,9vh,5.5rem)] w-[clamp(3.25rem,9vh,5.5rem)] items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--vk-green)]/20 [animation-duration:2.2s] motion-reduce:animate-none" />
            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[var(--vk-green)] text-white shadow-[0_14px_34px_rgba(1,90,54,0.35)] ring-[6px] ring-white sm:ring-8">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="h-1/2 w-1/2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </div>
        </Animate>

        <Animate from="up" delay={120}>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--vk-green)] sm:text-[13px]">
            {paymentId ? "Payment Successful" : "Request Received"}
          </p>
        </Animate>
        <Animate from="left" delay={220}>
          <h1 className="font-[Georgia,'Playfair_Display',serif] text-[clamp(1.5rem,min(6vw,7vh),3.75rem)] font-black leading-[1.08] tracking-[-0.02em]">
            Thank you, <span className="text-[var(--vk-pink)]">we&apos;ve got it!</span>
          </h1>
        </Animate>
        <Animate from="right" delay={320}>
          <p className="mx-auto mt-[1.5vh] max-w-xl text-[14px] font-medium leading-[1.6] text-[#4b5563] sm:text-[17px] sm:leading-[1.65]">
            Your consultation request has been submitted. Our team will contact you shortly to confirm your
            appointment and guide you with the next steps.
          </p>
          {paymentId && (
            <p className="mx-auto mt-2 text-[12px] font-semibold text-[var(--vk-green)] sm:text-[13px]">
              Payment ID: <span className="font-mono">{paymentId}</span>
            </p>
          )}
        </Animate>

        {/* What happens next */}
        <div className="mx-auto mt-[2.5vh] grid max-w-3xl gap-2 text-left sm:mt-[3vh] sm:grid-cols-3 sm:gap-4">
          {steps.map((step, index) => (
            <Animate key={step.title} from="up" delay={420 + index * 120} className="h-full">
              <div className="flex h-full items-center gap-3 rounded-tl-[16px] rounded-br-[16px] border border-[var(--vk-green)]/10 bg-white/90 px-3 py-2.5 sm:items-start sm:rounded-tl-[20px] sm:rounded-br-[20px] sm:p-[min(2vh,16px)] shadow-[0_10px_28px_rgba(1,90,54,0.08)] sm:flex-col sm:gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--vk-lime-soft)] font-serif text-[15px] font-black text-[var(--vk-green)] ring-1 ring-[var(--vk-green)]/15">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-[14px] font-extrabold sm:text-[15px] leading-tight text-[var(--vk-green-dark)]">{step.title}</h2>
                  <p className="mt-0.5 text-[12px] leading-[1.4] text-[#6b7280] sm:mt-1 sm:text-[13px] sm:leading-[1.5]">{step.description}</p>
                </div>
              </div>
            </Animate>
          ))}
        </div>

        {/* Actions */}
        <Animate from="up" delay={800}>
          <div className="mt-[2.5vh] flex items-center justify-center gap-2.5 sm:mt-[3vh] sm:gap-3">
            <a
              href="https://wa.me/919996660102"
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--vk-pink)] px-4 py-3 text-[13px] sm:flex-none sm:px-7 sm:py-3.5 sm:text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(239,33,80,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-pink-dark)] sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7a11.7 11.7 0 0 1-4.6-4.1c-.4-.5-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6 0l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.6-.1 1.2Z" />
              </svg>
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Message on WhatsApp</span>
            </a>
            <a
              href="tel:+919996660102"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[var(--vk-green)] bg-white/70 px-4 py-[10px] text-[13px] sm:flex-none sm:px-7 sm:py-3 sm:text-sm font-extrabold text-[var(--vk-green)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-green)] hover:text-white sm:w-auto"
            >
              <span className="sm:hidden">Call Us</span>
              <span className="hidden sm:inline">Call 99966 60102</span>
            </a>
          </div>
          <Link
            href="/generic"
            className="mt-[1.8vh] inline-block text-[13px] font-bold text-[var(--vk-green)] underline-offset-4 hover:underline"
          >
            ← Back to Home
          </Link>
        </Animate>
      </div>
    </main>
  );
}
