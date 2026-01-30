'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface StorySlideData {
  id: number
  type: 'intro' | 'scene' | 'insight' | 'problem' | 'solution' | 'conclusion' | 'testimonial' | 'gallery' | 'features' | 'stats' | 'process' | 'architecture'
  character?: 'happy' | 'thinking' | 'surprised' | 'excited' | 'confused' | 'pointing'
  characterPosition?: 'left' | 'right' | 'center'
  title?: string
  dialogue?: string
  content: string
  highlight?: string
  image?: string
  code?: string
  emoji?: string
  bgGradient?: string
  testimonialImages?: string[]
  galleryImages?: string[]
  features?: { icon: string; title: string; description: string }[]
  stats?: { value: string; label: string; icon?: string }[]
  steps?: { number: number; title: string; description: string }[]
  layers?: { name: string; description: string; icon: string; color: string }[]
}

interface StorySlideProps {
  slide: StorySlideData
  color: string
  isActive: boolean
  direction: 'next' | 'prev' | null
}

// Type badge styles
const typeConfig: Record<StorySlideData['type'], { label: string; icon: string }> = {
  intro: { label: 'Introduction', icon: '👋' },
  scene: { label: 'The Story', icon: '📖' },
  problem: { label: 'The Challenge', icon: '🎯' },
  solution: { label: 'The Solution', icon: '✨' },
  insight: { label: 'Tech Stack', icon: '⚙️' },
  conclusion: { label: 'The Impact', icon: '🚀' },
  testimonial: { label: 'Testimonial', icon: '💬' },
  gallery: { label: 'Project Gallery', icon: '🖼️' },
  features: { label: 'Key Features', icon: '🔧' },
  stats: { label: 'By The Numbers', icon: '📊' },
  process: { label: 'How It Works', icon: '🔄' },
  architecture: { label: 'Architecture', icon: '🏗️' },
}

