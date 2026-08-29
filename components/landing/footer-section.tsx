"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Política de Privacidad", href: "#" },
  { label: "Términos de Servicio", href: "#" },
  { label: "Contacto", href: "#" },
  { label: "Preguntas Frecuentes", href: "#" },
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
        className={`flex flex-col lg:flex-row items-center justify-between gap-8 py-10 px-6 max-w-[1280px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Brand + Links */}
        <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10">
          {/* Logo */}
          {/* Logo: original para modo claro, variante recoloreada para modo oscuro */}
          <Link href="/">
            <Image
              src="/work-services-logo.png"
              alt="Work Service"
              width={316}
              height={130}
              className="h-10 sm:h-14 w-auto object-contain dark:hidden"
            />
            <Image
              src="/work-services-logo-on-dark.png"
              alt="Work Service"
              width={316}
              height={130}
              className="h-10 sm:h-14 w-auto object-contain hidden dark:block"
            />
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center min-h-11 text-sm text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col items-center lg:items-end gap-2">
          <div className="flex items-start gap-2 text-sm text-secondary">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <span className="text-center lg:text-right">
              Torre Banco Industrial, Av. 9B con 5 de Julio, Maracaibo, Zulia, Venezuela
            </span>
          </div>
          <a
            href="https://www.instagram.com/workservicesve/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors min-h-11"
          >
            <Instagram className="w-4 h-4" />
            @workservicesve
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div
        className={`border-t border-outline-variant transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm text-secondary text-center py-6 px-6">
          &copy; 2026 Work Service. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
