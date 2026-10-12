"use client";

import Image from "next/image";
import Animate from "./Animate";
import { branches, concerns } from "./data";
import { CountUp } from "./hero";
import { useConsultationBooking } from "./use-consultation-booking";

const backgroundImages = [
  "https://res.cloudinary.com/lb2my6df/image/upload/v1791027119/generic-ban-1.png",
  "https://res.cloudinary.com/lb2my6df/image/upload/v1791027119/generic-ban-2.png",
  "https://res.cloudinary.com/lb2my6df/image/upload/v1791027120/generic-ban-3.png",
];
type IconName = "hospital" | "leaf" | "bowl" | "people" | "star" | "calendar" | "lock";

function LineIcon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    hospital: <><path d="M5 21V8h14v13M8 8V4h8v4M3 21h18M9 12h2m2 0h2m-6 4h2m2 0h2m-4 5v-3h2v3" /></>,
    leaf: <><path d="M12 21V9" /><path d="M12 13C7 13 4 10 4 5c5 0 8 3 8 8ZM12 16c5 0 8-3 8-8-5 0-8 3-8 8Z" /></>,
    bowl: <><path d="M4 11h16c-.7 5-3.4 8-8 8s-7.3-3-8-8ZM7 19h10M9 8c0-2 1-3 3-4m1 5c0-2 1-3 3-4" /></>,
    people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c.6-4 2.6-6 6-6s5.4 2 6 6m1-5c2.7.2 4.3 1.8 5 4.5" /></>,
    star: <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3Z" />,
    calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4m8-4v4M4 10h16m-10 5 1.5 1.5L15 13" /></>,
    lock: <><rect x="6" y="10" width="12" height="10" rx="2" /><path d="M9 10V7a3 3 0 0 1 6 0v3m-3 4v2" /></>,  };
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const fieldClass = "mt-1.5 h-[clamp(38px,5.8vh,50px)] w-full rounded-xl border border-[var(--vk-green)]/20 bg-[var(--vk-lime-soft)]/55 px-4 text-[clamp(12px,1vw,15px)] font-normal text-[var(--vk-green-dark)] outline-none transition focus:border-[var(--vk-green)] focus:bg-white focus:ring-2 focus:ring-[var(--vk-green)]/15";

