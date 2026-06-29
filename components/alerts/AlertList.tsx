'use client'
import { useState } from 'react'
import { AlertCard } from '@/components/alerts/AlertCard'
import { Button } from '@/components/ui/Button'
import { ShieldCheck, Filter } from 'lucide-react'
import type { EmergencyAlert } from '@/types/app'

interface AlertListProps {
  alerts: EmergencyAlert[]
  loading?: boolean
  onAcknowledge: (id: string) => void
}

export function AlertList({ alerts, loading, onAcknowledge }: AlertListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all')

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-surface-100 dark:bg-surface-800 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed border-surface-200 dark:border-surface-800 rounded-2xl bg-surface-50 dark:bg-surface-900/50">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-surface-900 dark:text-surface-100">All Clear</h3>
        <p className="text-surface-500 mt-2 max-w-sm mx-auto">
          There are no alerts in the history. Everything is looking good!
        </p>
      </div>
    )
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'active') return !alert.resolved_at
    if (filter === 'resolved') return !!alert.resolved_at
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button 
          variant={filter === 'all' ? 'primary' : 'outline'} 
          size="sm"
          onClick={() => setFilter('all')}
          className="rounded-full"
        >
          All History
        </Button>
        <Button 
          variant={filter === 'active' ? 'primary' : 'outline'} 
          size="sm"
          onClick={() => setFilter('active')}
          className="rounded-full"
        >
          Active Only
        </Button>
        <Button 
          variant={filter === 'resolved' ? 'primary' : 'outline'} 
          size="sm"
          onClick={() => setFilter('resolved')}
          className="rounded-full"
        >
          Resolved
        </Button>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="text-center py-12 text-surface-500">
          No alerts found for the selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map(alert => (
            <AlertCard 
              key={alert.id} 
              alert={alert} 
              onAcknowledge={onAcknowledge} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
