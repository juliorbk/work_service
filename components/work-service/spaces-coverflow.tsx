'use client';

import { useState } from 'react';
import { Zap, Users, ArrowRight } from 'lucide-react';
import { SPACES, type Space } from '@/components/landing/spaces-data';
import { SpaceDetailsModal } from '@/components/work-service/space-details-modal';
import {
  CardContainer,
  CardBody,
  CardItem,
} from '@/components/ui/3d-card';

interface SpacesCardsProps {
  className?: string;
  images?: Space[];
}

export function SpacesCards({ className = '', images = SPACES }: SpacesCardsProps) {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {images.map((item) => (
          <CardContainer
            key={item.title}
            containerClassName="py-4 w-full flex items-stretch justify-center"
            className="w-full h-full"
          >
            <CardBody className="h-auto w-full">
              <CardItem
                translateZ="80"
                className="w-full h-full group cursor-pointer"
                onClick={() => setSelectedSpace(item)}
              >
                <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-outline-variant shadow-[0_16px_32px_-10px_rgba(139,80,0,0.35)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <CardItem
                    translateZ="60"
                    className="absolute inset-x-0 bottom-0 p-5 text-left"
                  >
                    <h3 className="text-xl font-bold text-white drop-shadow-sm">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-white/80">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        <Users className="h-3 w-3" />
                        {item.capacity}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 transition-transform duration-300 group-hover:translate-x-1">
                        Ver detalles
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </CardItem>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>

      <SpaceDetailsModal
        space={selectedSpace}
        onClose={() => setSelectedSpace(null)}
      />
    </div>
  );
}

export function SpacesCoverFlow() {
  return (
    <section id="espacios" className="relative py-16 sm:py-24 lg:py-28 overflow-hidden scroll-mt-24">
      {/* Resplandor cálido tras las tarjetas */}
      <div
        aria-hidden
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-5xl h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(168,90,0,0.10),transparent_65%)] pointer-events-none"
      />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16 text-center">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-4">
            <Zap className="w-4 h-4 text-accent" />
            Recorre Nuestros Espacios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Un vistazo a tus espacios
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
            Explora los ambientes disponibles en la Torre Banco Industrial: lobby,
            salas de reuniones, sala de conferencias y oficinas privadas.
          </p>
        </div>

        {/* 3D Cards */}
        <SpacesCards />
      </div>
    </section>
  );
}
