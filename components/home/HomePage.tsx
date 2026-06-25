'use client'

import { Suspense } from 'react'
import { HeroPortfolioSection } from '@/components/home/HeroPortfolioSection'

export function HomePage() {
  return (
    <Suspense fallback={null}>
      <main className="bg-black overscroll-y-none">
        <HeroPortfolioSection />
      </main>
    </Suspense>
  )
}
