'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { FamilyDashboardData } from '@/types/app'
import { useSession } from '@/hooks/useSession'

export function useFamilyDashboard(elderId?: string) {
  const [data, setData] = useState<FamilyDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { elderId: sessionElderId } = useSession()
  const targetId = elderId || sessionElderId

  const fetchData = useCallback(async () => {
    try {
      if (!targetId) return
      const supabase = createClient()

      const [medsRes, checkinRes, apptRes, alertRes, elderRes] = await Promise.all([
        supabase.from('medication_logs').select('action').eq('elder_id', targetId).gte('logged_at', new Date().toISOString().split('T')[0]),
        supabase.from('wellness_checkins').select('*').eq('elder_id', targetId).order('scheduled_time', { ascending: false }).limit(1).single(),
        supabase.from('appointments').select('*').eq('elder_id', targetId).eq('status', 'upcoming').order('appointment_date').limit(3),
        supabase.from('emergency_alerts').select('*').eq('elder_id', targetId).is('resolved_at', null),
        supabase.from('profiles').select('*, family_members(families(*))').eq('id', targetId).single(),
      ])

      const elderData = elderRes.data as any
      const family = elderData?.family_members?.[0]?.families

      if (!elderData || !family) return

      setData({
        elder: elderData,
        family: family,
        recentActivity: [], // handled by ActivityFeed component hook typically
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
  }, [targetId])

  useEffect(() => { fetchData() }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