export default function HeroReplica() {
  const { fields, submitting, update, handleSubmit } = useConsultationBooking();

  return (
    <section id="hero" className="relative isolate mt-[90px] min-h-[630px] overflow-hidden bg-[var(--vk-lime-soft)] text-[var(--vk-green-dark)] lg:h-[calc(100svh-90px)]">
      <div className="absolute inset-0 -z-20 opacity-30" aria-hidden="true">
        {backgroundImages.map((src, index) => (
          <div key={src} className="hero-bg-slide absolute inset-0 overflow-hidden">
            <Image src={src} alt="" fill priority={index === 0} unoptimized className="hero-bg-zoom object-cover object-center" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(242,249,213,.95),rgba(242,249,213,.75)_55%,rgba(242,249,213,.6))]" />

      <div className="mx-auto grid h-full max-w-[1680px] grid-rows-[auto_minmax(0,1fr)_auto] gap-[clamp(8px,1.1vh,13px)] px-[clamp(20px,2.2vw,38px)] py-[clamp(10px,1.3vh,16px)]">
        <Animate from="left">
        <header>
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--vk-green)]/25 bg-white/95 px-5 py-2 text-[clamp(10px,.85vw,13px)] font-extrabold text-[var(--vk-green)] shadow-sm"><LineIcon name="hospital" className="h-5 w-5" />NABH CERTIFIED AYURVEDIC HOSPITAL</div>
        </header>
        </Animate>

        <div className="grid min-h-0 items-stretch gap-[clamp(16px,3vw,56px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(380px,.8fr)]">
          <Animate from="right" delay={300} className="order-2 mx-auto min-h-0 h-full w-full max-w-[540px] lg:mr-0">
          <form onSubmit={handleSubmit} aria-busy={submitting} className="flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(1,90,54,.17)]">
            <div className="bg-[var(--vk-green-dark)] px-[clamp(18px,2vw,30px)] py-[clamp(12px,2vh,22px)] text-white"><h2 className="font-serif text-[clamp(22px,2vw,34px)] font-bold leading-tight">Book a Consultation</h2><p className="mt-1 text-[clamp(12px,1.15vw,18px)] font-bold text-[var(--vk-lime)]">Doctor consultation — ₹99 only</p></div>
            <div className="flex min-h-0 flex-1 flex-col justify-between gap-1.5 px-[clamp(18px,2vw,30px)] py-[clamp(12px,1.7vh,20px)]">
              <label className="text-[clamp(10px,.8vw,13px)] font-extrabold">NAME<input id="hero-name" type="text" value={fields.name} onChange={update("name")} required placeholder="Full name" className={fieldClass} /></label>
              <label className="text-[clamp(10px,.8vw,13px)] font-extrabold">PHONE<input type="tel" value={fields.phone} onChange={update("phone")} required pattern="[0-9]{10}" inputMode="numeric" maxLength={10} placeholder="10-digit mobile number" className={fieldClass} /></label>
              <label className="text-[clamp(10px,.8vw,13px)] font-extrabold">CONCERN<select required value={fields.concern} onChange={update("concern")} className={fieldClass}><option value="" disabled>Select your concern</option>{concerns.map((c) => <option key={c}>{c}</option>)}</select></label>
              <label className="text-[clamp(10px,.8vw,13px)] font-extrabold">PREFERRED BRANCH<select required value={fields.branch} onChange={update("branch")} className={fieldClass}><option value="" disabled>Select a branch</option>{branches.map((b) => <option key={b}>{b}</option>)}</select></label>
              <button type="submit" disabled={submitting} className="mt-1 h-[clamp(40px,6vh,54px)] rounded-full bg-[var(--vk-pink)] px-4 text-[clamp(12px,1.1vw,17px)] font-extrabold text-white shadow-[0_8px_20px_rgba(239,33,80,.28)] transition hover:bg-[var(--vk-pink-dark)] disabled:cursor-wait disabled:opacity-70">{submitting ? "Processing..." : "Pay & Book My Consultation \u2192"}</button>
              <p className="flex items-start justify-center gap-2 text-center text-[clamp(9px,.75vw,12px)] leading-snug text-[#747b84]"><LineIcon name="lock" className="h-4 w-4 shrink-0" />Secure payment via Razorpay. Our team will call you to confirm your appointment.</p>
            </div>
          </form>
          </Animate>

          <Animate from="left" delay={150} className="order-1 min-h-0 h-full">
          <div className="flex h-full min-h-0 max-w-[760px] flex-col justify-center px-[clamp(4px,1.6vw,28px)] py-4 lg:py-0">
            <p className="font-serif text-[clamp(12px,1vw,17px)] tracking-[.45em]">VK AYURVEDA</p>
            <h1 className="mt-[clamp(8px,1.5vh,18px)] font-serif text-[clamp(40px,5vw,86px)] font-black leading-[.96] tracking-[-.03em]">Back, Neck &amp;<br /><span className="text-[var(--vk-green)]">Joint Pain?</span></h1>
            <h2 className="mt-[clamp(12px,2vh,24px)] font-serif text-[clamp(21px,2.3vw,36px)] font-bold leading-[1.1]">Talk to an Ayurveda Doctor for ₹99.</h2>
            <p className="mt-[clamp(10px,1.7vh,20px)] max-w-[600px] text-[clamp(13px,1.1vw,18px)] leading-[1.6] text-[#3f474d]">Get a detailed assessment, understand your condition and receive a personalised treatment plan — all in one consultation.</p>
            <div className="mt-[clamp(14px,2.6vh,32px)] grid max-w-[600px] grid-cols-3 divide-x divide-[#8f978f]">
              {[["leaf", "Detailed", "Assessment"], ["bowl", "Personalised", "Treatment Plan"], ["people", "Guidance from", "Experienced Doctors"]].map(([icon, a, b]) => <div key={a} className="flex flex-col items-center px-2 text-center"><span className="flex h-[clamp(42px,4.8vw,68px)] w-[clamp(42px,4.8vw,68px)] items-center justify-center rounded-full border border-white bg-[var(--vk-lime)]/35 text-[var(--vk-green)]"><LineIcon name={icon as IconName} /></span><p className="mt-2 font-serif text-[clamp(9px,.8vw,13px)] font-bold leading-tight">{a}<br />{b}</p></div>)}
            </div>
          </div>
          </Animate>
        </div>

        <Animate from="up" delay={600} className="h-full">
        <div className="grid min-h-[72px] grid-cols-2 rounded-[28px] border border-[var(--vk-lime)]/70 bg-[var(--vk-green-dark)] px-4 py-2 text-white shadow-[0_16px_35px_rgba(0,47,33,.22)] sm:grid-cols-4">
          {[
            { icon: "hospital", title: "NABH", desc: "Certified hospital" },
            { icon: "star", count: { to: 4.8, decimals: 1, suffix: " ★" }, desc: "Google rating" },
            { icon: "people", count: { to: 40000, suffix: "+" }, desc: "Patients treated" },
            { icon: "calendar", count: { to: 99, prefix: "₹" }, desc: "Consultation" },
          ].map((item, index) => <div key={item.desc} className={`flex items-center justify-center gap-3 px-3 ${index ? "border-l border-white/20" : ""}`}><span className="flex h-[clamp(38px,4.5vw,58px)] w-[clamp(38px,4.5vw,58px)] shrink-0 items-center justify-center rounded-full border border-[var(--vk-lime)]/70 text-[var(--vk-lime)]"><LineIcon name={item.icon as IconName} /></span><span><strong className="block text-[clamp(14px,1.5vw,24px)]">{item.count ? <CountUp {...item.count} /> : item.title}</strong><small className="text-[clamp(10px,.9vw,14px)] text-white/85">{item.desc}</small></span></div>)}
        </div>
        </Animate>
      </div>
    </section>
  );
}
