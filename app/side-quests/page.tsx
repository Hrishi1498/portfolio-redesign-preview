'use client'

import { Navbar } from '@/components/layout'
import Link from 'next/link'

export default function SideQuestsPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Coming Soon Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated emoji */}
          <div className="relative mb-8">
            <span className="text-7xl sm:text-8xl md:text-9xl block animate-bounce">⚔️</span>
            <div className="absolute inset-0 bg-violet-500/20 blur-[100px] -z-10" />
          </div>
          
          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Side Quests
          </h1>
          
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-violet-500/10 border border-violet-500/30 mb-6 sm:mb-8">
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-violet-500"></span>
            </span>
            <span className="font-heading text-sm sm:text-base font-semibold text-violet-400 uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
          
          {/* Description */}
          <p className="font-body text-base sm:text-lg md:text-xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed px-2">
            Personal projects and experiments in the AI realm.
            <br className="hidden sm:block" />
            Each quest unlocks new skills and earns XP.
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-500 text-white font-heading font-semibold hover:bg-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dark-700 text-white font-heading font-semibold hover:bg-dark-600 border border-white/[0.06] transition-all duration-300"
            >
              View Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
