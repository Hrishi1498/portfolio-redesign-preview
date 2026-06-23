'use client'

import { portfolioProjects } from '@/lib/portfolio-data'
import { WorkProjectsList } from '@/components/showcase/WorkProjectsList'
import { releaseHomeScrollLock } from '@/lib/home-scroll-lock'

export function SelectedWork() {
  return (
    <section id="work" className="relative w-full bg-white px-6 pb-12 pt-12 md:px-12 md:pb-16 md:pt-16 lg:px-16 lg:pb-20 xl:px-20">
      <WorkProjectsList
        projects={portfolioProjects}
        onNavigate={() => releaseHomeScrollLock()}
      />
    </section>
  )
}
