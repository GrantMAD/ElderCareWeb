import { cn } from '@/lib/utils'
import type { AlertSeverity, AppointmentStatus, CheckinStatus, SubscriptionTier } from '@/types/app'

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | AlertSeverity
  | AppointmentStatus
  | CheckinStatus
  | SubscriptionTier

const variantStyles: Record<string, string> = {
  default: 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  danger:  'bg-red-100   text-red-700   dark:bg-red-500/20   dark:text-red-400',
  info:    'bg-blue-100  text-blue-700  dark:bg-blue-500/20  dark:text-blue-400',
  neutral: 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400',

  // Alert severities
  low:      'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  medium:   'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  high:     'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
  critical: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 animate-pulse',

  // Appointment statuses
  upcoming:  'bg-blue-100  text-blue-700  dark:bg-blue-500/20  dark:text-blue-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  cancelled: 'bg-surface-100 text-surface-500 dark:bg-surface-700 dark:text-surface-400 line-through',

  // Check-in statuses
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  missed:  'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',

  // Subscription tiers
  free:    'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400',
  basic:   'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  premium: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
}

interface BadgeProps {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'default', size = 'md', dot = false, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1',
        variantStyles[variant] ?? variantStyles.default,
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            variant === 'critical' ? 'bg-red-500' : 'bg-current'
          )}
        />
      )}
      {children}
    </span>
  )
}
