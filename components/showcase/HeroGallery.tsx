'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { spaceGrotesk, syne } from '@/lib/fonts'
import { cn } from '@/lib/utils'

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
  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100vh', minHeight: '100dvh' }}
    >
      <ShaderAnimation />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/15 via-black/30 to-[#050505]/85"
        aria-hidden
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center pt-[2vh]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              syne.className,
              'mb-6 max-md:!text-[clamp(2.75rem,11vw,3.75rem)] max-md:!leading-[0.98] text-display-sm font-bold text-white sm:text-display-md lg:text-display-lg'
            )}
          >
            We Build AI Products
            <br />
            <span className="text-zinc-500">People Remember</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              spaceGrotesk.className,
              'mx-auto max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg'
            )}
          >
            A digital product studio crafting{' '}
            <span className="font-medium text-white">
              exceptional AI platforms
            </span>
            , web applications, and premium user experiences.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
