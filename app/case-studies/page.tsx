'use client'

import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { caseStudies } from '@/lib/data'

export default function CaseStudiesPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar theme="dark" position="static" />
      <section className="px-6 pb-20 pt-8 md:px-12 md:pt-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="mb-4 font-heading text-xs uppercase tracking-[0.2em] text-zinc-500">
              Visual learning
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Case Studies
            </h1>
            <p className="mt-4 font-body text-lg leading-relaxed text-zinc-400">
              Deep dives into AI concepts, tools, and techniques — explained through engaging visual
              stories.
            </p>
          </div>

          <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {caseStudies.map((study) => (
              <li key={study.id}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04] md:p-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: study.color }}
                      aria-hidden
                    />
                    <span className="font-heading text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {study.category} · {study.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-zinc-200 md:text-3xl">
                    {study.title}
                  </h2>
                  <p className="mt-3 font-body text-base leading-relaxed text-zinc-400">
                    {study.description}
                  </p>
                  <p className="mt-6 font-heading text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors group-hover:text-white">
                    Read case study →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
