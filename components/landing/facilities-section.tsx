"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Presentation,
  Users,
  Car,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { FACILITIES } from "@/lib/site-config";

const itemIcons: Record<string, LucideIcon> = {
  building: Building2,
  presentation: Presentation,
  users: Users,
  car: Car,
  food: UtensilsCrossed,
};

export function FacilitiesSection() {
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
      id="instalaciones"
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-20 bg-surface-container-lowest overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div
          className={`mb-10 sm:mb-12 lg:mb-14 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            {FACILITIES.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            {FACILITIES.subtitle}
          </p>
        </div>

        {/* Grid de instalaciones */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
          {FACILITIES.items.map((item, index) => {
            const Icon = itemIcons[item.icon] ?? Building2;
            return (
              <div
                key={item.title}
                className={`bg-surface-container-low border border-outline-variant rounded-xl p-4 sm:p-6 text-center hover-lift transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary-container/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-primary-container" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
