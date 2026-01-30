'use client'

import { cn } from '@/lib/utils'
import type { PortfolioProject } from '@/lib/portfolio-data'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface PortfolioCardProps {
  project: PortfolioProject
  featured?: boolean
}

export function PortfolioCard({ project, featured = false }: PortfolioCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateXValue = ((y - centerY) / centerY) * -8
    const rotateYValue = ((x - centerX) / centerX) * 8
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const hasStory = project.slides && project.slides.length > 0

  return (
    <Link
      ref={cardRef}
      href={hasStory ? `/projects/${project.slug}` : '#'}
      className={cn(
        "group relative rounded-2xl overflow-hidden block",
        "bg-dark-800 border border-white/[0.08]",
        "transition-all duration-300 ease-out",
        featured && "md:col-span-2 md:row-span-2",
        hasStory && "cursor-pointer"
      )}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        boxShadow: isHovered 
          ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1), 0 0 40px ${project.color}20`
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={(e) => {
        // Don't navigate if clicking on external links
        const target = e.target as HTMLElement
        if (target.closest('a[href^="http"], a[href^="/case-studies"]')) {
          e.preventDefault()
        }
      }}
    >
      <div className="relative">
      {/* Thumbnail area */}
      <div 
        className={cn(
          "relative overflow-hidden flex items-center justify-center",
          featured ? "h-64 md:h-80" : "h-48"
        )}
        style={{ backgroundColor: project.color + '15' }}
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl rotate-12 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-125"
            style={{ backgroundColor: project.color + '30' }}
          />
          <div 
            className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full transition-transform duration-500 group-hover:translate-x-4"
            style={{ backgroundColor: project.color + '20' }}
          />
          <div 
            className="absolute bottom-1/4 left-1/4 w-12 h-12 rounded-lg transition-transform duration-500 group-hover:-translate-y-4"
            style={{ backgroundColor: project.color + '25' }}
          />
        </div>

        {/* Logo or Category Icon */}
        {project.images.thumbnail ? (
          <div className="relative z-[5] flex items-center justify-center">
            {/* Glow effect */}
            <div 
              className="absolute rounded-2xl blur-2xl opacity-50 transition-all duration-500 group-hover:opacity-70"
              style={{ 
                background: project.color,
                width: featured ? '120px' : '100px',
                height: featured ? '120px' : '100px',
              }}
            />
            
            {/* Logo container with white background */}
            <div 
              className={cn(
                "relative flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1",
                featured ? "w-28 h-28 p-5" : "w-24 h-24 p-4"
              )}
              style={{ 
                background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                boxShadow: `
                  0 16px 40px rgba(0, 0, 0, 0.25),
                  0 0 0 1px rgba(255, 255, 255, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.9),
                  0 0 50px ${project.color}25
                `,
              }}
            >
              <Image 
                src={project.images.thumbnail}
                alt={`${project.title} logo`}
                width={featured ? 72 : 56}
                height={featured ? 72 : 56}
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <div 
            className={cn(
              "relative z-[5] flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1",
              featured ? "w-20 h-20 text-4xl" : "w-16 h-16 text-3xl"
            )}
            style={{ 
              background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
              boxShadow: `0 8px 32px ${project.color}30`,
              border: `1px solid ${project.color}40`,
            }}
          >
            {project.category === 'ai' ? '🤖' : 
             project.category === 'web' ? '🌐' : 
             project.category === 'mobile' ? '📱' : 
             project.category === 'data' ? '📊' : '💻'}
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span 
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{ 
              backgroundColor: project.color + '30',
              color: project.color,
              border: `1px solid ${project.color}40`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Year badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/40 text-white/90 backdrop-blur-sm">
            {project.year}
          </span>
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <span>⭐</span> Featured
            </span>
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-800 to-transparent" />
      </div>

      {/* Content */}
      <div className={cn("p-6", featured && "md:p-8")}>
        {/* Title & tagline */}
        <h3 className={cn(
          "font-display font-bold text-white mb-2 group-hover:text-violet-400 transition-colors",
          featured ? "text-2xl md:text-3xl" : "text-xl"
        )}>
          {project.title}
        </h3>
        <p className="font-body text-zinc-400 text-sm mb-4">
          {project.tagline}
        </p>

        {/* Role & duration */}
        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {project.role}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {project.duration}
          </span>
        </div>

        {/* Metrics (for featured) */}
        {featured && project.metrics && (
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-dark-900/50 border border-white/[0.04]">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <p className="font-display font-bold text-lg text-white" style={{ color: project.color }}>
                  {metric.value}
                </p>
                <p className="text-xs text-zinc-500">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, featured ? 6 : 4).map((tech) => (
            <span 
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.05] text-zinc-300 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > (featured ? 6 : 4) && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-500">
              +{project.tech.length - (featured ? 6 : 4)} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          {hasStory && (
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl font-heading text-sm font-semibold text-white bg-white/[0.05] border border-white/[0.08]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Story
            </span>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl",
                "font-heading text-sm font-semibold text-white",
                "transition-all duration-300"
              )}
              style={{ 
                backgroundColor: project.color,
                boxShadow: `0 0 20px ${project.color}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px ${project.color}60`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px ${project.color}40`
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-heading text-sm font-semibold text-zinc-300 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
          {project.links.case_study && (
            <Link
              href={project.links.case_study}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-heading text-sm font-semibold text-zinc-300 hover:text-violet-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Case Study
            </Link>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.color}10, transparent 70%)`,
        }}
      />
      </div>
    </Link>
  )
}
