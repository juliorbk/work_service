import { spaceBookingMessage } from '@/lib/site-config';

export interface SpaceMedia {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

export interface SpacePricing {
  label: string;
  price: string;
  whatsapp?: string;
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
    title: 'Sala de Conferencias',
    description:
      'Amplia sala para presentaciones, convenciones y capacitaciones, con capacidad hasta 20 personas. 2 salas disponibles.',
    features: [
      'Pantalla interactiva 75"',
      'Sistema de sonido profesional',
      'Escenario y podio',
      'Videoconferencia integrada',
      'Catering opcional',
    ],
    capacity: 'Hasta 20 personas',
    image: '/images/spaces/SALA_CONFERENCIAS_1.jpg',
    gallery: [
      { type: 'image', src: '/images/spaces/SALA_CONFERENCIAS_1.jpg' },
      { type: 'image', src: '/images/spaces/SALA_CONFERENCIAS_2.jpg' },
      { type: 'image', src: '/images/spaces/SALA_CONFERENCIAS_3.jpg' },
      { type: 'image', src: '/images/spaces/SALA_CONFERENCIAS_4.jpg' },
    ],
    pricing: [
      {
        label: 'Por hora',
        price: '$10 USD/hora',
        whatsapp: spaceBookingMessage('Sala de Conferencias'),
      },
      { label: 'Salas disponibles', price: '2' },
    ],
  },
  {
    title: 'Salón de Reuniones',
    description:
      'Uno de nuestros 2 salones de conferencias y reuniones: sala profesional con tecnología AV para presentaciones, entrevistas y videollamadas efectivas.',
    features: [
      'Pantalla interactiva 75"',
      'Audio profesional',
      'Pizarra digital',
      'Videoconferencia integrada',
      'Catering opcional',
    ],
    capacity: 'Reuniones y presentaciones',
    image: '/images/spaces/SALA_REUNION_B.jpg',
    gallery: [{ type: 'image', src: '/images/spaces/SALA_REUNION_B.jpg' }],
    pricing: [
      {
        label: 'Por hora',
        price: '$10 USD/hora',
        whatsapp: spaceBookingMessage('Sala de Conferencias'),
      },
      { label: 'Salas disponibles', price: '2' },
    ],
  },
  {
    title: 'Oficina Privada (Tipo A)',
    description:
      'Oficina privada completamente equipada para equipos que necesitan privacidad y un entorno corporativo de primer nivel. 2 unidades disponibles.',
    features: [
      'Aislamiento acústico',
      'Mobiliario ergonómico',
      'Videoconferencia 4K',
      'Control de acceso 24/7',
      'Limpieza incluida',
    ],
    capacity: '2 unidades disponibles',
    image: '/images/spaces/SALA_OFICINA_A_1.jpg',
    gallery: [
      { type: 'image', src: '/images/spaces/SALA_OFICINA_A_1.jpg' },
      { type: 'image', src: '/images/spaces/SALA_OFICINA_A_2.jpg' },
    ],
    pricing: [
      {
        label: 'Plan mensual',
        price: '$250 USD/mes c/u',
        whatsapp: spaceBookingMessage('Oficina Privada (Tipo A)'),
      },
    ],
  },
  {
    title: 'Oficina Privada (Tipo B)',
    description:
      'Oficina privada luminosa y funcional, con mobiliario ergonómico y todas las comodidades para el día a día de tu equipo. 1 unidad disponible.',
    features: [
      'Aislamiento acústico',
      'Mobiliario ergonómico',
      'Wi-Fi simétrico 500 Mbps',
      'Limpieza diaria incluida',
      'Control de acceso 24/7',
    ],
    capacity: '1 unidad disponible',
    image: '/images/spaces/SALA_OFICINA_B_1.jpg',
    gallery: [{ type: 'image', src: '/images/spaces/SALA_OFICINA_B_1.jpg' }],
    pricing: [
      {
        label: 'Plan mensual',
        price: '$200 USD/mes',
        whatsapp: spaceBookingMessage('Oficina Privada (Tipo B)'),
      },
    ],
  },
];
