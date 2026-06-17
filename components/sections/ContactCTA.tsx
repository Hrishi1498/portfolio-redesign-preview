'use client'

import Link from 'next/link'
import { VerticalMarquee } from '@/components/ui/VerticalMarquee'
import { BOOKING_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

/** What we build, aligned with portfolio work */
const marqueeItems = [
  'AI Voice Platforms',
  'Digital Product Passports',
  'Supply Chain Systems',
  'Financial Modeling Tools',
  'Enterprise Dashboards',
  'Web Applications',
  'EdTech AI Products',
]

export function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-white px-6 py-24 text-zinc-950 antialiased md:px-12 lg:px-16 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] animate-fade-in-up">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.75fr)] lg:gap-12 xl:gap-24">
          <div className="min-w-0 w-full space-y-8 lg:max-w-none lg:pr-6 xl:pr-10">
            <p className="animate-fade-in-up font-heading text-xs uppercase tracking-[0.2em] text-zinc-500 [animation-delay:100ms]">
              Contact
            </p>
            <h2 className="animate-fade-in-up font-display text-[clamp(2.75rem,8vw,8rem)] font-bold leading-[0.95] tracking-tight text-zinc-950 [animation-delay:200ms]">
              Let&apos;s build something
              <br />
              <span className="text-zinc-400">exceptional</span>
            </h2>
            <p className="animate-fade-in-up font-body text-lg leading-relaxed text-zinc-600 md:text-xl [animation-delay:400ms]">
              Accepting new projects. Tell us about yours.
            </p>
            <div className="flex animate-fade-in-up flex-wrap gap-4 [animation-delay:600ms]">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full bg-zinc-950 px-8 py-3.5 font-heading text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800"
              >
                <span className="relative z-10">Book a project discussion</span>
                <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              </a>
              <Link
                href="/work"
                className="group relative overflow-hidden rounded-full border border-zinc-300 px-8 py-3.5 font-heading text-sm font-medium text-zinc-900 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-400 hover:bg-zinc-50"
              >
                <span className="relative z-10">View our work</span>
                <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-zinc-900/5 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              </Link>
            </div>
          </div>

          <div className="relative flex h-[480px] animate-fade-in-up items-center justify-center sm:h-[560px] lg:ml-auto lg:h-[640px] lg:max-w-md lg:justify-self-end xl:max-w-lg [animation-delay:400ms]">
            <div className="relative h-full w-full">
              <VerticalMarquee speed={18} className="h-full">
                {marqueeItems.map((item) => (
                  <div
                    key={item}
                    className={cn(
                      'py-8 font-display text-3xl font-light tracking-tight text-zinc-950 sm:text-4xl md:text-5xl lg:text-6xl'
                    )}
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>

              <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-48 bg-gradient-to-b from-white via-white/50 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-t from-white via-white/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
