'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3',
            'bg-white border-2 border-gray-200 rounded-xl',
            'text-dark placeholder:text-muted',
            'text-base',
            'transition-all duration-200',
            'focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20',
            'hover:border-gray-300',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
