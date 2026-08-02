"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Users, Building2, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";

const aboutStats = [
  { value: "10+", label: "Años de experiencia" },
  { value: "50+", label: "Espacios diseñados" },
  { value: "1000+", label: "Profesionales alojados" },
  { value: "15", label: "Salones y salas de reuniones" },
];

const aboutValues = [
  {
    icon: Building2,
    title: "Espacios de Clase Mundial",
    description:
      "Cada ambiente es diseñado con mobiliario ergonómico, tecnología AV de última generación y detalles pensados para la productividad.",
  },
  {
    icon: Users,
    title: "Hospitalidad y Soporte",
    description:
      "Un equipo dedicado recibe a tus invitados, resuelve tus necesidades y asegura que cada visita a nuestras instalaciones sea impecable.",
  },
  {
    icon: HeartHandshake,
    title: "Compromiso Local",
    description:
      "Nacimos en Maracaibo y apostamos por su crecimiento, ofreciendo un entorno corporativo que impulsa a la comunidad empresarial zuliana.",
  },
];

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
      className="relative py-24 lg:py-32 bg-surface-container-lowest overflow-hidden scroll-mt-24"
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
            <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-6">
              <Sparkles className="w-4 h-4 text-[#00b3f0]" />
              Sobre Nosotros
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Work Service, el hogar{" "}
              <span className="text-primary-container">corporativo</span> de
              Maracaibo
            </h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed mb-6">
              Somos más que un espacio de coworking: somos un ecosistema de
              oficinas privadas, salas de reuniones, estudios de producción,
              salones de eventos y aulas para cursos, ubicados en la Torre
              Banco Industrial.
            </p>
            <p className="text-base sm:text-lg text-secondary leading-relaxed mb-8">
              Ofrecemos flexibilidad real para empresas, emprendedores e
              instructores, con infraestructura tecnológica de primer nivel y un
              ambiente que refleja el dinamismo de nuestra ciudad.
            </p>

            <Link
              href="#espacios"
              className="btn-premium inline-flex items-center gap-2 text-sm font-medium tracking-[0.05em] text-primary hover:text-primary-container transition-colors"
            >
              Conoce nuestros espacios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats + Valores */}
          <div>
            {/* Stats */}
            <div
              className={`grid grid-cols-2 gap-4 sm:gap-6 mb-8 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-surface-container-low border border-outline-variant rounded-lg p-4 lg:p-6 text-center"
                >
                  <p className="text-3xl lg:text-4xl font-bold text-primary-container mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Valores */}
            <div className="space-y-4">
              {aboutValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className={`flex items-start gap-4 bg-surface-container-lowest border border-outline-variant rounded-lg p-5 hover-lift transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${250 + index * 100}ms` }}
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary-container/10 flex items-center justify-center shrink-0">
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
      </div>
    </section>
  );
}