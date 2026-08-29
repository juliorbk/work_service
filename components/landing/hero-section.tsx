"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { BRAND, HERO, whatsappUrl } from "@/lib/site-config";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-svh md:min-h-[85svh] flex items-center justify-center overflow-hidden bg-surface-variant pt-24 pb-16 md:pt-28">
      {/* Cielo de Maracaibo: resplandores que el acrílico refracta */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        {/* Video ambiente de las instalaciones */}
        <video
          src="/videos/gallery/video-09.mp4"
          poster="/videos/gallery/video-09.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-60 motion-reduce:hidden"
        />
        <div className="absolute -inset-[10%] bg-[radial-gradient(circle_at_78%_18%,rgba(168,90,0,0.20),transparent_42%)] animate-drift-a" />
        <div className="absolute -inset-[10%] bg-[radial-gradient(circle_at_12%_88%,rgba(0,179,240,0.14),transparent_40%)] animate-drift-b" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <div
          className={`mb-5 sm:mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-xs sm:text-sm text-secondary font-medium tracking-[0.05em]">
            <span className="w-6 sm:w-8 h-px bg-primary/60" aria-hidden />
            {BRAND.name} · {BRAND.slogan}
            <span className="w-6 sm:w-8 h-px bg-primary/60" aria-hidden />
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] sm:leading-[1.1] tracking-[-0.02em] mb-5 sm:mb-6 text-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {HERO.headlineA}
          <br />
          <span className="text-primary-container">{HERO.headlineB}</span>
        </h1>

        {/* Description */}
        <p
          className={`text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {HERO.subheading}
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <AnimatedButton
            href={whatsappUrl(HERO.primaryCta.message)}
            target="_blank"
            rel="noopener noreferrer"
            label={HERO.primaryCta.label}
            icon={MessageCircle}
            interaction="slide-arrow"
            variant="primary"
            className="min-w-[190px] rounded-full"
          />
          <Link
            href={HERO.secondaryCta.href}
            className="btn-premium acrylic relative rounded-full px-8 py-4 font-medium text-sm tracking-[0.05em] text-secondary hover:text-primary hover:border-primary inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {HERO.secondaryCta.label}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Stats */}
        <div
          className={`acrylic relative rounded-2xl mx-auto mt-10 sm:mt-16 max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 px-4 py-5 sm:px-6 sm:py-8 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {HERO.stats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
