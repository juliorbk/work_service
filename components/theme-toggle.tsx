'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const TRANSITION_MS = 850

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [transitioning, setTransitioning] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const handleToggle = () => {
    if (!mounted || transitioning) return

    const root = document.documentElement
    setTransitioning(true)

    // Crossfade suave de colores de todos los componentes
    root.classList.add('theme-fallback-animating')
    void root.getBoundingClientRect()
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

    window.setTimeout(() => {
      root.classList.remove('theme-fallback-animating')
      setTransitioning(false)
    }, TRANSITION_MS)
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
        <Sun key="dark" className="theme-icon w-5 h-5" />
      ) : (
        <Moon key="light" className="theme-icon w-5 h-5" />
      )}
    </button>
  )
}
