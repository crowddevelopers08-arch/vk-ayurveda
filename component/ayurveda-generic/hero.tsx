"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Animate from "./Animate";

const concerns = [
  "Back / Spine Pain",
  "Knee / Joint Pain",
  "Neck Pain",
  "Paralysis / Stroke",
  "Neurological Disorder",
  "Arthritis",
  "Other",
];

const backgrounds = ["/generic-ban-1.png", "/generic-ban-2.png", "/generic-ban-3.png"];
// Portrait versions shown on mobile/tablet (below lg), rotated in step with the desktop set
const mobileBackgrounds = ["/generic-mbl-1.png", "/generic-mbl-2.png", "/generic-mbl-3.png"];

// TODO: replace with the real VK Ayurveda branch names
const branches = ["Branch 1", "Branch 2", "Branch 3"];

const highlights = [
  {
    title: "NABH",
    description: "Certified hospital",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
        <path d="m8.8 12 2.2 2.2 4.4-4.4" />
      </svg>
    ),
  },
  {
    title: "4.8★",
    count: { to: 4.8, decimals: 1, suffix: "★" },
    description: "Google rating",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
      </svg>
    ),
  },
  {
    title: "40,000+",
    count: { to: 40000, suffix: "+" },
    description: "Patients treated",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c.7-3 2.8-4.8 5.5-4.8s4.8 1.8 5.5 4.8" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M16 14.3c2.3.2 3.9 1.8 4.5 4.2" />
      </svg>
    ),
  },
  {
    title: "₹150",
    count: { to: 150, prefix: "₹" },
    description: "Consultation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4M9 14.5l2 2 4-4" />
      </svg>
    ),
  },
];

const fieldClass =
  "w-full rounded-tl-[12px] rounded-br-[12px] border border-[var(--vk-green)]/20 bg-[var(--vk-lime-soft)] px-3.5 py-[min(1.1vh,11px)] text-[15px] text-[var(--vk-green-dark)] outline-none transition placeholder:text-[#9ca3af] focus:border-[var(--vk-green)] focus:bg-white focus:ring-2 focus:ring-[var(--vk-green)]/15";

const labelClass =
  "mb-1 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-[var(--vk-green)]";

type CountUpProps = { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number };

// Counts from 0 up to `to` once the number scrolls into view, then stops on the final value.
function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 2000 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValue(to);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(to * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  const formatted = value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vk-green)]">
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}

function LeafSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" fill="none" className={className} aria-hidden>
      <path d="M60 198C58 150 62 100 78 40" stroke="#015a36" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M78 40C70 22 74 8 86 2c6 14 2 28-8 38Z" fill="#c5d839" />
      <path d="M72 70c-16-6-26-20-24-36 16 4 26 18 24 36Z" fill="#015a36" />
      <path d="M75 82c14-10 30-12 40-4-10 12-26 14-40 4Z" fill="#c5d839" />
      <path d="M66 112c-18-2-32-14-34-30 18 0 32 12 34 30Z" fill="#015a36" />
      <path d="M68 124c12-12 28-16 40-10-8 14-24 18-40 10Z" fill="#c5d839" />
      <path d="M62 152c-16 2-30-6-36-20 16-4 30 4 36 20Z" fill="#015a36" />
      <path d="M63 160c10-12 24-18 36-14-6 14-20 20-36 14Z" fill="#c5d839" />
    </svg>
  );
}

