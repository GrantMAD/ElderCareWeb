'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { MedicationLog } from '@/types/app'
import { useSession } from '@/hooks/useSession'

export function useMedicationLogs(elderId?: string, days = 30) {
  const [logs, setLogs] = useState<MedicationLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { elderId: sessionElderId } = useSession()
  const targetId = elderId || sessionElderId

  const fetchLogs = useCallback(async () => {

    try {
      if (!targetId) {
        setLogs([])
        return
      }
      const supabase = createClient()
      const since = new Date(Date.now() - days * 86400000).toISOString()
      const { data, error: err } = await supabase
        .from('medication_logs')
        .select('*')
        .eq('elder_id', targetId)
        .gte('logged_at', since)
        .order('logged_at', { ascending: false })
      if (err) throw err
      setLogs(data ?? [])
    } catch (err) {
      setError('Failed to load medication logs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [targetId, days])

  useEffect(() => { fetchLogs() }, [fetchLogs])

  const expectedLogsCount = logs.length

  return { logs, loading, error, refetch: fetchLogs, expectedLogsCount }
}
