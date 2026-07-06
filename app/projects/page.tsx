'use client'

import { Navbar } from '@/components/layout/Navbar'
import { WorkProjectsList } from '@/components/showcase/WorkProjectsList'
import { StudioProducts } from '@/components/sections/StudioProducts'
import { portfolioProjects } from '@/lib/portfolio-data'

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar theme="dark" position="static" />
      <section className="bg-white px-0 pb-0 pt-8 md:pt-12">
        <WorkProjectsList
          projects={portfolioProjects}
          title="Our work"
          subtitle={
            <>
              Built with <b className="font-normal text-zinc-950">precision</b>,{' '}
              <b className="font-normal text-zinc-950">scale</b>, and{' '}
              <b className="font-normal text-zinc-950">intent</b>.
            </>
          }
          trailingContent={<StudioProducts embedded />}
        />
      </section>
    </main>
  )
}
