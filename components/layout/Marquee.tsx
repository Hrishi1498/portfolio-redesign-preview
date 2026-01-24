'use client'

import { marqueeItems } from '@/lib/data'

export function Marquee() {
  return (
    <section className="py-4 bg-light border-y border-gray-200 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {/* First set */}
        <div className="flex items-center gap-8 pr-8">
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-lg font-medium text-medium whitespace-nowrap">
                {item}
              </span>
              <span className="text-accent-purple">•</span>
            </div>
          ))}
        </div>
        {/* Duplicate */}
        <div className="flex items-center gap-8 pr-8" aria-hidden="true">
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-lg font-medium text-medium whitespace-nowrap">
                {item}
              </span>
              <span className="text-accent-purple">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
