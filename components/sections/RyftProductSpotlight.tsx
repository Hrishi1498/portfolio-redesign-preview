'use client'

import {
  ProductSpotlight,
  type ProductSpotlightProps,
} from '@/components/sections/ProductSpotlight'

type RyftProductSpotlightProps = Pick<
  ProductSpotlightProps,
  'className' | 'style' | 'embedded' | 'stackContinuation'
>

const RYFT_GLOW =
  'radial-gradient(circle at 55% 42%, rgba(255, 122, 48, 0.45) 0%, rgba(255, 160, 80, 0.28) 42%, transparent 72%)'

export function RyftProductSpotlight(props: RyftProductSpotlightProps) {
  return (
    <ProductSpotlight
      id="product-ryft"
      name="Ryft"
      tagline="The workout tracker built by friends, for friends"
      description="Build routines, log workouts, earn XP and PRs, and stay consistent with your squad — lightweight tracking with social accountability."
      liveUrl="https://ryft.bitblabs.com/"
      imageSrc="/ryft-work-cover.png"
      imageAlt="Ryft product — social workout tracker with routines, progress, and squad accountability"
      imageAspect="1024/490"
      glowGradient={RYFT_GLOW}
      showHeadline={false}
      showWave={false}
      backgroundVideoSrc="/ryft.mp4"
      layout="mirrored"
      {...props}
    />
  )
}
