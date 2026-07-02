import type { StorySlide } from './story-slide'
import type { CaseStudy } from './data'
import type { PortfolioProject } from './portfolio-data'
import { getCategoryLabel, getIndustry } from './project-utils'

export interface CaseStudyProject {
  slug: string
  title: string
  tagline: string
  description: string
  role: string
  duration: string
  year: string
  industry: string
  categoryLabel: string
  tech: string[]
  metrics?: { label: string; value: string }[]
  metricsSection?: {
    eyebrow: string
    headline: string
  }
  color: string
  thumbnail?: string
  cover?: string
  screenshotFrame?: 'light' | 'dark'
  slides?: StorySlide[]
  links?: {
    live?: string
    github?: string
  }
}

export function fromPortfolioProject(project: PortfolioProject): CaseStudyProject {
  return {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    description: project.description,
    role: project.role,
    duration: project.duration,
    year: project.year,
    industry: getIndustry(project),
    categoryLabel: getCategoryLabel(project.category),
    tech: project.tech,
    metrics: project.metrics,
    metricsSection: project.metricsSection,
    color: project.color,
    thumbnail: project.images.thumbnail,
    cover: project.images.cover,
    screenshotFrame: project.images.screenshotFrame,
    slides: project.slides,
    links: project.links,
  }
}

export function fromLegacyCaseStudy(study: CaseStudy): CaseStudyProject {
  return {
    slug: study.slug,
    title: study.title,
    tagline: study.subtitle ?? study.description,
    description: study.description,
    role: study.author ?? 'BitBLabs',
    duration: study.readTime,
    year: study.date ?? '',
    industry: study.category,
    categoryLabel: study.category,
    tech: [],
    color: study.color,
    thumbnail: study.thumbnail || undefined,
    slides: study.slides,
  }
}
