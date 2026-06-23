'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from 'react'
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
const PROGRESS_REVEAL_COMPLETE = 0.995
const WHEEL_STEP = 0.0014
const TOUCH_STEP = WHEEL_STEP * 2.5

const SPRING = { stiffness: 140, damping: 32, mass: 0.65, restDelta: 0.0004 }

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function revealProgress(p: number) {
  if (p <= PROGRESS_ZOOM_END) return 0
  return easeOutCubic(Math.min(1, (p - PROGRESS_ZOOM_END) / (1 - PROGRESS_ZOOM_END)))
}

function getWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 32
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight
  return event.deltaY
}

function scrollPortfolioContainer(container: HTMLDivElement, delta: number) {
  container.scrollTop += delta
}

function canScrollPortfolioContainer(container: HTMLDivElement, direction: 'up' | 'down') {
  if (direction === 'down') {
    return container.scrollTop + container.clientHeight < container.scrollHeight - 1
  }
  return container.scrollTop > 0
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
      <div className="h-full w-full overflow-y-auto overscroll-contain bg-white">
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
  const heroLayerRef = useRef<HTMLDivElement>(null)
  const portfolioLayerRef = useRef<HTMLDivElement>(null)
  const portfolioOnTopRef = useRef(initialProgress >= PROGRESS_ZOOM_END)
  const wasPortfolioActiveRef = useRef(portfolioOnTopRef.current)
  const wasRevealCompleteRef = useRef(initialProgress >= PROGRESS_REVEAL_COMPLETE)
  const { progress } = useMotionProgress(initialProgress, portfolioContainerRef)
  const pathname = usePathname()

  const heroScale = useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, p / PROGRESS_ZOOM_END))
    return 1 + 2 * easeOutCubic(t)
  })

  const heroOpacity = useTransform(progress, (p) => {
    const fadeStart = PROGRESS_ZOOM_END * 0.72
    const fadeEnd = PROGRESS_ZOOM_END + 0.22
    if (p <= fadeStart) return 1
    if (p >= fadeEnd) return 0
    return 1 - easeInOutCubic((p - fadeStart) / (fadeEnd - fadeStart))
  })

  const portfolioOpacity = useTransform(progress, (p) => {
    const fadeStart = PROGRESS_ZOOM_END * 0.68
    if (p <= fadeStart) return 0
    if (p >= 1) return 1
    return easeInOutCubic((p - fadeStart) / (1 - fadeStart))
  })

  const portfolioContentY = useTransform(progress, (p) => {
    if (p >= PROGRESS_REVEAL_COMPLETE) return 0

    const startY =
      typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.1, 120) : 80

    return startY * (1 - revealProgress(p))
  })

  const portfolioScale = useTransform(progress, (p) => {
    if (p >= PROGRESS_REVEAL_COMPLETE) return 1
    return 1.035 - 0.035 * revealProgress(p)
  })

  const applyLayerPhase = useCallback((portfolioOnTop: boolean, revealComplete: boolean) => {
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
      container.dataset.phase = !portfolioOnTop
        ? 'hero'
        : revealComplete
          ? 'portfolio'
          : 'revealing'
    }
  }, [])

  useLayoutEffect(() => {
    applyLayerPhase(
      portfolioOnTopRef.current,
      initialProgress >= PROGRESS_REVEAL_COMPLETE
    )
  }, [applyLayerPhase, initialProgress])

  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      const portfolioActive = v >= PROGRESS_ZOOM_END
      const revealComplete = v >= PROGRESS_REVEAL_COMPLETE
      const becamePortfolio = portfolioActive && !wasPortfolioActiveRef.current
      const justRevealed = revealComplete && !wasRevealCompleteRef.current

      if (portfolioActive !== portfolioOnTopRef.current) {
        portfolioOnTopRef.current = portfolioActive
        onPortfolioActive?.(portfolioActive)
      }

      applyLayerPhase(portfolioActive, revealComplete)

      const container = portfolioContainerRef.current
      if (container && (!revealComplete || becamePortfolio || justRevealed)) {
        container.scrollTop = 0
      }

      wasPortfolioActiveRef.current = portfolioActive
      wasRevealCompleteRef.current = revealComplete
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
        <div className="absolute inset-0 flex origin-center items-center justify-center pt-[2vh]">
          <HeroContent scrollProgress={progress} />
        </div>
      </motion.div>

      <motion.div
        ref={portfolioLayerRef}
        style={{ opacity: portfolioOpacity }}
        className="pointer-events-auto absolute inset-0 z-10 min-h-0 bg-white will-change-[opacity]"
      >
        <motion.div
          style={{ y: portfolioContentY, scale: portfolioScale }}
          className="h-full origin-top will-change-transform"
        >
          <div
            ref={portfolioContainerRef}
            data-phase="hero"
            className={cn(
              'h-full overscroll-contain bg-white pt-16 sm:pt-20',
              'data-[phase=hero]:overflow-hidden',
              'data-[phase=revealing]:overflow-hidden',
              'data-[phase=portfolio]:overflow-y-auto'
            )}
          >
            <SelectedWork />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function useMotionProgress(
  initialProgress: number,
  portfolioContainerRef: RefObject<HTMLDivElement | null>
) {
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

  const isRevealComplete = useCallback(() => {
    return progress.get() >= PROGRESS_REVEAL_COMPLETE
  }, [progress])

  useEffect(() => {
    const handlePortfolioScroll = (container: HTMLDivElement, delta: number) => {
      if (delta > 0 && canScrollPortfolioContainer(container, 'down')) {
        scrollPortfolioContainer(container, delta)
        return true
      }

      if (delta < 0 && canScrollPortfolioContainer(container, 'up')) {
        scrollPortfolioContainer(container, delta)
        return true
      }

      return false
    }

    const onWheel = (e: WheelEvent) => {
      const delta = getWheelDelta(e)
      const atEnd = isRevealComplete()
      const container = portfolioContainerRef.current

      if (atEnd && container && handlePortfolioScroll(container, delta)) {
        e.preventDefault()
        return
      }

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

      const atEnd = isRevealComplete()
      const container = portfolioContainerRef.current

      if (atEnd && container && handlePortfolioScroll(container, delta)) {
        e.preventDefault()
        return
      }

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
  }, [isRevealComplete, nudgeTarget, portfolioContainerRef])

  return { progress }
}
