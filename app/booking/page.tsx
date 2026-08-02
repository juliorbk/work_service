'use client';

import { Navigation } from '@/components/landing/navigation';
import { BookingFlow } from '@/components/work-service/booking-flow';
import { WorkServiceFooter } from '@/components/work-service/footer';

export default function BookingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <BookingFlow />
      <WorkServiceFooter />
    </main>
  );
}
