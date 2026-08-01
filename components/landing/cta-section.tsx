"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div
          className={`relative bg-surface-container-lowest border border-outline-variant rounded-lg transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col items-center text-center gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground leading-[1.1]">
                  Ready to elevate your workspace?
                </h2>

                <p className="text-lg text-secondary mb-10 leading-relaxed">
                  Join leading professionals and enterprises transforming how they work.
                  Start your premium membership today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/booking"
                    className="btn-premium bg-primary-container text-white px-8 py-4 rounded-md font-medium text-sm tracking-[0.05em] hover:bg-primary inline-flex items-center gap-2"
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#contact"
                    className="btn-premium border border-outline text-secondary px-8 py-4 rounded-md font-medium text-sm tracking-[0.05em] hover:border-primary hover:text-primary"
                  >
                    Schedule Demo
                  </Link>
                </div>

                <p className="text-sm text-secondary mt-8">
                  No credit card required &bull; 30-day free trial
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
