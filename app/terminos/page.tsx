import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { TERMS_OF_SERVICE } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Términos de Servicio | Work Services",
  description:
    "Condiciones de uso del sitio web y de contratación de los espacios de trabajo de Work Services: reservas, pagos, cancelaciones y normas de uso.",
};

export default function TermsPage() {
  return <LegalPage doc={TERMS_OF_SERVICE} />;
}
