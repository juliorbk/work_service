import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { TERMS_OF_SERVICE } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description:
    "Condiciones de uso del sitio web y de contratación de los espacios de trabajo de Work Services: reservas, pagos, cancelaciones y normas de uso.",
  alternates: {
    canonical: "/terminos",
  },
};

export default function TermsPage() {
  return <LegalPage doc={TERMS_OF_SERVICE} />;
}
