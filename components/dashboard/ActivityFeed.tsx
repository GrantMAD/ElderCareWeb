'use client'
import { Card } from '@/components/ui/Card'
import { useActivityFeed } from '@/hooks/useActivityFeed'
import { Pill, HeartPulse, MapPin, CheckCircle, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export function ActivityFeed() {
  const { activities, loading } = useActivityFeed()

  const getIcon = (type: string) => {
    switch (type) {
      case 'medication': return <Pill className="w-4 h-4 text-brand-500" />
      case 'checkin': return <HeartPulse className="w-4 h-4 text-emerald-500" />
      case 'location': return <MapPin className="w-4 h-4 text-blue-500" />
      default: return <CheckCircle className="w-4 h-4 text-surface-500" />
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Activity Feed</h3>
        <span className="text-xs text-surface-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Live
        </span>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-800" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-surface-200 dark:bg-surface-800 rounded w-3/4" />
                <div className="h-3 bg-surface-200 dark:bg-surface-800 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : activities?.length === 0 ? (
        <p className="text-sm text-surface-500 text-center py-4">No recent activity.</p>
      ) : (
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-surface-200 dark:before:bg-surface-800">
          {activities?.map((activity, index) => (
            <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white dark:border-surface-950 bg-surface-50 dark:bg-surface-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 z-10">
                {getIcon(activity.type)}
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-12 md:ml-0 p-3 rounded-lg border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-sm text-surface-900 dark:text-surface-100">{activity.message}</div>
                  <time className="text-xs text-surface-400">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
