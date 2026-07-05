'use client'

import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { spaceGrotesk, syne } from '@/lib/fonts'
import { cn } from '@/lib/utils'

/** 14s loop encoded from `12149178_1920_1080_24fps.mp4` for faster hero load. */
const HERO_VIDEO = '/Rainbow-hero.mp4'

const lineEase = [0.16, 1, 0.3, 1] as const

function headlineLineTransition(delay: number, reducedMotion: boolean | null) {
  return {
    duration: reducedMotion ? 0.01 : 0.9,
    delay: reducedMotion ? 0 : delay,
    ease: lineEase,
  }
}
const ShaderAnimation = dynamic(
  () =>
    import('@/components/showcase/ShaderAnimation').then(
      (mod) => mod.ShaderAnimation,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 z-0 bg-black" aria-hidden />
    ),
  },
)

export function HeroContent() {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    const video = videoRef.current
    if (!video) return

    void video.play().catch(() => {})
  }, [prefersReducedMotion])

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100vh', minHeight: '100dvh' }}
    >
      {prefersReducedMotion ? (
        <div className="absolute inset-0 z-0 bg-zinc-950" aria-hidden />
      ) : (
        <>
          <video
            ref={videoRef}
            className="absolute inset-0 z-0 h-full w-full min-h-full min-w-full scale-[1.03] object-cover [transform:translateZ(0)] [backface-visibility:hidden]"
            src={HERO_VIDEO}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
            aria-hidden
          >
            <ShaderAnimation />
          </div>
        </>
      )}

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-12 md:pb-28 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: lineEase }}
          className={cn(
            'w-full max-w-[min(100%,64rem)] rounded-[1.75rem] px-8 py-10 text-center sm:px-10 sm:py-11 md:rounded-[2.25rem] md:px-16 md:py-14 lg:px-[4.5rem] lg:py-[4.5rem]',
            'border border-white/55 bg-white/70 shadow-[0_28px_90px_-24px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.75)]',
            'ring-1 ring-white/35 backdrop-blur-2xl backdrop-saturate-150',
            prefersReducedMotion && 'bg-white/92 backdrop-blur-none'
          )}
        >
          <h1
            className={cn(
              syne.className,
              'font-bold tracking-[-0.045em] text-zinc-950',
              'text-[clamp(2.5rem,10.5vw,7rem)] leading-[0.93]',
              'max-md:text-[clamp(2.25rem,11vw,3.25rem)] max-md:leading-[0.97]'
            )}
          >
            <motion.span
              className="block"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={headlineLineTransition(0.12, prefersReducedMotion)}
            >
              We Build
            </motion.span>
            <motion.span
              className="block"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={headlineLineTransition(0.24, prefersReducedMotion)}
            >
              <span className="hero-glitch-text relative inline-block">
                <span className="hero-glitch-text__base">AI</span>
                <span
                  className="hero-glitch-text__band hero-glitch-text__band--1"
                  aria-hidden
                >
                  AI
                </span>
                <span
                  className="hero-glitch-text__band hero-glitch-text__band--2"
                  aria-hidden
                >
                  AI
                </span>
                <span
                  className="hero-glitch-text__band hero-glitch-text__band--3"
                  aria-hidden
                >
                  AI
                </span>
              </span>{' '}
              Products
            </motion.span>
            <motion.span
              className="block font-medium text-zinc-700 [text-shadow:0_1px_18px_rgba(255,255,255,0.95)]"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={headlineLineTransition(0.36, prefersReducedMotion)}
            >
              People Remember
            </motion.span>
          </h1>
          <motion.p
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={headlineLineTransition(0.48, prefersReducedMotion)}
            className={cn(
              spaceGrotesk.className,
              'mt-6 mx-auto max-w-3xl text-lg leading-relaxed text-zinc-600 sm:mt-7 sm:text-xl md:mt-8 md:text-2xl md:leading-relaxed'
            )}
          >
            A digital product studio crafting{' '}
            <span className="font-medium text-zinc-950">exceptional AI platforms</span>, web
            applications, and premium user experiences.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
