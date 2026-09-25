import type { Metadata } from "next";
import { Navigation } from '@/components/landing/navigation';
import { BookingFlow } from '@/components/work-service/booking-flow';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: "Reserva tu Espacio en Maracaibo",
  description:
    "Reserva coworking, oficinas privadas o salas de conferencias en Maracaibo. Confirmación en minutos por WhatsApp o correo, sin pago por adelantado.",
  alternates: {
    canonical: "/booking",
  },
};

export default function BookingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <BookingFlow />
      <FooterSection />
    </main>
  );
}