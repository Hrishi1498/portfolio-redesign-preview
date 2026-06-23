'use client'

import { Navbar } from '@/components/layout/Navbar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { WorkProjectsList } from '@/components/showcase/WorkProjectsList'
import { portfolioProjects } from '@/lib/portfolio-data'

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar theme="light" position="static" />
      <section className="px-6 pb-28 pt-8 md:px-12 md:pt-12 lg:px-16 xl:px-20">
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
        />
      </section>
      <SiteFooter />
    </main>
  )
}
