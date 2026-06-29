'use client'
import { AlertList } from '@/components/alerts/AlertList'
import { useAlerts } from '@/hooks/useAlerts'

export default function AlertsPage() {
  const { alerts, loading, acknowledgeAlert } = useAlerts()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Alerts & History</h2>
        <p className="mt-1 text-sm text-surface-500">
          Review past emergencies and active alerts.
        </p>
      </div>

      <AlertList 
        alerts={alerts || []} 
        loading={loading}
        onAcknowledge={(id) => acknowledgeAlert(id, '')}
      />
    </div>
  )
}
