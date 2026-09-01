'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Play, Users } from 'lucide-react';
import { Button, Modal } from '@heroui/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { WhatsAppBookingButton } from '@/components/work-service/whatsapp-booking-dialog';
import type { Space } from '@/components/landing/spaces-data';
import { cn } from '@/lib/utils';

interface SpaceDetailsModalProps {
  space: Space | null;
  onClose: () => void;
}

export function SpaceDetailsModal({ space, onClose }: SpaceDetailsModalProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    setCurrent(0);
  }, [space]);

  const hasGallery = !!space && space.gallery.length > 1;

  return (
    <Modal>
      <Modal.Backdrop isOpen={!!space} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <Modal.Container scroll="inside">
          <Modal.Dialog
            className="acrylic sm:max-w-4xl p-0 gap-0 overflow-y-auto"
            aria-describedby={undefined}
          >
            <Modal.CloseTrigger />
            {space && (
              <div className="grid md:grid-cols-2 gap-0">
            {/* Galería */}
            <div className="relative bg-muted flex flex-col">
              <div className="relative flex-1">
                <Carousel className="w-full h-full" setApi={setApi}>
                  <CarouselContent className="h-full">
                    {space.gallery.map((media, i) => (
                      <CarouselItem key={i} className="h-full">
                        {media.type === 'video' ? (
                          <video
                            src={media.src}
                            poster={media.poster}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full aspect-video md:aspect-auto md:min-h-[420px] bg-black object-contain"
                          />
                        ) : (
                          <img
                            src={media.src}
                            alt={`${space.title} — foto ${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full aspect-[4/3] sm:aspect-[3/2] md:aspect-auto md:min-h-[420px] object-cover"
                          />
                        )}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {hasGallery && (
                    <>
                      {/* En móvil el swipe nativo + dots reemplazan las flechas */}
                      <CarouselPrevious className="hidden md:inline-flex -left-4" />
                      <CarouselNext className="hidden md:inline-flex -right-4" />
                    </>
                  )}
                </Carousel>

                <span className="acrylic absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  {space.capacity}
                </span>

                {hasGallery && (
                  <span className="acrylic absolute bottom-4 right-4 rounded-full px-2.5 py-1 text-xs font-semibold text-foreground tabular-nums">
                    {current + 1} / {space.gallery.length}
                  </span>
                )}

                {/* Dots para móvil */}
                {hasGallery && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 md:hidden">
                    {space.gallery.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => api?.scrollTo(i)}
                        aria-label={`Ir a la foto ${i + 1}`}
                        aria-current={current === i}
                        className="p-1.5 cursor-pointer border-0 bg-transparent rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        <span
                          className={cn(
                            'block rounded-full h-1.5 transition-all duration-300',
                            current === i ? 'w-5 bg-primary' : 'w-1.5 bg-outline-variant'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mini carrusel de miniaturas (solo desktop; en móvil swipe + dots) */}
              {hasGallery && (
                <div className="hidden md:flex gap-2 px-3 py-3 overflow-x-auto bg-surface-container-lowest/70">
                  {space.gallery.map((media, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => api?.scrollTo(i)}
                      aria-label={`Ver foto ${i + 1} de ${space.title}`}
                      aria-current={current === i}
                      className={cn(
                        'shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer',
                        current === i
                          ? 'border-primary opacity-100 ring-2 ring-primary/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      )}
                    >
                      {media.type === 'video' ? (
                        <video
                          src={media.src}
                          poster={media.poster}
                          muted
                          preload="metadata"
                          className="w-16 h-12 object-cover"
                        />
                      ) : (
                        <img
                          src={media.src}
                          alt=""
                          loading="lazy"
                          className="w-16 h-12 object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

                {/* Información */}
                <div className="p-6 lg:p-8 flex flex-col">
                  <Modal.Heading className="text-2xl lg:text-3xl font-bold text-foreground">
                    {space.title}
                  </Modal.Heading>
                  <p className="mt-3 text-secondary leading-relaxed">
                    {space.description}
                  </p>

              {/* Características */}
              <div className="mt-6 space-y-2.5">
                {space.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary-container/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Tarifas */}
              <div className="mt-8 pt-6 border-t border-outline-variant">
                <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-4">
                  Tarifas
                </h4>
                <div className="space-y-3">
                  {space.pricing.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="text-sm text-foreground">{item.label}</span>
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-outline-variant space-y-3">
                <Link href="/booking" className="block w-full">
                  <Button className="w-full bg-primary-container hover:bg-primary text-primary-foreground min-h-11">
                    Reservar este espacio
                  </Button>
                </Link>
                <WhatsAppBookingButton
                  label="Reservar por WhatsApp"
                  defaultSpace={space.title}
                  className="w-full bg-[#25D366] hover:bg-[#1eb958] text-white min-h-11"
                />
                <p className="flex items-center justify-center gap-1.5 text-xs text-secondary">
                  <Play className="w-3 h-3" />
                  Sin compromiso · Confirmación inmediata
                </p>
              </div>
            </div>
          </div>
        )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
