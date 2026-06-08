'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const ShaderAnimation = dynamic(
  () => import('./ShaderAnimation').then((m) => m.ShaderAnimation),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" aria-hidden />,
  }
)

export function HeroContent() {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#050505]" />
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-4xl px-4 text-center sm:mt-20 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 font-display text-display-sm font-bold text-white sm:text-display-md lg:text-display-lg"
        >
          We Build Products
          <br />
          <span className="text-zinc-500">People Remember</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl font-heading text-base leading-relaxed text-zinc-300 sm:text-lg"
        >
          A digital product studio crafting{' '}
          <span className="font-medium text-white">
            exceptional AI platforms
          </span>
          , web applications, and premium user experiences.
        </motion.p>
      </div>
    </>
  )
}
