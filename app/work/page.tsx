'use client'

import { Navbar } from '@/components/layout/Navbar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { PortfolioShowcase } from '@/components/showcase/PortfolioShowcase'
import { portfolioProjects } from '@/lib/portfolio-data'

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <section className="border-b border-white/[0.06] px-6 pb-6 pt-28 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 font-heading text-xs uppercase tracking-[0.28em] text-zinc-500">Work</p>
          <h1 className="max-w-3xl font-display text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Our
            <span className="font-editorial font-normal italic text-zinc-500"> portfolio</span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg text-zinc-400">
            Hover a project to preview, then open the case study from the active row.
          </p>
        </div>
      </section>

      <section className="overflow-hidden px-6 pb-24 pt-0 md:px-12 lg:px-20">
        <div className="overflow-hidden pr-1 md:pr-4">
          <PortfolioShowcase projects={portfolioProjects} />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
