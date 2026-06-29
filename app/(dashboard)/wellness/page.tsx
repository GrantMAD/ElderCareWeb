'use client'
import { WellnessSummaryCard } from '@/components/wellness/WellnessSummaryCard'
import { WellnessTrendChart } from '@/components/wellness/WellnessTrendChart'
import { CheckinHistoryTable } from '@/components/wellness/CheckinHistoryTable'
import { useCheckins } from '@/hooks/useCheckins'

export default function WellnessPage() {
  const { recentCheckins, loading } = useCheckins()

  const latestCheckin = recentCheckins?.[0]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Wellness</h2>
        <p className="mt-1 text-sm text-surface-500">
          Track mood, pain, and energy levels over time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WellnessSummaryCard latestCheckin={latestCheckin} />
        </div>
        <div className="lg:col-span-2">
          <WellnessTrendChart checkins={recentCheckins || []} loading={loading} />
        </div>
      </div>

      <div>
        <CheckinHistoryTable checkins={recentCheckins || []} loading={loading} />
      </div>
    </div>
  )
}
