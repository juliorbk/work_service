import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Montserrat, Quicksand } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFloatButton } from '@/components/work-service/whatsapp-float-button'
import { YokoWidget } from '@/components/work-service/yoko-widget'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains'
})

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

export const metadata: Metadata = {
  title: 'Work Services | Coworking, Oficinas Privadas y Salas de Conferencias en Maracaibo',
  description:
    'Work Services, ¡tu aliado estratégico! Coworking en Maracaibo: oficinas privadas, salas de conferencias hasta 20 personas, espacios de trabajo compartidos y salones de reuniones. Soporte incluido, internet con respaldo y disponibilidad 24 horas.',
  keywords: [
    'coworking',
    'coworking Maracaibo',
    'oficinas privadas',
    'salas de conferencias',
    'salones de reuniones',
    'espacios de trabajo compartidos',
    'Work Services',
  ],
  openGraph: {
    title: 'Work Services | Coworking, Oficinas Privadas y Salas de Conferencias',
    description:
      'No somos un coworking más, somos tu asistente ejecutivo. Oficinas privadas, salas de conferencias y coworking en Maracaibo.',
    type: 'website',
    locale: 'es_VE',
    siteName: 'Work Services',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${montserrat.variable} ${quicksand.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          value={{ light: 'light', dark: 'dark-mode' }}
        >
          {children}
          <Analytics />
          <WhatsAppFloatButton />
          <YokoWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
