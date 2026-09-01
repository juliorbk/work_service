'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Users, ArrowRight } from 'lucide-react';
import { BrandMark } from '@/components/ui/brand-mark';
import { SPACES, type Space } from '@/components/landing/spaces-data';
import {
  CardContainer,
  CardBody,
  CardItem,
} from '@/components/ui/3d-card';

const SpaceDetailsModal = dynamic(
  () =>
    import('@/components/work-service/space-details-modal').then(
      (mod) => mod.SpaceDetailsModal
    ),
  { ssr: false }
);

interface SpacesCardsProps {
  className?: string;
  images?: Space[];
}

export function SpacesCards({ className = '', images = SPACES }: SpacesCardsProps) {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto justify-items-center">
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
                <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl border border-outline-variant shadow-[0_16px_32px_-10px_rgba(217,148,20,0.35)]">
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

      {selectedSpace && (
        <SpaceDetailsModal
          space={selectedSpace}
          onClose={() => setSelectedSpace(null)}
        />
      )}
    </div>
  );
}

export function SpacesCoverFlow() {
  return (
    <section id="espacios" className="relative py-16 sm:py-24 lg:py-28 overflow-hidden scroll-mt-24">
      {/* Fondo: patrón sutil + orbes flotantes */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.5] dark:opacity-[0.35] [background-image:radial-gradient(circle,rgba(217,148,20,0.14)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]"
      />
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10%] bg-[radial-gradient(circle_at_82%_16%,rgba(217,148,20,0.16),transparent_45%)] animate-drift-a" />
        <div className="absolute -inset-[10%] bg-[radial-gradient(circle_at_10%_85%,rgba(191,62,33,0.12),transparent_42%)] animate-drift-b" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-5xl h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(217,148,20,0.10),transparent_65%)]" />
      </div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16 text-center">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-4">
            <BrandMark />
            Recorre Nuestros Espacios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Un vistazo a tus espacios
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
            Explora los ambientes disponibles en Work Services:
            salas de reuniones, sala de conferencias y oficinas privadas.
          </p>
        </div>

        {/* 3D Cards */}
        <SpacesCards />
      </div>
    </section>
  );
}
