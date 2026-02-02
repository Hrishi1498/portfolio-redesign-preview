'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout'
import { CaseStudyCard, CategoryFilter } from '@/components/ui'
import { caseStudies, categories } from '@/lib/data'

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredStudies = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter(study => study.category === activeCategory)

  const featuredStudy = filteredStudies.find(s => s.featured)
  const regularStudies = filteredStudies.filter(s => !s.featured)

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
              Visual Learning
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Case Studies
            </h1>
            <p className="font-body text-lg text-zinc-400 max-w-xl mx-auto">
              Deep dives into AI concepts, tools, and techniques, explained through engaging visual stories.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured card spans 2 columns */}
            {featuredStudy && (
              <CaseStudyCard study={featuredStudy} featured />
            )}
            
            {/* Regular cards */}
            {regularStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>

          {/* Empty state */}
          {filteredStudies.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="font-body text-zinc-500">No case studies in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Get new case studies weekly
          </h2>
          <p className="font-body text-zinc-400 mb-8">
            Join 132,793+ people learning AI through visual stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-xl bg-dark-700 border border-white/[0.06] text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors font-body"
            />
            <button className="px-6 py-3 rounded-xl bg-violet-500 text-white font-heading font-semibold hover:bg-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
