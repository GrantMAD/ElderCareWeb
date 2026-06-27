'use client'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm hover:shadow-md focus:ring-brand-500',
  secondary:
    'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-200 border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700 shadow-card',
  destructive:
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm focus:ring-red-500',
  ghost:
    'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100',
  outline:
    'border border-brand-500 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 focus:ring-brand-500',
  danger_outline:
    'border border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 focus:ring-red-500',
}

const sizes = {
  xs: 'h-7 px-2.5 text-xs rounded-lg gap-1',
  sm: 'h-8 px-3 text-sm rounded-xl gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-11 px-6 text-base rounded-xl gap-2',
  xl: 'h-12 px-8 text-base rounded-2xl gap-2.5',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-surface-900',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !loading && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
