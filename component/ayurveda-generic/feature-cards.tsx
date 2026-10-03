import Image from "next/image";
import Animate from "./Animate";

const steps = [
  {
    title: "Consult",
    description: "Meet the doctor for a ₹150 assessment of your back, neck or joint problem.",
    image: "https://res.cloudinary.com/lb2my6df/image/upload/v1791027119/generic-ban-1.png",
    alt: "Ayurveda doctor consulting a patient",
  },
  {
    title: "Plan",
    description: "Get a personalised plan explaining therapies, duration and whether admission is needed.",
    image: "https://res.cloudinary.com/lb2my6df/image/upload/v1791027117/doctors.png",
    alt: "Doctor explaining the spine with a model",
  },
  {
    title: "Treat",
    description: "Ayurvedic therapies and Panchakarma care, supervised by experienced doctors.",
    image: "https://res.cloudinary.com/lb2my6df/image/upload/v1791027119/generic-ban-2.png",
    alt: "Ayurvedic therapy in a traditional setting",
  },
  {
    title: "Follow up",
    description: "Regular reviews to track progress and adjust your plan.",
    image: "https://res.cloudinary.com/lb2my6df/image/upload/v1791027116/Ayurvedic-Doctors.png",
    alt: "VK Ayurveda doctors team",
  },
];

export default function FeatureCards() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#fbfdf4] to-[var(--vk-lime-soft)] px-5 py-8 sm:px-8 lg:py-10">
      {/* Bubbles — left */}
      <div aria-hidden className="pointer-events-none absolute -left-20 top-10 h-64 w-64 animate-[bubble-float_9s_ease-in-out_infinite] rounded-full bg-[var(--vk-green)]/10 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute left-10 top-64 h-16 w-16 animate-[bubble-float_7s_ease-in-out_infinite_1s] rounded-full border-2 border-[var(--vk-green)]/20 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute left-32 top-20 h-5 w-5 animate-[bubble-float_6s_ease-in-out_infinite_0.5s] rounded-full bg-[var(--vk-lime)]/70 motion-reduce:animate-none" />

      {/* Bubbles — right */}
      <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 animate-[bubble-float_10s_ease-in-out_infinite_2s] rounded-full bg-[var(--vk-pink)]/10 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute right-16 top-12 h-20 w-20 animate-[bubble-float_8s_ease-in-out_infinite_1.5s] rounded-full border-2 border-[var(--vk-pink)]/20 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute right-40 top-36 h-4 w-4 animate-[bubble-float_6s_ease-in-out_infinite] rounded-full bg-[var(--vk-pink)]/40 motion-reduce:animate-none" />

      {/* Bubbles — bottom */}
      <div aria-hidden className="pointer-events-none absolute -bottom-28 left-1/3 h-60 w-60 animate-[bubble-float_11s_ease-in-out_infinite_1s] rounded-full bg-[var(--vk-lime)]/25 motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute bottom-8 right-1/4 h-12 w-12 animate-[bubble-float_7s_ease-in-out_infinite_2.5s] rounded-full border-2 border-[var(--vk-lime)] motion-reduce:animate-none" />
      <div aria-hidden className="pointer-events-none absolute bottom-16 left-16 h-6 w-6 animate-[bubble-float_6s_ease-in-out_infinite_3s] rounded-full bg-[var(--vk-green)]/25 motion-reduce:animate-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-2 text-center sm:mb-6">
          <Animate from="left">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--vk-green)] sm:mb-2 sm:text-[13px] sm:tracking-[0.18em]">
            How It Works
          </p>
          </Animate>
          <Animate from="right" delay={150}>
          <h2
            style={{ fontFamily: "Georgia,'Playfair Display',serif", fontWeight: "900", fontSize: "clamp(1.25rem,3.5vw,4rem)", letterSpacing: "-0.02em" }}
            className="mx-auto max-w-4xl font-black leading-[1.12] text-[var(--vk-green-dark)]"
          >
            About <span style={{ color: "var(--vk-pink)" }}>VK Ayurveda</span>
          </h2>
          </Animate>
          <Animate from="up" delay={300}>
          <p className="mx-auto mt-1 max-w-2xl text-[15px] font-medium leading-[1.6] text-[#4b5563] sm:mt-2 sm:text-[19px] sm:leading-[1.75]">
            An NABH-certified Ayurvedic hospital focused on pain relief and neuro care. Our doctors assess the cause of
            your pain and build a plan around you — consultation first, treatment only if advised.
          </p>
          </Animate>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {steps.map((step, index) => (
            <Animate key={step.title} from={index < steps.length / 2 ? "left" : "right"} delay={index * 150}>
            <article
              className="group h-full overflow-hidden rounded-[22px] border border-[#e2d6c1] bg-[#f8f3ea] p-2.5 shadow-[0_14px_34px_rgba(84,62,32,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(84,62,32,0.18)]"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-[16px]">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex items-start gap-3.5 px-3.5">
                <span className="relative z-10 -mt-7 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d7c6a8] bg-[#fbf7f0] font-serif text-[1.5rem] font-semibold text-[#8b6a3e]">
                  {index + 1}
                </span>
                <h3 className="pt-2.5 font-serif text-[1.35rem] font-semibold leading-tight text-[#3a2d1f]">
                  {step.title}
                </h3>
              </div>

              <p className="px-3.5 pb-4 pt-3 text-[14.5px] leading-[1.6] text-[#5d5244]">
                {step.description}
              </p>
            </article>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
