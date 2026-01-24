import { cn } from '@/lib/utils'
import type { Category } from '@/lib/data'

interface BadgeProps {
  category: Category
  className?: string
}

const categoryStyles: Record<Category, string> = {
  tutorial: 'bg-blue-100 text-blue-700',
  'deep-dive': 'bg-purple-100 text-purple-700',
  news: 'bg-orange-100 text-orange-700',
  guide: 'bg-green-100 text-green-700',
}

const categoryLabels: Record<Category, string> = {
  tutorial: 'Tutorial',
  'deep-dive': 'Deep Dive',
  news: 'News',
  guide: 'Guide',
}

export function Badge({ category, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1',
        'text-xs font-medium',
        'rounded-full',
        categoryStyles[category],
        className
      )}
    >
      {categoryLabels[category]}
    </span>
  )
}
