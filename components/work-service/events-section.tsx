'use client';

import { CalendarDays, ImagePlus, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventsSectionProps {
  className?: string;
}

const SLOT_COUNT = 3;

export function EventsSection({ className }: EventsSectionProps) {
  return (
    <section id="eventos" className={cn('relative py-24 lg:py-32 overflow-hidden scroll-mt-24', className)}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-20 text-center">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-6">
            <Zap className="w-4 h-4 text-[#00b3f0]" />
            Eventos Destacados
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
            Eventos de la Semana
          </h2>
          <p className="text-lg lg:text-xl text-secondary max-w-2xl mx-auto mt-6 leading-relaxed">
            Conferencias, talleres y lanzamientos en la Torre Banco Industrial.
            Muy pronto podrás ver las fotos de los eventos más recientes.
          </p>
        </div>

        {/* Placeholder grid para fotos de eventos */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: SLOT_COUNT }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-4 aspect-[4/3] rounded-lg border-2 border-dashed border-outline-variant bg-surface-container-lowest text-center p-8"
            >
              <div className="w-14 h-14 rounded-full bg-primary-container/10 flex items-center justify-center">
                <ImagePlus className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Evento destacado</p>
                <p className="text-sm text-secondary">
                  Espacio reservado para las fotos del evento.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nota inferior */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-secondary">
          <CalendarDays className="w-4 h-4" />
          <span>Próximamente: calendario y galería de eventos</span>
        </div>
      </div>
    </section>
  );
}
