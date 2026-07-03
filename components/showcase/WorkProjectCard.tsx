'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import type { PortfolioProject } from '@/lib/portfolio-data'
import { heroImage } from '@/components/showcase/case-study/utils'
import { fromPortfolioProject } from '@/lib/case-study-project'
import { getProjectTags } from '@/lib/project-utils'
import { releaseHomeScrollLock } from '@/lib/home-scroll-lock'
import { WorkProjectLink } from '@/components/showcase/WorkProjectLink'
import {
  easeOutCubic,
  getWorkCardExitRange,
  WORK_CARD_ENTER_END,
  WORK_CARD_ENTER_OFFSET_Y,
  WORK_CARD_ENTER_OPACITY,
  WORK_CARD_ENTER_SCALE,
  WORK_CARD_EXIT_BLUR_PX,
  WORK_CARD_EXIT_LIFT_PX,
  WORK_CARD_EXIT_SCALE,
  WORK_CARD_SEGMENT_HEIGHT,
} from '@/components/showcase/work-card-stack'
import { cn } from '@/lib/utils'

interface WorkProjectCardProps {
  project: PortfolioProject
  index: number
  onNavigate?: () => void
  /** Extra scroll runway so the card recedes before the next section (e.g. Rezonna). */
  enableScrollRunway?: boolean
}

const WORK_CARD_ASPECT = '1024/490'
const WORK_CARD_IMAGE_SLUGS = new Set(['digipropass', 'healthy-fasal', 'course-companion', 'axion-plan'])
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
          'overflow-hidden rounded-2xl border-[3px] border-black bg-white',
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

export function WorkProjectCard({
  project,
  index,
  onNavigate,
  enableScrollRunway = false,
}: WorkProjectCardProps) {
  const segmentRef = useRef<HTMLDivElement>(null)
  const segmentMetricsRef = useRef({ start: 0, span: 1 })
  const cardScale = useMotionValue(1)
  const cardOpacity = useMotionValue(1)
  const cardY = useMotionValue(0)
  const cardBlur = useMotionValue(0)
  const prefersReducedMotion = useReducedMotion()
  const reduceMotion = prefersReducedMotion === true

  const [exitStart, exitEnd] = getWorkCardExitRange()
  const needsScrollAnimation = enableScrollRunway || index > 0

  useLayoutEffect(() => {
    const el = segmentRef.current
    if (!el || !needsScrollAnimation) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      segmentMetricsRef.current = {
        start: rect.top + window.scrollY,
        span: el.offsetHeight,
      }
    }

    const applyCardStyles = (progress: number) => {
      let scale = 1
      let opacity = 1
      let y = 0
      let blur = 0

      if (index > 0 && progress < WORK_CARD_ENTER_END) {
        const enterT = easeOutCubic(progress / WORK_CARD_ENTER_END)
        scale = reduceMotion ? 1 : WORK_CARD_ENTER_SCALE - enterT * (WORK_CARD_ENTER_SCALE - 1)
        y = reduceMotion ? 0 : (1 - enterT) * WORK_CARD_ENTER_OFFSET_Y
        opacity = WORK_CARD_ENTER_OPACITY + enterT * (1 - WORK_CARD_ENTER_OPACITY)
      } else if (enableScrollRunway && progress > exitStart) {
        const range = exitEnd - exitStart
        const rawT = range <= 0 ? 0 : Math.min(Math.max((progress - exitStart) / range, 0), 1)
        const exitT = easeOutCubic(rawT)

        opacity = 1 - exitT
        scale = reduceMotion ? 1 : 1 - exitT * (1 - WORK_CARD_EXIT_SCALE)
        y = reduceMotion ? 0 : exitT * WORK_CARD_EXIT_LIFT_PX
        blur = reduceMotion ? 0 : exitT * WORK_CARD_EXIT_BLUR_PX
      }

      cardOpacity.set(opacity)
      cardScale.set(scale)
      cardY.set(y)
      cardBlur.set(blur)
    }

    const updateProgress = () => {
      const { start, span } = segmentMetricsRef.current
      if (span <= 0) return
      const progress = Math.min(Math.max((window.scrollY - start) / span, 0), 1)
      applyCardStyles(progress)
    }

    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        updateProgress()
        rafId = 0
      })
    }

    const onResize = () => {
      measure()
      updateProgress()
    }

    measure()
    updateProgress()

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(el)
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [
    enableScrollRunway,
    exitEnd,
    exitStart,
    index,
    needsScrollAnimation,
    project.slug,
    cardBlur,
    cardOpacity,
    cardScale,
    cardY,
    reduceMotion,
  ])

  const filter = useTransform(cardBlur, (value) => `blur(${value}px)`)

  const hasStory = Boolean(project.slides?.length)
  const href = hasStory ? `/projects/${project.slug}` : project.links.live
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
          className="work-card-index-watermark pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-[42%] select-none font-caslon text-[clamp(5rem,12vw,13rem)] font-normal leading-[0.74] tracking-[-0.05em] proportional-nums"
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

      {href ? (
        <div className="max-md:flex max-md:justify-center">
          <WorkProjectLink href={href} label={linkLabel} onNavigate={handleNavigate} />
        </div>
      ) : null}
    </div>
  )

  return (
    <div
      ref={segmentRef}
      className={cn('relative w-full', enableScrollRunway && 'h-[100svh]')}
      style={enableScrollRunway ? { height: WORK_CARD_SEGMENT_HEIGHT } : undefined}
    >
      <motion.div
        className={cn(
          'sticky mx-auto w-full rounded-t-[2rem] border-t-[3px] border-black bg-white md:rounded-t-[2.5rem]',
          index > 0 && 'shadow-[0_-8px_24px_-6px_rgba(0,0,0,0.4)]'
        )}
        style={{
          zIndex: index + 1,
          top: 0,
          minHeight: '100svh',
          transformOrigin: 'center top',
          scale: needsScrollAnimation ? cardScale : 1,
          opacity: needsScrollAnimation ? cardOpacity : 1,
          y: needsScrollAnimation ? cardY : 0,
          filter: needsScrollAnimation ? filter : undefined,
        }}
      >
        <article
          className={cn(
            'flex min-h-[100svh] w-full min-w-0 flex-col items-stretch gap-10 px-6 py-14 sm:px-8 md:flex-row md:items-center md:gap-[clamp(2rem,5vw,4.5rem)] md:px-10 md:py-20 lg:gap-[clamp(2.5rem,6vw,5.5rem)] lg:px-12 lg:py-[clamp(3.5rem,8vw,6.5rem)] xl:px-14',
            reversed && 'md:flex-row-reverse'
          )}
        >
          <ProjectVisual project={project} />
          {info}
        </article>
      </motion.div>
    </div>
  )
}
