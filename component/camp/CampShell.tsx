"use client";

import { useEffect } from "react";
import styles from "./camp.module.css";
import { useCampLang } from "./use-camp-lang";

// Sets the reading language for everything inside, so Tamil gets its own type settings.
export default function CampShell({ children }: { children: React.ReactNode }) {
  const { lang, copy } = useCampLang();

  useEffect(() => {
    document.title = copy.title;
  }, [copy.title]);

  return (
    <div lang={lang} className={styles.root}>
      {children}
    </div>
  );
}
