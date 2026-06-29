'use client'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import type { EmergencyAlert } from '@/types/app'

interface AlertCardProps {
  alert: EmergencyAlert
  onAcknowledge: (id: string) => void
}

export function AlertCard({ alert, onAcknowledge }: AlertCardProps) {
  const isResolved = !!alert.resolved_at
  
  const getSeverityColor = (severity: string) => {
    if (isResolved) return 'bg-surface-50 dark:bg-surface-900 border-surface-200 dark:border-surface-800 opacity-75'
    switch (severity) {
      case 'critical': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      case 'warning': return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
      default: return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    }
  }

  const getSeverityIcon = (severity: string) => {
    if (isResolved) return <CheckCircle2 className="w-6 h-6 text-emerald-500" />
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
      case 'warning': return <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
      default: return <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    if (isResolved) return <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200">Resolved</Badge>
    switch (severity) {
      case 'critical': return <Badge className="bg-red-500 text-white">Critical</Badge>
      case 'warning': return <Badge className="bg-amber-500 text-white">Warning</Badge>
      default: return <Badge className="bg-blue-100 text-blue-800">Notice</Badge>
    }
  }

  return (
    <Card className={`p-4 sm:p-6 border ${getSeverityColor(alert.severity)} transition-all`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="shrink-0 flex items-start sm:items-center">
          <div className="w-12 h-12 rounded-full bg-white dark:bg-surface-950 flex items-center justify-center shadow-sm border border-surface-100 dark:border-surface-800">
            {getSeverityIcon(alert.severity)}
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-lg text-surface-900 dark:text-surface-100 mb-1">
                {alert.message || 'Emergency Alert'}
              </h4>
              <div className="flex items-center gap-2 text-sm text-surface-500">
                <span className="capitalize">{alert.trigger_type.replace('_', ' ')}</span>
                <span>•</span>
                <span>{format(new Date(alert.created_at), 'MMM d, yyyy h:mm a')}</span>
                <span>({formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })})</span>
              </div>
            </div>
            {getSeverityBadge(alert.severity)}
          </div>
          
          {alert.location_lat && alert.location_lng && (
            <div className="text-sm text-surface-600 dark:text-surface-400 mt-2 p-3 bg-white/50 dark:bg-surface-950/50 rounded-lg border border-surface-200 dark:border-surface-800">
              📍 Location detected: {alert.location_lat.toFixed(4)}, {alert.location_lng.toFixed(4)}
            </div>
          )}
          
          {!isResolved && (
            <div className="flex gap-3 pt-3">
              <Button onClick={() => onAcknowledge(alert.id)}>
                Acknowledge & Resolve
              </Button>
            </div>
          )}
          
          {isResolved && alert.acknowledged_by && (
            <p className="text-sm text-surface-500 italic pt-2">
              Acknowledged by {alert.acknowledger?.full_name || alert.acknowledged_by} 
              {alert.acknowledged_at && ` at ${format(new Date(alert.acknowledged_at), 'h:mm a')}`}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
