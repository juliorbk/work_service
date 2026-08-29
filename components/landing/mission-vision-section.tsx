"use client";

import { useEffect, useRef, useState } from "react";
import { Compass, Eye } from "lucide-react";
import { MISSION_VISION } from "@/lib/site-config";

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

  const cards = [
    { ...MISSION_VISION.mission, icon: Compass },
    { ...MISSION_VISION.vision, icon: Eye },
  ];

  return (
    <section
      id="mision-vision"
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-20 bg-surface-container-low overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div
          className={`text-center mb-10 sm:mb-12 lg:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {MISSION_VISION.title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sm:p-8 hover-lift transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary-container/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-primary-container" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-base lg:text-lg text-secondary leading-relaxed">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
