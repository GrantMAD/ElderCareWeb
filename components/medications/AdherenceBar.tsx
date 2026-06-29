'use client'

interface AdherenceBarProps {
  taken: number
  total: number
}

export function AdherenceBar({ taken, total }: AdherenceBarProps) {
  const percentage = total > 0 ? Math.round((taken / total) * 100) : 0
  
  let color = 'bg-brand-500'
  if (percentage < 50) color = 'bg-red-500'
  else if (percentage < 80) color = 'bg-amber-500'

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-surface-600 dark:text-surface-400 font-medium">Daily Adherence</span>
        <span className="font-semibold text-surface-900 dark:text-surface-100">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
