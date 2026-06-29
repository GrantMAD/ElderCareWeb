'use client'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Pill, Clock } from 'lucide-react'
import type { Medication } from '@/types/app'

interface MedicationListProps {
  medications: Medication[]
  loading?: boolean
  onEdit?: (med: Medication) => void
}

export function MedicationList({ medications, loading, onEdit }: MedicationListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-surface-200 dark:bg-surface-800 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-5 bg-surface-200 dark:bg-surface-800 rounded w-1/3" />
                <div className="h-4 bg-surface-200 dark:bg-surface-800 rounded w-1/4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (medications.length === 0) {
    return (
      <div className="text-center py-12 px-4 border-2 border-dashed border-surface-200 dark:border-surface-800 rounded-xl bg-surface-50 dark:bg-surface-900/50">
        <Pill className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100">No Medications</h3>
        <p className="text-sm text-surface-500 mt-1">There are no medications currently tracked.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {medications.map(med => {
        const schedule = med.schedules?.[0]
        
        return (
          <Card 
            key={med.id} 
            className="p-4 hover:border-brand-300 dark:hover:border-brand-700 transition-colors cursor-pointer group"
            onClick={() => onEdit?.(med)}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-semibold text-surface-900 dark:text-surface-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {med.name}
                  </h4>
                  <p className="text-sm text-surface-500 mt-0.5">{med.dosage}</p>
                </div>
              </div>
              
              {med.is_critical && (
                <Badge className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                  Critical
                </Badge>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-800">
              <div className="flex items-center text-xs text-surface-600 dark:text-surface-400 gap-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {schedule 
                    ? `${schedule.frequency.replace('_', ' ')} at ${schedule.times_of_day.join(', ')}`
                    : 'No active schedule'
                  }
                </span>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
