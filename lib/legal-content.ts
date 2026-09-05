/**
 * Contenido legal de Work Services.
 * Textos de Política de Privacidad y Términos de Servicio.
 */

export interface LegalSection {
  id: string
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface LegalDocument {
  eyebrow: string
  title: string
  subtitle: string
  updatedLabel: string
  updated: string
  sections: LegalSection[]
  crossLink: { label: string; href: string }
}

export const PRIVACY_POLICY: LegalDocument = {
  eyebrow: 'Legal',
  title: 'Política de Privacidad',
  subtitle:
    'Cómo recopilamos, usamos y protegemos tus datos personales cuando usas nuestro sitio y nuestros espacios.',
  updatedLabel: 'Última actualización',
  updated: '3 de septiembre de 2026',
  crossLink: { label: 'Términos de Servicio', href: '/terminos' },
  sections: [
    {
      id: 'responsable',
      heading: '1. Responsable del tratamiento',
      paragraphs: [
        'Work Services Tu Aliado Estratégico C.A. (“Work Services”), con espacios de trabajo en Maracaibo, Venezuela, es responsable del tratamiento de los datos personales recopilados a través de este sitio web, nuestros formularios de reserva y nuestros canales de contacto.',
        'Puedes contactarnos en cualquier momento por correo electrónico a workservicesmcbo@gmail.com o por WhatsApp al 0424-6042538.',
      ],
    },
    {
      id: 'datos',
      heading: '2. Datos que recopilamos',
      bullets: [
        'Datos de contacto que nos proporcionas voluntariamente: nombre, número de teléfono o WhatsApp, correo electrónico y nombre de tu empresa.',
        'Datos de reserva: espacio de interés, fechas, horarios y cualquier información adicional que incluyas en el formulario de reserva o en tus mensajes.',
        'Datos de navegación: información técnica anónima y agregada (páginas visitadas, dispositivo, región aproximada) recopilada mediante herramientas de analítica.',
      ],
    },
    {
      id: 'finalidad',
      heading: '3. Finalidad del tratamiento',
      bullets: [
        'Responder tus consultas y solicitudes de información sobre nuestros espacios, precios y disponibilidad.',
        'Gestionar, confirmar y coordinar tus reservas de oficinas, salas de conferencias y espacios de trabajo.',
        'Enviar comunicaciones relacionadas con tu reserva o con los servicios que has solicitado.',
        'Mejorar nuestro sitio web y nuestros servicios mediante estadísticas de uso agregadas.',
      ],
    },
    {
      id: 'consentimiento',
      heading: '4. Base del tratamiento',
      paragraphs: [
        'Tratamos tus datos con base en tu consentimiento expreso, que nos otorgas al completar nuestros formularios, escribirnos por WhatsApp o correo electrónico. Puedes retirar tu consentimiento en cualquier momento sin que ello afecte el tratamiento previo realizado.',
      ],
    },
    {
      id: 'terceros',
      heading: '5. Comunicación con terceros',
      paragraphs: [
        'No vendemos, alquilamos ni compartimos tus datos personales con terceros con fines publicitarios o comerciales.',
        'Utilizamos servicios de terceros para operar nuestro sitio y comunicarnos contigo: WhatsApp (Meta Platforms, Inc.), proveedores de correo electrónico y herramientas de analítica (Vercel Analytics). Estos servicios pueden procesar datos conforme a sus propias políticas de privacidad.',
        'Solo compartimos los datos estrictamente necesarios para responder tu solicitud o gestionar tu reserva.',
      ],
    },
    {
      id: 'cookies',
      heading: '6. Cookies y analítica',
      paragraphs: [
        'Este sitio utiliza analítica de navegación que recopila métricas anónimas y agregadas sobre el uso del sitio. No utilizamos cookies publicitarias ni de seguimiento de terceros.',
        'Puedes bloquear o eliminar las cookies desde la configuración de tu navegador; el sitio seguirá funcionando con normalidad.',
      ],
    },
    {
      id: 'conservacion',
      heading: '7. Conservación y seguridad',
      paragraphs: [
        'Conservamos tus datos personales únicamente durante el tiempo necesario para cumplir las finalidades descritas y mientras exista una relación comercial vigente.',
        'Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra acceso no autorizado, pérdida o alteración. No obstante, ningún método de transmisión por Internet es 100% seguro.',
      ],
    },
    {
      id: 'derechos',
      heading: '8. Tus derechos',
      bullets: [
        'Acceder a los datos personales que mantenemos sobre ti.',
        'Solicitar la rectificación de datos inexactos o incompletos.',
        'Solicitar la eliminación de tus datos cuando ya no sean necesarios.',
        'Oponerte al tratamiento o retirar tu consentimiento en cualquier momento.',
      ],
      paragraphs: [
        'Para ejercer estos derechos, escríbenos a workservicesmcbo@gmail.com y responderemos a la brevedad posible.',
      ],
    },
    {
      id: 'menores',
      heading: '9. Menores de edad',
      paragraphs: [
        'Nuestros servicios están dirigidos a profesionales y empresas. No recopilamos de forma intencional datos de menores de edad.',
      ],
    },
    {
      id: 'cambios',
      heading: '10. Cambios a esta política',
      paragraphs: [
        'Podemos actualizar esta Política de Privacidad ocasionalmente. Publicaremos cualquier cambio en esta página e indicaremos la fecha de la última actualización al inicio del documento.',
      ],
    },
  ],
}

export const TERMS_OF_SERVICE: LegalDocument = {
  eyebrow: 'Legal',
  title: 'Términos de Servicio',
  subtitle:
    'Las condiciones que regulan el uso de nuestro sitio web y la contratación de nuestros espacios de trabajo.',
  updatedLabel: 'Última actualización',
  updated: '3 de septiembre de 2026',
  crossLink: { label: 'Política de Privacidad', href: '/privacidad' },
  sections: [
    {
      id: 'aceptacion',
      heading: '1. Aceptación de los términos',
      paragraphs: [
        'Al acceder a este sitio web y utilizar los servicios de Work Services Tu Aliado Estratégico C.A. (“Work Services”), aceptas estos Términos de Servicio. Si no estás de acuerdo con alguna de sus condiciones, por favor no utilices el sitio ni los servicios.',
      ],
    },
    {
      id: 'servicio',
      heading: '2. Descripción del servicio',
      paragraphs: [
        'Work Services ofrece en Maracaibo, Venezuela, espacios de trabajo flexibles que incluyen: oficinas privadas, salas de conferencias, salones de reuniones y puestos de trabajo en áreas compartidas, junto con servicios de soporte, internet con respaldo y recepción.',
        'La disponibilidad específica de cada espacio, sus precios y condiciones particulares se confirman al momento de la reserva.',
      ],
    },
    {
      id: 'reservas',
      heading: '3. Reservas',
      bullets: [
        'Las reservas se realizan a través del formulario de este sitio, por WhatsApp o por correo electrónico.',
        'Toda reserva está sujeta a confirmación de disponibilidad por parte de Work Services.',
        'No se requiere pago por adelantado para iniciar una solicitud de reserva.',
        'La reserva se considera confirmada únicamente cuando Work Services lo notifica al cliente por el canal de contacto utilizado.',
      ],
    },
    {
      id: 'pagos',
      heading: '4. Precios y pagos',
      bullets: [
        'Los precios publicados en el sitio son referenciales y se expresan en dólares estadounidenses (USD).',
        'Los planes se ofrecen por hora, por día o por mes, según el tipo de espacio.',
        'Los precios incluyen los servicios indicados en la descripción de cada espacio (internet con respaldo, energía, limpieza, recepción y soporte, entre otros).',
        'Work Services podrá ajustar sus precios; el precio aplicable es el confirmado al momento de la reserva.',
      ],
    },
    {
      id: 'cancelaciones',
      heading: '5. Cancelaciones y modificaciones',
      paragraphs: [
        'Puedes cancelar o modificar una reserva comunicándote con nosotros con la mayor anticipación posible por WhatsApp o correo electrónico.',
        'Para planes mensuales no aplican contratos rígidos ni penalizaciones por cambio de plan; las condiciones específicas de cada plan se informan al momento de la contratación.',
      ],
    },
    {
      id: 'uso-espacios',
      heading: '6. Uso de los espacios',
      bullets: [
        'Usa los espacios y el equipamiento con cuidado y conforme a su finalidad.',
        'Respeta la convivencia, la higiene y el descanso de los demás clientes.',
        'No está permitido fumar dentro de las instalaciones ni ingresar personas no autorizadas sin coordinación previa.',
        'Es responsabilidad del cliente el resguardo de sus equipos, objetos y documentos personales.',
      ],
    },
    {
      id: 'responsabilidad',
      heading: '7. Limitación de responsabilidad',
      paragraphs: [
        'Work Services se esfuerza por mantener la disponibilidad de internet con respaldo eléctrico de hasta 10 horas ante fallas del servicio. Sin embargo, no responde por interrupciones de servicios públicos de terceros, ni por lucro cesante o daños indirectos derivados de dichas interrupciones.',
        'Work Services no se responsabiliza por la pérdida, robo o daño de objetos personales de los clientes dentro de las instalaciones.',
        'El sitio web se proporciona “tal cual”; no garantizamos que esté disponible de forma ininterrumpida o libre de errores.',
      ],
    },
    {
      id: 'propiedad-intelectual',
      heading: '8. Propiedad intelectual',
      paragraphs: [
        'Las marcas, el nombre comercial y la identidad de Work Services pertenecen a Work Services Tu Aliado Estratégico C.A.',
        'Este sitio web, su diseño y su contenido son propiedad de PolarisAgency. Queda prohibida su reproducción total o parcial sin autorización expresa.',
      ],
    },
    {
      id: 'modificaciones',
      heading: '9. Modificaciones de los términos',
      paragraphs: [
        'Podemos actualizar estos Términos en cualquier momento. Los cambios se publicarán en esta página con la fecha de la última actualización. El uso continuo del sitio después de los cambios implica la aceptación de los términos actualizados.',
      ],
    },
    {
      id: 'ley',
      heading: '10. Ley aplicable',
      paragraphs: [
        'Estos Términos se rigen por las leyes de la República Bolivariana de Venezuela. Cualquier controversia será resuelta preferentemente de manera amistosa y, de no ser posible, ante los tribunales competentes de Maracaibo, Venezuela.',
      ],
    },
  ],
}
