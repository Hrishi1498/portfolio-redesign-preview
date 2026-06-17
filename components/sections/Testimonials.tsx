'use client'

import { HorizontalMarquee } from '@/components/ui/HorizontalMarquee'
import { Reveal } from '@/components/ui/Reveal'
import { testimonials, type Testimonial } from '@/lib/testimonials'

interface TestimonialsProps {
  accent?: string
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="flex h-full w-[min(85vw,600px)] shrink-0 grow-0 flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm">
      <blockquote className="flex flex-1 flex-col px-5 py-6 sm:px-6 sm:py-7">
        <p className="font-body text-lg font-light leading-relaxed tracking-tight text-zinc-800 sm:text-xl md:text-2xl">
          &ldquo;{item.quote}&rdquo;
        </p>
      </blockquote>

      <div className="border-t border-zinc-200 px-5 py-4 sm:px-6 sm:py-5">
        <p className="font-heading text-base font-medium text-zinc-950 md:text-lg">{item.name}</p>
      </div>
    </article>
  )
}

export function Testimonials({ accent = '#7c3aed' }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-white/[0.06] bg-base py-24 text-white sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 20% 0%, ${accent}18 0%, transparent 70%)`,
        }}
        aria-hidden
      />

      <div className="relative mx-auto mb-12 w-full max-w-5xl px-6 text-center sm:mb-14">
        <Reveal className="space-y-6 sm:space-y-8">
          <p className="font-heading text-xs uppercase tracking-[0.2em] text-zinc-500">Client voices</p>
          <h2 className="font-display text-[clamp(2.25rem,7vw,8rem)] font-bold leading-[0.95] tracking-tight whitespace-nowrap text-white">
            What clients say
          </h2>
          <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-zinc-400 md:text-xl">
            Founders and operators we&apos;ve built with, across AI, web, and enterprise platforms.
          </p>
        </Reveal>
      </div>

      <div
        className="relative w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <HorizontalMarquee speed={38} className="px-6">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </HorizontalMarquee>
      </div>
    </section>
  )
}
