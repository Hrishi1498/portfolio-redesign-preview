import type { PortfolioProject } from './portfolio-data'

const CATEGORY_LABELS: Record<PortfolioProject['category'], string> = {
  ai: 'AI Product',
  web: 'Web Platform',
  mobile: 'Mobile App',
  data: 'Data Platform',
  other: 'Digital Product',
}

const INDUSTRY_MAP: Record<string, string> = {
  digipropass: 'Sustainability',
  'healthy-fasal': 'AgriTech',
  'natvoiz-ai': 'Voice AI',
  'setoo-voice-ai': 'Enterprise AI',
  'axion-plan': 'FinTech',
  'course-companion': 'EdTech',
}

export function getCategoryLabel(category: PortfolioProject['category']): string {
  return CATEGORY_LABELS[category] ?? 'Digital Product'
}

export function sortPortfolioProjects(projects: PortfolioProject[]): PortfolioProject[] {
  return [...projects].sort((a, b) => {
    const aIsAi = a.category === 'ai'
    const bIsAi = b.category === 'ai'
    if (aIsAi && !bIsAi) return -1
    if (!aIsAi && bIsAi) return 1
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return Number(b.year) - Number(a.year)
  })
}

export function getIndustry(project: PortfolioProject): string {
  return INDUSTRY_MAP[project.slug] ?? getCategoryLabel(project.category)
}

export function getProjectTags(project: PortfolioProject): string {
  const tags = [
    getCategoryLabel(project.category),
    getIndustry(project),
    ...project.tech.slice(0, 2),
  ]

  return Array.from(new Set(tags)).slice(0, 3).join(', ').toUpperCase()
}

export function isLogoAsset(src: string): boolean {
  return /\.svg$/i.test(src) || /logo/i.test(src)
}
