import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Work Service - Renta de Oficinas, Coworking, Eventos y Cursos',
  description: 'Renta oficinas privadas, espacios de coworking, salas de reuniones, salones de eventos y aulas para cursos y capacitaciones. Espacios corporativos premium para tu negocio.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          value={{ light: 'light-mode', dark: 'dark-mode' }}
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
