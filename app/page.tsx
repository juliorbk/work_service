import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { SpacesCoverFlow } from "@/components/work-service/spaces-coverflow";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { WhyUsSection } from "@/components/landing/why-us-section";
import { FacilitiesSection } from "@/components/landing/facilities-section";
import { GallerySection } from "@/components/work-service/gallery-section";
import { EventsSection } from "@/components/work-service/events-section";
import { AboutSection } from "@/components/landing/about-section";
import { MissionVisionSection } from "@/components/landing/mission-vision-section";
import { LocationSection } from "@/components/landing/location-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      {/* 1. Propuesta de valor + CTA principal */}
      <HeroSection />
      {/* 2. El producto: qué pueden alquilar hoy */}
      <SpacesCoverFlow />
      {/* 3. El precio: núcleo de conversión */}
      <PricingSection />
      {/* 4. Prueba social inmediata */}
      <TestimonialsSection />
      {/* 5-6. Confianza: diferenciales e instalaciones */}
      <WhyUsSection />
      <FacilitiesSection />
      {/* 7-8. Deseo: prueba visual y oferta secundaria (eventos) */}
      <GallerySection />
      <EventsSection />
      {/* 9-10. Marca: nosotros y propósito */}
      <AboutSection />
      <MissionVisionSection />
      {/* 11-12. Logística y objeciones justo antes del CTA */}
      <LocationSection />
      <FaqSection />
      {/* 13. Cierre */}
      <CtaSection />
      <FooterSection />
    </main>
  );
}
