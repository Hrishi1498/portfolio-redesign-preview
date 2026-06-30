'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import { PRODUCT_IMAGE_FRAME_LIGHT_CLASS } from '@/components/showcase/case-study/CaseStudyScreenshot'
import { cn } from '@/lib/utils'

const REZONNA_LIVE_URL = 'https://www.rezonna.com/'

const IMAGE_ASPECT = '1024/493'
const IMAGE_SIZES = '(max-width: 768px) 70vw, 920px'

interface RezonnaProductSpotlightProps {
  className?: string
  style?: CSSProperties
  /** When true, omits horizontal padding (parent section already provides it). */
  embedded?: boolean
}

function RezonnaHeadline({ className }: { className?: string }) {
  return (
    <h2
      className={cn(
        'font-body font-bold leading-[0.9] tracking-[-0.04em] text-white',
        className
      )}
    >
      <span className="text-[0.68em]">Made at</span>{' '}
      <span className="text-red-500">BitBLabs</span>
    </h2>
  )
}

function RezonnaScreenshot({
  className,
  frameClassName,
}: {
  className?: string
  frameClassName?: string
}) {
  return (
    <figure className={cn('group/rezonna-img', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.75rem] opacity-40 blur-3xl transition-opacity duration-500 group-hover/rezonna-img:opacity-55 max-md:-inset-4 max-md:rounded-[1.75rem]"
        style={{
          background:
            'radial-gradient(circle at 55% 42%, rgba(110, 231, 183, 0.45) 0%, rgba(254, 243, 199, 0.28) 42%, transparent 72%)',
        }}
      />
      <div
        className={cn(
          'relative w-full',
          PRODUCT_IMAGE_FRAME_LIGHT_CLASS,
          frameClassName,
          'transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/rezonna-img:-translate-y-1 group-hover/rezonna-img:shadow-[0_0_0_3px_#fff,0_38px_110px_-30px_rgba(0,0,0,0.6)]'
        )}
        style={{ aspectRatio: IMAGE_ASPECT }}
      >
        <Image
          src="/rezonna-work-cover.png"
          alt="Rezonna product — AI voice sales platform for real estate lead qualification"
          fill
          unoptimized
          className="object-cover object-top transition-transform duration-[650ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/rezonna-img:scale-[1.012]"
          sizes={IMAGE_SIZES}
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />
      </div>
    </figure>
  )
}

function RezonnaPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rezonna-panel rounded-2xl border-[3px] border-white/90 bg-black/85 px-5 pt-5 pb-5 text-white backdrop-blur-sm md:rounded-[1.25rem] md:px-6 md:pt-6 md:pb-6 lg:px-8 lg:pt-8 lg:pb-8',
        className
      )}
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <h3 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white">
          Rezonna
        </h3>
        <p className="font-heading text-[10px] font-normal uppercase tracking-[0.08em] text-zinc-400 md:text-xs">
          24/7 AI sales caller for real estate leads
        </p>
        <p className="font-body text-sm leading-relaxed tracking-[-0.01em] text-zinc-300 md:text-[0.9375rem] md:leading-[1.5]">
          Rezonna calls back new leads in under 15 seconds, qualifies budget and intent in 14
          languages, books site visits, and updates your CRM around the clock.
        </p>
        <a
          href={REZONNA_LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-heading text-[0.9375rem] font-medium tracking-[-0.01em] text-zinc-950 transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-100 sm:px-8"
        >
          Live Page
          <span aria-hidden className="text-sm leading-none">
            ↗
          </span>
        </a>
      </div>
    </div>
  )
}

export function RezonnaProductSpotlight({
  className,
  style,
  embedded = false,
}: RezonnaProductSpotlightProps) {
  return (
    <section
      id="product"
      className={cn(
        'relative w-full overflow-visible bg-black text-white antialiased',
        embedded
          ? 'px-0 pb-20 pt-14 max-md:pb-24 md:pb-20 md:pt-20 lg:pb-24'
          : 'px-6 pb-16 pt-14 max-md:pb-20 md:px-12 md:pb-10 md:pt-20 lg:px-16 lg:pb-12 xl:px-20',
        className
      )}
      style={style}
    >
      {/* Mobile — stacked, left-aligned within section padding */}
      <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-8 md:hidden">
        <RezonnaHeadline className="-ml-4 whitespace-nowrap text-[clamp(3rem,13vw,4.25rem)]" />
        <RezonnaScreenshot
          className="relative w-full overflow-visible px-2"
          frameClassName="max-md:rounded-[1.75rem] max-md:shadow-[0_0_0_2px_#fff,0_24px_70px_-28px_rgba(0,0,0,0.55)]"
        />
        <RezonnaPanel className="relative box-border w-full max-md:mx-auto max-md:w-[calc(100%-1rem)]" />
      </div>

      {/* Desktop — layered absolute layout (unchanged) */}
      <div className="rezonna-stage relative mx-auto hidden aspect-[1.28/1] w-full max-w-[min(100%,90rem)] md:block">
        <RezonnaHeadline className="absolute -left-7 top-4 z-[1] whitespace-nowrap text-[clamp(3rem,13vw,220px)] lg:-left-8 lg:top-6 xl:-left-10 xl:top-8" />

        <RezonnaScreenshot className="absolute left-[34%] top-[34%] z-[2] w-[66%]" />

        <RezonnaPanel className="absolute bottom-[18%] left-[3%] z-[3] w-full min-w-[28rem] max-w-[min(48%,34rem)] lg:left-[4%]" />
      </div>
    </section>
  )
}
