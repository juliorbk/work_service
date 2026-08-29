'use client';

import { Navigation } from '@/components/landing/navigation';
import { BookingFlow } from '@/components/work-service/booking-flow';
import { FooterSection } from '@/components/landing/footer-section';

export default function BookingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <BookingFlow />
      <FooterSection />
    </main>
  );
}
