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

export function getIndustry(project: PortfolioProject): string {
  return INDUSTRY_MAP[project.slug] ?? getCategoryLabel(project.category)
}
