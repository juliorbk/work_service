export const WHATSAPP_NUMBER = '58XXXXXXXXXX';
export const CONTACT_EMAIL = 'reservas@tucorreo.com';

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
  'Lobby',
  'Sala de Reuniones B',
  'Sala de Conferencias',
  'Oficina A',
  'Oficina B',
  'Oficina C',
];

export function buildWhatsAppMessage(fields: WhatsAppBookingInput): string {
  return buildBookingMessage(fields, true);
}

export function buildEmailMessage(fields: WhatsAppBookingInput): string {
  return buildBookingMessage(fields, false);
}

function buildBookingMessage(fields: WhatsAppBookingInput, markdown: boolean): string {
  const { space, name, phone, email, date, time, duration, people, message } =
    fields;
  const b = (label: string, value: string) => (markdown ? `*${label}:* ${value}` : `${label}: ${value}`);
  const lines = [
    '¡Hola! Quiero solicitar la reservación de un espacio.',
    '',
    b('Espacio', space),
    b('Fecha', date),
    b('Hora', time),
    b('Duración', duration),
    people ? b('Personas', people) : '',
    '',
    markdown ? '*Mis datos de contacto:*' : 'Mis datos de contacto:',
    b('Nombre', name),
    b('Teléfono', phone),
    email ? b('Email', email) : '',
  ];

  if (message?.trim()) {
    lines.push('', `${markdown ? '*Comentarios:*' : 'Comentarios:'} ${message.trim()}`);
  }

  return lines.filter((line) => line !== '').join('\n');
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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