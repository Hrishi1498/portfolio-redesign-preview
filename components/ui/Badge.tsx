import { cn } from '@/lib/utils'
import type { Category } from '@/lib/data'

interface BadgeProps {
  category: Exclude<Category, 'all'>
  className?: string
}

const categoryStyles: Record<Exclude<Category, 'all'>, string> = {
  llm: 'bg-emerald-100 text-emerald-700',
  agents: 'bg-violet-100 text-violet-700',
  prompts: 'bg-amber-100 text-amber-700',
  rag: 'bg-pink-100 text-pink-700',
  ux: 'bg-blue-100 text-blue-700',
  recruitment: 'bg-blue-100 text-blue-700',
}

const categoryLabels: Record<Exclude<Category, 'all'>, string> = {
  llm: 'LLMs',
  agents: 'AI Agents',
  prompts: 'Prompting',
  rag: 'RAG',
  ux: 'AI UX',
  recruitment: 'Recruitment',
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
