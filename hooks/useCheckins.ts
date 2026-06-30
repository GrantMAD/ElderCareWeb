'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { WellnessCheckin } from '@/types/app'
import { useSession } from '@/hooks/useSession'

export function useCheckins(elderId?: string, days = 30) {
  const [checkins, setCheckins] = useState<WellnessCheckin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { elderId: sessionElderId } = useSession()
  const targetId = elderId || sessionElderId

  const fetchCheckins = useCallback(async () => {

    try {
      if (!targetId) {
        setCheckins([])
        return
      }
      const supabase = createClient()
      const since = new Date(Date.now() - days * 86400000).toISOString()
      const { data, error: err } = await supabase
        .from('wellness_checkins')
        .select('*')
        .eq('elder_id', targetId)
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
  }, [targetId, days])

  useEffect(() => { fetchCheckins() }, [fetchCheckins])

  return { checkins, loading, error, refetch: fetchCheckins }
}
