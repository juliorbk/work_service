"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { AnimatedTetrahedron } from "./animated-tetrahedron";

const plans = [
  {
    name: "Pase por Día",
    description: "Perfecto para profesionales que necesitan un espacio premium por demanda.",
    price: "$45",
    period: "/ día",
    features: [
      "Acceso a escritorios compartidos",
      "Wi-Fi de alta velocidad",
      "Café y té artesanal",
    ],
    excluded: ["Créditos de salas de reuniones", "Acceso al edificio 24/7"],
    cta: "Seleccionar Pase por Día",
    popular: false,
  },
  {
    name: "Coworking Mensual",
    description: "Escritorio dedicado o asiento flexible para el profesional constante.",
    price: "$350",
    period: "/ mes",
    features: [
      "Acceso al edificio 24/7",
      "Asiento prioritario en zonas compartidas",
      "4 horas de créditos en salas de reuniones",
      "Recepción de correo y paquetería",
    ],
    excluded: [],
    cta: "Iniciar Plan Mensual",
    popular: true,
  },
  {
    name: "Oficina Privada",
    description: "Oficinas cerradas y con marca propia para equipos de 4 a más de 50.",
    price: "Custom",
    period: "",
    features: [
      "Espacio privado con cerradura",
      "Marca y diseño a medida",
      "Red de TI dedicada",
      "Acceso ilimitado a salas de reuniones",
    ],
    excluded: [],
    cta: "Contactar Ventas",
    popular: false,
  },
  {
    name: "Tarifa por Día de Evento/Curso",
    description: "Para organizadores e instructores que rentan un espacio por día.",
    price: "$850",
    period: "/ día",
    features: [
      "Salón de eventos o aula para cursos",
      "Proyector, pizarra y sonido incluidos",
      "Mesas modulares para 15 — 25 personas",
      "Staff de apoyo en sitio",
    ],
    excluded: [],
    cta: "Reservar Espacio",
    popular: false,
  },
];

export function PricingSection() {
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
      id="pricing"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-surface-container-low overflow-hidden scroll-mt-24"
    >
      <div className="absolute -left-28 top-1/2 -translate-y-1/2 w-[460px] h-[460px] lg:w-[600px] lg:h-[600px] opacity-30 pointer-events-none hidden lg:block">
        <AnimatedTetrahedron />
      </div>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          className={`text-center mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-6">
            <Zap className="w-4 h-4 text-accent" />
            Planes y Tarifas
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Precios Transparentes
          </h2>
          <p className="text-lg lg:text-xl text-secondary max-w-2xl mx-auto">
            Soluciones flexibles para equipos, emprendedores, organizadores de
            eventos e instructores de cursos.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`h-full transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div
                className={`flex flex-col relative bg-surface-container-lowest border rounded-lg p-6 sm:p-8 h-full transition-all duration-300 hover-lift ${
                  plan.popular
                    ? "border-2 border-primary-container shadow-[0_10px_40px_-10px_rgba(237,145,33,0.15)] xl:scale-105 z-10"
                    : "border-outline-variant"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-primary-container text-white px-4 py-1 rounded-full text-xs font-semibold tracking-[0.05em] uppercase whitespace-nowrap">
                    Más Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-secondary">{plan.description}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-outline-variant">
                  {plan.price === "Custom" ? (
                    <span className="text-2xl sm:text-3xl font-bold text-primary-container">
                      Cotización Personalizada
                    </span>
                  ) : (
                    <div className="flex items-baseline gap-1 whitespace-nowrap">
                      <span className="text-4xl lg:text-5xl font-bold text-primary-container">
                        {plan.price}
                      </span>
                      <span className="text-sm text-secondary">{plan.period}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">
                        <Check className="w-4 h-4" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.excluded?.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-outline opacity-50">
                      <span className="shrink-0 mt-0.5">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/booking"
                  className={`block w-full py-3 text-center rounded-md font-medium text-sm tracking-[0.05em] btn-premium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    plan.popular
                      ? "bg-primary-container text-white hover:brightness-95"
                      : "border border-outline text-secondary hover:border-primary hover:text-primary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
