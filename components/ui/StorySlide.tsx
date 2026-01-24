'use client'

import { cn } from '@/lib/utils'

export interface StorySlideData {
  id: number
  type: 'intro' | 'scene' | 'insight' | 'problem' | 'solution' | 'conclusion'
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
}

interface StorySlideProps {
  slide: StorySlideData
  color: string
  isActive: boolean
  direction: 'next' | 'prev' | null
}

// SVG Bitmoji-style character component
function Character({ 
  expression, 
  position,
  color 
}: { 
  expression: StorySlideData['character']
  position: StorySlideData['characterPosition']
  color: string
}) {
  const positionClass = {
    left: 'left-8 md:left-16',
    right: 'right-8 md:right-16',
    center: 'left-1/2 -translate-x-1/2',
  }

  // Different expressions for the character
  const expressions: Record<string, JSX.Element> = {
    happy: (
      <g>
        {/* Face */}
        <circle cx="60" cy="60" r="50" fill="#FFE4C4" stroke={color} strokeWidth="3"/>
        {/* Hair */}
        <path d="M20 45 Q60 10 100 45" fill="#4A3728" />
        <ellipse cx="25" cy="50" rx="8" ry="15" fill="#4A3728" />
        <ellipse cx="95" cy="50" rx="8" ry="15" fill="#4A3728" />
        {/* Eyes */}
        <ellipse cx="42" cy="55" rx="6" ry="8" fill="#333"/>
        <ellipse cx="78" cy="55" rx="6" ry="8" fill="#333"/>
        <circle cx="44" cy="53" r="2" fill="#fff"/>
        <circle cx="80" cy="53" r="2" fill="#fff"/>
        {/* Happy mouth */}
        <path d="M45 75 Q60 90 75 75" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Cheeks */}
        <ellipse cx="30" cy="70" rx="8" ry="5" fill="#FFB6C1" opacity="0.5"/>
        <ellipse cx="90" cy="70" rx="8" ry="5" fill="#FFB6C1" opacity="0.5"/>
      </g>
    ),
    thinking: (
      <g>
        <circle cx="60" cy="60" r="50" fill="#FFE4C4" stroke={color} strokeWidth="3"/>
        <path d="M20 45 Q60 10 100 45" fill="#4A3728" />
        <ellipse cx="25" cy="50" rx="8" ry="15" fill="#4A3728" />
        <ellipse cx="95" cy="50" rx="8" ry="15" fill="#4A3728" />
        {/* Thinking eyes - looking up */}
        <ellipse cx="42" cy="52" rx="6" ry="8" fill="#333"/>
        <ellipse cx="78" cy="52" rx="6" ry="8" fill="#333"/>
        <circle cx="42" cy="48" r="2" fill="#fff"/>
        <circle cx="78" cy="48" r="2" fill="#fff"/>
        {/* Thinking mouth - slight frown */}
        <path d="M50 78 Q60 72 70 78" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Thinking hand */}
        <ellipse cx="95" cy="85" rx="12" ry="8" fill="#FFE4C4" stroke={color} strokeWidth="2"/>
      </g>
    ),
    surprised: (
      <g>
        <circle cx="60" cy="60" r="50" fill="#FFE4C4" stroke={color} strokeWidth="3"/>
        <path d="M20 45 Q60 10 100 45" fill="#4A3728" />
        <ellipse cx="25" cy="50" rx="8" ry="15" fill="#4A3728" />
        <ellipse cx="95" cy="50" rx="8" ry="15" fill="#4A3728" />
        {/* Surprised eyes - wide */}
        <ellipse cx="42" cy="55" rx="8" ry="10" fill="#333"/>
        <ellipse cx="78" cy="55" rx="8" ry="10" fill="#333"/>
        <circle cx="44" cy="52" r="3" fill="#fff"/>
        <circle cx="80" cy="52" r="3" fill="#fff"/>
        {/* Eyebrows raised */}
        <path d="M32 40 Q42 35 52 40" stroke="#4A3728" strokeWidth="3" fill="none"/>
        <path d="M68 40 Q78 35 88 40" stroke="#4A3728" strokeWidth="3" fill="none"/>
        {/* Surprised mouth - O shape */}
        <ellipse cx="60" cy="78" rx="10" ry="12" fill="#333"/>
      </g>
    ),
    excited: (
      <g>
        <circle cx="60" cy="60" r="50" fill="#FFE4C4" stroke={color} strokeWidth="3"/>
        <path d="M20 45 Q60 10 100 45" fill="#4A3728" />
        <ellipse cx="25" cy="50" rx="8" ry="15" fill="#4A3728" />
        <ellipse cx="95" cy="50" rx="8" ry="15" fill="#4A3728" />
        {/* Excited eyes - closed happy */}
        <path d="M34 55 Q42 48 50 55" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M70 55 Q78 48 86 55" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Big smile */}
        <path d="M40 72 Q60 95 80 72" stroke="#333" strokeWidth="3" fill="#fff" strokeLinecap="round"/>
        {/* Sparkles */}
        <path d="M15 30 L20 35 L15 40 L10 35 Z" fill={color}/>
        <path d="M100 25 L105 30 L100 35 L95 30 Z" fill={color}/>
        {/* Cheeks */}
        <ellipse cx="30" cy="68" rx="10" ry="6" fill="#FFB6C1" opacity="0.6"/>
        <ellipse cx="90" cy="68" rx="10" ry="6" fill="#FFB6C1" opacity="0.6"/>
      </g>
    ),
    confused: (
      <g>
        <circle cx="60" cy="60" r="50" fill="#FFE4C4" stroke={color} strokeWidth="3"/>
        <path d="M20 45 Q60 10 100 45" fill="#4A3728" />
        <ellipse cx="25" cy="50" rx="8" ry="15" fill="#4A3728" />
        <ellipse cx="95" cy="50" rx="8" ry="15" fill="#4A3728" />
        {/* Confused eyes - one higher */}
        <ellipse cx="42" cy="52" rx="6" ry="8" fill="#333"/>
        <ellipse cx="78" cy="58" rx="6" ry="8" fill="#333"/>
        <circle cx="44" cy="50" r="2" fill="#fff"/>
        <circle cx="80" cy="56" r="2" fill="#fff"/>
        {/* Confused eyebrows */}
        <path d="M32 42 L52 38" stroke="#4A3728" strokeWidth="3" strokeLinecap="round"/>
        <path d="M68 44 L88 48" stroke="#4A3728" strokeWidth="3" strokeLinecap="round"/>
        {/* Wavy confused mouth */}
        <path d="M45 78 Q52 82 60 75 Q68 68 75 78" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Question mark */}
        <text x="95" y="25" fontSize="20" fill={color} fontWeight="bold">?</text>
      </g>
    ),
    pointing: (
      <g>
        <circle cx="60" cy="60" r="50" fill="#FFE4C4" stroke={color} strokeWidth="3"/>
        <path d="M20 45 Q60 10 100 45" fill="#4A3728" />
        <ellipse cx="25" cy="50" rx="8" ry="15" fill="#4A3728" />
        <ellipse cx="95" cy="50" rx="8" ry="15" fill="#4A3728" />
        {/* Focused eyes */}
        <ellipse cx="42" cy="55" rx="6" ry="8" fill="#333"/>
        <ellipse cx="78" cy="55" rx="6" ry="8" fill="#333"/>
        <circle cx="44" cy="53" r="2" fill="#fff"/>
        <circle cx="80" cy="53" r="2" fill="#fff"/>
        {/* Confident smile */}
        <path d="M48 75 Q60 82 72 75" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Pointing hand */}
        <ellipse cx="115" cy="60" rx="15" ry="10" fill="#FFE4C4" stroke={color} strokeWidth="2"/>
        <path d="M125 60 L140 60" stroke="#FFE4C4" strokeWidth="8" strokeLinecap="round"/>
        <path d="M140 55 L140 65" stroke={color} strokeWidth="2"/>
      </g>
    ),
  }

  return (
    <div className={cn(
      "absolute bottom-8 transition-all duration-500",
      positionClass[position || 'left']
    )}>
      <svg 
        viewBox="0 0 150 120" 
        className="w-24 h-20 md:w-32 md:h-28 drop-shadow-2xl"
        style={{ filter: `drop-shadow(0 0 20px ${color}40)` }}
      >
        {expressions[expression || 'happy']}
      </svg>
    </div>
  )
}

