'use client'

import { Reveal } from '@/components/ui/Reveal'
import { ChapterMarker } from '@/components/showcase/case-study/CaseStudyScenes'
import type { StorySlide } from '@/lib/story-slide'
import { cn } from '@/lib/utils'
import { sceneThemeClasses, slideChapterLabel } from '@/components/showcase/case-study/utils'

interface CaseStudyStatsBlockProps {
  slide: StorySlide
  accent: string
  eyebrow?: string
  chapterNumber?: number
  chapterLabel?: string
}

function isAccessMatrix(stats: NonNullable<StorySlide['stats']>) {
  return stats.length > 0 && stats.every((stat) => stat.value === '✓' || stat.value === '✗')
}

function AccessMatrix({
  stats,
}: {
  stats: NonNullable<StorySlide['stats']>
}) {
  const allowed = stats.filter((stat) => stat.value === '✓')
  const restricted = stats.filter((stat) => stat.value === '✗')

  const column = (
    title: string,
    items: typeof stats,
    tone: 'allowed' | 'restricted'
  ) => (
    <div
      className={cn(
        'rounded-2xl border p-6 md:p-8',
        tone === 'allowed' ? 'border-emerald-500/25 bg-emerald-500/[0.04]' : 'border-red-500/20 bg-red-500/[0.03]'
      )}
    >
      <p
        className={cn(
          'font-heading text-xs uppercase tracking-[0.22em]',
          tone === 'allowed' ? 'text-emerald-400' : 'text-red-400'
        )}
      >
        {title}
      </p>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-4"
          >
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-heading text-sm font-semibold',
                tone === 'allowed' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'
              )}
            >
              {item.value}
            </span>
            <div className="min-w-0 pt-1">
              <p className="font-display text-lg font-semibold tracking-tight text-white">{item.label}</p>
              {item.icon ? (
                <p className="mt-1 font-body text-sm text-zinc-500">{item.icon}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {column('Visible to super admins', allowed, 'allowed')}
      {column('Intentionally restricted', restricted, 'restricted')}
    </div>
  )
}

function ImpactStats({
  stats,
  accent,
}: {
  stats: NonNullable<StorySlide['stats']>
  accent: string
}) {
  return (
    <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-y-16">
      {stats.map((stat, i) => (
        <Reveal key={`${stat.label}-${stat.value}`} delay={i * 0.06}>
          <div className="border-t pt-6" style={{ borderColor: `${accent}55` }}>
            <p
              className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-none tracking-[-0.04em]"
              style={{ color: accent }}
            >
              {stat.value}
            </p>
            <p className="mt-4 font-heading text-xs uppercase tracking-[0.2em] text-zinc-500 md:text-sm">
              {stat.label}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export function CaseStudyStatsBlock({ slide, accent, eyebrow, chapterNumber, chapterLabel }: CaseStudyStatsBlockProps) {
  const stats = slide.stats ?? []
  if (stats.length === 0) return null

  const styles = sceneThemeClasses('dark')
  const accessMatrix = isAccessMatrix(stats)

  return (
    <section className={cn('border-t px-6 py-24 md:px-12 md:py-32 lg:px-16', styles.border, styles.sectionAlt)}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          {chapterNumber != null && chapterLabel ? (
            <ChapterMarker number={chapterNumber} label={chapterLabel} accent={accent} />
          ) : (
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-zinc-500">
              {eyebrow ?? slideChapterLabel(slide.type)}
            </p>
          )}
          <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            {slide.title}
          </h2>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-zinc-400 md:text-xl">
            {slide.content}
          </p>
          {slide.highlight ? (
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-zinc-200 md:text-lg">
              {slide.highlight}
            </p>
          ) : null}
        </Reveal>

        {accessMatrix ? <AccessMatrix stats={stats} /> : <ImpactStats stats={stats} accent={accent} />}
      </div>
    </section>
  )
}
