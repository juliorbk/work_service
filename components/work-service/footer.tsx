'use client';

import Link from 'next/link';
import { Instagram, MapPin } from 'lucide-react';

export function WorkServiceFooter() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Work Service</h3>
            <p className="text-sm text-background/70 mb-6">
              Espacios corporativos premium en Maracaibo para trabajar, reunirte, capacitar y crecer.
            </p>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-background/70 shrink-0 mt-0.5" />
              <p className="text-sm text-background/70 leading-relaxed">
                Torre Banco Industrial, Av. 9B con 5 de Julio, Maracaibo, Zulia, Venezuela
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#espacios" className="text-sm text-background/70 hover:text-background transition-colors">
                  Espacios de Coworking
                </Link>
              </li>
              <li>
                <Link href="/#espacios" className="text-sm text-background/70 hover:text-background transition-colors">
                  Salas de Reuniones
                </Link>
              </li>
              <li>
                <Link href="/#espacios" className="text-sm text-background/70 hover:text-background transition-colors">
                  Salones de Eventos
                </Link>
              </li>
              <li>
                <Link href="/#espacios" className="text-sm text-background/70 hover:text-background transition-colors">
                  Aulas para Cursos
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#espacios" className="text-sm text-background/70 hover:text-background transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/#locations" className="text-sm text-background/70 hover:text-background transition-colors">
                  Sedes
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-background/70 hover:text-background transition-colors">
                  Reservaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center text-sm text-background/60">
            &copy; 2026 Work Service. Todos los derechos reservados.
          </p>
          <a
            href="https://www.instagram.com/workservicesve/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @workservicesve
          </a>
        </div>
      </div>
    </footer>
  );
}
