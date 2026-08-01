import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact", href: "#" },
  { label: "FAQ", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="bg-surface-container-low w-full border-t border-outline-variant">
      <div className="flex flex-col items-center justify-center gap-6 py-10 px-6 max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/work-services-logo.png"
            alt="Work Services"
            width={120}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-secondary text-center">
          &copy; 2024 WORK services. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
