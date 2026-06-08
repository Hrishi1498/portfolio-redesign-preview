'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { BlurTextAnimation } from '@/components/ui/BlurTextAnimation'
import { cn } from '@/lib/utils'
import { sceneThemeClasses, type SceneTheme } from '@/components/showcase/case-study/utils'

export const labelClass = 'font-heading text-sm uppercase tracking-[0.28em] text-zinc-500'

function sceneThemeForBlur(theme: SceneTheme) {
  return theme === 'light' ? 'light' : 'dark'
}

export function MetaItem({
  label,
  value,
  theme = 'dark',
  blurText = false,
  startDelay = 0,
}: {
  label: string
  value: string
  theme?: SceneTheme
  blurText?: boolean
  startDelay?: number
}) {
  const styles = sceneThemeClasses(theme)
  const blurTheme = sceneThemeForBlur(theme)

  return (
    <div>
      {blurText ? (
        <BlurTextAnimation
          as="p"
          text={label}
          variant="label"
          theme={blurTheme}
          textClassName={labelClass}
          startDelay={startDelay}
        />
      ) : (
        <p className={labelClass}>{label}</p>
      )}
      {blurText ? (
        <BlurTextAnimation
          as="p"
          text={value}
          variant="body"
          theme={blurTheme}
          className="mt-2"
          textClassName={cn('font-body text-base md:text-lg', styles.metaValue)}
          startDelay={startDelay + 0.08}
        />
      ) : (
        <p className={cn('mt-2 font-body text-base md:text-lg', styles.metaValue)}>{value}</p>
      )}
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
  blurText = false,
}: {
  eyebrow: string
  headline: string
  body: string
  pullQuote?: string
  accent: string
  align?: 'left' | 'center'
  theme?: SceneTheme
  blurText?: boolean
}) {
  const styles = sceneThemeClasses(theme)
  const blurTheme = sceneThemeForBlur(theme)

  const content = (
    <>
      {blurText ? (
        <p className={labelClass} style={{ color: accent }}>
          <BlurTextAnimation as="span" text={eyebrow} variant="label" theme={blurTheme} />
        </p>
      ) : (
        <p className={labelClass} style={{ color: accent }}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-6 font-display font-bold leading-[1.02] tracking-[-0.04em]',
          styles.heading,
          align === 'center'
            ? 'mx-auto max-w-4xl text-[clamp(3rem,7vw,5.75rem)]'
            : 'max-w-4xl text-[clamp(2.75rem,6.5vw,5.25rem)]'
        )}
      >
        {blurText ? (
          <BlurTextAnimation as="span" text={headline} variant="headline" theme={blurTheme} startDelay={0.08} />
        ) : (
          headline
        )}
      </h2>
      {blurText ? (
        <BlurTextAnimation
          as="p"
          text={body}
          variant="body"
          theme={blurTheme}
          className={cn(
            'mt-8 font-body text-xl md:text-2xl md:leading-[1.75]',
            styles.body,
            align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl'
          )}
          startDelay={0.16}
        />
      ) : (
        <p
          className={cn(
            'mt-8 font-body text-xl leading-relaxed md:text-2xl md:leading-[1.75]',
            styles.body,
            align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl'
          )}
        >
          {body}
        </p>
      )}
      {pullQuote &&
        (blurText ? (
          <div
            className={cn(
              'mt-10 border-l-2 pl-6 font-display text-2xl italic md:text-3xl',
              styles.pullQuote,
              align === 'center' && 'mx-auto max-w-3xl border-l-0 border-t pt-8 pl-0'
            )}
            style={{ borderColor: accent }}
          >
            <BlurTextAnimation as="span" text={pullQuote} variant="body" theme={blurTheme} startDelay={0.24} />
          </div>
        ) : (
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
        ))}
    </>
  )

  return (
    <section className={cn('border-t px-6 py-24 md:px-12 md:py-32 lg:px-16', styles.border, styles.section)}>
      <div className={cn('mx-auto max-w-7xl', align === 'center' && 'text-center')}>
        {blurText ? content : <Reveal>{content}</Reveal>}
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
  blurText = false,
}: {
  eyebrow: string
  title: string
  body: string
  pullQuote?: string
  image: string
  accent: string
  reverse?: boolean
  theme?: SceneTheme
  blurText?: boolean
}) {
  const styles = sceneThemeClasses(theme)
  const blurTheme = sceneThemeForBlur(theme)

  const copy = (
    <>
      {blurText ? (
        <p className={labelClass} style={{ color: accent }}>
          <BlurTextAnimation as="span" text={eyebrow} variant="label" theme={blurTheme} />
        </p>
      ) : (
        <p className={labelClass} style={{ color: accent }}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]',
          styles.heading
        )}
      >
        {blurText ? (
          <BlurTextAnimation as="span" text={title} variant="headline" theme={blurTheme} startDelay={0.08} />
        ) : (
          title
        )}
      </h2>
      {blurText ? (
        <BlurTextAnimation
          as="p"
          text={body}
          variant="body"
          theme={blurTheme}
          className={cn('mt-6 font-body text-lg md:text-xl', styles.body)}
          startDelay={0.16}
        />
      ) : (
        <p className={cn('mt-6 font-body text-lg leading-relaxed md:text-xl', styles.body)}>{body}</p>
      )}
      {pullQuote &&
        (blurText ? (
          <BlurTextAnimation
            as="p"
            text={pullQuote}
            variant="body"
            theme={blurTheme}
            className={cn('mt-8 font-body text-base md:text-lg', styles.pullQuote)}
            startDelay={0.24}
          />
        ) : (
          <p className={cn('mt-8 font-body text-base leading-relaxed md:text-lg', styles.pullQuote)}>{pullQuote}</p>
        ))}
    </>
  )

  return (
    <section className={cn('border-t', styles.border, styles.section)}>
      <div
        className={cn(
          'mx-auto grid max-w-[1400px] items-center gap-10 px-6 py-20 md:gap-16 md:px-12 md:py-28 lg:grid-cols-2 lg:px-16',
          reverse && 'lg:[&>*:first-child]:order-2'
        )}
      >
        {blurText ? copy : <Reveal>{copy}</Reveal>}

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
  blurText = false,
}: {
  eyebrow: string
  title: string
  body: string
  features: { title: string; description: string }[]
  accent: string
  theme?: SceneTheme
  blurText?: boolean
}) {
  const styles = sceneThemeClasses(theme)
  const blurTheme = sceneThemeForBlur(theme)

  const intro = (
    <>
      {blurText ? (
        <p className={labelClass} style={{ color: accent }}>
          <BlurTextAnimation as="span" text={eyebrow} variant="label" theme={blurTheme} />
        </p>
      ) : (
        <p className={labelClass} style={{ color: accent }}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-4 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4rem)] font-bold tracking-[-0.03em]',
          styles.heading
        )}
      >
        {blurText ? (
          <BlurTextAnimation as="span" text={title} variant="headline" theme={blurTheme} startDelay={0.08} />
        ) : (
          title
        )}
      </h2>
      {blurText ? (
        <BlurTextAnimation
          as="p"
          text={body}
          variant="body"
          theme={blurTheme}
          className={cn('mt-6 max-w-2xl font-body text-xl md:text-2xl', styles.body)}
          startDelay={0.16}
        />
      ) : (
        <p className={cn('mt-6 max-w-2xl font-body text-xl leading-relaxed md:text-2xl', styles.body)}>{body}</p>
      )}
    </>
  )

  return (
    <section className={cn('border-t px-6 py-24 md:px-12 md:py-32 lg:px-16', styles.border, styles.sectionAlt)}>
      <div className="mx-auto max-w-7xl">
        {blurText ? intro : <Reveal>{intro}</Reveal>}

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={feature.title} className={cn('h-full rounded-2xl p-6 md:p-8', styles.card)}>
              <div className="mb-5 h-px w-10" style={{ backgroundColor: accent }} />
              {blurText ? (
                <>
                  <h3 className={cn('font-display text-2xl font-semibold tracking-tight', styles.heading)}>
                    <BlurTextAnimation
                      as="span"
                      text={feature.title}
                      variant="headline"
                      theme={blurTheme}
                      startDelay={i * 0.04}
                    />
                  </h3>
                  <BlurTextAnimation
                    as="p"
                    text={feature.description}
                    variant="body"
                    theme={blurTheme}
                    className={cn('mt-3 font-body text-base md:text-lg', styles.body)}
                    startDelay={i * 0.04 + 0.08}
                  />
                </>
              ) : (
                <Reveal delay={i * 0.05}>
                  <h3 className={cn('font-display text-2xl font-semibold tracking-tight', styles.heading)}>
                    {feature.title}
                  </h3>
                  <p className={cn('mt-3 font-body text-base leading-relaxed md:text-lg', styles.body)}>
                    {feature.description}
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
