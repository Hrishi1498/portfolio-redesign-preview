'use client'

import { Reveal } from '@/components/ui/Reveal'
import { founders, type Founder } from '@/lib/founders'
import { cn } from '@/lib/utils'

interface FoundersProps {
  accent?: string
}

function FounderCard({ founder, accent }: { founder: Founder; accent: string }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950 px-6 py-8 sm:px-8 sm:py-9">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-800 font-heading text-sm font-semibold tracking-wide text-white"
          aria-hidden
        >
          {founder.initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {founder.name}
          </h3>
          <p
            className="mt-1 font-heading text-[0.65rem] font-medium uppercase tracking-[0.18em] sm:text-xs"
            style={{ color: accent }}
          >
            {founder.role}
          </p>
        </div>
      </div>

      <a
        href={founder.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-4 py-2 font-heading text-[0.65rem] font-medium uppercase tracking-[0.16em] text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
        LinkedIn
      </a>

      <p className="mt-6 font-body text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-relaxed">
        {founder.bio}
      </p>
    </article>
  )
}

export function Founders({ accent = '#7c3aed' }: FoundersProps) {
  return (
    <section
      id="founders"
      className="relative overflow-hidden border-t border-zinc-200 bg-white px-6 py-24 text-zinc-950 antialiased sm:py-32 md:px-12 lg:px-16"
    >
      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <Reveal className="space-y-6 sm:space-y-8">
            <p className="font-heading text-xs uppercase tracking-[0.2em] text-zinc-500">
              The founders
            </p>
            <h2 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-bold leading-[0.95] tracking-tight text-zinc-950">
              The team behind BitBLabs
            </h2>
            <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-zinc-600 md:text-xl">
              We build custom AI systems around real workflows, from first conversation through
              production and ongoing operation.
            </p>
          </Reveal>
        </div>

        <div
          className={cn(
            'mx-auto grid w-full max-w-5xl gap-6 sm:gap-8',
            founders.length > 1 ? 'md:grid-cols-2' : 'max-w-xl',
          )}
        >
          {founders.map((founder, index) => (
            <Reveal key={founder.id} delay={index * 0.08}>
              <FounderCard founder={founder} accent={accent} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
