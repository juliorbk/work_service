export const WHATSAPP_NUMBER = '58XXXXXXXXXX';

export interface WhatsAppBookingFields {
  space: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  duration: string;
  people: string;
  message: string;
}

export interface WhatsAppBookingInput {
  space: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  duration: string;
  people: string;
  message: string;
}

export const SPACE_OPTIONS = [
  'Coworking',
  'Oficinas Privadas',
  'Estudio de Producción',
  'Salas de Reuniones',
  'Salones de Eventos',
  'Aulas y Cursos',
];

export function buildWhatsAppMessage(fields: WhatsAppBookingInput): string {
  const { space, name, phone, email, date, time, duration, people, message } =
    fields;
  const lines = [
    '¡Hola! Quiero solicitar la reservación de un espacio.',
    '',
    `*Espacio:* ${space}`,
    `*Fecha:* ${date}`,
    `*Hora:* ${time}`,
    `*Duración:* ${duration}`,
    people ? `*Personas:* ${people}` : '',
    '',
    '*Mis datos de contacto:*',
    `*Nombre:* ${name}`,
    `*Teléfono:* ${phone}`,
    email ? `*Email:* ${email}` : '',
  ];

  if (message?.trim()) {
    lines.push('', `*Comentarios:* ${message.trim()}`);
  }

  return lines.filter((line) => line !== '').join('\n');
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatDate(input: string): string {
  if (!input) return '';
  try {
    return new Date(`${input}T00:00:00`).toLocaleDateString('es-MX', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return input;
  }
}