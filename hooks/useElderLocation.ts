'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { LocationSharing } from '@/types/app'
import { useSession } from '@/hooks/useSession'

export function useElderLocation(elderId?: string) {
  const [location, setLocation] = useState<LocationSharing | null>(null)
  const [loading, setLoading] = useState(true)

  const { elderId: sessionElderId } = useSession()
  const targetId = elderId || sessionElderId

  const fetchLocation = useCallback(async () => {
    try {
      if (!targetId) return
      const supabase = createClient()
      const { data } = await supabase
        .from('location_sharing')
        .select('*')
        .eq('elder_id', targetId)
        .single()
      setLocation(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [targetId])

  useEffect(() => { fetchLocation() }, [fetchLocation])

  return { location, loading, refetch: fetchLocation }
}
