'use client'

import { useParams } from 'next/navigation'
import {
  CaseStudyNotFound,
  CaseStudyPageLayout,
} from '@/components/showcase/CaseStudyPageLayout'
import { PORTFOLIO_SECTION_HREF } from '@/lib/site'
import { fromPortfolioProject } from '@/lib/case-study-project'
import { portfolioProjects } from '@/lib/portfolio-data'

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = portfolioProjects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <CaseStudyNotFound backHref={PORTFOLIO_SECTION_HREF} backLabel="Back to portfolio" />
    )
  }

  return <CaseStudyPageLayout project={fromPortfolioProject(project)} backHref={PORTFOLIO_SECTION_HREF} />
}
