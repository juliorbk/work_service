"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Instagram, MapPin, Mail } from "lucide-react";
import { BRAND, whatsappUrl } from "@/lib/site-config";
import { AnimatedLogo } from "@/components/ui/animated-logo";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

const footerLinks = [
  { label: "Política de Privacidad", href: "/privacidad" },
  { label: "Términos de Servicio", href: "/terminos" },
  { label: "Contacto", href: "/booking" },
  { label: "Preguntas Frecuentes", href: "/#faq" },
];

const contactItems = [
  {
    icon: WhatsAppIcon,
    label: BRAND.phoneDisplay,
    href: whatsappUrl(),
    external: true,
  },
  {
    icon: Mail,
    label: BRAND.email,
    href: `mailto:${BRAND.email}`,
    external: false,
  },
  {
    icon: Instagram,
    label: BRAND.instagram,
    href: BRAND.instagramUrl,
    external: true,
  },
];

export function FooterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-surface-container-low w-full border-t border-outline-variant"
    >
      <div
        className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Móvil/tablet: bloques apilados | Desktop: logo | links | contacto */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
          {/* Logo */}
          <Link
            href="/"
            className="inline-flex justify-center sm:justify-start lg:justify-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <AnimatedLogo
              light="/brand/logo-horizontal.png"
              dark="/brand/logo-horizontal-gold.png"
              alt="Work Services"
              width={1400}
              height={441}
              darkHeight={560}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Links: 2 columnas en móvil, fila en desktop */}
          <nav
            aria-label="Enlaces legales"
            className="grid grid-cols-2 gap-x-4 gap-y-1 sm:gap-y-2 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-6"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center text-sm text-secondary hover:text-primary transition-colors min-h-11"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contacto */}
          <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1 lg:items-end lg:gap-2.5">
            <div className="flex items-start gap-2 text-sm text-secondary">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span className="text-left lg:text-right lg:max-w-[260px]">
                Servicio de coworking y oficinas para tu empresa, donde la
                necesites.
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors min-h-11"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className={`border-t border-outline-variant transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm text-secondary text-center py-6 px-4">
          &copy; 2026 PolarisAgency &middot; Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
