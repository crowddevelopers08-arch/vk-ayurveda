"use client";

import Image from "next/image";
import { PHONE_HREF } from "./data";
import styles from "./camp.module.css";
import { useCampLang } from "./use-camp-lang";
import VslPlayer from "./VslPlayer";

export default function CampHero() {
  const { copy } = useCampLang();
  return (
    <section className={styles.hero} id="hero">
      {/* Decorative temple photo. A tint over it keeps the text readable. */}
      <div className={styles.heroBg} aria-hidden="true">
        <Image src="/temple.jpeg" alt="" fill sizes="100vw" priority />
      </div>
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroHead}>
          <span className={styles.badge}>{copy.badge}</span>
          <h1 className={styles.h1}>{copy.h1}</h1>
          <p className={styles.sub}>{copy.sub}</p>
        </div>

        <div className={styles.heroVideo}>
          <VslPlayer />
        </div>

        <div className={styles.heroOffer}>
          {/* The token slip: the page's one signature element. */}
          <div className={`${styles.slip} ${styles.slipEnter}`}>
            <div className={styles.slipPrices}>
              <div className={styles.slipPrice}>
                <span className={styles.slipBig}>₹99</span>
                <span>{copy.offerOnline}</span>
              </div>
              <div className={styles.slipPrice}>
                <span className={styles.slipAlt}>₹199</span>
                <span>{copy.offerDirect}</span>
              </div>
            </div>
            <div className={styles.tear} aria-hidden="true" />
            <p className={styles.slipFoot}>{copy.offerDiscount}</p>
            <div className={styles.slipCta} id="hero-cta">
              <a className={styles.btn} href="#book">
                {copy.bookCta}
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={PHONE_HREF}>
                {copy.callCta}
              </a>
            </div>
          </div>
        </div>

        <ul className={styles.trust}>
          {copy.trust.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
