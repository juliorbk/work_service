"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { WhatsAppBookingButton } from "@/components/work-service/whatsapp-booking-dialog";

const ctaFeatures = [
  "Confirmación inmediata",
  "Cancelación flexible",
  "Soporte 24/7",
];

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Resplandor de atardecer tras el panel */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(168,90,0,0.16),rgba(0,122,158,0.08)_55%,transparent_75%)] pointer-events-none"
      />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div
          className={`relative acrylic rounded-2xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col items-center text-center gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground leading-[1.1]">
                  ¿Listo para reservar tu espacio?
                </h2>

                <p className="text-lg text-secondary mb-10 leading-relaxed">
                  Reserva en minutos el espacio perfecto para tu próxima reunión,
                  jornada de coworking, taller o evento.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-10">
                  {ctaFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-primary-container" />
                      </span>
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <AnimatedButton
                    href="/booking"
                    label="Reservar Ahora"
                    icon={ArrowRight}
                    interaction="slide-arrow"
                    variant="primary"
                    className="min-w-[190px]"
                  />
                  <WhatsAppBookingButton
                  label="Reservar por WhatsApp"
                  className="min-w-[190px] h-10 rounded-md px-6 bg-[#25D366] hover:bg-[#1eb958] text-white"
                />
                </div>

                <p className="text-sm text-secondary mt-8">
                  Agenda una visita sin compromiso &bull; Atención personalizada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
