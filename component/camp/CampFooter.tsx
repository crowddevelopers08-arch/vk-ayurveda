"use client";

import Link from "next/link";
import styles from "./camp.module.css";
import { useCampLang } from "./use-camp-lang";

const LEGAL_LINKS = [
  { key: "privacy", href: "/generic/privacy-policy" },
  { key: "terms", href: "/generic/terms-and-conditions" },
  { key: "refund", href: "/generic/cancellation-and-refund" },
] as const;

export default function CampFooter() {
  const { copy } = useCampLang();
  return (
    <footer className={styles.footer} id="camp-footer">
      <div className={`${styles.wrap} ${styles.footerInner}`}>
        <div>
          <div className={styles.footerBrand}>
            VK <span>Ayurveda</span>
          </div>
          <p>{copy.footer}</p>
        </div>
        <nav aria-label="Legal" className={styles.legal}>
          {LEGAL_LINKS.map(({ key, href }) => (
            <Link key={key} href={href}>
              {copy.legal[key]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
