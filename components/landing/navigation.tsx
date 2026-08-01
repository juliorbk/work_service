'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Memberships', href: '#pricing' },
    { label: 'Locations', href: '#locations' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b border-outline-variant transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-[12px] shadow-sm'
          : 'bg-surface'
      }`}
    >
      <div className="flex justify-between items-center h-20 px-6 lg:px-10 max-w-[1280px] mx-auto transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/work-services-logo.png"
            alt="Work Services"
            width={120}
            height={48}
            className="h-12 w-auto object-contain"
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
        <div className="flex items-center gap-4">
          <Link
            href="/booking"
            className="btn-premium hidden sm:inline-flex bg-primary-container text-white px-6 py-3 rounded-md font-medium text-sm tracking-[0.05em] hover:bg-primary"
          >
            Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-outline-variant bg-surface px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-body-md text-secondary hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="block w-full text-center bg-primary-container text-white px-6 py-3 rounded-md font-medium text-sm tracking-[0.05em] hover:bg-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
