'use client'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { useCookieConsent } from '@/lib/consent'

export function AnalyticsWithConsent() {
  const consent = useCookieConsent()

  if (consent !== 'accepted') return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}