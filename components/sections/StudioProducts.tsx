'use client'

import type { CSSProperties } from 'react'
import { RezonnaProductSpotlight } from '@/components/sections/RezonnaProductSpotlight'
import { RyftProductSpotlight } from '@/components/sections/RyftProductSpotlight'

interface StudioProductsProps {
  className?: string
  style?: CSSProperties
  embedded?: boolean
}

/** BitBLabs products shown after the portfolio work stack. */
export function StudioProducts({ className, style, embedded = false }: StudioProductsProps) {
  return (
    <div id="products" className={className} style={style}>
      <RezonnaProductSpotlight embedded={embedded} />
      <RyftProductSpotlight embedded={embedded} stackContinuation />
    </div>
  )
}
