'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
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
  /** Poster / still image; optional when `videoSrc` is set. */
  src?: string
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
  /** Optional looping video; `src` is used as the poster. */
  videoSrc?: string
}

function MediaContent({
  src,
  alt,
  videoSrc,
  resolvedFit,
  resolvedSizes,
  priority,
}: {
  src?: string
  alt: string
  videoSrc?: string
  resolvedFit: 'contain' | 'cover'
  resolvedSizes: string
  priority: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const fitClass =
    resolvedFit === 'cover' ? 'object-cover object-top' : 'object-contain object-center'

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!videoSrc || reduceMotion) return

    const video = videoRef.current
    if (!video) return

    setVideoReady(false)

    const markReady = () => setVideoReady(true)
    const tryPlay = () => {
      void video.play().then(markReady).catch(() => {})
    }

    video.addEventListener('playing', markReady)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          tryPlay()
        } else {
          video.pause()
        }
      },
      { threshold: [0, 0.2, 0.5, 1] },
    )

    observer.observe(video)
    // Hero videos are above the fold — start loading/playing immediately.
    if (priority) tryPlay()

    return () => {
      observer.disconnect()
      video.removeEventListener('playing', markReady)
      video.pause()
    }
  }, [videoSrc, priority, reduceMotion])

  if (videoSrc && reduceMotion) {
    if (!src) {
      return (
        <div
          className="absolute inset-0 bg-zinc-950"
          role="img"
          aria-label={alt}
        />
      )
    }

    return (
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        className={fitClass}
        sizes={resolvedSizes}
      />
    )
  }

  if (videoSrc) {
    return (
      <video
        ref={videoRef}
        className={cn(
          'absolute inset-0 h-full w-full bg-zinc-950 transition-opacity duration-300',
          fitClass,
          videoReady ? 'opacity-100' : 'opacity-0'
        )}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={alt}
      />
    )
  }

  if (!src) return null

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      className={fitClass}
      sizes={resolvedSizes}
    />
  )
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
  videoSrc,
}: CaseStudyScreenshotProps) {
  if (!src && !videoSrc) return null

  const variant =
    frameVariant ??
    resolveImageFrameVariant({ src: src ?? '', layout, slideFrame, projectStyle })

  const resolvedFit =
    imageFit ?? (variant === 'none' ? 'cover' : videoSrc ? 'cover' : 'contain')

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

  const mediaNode = (
    <MediaContent
      src={src}
      alt={alt}
      videoSrc={videoSrc}
      resolvedFit={resolvedFit}
      resolvedSizes={resolvedSizes}
      priority={layout === 'cinematic'}
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
          {mediaNode}
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
        {mediaNode}
        {variant === 'device' && (
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]" />
        )}
      </div>
    </figure>
  )
}
