"use client";

import Image from "next/image";
import Animate from "./Animate";
import { branches, concerns } from "./data";
import { CountUp } from "./hero";

const backgroundImage = "https://res.cloudinary.com/lb2my6df/image/upload/v1791027119/generic-ban-2.png";
const videoPoster = "https://res.cloudinary.com/lb2my6df/image/upload/v1791027123/Panchakarma-Care.avif";

type IconName = "hospital" | "leaf" | "bowl" | "people" | "star" | "calendar" | "lock" | "play";

function LineIcon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    hospital: <><path d="M5 21V8h14v13M8 8V4h8v4M3 21h18M9 12h2m2 0h2m-6 4h2m2 0h2m-4 5v-3h2v3" /></>,
    leaf: <><path d="M12 21V9" /><path d="M12 13C7 13 4 10 4 5c5 0 8 3 8 8ZM12 16c5 0 8-3 8-8-5 0-8 3-8 8Z" /></>,
    bowl: <><path d="M4 11h16c-.7 5-3.4 8-8 8s-7.3-3-8-8ZM7 19h10M9 8c0-2 1-3 3-4m1 5c0-2 1-3 3-4" /></>,
    people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c.6-4 2.6-6 6-6s5.4 2 6 6m1-5c2.7.2 4.3 1.8 5 4.5" /></>,
    star: <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3Z" />,
    calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4m8-4v4M4 10h16m-10 5 1.5 1.5L15 13" /></>,
    lock: <><rect x="6" y="10" width="12" height="10" rx="2" /><path d="M9 10V7a3 3 0 0 1 6 0v3m-3 4v2" /></>,
    play: <path d="m9 7 8 5-8 5V7Z" />,
  };
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const fieldClass = "mt-1.5 h-[clamp(38px,5.8vh,50px)] w-full rounded-xl border border-[var(--vk-green)]/20 bg-[var(--vk-lime-soft)]/55 px-4 text-[clamp(12px,1vw,15px)] font-normal text-[var(--vk-green-dark)] outline-none transition focus:border-[var(--vk-green)] focus:bg-white focus:ring-2 focus:ring-[var(--vk-green)]/15";

