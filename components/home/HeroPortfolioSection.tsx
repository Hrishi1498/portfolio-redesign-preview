'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { HeroContent } from '@/components/showcase/HeroGallery'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { applyHomeScrollLock, releaseHomeScrollLock } from '@/lib/home-scroll-lock'
import { cn } from '@/lib/utils'

/** Wheel progress 0→1: hero zoom finishes here, then portfolio reveal runs to 1 */
const PROGRESS_ZOOM_END = 0.52
const WHEEL_STEP = 0.0012

interface HeroPortfolioSectionProps {
  onPortfolioActive?: (active: boolean) => void
}

export function HeroPortfolioSection({ onPortfolioActive }: HeroPortfolioSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const searchParams = useSearchParams()
  const openPortfolio = searchParams.get('view') === 'portfolio'

  useEffect(() => {
    if (prefersReducedMotion || openPortfolio) {
      onPortfolioActive?.(true)
    }
  }, [prefersReducedMotion, openPortfolio, onPortfolioActive])

  if (prefersReducedMotion) {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <SelectedWork />
      </div>
    )
  }

  return (
    <HeroPortfolioParallax
      onPortfolioActive={onPortfolioActive}
      initialProgress={openPortfolio ? 1 : 0}
    />
  )
}

function HeroPortfolioParallax({
  onPortfolioActive,
  initialProgress,
}: HeroPortfolioSectionProps & { initialProgress: number }) {
  const { progress } = useMotionProgress(initialProgress)
  const pathname = usePathname()
  const [portfolioOnTop, setPortfolioOnTop] = useState(initialProgress >= PROGRESS_ZOOM_END)

  const heroScale = useTransform(progress, [0, PROGRESS_ZOOM_END], [1, 3])
  const heroOpacity = useTransform(progress, [PROGRESS_ZOOM_END * 0.85, PROGRESS_ZOOM_END], [1, 0])
  const portfolioY = useTransform(progress, [PROGRESS_ZOOM_END, 1], ['12vh', '0vh'])
  const portfolioOpacity = useTransform(progress, [PROGRESS_ZOOM_END, PROGRESS_ZOOM_END + 0.12], [0, 1])

  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      const portfolioActive = v >= PROGRESS_ZOOM_END
      setPortfolioOnTop(portfolioActive)
      onPortfolioActive?.(portfolioActive)
    })
    return unsub
  }, [progress, onPortfolioActive])

  useEffect(() => {
    applyHomeScrollLock()

    const resetScroll = () => window.scrollTo(0, 0)
    resetScroll()
    window.addEventListener('scroll', resetScroll, { passive: false })

    return () => {
      window.removeEventListener('scroll', resetScroll)
      releaseHomeScrollLock()
    }
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      releaseHomeScrollLock()
    }
  }, [pathname])

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className={cn(
          'pointer-events-none absolute inset-0 overflow-hidden will-change-transform',
          portfolioOnTop ? 'z-0' : 'z-20'
        )}
      >
        <div className="absolute inset-0 flex origin-center items-center justify-center">
          <HeroContent />
        </div>
      </motion.div>

      <motion.div
        style={{ y: portfolioY, opacity: portfolioOpacity }}
        className={cn(
          'absolute inset-0 flex h-full items-center justify-center overflow-x-hidden overflow-y-hidden',
          portfolioOnTop ? 'z-30 pointer-events-auto' : 'z-10 pointer-events-auto'
        )}
      >
        <SelectedWork />
      </motion.div>
    </div>
  )
}

function useMotionProgress(initialProgress: number) {
  const progress = useMotionValue(initialProgress)
  const value = useRef(initialProgress)

  const setProgress = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(1, next))
      value.current = clamped
      progress.set(clamped)
    },
    [progress]
  )

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (value.current >= 1 && e.deltaY > 0) return

      setProgress(value.current + e.deltaY * WHEEL_STEP)
    }

    let touchY = 0

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()

      const y = e.touches[0]?.clientY ?? touchY
      const delta = touchY - y
      touchY = y

      if (Math.abs(delta) < 2) return

      if (value.current >= 1 && delta > 0) return

      setProgress(value.current + delta * WHEEL_STEP * 2.5)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [setProgress])

  return { progress }
}
