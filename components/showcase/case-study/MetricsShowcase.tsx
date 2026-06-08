'use client'

import { Reveal } from '@/components/ui/Reveal'
import { BlurTextAnimation } from '@/components/ui/BlurTextAnimation'
import { cn } from '@/lib/utils'
import { sceneThemeClasses, type SceneTheme } from '@/components/showcase/case-study/utils'

interface Metric {
  label: string
  value: string
}

interface MetricsShowcaseProps {
  eyebrow: string
  headline: string
  subline?: string
  metrics: Metric[]
  accent: string
  theme?: SceneTheme
  blurText?: boolean
}

export function MetricsShowcase({
  eyebrow,
  headline,
  subline,
  metrics,
  accent,
  theme = 'dark',
  blurText = false,
}: MetricsShowcaseProps) {
  if (metrics.length === 0) return null

  const styles = sceneThemeClasses(theme)
  const blurTheme = theme === 'light' ? 'light' : 'dark'

  const intro = (
    <>
      {blurText ? (
        <BlurTextAnimation
          as="p"
          text={eyebrow}
          variant="label"
          theme={blurTheme}
          textClassName="font-heading text-sm uppercase tracking-[0.28em] text-zinc-500"
        />
      ) : (
        <p className="font-heading text-sm uppercase tracking-[0.28em] text-zinc-500">{eyebrow}</p>
      )}
      <h2
        className={cn(
          'mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em]',
          styles.heading
        )}
      >
        {blurText ? (
          <BlurTextAnimation as="span" text={headline} variant="headline" theme={blurTheme} startDelay={0.08} />
        ) : (
          headline
        )}
      </h2>
      {subline &&
        (blurText ? (
          <BlurTextAnimation
            as="p"
            text={subline}
            variant="body"
            theme={blurTheme}
            className={cn('mt-6 max-w-2xl font-body text-xl md:text-2xl', styles.body)}
            startDelay={0.16}
          />
        ) : (
          <p className={cn('mt-6 max-w-2xl font-body text-xl leading-relaxed md:text-2xl', styles.body)}>{subline}</p>
        ))}
    </>
  )

  return (
    <section
      className={cn('relative border-y px-6 py-24 md:px-12 md:py-32 lg:px-16', styles.borderStrong, styles.section)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${accent}${theme === 'light' ? '12' : '18'} 0%, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {blurText ? intro : <Reveal>{intro}</Reveal>}

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-y-16">
          {metrics.map((metric, i) => (
            <div key={`${metric.label}-${metric.value}`} className="border-t pt-6" style={{ borderColor: `${accent}55` }}>
              {blurText ? (
                <>
                  <p
                    className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-none tracking-[-0.04em]"
                    style={{ color: accent }}
                  >
                    <BlurTextAnimation
                      as="span"
                      text={metric.value}
                      variant="headline"
                      theme={blurTheme}
                      startDelay={i * 0.04}
                    />
                  </p>
                  <BlurTextAnimation
                    as="p"
                    text={metric.label}
                    variant="label"
                    theme={blurTheme}
                    className="mt-4 font-heading text-xs uppercase tracking-[0.2em] text-zinc-500 md:text-sm"
                    startDelay={i * 0.04 + 0.06}
                  />
                </>
              ) : (
                <Reveal delay={i * 0.06}>
                  <p
                    className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-none tracking-[-0.04em]"
                    style={{ color: accent }}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-4 font-heading text-xs uppercase tracking-[0.2em] text-zinc-500 md:text-sm">
                    {metric.label}
                  </p>
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
