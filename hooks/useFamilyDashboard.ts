'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_DASHBOARD_DATA } from '@/lib/mock-data'
import type { FamilyDashboardData } from '@/types/app'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co'

export function useFamilyDashboard(elderId?: string) {
  const [data, setData] = useState<FamilyDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400))
      setData(MOCK_DASHBOARD_DATA)
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const targetId = elderId

      const [medsRes, checkinRes, apptRes, alertRes] = await Promise.all([
        supabase.from('medication_logs').select('action').eq('elder_id', targetId!).gte('logged_at', new Date().toISOString().split('T')[0]),
        supabase.from('wellness_checkins').select('*').eq('elder_id', targetId!).order('scheduled_time', { ascending: false }).limit(1).single(),
        supabase.from('appointments').select('*').eq('elder_id', targetId!).eq('status', 'upcoming').order('appointment_date').limit(3),
        supabase.from('emergency_alerts').select('*').eq('elder_id', targetId!).is('resolved_at', null),
      ])

      setData({
        ...MOCK_DASHBOARD_DATA,
        todayMeds: {
          taken: (medsRes.data as any[])?.filter(l => l.action === 'taken').length ?? 0,
          total: medsRes.data?.length ?? 0,
        },
        latestCheckin: checkinRes.data ?? undefined,
        upcomingAppointments: apptRes.data ?? [],
        activeAlerts: alertRes.data ?? [],
      })
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [elderId])

  useEffect(() => { fetchData() }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
