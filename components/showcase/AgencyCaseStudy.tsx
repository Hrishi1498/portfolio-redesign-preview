'use client'

import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import type { CaseStudyProject } from '@/lib/case-study-project'
import { portfolioProjects } from '@/lib/portfolio-data'
import { MetricsShowcase } from '@/components/showcase/case-study/MetricsShowcase'
import { CaseStudyStatsBlock } from '@/components/showcase/case-study/CaseStudyStatsBlock'
import { StickyStorySection } from '@/components/showcase/case-study/StickyStorySection'
import {
  FeatureGridScene,
  FullBleedVisual,
  MetaItem,
  StatementScene,
} from '@/components/showcase/case-study/CaseStudyScenes'
import {
  slideChapterLabel,
  stickyStoryFromSlides,
} from '@/components/showcase/case-study/utils'

interface AgencyCaseStudyProps {
  project: CaseStudyProject
  backHref?: string
}

export function AgencyCaseStudy({ project, backHref = '/projects' }: AgencyCaseStudyProps) {
  const slides = project.slides ?? []
  const accent = project.color
  const snapshotMetrics = project.metrics ?? []
  const statsSlides = slides.filter((s) => s.type === 'stats' && s.stats?.length)

  const problemSlide = slides.find((s) => s.type === 'problem')
  const solutionSlide = slides.find((s) => s.type === 'solution')
  const featuresSlide = slides.find((s) => s.type === 'features')
  const conclusionSlide = slides.find((s) => s.type === 'conclusion') ?? slides[slides.length - 1]
  const stickyStory = stickyStoryFromSlides(slides)

  const platformSlides = slides.filter(
    (s) => s.type === 'scene' && s.image && s.id !== problemSlide?.id
  )

  const usedSlideIds = new Set<number>([
    problemSlide?.id,
    solutionSlide?.id,
    featuresSlide?.id,
    conclusionSlide?.id,
    ...platformSlides.map((s) => s.id),
    ...statsSlides.map((s) => s.id),
  ].filter((id): id is number => id !== undefined))

  if (stickyStory) {
    const stickySource = slides.find((s) => s.steps?.length || s.layers?.length)
    if (stickySource) usedSlideIds.add(stickySource.id)
  }

  const narrativeSlides = slides.filter(
    (s) =>
      !usedSlideIds.has(s.id) &&
      s.type !== 'stats' &&
      s.type !== 'intro' &&
      s.type !== 'testimonial' &&
      !s.image &&
      !s.galleryImages?.length
  )

  const currentIndex = portfolioProjects.findIndex((p) => p.slug === project.slug)
  const nextProject =
    currentIndex >= 0
      ? portfolioProjects[(currentIndex + 1) % portfolioProjects.length]
      : portfolioProjects[0]

  return (
    <article id="case-study-article" className="bg-[#050505] text-white antialiased">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 md:px-12 lg:px-16">
          <Link
            href={backHref}
            className="font-heading text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-white"
          >
            ← Back
          </Link>
          <p className="truncate font-body text-sm text-zinc-400">{project.title}</p>
        </div>
        <div className="h-px w-full" style={{ backgroundColor: `${accent}88` }} />
      </header>

      {/* Scene 1 - Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-24 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 80% 10%, ${accent}20 0%, transparent 65%)`,
          }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 px-3 py-1 font-heading text-xs uppercase tracking-[0.16em] text-zinc-400">
                {project.industry}
              </span>
              {project.year && (
                <span className="rounded-full border border-white/10 px-3 py-1 font-heading text-xs uppercase tracking-[0.16em] text-zinc-400">
                  {project.year}
                </span>
              )}
            </div>

            <h1 className="mt-8 max-w-5xl font-display text-[clamp(3.25rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white">
              {project.title}
            </h1>
            <p className="mt-8 max-w-3xl font-body text-2xl leading-relaxed text-zinc-400 md:text-3xl md:leading-relaxed">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal className="mt-12 grid gap-8 border-t border-white/[0.08] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <MetaItem label="Industry" value={project.industry} />
            <MetaItem label="Timeline" value={project.duration} />
            <MetaItem label="Role" value={project.role} />
            <MetaItem
              label="Stack"
              value={project.tech.length > 0 ? project.tech.slice(0, 3).join(' · ') : project.categoryLabel}
            />
          </Reveal>
        </div>
      </section>

      {/* Scene 2 - Problem */}
      {problemSlide && (
        <StatementScene
          eyebrow={slideChapterLabel(problemSlide.type)}
          headline={problemSlide.title ?? 'The Problem'}
          body={problemSlide.content}
          pullQuote={problemSlide.highlight}
          accent={accent}
          align="center"
        />
      )}

      {/* Scene 3 - Solution */}
      {solutionSlide && (
        <StatementScene
          eyebrow={slideChapterLabel(solutionSlide.type)}
          headline={solutionSlide.title ?? 'The Solution'}
          body={solutionSlide.content}
          pullQuote={solutionSlide.highlight}
          accent={accent}
        />
      )}

      {/* Platform experience - full-bleed visuals */}
      {platformSlides.map((slide, index) => (
        <FullBleedVisual
          key={slide.id}
          eyebrow={slideChapterLabel(slide.type)}
          title={slide.title ?? project.title}
          body={slide.content}
          pullQuote={slide.highlight}
          image={slide.image!}
          accent={accent}
          reverse={index % 2 === 1}
          imageAspect={slide.imageAspect}
          screenshotFrame={project.screenshotFrame}
          imageFit={slide.imageFit}
        />
      ))}

      {/* Sticky storytelling */}
      {stickyStory && (
        <StickyStorySection
          eyebrow={stickyStory.eyebrow}
          title={stickyStory.title}
          intro={stickyStory.intro}
          steps={stickyStory.steps}
          accent={accent}
        />
      )}

      {/* Capabilities */}
      {featuresSlide?.features?.length ? (
        <FeatureGridScene
          eyebrow={slideChapterLabel(featuresSlide.type)}
          title={featuresSlide.title ?? 'Capabilities'}
          body={featuresSlide.content}
          features={featuresSlide.features}
          accent={accent}
        />
      ) : null}

      {/* Stats chapters — impact numbers or access matrices */}
      {statsSlides.map((slide) => (
        <CaseStudyStatsBlock key={slide.id} slide={slide} accent={accent} />
      ))}

      {/* Extra narrative beats without visuals */}
      {narrativeSlides.map((slide) => (
        <StatementScene
          key={slide.id}
          eyebrow={slideChapterLabel(slide.type)}
          headline={slide.title ?? slideChapterLabel(slide.type)}
          body={slide.content}
          pullQuote={slide.highlight}
          accent={accent}
          align={slide.type === 'conclusion' ? 'center' : 'left'}
        />
      ))}

      {/* Project snapshot / results metrics */}
      <MetricsShowcase
        eyebrow={project.metricsSection?.eyebrow ?? 'Results & Impact'}
        headline={project.metricsSection?.headline ?? 'Built for scale. Proven in market.'}
        subline={conclusionSlide?.content}
        metrics={snapshotMetrics}
        accent={accent}
      />

      {/* Closing CTA */}
      <section className="relative z-10 border-t border-white/[0.06] bg-[#050505] px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-44 lg:px-16 lg:pt-52">
        <div className="mx-auto max-w-7xl text-center">
          <Reveal>
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-zinc-500" style={{ color: accent }}>
              Next Project
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-bold tracking-[-0.03em] text-white">
              {conclusionSlide?.title ?? 'Continue exploring our work'}
            </h2>
            {conclusionSlide?.highlight && (
              <p className="mx-auto mt-6 max-w-2xl font-body text-xl text-zinc-400 md:text-2xl">
                {conclusionSlide.highlight}
              </p>
            )}
          </Reveal>

          <Reveal className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 font-heading text-sm uppercase tracking-[0.18em] text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
              >
                View live product
              </a>
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center rounded-full px-6 py-3 font-heading text-sm uppercase tracking-[0.18em] text-[#050505] transition-opacity hover:opacity-90"
                style={{ backgroundColor: accent }}
              >
                Next case study: {nextProject.title}
              </Link>
            )}
          </Reveal>
        </div>
      </section>
    </article>
  )
}
