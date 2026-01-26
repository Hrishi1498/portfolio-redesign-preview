'use client'

import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout'
import { StorySlide } from '@/components/ui'
import { portfolioProjects } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const project = portfolioProjects.find(p => p.slug === slug)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalSlides = project?.slides?.length || 0

  const goToNextSlide = useCallback(() => {
    if (isTransitioning || currentSlide >= totalSlides - 1) return
    setDirection('next')
    setIsTransitioning(true)
    setCurrentSlide(prev => prev + 1)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }, [currentSlide, totalSlides, isTransitioning])

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning || currentSlide <= 0) return
    setDirection('prev')
    setIsTransitioning(true)
    setCurrentSlide(prev => prev - 1)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }, [currentSlide, isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goToNextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevSlide()
      } else if (e.key === 'Escape') {
        router.push('/projects')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNextSlide, goToPrevSlide, router])

  if (!project) {
    return (
      <main className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-6xl mb-6 block">🔍</span>
            <h1 className="font-display text-3xl font-bold text-white mb-4">
              Project Not Found
            </h1>
            <p className="font-body text-zinc-400 mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 text-white font-heading font-semibold hover:bg-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // If project has no slides, show a simple detail page
  if (!project.slides || project.slides.length === 0) {
    return (
      <main className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-heading text-sm font-medium">All Projects</span>
            </Link>
            <h1 className="font-display text-4xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="font-body text-lg text-zinc-400 mb-8">
              {project.description}
            </p>
          </div>
        </div>
      </main>
    )
  }

  const isLastSlide = currentSlide === totalSlides - 1
  const isFirstSlide = currentSlide === 0

  return (
    <main className="h-screen bg-dark-900 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Back button */}
          <Link
            href="/projects"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-heading text-sm font-medium hidden sm:inline">All Projects</span>
          </Link>

          {/* Title and progress */}
          <div className="flex flex-col items-center">
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1"
              style={{ 
                backgroundColor: project.color + '20',
                color: project.color,
              }}
            >
              {project.category}
            </span>
            <h1 className="font-display font-bold text-white text-sm md:text-base text-center max-w-xs md:max-w-md truncate">
              {project.title}
            </h1>
          </div>

          {/* Reading progress */}
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="font-mono text-sm">
              {currentSlide + 1}/{totalSlides}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-dark-800 overflow-hidden">
          <div 
            className="h-full transition-all duration-700 ease-out"
            style={{ 
              width: `${((currentSlide + 1) / totalSlides) * 100}%`,
              backgroundColor: project.color,
              boxShadow: `0 0 20px ${project.color}`,
            }}
          />
        </div>
      </header>

      {/* Story slides container */}
      <div className="h-full pt-20 relative">
        {project.slides?.map((slide, index) => (
          <StorySlide
            key={slide.id}
            slide={slide}
            color={project.color}
            isActive={currentSlide === index}
            direction={direction}
          />
        ))}
      </div>

      {/* Navigation controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-dark-900/90 to-transparent pb-6 pt-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Progress dots */}
          <div className="flex justify-center gap-3 mb-6">
            {project.slides?.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isTransitioning) return
                  setDirection(index > currentSlide ? 'next' : 'prev')
                  setIsTransitioning(true)
                  setCurrentSlide(index)
                  setTimeout(() => setIsTransitioning(false), 700)
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-500 ease-out",
                  currentSlide === index 
                    ? "w-10" 
                    : "w-2 hover:scale-125"
                )}
                style={{ 
                  backgroundColor: currentSlide === index ? project.color : 'rgba(255,255,255,0.2)',
                  boxShadow: currentSlide === index ? `0 0 15px ${project.color}` : 'none',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-4">
            {/* Previous button */}
            <button
              onClick={goToPrevSlide}
              disabled={isFirstSlide || isTransitioning}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl font-heading font-semibold transition-all duration-300",
                isFirstSlide 
                  ? "opacity-30 cursor-not-allowed text-zinc-500" 
                  : "text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:scale-105 active:scale-95"
              )}
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Keyboard hint */}
            <div className="hidden md:flex items-center gap-3 text-zinc-500 text-sm">
              <kbd className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] font-mono text-xs">←</kbd>
              <kbd className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] font-mono text-xs">→</kbd>
              <span className="text-zinc-600">navigate</span>
            </div>

            {/* Next / Finish button */}
            {isLastSlide ? (
              <Link
                href="/projects"
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl font-heading font-semibold text-white transition-all duration-300",
                  "hover:scale-105 active:scale-95"
                )}
                style={{ 
                  backgroundColor: project.color,
                  boxShadow: `0 0 30px ${project.color}50`,
                }}
              >
                <span>Back to Projects</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <button
                onClick={goToNextSlide}
                disabled={isTransitioning}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl font-heading font-semibold text-white transition-all duration-300",
                  "hover:scale-105 active:scale-95"
                )}
                style={{ 
                  backgroundColor: project.color,
                  boxShadow: `0 0 30px ${project.color}50`,
                }}
              >
                <span>Next</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Click zones for navigation */}
      <button
        onClick={goToPrevSlide}
        disabled={isFirstSlide || isTransitioning}
        className="fixed left-0 top-20 bottom-32 w-1/5 cursor-pointer opacity-0 hover:opacity-100 transition-all duration-300 z-40 flex items-center justify-start pl-6"
        aria-label="Previous slide"
      >
        {!isFirstSlide && (
          <div 
            className="w-14 h-14 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: `${project.color}20`,
              border: `1px solid ${project.color}30`,
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        )}
      </button>
      <button
        onClick={goToNextSlide}
        disabled={isLastSlide || isTransitioning}
        className="fixed right-0 top-20 bottom-32 w-1/5 cursor-pointer opacity-0 hover:opacity-100 transition-all duration-300 z-40 flex items-center justify-end pr-6"
        aria-label="Next slide"
      >
        {!isLastSlide && (
          <div 
            className="w-14 h-14 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: `${project.color}20`,
              border: `1px solid ${project.color}30`,
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </button>
    </main>
  )
}
