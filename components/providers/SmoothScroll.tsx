'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

function isCaseStudyPath(pathname: string) {
  return /^\/work\/[^/]+$/.test(pathname)
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const skipLenis = isHome || isCaseStudyPath(pathname ?? '')

  useEffect(() => {
    if (skipLenis) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let frame: number
    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [skipLenis])

  return <>{children}</>
}
