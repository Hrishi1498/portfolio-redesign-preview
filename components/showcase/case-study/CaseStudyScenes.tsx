'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { BlurTextAnimation } from '@/components/ui/BlurTextAnimation'
import { CaseStudyScreenshot } from '@/components/showcase/case-study/CaseStudyScreenshot'
import type { ImageFrameVariant } from '@/components/showcase/case-study/screenshot-frame'
import { cn } from '@/lib/utils'
import { sceneThemeClasses, type SceneTheme } from '@/components/showcase/case-study/utils'

export const labelClass = 'font-heading text-sm uppercase tracking-[0.28em] text-zinc-500'

export function ChapterMarker({
  number,
  label,
  accent,
  theme = 'dark',
  align = 'left',
}: {
  number: number
  label: string
  accent: string
  theme?: SceneTheme
  align?: 'left' | 'center'
}) {
  const styles = sceneThemeClasses(theme)

  return (
    <div className={cn('flex flex-col gap-1', align === 'center' && 'items-center', align === 'left' && 'sm:flex-row sm:items-end sm:gap-8')}>
      <span
        className="font-display text-[clamp(3.5rem,11vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.06em]"
        style={{ color: accent }}
      >
        /{String(number).padStart(2, '0')}
      </span>
      <span className={cn('font-heading text-xs uppercase tracking-[0.34em] sm:pb-3 md:text-sm', styles.body)}>
        {label}
      </span>
    </div>
  )
}

