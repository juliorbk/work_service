'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Espacios', href: '#espacios' },
    { label: 'Planes', href: '#pricing' },
    { label: 'Sedes', href: '#locations' },
  ];

  const linkClasses =
    'rounded-full px-3 py-2 text-sm font-sans text-secondary hover:text-primary hover:bg-muted/70 focus-visible:text-primary focus-visible:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-colors duration-200 ease-in-out';

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Isla acrílica */}
        <nav
          aria-label="Navegación principal"
          className={`acrylic relative rounded-2xl md:rounded-full transition-shadow duration-300 ease-in-out ${
            scrolled ? 'acrylic-raised' : ''
          }`}
        >
          <div
            className={`flex justify-between items-center px-3 sm:px-4 transition-all duration-300 ease-in-out ${
              scrolled ? 'h-14' : 'h-16 md:h-[72px]'
            }`}
          >
            {/* Logo: original para modo claro, variante recoloreada para el acrílico oscuro */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 p-1 -m-1"
            >
              <Image
                src="/work-services-logo.png"
                alt="Work Service"
                width={316}
                height={130}
                className={`w-auto max-w-[40vw] sm:max-w-[180px] object-contain transition-all duration-300 ease-in-out dark:hidden ${
                  scrolled ? 'h-7 md:h-9' : 'h-8 md:h-10'
                }`}
              />
              <Image
                src="/work-services-logo-on-dark.png"
                alt="Work Service"
                width={316}
                height={130}
                className={`w-auto max-w-[40vw] sm:max-w-[180px] object-contain transition-all duration-300 ease-in-out hidden dark:block ${
                  scrolled ? 'h-7 md:h-9' : 'h-8 md:h-10'
                }`}
              />
            </Link>

            {/* Navegación desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />

              <Link
                href="/booking"
                className="btn-premium hidden sm:inline-flex bg-primary-container text-white px-6 py-2.5 rounded-full font-medium text-sm tracking-[0.05em] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Reservar Ahora
              </Link>

              {/* Botón menú móvil */}
              <button
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
                className="btn-press md:hidden text-foreground w-11 h-11 inline-flex items-center justify-center rounded-full hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Menú móvil: lámina acrílica despegada */}
        {isOpen ? (
          <div className="acrylic acrylic-raised animate-menu-in relative md:hidden mt-2 rounded-2xl p-2">
            <div className="space-y-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center min-h-11 px-3 rounded-xl text-base text-secondary hover:text-primary hover:bg-muted/70 focus-visible:text-primary focus-visible:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2 pt-2 mt-2 border-t border-outline-variant/60">
              <Link
                href="/booking"
                className="flex items-center justify-center min-h-11 w-full text-center bg-primary-container text-white px-6 py-3 rounded-xl font-medium text-sm tracking-[0.05em] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Reservar Ahora
              </Link>
              <div className="flex items-center justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
