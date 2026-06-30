'use client'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { MobileNav } from '@/components/layout/MobileNav'
import { useSession } from '@/hooks/useSession'
import { useAlerts } from '@/hooks/useAlerts'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AlertModal } from '@/components/alerts/AlertModal'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, familyName, elderName } = useSession()
  const { alerts } = useAlerts()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) return null

  const activeAlerts = alerts?.filter(a => !a.resolved_at) || []
  const activeAlertCount = activeAlerts.length

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar familyName={familyName ?? undefined} elderName={elderName ?? undefined} userEmail={user.email} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <TopBar 
          title="Family Dashboard" 
          userEmail={user.email} 
          activeAlertCount={activeAlertCount}
          onAlertsClick={() => router.push('/dashboard/alerts')}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Global Alerts Modal for Critical Alerts */}
      <AlertModal alerts={activeAlerts.filter(a => a.severity === 'critical')} />
    </div>
  )
}
