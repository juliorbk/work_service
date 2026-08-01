"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-surface-variant">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-20 pointer-events-none">
          <AnimatedSphere />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em]">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            Premium Corporate Portal
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em] mb-6 text-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Elevate Your
          <br />
          Work Experience.
        </h1>

        {/* Description */}
        <p
          className={`text-lg lg:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Premium, architecturally designed workspaces for professionals who
          demand excellence. Streamline your team&apos;s workflow with
          intelligent management tools.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/booking"
            className="btn-premium bg-primary-container text-white px-8 py-4 rounded-md font-medium text-sm tracking-[0.05em] hover:bg-primary inline-flex items-center justify-center gap-2"
          >
            Explore Spaces
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#pricing"
            className="btn-premium bg-white/50 backdrop-blur-sm border border-outline text-secondary px-8 py-4 rounded-md font-medium text-sm tracking-[0.05em] hover:border-primary hover:text-primary inline-flex items-center justify-center"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
