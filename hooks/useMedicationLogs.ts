'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_MEDICATION_LOGS } from '@/lib/mock-data'
import type { MedicationLog } from '@/types/app'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co'

export function useMedicationLogs(elderId?: string, days = 30) {
  const [logs, setLogs] = useState<MedicationLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = useCallback(async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200))
      setLogs(MOCK_MEDICATION_LOGS)
      setLoading(false)
      return
    }
    try {
      if (!elderId) {
        setLogs([])
        return
      }
      const supabase = createClient()
      const since = new Date(Date.now() - days * 86400000).toISOString()
      const { data, error: err } = await supabase
        .from('medication_logs')
        .select('*')
        .eq('elder_id', elderId)
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
  }, [elderId, days])

  useEffect(() => { fetchLogs() }, [fetchLogs])

  // expectedLogsCount: a simple estimate of how many doses are expected today
  // In mock mode, derive from the logs themselves; in real mode this would come from schedules
  const expectedLogsCount = USE_MOCK ? MOCK_MEDICATION_LOGS.length : logs.length

  return { logs, loading, error, refetch: fetchLogs, expectedLogsCount }
}
