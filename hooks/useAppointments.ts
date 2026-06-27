'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_APPOINTMENTS } from '@/lib/mock-data'
import type { Appointment } from '@/types/app'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co'

export function useAppointments(elderId?: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAppointments = useCallback(async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 250))
      setAppointments(MOCK_APPOINTMENTS)
      setLoading(false)
      return
    }
    try {
      const supabase = createClient()
      const { data, error: err } = await supabase
        .from('appointments')
        .select('*')
        .eq('elder_id', elderId!)
        .order('appointment_date', { ascending: false })
      if (err) throw err
      setAppointments(data ?? [])
    } catch (err) {
      setError('Failed to load appointments')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [elderId])

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  const addAppointment = async (appt: Omit<Appointment, 'id' | 'created_at' | 'reminder_sent'>) => {
    if (USE_MOCK) {
      const newAppt: Appointment = { ...appt, id: `appt-${Date.now()}`, created_at: new Date().toISOString(), reminder_sent: false }
      setAppointments(prev => [newAppt, ...prev])
      return newAppt
    }
    const supabase = createClient()
    const { data } = await supabase.from('appointments').insert(appt).select().single()
    if (data) setAppointments(prev => [data, ...prev])
    return data
  }

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
    if (!USE_MOCK) {
      const supabase = createClient()
      await supabase.from('appointments').update(updates).eq('id', id)
    }
  }

  return { appointments, loading, error, refetch: fetchAppointments, addAppointment, updateAppointment }
}
