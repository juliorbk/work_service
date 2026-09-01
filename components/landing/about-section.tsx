"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  HeartHandshake,
  Headset,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { ABOUT, BRAND } from "@/lib/site-config";

const valueIcons: Record<string, LucideIcon> = {
  building: Building2,
  support: Headset,
  handshake: HeartHandshake,
};

export function AboutSection() {
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
      id="nosotros"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-28 bg-surface-container-lowest overflow-hidden scroll-mt-24"
    >
      <div className="absolute -right-40 top-0 bottom-0 w-[300px] lg:w-[460px] bg-gradient-to-l from-primary-container/5 to-transparent pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texto */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-4">
              <BrandMark />
              {ABOUT.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-5">
              {ABOUT.titleA}{" "}
              <span className="text-primary-container">{ABOUT.titleB}</span>
            </h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed mb-8">
              {ABOUT.text}
            </p>

            <p className="text-xs font-semibold text-secondary/70 uppercase tracking-wider mb-8">
              {BRAND.legalName}
            </p>

            <Link
              href="#espacios"
              className="btn-press inline-flex items-center gap-2 text-sm font-medium tracking-[0.05em] text-primary hover:text-primary-container transition-colors"
            >
              Conoce nuestros espacios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Valores */}
          <div className="space-y-4">
            {ABOUT.values.map((value, index) => {
              const Icon = valueIcons[value.icon] ?? Building2;
              return (
                <div
                  key={value.title}
                  className={`flex items-start gap-4 bg-surface-container-low border border-outline-variant rounded-xl p-5 sm:p-6 hover-lift transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${150 + index * 100}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-container/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary-container" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}