export default function HeroReplica() {
  return (
    <section id="hero" className="relative isolate mt-[90px] min-h-[630px] overflow-hidden bg-[var(--vk-lime-soft)] text-[var(--vk-green-dark)] lg:h-[calc(100svh-90px)]">
      <Image src={backgroundImage} alt="" fill priority unoptimized className="-z-20 object-cover object-center opacity-30" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(242,249,213,.94),rgba(242,249,213,.6)_50%,rgba(242,249,213,.95))]" />

      <div className="mx-auto grid h-full max-w-[1680px] grid-rows-[auto_minmax(0,1fr)_auto] gap-[clamp(8px,1.1vh,13px)] px-[clamp(20px,2.2vw,38px)] py-[clamp(10px,1.3vh,16px)]">
        <Animate from="left">
        <header>
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--vk-green)]/25 bg-white/95 px-5 py-2 text-[clamp(10px,.85vw,13px)] font-extrabold text-[var(--vk-green)] shadow-sm"><LineIcon name="hospital" className="h-5 w-5" />NABH CERTIFIED AYURVEDIC HOSPITAL</div>
        </header>
        </Animate>

        <div className="grid min-h-0 items-stretch gap-[clamp(12px,1.2vw,22px)] lg:grid-cols-[.94fr_1.2fr_.92fr]">
          <Animate from="right" delay={450} className="order-3 min-h-0 h-full">
          <form className="flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(1,90,54,.17)]">
            <div className="bg-[var(--vk-green-dark)] px-[clamp(18px,2vw,30px)] py-[clamp(12px,2vh,22px)] text-white"><h2 className="font-serif text-[clamp(22px,2vw,34px)] font-bold leading-tight">Book a Consultation</h2><p className="mt-1 text-[clamp(12px,1.15vw,18px)] font-bold text-[var(--vk-lime)]">Doctor consultation — ₹150 only</p></div>
            <div className="flex min-h-0 flex-1 flex-col justify-between gap-1.5 px-[clamp(18px,2vw,30px)] py-[clamp(12px,1.7vh,20px)]">
              <label className="text-[clamp(10px,.8vw,13px)] font-extrabold">NAME<input id="hero-name" required placeholder="Full name" className={fieldClass} /></label>
              <label className="text-[clamp(10px,.8vw,13px)] font-extrabold">PHONE<input required inputMode="numeric" maxLength={10} placeholder="10-digit mobile number" className={fieldClass} /></label>
              <label className="text-[clamp(10px,.8vw,13px)] font-extrabold">CONCERN<select required defaultValue="" className={fieldClass}><option value="" disabled>Select your concern</option>{concerns.map((c) => <option key={c}>{c}</option>)}</select></label>
              <label className="text-[clamp(10px,.8vw,13px)] font-extrabold">PREFERRED BRANCH<select required defaultValue="" className={fieldClass}><option value="" disabled>Select a branch</option>{branches.map((b) => <option key={b}>{b}</option>)}</select></label>
              <button type="submit" className="mt-1 h-[clamp(40px,6vh,54px)] rounded-full bg-[var(--vk-pink)] px-4 text-[clamp(12px,1.1vw,17px)] font-extrabold text-white shadow-[0_8px_20px_rgba(239,33,80,.28)] transition hover:bg-[var(--vk-pink-dark)]">Pay &amp; Book My Consultation →</button>
              <p className="flex items-start justify-center gap-2 text-center text-[clamp(9px,.75vw,12px)] leading-snug text-[#747b84]"><LineIcon name="lock" className="h-4 w-4 shrink-0" />Secure payment via Razorpay. Our team will call you to confirm your appointment.</p>
            </div>
          </form>
          </Animate>

          <Animate from="up" delay={300} className="order-2 min-h-[300px] h-full">
          <div className="relative h-full min-h-[300px] overflow-hidden rounded-[26px] border-2 border-white shadow-[0_18px_45px_rgba(25,59,44,.22)]">
            <video className="h-full w-full object-cover" src="/vk-hero.mp4" poster={videoPoster} autoPlay muted loop playsInline controls />
            <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 rounded-full bg-white/95 px-4 py-2 shadow-lg"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#074b37] text-white"><LineIcon name="play" className="h-5 w-5" /></span><span><strong className="block text-[clamp(12px,1vw,16px)]">Inside VK Ayurveda</strong><small className="block text-[clamp(9px,.75vw,12px)] text-[#273d37]">Traditional Care. Real People. Better Lives.</small></span></div>
          </div>
          </Animate>

          <Animate from="left" delay={150} className="order-1 min-h-0 h-full">
          <div className="flex h-full min-h-0 flex-col justify-center px-[clamp(8px,1.6vw,28px)]">
            <p className="font-serif text-[clamp(12px,1vw,17px)] tracking-[.45em]">VK AYURVEDA</p>
            <h1 className="mt-[clamp(8px,1.5vh,18px)] font-serif text-[clamp(40px,4.15vw,72px)] font-black leading-[.96] tracking-[-.03em]">Back, Neck &amp;<br /><span className="text-[var(--vk-green)]">Joint Pain?</span></h1>
            <h2 className="mt-[clamp(12px,2vh,24px)] font-serif text-[clamp(21px,2vw,30px)] font-bold leading-[1.08]">Talk to an Ayurveda Doctor<br />for ₹150.</h2>
            <p className="mt-[clamp(10px,1.7vh,20px)] text-[clamp(11px,1vw,16px)] leading-[1.55] text-[#3f474d]">Get a detailed assessment, understand your condition and receive a personalised treatment plan — all in one consultation.</p>
            <div className="mt-[clamp(12px,2vh,24px)] grid grid-cols-3 divide-x divide-[#8f978f]">
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
            { icon: "calendar", count: { to: 150, prefix: "₹" }, desc: "Consultation" },
          ].map((item, index) => <div key={item.desc} className={`flex items-center justify-center gap-3 px-3 ${index ? "border-l border-white/20" : ""}`}><span className="flex h-[clamp(38px,4.5vw,58px)] w-[clamp(38px,4.5vw,58px)] shrink-0 items-center justify-center rounded-full border border-[var(--vk-lime)]/70 text-[var(--vk-lime)]"><LineIcon name={item.icon as IconName} /></span><span><strong className="block text-[clamp(14px,1.5vw,24px)]">{item.count ? <CountUp {...item.count} /> : item.title}</strong><small className="text-[clamp(10px,.9vw,14px)] text-white/85">{item.desc}</small></span></div>)}
        </div>
        </Animate>
      </div>
    </section>
  );
}
