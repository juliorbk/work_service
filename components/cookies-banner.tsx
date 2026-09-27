'use client'
import Link from 'next/link'
import { useCookieConsent, setCookieConsent } from '@/lib/consent'

export function CookiesBanner() {
  const consent = useCookieConsent()

  if (consent !== null) return null

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-5 sm:pb-5"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-outline-variant/60 bg-background/90 px-5 py-4 shadow-xl backdrop-blur-xl animate-menu-in sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground sm:text-base">
            Tu privacidad importa
          </p>
          <p className="mt-1 text-xs leading-relaxed text-secondary sm:text-sm">
            Usamos una analítica respetuosa con la privacidad para entender cómo
            se usa el sitio. No usamos cookies publicitarias ni de seguimiento.
            Puedes aceptar, rechazar o leer nuestra{' '}
            <Link
              href="/privacidad#cookies"
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setCookieConsent('declined')}
            className="btn-premium inline-flex min-h-11 items-center justify-center rounded-full border border-outline-variant px-4 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:px-6"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent('accepted')}
            className="btn-premium inline-flex min-h-11 items-center justify-center rounded-full bg-primary-container px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-95"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}