export interface SpaceMedia {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

export interface SpacePricing {
  label: string;
  price: string;
}

export interface Space {
  title: string;
  description: string;
  features: string[];
  capacity: string;
  image: string;
  gallery: SpaceMedia[];
  pricing: SpacePricing[];
}

export const SPACES: Space[] = [
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
    gallery: [
      { type: "image", src: "/images/Diseno-oficinas-coworking.webp" },
    ],
    pricing: [
      { label: "Escritorio flexible", price: "$45/día" },
      { label: "Escritorio fijo", price: "$90/día" },
      { label: "Plan mensual", price: "$250/mes" },
    ],
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
    gallery: [
      { type: "image", src: "/images/0_8563f93c1d0df96b85700a55c41f1f.webp" },
    ],
    pricing: [
      { label: "Oficina 2 personas", price: "$120/día" },
      { label: "Oficina 4 personas", price: "$220/día" },
      { label: "Oficina 10+ personas", price: "Desde $450/día" },
    ],
  },
  {
    title: "Estudio de Producción",
    description:
      "Estudio insonorizado con equipo profesional para grabar podcasts, videos y contenido digital con calidad de estudio.",
    features: [
      "Aislamiento acústico",
      "Consola y micrófonos",
      "Iluminación para video",
      "Pantalla de monitoreo",
      "Wi-Fi de alta velocidad",
    ],
    capacity: "1 — 6 personas",
    image: "/images/PodcastRoom1.webp",
    gallery: [
      { type: "image", src: "/images/PodcastRoom1.webp" },
    ],
    pricing: [
      { label: "Por hora", price: "$60/hora" },
      { label: "Media jornada", price: "$200" },
      { label: "Jornada completa", price: "$350/día" },
    ],
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
    gallery: [
      { type: "image", src: "/images/0_d9599402716c4806a2856bf8d07292.webp" },
    ],
    pricing: [
      { label: "Sala estándar", price: "$150/hora" },
      { label: "Sala ejecutiva", price: "$250/hora" },
      { label: "Día completo", price: "$800" },
    ],
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
    gallery: [
      { type: "image", src: "/images/Montaje-Platino-Caminos-Verde-Agua-7-1-scaled.jpeg" },
    ],
    pricing: [
      { label: "Por evento", price: "$500 — $2,000" },
      { label: "Con catering", price: "Desde $1,500" },
    ],
  },
  {
    title: "Aulas y Cursos",
    description:
      "Aulas equipadas para cursos, talleres y capacitaciones. Pizarra, proyector y mesas modulares para sesiones efectivas.",
    features: [
      "Capacidad para 15 — 25 personas",
      "Pizarra y proyector incluidos",
      "Mesas modulares configurables",
      "Wi-Fi de alta velocidad",
      "Soporte técnico en sitio",
    ],
    capacity: "15 — 25 personas",
    image: "/images/m11-1-1536x1372-1.webp",
    gallery: [
      { type: "image", src: "/images/m11-1-1536x1372-1.webp" },
    ],
    pricing: [
      { label: "Por día", price: "$850/día" },
      { label: "Paquete semanal", price: "$3,500" },
    ],
  },
];
