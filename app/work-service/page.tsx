'use client';

import { Navigation } from "@/components/landing/navigation";
import { WorkServiceHero } from "@/components/work-service/hero";
import { ServicesShowcase } from "@/components/work-service/services-showcase";
import { BookingCTA } from "@/components/work-service/booking-cta";
import { WorkServiceFooter } from "@/components/work-service/footer";

export default function WorkServicePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <WorkServiceHero />
      <ServicesShowcase />
      <BookingCTA />
      <WorkServiceFooter />
    </main>
  );
}
