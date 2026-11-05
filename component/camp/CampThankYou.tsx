"use client";

import Link from "next/link";
import { PHONE_HREF } from "./data";
import styles from "./camp.module.css";
import CampHeader from "./CampHeader";
import { useCampLang } from "./use-camp-lang";

export default function CampThankYou({ paymentId }: { paymentId?: string }) {
  const { copy } = useCampLang();
  return (
    <>
      <CampHeader home="/camp-Mayiladuthurai" showBook={false} />
      <main className={styles.thanks}>
        <div className={styles.thanksSlip}>
          <div className={styles.slip}>
            <div className={styles.slipBody}>
              <span className={styles.thanksMark} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12.5 4.5 4.5L19 7" />
                </svg>
              </span>
              <h1 className={styles.formTitle}>{copy.thanks}</h1>
              <dl className={styles.thanksFacts}>
                <div>
                  <dt>{copy.venueLabel}</dt>
                  <dd>{copy.venue}</dd>
                </div>
                <div>
                  <dt>{copy.dayLabel}</dt>
                  <dd>{copy.dayValue}</dd>
                </div>
                {paymentId && (
                  <div>
                    <dt>{copy.paymentId}</dt>
                    <dd>{paymentId}</dd>
                  </div>
                )}
              </dl>
            </div>
            <div className={styles.tear} aria-hidden="true" />
            <div className={styles.slipFine}>
              <a className={`${styles.btn} ${styles.btnFull}`} href={PHONE_HREF}>
                {copy.callCta}
              </a>
            </div>
          </div>
          <Link className={styles.thanksBack} href="/camp-Mayiladuthurai">
            {copy.backToCamp}
          </Link>
        </div>
      </main>
    </>
  );
}
