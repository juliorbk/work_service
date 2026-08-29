"use client";

import { useEffect, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/lib/site-config";

export function FaqSection() {
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
      id="faq"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-surface-container-low overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div
          className={`text-center mb-10 sm:mb-12 lg:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-4">
            <HelpCircle className="w-4 h-4 text-accent" />
            Resolvemos tus dudas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {FAQ.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
            {FAQ.subtitle}
          </p>
        </div>

        {/* Acordeón */}
        <div
          className={`max-w-3xl mx-auto rounded-2xl border border-outline-variant bg-surface-container-lowest divide-y divide-outline-variant overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQ.items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="border-b border-outline-variant last:border-b-0"
              >
                <AccordionTrigger className="px-4 sm:px-6 py-4 sm:py-5 min-h-11 text-sm sm:text-base font-semibold text-foreground hover:no-underline hover:text-primary transition-colors [&>svg]:text-secondary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-5 text-sm sm:text-base text-secondary leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
