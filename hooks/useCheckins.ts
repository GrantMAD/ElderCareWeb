'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_CHECKINS } from '@/lib/mock-data'
import type { WellnessCheckin } from '@/types/app'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co'

export function useCheckins(elderId?: string, days = 30) {
  const [checkins, setCheckins] = useState<WellnessCheckin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCheckins = useCallback(async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300))
      setCheckins(MOCK_CHECKINS)
      setLoading(false)
      return
    }
    try {
      const supabase = createClient()
      const since = new Date(Date.now() - days * 86400000).toISOString()
      const { data, error: err } = await supabase
        .from('wellness_checkins')
        .select('*')
        .eq('elder_id', elderId!)
        .gte('scheduled_time', since)
        .order('scheduled_time', { ascending: false })
      if (err) throw err
      setCheckins(data ?? [])
    } catch (err) {
      setError('Failed to load wellness check-ins')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [elderId, days])

  useEffect(() => { fetchCheckins() }, [fetchCheckins])

  return { checkins, loading, error, refetch: fetchCheckins }
}