export default function Hero() {
  const router = useRouter();
  const [fields, setFields] = useState({ name: "", phone: "", concern: "", branch: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveBg((i) => (i + 1) % backgrounds.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const update = (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Generic Hero Form",
          name: fields.name,
          phone: fields.phone,
          concern: `${fields.concern} | Branch: ${fields.branch}`,
          pageUrl: window.location.href,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      router.push("/thank-you");
    } catch (err) {
      console.error("Hero form submission failed:", err);
      setSubmitting(false);
      alert("Sorry, we could not submit your request. Please try again.");
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-[var(--vk-lime-soft)] pt-[90px] lg:h-svh lg:min-h-[680px]">
      {/* Background image + palette wash */}
      {backgrounds.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={index === 0}
          unoptimized
          className={`pointer-events-none hidden object-cover object-center transition-opacity duration-[1500ms] ease-out lg:block ${
            index === activeBg ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Mobile/tablet: portrait images fill the first screen, then fade into the lime background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-svh lg:hidden">
        {mobileBackgrounds.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={index === 0}
            unoptimized
            className={`object-cover object-center transition-opacity duration-[1500ms] ease-out ${
              index === activeBg ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[var(--vk-lime-soft)]/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-[var(--vk-lime-soft)]" />
      </div>
      {/* Desktop: solid palette wash behind the text column only, fading out so the photo stays clear */}
      <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-[var(--vk-lime-soft)]/95 from-20% via-[var(--vk-lime-soft)]/70 via-35% to-transparent to-55% lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[var(--vk-green-dark)]/30 to-transparent" />

      <div className="relative mx-auto flex max-w-[1400px] flex-col px-5 py-10 sm:px-8 lg:h-full lg:px-10 lg:py-[2.5vh]">
        {/* Three columns: text · video · form */}
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1fr_1.3fr_0.9fr] lg:gap-[clamp(1.25rem,2vw,2.25rem)]">
          {/* Left — text (on mobile/tablet it sits on a soft card so it reads cleanly over the photo) */}
          <div className="relative min-w-0 max-lg:rounded-tl-[28px] max-lg:rounded-br-[28px] max-lg:border max-lg:border-white/70 max-lg:bg-[var(--vk-lime-soft)]/85 max-lg:px-5 max-lg:py-6 max-lg:shadow-[0_18px_40px_rgba(1,90,54,0.12)]">
            <Animate from="left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--vk-green)]/15 bg-white px-4 py-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-[var(--vk-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--vk-pink)]" />
              NABH Certified Ayurvedic Hospital
            </span>
            </Animate>

            <Animate from="left" delay={150}>
            <h1 className="mt-[1.6vh] font-serif text-[clamp(1.9rem,min(2.75vw,5vh),3.1rem)] font-black leading-[1.08] text-[var(--vk-green-dark)]">
              Back, Neck &amp; Joint Pain?
              <span className="block text-[var(--vk-green)]">Talk to an Ayurveda Doctor for ₹150.</span>
            </h1>
            </Animate>

            <Animate from="left" delay={300}>
            <p className="mt-[1.6vh] max-w-[440px] text-[clamp(0.95rem,min(1.1vw,2.05vh),1.12rem)] leading-[1.65] text-[#374151] lg:text-[#4b5563]">
              Get your condition assessed in a one-to-one consultation and know the right treatment plan for you — before deciding anything else.
            </p>
            </Animate>

            <Animate from="left" delay={450}>
            <div className="mt-[1.8vh] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <ul className="flex w-max animate-[marquee_18s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
                {[0, 1].flatMap((copy) =>
                  ["Doctor-led assessment", "Personalised plan", "No obligation to admit"].map((point) => (
                    <li
                      key={`${copy}-${point}`}
                      aria-hidden={copy === 1}
                      className="flex shrink-0 items-center gap-2.5 pr-8 text-[16px] font-semibold whitespace-nowrap text-[var(--vk-green-dark)]"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--vk-green)] text-white">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <path d="m5 10.5 3 3 7-7" />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))
                )}
              </ul>
            </div>
            </Animate>

            <Animate from="left" delay={600}>
            <a
              href="tel:+919996660102"
              className="mt-[2.2vh] inline-flex items-center gap-2 rounded-full border-2 border-[var(--vk-green)] px-6 py-3 text-[15px] font-extrabold text-[var(--vk-green)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-green)] hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
              </svg>
              Call 99966 60102
            </a>
            </Animate>
          </div>

          {/* Center — landscape video */}
          <Animate from="up" delay={300} className="relative">
            {/* <LeafSprig className="pointer-events-none absolute -left-6 -top-10 z-10 hidden h-24 w-auto -rotate-12 lg:block" /> */}
            <div className="relative overflow-hidden rounded-tl-[40px] rounded-br-[40px] rounded-tr-[12px] rounded-bl-[12px] bg-[var(--vk-green-dark)] p-2 shadow-[0_28px_70px_rgba(1,90,54,0.28)]">
              <div className="relative aspect-video overflow-hidden rounded-tl-[34px] rounded-br-[34px] rounded-tr-[8px] rounded-bl-[8px]">
                <video
                  className="h-full w-full object-cover"
                  src="/vk-hero.mp4"
                  poster="/Panchakarma-Care.avif"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[var(--vk-green-dark)]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 shadow-lg">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--vk-pink)] text-white">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 h-3 w-3">
                      <path d="M6 4.5v11l9-5.5-9-5.5Z" />
                    </svg>
                  </span>
                  <span className="text-[13.5px] font-extrabold text-[var(--vk-green-dark)]">Inside VK Ayurveda</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 right-6 hidden rounded-tl-[16px] rounded-br-[16px] bg-[var(--vk-lime)] px-4 py-2.5 shadow-[0_12px_30px_rgba(1,90,54,0.2)] sm:block">
              <p className="font-serif text-[22px] font-black leading-none text-[var(--vk-green-dark)]">
                <CountUp to={40000} suffix="+" />
              </p>
              <p className="mt-1 text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-[var(--vk-green)]">Patients treated</p>
            </div>
          </Animate>

          {/* Right — form */}
          <Animate from="right" delay={450}>
          <div className="overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-white shadow-[0_24px_60px_rgba(1,90,54,0.18)]">
            <div className="bg-[var(--vk-green-dark)] px-6 py-[min(1.6vh,16px)] text-center">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[var(--vk-lime)]">VK Ayurveda</p>
              <h2 className="mt-1 font-serif text-[clamp(1.3rem,min(1.65vw,3.1vh),1.7rem)] font-black leading-tight text-white">
                Book a Consultation
              </h2>
              <p className="mt-1 text-[14px] text-white/65">Doctor consultation — ₹150 only</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-[min(1.1vh,11px)] px-6 py-[min(1.8vh,18px)]">
              <div>
                <label htmlFor="hero-name" className={labelClass}>Name</label>
                <input id="hero-name" type="text" required placeholder="Full name" value={fields.name} onChange={update("name")} className={fieldClass} />
              </div>

              <div>
                <label htmlFor="hero-phone" className={labelClass}>Phone</label>
                <input
                  id="hero-phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={fields.phone}
                  onChange={update("phone")}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="hero-concern" className={labelClass}>Concern</label>
                <div className="relative">
                  <select id="hero-concern" required value={fields.concern} onChange={update("concern")} className={`${fieldClass} appearance-none pr-10`}>
                    <option value="" disabled>Select your concern</option>
                    {concerns.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </div>

              <div>
                <label htmlFor="hero-branch" className={labelClass}>Preferred Branch</label>
                <div className="relative">
                  <select id="hero-branch" required value={fields.branch} onChange={update("branch")} className={`${fieldClass} appearance-none pr-10`}>
                    <option value="" disabled>Select a branch</option>
                    {branches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-[var(--vk-pink)] py-[min(1.45vh,14px)] text-[15px] font-extrabold text-white shadow-[0_10px_28px_rgba(239,33,80,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-pink-dark)] disabled:opacity-70"
              >
                {submitting ? "Submitting…" : "Book My Consultation →"}
              </button>

              <p className="text-center text-[12.5px] text-[#9ca3af]">Our team will call you to confirm your appointment.</p>
            </form>
          </div>
          </Animate>
        </div>

        {/* Highlights bar */}
        <div className="mt-10 lg:mt-[2.5vh]">
          <div className="grid grid-cols-1 gap-y-5 rounded-tl-[28px] rounded-br-[28px] bg-[var(--vk-green-dark)] px-6 py-6 shadow-[0_20px_50px_rgba(0,58,34,0.3)] sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-y-0 lg:py-[1.8vh]">
            {highlights.map((item, index) => (
              <Animate key={item.title} from="up" delay={600 + index * 120}>
              <div
                className={`flex items-center gap-3.5 lg:px-5 ${index > 0 ? "lg:border-l lg:border-white/15" : "lg:pl-0"} ${
                  index === highlights.length - 1 ? "lg:pr-0" : ""
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--vk-lime)]/40 bg-white/10 text-[var(--vk-lime)]">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-[18px] font-bold leading-snug text-white">
                    {item.count ? <CountUp {...item.count} /> : item.title}
                  </h3>
                  <p className="mt-0.5 text-[14px] leading-[1.5] text-white/65">{item.description}</p>
                </div>
              </div>
              </Animate>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
