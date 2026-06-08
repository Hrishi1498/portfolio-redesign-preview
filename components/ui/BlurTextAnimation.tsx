'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WordData {
  text: string
  duration: number
  delay: number
  blur: number
  scale?: number
}

interface BlurTextAnimationProps {
  text: string
  words?: WordData[]
  as?: 'p' | 'span' | 'div'
  className?: string
  textClassName?: string
  theme?: 'light' | 'dark'
  variant?: 'headline' | 'body' | 'label'
  triggerOnView?: boolean
  once?: boolean
  loop?: boolean
  startDelay?: number
}

const DEFAULT_VIEW_MARGIN = '100px 0px -50px 0px' as const
const SPEED = 1.25

function buildWords(text: string, variant: 'headline' | 'body' | 'label'): WordData[] {
  const splitWords = text.split(' ')
  const totalWords = splitWords.length
  const durationBase =
    variant === 'headline' ? 0.88 / SPEED : variant === 'body' ? 0.58 / SPEED : 0.46 / SPEED
  const delayStep =
    variant === 'headline' ? 0.028 / SPEED : variant === 'body' ? 0.018 / SPEED : 0.013 / SPEED
  const delayScale = totalWords > 10 ? 10 / totalWords : 1

  return splitWords.map((word, index) => {
    const progress = index / totalWords
    const exponentialDelay = Math.pow(progress, 0.75) * (0.16 / SPEED)
    const baseDelay = index * delayStep
    const microVariation = Math.sin(index * 1.7) * 0.008

    return {
      text: word,
      duration: durationBase + Math.cos(index * 0.3) * 0.06,
      delay: (baseDelay + exponentialDelay + microVariation) * delayScale,
      blur: variant === 'label' ? 8 + (index % 4) : 10 + (index % 6),
      scale: 0.96 + Math.sin(index * 0.2) * 0.03,
    }
  })
}

export function BlurTextAnimation({
  text,
  words,
  as: Tag = 'p',
  className,
  textClassName,
  theme = 'light',
  variant = 'headline',
  triggerOnView = true,
  once = true,
  loop = false,
  startDelay = 0,
}: BlurTextAnimationProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: DEFAULT_VIEW_MARGIN })
  const [isAnimating, setIsAnimating] = useState(false)
  const hasStartedRef = useRef(false)
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const textWords = useMemo(() => words ?? buildWords(text, variant), [text, words, variant])

  const shouldRun = !triggerOnView || isInView

  useEffect(() => {
    if (!shouldRun) return
    if (once && hasStartedRef.current) return

    if (prefersReducedMotion) {
      hasStartedRef.current = true
      setIsAnimating(true)
      return
    }

    const introTimeout = setTimeout(() => {
      hasStartedRef.current = true
      setIsAnimating(true)
    }, (startDelay / SPEED) * 1000 + 60)

    if (loop && !once) {
      let maxTime = 0
      textWords.forEach((word) => {
        maxTime = Math.max(maxTime, word.delay + word.duration)
      })

      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false)
        resetTimeoutRef.current = setTimeout(() => {
          hasStartedRef.current = false
        }, 4000)
      }, (maxTime + 1) * 1000 + startDelay * 1000)
    }

    return () => {
      clearTimeout(introTimeout)
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current)
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
    }
  }, [shouldRun, textWords, loop, once, startDelay, prefersReducedMotion])

  const shadowActive =
    theme === 'dark' ? '0 2px 8px rgba(255,255,255,0.1)' : '0 2px 8px rgba(0,0,0,0.06)'
  const shadowIdle =
    theme === 'dark' ? '0 0 40px rgba(255,255,255,0.4)' : '0 0 32px rgba(0,0,0,0.08)'

  const leadingClass =
    variant === 'headline'
      ? 'leading-[0.95] tracking-[-0.045em]'
      : variant === 'body'
        ? 'leading-relaxed tracking-normal'
        : 'leading-normal tracking-[0.28em]'

  return (
    <Tag ref={ref as React.RefObject<never>} className={cn(leadingClass, className)}>
      {textWords.map((word, index) => (
        <span
          key={`${word.text}-${index}`}
          className={cn(
            'inline-block transition-all',
            isAnimating ? 'opacity-100' : 'opacity-0',
            textClassName
          )}
          style={{
            transitionDuration: `${word.duration}s`,
            transitionDelay: `${word.delay}s`,
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            filter: isAnimating ? 'blur(0px) brightness(1)' : `blur(${word.blur}px) brightness(0.6)`,
            transform: isAnimating
              ? 'translateY(0) scale(1) rotateX(0deg)'
              : `translateY(10px) scale(${word.scale ?? 1}) rotateX(-8deg)`,
            marginRight: '0.28em',
            willChange: 'filter, transform, opacity',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            textShadow: isAnimating ? shadowActive : shadowIdle,
          }}
        >
          {word.text}
        </span>
      ))}
    </Tag>
  )
}
