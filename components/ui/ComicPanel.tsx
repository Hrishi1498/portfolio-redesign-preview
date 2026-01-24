'use client'

import { cn } from '@/lib/utils'
import type { ComicPanel } from '@/lib/data'
import { useState } from 'react'

interface ComicPanelProps {
  panel: ComicPanel
  color: string
  index: number
  total: number
}

export function ComicPanel({ panel, color, index, total }: ComicPanelProps) {
  const [isHovered, setIsHovered] = useState(false)

  const typeStyles = {
    intro: 'border-l-4 border-l-emerald-500',
    problem: 'border-l-4 border-l-rose-500',
    solution: 'border-l-4 border-l-violet-500',
    insight: 'border-l-4 border-l-amber-500',
    conclusion: 'border-l-4 border-l-cyan-500',
  }

  const typeLabels = {
    intro: 'Introduction',
    problem: 'The Problem',
    solution: 'Solution',
    insight: 'Key Insight',
    conclusion: 'Conclusion',
  }

  const typeColors = {
    intro: 'text-emerald-400 bg-emerald-500/10',
    problem: 'text-rose-400 bg-rose-500/10',
    solution: 'text-violet-400 bg-violet-500/10',
    insight: 'text-amber-400 bg-amber-500/10',
    conclusion: 'text-cyan-400 bg-cyan-500/10',
  }

  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl",
        "bg-dark-800 border border-white/[0.08]",
        "transition-all duration-500",
        typeStyles[panel.type],
        isHovered && "bg-dark-700 border-white/[0.12] shadow-2xl shadow-black/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Panel number */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-dark-900 border border-white/[0.1] flex items-center justify-center">
        <span className="font-display font-bold text-white text-sm">
          {index + 1}
        </span>
      </div>

      {/* Type badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
          typeColors[panel.type]
        )}>
          {typeLabels[panel.type]}
        </span>
        <span className="text-zinc-600 text-sm font-medium">
          {index + 1} of {total}
        </span>
      </div>

      {/* Emoji & Title */}
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl" role="img" aria-label={panel.title}>
          {panel.emoji}
        </span>
        <h3 className="font-display text-2xl font-bold text-white pt-1">
          {panel.title}
        </h3>
      </div>

      {/* Content */}
      <p className="font-body text-lg text-zinc-300 leading-relaxed mb-6">
        {panel.content}
      </p>

      {/* Highlight box */}
      {panel.highlight && (
        <div 
          className="p-4 rounded-xl mb-6"
          style={{ 
            backgroundColor: color + '10',
            borderLeft: `3px solid ${color}`,
          }}
        >
          <p className="font-heading font-semibold text-white">
            💡 {panel.highlight}
          </p>
        </div>
      )}

      {/* Code block */}
      {panel.code && (
        <div className="relative rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/[0.06]">
          {/* Code header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          {/* Code content */}
          <pre className="p-4 overflow-x-auto">
            <code className="font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre">
              {panel.code}
            </code>
          </pre>
        </div>
      )}

      {/* Decorative gradient */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${color}, transparent)`,
        }}
      />
    </div>
  )
}
