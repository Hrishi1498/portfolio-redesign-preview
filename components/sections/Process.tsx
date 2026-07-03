'use client'

import { BlurTextAnimation } from '@/components/ui/BlurTextAnimation'
import { cn } from '@/lib/utils'
import { MetricsShowcase } from '@/components/showcase/case-study/MetricsShowcase'
import { StickyStorySection } from '@/components/showcase/case-study/StickyStorySection'
import {
  FeatureGridScene,
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
      'We immerse in your product vision, users, and constraints, mapping the problem before writing code.',
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
      'Full-stack execution across AI, web, and cloud, shipped in tight loops with relentless attention to detail.',
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
      'Every engagement starts with clarity, user research, constraints, and a shared definition of success.',
  },
  {
    title: 'Product-grade UX',
    description:
      'Interfaces and flows designed to feel intentional, premium, and effortless at every touchpoint.',
  },
  {
    title: 'Full-stack execution',
    description:
      'From architecture to deployment, we ship cohesive systems, not handoffs between disconnected teams.',
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

const blurText = true

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
        <div
          key={step.number}
          className={cn('group relative h-full overflow-hidden rounded-2xl', styles.card, embedded ? 'p-5' : 'p-6 md:p-8')}
        >
          <div className="mb-5 h-px w-10" style={{ backgroundColor: accent }} />
          <BlurTextAnimation
            as="p"
            text={`Phase ${step.number} · ${step.shortLabel}`}
            variant="label"
            theme="light"
            textClassName="font-heading text-xs uppercase tracking-[0.2em] text-zinc-500"
            startDelay={i * 0.04}
          />
          <h3
            className={cn(
              'relative mt-4 font-display font-semibold tracking-tight',
              styles.heading,
              embedded ? 'text-xl' : 'text-2xl'
            )}
          >
            <BlurTextAnimation
              as="span"
              text={step.title}
              variant="headline"
              theme="light"
              startDelay={i * 0.04 + 0.06}
            />
          </h3>
          <BlurTextAnimation
            as="p"
            text={step.description}
            variant="body"
            theme="light"
            className={cn('relative mt-3 font-body', styles.body, embedded ? 'text-sm' : 'text-base')}
            startDelay={i * 0.04 + 0.12}
          />
        </div>
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
          <p className="mb-2 font-heading text-xs uppercase tracking-[0.28em]" style={{ color: accent }}>
            <BlurTextAnimation as="span" text="How we work" variant="label" theme="light" />
          </p>
          <BlurTextAnimation
            text="Craft, not templates"
            className="mb-8"
            textClassName="font-display font-bold text-zinc-950 text-3xl sm:text-4xl"
            theme="light"
            variant="headline"
          />
          <ProcessGrid accent={accent} embedded />
        </div>
      </section>
    )
  }

  const styles = sceneThemeClasses(processTheme)

  return (
    <div id="process" className="bg-white text-zinc-950 antialiased">
      {/* Scene 1 - Hero */}
      <section className="relative overflow-hidden bg-white px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-24 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 80% 10%, ${accent}14 0%, transparent 65%)`,
          }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          <p className="font-heading text-sm uppercase tracking-[0.28em]" style={{ color: accent }}>
            <BlurTextAnimation as="span" text="How we work" variant="label" theme="light" />
          </p>
          <BlurTextAnimation
            text="Craft, not templates"
            className="mt-8 max-w-5xl"
            textClassName="font-display font-bold text-zinc-950 text-[clamp(3.25rem,9vw,7.5rem)]"
            theme="light"
            variant="headline"
            startDelay={0.08}
          />
          <BlurTextAnimation
            text="A focused four-phase process built for premium product work, from discovery through delivery."
            className="mt-8 max-w-3xl font-body text-2xl text-zinc-600 md:text-3xl"
            theme="light"
            variant="body"
            startDelay={0.18}
          />

          <div className={cn('mt-12 grid gap-8 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4', styles.borderStrong)}>
            <MetaItem label="Engagement" value="2–6 months" theme={processTheme} blurText startDelay={0.1} />
            <MetaItem label="Phases" value="4 integrated" theme={processTheme} blurText startDelay={0.14} />
            <MetaItem label="Delivery" value="Production-ready" theme={processTheme} blurText startDelay={0.18} />
            <MetaItem label="Focus" value="Product craft" theme={processTheme} blurText startDelay={0.22} />
          </div>
        </div>
      </section>

      <StatementScene
        eyebrow="The Philosophy"
        headline="Premium products deserve a process that matches."
        body="We treat every engagement like a studio case study, strategic discovery, cinematic design, and engineering that ships. No generic playbooks. No documentation-first delivery."
        pullQuote="Every phase is designed to create clarity, momentum, and a product you are proud to launch."
        accent={accent}
        align="center"
        theme={processTheme}
        blurText={blurText}
      />

      <StickyStorySection
        eyebrow="The Process"
        title="Four phases. One cohesive arc."
        intro="Each phase builds on the last, moving from insight to interface to implementation to launch."
        steps={steps.map((step) => ({
          title: step.title,
          description: step.description,
        }))}
        accent={accent}
        theme={processTheme}
        blurText={blurText}
      />

      <StatementScene
        eyebrow="In Practice"
        headline="Design and engineering in the same rhythm."
        body="We work in tight loops, validating flows with real interfaces, refining architecture alongside UX, and shipping incrementally so momentum never stalls."
        pullQuote="The same visual rigor you see in our portfolio is how we build for clients."
        accent={accent}
        align="center"
        theme={processTheme}
        blurText={blurText}
      />

      <FeatureGridScene
        eyebrow="What You Get"
        title="End-to-end craft across every layer."
        body="From strategy to shipped product, one team, one standard, one cohesive experience."
        features={principles}
        accent={accent}
        theme={processTheme}
        blurText={blurText}
      />

      <MetricsShowcase
        eyebrow="The Phases"
        headline="Structured for momentum."
        subline="Each phase has a clear outcome, so you always know where we are and what comes next."
        metrics={processMetrics}
        accent={accent}
        theme={processTheme}
        blurText={blurText}
      />

      <StatementScene
        eyebrow="Next Step"
        headline="Ready when you are."
        body="When the case study ends, the conversation begins. Scroll down to connect, or explore more work from the portfolio."
        accent={accent}
        align="center"
        theme={processTheme}
        blurText={blurText}
      />
    </div>
  )
}
