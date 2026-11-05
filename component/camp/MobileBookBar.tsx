"use client";

import { useEffect, useState } from "react";
import { PHONE_HREF } from "./data";
import styles from "./camp.module.css";
import { useCampLang } from "./use-camp-lang";

// Keeps booking one tap away on phones. Hides while another booking button, the form or the footer is on screen.
export default function MobileBookBar() {
  const { copy } = useCampLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = ["hero-cta", "book", "camp-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? onScreen.add(entry.target) : onScreen.delete(entry.target)));
      setShow(onScreen.size === 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.mobileBar} data-show={show} inert={!show}>
      <a className={styles.mobileBarCall} href={PHONE_HREF}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
        </svg>
        {copy.callUs}
      </a>
      <a className={styles.mobileBarBook} href="#book">
        {copy.bookCta}
      </a>
    </div>
  );
}
