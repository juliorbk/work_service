'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Play } from 'lucide-react';
import { BrandMark } from '@/components/ui/brand-mark';
import { cn } from '@/lib/utils';

interface EventsSectionProps {
  className?: string;
}

interface EventVideo {
  title: string;
  duration: string;
  src: string;
  poster: string;
}

const EVENTS: EventVideo[] = [
  { title: 'Evento 01', duration: '0:55', src: '/videos/gallery/video-01.mp4', poster: '/videos/gallery/video-01.jpg' },
  { title: 'Evento 02', duration: '0:09', src: '/videos/gallery/video-02.mp4', poster: '/videos/gallery/video-02.jpg' },
  { title: 'Evento 03', duration: '0:17', src: '/videos/gallery/video-03.mp4', poster: '/videos/gallery/video-03.jpg' },
  { title: 'Evento 04', duration: '0:09', src: '/videos/gallery/video-04.mp4', poster: '/videos/gallery/video-04.jpg' },
  { title: 'Evento 05', duration: '0:24', src: '/videos/gallery/video-05.mp4', poster: '/videos/gallery/video-05.jpg' },
  { title: 'Evento 06', duration: '0:22', src: '/videos/gallery/video-06.mp4', poster: '/videos/gallery/video-06.jpg' },
  { title: 'Evento 07', duration: '0:12', src: '/videos/gallery/video-07.mp4', poster: '/videos/gallery/video-07.jpg' },
  { title: 'Evento 08', duration: '0:10', src: '/videos/gallery/video-08.mp4', poster: '/videos/gallery/video-08.jpg' },
  { title: 'Evento 09', duration: '0:08', src: '/videos/gallery/video-09.mp4', poster: '/videos/gallery/video-09.jpg' },
];

export function EventsSection({ className }: EventsSectionProps) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFirstRender = useRef(true);

  const current = EVENTS[active];

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  useEffect(() => {
    const container = playerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se lee el ref en el callback para apuntar siempre al <video> montado
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="eventos" className={cn('relative py-16 sm:py-20 lg:py-28 bg-surface-container-low overflow-hidden scroll-mt-24', className)}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16 text-center">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-4">
            <BrandMark />
            Eventos Destacados
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Eventos, cursos y conferencias
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
            Conferencias, talleres, capacitaciones y sesiones especiales que
            suceden en los espacios de Work Services.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-10">
          {/* Lista de eventos */}
          <div
            ref={listRef}
            role="listbox"
            aria-label="Lista de videos de eventos"
            className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory lg:mx-0 lg:px-0 lg:pb-0 lg:snap-none lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:max-h-[72vh] lg:pr-2"
          >
            {EVENTS.map((event, i) => {
              const isActive = i === active;
              return (
                <button
                  key={event.src}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  data-active={isActive}
                  onClick={() => setActive(i)}
                  className={cn(
                    'group flex shrink-0 snap-center lg:snap-align-none lg:shrink lg:w-full items-center gap-4 rounded-xl border p-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive
                      ? 'border-primary/60 bg-primary/5'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/40 hover:bg-muted/50'
                  )}
                >
                  <span className="relative shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={event.poster}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-20 w-14 object-cover"
                    />
                    {!isActive && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <Play className="h-4 w-4 translate-x-px fill-white text-white" />
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block truncate text-sm font-semibold',
                        isActive ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {event.title}
                    </span>
                    <span className="mt-1 block text-xs text-secondary">
                      {event.duration} min · video
                    </span>
                  </span>
                  {isActive && (
                    <span className="hidden lg:flex h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  )}
                </button>
              );
            })}
          </div>

          {/* Reproductor */}
          <div ref={playerRef} className="min-w-0">
            <div className="flex items-center justify-center rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-4 sm:p-6">
              <video
                ref={videoRef}
                key={current.src}
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                preload="metadata"
                aria-label={current.title}
                className="max-h-[72vh] w-auto max-w-full rounded-xl shadow-2xl"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-sm">
              <p className="font-semibold text-foreground">{current.title}</p>
              <p className="text-secondary">
                {active + 1} / {EVENTS.length}
              </p>
            </div>
          </div>
        </div>

        {/* Nota inferior */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2 text-sm text-secondary text-center px-4">
          <CalendarDays className="w-4 h-4 shrink-0" />
          <span>Organiza tu evento con nosotros: desde 50 hasta 120 personas</span>
        </div>
      </div>
    </section>
  );
}