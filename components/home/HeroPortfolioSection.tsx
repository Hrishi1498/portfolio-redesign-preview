'use client'

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { HeroContent } from '@/components/showcase/HeroGallery'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { applyHomeScrollLock, releaseHomeScrollLock } from '@/lib/home-scroll-lock'
import { cn } from '@/lib/utils'

/** Wheel progress 0→1: hero zoom finishes here, then portfolio reveal runs to 1 */
const PROGRESS_ZOOM_END = 0.52
const WHEEL_STEP = 0.0014
const TOUCH_STEP = WHEEL_STEP * 2.5

const SPRING = { stiffness: 140, damping: 32, mass: 0.65, restDelta: 0.0004 }

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function getWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 32
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight
  return event.deltaY
}

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
      <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black">
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
  const portfolioContainerRef = useRef<HTMLDivElement>(null)
  const workSectionRef = useRef<HTMLDivElement>(null)
  const heroLayerRef = useRef<HTMLDivElement>(null)
  const portfolioLayerRef = useRef<HTMLDivElement>(null)
  const portfolioOnTopRef = useRef(initialProgress >= PROGRESS_ZOOM_END)
  const centerOffset = useMotionValue(0)
  const { progress, targetProgress } = useMotionProgress(initialProgress)
  const pathname = usePathname()

  const measureCenterOffset = useCallback(() => {
    const container = portfolioContainerRef.current
    const section = workSectionRef.current
    if (!container || !section) return

    const gap = container.clientHeight - section.offsetHeight
    centerOffset.set(gap / 2)
  }, [centerOffset])

  useLayoutEffect(() => {
    measureCenterOffset()

    const section = workSectionRef.current
    if (!section) return

    const observer = new ResizeObserver(measureCenterOffset)
    observer.observe(section)
    window.addEventListener('resize', measureCenterOffset)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measureCenterOffset)
    }
  }, [measureCenterOffset])

  const heroScale = useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, p / PROGRESS_ZOOM_END))
    return 1 + 2 * easeOutCubic(t)
  })

  const heroOpacity = useTransform(progress, (p) => {
    const fadeStart = PROGRESS_ZOOM_END * 0.85
    if (p <= fadeStart) return 1
    if (p >= PROGRESS_ZOOM_END) return 0
    return 1 - (p - fadeStart) / (PROGRESS_ZOOM_END - fadeStart)
  })

  const portfolioOpacity = useTransform(progress, (p) => {
    const fadeEnd = PROGRESS_ZOOM_END + 0.12
    if (p <= PROGRESS_ZOOM_END) return 0
    if (p >= fadeEnd) return 1
    return (p - PROGRESS_ZOOM_END) / (fadeEnd - PROGRESS_ZOOM_END)
  })

  const portfolioY = useTransform([progress, centerOffset], ([p, endY]) => {
    const progressValue = p as number
    const endOffset = endY as number
    const startY = window.innerHeight * 0.12

    if (progressValue <= PROGRESS_ZOOM_END) {
      return `${startY}px`
    }

    const t = easeInOutCubic(
      Math.min(1, (progressValue - PROGRESS_ZOOM_END) / (1 - PROGRESS_ZOOM_END))
    )
    const y = startY + (endOffset - startY) * t
    return `${y}px`
  })

  const applyLayerPhase = useCallback(
    (portfolioOnTop: boolean) => {
      const hero = heroLayerRef.current
      const portfolio = portfolioLayerRef.current
      const container = portfolioContainerRef.current

      if (hero) {
        hero.classList.toggle('z-0', portfolioOnTop)
        hero.classList.toggle('z-20', !portfolioOnTop)
      }

      if (portfolio) {
        portfolio.classList.toggle('z-30', portfolioOnTop)
        portfolio.classList.toggle('z-10', !portfolioOnTop)
      }

      if (container) {
        container.dataset.phase = portfolioOnTop ? 'portfolio' : 'hero'
      }
    },
    []
  )

  useLayoutEffect(() => {
    applyLayerPhase(portfolioOnTopRef.current)
  }, [applyLayerPhase])

  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      const portfolioActive = v >= PROGRESS_ZOOM_END
      if (portfolioActive !== portfolioOnTopRef.current) {
        portfolioOnTopRef.current = portfolioActive
        applyLayerPhase(portfolioActive)
        onPortfolioActive?.(portfolioActive)
      }
    })
    return unsub
  }, [progress, onPortfolioActive, applyLayerPhase])

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
        ref={heroLayerRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden will-change-transform"
      >
        <div className="absolute inset-0 flex origin-center items-center justify-center">
          <HeroContent scrollProgress={progress} />
        </div>
      </motion.div>

      <motion.div
        ref={portfolioLayerRef}
        style={{ y: portfolioY, opacity: portfolioOpacity }}
        className="pointer-events-auto absolute inset-0 z-10 min-h-0"
      >
        <div
          ref={portfolioContainerRef}
          data-phase="hero"
          className={cn(
            'h-full overflow-hidden overscroll-none',
            'data-[phase=hero]:pt-12 data-[phase=hero]:sm:pt-14 data-[phase=hero]:md:pt-16',
            'data-[phase=portfolio]:pt-0'
          )}
        >
          <div ref={workSectionRef} className="w-full shrink-0">
            <SelectedWork />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function useMotionProgress(initialProgress: number) {
  const targetProgress = useMotionValue(initialProgress)
  const progress = useSpring(targetProgress, SPRING)

  const nudgeTarget = useCallback(
    (delta: number) => {
      const current = targetProgress.get()
      const next = Math.max(0, Math.min(1, current + delta))
      targetProgress.set(next)
    },
    [targetProgress]
  )

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const delta = getWheelDelta(e)
      const atEnd = targetProgress.get() >= 1

      if (atEnd) {
        e.preventDefault()
        if (delta < 0) {
          nudgeTarget(delta * WHEEL_STEP)
        }
        return
      }

      e.preventDefault()
      nudgeTarget(delta * WHEEL_STEP)
    }

    let touchY = 0

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0
    }

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchY
      const delta = touchY - y
      touchY = y

      if (Math.abs(delta) < 2) return

      const atEnd = targetProgress.get() >= 1

      if (atEnd) {
        e.preventDefault()
        if (delta < 0) {
          nudgeTarget(delta * TOUCH_STEP)
        }
        return
      }

      e.preventDefault()
      nudgeTarget(delta * TOUCH_STEP)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [nudgeTarget, targetProgress])

  return { progress, targetProgress }
}
