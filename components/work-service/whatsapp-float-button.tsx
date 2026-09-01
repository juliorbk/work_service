'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';

const WhatsAppBookingDialog = dynamic(
  () =>
    import('@/components/work-service/whatsapp-booking-dialog').then(
      (mod) => mod.WhatsAppBookingDialog
    ),
  { ssr: false }
);

export function WhatsAppFloatButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Reservar por WhatsApp"
        className="btn-elev fixed right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl cursor-pointer"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <WhatsAppIcon className="w-7 h-7" />
      </button>
      {open && <WhatsAppBookingDialog open onClose={() => setOpen(false)} />}
    </>
  );
}