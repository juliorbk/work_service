import React from "react"
import type { Metadata, Viewport } from 'next'
import { Montserrat, Quicksand } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFloatButton } from '@/components/work-service/whatsapp-float-button'
import { MobileBottomBar } from '@/components/work-service/mobile-bottom-bar'
import { YokoWidget } from '@/components/work-service/yoko-widget'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: '--font-montserrat'
})

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-quicksand'
})

const SITE_URL = 'https://www.workservice.site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Coworking y Oficinas en Maracaibo | Work Services',
    template: '%s | Work Services',
  },
  description:
    'Coworking y oficinas privadas en Maracaibo: salas de conferencias para 20 personas, internet con respaldo y disponibilidad 24/7. Reserva hoy.',
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: '/',
    siteName: 'Work Services',
    title: 'Coworking y Oficinas en Maracaibo | Work Services',
    description:
      'Coworking, oficinas privadas y salas de conferencias en Maracaibo. Soporte incluido, internet con respaldo y disponibilidad 24 horas.',
    images: [
      {
        url: '/images/gallery/highlight.jpg',
        alt: 'Instalaciones de Work Services en Maracaibo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coworking y Oficinas en Maracaibo | Work Services',
    description:
      'Coworking, oficinas privadas y salas de conferencias en Maracaibo.',
    images: ['/images/gallery/highlight.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'android-chrome-512x512', url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f2f2' },
    { media: '(prefers-color-scheme: dark)', color: '#191f2a' },
  ],
}

const YOKO_ENABLED = process.env.NEXT_PUBLIC_YOKO_ENABLED === 'true'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${quicksand.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          value={{ light: 'light', dark: 'dark-mode' }}
        >
          {children}
          <MobileBottomBar />
          <Analytics />
          <WhatsAppFloatButton />
          {YOKO_ENABLED && <YokoWidget />}
        </ThemeProvider>
      </body>
    </html>
  )
}
