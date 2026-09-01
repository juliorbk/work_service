'use client';

import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
} from '@heroui/react';
import { Check, ChevronRight, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { SPACES } from '@/components/landing/spaces-data';
import {
  WHATSAPP_NUMBER,
  CONTACT_EMAIL,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  buildEmailMessage,
  buildMailtoUrl,
  formatDate,
} from '@/components/work-service/whatsapp';

type Step = 1 | 2 | 3;
type Channel = 'whatsapp' | 'email';

const TIME_OPTIONS = ['09:00', '11:00', '14:00', '16:00'];
const DURATION_OPTIONS = ['1 hora', '2 horas', '4 horas', 'Día completo'];

interface BookingState {
  space: string | null;
  date: string;
  time: string;
  duration: string;
  people: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

const spaceOptions = SPACES.map((space) => ({
  id: space.title,
  name: space.title,
  description: space.description,
  capacity: space.capacity,
  price: space.pricing[0]?.price ?? '',
}));

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [sentChannel, setSentChannel] = useState<Channel | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [booking, setBooking] = useState<BookingState>({
    space: null,
    date: '',
    time: '',
    duration: '1 hora',
    people: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const set = (key: keyof BookingState, value: string | null) => {
    setBooking((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  // Las próximas 14 fechas se calculan una sola vez al montar
  const dateOptions = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
          dateStr: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('es-MX', { weekday: 'short' }),
          dayNum: date.getDate(),
        };
      }),
    []
  );

  const handleSpaceSelect = (space: string) => {
    set('space', space);
    setCurrentStep(2);
  };

  const handleDateTimeSubmit = () => {
    if (booking.date && booking.time) {
      setCurrentStep(3);
    }
  };

  const getFields = () => ({
    space: booking.space ?? '',
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    date: formatDate(booking.date),
    time: booking.time,
    duration: booking.duration,
    people: booking.people,
    message: booking.message,
  });

  const handleSend = (channel: Channel) => {
    const nextErrors: Record<string, boolean> = {};
    if (!booking.name.trim()) nextErrors.name = true;
    if (channel === 'whatsapp' && !booking.phone.trim()) nextErrors.phone = true;
    if (channel === 'email' && !booking.email.trim()) nextErrors.email = true;
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const fields = getFields();
    if (channel === 'whatsapp') {
      window.open(
        buildWhatsAppUrl(WHATSAPP_NUMBER, buildWhatsAppMessage(fields)),
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      window.location.href = buildMailtoUrl(
        CONTACT_EMAIL,
        `Solicitud de Reservación — ${fields.space}`,
        buildEmailMessage(fields)
      );
    }
    setSentChannel(channel);
  };

  const reset = () => {
    setBooking({
      space: null,
      date: '',
      time: '',
      duration: '1 hora',
      people: '',
      name: '',
      phone: '',
      email: '',
      message: '',
    });
    setErrors({});
    setSentChannel(null);
    setCurrentStep(1);
  };

  const selectedSpace = spaceOptions.find((s) => s.id === booking.space);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress indicator */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step < currentStep
                      ? 'bg-primary text-primary-foreground'
                      : step === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>Elige el Espacio</span>
            <span>Fecha y Hora</span>
            <span>Revisa y Envía</span>
          </div>
        </div>

        {/* Sent state */}
        {sentChannel && (
          <div className="animate-in fade-in duration-300 text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary-container/15 flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {sentChannel === 'whatsapp' ? '¡Abre WhatsApp para enviar!' : '¡Abre tu correo para enviar!'}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
              Preparamos tu solicitud de {booking.space} para el{' '}
              {formatDate(booking.date)} a las {booking.time} ({booking.duration}
              ). Solo falta que presiones <strong>enviar</strong> en{' '}
              {sentChannel === 'whatsapp' ? 'WhatsApp' : 'tu aplicación de correo'} y
              te responderemos para confirmar la reservación.
            </p>
            <Button onPress={reset} className="min-h-11">
              Hacer otra reservación
            </Button>
          </div>
        )}

        {!sentChannel && (
          <>
            {/* Step 1: Space Selection */}
            {currentStep === 1 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-3xl font-bold text-foreground mb-2">Elige Tu Espacio</h2>
                <p className="text-muted-foreground mb-8">
                  Elige el espacio que mejor se adapte a tus necesidades. La reservación se
                  confirma por WhatsApp o correo.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {spaceOptions.map((space) => (
                    <button
                      key={space.id}
                      type="button"
                      onClick={() => handleSpaceSelect(space.id)}
                      className="text-left w-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Card className="p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all hover:border-primary hover:shadow-lg">
                        <Card.Content>
                          <h3 className="text-lg font-bold text-foreground mb-2">{space.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{space.description}</p>
                          <p className="text-xs text-muted-foreground mb-4">{space.capacity}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-primary">{space.price}</span>
                            <ChevronRight className="w-5 h-5 text-foreground" />
                          </div>
                        </Card.Content>
                      </Card>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-3xl font-bold text-foreground mb-2">Elige Fecha y Hora</h2>
                <p className="text-muted-foreground mb-8">
                  Seleccionado: <span className="font-semibold text-foreground">{booking.space}</span>
                </p>

                <div className="space-y-6">
                  {/* Date picker */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-4">Fecha</label>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 mb-2">
                      <div className="grid grid-cols-7 gap-2 min-w-[28rem] sm:min-w-0">
                        {dateOptions.map(({ dateStr, dayName, dayNum }) => (
                          <button
                            key={dateStr}
                            onClick={() => set('date', dateStr)}
                            className={`min-h-11 flex flex-col items-center justify-center p-2 rounded-lg text-center text-xs transition-all ${
                              booking.date === dateStr
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80 text-foreground'
                            }`}
                          >
                            <span className="font-semibold">{dayName}</span>
                            <span>{dayNum}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Time picker */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-4">Hora</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TIME_OPTIONS.map((time) => (
                        <button
                          key={time}
                          onClick={() => set('time', time)}
                          className={`min-h-11 p-3 rounded-lg text-sm transition-all ${
                            booking.time === time
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80 text-foreground'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-4">Duración</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {DURATION_OPTIONS.map((dur) => (
                        <button
                          key={dur}
                          onClick={() => set('duration', dur)}
                          className={`min-h-11 p-3 rounded-lg text-sm transition-all ${
                            booking.duration === dur
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80 text-foreground'
                          }`}
                        >
                          {dur}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* People */}
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-4">
                      Número de personas
                    </Label>
                    <TextField
                      type="number"
                      value={booking.people}
                      onChange={(v) => set('people', v)}
                      className="max-w-[12rem]"
                    >
                      <Input min={1} placeholder="Ej. 8" />
                    </TextField>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
                    <Button variant="outline" onPress={() => setCurrentStep(1)} className="flex-1 min-h-11">
                      Atrás
                    </Button>
                    <Button
                      onPress={handleDateTimeSubmit}
                      isDisabled={!booking.date || !booking.time}
                      className="flex-1 min-h-11"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Send */}
            {currentStep === 3 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-3xl font-bold text-foreground mb-2">Revisa Tu Reservación</h2>
                <p className="text-muted-foreground mb-8">
                  Completa tus datos y envía la solicitud por el canal que prefieras. Te
                  responderemos para confirmar.
                </p>

                <Card className="p-4 sm:p-8 mb-8 rounded-lg bg-muted/30 border-border">
                  <Card.Content>
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Booking details */}
                    <div>
                      <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-6">
                        Detalles de la Reservación
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Tipo de Espacio</p>
                          <p className="font-semibold text-foreground">{booking.space}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Fecha</p>
                          <p className="font-semibold text-foreground">{formatDate(booking.date)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Hora</p>
                          <p className="font-semibold text-foreground">{booking.time}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Duración</p>
                          <p className="font-semibold text-foreground">{booking.duration}</p>
                        </div>
                        {booking.people && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Personas</p>
                            <p className="font-semibold text-foreground">{booking.people}</p>
                          </div>
                        )}
                        {selectedSpace?.price && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Tarifa de referencia</p>
                            <p className="font-semibold text-primary">{selectedSpace.price}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contact form */}
                    <div>
                      <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-6">
                        Tus Datos de Contacto
                      </h3>
                      <div className="space-y-4">
                        <TextField
                          value={booking.name}
                          onChange={(v) => set('name', v)}
                          isInvalid={!!errors.name}
                          className="w-full"
                        >
                          <Label>Nombre completo *</Label>
                          <Input placeholder="Juan Pérez" />
                          <FieldError>Ingresa tu nombre.</FieldError>
                        </TextField>
                        <TextField
                          type="tel"
                          value={booking.phone}
                          onChange={(v) => set('phone', v)}
                          isInvalid={!!errors.phone}
                          className="w-full"
                        >
                          <Label>Teléfono *</Label>
                          <Input placeholder="+58 412 123 4567" />
                          <FieldError>
                            Ingresa tu teléfono para enviar por WhatsApp.
                          </FieldError>
                        </TextField>
                        <TextField
                          type="email"
                          value={booking.email}
                          onChange={(v) => set('email', v)}
                          isInvalid={!!errors.email}
                          className="w-full"
                        >
                          <Label>Email *</Label>
                          <Input placeholder="tucorreo@ejemplo.com" />
                          <FieldError>
                            Ingresa tu email para enviar por correo.
                          </FieldError>
                        </TextField>
                        <TextField
                          value={booking.message}
                          onChange={(v) => set('message', v)}
                          className="w-full"
                        >
                          <Label>Comentarios adicionales</Label>
                          <TextArea placeholder="Cuéntanos los detalles que necesites" />
                        </TextField>
                      </div>
                    </div>
                  </div>
                  </Card.Content>
                </Card>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button variant="outline" onPress={() => setCurrentStep(2)} className="flex-1 min-h-11">
                    Atrás
                  </Button>
                  <Button
                    onPress={() => handleSend('whatsapp')}
                    className="flex-1 min-h-11 bg-[#25D366] hover:bg-[#1eb958] text-white"
                  >
                    <WhatsAppIcon className="size-4" />
                    Enviar por WhatsApp
                  </Button>
                  <Button
                    onPress={() => handleSend('email')}
                    className="flex-1 min-h-11"
                  >
                    <Mail className="size-4" />
                    Enviar por Email
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
