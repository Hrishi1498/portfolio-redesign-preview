'use client'

import { useParams } from 'next/navigation'
import {
  CaseStudyNotFound,
  CaseStudyPageLayout,
} from '@/components/showcase/CaseStudyPageLayout'
import { fromLegacyCaseStudy } from '@/lib/case-study-project'
import { caseStudies } from '@/lib/data'

export default function CaseStudyDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    return (
      <CaseStudyNotFound
        title="Case study not found"
        backHref="/case-studies"
        backLabel="Back to case studies"
      />
    )
  }

  return (
    <CaseStudyPageLayout project={fromLegacyCaseStudy(study)} backHref="/case-studies" />
  )
}
