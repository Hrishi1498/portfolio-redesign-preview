'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { Process } from '@/components/sections/Process'
import { cn } from '@/lib/utils'

const EXIT_ANIMATION_DURATION = 2.2
const SCROLL_END_THRESHOLD = 24
const WHEEL_THRESHOLD = 80
const TOUCH_THRESHOLD = 80
const COOLDOWN_MS = 350
const WHEEL_GESTURE_RESET_MS = 180
const GESTURE_IDLE_MS = 20
const MIN_CASE_STUDY_HEIGHT = 240

interface CaseStudyExitTransitionProps {
  caseStudy: ReactNode
  afterProcess?: ReactNode
  accent?: string
}

export function CaseStudyExitTransition({ caseStudy, afterProcess, accent }: CaseStudyExitTransitionProps) {
  const prefersReducedMotion = useReducedMotion()
  const caseStudyRef = useRef<HTMLDivElement>(null)
  const exitAnimationRef = useRef<ReturnType<typeof animate> | null>(null)
  const lockedScrollYRef = useRef(0)
  const caseStudyPinYRef = useRef(0)
  const atEndRef = useRef(false)
  const endArrivedAtRef = useRef(0)
  const lastDownWheelAtRef = useRef(0)
  const lastDownTouchAtRef = useRef(0)
  const exitArmedRef = useRef(false)
  const transitionDoneRef = useRef(false)
  const exitActiveRef = useRef(false)

  const exitProgress = useMotionValue(0)
  const [caseStudyHeight, setCaseStudyHeight] = useState(0)
  const [caseStudyPinY, setCaseStudyPinY] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const [exitArmed, setExitArmed] = useState(false)
  const [exitActive, setExitActive] = useState(false)
  const [transitionDone, setTransitionDone] = useState(false)

  const resetEndGate = useCallback(() => {
    const now = Date.now()
    endArrivedAtRef.current = now
    lastDownWheelAtRef.current = now
    lastDownTouchAtRef.current = now
    exitArmedRef.current = false
    setExitArmed(false)
  }, [])

  const armExitImmediately = useCallback(() => {
    const now = Date.now()
    endArrivedAtRef.current = now
    lastDownWheelAtRef.current = now - GESTURE_IDLE_MS - 1
    lastDownTouchAtRef.current = now - GESTURE_IDLE_MS - 1
    exitArmedRef.current = true
    setExitArmed(true)
    atEndRef.current = true
    setAtEnd(true)
  }, [])

  const syncAtEnd = useCallback(() => {
    if (exitProgress.get() > 0.01 || transitionDoneRef.current || exitActiveRef.current) {
      atEndRef.current = false
      exitArmedRef.current = false
      setAtEnd(false)
      setExitArmed(false)
      return
    }

    const { scrollY, innerHeight } = window
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight)
    const nextAtEnd = scrollY >= maxScroll - SCROLL_END_THRESHOLD
    const wasAtEnd = atEndRef.current

    if (nextAtEnd && !wasAtEnd) {
      resetEndGate()
    }

    if (!nextAtEnd) {
      exitArmedRef.current = false
      setExitArmed(false)
    } else {
      const now = Date.now()
      const armed =
        now - lastDownWheelAtRef.current >= GESTURE_IDLE_MS &&
        now - lastDownTouchAtRef.current >= GESTURE_IDLE_MS
      if (armed !== exitArmedRef.current) {
        exitArmedRef.current = armed
        setExitArmed(armed)
      }
    }

    atEndRef.current = nextAtEnd
    setAtEnd(nextAtEnd)
  }, [exitProgress, resetEndGate])

  const caseStudyX = useTransform(exitProgress, [0, 1], ['0%', '-100%'])
  const processX = useTransform(exitProgress, [0, 1], ['100%', '0%'])

  const measureCaseStudy = useCallback(() => {
    const article = caseStudyRef.current?.querySelector('#case-study-article')
    const el = (article ?? caseStudyRef.current) as HTMLElement | null
    if (!el) return

    const height = Math.max(el.scrollHeight, el.offsetHeight)
    if (height < MIN_CASE_STUDY_HEIGHT) return

    const pinY = Math.max(0, height - window.innerHeight)
    caseStudyPinYRef.current = pinY
    setCaseStudyHeight(height)
    setCaseStudyPinY(pinY)
  }, [])

  useLayoutEffect(() => {
    measureCaseStudy()

    const observer = new ResizeObserver(measureCaseStudy)
    const article = caseStudyRef.current?.querySelector('#case-study-article')
    const target = (article ?? caseStudyRef.current) as Element | null
    if (target) observer.observe(target)

    window.addEventListener('resize', measureCaseStudy)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measureCaseStudy)
    }
  }, [caseStudy, measureCaseStudy])

  const lockScroll = useCallback((scrollY: number) => {
    lockedScrollYRef.current = scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
  }, [])

  const unlockScroll = useCallback((scrollY?: number) => {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    if (scrollY !== undefined) {
      window.scrollTo(0, scrollY)
    }
  }, [])

  useMotionValueEvent(exitProgress, 'change', (value) => {
    if (value >= 0.995) {
      transitionDoneRef.current = true
      setTransitionDone(true)
      exitActiveRef.current = false
      setExitActive(false)
      unlockScroll(0)
      return
    }

    if (transitionDoneRef.current) {
      transitionDoneRef.current = false
      setTransitionDone(false)
    }

    if (value > 0.001) {
      exitActiveRef.current = true
      setExitActive(true)
    }
  })

  useEffect(() => {
    if (prefersReducedMotion || exitActive) return

    syncAtEnd()
    window.addEventListener('scroll', syncAtEnd, { passive: true })
    window.addEventListener('resize', syncAtEnd)

    const armPoll = window.setInterval(syncAtEnd, 120)

    return () => {
      window.clearInterval(armPoll)
      window.removeEventListener('scroll', syncAtEnd)
      window.removeEventListener('resize', syncAtEnd)
    }
  }, [exitActive, prefersReducedMotion, syncAtEnd])

  useEffect(() => {
    if (prefersReducedMotion) return

    let wheelAccumulator = 0
    let touchAccumulator = 0
    let touchStartY = 0
    let lastActionAt = 0
    let wheelResetTimer: ReturnType<typeof setTimeout> | undefined

    const canAct = () => Date.now() - lastActionAt >= COOLDOWN_MS

    const runExitAnimation = (to: 0 | 1) => {
      exitAnimationRef.current?.stop()
      lastActionAt = Date.now()

      if (to === 1) {
        exitArmedRef.current = false
        setExitArmed(false)
        measureCaseStudy()
        lockScroll(window.scrollY)
      } else {
        lockScroll(transitionDoneRef.current ? window.scrollY : lockedScrollYRef.current)
      }

      exitAnimationRef.current = animate(exitProgress, to, {
        duration: EXIT_ANIMATION_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          if (to === 0) {
            exitActiveRef.current = false
            setExitActive(false)
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                measureCaseStudy()
                unlockScroll(caseStudyPinYRef.current)
                armExitImmediately()
                syncAtEnd()
              })
            })
          }
        },
      })
    }

    const tryExit = (direction: 1 | -1) => {
      if (!canAct()) return false

      const value = exitProgress.get()

      if (direction > 0) {
        if (value > 0.01) return false
        if (!atEndRef.current || !exitArmedRef.current) return false
        runExitAnimation(1)
        return true
      }

      if (value > 0.01 || transitionDoneRef.current) {
        runExitAnimation(0)
        return true
      }

      return false
    }

    const atProcessStart = () => {
      const process = document.getElementById('process')
      if (!process) return window.scrollY <= SCROLL_END_THRESHOLD

      const rect = process.getBoundingClientRect()
      return rect.top >= -48 && rect.top <= 48
    }

    const handleWheel = (e: WheelEvent) => {
      const value = exitProgress.get()

      if (transitionDoneRef.current) {
        if (atProcessStart() && e.deltaY < 0) {
          e.preventDefault()
          if (!canAct()) return
          wheelAccumulator += e.deltaY
          if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) {
            clearTimeout(wheelResetTimer)
            wheelResetTimer = setTimeout(() => {
              wheelAccumulator = 0
            }, 160)
            return
          }
          wheelAccumulator = 0
          tryExit(-1)
        }
        return
      }

      if (value >= 0.995) {
        if (e.deltaY < 0) {
          e.preventDefault()
          if (!canAct()) return
          wheelAccumulator += e.deltaY
          if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) return
          wheelAccumulator = 0
          tryExit(-1)
        }
        return
      }

      if (value > 0.01) {
        e.preventDefault()
        if (e.deltaY >= 0) return
        if (!canAct()) return
        wheelAccumulator += e.deltaY
        if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) return
        wheelAccumulator = 0
        tryExit(-1)
        return
      }

      if (atEndRef.current && value <= 0.01 && e.deltaY > 0) {
        if (!exitArmedRef.current) {
          lastDownWheelAtRef.current = Date.now()
          e.preventDefault()
          wheelAccumulator = 0
          return
        }

        e.preventDefault()
        if (!canAct()) return
        wheelAccumulator += e.deltaY
        if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) {
          clearTimeout(wheelResetTimer)
          wheelResetTimer = setTimeout(() => {
            wheelAccumulator = 0
          }, WHEEL_GESTURE_RESET_MS)
          return
        }
        wheelAccumulator = 0
        tryExit(1)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
      touchAccumulator = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0
      const delta = touchStartY - y
      touchStartY = y
      if (Math.abs(delta) < 2) return

      const value = exitProgress.get()

      if (transitionDoneRef.current) {
        if (atProcessStart() && delta < 0) {
          e.preventDefault()
          if (!canAct()) return
          touchAccumulator += delta
          if (Math.abs(touchAccumulator) < TOUCH_THRESHOLD) return
          touchAccumulator = 0
          tryExit(-1)
        }
        return
      }

      if (value >= 0.995) {
        if (delta >= 0) return
        e.preventDefault()
        if (!canAct()) return
        touchAccumulator += delta
        if (Math.abs(touchAccumulator) < TOUCH_THRESHOLD) return
        touchAccumulator = 0
        tryExit(-1)
        return
      }

      if (value > 0.01) {
        e.preventDefault()
        if (delta >= 0) return
        if (!canAct()) return
        touchAccumulator += delta
        if (Math.abs(touchAccumulator) < TOUCH_THRESHOLD) return
        touchAccumulator = 0
        tryExit(-1)
        return
      }

      if (atEndRef.current && value <= 0.01 && delta > 0) {
        if (!exitArmedRef.current) {
          lastDownTouchAtRef.current = Date.now()
          e.preventDefault()
          touchAccumulator = 0
          return
        }

        e.preventDefault()
        if (!canAct()) return
        touchAccumulator += delta
        if (Math.abs(touchAccumulator) < TOUCH_THRESHOLD) return
        touchAccumulator = 0
        tryExit(1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      clearTimeout(wheelResetTimer)
      exitAnimationRef.current?.stop()
      unlockScroll()
      window.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [exitProgress, lockScroll, measureCaseStudy, prefersReducedMotion, armExitImmediately, resetEndGate, syncAtEnd, unlockScroll])

  if (prefersReducedMotion) {
    return (
      <main className="relative min-h-screen bg-[#050505]">
        <div ref={caseStudyRef}>{caseStudy}</div>
        <Process accent={accent} />
        {afterProcess}
      </main>
    )
  }

  const hideCaseStudy = transitionDone && !exitActive
  const showProcess = exitActive || transitionDone

  return (
    <main className="relative overflow-x-hidden bg-[#050505]" data-lenis-prevent>
      {exitActive && caseStudyHeight > 0 && (
        <div aria-hidden className="pointer-events-none" style={{ height: caseStudyHeight }} />
      )}

      <motion.div
        ref={caseStudyRef}
        style={exitActive ? { x: caseStudyX } : undefined}
        className={cn(
          'relative bg-[#050505] will-change-transform',
          exitActive && 'fixed inset-0 z-30 h-screen overflow-hidden',
          hideCaseStudy && 'pointer-events-none fixed inset-0 invisible -z-10 overflow-hidden'
        )}
        aria-hidden={hideCaseStudy}
      >
        <div
          className={cn(exitActive && 'absolute inset-x-0 top-0')}
          style={exitActive ? { transform: `translateY(-${caseStudyPinY}px)` } : undefined}
        >
          {caseStudy}
        </div>
      </motion.div>

      {showProcess && (
        <motion.div
          style={exitActive ? { x: processX } : undefined}
          className={cn(
            'bg-white will-change-transform',
            exitActive && 'fixed inset-0 z-40 overflow-y-auto pointer-events-none',
            transitionDone && !exitActive && 'relative pointer-events-auto'
          )}
        >
          <Process accent={accent} />
          {transitionDone && !exitActive && afterProcess}
        </motion.div>
      )}

      {atEnd && !exitActive && !transitionDone && (
        <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: exitArmed ? 1 : 0.75, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'text-center font-apple text-xs font-medium uppercase tracking-[0.2em]',
              exitArmed ? 'text-zinc-300' : 'text-zinc-500'
            )}
          >
            Scroll down to continue
          </motion.p>
        </div>
      )}

      {transitionDone && !exitActive && (
        <p className="pointer-events-none fixed top-8 left-1/2 z-50 -translate-x-1/2 font-apple text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Scroll up to return
        </p>
      )}
    </main>
  )
}
