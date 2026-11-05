"use client";

import Image from "next/image";
import type { CampLang } from "./data";
import styles from "./camp.module.css";
import { setCampLang, useCampLang } from "./use-camp-lang";

const LANGS: { value: CampLang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ta", label: "தமிழ்" },
];

function LanguageToggle() {
  const { lang } = useCampLang();
  return (
    <div className={styles.lang} data-active={lang} role="group" aria-label="Language">
      {LANGS.map(({ value, label }) => (
        <button key={value} type="button" aria-pressed={lang === value} onClick={() => setCampLang(value)}>
          {label}
        </button>
      ))}
    </div>
  );
}

// `home` is where the logo links to. The thank-you page links back to /camp and has no booking button.
export default function CampHeader({ home = "#hero", showBook = true }: { home?: string; showBook?: boolean }) {
  const { copy } = useCampLang();
  return (
    <header className={styles.header}>
      <div className={`${styles.wrap} ${styles.bar}`}>
        <a className={styles.brand} href={home} aria-label="VK Ayurveda home">
          <Image
            src="https://res.cloudinary.com/lb2my6df/image/upload/v1791027125/vk-logos.png"
            alt="VK Ayurveda logo"
            width={150}
            height={156}
            priority
          />
          <span>{copy.brandTagline}</span>
        </a>
        <LanguageToggle />
        {showBook && (
          <a className={`${styles.btn} ${styles.btnSmall} ${styles.hideSmall}`} href="#book">
            {copy.bookHeader}
          </a>
        )}
      </div>
    </header>
  );
}
