'use client'
import { Card } from '@/components/ui/Card'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { Pill, HeartPulse, Activity } from 'lucide-react'
import { useCheckins } from '@/hooks/useCheckins'
import { useMedicationLogs } from '@/hooks/useMedicationLogs'

export function OverviewCards() {
  const { checkins } = useCheckins()
  const { logs, expectedLogsCount } = useMedicationLogs()

  const lastCheckin = checkins?.[0]
  const medsTaken = logs?.filter(l => l.action === 'taken' && new Date(l.logged_at).toDateString() === new Date().toDateString()).length || 0
  const medsExpected = expectedLogsCount || 0

  const moodLabel = lastCheckin?.mood_score
    ? lastCheckin.mood_score >= 4 ? 'Good' : lastCheckin.mood_score >= 3 ? 'Fair' : 'Low'
    : 'Unknown'

  const lastCheckinTime = lastCheckin?.completed_at
    ? new Date(lastCheckin.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'No data'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4 flex items-center gap-4 border-l-4 border-l-brand-500">
        <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400">
          <Pill className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-surface-500">Medications Today</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">{medsTaken} / {medsExpected}</span>
            <StatusIndicator color={medsExpected > 0 && medsTaken === medsExpected ? 'green' : 'amber'} />
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
            <span className="text-xl font-semibold">{lastCheckinTime}</span>
            <StatusIndicator color={lastCheckin ? 'green' : 'gray'} />
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
            <span className="text-xl font-semibold capitalize">{moodLabel}</span>
            {lastCheckin?.mood_score && (
              <span className="text-sm text-surface-400">({lastCheckin.mood_score}/5)</span>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
