'use client'

import { Navbar } from '@/components/layout/Navbar'
import { WorkProjectsList } from '@/components/showcase/WorkProjectsList'
import { RezonnaProductSpotlight } from '@/components/sections/RezonnaProductSpotlight'
import { portfolioProjects } from '@/lib/portfolio-data'

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar theme="dark" position="static" />
      <section className="px-6 pb-0 pt-8 md:px-12 md:pt-12 lg:px-16 xl:px-20">
        <WorkProjectsList
          projects={portfolioProjects}
          title="Our work"
          subtitle={
            <>
              Built with <b className="font-normal text-zinc-200">precision</b>,{' '}
              <b className="font-normal text-zinc-200">scale</b>, and{' '}
              <b className="font-normal text-zinc-200">intent</b>.
            </>
          }
          trailingContent={<RezonnaProductSpotlight embedded />}
        />
      </section>
    </main>
  )
}
