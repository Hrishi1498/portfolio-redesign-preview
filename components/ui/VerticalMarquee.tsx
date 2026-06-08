'use client'

import { cn } from '@/lib/utils'
import React, { type ReactNode, useEffect, useRef } from 'react'

interface VerticalMarqueeProps {
  children: ReactNode
  pauseOnHover?: boolean
  reverse?: boolean
  className?: string
  speed?: number
  onItemsRef?: (items: HTMLElement[]) => void
}

export function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(
        containerRef.current.querySelectorAll('.marquee-item')
      ) as HTMLElement[]
      onItemsRef(items)
    }
  }, [onItemsRef, children])

  return (
    <div
      ref={containerRef}
      className={cn('group h-full overflow-hidden', className)}
      style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          'flex w-full flex-col will-change-transform animate-marquee-vertical',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        <div className="flex shrink-0 flex-col">{children}</div>
        <div className="flex shrink-0 flex-col" aria-hidden>
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
