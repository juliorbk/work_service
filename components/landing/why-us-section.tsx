"use client";

import { useEffect, useRef, useState } from "react";
import {
  Zap,
  Clock,
  Headset,
  Wifi,
  BatteryCharging,
  Flashlight,
  PlugZap,
  Receipt,
  CalendarX2,
  ConciergeBell,
  Gauge,
  ClipboardCheck,
  MapPinned,
  type LucideIcon,
} from "lucide-react";
import { WHY_US } from "@/lib/site-config";

const itemIcons: Record<string, LucideIcon> = {
  clock: Clock,
  headset: Headset,
  wifi: Wifi,
  battery: BatteryCharging,
  flashlight: Flashlight,
  plug: PlugZap,
  receipt: Receipt,
  contract: CalendarX2,
  reception: ConciergeBell,
  gauge: Gauge,
  clipboard: ClipboardCheck,
  location: MapPinned,
};

export function WhyUsSection() {
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

  const items = WHY_US.items;

  return (
    <section
      id="por-que-elegirnos"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-surface-container-low overflow-hidden scroll-mt-24"
    >
      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-6">
            <Zap className="w-4 h-4 text-accent" />
            {WHY_US.eyebrow}
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            {WHY_US.title}
          </h2>
          <p className="text-lg lg:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            {WHY_US.subtitle}
          </p>
        </div>
      </div>

      {/* Cinta de diferenciales */}
      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="relative -rotate-1 w-[104%] -ml-[2%] my-6 sm:my-8 bg-surface-container-low border-y border-outline-variant py-6 sm:py-8 marquee-hover">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[var(--surface-container-low)] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[var(--surface-container-low)] to-transparent pointer-events-none z-10" />

          <div className="flex w-max items-center marquee-tape">
            {[...items, ...items].map((item, index) => {
              const Icon = itemIcons[item.icon] ?? Zap;
              const isDuplicate = index >= items.length;
              return (
                <div key={`${item.title}-${index}`} className="flex items-center" aria-hidden={isDuplicate || undefined}>
                  <article className="w-[270px] sm:w-[300px] shrink-0 flex items-start gap-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/70 p-5 transition-colors duration-300 hover:border-primary-container/60">
                    <div className="w-11 h-11 rounded-lg bg-primary-container/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary-container" />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-base font-semibold text-foreground mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </article>
                  <span className="mx-6 sm:mx-8 w-1.5 h-1.5 rotate-45 bg-primary/40 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
