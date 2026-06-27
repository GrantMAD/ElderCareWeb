import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export function Card({
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-200',
        variant === 'default' &&
          'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card',
        variant === 'flat' &&
          'bg-surface-50 dark:bg-surface-900 border border-surface-100 dark:border-surface-800',
        variant === 'glass' && 'glass',
        padding === 'none' && '',
        padding === 'sm' && 'p-4',
        padding === 'md' && 'p-5',
        padding === 'lg' && 'p-6',
        hover && 'hover:shadow-card-md hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-semibold text-surface-900 dark:text-surface-100 text-base', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-surface-500 dark:text-surface-400 mt-0.5', className)} {...props}>
      {children}
    </p>
  )
}
