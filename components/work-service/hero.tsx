'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function WorkServiceHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Eyebrow */}
        <div className="mb-6 inline-block">
          <span className="text-sm font-medium text-secondary tracking-wider uppercase">
            Premium Corporate Spaces
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-8 max-w-4xl tracking-tight">
          Executive Workspaces
          <span className="block text-primary">Built for Excellence</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Reserve premium coworking spaces, private meeting rooms, and professional seminar halls designed for corporate excellence. Every detail crafted for productivity and sophistication.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/work-service/booking">
            <Button size="lg" className="bg-primary-container hover:bg-primary text-white px-8 h-12 text-base group w-full sm:w-auto">
              Book Now
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base border-secondary text-foreground hover:bg-muted w-full sm:w-auto"
          >
            View Spaces
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-2">50+</p>
            <p className="text-sm text-muted-foreground">Premium Spaces</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-2">1000+</p>
            <p className="text-sm text-muted-foreground">Corporate Clients</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-2">100%</p>
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
