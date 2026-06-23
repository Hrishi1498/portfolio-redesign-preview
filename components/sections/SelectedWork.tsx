'use client'

import { portfolioProjects } from '@/lib/portfolio-data'
import { WorkProjectsList } from '@/components/showcase/WorkProjectsList'
import { releaseHomeScrollLock } from '@/lib/home-scroll-lock'

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative z-10 w-full rounded-t-[2rem] bg-white px-6 pb-12 pt-20 shadow-[0_-24px_80px_-20px_rgba(0,0,0,0.35)] md:rounded-t-[2.5rem] md:px-12 md:pb-16 md:pt-24 lg:px-16 lg:pb-20 lg:pt-28 xl:px-20"
    >
      <WorkProjectsList
        projects={portfolioProjects}
        onNavigate={() => releaseHomeScrollLock()}
      />
    </section>
  )
}
