"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import { SPACES, type Space } from "./spaces-data";

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="espacios"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-6">
            <Zap className="w-4 h-4 text-[#00b3f0]" />
            Nuestros Espacios
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            El Estándar de Excelencia
          </h2>
          <p className="text-lg lg:text-xl text-secondary max-w-2xl mt-6 leading-relaxed">
            Desde estaciones de coworking hasta salones de eventos, ofrecemos
            espacios corporativos excepcionales diseñados para potenciar tu
            productividad.
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SPACES.map((space, index) => (
            <SpaceCard key={space.title} space={space} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpaceCard({ space, index }: { space: Space; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="overflow-hidden border-outline-variant hover:border-primary-container/50 transition-all duration-300 flex flex-col h-full bg-surface-container-lowest">
        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
            {space.title}
          </h3>
          <p className="text-sm text-secondary leading-relaxed mb-4">
            {space.description}
          </p>

          {/* Features */}
          <div className="space-y-2 flex-1 mb-5">
            {space.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-primary-container mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Capacity */}
          <div className="pt-4 border-t border-outline-variant">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
              Capacidad: {space.capacity}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
