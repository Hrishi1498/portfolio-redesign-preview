'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioProject } from '@/lib/portfolio-data'
import { getIndustry } from '@/lib/project-utils'
import { getProjectCardGradientCss } from '@/lib/card-gradients'
import { releaseHomeScrollLock } from '@/lib/home-scroll-lock'
import { cn } from '@/lib/utils'

export interface PortfolioShowcaseItem {
  id: string
  name: string
  role: string
  year: string
  gradient: string
  accent: string
  href?: string
  liveUrl?: string
}

function buildItems(projects: PortfolioProject[]): PortfolioShowcaseItem[] {
  return projects.map((project) => {
    const hasStory = Boolean(project.slides?.length)

    return {
      id: project.slug,
      name: project.title,
      role: getIndustry(project),
      year: project.year,
      gradient: getProjectCardGradientCss(project),
      accent: project.color,
      href: hasStory ? `/work/${project.slug}` : undefined,
      liveUrl: project.links.live,
    }
  })
}

interface PortfolioShowcaseProps {
  projects: PortfolioProject[]
}

export function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const members = buildItems(projects)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const col1 = members.filter((_, i) => i % 3 === 0)
  const col2 = members.filter((_, i) => i % 3 === 1)
  const col3 = members.filter((_, i) => i % 3 === 2)

  return (
    <div className="ml-auto mr-0 mt-1 flex w-full max-w-5xl select-none flex-col items-start gap-9 overflow-visible px-4 py-2 font-body md:mt-2 md:translate-x-4 md:flex-row md:gap-11 lg:max-w-6xl lg:translate-x-6 lg:gap-12 md:px-0">
      <div className="flex max-w-full flex-shrink-0 gap-2.5 overflow-visible pb-1 pt-1 md:gap-3.5 md:pb-0 md:pt-0">
        <div className="flex flex-col gap-2.5 md:gap-3.5">
          {col1.map((item, i) => (
            <GradientCard
              key={item.id}
              item={item}
              index={i * 3}
              className="h-[134px] w-[123px] sm:h-[158px] sm:w-[146px] md:h-[188px] md:w-[176px] lg:h-[200px] lg:w-[188px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        <div className="mt-[40px] flex flex-col gap-2.5 sm:mt-[48px] md:mt-[58px] md:gap-3.5">
          {col2.map((item, i) => (
            <GradientCard
              key={item.id}
              item={item}
              index={i * 3 + 1}
              className="h-[147px] w-[136px] sm:h-[174px] sm:w-[162px] md:h-[207px] md:w-[195px] lg:h-[220px] lg:w-[208px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        <div className="mt-[16px] flex flex-col gap-2.5 sm:mt-[20px] md:mt-[24px] md:gap-3.5">
          {col3.map((item, i) => (
            <GradientCard
              key={item.id}
              item={item}
              index={i * 3 + 2}
              className="h-[138px] w-[128px] sm:h-[164px] sm:w-[152px] md:h-[196px] md:w-[184px] lg:h-[208px] lg:w-[196px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-1 flex-col gap-4 overflow-visible pt-1 sm:grid sm:grid-cols-2 md:min-w-[280px] md:flex md:flex-col md:gap-6 md:pt-2 lg:min-w-[320px]">
        {members.map((item) => (
          <ProjectRow
            key={item.id}
            item={item}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  )
}

function GradientCard({
  item,
  index,
  className,
  hoveredId,
  onHover,
}: {
  item: PortfolioShowcaseItem
  index: number
  className: string
  hoveredId: string | null
  onHover: (id: string | null) => void
}) {
  const isActive = hoveredId === item.id
  const isDimmed = hoveredId !== null && !isActive

  const cardClassName = cn(
    'group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[1.75rem] ring-1 transition-all duration-500',
    'shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)]',
    isActive
      ? 'ring-white/25 shadow-[0_20px_44px_-14px_rgba(0,0,0,0.65)]'
      : 'ring-white/10',
    isDimmed ? 'opacity-55 saturate-[0.45]' : 'opacity-100 saturate-100',
    className
  )

  const cardContent = (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-black/15" />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at 18% 12%, rgba(255,255,255,0.45) 0%, transparent 42%), radial-gradient(circle at 88% 88%, ${item.accent}33 0%, transparent 50%)`,
        }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute right-2 top-2 font-display text-[2.5rem] font-bold leading-none tracking-tighter text-black/10 md:text-5xl"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/40 px-2 py-0.5 font-heading text-[9px] font-medium uppercase tracking-wider text-zinc-900 ring-1 ring-white/50 backdrop-blur-md">
        {item.year}
      </span>

      <div className="absolute inset-x-2.5 bottom-2.5 md:inset-x-3 md:bottom-3">
        <div
          className={cn(
            'rounded-xl bg-white/50 px-2.5 py-2 text-center backdrop-blur-xl ring-1 ring-white/50 transition-all duration-300 md:px-3 md:py-2.5',
            isActive && 'bg-white/65 ring-white/70 shadow-[0_4px_16px_rgba(0,0,0,0.18)]'
          )}
        >
          <p className="truncate font-display text-xs font-bold leading-tight text-zinc-900 md:text-sm">
            {item.name}
          </p>
          <p className="mt-0.5 truncate font-heading text-[8px] uppercase tracking-[0.16em] text-zinc-700 md:text-[9px]">
            {item.role}
          </p>
        </div>
      </div>
    </>
  )

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={cardClassName}
        style={{ background: item.gradient }}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(item.id)}
        onBlur={() => onHover(null)}
        onClick={() => releaseHomeScrollLock()}
        aria-label={`View ${item.name} case study`}
      >
        {cardContent}
      </Link>
    )
  }

  return (
    <div
      className={cardClassName}
      style={{ background: item.gradient }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(item.id)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      role="button"
      aria-label={item.name}
    >
      {cardContent}
    </div>
  )
}

function ProjectRow({
  item,
  hoveredId,
  onHover,
}: {
  item: PortfolioShowcaseItem
  hoveredId: string | null
  onHover: (id: string | null) => void
}) {
  const isActive = hoveredId === item.id
  const isDimmed = hoveredId !== null && !isActive

  const rowClassName = cn(
    'transition-opacity duration-300',
    isDimmed ? 'opacity-50' : 'opacity-100'
  )

  const nameClassName = cn(
    'min-w-0 flex-shrink-0 whitespace-nowrap font-display text-lg font-semibold leading-none tracking-tight transition-colors duration-300 md:text-2xl lg:text-[26px]',
    isActive ? 'text-white' : 'text-white/80'
  )

  const mainRow = item.href ? (
    <Link
      href={item.href}
      className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-1"
      onClick={() => releaseHomeScrollLock()}
    >
      <span
        className={cn(
          'h-3.5 flex-shrink-0 rounded-[5px] transition-all duration-300',
          isActive ? 'w-6' : 'w-[18px] bg-white/25'
        )}
        style={isActive ? { background: item.gradient } : undefined}
      />
      <span className={nameClassName}>{item.name}</span>
      <span
        className={cn(
          'rounded p-1 text-zinc-500 transition-opacity duration-200',
          isActive ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden
      >
        <ArrowUpRight size={14} strokeWidth={2} />
      </span>
    </Link>
  ) : (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <span
        className={cn(
          'h-3.5 flex-shrink-0 rounded-[5px] transition-all duration-300',
          isActive ? 'w-6' : 'w-[18px] bg-white/25'
        )}
        style={isActive ? { background: item.gradient } : undefined}
      />
      <span className={nameClassName}>{item.name}</span>
    </div>
  )

  return (
    <div
      className={rowClassName}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {mainRow}
        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'rounded px-1.5 py-0.5 font-heading text-[9px] uppercase tracking-wider text-zinc-500 transition-all duration-150 hover:text-white md:text-[10px]',
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
            title="Live site"
          >
            Live
          </a>
        )}
      </div>

      <p className="mt-1.5 pl-8 text-[8px] font-medium uppercase tracking-[0.2em] text-zinc-500 md:pl-9 md:text-[11px]">
        {item.role}
      </p>
    </div>
  )
}
