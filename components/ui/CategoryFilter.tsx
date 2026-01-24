'use client'

import { cn } from '@/lib/utils'

interface Category {
  id: string
  label: string
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-full",
            "font-heading text-sm font-medium",
            "transition-all duration-200",
            activeCategory === category.id
              ? "bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              : "bg-dark-700 text-zinc-400 hover:text-white hover:bg-dark-600 border border-white/[0.06]"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
