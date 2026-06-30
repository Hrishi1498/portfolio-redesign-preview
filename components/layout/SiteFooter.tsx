'use client'

import Link from 'next/link'
import { FooterWatermark } from '@/components/layout/FooterWatermark'
import { BOOKING_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

interface SiteFooterProps {
  /** Spacing when placed directly after portfolio / Rezonna. */
  compact?: boolean
}

export function SiteFooter({ compact = false }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'relative bg-black px-6 pb-6 sm:px-10 sm:pb-8 md:px-12 lg:px-16',
        compact ? 'relative z-30 pt-16 md:mt-12 md:pt-16 lg:mt-16 lg:pt-20' : 'pt-16 lg:pt-20'
      )}
    >
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center gap-10 text-center md:items-stretch md:text-left lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col items-center space-y-6 md:items-start">
            <div className="space-y-1.5 font-body text-sm leading-relaxed text-white">
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-zinc-500">BitBLabs</p>
              <p>Digital Product Studio</p>
              <p className="text-zinc-400">Remote · Worldwide</p>
            </div>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 md:justify-start">
                <li>
                  <Link
                    href="/work"
                    className="font-body text-sm text-white transition-opacity hover:opacity-60"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-white transition-opacity hover:opacity-60"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit rounded-full bg-white px-7 py-3 font-heading text-sm font-medium text-black transition-opacity hover:opacity-85 sm:px-8"
          >
            Book a project discussion
          </a>
        </div>

        <div className="relative mt-16 sm:mt-20">
          <div className="h-px w-full bg-white/20" />
        </div>

        <p className="mt-10 max-w-md font-body text-sm leading-relaxed text-zinc-500 lg:mt-12">
          From product strategy to launch-ready builds. Our studio designs and engineers digital
          products that connect brands with their audience.
        </p>

        <p className="mt-8 font-body text-xs text-zinc-600">© {year} BitBLabs</p>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-[1400px] justify-center overflow-visible sm:mt-12">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(255, 170, 50, 0.06) 0%, transparent 65%)',
          }}
        />
        <FooterWatermark />
      </div>
    </footer>
  )
}
