"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MISSION_VISION } from "@/lib/site-config";

const CARDS = [
  {
    ...MISSION_VISION.mission,
    accent: "terracotta",
    isotype: "/brand/isotipo.png",
  },
  {
    ...MISSION_VISION.vision,
    accent: "gold",
    isotype: "/brand/isotipo-gold.png",
  },
];

export function MissionVisionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mision-vision"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-surface-container-low overflow-hidden scroll-mt-24"
    >
      {/* Formas de arco/cápsula decorativas */}
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-primary-container/10 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-28 w-[28rem] h-44 rounded-full bg-accent/10 pointer-events-none rotate-3"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div
          className={`text-center mb-10 sm:mb-12 lg:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-4">
            {MISSION_VISION.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {MISSION_VISION.title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {CARDS.map((card, index) => (
            <article
              key={card.title}
              className={`relative overflow-hidden bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 sm:p-10 hover-lift transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Detalle de marca superior */}
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1.5 ${
                  card.accent === "terracotta" ? "bg-accent" : "bg-primary"
                }`}
              />
              <div className="flex items-center gap-4 mb-6">
                <span
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    card.accent === "terracotta"
                      ? "bg-accent/10"
                      : "bg-primary-container/10"
                  }`}
                >
                  <Image
                    src={card.isotype}
                    alt=""
                    width={512}
                    height={512}
                    className="w-9 h-9 object-contain"
                  />
                </span>
                <h3
                  className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                    card.accent === "terracotta"
                      ? "text-accent"
                      : "text-primary-container"
                  }`}
                >
                  {card.title}
                </h3>
              </div>
              <p className="text-base lg:text-lg text-secondary leading-relaxed">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}