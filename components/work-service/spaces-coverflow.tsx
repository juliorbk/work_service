'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { SPACES, type Space } from '@/components/landing/spaces-data';
import { SpaceDetailsModal } from '@/components/work-service/space-details-modal';
import { cn } from '@/lib/utils';

interface SpacesCarouselProps {
  className?: string;
  images?: Space[];
}

const BREAKPOINTS = [
  { match: '(min-width: 640px)', slide: 300, image: 200 },
  { match: '(min-width: 380px)', slide: 240, image: 168 },
  { match: '', slide: 160, image: 132 },
];

function getSize() {
  if (typeof window === 'undefined') return BREAKPOINTS[0];
  const current =
    BREAKPOINTS.find((bp) => bp.match && window.matchMedia(bp.match).matches) ??
    BREAKPOINTS[BREAKPOINTS.length - 1];
  return current;
}

function useResponsiveSize() {
  const [size, setSize] = useState(getSize);

  useEffect(() => {
    const update = () => setSize(getSize());
    const mqls = BREAKPOINTS.filter((b) => b.match).map((b) =>
      window.matchMedia(b.match)
    );
    mqls.forEach((mql) => mql.addEventListener('change', update));
    window.addEventListener('resize', update);
    return () => {
      mqls.forEach((mql) => mql.removeEventListener('change', update));
      window.removeEventListener('resize', update);
    };
  }, []);

  return size;
}

export function SpacesCarousel({
  className = '',
  images = SPACES,
}: SpacesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const { slide: slideWidth, image: imageSize } = useResponsiveSize();

  const active = images[activeIndex];

  const toPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const toNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.min(images.length - 1, prev + 1));
  };

  const toSlide = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActiveIndex(index);
  };

  const openDetails = (e: React.MouseEvent, item: Space) => {
    e.stopPropagation();
    setActiveIndex(images.indexOf(item));
    setSelectedSpace(item);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none',
        className
      )}
    >
      <div
        className="relative h-[220px] sm:h-[300px] flex items-center justify-start overflow-visible"
        style={{ width: `${slideWidth}px` }}
      >
        <motion.div
          className="flex w-fit items-center"
          animate={{ x: -activeIndex * slideWidth }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
        >
          {images.map((item, i) => {
            const isActive = activeIndex === i;
            const diff = i - activeIndex;

            const targetRotate = isHovered ? diff * 20 : diff * 5;
            const targetScale = isActive
              ? isHovered
                ? 1.25
                : 1.15
              : isHovered
                ? 0.6
                : 0.8;
            const targetY = isHovered ? diff * 24 : 0;

            return (
              <motion.div
                key={i}
                className="shrink-0 flex flex-col items-center gap-1.5 will-change-[transform,scale]"
                style={{ width: `${slideWidth}px`, zIndex: 10 - Math.abs(diff) }}
                animate={{ rotate: targetRotate, scale: targetScale, y: targetY }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
              >
                <div
                  className={cn(
                    'text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300',
                    isActive ? 'opacity-100 scale-100 text-foreground' : 'opacity-0 scale-75 text-secondary'
                  )}
                >
                  {item.title}
                </div>

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
                  className="object-cover rounded-xl shadow-[0_16px_32px_-10px_rgba(139,80,0,0.35)] border border-outline-variant cursor-pointer transition-transform duration-300 hover:brightness-95 max-w-full"
                  onClick={(e) => openDetails(e, item)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="acrylic relative mt-4 px-1.5 py-0.5 flex items-center gap-2 justify-center text-secondary rounded-full z-20">
          <button
            onClick={toPrev}
            aria-label="Espacio anterior"
            className="btn-press p-1 cursor-pointer hover:bg-primary-container/10 rounded-full transition-colors border-0 bg-transparent text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <div className="flex justify-center items-center gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={(e) => toSlide(e, i)}
              aria-label={`Ver ${images[i].title}`}
              className={cn(
                'rounded-full cursor-pointer h-1 transition-all duration-300',
                activeIndex === i ? 'w-4 bg-primary' : 'w-1 bg-outline/40 hover:bg-outline'
              )}
            />
          ))}
        </div>
          <button
            onClick={toNext}
            aria-label="Espacio siguiente"
            className="btn-press p-1 cursor-pointer hover:bg-primary-container/10 rounded-full transition-colors border-0 bg-transparent text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Descripción del espacio activo */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-8 sm:mt-10 w-full max-w-2xl mx-auto text-center"
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
            {active.title}
          </h3>
          <p className="text-sm sm:text-base text-secondary leading-relaxed mb-6">
            {active.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full border border-primary-container/40 bg-primary-container/15 px-3 py-1 text-xs font-semibold text-primary">
              {active.capacity}
            </span>
            {active.features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center rounded-full border border-outline-variant bg-surface-container px-3 py-1 text-xs text-secondary"
              >
                {feature}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <SpaceDetailsModal
        space={selectedSpace}
        onClose={() => setSelectedSpace(null)}
      />
    </div>
  );
}

export function SpacesCoverFlow() {
  return (
    <section id="espacios" className="relative py-24 lg:py-32 overflow-hidden scroll-mt-24">
      {/* Resplandor cálido tras el carrusel */}
      <div
        aria-hidden
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-5xl h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(168,90,0,0.10),transparent_65%)] pointer-events-none"
      />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-20 text-center">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-6">
            <Zap className="w-4 h-4 text-accent" />
            Recorre Nuestros Espacios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
            Un vistazo a tus espacios
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mx-auto mt-6 leading-relaxed">
            Explora los ambientes disponibles en la Torre Banco Industrial: lobby,
            salas de reuniones, sala de conferencias y oficinas privadas.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <SpacesCarousel />
        </div>
      </div>
    </section>
  );
}