function SceneChapterHeader({
  chapterNumber,
  chapterLabel,
  eyebrow,
  accent,
  theme = 'dark',
  align = 'left',
  blurText = false,
}: {
  chapterNumber?: number
  chapterLabel?: string
  eyebrow?: string
  accent: string
  theme?: SceneTheme
  align?: 'left' | 'center'
  blurText?: boolean
}) {
  if (chapterNumber != null && chapterLabel) {
    return <ChapterMarker number={chapterNumber} label={chapterLabel} accent={accent} theme={theme} align={align} />
  }

  const blurTheme = sceneThemeForBlur(theme)

  if (blurText && eyebrow) {
    return (
      <p className={labelClass} style={{ color: accent }}>
        <BlurTextAnimation as="span" text={eyebrow} variant="label" theme={blurTheme} />
      </p>
    )
  }

  if (eyebrow) {
    return (
      <p className={labelClass} style={{ color: accent }}>
        {eyebrow}
      </p>
    )
  }

  return null
}

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
  chapterNumber,
  chapterLabel,
  headline,
  body,
  pullQuote,
  accent,
  align = 'left',
  theme = 'dark',
  blurText = false,
}: {
  eyebrow?: string
  chapterNumber?: number
  chapterLabel?: string
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
      <SceneChapterHeader
        chapterNumber={chapterNumber}
        chapterLabel={chapterLabel}
        eyebrow={eyebrow}
        accent={accent}
        theme={theme}
        align={align}
        blurText={blurText}
      />
      <h2
        className={cn(
          'mt-8 font-display font-bold leading-[1.02] tracking-[-0.04em]',
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
    <section className={cn('border-t px-6 py-28 md:px-12 md:py-36 lg:px-16 lg:py-40', styles.border, styles.section)}>
      <div className={cn('mx-auto max-w-7xl', align === 'center' && 'text-center')}>
        {blurText ? content : <Reveal>{content}</Reveal>}
      </div>
    </section>
  )
}

export function FullBleedVisual({
  eyebrow,
  chapterNumber,
  chapterLabel,
  title,
  body,
  pullQuote,
  image,
  accent,
  reverse = false,
  layout = 'cinematic',
  theme = 'dark',
  blurText = false,
  imageAspect,
  screenshotFrame = 'light',
  screenshotStyle,
  slideFrame,
  deviceLabel,
  imageFit,
}: {
  eyebrow?: string
  chapterNumber?: number
  chapterLabel?: string
  title: string
  body: string
  pullQuote?: string
  image: string
  accent: string
  reverse?: boolean
  layout?: 'split' | 'cinematic'
  theme?: SceneTheme
  blurText?: boolean
  imageAspect?: string
  screenshotFrame?: 'light' | 'dark'
  screenshotStyle?: 'minimal' | 'device'
  slideFrame?: ImageFrameVariant
  deviceLabel?: string
  imageFit?: 'contain' | 'cover'
}) {
  const styles = sceneThemeClasses(theme)
  const blurTheme = sceneThemeForBlur(theme)

  const copy = (
    <>
      <SceneChapterHeader
        chapterNumber={chapterNumber}
        chapterLabel={chapterLabel}
        eyebrow={eyebrow}
        accent={accent}
        theme={theme}
        blurText={blurText}
      />
      <h2
        className={cn(
          'mt-8 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em]',
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
          className={cn('mt-6 max-w-3xl font-body text-lg md:text-xl md:leading-[1.75]', styles.body)}
          startDelay={0.16}
        />
      ) : (
        <p className={cn('mt-6 max-w-3xl font-body text-lg leading-relaxed md:text-xl md:leading-[1.75]', styles.body)}>
          {body}
        </p>
      )}
      {pullQuote &&
        (blurText ? (
          <BlurTextAnimation
            as="p"
            text={pullQuote}
            variant="body"
            theme={blurTheme}
            className={cn('mt-8 max-w-2xl font-display text-xl italic md:text-2xl', styles.pullQuote)}
            startDelay={0.24}
          />
        ) : (
          <p className={cn('mt-8 max-w-2xl font-display text-xl italic leading-relaxed md:text-2xl', styles.pullQuote)}>
            {pullQuote}
          </p>
        ))}
    </>
  )

  if (layout === 'cinematic') {
    return (
      <section className={cn('border-t', styles.border, styles.section)}>
        <Reveal>
          <div className="relative w-full overflow-hidden px-4 pt-10 md:px-10 md:pt-14 lg:px-16">
            <CaseStudyScreenshot
              src={image}
              alt={title}
              layout="cinematic"
              className="mx-auto"
              aspectRatio={imageAspect}
              frameTheme={screenshotFrame}
              sectionTheme={theme}
              slideFrame={slideFrame}
              projectStyle={screenshotStyle}
              deviceLabel={deviceLabel}
              imageFit={imageFit}
            />
          </div>
        </Reveal>
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          {blurText ? copy : <Reveal>{copy}</Reveal>}
        </div>
      </section>
    )
  }

  return (
    <section className={cn('border-t', styles.border, styles.section)}>
      <div
        className={cn(
          'mx-auto grid max-w-[min(100%,96rem)] items-center gap-10 px-6 py-20 md:gap-16 md:px-12 md:py-28 lg:grid-cols-2 lg:gap-16 lg:px-16',
          reverse && 'lg:[&>*:first-child]:order-2'
        )}
      >
        {blurText ? copy : <Reveal>{copy}</Reveal>}

        <Reveal delay={0.08}>
          <CaseStudyScreenshot
            src={image}
            alt={title}
            layout="inline"
            aspectRatio={imageAspect}
            frameTheme={screenshotFrame}
            sectionTheme={theme}
            slideFrame={slideFrame}
            projectStyle={screenshotStyle}
            deviceLabel={deviceLabel}
            imageFit={imageFit}
          />
        </Reveal>
      </div>
    </section>
  )
}

export function FeatureGridScene({
  eyebrow,
  chapterNumber,
  chapterLabel,
  title,
  body,
  features,
  accent,
  theme = 'dark',
  blurText = false,
}: {
  eyebrow?: string
  chapterNumber?: number
  chapterLabel?: string
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
      <SceneChapterHeader
        chapterNumber={chapterNumber}
        chapterLabel={chapterLabel}
        eyebrow={eyebrow}
        accent={accent}
        theme={theme}
        blurText={blurText}
      />
      <h2
        className={cn(
          'mt-8 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4rem)] font-bold tracking-[-0.03em]',
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
        <Image src={src} alt={alt} fill unoptimized className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 1024px" />
      </div>
    </figure>
  )
}

export function TestimonialScene({
  eyebrow,
  chapterNumber,
  chapterLabel,
  quote,
  attribution,
  accent,
  theme = 'dark',
}: {
  eyebrow?: string
  chapterNumber?: number
  chapterLabel?: string
  quote: string
  attribution?: string
  accent: string
  theme?: SceneTheme
}) {
  const styles = sceneThemeClasses(theme)

  return (
    <section className={cn('border-t px-6 py-28 md:px-12 md:py-36 lg:px-16', styles.border, styles.sectionAlt)}>
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          {chapterNumber != null && chapterLabel ? (
            <ChapterMarker number={chapterNumber} label={chapterLabel} accent={accent} theme={theme} align="center" />
          ) : (
            <p className={labelClass} style={{ color: accent }}>
              {eyebrow}
            </p>
          )}
          <blockquote
            className={cn(
              'mt-10 font-display text-[clamp(1.75rem,4.5vw,3rem)] font-medium leading-[1.25] tracking-[-0.02em]',
              styles.heading
            )}
          >
            &ldquo;{quote}&rdquo;
          </blockquote>
          {attribution && (
            <p className={cn('mt-8 font-heading text-sm uppercase tracking-[0.2em]', styles.body)}>
              {attribution}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
