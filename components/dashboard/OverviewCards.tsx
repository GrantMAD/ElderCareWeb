'use client'
import { Card } from '@/components/ui/Card'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { Pill, HeartPulse, Activity } from 'lucide-react'
import { useCheckins } from '@/hooks/useCheckins'
import { useMedicationLogs } from '@/hooks/useMedicationLogs'

export function OverviewCards() {
  const { recentCheckins } = useCheckins()
  const { todayLogs, expectedLogsCount } = useMedicationLogs()

  const lastCheckin = recentCheckins?.[0]
  const medsTaken = todayLogs?.filter(l => l.status === 'taken').length || 0
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4 flex items-center gap-4 border-l-4 border-l-brand-500">
        <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400">
          <Pill className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-surface-500">Medications Today</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">{medsTaken} / {expectedLogsCount || 0}</span>
            <StatusIndicator status={medsTaken === expectedLogsCount ? 'active' : 'warning'} />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center gap-4 border-l-4 border-l-emerald-500">
        <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <HeartPulse className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-surface-500">Last Check-in</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{lastCheckin ? new Date(lastCheckin.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'No data'}</span>
            <StatusIndicator status={lastCheckin ? 'active' : 'inactive'} />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center gap-4 border-l-4 border-l-amber-500">
        <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-surface-500">Recent Mood</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold capitalize">{lastCheckin?.mood || 'Unknown'}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
