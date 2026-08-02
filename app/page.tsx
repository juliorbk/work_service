import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { SpacesCoverFlow } from "@/components/work-service/spaces-coverflow";
import { EventsSection } from "@/components/work-service/events-section";
import { LocationSection } from "@/components/landing/location-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SpacesCoverFlow />
      <EventsSection />
      <LocationSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
