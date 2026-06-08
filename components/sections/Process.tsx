'use client'

import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { portfolioProjects } from '@/lib/portfolio-data'
import { MetricsShowcase } from '@/components/showcase/case-study/MetricsShowcase'
import { ParallaxGallery } from '@/components/showcase/case-study/ParallaxGallery'
import { StickyStorySection } from '@/components/showcase/case-study/StickyStorySection'
import {
  FeatureGridScene,
  FullBleedVisual,
  HeroVisual,
  MetaItem,
  StatementScene,
} from '@/components/showcase/case-study/CaseStudyScenes'
import { sceneThemeClasses } from '@/components/showcase/case-study/utils'

const steps = [
  {
    number: '01',
    title: 'Discover',
    shortLabel: 'Research',
    description:
      'We immerse in your product vision, users, and constraints — mapping the problem before writing code.',
  },
  {
    number: '02',
    title: 'Design',
    shortLabel: 'Architecture',
    description:
      'Interfaces, flows, and architecture shaped with the same care we bring to our own products.',
  },
  {
    number: '03',
    title: 'Build',
    shortLabel: 'Execution',
    description:
      'Full-stack execution across AI, web, and cloud — shipped in tight loops with relentless attention to detail.',
  },
  {
    number: '04',
    title: 'Deliver',
    shortLabel: 'Launch',
    description:
      'Production-ready systems with the polish, performance, and reliability premium products demand.',
  },
] as const

const principles = [
  {
    title: 'Strategic discovery',
    description:
      'Every engagement starts with clarity — user research, constraints, and a shared definition of success.',
  },
  {
    title: 'Product-grade UX',
    description:
      'Interfaces and flows designed to feel intentional, premium, and effortless at every touchpoint.',
  },
  {
    title: 'Full-stack execution',
    description:
      'From architecture to deployment, we ship cohesive systems — not handoffs between disconnected teams.',
  },
  {
    title: 'Launch & iteration',
    description:
      'Production-ready delivery with the performance, polish, and reliability premium products demand.',
  },
]

const processMetrics = steps.map((step) => ({
  value: step.number,
  label: step.title,
}))

function collectProcessGalleryImages(limit = 8): string[] {
  const images: string[] = []

  for (const project of portfolioProjects) {
    const gallerySlide = project.slides?.find((slide) => slide.galleryImages?.length)
    if (gallerySlide?.galleryImages) {
      images.push(...gallerySlide.galleryImages)
    }
  }

  return Array.from(new Set(images)).slice(0, limit)
}

const processHeroImage = '/axion-dashboard.png'

interface ProcessProps {
  embedded?: boolean
  accent?: string
}

const processTheme = 'light' as const

