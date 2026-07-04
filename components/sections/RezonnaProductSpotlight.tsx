'use client'

import {
  ProductSpotlight,
  type ProductSpotlightProps,
} from '@/components/sections/ProductSpotlight'

type RezonnaProductSpotlightProps = Pick<
  ProductSpotlightProps,
  'className' | 'style' | 'embedded' | 'stackContinuation'
>

const REZONNA_IMAGES = [
  {
    src: '/rezonna-slide-hero.png',
    alt: 'Rezonna hero — 24/7 AI sales caller for real estate leads with live call interface',
  },
  {
    src: '/rezonna-slide-problem.png',
    alt: 'Rezonna problem framing — late responses, wasted sales time, missed follow-up, and lower conversion',
  },
  {
    src: '/rezonna-slide-comparison.png',
    alt: 'Rezonna vs traditional IVR comparison — qualifies, answers, and books instead of routing menus',
  },
] as const

export function RezonnaProductSpotlight(props: RezonnaProductSpotlightProps) {
  return (
    <ProductSpotlight
      id="product-rezonna"
      name="Rezonna"
      tagline="24/7 AI sales caller for real estate leads"
      description="Rezonna calls back new leads in under 15 seconds, qualifies budget and intent in 14 languages, books site visits, and updates your CRM around the clock."
      liveUrl="https://www.rezonna.com/"
      imageSrc={REZONNA_IMAGES[0].src}
      imageAlt={REZONNA_IMAGES[0].alt}
      images={[...REZONNA_IMAGES]}
      {...props}
    />
  )
}
