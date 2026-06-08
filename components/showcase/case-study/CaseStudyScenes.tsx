'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { sceneThemeClasses, type SceneTheme } from '@/components/showcase/case-study/utils'

export const labelClass = 'font-heading text-sm uppercase tracking-[0.28em] text-zinc-500'

export function MetaItem({
  label,
  value,
  theme = 'dark',
}: {
  label: string
  value: string
  theme?: SceneTheme
}) {
  const styles = sceneThemeClasses(theme)

  return (
    <div>
      <p className={labelClass}>{label}</p>
      <p className={cn('mt-2 font-body text-base md:text-lg', styles.metaValue)}>{value}</p>
    </div>
  )
}

export function StatementScene({
  eyebrow,
  headline,
  body,
  pullQuote,
  accent,
  align = 'left',
  theme = 'dark',
}: {
  eyebrow: string
  headline: string
  body: string
  pullQuote?: string
  accent: string
  align?: 'left' | 'center'
  theme?: SceneTheme
}) {
  const styles = sceneThemeClasses(theme)

  return (
    <section className={cn('border-t px-6 py-24 md:px-12 md:py-32 lg:px-16', styles.border, styles.section)}>
      <div className={cn('mx-auto max-w-7xl', align === 'center' && 'text-center')}>
        <Reveal>
          <p className={labelClass} style={{ color: accent }}>
            {eyebrow}
          </p>
          <h2
            className={cn(
              'mt-6 font-display font-bold leading-[1.02] tracking-[-0.04em]',
              styles.heading,
              align === 'center'
                ? 'mx-auto max-w-4xl text-[clamp(3rem,7vw,5.75rem)]'
                : 'max-w-4xl text-[clamp(2.75rem,6.5vw,5.25rem)]'
            )}
          >
            {headline}
          </h2>
          <p
            className={cn(
              'mt-8 font-body text-xl leading-relaxed md:text-2xl md:leading-[1.75]',
              styles.body,
              align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl'
            )}
          >
            {body}
          </p>
          {pullQuote && (
            <p
              className={cn(
                'mt-10 border-l-2 pl-6 font-display text-2xl italic leading-relaxed md:text-3xl',
                styles.pullQuote,
                align === 'center' && 'mx-auto max-w-3xl border-l-0 border-t pt-8 pl-0'
              )}
              style={{ borderColor: accent }}
            >
              {pullQuote}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export function FullBleedVisual({
  eyebrow,
  title,
  body,
  pullQuote,
  image,
  accent,
  reverse = false,
  theme = 'dark',
}: {
  eyebrow: string
  title: string
  body: string
  pullQuote?: string
  image: string
  accent: string
  reverse?: boolean
  theme?: SceneTheme
}) {
  const styles = sceneThemeClasses(theme)

  return (
    <section className={cn('border-t', styles.border, styles.section)}>
      <div
        className={cn(
          'mx-auto grid max-w-[1400px] items-center gap-10 px-6 py-20 md:gap-16 md:px-12 md:py-28 lg:grid-cols-2 lg:px-16',
          reverse && 'lg:[&>*:first-child]:order-2'
        )}
      >
        <Reveal>
          <p className={labelClass} style={{ color: accent }}>
            {eyebrow}
          </p>
          <h2
            className={cn(
              'mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]',
              styles.heading
            )}
          >
            {title}
          </h2>
          <p className={cn('mt-6 font-body text-lg leading-relaxed md:text-xl', styles.body)}>{body}</p>
          {pullQuote && (
            <p className={cn('mt-8 font-body text-base leading-relaxed md:text-lg', styles.pullQuote)}>
              {pullQuote}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.08}>
          <figure className={cn('relative overflow-hidden rounded-2xl', styles.imageFrame)}>
            <div className="absolute inset-x-0 top-0 z-10 h-px" style={{ backgroundColor: `${accent}99` }} />
            <div className="relative aspect-[16/10] w-full">
              <Image src={image} alt={title} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

export function FeatureGridScene({
  eyebrow,
  title,
  body,
  features,
  accent,
  theme = 'dark',
}: {
  eyebrow: string
  title: string
  body: string
  features: { title: string; description: string }[]
  accent: string
  theme?: SceneTheme
}) {
  const styles = sceneThemeClasses(theme)

  return (
    <section className={cn('border-t px-6 py-24 md:px-12 md:py-32 lg:px-16', styles.border, styles.sectionAlt)}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className={labelClass} style={{ color: accent }}>
            {eyebrow}
          </p>
          <h2
            className={cn(
              'mt-4 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4rem)] font-bold tracking-[-0.03em]',
              styles.heading
            )}
          >
            {title}
          </h2>
          <p className={cn('mt-6 max-w-2xl font-body text-xl leading-relaxed md:text-2xl', styles.body)}>{body}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.05}>
              <div className={cn('h-full rounded-2xl p-6 md:p-8', styles.card)}>
                <div className="mb-5 h-px w-10" style={{ backgroundColor: accent }} />
                <h3 className={cn('font-display text-2xl font-semibold tracking-tight', styles.heading)}>
                  {feature.title}
                </h3>
                <p className={cn('mt-3 font-body text-base leading-relaxed md:text-lg', styles.body)}>
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HeroVisual({
  src,
  alt,
  accent,
  theme = 'dark',
}: {
  src: string
  alt: string
  accent: string
  theme?: SceneTheme
}) {
  const styles = sceneThemeClasses(theme)

  return (
    <figure className={cn('relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]', styles.heroFrame)}>
      <div className="absolute inset-x-0 top-0 z-10 h-px" style={{ backgroundColor: accent }} />
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image src={src} alt={alt} fill className="object-cover object-top" sizes="100vw" />
      </div>
    </figure>
  )
}
