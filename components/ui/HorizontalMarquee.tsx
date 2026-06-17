'use client'

import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HorizontalMarqueeProps {
  children: ReactNode
  className?: string
  trackClassName?: string
  speed?: number
  pauseOnHover?: boolean
}

export function HorizontalMarquee({
  children,
  className,
  trackClassName,
  speed = 40,
  pauseOnHover = true,
}: HorizontalMarqueeProps) {
  return (
    <div
      className={cn('group overflow-hidden', className)}
      style={
        {
          '--slider-duration': `${speed}s`,
          '--slider-gap': '1.25rem',
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'animate-x-slider flex w-max gap-5 will-change-transform',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          'motion-reduce:animate-none',
          trackClassName
        )}
      >
        <div className="flex shrink-0 items-stretch gap-5">{children}</div>
        <div className="flex shrink-0 items-stretch gap-5" aria-hidden>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { key: `marquee-dup-${index}` })
            }
            return child
          })}
        </div>
      </div>
    </div>
  )
}
