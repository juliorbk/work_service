'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function BookingCTA() {
  return (
    <section className="py-24 lg:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left content */}
          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight text-foreground">
              Ready to reserve your space?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Our streamlined booking process makes it simple to reserve the perfect space for your next meeting, collaborative session, or corporate event.
            </p>

            {/* Features list */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <span className="text-foreground font-medium">Instant confirmation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <span className="text-foreground font-medium">Flexible cancellation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <span className="text-foreground font-medium">24/7 support</span>
              </div>
            </div>

            <Link href="/work-service/booking">
              <Button size="lg" className="bg-primary-container hover:bg-primary text-white px-8 h-12 text-base group">
                Start Booking
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Right visual */}
          <div className="flex-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">30s</div>
                  <p className="text-xs text-muted-foreground">Average booking time</p>
                </div>
              </div>
              <div className="h-48 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">100%</div>
                  <p className="text-xs text-muted-foreground">Satisfaction rate</p>
                </div>
              </div>
              <div className="col-span-2 h-40 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                  <p className="text-xs text-muted-foreground">Available for reservations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
