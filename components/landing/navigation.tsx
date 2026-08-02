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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Espacios', href: '#espacios' },
    { label: 'Planes', href: '#pricing' },
    { label: 'Sedes', href: '#locations' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b border-outline-variant transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-[12px] shadow-sm'
          : 'bg-surface'
      }`}
    >
      <div className="flex justify-between items-center h-16 md:h-20 px-4 sm:px-6 lg:px-10 max-w-[1280px] mx-auto transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/work-services-logo.png"
            alt="Work Service"
            width={140}
            height={56}
            className="h-9 sm:h-14 w-auto max-w-[40vw] sm:max-w-[180px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-md font-sans text-secondary hover:text-primary transition-colors duration-200 ease-in-out"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/booking"
            className="btn-premium hidden sm:inline-flex bg-primary-container text-white px-6 py-3 rounded-md font-medium text-sm tracking-[0.05em] hover:bg-primary-container hover:brightness-95"
          >
            Reservar Ahora
          </Link>

          {/* Mobile Menu Button */}
          <button
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden text-foreground w-11 h-11 inline-flex items-center justify-center rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-outline-variant bg-surface px-4 sm:px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center min-h-11 px-2 text-body-md text-secondary hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="flex items-center justify-center min-h-11 w-full text-center bg-primary-container text-white px-6 py-3 rounded-md font-medium text-sm tracking-[0.05em] hover:bg-primary-container hover:brightness-95 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Reservar Ahora
          </Link>
          <div className="flex items-center justify-center pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
