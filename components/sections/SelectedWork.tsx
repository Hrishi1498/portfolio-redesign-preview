'use client'

import { portfolioProjects } from '@/lib/portfolio-data'
import { WorkProjectsList } from '@/components/showcase/WorkProjectsList'
import { RezonnaProductSpotlight } from '@/components/sections/RezonnaProductSpotlight'
import { releaseHomeScrollLock } from '@/lib/home-scroll-lock'

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative z-10 w-full rounded-t-[2rem] bg-black px-6 pb-0 pt-20 md:rounded-t-[2.5rem] md:px-12 md:pt-24 lg:px-16 lg:pt-28 xl:px-20"
    >
      <WorkProjectsList
        projects={portfolioProjects}
        onNavigate={() => releaseHomeScrollLock()}
        trailingContent={<RezonnaProductSpotlight className="relative z-20" embedded />}
        showLegalInfo
      />
    </section>
  )
}
