'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useReducedMotion } from 'framer-motion'
import { HeroContent } from '@/components/showcase/HeroGallery'
import { SelectedWork } from '@/components/sections/SelectedWork'

interface HeroPortfolioSectionProps {
  onPortfolioActive?: (active: boolean) => void
}

export function HeroPortfolioSection({ onPortfolioActive }: HeroPortfolioSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const openPortfolio = searchParams.get('view') === 'portfolio'
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const root = scrollRef.current
    const work = document.getElementById('work')
    if (!root || !work || !onPortfolioActive) return

    const observer = new IntersectionObserver(
      ([entry]) => onPortfolioActive(entry.isIntersecting),
      { root, threshold: 0.08, rootMargin: '-64px 0px 0px 0px' }
    )

    observer.observe(work)
    return () => observer.disconnect()
  }, [onPortfolioActive])

  useEffect(() => {
    if (!openPortfolio) return

    const root = scrollRef.current
    const work = document.getElementById('work')
    if (!root || !work) return

    const scrollToWork = () => {
      root.scrollTo({
        top: work.offsetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
      onPortfolioActive?.(true)
    }

    requestAnimationFrame(scrollToWork)
  }, [openPortfolio, onPortfolioActive, prefersReducedMotion])

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto overscroll-contain scroll-smooth"
    >
      <section className="relative isolate min-h-[100dvh] w-full">
        <div className="absolute inset-0">
          <HeroContent />
        </div>
      </section>
      <SelectedWork />
    </div>
  )
}
