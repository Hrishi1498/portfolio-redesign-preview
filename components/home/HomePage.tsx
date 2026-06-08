'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { HeroPortfolioSection } from '@/components/home/HeroPortfolioSection'

export function HomePage() {
  const [portfolioActive, setPortfolioActive] = useState(false)

  return (
    <main className="fixed inset-0 overflow-hidden overscroll-none bg-black">
      {!portfolioActive && <Navbar />}
      <div className="absolute inset-0">
        <HeroPortfolioSection onPortfolioActive={setPortfolioActive} />
      </div>
    </main>
  )
}
