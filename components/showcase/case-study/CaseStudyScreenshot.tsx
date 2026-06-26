'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

/** Typical full-width product UI screenshot ratio used across case studies. */
export const CASE_STUDY_UI_ASPECT = '1024/490'

/** Matches Rezonna product screenshot frame in `RezonnaProductSpotlight`. */
export const PRODUCT_IMAGE_FRAME_CLASS =
  'overflow-hidden rounded-[2.5rem] border-[3px] border-black shadow-[0_0_0_3px_#fff,0_28px_80px_-32px_rgba(0,0,0,0.5)]'

export const PRODUCT_IMAGE_FRAME_LIGHT_CLASS = cn(PRODUCT_IMAGE_FRAME_CLASS, 'bg-white')
export const PRODUCT_IMAGE_FRAME_DARK_CLASS = cn(PRODUCT_IMAGE_FRAME_CLASS, 'bg-[#050505]')

function isPortraitAspect(aspectRatio: string): boolean {
  const [width, height] = aspectRatio.split('/').map(Number)
  return width > 0 && height > width
}

/** Height of landscape screenshots in the inline column (matches `sizes` max width). */
export const CASE_STUDY_INLINE_MAX_HEIGHT =
  'calc(min(62vw,960px)*490/1024)' as const

interface CaseStudyScreenshotProps {
  src: string
  alt: string
  className?: string
  layout?: 'inline' | 'gallery'
  sizes?: string
  aspectRatio?: string
  frameTheme?: 'light' | 'dark'
  imageFit?: 'contain' | 'cover'
}

export function CaseStudyScreenshot({
  src,
  alt,
  className,
  layout = 'inline',
  sizes,
  aspectRatio = CASE_STUDY_UI_ASPECT,
  frameTheme = 'light',
  imageFit = 'contain',
}: CaseStudyScreenshotProps) {
  const resolvedSizes =
    sizes ?? (layout === 'gallery' ? '(max-width: 768px) 96vw, 1200px' : '(max-width: 1024px) 100vw, 62vw')

  const frameClass =
    frameTheme === 'dark' ? PRODUCT_IMAGE_FRAME_DARK_CLASS : PRODUCT_IMAGE_FRAME_LIGHT_CLASS

  const portrait = isPortraitAspect(aspectRatio)

  if (portrait) {
    const [portraitWidth, portraitHeight] = aspectRatio.split('/').map(Number)

    return (
      <figure
        className={cn(
          'relative mx-auto inline-block',
          frameClass,
          className
        )}
      >
        <div
          className="relative mx-auto"
          style={{
            height: CASE_STUDY_INLINE_MAX_HEIGHT,
            aspectRatio: `${portraitWidth}/${portraitHeight}`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            className="object-contain object-center"
            sizes="(max-width: 768px) 70vw, 16rem"
          />
        </div>
      </figure>
    )
  }

  return (
    <figure
      className={cn(
        'relative',
        frameClass,
        layout === 'gallery' && 'w-[min(96vw,72rem)] shrink-0 snap-center',
        className
      )}
    >
      <div className="relative w-full" style={{ aspectRatio }}>
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className={cn(
            imageFit === 'cover' ? 'object-cover object-top' : 'object-contain object-center'
          )}
          sizes={resolvedSizes}
        />
      </div>
    </figure>
  )
}
