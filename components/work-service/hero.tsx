import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedButton } from '@/components/ui/animated-button';

export function WorkServiceHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Eyebrow */}
        <div className="mb-6 inline-block">
          <span className="text-sm font-medium text-secondary tracking-wider uppercase">
            Coworking en Maracaibo
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-[2rem] sm:text-6xl lg:text-7xl font-bold leading-[1.2] sm:leading-tight text-foreground mb-8 max-w-4xl tracking-tight">
          Tu espacio de trabajo
          <span className="block text-primary">en el corazón de Maracaibo</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Renta oficinas privadas, espacios de coworking, talleres y áreas creativas con Work Services. Cada detalle diseñado para que trabajes, colabores y crezcas.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <AnimatedButton
            href="/booking"
            label="Reservar Ahora"
            icon={ArrowRight}
            interaction="slide-arrow"
            variant="primary"
            className="w-full sm:w-auto px-8 h-12 text-base min-h-11"
          />
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base border-secondary text-foreground hover:bg-muted w-full sm:w-auto min-h-11"
          >
            Ver Espacios
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 border-t border-border">
          <div className="min-w-0">
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-2">50+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Espacios Premium</p>
          </div>
          <div className="min-w-0">
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-2">1000+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Clientes Corporativos</p>
          </div>
          <div className="min-w-0">
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-2">100%</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Satisfacción del Cliente</p>
          </div>
        </div>
      </div>
    </section>
  );
}
