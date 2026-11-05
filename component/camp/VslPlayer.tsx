"use client";

import { useRef, useState } from "react";
import { CAMP } from "./data";
import styles from "./camp.module.css";
import { useCampLang } from "./use-camp-lang";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.4-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5z" />
  </svg>
);

// Landscape 16:9 frame. Set CAMP.video in data.ts to replace the placeholder.
export default function VslPlayer() {
  const { copy } = useCampLang();
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  if (!CAMP.video) {
    return (
      <div className={styles.vsl}>
        <div className={styles.vslEmpty}>
          <span className={styles.vslPlay}>
            <PlayIcon />
          </span>
          <p>{copy.videoPlaceholder}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.vsl}>
      <video
        ref={video}
        controls={started}
        playsInline
        preload="metadata"
        poster={CAMP.poster || undefined}
        onPlay={() => setStarted(true)}
      >
        <source src={CAMP.video} type="video/mp4" />
      </video>
      {!started && (
        <button type="button" className={styles.vslStart} aria-label={copy.videoPlay} onClick={() => video.current?.play()}>
          <span className={styles.vslPlay}>
            <PlayIcon />
          </span>
        </button>
      )}
    </div>
  );
}
