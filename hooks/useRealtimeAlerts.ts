'use client'
import { useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { EmergencyAlert } from '@/types/app'

export function useRealtimeAlerts(
  familyId: string | undefined,
  onAlert: (alert: EmergencyAlert) => void
) {
  const handleAlert = useCallback(onAlert, [onAlert])

  useEffect(() => {
    if (!familyId) return

    const supabase = createClient()
    const channel = supabase
      .channel(`alerts:${familyId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'emergency_alerts',
          filter: `family_id=eq.${familyId}`,
        },
        (payload) => handleAlert(payload.new as EmergencyAlert)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [familyId, handleAlert])
}
