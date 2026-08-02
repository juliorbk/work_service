"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, CalendarCheck, Zap } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Torre+Banco+Industrial,+Maracaibo,+Venezuela&z=16&output=embed";

const locationInfo = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Torre Banco Industrial, Av. 9B con 5 de Julio, Maracaibo, Zulia, Venezuela",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lunes a Sábados · 8:00 a 20:00 hrs",
  },
  {
    icon: CalendarCheck,
    label: "Eventos y Cursos",
    value: "Disponible fines de semana bajo reservación",
  },
];

export function LocationSection() {
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
      id="locations"
      ref={sectionRef}
      className="relative py-24 lg:py-32 scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-6">
            <Zap className="w-4 h-4 text-[#00b3f0]" />
            Nuestra Ubicación
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Encuéntranos en Maracaibo
          </h2>
          <p className="text-lg lg:text-xl text-secondary max-w-2xl mt-6 leading-relaxed">
            Torre Banco Industrial, en el corazón de la ciudad. Acceso directo,
            estacionamiento y conectividad para tu empresa, tus eventos y tus
            cursos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Info */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="h-full border-outline-variant bg-surface-container-lowest">
              <CardContent className="flex flex-col gap-8 p-6 lg:p-8">
                <div className="space-y-6">
                  {locationInfo.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-lg bg-primary-container/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary-container" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
                            {item.label}
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-outline-variant">
                  <Link
                    href="/booking"
                    className="btn-premium block w-full text-center bg-primary-container text-white px-6 py-3 rounded-md font-medium text-sm tracking-[0.05em] hover:bg-primary-container hover:brightness-95"
                  >
                    Reservar Mi Espacio
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <Card className="h-full overflow-hidden border-outline-variant bg-surface-container-lowest">
              <CardContent className="p-0 h-full">
                <iframe
                  title="Ubicación - Torre Banco Industrial, Maracaibo, Venezuela"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 320 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
