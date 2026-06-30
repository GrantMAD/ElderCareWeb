'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { EmergencyAlert } from '@/types/app'
import { useSession } from '@/hooks/useSession'

type AlertUpdate = {
  acknowledged_by?: string
  acknowledged_at?: string
  resolved_at?: string
}

export function useAlerts(familyId?: string) {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { familyId: sessionFamilyId } = useSession()
  const targetId = familyId || sessionFamilyId

  const fetchAlerts = useCallback(async () => {

    try {
      if (!targetId) {
        setAlerts([])
        return
      }
      const supabase = createClient()
      const { data, error: err } = await supabase
        .from('emergency_alerts')
        .select('*')
        .eq('family_id', targetId)
        .order('created_at', { ascending: false })
      if (err) throw err
      setAlerts((data ?? []) as EmergencyAlert[])
    } catch (err) {
      setError('Failed to load alerts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [targetId])

  useEffect(() => { fetchAlerts() }, [fetchAlerts])

  const acknowledgeAlert = async (alertId: string, userId: string) => {
    const now = new Date().toISOString()
    setAlerts(prev =>
      prev.map(a =>
        a.id === alertId ? { ...a, acknowledged_by: userId, acknowledged_at: now } : a
      )
    )
    const supabase = createClient()
    await (supabase as any)
      .from('emergency_alerts')
      .update({ acknowledged_by: userId, acknowledged_at: now })
      .eq('id', alertId)
  }

  const resolveAlert = async (alertId: string) => {
    const now = new Date().toISOString()
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, resolved_at: now } : a))
    )
    const supabase = createClient()
    await (supabase as any)
      .from('emergency_alerts')
      .update({ resolved_at: now })
      .eq('id', alertId)
  }

  return { alerts, loading, error, refetch: fetchAlerts, acknowledgeAlert, resolveAlert }
}