function ProcessGrid({ accent, embedded = false }: { accent: string; embedded?: boolean }) {
  const styles = sceneThemeClasses(processTheme)

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2',
        embedded ? 'mt-6 gap-3' : 'mt-14 gap-4 md:mt-16 md:gap-6 lg:grid-cols-4'
      )}
    >
      {steps.map((step, i) => (
        <Reveal key={step.number} delay={i * 0.05}>
          <div className={cn('group relative h-full overflow-hidden rounded-2xl', styles.card, embedded ? 'p-5' : 'p-6 md:p-8')}>
            <div className="mb-5 h-px w-10" style={{ backgroundColor: accent }} />
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-zinc-500">
              Phase {step.number} · {step.shortLabel}
            </span>
            <h3
              className={cn(
                'relative mt-4 font-display font-semibold tracking-tight',
                styles.heading,
                embedded ? 'text-xl' : 'text-2xl'
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                'relative mt-3 font-body leading-relaxed',
                styles.body,
                embedded ? 'text-sm' : 'text-base'
              )}
            >
              {step.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export function Process({ embedded = false, accent = '#7c3aed' }: ProcessProps) {
  if (embedded) {
    return (
      <section
        id="process"
        className="relative min-h-0 overflow-hidden border-t border-zinc-200/80 bg-white px-5 py-6 text-zinc-950 antialiased sm:px-8"
      >
        <div className="relative mx-auto max-h-[min(88vh,720px)] w-full max-w-7xl">
          <Reveal>
            <p className="mb-2 font-heading text-xs uppercase tracking-[0.28em]" style={{ color: accent }}>
              How we work
            </p>
            <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Craft, not templates
            </h2>
          </Reveal>
          <ProcessGrid accent={accent} embedded />
        </div>
      </section>
    )
  }

  const galleryImages = collectProcessGalleryImages()
  const styles = sceneThemeClasses(processTheme)

  return (
    <div id="process" className="bg-white text-zinc-950 antialiased">
      {/* Scene 1 — Hero */}
      <section className="relative overflow-hidden bg-white px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-24 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 80% 10%, ${accent}14 0%, transparent 65%)`,
          }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-zinc-500" style={{ color: accent }}>
              How we work
            </p>
            <h1 className="mt-8 max-w-5xl font-display text-[clamp(3.25rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-zinc-950">
              Craft, not templates
            </h1>
            <p className="mt-8 max-w-3xl font-body text-2xl leading-relaxed text-zinc-600 md:text-3xl md:leading-relaxed">
              A focused four-phase process built for premium product work — from discovery through delivery.
            </p>
          </Reveal>

          <Reveal className={cn('mt-12 grid gap-8 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4', styles.borderStrong)}>
            <MetaItem label="Engagement" value="2–6 months" theme={processTheme} />
            <MetaItem label="Phases" value="4 integrated" theme={processTheme} />
            <MetaItem label="Delivery" value="Production-ready" theme={processTheme} />
            <MetaItem label="Focus" value="Product craft" theme={processTheme} />
          </Reveal>
        </div>

        <Reveal className="relative mx-auto mt-16 max-w-[1400px]" delay={0.1}>
          <HeroVisual src={processHeroImage} alt="Product work from our studio" accent={accent} theme={processTheme} />
        </Reveal>
      </section>

      {/* Scene 2 — Philosophy */}
      <StatementScene
        eyebrow="The Philosophy"
        headline="Premium products deserve a process that matches."
        body="We treat every engagement like a studio case study — strategic discovery, cinematic design, and engineering that ships. No generic playbooks. No documentation-first delivery."
        pullQuote="Every phase is designed to create clarity, momentum, and a product you are proud to launch."
        accent={accent}
        align="center"
        theme={processTheme}
      />

      {/* Scene 3 — Sticky process walkthrough */}
      <StickyStorySection
        eyebrow="The Process"
        title="Four phases. One cohesive arc."
        intro="Each phase builds on the last — moving from insight to interface to implementation to launch."
        steps={steps.map((step) => ({
          title: step.title,
          description: step.description,
        }))}
        accent={accent}
        theme={processTheme}
      />

      {/* Scene 4 — Execution in practice */}
      <FullBleedVisual
        eyebrow="In Practice"
        title="Design and engineering in the same rhythm."
        body="We work in tight loops — validating flows with real interfaces, refining architecture alongside UX, and shipping incrementally so momentum never stalls."
        pullQuote="The same visual rigor you see in our portfolio is how we build for clients."
        image="/hf-products.png"
        accent={accent}
        theme={processTheme}
      />

      {/* Scene 5 — Capabilities */}
      <FeatureGridScene
        eyebrow="What You Get"
        title="End-to-end craft across every layer."
        body="From strategy to shipped product — one team, one standard, one cohesive experience."
        features={principles}
        accent={accent}
        theme={processTheme}
      />

      {/* Scene 6 — Phase metrics */}
      <MetricsShowcase
        eyebrow="The Phases"
        headline="Structured for momentum."
        subline="Each phase has a clear outcome — so you always know where we are and what comes next."
        metrics={processMetrics}
        accent={accent}
        theme={processTheme}
      />

      {/* Scene 7 — Studio showcase */}
      {galleryImages.length > 0 && (
        <ParallaxGallery
          title="Built with the same standard."
          description="A glimpse of the product experiences we craft across industries — from platforms to AI systems."
          images={galleryImages}
          accent={accent}
          theme={processTheme}
        />
      )}

      {/* Scene 8 — Closing */}
      <StatementScene
        eyebrow="Next Step"
        headline="Ready when you are."
        body="When the case study ends, the conversation begins. Scroll down to connect — or explore more work from the portfolio."
        accent={accent}
        align="center"
        theme={processTheme}
      />
    </div>
  )
}
