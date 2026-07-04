import type { StorySlide } from '@/lib/story-slide'
import type { CaseStudyProject } from '@/lib/case-study-project'

export function slideChapterLabel(type: StorySlide['type']) {
  const labels: Record<string, string> = {
    intro: 'Context',
    problem: 'The Problem',
    solution: 'The Solution',
    scene: 'Platform',
    features: 'Capabilities',
    stats: 'Impact',
    process: 'Workflow',
    architecture: 'System',
    gallery: 'Gallery',
    conclusion: 'Outcome',
    insight: 'Insight',
    testimonial: 'Voices',
  }
  return labels[type] ?? 'Chapter'
}

export function heroImage(project: CaseStudyProject): string | undefined {
  if (project.cover) return project.cover

  const scene = project.slides?.find((s) => s.image && s.type === 'scene')
  if (scene?.image) return scene.image

  const any = project.slides?.find((s) => s.image)
  if (any?.image) return any.image

  const gallery = project.slides?.find((s) => s.galleryImages?.length)
  if (gallery?.galleryImages?.[0]) return gallery.galleryImages[0]

  return project.thumbnail
}

export function stickySourceSlide(slides: StorySlide[]): StorySlide | undefined {
  const withSteps = slides.filter((s) => s.steps && s.steps.length >= 3)
  if (withSteps.length > 0) {
    return withSteps.sort((a, b) => (b.steps?.length ?? 0) - (a.steps?.length ?? 0))[0]
  }
  return slides.find((s) => s.layers && s.layers.length > 0)
}

export function stickyStoryFromSlides(slides: StorySlide[]) {
  const source = stickySourceSlide(slides)
  if (!source) return null

  if (source.steps?.length) {
    return {
      eyebrow: slideChapterLabel(source.type),
      title: source.title ?? 'How it works',
      intro: source.content,
      steps:
        source.steps.map((step) => ({
          title: step.title,
          description: step.description,
        })) ?? [],
    }
  }

  if (source.layers?.length) {
    return {
      eyebrow: slideChapterLabel(source.type),
      title: source.title ?? 'Architecture',
      intro: source.content,
      steps:
        source.layers.map((layer) => ({
          title: layer.name,
          description: layer.description,
        })) ?? [],
    }
  }

  return null
}

export type SceneTheme = 'dark' | 'light'

export function sceneThemeClasses(theme: SceneTheme = 'dark') {
  const light = theme === 'light'

  return {
    section: light ? 'bg-white' : 'bg-[#050505]',
    sectionAlt: light ? 'bg-white' : 'bg-[#080808]',
    border: light ? 'border-zinc-200/80' : 'border-white/[0.06]',
    borderStrong: light ? 'border-zinc-200' : 'border-white/[0.08]',
    heading: light ? 'text-zinc-950' : 'text-white',
    body: light ? 'text-zinc-600' : 'text-zinc-400',
    pullQuote: light ? 'text-zinc-700' : 'text-zinc-200',
    metaValue: light ? 'text-zinc-900' : 'text-white',
    card: light ? 'border-zinc-200 bg-zinc-50' : 'border-white/[0.08] bg-white/[0.02]',
    imageFrame: light
      ? 'border-zinc-200 bg-zinc-100 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.15)]'
      : 'border-white/[0.08] bg-zinc-900 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.85)]',
    heroFrame: light
      ? 'border-zinc-200 bg-zinc-100 shadow-[0_50px_140px_-70px_rgba(0,0,0,0.18)]'
      : 'border-white/[0.08] bg-zinc-900 shadow-[0_50px_140px_-70px_rgba(0,0,0,0.95)]',
    galleryFrame: light
      ? 'border-zinc-200 bg-zinc-100 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.12)]'
      : 'border-white/[0.08] bg-zinc-900 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]',
    stepBadge: light ? 'bg-white text-zinc-900' : 'bg-[#050505] text-white',
  }
}
