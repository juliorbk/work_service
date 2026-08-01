'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface ServiceCard {
  title: string;
  description: string;
  image: string;
  features: string[];
  capacity?: string;
}

const services: ServiceCard[] = [
  {
    title: 'Coworking Spaces',
    description: 'Flexible professional environments designed for focused work and productivity.',
    image: '/placeholder.svg?height=400&width=600',
    features: [
      'High-speed internet',
      'Climate control',
      'Meeting access',
      'Professional ambiance',
    ],
    capacity: 'Desks for 1-10 professionals',
  },
  {
    title: 'Meeting Rooms',
    description: 'State-of-the-art private rooms equipped with premium AV technology.',
    image: '/placeholder.svg?height=400&width=600',
    features: [
      '4K video conferencing',
      'Premium audio system',
      'Whiteboard technology',
      'Secure & private',
    ],
    capacity: 'Capacity: 4-20 people',
  },
  {
    title: 'Seminar Halls',
    description: 'Large-capacity venues perfect for corporate events and professional presentations.',
    image: '/placeholder.svg?height=400&width=600',
    features: [
      'Full event setup',
      'Professional AV suite',
      'Catering services',
      'Flexible layout options',
    ],
    capacity: 'Capacity: 50-500 people',
  },
];

export function ServicesShowcase() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Our Services
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Premium Workspace Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From intimate professional desks to grand seminar halls, we provide exceptional corporate spaces tailored to your needs.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 flex flex-col"
            >
              {/* Image container */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-3 mb-6 flex-1">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Capacity badge */}
                {service.capacity && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-medium text-secondary uppercase tracking-wide">
                      {service.capacity}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
