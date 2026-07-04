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
    description:
      'We immerse in your product vision, users, and constraints, mapping the problem before writing code.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Interfaces, flows, and architecture shaped with the same care we bring to our own products.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Full-stack execution across AI, web, and cloud, shipped in tight loops with relentless attention to detail.',
  },
  {
    number: '04',
    title: 'Deliver',
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
  accent?: string
}

const processTheme = 'light' as const

export function Process({ accent = '#7c3aed' }: ProcessProps) {
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
            className="mt-8 whitespace-nowrap md:-translate-x-3"
            textClassName="font-display font-bold text-zinc-950 text-[clamp(1.75rem,calc((100vw-3rem)/10.2),7.5rem)] md:text-[clamp(4rem,11vw,9rem)]"
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
