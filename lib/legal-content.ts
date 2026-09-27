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
  updated: '27 de septiembre de 2026',
  crossLink: { label: 'Términos de Servicio', href: '/terminos' },
  sections: [
    {
      id: 'responsable',
      heading: '1. Responsable del tratamiento',
      paragraphs: [
        'Work Services Tu Aliado Estratégico C.A. (“Work Services”), con domicilio en la ciudad de Maracaibo, estado Zulia, Venezuela, es el responsable del tratamiento de los datos personales recopilados a través de este sitio web, de nuestros formularios de reserva y de nuestros canales de contacto.',
        'Tratamos tus datos de conformidad con la Ley Orgánica de Protección de Datos Personales de la República Bolivariana de Venezuela y las demás normas aplicables.',
        'Puedes contactarnos en cualquier momento por correo electrónico a workservicesmcbo@gmail.com o por WhatsApp al 0424-6042538.',
      ],
    },
    {
      id: 'datos',
      heading: '2. Datos que recopilamos',
      bullets: [
        'Datos de contacto que nos proporcionas voluntariamente: nombre, número de teléfono o WhatsApp, correo electrónico y, si la indicas, el nombre de tu empresa.',
        'Datos de reserva: tipo de espacio, fechas, horarios, duración y cualquier información adicional que incluyas en el formulario de reserva o en tus mensajes.',
        'Datos de navegación: métricas técnicas y agregadas (páginas visitadas, dispositivo y región aproximada) recopiladas a través de nuestra herramienta de analítica.',
      ],
      paragraphs: [
        'No recopilamos datos de pago. Este sitio no procesa pagos en línea: las tarifas se acuerdan y cobran directamente entre el cliente y Work Services por los canales convenidos.',
      ],
    },
    {
      id: 'finalidad',
      heading: '3. Finalidades del tratamiento',
      bullets: [
        'Responder tus consultas y solicitudes de información sobre nuestros espacios, precios y disponibilidad.',
        'Gestionar, confirmar y coordinar tus reservas de oficinas, salas de conferencias y espacios de trabajo.',
        'Enviar comunicaciones transaccionales relacionadas con tu reserva, facturación o con los servicios que has solicitado.',
        'Enviarte información comercial sobre nuevos espacios, ofertas o eventos únicamente si lo has autorizado previamente.',
        'Mejorar nuestro sitio web y nuestros servicios mediante estadísticas de uso agregadas.',
      ],
    },
    {
      id: 'consentimiento',
      heading: '4. Base jurídica del tratamiento',
      paragraphs: [
        'Tratamos tus datos con base en tu consentimiento, que nos otorgas al completar nuestros formularios, escribirnos por WhatsApp o correo electrónico, y en la relación comercial que surge al gestionar tu reserva.',
        'También podemos tratar datos para cumplir obligaciones legales (por ejemplo, obligaciones contables o fiscales), para defender nuestros derechos o cuando exista un interés legítimo, como el análisis de uso del sitio o la seguridad de las instalaciones.',
        'Puedes retirar tu consentimiento en cualquier momento sin que ello afecte el tratamiento previo realizado ni la legalidad del tratamiento basado en otra base jurídica.',
      ],
    },
    {
      id: 'terceros',
      heading: '5. Comunicación con terceros',
      paragraphs: [
        'No vendemos, alquilamos ni compartimos tus datos personales con terceros con fines publicitarios o comerciales propios de esos terceros.',
        'Utilizamos proveedores de servicios para operar el sitio y comunicarnos contigo: WhatsApp (Meta Platforms, Inc.) para la mensajería, un proveedor de correo electrónico, y Vercel Inc. para el alojamiento de este sitio y su analítica.',
        'Estos proveedores actúan como encargados del tratamiento y solo procesamos con ellos los datos estrictamente necesarios para responder tu solicitud o gestionar tu reserva.',
      ],
    },
    {
      id: 'internacionales',
      heading: '6. Transferencias internacionales',
      paragraphs: [
        'Algunos de nuestros proveedores están ubicados en el extranjero, principalmente en Estados Unidos. Esto significa que tus datos pueden ser almacenados o accedidos fuera de Venezuela para el funcionamiento del sitio y los canales de comunicación.',
        'Al utilizar este sitio y nuestros canales de contacto, consientes estas transferencias. Se realizan con garantías contractuales adecuadas y respetando los principios de esta Política.',
        'Si deseas información adicional sobre las garantías aplicables, escríbenos a workservicesmcbo@gmail.com.',
      ],
    },
    {
      id: 'cookies',
      heading: '7. Cookies y analítica',
      paragraphs: [
        'Este sitio utiliza Vercel Analytics, una herramienta de analítica respetuosa con la privacidad: recopila métricas anónimas y agregadas sobre el uso del sitio y no se utiliza para publicidad ni seguimiento entre sitios.',
        'No utilizamos cookies publicitarias ni de seguimiento de terceros.',
        'Puedes bloquear o eliminar las cookies desde la configuración de tu navegador; el sitio seguirá funcionando con normalidad.',
      ],
    },
    {
      id: 'conservacion',
      heading: '8. Conservación y seguridad',
      paragraphs: [
        'Conservamos tus datos de contacto y de reserva mientras exista una relación comercial vigente o durante el tiempo necesario para atender tus solicitudes, cumplir obligaciones legales o contables, o defender nuestros derechos.',
        'Los datos de analítica se conservan de forma agregada por el período que establezca nuestro proveedor.',
        'Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra acceso no autorizado, pérdida o alteración. No obstante, ningún método de transmisión por Internet es completamente seguro.',
      ],
    },
    {
      id: 'derechos',
      heading: '9. Tus derechos',
      bullets: [
        'Acceder a los datos personales que mantenemos sobre ti.',
        'Solicitar la rectificación o actualización de datos inexactos o incompletos.',
        'Solicitar la supresión de tus datos cuando ya no sean necesarios.',
        'Oponerte al tratamiento o retirar tu consentimiento en cualquier momento.',
        'Conocer las cesiones o transferencias de datos que se hayan realizado.',
      ],
      paragraphs: [
        'Para ejercer estos derechos, escríbenos a workservicesmcbo@gmail.com indicando el derecho que deseas ejercer y responderemos a la brevedad posible, sin perjuicio de tu derecho a acudir ante la autoridad competente en materia de protección de datos personales.',
      ],
    },
    {
      id: 'canales-externos',
      heading: '10. Canales externos y redes sociales',
      paragraphs: [
        'Cuando nos contactas por WhatsApp o Instagram, se aplican también las políticas de privacidad y condiciones de esas plataformas, que no controlamos.',
        'Te recomendamos revisar las políticas de cada servicio antes de enviarnos información por esos canales.',
      ],
    },
    {
      id: 'menores',
      heading: '11. Menores de edad',
      paragraphs: [
        'Nuestros servicios están dirigidos a profesionales y empresas. No recopilamos de forma intencional datos de menores de edad.',
      ],
    },
    {
      id: 'cambios',
      heading: '12. Cambios a esta política',
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
  updated: '27 de septiembre de 2026',
  crossLink: { label: 'Política de Privacidad', href: '/privacidad' },
  sections: [
    {
      id: 'identificacion',
      heading: '1. Identificación del prestador del servicio',
      paragraphs: [
        'Este sitio web es operado por Work Services Tu Aliado Estratégico C.A. (“Work Services”), con domicilio en la ciudad de Maracaibo, estado Zulia, Venezuela.',
        'Para cualquier comunicación puedes escribirnos a workservicesmcbo@gmail.com o por WhatsApp al 0424-6042538.',
        'Las referencias en estos Términos a “Work Services”, “nosotros” o “el servicio” comprenden los espacios de trabajo que ofrecemos: oficinas privadas, salas de conferencias, salones de reuniones y puestos de trabajo en áreas compartidas.',
      ],
    },
    {
      id: 'aceptacion',
      heading: '2. Aceptación de los términos',
      paragraphs: [
        'Al acceder a este sitio web y utilizar los servicios de Work Services, aceptas estos Términos de Servicio. Si no estás de acuerdo con alguna de sus condiciones, por favor no utilices el sitio ni los servicios.',
        'El uso del sitio y la solicitud de reservas implican tu aceptación de estos Términos y de nuestra Política de Privacidad.',
      ],
    },
    {
      id: 'servicio',
      heading: '3. Descripción del servicio',
      paragraphs: [
        'Work Services ofrece en Maracaibo, Venezuela, espacios de trabajo flexibles que incluyen: oficinas privadas, salas de conferencias, salones de reuniones y puestos de trabajo en áreas compartidas, junto con servicios de soporte, internet con respaldo y recepción.',
        'Este sitio es de carácter informativo y de contacto: no procesa pagos ni formaliza contratos en línea. La contratación de espacios se coordina con nuestro equipo y se confirma por los canales de contacto.',
        'La disponibilidad específica de cada espacio, sus precios y condiciones particulares se confirman al momento de la reserva.',
      ],
    },
    {
      id: 'reservas',
      heading: '4. Reservas',
      bullets: [
        'Las reservas se solicitan a través del formulario de este sitio, por WhatsApp o por correo electrónico.',
        'Toda reserva está sujeta a confirmación de disponibilidad por parte de Work Services.',
        'Al solicitar una reserva presentas una solicitud, no un contrato en firme; sin confirmación no existe reserva válida.',
        'No se requiere pago por adelantado para iniciar una solicitud de reserva.',
        'La reserva se considera confirmada únicamente cuando Work Services lo notifica al cliente por el canal de contacto utilizado.',
      ],
    },
    {
      id: 'pagos',
      heading: '5. Precios y pagos',
      bullets: [
        'Los precios publicados en el sitio son referenciales y se expresan en dólares estadounidenses (USD).',
        'Los planes se ofrecen por hora, por día o por mes, según el tipo de espacio.',
        'Los precios incluyen los servicios indicados en la descripción de cada espacio (internet con respaldo, energía, limpieza, recepción y soporte, entre otros).',
        'El pago se realiza directamente entre el cliente y Work Services por los medios convenidos (efectivo o transferencia, según se acuerde); este sitio no recopila datos de pago.',
        'Work Services podrá ajustar sus precios; el precio aplicable es el confirmado al momento de la reserva.',
      ],
    },
    {
      id: 'cancelaciones',
      heading: '6. Cancelaciones, modificaciones e inasistencia',
      paragraphs: [
        'Puedes cancelar o modificar una reserva comunicándote con nosotros por WhatsApp o correo electrónico con la mayor anticipación posible. Para espacios por hora o por día recomendamos avisar con al menos 24 horas de antelación.',
        'Si no asistes a una reserva horaria sin aviso previo, la reserva podrá reprogramarse según la disponibilidad; no implica penalización alguna.',
        'Para planes mensuales no aplican contratos rígidos ni penalizaciones por cambio de plan; las condiciones específicas de cada plan se informan al momento de la contratación.',
      ],
    },
    {
      id: 'uso-espacios',
      heading: '7. Uso de los espacios',
      bullets: [
        'Usa los espacios y el equipamiento con cuidado y conforme a su finalidad.',
        'Respeta la convivencia, la higiene y el descanso de los demás clientes.',
        'No está permitido fumar dentro de las instalaciones ni ingresar personas no autorizadas sin coordinación previa.',
        'Queda prohibido el uso de los espacios para actividades ilícitas, peligrosas o que perturben a otros clientes.',
        'Es responsabilidad del cliente el resguardo de sus equipos, objetos y documentos personales, así como cumplir las normas de convivencia, seguridad y salubridad indicadas por nuestro personal.',
      ],
    },
    {
      id: 'eventos',
      heading: '8. Eventos, cursos y contenido patrocinado',
      paragraphs: [
        'Nuestras salas de conferencias y zonas comunes pueden recibir eventos, cursos o conferencias, desde 50 hasta 120 personas, con equipo audiovisual, escenario y catering opcional bajo convenio. Las tarifas de eventos se cotizan de forma particular y se recomienda coordinar con anticipación.',
        'La galería de videos de este sitio muestra, además del reel oficial de Work Services, piezas audiovisuales de eventos de organizaciones patrocinadoras, que contratan este espacio publicitario.',
      ],
      bullets: [
        'Los organizadores y patrocinadores declaran contar con los derechos sobre el contenido publicado y autorizan expresamente su exhibición en este sitio.',
        'Los espacios publicitarios y la realización de eventos requieren aprobación previa de Work Services y se contratan por separado.',
        'Work Services se reserva el derecho de decidir, sin expresión de causa, qué contenido se publica o se retira de la galería patrocinada.',
      ],
    },
    {
      id: 'responsabilidad',
      heading: '9. Responsabilidad y fuerza mayor',
      paragraphs: [
        'Work Services se esfuerza por mantener la disponibilidad de internet con respaldo eléctrico de hasta 10 horas ante fallas del servicio. Sin embargo, no responde por interrupciones de servicios públicos de terceros, ni por lucro cesante o daños indirectos derivados de dichas interrupciones.',
        'Work Services no se responsabiliza por la pérdida, robo o daño de objetos personales de los clientes dentro de las instalaciones.',
        'El sitio web se proporciona “tal cual”; no garantizamos que esté disponible de forma ininterrumpida o libre de errores.',
        'No seremos responsables por retrasos o incumplimientos causados por caso fortuito o fuerza mayor, incluidas fallas eléctricas o de conectividad, emergencias, decisiones de autoridades o eventos ajenos a nuestro control.',
      ],
    },
    {
      id: 'propiedad-intelectual',
      heading: '10. Propiedad intelectual',
      paragraphs: [
        'Las marcas, el nombre comercial y la identidad de Work Services pertenecen a Work Services Tu Aliado Estratégico C.A.',
        'Este sitio web, su diseño y su contenido son propiedad de PolarisAgency. Queda prohibida su reproducción total o parcial sin autorización expresa.',
        'Las piezas audiovisuales de eventos publicados en la galería conservan los derechos de sus respectivos titulares y se exhiben con su autorización.',
      ],
    },
    {
      id: 'enlaces',
      heading: '11. Enlaces a servicios de terceros',
      paragraphs: [
        'Este sitio puede contener enlaces a servicios de terceros, como WhatsApp, Instagram o correo electrónico. Al utilizarlos, se aplican las condiciones y políticas de privacidad de esos servicios, que no controlamos.',
      ],
    },
    {
      id: 'conducta',
      heading: '12. Conducta en el sitio',
      bullets: [
        'No utilices este sitio para actividades automatizadas, abusivas, fraudulentas o que puedan dañar, sobrecargar o interferir con su funcionamiento.',
        'No intentes acceder a áreas o sistemas a los que no tengas autorización.',
      ],
    },
    {
      id: 'modificaciones',
      heading: '13. Modificaciones de los términos',
      paragraphs: [
        'Podemos actualizar estos Términos en cualquier momento. Los cambios se publicarán en esta página con la fecha de la última actualización. El uso continuo del sitio después de los cambios implica la aceptación de los términos actualizados.',
      ],
    },
    {
      id: 'ley',
      heading: '14. Ley aplicable y jurisdicción',
      paragraphs: [
        'Estos Términos se rigen por las leyes de la República Bolivariana de Venezuela. Cualquier controversia será resuelta preferentemente de manera amistosa y, de no ser posible, ante los tribunales competentes de Maracaibo, Venezuela.',
      ],
    },
  ],
}