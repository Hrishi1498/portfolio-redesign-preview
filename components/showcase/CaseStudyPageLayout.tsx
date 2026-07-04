'use client'

import Link from 'next/link'
import { AgencyCaseStudy } from '@/components/showcase/AgencyCaseStudy'
import { CaseStudyExitTransition } from '@/components/showcase/CaseStudyExitTransition'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { Testimonials } from '@/components/sections/Testimonials'
import { SiteFooter } from '@/components/layout/SiteFooter'
import type { CaseStudyProject } from '@/lib/case-study-project'
import { PORTFOLIO_SECTION_HREF } from '@/lib/site'

interface CaseStudyPageLayoutProps {
  project: CaseStudyProject
  backHref?: string
  backLabel?: string
}

export function CaseStudyPageLayout({
  project,
  backHref = PORTFOLIO_SECTION_HREF,
  backLabel = 'Back to portfolio',
}: CaseStudyPageLayoutProps) {
  return (
    <CaseStudyExitTransition
      accent={project.color}
      caseStudy={<AgencyCaseStudy project={project} backHref={backHref} backLabel={backLabel} />}
      afterProcess={
        <>
          <Testimonials accent={project.color} />
          <ContactCTA />
          <SiteFooter />
        </>
      }
    />
  )
}

interface CaseStudyNotFoundProps {
  title?: string
  backHref: string
  backLabel: string
}

export function CaseStudyNotFound({
  title = 'Project not found',
  backHref,
  backLabel,
}: CaseStudyNotFoundProps) {
  return (
    <main className="relative min-h-screen bg-[#050505]">
      <div className="flex flex-col items-center px-6 pb-20 pt-40 text-center">
        <h1 className="mb-6 font-display text-3xl font-bold tracking-tight text-white">{title}</h1>
        <Link
          href={backHref}
          className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 font-heading text-xs font-medium uppercase tracking-[0.14em] text-zinc-200 transition-all duration-300 hover:border-white/22 hover:bg-white/[0.1] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        >
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5"
          >
            <path
              d="M10 3.5 5.5 8 10 12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{backLabel}</span>
        </Link>
      </div>
    </main>
  )
}
