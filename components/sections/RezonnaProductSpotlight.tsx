'use client'

import {
  ProductSpotlight,
  type ProductSpotlightProps,
} from '@/components/sections/ProductSpotlight'

type RezonnaProductSpotlightProps = Pick<
  ProductSpotlightProps,
  'className' | 'style' | 'embedded' | 'stackContinuation'
>

export function RezonnaProductSpotlight(props: RezonnaProductSpotlightProps) {
  return (
    <ProductSpotlight
      id="product-rezonna"
      name="Rezonna"
      tagline="24/7 AI sales caller for real estate leads"
      description="Rezonna calls back new leads in under 15 seconds, qualifies budget and intent in 14 languages, books site visits, and updates your CRM around the clock."
      liveUrl="https://www.rezonna.com/"
      imageSrc="/rezonna-work-cover.png"
      imageAlt="Rezonna product — AI voice sales platform for real estate lead qualification"
      {...props}
    />
  )
}
