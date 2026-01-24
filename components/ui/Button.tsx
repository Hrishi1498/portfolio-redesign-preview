'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'google' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-heading font-semibold
      rounded-xl
      cursor-pointer
      transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed
    `

    const variants = {
      primary: `
        bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 text-zinc-900
        hover:from-lime-300 hover:via-emerald-300 hover:to-cyan-300
        shadow-[0_0_20px_rgba(163,230,53,0.4)]
        hover:shadow-[0_0_30px_rgba(163,230,53,0.6)]
        active:scale-[0.98]
      `,
      secondary: `
        bg-transparent text-white
        border-2 border-zinc-700
        hover:border-lime-400 hover:text-lime-400
        hover:shadow-[0_0_20px_rgba(163,230,53,0.2)]
        active:scale-[0.98]
      `,
      google: `
        bg-white text-zinc-800
        hover:bg-zinc-100
        shadow-lg hover:shadow-xl
        active:scale-[0.98]
      `,
      ghost: `
        bg-transparent text-zinc-400
        hover:text-white hover:bg-white/5
        active:scale-[0.98]
      `,
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
