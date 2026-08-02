"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatedWave } from "./animated-wave";

const testimonials = [
  {
    quote: "Mudar nuestras oficinas a Work Service fue un gran acierto. La calidad del espacio eleva nuestra imagen frente a los clientes que nos visitan y la infraestructura tecnológica es impecable.",
    author: "María Fernández",
    role: "Directora de Operaciones",
    company: "TechFlow",
  },
  {
    quote: "Como consultora independiente, necesitaba zonas de silencio para concentrarme y salas de reuniones para presentar a mis clientes. El plan mensual de coworking cumple con todo, con un ambiente de primer nivel.",
    author: "Laura Castillo",
    role: "Consultora Independiente",
    company: "",
  },
  {
    quote: "Las instalaciones para eventos son insuperables. El equipo audiovisual siempre funciona, el diseño es sofisticado y el staff hace que cada evento se sienta como una experiencia VIP para nuestros invitados.",
    author: "Elena Rodríguez",
    role: "VP de Ventas",
    company: "GlobalReach",
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
      className="relative py-24 lg:py-32 bg-surface-container-highest overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-surface-container-high/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-56 lg:h-72 opacity-40 pointer-events-none hidden md:block">
        <AnimatedWave />
      </div>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] uppercase mb-6">
            Testimonios de Clientes
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={item.author}
              className={`hover-lift bg-surface-container-lowest p-6 lg:p-8 rounded-lg border border-outline-variant relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote icon */}
              <span className="text-primary-container/20 text-6xl absolute top-4 right-4 leading-none font-serif">
                &ldquo;
              </span>

              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center font-semibold text-on-surface-variant">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{item.author}</h4>
                  <p className="text-xs text-secondary">
                    {item.role}{item.company ? `, ${item.company}` : ""}
                  </p>
                </div>
              </div>

              <p className="text-sm text-secondary leading-relaxed relative z-10 italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
