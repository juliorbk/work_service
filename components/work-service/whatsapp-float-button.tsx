'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { WhatsAppBookingDialog } from '@/components/work-service/whatsapp-booking-dialog';

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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl cursor-pointer"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
      <WhatsAppBookingDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}