export function StorySlide({ slide, color, isActive, direction }: StorySlideProps) {
  const typeInfo = typeConfig[slide.type]

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        "transition-all duration-700 ease-out",
        "bg-dark-900 overflow-y-auto",
        isActive 
          ? "opacity-100 translate-x-0 scale-100" 
          : direction === 'next' 
            ? "opacity-0 translate-x-[100px] scale-95" 
            : "opacity-0 translate-x-[-100px] scale-95"
      )}
    >
      {/* Main content area */}
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Testimonial layout with two images side-by-side */}
        {slide.type === 'testimonial' && slide.testimonialImages && slide.testimonialImages.length >= 2 ? (
          <div className="w-full max-w-6xl mx-auto">
            {/* Header section with decorative quote */}
            <div className="text-center mb-12">
              {/* Large decorative quote mark */}
              <div 
                className={cn(
                  "flex justify-center mb-6",
                  "transition-all duration-700 delay-100",
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                    boxShadow: `0 0 60px ${color}30`,
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color }}>
                    <path d="M11 7.5C11 9.98528 9.48528 12 7 12C7 12 8 12 8 15C8 18 5.5 19 4 19C4 19 7 18.5 7 15.5C7 13.5 5.5 13 4 13C2.5 13 1 11.5 1 9.5C1 6.5 3.5 4 7 4C9.5 4 11 5.5 11 7.5Z" fill="currentColor"/>
                    <path d="M23 7.5C23 9.98528 21.4853 12 19 12C19 12 20 12 20 15C20 18 17.5 19 16 19C16 19 19 18.5 19 15.5C19 13.5 17.5 13 16 13C14.5 13 13 11.5 13 9.5C13 6.5 15.5 4 19 4C21.5 4 23 5.5 23 7.5Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              {/* Type badge */}
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6",
                  "transition-all duration-700 delay-200",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                  border: `1px solid ${color}40`,
                  boxShadow: `0 4px 20px ${color}15`,
                }}
              >
                <span className="text-lg">{typeInfo.icon}</span>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color }}>
                  {typeInfo.label}
                </span>
              </div>

              {/* Title */}
              {slide.title && (
                <h2 
                  className={cn(
                    "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight",
                    "transition-all duration-700 delay-300",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  {slide.title}
                </h2>
              )}

              {/* Content */}
              {slide.content && (
                <p 
                  className={cn(
                    "font-body text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto",
                    "transition-all duration-700 delay-400",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  {slide.content}
                </p>
              )}
            </div>

            {/* Two testimonial cards side-by-side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {slide.testimonialImages.map((img, index) => (
                <div 
                  key={index}
                  className={cn(
                    "group relative",
                    "transition-all duration-700",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: `${500 + index * 150}ms` }}
                >
                  {/* Card container */}
                  <div 
                    className="relative rounded-2xl overflow-hidden"
                    style={{ 
                      background: 'linear-gradient(145deg, rgba(39, 39, 42, 0.8), rgba(24, 24, 27, 0.9))',
                      border: `1px solid rgba(255, 255, 255, 0.08)`,
                      boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 80px ${color}15`,
                    }}
                  >
                    {/* Gradient top border */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: `linear-gradient(90deg, ${color}, ${color}60, ${color})` }}
                    />
                    
                    {/* LinkedIn badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div 
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ 
                          background: 'rgba(10, 102, 194, 0.2)',
                          border: '1px solid rgba(10, 102, 194, 0.4)',
                          color: '#0A66C2',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </div>
                    </div>

                    {/* Image container */}
                    <div className="relative p-4 pt-8">
                      <div className="relative rounded-xl overflow-hidden bg-zinc-900/50">
                        <Image 
                          src={img} 
                          alt={`Testimonial from client ${index + 1}`}
                          width={700}
                          height={500}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    {/* Decorative corner gradient */}
                    <div 
                      className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ 
                      boxShadow: `0 0 100px ${color}25`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Attribution */}
            <div 
              className={cn(
                "flex justify-center mt-10",
                "transition-all duration-700 delay-700",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <div 
                className="flex items-center gap-3 px-6 py-3 rounded-full"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                  }}
                >
                  👩‍💼
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">Keishika Mahesh</p>
                  <p className="text-zinc-500 text-xs">Founder & CEO, DigiProPass</p>
                </div>
              </div>
            </div>
          </div>
        ) : slide.type === 'gallery' && slide.galleryImages && slide.galleryImages.length > 0 ? (
          /* Gallery layout with multiple images */
          <div className="w-full max-w-6xl mx-auto">
            {/* Header section */}
            <div className="text-center mb-12">
              {/* Type badge */}
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6",
                  "transition-all duration-700 delay-100",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                  border: `1px solid ${color}40`,
                  boxShadow: `0 4px 20px ${color}15`,
                }}
              >
                <span className="text-lg">{typeInfo.icon}</span>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color }}>
                  {typeInfo.label}
                </span>
              </div>

              {/* Title */}
              {slide.title && (
                <h2 
                  className={cn(
                    "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight",
                    "transition-all duration-700 delay-200",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  {slide.title}
                </h2>
              )}

              {/* Content */}
              {slide.content && (
                <p 
                  className={cn(
                    "font-body text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto",
                    "transition-all duration-700 delay-300",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  {slide.content}
                </p>
              )}
            </div>

            {/* Gallery grid */}
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8",
                "transition-all duration-700 delay-400",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {slide.galleryImages.map((img, index) => (
                <div 
                  key={index}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden",
                    "transition-all duration-700",
                    isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
                  )}
                  style={{ 
                    transitionDelay: `${500 + index * 100}ms`,
                    background: 'linear-gradient(145deg, rgba(39, 39, 42, 0.8), rgba(24, 24, 27, 0.9))',
                    border: `1px solid rgba(255, 255, 255, 0.08)`,
                    boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 60px ${color}10`,
                  }}
                >
                  {/* Gradient top border */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 z-10"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}60, ${color})` }}
                  />
                  
                  {/* Image container */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={img} 
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay on hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  {/* Decorative corner gradient */}
                  <div 
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: color }}
                  />

                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ 
                      boxShadow: `0 0 80px ${color}20`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : slide.type === 'features' && slide.features ? (
          /* Features grid layout */
          <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6",
                  "transition-all duration-700 delay-100",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                  border: `1px solid ${color}40`,
                }}
              >
                <span className="text-lg">{typeInfo.icon}</span>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color }}>
                  {typeInfo.label}
                </span>
              </div>
              {slide.title && (
                <h2 
                  className={cn(
                    "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4",
                    "transition-all duration-700 delay-200",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  {slide.title}
                </h2>
              )}
              {slide.content && (
                <p className={cn(
                  "font-body text-lg text-zinc-400 max-w-2xl mx-auto",
                  "transition-all duration-700 delay-300",
                  isActive ? "opacity-100" : "opacity-0"
                )}>
                  {slide.content}
                </p>
              )}
            </div>
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slide.features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "group p-6 rounded-2xl transition-all duration-700",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                    background: 'linear-gradient(145deg, rgba(39, 39, 42, 0.6), rgba(24, 24, 27, 0.8))',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: `linear-gradient(135deg, ${color}30, ${color}10)` }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : slide.type === 'stats' && slide.stats ? (
          /* Stats display layout */
          <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6",
                  "transition-all duration-700 delay-100",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                  border: `1px solid ${color}40`,
                }}
              >
                <span className="text-lg">{typeInfo.icon}</span>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color }}>
                  {typeInfo.label}
                </span>
              </div>
              {slide.title && (
                <h2 
                  className={cn(
                    "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4",
                    "transition-all duration-700 delay-200",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  {slide.title}
                </h2>
              )}
              {slide.content && (
                <p className={cn(
                  "font-body text-lg text-zinc-400 max-w-2xl mx-auto",
                  "transition-all duration-700 delay-300",
                  isActive ? "opacity-100" : "opacity-0"
                )}>
                  {slide.content}
                </p>
              )}
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {slide.stats.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    "text-center p-6 rounded-2xl transition-all duration-700",
                    isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                  )}
                  style={{
                    transitionDelay: `${400 + index * 150}ms`,
                    background: `linear-gradient(145deg, ${color}15, ${color}05)`,
                    border: `1px solid ${color}25`,
                    boxShadow: `0 0 40px ${color}10`,
                  }}
                >
                  {stat.icon && <span className="text-3xl mb-2 block">{stat.icon}</span>}
                  <div className="font-display text-4xl md:text-5xl font-bold mb-2" style={{ color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            {slide.highlight && (
              <div 
                className={cn(
                  "mt-10 text-center px-8 py-5 rounded-2xl mx-auto max-w-2xl",
                  "transition-all duration-700 delay-700",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  backgroundColor: color + '10',
                  border: `1px solid ${color}30`,
                }}
              >
                <p className="font-body text-lg text-white">💡 {slide.highlight}</p>
              </div>
            )}
          </div>
        ) : slide.type === 'process' && slide.steps ? (
          /* Process/workflow steps layout */
          <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6",
                  "transition-all duration-700 delay-100",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                  border: `1px solid ${color}40`,
                }}
              >
                <span className="text-lg">{typeInfo.icon}</span>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color }}>
                  {typeInfo.label}
                </span>
              </div>
              {slide.title && (
                <h2 
                  className={cn(
                    "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4",
                    "transition-all duration-700 delay-200",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  {slide.title}
                </h2>
              )}
              {slide.content && (
                <p className={cn(
                  "font-body text-lg text-zinc-400 max-w-2xl mx-auto",
                  "transition-all duration-700 delay-300",
                  isActive ? "opacity-100" : "opacity-0"
                )}>
                  {slide.content}
                </p>
              )}
            </div>
            {/* Steps */}
            <div className="space-y-4">
              {slide.steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-6 p-6 rounded-2xl transition-all duration-700",
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-40px]"
                  )}
                  style={{
                    transitionDelay: `${400 + index * 150}ms`,
                    background: 'linear-gradient(145deg, rgba(39, 39, 42, 0.5), rgba(24, 24, 27, 0.7))',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display text-xl font-bold"
                    style={{ 
                      background: `linear-gradient(135deg, ${color}, ${color}80)`,
                      color: '#000',
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : slide.type === 'architecture' && slide.layers ? (
          /* Architecture layers layout */
          <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6",
                  "transition-all duration-700 delay-100",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                  border: `1px solid ${color}40`,
                }}
              >
                <span className="text-lg">{typeInfo.icon}</span>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color }}>
                  {typeInfo.label}
                </span>
              </div>
              {slide.title && (
                <h2 
                  className={cn(
                    "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4",
                    "transition-all duration-700 delay-200",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  {slide.title}
                </h2>
              )}
              {slide.content && (
                <p className={cn(
                  "font-body text-lg text-zinc-400 max-w-2xl mx-auto",
                  "transition-all duration-700 delay-300",
                  isActive ? "opacity-100" : "opacity-0"
                )}>
                  {slide.content}
                </p>
              )}
            </div>
            {/* Architecture layers - stacked cards */}
            <div className="space-y-4">
              {slide.layers.map((layer, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative p-6 rounded-2xl transition-all duration-700 overflow-hidden",
                    isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
                  )}
                  style={{
                    transitionDelay: `${400 + index * 200}ms`,
                    background: `linear-gradient(135deg, ${layer.color}15, ${layer.color}05)`,
                    border: `2px solid ${layer.color}40`,
                    boxShadow: `0 10px 40px ${layer.color}15`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: `linear-gradient(135deg, ${layer.color}40, ${layer.color}20)` }}
                    >
                      {layer.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-white mb-1">{layer.name}</h3>
                      <p className="text-zinc-400">{layer.description}</p>
                    </div>
                  </div>
                  {/* Connecting line to next layer */}
                  {slide.layers && index < slide.layers.length - 1 && (
                    <div 
                      className="absolute -bottom-4 left-1/2 w-0.5 h-8 -translate-x-1/2"
                      style={{ background: `linear-gradient(to bottom, ${layer.color}40, transparent)` }}
                    />
                  )}
                </div>
              ))}
            </div>
            {slide.highlight && (
              <div 
                className={cn(
                  "mt-10 text-center px-8 py-5 rounded-2xl",
                  "transition-all duration-700 delay-700",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  backgroundColor: color + '10',
                  border: `1px solid ${color}30`,
                }}
              >
                <p className="font-body text-lg text-white">💡 {slide.highlight}</p>
              </div>
            )}
          </div>
        ) : slide.image ? (
          /* Two-column layout for slides with images */
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Image side */}
            <div 
              className={cn(
                "flex-shrink-0 w-full lg:w-1/2",
                "transition-all duration-700 delay-100",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ 
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px ${color}20`,
                }}
              >
                <Image 
                  src={slide.image} 
                  alt={slide.title || 'Story image'}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority={slide.id === 1}
                />
              </div>
            </div>

            {/* Content side */}
            <div className="flex-1 text-left lg:text-left">
              {/* Type badge */}
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6",
                  "transition-all duration-700 delay-200",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  backgroundColor: color + '15',
                  border: `1px solid ${color}30`,
                }}
              >
                <span>{typeInfo.icon}</span>
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color }}>
                  {typeInfo.label}
                </span>
              </div>

              {/* Title */}
              {slide.title && (
                <h2 
                  className={cn(
                    "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight",
                    "transition-all duration-700 delay-300",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  {slide.title}
                </h2>
              )}

              {/* Content */}
              <p 
                className={cn(
                  "font-body text-lg md:text-xl text-zinc-300 leading-relaxed",
                  "transition-all duration-700 delay-400",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                {slide.content}
              </p>
            </div>
          </div>
        ) : slide.code ? (
          /* Two-column layout for slides with code blocks */
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">
            {/* Content side - left */}
            <div className="flex-1 text-left">
              {/* Type badge */}
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6",
                  "transition-all duration-700 delay-100",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  backgroundColor: color + '15',
                  border: `1px solid ${color}30`,
                }}
              >
                <span>{typeInfo.icon}</span>
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color }}>
                  {typeInfo.label}
                </span>
              </div>

              {/* Title */}
              {slide.title && (
                <h2 
                  className={cn(
                    "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight",
                    "transition-all duration-700 delay-200",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  {slide.title}
                </h2>
              )}

              {/* Content */}
              <p 
                className={cn(
                  "font-body text-lg md:text-xl text-zinc-300 leading-relaxed mb-6",
                  "transition-all duration-700 delay-300",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                {slide.content}
              </p>

              {/* Highlight box */}
              {slide.highlight && (
                <div 
                  className={cn(
                    "px-6 py-4 rounded-2xl",
                    "transition-all duration-700 delay-400",
                    isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
                  )}
                  style={{ 
                    backgroundColor: color + '10',
                    border: `1px solid ${color}30`,
                    boxShadow: `0 0 40px ${color}15`,
                  }}
                >
                  <p className="font-body text-lg text-white leading-relaxed">
                    <span className="mr-2">💡</span>
                    {slide.highlight}
                  </p>
                </div>
              )}
            </div>

            {/* Code block side - right */}
            <div 
              className={cn(
                "flex-shrink-0 w-full lg:w-[500px]",
                "transition-all duration-700 delay-500",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <div 
                className={cn(
                  "relative rounded-2xl overflow-hidden text-left",
                  "transition-all duration-700",
                  isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
                )}
                style={{
                  backgroundColor: '#0a0a0a',
                  border: `1px solid ${color}20`,
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${color}10`,
                }}
              >
                {/* Code header */}
                <div 
                  className="flex items-center justify-between px-5 py-4 border-b"
                  style={{ borderColor: color + '15' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Tech Stack</span>
                </div>
                {/* Code content */}
                <div className="p-6">
                  {slide.code.split('\n').map((line, index) => {
                    const [key, value] = line.split(': ')
                    return (
                      <div 
                        key={index} 
                        className={cn(
                          "flex items-start gap-4 py-2",
                          "transition-all duration-500",
                          isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                        )}
                        style={{ transitionDelay: `${600 + index * 80}ms` }}
                      >
                        <span className="font-mono text-sm text-zinc-500 min-w-[180px]">{key}</span>
                        <span className="font-mono text-sm" style={{ color }}>{value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Centered layout for slides without images or code */
          <div className="text-center max-w-3xl mx-auto">
            {/* Type badge */}
            <div 
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8",
                "transition-all duration-700 delay-100",
                isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
              )}
              style={{ 
                backgroundColor: color + '15',
                border: `1px solid ${color}30`,
              }}
            >
              <span>{typeInfo.icon}</span>
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color }}>
                {typeInfo.label}
              </span>
            </div>

            {/* Title */}
            {slide.title && (
              <h2 
                className={cn(
                  "font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight",
                  "transition-all duration-700 delay-200",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                {slide.title}
              </h2>
            )}

            {/* Content */}
            <p 
              className={cn(
                "font-body text-lg md:text-xl text-zinc-300 leading-relaxed mb-8",
                "transition-all duration-700 delay-300",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              {slide.content}
            </p>

            {/* Highlight box */}
            {slide.highlight && (
              <div 
                className={cn(
                  "inline-block px-8 py-5 rounded-2xl mb-8 text-left",
                  "transition-all duration-700 delay-400",
                  isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
                )}
                style={{ 
                  backgroundColor: color + '10',
                  border: `1px solid ${color}30`,
                  boxShadow: `0 0 40px ${color}15`,
                }}
              >
                <p className="font-body text-lg text-white leading-relaxed">
                  <span className="mr-2">💡</span>
                  {slide.highlight}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Animated background elements */}
      <div 
        className={cn(
          "absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none",
          "transition-all duration-1000",
          isActive ? "opacity-20 scale-100" : "opacity-0 scale-50"
        )}
        style={{ backgroundColor: color }}
      />
      <div 
        className={cn(
          "absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-[150px] pointer-events-none",
          "transition-all duration-1000 delay-200",
          isActive ? "opacity-15 scale-100" : "opacity-0 scale-50"
        )}
        style={{ backgroundColor: color }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(${color}40 1px, transparent 1px), linear-gradient(90deg, ${color}40 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
