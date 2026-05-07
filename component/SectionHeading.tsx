import Reveal from "./Reveal";

type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
  dark?: boolean;
  className?: string;
};

export default function SectionHeading({
  label,
  title,
  description,
  dark = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal className={`mb-[52px] text-center ${className}`}>
      <div
        className={`mb-2.5 text-xs font-bold uppercase tracking-[0.16em] ${
          dark ? "text-[var(--vk-lime)]" : "text-[var(--vk-pink)]"
        }`}
      >
        {label}
      </div>
      <h2
        className={`mb-4 font-serif text-[clamp(1.25rem,4.5vw,4rem)] font-black leading-[1.12] ${
          dark ? "text-white" : "text-[var(--vk-green)]"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mx-auto max-w-xl text-[19px] leading-[1.75] ${
          dark ? "text-white/60" : "text-[#6b7280]"
        }`}
      >
        {description}
      </p>
    </Reveal>
  );
}
