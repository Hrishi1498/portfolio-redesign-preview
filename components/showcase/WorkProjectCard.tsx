'use client'

import Image from 'next/image'
import type { PortfolioProject } from '@/lib/portfolio-data'
import { heroImage } from '@/components/showcase/case-study/utils'
import { fromPortfolioProject } from '@/lib/case-study-project'
import { getProjectTags } from '@/lib/project-utils'
import { releaseHomeScrollLock } from '@/lib/home-scroll-lock'
import { WorkProjectLink } from '@/components/showcase/WorkProjectLink'
import {
  getStackLayerWidth,
  getStackTop,
} from '@/components/showcase/work-card-stack'
import { cn } from '@/lib/utils'

interface WorkProjectCardProps {
  project: PortfolioProject
  index: number
  totalCount: number
  onNavigate?: () => void
}
const WORK_CARD_ASPECT = '1024/490'
const WORK_CARD_IMAGE_SLUGS = new Set(['healthy-fasal', 'course-companion', 'axion-plan'])
/** Mockup caps at 52rem (832px); request full source width for retina. */
const WORK_CARD_IMAGE_SIZES = '(max-width: 768px) calc(100vw - 3rem), 832px'

function getWorkCardCover(project: PortfolioProject): string | undefined {
  if (!WORK_CARD_IMAGE_SLUGS.has(project.slug)) return undefined
  if (project.images.cover) return project.images.cover
  return heroImage(fromPortfolioProject(project))
}

function getPreviewUrl(project: PortfolioProject): string {
  if (project.links.live) {
    try {
      return new URL(project.links.live).hostname.replace(/^www\./, '')
    } catch {
      return project.links.live
    }
  }
  return `${project.slug.replace(/-/g, '')}.com`
}

function ScreenshotVisual({
  project,
  cover,
}: {
  project: PortfolioProject
  cover?: string
}) {
  const previewUrl = getPreviewUrl(project)

  return (
    <div className="group/work-img relative w-full min-w-0 self-center md:max-w-[min(100%,52rem)] md:flex-[0_1_62%]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-20 blur-3xl transition-opacity duration-500 group-hover/work-img:opacity-30"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(0,0,0,0.06) 0%, transparent 72%)' }}
      />

      <div
        className={cn(
          'overflow-hidden rounded-2xl border border-black bg-white',
          'shadow-[0_22px_70px_-28px_rgba(15,23,42,0.22)]',
          'transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
          'group-hover/work-img:-translate-y-1',
          'group-hover/work-img:shadow-[0_32px_90px_-26px_rgba(15,23,42,0.28)]'
        )}
      >
        <div className="flex items-center gap-3 border-b border-black bg-[#f7f7f8] px-4 py-3">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex h-7 min-w-0 flex-1 items-center justify-center rounded-md bg-white px-3 ring-1 ring-zinc-200/90">
            <span className="truncate font-body text-[11px] tracking-[-0.01em] text-zinc-400">
              {previewUrl}
            </span>
          </div>
        </div>

        <div
          className={cn(
            'relative overflow-hidden',
            project.slug === 'axion-plan' ? 'bg-[#050505]' : 'bg-zinc-100'
          )}
          style={{ aspectRatio: WORK_CARD_ASPECT }}
        >
          {cover ? (
            <div className="absolute inset-0 transition-transform duration-[650ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/work-img:scale-[1.015]">
              <Image
                src={cover}
                alt={`${project.title} preview`}
                fill
                unoptimized
                className="object-cover object-top"
                sizes={WORK_CARD_IMAGE_SIZES}
                priority={
                  project.slug === 'healthy-fasal' ||
                  project.slug === 'course-companion' ||
                  project.slug === 'axion-plan'
                }
              />
            </div>
          ) : null}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]" />
        </div>
      </div>
    </div>
  )
}

function ProjectVisual({ project }: { project: PortfolioProject }) {
  return <ScreenshotVisual project={project} cover={getWorkCardCover(project)} />
}

export function WorkProjectCard({ project, index, totalCount, onNavigate }: WorkProjectCardProps) {
  const hasStory = Boolean(project.slides?.length)
  const href = hasStory ? `/work/${project.slug}` : project.links.live
  const tags = getProjectTags(project)
  const number = String(index + 1).padStart(2, '0')
  const reversed = index % 2 === 1
  const linkLabel = hasStory
    ? 'View Case Study'
    : (project.links.ctaLabel ?? (project.links.live ? 'View Project' : 'Explore Project'))

  const handleNavigate = () => {
    onNavigate?.()
    releaseHomeScrollLock()
  }

  const info = (
    <div className="flex min-w-0 flex-1 flex-col gap-5 self-center md:gap-6 lg:max-w-[36rem] xl:max-w-[40rem]">
      <div className="relative overflow-visible py-1">
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-[42%] select-none font-caslon text-[clamp(5rem,12vw,13rem)] font-normal leading-[0.74] tracking-[-0.05em] text-zinc-200/60 proportional-nums"
        >
          {number}
        </span>

        <div className="relative z-10 flex flex-col gap-4">
          <h3 className="font-display text-[clamp(3.1rem,5.35vw,4.625rem)] font-medium leading-[1.02] tracking-[-0.04em] text-zinc-950">
            {project.title}
          </h3>
          <p className="font-heading text-xs font-normal uppercase tracking-[0.08em] text-zinc-500 md:text-sm">
            {tags}
          </p>
        </div>
      </div>

      <p className="max-w-2xl font-body text-[1.375rem] leading-[1.4] tracking-[-0.01em] text-zinc-600 md:text-[1.5rem] md:leading-[1.35] lg:text-[1.625rem]">
        {project.description}
      </p>

      {href ? <WorkProjectLink href={href} label={linkLabel} onNavigate={handleNavigate} /> : null}
    </div>
  )

  const stackTop = getStackTop(index)
  const stackWidth = getStackLayerWidth(index, totalCount)

  return (
    <div
      className={cn(
        'sticky mx-auto rounded-t-[2rem] border-t-[3px] border-black bg-white md:rounded-t-[2.5rem]',
        index > 0 && 'shadow-[0_-6px_16px_-4px_rgba(0,0,0,0.35)]'
      )}
      style={{
        zIndex: index + 1,
        top: stackTop,
        width: stackWidth,
        minHeight: `calc(100svh - ${stackTop}px)`,
      }}
    >
      <article
        className={cn(
          'flex min-h-full w-full min-w-0 flex-col items-stretch gap-10 px-6 py-14 sm:px-8 md:flex-row md:items-center md:gap-[clamp(2rem,5vw,4.5rem)] md:px-10 md:py-20 lg:gap-[clamp(2.5rem,6vw,5.5rem)] lg:px-12 lg:py-[clamp(3.5rem,8vw,6.5rem)] xl:px-14',
          reversed && 'md:flex-row-reverse'
        )}
      >
        <ProjectVisual project={project} />
        {info}
      </article>
    </div>
  )
}
