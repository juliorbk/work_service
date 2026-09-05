import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { PRIVACY_POLICY } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Política de Privacidad | Work Services",
  description:
    "Cómo Work Services recopila, usa y protege tus datos personales al usar nuestro sitio web y reservar nuestros espacios de trabajo en Maracaibo.",
};

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY_POLICY} />;
}
