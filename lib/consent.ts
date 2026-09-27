'use client'
import { useSyncExternalStore } from 'react'

export const COOKIE_CONSENT_KEY = 'ws_cookie_consent'
export const COOKIE_CONSENT_EVENT = 'ws:cookie-consent'
export type CookieConsent = 'accepted' | 'declined'

function isConsent(value: string | null): value is CookieConsent {
  return value === 'accepted' || value === 'declined'
}

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY)
  return isConsent(value) ? value : null
}

export function setCookieConsent(consent: CookieConsent): void {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, consent)
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }))
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function getSnapshot(): CookieConsent | null {
  return getCookieConsent()
}

function getServerSnapshot(): CookieConsent | null {
  return null
}

export function useCookieConsent(): CookieConsent | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}