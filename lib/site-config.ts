/**
 * Fuente única de datos oficiales de Work Services.
 * Actualiza precios, textos y contacto aquí sin tocar el markup.
 */

export const BRAND = {
  name: 'Work Services',
  slogan: '¡Tu aliado estratégico!',
  instagram: '@workservicesve',
  instagramUrl: 'https://www.instagram.com/workservicesve/',
  phoneDisplay: '0424-6042538',
  whatsappNumber: '584246042538',
  email: 'workservicesmcbo@gmail.com',
} as const;

export const HERO = {
  headlineA: 'No somos un coworking más,',
  headlineB: 'somos tu asistente ejecutivo.',
  subheading:
    'Espacios de trabajo flexibles y soluciones integrales de oficina en Maracaibo. Gestionamos cada detalle operativo para que te enfoques en tus metas.',
  primaryCta: {
    label: 'Escríbenos por WhatsApp',
    message: '¡Hola! Quiero más información sobre los espacios de Work Services.',
  },
  secondaryCta: { label: 'Ver Espacios y Precios', href: '#pricing' },
  stats: [
    { value: '24/7', label: 'Espacios disponibles' },
    { value: '3', label: 'Oficinas administrativas' },
    { value: '2', label: 'Salones de conferencias' },
    { value: '10h', label: 'Respaldo de internet' },
  ],
} as const;

export const ABOUT = {
  eyebrow: 'Nosotros',
  titleA: 'Tu aliado',
  titleB: 'estratégico',
  text: 'Brindamos espacios de trabajo flexibles y soluciones integrales de oficina que impulsan la productividad de nuestros clientes. Gestionamos cada detalle operativo y logístico para que profesionales y empresas se enfoquen exclusivamente en alcanzar sus metas, en un entorno moderno, colaborativo y de excelencia en el servicio.',
  values: [
    {
      icon: 'building',
      title: 'Soluciones integrales de oficina',
      description:
        'Gestionamos cada detalle operativo y logístico: tú te enfocas exclusivamente en alcanzar tus metas.',
    },
    {
      icon: 'support',
      title: 'Productividad sin nómina adicional',
      description:
        'Equipo de soporte incluido y espacios disponibles las 24 horas, al ritmo de cada profesional o empresa.',
    },
    {
      icon: 'handshake',
      title: 'Entorno colaborativo y de excelencia',
      description:
        'Un ambiente moderno, de respeto y networking, con equipos y tecnología de vanguardia.',
    },
  ],
} as const;

export const MISSION_VISION = {
  eyebrow: 'Nuestro Propósito',
  title: 'Misión y Visión',
  mission: {
    title: 'Misión',
    text: 'Nuestra vocación de servicio nos lleva a gestionar lo que el cliente necesite, adaptándonos al ritmo de cada profesional o empresa, con espacios innovadores, equipos y tecnología de vanguardia, en un ambiente de respeto y networking.',
  },
  vision: {
    title: 'Visión',
    text: 'Ser el referente principal en soluciones de espacios de trabajo y coworking de la región, transformando el concepto tradicional de oficina en una experiencia de servicio premium y hospitalidad corporativa.',
  },
} as const;

export interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}

export const WHY_US: {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: WhyUsItem[];
} = {
  eyebrow: 'Diferenciales',
  title: '¿Por qué elegirnos?',
  subtitle:
    'Cada detalle está pensado para que tú solo te preocupes por tu negocio.',
  items: [
    {
      icon: 'clock',
      title: 'Disponibilidad 24 horas',
      description: 'Espacios disponibles las 24 horas.',
    },
    {
      icon: 'headset',
      title: 'Soporte incluido',
      description: 'Equipo de soporte incluido, sin nómina adicional para el cliente.',
    },
    {
      icon: 'wifi',
      title: 'Internet con respaldo',
      description: 'Sigue funcionando hasta 10h ante fallas eléctricas.',
    },
    {
      icon: 'battery',
      title: 'Power Bank en oficinas',
      description: 'Power Bank en todas las oficinas.',
    },
    {
      icon: 'flashlight',
      title: 'Lámparas de emergencia',
      description: 'Iluminación de respaldo ante cualquier eventualidad.',
    },
    {
      icon: 'plug',
      title: 'Espacios Plug & Play',
      description:
        'Diseño impecable, mobiliario ergonómico y la mejor conectividad de la zona.',
    },
    {
      icon: 'receipt',
      title: 'Cero facturas de servicios',
      description: 'Olvídate de las facturas de servicios públicos.',
    },
    {
      icon: 'contract',
      title: 'Sin contratos rígidos',
      description: 'Adiós a los contratos de alquiler rígidos.',
    },
    {
      icon: 'reception',
      title: 'Recepción profesional',
      description: 'Recepción profesional para recibir a tus clientes.',
    },
    {
      icon: 'gauge',
      title: 'Conectividad de alta velocidad',
      description: 'Conectividad de alta velocidad sin interrupciones.',
    },
    {
      icon: 'clipboard',
      title: 'Logística de reuniones',
      description: 'Logística de reuniones resuelta al 100%.',
    },
    {
      icon: 'location',
      title: 'Zona de alto impacto',
      description: 'Ubicación en zona de alto impacto comercial y prestigio.',
    },
  ],
};

