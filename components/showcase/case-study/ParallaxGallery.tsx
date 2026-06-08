'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { sceneThemeClasses, type SceneTheme } from '@/components/showcase/case-study/utils'

interface ParallaxGalleryProps {
  title: string
  description?: string
  images: string[]
  accent: string
  theme?: SceneTheme
}

export function ParallaxGallery({ title, description, images, accent, theme = 'dark' }: ParallaxGalleryProps) {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const trackX = useTransform(scrollYProgress, [0, 1], ['8%', '-18%'])
  const styles = sceneThemeClasses(theme)

  if (images.length === 0) return null

  return (
    <section ref={sectionRef} className={cn('relative overflow-hidden pb-32 pt-24 md:pb-44 md:pt-32', styles.sectionAlt)}>
      <div className="mx-auto mb-12 max-w-7xl px-6 md:mb-16 md:px-12 lg:px-16">
        <Reveal>
          <p className="font-heading text-sm uppercase tracking-[0.28em] text-zinc-500">Showcase</p>
          <h2
            className={cn(
              'mt-4 font-display text-[clamp(2.5rem,5.5vw,4rem)] font-bold tracking-[-0.03em]',
              styles.heading
            )}
          >
            {title}
          </h2>
          {description && (
            <p className={cn('mt-4 max-w-2xl font-body text-lg leading-relaxed md:text-xl', styles.body)}>
              {description}
            </p>
          )}
        </Reveal>
      </div>

      <motion.div
        style={prefersReducedMotion ? undefined : { x: trackX }}
        className="flex w-max gap-5 px-6 md:gap-8 md:px-12"
      >
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={cn(
              'relative h-[42vh] w-[82vw] shrink-0 overflow-hidden rounded-2xl md:h-[56vh] md:w-[58vw]',
              styles.galleryFrame
            )}
          >
            <div className="absolute inset-x-0 top-0 z-10 h-px" style={{ backgroundColor: `${accent}88` }} />
            <Image
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              fill
              className="object-cover object-top"
              sizes="60vw"
            />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
