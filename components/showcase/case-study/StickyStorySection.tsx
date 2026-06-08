'use client'

import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { sceneThemeClasses, type SceneTheme } from '@/components/showcase/case-study/utils'

interface StickyStoryStep {
  title: string
  description: string
}

interface StickyStorySectionProps {
  eyebrow: string
  title: string
  intro?: string
  steps: StickyStoryStep[]
  accent: string
  theme?: SceneTheme
}

export function StickyStorySection({
  eyebrow,
  title,
  intro,
  steps,
  accent,
  theme = 'dark',
}: StickyStorySectionProps) {
  if (steps.length === 0) return null

  const styles = sceneThemeClasses(theme)

  return (
    <section className={cn('relative px-6 py-24 md:px-12 md:py-32 lg:px-16', styles.section)}>
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="font-heading text-sm uppercase tracking-[0.28em]" style={{ color: accent }}>
              {eyebrow}
            </p>
            <h2
              className={cn(
                'mt-5 font-display text-[clamp(2.75rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em]',
                styles.heading
              )}
            >
              {title}
            </h2>
            {intro && (
              <p className={cn('mt-6 max-w-md font-body text-lg leading-relaxed md:text-xl', styles.body)}>
                {intro}
              </p>
            )}
          </Reveal>
        </div>

        <div className="space-y-20 md:space-y-28">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <article className="relative pl-8 md:pl-10">
                <div
                  className="absolute left-0 top-0 h-full w-px"
                  style={{ backgroundColor: `${accent}44` }}
                />
                <span
                  className={cn(
                    'absolute -left-3 top-0 flex h-7 w-7 items-center justify-center rounded-full border font-heading text-xs',
                    styles.stepBadge
                  )}
                  style={{ borderColor: `${accent}88`, color: accent }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={cn('font-display text-3xl font-semibold tracking-tight md:text-4xl', styles.heading)}>
                  {step.title}
                </h3>
                <p className={cn('mt-4 max-w-xl font-body text-lg leading-relaxed md:text-xl', styles.body)}>
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
