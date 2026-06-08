/** Curated gradient pairs inspired by glassmorphism card palettes. */

export interface ProjectGradientSource {
  slug: string
  color: string
}
const PROJECT_GRADIENTS: Record<string, [string, string]> = {
  digipropass: ['#007CBE', '#FFF7AE'],
  'healthy-fasal': ['#02C3BD', '#4E148C'],
  'natvoiz-ai': ['#E57A44', '#251351'],
  'setoo-voice-ai': ['#DB5375', '#B3FFB3'],
  'axion-plan': ['#F1FEC6', '#A882DD'],
  'course-companion': ['#414288', '#B0DB43'],
}

const FALLBACK_PAIRS: [string, string][] = [
  ['#629460', '#F4D35E'],
  ['#FFC145', '#EC368D'],
  ['#F1FEC6', '#A882DD'],
]

export function getProjectCardGradient(project: ProjectGradientSource) {
  const pair = PROJECT_GRADIENTS[project.slug]
  if (pair) {
    return { from: pair[0], to: pair[1] }
  }

  const index = project.slug.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const fallback = FALLBACK_PAIRS[index % FALLBACK_PAIRS.length]
  return { from: project.color, to: fallback[1] }
}

export function getProjectCardGradientCss(project: ProjectGradientSource, angle = 145) {
  const { from, to } = getProjectCardGradient(project)
  return `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`
}
