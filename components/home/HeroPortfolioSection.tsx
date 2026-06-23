'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useReducedMotion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { HeroContent } from '@/components/showcase/HeroGallery'
import { SelectedWork } from '@/components/sections/SelectedWork'

export function HeroPortfolioSection() {
  const searchParams = useSearchParams()
  const openPortfolio = searchParams.get('view') === 'portfolio'
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!openPortfolio) return

    const work = document.getElementById('work')
    if (!work) return

    work.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [openPortfolio, prefersReducedMotion])

  return (
    <>
      <section className="sticky top-0 z-0 h-[100dvh] w-full overflow-hidden bg-black">
        <Navbar position="absolute" theme="dark" />
        <HeroContent />
      </section>
      <SelectedWork />
    </>
  )
}
