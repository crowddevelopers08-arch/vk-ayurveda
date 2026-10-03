"use client";

import Image from "next/image";

export default function Navbar() {
  const goToForm = () => {
    const nameField = document.getElementById("hero-name");
    if (!nameField) {
      // Pages without the hero form (e.g. legal pages) go back to the landing page form
      window.location.href = "/generic#hero";
      return;
    }
    nameField.scrollIntoView({ behavior: "smooth", block: "center" });
    nameField.focus({ preventScroll: true });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--vk-green)]/10 bg-white/95 px-4 shadow-[0_2px_20px_rgba(1,90,54,0.08)] backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex h-[90px] max-w-[1380px] items-center justify-between gap-4">
        <a href="/generic#hero" className="flex items-center" aria-label="VK Ayurveda home">
          <Image
            src="/vk-logos.png"
            alt="VK Ayurveda logo"
            width={150}
            height={52}
            priority
            className="h-[82px] w-auto object-contain"
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="tel:+919996660102"
            aria-label="Call 99966 60102"
            className="group flex items-center gap-2.5 rounded-full text-[var(--vk-green-dark)] transition hover:text-[var(--vk-green)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--vk-green)]/15 bg-[var(--vk-lime-soft)] text-[var(--vk-green)] transition group-hover:bg-[var(--vk-green)] group-hover:text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
              </svg>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--vk-green)]/70">Call us</span>
              <span className="block text-[15px] font-extrabold">99966 60102</span>
            </span>
          </a>

          <button
            type="button"
            onClick={goToForm}
            className="cursor-pointer rounded-full bg-[var(--vk-pink)] px-4 py-2.5 text-[13px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--vk-pink-dark)] sm:px-6 sm:py-3 sm:text-sm"
          >
            <span className="sm:hidden">Book Now</span>
            <span className="hidden sm:inline">Book ₹150 Consultation</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
