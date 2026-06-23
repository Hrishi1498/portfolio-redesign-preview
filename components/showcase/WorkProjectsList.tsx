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
      <header className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 pb-12 text-center md:gap-6 md:pb-16">
        <h2 className="font-body text-[clamp(2.25rem,3.8vw,3rem)] font-normal tracking-[-0.03em] text-zinc-950">
          {title}
        </h2>
        <p className="font-body text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.1] tracking-[-0.04em] text-zinc-500">
          {subtitle}
        </p>
      </header>

      <div className="w-full max-w-[min(100%,90rem)]">
        {sorted.map((project, index) => (
          <WorkProjectCard
            key={project.slug}
            project={project}
            index={index}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  )
}
