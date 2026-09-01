"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { AnimatedTetrahedron } from "./animated-tetrahedron";
import { PRICING, spaceBookingMessage, whatsappUrl } from "@/lib/site-config";

const FEATURED_SPACE_ID = "coworking";

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-surface-container-lowest overflow-hidden scroll-mt-24"
    >
      <div className="absolute -left-28 top-1/2 -translate-y-1/2 w-[460px] h-[460px] lg:w-[600px] lg:h-[600px] opacity-30 pointer-events-none hidden lg:block">
        <AnimatedTetrahedron />
      </div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div
          className={`text-center mb-10 sm:mb-14 lg:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-4">
            <BrandMark />
            {PRICING.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Un espacio para cada <span className="text-primary-container">necesidad</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mx-auto">
            {PRICING.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {PRICING.spaces.map((space, idx) => {
            const isFeatured = space.id === FEATURED_SPACE_ID;
            return (
              <div
                key={space.id}
                className={`h-full transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`relative flex flex-col bg-surface-container-lowest border rounded-xl p-6 sm:p-8 h-full transition-all duration-300 hover-lift ${
                    isFeatured
                      ? "border-primary-container shadow-[0_16px_40px_-16px_rgba(217,148,20,0.25)]"
                      : "border-outline-variant hover:border-primary-container/50"
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-container text-primary-foreground px-4 py-1 text-xs font-semibold tracking-wide">
                      Más popular
                    </span>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {space.name}
                    </h3>
                    <p className="text-sm text-secondary">{space.description}</p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-outline-variant">
                    <div className="flex items-baseline gap-1.5 min-w-0 flex-wrap">
                      <span className="text-4xl lg:text-5xl font-bold text-primary-container">
                        {space.price}
                      </span>
                      <span className="text-sm text-secondary">
                        {space.period}
                        {space.unitNote ? ` ${space.unitNote}` : ""}
                      </span>
                    </div>
                    <span className="text-xs text-secondary/80 mt-1 block">USD</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {space.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-sm text-secondary"
                      >
                        <span className="text-primary shrink-0 mt-0.5">
                          <Check className="w-4 h-4" />
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappUrl(spaceBookingMessage(space.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 text-center rounded-full font-medium text-sm tracking-[0.05em] btn-premium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isFeatured
                        ? "bg-[#25D366] text-white hover:bg-[#1eb958]"
                        : "border border-outline-variant text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <WhatsAppIcon className="w-4 h-4" />
                      {space.cta}
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
