'use client'

import { portfolioProjects } from '@/lib/portfolio-data'
import { WorkProjectsList } from '@/components/showcase/WorkProjectsList'
import { StudioProducts } from '@/components/sections/StudioProducts'

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative z-10 w-full rounded-t-[2rem] bg-white px-0 pb-0 pt-20 md:rounded-t-[2.5rem] md:pt-24 lg:pt-28"
    >
      <WorkProjectsList
        projects={portfolioProjects}
        trailingContent={<StudioProducts embedded />}
        showLegalInfo
      />
    </section>
  )
}
