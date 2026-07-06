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

/** Curated homepage / case-study navigation order. */
const PORTFOLIO_DISPLAY_ORDER = [
  'healthy-fasal',
  'course-companion',
  'axion-plan',
  'digipropass',
  'natvoiz-ai',
  'setoo-voice-ai',
] as const

export function orderPortfolioProjects(projects: PortfolioProject[]): PortfolioProject[] {
  const rank = new Map<string, number>(
    PORTFOLIO_DISPLAY_ORDER.map((slug, index) => [slug, index]),
  )

  return [...projects].sort((a, b) => {
    const aRank = rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER
    const bRank = rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER
    return aRank - bRank
  })
}

export function getCategoryLabel(category: PortfolioProject['category']): string {
  return CATEGORY_LABELS[category] ?? 'Digital Product'
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
