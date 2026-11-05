"use client";

import styles from "./camp.module.css";
import { useCampLang } from "./use-camp-lang";

export default function CampAbout() {
  const { copy } = useCampLang();
  return (
    <section className={styles.about} id="camp">
      <div className={styles.wrap}>
        <div className={styles.aboutHead}>
          <h2 className={styles.h2}>{copy.campTitle}</h2>
          <p className={styles.lead}>{copy.campLead}</p>
        </div>

        <div className={styles.aboutBody}>
          <div className={styles.aboutCol}>
            <h3 className={styles.h3}>{copy.painsLabel}</h3>
            <ul className={styles.pains}>
              {copy.pains.map((pain) => (
                <li key={pain}>{pain}</li>
              ))}
            </ul>
          </div>
          <div className={styles.aboutCol}>
            <h3 className={styles.h3}>{copy.getsLabel}</h3>
            <ul className={styles.ticks}>
              {copy.gets.map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m7.5 12.5 3 3 6-7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.note}>
          <p>{copy.note}</p>
          <a className={styles.btn} href="#book">
            {copy.bookCta}
          </a>
        </div>
      </div>
    </section>
  );
}
