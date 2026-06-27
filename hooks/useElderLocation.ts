'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_LOCATION } from '@/lib/mock-data'
import type { LocationSharing } from '@/types/app'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co'

export function useElderLocation(elderId?: string) {
  const [location, setLocation] = useState<LocationSharing | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchLocation = useCallback(async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200))
      setLocation(MOCK_LOCATION)
      setLoading(false)
      return
    }
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from('location_sharing')
        .select('*')
        .eq('elder_id', elderId!)
        .single()
      setLocation(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [elderId])

  useEffect(() => { fetchLocation() }, [fetchLocation])

  return { location, loading, refetch: fetchLocation }
}
