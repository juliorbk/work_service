'use client'

import * as React from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const FALLBACK_MS = 850

type ViewTransitionLike = {
  finished: Promise<void>
}

type ViewTransitionDocument = {
  startViewTransition?: (callback: () => void) => ViewTransitionLike
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [animating, setAnimating] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const handleToggle = () => {
    if (!mounted || animating) return

    const root = document.documentElement
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setTheme(next)
      return
    }

    // View Transitions API: crossfade real de toda la pagina (incluye
    // gradientes, imagenes y canvas de WebGL, que CSS no puede animar)
    const doc = document as unknown as ViewTransitionDocument
    if (typeof doc.startViewTransition === 'function') {
      setAnimating(true)
      const transition = doc.startViewTransition(() => {
        // Sin transiciones CSS ni animaciones dobles durante el snapshot
        root.classList.add('theme-vt')
        root.classList.toggle('dark-mode', next === 'dark')
        root.style.colorScheme = next
        // Render sincrono para que el snapshot nuevo capture el tema final
        flushSync(() => setTheme(next))
      })
      transition.finished
        .catch(() => undefined)
        .then(() => {
          root.classList.remove('theme-vt')
          setAnimating(false)
        })
      return
    }

    // Fallback: crossfade de colores via CSS
    setAnimating(true)
    root.classList.add('theme-fallback-animating')
    void root.getBoundingClientRect()
    setTheme(next)

    window.setTimeout(() => {
      root.classList.remove('theme-fallback-animating')
      setAnimating(false)
    }, FALLBACK_MS)
  }

  return (
    <button
      type="button"
      aria-label="Cambiar tema claro/oscuro"
      disabled={animating}
      className="btn-press w-11 h-11 inline-flex items-center justify-center rounded-full text-foreground hover:bg-muted/70 transition-colors disabled:opacity-50"
      onClick={handleToggle}
    >
      {!mounted ? (
        <span className="w-5 h-5" />
      ) : resolvedTheme === 'dark' ? (
        <Sun key="dark" className="theme-icon w-5 h-5" />
      ) : (
        <Moon key="light" className="theme-icon w-5 h-5" />
      )}
    </button>
  )
}
