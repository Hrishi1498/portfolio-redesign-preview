'use client'

import { cn } from '@/lib/utils'

export type DataExpression = 'happy' | 'excited'

interface DataChanProps {
  expression?: DataExpression
  size?: number
  className?: string
  waving?: boolean
}

export function DataChan({ 
  expression = 'happy', 
  size = 120, 
  className = '',
  waving = false
}: DataChanProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn(waving && 'animate-wave', className)}
      style={{ transformOrigin: 'center bottom' }}
    >
      {/* Simple friendly character - Growth.Design style */}
      
      {/* Body */}
      <ellipse cx="60" cy="85" rx="28" ry="25" fill="#EC4899" />
      
      {/* Head */}
      <circle cx="60" cy="45" r="32" fill="#FCD34D" />
      
      {/* Hair/bangs */}
      <path 
        d="M 30,35 Q 35,20 50,25 Q 60,15 70,25 Q 85,20 90,35" 
        fill="#7C3AED" 
      />
      
      {/* Face */}
      <circle cx="48" cy="44" r="4" fill="#1F2937" /> {/* Left eye */}
      <circle cx="72" cy="44" r="4" fill="#1F2937" /> {/* Right eye */}
      
      {/* Sparkle eyes for excited */}
      {expression === 'excited' && (
        <>
          <circle cx="50" cy="42" r="1.5" fill="white" />
          <circle cx="74" cy="42" r="1.5" fill="white" />
        </>
      )}
      
      {/* Smile */}
      <path 
        d="M 48,56 Q 60,67 72,56" 
        stroke="#1F2937" 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round"
      />
      
      {/* Blush */}
      <ellipse cx="40" cy="52" rx="5" ry="3" fill="#F472B6" opacity="0.5" />
      <ellipse cx="80" cy="52" rx="5" ry="3" fill="#F472B6" opacity="0.5" />
      
      {/* Arms */}
      <ellipse cx="30" cy="80" rx="8" ry="12" fill="#EC4899" />
      <ellipse 
        cx="90" 
        cy={waving ? 65 : 80} 
        rx="8" 
        ry="12" 
        fill="#EC4899"
        transform={waving ? "rotate(-30 90 65)" : ""}
      />
      
      {/* Hands */}
      <circle cx="30" cy="68" r="8" fill="#FCD34D" />
      <circle 
        cx={waving ? 95 : 90} 
        cy={waving ? 52 : 68} 
        r="8" 
        fill="#FCD34D" 
      />
    </svg>
  )
}
