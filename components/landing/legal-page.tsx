import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BrandMark } from "@/components/ui/brand-mark";
import { whatsappUrl } from "@/lib/site-config";
import type { LegalDocument } from "@/lib/legal-content";

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-4">
              <BrandMark />
              {doc.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {doc.title}
            </h1>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
              {doc.subtitle}
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-secondary mt-6">
              <FileText className="w-4 h-4 shrink-0" />
              {doc.updatedLabel}: {doc.updated}
            </p>
          </div>

          {/* Contenido */}
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
            {doc.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="p-5 sm:p-8 border-b border-outline-variant last:border-b-0 scroll-mt-28"
              >
                <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="text-sm sm:text-base text-secondary leading-relaxed mb-3 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="space-y-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b.slice(0, 40)}
                        className="flex gap-3 text-sm sm:text-base text-secondary leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.65em] w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {/* Enlaces cruzados + contacto */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-8">
            <Link
              href={doc.crossLink.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors min-h-11"
            >
              Ver {doc.crossLink.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsappUrl(
                `¡Hola! Tengo una consulta sobre el ${doc.title.toLowerCase()} de Work Services.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors min-h-11"
            >
              ¿Dudas? Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
