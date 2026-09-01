import { AnimatedLogo } from "@/components/ui/animated-logo";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  size?: number;
}

/**
 * Isotipo de Work Services con cambio automático de tema
 * (terracota en claro, dorado en oscuro). Pensado para usarse
 * donde antes iban iconos genéricos de decoración.
 */
export function BrandMark({ className, size = 20 }: BrandMarkProps) {
  return (
    <AnimatedLogo
      light="/brand/isotipo.png"
      dark="/brand/isotipo-gold.png"
      alt=""
      width={size}
      height={size}
      className={cn("w-5 h-5", className)}
    />
  );
}
