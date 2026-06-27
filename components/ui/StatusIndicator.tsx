import { cn } from '@/lib/utils'

type StatusColor = 'green' | 'amber' | 'red' | 'blue' | 'gray'

const colorMap: Record<StatusColor, string> = {
  green: 'bg-green-500',
  amber: 'bg-amber-400',
  red:   'bg-red-500',
  blue:  'bg-blue-500',
  gray:  'bg-surface-400',
}

interface StatusIndicatorProps {
  color: StatusColor
  pulse?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

export function StatusIndicator({
  color,
  pulse = false,
  size = 'md',
  label,
  className,
}: StatusIndicatorProps) {
  const sizeClass = { sm: 'w-2 h-2', md: 'w-2.5 h-2.5', lg: 'w-3 h-3' }[size]
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex">
        {pulse && (
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-50',
              colorMap[color]
            )}
          />
        )}
        <span className={cn('relative inline-flex rounded-full', sizeClass, colorMap[color])} />
      </span>
      {label && <span className="text-sm text-surface-600 dark:text-surface-400">{label}</span>}
    </span>
  )
}

// Convenience presets
export function OnlineStatus() {
  return <StatusIndicator color="green" pulse label="Online" />
}
export function OfflineStatus() {
  return <StatusIndicator color="gray" label="Offline" />
}
