'use client';

import { BrandMark } from '@/components/ui/brand-mark';
import { cn } from '@/lib/utils';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';

interface GallerySectionProps {
  className?: string;
}

const PHOTOS = [
  { src: '/images/spaces/LOBBY.jpg', title: 'Lobby y Recepción', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-01.jpg', title: 'Instalaciones 01', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-02.jpg', title: 'Instalaciones 02', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-03.jpg', title: 'Instalaciones 03', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-04.jpg', title: 'Instalaciones 04', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-05.jpg', title: 'Instalaciones 05', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-06.jpg', title: 'Instalaciones 06', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-07.jpg', title: 'Instalaciones 07', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-08.jpg', title: 'Instalaciones 08', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-09.jpg', title: 'Instalaciones 09', category: 'Nuestro Espacio' },
  { src: '/images/gallery/foto-10.jpg', title: 'Instalaciones 10', category: 'Nuestro Espacio' },
];

const CARDS = PHOTOS.map((photo, i) => (
  <Card
    key={photo.src}
    card={{
      src: photo.src,
      title: photo.title,
      category: photo.category,
      content: (
        <p className="text-base text-neutral-600 dark:text-neutral-300">
          Un vistazo real a lo que pasa cada día en los espacios de Work Services:
          ambientes de trabajo, clientes, sesiones de fotos, cursos y conferencias.
        </p>
      ),
    }}
    index={i}
  />
));

export function GallerySection({ className }: GallerySectionProps) {

  return (
    <section
      id="galeria"
      className={cn('relative py-16 sm:py-20 lg:py-28 overflow-hidden scroll-mt-24', className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-4">
            <BrandMark />
            Galería
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Así se vive en Work Services
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
            Nuestros espacios, clientes, sesiones de fotos, cursos y conferencias:
            un vistazo real a lo que pasa cada día en Work Services.
          </p>
        </div>
      </div>

      <Carousel items={CARDS} startCentered />
    </section>
  );
}
