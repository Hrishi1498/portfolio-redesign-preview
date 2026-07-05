'use client'

import Link from 'next/link'
import { FooterWatermark } from '@/components/layout/FooterWatermark'
import {
  BOOKING_URL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  LEGAL_ADDRESS_LINES,
  LEGAL_NAME,
  PRIVACY_PATH,
  TERMS_PATH,
} from '@/lib/site'
import { cn } from '@/lib/utils'

interface SiteFooterProps {
  /** Spacing when placed directly after portfolio / studio products. */
  compact?: boolean
  /** Company legal details and policy links (home page only). */
  showLegalInfo?: boolean
}

export function SiteFooter({ compact = false, showLegalInfo = false }: SiteFooterProps) {
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
                    href="/projects"
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

        <div
          className={cn(
            'mt-10 flex flex-col gap-10 lg:mt-12',
            showLegalInfo && 'lg:flex-row lg:items-end lg:justify-between lg:gap-16'
          )}
        >
          <div>
            <p className="max-w-md font-body text-sm leading-relaxed text-zinc-500">
              From product strategy to launch-ready builds. Our studio designs and engineers digital
              products that connect brands with their audience.
            </p>

            <p className="mt-8 font-body text-xs text-zinc-600">© {year} BitBLabs</p>
          </div>

          {showLegalInfo ? (
            <div className="space-y-4 text-center md:text-left lg:max-w-sm lg:text-right">
              <div className="space-y-1.5 font-body text-xs leading-relaxed text-zinc-500">
                <p className="font-heading text-[0.65rem] uppercase tracking-[0.2em] text-zinc-600">
                  Legal information
                </p>
                <p className="text-zinc-400">{LEGAL_NAME}</p>
                <address className="not-italic text-zinc-500">
                  {LEGAL_ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p>
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className="text-zinc-400 transition-opacity hover:opacity-60"
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </p>
              </div>

              <nav
                aria-label="Legal"
                className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start lg:justify-end"
              >
                <Link
                  href={PRIVACY_PATH}
                  className="font-body text-xs text-zinc-500 transition-opacity hover:opacity-60"
                >
                  Privacy Policy
                </Link>
                <span className="text-zinc-700" aria-hidden>
                  ·
                </span>
                <Link
                  href={TERMS_PATH}
                  className="font-body text-xs text-zinc-500 transition-opacity hover:opacity-60"
                >
                  Terms &amp; Conditions
                </Link>
              </nav>
            </div>
          ) : null}
        </div>
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
