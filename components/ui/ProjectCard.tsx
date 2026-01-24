'use client'

import { cn } from '@/lib/utils'
import type { Project } from '@/lib/projects-data'
import { difficultyConfig, statusConfig } from '@/lib/projects-data'
import { useRef, useState } from 'react'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glareX, setGlareX] = useState(50)
  const [glareY, setGlareY] = useState(50)
  const [isHovered, setIsHovered] = useState(false)

  const difficulty = difficultyConfig[project.difficulty]
  const status = statusConfig[project.status]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    setGlareX((x / rect.width) * 100)
    setGlareY((y / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "bg-dark-800 border border-white/[0.06]",
        "transition-all duration-200 ease-out cursor-pointer",
        featured && "md:col-span-2 md:row-span-2"
      )}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        boxShadow: isHovered 
          ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px ${project.color}20`
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Glare effect */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
        }}
      />

      {/* Top section with color accent */}
      <div 
        className={cn(
          "relative overflow-hidden",
          featured ? "h-48" : "h-32"
        )}
        style={{ backgroundColor: project.color + '15' }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-16 h-16 rounded-2xl opacity-20 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
            style={{ 
              backgroundColor: project.color,
              boxShadow: `0 0 60px ${project.color}50`,
            }}
          />
          {/* Floating particles */}
          <div className="absolute top-4 right-6 w-2 h-2 rounded-full opacity-40 animate-pulse" style={{ backgroundColor: project.color }} />
          <div className="absolute bottom-8 left-8 w-3 h-3 rounded-full opacity-30" style={{ backgroundColor: project.color }} />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: project.color }} />
        </div>

        {/* Status badge */}
        <div className="absolute top-4 left-4 z-10">
          <span 
            className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm"
            style={{ 
              backgroundColor: status.color + '20',
              color: status.color,
              border: `1px solid ${status.color}30`,
            }}
          >
            <span>{status.icon}</span>
            {status.label}
          </span>
        </div>

        {/* XP badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-black/50 text-amber-400 backdrop-blur-sm border border-amber-400/20 flex items-center gap-1">
            <span>⚡</span>
            {project.xp} XP
          </span>
        </div>

        {/* Difficulty badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <span 
            className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-black/40 backdrop-blur-sm"
            style={{ color: difficulty.color }}
          >
            <span>{difficulty.icon}</span>
            {difficulty.label}
          </span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-dark-800 to-transparent" />
      </div>

      {/* Content */}
      <div className={cn("p-6", featured && "p-8")}>
        <h3 className={cn(
          "font-display font-bold text-white mb-2 group-hover:text-violet-400 transition-colors",
          featured ? "text-2xl" : "text-lg"
        )}>
          {project.title}
        </h3>
        
        <p className={cn(
          "font-body text-zinc-400 leading-relaxed mb-4",
          featured ? "text-base" : "text-sm"
        )}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span 
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-dark-700 text-zinc-400 border border-white/[0.04]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-violet-500 text-white hover:bg-violet-400 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-dark-700 text-zinc-300 hover:text-white hover:bg-dark-600 border border-white/[0.06] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
        </div>
      </div>

      {/* Featured glow border */}
      {featured && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            boxShadow: `inset 0 0 0 1px ${project.color}30`,
          }}
        />
      )}
    </div>
  )
}
