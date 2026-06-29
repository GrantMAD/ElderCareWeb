'use client'
import { Card } from '@/components/ui/Card'
import { Heart, Activity, Battery } from 'lucide-react'
import type { WellnessCheckin } from '@/types/app'

interface WellnessSummaryCardProps {
  latestCheckin?: WellnessCheckin
}

export function WellnessSummaryCard({ latestCheckin }: WellnessSummaryCardProps) {
  if (!latestCheckin) {
    return (
      <Card className="p-6 text-center text-surface-500">
        <Heart className="w-12 h-12 text-surface-300 mx-auto mb-2" />
        <p>No recent wellness data.</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/10 dark:to-surface-900 border-brand-100 dark:border-brand-800/50">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
        <Heart className="w-5 h-5 text-brand-500" />
        Latest Check-in
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-3 bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-100 dark:border-surface-700">
          <span className="text-xs text-surface-500 mb-1">Mood</span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-surface-900 dark:text-surface-100">
              {latestCheckin.mood_score || '-'}
            </span>
            <span className="text-xs text-surface-400">/5</span>
          </div>
        </div>

        <div className="flex flex-col items-center p-3 bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-100 dark:border-surface-700">
          <span className="text-xs text-surface-500 mb-1 flex items-center gap-1">
            <Activity className="w-3 h-3" /> Pain
          </span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-surface-900 dark:text-surface-100">
              {latestCheckin.pain_score || '-'}
            </span>
            <span className="text-xs text-surface-400">/10</span>
          </div>
        </div>

        <div className="flex flex-col items-center p-3 bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-100 dark:border-surface-700">
          <span className="text-xs text-surface-500 mb-1 flex items-center gap-1">
            <Battery className="w-3 h-3" /> Energy
          </span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-surface-900 dark:text-surface-100">
              {latestCheckin.energy_score || '-'}
            </span>
            <span className="text-xs text-surface-400">/5</span>
          </div>
        </div>
      </div>
      
      {latestCheckin.notes && (
        <div className="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700">
          <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-1">Notes</span>
          <p className="text-sm text-surface-700 dark:text-surface-300 italic">
            "{latestCheckin.notes}"
          </p>
        </div>
      )}
    </Card>
  )
}
