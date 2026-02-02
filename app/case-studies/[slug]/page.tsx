'use client'

import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout'
import { StorySlide } from '@/components/ui'
import { caseStudies } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'

export default function CaseStudyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const study = caseStudies.find(s => s.slug === slug)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalSlides = study?.slides?.length || 0

  const goToNextSlide = useCallback(() => {
    if (isTransitioning || currentSlide >= totalSlides - 1) return
    setDirection('next')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(prev => prev + 1)
      setIsTransitioning(false)
    }, 100)
  }, [currentSlide, totalSlides, isTransitioning])

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning || currentSlide <= 0) return
    setDirection('prev')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(prev => prev - 1)
      setIsTransitioning(false)
    }, 100)
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
        router.push('/case-studies')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNextSlide, goToPrevSlide, router])

  if (!study) {
    return (
      <main className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-6xl mb-6 block">🔍</span>
            <h1 className="font-display text-3xl font-bold text-white mb-4">
              Case Study Not Found
            </h1>
            <p className="font-body text-zinc-400 mb-8">
              The case study you're looking for doesn't exist.
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 text-white font-heading font-semibold hover:bg-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
            >
              ← Back to Case Studies
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const prevStudy = study.prevSlug ? caseStudies.find(s => s.slug === study.prevSlug) : null
  const nextStudy = study.nextSlug ? caseStudies.find(s => s.slug === study.nextSlug) : null
  const isLastSlide = currentSlide === totalSlides - 1
  const isFirstSlide = currentSlide === 0

  return (
    <main className="min-h-screen sm:h-screen bg-dark-900 overflow-x-hidden sm:overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Back button */}
          <Link
            href="/case-studies"
            className="flex items-center gap-1 sm:gap-2 text-zinc-400 hover:text-white transition-colors group min-w-[40px]"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-heading text-sm font-medium hidden sm:inline">All Case Studies</span>
          </Link>

          {/* Title and progress */}
          <div className="flex flex-col items-center flex-1 mx-2 sm:mx-4">
            <span 
              className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1"
              style={{ 
                backgroundColor: study.color + '20',
                color: study.color,
              }}
            >
              {study.category}
            </span>
            <h1 className="font-display font-bold text-white text-xs sm:text-sm md:text-base text-center max-w-[150px] sm:max-w-xs md:max-w-md truncate">
              {study.title}
            </h1>
          </div>

          {/* Reading progress */}
          <div className="flex items-center gap-2 text-zinc-400 min-w-[40px] justify-end">
            <span className="font-mono text-xs sm:text-sm">
              {currentSlide + 1}/{totalSlides}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 sm:h-1 bg-dark-800">
          <div 
            className="h-full transition-all duration-300 ease-out"
            style={{ 
              width: `${((currentSlide + 1) / totalSlides) * 100}%`,
              backgroundColor: study.color,
              boxShadow: `0 0 10px ${study.color}80`,
            }}
          />
        </div>
      </header>

      {/* Story slides container */}
      <div className="min-h-screen sm:h-full pt-16 sm:pt-20 pb-32 sm:pb-0 relative">
        {study.slides?.map((slide, index) => (
          <StorySlide
            key={slide.id}
            slide={slide}
            color={study.color}
            isActive={currentSlide === index}
            direction={direction}
          />
        ))}
      </div>

      {/* Navigation controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-dark-900 via-dark-900/95 to-transparent pb-4 sm:pb-6 pt-6 sm:pt-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-6">
          {/* Progress dots - scrollable on mobile */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 overflow-x-auto pb-2 px-4 -mx-4 scrollbar-hide">
            {study.slides?.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 'next' : 'prev')
                  setCurrentSlide(index)
                }}
                className={cn(
                  "h-1.5 sm:h-2 rounded-full transition-all duration-300 flex-shrink-0",
                  currentSlide === index 
                    ? "w-6 sm:w-8" 
                    : "w-1.5 sm:w-2 hover:opacity-80"
                )}
                style={{ 
                  backgroundColor: currentSlide === index ? study.color : 'rgba(255,255,255,0.2)',
                  boxShadow: currentSlide === index ? `0 0 10px ${study.color}` : 'none',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Previous button */}
            <button
              onClick={goToPrevSlide}
              disabled={isFirstSlide}
              className={cn(
                "flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-xl font-heading text-sm sm:text-base font-semibold transition-all",
                isFirstSlide 
                  ? "opacity-30 cursor-not-allowed text-zinc-500" 
                  : "text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] active:scale-95"
              )}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Keyboard hint - desktop only */}
            <div className="hidden md:flex items-center gap-4 text-zinc-500 text-sm">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded bg-white/[0.05] border border-white/[0.1] font-mono text-xs">←</kbd>
                <kbd className="px-2 py-1 rounded bg-white/[0.05] border border-white/[0.1] font-mono text-xs">→</kbd>
                to navigate
              </span>
            </div>

            {/* Next / Finish button */}
            {isLastSlide ? (
              <Link
                href={nextStudy ? `/case-studies/${nextStudy.slug}` : '/case-studies'}
                className={cn(
                  "flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-xl font-heading text-sm sm:text-base font-semibold text-white transition-all",
                  "shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95"
                )}
                style={{ backgroundColor: study.color }}
              >
                <span className="hidden sm:inline">{nextStudy ? 'Next Story' : 'All Stories'}</span>
                <span className="sm:hidden">Done</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <button
                onClick={goToNextSlide}
                className={cn(
                  "flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-xl font-heading text-sm sm:text-base font-semibold text-white transition-all",
                  "shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95"
                )}
                style={{ backgroundColor: study.color }}
              >
                <span>Next</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Click zones for navigation - hidden on mobile */}
      <button
        onClick={goToPrevSlide}
        disabled={isFirstSlide}
        className="hidden sm:flex fixed left-0 top-20 bottom-32 w-1/5 cursor-pointer opacity-0 hover:opacity-100 transition-opacity z-40 items-center justify-start pl-4"
        aria-label="Previous slide"
      >
        {!isFirstSlide && (
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        )}
      </button>
      <button
        onClick={goToNextSlide}
        disabled={isLastSlide}
        className="hidden sm:flex fixed right-0 top-20 bottom-32 w-1/5 cursor-pointer opacity-0 hover:opacity-100 transition-opacity z-40 items-center justify-end pr-4"
        aria-label="Next slide"
      >
        {!isLastSlide && (
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </button>
    </main>
  )
}
