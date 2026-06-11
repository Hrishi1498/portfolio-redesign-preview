'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { VerticalMarquee } from '@/components/ui/VerticalMarquee'
import { BOOKING_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

/** What we build — aligned with portfolio work */
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
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marqueeContainer = marqueeRef.current
    if (!marqueeContainer) return

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item')
      const containerRect = marqueeContainer.getBoundingClientRect()
      const centerY = containerRect.top + containerRect.height / 2

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect()
        const itemCenterY = itemRect.top + itemRect.height / 2
        const distance = Math.abs(centerY - itemCenterY)
        const maxDistance = containerRect.height / 2
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        const opacity = 1 - normalizedDistance * 0.75
        ;(item as HTMLElement).style.opacity = opacity.toString()
      })
    }

    let frame = 0
    const tick = () => {
      updateOpacity()
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section id="contact" className="relative overflow-hidden bg-base px-6 py-24 text-white sm:py-32">
      <div className="mx-auto w-full max-w-7xl animate-fade-in-up">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl space-y-8">
            <p className="animate-fade-in-up font-heading text-xs uppercase tracking-[0.2em] text-zinc-500 [animation-delay:100ms]">
              Contact
            </p>
            <h2 className="animate-fade-in-up font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl [animation-delay:200ms]">
              Let&apos;s build something
              <br />
              <span className="text-zinc-500">exceptional</span>
            </h2>
            <p className="animate-fade-in-up font-body text-lg leading-relaxed text-zinc-400 md:text-xl [animation-delay:400ms]">
              Accepting new projects. Tell us about yours.
            </p>
            <div className="flex animate-fade-in-up flex-wrap gap-4 [animation-delay:600ms]">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 font-heading text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-200"
              >
                <span className="relative z-10">Book a project discussion</span>
                <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              </a>
              <Link
                href="/work"
                className="group relative overflow-hidden rounded-full border border-white/20 px-8 py-3.5 font-heading text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:border-white/40 hover:bg-white/5"
              >
                <span className="relative z-10">View our work</span>
                <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              </Link>
            </div>
          </div>

          <div
            ref={marqueeRef}
            className="relative flex h-[480px] animate-fade-in-up items-center justify-center sm:h-[560px] lg:h-[640px] [animation-delay:400ms]"
          >
            <div className="relative h-full w-full">
              <VerticalMarquee speed={18} className="h-full">
                {marqueeItems.map((item) => (
                  <div
                    key={item}
                    className={cn(
                      'marquee-item py-8 font-display text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl'
                    )}
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>

              <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-48 bg-gradient-to-b from-base via-base/50 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-t from-base via-base/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
