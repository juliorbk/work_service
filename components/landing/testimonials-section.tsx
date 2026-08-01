"use client";

import { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    quote: "Moving our headquarters to WORK Services was a game-changer. The architectural beauty of the space immediately elevates our brand in the eyes of visiting clients, while the tech infrastructure is flawless.",
    author: "Sarah Jenkins",
    role: "Director of Operations",
    company: "TechFlow",
  },
  {
    quote: "As a solo consultant, I needed a space that offered both quiet areas for deep work and impressive meeting rooms for pitches. The monthly coworking plan delivers exactly that, with a premium feel throughout.",
    author: "Marcus Thorne",
    role: "Independent Consultant",
    company: "",
  },
  {
    quote: "The conference facilities here are unmatched. The AV equipment always works, the design is sophisticated, and the staff ensures every meeting we host feels like a VIP experience for our guests.",
    author: "Elena Rodriguez",
    role: "VP Sales",
    company: "GlobalReach",
  },
];

export function TestimonialsSection() {
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
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-surface-container-highest overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-surface-container-high/50 to-transparent pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] uppercase mb-6">
            Member Perspectives
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            What our members say
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={item.author}
              className={`hover-lift bg-surface-container-lowest p-6 lg:p-8 rounded-lg border border-outline-variant relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote icon */}
              <span className="text-primary-container/20 text-6xl absolute top-4 right-4 leading-none font-serif">
                &ldquo;
              </span>

              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center font-semibold text-on-surface-variant">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{item.author}</h4>
                  <p className="text-xs text-secondary">
                    {item.role}{item.company ? `, ${item.company}` : ""}
                  </p>
                </div>
              </div>

              <p className="text-sm text-secondary leading-relaxed relative z-10 italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
