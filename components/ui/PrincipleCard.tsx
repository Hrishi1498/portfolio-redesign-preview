'use client'

import { cn } from '@/lib/utils'
import type { Principle } from '@/lib/psychology-data'
import { useState } from 'react'

interface PrincipleCardProps {
  principle: Principle
}

export function PrincipleCard({ principle }: PrincipleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (principle.comingSoon) {
    return (
      <div className="group p-5 rounded-2xl bg-dark-800/50 border border-white/[0.04] opacity-60">
        <div className="flex items-start gap-4">
          <span className="text-2xl">{principle.emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-white/60 text-base mb-1">
              {principle.title}
            </h3>
            <p className="font-body text-sm text-zinc-500 leading-relaxed">
              {principle.description}
            </p>
          </div>
          <span className="text-xs font-medium text-zinc-600 whitespace-nowrap">
            Coming Soon
          </span>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "group w-full text-left p-5 rounded-2xl",
        "bg-dark-800 border border-white/[0.06]",
        "hover:bg-dark-700 hover:border-white/[0.1]",
        "transition-all duration-300",
        isExpanded && "bg-dark-700 border-white/[0.1]"
      )}
    >
      <div className="flex items-start gap-4">
        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
          {principle.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-white text-base mb-1 group-hover:text-violet-400 transition-colors">
            {principle.title}
          </h3>
          <p className="font-body text-sm text-zinc-400 leading-relaxed">
            {principle.description}
          </p>
          
          {/* Expanded content */}
          <div className={cn(
            "overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-48 mt-4 opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="pt-4 border-t border-white/[0.06]">
              <p className="font-body text-sm text-zinc-300 leading-relaxed">
                {principle.content}
              </p>
            </div>
          </div>
        </div>
        <span className={cn(
          "text-sm font-medium text-violet-400 whitespace-nowrap",
          "transition-transform duration-300",
          isExpanded && "rotate-180"
        )}>
          {isExpanded ? '↑' : '↓'} {isExpanded ? 'Collapse' : 'Expand'}
        </span>
      </div>
    </button>
  )
}
