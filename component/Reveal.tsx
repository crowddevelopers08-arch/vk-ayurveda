"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: "delay-100" | "delay-200" | "delay-300" | "delay-400" | "delay-500";
};

const delayClass = {
  "delay-100": "delay-100",
  "delay-200": "delay-200",
  "delay-300": "delay-300",
  "delay-400": "delay-[400ms]",
  "delay-500": "delay-500",
};

export default function Reveal({ children, className = "", delay }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "translate-y-8 opacity-0 transition duration-700 ease-out",
        delay ? delayClass[delay] : "",
        visible ? "translate-y-0 opacity-100" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
