'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Appointment } from '@/types/app'
import { useSession } from '@/hooks/useSession'

export function useAppointments(elderId?: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { elderId: sessionElderId } = useSession()
  const targetId = elderId || sessionElderId

  const fetchAppointments = useCallback(async () => {

    try {
      if (!targetId) {
        setAppointments([])
        return
      }
      const supabase = createClient()
      const { data, error: err } = await supabase
        .from('appointments')
        .select('*')
        .eq('elder_id', targetId)
        .order('appointment_date', { ascending: false })
      if (err) throw err
      setAppointments(data ?? [])
    } catch (err) {
      setError('Failed to load appointments')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [targetId])

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  const addAppointment = async (appt: Omit<Appointment, 'id' | 'created_at' | 'reminder_sent'>) => {

    const supabase = createClient()
    const { data } = await (supabase as any).from('appointments').insert(appt).select().single()
    if (data) setAppointments(prev => [data, ...prev])
    return data
  }

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
    const supabase = createClient()
    await (supabase as any).from('appointments').update(updates).eq('id', id)
  }

  return { appointments, loading, error, refetch: fetchAppointments, addAppointment, updateAppointment }
}
