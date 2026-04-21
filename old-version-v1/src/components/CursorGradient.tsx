import { useEffect, useRef } from 'react'

/**
 * Spotlight / radial gradient that follows the mouse cursor.
 * Absolutely positioned inside a relative parent. Use for hero sections.
 */
export function CursorGradient({ color = 'rgba(168, 85, 247, 0.25)', size = 520 }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 transition-opacity"
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 60%)`,
      }}
    />
  )
}
