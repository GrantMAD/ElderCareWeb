'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_ACTIVITY } from '@/lib/mock-data'
import type { ActivityItem } from '@/types/app'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co'

type MedicationLog = {
  id: string
  action: string
  logged_at: string
  medications: { name: string; dosage: string } | null
}

type WellnessCheckin = {
  id: string
  mood_score: number
  completed_at: string | null
  scheduled_time: string | null
}

type EmergencyAlert = {
  id: string
  message: string
  created_at: string
}

export function useActivityFeed(elderId?: string) {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchActivities = useCallback(async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200))
      setActivities(MOCK_ACTIVITY)
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const since = new Date(Date.now() - 24 * 3600000).toISOString()

      const [logsRes, checkinRes, alertRes] = await Promise.all([
        supabase.from('medication_logs').select('*, medications(name,dosage)').eq('elder_id', elderId!).gte('logged_at', since),
        supabase.from('wellness_checkins').select('*').eq('elder_id', elderId!).gte('completed_at', since),
        supabase.from('emergency_alerts').select('*').eq('elder_id', elderId!).gte('created_at', since),
      ])

      const logs = (logsRes.data ?? []) as MedicationLog[]
      const checkins = (checkinRes.data ?? []) as WellnessCheckin[]
      const alerts = (alertRes.data ?? []) as EmergencyAlert[]

      const items: ActivityItem[] = [
        ...logs.map(l => ({
          id: l.id,
          type: (l.action === 'taken' ? 'medication_taken' : l.action === 'skipped' ? 'medication_missed' : 'medication_snoozed') as ActivityItem['type'],
          message: `${l.action === 'taken' ? '💊' : '⚠️'} ${l.medications?.name} ${l.medications?.dosage} — ${l.action}`,
          timestamp: l.logged_at,
        })),
        ...checkins.map(c => ({
          id: c.id,
          type: 'checkin_completed' as ActivityItem['type'],
          message: `✅ Wellness check-in completed — Mood ${c.mood_score}/5`,
          timestamp: c.completed_at ?? c.scheduled_time ?? '',
        })),
        ...alerts.map(a => ({
          id: a.id,
          type: 'sos_triggered' as ActivityItem['type'],
          message: `🆘 ${a.message}`,
          timestamp: a.created_at,
        })),
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

      setActivities(items)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [elderId])

  useEffect(() => { fetchActivities() }, [fetchActivities])

  useEffect(() => {
    if (USE_MOCK || !elderId) return
    const supabase = createClient()
    const channel = supabase
      .channel(`activity:${elderId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'medication_logs', filter: `elder_id=eq.${elderId}` }, () => fetchActivities())
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wellness_checkins', filter: `elder_id=eq.${elderId}` }, () => fetchActivities())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [elderId, fetchActivities])

  return { activities, loading, refetch: fetchActivities }
}