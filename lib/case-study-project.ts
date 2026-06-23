import type { StorySlide } from './story-slide'
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
  color: string
  thumbnail?: string
  cover?: string
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
    color: project.color,
    thumbnail: project.images.thumbnail,
    cover: project.images.cover,
    slides: project.slides,
    links: project.links,
  }
}
