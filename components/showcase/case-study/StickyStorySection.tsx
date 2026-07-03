'use client'

import { Reveal } from '@/components/ui/Reveal'
import { BlurTextAnimation } from '@/components/ui/BlurTextAnimation'
import { ChapterMarker } from '@/components/showcase/case-study/CaseStudyScenes'
import { cn } from '@/lib/utils'
import { sceneThemeClasses, type SceneTheme } from '@/components/showcase/case-study/utils'

interface StickyStoryStep {
  title: string
  description: string
}

interface StickyStorySectionProps {
  eyebrow?: string
  chapterNumber?: number
  chapterLabel?: string
  title: string
  intro?: string
  steps: StickyStoryStep[]
  accent: string
  theme?: SceneTheme
  blurText?: boolean
}

export function StickyStorySection({
  eyebrow,
  chapterNumber,
  chapterLabel,
  title,
  intro,
  steps,
  accent,
  theme = 'dark',
  blurText = false,
}: StickyStorySectionProps) {
  if (steps.length === 0) return null

  const styles = sceneThemeClasses(theme)
  const blurTheme = theme === 'light' ? 'light' : 'dark'

  const sidebar = (
    <>
      {chapterNumber != null && chapterLabel ? (
        <ChapterMarker number={chapterNumber} label={chapterLabel} accent={accent} theme={theme} />
      ) : blurText ? (
        <p className="font-heading text-sm uppercase tracking-[0.28em]" style={{ color: accent }}>
          <BlurTextAnimation as="span" text={eyebrow ?? ''} variant="label" theme={blurTheme} />
        </p>
      ) : (
        <p className="font-heading text-sm uppercase tracking-[0.28em]" style={{ color: accent }}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-5 font-display text-[clamp(2.75rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em]',
          styles.heading
        )}
      >
        {blurText ? (
          <BlurTextAnimation as="span" text={title} variant="headline" theme={blurTheme} startDelay={0.08} />
        ) : (
          title
        )}
      </h2>
      {intro &&
        (blurText ? (
          <BlurTextAnimation
            as="p"
            text={intro}
            variant="body"
            theme={blurTheme}
            className={cn('mt-6 max-w-md font-body text-lg md:text-xl', styles.body)}
            startDelay={0.16}
          />
        ) : (
          <p className={cn('mt-6 max-w-md font-body text-lg leading-relaxed md:text-xl', styles.body)}>{intro}</p>
        ))}
    </>
  )

  return (
    <section className={cn('relative px-6 py-24 md:px-12 md:py-32 lg:px-16', styles.section)}>
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {blurText ? sidebar : <Reveal>{sidebar}</Reveal>}
        </div>

        <div className="space-y-20 md:space-y-28">
          {steps.map((step, index) => (
            <article key={step.title} className="relative pl-8 md:pl-10">
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
              {blurText ? (
                <>
                  <h3 className={cn('font-display text-3xl font-semibold tracking-tight md:text-4xl', styles.heading)}>
                    <BlurTextAnimation
                      as="span"
                      text={step.title}
                      variant="headline"
                      theme={blurTheme}
                      startDelay={index * 0.03}
                    />
                  </h3>
                  <BlurTextAnimation
                    as="p"
                    text={step.description}
                    variant="body"
                    theme={blurTheme}
                    className={cn('mt-4 max-w-xl font-body text-lg md:text-xl', styles.body)}
                    startDelay={index * 0.03 + 0.08}
                  />
                </>
              ) : (
                <Reveal delay={index * 0.05}>
                  <h3 className={cn('font-display text-3xl font-semibold tracking-tight md:text-4xl', styles.heading)}>
                    {step.title}
                  </h3>
                  <p className={cn('mt-4 max-w-xl font-body text-lg leading-relaxed md:text-xl', styles.body)}>
                    {step.description}
                  </p>
                </Reveal>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
