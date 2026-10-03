"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type From = "left" | "right" | "up" | "zoom";

type AnimateProps = {
  children: ReactNode;
  /** Direction the element slides in from */
  from?: From;
  /** Delay in ms, used to stagger items one by one */
  delay?: number;
  className?: string;
};

const hiddenState: Record<From, string> = {
  left: "-translate-x-12 opacity-0",
  right: "translate-x-12 opacity-0",
  up: "translate-y-10 opacity-0",
  zoom: "scale-95 opacity-0",
};

// Slides/fades its children in once they scroll into view. Plays once.
export default function Animate({ children, from = "up", delay = 0, className = "" }: AnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,translate,scale] duration-700 ease-out motion-reduce:translate-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? "translate-0 scale-100 opacity-100" : hiddenState[from]
      } ${className}`}
    >
      {children}
    </div>
  );
}
