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
}

export function CaseStudyPageLayout({ project, backHref = PORTFOLIO_SECTION_HREF }: CaseStudyPageLayoutProps) {
  return (
    <CaseStudyExitTransition
      accent={project.color}
      caseStudy={<AgencyCaseStudy project={project} backHref={backHref} />}
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
      <div className="px-6 pb-20 pt-40 text-center">
        <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-white">{title}</h1>
        <Link href={backHref} className="font-heading text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-white">
          ← {backLabel}
        </Link>
      </div>
    </main>
  )
}
