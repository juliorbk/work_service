'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [transitioning, setTransitioning] = React.useState(false)
  const revealRef = React.useRef<string | null>(null)

  React.useEffect(() => setMounted(true), [])

  const handleToggle = () => {
    const targetDark = resolvedTheme !== 'dark'
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (
      typeof document === 'undefined' ||
      typeof document.startViewTransition !== 'function' ||
      reduceMotion
    ) {
      setTheme(targetDark ? 'dark' : 'light')
      return
    }

    const direction = targetDark ? 'grow' : 'shrink'
    const root = document.documentElement
    revealRef.current = direction
    root.setAttribute('data-theme-reveal', direction)
    setTransitioning(true)

    const transition = document.startViewTransition(() => {
      setTheme(targetDark ? 'dark' : 'light')
    })

    const cleanup = () => {
      if (revealRef.current === direction) {
        root.removeAttribute('data-theme-reveal')
        revealRef.current = null
      }
      setTransitioning(false)
    }
    transition.finished.then(cleanup, cleanup)
  }

  return (
    <button
      type="button"
      aria-label="Cambiar tema claro/oscuro"
      disabled={transitioning}
      className="btn-press w-11 h-11 inline-flex items-center justify-center rounded-full text-foreground hover:bg-muted/70 transition-colors disabled:opacity-50"
      onClick={handleToggle}
    >
      {!mounted ? (
        <span className="w-5 h-5" />
      ) : resolvedTheme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}
