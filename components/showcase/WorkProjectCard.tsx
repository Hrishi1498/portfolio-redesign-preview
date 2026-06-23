'use client'

import Image from 'next/image'
import type { PortfolioProject } from '@/lib/portfolio-data'
import { heroImage } from '@/components/showcase/case-study/utils'
import { fromPortfolioProject } from '@/lib/case-study-project'
import { getProjectTags, isLogoAsset } from '@/lib/project-utils'
import { releaseHomeScrollLock } from '@/lib/home-scroll-lock'
import { WorkProjectLink } from '@/components/showcase/WorkProjectLink'
import { cn } from '@/lib/utils'

interface WorkProjectCardProps {
  project: PortfolioProject
  index: number
  onNavigate?: () => void
}

function getWorkCardCover(project: PortfolioProject): string | undefined {
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
  aspectRatio,
}: {
  project: PortfolioProject
  cover: string
  aspectRatio: string
}) {
  const previewUrl = getPreviewUrl(project)

  return (
    <div className="group/work-img relative w-full min-w-0 self-start md:max-w-[min(100%,52rem)] md:flex-[0_1_62%]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-30 blur-3xl transition-opacity duration-500 group-hover/work-img:opacity-45"
        style={{ background: `radial-gradient(circle at 50% 40%, ${project.color}88 0%, transparent 72%)` }}
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

        <div className="relative overflow-hidden bg-zinc-100" style={{ aspectRatio }}>
          <Image
            src={cover}
            alt={`${project.title} preview`}
            fill
            className="object-cover object-center transition-transform duration-[650ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/work-img:scale-[1.015]"
            sizes="(max-width: 1024px) 100vw, 62vw"
            priority={project.slug === 'healthy-fasal' || project.slug === 'course-companion'}
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]" />
        </div>
      </div>
    </div>
  )
}

function ProjectVisual({
  project,
  cover,
  coverAspect,
}: {
  project: PortfolioProject
  cover: string
  coverAspect?: string
}) {
  const aspectRatio = coverAspect ?? '613/460'
  const isCustomCover = Boolean(coverAspect)
  const logoOnly = isLogoAsset(cover) && !isCustomCover

  if (isCustomCover) {
    return <ScreenshotVisual project={project} cover={cover} aspectRatio={aspectRatio} />
  }

  if (logoOnly) {
    return (
      <div
        className="relative flex w-full min-w-0 items-center justify-center self-start overflow-hidden rounded-2xl border border-black bg-zinc-50 md:max-w-[min(100%,52rem)] md:flex-[0_1_62%]"
        style={{
          aspectRatio,
          background: `radial-gradient(circle at 30% 20%, ${project.color}18 0%, transparent 55%), #fafafa`,
        }}
      >
        <Image
          src={cover}
          alt={`${project.title} logo`}
          width={140}
          height={140}
          className="h-auto max-h-28 w-auto max-w-[45%] object-contain opacity-95"
        />
      </div>
    )
  }

  return (
    <div
      className="group/work-img relative w-full min-w-0 self-start overflow-hidden rounded-2xl border border-black md:max-w-[min(100%,52rem)] md:flex-[0_1_62%]"
      style={{ aspectRatio }}
    >
      <Image
        src={cover}
        alt={`${project.title} preview`}
        fill
        className="object-cover object-top transition-transform duration-[550ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/work-img:scale-[1.06]"
        sizes="(max-width: 1024px) 100vw, 62vw"
      />
    </div>
  )
}

export function WorkProjectCard({ project, index, onNavigate }: WorkProjectCardProps) {
  const hasStory = Boolean(project.slides?.length)
  const href = hasStory ? `/work/${project.slug}` : project.links.live
  const cover = getWorkCardCover(project)
  const tags = getProjectTags(project)
  const number = String(index + 1).padStart(2, '0')
  const reversed = index % 2 === 1
  const linkLabel = hasStory ? 'View case study' : project.links.live ? 'View project' : 'Explore project'

  const handleNavigate = () => {
    onNavigate?.()
    releaseHomeScrollLock()
  }

  const info = (
    <div className="flex min-w-0 flex-1 flex-col gap-5 self-start md:gap-6 lg:max-w-[36rem] xl:max-w-[40rem]">
      <div className="relative overflow-visible py-1">
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-[42%] select-none font-caslon text-[clamp(7.5rem,17vw,13rem)] font-normal leading-[0.74] tracking-[-0.05em] text-zinc-300/45 proportional-nums"
        >
          {number}
        </span>

        <div className="relative z-10 flex flex-col gap-4">
          <h3 className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-zinc-950">
            {project.title}
          </h3>
          <p className="font-heading text-xs font-normal uppercase tracking-[0.08em] text-zinc-500 md:text-[13px]">
            {tags}
          </p>
        </div>
      </div>

      <p className="max-w-2xl font-body text-xl leading-[1.4] tracking-[-0.01em] text-zinc-950 md:text-[1.375rem] md:leading-[1.35]">
        {project.description}
      </p>

      {href ? <WorkProjectLink href={href} label={linkLabel} onNavigate={handleNavigate} /> : null}
    </div>
  )

  return (
    <article
      className={cn(
        'flex w-full flex-col items-stretch gap-10 border-t border-zinc-200 py-14 md:flex-row md:items-start md:gap-[clamp(2rem,5vw,4.5rem)] md:py-20 lg:gap-[clamp(2.5rem,6vw,5.5rem)] lg:py-[clamp(3.5rem,8vw,6.5rem)]',
        reversed && 'md:flex-row-reverse'
      )}
    >
      {cover ? (
        <ProjectVisual
          project={project}
          cover={cover}
          coverAspect={project.images.coverAspect}
        />
      ) : null}
      {info}
    </article>
  )
}
