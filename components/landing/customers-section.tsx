"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BrandMark } from "@/components/ui/brand-mark";
import { cn } from "@/lib/utils";

const CUSTOMER_LOGOS = [
  "/images/customers_logos/customer_1.png",
  "/images/customers_logos/customer_2.png",
  "/images/customers_logos/customer_3.png",
  "/images/customers_logos/customer_4.png",
  "/images/customers_logos/customer_5.png",
  "/images/customers_logos/customer_6.png",
  "/images/customers_logos/customer_7.png",
  "/images/customers_logos/customer_8.png",
  "/images/customers_logos/customer_9.png",
  "/images/customers_logos/customer_10.png",
];

export function CustomersSection() {
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
      id="clientes"
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-20 bg-surface-container-lowest overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className={`text-center mb-8 sm:mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-3">
            <BrandMark />
            Confianza
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Empresas que respaldan a Work Services
          </h2>
          <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
            Profesionales y empresas confían en los espacios y servicios de
            Work Services cada día.
          </p>
        </div>
      </div>

      {/* Cinta de logos */}
      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="relative marquee-hover">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--surface-container-lowest)] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--surface-container-lowest)] to-transparent pointer-events-none z-10" />

          <div className="flex w-max items-center marquee-tape-reverse py-1">
            {[...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS].map((src, index) => {
              const isDuplicate = index >= CUSTOMER_LOGOS.length;
              return (
                <div
                  key={`${src}-${index}`}
                  aria-hidden={isDuplicate || undefined}
                  className="mr-4 sm:mr-6 shrink-0 w-[140px] sm:w-[180px] h-16 sm:h-20 bg-white border border-outline-variant/60 rounded-xl flex items-center justify-center p-4 sm:p-5"
                >
                  <Image
                    src={src}
                    alt={isDuplicate ? "" : `Logo de cliente de Work Services ${index + 1}`}
                    width={800}
                    height={320}
                    className={cn(
                      "w-full h-full object-contain",
                      isDuplicate && "pointer-events-none"
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}