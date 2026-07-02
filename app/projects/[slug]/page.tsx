'use client'

import { useParams } from 'next/navigation'
import {
  CaseStudyNotFound,
  CaseStudyPageLayout,
} from '@/components/showcase/CaseStudyPageLayout'
import { fromPortfolioProject } from '@/lib/case-study-project'
import { portfolioProjects } from '@/lib/portfolio-data'

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = portfolioProjects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <CaseStudyNotFound backHref="/projects" backLabel="Back to projects" />
    )
  }

  return <CaseStudyPageLayout project={fromPortfolioProject(project)} backHref="/projects" />
}
