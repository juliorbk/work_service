'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Check, ChevronRight } from 'lucide-react';

type Step = 1 | 2 | 3;

interface BookingState {
  spaceType: string | null;
  date: string;
  time: string;
  duration: string;
}

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    spaceType: null,
    date: '',
    time: '',
    duration: '1 hora',
  });

  const handleSpaceSelect = (space: string) => {
    setBooking({ ...booking, spaceType: space });
    setCurrentStep(2);
  };

  const handleDateTimeSubmit = () => {
    if (booking.date && booking.time) {
      setIsProcessing(true);
      window.setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(3);
      }, 1400);
    }
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    window.setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
    }, 1600);
  };

  const spaceOptions = [
    {
      id: 'coworking',
      name: 'Escritorio de Coworking',
      description: 'Espacio compartido profesional',
      price: '$45/día',
    },
    {
      id: 'meeting',
      name: 'Sala de Reuniones',
      description: 'Sala privada con equipo AV',
      price: '$150/hora',
    },
    {
      id: 'seminar',
      name: 'Salón de Eventos',
      description: 'Espacio de gran capacidad para eventos',
      price: '$500–2,000/evento',
    },
    {
      id: 'aula',
      name: 'Aula / Curso',
      description: 'Aula equipada para cursos y capacitaciones',
      price: '$850/día',
    },
  ];

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
            <span>Revisa y Confirma</span>
          </div>
        </div>

        {/* Processing state */}
        {isProcessing && (
          <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center py-16 min-h-[320px]">
            <LoadingSpinner
              label={
                currentStep === 3
                  ? 'Procesando tu reservación...'
                  : 'Confirmando tu reservación...'
              }
            />
          </div>
        )}

        {/* Confirmed state */}
        {isConfirmed && (
          <div className="animate-in fade-in duration-300 text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary-container/15 flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">¡Reservación Confirmada!</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
              Hemos recibido tu solicitud de {booking.spaceType} para el{' '}
              {new Date(booking.date).toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}{' '}
              a las {booking.time} ({booking.duration}). Te contactaremos para confirmar los
              detalles.
            </p>
            <Button
              onClick={() => {
                setIsConfirmed(false);
                setCurrentStep(1);
              }}
              className="min-h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Hacer otra reservación
            </Button>
          </div>
        )}

        {!isProcessing && !isConfirmed && (
          <>
            {/* Step 1: Space Selection */}
            {currentStep === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-foreground mb-2">Elige Tu Espacio</h2>
            <p className="text-muted-foreground mb-8">
              Elige el espacio que mejor se adapte a tus necesidades.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {spaceOptions.map((space) => (
                <Card
                  key={space.id}
                  className="p-4 sm:p-6 border-2 cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                  onClick={() => handleSpaceSelect(space.id)}
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">{space.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{space.description}</p>
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
              Seleccionado: <span className="font-semibold text-foreground">{booking.spaceType}</span>
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
                          onClick={() => setBooking({ ...booking, date: dateStr })}
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
                  {['09:00', '11:00', '14:00', '16:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setBooking({ ...booking, time })}
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
                  {['1 hora', '2 horas', '4 horas', 'Día completo'].map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setBooking({ ...booking, duration: dur })}
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

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 min-h-11"
                >
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

        {/* Step 3: Review & Confirm */}
        {currentStep === 3 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-foreground mb-8">Revisa Tu Reservación</h2>

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
                      <p className="font-semibold text-foreground capitalize">{booking.spaceType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Fecha</p>
                      <p className="font-semibold text-foreground">
                        {new Date(booking.date).toLocaleDateString('es-MX', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Hora</p>
                      <p className="font-semibold text-foreground">{booking.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Duración</p>
                      <p className="font-semibold text-foreground">{booking.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Price summary */}
                <div>
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-6">
                    Resumen del Precio
                  </h3>
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-foreground">Tarifa Base</span>
                      <span className="font-semibold text-foreground">$150.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Cargo por Servicio</span>
                      <span className="font-semibold text-foreground">$15.00</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-border text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">$165.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="flex-1 min-h-11"
                >
                  Atrás
                </Button>
              <Button
                onClick={handleConfirmBooking}
                className="flex-1 min-h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Confirmar Reservación
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
