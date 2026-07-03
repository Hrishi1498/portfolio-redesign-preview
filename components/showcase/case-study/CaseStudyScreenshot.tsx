'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  frameContentClass,
  frameContentRingClass,
  frameShellClass,
  resolveImageFrameVariant,
  type ImageFrameVariant,
} from '@/components/showcase/case-study/screenshot-frame'

/** Typical full-width product UI screenshot ratio used across case studies. */
export const CASE_STUDY_UI_ASPECT = '1024/490'

/** @deprecated Use frame variants via CaseStudyScreenshot props. Kept for RezonnaProductSpotlight. */
export const PRODUCT_IMAGE_FRAME_CLASS =
  'overflow-hidden rounded-[2.5rem] border-[3px] border-black shadow-[0_0_0_3px_#fff,0_28px_80px_-32px_rgba(0,0,0,0.5)]'

export const PRODUCT_IMAGE_FRAME_LIGHT_CLASS = cn(PRODUCT_IMAGE_FRAME_CLASS, 'bg-white')
export const PRODUCT_IMAGE_FRAME_DARK_CLASS = cn(PRODUCT_IMAGE_FRAME_CLASS, 'bg-[#050505]')

export function nativeWidthFromAspect(aspectRatio: string): number | undefined {
  const [width] = aspectRatio.split('/').map(Number)
  return width > 0 ? width : undefined
}

function sizesForWidth(width: number) {
  return `(max-width: ${width}px) 100vw, ${width}px`
}

function isPortraitAspect(aspectRatio: string): boolean {
  const [width, height] = aspectRatio.split('/').map(Number)
  return width > 0 && height > width
}

export const CASE_STUDY_INLINE_MAX_HEIGHT =
  'calc(min(62vw,960px)*490/1024)' as const

function DeviceChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-black bg-[#f7f7f8] px-4 py-3">
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex h-7 min-w-0 flex-1 items-center justify-center rounded-md bg-white px-3 ring-1 ring-zinc-200/90">
        <span className="truncate font-body text-[11px] tracking-[-0.01em] text-zinc-400">{label}</span>
      </div>
    </div>
  )
}

interface CaseStudyScreenshotProps {
  src: string
  alt: string
  className?: string
  layout?: 'inline' | 'gallery' | 'cinematic'
  sizes?: string
  aspectRatio?: string
  /** Content area tone inside device/minimal frames. */
  frameTheme?: 'light' | 'dark'
  /** Surrounding section theme — drives minimal border styling. */
  sectionTheme?: 'light' | 'dark'
  imageFit?: 'contain' | 'cover'
  frameVariant?: ImageFrameVariant
  slideFrame?: ImageFrameVariant
  projectStyle?: ImageFrameVariant
  deviceLabel?: string
}

export function CaseStudyScreenshot({
  src,
  alt,
  className,
  layout = 'inline',
  sizes,
  aspectRatio = CASE_STUDY_UI_ASPECT,
  frameTheme = 'light',
  sectionTheme = 'dark',
  imageFit,
  frameVariant,
  slideFrame,
  projectStyle,
  deviceLabel = 'app.example.com',
}: CaseStudyScreenshotProps) {
  const variant =
    frameVariant ??
    resolveImageFrameVariant({ src, layout, slideFrame, projectStyle })

  const resolvedFit =
    imageFit ?? (variant === 'none' ? 'cover' : 'contain')

  const nativeWidth = nativeWidthFromAspect(aspectRatio)
  const resolvedSizes =
    sizes ??
    (nativeWidth
      ? layout === 'gallery'
        ? `(max-width: ${nativeWidth}px) 96vw, ${nativeWidth}px`
        : sizesForWidth(nativeWidth)
      : layout === 'gallery'
        ? '(max-width: 1920px) 96vw, 1408px'
        : '(max-width: 1024px) 100vw, 1024px')

  const shellClass = frameShellClass(variant, sectionTheme, frameTheme)
  const contentClass = frameContentClass(variant, frameTheme, sectionTheme)
  const contentRingClass = frameContentRingClass(variant, sectionTheme)
  const widthStyle =
    layout !== 'gallery' && nativeWidth ? { maxWidth: nativeWidth } : undefined

  const portrait = isPortraitAspect(aspectRatio)

  const imageNode = (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      priority={layout === 'cinematic'}
      className={cn(
        resolvedFit === 'cover' ? 'object-cover object-top' : 'object-contain object-center'
      )}
      sizes={resolvedSizes}
    />
  )

  if (portrait) {
    const [portraitWidth, portraitHeight] = aspectRatio.split('/').map(Number)

    return (
      <figure className={cn('relative mx-auto inline-block w-full', shellClass, className)} style={widthStyle}>
        {variant === 'device' && <DeviceChrome label={deviceLabel} />}
        <div
          className={cn('relative mx-auto', contentClass, contentRingClass)}
          style={{
            height: CASE_STUDY_INLINE_MAX_HEIGHT,
            aspectRatio: `${portraitWidth}/${portraitHeight}`,
          }}
        >
          {imageNode}
        </div>
      </figure>
    )
  }

  return (
    <figure
      className={cn(
        'relative mx-auto w-full',
        shellClass,
        layout === 'gallery' && 'shrink-0 snap-center',
        className
      )}
      style={widthStyle}
    >
      {variant === 'device' && <DeviceChrome label={deviceLabel} />}
      <div className={cn('relative w-full', contentClass, contentRingClass)} style={{ aspectRatio }}>
        {imageNode}
        {variant === 'device' && (
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]" />
        )}
      </div>
    </figure>
  )
}
