'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronRight, Mail, MessageCircle } from 'lucide-react';
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
            <Button onClick={reset} className="min-h-11 bg-primary hover:bg-primary/90 text-primary-foreground">
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
                    <Card
                      key={space.id}
                      className="p-4 sm:p-6 border-2 cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                      onClick={() => handleSpaceSelect(space.id)}
                    >
                      <h3 className="text-lg font-bold text-foreground mb-2">{space.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{space.description}</p>
                      <p className="text-xs text-muted-foreground mb-4">{space.capacity}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">{space.price}</span>
                        <ChevronRight className="w-5 h-5 text-foreground" />
                      </div>
                    </Card>
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
                        {Array.from({ length: 14 }).map((_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() + i);
                          const dateStr = date.toISOString().split('T')[0];
                          const dayName = date.toLocaleDateString('es-MX', { weekday: 'short' });
                          const dayNum = date.getDate();

                          return (
                            <button
                              key={i}
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
                          );
                        })}
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
                    <Label htmlFor="bk-people" className="block text-sm font-semibold text-foreground mb-4">
                      Número de personas
                    </Label>
                    <Input
                      id="bk-people"
                      type="number"
                      min={1}
                      value={booking.people}
                      onChange={(e) => set('people', e.target.value)}
                      placeholder="Ej. 8"
                      className="max-w-[12rem]"
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1 min-h-11">
                      Atrás
                    </Button>
                    <Button
                      onClick={handleDateTimeSubmit}
                      disabled={!booking.date || !booking.time}
                      className="flex-1 min-h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
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

                <Card className="p-4 sm:p-8 mb-8 bg-muted/30 border-border">
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
                        <div className="grid gap-2">
                          <Label htmlFor="bk-name">Nombre completo *</Label>
                          <Input
                            id="bk-name"
                            value={booking.name}
                            onChange={(e) => set('name', e.target.value)}
                            placeholder="Juan Pérez"
                            aria-invalid={errors.name || undefined}
                          />
                          {errors.name && <p className="text-xs text-destructive">Ingresa tu nombre.</p>}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bk-phone">Teléfono *</Label>
                          <Input
                            id="bk-phone"
                            type="tel"
                            value={booking.phone}
                            onChange={(e) => set('phone', e.target.value)}
                            placeholder="+58 412 123 4567"
                            aria-invalid={errors.phone || undefined}
                          />
                          {errors.phone && (
                            <p className="text-xs text-destructive">
                              Ingresa tu teléfono para enviar por WhatsApp.
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bk-email">Email *</Label>
                          <Input
                            id="bk-email"
                            type="email"
                            value={booking.email}
                            onChange={(e) => set('email', e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                            aria-invalid={errors.email || undefined}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">
                              Ingresa tu email para enviar por correo.
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bk-message">Comentarios adicionales</Label>
                          <Textarea
                            id="bk-message"
                            value={booking.message}
                            onChange={(e) => set('message', e.target.value)}
                            placeholder="Cuéntanos los detalles que necesites"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1 min-h-11">
                    Atrás
                  </Button>
                  <Button
                    onClick={() => handleSend('whatsapp')}
                    className="flex-1 min-h-11 bg-[#25D366] hover:bg-[#1eb958] text-white"
                  >
                    <MessageCircle className="size-4" />
                    Enviar por WhatsApp
                  </Button>
                  <Button
                    onClick={() => handleSend('email')}
                    className="flex-1 min-h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
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