// Speech bubble component
function SpeechBubble({ 
  text, 
  position,
  color
}: { 
  text: string
  position: 'left' | 'right' | 'center'
  color: string
}) {
  return (
    <div className={cn(
      "absolute bottom-32 md:bottom-36 max-w-xs md:max-w-sm px-6 py-4 rounded-2xl",
      "bg-white text-gray-800 font-body text-sm md:text-base leading-relaxed",
      "shadow-2xl",
      position === 'left' && "left-8 md:left-16",
      position === 'right' && "right-8 md:right-16",
      position === 'center' && "left-1/2 -translate-x-1/2"
    )}
    style={{ 
      borderBottom: `4px solid ${color}`,
    }}
    >
      {text}
      {/* Speech bubble tail */}
      <div 
        className={cn(
          "absolute -bottom-3 w-0 h-0",
          "border-l-[12px] border-l-transparent",
          "border-r-[12px] border-r-transparent",
          "border-t-[12px] border-t-white",
          position === 'left' && "left-8",
          position === 'right' && "right-8",
          position === 'center' && "left-1/2 -translate-x-1/2"
        )}
      />
    </div>
  )
}

export function StorySlide({ slide, color, isActive, direction }: StorySlideProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24",
        "transition-all duration-500 ease-out",
        "bg-dark-900",
        isActive 
          ? "opacity-100 translate-x-0" 
          : direction === 'next' 
            ? "opacity-0 translate-x-full" 
            : "opacity-0 -translate-x-full"
      )}
    >
      {/* Content container */}
      <div className="max-w-3xl w-full text-center relative z-10">
        {/* Emoji */}
        {slide.emoji && (
          <span className="text-6xl md:text-8xl mb-6 block animate-bounce">
            {slide.emoji}
          </span>
        )}

        {/* Title */}
        {slide.title && (
          <h2 
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ textShadow: `0 0 40px ${color}40` }}
          >
            {slide.title}
          </h2>
        )}

        {/* Main content */}
        <p className="font-body text-lg md:text-2xl text-zinc-200 leading-relaxed mb-8 max-w-2xl mx-auto">
          {slide.content}
        </p>

        {/* Highlight box */}
        {slide.highlight && (
          <div 
            className="inline-block px-6 py-4 rounded-2xl mb-8"
            style={{ 
              backgroundColor: color + '20',
              border: `2px solid ${color}40`,
              boxShadow: `0 0 30px ${color}20`,
            }}
          >
            <p className="font-heading font-bold text-white text-lg md:text-xl">
              💡 {slide.highlight}
            </p>
          </div>
        )}

        {/* Code block */}
        {slide.code && (
          <div className="relative rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/[0.1] text-left max-w-xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <pre className="p-5 overflow-x-auto">
              <code className="font-mono text-sm md:text-base text-zinc-300 leading-relaxed whitespace-pre">
                {slide.code}
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Character with speech bubble */}
      {slide.character && (
        <>
          {slide.dialogue && (
            <SpeechBubble 
              text={slide.dialogue} 
              position={slide.characterPosition || 'left'} 
              color={color}
            />
          )}
          <Character 
            expression={slide.character} 
            position={slide.characterPosition || 'left'}
            color={color}
          />
        </>
      )}

      {/* Background decorations - more visible */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute bottom-40 right-10 w-64 h-64 rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}
