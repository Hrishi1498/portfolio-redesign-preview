'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { HeroPortfolioSection } from '@/components/home/HeroPortfolioSection'

function HomePageContent() {
  const searchParams = useSearchParams()
  const openPortfolio = searchParams.get('view') === 'portfolio'
  const [portfolioActive, setPortfolioActive] = useState(openPortfolio)

  return (
    <main className="fixed inset-0 overflow-hidden overscroll-none bg-black">
      <Navbar theme={portfolioActive ? 'light' : 'dark'} />
      <div className="absolute inset-0">
        <HeroPortfolioSection onPortfolioActive={setPortfolioActive} />
      </div>
    </main>
  )
}

export function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  )
}
