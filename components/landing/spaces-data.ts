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
    title: 'Lobby',
    description:
      'Recepción elegante con áreas de espera cómodas y atención personalizada. El ambiente profesional que tus clientes y visitas merecen desde su llegada.',
    features: [
      'Recepción y atención personalizada',
      'Área de espera cómoda',
      'Wi-Fi de alta velocidad',
      'Cafetería premium',
      'Recepción de correspondencia',
    ],
    capacity: 'Zona de recepción',
    image: '/images/spaces/LOBBY.jpg',
    gallery: [{ type: 'image', src: '/images/spaces/LOBBY.jpg' }],
    pricing: [
      { label: 'Visitas de negocio', price: 'Gratuito' },
      { label: 'Uso del área de espera', price: 'Incluido' },
    ],
  },
  {
    title: 'Sala de Reuniones B',
    description:
      'Sala profesional con tecnología AV de última generación para presentaciones, entrevistas y videollamadas efectivas.',
    features: [
      'Pantalla interactiva 75"',
      'Audio profesional',
      'Pizarra digital',
      'Videoconferencia integrada',
      'Catering opcional',
    ],
    capacity: '4 — 12 personas',
    image: '/images/spaces/SALA_REUNION_B.jpg',
    gallery: [{ type: 'image', src: '/images/spaces/SALA_REUNION_B.jpg' }],
    pricing: [
      { label: 'Por hora', price: '$150/hora' },
      { label: 'Media jornada', price: '$400' },
      { label: 'Día completo', price: '$800' },
    ],
  },
  {
    title: 'Sala de Conferencias',
    description:
      'Amplia sala de conferencias con tecnología AV profesional, ideal para convenciones, capacitaciones y eventos corporativos de gran formato.',
    features: [
      'Pantalla interactiva 75"',
      'Sistema de sonido profesional',
      'Escenario y podio',
      'Videoconferencia integrada',
      'Catering opcional',
    ],
    capacity: '50 — 120 personas',
    image: '/images/spaces/SALA_CONFERENCIAS_1.jpg',
    gallery: [
      { type: 'image', src: '/images/spaces/SALA_CONFERENCIAS_1.jpg' },
      { type: 'image', src: '/images/spaces/SALA_CONFERENCIAS_2.jpg' },
      { type: 'image', src: '/images/spaces/SALA_CONFERENCIAS_3.jpg' },
      { type: 'image', src: '/images/spaces/SALA_CONFERENCIAS_4.jpg' },
    ],
    pricing: [
      { label: 'Por evento', price: '$500 — $2,000' },
      { label: 'Con catering', price: 'Desde $1,500' },
    ],
  },
  {
    title: 'Oficina A',
    description:
      'Oficina privada completamente equipada para equipos que necesitan privacidad y un entorno corporativo de primer nivel.',
    features: [
      'Aislamiento acústico',
      'Mobiliario ergonómico',
      'Videoconferencia 4K',
      'Control de acceso 24/7',
      'Limpieza incluida',
    ],
    capacity: '2 — 6 personas',
    image: '/images/spaces/SALA_OFICINA_A_1.jpg',
    gallery: [
      { type: 'image', src: '/images/spaces/SALA_OFICINA_A_1.jpg' },
      { type: 'image', src: '/images/spaces/SALA_OFICINA_A_2.jpg' },
    ],
    pricing: [
      { label: 'Por día', price: '$120/día' },
      { label: 'Plan mensual', price: 'Desde $1,200/mes' },
    ],
  },
  {
    title: 'Oficina B',
    description:
      'Oficina privada luminosa y funcional, con mobiliario ergonómico y todas las comodidades para el día a día de tu equipo.',
    features: [
      'Aislamiento acústico',
      'Mobiliario ergonómico',
      'Wi-Fi simétrico 500 Mbps',
      'Limpieza diaria incluida',
      'Control de acceso 24/7',
    ],
    capacity: '4 — 10 personas',
    image: '/images/spaces/SALA_OFICINA_B_1.jpg',
    gallery: [{ type: 'image', src: '/images/spaces/SALA_OFICINA_B_1.jpg' }],
    pricing: [
      { label: 'Por día', price: '$220/día' },
      { label: 'Plan mensual', price: 'Desde $2,200/mes' },
    ],
  },
  {
    title: 'Oficina C',
    description:
      'Oficina ejecutiva de gran capacidad para equipos corporativos que requieren espacio, privacidad y servicios premium.',
    features: [
      'Aislamiento acústico',
      'Sala de reuniones interna',
      'Videoconferencia 4K',
      'Control de acceso 24/7',
      'Limpieza incluida',
    ],
    capacity: '10 — 20 personas',
    image: '/images/spaces/SALA_OFICINA_C.jpg',
    gallery: [{ type: 'image', src: '/images/spaces/SALA_OFICINA_C.jpg' }],
    pricing: [
      { label: 'Por día', price: 'Desde $450/día' },
      { label: 'Plan mensual', price: 'Consultar' },
    ],
  },
];
