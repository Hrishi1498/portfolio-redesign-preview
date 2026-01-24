'use client'

import { cn } from '@/lib/utils'

export type Expression = 'happy' | 'waving' | 'thinking'

interface PixelKunProps {
  expression?: Expression
  size?: number
  className?: string
  waving?: boolean
}

export function PixelKun({ 
  expression = 'happy', 
  size = 120, 
  className = '',
  waving = false
}: PixelKunProps) {
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
      <ellipse cx="60" cy="85" rx="28" ry="25" fill="#6366F1" />
      
      {/* Head */}
      <circle cx="60" cy="45" r="32" fill="#FCD34D" />
      
      {/* Face */}
      <circle cx="48" cy="42" r="4" fill="#1F2937" /> {/* Left eye */}
      <circle cx="72" cy="42" r="4" fill="#1F2937" /> {/* Right eye */}
      
      {/* Smile */}
      <path 
        d="M 48,54 Q 60,65 72,54" 
        stroke="#1F2937" 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round"
      />
      
      {/* Blush */}
      <ellipse cx="40" cy="50" rx="5" ry="3" fill="#FBBF24" opacity="0.6" />
      <ellipse cx="80" cy="50" rx="5" ry="3" fill="#FBBF24" opacity="0.6" />
      
      {/* Arms */}
      <ellipse cx="30" cy="80" rx="8" ry="12" fill="#6366F1" />
      <ellipse 
        cx="90" 
        cy={waving ? 65 : 80} 
        rx="8" 
        ry="12" 
        fill="#6366F1"
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
      
      {/* Little antenna/hair */}
      <path 
        d="M 55,15 Q 50,5 55,8 Q 60,2 65,8 Q 70,5 65,15" 
        stroke="#1F2937" 
        strokeWidth="2" 
        fill="none"
      />
    </svg>
  )
}
