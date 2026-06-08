'use client'

import { cn } from '@/lib/utils'
import type { PortfolioProject } from '@/lib/portfolio-data'
import { getIndustry } from '@/lib/project-utils'
import { getProjectCardGradientCss } from '@/lib/card-gradients'
import Link from 'next/link'
import Image from 'next/image'

interface PortfolioCardProps {
  project: PortfolioProject
  featured?: boolean
  size?: 'default' | 'compact'
  className?: string
}

function ViewProjectButton({ href, compact }: { href: string; compact?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold transition-colors duration-300',
        'bg-white/30 text-zinc-900 backdrop-blur-md ring-1 ring-white/50',
        'hover:bg-white/45',
        compact ? 'w-full py-2 text-[11px]' : 'w-full py-2.5 text-xs sm:text-sm'
      )}
    >
      View project
      <svg className={cn(compact ? 'h-3 w-3' : 'h-3.5 w-3.5')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  )
}

export function PortfolioCard({
  project,
  featured = false,
  size = 'default',
  className,
}: PortfolioCardProps) {
  const isCompact = size === 'compact'
  const hasStory = project.slides && project.slides.length > 0
  const gradient = getProjectCardGradientCss(project)

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[1.75rem]',
        'transition-all duration-500 ease-out',
        'shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]',
        'hover:-translate-y-1 hover:shadow-[0_24px_50px_-10px_rgba(0,0,0,0.5)]',
        featured && 'md:col-span-2 md:row-span-2',
        isCompact && 'h-[325px] w-[195px]',
        !isCompact && !featured && 'min-h-[460px] w-full',
        featured && 'min-h-[560px] w-full',
        className
      )}
      style={{ background: gradient }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5" />

      {/* Year badge */}
      <div className="absolute right-3 top-3 z-10">
        <span className="rounded-full bg-white/45 px-2.5 py-1 text-[10px] font-medium text-zinc-900 backdrop-blur-md ring-1 ring-white/50">
          {project.year}
        </span>
      </div>

      {/* Logo area */}
      <div
        className={cn(
          'relative z-10 flex flex-col items-center justify-center px-4',
          isCompact ? 'min-h-[124px] pt-3.5' : 'min-h-[152px] flex-1 pt-5 sm:pt-6'
        )}
      >
        {project.images.thumbnail ? (
          <div
            className={cn(
              'relative flex items-center justify-center rounded-2xl bg-white/90 shadow-[0_12px_32px_rgba(0,0,0,0.15)] ring-1 ring-white/60 transition-transform duration-500 group-hover:scale-105',
              isCompact ? 'h-16 w-16 p-2.5' : featured ? 'h-24 w-24 p-4 sm:h-28 sm:w-28' : 'h-20 w-20 p-3 sm:h-24 sm:w-24'
            )}
          >
            <Image
              src={project.images.thumbnail}
              alt={`${project.title} logo`}
              width={isCompact ? 48 : featured ? 80 : 64}
              height={isCompact ? 48 : featured ? 80 : 64}
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div
            className={cn(
              'flex items-center justify-center rounded-2xl bg-white/50 text-3xl backdrop-blur-md ring-1 ring-white/60',
              isCompact ? 'h-16 w-16' : 'h-20 w-20'
            )}
          >
            {project.category === 'ai' ? '🤖' : project.category === 'mobile' ? '📱' : '💻'}
          </div>
        )}

        {!isCompact && (
          <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-900/70">
            {getIndustry(project)}
          </p>
        )}
      </div>

      {/* Glass panel — title + description */}
      <div className={cn('relative z-10 shrink-0', isCompact ? 'px-3.5 pb-4' : 'px-4 pb-4 sm:px-5 sm:pb-5')}>
        <div
          className={cn(
            'rounded-2xl bg-white/40 text-center backdrop-blur-xl ring-1 ring-white/50',
            'transition-colors duration-300 group-hover:bg-white/50',
            isCompact ? 'px-3 py-3' : 'px-4 py-3.5 sm:py-4'
          )}
        >
          <p
            className={cn(
              'font-semibold leading-tight tracking-[-0.01em] text-zinc-900',
              isCompact ? 'text-[15px]' : featured ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            )}
          >
            {project.title}
          </p>
          <p
            className={cn(
              'mt-1.5 leading-snug text-zinc-800',
              isCompact ? 'line-clamp-2 text-[13px]' : 'line-clamp-2 text-[15px] sm:text-base'
            )}
          >
            {project.tagline}
          </p>
        </div>
        {isCompact && hasStory && (
          <div className="mt-2.5">
            <ViewProjectButton href={`/work/${project.slug}`} compact />
          </div>
        )}
      </div>

      {/* Extended details — default & featured only */}
      {!isCompact && (
        <div className="relative z-10 shrink-0 border-t border-white/30 bg-white/30 px-4 py-4 backdrop-blur-md sm:px-5 sm:py-5">
          <p className="line-clamp-3 text-base leading-relaxed text-zinc-900 sm:text-[17px]">
            {project.description}
          </p>

          {hasStory && (
            <div className="mt-3">
              <ViewProjectButton href={`/work/${project.slug}`} />
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.slice(0, featured ? 5 : 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/45 px-2.5 py-1 text-[10px] font-medium text-zinc-900 ring-1 ring-white/40 sm:text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
