import { cn } from '@/lib/utils'

export type ImageFrameVariant = 'none' | 'minimal' | 'device' | 'rezonna'

const LIGHT_SECTION_BORDER = 'border-2 border-zinc-700/85'
const LIGHT_SECTION_INSET_RING = 'ring-2 ring-inset ring-zinc-600/55'

export function isPreFramedAsset(src: string): boolean {
  return /-framed\.(png|jpe?g|webp|svg)$/i.test(src)
}

export function resolveImageFrameVariant(options: {
  src: string
  layout: 'inline' | 'gallery' | 'cinematic'
  slideFrame?: ImageFrameVariant
  projectStyle?: ImageFrameVariant
}): ImageFrameVariant {
  if (options.slideFrame) return options.slideFrame
  if (isPreFramedAsset(options.src)) return 'none'
  if (options.layout === 'cinematic' || options.layout === 'gallery') return 'minimal'
  if (options.projectStyle) return options.projectStyle
  return 'minimal'
}

export function frameShellClass(
  variant: ImageFrameVariant,
  sectionTheme: 'light' | 'dark',
  frameTheme: 'light' | 'dark'
): string {
  switch (variant) {
    case 'none':
      if (sectionTheme === 'light') {
        return cn(
          'overflow-hidden rounded-xl',
          LIGHT_SECTION_BORDER,
          'shadow-[0_20px_60px_-40px_rgba(15,23,42,0.22)]'
        )
      }
      return 'overflow-hidden rounded-xl shadow-[0_28px_90px_-48px_rgba(0,0,0,0.55)]'
    case 'minimal':
      if (sectionTheme === 'light') {
        return cn(
          'overflow-hidden rounded-2xl',
          LIGHT_SECTION_BORDER,
          'bg-white',
          'shadow-[0_28px_80px_-44px_rgba(15,23,42,0.18)]'
        )
      }
      return cn(
        'overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0a0a0a]',
        'shadow-[0_32px_100px_-48px_rgba(0,0,0,0.72)]'
      )
    case 'device':
      return cn(
        'overflow-hidden rounded-2xl border-[3px] border-black bg-white',
        'shadow-[0_24px_80px_-36px_rgba(0,0,0,0.55)]'
      )
    case 'rezonna':
      if (sectionTheme === 'dark') {
        return cn(
          'overflow-hidden rounded-[2.5rem] border-[3px] border-black bg-white',
          'shadow-[0_0_0_3px_#fff,0_28px_80px_-32px_rgba(0,0,0,0.5)]'
        )
      }
      return cn(
        'overflow-hidden rounded-2xl',
        LIGHT_SECTION_BORDER,
        'bg-white',
        'shadow-[0_28px_80px_-44px_rgba(15,23,42,0.18)]'
      )
    default:
      return frameShellClass('minimal', sectionTheme, frameTheme)
  }
}

export function frameContentClass(
  variant: ImageFrameVariant,
  frameTheme: 'light' | 'dark',
  sectionTheme: 'light' | 'dark' = 'dark'
): string {
  if (variant === 'device') {
    return frameTheme === 'dark' ? 'bg-[#050505]' : 'bg-zinc-100'
  }
  if (variant === 'none') return 'bg-transparent'
  if (variant === 'minimal' && frameTheme === 'dark') return 'bg-[#050505]'
  return 'bg-white'
}

export function frameContentRingClass(
  _variant: ImageFrameVariant,
  sectionTheme: 'light' | 'dark'
): string {
  return sectionTheme === 'light' ? LIGHT_SECTION_INSET_RING : ''
}

export function liveUrlLabel(liveUrl?: string, fallback = 'app.example.com'): string {
  if (!liveUrl) return fallback
  try {
    return new URL(liveUrl).hostname.replace(/^www\./, '')
  } catch {
    return liveUrl
  }
}
