'use client'
import { OverviewCards } from '@/components/dashboard/OverviewCards'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { AlertsPanel } from '@/components/dashboard/AlertsPanel'
import { UpcomingAppointments } from '@/components/dashboard/UpcomingAppointments'
import { useFamilyDashboard } from '@/hooks/useFamilyDashboard'

export default function DashboardPage() {
  const { data } = useFamilyDashboard()
  const elder = data?.elder

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
          Hello, {elder?.full_name ? `checking in on ${elder.full_name}` : 'Welcome to Elder Care Companion'}
        </h2>
        <p className="mt-1 text-sm text-surface-500">
          Here is the latest update for today.
        </p>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Activity & Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <AlertsPanel />
          <ActivityFeed />
        </div>

        {/* Right Column: Appointments & Quick Actions */}
        <div className="space-y-6">
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  )
}
