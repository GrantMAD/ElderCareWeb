'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_ALERTS } from '@/lib/mock-data'
import type { EmergencyAlert } from '@/types/app'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co'

type AlertUpdate = {
  acknowledged_by?: string
  acknowledged_at?: string
  resolved_at?: string
}

export function useAlerts(familyId?: string) {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAlerts = useCallback(async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200))
      setAlerts(MOCK_ALERTS)
      setLoading(false)
      return
    }
    try {
      if (!familyId) {
        setAlerts([])
        return
      }
      const supabase = createClient()
      const { data, error: err } = await supabase
        .from('emergency_alerts')
        .select('*')
        .eq('family_id', familyId)
        .order('created_at', { ascending: false })
      if (err) throw err
      setAlerts((data ?? []) as EmergencyAlert[])
    } catch (err) {
      setError('Failed to load alerts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [familyId])

  useEffect(() => { fetchAlerts() }, [fetchAlerts])

  const acknowledgeAlert = async (alertId: string, userId: string) => {
    const now = new Date().toISOString()
    setAlerts(prev =>
      prev.map(a =>
        a.id === alertId ? { ...a, acknowledged_by: userId, acknowledged_at: now } : a
      )
    )
    if (!USE_MOCK) {
      const supabase = createClient()
      await (supabase as any)
        .from('emergency_alerts')
        .update({ acknowledged_by: userId, acknowledged_at: now })
        .eq('id', alertId)
    }
  }

  const resolveAlert = async (alertId: string) => {
    const now = new Date().toISOString()
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, resolved_at: now } : a))
    )
    if (!USE_MOCK) {
      const supabase = createClient()
      await (supabase as any)
        .from('emergency_alerts')
        .update({ resolved_at: now })
        .eq('id', alertId)
    }
  }

  return { alerts, loading, error, refetch: fetchAlerts, acknowledgeAlert, resolveAlert }
}