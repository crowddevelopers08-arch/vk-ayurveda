"use client";

import { CAMP, PHONE_HREF } from "./data";
import styles from "./camp.module.css";
import { useCampLang } from "./use-camp-lang";

export default function CampDetails() {
  const { copy } = useCampLang();
  return (
    <div className={styles.details}>
      <h2 className={styles.h2}>{copy.detailsTitle}</h2>
      <ul className={styles.info}>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          <span>
            <small>{copy.venueLabel}</small>
            <b>{copy.venue}</b>
          </span>
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
          <span>
            <small>{copy.dayLabel}</small>
            <b>{copy.dayValue}</b>
          </span>
        </li>
        {copy.time && (
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span>
              <small>{copy.timeLabel}</small>
              <b>{copy.time}</b>
            </span>
          </li>
        )}
      </ul>
      <div className={styles.detailsCta}>
        {CAMP.map && (
          <a className={`${styles.btn} ${styles.btnGhostLight}`} href={CAMP.map} target="_blank" rel="noopener noreferrer">
            {copy.directions}
          </a>
        )}
        <a className={`${styles.btn} ${styles.btnGhostLight}`} href={PHONE_HREF}>
          {copy.callCta}
        </a>
      </div>
    </div>
  );
}
