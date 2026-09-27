'use client'
import { Analytics } from '@vercel/analytics/next'
import { useCookieConsent } from '@/lib/consent'

export function AnalyticsWithConsent() {
  const consent = useCookieConsent()

  return consent === 'accepted' ? <Analytics /> : null
}