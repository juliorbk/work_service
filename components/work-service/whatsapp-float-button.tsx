'use client';

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const WHATSAPP_URL = 'https://wa.me/58XXXXXXXXXX';

export function WhatsAppFloatButton() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
    >
      <MessageCircle className="w-7 h-7" />
    </Link>
  );
}
