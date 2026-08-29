"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedSphere } from "./animated-sphere";

const heroStats = [
  { value: "50+", label: "Espacios Disponibles" },
  { value: "1000+", label: "Profesionales" },
  { value: "100%", label: "Satisfacción" },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-surface-variant pt-24 md:pt-28">
      {/* Cielo de Maracaibo: resplandores que el acrílico refracta */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <div className="absolute -inset-[10%] bg-[radial-gradient(circle_at_78%_18%,rgba(168,90,0,0.20),transparent_42%)] animate-drift-a" />
        <div className="absolute -inset-[10%] bg-[radial-gradient(circle_at_12%_88%,rgba(0,179,240,0.14),transparent_40%)] animate-drift-b" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[720px] lg:h-[720px] opacity-40 hidden md:block">
          <AnimatedSphere />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >

        </div>

        {/* Headline */}
        <h1
          className={`text-[2rem] sm:text-6xl lg:text-7xl font-bold leading-[1.2] sm:leading-[1.1] tracking-[-0.02em] mb-6 text-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Tu espacio de trabajo,
          <br />
          <span className="text-primary-container">en el corazón de Maracaibo</span>
        </h1>

        {/* Description */}
        <p
          className={`text-lg lg:text-xl text-secondary max-w-2xl mx-auto mb-2 leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Oficinas privadas, coworking, salas de reuniones y espacios para talleres
          y eventos, en Torre Banco Industrial. Todo lo que tu equipo necesita para
          trabajar mejor.
        </p>

        {/* Local identity micro-copy */}
        <p
          className={`text-sm text-secondary/90 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Inspirados en la energía que enciende el cielo de Maracaibo cada noche.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <AnimatedButton
            href="/booking"
            label="Reservar Ahora"
            icon={ArrowRight}
            interaction="slide-arrow"
            variant="primary"
            className="min-w-[190px]"
          />
          <Link
            href="#espacios"
            className="btn-premium acrylic relative rounded-full px-8 py-4 font-medium text-sm tracking-[0.05em] text-secondary hover:text-primary hover:border-primary inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Ver Espacios
          </Link>
        </div>

        {/* Stats */}
        <div
          className={`acrylic relative rounded-2xl mx-auto mt-16 max-w-2xl grid grid-cols-3 gap-4 sm:gap-8 px-6 py-8 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
