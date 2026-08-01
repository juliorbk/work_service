"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Space {
  title: string;
  description: string;
  features: string[];
  capacity: string;
  // ─── CAMBIA ESTO ─────────────────────────────────────
  // Coloca aquí el path de la imagen del espacio.
  // Las imágenes deben estar en: /public/images/espacios/
  // Dimensiones recomendadas: 600 x 400 px (ancho x alto)
  // Formato: WebP o JPG, optimizadas para web.
  // Ejemplo: "/images/espacios/coworking.webp"
  image: string;
}

const spaces: Space[] = [
  {
    title: "Coworking",
    description:
      "Espacios abiertos y dinámicos diseñados para el trabajo colaborativo. Conexión de alta velocidad y ambiente profesional.",
    features: [
      "Internet simétrico 500 Mbps",
      "Climatización individual",
      "Acceso a salas de reuniones",
      "Cafetería premium incluida",
      "Recepción y correo",
    ],
    capacity: "1 — 10 personas",
    image: "/images/Diseno-oficinas-coworking.webp",
  },
  {
    title: "Oficinas Privadas",
    description:
      "Oficinas completamente equipadas para equipos que necesitan privacidad y un entorno corporativo de primer nivel.",
    features: [
      "Aislamiento acústico",
      "Mobiliario ergonómico",
      "Videoconferencia 4K",
      "Control de acceso 24/7",
      "Limpieza incluida",
    ],
    capacity: "2 — 20 personas",
    image: "/images/0_8563f93c1d0df96b85700a55c41f1f.webp",
  },
  {
    title: "Salas de Reuniones",
    description:
      "Salas profesionales con tecnología AV de última generación para presentaciones, entrevistas y videollamadas.",
    features: [
      "Pantalla interactiva 75\"",
      "Audio profesional",
      "Pizarra digital",
      "Videoconferencia integrada",
      "Catering opcional",
    ],
    capacity: "4 — 20 personas",
    image: "/images/0_d9599402716c4806a2856bf8d07292.webp",
  },
  {
    title: "Salones de Eventos",
    description:
      "Espacios versátiles para conferencias, talleres y eventos corporativos. Capacidad para grandes audiencias.",
    features: [
      "Escenario y tarima",
      "Sistema de sonido profesional",
      "Iluminación escénica",
      "Catering completo",
      "Equipo de producción",
    ],
    capacity: "50 — 500 personas",
    image: "/images/Montaje-Platino-Caminos-Verde-Agua-7-1-scaled.jpeg",
  },
  {
    title: "Estudios de Producción",
    description:
      "Estudios insonorizados con equipo técnico para grabación de podcasts, streaming y contenido multimedia.",
    features: [
      "Aislamiento profesional",
      "Micrófonos de condensador",
      "Cámaras 4K",
      "Software de edición",
      "Streaming en vivo",
    ],
    capacity: "1 — 6 personas",
    image: "/images/PodcastRoom1.webp",
  },
  {
    title: "Espacios Personalizados",
    description:
      "Configuramos el espacio a la medida de tu proyecto. Layout, mobiliario y tecnología según tus necesidades.",
    features: [
      "Diseño a medida",
      "Mobiliario a elección",
      "Tecnología flexible",
      "Contratos a término",
      "Soporte dedicado",
    ],
    capacity: "Desde 1 persona",
    image: "/images/m11-1-1536x1372-1.webp",
  },
];

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
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
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
          {spaces.map((space, index) => (
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
      <Card className="group overflow-hidden border-outline-variant hover:border-primary-container/50 transition-all duration-300 flex flex-col h-full bg-surface-container-lowest">
        {/* Image */}
        <div className="relative h-48 lg:h-56 overflow-hidden bg-muted">
          <Image
            src={space.image}
            alt={space.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 lg:p-6 flex flex-col">
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
