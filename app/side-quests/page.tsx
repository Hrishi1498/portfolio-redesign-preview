'use client'

import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'

export default function SideQuestsPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar theme="dark" position="static" />
      <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 pb-20 pt-8 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative mb-8">
            <span className="block text-7xl sm:text-8xl md:text-9xl" aria-hidden>
              ⚔️
            </span>
            <div className="absolute inset-0 -z-10 bg-violet-500/20 blur-[100px]" aria-hidden />
          </div>

          <h1 className="mb-4 font-display text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Side Quests
          </h1>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 sm:mb-8 sm:px-6 sm:py-3">
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500 sm:h-3 sm:w-3" />
            </span>
            <span className="font-heading text-sm font-semibold uppercase tracking-wider text-violet-400 sm:text-base">
              Coming Soon
            </span>
          </div>

          <p className="mb-8 px-2 font-body text-base leading-relaxed text-zinc-400 sm:mb-10 sm:text-lg md:text-xl">
            Personal projects and experiments in the AI realm.
            <br className="hidden sm:block" />
            Each quest unlocks new skills and earns XP.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-heading font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 hover:bg-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-3 font-heading font-semibold text-white transition-all duration-300 hover:bg-white/[0.08]"
            >
              View Projects
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
