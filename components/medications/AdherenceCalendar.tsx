'use client'
import { Card } from '@/components/ui/Card'
import { format, subDays, isSameDay } from 'date-fns'
import { useMedicationLogs } from '@/hooks/useMedicationLogs'
import { Check, X, Clock } from 'lucide-react'

export function AdherenceCalendar() {
  const { logs, loading } = useMedicationLogs()

  // Generate last 7 days
  const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(new Date(), 6 - i))

  const getDayStatus = (date: Date) => {
    if (!logs) return 'pending'
    const dayLogs = logs.filter(log => isSameDay(new Date(log.logged_at), date))
    if (dayLogs.length === 0) return 'pending'
    
    const allTaken = dayLogs.every(log => log.action === 'taken')
    const anyMissed = dayLogs.some(log => log.action === 'missed' || log.action === 'skipped')
    
    if (anyMissed) return 'missed'
    if (allTaken) return 'taken'
    return 'pending'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken': return <Check className="w-4 h-4 text-white" />
      case 'missed': return <X className="w-4 h-4 text-white" />
      default: return <Clock className="w-4 h-4 text-surface-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken': return 'bg-brand-500 border-brand-500'
      case 'missed': return 'bg-red-500 border-red-500'
      default: return 'bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700'
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">7-Day Adherence</h3>
      
      {loading ? (
        <div className="flex justify-between animate-pulse">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-6 h-4 bg-surface-200 dark:bg-surface-800 rounded" />
              <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-between">
          {last7Days.map(date => {
            const status = getDayStatus(date)
            return (
              <div key={date.toISOString()} className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-surface-500">
                  {format(date, 'EEEEE')}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getStatusColor(status)}`}>
                  {getStatusIcon(status)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