export const FACILITIES = {
  eyebrow: 'Instalaciones',
  title: 'Instalaciones pensadas para ti',
  subtitle:
    'Infraestructura moderna y flexible que se adapta a la operación de tu empresa.',
  items: [
    { icon: 'building', title: 'Oficinas administrativas', description: '3 oficinas privadas' },
    { icon: 'presentation', title: 'Salones de conferencias y reuniones', description: '2 salones disponibles' },
    { icon: 'users', title: 'Espacios de trabajo compartidos', description: 'Puestos en área compartida' },
    { icon: 'car', title: 'Estacionamiento', description: 'Para clientes' },
    { icon: 'food', title: 'Área de comedor', description: 'Exclusiva para clientes' },
  ],
} as const;

export interface PricingSpace {
  id: string;
  name: string;
  description: string;
  details: string[];
  price: string;
  period: string;
  unitNote?: string;
  cta: string;
}

export const PRICING: {
  eyebrow: string;
  title: string;
  subtitle: string;
  spaces: PricingSpace[];
} = {
  eyebrow: 'Espacios y Precios',
  title: 'Un espacio para cada necesidad',
  subtitle:
    'Precios claros y flexibles: sin contratos rígidos ni facturas de servicios públicos.',
  spaces: [
    {
      id: 'sala-conferencias',
      name: 'Sala de Conferencias',
      description: 'Salones equipados para tus reuniones y presentaciones.',
      details: ['Capacidad hasta 20 personas', '2 salas disponibles'],
      price: '$10',
      period: '/ hora',
      cta: 'Reservar',
    },
    {
      id: 'oficina-tipo-a',
      name: 'Oficina Privada (Tipo A)',
      description: 'Oficinas privadas equipadas para tu equipo.',
      details: ['2 unidades disponibles'],
      price: '$250',
      period: '/ mes',
      unitNote: 'c/u',
      cta: 'Reservar',
    },
    {
      id: 'oficina-tipo-b',
      name: 'Oficina Privada (Tipo B)',
      description: 'Oficina privada funcional para tu operación diaria.',
      details: ['1 unidad disponible'],
      price: '$200',
      period: '/ mes',
      cta: 'Reservar',
    },
    {
      id: 'coworking',
      name: 'Espacio de Trabajo Compartido',
      description: 'Puesto de trabajo en área compartida.',
      details: ['Puesto en área compartida'],
      price: '$50',
      period: '/ mes',
      cta: 'Reservar',
    },
  ],
};

/** Nombres de espacios reservables (selectores de formularios). */
export const RENTABLE_SPACES: string[] = [
  'Sala de Conferencias',
  'Oficina Privada (Tipo A)',
  'Oficina Privada (Tipo B)',
  'Espacio de Trabajo Compartido',
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: {
  title: string;
  subtitle: string;
  items: FaqItem[];
} = {
  title: 'Preguntas frecuentes',
  subtitle:
    'Todo lo que necesitas saber antes de reservar. Si tu duda no está aquí, escríbenos por WhatsApp.',
  items: [
    {
      question: '¿Cómo reservo un espacio?',
      answer:
        'Puedes reservar desde la página de Reservas completando el formulario, o escribiéndonos directamente por WhatsApp. Confirmamos disponibilidad en minutos y no requiere pago por adelantado.',
    },
    {
      question: '¿Qué incluye el precio del espacio?',
      answer:
        'Todos los precios incluyen internet con respaldo de hasta 10 horas ante fallas eléctricas, energía, agua, aires acondicionados, limpieza, recepción de correspondencia y soporte del equipo de Work Services. Sin facturas de servicios públicos ni contratos rígidos.',
    },
    {
      question: '¿Necesito firmar un contrato de alquiler?',
      answer:
        'No. Trabajamos con planes flexibles: puedes pagar por hora, por día o por mes según el espacio. No hay contratos de alquiler rígidos ni penalizaciones por cambiar de plan.',
    },
    {
      question: '¿Puedo visitar las instalaciones antes de reservar?',
      answer:
        'Claro. Agendamos visitas guiadas sin compromiso en horario laboral. Escríbenos por WhatsApp o desde la página de Reservas para coordinar el día y la hora.',
    },
    {
      question: '¿Hay disponibilidad los fines de semana?',
      answer:
        'Los espacios de trabajo están disponibles 24/7 para clientes con plan mensual. Los salones de conferencias y el área de eventos atienden fines de semana bajo reservación previa.',
    },
    {
      question: '¿Cómo funciona el respaldo de internet y electricidad?',
      answer:
        'Contamos con plantas eléctricas y respaldo de internet de hasta 10 horas ante fallas del servicio, además de lámparas de emergencia y power banks en todas las oficinas para que tu operación nunca se detenga.',
    },
    {
      question: '¿Puedo organizar eventos o cursos en Work Services?',
      answer:
        'Sí. Nuestra sala de conferencias y zonas comunes reciben eventos desde 50 hasta 120 personas, con equipo audiovisual, escenario y catering opcional. Contáctanos para cotizar tu evento.',
    },
  ],
};

/** Construye un enlace wa.me con mensaje prellenado. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${BRAND.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Mensaje de reserva para un espacio específico. */
export function spaceBookingMessage(spaceName: string): string {
  return `¡Hola! Me interesa reservar el espacio "${spaceName}" en Work Services. ¿Podrían darme más información?`;
}
