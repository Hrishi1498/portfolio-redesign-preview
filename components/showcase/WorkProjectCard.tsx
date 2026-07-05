'use client'

import Image from 'next/image'
import type { PortfolioProject } from '@/lib/portfolio-data'
import { getCategoryLabel, getIndustry } from '@/lib/project-utils'
import { WorkProjectLink } from '@/components/showcase/WorkProjectLink'
import { cn } from '@/lib/utils'

interface WorkProjectCardProps {
  project: PortfolioProject
  index: number
  /** When false, shows the screenshot frame without a photo inside. */
  showImage?: boolean
}

const WORK_CARD_ASPECT = '1024/490'
const WORK_CARD_IMAGE_SIZES = '(max-width: 768px) calc(100vw - 3rem), 1100px'

function getWorkCardCover(project: PortfolioProject): string | undefined {
  return project.images.workCover ?? project.images.cover
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

function ArticleFigure({
  project,
  cover,
}: {
  project: PortfolioProject
  cover?: string
}) {
  const previewUrl = getPreviewUrl(project)

  return (
    <figure className="group/work-img w-full min-w-0 md:w-[min(58%,42rem)] md:flex-none lg:w-[min(60%,48rem)]">
      <div className="overflow-hidden rounded-xl border-[3px] border-black bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.18)]">
        <div className="flex items-center gap-3 border-b-[3px] border-black bg-[#f7f7f8] px-3.5 py-2.5">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex h-6 min-w-0 flex-1 items-center justify-center rounded-md bg-white px-3 ring-1 ring-zinc-200/90">
            <span className="truncate font-body text-[10px] tracking-[-0.01em] text-zinc-400">
              {previewUrl}
            </span>
          </div>
        </div>

        <div
          className={cn(
            'relative overflow-hidden',
            !cover ||
              project.images.screenshotFrame === 'dark' ||
              project.slug === 'axion-plan'
              ? 'bg-[#050505]'
              : 'bg-zinc-100'
          )}
          style={{ aspectRatio: WORK_CARD_ASPECT }}
        >
          {cover ? (
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
          ) : null}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]" />
        </div>
      </div>
      <figcaption className="mt-3 font-heading text-[11px] uppercase tracking-[0.12em] text-zinc-400">
        {previewUrl}
      </figcaption>
    </figure>
  )
}

export function WorkProjectCard({
  project,
  index,
  showImage = true,
}: WorkProjectCardProps) {
  const hasStory = Boolean(project.slides?.length)
  const href = hasStory ? `/projects/${project.slug}` : project.links.live
  const number = String(index + 1).padStart(2, '0')
  const category = getCategoryLabel(project.category)
  const industry = getIndustry(project)
  const kickerParts = [number, category, industry !== category ? industry : null, project.year].filter(
    Boolean
  )
  const linkLabel = hasStory
    ? 'Read case study'
    : (project.links.ctaLabel ?? (project.links.live ? 'View project' : 'Explore project'))

  const cover = showImage ? getWorkCardCover(project) : undefined
  const alignRight = index % 2 === 1

  const copy = (
    <div className="flex min-w-0 flex-col gap-4 self-center md:max-w-[min(100%,34rem)] md:flex-1 md:gap-5 lg:max-w-[min(100%,38rem)] xl:max-w-[min(100%,42rem)]">
      <p className="font-heading text-[11px] font-normal uppercase tracking-[0.16em] text-zinc-500 md:text-xs">
        {kickerParts.join(' · ')}
      </p>
      <h3 className="font-display text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-zinc-950">
        {project.title}
      </h3>
      <p className="max-w-none font-body text-base leading-[1.5] tracking-[-0.01em] text-zinc-600 md:text-[1.0625rem] md:leading-[1.5]">
        {project.description}
      </p>
      {href ? <WorkProjectLink href={href} label={linkLabel} /> : null}
    </div>
  )

  return (
    <article className="w-full">
      <div
        className={cn(
          'flex w-full flex-col gap-10 px-6 py-14 sm:px-8 md:items-center md:px-10 md:py-20 lg:px-14 lg:py-24 xl:px-20',
          // Mobile: stacked. Desktop: frame beside copy on opposite ends.
          alignRight
            ? 'md:flex-row-reverse md:justify-between md:gap-x-12 lg:gap-x-16 xl:gap-x-20'
            : 'md:flex-row md:justify-between md:gap-x-12 lg:gap-x-16 xl:gap-x-20'
        )}
      >
        {copy}
        <ArticleFigure project={project} cover={cover} />
      </div>
    </article>
  )
}
