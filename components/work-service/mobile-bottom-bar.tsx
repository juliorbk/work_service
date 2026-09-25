'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';

const WhatsAppBookingDialog = dynamic(
  () =>
    import('@/components/work-service/whatsapp-booking-dialog').then(
      (mod) => mod.WhatsAppBookingDialog
    ),
  { ssr: false }
);

/**
 * Barra de conversión fija para móvil (solo < md).
 * Da acceso inmediato a Reservas y a la reservación por WhatsApp sin que el
 * cliente tenga que hacer scroll hasta el CTA final. En desktop no se muestra.
 */
export function MobileBottomBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith('/admin') || pathname === '/booking') {
    return null;
  }

  return (
    <>
      {/* Espaciador en flujo: evita que la barra tape el pie de página */}
      <div
        aria-hidden
        className="md:hidden h-[calc(4.75rem+env(safe-area-inset-bottom))]"
      />
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/60 bg-background/85 backdrop-blur-xl animate-menu-in px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Reservar por WhatsApp"
            className="btn-elev flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </button>
          <Link
            href="/booking"
            className="btn-premium flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary-container text-primary-foreground text-sm font-medium tracking-[0.05em] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <CalendarCheck className="h-4 w-4" />
            Reservar Ahora
          </Link>
        </div>
      </div>
      {open && <WhatsAppBookingDialog open onClose={() => setOpen(false)} />}
    </>
  );
}