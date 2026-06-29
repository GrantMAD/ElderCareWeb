'use client'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAlerts } from '@/hooks/useAlerts'
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export function AlertsPanel() {
  const { alerts, acknowledgeAlert } = useAlerts()
  
  const activeAlerts = alerts?.filter(a => !a.resolved_at) || []

  if (activeAlerts.length === 0) {
    return null // Don't show panel if no active alerts
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      case 'warning': return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
      default: return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      default: return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 flex items-center gap-2">
        Active Alerts
        <Badge className="bg-red-500 text-white hover:bg-red-600 rounded-full px-2">{activeAlerts.length}</Badge>
      </h3>
      
      <div className="grid gap-3">
        {activeAlerts.map(alert => (
          <Card 
            key={alert.id} 
            className={`p-4 border ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex gap-4">
              <div className="shrink-0 mt-1">
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-medium text-surface-900 dark:text-surface-100">{alert.message}</p>
                  <span className="text-xs text-surface-500 whitespace-nowrap">
                    {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 bg-white/50 hover:bg-white dark:bg-surface-800/50 dark:hover:bg-surface-800"
                    onClick={() => acknowledgeAlert(alert.id, '')}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    Acknowledge
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
