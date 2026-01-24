'use client'

import { Navbar } from '@/components/layout'
import { PrincipleCard } from '@/components/ui/PrincipleCard'
import { psychologyCategories } from '@/lib/psychology-data'

export default function BrainStuffPage() {
  const totalPrinciples = psychologyCategories.reduce(
    (acc, cat) => acc + cat.principles.length, 
    0
  )

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-5xl md:text-6xl">🧠</span> {totalPrinciples} AI Principles & Mental Models
            <br />
            <span className="text-zinc-400">…that Make You a Better Builder</span>
          </h1>
          
          <p className="font-body text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
            Every time you interact with AI, you need to:
          </p>

          {/* Decision cycle */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            <div className="p-4 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl mb-2 block">💬</span>
              <span className="font-heading text-sm text-zinc-300">Craft the <strong className="text-white">prompt</strong></span>
            </div>
            <div className="p-4 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl mb-2 block">🧠</span>
              <span className="font-heading text-sm text-zinc-300">Understand the <strong className="text-white">model</strong></span>
            </div>
            <div className="p-4 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl mb-2 block">🔧</span>
              <span className="font-heading text-sm text-zinc-300">Build the <strong className="text-white">system</strong></span>
            </div>
            <div className="p-4 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl mb-2 block">⚖️</span>
              <span className="font-heading text-sm text-zinc-300">Consider the <strong className="text-white">ethics</strong></span>
            </div>
          </div>

          <p className="font-body text-zinc-500">
            Below is a list of principles and mental models (with explanations) for each category.
            <br />
            <span className="text-violet-400">Click any card to expand.</span>
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {psychologyCategories.map((category) => (
            <div key={category.id}>
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{category.emoji}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                    {category.title}
                  </h2>
                </div>
                <p className="font-body text-zinc-400 max-w-2xl">
                  {category.description}
                </p>
              </div>

              {/* Principles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.principles.map((principle) => (
                  <PrincipleCard key={principle.id} principle={principle} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Get the Cheat Sheet
          </h2>
          <p className="font-body text-zinc-400 mb-8">
            All {totalPrinciples} principles summarized in one PDF. Use it while building AI products.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-xl bg-dark-700 border border-white/[0.06] text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors font-body"
            />
            <button className="px-6 py-3 rounded-xl bg-violet-500 text-white font-heading font-semibold hover:bg-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300">
              Download Free PDF
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-body text-sm text-zinc-500">
            © 2026 AI Weekly. Learn AI visually.
          </p>
        </div>
      </footer>
    </main>
  )
}
