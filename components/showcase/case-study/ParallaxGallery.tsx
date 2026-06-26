'use client'

import { Reveal } from '@/components/ui/Reveal'
import { BlurTextAnimation } from '@/components/ui/BlurTextAnimation'
import { CaseStudyScreenshot } from '@/components/showcase/case-study/CaseStudyScreenshot'
import { cn } from '@/lib/utils'
import { sceneThemeClasses, type SceneTheme } from '@/components/showcase/case-study/utils'

interface ParallaxGalleryProps {
  title: string
  description?: string
  images: string[]
  accent: string
  theme?: SceneTheme
  blurText?: boolean
}

export function ParallaxGallery({
  title,
  description,
  images,
  accent,
  theme = 'dark',
  blurText = false,
}: ParallaxGalleryProps) {
  const styles = sceneThemeClasses(theme)
  const blurTheme = theme === 'light' ? 'light' : 'dark'

  if (images.length === 0) return null

  const header = (
    <>
      {blurText ? (
        <BlurTextAnimation
          as="p"
          text="Showcase"
          variant="label"
          theme={blurTheme}
          textClassName="font-heading text-sm uppercase tracking-[0.28em] text-zinc-500"
        />
      ) : (
        <p className="font-heading text-sm uppercase tracking-[0.28em] text-zinc-500">Showcase</p>
      )}
      <h2
        className={cn(
          'mt-4 font-display text-[clamp(2.5rem,5.5vw,4rem)] font-bold tracking-[-0.03em]',
          styles.heading
        )}
      >
        {blurText ? (
          <BlurTextAnimation as="span" text={title} variant="headline" theme={blurTheme} startDelay={0.08} />
        ) : (
          title
        )}
      </h2>
      {description &&
        (blurText ? (
          <BlurTextAnimation
            as="p"
            text={description}
            variant="body"
            theme={blurTheme}
            className={cn('mt-4 max-w-2xl font-body text-lg md:text-xl', styles.body)}
            startDelay={0.16}
          />
        ) : (
          <p className={cn('mt-4 max-w-2xl font-body text-lg leading-relaxed md:text-xl', styles.body)}>
            {description}
          </p>
        ))}
    </>
  )

  return (
    <section className={cn('relative pb-32 pt-24 md:pb-44 md:pt-32', styles.sectionAlt)}>
      <div className="mx-auto mb-12 max-w-7xl px-6 md:mb-16 md:px-12 lg:px-16">
        {blurText ? header : <Reveal>{header}</Reveal>}
        <p className={cn('mt-3 font-body text-sm', styles.body)}>Scroll horizontally to view all {images.length} screens.</p>
      </div>

      <div className="overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory">
        <div className="flex w-max min-w-full gap-5 px-6 md:gap-8 md:px-12 lg:px-16">
          {images.map((src, index) => (
            <CaseStudyScreenshot
              key={`${src}-${index}`}
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              layout="gallery"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
