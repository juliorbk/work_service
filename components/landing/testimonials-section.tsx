"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatedWave } from "./animated-wave";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const avatarFor = (name: string) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><rect width="500" height="500" fill="#D99414"/><text x="50%" y="50%" dy="0.35em" text-anchor="middle" font-family="Georgia, serif" font-size="200" fill="#ffffff">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const testimonials = [
  {
    quote: "Mudar nuestras oficinas a Work Services fue un gran acierto. La calidad del espacio eleva nuestra imagen frente a los clientes que nos visitan y la infraestructura tecnológica es impecable.",
    name: "María Fernández",
    designation: "Directora de Operaciones, TechFlow",
    src: avatarFor("María Fernández"),
  },
  {
    quote: "Como consultora independiente, necesitaba zonas de silencio para concentrarme y salas de reuniones para presentar a mis clientes. El plan mensual de coworking cumple con todo, con un ambiente de primer nivel.",
    name: "Laura Castillo",
    designation: "Consultora Independiente",
    src: avatarFor("Laura Castillo"),
  },
  {
    quote: "Las instalaciones para eventos son insuperables. El equipo audiovisual siempre funciona, el diseño es sofisticado y el staff hace que cada evento se sienta como una experiencia VIP para nuestros invitados.",
    name: "Elena Rodríguez",
    designation: "VP de Ventas, GlobalReach",
    src: avatarFor("Elena Rodríguez"),
  },
];

export function TestimonialsSection() {
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
      id="testimonials"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-surface-container-highest overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-surface-container-high/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-56 lg:h-72 opacity-40 pointer-events-none hidden md:block">
        <AnimatedWave />
      </div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </div>
    </section>
  );
}
