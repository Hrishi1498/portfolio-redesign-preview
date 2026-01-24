'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui'
import { articles, categories } from '@/lib/data'
import { useState } from 'react'
import type { Category } from '@/lib/data'
import Image from 'next/image'

export function FeaturedArticles() {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all')

  const filteredArticles = activeFilter === 'all'
    ? articles
    : articles.filter((article) => article.category === activeFilter)

  return (
    <section id="articles" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Case Studies
          </h2>
          <p className="text-medium max-w-lg mx-auto">
            Explore our collection of visual AI tutorials and deep dives.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                'px-4 py-2',
                'text-sm font-medium',
                'rounded-full',
                'transition-all duration-200',
                activeFilter === category.id
                  ? 'bg-accent-purple text-white'
                  : 'bg-white text-medium border border-gray-200 hover:border-gray-300'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <article
              key={article.id}
              className={cn(
                'group bg-white rounded-2xl overflow-hidden',
                'border border-gray-100',
                'shadow-card hover:shadow-card-hover',
                'transition-all duration-300',
                'cursor-pointer',
                'hover:-translate-y-1'
              )}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-light">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge
                  category={article.category}
                  className="absolute top-3 left-3"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-dark text-lg mb-2 group-hover:text-accent-purple transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-medium line-clamp-2 mb-3">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-accent-purple font-medium hover:underline"
          >
            View all case studies
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
