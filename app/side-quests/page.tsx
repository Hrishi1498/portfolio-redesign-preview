'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects, difficultyConfig } from '@/lib/projects-data'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'all', label: 'All Quests' },
  { id: 'completed', label: '✅ Completed' },
  { id: 'in-progress', label: '🚧 In Progress' },
  { id: 'legendary', label: '👑 Legendary' },
]

export default function SideQuestsPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.status === activeFilter || p.difficulty === activeFilter)

  const totalXP = projects.reduce((acc, p) => acc + p.xp, 0)
  const completedQuests = projects.filter(p => p.status === 'completed').length

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl">🎮</span>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Total Quests</p>
                <p className="font-display font-bold text-white text-xl">{projects.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Total XP</p>
                <p className="font-display font-bold text-amber-400 text-xl">{totalXP.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Completed</p>
                <p className="font-display font-bold text-emerald-400 text-xl">{completedQuests}/{projects.length}</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="text-5xl">⚔️</span> Side Quests
            </h1>
            <p className="font-body text-lg text-zinc-400 max-w-2xl mx-auto">
              Personal projects and experiments in the AI realm. Each quest unlocks new skills and earns XP.
            </p>
          </div>

          {/* Difficulty legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(difficultyConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span>{config.icon}</span>
                <span style={{ color: config.color }} className="font-medium">{config.label}</span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "px-4 py-2 rounded-full",
                  "font-heading text-sm font-medium",
                  "transition-all duration-200",
                  activeFilter === filter.id
                    ? "bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    : "bg-dark-700 text-zinc-400 hover:text-white hover:bg-dark-600 border border-white/[0.06]"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                featured={project.featured}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-dark-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <p className="font-body text-zinc-500">No quests found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
            <span>🤝</span> Open to Collaboration
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Want to build something together?
          </h2>
          <p className="font-body text-zinc-400 mb-8 max-w-xl mx-auto">
            I'm always looking for exciting AI projects to work on. If you have an idea or want to collaborate, let's connect!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-500 text-white font-heading font-semibold hover:bg-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in Touch
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dark-700 text-white font-heading font-semibold hover:bg-dark-600 border border-white/[0.06] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View GitHub
            </a>
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
