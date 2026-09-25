'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { Play } from 'lucide-react';
import { BrandMark } from '@/components/ui/brand-mark';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { PublishEventCta } from '@/components/work-service/publish-event-cta';
import { whatsappUrl } from '@/lib/site-config';
import { cn } from '@/lib/utils';

interface EventsSectionProps {
  className?: string;
}

interface EventVideo {
  title: string;
  duration: string;
  src: string;
  poster: string;
  /** Empresa que paga por publicar el video (espacio publicitario). */
  sponsor: string;
}

const EVENTS: EventVideo[] = [
  { title: 'Publicidad y Eventos', duration: '0:58', src: '/videos/gallery/publicidad-eventos.mp4', poster: '/videos/gallery/publicidad-eventos.jpg', sponsor: 'Agencia Creativa' },
  { title: 'Entrevista', duration: '0:05', src: '/videos/gallery/entrevista.mp4', poster: '/videos/gallery/entrevista.jpg', sponsor: 'Medio Digital' },
  { title: 'Publicidad', duration: '0:08', src: '/videos/gallery/publicidad.mp4', poster: '/videos/gallery/publicidad.jpg', sponsor: 'Marca Local' },
  { title: 'Curso', duration: '0:09', src: '/videos/gallery/curso.mp4', poster: '/videos/gallery/curso.jpg', sponsor: 'Academia Pro' },
  { title: 'Evento', duration: '0:55', src: '/videos/gallery/video-01.mp4', poster: '/videos/gallery/video-01.jpg', sponsor: 'Empresa Aliada' },
  { title: 'Evento', duration: '0:09', src: '/videos/gallery/video-02.mp4', poster: '/videos/gallery/video-02.jpg', sponsor: 'Empresa Aliada' },
  { title: 'Evento', duration: '0:17', src: '/videos/gallery/video-03.mp4', poster: '/videos/gallery/video-03.jpg', sponsor: 'Empresa Aliada' },
  { title: 'Evento', duration: '0:09', src: '/videos/gallery/video-04.mp4', poster: '/videos/gallery/video-04.jpg', sponsor: 'Empresa Aliada' },
  { title: 'Evento', duration: '0:24', src: '/videos/gallery/video-05.mp4', poster: '/videos/gallery/video-05.jpg', sponsor: 'Empresa Aliada' },
  { title: 'Evento', duration: '0:12', src: '/videos/gallery/video-07.mp4', poster: '/videos/gallery/video-07.jpg', sponsor: 'Empresa Aliada' },
  { title: 'Evento', duration: '0:10', src: '/videos/gallery/video-08.mp4', poster: '/videos/gallery/video-08.jpg', sponsor: 'Empresa Aliada' },
  { title: 'Evento', duration: '0:08', src: '/videos/gallery/video-09.mp4', poster: '/videos/gallery/video-09.jpg', sponsor: 'Empresa Aliada' },
];

/**
 * Video con carga diferida: muestra solo el poster hasta que el usuario
 * le da play, así no se descarga nada de video en el arranque de la página.
 */
function LazyVideo({
  src,
  poster,
  title,
  className,
}: {
  src: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    setPlaying(false);
  }, [src]);

  return (
    <div className={cn('group relative overflow-hidden', className)}>
      <video
        ref={videoRef}
        src={playing ? src : undefined}
        poster={poster}
        controls={playing}
        playsInline
        preload="none"
        aria-label={title}
        className="h-full w-full bg-black object-contain"
      />
      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Reproducir ${title}`}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-xl transition-transform duration-200 group-hover:scale-105">
            <Play className="h-7 w-7 translate-x-0.5 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * Reel que solo se monta cuando entra al viewport (IntersectionObserver):
 * no carga nada hasta ser enfocado en el scroll; al enfocarse, se reproduce
 * silenciado y en bucle (salvo preferencia de movimiento reducido).
 */
function ReelInView({
  src,
  poster,
  title,
  className,
}: {
  src: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px', threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={cn('group relative overflow-hidden', className)}>
      {loaded ? (
        <video
          src={src}
          poster={poster}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          controls
          preload="auto"
          aria-label={title}
          className="h-full w-full bg-black object-contain"
        />
      ) : (
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full bg-black object-contain"
        />
      )}
    </div>
  );
}

export function EventsSection({ className }: EventsSectionProps) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
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

        {/* Reel destacado de Work Services */}
        <div className="mb-10 lg:mb-14">
          <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-3 sm:p-4">
            <ReelInView
              src="/videos/gallery/reel.mp4"
              poster="/videos/gallery/reel.jpg"
              title="Reel de Work Services"
              className="mx-auto aspect-[9/16] h-[55svh] max-h-[560px] w-auto overflow-hidden rounded-xl shadow-2xl"
            />
          </div>
          <div className="mt-4 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d99414]/10 px-3 py-1 text-xs font-semibold text-[#a8720f]">
              Reel oficial de Work Services
            </span>
            <p className="mt-2 max-w-xl text-sm text-secondary">
              Un vistazo en video a los espacios, el ambiente y la energía de
              Work Services.
            </p>
          </div>
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
                  onClick={() => {
                    setActive(i);
                    track('event_select', { title: event.title, sponsor: event.sponsor, section: 'videos' });
                  }}
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
                    <span className="mt-0.5 block truncate text-xs text-secondary/70">
                      Patrocinado por {event.sponsor}
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
          <div className="min-w-0">
            <div className="flex items-center justify-center rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-4 sm:p-6">
              <LazyVideo
                key={current.src}
                src={current.src}
                poster={current.poster}
                title={current.title}
                className="max-h-[72vh] w-auto max-w-full rounded-xl shadow-2xl"
              />
            </div>
            <div className="mt-4 px-1">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <p className="font-semibold text-foreground">{current.title}</p>
                <p className="text-secondary">
                  {active + 1} / {EVENTS.length}
                </p>
              </div>
              <p className="mt-1 text-sm text-secondary">
                Patrocinado por{' '}
                <span className="font-medium text-foreground">{current.sponsor}</span>
              </p>
              <a
                href={whatsappUrl(
                  `¡Hola! Quiero más información sobre el video/evento "${current.title}" (patrocinado por ${current.sponsor}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track('event_click', {
                    title: current.title,
                    sponsor: current.sponsor,
                    section: 'videos',
                  })
                }
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1eb958]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* CTA de venta del espacio publicitario */}
        <PublishEventCta section="videos" />
      </div>
    </section>
  );
}
