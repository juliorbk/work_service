"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Clock,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedLogo } from "@/components/ui/animated-logo";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { BRAND, whatsappUrl } from "@/lib/site-config";

const contactInfo = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: BRAND.phoneDisplay,
    href: whatsappUrl(),
    external: true,
  },
  {
    icon: Mail,
    label: "Correo",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    external: false,
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Flexible a tu necesidad, disponible 24/7",
  },
  {
    icon: CalendarCheck,
    label: "Eventos y Cursos",
    value: "Disponibles fines de semana bajo reservación",
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
      id="contacto"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12 lg:mb-14">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Conoce Work Services
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mt-4 leading-relaxed">
            Escríbenos por WhatsApp, correo o por la página de Reservas. Te
            atendemos de forma ágil y personalizada, estés donde estés.
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
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    const inner = (
                      <div className="flex items-start gap-4">
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
                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 hover:text-primary transition-colors"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div key={item.label}>{inner}</div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-outline-variant">
                  <Link
                    href="/booking"
                    className="btn-premium block w-full text-center bg-primary-container text-primary-foreground px-6 py-3 rounded-full font-medium text-sm tracking-[0.05em] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Reservar Mi Espacio
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Isotipo + CTA */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <Card className="h-full overflow-hidden border-outline-variant bg-surface-container-lowest relative">
              {/* Formas de arco/cápsula decorativas */}
              <div
                aria-hidden
                className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-primary-container/10 pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-accent/10 pointer-events-none"
              />
              <CardContent className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-6 p-10 lg:p-14">
                <AnimatedLogo
                  light="/brand/isotipo.png"
                  dark="/brand/isotipo-gold.png"
                  alt="Isotipo de Work Services"
                  width={512}
                  height={512}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                    Hablemos de tu próximo espacio
                  </h3>
                  <p className="text-base sm:text-lg text-secondary max-w-md mx-auto leading-relaxed">
                    Cuéntanos qué necesitas y te proponemos la mejor opción de
                    coworking u oficina para tu equipo, con precios claros y
                    sin contratos rígidos.
                  </p>
                </div>
                <a
                  href={whatsappUrl(
                    "¡Hola! Quiero más información sobre los espacios de Work Services."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-3.5 font-medium text-sm tracking-[0.05em] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Hablar por WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}