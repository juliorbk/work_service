'use client';

import { track } from '@vercel/analytics';
import { Megaphone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { whatsappUrl } from '@/lib/site-config';

interface PublishEventCtaProps {
  /** Identificador de la sección para las métricas. */
  section: string;
}

/**
 * Banner de venta del espacio publicitario: invita a las empresas a
 * publicar su evento en la página, con enlace a WhatsApp para cotizar.
 */
export function PublishEventCta({ section }: PublishEventCtaProps) {
  return (
    <div className="mt-8 sm:mt-10">
      <a
        href={whatsappUrl('¡Hola! Quiero publicar mi evento en la página de Work Services. ¿Podrían cotizarme?')}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('advertise_cta_click', { section })}
        className="group flex flex-col items-center justify-between gap-3 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 to-[#d99414]/10 px-6 py-5 text-center transition-colors sm:flex-row sm:text-left"
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Megaphone className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-foreground">¿Quieres publicar tu evento aquí?</p>
            <p className="text-sm text-secondary">
              Espacios publicitarios disponibles. Escríbenos y te cotizamos.
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-[#1eb958]">
          <WhatsAppIcon className="h-4 w-4" />
          Cotizar
        </span>
      </a>
    </div>
  );
}
