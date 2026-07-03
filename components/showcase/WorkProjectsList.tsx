'use client'

import { useRef, type ReactNode } from 'react'
import type { PortfolioProject } from '@/lib/portfolio-data'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { WorkProjectCard } from '@/components/showcase/WorkProjectCard'

function sortProjects(projects: PortfolioProject[]) {
  return [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return Number(b.year) - Number(a.year)
  })
}

interface WorkProjectsListProps {
  projects: PortfolioProject[]
  onNavigate?: () => void
  title?: string
  subtitle?: ReactNode
  /** Rendered inside the sticky stack container so cards stay pinned while it scrolls in. */
  trailingContent?: ReactNode
  /** Show company legal details in footer (home page only). */
  showLegalInfo?: boolean
}

export function WorkProjectsList({
  projects,
  onNavigate,
  title = 'Portfolio',
  subtitle = (
    <>
      Crafted with <b className="font-normal text-zinc-200">structure</b>,{' '}
      <b className="font-normal text-zinc-200">clarity</b>, and{' '}
      <b className="font-normal text-zinc-200">purpose</b>.
    </>
  ),
  trailingContent,
  showLegalInfo = false,
}: WorkProjectsListProps) {
  const sorted = sortProjects(projects)
  const trailingStackRef = useRef<HTMLDivElement>(null)
  const lastIndex = sorted.length - 1

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <header className="mx-auto flex w-full flex-col items-center gap-6 pb-12 text-center md:gap-8 md:pb-16 lg:gap-10">
          <h2 className="font-body text-[clamp(3.75rem,11vw,8.5rem)] font-normal leading-[0.9] tracking-[-0.04em] text-white">
            {title}
          </h2>
          <p className="font-body w-full text-center text-[clamp(0.875rem,calc((100vw-3rem)/18),9rem)] leading-[1.05] tracking-[-0.055em] text-zinc-400 whitespace-nowrap md:text-[clamp(1rem,calc((100vw-6rem)/18),9rem)] lg:text-[clamp(1rem,calc((100vw-8rem)/18),9rem)] xl:text-[clamp(1rem,calc((100vw-10rem)/18),9rem)]">
            {subtitle}
          </p>
        </header>

        <div className="relative mx-auto w-full max-w-[min(100%,90rem)] overflow-visible">
          {sorted.map((project, index) => {
            const isLast = index === lastIndex
            const hasTrailing = isLast && Boolean(trailingContent)

            if (hasTrailing) {
              return (
                <div key={project.slug} ref={trailingStackRef} className="relative w-full">
                  <WorkProjectCard
                    project={project}
                    index={index}
                    onNavigate={onNavigate}
                    extendStickyThroughTrailing
                    stackContainerRef={trailingStackRef}
                  />
                  {trailingContent}
                </div>
              )
            }

            return (
              <WorkProjectCard
                key={project.slug}
                project={project}
                index={index}
                onNavigate={onNavigate}
                enableScrollRunway={index < lastIndex}
              />
            )
          })}
        </div>
      </div>
      <SiteFooter compact showLegalInfo={showLegalInfo} />
    </>
  )
}
