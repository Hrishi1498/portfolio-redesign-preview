'use client'

import Link from 'next/link'
import { type ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import type { CaseStudyProject } from '@/lib/case-study-project'
import { portfolioProjects } from '@/lib/portfolio-data'
import type { StorySlide } from '@/lib/story-slide'
import { MetricsShowcase } from '@/components/showcase/case-study/MetricsShowcase'
import { CaseStudyStatsBlock } from '@/components/showcase/case-study/CaseStudyStatsBlock'
import { StickyStorySection } from '@/components/showcase/case-study/StickyStorySection'
import { ParallaxGallery } from '@/components/showcase/case-study/ParallaxGallery'
import {
  CASE_STUDY_UI_ASPECT,
  CaseStudyScreenshot,
} from '@/components/showcase/case-study/CaseStudyScreenshot'
import { liveUrlLabel } from '@/components/showcase/case-study/screenshot-frame'
import {
  ChapterMarker,
  FeatureGridScene,
  FullBleedVisual,
  MetaItem,
  StatementScene,
  TestimonialScene,
} from '@/components/showcase/case-study/CaseStudyScenes'
import { PORTFOLIO_SECTION_HREF } from '@/lib/site'
import {
  heroImage,
  slideChapterLabel,
  stickySourceSlide,
  stickyStoryFromSlides,
  type SceneTheme,
} from '@/components/showcase/case-study/utils'

interface AgencyCaseStudyProps {
  project: CaseStudyProject
  backHref?: string
}

function sectionTheme(chapterNumber: number): SceneTheme {
  return chapterNumber % 2 === 0 ? 'light' : 'dark'
}

export function AgencyCaseStudy({ project, backHref = PORTFOLIO_SECTION_HREF }: AgencyCaseStudyProps) {
  const slides = project.slides ?? []
  const accent = project.color
  const snapshotMetrics = project.metrics ?? []
  const coverSrc = heroImage(project)

  let chapterNum = 0
  const nextChapter = (label: string) => {
    chapterNum += 1
    return { number: chapterNum, label, theme: sectionTheme(chapterNum) }
  }

  const stickySource = stickySourceSlide(slides)
  const stickyStory = stickyStoryFromSlides(slides)
  let stickyRendered = false

  const deviceLabel = liveUrlLabel(project.liveUrl, `${project.slug.replace(/-/g, '')}.com`)
  const conclusionSlide = slides.find((s) => s.type === 'conclusion') ?? slides[slides.length - 1]

  const currentIndex = portfolioProjects.findIndex((p) => p.slug === project.slug)
  const nextProject =
    currentIndex >= 0
      ? portfolioProjects[(currentIndex + 1) % portfolioProjects.length]
      : portfolioProjects[0]

  const renderStatement = (
    slide: StorySlide,
    ch: { number: number; label: string; theme: SceneTheme },
    align: 'left' | 'center' = 'left'
  ) => (
    <StatementScene
      key={slide.id}
      chapterNumber={ch.number}
      chapterLabel={ch.label}
      headline={slide.title ?? ch.label}
      body={slide.content}
      pullQuote={slide.highlight}
      accent={accent}
      align={align}
      theme={ch.theme}
    />
  )

  const slideSections: ReactNode[] = []

  for (const slide of slides) {
    const ch = nextChapter(slideChapterLabel(slide.type))

    if (
      stickyStory &&
      stickySource?.id === slide.id &&
      !stickyRendered &&
      (slide.type === 'process' || slide.type === 'architecture')
    ) {
      stickyRendered = true
      slideSections.push(
        <StickyStorySection
          key={`sticky-${slide.id}`}
          chapterNumber={ch.number}
          chapterLabel={ch.label}
          title={stickyStory.title}
          intro={stickyStory.intro}
          steps={stickyStory.steps}
          accent={accent}
          theme={ch.theme}
        />
      )
      continue
    }

    switch (slide.type) {
      case 'intro':
      case 'problem':
      case 'solution':
      case 'insight':
        slideSections.push(
          renderStatement(slide, ch, slide.type === 'problem' ? 'center' : 'left')
        )
        break

      case 'scene':
        if (slide.image) {
          slideSections.push(
            <FullBleedVisual
              key={slide.id}
              chapterNumber={ch.number}
              chapterLabel={ch.label}
              title={slide.title ?? project.title}
              body={slide.content}
              pullQuote={slide.highlight}
              image={slide.image}
              accent={accent}
              layout="cinematic"
              theme={ch.theme}
              imageAspect={slide.imageAspect}
              screenshotFrame={project.screenshotFrame}
              screenshotStyle={project.screenshotStyle}
              slideFrame={slide.imageFrame}
              deviceLabel={deviceLabel}
              imageFit={slide.imageFit}
            />
          )
        } else {
          slideSections.push(renderStatement(slide, ch))
        }
        break

      case 'process':
      case 'architecture':
        slideSections.push(renderStatement(slide, ch))
        break

      case 'features':
        if (slide.features?.length) {
          slideSections.push(
            <FeatureGridScene
              key={slide.id}
              chapterNumber={ch.number}
              chapterLabel={ch.label}
              title={slide.title ?? 'Capabilities'}
              body={slide.content}
              features={slide.features}
              accent={accent}
              theme={ch.theme}
            />
          )
        }
        break

      case 'stats':
        if (slide.stats?.length) {
          slideSections.push(
            <CaseStudyStatsBlock
              key={slide.id}
              slide={slide}
              accent={accent}
              chapterNumber={ch.number}
              chapterLabel={ch.label}
            />
          )
        }
        break

      case 'gallery':
        if (slide.galleryImages?.length) {
          slideSections.push(
            <ParallaxGallery
              key={slide.id}
              chapterNumber={ch.number}
              chapterLabel={ch.label}
              title={slide.title ?? 'Project Gallery'}
              description={slide.content}
              images={slide.galleryImages}
              accent={accent}
              theme={ch.theme}
              screenshotFrame={project.screenshotFrame}
              screenshotStyle={project.screenshotStyle}
              deviceLabel={deviceLabel}
            />
          )
        }
        break

      case 'conclusion':
        if (slide.image) {
          slideSections.push(
            <FullBleedVisual
              key={slide.id}
              chapterNumber={ch.number}
              chapterLabel={ch.label}
              title={slide.title ?? project.title}
              body={slide.content}
              pullQuote={slide.highlight}
              image={slide.image}
              accent={accent}
              layout="cinematic"
              theme={ch.theme}
              imageAspect={slide.imageAspect}
              screenshotFrame={project.screenshotFrame}
              screenshotStyle={project.screenshotStyle}
              slideFrame={slide.imageFrame}
              deviceLabel={deviceLabel}
              imageFit={slide.imageFit}
            />
          )
        } else {
          slideSections.push(renderStatement(slide, ch, 'center'))
        }
        break

      case 'testimonial':
        slideSections.push(
          <TestimonialScene
            key={slide.id}
            chapterNumber={ch.number}
            chapterLabel={ch.label}
            quote={slide.highlight ?? slide.content}
            attribution={slide.title ?? slide.dialogue}
            accent={accent}
            theme={ch.theme}
          />
        )
        break

      default:
        slideSections.push(renderStatement(slide, ch))
        break
    }
  }

  const metricsChapter = nextChapter(project.metricsSection?.eyebrow ?? 'Results & Impact')
  const closingChapter = nextChapter('Next Project')

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

      {/* Cinematic hero */}
      <section className="relative flex min-h-[min(100vh,920px)] flex-col justify-end overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 70% -10%, ${accent}30 0%, transparent 55%), linear-gradient(to bottom, #0a0a0a 0%, #050505 100%)`,
          }}
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40 lg:px-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 font-heading text-xs uppercase tracking-[0.16em] text-zinc-300 backdrop-blur-sm">
                {project.industry}
              </span>
              {project.year && (
                <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 font-heading text-xs uppercase tracking-[0.16em] text-zinc-300 backdrop-blur-sm">
                  {project.duration} · {project.year}
                </span>
              )}
              {project.tech.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 font-heading text-xs uppercase tracking-[0.16em] text-zinc-400 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-10 max-w-5xl font-display text-[clamp(3.5rem,10vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.05em] text-white">
              {project.title}
            </h1>
            <p className="mt-8 max-w-3xl font-body text-xl leading-relaxed text-zinc-300 md:text-2xl md:leading-relaxed lg:text-3xl">
              {project.tagline}
            </p>

            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-heading text-sm uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/15"
              >
                View live product →
              </a>
            )}
          </Reveal>

          <Reveal className="mt-14 grid gap-8 border-t border-white/[0.12] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <MetaItem label="Industry" value={project.industry} />
            <MetaItem label="Timeline" value={project.duration} />
            <MetaItem label="Role" value={project.role} />
            <MetaItem
              label="Stack"
              value={project.tech.length > 0 ? project.tech.slice(0, 3).join(' · ') : project.categoryLabel}
            />
          </Reveal>

          {coverSrc && (
            <Reveal className="mt-14 md:mt-16">
              <CaseStudyScreenshot
                src={coverSrc}
                alt={project.title}
                layout="cinematic"
                aspectRatio={project.coverAspect ?? CASE_STUDY_UI_ASPECT}
                frameTheme={project.screenshotFrame ?? 'light'}
                sectionTheme="dark"
                frameVariant={project.screenshotStyle === 'device' ? 'device' : undefined}
                projectStyle={project.screenshotStyle}
                deviceLabel={deviceLabel}
                imageFit="contain"
                className="mx-auto"
              />
            </Reveal>
          )}
        </div>
      </section>

      {slideSections}

      <MetricsShowcase
        chapterNumber={metricsChapter.number}
        chapterLabel={metricsChapter.label}
        headline={project.metricsSection?.headline ?? 'Built for scale. Proven in market.'}
        metrics={snapshotMetrics}
        accent={accent}
        theme={metricsChapter.theme}
      />

      <section className="relative z-10 border-t border-white/[0.06] bg-[#050505] px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-44 lg:px-16 lg:pt-52">
        <div className="mx-auto max-w-7xl text-center">
          <Reveal>
            <ChapterMarker
              number={closingChapter.number}
              label={closingChapter.label}
              accent={accent}
              align="center"
            />
            <h2 className="mt-8 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-bold tracking-[-0.03em] text-white">
              {nextProject?.title ?? conclusionSlide?.title ?? 'Continue exploring our work'}
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
