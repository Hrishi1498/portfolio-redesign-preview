'use client'

import { portfolioProjects } from '@/lib/portfolio-data'
import { PortfolioShowcase } from '@/components/showcase/PortfolioShowcase'

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative flex w-full flex-col justify-center overflow-hidden bg-black py-8 md:py-10"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        <h2 className="mb-3 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
          Selected work
        </h2>
        <p className="mb-5 max-w-2xl font-body text-lg text-zinc-400 md:mb-6 md:text-xl">
          Digital products we&apos;ve designed and built across AI, web, and enterprise platforms.
        </p>
        <div className="flex justify-end overflow-visible pr-1 md:pr-4">
          <PortfolioShowcase projects={portfolioProjects} />
        </div>
      </div>
    </section>
  )
}
