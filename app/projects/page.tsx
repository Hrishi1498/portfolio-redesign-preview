'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout'
import { PortfolioCard } from '@/components/ui/PortfolioCard'
import { portfolioProjects, portfolioCategories } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              Open to new opportunities
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              My Work
            </h1>
            
            <p className="font-body text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              A collection of projects I've built — from AI-powered applications to full-stack platforms. 
              Each project represents a challenge I enjoyed solving.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                {portfolioProjects.length}
              </p>
              <p className="text-sm text-zinc-500">Projects Shipped</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-violet-400 mb-1">
                {portfolioProjects.filter(p => p.category === 'ai').length}
              </p>
              <p className="text-sm text-zinc-500">AI/ML Projects</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-emerald-400 mb-1">
                3+
              </p>
              <p className="text-sm text-zinc-500">Years Experience</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-5 py-2.5 rounded-xl",
                  "font-heading text-sm font-medium",
                  "transition-all duration-200",
                  activeCategory === category.id
                    ? "bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    : "bg-dark-800 text-zinc-400 hover:text-white hover:bg-dark-700 border border-white/[0.06]"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <PortfolioCard 
                  key={project.id} 
                  project={project}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-dark-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <p className="font-body text-zinc-500">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-white text-center mb-10">
            Technologies I Work With
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* AI/ML */}
            <div className="p-5 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl mb-3 block">🤖</span>
              <h3 className="font-heading font-bold text-white text-sm mb-2">AI / ML</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                OpenAI, Claude, LangChain, TensorFlow, PyTorch
              </p>
            </div>
            
            {/* Frontend */}
            <div className="p-5 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl mb-3 block">⚛️</span>
              <h3 className="font-heading font-bold text-white text-sm mb-2">Frontend</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                React, Next.js, TypeScript, Tailwind CSS
              </p>
            </div>
            
            {/* Backend */}
            <div className="p-5 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl mb-3 block">⚙️</span>
              <h3 className="font-heading font-bold text-white text-sm mb-2">Backend</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Node.js, Python, FastAPI, PostgreSQL
              </p>
            </div>
            
            {/* Cloud */}
            <div className="p-5 rounded-2xl bg-dark-800 border border-white/[0.06]">
              <span className="text-2xl mb-3 block">☁️</span>
              <h3 className="font-heading font-bold text-white text-sm mb-2">Cloud</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                AWS, Vercel, Docker, Kubernetes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl mb-6 block">🚀</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="font-body text-zinc-400 mb-8 max-w-xl mx-auto">
            I'm always excited to work on challenging projects. Whether it's AI, web apps, or something entirely new — let's talk!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-violet-500 text-white font-heading font-semibold hover:bg-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in Touch
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-dark-700 text-white font-heading font-semibold hover:bg-dark-600 border border-white/[0.1] transition-all duration-300"
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
            © 2026 AI Weekly. Built with ❤️ and lots of ☕
          </p>
        </div>
      </footer>
    </main>
  )
}
