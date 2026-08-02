'use client';

import Link from 'next/link';
import { Check, Play, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import type { Space } from '@/components/landing/spaces-data';

interface SpaceDetailsModalProps {
  space: Space | null;
  onClose: () => void;
}

export function SpaceDetailsModal({ space, onClose }: SpaceDetailsModalProps) {
  return (
    <Dialog open={!!space} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-4xl max-h-[85vh] overflow-y-auto p-0 gap-0"
        aria-describedby={undefined}
      >
        {space && (
          <div className="grid md:grid-cols-2 gap-0">
            {/* Galería */}
            <div className="relative bg-muted md:min-h-[480px]">
              <Carousel className="w-full h-full">
                <CarouselContent>
                  {space.gallery.map((media, i) => (
                    <CarouselItem key={i}>
                      {media.type === 'video' ? (
                        <video
                          src={media.src}
                          poster={media.poster}
                          controls
                          className="w-full h-[280px] md:h-[480px] object-cover"
                        />
                      ) : (
                        <img
                          src={media.src}
                          alt={`${space.title} — foto ${i + 1}`}
                          className="w-full h-[280px] md:h-[480px] object-cover"
                        />
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {space.gallery.length > 1 && (
                  <>
                    <CarouselPrevious className="-left-3 md:-left-4" />
                    <CarouselNext className="-right-3 md:-right-4" />
                  </>
                )}
              </Carousel>

              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-outline-variant px-3 py-1.5 text-xs font-semibold text-foreground">
                <Users className="w-3.5 h-3.5 text-primary" />
                {space.capacity}
              </span>
            </div>

            {/* Información */}
            <div className="p-6 lg:p-8 flex flex-col">
              <DialogTitle className="text-2xl lg:text-3xl font-bold text-foreground">
                {space.title}
              </DialogTitle>
              <DialogDescription className="mt-3 text-secondary leading-relaxed">
                {space.description}
              </DialogDescription>

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
              <div className="mt-8 pt-6 border-t border-outline-variant">
                <Link href="/booking" className="block w-full">
                  <Button className="w-full bg-primary-container hover:bg-primary text-white min-h-11">
                    Reservar este espacio
                  </Button>
                </Link>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-secondary">
                  <Play className="w-3 h-3" />
                  Sin compromiso · Confirmación inmediata
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
