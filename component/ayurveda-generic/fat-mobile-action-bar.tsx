"use client";

export default function MobileActionBar() {
  // Scroll to the hero form; pages without it (legal, thank-you) go back to the landing page form
  const goToForm = () => {
    const nameField = document.getElementById("hero-name");
    if (!nameField) {
      window.location.href = "/generic#hero";
      return;
    }
    nameField.scrollIntoView({ behavior: "smooth", block: "center" });
    nameField.focus({ preventScroll: true });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex shadow-[0_-16px_38px_rgba(36,31,33,0.16)] md:hidden">
      {/* Call Now */}
      <a
        href="tel:+919996660102"
        className="flex flex-1 items-center justify-center gap-2 bg-[var(--vk-green)] py-4 text-sm font-semibold text-white transition active:scale-95"
      >
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.7 0 1.2.5 1.2 1.2v3.5c0 .7-.5 1.2-1.2 1.2C10.9 21.4 2.6 13.1 2.6 3.4c0-.7.5-1.2 1.2-1.2h3.5c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.7.6 4 .1.4 0 .9-.3 1.2l-2.2 2.2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Call Now
      </a>

      {/* Book Now — scrolls to the hero consultation form */}
      <button
        type="button"
        onClick={goToForm}
        className="flex flex-1 cursor-pointer items-center justify-center gap-2 border-l border-white/35 bg-[var(--vk-pink)] py-4 text-sm font-semibold text-white transition active:scale-95"
      >
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 3v3M17 3v3M4 9h16M6 5h12c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Book Now
      </button>
    </div>
  );
}
