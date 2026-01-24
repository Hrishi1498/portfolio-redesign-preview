'use client'

import { cn } from '@/lib/utils'
import type { CaseStudy } from '@/lib/data'
import Link from 'next/link'
import { useRef, useState } from 'react'

interface CaseStudyCardProps {
  study: CaseStudy
  featured?: boolean
}

export function CaseStudyCard({ study, featured = false }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glareX, setGlareX] = useState(50)
  const [glareY, setGlareY] = useState(50)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Calculate rotation (max 12 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -12
    const rotateYValue = ((x - centerX) / centerX) * 12
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    
    // Calculate glare position
    setGlareX((x / rect.width) * 100)
    setGlareY((y / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <Link
      ref={cardRef}
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group block rounded-2xl overflow-hidden relative",
        "bg-dark-800 border border-white/[0.08]",
        "transition-all duration-200 ease-out",
        featured && "md:col-span-2"
      )}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glare/shine effect */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
      />

      {/* Thumbnail */}
      <div 
        className={cn(
          "relative overflow-hidden",
          featured ? "h-64 md:h-80" : "h-48"
        )}
        style={{ 
          backgroundColor: study.color + '12',
          transform: 'translateZ(20px)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Main icon/shape */}
          <div 
            className="w-24 h-24 rounded-2xl opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            style={{ 
              backgroundColor: study.color,
              boxShadow: `0 0 60px ${study.color}40`,
            }}
          />
          {/* Floating dots decoration */}
          <div 
            className="absolute top-8 right-8 w-3 h-3 rounded-full opacity-40"
            style={{ backgroundColor: study.color }}
          />
          <div 
            className="absolute bottom-12 left-12 w-2 h-2 rounded-full opacity-30"
            style={{ backgroundColor: study.color }}
          />
          <div 
            className="absolute top-1/3 left-8 w-4 h-4 rounded-full opacity-20"
            style={{ backgroundColor: study.color }}
          />
        </div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10" style={{ transform: 'translateZ(30px)' }}>
          <span 
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{ 
              backgroundColor: study.color + '25',
              color: study.color,
              border: `1px solid ${study.color}30`,
            }}
          >
            {study.category}
          </span>
        </div>

        {/* Reading time */}
        <div className="absolute top-4 right-4 z-10" style={{ transform: 'translateZ(30px)' }}>
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/50 text-white/90 backdrop-blur-sm border border-white/10">
            {study.readTime}
          </span>
        </div>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-800 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 relative" style={{ transform: 'translateZ(25px)' }}>
        <h3 className={cn(
          "font-display font-bold text-white mb-2",
          "group-hover:text-violet-400 transition-colors duration-300",
          featured ? "text-2xl" : "text-lg"
        )}>
          {study.title}
        </h3>
        <p className={cn(
          "font-body text-zinc-400 leading-relaxed",
          featured ? "text-base" : "text-sm"
        )}>
          {study.description}
        </p>
        
        {/* Read more indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-zinc-500 group-hover:text-violet-400 transition-colors">
          <span>Read case study</span>
          <svg 
            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Edge highlight */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.1), inset 0 -1px 0 0 rgba(0,0,0,0.3)`,
        }}
      />
    </Link>
  )
}
