import { BRAND, RENTABLE_SPACES } from '@/lib/site-config';
import { getBookingMode, type BookingMode } from '@/components/landing/spaces-data';

export const WHATSAPP_NUMBER = BRAND.whatsappNumber;
export const CONTACT_EMAIL = BRAND.email;

export interface WhatsAppBookingInput {
  space: string;
  name: string;
  phone: string;
  email: string;
  /** Reservas por hora: fecha y hora Exactas. */
  date: string;
  time: string;
  duration: string;
  /** Reservas mensuales: mes de inicio del plan (YYYY-MM). */
  startMonth: string;
  /** Personas que ocuparán el espacio. Requerido en planes mensuales. */
  people: string;
  message: string;
  /** Si se omite, se deduce del espacio seleccionado. */
  mode?: BookingMode;
}

export const SPACE_OPTIONS = RENTABLE_SPACES;

/** Mes actual y mes siguiente, como opciones de inicio de un plan mensual. */
export const START_MONTH_OPTIONS: { value: string; label: string }[] = Array.from(
  { length: 2 },
  (_, i) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + i);
    return {
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      label: date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' }),
    };
  }
);

export function buildWhatsAppMessage(fields: WhatsAppBookingInput): string {
  return buildBookingMessage(fields, true);
}

export function buildEmailMessage(fields: WhatsAppBookingInput): string {
  return buildBookingMessage(fields, false);
}

function buildBookingMessage(fields: WhatsAppBookingInput, markdown: boolean): string {
  const { space, name, phone, email, date, time, duration, startMonth, people, message } = fields;
  const mode = fields.mode ?? getBookingMode(space);
  const b = (label: string, value: string) =>
    markdown ? `*${label}:* ${value}` : `${label}: ${value}`;

  const details =
    mode === 'monthly'
      ? [
          b('Espacio', space),
          b('Modalidad', 'Plan mensual'),
          b('Mes de inicio', formatMonth(startMonth)),
          b('Personas', people),
        ]
      : [
          b('Espacio', space),
          b('Fecha', date),
          b('Hora', time),
          b('Duración', duration),
          people ? b('Personas', people) : '',
        ];

  const lines = [
    mode === 'monthly'
      ? '¡Hola! Quiero solicitar un plan mensual de espacio.'
      : '¡Hola! Quiero solicitar la reservación de un espacio.',
    '',
    ...details,
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

/** Convierte `YYYY-MM` a un mes legible, p. ej. `octubre de 2026`. */
export function formatMonth(input: string): string {
  const [year, month] = input.split('-').map(Number);
  if (!year || !month) return '';
  return new Date(year, month - 1, 1).toLocaleDateString('es-MX', {
    month: 'long',
    year: 'numeric',
  });
}
