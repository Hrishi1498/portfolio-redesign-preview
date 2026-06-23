'use client'

import type { ReactNode } from 'react'
import type { PortfolioProject } from '@/lib/portfolio-data'
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
}

export function WorkProjectsList({
  projects,
  onNavigate,
  title = 'Portfolio',
  subtitle = (
    <>
      Crafted with <b className="font-normal text-zinc-950">structure</b>,{' '}
      <b className="font-normal text-zinc-950">clarity</b>, and{' '}
      <b className="font-normal text-zinc-950">purpose</b>.
    </>
  ),
}: WorkProjectsListProps) {
  const sorted = sortProjects(projects)

  return (
    <div className="flex w-full flex-col items-center">
      <header className="mx-auto flex w-full flex-col items-center gap-6 pb-12 text-center md:gap-8 md:pb-16 lg:gap-10">
        <h2 className="font-body text-[clamp(3.75rem,11vw,8.5rem)] font-normal leading-[0.9] tracking-[-0.04em] text-zinc-950">
          {title}
        </h2>
        <p className="font-body w-full text-center text-[clamp(0.875rem,calc((100vw-3rem)/18),9rem)] leading-[1.05] tracking-[-0.055em] text-zinc-500 whitespace-nowrap md:text-[clamp(1rem,calc((100vw-6rem)/18),9rem)] lg:text-[clamp(1rem,calc((100vw-8rem)/18),9rem)] xl:text-[clamp(1rem,calc((100vw-10rem)/18),9rem)]">
          {subtitle}
        </p>
      </header>

      <div className="relative w-full max-w-[min(100%,90rem)]">
        {sorted.map((project, index) => (
          <WorkProjectCard
            key={project.slug}
            project={project}
            index={index}
            isLast={index === sorted.length - 1}
            onNavigate={onNavigate}
          />
        ))}
        <div aria-hidden className="h-[30vh]" />
      </div>
    </div>
  )
}
