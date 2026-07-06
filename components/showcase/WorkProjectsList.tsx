'use client'

import type { ReactNode } from 'react'
import type { PortfolioProject } from '@/lib/portfolio-data'
import { orderPortfolioProjects } from '@/lib/project-utils'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { WorkProjectCard } from '@/components/showcase/WorkProjectCard'

interface WorkProjectsListProps {
  projects: PortfolioProject[]
  title?: string
  subtitle?: ReactNode
  /** Rendered after the project list (e.g. Rezonna spotlight). */
  trailingContent?: ReactNode
  /** Show company legal details in footer (home page only). */
  showLegalInfo?: boolean
}

export function WorkProjectsList({
  projects,
  title = 'Portfolio',
  subtitle = (
    <>
      Crafted with <b className="font-normal text-zinc-950">structure</b>,{' '}
      <b className="font-normal text-zinc-950">clarity</b>, and{' '}
      <b className="font-normal text-zinc-950">purpose</b>.
    </>
  ),
  trailingContent,
  showLegalInfo = false,
}: WorkProjectsListProps) {
  const ordered = orderPortfolioProjects(projects)

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <header className="mx-auto flex w-full flex-col items-center gap-6 bg-white px-6 pb-12 text-center md:gap-8 md:px-12 md:pb-16 lg:gap-10 lg:px-16 xl:px-20">
          <h2 className="font-body text-[clamp(3.75rem,11vw,8.5rem)] font-normal leading-[0.9] tracking-[-0.04em] text-zinc-950">
            {title}
          </h2>
          <p className="font-body w-full text-center text-[clamp(0.875rem,calc((100vw-3rem)/18),9rem)] leading-[1.05] tracking-[-0.055em] text-zinc-500 whitespace-nowrap md:text-[clamp(1rem,calc((100vw-6rem)/18),9rem)] lg:text-[clamp(1rem,calc((100vw-8rem)/18),9rem)] xl:text-[clamp(1rem,calc((100vw-10rem)/18),9rem)]">
            {subtitle}
          </p>
        </header>

        <div className="relative w-full overflow-visible">
          <div className="w-full overflow-visible bg-black">
            {ordered.map((project, index) => (
              <WorkProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
          {trailingContent ? <div className="w-full">{trailingContent}</div> : null}
        </div>
      </div>
      <SiteFooter compact showLegalInfo={showLegalInfo} />
    </>
  )
}
