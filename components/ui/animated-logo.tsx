import Image from 'next/image'

interface AnimatedLogoProps {
  light: string
  dark: string
  alt: string
  width: number
  height: number
  darkWidth?: number
  darkHeight?: number
  className?: string
}

export function AnimatedLogo({
  light,
  dark,
  alt,
  width,
  height,
  darkWidth,
  darkHeight,
  className = '',
}: AnimatedLogoProps) {
  return (
    <span className="relative inline-flex shrink-0">
      <Image
        src={light}
        alt={alt}
        width={width}
        height={height}
        className={`theme-logo object-contain ${className}`}
      />
      <Image
        src={dark}
        alt=""
        aria-hidden
        width={darkWidth ?? width}
        height={darkHeight ?? height}
        className="theme-logo-dark absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
    </span>
  )
}